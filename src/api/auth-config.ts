import {account} from "./constants";

class AuthConfig {
    public static accessTokenKey: string = 'accessToken';
    public static refreshTokenKey: string = 'refreshToken';
    public static keepAliveUrl: string = 'keep-alive';
    public static isProcessRefreshToken: boolean = false;

    // достаём access токен из localStorage, если он там есть
    public static getAccessToken = () => {
        return window.localStorage.getItem(AuthConfig.accessTokenKey);
    };

    // достаём refresh токен из localStorage, если он там есть
    public static getRefreshToken = () => {
        return window.localStorage.getItem(AuthConfig.refreshTokenKey);
    };

    /**
     * Сохраним новые токены в localStorage
     */
    public static saveTokens = (accessToken: string | null, refreshToken: string | null) => {
        if (accessToken === null) {
            window.localStorage.removeItem(AuthConfig.accessTokenKey);
        } else {
            window.localStorage.setItem(AuthConfig.accessTokenKey, accessToken);
        }
        if (refreshToken === null) {
            window.localStorage.removeItem(AuthConfig.refreshTokenKey);
        } else {
            window.localStorage.setItem(AuthConfig.refreshTokenKey, refreshToken);
        }
    };

    /**
     * Выход
     */
    public static logout = () => {
        window.location.href = `${window.location.origin}${account}`;
    };
}

export { AuthConfig };