#!/usr/bin/env tsx

import { Command } from "commander";

/**
 * BenchCMS CLI - Management script for BenchCMS operations
 */

const program = new Command();

program
  .name("benchcms")
  .description("BenchCMS management CLI")
  .version("1.0.0")
  .option("-v, --verbose", "Show detailed output");

// Register the init command
program
  .command("init")
  .description("Initialize BenchCMS project")
  .action(async (options, command) => {
    const { init } = await import("./commands/init.js");
    await init(command.optsWithGlobals().verbose);
  });

// Register the seed command
program
  .command("db:seed [context]")
  .description("Seed the database with initial data")
  .action(async (context, options, command) => {
    const { seedDatabase } = await import("./commands/seed.js");
    await seedDatabase(context, command.optsWithGlobals().verbose);
  });

// Register the db:sync command
program
  .command("db:sync")
  .description("Reset DB, clear migrations, and clean install")
  .action(async (options, command) => {
    const { syncDatabase } = await import("./commands/db-sync.js");
    await syncDatabase(command.optsWithGlobals().verbose);
  });

// --- Features Command Group ---

program
  .command("features:add <names...>")
  .description("Add features from the remote repository")
  .option("-r, --repo <repo>", "Source repository (owner/repo)")
  .action(async (names, options, command) => {
    const { addFeatures } = await import("./commands/features.js");
    await addFeatures(names, options, command.optsWithGlobals().verbose);
  });

program
  .command("features:rm <name>")
  .description("Remove a feature and update config")
  .action(async (name, options, command) => {
    const { removeFeature } = await import("./commands/features.js");
    await removeFeature(name, command.optsWithGlobals().verbose);
  });

program
  .command("features:sync")
  .description("Regenerate features config")
  .action(async (options, command) => {
    const { syncFeatures } = await import("./commands/features.js");
    await syncFeatures(command.optsWithGlobals().verbose);
  });

// --- Aliases ---

// add -> features:add
program
  .command("add <names...>")
  .description("Alias for features:add")
  .option("-r, --repo <repo>", "Source repository (owner/repo)")
  .action(async (names, options, command) => {
    const { addFeatures } = await import("./commands/features.js");
    await addFeatures(names, options, command.optsWithGlobals().verbose);
  });

// rm -> features:rm
program
  .command("rm <name>")
  .description("Alias for features:rm")
  .action(async (name, options, command) => {
    const { removeFeature } = await import("./commands/features.js");
    await removeFeature(name, command.optsWithGlobals().verbose);
  });

// sync -> features:sync
program
  .command("sync")
  .description("Regenerate features config")
  .action(async (options, command) => {
    const { sync } = await import("./commands/sync.js");
    await sync(command.optsWithGlobals().verbose);
  });

program.parse(process.argv);
