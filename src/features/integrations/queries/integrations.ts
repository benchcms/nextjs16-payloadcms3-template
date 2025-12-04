"use server";

import { cache } from "react";
import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import type { Integration } from "@/src/payload-types";

// PUBLIC API

/**
 * Get third-party integration configurations (Google Analytics, etc.)
 *
 * This function is cached per-request to prevent redundant database queries
 * when multiple integration components are used on the same page.
 */
export const getIntegrations = cache(async (): Promise<Integration> => {
  const payload = await getPayload({ config: configPromise });

  const integrations = await payload.findGlobal({
    slug: "integrations",
  });

  return integrations;
});
