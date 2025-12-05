import { CollectionConfig, GlobalConfig, Payload } from "payload";

type Seed = (payload: Payload) => Promise<void>;

export type Feature = {
  globals: GlobalConfig[];
  collections: CollectionConfig[];
  seeds: Seed[];
};
