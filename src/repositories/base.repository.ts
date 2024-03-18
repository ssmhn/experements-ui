import {RecordC, Type, TypeC} from "io-ts";
import {AxiosInstance, AxiosRequestConfig, AxiosResponse, HttpStatusCode} from "axios";
import { api } from '../api/config';
import {BaseResponseApi} from "../types/baseResponseApi";
import {LocalAnyType, TypeHelper} from "../types/global";
import {defaultErrorMessage, defaultToastTimeout, strings} from "../api/constants";
import { toast } from "react-toastify";

const MSGPACK_TYPE = 'application/x-msgpack';

export enum ResolverMethods {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete',
}

type QueryParamsType = {
    [index: string]: string | number | boolean | null | undefined;
};

// описание, передаваемого конфига в запросы
type ResolverConfig = {
    url: string; // url, куда пойдёт запрос (без учёта defaultUrl)
    method?: ResolverMethods; // метод запроса (можно не передавать, по-умолчанию get)
    queryParams?: QueryParamsType; // get параметры
    // eslint-disable-next-line
    bodyData?: any; // post параметры
    // eslint-disable-next-line
    modelType?: TypeC<any> | RecordC<any, any> | Type<any>; // описание типов из io-ts для проверки модели
    // eslint-disable-next-line
    model?: any; // класс модели, если нужно dto промапить в модель
    axiosConfigs?: AxiosRequestConfig; // возможность пробросить любые другие конфиги из аксиоса
    withoutToast?: boolean; // true - если не хотим показывать тост об ошибке
    customErrorTexts?: Partial<Record<HttpStatusCode, string>>; // если нужно передать специфичный текст для разных ошибок
    signal?: AbortSignal; // Для прерывания запросов
    msgpack?: boolean; // если true, значит в ответ придёт не json,а msgpack
};

/**
 * Общий класс для работы с запросами на бэк
 * Содержит в себе
 * defaultUrl - общий url для группы запросов
 * api - экземпляр axios, может понадобиться переопределить со своими конфигами (например для интерцептора)
 */
export class BaseRepository {
    static defaultUrl: string = '';
    static api: AxiosInstance = api;

    /**
     * Метод для генерации запроса без мапы на модель
     * @param config
     * @returns
     */
    static resolveWithoutModel<R>(config: ResolverConfig): Promise<R | null> {
        if (this._isGetViewRequest(config.method)) {
            const promise = this.api[config.method || ResolverMethods.get](`${this.defaultUrl}${config.url}`, {
                params: config.queryParams,
                data: config.bodyData,
                signal: config.signal,
                responseType: config.msgpack ? 'arraybuffer' : undefined,
                ...config.axiosConfigs,
            });
            return this._checkResponseData<R & BaseResponseApi>(promise, !!config.withoutToast, config.customErrorTexts, config.msgpack).then(
                (result) => result?.data || null,
            );
        }
        const promise = this.api[config.method || ResolverMethods.post](
            `${this.defaultUrl}${config.url}`,
            config.bodyData,
            {
                params: config.queryParams,
                signal: config.signal,
                responseType: config.msgpack ? 'arraybuffer' : undefined,
                ...config.axiosConfigs,
            },
        );
        return this._checkResponseData<R & BaseResponseApi>(promise, !!config.withoutToast, config.customErrorTexts, config.msgpack).then(
            (result) => result?.data || null,
        );
    }

    /**
     * Метод для генерации запроса с мапой на модель
     * @param config
     * @returns
     */
    static resolve<DTO, Model>(config: ResolverConfig): Promise<Model | null> {
        if (this._isGetViewRequest(config.method)) {
            const promise = this.api[config.method || ResolverMethods.get](`${this.defaultUrl}${config.url}`, {
                params: config.queryParams,
                data: config.bodyData,
                signal: config.signal,
                responseType: config.msgpack ? 'arraybuffer' : undefined,
                ...config.axiosConfigs,
            });
            return this._checkResponseData<DTO & BaseResponseApi>(
                promise,
                !!config.withoutToast,
                config.customErrorTexts,
                config.msgpack,
            ).then((result) => this._parseResponse<DTO, Model>(result, config));
        }
        const promise = this.api[config.method || ResolverMethods.post](
            `${this.defaultUrl}${config.url}`,
            config.bodyData,
            {
                params: config.queryParams,
                signal: config.signal,
                responseType: config.msgpack ? 'arraybuffer' : undefined,
                ...config.axiosConfigs,
            },
        );
        return this._checkResponseData<DTO & BaseResponseApi>(promise, !!config.withoutToast, config.customErrorTexts, config.msgpack).then(
            (result) => this._parseResponse<DTO, Model>(result, config),
        );
    }

