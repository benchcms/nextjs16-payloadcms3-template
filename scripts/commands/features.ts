import { join } from "path";
import { readdirSync, statSync } from "fs";
import { createLogger, type Logger } from "../logger.js";
import { regenerateFeaturesConfig } from "../utils/config-updater.js";
import { installModules, uninstallModule } from "../utils/module-operations.js";

const DEFAULT_REPO_OWNER = "benchcms";
const DEFAULT_REPO_NAME = "nextjs16-payloadcms3-registry";

/**
 * Parse repository option and return owner/name with fallback to defaults
 */
function _parseRepoOption(
  repoOption: string | undefined,
  logger: Logger,
): { repoOwner: string; repoName: string } {
  if (!repoOption) {
    return { repoOwner: DEFAULT_REPO_OWNER, repoName: DEFAULT_REPO_NAME };
  }

  const parts = repoOption.split("/");
  if (parts.length === 2) {
    return { repoOwner: parts[0], repoName: parts[1] };
  }

  logger.warn(
    `Warning: Invalid repo format '${repoOption}'. Expected 'owner/repo'. Using default.`,
  );
  return { repoOwner: DEFAULT_REPO_OWNER, repoName: DEFAULT_REPO_NAME };
}

/**
 * Public API: Add features from the remote repository
 */
export async function addFeatures(
  names: string[],
  options?: { repo?: string },
  verbose: boolean = false,
): Promise<void> {
  const logger = createLogger(verbose);

  if (names.length < 1) {
    logger.error("Usage: benchcms features:add <feature-name...> [options]");
    process.exit(1);
  }

  const { repoOwner, repoName } = _parseRepoOption(options?.repo, logger);

  try {
    await installModules("feature", names, { repoOwner, repoName }, logger);

    logger.info("\n📝 Regenerating features config...");
    regenerateFeaturesConfig(logger);
  } catch (error) {
    logger.error("\n❌ Failed to add feature:", error);
    process.exit(1);
  }
}

/**
 * Public API: Remove features and update config
 */
export async function removeFeatures(
  names: string[],
  verbose: boolean = false,
): Promise<void> {
  const logger = createLogger(verbose);

  if (names.length < 1) {
    logger.error("Usage: benchcms features:rm <feature-name...>");
    process.exit(1);
  }

  try {
    for (const name of names) {
      uninstallModule("feature", name, logger);
    }

    logger.info("\n📝 Regenerating features config...");
    regenerateFeaturesConfig(logger);
  } catch (error) {
    logger.error("\n❌ Failed to remove feature:", error);
    process.exit(1);
  }
}

/**
 * Public API: Remove all installed features and sync config
 */
export async function clearFeatures(verbose: boolean = false): Promise<void> {
  const logger = createLogger(verbose);

  try {
    const featuresDir = join(process.cwd(), "src/features");
    logger.info(`🧹 Clearing all features from ${featuresDir}...`);

    // Read all items in the features directory
    const items = readdirSync(featuresDir);

    // Filter to only directories (excluding files like config.ts, README.md)
    const featureDirs = items.filter((item) => {
      const itemPath = join(featuresDir, item);
      return statSync(itemPath).isDirectory();
    });

    if (featureDirs.length === 0) {
      logger.info("No features to clear.");
      return;
    }

    logger.info(`Found ${featureDirs.length} feature(s) to remove...`);

    // Remove each feature directory
    for (const featureDir of featureDirs) {
      uninstallModule("feature", featureDir, logger);
    }

    logger.info("\n📝 Regenerating features config...");
    regenerateFeaturesConfig(logger);

    logger.success("\n✨ All features cleared successfully.");
  } catch (error) {
    logger.error("\n❌ Failed to clear features:", error);
    process.exit(1);
  }
}

/**
 * Public API: Regenerate features config
 */
export async function syncFeatures(verbose: boolean = false): Promise<void> {
  const logger = createLogger(verbose);

  try {
    logger.info("📝 Regenerating features config...");
    regenerateFeaturesConfig(logger);
  } catch (error) {
    logger.error("\n❌ Failed to sync features:", error);
    process.exit(1);
  }
}
