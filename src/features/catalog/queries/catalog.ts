"use server";

import { getPayload } from "payload";
import type { PaginatedDocs } from "payload";
import configPromise from "@/src/payload.config";
import type { CatalogItem, CatalogCategory } from "@/src/payload-types";

// PUBLIC API

/**
 * Get all catalog items with optional filtering and pagination
 */
export async function getCatalogItems(options?: {
    limit?: number;
    page?: number;
    category?: string;
}): Promise<PaginatedDocs<CatalogItem>> {
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
        collection: "catalog-items",
        limit: options?.limit || 10,
        page: options?.page || 1,
        where: options?.category
            ? {
                "categories.slug": {
                    equals: options.category,
                },
            }
            : undefined,
        sort: "order",
        depth: 2,
    });

    return result;
}

/**
 * Get a single catalog item by slug
 */
export async function getCatalogItem(slug: string): Promise<CatalogItem | null> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "catalog-items",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
        depth: 2,
    });

    return docs[0] || null;
}

/**
 * Get root catalog categories (categories without parents)
 */
export async function getRootCatalogCategories(): Promise<CatalogCategory[]> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "catalog-categories",
        where: {
            parent: {
                exists: false,
            },
        },
        sort: "order",
    });

    return docs;
}

/**
 * Get subcategories of a specific category
 */
export async function getCatalogSubCategories(parentSlug: string): Promise<CatalogCategory[]> {
    const payload = await getPayload({ config: configPromise });

    // First, find the parent category
    const parent = await getCatalogCategory(parentSlug);
    if (!parent) return [];

    const { docs } = await payload.find({
        collection: "catalog-categories",
        where: {
            "parent.id": {
                equals: parent.id,
            },
        },
        sort: "order",
    });

    return docs;
}

/**
 * Get a single catalog category by slug
 */
export async function getCatalogCategory(slug: string): Promise<CatalogCategory | null> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "catalog-categories",
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

