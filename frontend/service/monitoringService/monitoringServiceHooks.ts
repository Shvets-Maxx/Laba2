import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiResponse, Station, Measurement } from "./types";
import {
    stationsRoutes,
    measurementsRoutes,
    syncSaveEcoBot,
} from "./monitoringService";

const MONITORING_QUERY_KEYS = {
    stations: ["stations"],
    measurements: ["measurements"],
    saveEcoBotStatus: ["saveEcoBotStatus"],
};

export const useStationsRoutes = (page: number, city: string) => {
    return useQuery<ApiResponse<Station>, Error>({
        queryKey: [...MONITORING_QUERY_KEYS.stations, page, city],
        queryFn: () => stationsRoutes(page, city),
        placeholderData: (previousData) => previousData,
    });
};

export const useMeasurementsRoutes = (page: number, stationId: string) => {
    return useQuery<ApiResponse<Measurement>, Error>({
        queryKey: [...MONITORING_QUERY_KEYS.measurements, page, stationId],
        queryFn: () => measurementsRoutes(page, stationId),
        placeholderData: (previousData) => previousData,
    });
};

export const useSyncSaveEcoBot = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: syncSaveEcoBot,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: MONITORING_QUERY_KEYS.stations,
            });
            queryClient.invalidateQueries({
                queryKey: MONITORING_QUERY_KEYS.measurements,
            });
            alert("Синхронізацію завершено!");
        },
    });
};
