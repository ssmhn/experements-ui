import {ParamType, StatusType} from "./global";
import {ModelType} from "./ModelsType";

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

export type ResponseType = {
    status: 'SENT_FOR_CREATE',
    data: {}
} | {
    status: 'SENT_FOR_TRAIN',
    data: {}
} | {
    status: 'SENT_FOR_PREDICT',
    data: {}
} | {
    status: Omit<StatusType, 'SENT_FOR_CREATE' | 'SENT_FOR_TRAIN' | 'SENT_FOR_PREDICT'>,
    data: ModelType
}