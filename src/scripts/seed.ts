import "dotenv/config";
import { getPayload } from "payload";
import configPromise from "@/src/payload.config";

import { seeds } from "@/src/features";

async function seed() {
  console.log("🌱 Starting database seed...\n");

  const payload = await getPayload({ config: configPromise });

  try {
    for (const seed of seeds) {
      await seed(payload);
    }

    console.log("\n🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seed failed:", error);
    process.exit(1);
  }
}

// Run seed
seed();
