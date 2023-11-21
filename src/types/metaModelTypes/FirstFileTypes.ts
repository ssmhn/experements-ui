import {ModelNameType} from "./GeneralTypes";
import {AlgNameType} from "./ThirdFileTypes";

export type FirstFileTypes = {
    type: MetaModelType[]
}

type MetaModelType = {
    name: string,
    description: string,
    inputParameters: inputParametersType,
    outputParameters?: outputParametersType,
}

type inputParametersType = {
    modelName: ModelNameType,
    featuresHeader?: ModelNameType,
    hyperparameters?: ModelNameType,
    providerName: ModelNameType,
    algName: AlgNameType,

    outputParameters: outputParametersType,

    features?: null,
    labels?: null,
    encoderFeatures?: null,
    encoderLabels?: null,
    scalers?: null,
}

type outputParametersType = {
    modelId: ModelNameType
}