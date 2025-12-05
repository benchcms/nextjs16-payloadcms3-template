"use server";

import { cache } from "react";
import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import type { Contact } from "../types";

/**
 * Get contact information and social media links
 *
 * This function is cached per-request to prevent redundant database queries
 * when multiple components need contact data on the same page.
 */
export const getContact = cache(async (): Promise<Contact> => {
  const payload = await getPayload({ config: configPromise });

  return await payload.findGlobal({
    slug: "contact",
  });
});
