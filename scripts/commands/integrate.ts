import { join } from "path";
import chalk from "chalk";
import { downloadComponent } from "../utils/github-downloader.js";
import { regenerateIntegrationsConfig } from "../utils/config-updater.js";
import type { Command } from "./types.js";

const DEFAULT_REPO_OWNER = "benchcms";
const DEFAULT_REPO_NAME = "nextjs16-payloadcms3-integrations";

export const integrateCommand: Command = {
  description: "Add an integration from the remote repository",
  execute: async (args: string[], options?: any) => {
    if (args.length < 1) {
      console.log(chalk.red("Usage: benchcms integrate <name> [options]"));
      process.exit(1);
    }

    const integrationName = args[0];
    let repoOwner = DEFAULT_REPO_OWNER;
    let repoName = DEFAULT_REPO_NAME;

    // Handle repo override if provided
    if (options && options.repo) {
      const parts = options.repo.split("/");
      if (parts.length === 2) {
        repoOwner = parts[0];
        repoName = parts[1];
      } else {
        console.log(
          chalk.yellow(
            `Warning: Invalid repo format '${options.repo}'. Expected 'owner/repo'. Using default.`,
          ),
        );
      }
    }

    const targetDir = join(process.cwd(), "src/integrations", integrationName);

    console.log(
      chalk.blue(
        `\n🔌 Adding integration '${integrationName}' from ${repoOwner}/${repoName}...\n`,
      ),
    );

    try {
      await downloadComponent({
        repoOwner,
        repoName,
        componentPath: integrationName, // Assuming integrations are at root of the repo
        targetDir,
      });
      console.log(
        chalk.green(
          `\n✨ Integration '${integrationName}' added successfully to src/integrations/${integrationName}`,
        ),
      );

      // Update config
      console.log(chalk.blue(`\n📝 Regenerating integrations config...`));
      regenerateIntegrationsConfig();
    } catch (error) {
      console.error(chalk.red("\n❌ Failed to add integration:"));
      console.error(error instanceof Error ? error.message : error);
      process.exit(1);
    }
  },
};
