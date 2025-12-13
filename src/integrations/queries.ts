"use server";

import { cache } from "react";
import { getPayloadClient } from "@core/utils/payload";

// Note: The Integration type will be updated when payload-types are regenerated
// We avoid explicit typing here for now to prevent build errors during migration
export const getIntegrations = cache(async () => {
  const payload = await getPayloadClient();

  const integrations = await payload.findGlobal({
    slug: "integrations",
  });

  return integrations;
});
