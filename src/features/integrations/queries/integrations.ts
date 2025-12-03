"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import type { Integration } from "@/src/payload-types";

// PUBLIC API

/**
 * Get third-party integration configurations (Google Analytics, etc.)
 */
export async function getIntegrations(): Promise<Integration> {
  const payload = await getPayload({ config: configPromise });

  const integrations = await payload.findGlobal({
    slug: "integrations",
  });

  return integrations;
}
