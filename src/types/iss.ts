//api.wheretheiss.at/v1/satellites/25544

// this is the raw shape returned
export interface ISSPosition {
    name: string;
    id: number;
    latitude: number;
    longitude: number;
    altitude: number;
    velocity: number;
    visibility: string;
    timestamp: number;
}

// Single point in local history(this is for line chart))
export interface ISSHistoryPoint {

    time: string; // formatted HH:MM:SS for the chart x-axis
    altitude: number;
    velocity: number;
}

//api.open-notify.org/astros.json
//raw shape returned
export interface AstronautsResponse {
    number: number;
    people: { name: string; craft: string }[];
    message: string;
}

// A sighting log entry the user adds via the form
export interface Sighting {
    id: string;
    location: string;
    date: string;
    note?: string;
}