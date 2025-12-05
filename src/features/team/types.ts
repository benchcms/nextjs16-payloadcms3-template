/**
 * Team feature types
 */

import type { Media } from "@/src/core/types";

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  photo?: Media;
  email?: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  id?: string;
}

export interface Team {
  id: number;
  name: string;
  items: TeamMember[];
  slug: string;
  order: number;
}
