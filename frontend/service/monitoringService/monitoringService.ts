import { apiClient } from "../api/apiClient";
import type {
    Station,
    Measurement,
    ApiResponse,
    EcoTaxRequest,
    EcoTaxResult,
} from "./types";

const ROWS_PER_PAGE = 5;

export const stationsRoutes = async (
    page: number,
    city: string = ""
): Promise<ApiResponse<Station>> => {
    const response = await apiClient.get<ApiResponse<Station>>(
        `/api/stations?page=${page}&limit=${ROWS_PER_PAGE}&city=${city}`
    );
    return response.data;
};

export const measurementsRoutes = async (
    page: number,
    stationId: string = ""
): Promise<ApiResponse<Measurement>> => {
    const response = await apiClient.get<ApiResponse<Measurement>>(
        `/api/measurements?page=${page}&limit=${ROWS_PER_PAGE}&station_id=${stationId}`
    );
    return response.data;
};

export const syncSaveEcoBot = async (): Promise<any> => {
    const response = await apiClient.get("/api/saveecobot/sync");
    return response.data;
};

export const calculateEcoTax = async (
    data: EcoTaxRequest
): Promise<ApiResponse<EcoTaxResult>> => {
    const response = await apiClient.post("/api/ecotax/calculate", data);
    return response.data;
};
