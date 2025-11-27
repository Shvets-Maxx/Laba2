// src/service/monitoringService/monitoringServiceHooks.ts

import { useQuery } from "@tanstack/react-query";
// Добавляем импорт типов, чтобы TypeScript знал, что возвращают наши хуки
import type { ApiResponse, Station, Measurement } from "./types";
import { stationsRoutes, measurementsRoutes } from "./monitoringService";

const MONITORING_QUERY_KEYS = {
    myStationsRoutes: ["stations"],
    myMeasurementsRoutes: ["measurements"],
};

// 1. ИСПРАВЛЕНИЕ ХУКА ДЛЯ СТАНЦИЙ
export const useStationsRoutes = (page: number) => {
    // ЯВНО указываем дженерики: <ВозвращаемыйТип, ТипОшибки>
    return useQuery<ApiResponse<Station>, Error>({
        queryKey: [...MONITORING_QUERY_KEYS.myStationsRoutes, page],
        queryFn: () => stationsRoutes(page),

        // ИСПРАВЛЕНО: замена keepPreviousData на placeholderData с колбэком
        placeholderData: (previousData) => previousData,
        // keepPreviousData больше не существует
    });
};

// 2. ИСПРАВЛЕНИЕ ХУКА ДЛЯ ИЗМЕРЕНИЙ
export const useMeasurementsRoutes = (page: number) => {
    // ЯВНО указываем дженерики: <ВозвращаемыйТип, ТипОшибки>
    return useQuery<ApiResponse<Measurement>, Error>({
        queryKey: [...MONITORING_QUERY_KEYS.myMeasurementsRoutes, page],
        queryFn: () => measurementsRoutes(page),

        // ИСПРАВЛЕНО: замена keepPreviousData на placeholderData с колбэком
        placeholderData: (previousData) => previousData,
    });
};
