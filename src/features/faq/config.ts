import type { Feature } from "../types";
import { seedFAQ } from "./seed/faq";
import { FAQ } from "./collections/FAQ";

export const faqConfig: Feature = {
  globals: [],
  collections: [FAQ],
  seeds: [seedFAQ],
};
