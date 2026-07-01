import { useQuery } from "@tanstack/react-query";
import { fetchISSPosition } from "./iss";

export function useISSPosition() {
    return useQuery({
        queryKey: ["iss-position"],
        queryFn: fetchISSPosition,
        refetchInterval: 5000, // poll every 5 seconds
    });
}