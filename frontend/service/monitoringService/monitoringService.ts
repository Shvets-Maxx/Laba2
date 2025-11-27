// monitoringService.ts

import { apiClient } from "../api/apiClient";
import type { Station, Measurement, ApiResponse } from "./types"; // Припустимо, що типи знаходяться тут
// Припустимо, що типи знаходяться тут

// Встановлюємо ліміт за замовчуванням
const ROWS_PER_PAGE = 5;

// Запит для станцій
export const stationsRoutes = async (
    page: number
): Promise<ApiResponse<Station>> => {
    // Передаємо page та limit як параметри запиту
    const response = await apiClient.get<ApiResponse<Station>>(
        `/api/stations?page=${page}&limit=${ROWS_PER_PAGE}`
    );
    return response.data;
};

// Запит для вимірювань
export const measurementsRoutes = async (
    page: number
): Promise<ApiResponse<Measurement>> => {
    // Передаємо page та limit як параметри запиту
    const response = await apiClient.get<ApiResponse<Measurement>>(
        `/api/measurements?page=${page}&limit=${ROWS_PER_PAGE}`
    );
    return response.data;
};
