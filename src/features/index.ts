import { config } from "@/config";
import { Payload, GlobalConfig, CollectionConfig } from "payload";

type Seed = (payload: Payload) => Promise<void>;

export type Feature = {
  globals: GlobalConfig[];
  collections: CollectionConfig[];
  seeds: Seed[];
};

export const globals = config.flatMap((f) => f.globals)
export const collections = config.flatMap((f) => f.collections)
export const seeds = config.flatMap((f) => f.seeds)
