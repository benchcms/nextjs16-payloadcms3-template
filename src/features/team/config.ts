import type { Feature } from "../types";
import { seedTeam } from "./seed/team";
import { Team } from "./collections/Team";

export const teamConfig: Feature = {
  globals: [],
  collections: [Team],
  seeds: [seedTeam],
};
