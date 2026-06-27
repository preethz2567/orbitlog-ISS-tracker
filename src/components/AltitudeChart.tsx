import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useISSPosition } from "../api/useISSPosition";
import type { ISSHistoryPoint } from "../types/iss";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

ChartJS.defaults.color = "#737373";
ChartJS.defaults.borderColor = "#1f1f1f";

const MAX_HISTORY_POINTS = 20;

export function AltitudeChart() {
    const { data, isLoading, isError, error } = useISSPosition();
    const [history, setHistory] = useState<ISSHistoryPoint[]>([]);

    useEffect(() => {
        if (!data) return;

        const point: ISSHistoryPoint = {
            time: new Date(data.timestamp * 1000).toLocaleTimeString(),
            altitude: Math.round(data.altitude),
            velocity: Math.round(data.velocity),
        };

        setHistory((prev) => {
            const next = [...prev, point];
            return next.length > MAX_HISTORY_POINTS
                ? next.slice(next.length - MAX_HISTORY_POINTS)
                : next;
        });
    }, [data]);

    if (isLoading && history.length === 0) {
        return <p role="status">Loading ISS position…</p>;
    }

    if (isError) {
        return (
            <p role="alert" style={{ color: "#dc2626" }}>
                Couldn't reach the ISS tracker: {error instanceof Error ? error.message : "Unknown error"}
            </p>
        );
    }

    const chartData = {
        labels: history.map((p) => p.time),
        datasets: [
            {
                label: "Altitude (km)",
                data: history.map((p) => p.altitude),
                borderColor: "#2563eb",
                backgroundColor: "rgba(37, 99, 235, 0.15)",
                tension: 0.3,
            },
            {
                label: "Velocity (km/h)",
                data: history.map((p) => p.velocity),
                borderColor: "#a3a3a3",
                backgroundColor: "rgba(163, 163, 163, 0.12)",
                tension: 0.3,
                yAxisID: "y1",
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                type: "linear" as const,
                position: "left" as const,
                title: { display: true, text: "Altitude (km)" },
            },
            y1: {
                type: "linear" as const,
                position: "right" as const,
                title: { display: true, text: "Velocity (km/h)" },
                grid: { drawOnChartArea: false },
            },
        },
    };

    return (
        <div style={{ height: "280px" }}>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}