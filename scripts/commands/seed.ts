import "dotenv/config";
import chalk from "chalk";
import { getPayload } from "payload";

import type { SeedContext } from "@/src/features/types";
import type { Command } from "./types.js";

async function runSeed(context: SeedContext) {
  console.log(
    chalk.blue(`\n🌱 Starting database seed for context: ${context}...\n`),
  );

  const { default: configPromise } = await import("@/src/payload.config");
  const payload = await getPayload({ config: configPromise });

  // Dynamic import of features config to avoid load-time errors if config is broken
  const { seeds } = await import("@/src/features/config");

  try {
    for (const seed of seeds) {
      await seed(payload, context);
    }

    console.log(chalk.green("\n🎉 Database seeded successfully!"));
    process.exit(0);
  } catch (error) {
    console.error(chalk.red("\n❌ Seed failed:"), error);
    process.exit(1);
  }
}

export const seedCommand: Command = {
  description: "Seed the database with initial data",
  execute: async (args: string[]) => {
    const contextArg = args[0];
    const context: SeedContext = (contextArg as SeedContext) || "default";
    await runSeed(context);
  },
};
