import {api} from "./config";

export const getAllModelsFn = async () => {
    const data = await api.get<string, number, boolean>('get/models').then((res) => {
    }).catch((res) => {
    })
}