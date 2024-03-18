import {Environment} from "../shared/env/environment";

const environment = process.env as Environment;

const nodeEnv = environment.NODE_ENV;

export const nodeEnvIsDevelopment = nodeEnv === 'development';

export const account = '/account/';

export const apiUrl = 'http://prv1.vpn.isc-mtuci.ru:8084';

export const baseModelUrl = apiUrl;

export enum strings {
    unknownError = 'Неизвестная ошибка'
}

type DefaultErrorMessageType = {
    [index: string]: string;
};

export const defaultToastTimeout: number = 5000;
export const defaultErrorMessage: DefaultErrorMessageType = {
    'Error: Request failed with status code 404': 'Ошибка! Страница не найдена',
    'Invalid resource owner credentials': 'Неверный логин или пароль',
    Unauthorized: 'Вы не авторизованы',
};