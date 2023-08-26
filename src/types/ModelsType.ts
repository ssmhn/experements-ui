export type ModelsType = ModelsType[]

export type ModelType = {
    name: string,
    status: 'CREATE',
    predictLabel: string,
    distributions: string,
    algorithm: string,
    errorMessage: string,
    hyperparams: string,
    encoders: string,
    scalers: string
}