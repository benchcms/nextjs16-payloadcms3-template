"use server";

import { cache } from "react";
import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import type { Social } from "@/src/payload-types";

export const getSocials = cache(async (): Promise<Social> => {
  const payload = await getPayload({ config: configPromise });
  return payload.findGlobal({
    slug: "socials",
  });
});
