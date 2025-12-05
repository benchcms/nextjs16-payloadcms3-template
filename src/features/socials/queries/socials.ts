"use server";

import { cache } from "react";
import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import type { Socials } from "../types";

export const getSocials = cache(async (): Promise<Socials> => {
  const payload = await getPayload({ config: configPromise });
  return payload.findGlobal({
    slug: "socials",
  });
});
