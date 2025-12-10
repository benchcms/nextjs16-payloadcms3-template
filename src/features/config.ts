import type { Feature } from "./types";
import { faqConfig } from "./faq/config";
import { newsConfig } from "./news/config";
import { blogConfig } from "./blog/config";
import { teamConfig } from "./team/config";
import { eventsConfig } from "./events/config";
import { catalogConfig } from "./catalog/config";
import { contactConfig } from "./contact/config";
import { socialsConfig } from "./socials/config";
import { jobOffersConfig } from "./job-offers/config";
import { testimonialsConfig } from "./testimonials/config";
import { openingHoursConfig } from "./opening-hours/config";
import { pressReleasesConfig } from "./press-releases/config";
import { restaurantMenuConfig } from "./restaurant-menu/config";

const features: Feature[] = [
  faqConfig,
  newsConfig,
  blogConfig,
  teamConfig,
  eventsConfig,
  catalogConfig,
  contactConfig,
  socialsConfig,
  jobOffersConfig,
  testimonialsConfig,
  openingHoursConfig,
  pressReleasesConfig,
  restaurantMenuConfig,
];

export const seeds = features.flatMap((f) => f.seeds);
export const globals = features.flatMap((f) => f.globals);
export const collections = features.flatMap((f) => f.collections);
