import { Feature } from "../index";
import { seedEvents } from "./seed/events";
import { Events } from "./collections/Events";

const feature: Feature = {
  globals: [],
  collections: [Events],
  seeds: [seedEvents],
};

export default feature;
