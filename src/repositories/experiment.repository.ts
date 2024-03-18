import {baseModelUrl} from "../api/constants";
import {BaseRepository, ResolverMethods} from "./base.repository";
import {ModelObjects, ModelObjectsDTO, ModelObjectsType} from "../types/dto/model.dto";

export class ExperimentRepository extends BaseRepository {
    static readonly defaultUrl = `${baseModelUrl}/models/`;
    static controllerCheckStateModel: AbortController | null = null;

    static abortCheckStateModel() {
        if (ExperimentRepository.controllerCheckStateModel) {
            ExperimentRepository.controllerCheckStateModel.abort();
            ExperimentRepository.controllerCheckStateModel = null;
        }

        ExperimentRepository.controllerCheckStateModel = new AbortController();
    }

    static getObjects(id: string) {
        return ExperimentRepository.resolve<ModelObjectsDTO, ModelObjects>({
            url: `${id}`,
            model: ModelObjects,
            modelType: ModelObjectsType,
        });
    }
}