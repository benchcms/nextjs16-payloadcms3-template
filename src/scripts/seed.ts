import "dotenv/config";
import { getPayload } from "payload";
import configPromise from "@/src/payload.config";

import { seeds } from "@/src/features/config";
import type { SeedContext } from "@/src/features/types";

async function seed(context: SeedContext) {
  console.log("🌱 Starting database seed...\n");

  const payload = await getPayload({ config: configPromise });

  try {
    for (const seed of seeds) {
      await seed(payload, context);
    }

    console.log("\n🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seed failed:", error);
    process.exit(1);
  }
}

// Get context from command line argument or use default
const contextArg = process.argv[2];
const context: SeedContext = (contextArg as SeedContext) || "default";

console.log(`📋 Context: ${context}\n`);

// Run seed
seed(context);
