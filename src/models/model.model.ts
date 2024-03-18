import {ModelInterface} from "../types/model.type";
import {ModelDTO} from "../types/dto/model.dto";

export class ModelClass implements ModelInterface {
    uuid: string
    name: string
    status: string
    predictLabel: string
    distributions: string
    algorithm: string
    errorMessage: string
    hyperparams: string
    encoders: string
    scalers: string

    constructor(dto: ModelDTO, id?: string) {
        this.uuid = dto.uuid || id
        this.name = dto.name || ''
        this.status = dto.status || ''
        this.predictLabel = dto.predictLabel || ''
        this.distributions = dto.distributions || ''
        this.algorithm = dto.algorithm || ''
        this.errorMessage = dto.errorMessage || ''
        this.hyperparams = dto.hyperparams || ''
        this.encoders = dto.encoders || ''
        this.scalers = dto.scalers || ''
    }
}