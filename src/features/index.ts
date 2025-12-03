import { Payload, GlobalConfig, CollectionConfig } from "payload";
import Faq from "./faq";
import Blog from "./blog";
import Team from "./team";
import Media from "./media";
import Admins from "./admins";
import Events from "./events";
import Catalog from "./catalog";
import Contact from "./contact";
import JobOffers from "./job-offers";
import OpeningHours from "./opening-hours";
import Testimonials from "./testimonials";
import PressReleases from "./press-releases";
import RestaurantMenu from "./restaurant-menu";

import Integrations from "./integrations";

type Seed = (payload: Payload) => Promise<void>;

export type Feature = {
  globals: GlobalConfig[];
  collections: CollectionConfig[];
  seeds: Seed[];
};

const mandatoryFeatures = [Admins, Media];

const features = [
  ...mandatoryFeatures,
  Faq,
  Blog,
  Team,
  Events,
  Contact,
  Catalog,
  JobOffers,
  Integrations,
  OpeningHours,
  Testimonials,
  PressReleases,
  RestaurantMenu,
];

export const seeds = features.flatMap((f) => f.seeds);
export const globals = features.flatMap((f) => f.globals);
export const collections = features.flatMap((f) => f.collections);
