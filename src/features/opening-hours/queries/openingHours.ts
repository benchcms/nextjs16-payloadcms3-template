"use server";

import { cache } from "react";
import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import type { OpeningHours } from "../types";

// PUBLIC API

/**
 * Get opening hours for all days of the week
 *
 * This function is cached per-request to prevent redundant database queries
 * when multiple components need opening hours data on the same page.
 */
export const getOpeningHours = cache(async (): Promise<OpeningHours | null> => {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "opening-hours",
    where: {
      startDate: {
        less_than_equal: new Date().toISOString(),
      },
    },
    sort: "-startDate",
    limit: 1,
  });

  return (docs[0] as OpeningHours) || null;
});
