"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";

// TYPES

export type MenuItem = {
    name: string;
    description?: string;
    /** Price as a number (optional) */
    price?: number;
    image?: {
        url: string;
        alt?: string;
    };
    /** Dietary information (e.g., "Vegan", "Gluten-free") */
    dietary?: string;
    /** Spice level: none, mild, medium, hot, or extra-hot */
    spicyLevel?: "none" | "mild" | "medium" | "hot" | "extra-hot";
};

export type MenuCategory = {
    id: string;
    name: string;
    slug: string;
    order: number;
    items: MenuItem[];
};

// PUBLIC API

/**
 * Get all menu categories with their dishes
 */
export async function getMenuCategories(): Promise<MenuCategory[]> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "restaurant-menu",
        sort: "order",
        depth: 2,
    });

    return docs as unknown as MenuCategory[];
}

/**
 * Get a single menu category by slug
 */
export async function getMenuCategory(slug: string): Promise<MenuCategory | null> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "restaurant-menu",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
        depth: 2,
    });

    return docs[0] ? (docs[0] as unknown as MenuCategory) : null;
}
