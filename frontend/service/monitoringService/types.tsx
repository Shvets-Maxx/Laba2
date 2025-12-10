export interface PollutantValue {
    pollutant: string;
    value: number;
    unit: string;
    averaging_period?: string;
    quality_flag?: string;
}

export interface Station {
    _id: string;
    station_id: string;
    city_name: string;
    station_name: string;
    local_name?: string;
    timezone?: string;
    platform_name?: string;

    location?: {
        type: string;
        coordinates: number[];
    };

    status: "active" | "inactive";

    last_measurement_at?: string;

    createdAt: string;
    updatedAt?: string;
}

export interface Measurement {
    _id: string;
    station_id: string;
    measurement_time: string;
    pollutants: PollutantValue[];

    metadata?: {
        source?: string;
        client_ip?: string;
        original_data?: any;
    };
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
    pagination?: PaginationInfo;
    error?: string;
}

export interface EcoTaxRequest {
    pollutant: string;
    object_type: string;
    Mi: number;
    Rate: number;
    K_time: number;
    K_terr: number;
    K_benefit: number;
}

export interface EcoTaxResult {
    _id: string;
    pollutant: string;
    result_tax: number;
    createdAt: string;
}
