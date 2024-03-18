import axios, {AxiosRequestConfig, InternalAxiosRequestConfig} from "axios";
import {AuthConfig} from "./auth-config";
import {account, nodeEnvIsDevelopment} from "./constants";
import {HealthCheckRepository} from "../repositories/health-check.repository";
import {AuthRepository} from "./auth.repositpry";

const config: AxiosRequestConfig = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
}

const api = axios.create(config)

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (!config.url) {
        return config;
    }
    const accessToken = AuthConfig.getAccessToken();
    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})

api.interceptors.response.use(
    (response) => {
        if (response.request?.responseURL === `${window.location.origin}${account}`) {
            AuthConfig.logout();
        }
        return response;
    },
    async (error) => {
        if (!error.config?.url.includes('healthz')) {
            await HealthCheckRepository.getHealthCheck();
        } else if (!nodeEnvIsDevelopment) {
            window.location.href = `${window.location.origin}${account}`;
        }

        if (nodeEnvIsDevelopment) {
            return Promise.reject(error);
        }

        const codes = [401, 302, 405]; // коды ошибок, которые должны пораждать проверку авторизации
        const timeout = 15;
        const originalRequest = error.config;
        if (originalRequest && codes.includes(error.response?.status || 401) && !originalRequest._retry) {
            // если мы получили в ответ ошибку авторизации и это первый подобный запрос
            if (AuthConfig.getRefreshToken()) {
                // если у нас есть сохранённый refresh_token
                if (originalRequest.url.indexOf(AuthConfig.keepAliveUrl) === -1) {
                    // если мы ломились не на получение токена
                    if (AuthConfig.isProcessRefreshToken) {
                        // если уже запущен процесс обновления токена
                        return new Promise((resolve) => {
                            const interval = window.setInterval(() => {
                                if (!AuthConfig.isProcessRefreshToken) {
                                    // ждём когда процесс обновления токена закончится и повторим запрос
                                    window.clearInterval(interval);
                                    return resolve(api(originalRequest));
                                }
                            }, timeout);
                        });
                    } else {
                        // если процесс обновления токена ещё не был запущен
                        originalRequest._retry = true;
                        AuthConfig.isProcessRefreshToken = true;
                        try {
                            return AuthRepository.refreshToken(AuthConfig.getRefreshToken() || '') // просим новый токен
                                .then(() => {
                                    // если получили новый токен повторим оригинальный запрос
                                    AuthConfig.isProcessRefreshToken = false;
                                    api(originalRequest);
                                })
                                .catch((error) => {
                                    window.console.log({ error });
                                    // если не получилось обновить токен, выходим из системы
                                    AuthConfig.isProcessRefreshToken = false;
                                    AuthConfig.logout();
                                });
                        } catch (error) {
                            // если что-то пошло не так при обновлении токена - выходим из системы
                            AuthConfig.isProcessRefreshToken = false;
                            AuthConfig.logout();
                        }
                    }
                } else {
                    // если мы ломились на получение токена и получили в ответ ошибку авторизации, значит выходим из системы
                    AuthConfig.isProcessRefreshToken = false;
                    AuthConfig.logout();
                }
            } else {
                // если у нас не было сохранённого токена для обновления - выходим из системы
                AuthConfig.isProcessRefreshToken = false;
                AuthConfig.logout();
            }
        }

        AuthConfig.isProcessRefreshToken = false;
        // если это была ошибка не авторизации - просто возвращаем её
        return Promise.reject(error);
    },
);

export { api };