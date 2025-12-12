import type { Feature } from "@features/types";
import { Socials } from "./globals/Socials";
import { seedSocials } from "./seed/socials";

export const socialsConfig: Feature = {
  globals: [Socials],
  collections: [],
  seeds: [seedSocials],
};
