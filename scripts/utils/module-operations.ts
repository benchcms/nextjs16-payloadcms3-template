import { join } from "path";
import { rmSync, existsSync } from "fs";
import chalk from "chalk";
import { downloadComponents } from "./github-downloader.js";

interface InstallOptions {
  repoOwner: string;
  repoName: string;
}

// Mapping of module types to their repository folder paths
const REPO_FOLDER_MAP = {
  feature: "features",
  integration: "integrations",
} as const;

/**
 * Installs multiple modules of the same type from a repository in a single download.
 */
export async function installModules(
  type: "feature" | "integration",
  names: string[],
  options: InstallOptions,
) {
  if (names.length === 0) {
    return;
  }

  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);

  console.log(
    chalk.blue(
      `\n📦 Installing ${names.length} ${type}(s) from ${options.repoOwner}/${options.repoName}...\n`,
    ),
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
  );

  for (const name of names) {
    console.log(
      chalk.green(
        `✨ ${typeLabel} '${name}' installed to src/${type}s/${name}`,
      ),
    );
  }
}

/**
 * Installs a single module. Convenience wrapper for installModules.
 */
export async function installModule(
  type: "feature" | "integration",
  name: string,
  options: InstallOptions,
) {
  await installModules(type, [name], options);
}

export function uninstallModule(type: "feature" | "integration", name: string) {
  const targetDir = join(process.cwd(), `src/${type}s`, name);

  if (!existsSync(targetDir)) {
    console.warn(
      chalk.yellow(`Warning: ${type} '${name}' does not exist at ${targetDir}`),
    );
    return;
  }

  console.log(chalk.blue(`\n🗑️  Removing ${type} '${name}'...`));

  rmSync(targetDir, { recursive: true, force: true });

  console.log(
    chalk.green(
      `\n✨ ${type.charAt(0).toUpperCase() + type.slice(1)} '${name}' removed.`,
    ),
  );
}
