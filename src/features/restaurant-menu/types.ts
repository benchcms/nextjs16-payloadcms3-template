/**
 * Restaurant Menu feature types
 */

import type { Media } from "@/src/core/types";

export type SpicyLevel = "none" | "mild" | "medium" | "hot" | "extra-hot";

export interface MenuItem {
  name: string;
  description?: string;
  price?: number;
  image?: Media;
  dietary?: string;
  spicyLevel?: SpicyLevel;
  id?: string;
}

export interface RestaurantMenu {
  id: number;
  name: string;
  items: MenuItem[];
  slug: string;
  order: number;
}
