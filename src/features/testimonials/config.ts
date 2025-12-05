import { Feature } from "../config";
import { seedTestimonials } from "./seed/testimonials";
import { Testimonials } from "./collections/Testimonials";

export const testimonialsConfig: Feature = {
  globals: [],
  collections: [Testimonials],
  seeds: [seedTestimonials],
};
