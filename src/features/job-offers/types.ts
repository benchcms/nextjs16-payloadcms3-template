/**
 * Job Offers feature types
 */

import type { RichText } from "@/src/core/types";

export interface JobOffer {
  id: number;
  title: string;
  location: string;
  description: RichText;
  requirements: RichText;
  applicationLink?: string;
  active: boolean;
  slug: string;
  postedDate: string;
}
