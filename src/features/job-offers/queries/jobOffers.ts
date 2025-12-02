"use server";

import { getPayload } from "payload";
import type { PaginatedDocs } from "payload";
import configPromise from "@/src/payload.config";
import type { JobOffer } from "@/src/payload-types";

// PUBLIC API

/**
 * Get all active job offers with pagination
 */
export async function getActiveJobOffers(options?: {
    limit?: number;
    page?: number;
    sort?: string;
}): Promise<PaginatedDocs<JobOffer>> {
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
        collection: "job-offers",
        limit: options?.limit || 20,
        page: options?.page || 1,
        where: {
            active: {
                equals: true,
            },
        },
        sort: options?.sort ?? "-postedDate",
        depth: 1,
    });

    return result;
}

/**
 * Get all job offers (including inactive) with pagination
 */
export async function getJobOffers(options?: {
    limit?: number;
    page?: number;
    sort?: string;
}): Promise<PaginatedDocs<JobOffer>> {
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
        collection: "job-offers",
        limit: options?.limit || 20,
        page: options?.page || 1,
        sort: options?.sort ?? "-postedDate",
        depth: 1,
    });

    return result;
}

/**
 * Get a single job offer by slug
 */
export async function getJobOffer(slug: string): Promise<JobOffer | null> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "job-offers",
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
