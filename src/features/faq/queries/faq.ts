"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";

// TYPES

export type FAQItem = {
    question: string;
    /** Rich text answer (HTML) */
    answer: string;
};

export type FAQGroup = {
    id: string;
    name: string;
    slug: string;
    order: number;
    items: FAQItem[];
};

// PUBLIC API

/**
 * Get all FAQ groups with their questions
 */
export async function getFAQGroups(): Promise<FAQGroup[]> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "faq",
        sort: "order",
        depth: 2,
    });

    return docs as unknown as FAQGroup[];
}

/**
 * Get a single FAQ group by slug
 */
export async function getFAQGroup(slug: string): Promise<FAQGroup | null> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "faq",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
        depth: 2,
    });

    return docs[0] ? (docs[0] as unknown as FAQGroup) : null;
}
