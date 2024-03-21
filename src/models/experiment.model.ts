import {ModelInterface} from "../types/model.type";
import {ModelDTO} from "../types/dto/model.dto";
import {EncoderBaseType, ExperimentInterface, ParameterType} from "../types/experiment.type";
import {ExperimentDTO} from "../types/dto/experiment.dto";

export class ExperimentClass implements ExperimentInterface {
    uuid: string
    featureName: string
    encoder: EncoderBaseType
    serializedData: string[]

    constructor(dto: ExperimentDTO, id?: string) {
        this.uuid = dto.uuid || id
        this.featureName = dto.featureName || ''
        this.encoder = dto.encoder || { name: '', parameters: [] }
        this.serializedData = dto.serializedData || []
    }
}