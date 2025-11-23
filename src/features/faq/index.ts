import { Feature } from "../index";
import { seedFAQ } from "./seed/faq";
import { FAQ } from "./collections/FAQ";

const feature: Feature = {
  globals: [],
  collections: [FAQ],
  seeds: [seedFAQ],
};

export default feature;
