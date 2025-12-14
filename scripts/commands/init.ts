import { join } from "path";
import { randomBytes } from "crypto";
import { createLogger } from "../logger.js";
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "fs";

const PAYLOAD_SECRET_KEY = "PAYLOAD_SECRET";
const SECRET_LENGTH = 32; // 32 bytes = 64 hex chars

/**
 * Generates a random secure secret
 */
function _generateSecret(): string {
  return randomBytes(SECRET_LENGTH).toString("hex");
}

/**
 * Handles the creation of the .env file from .env.example
 */
function _ensureEnvFile(
  rootDir: string,
  logger: ReturnType<typeof createLogger>,
): boolean {
  const envExamplePath = join(rootDir, ".env.example");
  const envPath = join(rootDir, ".env");

  if (!existsSync(envExamplePath)) {
    logger.error(
      "❌ Error: .env.example file not found in the root directory.",
    );
    return false;
  }

  if (existsSync(envPath)) {
    logger.warn(
      "⚠  .env file already exists, preserving existing configuration",
    );
    return true;
  }

  const spinner = logger
    .spinner("Creating .env file from .env.example...")
    .start();
  try {
    copyFileSync(envExamplePath, envPath);
    spinner.succeed("Created .env file");
    return true;
  } catch (error) {
    spinner.fail("Failed to create .env file");
    throw error;
  }
}

/**
 * Ensures PAYLOAD_SECRET is set in the .env file
 */
function _ensurePayloadSecret(
  rootDir: string,
  logger: ReturnType<typeof createLogger>,
): void {
  const envPath = join(rootDir, ".env");
  let envContent = readFileSync(envPath, "utf-8");

  // Regex to find commented or empty PAYLOAD_SECRET
  // Matches: # PAYLOAD_SECRET=... or PAYLOAD_SECRET= (empty)
  const commentedSecretRegex = /^#\s*PAYLOAD_SECRET=.*$/m;
  const emptySecretRegex = /^PAYLOAD_SECRET=$/m;

  if (
    commentedSecretRegex.test(envContent) ||
    emptySecretRegex.test(envContent)
  ) {
    const spinner = logger
      .spinner("Generating secure PAYLOAD_SECRET...")
      .start();
    const secret = _generateSecret();
    const replacement = `${PAYLOAD_SECRET_KEY}=${secret}`;

    if (commentedSecretRegex.test(envContent)) {
      envContent = envContent.replace(commentedSecretRegex, replacement);
    } else {
      envContent = envContent.replace(emptySecretRegex, replacement);
    }

    writeFileSync(envPath, envContent, "utf-8");
    spinner.succeed("Generated PAYLOAD_SECRET");
  } else {
    logger.info("ℹ  PAYLOAD_SECRET is already configured");
  }
}

/**
 * Public API: Initialize the project environment
 */
export async function init(verbose: boolean = false): Promise<void> {
  const logger = createLogger(verbose);
  const rootDir = process.cwd();

  logger.info("\n🚀 BenchCMS Initialization\n");

  if (!_ensureEnvFile(rootDir, logger)) {
    return;
  }

  try {
    _ensurePayloadSecret(rootDir, logger);
    logger.success("\n✨ Initialization complete! You are ready to go.\n");
  } catch (error) {
    logger.error("\n❌ Initialization failed with an error:", error);
    process.exit(1);
  }
}