    /**
     * Метод для генерации запроса с мапой массива на модель
     * @param config
     * @returns
     */
    static resolveArray<DTO, Model>(config: ResolverConfig): Promise<Model[]> {
        if (this._isGetViewRequest(config.method)) {
            const promise = this.api[config.method || ResolverMethods.get](`${this.defaultUrl}${config.url}`, {
                params: config.queryParams,
                data: config.bodyData,
                signal: config.signal,
                responseType: config.msgpack ? 'arraybuffer' : undefined,
                ...config.axiosConfigs,
            });
            return this._checkResponseData<DTO[] & BaseResponseApi>(
                promise,
                !!config.withoutToast,
                config.customErrorTexts,
                config.msgpack,
            ).then((result) => this._parseResponseArray<DTO, Model>(result, config));
        }
        const promise = this.api[config.method || ResolverMethods.post](
            `${this.defaultUrl}${config.url}`,
            config.bodyData,
            {
                params: config.queryParams,
                signal: config.signal,
                responseType: config.msgpack ? 'arraybuffer' : undefined,
                ...config.axiosConfigs,
            },
        );
        return this._checkResponseData<DTO[] & BaseResponseApi>(promise, !!config.withoutToast, config.customErrorTexts, config.msgpack).then(
            (result) => this._parseResponseArray<DTO, Model>(result, config),
        );
    }

    /**
     * вернёт true, если метод get или delete
     * @param method
     * @returns
     */
    private static _isGetViewRequest(method?: ResolverMethods): boolean {
        return !method || method === ResolverMethods.get || method === ResolverMethods.delete;
    }

    /**
     * Внутренний метод для обработки результатов запроса с мапой на модель
     */
    private static _parseResponse<DTO, Model>(result: AxiosResponse<DTO>, config: ResolverConfig): Model | null {
        const dto = result?.data || null;
        if (dto === null || !config.model) {
            return null;
        }
        if (config.modelType) {
            return TypeHelper.checkElement<Model, DTO>(
                config.modelType,
                config.model,
                config.model && config.model.name ? config.model.name : 'Неизвестная модель',
                dto,
            );
        }
        return new config.model(dto);
    }

    /**
     * Внутренний метод для обработки результатов запроса с мапой массива данных на модель
     */
    private static _parseResponseArray<DTO, Model>(result: AxiosResponse<DTO[]>, config: ResolverConfig): Model[] {
        const dto = result?.data || [];
        if (!dto.length || !config.model) {
            return [];
        }
        if (config.modelType) {
            return TypeHelper.checkElementsArray<Model, DTO>(
                config.modelType,
                config.model,
                config.model && config.model.name ? config.model.name : 'Неизвестная модель',
                dto,
            );
        }
        return dto.map((dtoItem) => new config.model(dtoItem));
    }

    private static _parseErrorText(errorResponse: AxiosResponse<BaseResponseApi>): string {
        let error: string = strings.unknownError;
        if (typeof errorResponse?.data === 'string') {
            error = errorResponse.data;
        }
        if (
            !!errorResponse &&
            errorResponse.data &&
            (errorResponse.data.success === false || errorResponse.data.Error || errorResponse.data.detail)
        ) {
            error =
                errorResponse.data.Error ||
                errorResponse.data.detail ||
                errorResponse.data.error ||
                strings.unknownError;
        }
        return defaultErrorMessage[error] ? defaultErrorMessage[error] : error;
    }


    private static _checkResponseData<R extends BaseResponseApi>(
        promise: Promise<AxiosResponse<R>>,
        withoutToast: boolean,
        customErrorTexts?: Partial<Record<HttpStatusCode, string>>,
        msgpack?: boolean,
    ): Promise<AxiosResponse<R>> {
        return new Promise((resolve, reject) => {
            promise
                .then((res?: LocalAnyType) => {
                    // Проверка на content-type msgpack
                    const contentType = res?.headers['content-type'];
                    const isMsgpackResponse = contentType?.startsWith(MSGPACK_TYPE) && res?.data !== null;
                    if (isMsgpackResponse && msgpack && res) {
                        // @ts-ignore
                        res.data = decode(res.data) as R;
                    }
                    if (res?.config.method === ResolverMethods.delete || res?.data === null || !res) {
                        resolve(res);
                        return;
                    }

                    // если запрос вернул 200, но бэк положил в ответ информацию об ошибке
                    if (res?.data?.success === false) {
                        const errorText = this._parseErrorText(res);
                        if (!withoutToast) {
                            toast.error(errorText, { autoClose: defaultToastTimeout });
                        }
                        reject(res);
                        return;
                    }
                    resolve(res);
                })
                .catch((error) => {
                    // чтобы ошибка не сьедалась при неудачном декодинге msgpack
                    window.console.error(error);

                    // если запрос вернул ошибку, попытаемся её распарсить
                    const errorText = defaultErrorMessage[error.toString()] || this._parseErrorText(error.response);
                    if (!withoutToast) {
                        // если передали кастомный текст для такого типа ошибки, то выводит тостер
                        if (customErrorTexts?.[error.response.status as HttpStatusCode]) {
                            toast.error(customErrorTexts[error.response.status as HttpStatusCode], {
                                autoClose: defaultToastTimeout,
                            });
                            reject(error);
                            return;
                        }

                        // если с бэка пришла html страница,то покажем неизвестную ошибку
                        if (errorText.includes('<html>')) {
                            toast.error(strings.unknownError, {
                                autoClose: defaultToastTimeout,
                            });
                            reject(error);
                            return;
                        }

                        toast.error(JSON.stringify(errorText), { autoClose: defaultToastTimeout });
                    }
                    reject(error);
                });
        });
    }
}