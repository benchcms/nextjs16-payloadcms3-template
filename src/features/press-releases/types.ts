/**
 * Press Releases feature types
 */

import type { RichText } from "@/src/core/types";

export interface PressRelease {
  id: number;
  title: string;
  journal?: string;
  excerpt?: RichText;
  link?: string;
  publishedDate: string;
  slug: string;
}
