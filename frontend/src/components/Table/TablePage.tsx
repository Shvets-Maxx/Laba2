// MonitoringTables.tsx (фінальна версія)

import React, { useState } from "react";
import style from "./TablePage.module.sass";

import {
    useStationsRoutes,
    useMeasurementsRoutes,
} from "../../../service/monitoringService/monitoringServiceHooks";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PaginationItem from "@mui/material/PaginationItem";
import type {
    Station,
    Measurement,
    PaginationInfo,
} from "../../../service/monitoringService/types";

const TablePaginationInfo: React.FC<{ info: PaginationInfo }> = ({ info }) => {
    const { page, limit, total } = info;
    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    return (
        <p>
            Showing {start}-{end} of {total} entries
        </p>
    );
};

function MonitoringTables() {
    const [stationsPage, setStationsPage] = useState(1);
    const [measurementsPage, setMeasurementsPage] = useState(1);

    const stationsQuery = useStationsRoutes(stationsPage);
    const measurementsQuery = useMeasurementsRoutes(measurementsPage);

    const stations = (stationsQuery.data?.data as Station[]) || [];
    const stationsPagination = stationsQuery.data?.pagination;
    const totalStationsPages = stationsPagination?.pages || 1;
    const totalStationsEntries = stationsPagination?.total || 0;

    const measurements = (measurementsQuery.data?.data as Measurement[]) || [];
    const measurementsPagination = measurementsQuery.data?.pagination;
    const totalMeasurementsPages = measurementsPagination?.pages || 1;
    const totalMeasurementsEntries = measurementsPagination?.total || 0;

    const handleStationsPageChange = (
        _e: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setStationsPage(value);
    };

    const handleMeasurementsPageChange = (
        _e: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setMeasurementsPage(value);
    };

    if (stationsQuery.isLoading || measurementsQuery.isLoading) {
        return <div>Loading data...</div>;
    }

    if (stationsQuery.isError || measurementsQuery.isError) {
        return (
            <div>
                Error loading data:{" "}
                {stationsQuery.error?.message ||
                    measurementsQuery.error?.message ||
                    "Unknown error"}
            </div>
        );
    }

    return (
        <div className={style.monitoringTables}>
            <div className={style.product}>
                <h2>📊 Станції моніторингу ({totalStationsEntries})</h2>
                {stationsQuery.isFetching && (
                    <div style={{ color: "blue" }}>Updating Stations...</div>
                )}

                <div style={{ overflowX: "scroll" }}>
                    <div style={{ minWidth: 780 }}>
                        <div className={style.product__header}>
                            <div style={{ width: "150px" }}>
                                <p>ID Станції</p>
                            </div>
                            <div style={{ width: "150px" }}>
                                <p>Місто</p>
                            </div>
                            <div style={{ width: "100%", maxWidth: "250px" }}>
                                <p>Назва Станції</p>
                            </div>
                            <div style={{ width: 100 }}>
                                <p>Статус</p>
                            </div>
                            <div style={{ width: 100 }}>
                                <p>Створено</p>
                            </div>
                        </div>
                        {stations.length > 0 ? (
                            stations.map((station, idx) => (
                                <div
                                    className={style.product__content}
                                    key={station._id || idx}
                                >
                                    <div style={{ width: "150px" }}>
                                        <p>{station.station_id}</p>
                                    </div>
                                    <div style={{ width: "150px" }}>
                                        <p>{station.city_name}</p>
                                    </div>
                                    <div
                                        style={{
                                            width: "100%",
                                            maxWidth: "250px",
                                        }}
                                    >
                                        <p>{station.station_name}</p>
                                    </div>
                                    <div style={{ width: 100 }}>
                                        <span
                                            style={{
                                                color:
                                                    station.status === "active"
                                                        ? "#49AB3A"
                                                        : "#EF4D56",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {station.status
                                                .charAt(0)
                                                .toUpperCase() +
                                                station.status.slice(1)}
                                        </span>
                                    </div>
                                    <div style={{ width: 100 }}>
                                        {new Date(
                                            station.createdAt
                                        ).toLocaleDateString("uk-UA")}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div
                                className={style.product__content}
                                style={{ textAlign: "center", padding: "20px" }}
                            >
                                <p>Станції не знайдено.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className={style.pagination}>
                    <div className={style.pagination__block}>
                        {stationsPagination && (
                            <TablePaginationInfo info={stationsPagination} />
                        )}
                        <Stack spacing={2}>
                            <Pagination
                                count={totalStationsPages}
                                page={stationsPage}
                                onChange={handleStationsPageChange}
                                siblingCount={1}
                                boundaryCount={1}
                                renderItem={(item) => (
                                    <PaginationItem
                                        slots={{
                                            previous: ArrowBackIosNewIcon,
                                            next: ArrowForwardIosIcon,
                                        }}
                                        {...item}
                                    />
                                )}
                            />
                        </Stack>
                    </div>
                </div>
            </div>

            <div className={`${style.product} ${style.mt_4}`}>
                <h2>📈 Останні вимірювання ({totalMeasurementsEntries})</h2>
                {measurementsQuery.isFetching && (
                    <div style={{ color: "blue" }}>
                        Updating Measurements...
                    </div>
                )}
                <div style={{ overflowX: "scroll" }}>
                    <div style={{ minWidth: 780 }}>
                        <div className={style.product__header}>
                            <div style={{ width: "150px" }}>
                                <p>ID Станції</p>
                            </div>
                            <div style={{ width: "180px" }}>
                                <p>Час Вимірювання</p>
                            </div>
                            <div style={{ width: "100px" }}>
                                <p>Забруднювач</p>
                            </div>
                            <div style={{ width: "100px" }}>
                                <p>Значення</p>
                            </div>
                            <div style={{ width: "100px" }}>
                                <p>Одиниця</p>
                            </div>
                        </div>

                        {measurements.length > 0 ? (
                            measurements.map((measurement, idx) => (
                                <div
                                    className={style.product__content}
                                    key={measurement._id || idx}
                                >
                                    <div style={{ width: "150px" }}>
                                        <p>{measurement.station_id}</p>
                                    </div>
                                    <div style={{ width: "180px" }}>
                                        {new Date(
                                            measurement.measurement_time
                                        ).toLocaleTimeString("uk-UA", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                    {measurement.pollutants[0] ? (
                                        <>
                                            <div style={{ width: "100px" }}>
                                                <p>
                                                    {
                                                        measurement
                                                            .pollutants[0]
                                                            .pollutant
                                                    }
                                                </p>
                                            </div>
                                            <div style={{ width: "100px" }}>
                                                <p>
                                                    {measurement.pollutants[0].value.toFixed(
                                                        2
                                                    )}
                                                </p>
                                            </div>
                                            <div style={{ width: "100px" }}>
                                                <p>
                                                    {
                                                        measurement
                                                            .pollutants[0].unit
                                                    }
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <div style={{ width: "300px" }}>
                                            <p>Немає даних про забруднювачі</p>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div
                                className={style.product__content}
                                style={{ textAlign: "center", padding: "20px" }}
                            >
                                <p>Вимірювання не знайдено.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className={style.pagination}>
                    <div className={style.pagination__block}>
                        {measurementsPagination && (
                            <TablePaginationInfo
                                info={measurementsPagination}
                            />
                        )}
                        <Stack spacing={2}>
                            <Pagination
                                count={totalMeasurementsPages}
                                page={measurementsPage}
                                onChange={handleMeasurementsPageChange}
                                siblingCount={1}
                                boundaryCount={1}
                                renderItem={(item) => (
                                    <PaginationItem
                                        slots={{
                                            previous: ArrowBackIosNewIcon,
                                            next: ArrowForwardIosIcon,
                                        }}
                                        {...item}
                                    />
                                )}
                            />
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MonitoringTables;
