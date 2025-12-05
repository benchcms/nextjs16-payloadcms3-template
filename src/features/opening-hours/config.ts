import { Feature } from "../config";
import { seedOpeningHours } from "./seed/openingHours";
import { OpeningHours } from "./globals/OpeningHours";

export const openingHoursConfig: Feature = {
  globals: [OpeningHours],
  collections: [],
  seeds: [seedOpeningHours],
};
