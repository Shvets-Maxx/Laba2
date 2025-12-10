import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { calculateEcoTax } from "../../../service/monitoringService/monitoringService";
import style from "../Table/TablePage.module.sass";

const EcoTaxPage = () => {
    const [formData, setFormData] = useState({
        pollutant: "CO2",
        object_type: "Стаціонарне",
        Mi: 100,
        Rate: 10,
        K_time: 1,
        K_terr: 1,
        K_benefit: 1,
    });

    const [result, setResult] = useState<any>(null);

    const mutation = useMutation({
        mutationFn: calculateEcoTax,
        onSuccess: (data) => {
            setResult(data.data);
        },
        onError: (error) => {
            alert("Помилка: " + error.message);
        },
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.type === "number"
                    ? Number(e.target.value)
                    : e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    const generateData = () => {
        const pollutants = ["CO2", "NOx", "SO2", "PM10"];
        setFormData({
            pollutant:
                pollutants[Math.floor(Math.random() * pollutants.length)],
            object_type: Math.random() > 0.5 ? "Стаціонарне" : "Пересувне",
            Mi: Number((Math.random() * 500).toFixed(2)),
            Rate: Number((Math.random() * 5000 + 10).toFixed(2)),
            K_time: Number((Math.random() * 3).toFixed(2)),
            K_terr: Number((Math.random() * 3).toFixed(2)),
            K_benefit: Math.random() > 0.8 ? 0.5 : 1,
        });
    };

    return (
        <div className={style["monitoring-page"]} style={{ padding: "20px" }}>
            <h1>Калькулятор Екологічного Податку (В3)</h1>

            <div
                style={{
                    display: "flex",
                    gap: "40px",
                    marginTop: "20px",
                    flexWrap: "wrap",
                }}
            >
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        width: "350px",
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label>Забруднювач:</label>
                        <input
                            className={style["table-section__search-input"]}
                            style={{ width: "100%" }}
                            name="pollutant"
                            value={formData.pollutant}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label>Маса викидів (Mi), тонн:</label>
                        <input
                            className={style["table-section__search-input"]}
                            style={{ width: "100%" }}
                            type="number"
                            step="0.01"
                            name="Mi"
                            value={formData.Mi}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label>Ставка податку (Rate), грн/т:</label>
                        <input
                            className={style["table-section__search-input"]}
                            style={{ width: "100%" }}
                            type="number"
                            step="0.01"
                            name="Rate"
                            value={formData.Rate}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <div style={{ flex: 1 }}>
                            <label>K(час):</label>
                            <input
                                className={style["table-section__search-input"]}
                                style={{ width: "100%" }}
                                type="number"
                                step="0.1"
                                name="K_time"
                                value={formData.K_time}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>K(тер):</label>
                            <input
                                className={style["table-section__search-input"]}
                                style={{ width: "100%" }}
                                type="number"
                                step="0.1"
                                name="K_terr"
                                value={formData.K_terr}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label>Коефіцієнт пільги (K пільга):</label>
                        <input
                            className={style["table-section__search-input"]}
                            style={{ width: "100%" }}
                            type="number"
                            step="0.1"
                            name="K_benefit"
                            value={formData.K_benefit}
                            onChange={handleChange}
                        />
                    </div>

                    <div
                        style={{
                            marginTop: "10px",
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <button
                            type="button"
                            onClick={generateData}
                            className={style["monitoring-page__btn"]}
                            style={{ background: "#6c757d", width: "100%" }}
                        >
                            Gener. Data
                        </button>
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className={style["monitoring-page__btn"]}
                            style={{ width: "100%" }}
                        >
                            Розрахувати
                        </button>
                    </div>
                </form>

                <div
                    style={{
                        flex: 1,
                        minWidth: "300px",
                        padding: "30px",
                        background: "#f8f9fa",
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                >
                    <h2 style={{ marginTop: 0 }}>Результат розрахунку</h2>
                    {mutation.isPending && <p>Виконується розрахунок...</p>}

                    {result ? (
                        <div>
                            <div
                                style={{
                                    fontSize: "1.2em",
                                    marginBottom: "10px",
                                }}
                            >
                                Речовина: <b>{result.pollutant}</b>
                            </div>
                            <div
                                style={{
                                    fontSize: "3em",
                                    color: "#49AB3A",
                                    fontWeight: "bold",
                                }}
                            >
                                {result.result_tax.toFixed(2)}{" "}
                                <span
                                    style={{ fontSize: "0.4em", color: "#666" }}
                                >
                                    грн
                                </span>
                            </div>
                            <hr
                                style={{
                                    margin: "20px 0",
                                    border: "0",
                                    borderTop: "1px solid #ddd",
                                }}
                            />
                            <p style={{ color: "#666", fontSize: "0.9em" }}>
                                ID запису: {result._id}
                                <br />
                                Дата:{" "}
                                {new Date(result.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ) : (
                        <p style={{ color: "#888" }}>
                            Введіть дані ліворуч або натисніть "Gener. Data" для
                            швидкого тесту.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EcoTaxPage;
