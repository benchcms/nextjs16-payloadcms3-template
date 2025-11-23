"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";

// TYPES

/**
 * Opening hours for each day of the week
 * Times are in HH:MM format (e.g., "09:00", "17:30")
 */
export type OpeningHours = {
    monday?: { isOpen: boolean; openTime?: string; closeTime?: string };
    tuesday?: { isOpen: boolean; openTime?: string; closeTime?: string };
    wednesday?: { isOpen: boolean; openTime?: string; closeTime?: string };
    thursday?: { isOpen: boolean; openTime?: string; closeTime?: string };
    friday?: { isOpen: boolean; openTime?: string; closeTime?: string };
    saturday?: { isOpen: boolean; openTime?: string; closeTime?: string };
    sunday?: { isOpen: boolean; openTime?: string; closeTime?: string };
};

// PUBLIC API

/**
 * Get opening hours for all days of the week
 */
export async function getOpeningHours(): Promise<OpeningHours> {
    const payload = await getPayload({ config: configPromise });

    const data = await payload.findGlobal({
        slug: "opening-hours",
    });

    return data as unknown as OpeningHours;
}
