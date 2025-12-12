import type { Feature } from "@features/types";
import { seedRestaurantMenu } from "./seed/restaurantMenu";
import { RestaurantMenu } from "./collections/RestaurantMenu";

export const restaurantMenuConfig: Feature = {
  globals: [],
  collections: [RestaurantMenu],
  seeds: [seedRestaurantMenu],
};
