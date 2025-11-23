import { Feature } from "../index";
import { seedPressReleases } from "./seed/pressReleases";
import { PressReleases } from "./collections/PressReleases";

const feature: Feature = {
  globals: [],
  collections: [PressReleases],
  seeds: [seedPressReleases],
};

export default feature;
