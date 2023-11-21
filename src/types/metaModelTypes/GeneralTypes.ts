import {AlgNameType} from "./ThirdFileTypes";

export type OptionsType = {
    hasDynamicData: boolean,
    dependsOn: null | string[] | [],
    data: string[] | null | DataType[],
}

type DataType = {
    name: string,
    value: string,
}

export type TypesT = {
    typeName: string | null,
    minValue?: number | null,
    maxValue?: number | null,
    includeMin?: boolean,
    includeMax?: boolean,
    options?: OptionsType
    itemTypes?: ItemTypes,
    dependsOn?: null | string[],
    // ???
    itemType?: {} | ItemType,
    data?: DataType[],
}

export type ItemTypes = {
    name: ModelNameType,
    type?: ModelNameType,
    value: ModelNameType,
}

export type ModelNameType = {
    name: string,
    description: string,
    required?: boolean,
    type: TypesT,
    providerName?: providerNameType,
    algName: AlgNameType,
}

type providerNameType = {
    name: string,
    description: string,
    required?: boolean,
    type: TypesT,
}

type ItemType = {
    typeName: string,
    ItemTypes: ItemTypes
}
