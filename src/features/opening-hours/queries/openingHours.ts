"use server";

import { cache } from "react";
import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import type { OpeningHour } from "@/src/payload-types";

// PUBLIC API

/**
 * Get opening hours for all days of the week
 *
 * This function is cached per-request to prevent redundant database queries
 * when multiple components need opening hours data on the same page.
 */
export const getOpeningHours = cache(async (): Promise<OpeningHour> => {
  const payload = await getPayload({ config: configPromise });

  const data = await payload.findGlobal({
    slug: "opening-hours",
  });

  return data;
});
