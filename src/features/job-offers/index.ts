import { Feature } from "../index";
import { seedJobOffers } from "./seed/jobOffers";
import { JobOffers } from "./collections/JobOffers";

const feature: Feature = {
  globals: [],
  collections: [JobOffers],
  seeds: [seedJobOffers],
};

export default feature;
