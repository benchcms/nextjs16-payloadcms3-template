import { Feature } from "../config";
import { seedJobOffers } from "./seed/jobOffers";
import { JobOffers } from "./collections/JobOffers";

export const jobOffersConfig: Feature = {
  globals: [],
  collections: [JobOffers],
  seeds: [seedJobOffers],
};
