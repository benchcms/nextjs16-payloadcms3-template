import type { Feature } from "@core/types";

const features: Feature[] = [];

export const seeds = features.flatMap((f) => f.seeds);
export const globals = features.flatMap((f) => f.globals);
export const collections = features.flatMap((f) => f.collections);
