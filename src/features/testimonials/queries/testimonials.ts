"use server";

import { getPayload } from "payload";
import type { PaginatedDocs } from "payload";
import configPromise from "@/src/payload.config";
import type { Testimonial } from "../types";

// PUBLIC API

/**
 * Get all testimonials with pagination
 */
export async function getTestimonials(options?: {
  limit?: number;
  page?: number;
  sort?: string;
}): Promise<PaginatedDocs<Testimonial>> {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "testimonials",
    limit: options?.limit || 20,
    page: options?.page || 1,
    sort: options?.sort ?? "-date",
    depth: 1,
  });

  return result as PaginatedDocs<Testimonial>;
}
