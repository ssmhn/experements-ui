import {ParamType} from "./global";

export type CreateModelType = {
    nameModel: string,
    nameAlg: string,
    hyperparams: ParamType[]
}

export type TrainModelType = {
    modelName: string,
    labels: Record<string, string>[],
    features: Record<string, string>[],
    featuresHeader: ParamType[],
    encoderFeatures: FeatureType[]
}

export type FeatureType = {
    featureName: string,
    encoder: {
        name: string,
        parameters: ParamType[]
    },
    serializedData: string[]
}

export type ResponseType = string