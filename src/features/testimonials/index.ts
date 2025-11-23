import { Feature } from "../index";
import { seedTestimonials } from "./seed/testimonials";
import { Testimonials } from "./collections/Testimonials";

const feature: Feature = {
  globals: [],
  collections: [Testimonials],
  seeds: [seedTestimonials],
};

export default feature;
