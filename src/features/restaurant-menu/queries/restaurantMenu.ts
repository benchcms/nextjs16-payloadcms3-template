"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import type { RestaurantMenu } from "../types";

// PUBLIC API

/**
 * Get all menu categories with their dishes
 */
export async function getMenuCategories(): Promise<RestaurantMenu[]> {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "restaurant-menu",
    sort: "order",
    depth: 2,
  });

  return docs as RestaurantMenu[];
}

/**
 * Get a single menu category by slug
 */
export async function getMenuCategory(
  slug: string,
): Promise<RestaurantMenu | null> {
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

  return (docs[0] as RestaurantMenu) || null;
}
