import type { Feature } from "@features/types";
import { seedOpeningHours } from "./seed/openingHours";
import { OpeningHours } from "./collections/OpeningHours";

export const openingHoursConfig: Feature = {
  globals: [],
  collections: [OpeningHours],
  seeds: [seedOpeningHours],
};
