import * as t from 'io-ts';

export const ParamType = t.type({
    name: t.union([t.string, t.undefined]),
    value: t.union([t.string, t.record(t.string, t.string)]),
    type: t.union([t.string, t.undefined]),
})

export const EncoderType = t.type({
    name: t.string,
    parameters: t.array(ParamType),
})

export const ExperimentType = t.type({
    uuid: t.string,
    featureName: t.string,
    encoder: EncoderType,
    serializedData: t.array(t.string)
})

export type ParameterType = {
    name: string,
    value?: string | Record<string, string>,
    type?: string,
}

export type EncoderBaseType = {
    name: string,
    parameters: ParameterType[]
}

export type Experiment = {
    uuid: string,
    featureName: string,
    encoder: EncoderBaseType,
    serializedData: string[]
}

export interface ExperimentInterface {
    uuid: string,
    featureName: string,
    encoder: EncoderBaseType,
    serializedData: string[]
}