import { createLogger } from "../logger.js";
import { regenerateFeaturesConfig } from "../utils/config-updater.js";

/**
 * Public API: Regenerate features config
 */
export async function sync(verbose: boolean = false): Promise<void> {
  const logger = createLogger(verbose);

  try {
    logger.info(`\n📝 Regenerating features config...`);
    regenerateFeaturesConfig(logger);

    logger.success("\n✔ Sync complete");
  } catch (error) {
    logger.error("\n❌ Failed to sync:", error);
    process.exit(1);
  }
}
