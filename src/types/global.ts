export type SelectType = {
    value: string,
    label: string
}

export type ParamType = {
    name: string,
    value?: string | Record<string, string>
    type?: string
}