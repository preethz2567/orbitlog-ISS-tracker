import { AltitudeChart } from "./components/AltitudeChart";
import { AstronautsChart } from "./components/AstronautsChart";
import { SightingForm } from "./components/SightingForm";
import { useISSPosition } from "./api/useISSPosition";
import { useAstronauts } from "./api/useAstronauts";
import "./App.css";

function App() {
    const { data: position } = useISSPosition();
    const { data: astronauts } = useAstronauts();

    return (
        <div className="app-container">
            <div className="topbar">
                <div className="topbar-left">
                    <h1>Orbit Log</h1>
                    <div className="topbar-desc">
                        <p>REAL-TIME ORBITAL TELEMETRY & TRACKING SYSTEM</p>
                        <p>MONITORING ISS TRAJECTORY AND CURRENT CREW MANIFEST</p>
                        <p>AWAITING VISUAL CONFIRMATION LOGS FROM TERRESTRIAL OBSERVERS</p>
                    </div>
                </div>
                <div className="status-pill">
                    <span className="status-dot" />
                    LIVE
                </div>
            </div>

            <div className="stat-strip">
                <div className="stat">
                    <div className="stat-label">Altitude</div>
                    <div className="stat-value accent">
                        {position ? `${Math.round(position.altitude)} km` : "—"}
                    </div>
                </div>
                <div className="stat">
                    <div className="stat-label">Velocity</div>
                    <div className="stat-value">
                        {position ? `${Math.round(position.velocity).toLocaleString()} km/h` : "—"}
                    </div>
                </div>
                <div className="stat">
                    <div className="stat-label">Visibility</div>
                    <div className="stat-value">
                        {position ? position.visibility : "—"}
                    </div>
                </div>
                <div className="stat">
                    <div className="stat-label">Crew in Orbit</div>
                    <div className="stat-value">
                        {astronauts ? astronauts.number : "—"}
                    </div>
                </div>
            </div>

            <main className="dashboard-grid">
                <section className="card">
                    <div className="card-header">
                        <h2>Altitude &amp; Velocity</h2>
                        <span className="tech-subtext">TELEMETRY DATA // SYS.ONLINE</span>
                    </div>
                    <AltitudeChart />
                </section>

                <section className="card">
                    <div className="card-header">
                        <h2>Crew Manifest</h2>
                        <span className="tech-subtext">PERSONNEL OVERVIEW // ORBITAL</span>
                    </div>
                    <AstronautsChart />
                </section>

                <section className="card form-card">
                    <div className="card-header">
                        <h2>Observation Log</h2>
                        <span className="tech-subtext">VISUAL CONFIRMATION // AWAITING INPUT</span>
                    </div>
                    <SightingForm />
                </section>
            </main>
        </div>
    );
}

export default App;