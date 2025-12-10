import { CollectionConfig, GlobalConfig, Payload } from "payload";

export type SeedContext =
  | "default"
  | "restaurant"
  | "tech-company"
  | "manufacturer";

type Seed = (payload: Payload, context: SeedContext) => Promise<void>;

export type Feature = {
  globals: GlobalConfig[];
  collections: CollectionConfig[];
  seeds: Seed[];
};
