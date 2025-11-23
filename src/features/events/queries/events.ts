"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";

// TYPES

export type Event = {
    id: string;
    title: string;
    /** Rich text description (HTML) */
    description: string;
    /** Physical location (required) */
    location: string;
    image?: {
        url: string;
        alt?: string;
    };
    /** ISO date string - event start */
    date: string;
    /** ISO date string - event end (optional) */
    endDate?: string;
    /** URL for virtual attendance */
    virtualLink?: string;
    /** URL for registration */
    registrationLink?: string;
};

// PUBLIC API

/**
 * Get upcoming events
 */
export async function getUpcomingEvents(limit = 10): Promise<Event[]> {
    const payload = await getPayload({ config: configPromise });

    const now = new Date().toISOString();

    const { docs } = await payload.find({
        collection: "events",
        where: {
            date: {
                greater_than_equal: now,
            },
        },
        limit,
        sort: "date",
        depth: 1,
    });

    return docs as unknown as Event[];
}

/**
 * Get all events (past and future)
 */
export async function getAllEvents(limit = 50): Promise<Event[]> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "events",
        limit,
        sort: "-date",
        depth: 1,
    });

    return docs as unknown as Event[];
}
