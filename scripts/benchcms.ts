#!/usr/bin/env tsx

import { Command } from "commander";

import {
  regenerateFeaturesConfig,
  regenerateIntegrationsConfig,
} from "./utils/config-updater.js";
import chalk from "chalk";

/**
 * BenchCMS CLI - Management script for BenchCMS operations
 */

const program = new Command();

program
  .name("benchcms")
  .description("BenchCMS management CLI")
  .version("1.0.0");

// Register the init command
program
  .command("init")
  .description("Initialize BenchCMS project")
  .action(async () => {
    const { initCommand } = await import("./commands/init.js");
    await initCommand.execute([]);
  });

// Register the seed command
program
  .command("db:seed [context]")
  .description("Seed the database with initial data")
  .action(async (context) => {
    const { seedCommand } = await import("./commands/seed.js");
    await seedCommand.execute(context ? [context] : []);
  });

// Register the db:sync command
program
  .command("db:sync")
  .description("Reset DB, clear migrations, and clean install")
  .action(async () => {
    const { dbSyncCommand } = await import("./commands/db-sync.js");
    await dbSyncCommand.execute([]);
  });

// --- Features Command Group ---

program
  .command("features:add <names...>")
  .description("Add features from the remote repository")
  .option("-r, --repo <repo>", "Source repository (owner/repo)")
  .action(async (names, options) => {
    const { featuresCommand } = await import("./commands/features.js");
    await featuresCommand.add.execute(names, options);
  });

program
  .command("features:rm <name>")
  .description("Remove a feature and update config")
  .action(async (name) => {
    const { featuresCommand } = await import("./commands/features.js");
    await featuresCommand.rm.execute([name]);
  });

program
  .command("features:sync")
  .description("Regenerate features config")
  .action(async () => {
    const { featuresCommand } = await import("./commands/features.js");
    await featuresCommand.sync.execute();
  });

// --- Integrations Command Group ---

program
  .command("integrations:add <names...>")
  .description("Add integrations from the remote repository")
  .option("-r, --repo <repo>", "Source repository (owner/repo)")
  .action(async (names, options) => {
    const { integrationsCommand } = await import("./commands/integrations.js");
    await integrationsCommand.add.execute(names, options);
  });

program
  .command("integrations:rm <name>")
  .description("Remove an integration and update config")
  .action(async (name) => {
    const { integrationsCommand } = await import("./commands/integrations.js");
    await integrationsCommand.rm.execute([name]);
  });

program
  .command("integrations:sync")
  .description("Regenerate integrations config")
  .action(async () => {
    const { integrationsCommand } = await import("./commands/integrations.js");
    await integrationsCommand.sync.execute();
  });

// --- Aliases ---

// add -> features:add
program
  .command("add <names...>")
  .description("Alias for features:add")
  .option("-r, --repo <repo>", "Source repository (owner/repo)")
  .action(async (names, options) => {
    const { featuresCommand } = await import("./commands/features.js");
    await featuresCommand.add.execute(names, options);
  });

// rm -> features:rm
program
  .command("rm <name>")
  .description("Alias for features:rm")
  .action(async (name) => {
    const { featuresCommand } = await import("./commands/features.js");
    await featuresCommand.rm.execute([name]);
  });

// sync -> features:sync AND integrations:sync
program
  .command("sync")
  .description("Regenerate both features and integrations configs")
  .action(async () => {
    console.log(chalk.blue(`\n📝 Regenerating features config...`));
    regenerateFeaturesConfig();
    console.log(chalk.blue(`\n📝 Regenerating integrations config...`));
    regenerateIntegrationsConfig();
  });

program.parse(process.argv);
