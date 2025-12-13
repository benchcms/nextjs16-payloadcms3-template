import chalk from "chalk";
import { installModules, uninstallModule } from "../utils/module-operations.js";
import { regenerateFeaturesConfig } from "../utils/config-updater.js";

const DEFAULT_REPO_OWNER = "benchcms";
const DEFAULT_REPO_NAME = "nextjs16-payloadcms3-features";

export const featuresCommand = {
  add: {
    description: "Add features from the remote repository",
    execute: async (args: string[], options?: any) => {
      if (args.length < 1) {
        console.log(
          chalk.red("Usage: benchcms features:add <feature-name...> [options]"),
        );
        process.exit(1);
      }

      let repoOwner = DEFAULT_REPO_OWNER;
      let repoName = DEFAULT_REPO_NAME;

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

      try {
        await installModules("feature", args, { repoOwner, repoName });

        console.log(chalk.blue(`\n📝 Regenerating features config...`));
        regenerateFeaturesConfig();
      } catch (error) {
        console.error(chalk.red("\n❌ Failed to add feature:"));
        console.error(error instanceof Error ? error.message : error);
        process.exit(1);
      }
    },
  },
  rm: {
    description: "Remove a feature and update config",
    execute: async (args: string[]) => {
      if (args.length < 1) {
        console.log(chalk.red("Usage: benchcms features:rm <feature-name>"));
        process.exit(1);
      }

      const featureName = args[0];
      try {
        uninstallModule("feature", featureName);

        console.log(chalk.blue(`\n📝 Regenerating features config...`));
        regenerateFeaturesConfig();
      } catch (error) {
        console.error(chalk.red("\n❌ Failed to remove feature:"));
        console.error(error instanceof Error ? error.message : error);
        process.exit(1);
      }
    },
  },
  sync: {
    description: "Regenerate features config",
    execute: async () => {
      try {
        console.log(chalk.blue(`\n📝 Regenerating features config...`));
        regenerateFeaturesConfig();
      } catch (error) {
        console.error(chalk.red("\n❌ Failed to sync features:"));
        console.error(error instanceof Error ? error.message : error);
        process.exit(1);
      }
    },
  },
};
