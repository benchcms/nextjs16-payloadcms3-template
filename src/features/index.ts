import { config } from "@/config";
import { Payload, GlobalConfig, CollectionConfig } from "payload";
import MediaFeature from "./media";
import UsersFeature from "./users";
import SettingsFeature from "./settings";

type Seed = (payload: Payload) => Promise<void>;

export type Feature = {
  globals: GlobalConfig[];
  collections: CollectionConfig[];
  seeds: Seed[];
};

const mandatoryFeatures = [MediaFeature, UsersFeature, SettingsFeature];
const allFeatures = [...mandatoryFeatures, ...config];

export const globals = allFeatures.flatMap((f) => f.globals)
export const collections = allFeatures.flatMap((f) => f.collections)
export const seeds = allFeatures.flatMap((f) => f.seeds)
