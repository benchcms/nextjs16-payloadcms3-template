import { CollectionConfig, GlobalConfig, Payload } from "payload";
import { faqConfig } from "./faq/config";
import { blogConfig } from "./blog/config";
import { teamConfig } from "./team/config";
import { eventsConfig } from "./events/config";
import { catalogConfig } from "./catalog/config";
import { contactConfig } from "./contact/config";
import { jobOffersConfig } from "./job-offers/config";
import { integrationsConfig } from "./integrations/config";
import { testimonialsConfig } from "./testimonials/config";
import { openingHoursConfig } from "./opening-hours/config";
import { pressReleasesConfig } from "./press-releases/config";
import { restaurantMenuConfig } from "./restaurant-menu/config";

type Seed = (payload: Payload) => Promise<void>;

export type Feature = {
  globals: GlobalConfig[];
  collections: CollectionConfig[];
  seeds: Seed[];
};

const features: Feature[] = [
  faqConfig,
  blogConfig,
  teamConfig,
  eventsConfig,
  catalogConfig,
  contactConfig,
  jobOffersConfig,
  integrationsConfig,
  testimonialsConfig,
  openingHoursConfig,
  pressReleasesConfig,
  restaurantMenuConfig,
];

export const seeds = features.flatMap((f) => f.seeds);
export const globals = features.flatMap((f) => f.globals);
export const collections = features.flatMap((f) => f.collections);
