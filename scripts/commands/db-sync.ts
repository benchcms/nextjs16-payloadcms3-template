import { join } from "path";
import { execSync } from "child_process";
import { rmSync, existsSync } from "fs";
import pg from "pg";
import chalk from "chalk";
import type { Command } from "./types.js";

const { Client } = pg;

/**
 * Execute a shell command and pipe output to parent process
 */
const runCommand = (command: string) => {
  console.log(chalk.dim(`> ${command}`));
  execSync(command, { stdio: "inherit" });
};

async function runDbSync() {
  const rootDir = process.cwd();
  const migrationsDir = join(rootDir, "migrations");
  const connectionString = process.env.DATABASE_URI;

  if (!connectionString) {
    console.error(
      chalk.red("❌ DATABASE_URI is not defined in environment variables."),
    );
    process.exit(1);
  }

  console.log(chalk.blue("\n🔄 Starting database sync (ROBUST MODE)...\n"));

  const client = new Client({
    connectionString,
  });

  try {
    // 1. Wipe database (Drop and recreate public schema)
    console.log(chalk.yellow("1. Wiping database..."));
    await client.connect();
    await client.query("DROP SCHEMA public CASCADE;");
    await client.query("CREATE SCHEMA public;");
    await client.end();
    console.log(chalk.green("   ✔ Database wiped (public schema recreated)"));

    // 2. Delete migrations folder
    console.log(chalk.yellow("\n2. Clearing migrations folder..."));
    if (existsSync(migrationsDir)) {
      rmSync(migrationsDir, { recursive: true, force: true });
      console.log(chalk.green("   ✔ Migrations folder deleted"));
    } else {
      console.log(chalk.dim("   ✔ No migrations folder to delete"));
    }

    // 3. Create new migration
    console.log(chalk.yellow("\n3. Generating new migration..."));
    runCommand("npx payload migrate:create initial_schema");

    // 4. Apply migrations
    console.log(chalk.yellow("\n4. Applying migrations..."));
    runCommand("npx payload migrate");

    console.log(
      chalk.bold.green(
        "\n✨ Database sync complete! Database is fresh and ready.",
      ),
    );
  } catch (error) {
    console.error(chalk.red("\n❌ Database sync failed:"));
    console.error(error);
    // Ensure client is closed on error
    try {
      await client.end();
    } catch {}
    process.exit(1);
  }
}

export const dbSyncCommand: Command = {
  description:
    "Reset DB, clear migrations, and clean install (reset -> clean -> create -> migrate)",
  execute: async () => {
    await runDbSync();
  },
};
