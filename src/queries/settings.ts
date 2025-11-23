"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";

// TYPES

export type Settings = {
    /** Contact information */
    contact?: {
        email?: string;
        phone?: string;
        /** Full address */
        address?: string;
    };
    /** Social media URLs */
    socials?: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
        twitter?: string;
    };
    /** Google Analytics Measurement ID */
    googleAnalyticsId?: string;
};

// PUBLIC API

/**
 * Get application settings (contact info, socials, analytics)
 */
export async function getSettings(): Promise<Settings> {
    const payload = await getPayload({ config: configPromise });

    const settings = await payload.findGlobal({
        slug: "settings",
    });

    return settings as unknown as Settings;
}
