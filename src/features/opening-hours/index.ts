import { Feature } from "../index";
import { seedOpeningHours } from "./seed/openingHours";
import { OpeningHours } from "./globals/OpeningHours";

const feature: Feature = {
  globals: [OpeningHours],
  collections: [],
  seeds: [seedOpeningHours],
};

export default feature;
