export type SelectType = {
    value: string,
    label: string
}

export type ParamType = {
    name: string,
    value?: string | Record<string, string>
    type?: string
}

export type StatusType =
    'CREATE' |
    'TRAIN' |
    'PREDICT' |
    'SENT_FOR_CREATE' |
    'SENT_FOR_TRAIN' |
    'SENT_FOR_PREDICT' |
    'CREATED' |
    'TRAINED' |
    'PREDICTED' |
    'TRAIN_WITH_CROSSVALIDATION'