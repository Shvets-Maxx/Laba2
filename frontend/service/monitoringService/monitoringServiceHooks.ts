
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse, Station, Measurement } from "./types";
import { stationsRoutes, measurementsRoutes } from "./monitoringService";

const MONITORING_QUERY_KEYS = {
    myStationsRoutes: ["stations"],
    myMeasurementsRoutes: ["measurements"],
};

export const useStationsRoutes = (page: number) => {
    return useQuery<ApiResponse<Station>, Error>({
        queryKey: [...MONITORING_QUERY_KEYS.myStationsRoutes, page],
        queryFn: () => stationsRoutes(page),

        placeholderData: (previousData) => previousData,
    });
};

export const useMeasurementsRoutes = (page: number) => {
    return useQuery<ApiResponse<Measurement>, Error>({
        queryKey: [...MONITORING_QUERY_KEYS.myMeasurementsRoutes, page],
        queryFn: () => measurementsRoutes(page),

        placeholderData: (previousData) => previousData,
    });
};
