"use server";

import { getPayload } from "payload";
import type { PaginatedDocs } from "payload";
import configPromise from "@/src/payload.config";
import type { Event } from "@/src/payload-types";

// PUBLIC API

/**
 * Get upcoming events
 */
export async function getUpcomingEvents(options?: {
    limit?: number;
    sort?: string;
}): Promise<Event[]> {
    const payload = await getPayload({ config: configPromise });

    const now = new Date().toISOString();

    const { docs } = await payload.find({
        collection: "events",
        where: {
            date: {
                greater_than_equal: now,
            },
        },
        limit: options?.limit ?? 10,
        sort: options?.sort ?? "date",
        depth: 1,
    });

    return docs;
}

/**
 * Get all events (past and future) with optional pagination
 */
export async function getEvents(options?: {
    limit?: number;
    page?: number;
    sort?: string;
}): Promise<PaginatedDocs<Event>> {
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
        collection: "events",
        limit: options?.limit || 50,
        page: options?.page || 1,
        sort: options?.sort ?? "-date",
        depth: 1,
    });

    return result;
}

/**
 * Get a single event by slug
 */
export async function getEvent(slug: string): Promise<Event | null> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "events",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
        depth: 1,
    });

    return docs[0] || null;
}
