/**
 * FAQ feature types
 */

import type { RichText } from "@/src/core/types";

export interface FaqItem {
  question: string;
  answer: RichText;
  id?: string;
}

export interface Faq {
  id: number;
  name: string;
  items: FaqItem[];
  slug: string;
  order: number;
}
