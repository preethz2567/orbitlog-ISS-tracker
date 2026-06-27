import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAstronauts } from "../api/useAstronauts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

ChartJS.defaults.color = "#737373";
ChartJS.defaults.borderColor = "#1f1f1f";

export function AstronautsChart() {
    const { data, isLoading, isError, error } = useAstronauts();

    if (isLoading) {
        return <p role="status">Loading astronaut data…</p>;
    }

    if (isError) {
        return (
            <p role="alert" style={{ color: "#dc2626" }}>
                Couldn't load astronaut data: {error instanceof Error ? error.message : "Unknown error"}
            </p>
        );
    }

    if (!data) {
        return null;
    }

    const counts = data.people.reduce<Record<string, number>>((acc, person) => {
        acc[person.craft] = (acc[person.craft] ?? 0) + 1;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(counts),
        datasets: [
            {
                label: "Astronauts currently in space",
                data: Object.values(counts),
                backgroundColor: "rgba(37, 99, 235, 0.75)",
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1 },
            },
        },
    };

    return (
        <div style={{ height: "280px" }}>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}