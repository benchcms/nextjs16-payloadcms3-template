"use server";

import { getPayload } from "payload";
import type { PaginatedDocs, Where } from "payload";
import configPromise from "@/src/payload.config";
import type { BlogPost, BlogAuthor, BlogCategory } from "../types";

// PUBLIC API

/**
 * Get all blog posts with optional filtering and pagination
 */
export async function getBlogPosts(options?: {
  limit?: number;
  page?: number;
  category?: string;
  author?: string;
  sort?: string;
}): Promise<PaginatedDocs<BlogPost>> {
  const payload = await getPayload({ config: configPromise });

  const where: Where = {};

  if (options?.category) {
    where["category.slug"] = { equals: options.category };
  }

  if (options?.author) {
    where["author.slug"] = { equals: options.author };
  }

  const result = await payload.find({
    collection: "blog-posts",
    limit: options?.limit || 10,
    page: options?.page || 1,
    where: Object.keys(where).length > 0 ? where : undefined,
    sort: options?.sort ?? "-publishedDate",
    depth: 2,
  });

  return result as PaginatedDocs<BlogPost>;
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

  return (docs[0] as BlogPost) || null;
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

  return docs as BlogCategory[];
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

  return docs as BlogAuthor[];
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
    depth: 1,
  });

  return (docs[0] as BlogAuthor) || null;
}

/**
 * Get a single blog category by slug
 */
export async function getBlogCategory(
  slug: string,
): Promise<BlogCategory | null> {
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

  return (docs[0] as BlogCategory) || null;
}

/**
 * Get blog posts by author slug
 */
export async function getBlogPostsByAuthor(
  authorSlug: string,
  limit = 10,
): Promise<PaginatedDocs<BlogPost>> {
  return getBlogPosts({ author: authorSlug, limit });
}

/**
 * Get blog posts by category slug
 */
export async function getBlogPostsByCategory(
  categorySlug: string,
  limit = 10,
): Promise<PaginatedDocs<BlogPost>> {
  return getBlogPosts({ category: categorySlug, limit });
}
