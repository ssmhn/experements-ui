import * as t from 'io-ts';
import {Experiment, ExperimentType} from "../experiment.type";
import {ExperimentClass} from "../../models/experiment.model";

export type ExperimentDTO = t.TypeOf<typeof ExperimentType>;

class ExperimentObject {
    experiments: Experiment;

    constructor(dto: ExperimentDTO) {
        this.experiments = new ExperimentClass(dto);
    }
}

export { ExperimentObject };
