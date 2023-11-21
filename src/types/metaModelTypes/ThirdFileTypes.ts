import {TypesT} from "./GeneralTypes";

export type AlgNameType = {
    algName: {
        name: string,
        description: string,
        required: boolean,
        type: TypesT,
    }
}