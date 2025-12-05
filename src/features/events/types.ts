/**
 * Events feature types
 */

import type { Media, RichText } from "@/src/core/types";

export interface Event {
  id: number;
  title: string;
  description: RichText;
  location: string;
  image?: Media;
  date: string;
  endDate?: string;
  virtualLink?: string;
  registrationLink?: string;
  slug: string;
}
