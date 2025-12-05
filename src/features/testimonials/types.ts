/**
 * Testimonials feature types
 */

import type { Media } from "@/src/core/types";

export interface Testimonial {
  id: number;
  client: string;
  company?: string;
  quote: string;
  photo?: Media;
  rating?: number;
  date: string;
}
