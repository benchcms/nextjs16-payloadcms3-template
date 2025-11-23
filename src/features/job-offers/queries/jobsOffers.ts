"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";

// TYPES

export type JobOffer = {
    id: string;
    title: string;
    location: string;
    /** Rich text job description (HTML) */
    description: string;
    /** Rich text requirements (HTML) */
    requirements: string;
    /** URL to apply for the job */
    applicationLink?: string;
    /** Whether the job is currently open */
    active: boolean;
    /** ISO date string */
    postedDate: string;
};

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

    return docs as unknown as JobOffer[];
}

/**
 * Get all job offers (including inactive)
 */
export async function getAllJobOffers(): Promise<JobOffer[]> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "job-offers",
        sort: "-postedDate",
        depth: 1,
    });

    return docs as unknown as JobOffer[];
}
