import "dotenv/config";
import { seeds } from "@/src/features/config";
import { createLogger } from "../logger.js";
import type { SeedContext } from "@core/types";
import { getPayloadClient } from "@core/utils/payload.js";

/**
 * Public API: Seed the database with initial data
 */
export async function seedDatabase(
  context: SeedContext = "default",
  verbose: boolean = false,
): Promise<void> {
  const logger = createLogger(verbose);

  logger.info(`\n🌱 Starting database seed for context: ${context}...\n`);

  const payload = await getPayloadClient();

  try {
    for (const seed of seeds) {
      await seed(payload, context);
    }

    logger.success("\n🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    logger.error("\n❌ Seed failed:", error);
    process.exit(1);
  }
}
