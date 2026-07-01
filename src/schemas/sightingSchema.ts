import { z } from "zod";

export const sightingSchema = z.object({
    location: z
        .string()
        .min(2, "Location must be at least 2 characters")
        .max(80, "Location is too long"),
    date: z
        .string()
        .min(1, "Date is required")
        .refine((val) => !isNaN(Date.parse(val)), "Enter a valid date"),
    note: z
        .string()
        .max(280, "Note must be 280 characters or fewer")
        .optional()
        .or(z.literal("")),
});

// infers the TS type directly from the schema above 
export type SightingFormValues = z.infer<typeof sightingSchema>;