import axios, {AxiosRequestConfig} from "axios";

const config: AxiosRequestConfig = {
    baseURL: 'https://url/manager/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
}

export const api = axios.create(config)