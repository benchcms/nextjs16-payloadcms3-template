"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";

// TYPES

export type Testimonial = {
    id: string;
    /** Client name */
    client: string;
    /** Client's company (optional) */
    company?: string;
    /** Testimonial text */
    quote: string;
    photo?: {
        url: string;
        alt?: string;
    };
    /** Rating from 1-5 */
    rating?: number;
    /** ISO date string */
    date: string;
};

// PUBLIC API

/**
 * Get all testimonials
 */
export async function getTestimonials(limit = 20): Promise<Testimonial[]> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "testimonials",
        limit,
        sort: "-date",
        depth: 1,
    });

    return docs as unknown as Testimonial[];
}
