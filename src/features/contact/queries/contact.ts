"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import type { Contact } from "@/src/payload-types";

/**
 * Get contact information and social media links
 */
export async function getContact(): Promise<Contact> {
  const payload = await getPayload({ config: configPromise });

  return await payload.findGlobal({
    slug: "contact",
  });
}
