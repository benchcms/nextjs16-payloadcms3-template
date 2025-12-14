import { createLogger, type Logger } from "../logger.js";
import { regenerateIntegrationsConfig } from "../utils/config-updater.js";
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
 * Public API: Add integrations from the remote repository
 */
export async function addIntegrations(
  names: string[],
  options?: { repo?: string },
  verbose: boolean = false,
): Promise<void> {
  const logger = createLogger(verbose);

  if (names.length < 1) {
    logger.error(
      "Usage: benchcms integrations:add <integration-name...> [options]",
    );
    process.exit(1);
  }

  const { repoOwner, repoName } = _parseRepoOption(options?.repo, logger);

  try {
    await installModules("integration", names, { repoOwner, repoName }, logger);

    logger.info(`\n📝 Regenerating integrations config...`);
    regenerateIntegrationsConfig(logger);
  } catch (error) {
    logger.error("\n❌ Failed to add integration:", error);
    process.exit(1);
  }
}

/**
 * Public API: Remove an integration and update config
 */
export async function removeIntegration(
  name: string,
  verbose: boolean = false,
): Promise<void> {
  const logger = createLogger(verbose);

  if (!name) {
    logger.error("Usage: benchcms integrations:rm <integration-name>");
    process.exit(1);
  }

  try {
    uninstallModule("integration", name, logger);

    logger.info(`\n📝 Regenerating integrations config...`);
    regenerateIntegrationsConfig(logger);
  } catch (error) {
    logger.error("\n❌ Failed to remove integration:", error);
    process.exit(1);
  }
}

/**
 * Public API: Regenerate integrations config
 */
export async function syncIntegrations(
  verbose: boolean = false,
): Promise<void> {
  const logger = createLogger(verbose);

  try {
    logger.info(`\n📝 Regenerating integrations config...`);
    regenerateIntegrationsConfig(logger);
  } catch (error) {
    logger.error("\n❌ Failed to sync integrations:", error);
    process.exit(1);
  }
}
