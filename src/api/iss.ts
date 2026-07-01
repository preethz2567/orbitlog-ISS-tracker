import axios from "axios";
import type { ISSPosition, AstronautsResponse } from "../types/iss";

export async function fetchISSPosition(): Promise<ISSPosition> {
    const response = await axios.get<ISSPosition>(
        "https://api.wheretheiss.at/v1/satellites/25544"
    );
    return response.data;
}

export async function fetchAstronauts(): Promise<AstronautsResponse> {
    const response = await axios.get<AstronautsResponse>(
        "http://api.open-notify.org/astros.json"
    );
    return response.data;
}