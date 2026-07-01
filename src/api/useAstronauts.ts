import { useQuery } from "@tanstack/react-query";
import { fetchAstronauts } from "./iss";

export function useAstronauts() {
    return useQuery({
        queryKey: ["astronauts"],
        queryFn: fetchAstronauts,
    });
}