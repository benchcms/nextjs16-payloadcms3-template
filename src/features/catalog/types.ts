/**
 * Catalog feature types
 */

import type { Media, RichText } from "@/src/core/types";

export interface CatalogCategory {
  id: number;
  name: string;
  parent?: CatalogCategory;
  description?: string;
  image?: Media;
  slug: string;
  order: number;
}

export interface Specification {
  name: string;
  value: string;
  id?: string;
}

export interface CatalogItem {
  id: number;
  name: string;
  categories: CatalogCategory[];
  price?: number;
  gallery: Media[];
  description?: RichText;
  specifications: Specification[];
  relatedItems: CatalogItem[];
  slug: string;
  order: number;
}
