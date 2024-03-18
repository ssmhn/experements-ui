import * as t from 'io-ts';
import {Model, ModelType} from "../model.type";
import {ModelClass} from "../../models/model.model";

export const ModelObjectsType = t.type({
    models: t.array(ModelType),
});

export type ModelObjectsDTO = t.TypeOf<typeof ModelObjectsType>;

export type ModelDTO = t.TypeOf<typeof ModelType>;

class ModelObjects {
    models: Model[];

    constructor(dto: ModelObjectsDTO) {
        this.models = dto.models.map(el => new ModelClass(el));
    }
}

export { ModelObjects };
