import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const getExperimentById = async (id: number) => {
    const { data } = await axios.get(
        `/${id}`,
    )
    return data
}

export const useExperiment = (experimentId: number) => {
    return useQuery({
        queryKey: ['experiment', experimentId],
        queryFn: () => getExperimentById(experimentId),
        enabled: !!experimentId,
    })
}