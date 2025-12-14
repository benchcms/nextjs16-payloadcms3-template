import "dotenv/config";
import pg from "pg";
import { join } from "path";
import { execSync } from "child_process";
import { rmSync, existsSync } from "fs";
import { createLogger } from "../logger.js";

const { Client } = pg;

/**
 * Execute a shell command and pipe output to parent process
 */
function _runCommand(command: string, logger: ReturnType<typeof createLogger>) {
  logger.debug(`> ${command}`);
  execSync(command, { stdio: "inherit" });
}

/**
 * Public API: Reset database, clear migrations, and clean install
 */
export async function syncDatabase(verbose: boolean = false): Promise<void> {
  const logger = createLogger(verbose);
  const rootDir = process.cwd();
  const migrationsDir = join(rootDir, "migrations");
  const connectionString = process.env.DATABASE_URI;

  if (!connectionString) {
    logger.error("❌ DATABASE_URI is not defined in environment variables.");
    process.exit(1);
  }

  logger.info("\n🔄 Starting database sync (ROBUST MODE)...\n");

  const client = new Client({
    connectionString,
  });

  try {
    // 1. Wipe database (Drop and recreate public schema)
    logger.warn("1. Wiping database...");
    await client.connect();
    await client.query("DROP SCHEMA public CASCADE;");
    await client.query("CREATE SCHEMA public;");
    await client.end();
    logger.success("   ✔ Database wiped (public schema recreated)");

    // 2. Delete migrations folder
    logger.warn("\n2. Clearing migrations folder...");
    if (existsSync(migrationsDir)) {
      rmSync(migrationsDir, { recursive: true, force: true });
      logger.success("   ✔ Migrations folder deleted");
    } else {
      logger.dim("   ✔ No migrations folder to delete");
    }

    // 3. Create new migration
    logger.warn("\n3. Generating new migration...");
    _runCommand("npx payload migrate:create", logger);

    // 4. Apply migrations
    logger.warn("\n4. Applying migrations...");
    _runCommand("npx payload migrate", logger);

    logger.success("\n✨ Database sync complete! Database is fresh and ready.");
  } catch (error) {
    logger.error("\n❌ Database sync failed:", error);
    // Ensure client is closed on error
    try {
      await client.end();
    } catch {}
    process.exit(1);
  }
}
