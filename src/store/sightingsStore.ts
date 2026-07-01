import { create } from "zustand";
import type { Sighting } from "../types/iss";

interface SightingsState {
    sightings: Sighting[];
    addSighting: (sighting: Omit<Sighting, "id">) => void;
}

export const useSightingsStore = create<SightingsState>((set) => ({
    sightings: [],
    addSighting: (sighting) =>
        set((state) => ({
            sightings: [
                { ...sighting, id: crypto.randomUUID() },
                ...state.sightings,
            ],
        })),
}));