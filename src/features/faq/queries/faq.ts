"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import type { Faq } from "../types";

// PUBLIC API

/**
 * Get all FAQ groups with their questions
 */
export async function getFAQGroups(): Promise<Faq[]> {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "faq",
    sort: "order",
    depth: 2,
  });

  return docs as Faq[];
}

/**
 * Get a single FAQ group by slug
 */
export async function getFAQGroup(slug: string): Promise<Faq | null> {
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

  return (docs[0] as Faq) || null;
}
