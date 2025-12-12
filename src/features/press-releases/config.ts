import type { Feature } from "@features/types";
import { seedPressReleases } from "./seed/pressReleases";
import { PressReleases } from "./collections/PressReleases";

export const pressReleasesConfig: Feature = {
  globals: [],
  collections: [PressReleases],
  seeds: [seedPressReleases],
};
