"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import type { Team } from "../types";

// PUBLIC API

/**
 * Get all team groups with their members
 */
export async function getTeamGroups(): Promise<Team[]> {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "team",
    sort: "order",
    depth: 2,
  });

  return docs as Team[];
}

/**
 * Get a single team group by slug
 */
export async function getTeamGroup(slug: string): Promise<Team | null> {
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

  return (docs[0] as Team) || null;
}
