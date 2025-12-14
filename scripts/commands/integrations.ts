import chalk from "chalk";
import { installModules, uninstallModule } from "../utils/module-operations.js";
import { regenerateIntegrationsConfig } from "../utils/config-updater.js";

const DEFAULT_REPO_OWNER = "benchcms";
const DEFAULT_REPO_NAME = "nextjs16-payloadcms3-registry";

export const integrationsCommand = {
  add: {
    description: "Add integrations from the remote repository",
    execute: async (args: string[], options?: any) => {
      if (args.length < 1) {
        console.log(
          chalk.red(
            "Usage: benchcms integrations:add <integration-name...> [options]",
          ),
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
        await installModules("integration", args, { repoOwner, repoName });

        console.log(chalk.blue(`\n📝 Regenerating integrations config...`));
        regenerateIntegrationsConfig();
      } catch (error) {
        console.error(chalk.red("\n❌ Failed to add integration:"));
        console.error(error instanceof Error ? error.message : error);
        process.exit(1);
      }
    },
  },
  rm: {
    description: "Remove an integration and update config",
    execute: async (args: string[]) => {
      if (args.length < 1) {
        console.log(
          chalk.red("Usage: benchcms integrations:rm <integration-name>"),
        );
        process.exit(1);
      }

      const integrationName = args[0];
      try {
        uninstallModule("integration", integrationName);

        console.log(chalk.blue(`\n📝 Regenerating integrations config...`));
        regenerateIntegrationsConfig();
      } catch (error) {
        console.error(chalk.red("\n❌ Failed to remove integration:"));
        console.error(error instanceof Error ? error.message : error);
        process.exit(1);
      }
    },
  },
  sync: {
    description: "Regenerate integrations config",
    execute: async () => {
      try {
        console.log(chalk.blue(`\n📝 Regenerating integrations config...`));
        regenerateIntegrationsConfig();
      } catch (error) {
        console.error(chalk.red("\n❌ Failed to sync integrations:"));
        console.error(error instanceof Error ? error.message : error);
        process.exit(1);
      }
    },
  },
};
