import { Feature } from "../config";
import { Socials } from "./globals/Socials";
import { seedSocials } from "./seed/socials";

export const socialsConfig: Feature = {
  globals: [Socials],
  collections: [],
  seeds: [seedSocials],
};
