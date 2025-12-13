import { getPayload } from "payload";
import type { Payload } from "payload";
import configPromise from "@/src/payload.config";

/**
 * Get PayloadCMS client instance
 *
 * Automatically handles config resolution:
 * - In Next.js: Uses auto-resolved config
 * - In test environments: Explicitly passes config
 */
export async function getPayloadClient(): Promise<Payload> {
  // In test environments (Vitest), we need to explicitly pass the config
  // In Next.js production, getPayload() auto-resolves the config
  const isTestEnv =
    process.env.VITEST === "true" || process.env.NODE_ENV === "test";

  if (isTestEnv) {
    return await getPayload({ config: configPromise });
  }

  return await getPayload({ config: await configPromise });
}
