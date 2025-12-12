#!/usr/bin/env tsx

import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { dbSyncCommand } from "./commands/db-sync.js";
import { seedCommand } from "./commands/seed.js";

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
  .description(initCommand.description)
  .action(async () => {
    try {
      await initCommand.execute([]);
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

// Register the seed command
program
  .command("db:seed [context]")
  .description(seedCommand.description)
  .action(async (context) => {
    try {
      await seedCommand.execute(context ? [context] : []);
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

// Register the db:sync command
program
  .command("db:sync")
  .description(dbSyncCommand.description)
  .action(async () => {
    try {
      await dbSyncCommand.execute([]);
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse(process.argv);
