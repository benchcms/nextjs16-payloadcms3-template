import type { Feature } from "@features/types";
import { seedEvents } from "./seed/events";
import { Events } from "./collections/Events";

export const eventsConfig: Feature = {
  globals: [],
  collections: [Events],
  seeds: [seedEvents],
};
