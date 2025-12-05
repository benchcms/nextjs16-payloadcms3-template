/**
 * Shared types used across features
 */

/**
 * Media type for uploaded images/files
 * Used by: blog, catalog, team, events, testimonials, restaurant-menu
 */
export interface Media {
  id: number;
  alt: string;
  url?: string | null;
  width?: number | null;
  height?: number | null;
}

/**
 * Rich text content (Lexical editor)
 * Used by: blog, faq, events, job-offers, press-releases, catalog
 */
export interface RichText {
  root: {
    type: string;
    children: {
      type: string;
      version: number;
      [k: string]: unknown;
    }[];
    direction: ("ltr" | "rtl") | null;
    format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
    indent: number;
    version: number;
  };
  [k: string]: unknown;
}
