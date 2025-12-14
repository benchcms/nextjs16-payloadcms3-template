import { createLogger } from "../logger.js";
import { regenerateFeaturesConfig } from "../utils/config-updater.js";
import { regenerateIntegrationsConfig } from "../utils/config-updater.js";

/**
 * Public API: Regenerate both features and integrations configs
 */
export async function sync(verbose: boolean = false): Promise<void> {
  const logger = createLogger(verbose);

  try {
    logger.info(`\n📝 Regenerating features config...`);
    regenerateFeaturesConfig(logger);

    logger.info(`\n📝 Regenerating integrations config...`);
    regenerateIntegrationsConfig(logger);

    logger.success("\n✔ Sync complete");
  } catch (error) {
    logger.error("\n❌ Failed to sync:", error);
    process.exit(1);
  }
}
