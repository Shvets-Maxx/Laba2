import React, { useState } from "react";
import style from "./TablePage.module.sass";

import {
    useStationsRoutes,
    useMeasurementsRoutes,
    useSyncSaveEcoBot,
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
import { useNavigate } from "react-router-dom";

const TablePaginationInfo: React.FC<{ info: PaginationInfo }> = ({ info }) => {
    const { page, limit, total } = info;
    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);
    return (
        <p>
            Показано {start}-{end} з {total} записів
        </p>
    );
};

function MonitoringTables() {
    const [stationsPage, setStationsPage] = useState(1);
    const [measurementsPage, setMeasurementsPage] = useState(1);

    const [stationSearch, setStationSearch] = useState("");
    const [stationQuery, setStationQuery] = useState("");

    const [measurementSearch, setMeasurementSearch] = useState("");
    const [measurementQuery, setMeasurementQuery] = useState("");

    const naviagte = useNavigate();

    const stationsQuery = useStationsRoutes(stationsPage, stationQuery);
    const measurementsQuery = useMeasurementsRoutes(
        measurementsPage,
        measurementQuery
    );

    const { mutate: syncSaveEcoBot, isPending: isSyncing } =
        useSyncSaveEcoBot();

    const stations = (stationsQuery.data?.data as Station[]) || [];
    const stationsPagination = stationsQuery.data?.pagination;
    const totalStationsPages = stationsPagination?.pages || 1;
    const totalStationsEntries = stationsPagination?.total || 0;

    const measurements = (measurementsQuery.data?.data as Measurement[]) || [];
    const measurementsPagination = measurementsQuery.data?.pagination;
    const totalMeasurementsPages = measurementsPagination?.pages || 1;
    const totalMeasurementsEntries = measurementsPagination?.total || 0;

    const handleStationSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setStationQuery(stationSearch);
            setStationsPage(1);
        }
    };

    const handleMeasurementSearch = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            setMeasurementQuery(measurementSearch);
            setMeasurementsPage(1);
        }
    };

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
        return <div style={{ padding: 20 }}>Завантаження даних...</div>;
    }

    if (stationsQuery.isError || measurementsQuery.isError) {
        return (
            <div style={{ padding: 20, color: "red" }}>
                Помилка завантаження даних.
            </div>
        );
    }

    return (
        <div className={style["monitoring-page"]}>
            <div className={style["monitoring-page__header"]}>
                <h1 className={style["monitoring-page__title"]}>
                    Моніторинг Якості Повітря
                </h1>
                <div>
                    <button
                        onClick={() => syncSaveEcoBot()}
                        disabled={isSyncing}
                        className={style["monitoring-page__btn"]}
                        style={{ marginRight: " 16px", background: "grey" }}
                    >
                        {isSyncing
                            ? "Синхронізація..."
                            : "Синхронізувати SaveEcoBot"}
                    </button>
                    <button
                        onClick={() => naviagte("/ecotax")}
                        disabled={isSyncing}
                        className={style["monitoring-page__btn"]}
                    >
                        Калькулятор
                    </button>
                </div>
            </div>

            <div className={style["table-section"]}>
                <div className={style["table-section__header"]}>
                    <h2 className={style["table-section__title"]}>
                        Станції моніторингу ({totalStationsEntries})
                    </h2>

                    <div className={style["table-section__controls"]}>
                        <input
                            type="text"
                            placeholder="Пошук по місту (Enter)..."
                            className={style["table-section__search-input"]}
                            value={stationSearch}
                            onChange={(e) => setStationSearch(e.target.value)}
                            onKeyDown={handleStationSearch}
                        />
                        {stationQuery && (
                            <button
                                className={style["table-section__clear-btn"]}
                                onClick={() => {
                                    setStationSearch("");
                                    setStationQuery("");
                                    setStationsPage(1);
                                }}
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                <div className={style["data-table"]}>
                    <div className={style["data-table__inner"]}>
                        <div className={style["data-table__header"]}>
                            <div
                                className={`${style["data-table__cell"]} ${style["data-table__cell--w120"]}`}
                            >
                                ID
                            </div>
                            <div
                                className={`${style["data-table__cell"]} ${style["data-table__cell--w120"]}`}
                            >
                                Місто
                            </div>
                            <div
                                className={`${style["data-table__cell"]} ${style["data-table__cell--w200"]}`}
                            >
                                Назва
                            </div>
                            <div
                                className={`${style["data-table__cell"]} ${style["data-table__cell--w100"]}`}
                            >
                                Платформа
                            </div>
                            <div
                                className={`${style["data-table__cell"]} ${style["data-table__cell--w150"]}`}
                            >
                                Координати
                            </div>
                            <div
                                className={`${style["data-table__cell"]} ${style["data-table__cell--w100"]}`}
                            >
                                Статус
                            </div>
                            <div
                                className={`${style["data-table__cell"]} ${style["data-table__cell--w100"]}`}
                            >
                                Створено
                            </div>
                        </div>

                        {stations.length > 0 ? (
                            stations.map((station) => (
                                <div
                                    className={style["data-table__row"]}
                                    key={station._id || station.station_id}
                                >
                                    <div
                                        className={`${style["data-table__cell"]} ${style["data-table__cell--w120"]}`}
                                        title={station.station_id}
                                    >
                                        {station.station_id}
                                    </div>
                                    <div
                                        className={`${style["data-table__cell"]} ${style["data-table__cell--w120"]}`}
                                    >
                                        {station.city_name}
                                    </div>
                                    <div
                                        className={`${style["data-table__cell"]} ${style["data-table__cell--w200"]}`}
                                    >
                                        {station.station_name}
                                    </div>
                                    <div
                                        className={`${style["data-table__cell"]} ${style["data-table__cell--w100"]}`}
                                    >
                                        {station.platform_name || "-"}
                                    </div>
                                    <div
                                        className={`${style["data-table__cell"]} ${style["data-table__cell--w150"]} ${style["data-table__cell--text-sm"]}`}
                                    >
                                        {station.location?.coordinates
                                            ? `${station.location.coordinates[1].toFixed(
                                                  4
                                              )}, ${station.location.coordinates[0].toFixed(
                                                  4
                                              )}`
                                            : "N/A"}
                                    </div>
                                    <div
                                        className={`${style["data-table__cell"]} ${style["data-table__cell--w100"]}`}
                                    >
                                        <span
                                            className={`${
                                                style["data-table__status"]
                                            } ${
                                                style[
                                                    `data-table__status--${station.status}`
                                                ]
                                            }`}
                                        >
                                            {station.status === "active"
                                                ? "Активна"
                                                : "Неактивна"}
                                        </span>
                                    </div>
                                    <div
                                        className={`${style["data-table__cell"]} ${style["data-table__cell--w100"]} ${style["data-table__cell--text-sm"]}`}
                                    >
                                        {new Date(
                                            station.createdAt
                                        ).toLocaleDateString("uk-UA")}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={style["data-table__empty"]}>
                                <p>Станції не знайдено.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className={style["table-section__pagination"]}>
                    <div className={style["table-section__pagination-wrapper"]}>
                        {stationsPagination && (
                            <div
                                className={
                                    style["table-section__pagination-info"]
                                }
                            >
                                <TablePaginationInfo
                                    info={stationsPagination}
                                />
                            </div>
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

            <div className={style["table-section"]}>
                <div className={style["table-section__header"]}>
                    <h2 className={style["table-section__title"]}>
                        Останні вимірювання ({totalMeasurementsEntries})
                    </h2>
                    <div className={style["table-section__controls"]}>
                        <input
                            type="text"
                            placeholder="Пошук по ID станції (Enter)..."
                            className={style["table-section__search-input"]}
                            value={measurementSearch}
                            onChange={(e) =>
                                setMeasurementSearch(e.target.value)
                            }
                            onKeyDown={handleMeasurementSearch}
                        />
                        {measurementQuery && (
                            <button
                                className={style["table-section__clear-btn"]}
                                onClick={() => {
                                    setMeasurementSearch("");
                                    setMeasurementQuery("");
                                    setMeasurementsPage(1);
                                }}
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                <div className={style["data-table"]}>
                    <div className={style["data-table__inner"]}>
                        <div className={style["data-table__header"]}>
                            <div
                                className={`${style["data-table__cell"]} ${style["data-table__cell--w120"]}`}
                            >
                                ID Станції
                            </div>
                            <div
                                className={`${style["data-table__cell"]} ${style["data-table__cell--w150"]}`}
                            >
                                Час
                            </div>
                            <div
                                className={`${style["data-table__cell"]} ${style["data-table__cell--w300"]}`}
                            >
                                Показники
                            </div>
                            <div
                                className={`${style["data-table__cell"]} ${style["data-table__cell--w100"]}`}
                            >
                                Джерело
                            </div>
                            <div
                                className={`${style["data-table__cell"]} ${style["data-table__cell--w200"]}`}
                            >
                                ID Запису
                            </div>
                        </div>

                        {measurements.length > 0 ? (
                            measurements.map((measurement) => (
                                <div
                                    className={style["data-table__row"]}
                                    key={measurement._id}
                                >
                                    <div
                                        className={`${style["data-table__cell"]} ${style["data-table__cell--w120"]}`}
                                    >
                                        {measurement.station_id}
                                    </div>
                                    <div
                                        className={`${style["data-table__cell"]} ${style["data-table__cell--w150"]} ${style["data-table__cell--text-sm"]}`}
                                    >
                                        {new Date(
                                            measurement.measurement_time
                                        ).toLocaleString("uk-UA")}
                                    </div>
                                    <div
                                        className={`${style["data-table__cell"]} ${style["data-table__cell--w300"]}`}
                                    >
                                        <div
                                            className={
                                                style["data-table__tags-list"]
                                            }
                                        >
                                            {measurement.pollutants &&
                                            measurement.pollutants.length >
                                                0 ? (
                                                measurement.pollutants.map(
                                                    (p, idx) => (
                                                        <span
                                                            key={idx}
                                                            className={
                                                                style[
                                                                    "data-table__tag"
                                                                ]
                                                            }
                                                        >
                                                            <b>
                                                                {p.pollutant}:
                                                            </b>{" "}
                                                            {p.value.toFixed(1)}{" "}
                                                            {p.unit}
                                                        </span>
                                                    )
                                                )
                                            ) : (
                                                <span
                                                    className={`${style["data-table__cell--text-muted"]} ${style["data-table__cell--text-sm"]}`}
                                                >
                                                    Дані відсутні
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className={`${style["data-table__cell"]} ${style["data-table__cell--w100"]}`}
                                    >
                                        <span
                                            className={`${
                                                style[
                                                    "data-table__source-badge"
                                                ]
                                            } ${
                                                style[
                                                    `data-table__source-badge--${
                                                        measurement.metadata
                                                            ?.source ===
                                                        "SaveEcoBot"
                                                            ? "eco"
                                                            : "manual"
                                                    }`
                                                ]
                                            }`}
                                        >
                                            {measurement.metadata?.source ||
                                                "manual"}
                                        </span>
                                    </div>
                                    <div
                                        className={`${style["data-table__cell"]} ${style["data-table__cell--w200"]} ${style["data-table__cell--text-sm"]} ${style["data-table__cell--text-light"]}`}
                                    >
                                        {measurement._id}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={style["data-table__empty"]}>
                                <p>Вимірювання не знайдено.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className={style["table-section__pagination"]}>
                    <div className={style["table-section__pagination-wrapper"]}>
                        {measurementsPagination && (
                            <div
                                className={
                                    style["table-section__pagination-info"]
                                }
                            >
                                <TablePaginationInfo
                                    info={measurementsPagination}
                                />
                            </div>
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
