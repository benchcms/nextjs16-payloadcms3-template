import type { Feature } from "../types";
import { seedNews } from "./seed/news";
import { News } from "./collections/News";

export const newsConfig: Feature = {
  globals: [],
  collections: [News],
  seeds: [seedNews],
};
