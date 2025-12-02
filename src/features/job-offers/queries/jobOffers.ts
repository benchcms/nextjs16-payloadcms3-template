"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import type { JobOffer } from "@/src/payload-types";

// PUBLIC API

/**
 * Get all active job offers
 */
export async function getActiveJobOffers(): Promise<JobOffer[]> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "job-offers",
        where: {
            active: {
                equals: true,
            },
        },
        sort: "-postedDate",
        depth: 1,
    });

    return docs;
}

/**
 * Get all job offers (including inactive)
 */
export async function getJobOffers(): Promise<JobOffer[]> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "job-offers",
        sort: "-postedDate",
        depth: 1,
    });

    return docs;
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
