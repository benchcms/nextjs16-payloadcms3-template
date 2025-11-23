"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";

// TYPES

export type BlogPost = {
    id: string;
    title: string;
    slug: string;
    /** Rich text content (HTML) */
    content: string;
    /** Short summary (optional) */
    excerpt?: string;
    /** ISO date string */
    publishedDate: string;
    featuredImage?: {
        url: string;
        alt?: string;
    };
    /** Author is required */
    author: {
        id: string;
        name: string;
    };
    /** Category is required */
    category: {
        id: string;
        name: string;
        slug: string;
    };
    tags?: string[];
    /** SEO meta title */
    metaTitle?: string;
    /** SEO meta description */
    metaDescription?: string;
};

export type BlogAuthor = {
    id: string;
    name: string;
    description?: string;
    slug: string;
};

export type BlogCategory = {
    id: string;
    name: string;
    description?: string;
    slug: string;
};

// PUBLIC API

/**
 * Get all blog posts with optional filtering and pagination
 */
export async function getBlogPosts(options?: {
    limit?: number;
    page?: number;
    category?: string;
}): Promise<BlogPost[]> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "blog-posts",
        limit: options?.limit || 10,
        page: options?.page || 1,
        where: options?.category
            ? {
                "category.slug": {
                    equals: options.category,
                },
            }
            : undefined,
        sort: "-publishedDate",
        depth: 2,
    });

    return docs as unknown as BlogPost[];
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "blog-posts",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
        depth: 2,
    });

    return docs[0] ? (docs[0] as unknown as BlogPost) : null;
}

/**
 * Get all blog categories
 */
export async function getBlogCategories(): Promise<BlogCategory[]> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "blog-categories",
        sort: "order",
    });

    return docs as unknown as BlogCategory[];
}

/**
 * Get all blog authors
 */
export async function getBlogAuthors(): Promise<BlogAuthor[]> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "blog-authors",
        sort: "order",
    });

    return docs as unknown as BlogAuthor[];
}

/**
 * Get a single blog author by slug
 */
export async function getBlogAuthor(slug: string): Promise<BlogAuthor | null> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "blog-authors",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    });

    return docs[0] ? (docs[0] as unknown as BlogAuthor) : null;
}

/**
 * Get a single blog category by slug
 */
export async function getBlogCategory(slug: string): Promise<BlogCategory | null> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "blog-categories",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    });

    return docs[0] ? (docs[0] as unknown as BlogCategory) : null;
}
