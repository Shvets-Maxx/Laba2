
import { apiClient } from "../api/apiClient";
import type { Station, Measurement, ApiResponse } from "./types";

const ROWS_PER_PAGE = 5;

export const stationsRoutes = async (
    page: number
): Promise<ApiResponse<Station>> => {
    const response = await apiClient.get<ApiResponse<Station>>(
        `/api/stations?page=${page}&limit=${ROWS_PER_PAGE}`
    );
    return response.data;
};

export const measurementsRoutes = async (
    page: number
): Promise<ApiResponse<Measurement>> => {
    const response = await apiClient.get<ApiResponse<Measurement>>(
        `/api/measurements?page=${page}&limit=${ROWS_PER_PAGE}`
    );
    return response.data;
};
