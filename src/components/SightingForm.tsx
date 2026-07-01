import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sightingSchema, type SightingFormValues } from "../schemas/sightingSchema";
import { useSightingsStore } from "../store/sightingsStore";

export function SightingForm() {
    const addSighting = useSightingsStore((state) => state.addSighting);
    const sightings = useSightingsStore((state) => state.sightings);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<SightingFormValues>({
        resolver: zodResolver(sightingSchema),
        defaultValues: { location: "", date: "", note: "" },
    });

    function onSubmit(values: SightingFormValues) {
        addSighting(values);
        reset();
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="form-grid">
                <div>
                    <label htmlFor="location">Geographic Coordinates / City</label>
                    <input
                        id="location"
                        type="text"
                        placeholder="e.g. 40.7128° N, 74.0060° W or New York"
                        {...register("location")}
                        aria-invalid={errors.location ? "true" : "false"}
                        aria-describedby={errors.location ? "location-error" : undefined}
                    />
                    {errors.location && (
                        <p id="location-error" role="alert" className="error-text">
                            {errors.location.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="date">Temporal Log Date</label>
                    <input
                        id="date"
                        type="date"
                        {...register("date")}
                        aria-invalid={errors.date ? "true" : "false"}
                        aria-describedby={errors.date ? "date-error" : undefined}
                    />
                    {errors.date && (
                        <p id="date-error" role="alert" className="error-text">
                            {errors.date.message}
                        </p>
                    )}
                </div>

                <div className="form-field-full">
                    <label htmlFor="note">Supplemental Field Notes (Optional)</label>
                    <textarea
                        id="note"
                        placeholder="Detail the atmospheric conditions, brightness magnitude, or any anomalous observations..."
                        {...register("note")}
                        aria-invalid={errors.note ? "true" : "false"}
                        aria-describedby={errors.note ? "note-error" : undefined}
                    />
                    {errors.note && (
                        <p id="note-error" role="alert" className="error-text">
                            {errors.note.message}
                        </p>
                    )}
                </div>

                <div className="form-field-full">
                    <button type="submit">Log Sighting</button>
                    {isSubmitSuccessful && <p className="success-text" role="status">Sighting logged.</p>}
                </div>
            </form>

            <div className="sightings-table">
                <div className="sightings-table-header">
                    <span className="col-location">Location</span>
                    <span className="col-date">Date</span>
                    <span className="col-note">Note</span>
                </div>
                {sightings.length === 0 ? (
                    <p className="empty-state">No sightings logged yet.</p>
                ) : (
                    sightings.map((s) => (
                        <div className="sightings-table-row" key={s.id}>
                            <span className="col-location">{s.location}</span>
                            <span className="col-date">{s.date}</span>
                            <span className="col-note">{s.note || "—"}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}