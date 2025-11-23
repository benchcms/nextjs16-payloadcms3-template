import { Feature } from "../index";
import { seedTeam } from "./seed/team";
import { Team } from "./collections/Team";

const feature: Feature = {
  globals: [],
  collections: [Team],
  seeds: [seedTeam],
};

export default feature;
