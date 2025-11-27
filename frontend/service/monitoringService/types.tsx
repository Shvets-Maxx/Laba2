// src/types/monitoring.ts

export interface Location {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
}

export interface Metadata {
    data_source: string;
    created_at: string;
    updated_at: string;
    last_measurement: string;
}

export interface Station {
    _id: string;
    station_id: string;
    city_name: string;
    station_name: string;
    local_name: string;
    timezone: string;
    platform_name: string;
    status: "active" | "inactive" | "maintenance";
    measured_parameters: string[];
    createdAt: string;
    location: Location;
    metadata: Metadata;
}

export interface Pollutant {
    pollutant: string;
    value: number;
    unit: string;
    averaging_period: string;
    quality_flag: string;
}

export interface Measurement {
    _id: string;
    station_id: string;
    measurement_time: string;
    pollutants: Pollutant[];
    createdAt: string;
    updatedAt: string;
}

export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T[];
    pagination: PaginationInfo;
}
