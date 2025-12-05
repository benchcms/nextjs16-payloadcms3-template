import { Feature } from "../config";
import { seedEvents } from "./seed/events";
import { Events } from "./collections/Events";

export const eventsConfig: Feature = {
  globals: [],
  collections: [Events],
  seeds: [seedEvents],
};
