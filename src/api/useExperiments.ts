import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const useExperiments = () => {
    return useQuery({
        queryKey: ['experiments'],
        queryFn: async () => {
            const { data } = await axios.get(
                '/',
            )
            return data
        },
    })
}