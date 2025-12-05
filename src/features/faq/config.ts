import { Feature } from "../config";
import { seedFAQ } from "./seed/faq";
import { FAQ } from "./collections/FAQ";

export const faqConfig: Feature = {
  globals: [],
  collections: [FAQ],
  seeds: [seedFAQ],
};
