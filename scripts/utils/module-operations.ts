import { join } from "path";
import { rmSync, existsSync } from "fs";
import type { Logger } from "../logger.js";
import { downloadComponents } from "./github-downloader.js";

interface InstallOptions {
  repoOwner: string;
  repoName: string;
}

// Mapping of module types to their repository folder paths
const REPO_FOLDER_MAP = {
  feature: "features",
} as const;

/**
 * Installs multiple modules of the same type from a repository in a single download.
 */
export async function installModules(
  type: keyof typeof REPO_FOLDER_MAP,
  names: string[],
  options: InstallOptions,
  logger: Logger,
) {
  if (names.length === 0) {
    return;
  }

  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);

  logger.info(
    `📦 Installing ${names.length} ${type}(s) from ${options.repoOwner}/${options.repoName}...`,
  );

  // Build component mappings
  const repoFolder = REPO_FOLDER_MAP[type];
  const components = names.map((name) => ({
    componentPath: `${repoFolder}/${name}`,
    targetDir: join(process.cwd(), `src/${type}s`, name),
  }));

  await downloadComponents(
    { repoOwner: options.repoOwner, repoName: options.repoName },
    components,
    logger,
  );

  for (const name of names) {
    logger.success(
      `✨ ${typeLabel} '${name}' installed to src/${type}s/${name}`,
    );
  }
}

/**
 * Installs a single module. Convenience wrapper for installModules.
 */
export async function installModule(
  type: keyof typeof REPO_FOLDER_MAP,
  name: string,
  options: InstallOptions,
  logger: Logger,
) {
  await installModules(type, [name], options, logger);
}

export function uninstallModule(
  type: keyof typeof REPO_FOLDER_MAP,
  name: string,
  logger: Logger,
) {
  const targetDir = join(process.cwd(), `src/${type}s`, name);

  if (!existsSync(targetDir)) {
    logger.warn(`Warning: ${type} '${name}' does not exist at ${targetDir}`);
    return;
  }

  logger.info(`🗑️  Removing ${type} '${name}'...`);

  rmSync(targetDir, { recursive: true, force: true });

  logger.success(
    `✨ ${type.charAt(0).toUpperCase() + type.slice(1)} '${name}' removed.`,
  );
}
