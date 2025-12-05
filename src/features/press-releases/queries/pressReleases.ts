"use server";

import { getPayload } from "payload";
import type { PaginatedDocs } from "payload";
import configPromise from "@/src/payload.config";
import type { PressRelease } from "../types";

// PUBLIC API

/**
 * Get all press releases with pagination
 */
export async function getPressReleases(options?: {
  limit?: number;
  page?: number;
  sort?: string;
}): Promise<PaginatedDocs<PressRelease>> {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "press-releases",
    limit: options?.limit || 20,
    page: options?.page || 1,
    sort: options?.sort ?? "-publishedDate",
    depth: 1,
  });

  return result as PaginatedDocs<PressRelease>;
}

/**
 * Get a single press release by slug
 */
export async function getPressRelease(
  slug: string,
): Promise<PressRelease | null> {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "press-releases",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 1,
  });

  return (docs[0] as PressRelease) || null;
}
