"use server";

import { cache } from "react";
import { getPayload } from "payload";
import configPromise from "@/src/payload.config";

// Note: The Integration type will be updated when payload-types are regenerated
// We avoid explicit typing here for now to prevent build errors during migration
export const getIntegrations = cache(async () => {
  const payload = await getPayload({ config: configPromise });

  const integrations = await payload.findGlobal({
    slug: "integrations",
  });

  return integrations;
});
