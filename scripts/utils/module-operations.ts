import { join } from "path";
import { rmSync, existsSync } from "fs";
import chalk from "chalk";
import { downloadComponent } from "./github-downloader.js";

interface InstallOptions {
  repoOwner: string;
  repoName: string;
}

export async function installModule(
  type: "feature" | "integration",
  name: string,
  options: InstallOptions,
) {
  const targetDir = join(process.cwd(), `src/${type}s`, name);

  console.log(
    chalk.blue(
      `\n📦 Installing ${type} '${name}' from ${options.repoOwner}/${options.repoName}...\n`,
    ),
  );

  await downloadComponent({
    repoOwner: options.repoOwner,
    repoName: options.repoName,
    componentPath: name,
    targetDir,
  });

  console.log(
    chalk.green(
      `\n✨ ${type.charAt(0).toUpperCase() + type.slice(1)} '${name}' installed successfully to src/${type}s/${name}`,
    ),
  );
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
