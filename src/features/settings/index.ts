import { Feature } from "../index";
import { seedSettings } from "./seed/settings";
import { Settings } from "./globals/Settings";

const feature: Feature = {
  globals: [Settings],
  collections: [],
  seeds: [seedSettings],
};

export default feature;
