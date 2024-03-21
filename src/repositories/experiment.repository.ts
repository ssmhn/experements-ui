import {baseModelUrl} from "../api/constants";
import {BaseRepository, ResolverMethods} from "./base.repository";
import {ModelObjects, ModelObjectsDTO, ModelObjectsType} from "../types/dto/model.dto";
import {ExperimentDTO, ExperimentObject} from "../types/dto/experiment.dto";
import {ExperimentType} from "../types/experiment.type";

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

    static addExperiment(id: string) {
        return ExperimentRepository.resolve({
            url: ``,
            queryParams: {experiment_id: id},
            method: ResolverMethods.post
        })
    }

    static getExperimentResult(id: string) {
        return ExperimentRepository.resolve<ExperimentDTO, ExperimentObject>({
            url: ``,
            queryParams: {experiment_id: id},
            method: ResolverMethods.get,
            model: ExperimentObject,
            modelType: ExperimentType,
        })
    }

    static getObjects(id: string) {
        return ExperimentRepository.resolve<ModelObjectsDTO, ModelObjects>({
            url: `${id}`,
            model: ModelObjects,
            modelType: ModelObjectsType,
        });
    }
}