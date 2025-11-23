"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";

// TYPES

export type TeamMember = {
    name: string;
    role: string;
    bio?: string;
    photo?: {
        url: string;
        alt?: string;
    };
    email?: string;
    phone?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
};

export type TeamGroup = {
    id: string;
    name: string;
    slug: string;
    order: number;
    items: TeamMember[];
};

// PUBLIC API

/**
 * Get all team groups with their members
 */
export async function getTeamGroups(): Promise<TeamGroup[]> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "team",
        sort: "order",
        depth: 2,
    });

    return docs as unknown as TeamGroup[];
}

/**
 * Get a single team group by slug
 */
export async function getTeamGroup(slug: string): Promise<TeamGroup | null> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "team",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
        depth: 2,
    });

    return docs[0] ? (docs[0] as unknown as TeamGroup) : null;
}
