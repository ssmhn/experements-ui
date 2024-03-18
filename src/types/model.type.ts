import * as t from 'io-ts';

export const ModelType = t.type({
    uuid: t.string,
    name: t.string,
    status: t.string,
    predictLabel: t.string,
    distributions: t.string,
    algorithm: t.string,
    errorMessage: t.string,
    hyperparams: t.string,
    encoders: t.string,
    scalers: t.string
});

export type Model = {
    uuid: string,
    name: string,
    status: string,
    predictLabel: string,
    distributions: string,
    algorithm: string,
    errorMessage: string,
    hyperparams: string,
    encoders: string,
    scalers: string
}

export interface ModelInterface {
    uuid: string,
    name: string,
    status: string,
    predictLabel: string,
    distributions: string,
    algorithm: string,
    errorMessage: string,
    hyperparams: string,
    encoders: string,
    scalers: string
}