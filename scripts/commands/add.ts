import { join } from "path";
import chalk from "chalk";
import { downloadComponent } from "../utils/github-downloader.js";
import { regenerateFeaturesConfig } from "../utils/config-updater.js";
import type { Command } from "./types.js";

const DEFAULT_REPO_OWNER = "benchcms";
const DEFAULT_REPO_NAME = "nextjs16-payloadcms3-features";

export const addCommand: Command = {
  description: "Add a feature from the remote repository",
  execute: async (args: string[], options?: any) => {
    // args: [featureName]
    // options: { repo?: string }

    if (args.length < 1) {
      console.log(chalk.red("Usage: benchcms add <feature-name> [options]"));
      process.exit(1);
    }

    const featureName = args[0];
    let repoOwner = DEFAULT_REPO_OWNER;
    let repoName = DEFAULT_REPO_NAME;

    // Handle repo override if provided
    // format: owner/repo
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

    const targetDir = join(process.cwd(), "src/features", featureName);

    console.log(
      chalk.blue(
        `\n📦 Adding feature '${featureName}' from ${repoOwner}/${repoName}...\n`,
      ),
    );

    try {
      await downloadComponent({
        repoOwner,
        repoName,
        componentPath: featureName, // Assuming features are at root of the repo
        targetDir,
      });
      console.log(
        chalk.green(
          `\n✨ Feature '${featureName}' added successfully to src/features/${featureName}`,
        ),
      );

      // Update config
      console.log(chalk.blue(`\n📝 Regenerating features config...`));
      regenerateFeaturesConfig();
    } catch (error) {
      console.error(chalk.red("\n❌ Failed to add feature:"));
      console.error(error instanceof Error ? error.message : error);
      process.exit(1);
    }
  },
};
