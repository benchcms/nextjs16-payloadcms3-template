import { join } from "path";
import { readdirSync, writeFileSync, statSync, existsSync } from "fs";
import type { Logger } from "../logger.js";

/**
 * Convert string to camelCase
 */
export function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Regenerates the src/features/config.ts file based on subdirectories in src/features
 */
export function regenerateFeaturesConfig(logger: Logger) {
  const featuresDir = join(process.cwd(), "src/features");
  const configFile = join(featuresDir, "config.ts");

  if (!existsSync(featuresDir)) {
    logger.warn(`Warning: ${featuresDir} does not exist.`);
    return;
  }

  // Get all directories in src/features that are not hidden, not 'test', and have a config.ts
  const features = readdirSync(featuresDir).filter((file) => {
    const fullPath = join(featuresDir, file);
    if (!statSync(fullPath).isDirectory()) return false;
    if (file.startsWith(".") || file === "test") return false;

    // Ideally we check if config.ts exists inside, but let's assume if the folder is there it's a feature
    // or strictly check for config.ts to avoid breaking import
    return existsSync(join(fullPath, "config.ts"));
  });

  logger.debug(`Scanning ${featuresDir}...`);
  logger.debug(
    `Found ${features.length} features: ${features.join(", ") || "none"}`,
  );

  const imports = features
    .map((f) => `import ${toCamelCase(f)} from "./${f}/config";`)
    .join("\n");

  const arrayItems = features.map((f) => `  ${toCamelCase(f)},`).join("\n");

  const content =
    features.length === 0
      ? `import type { Feature } from "@core/types";

const features: Feature[] = [];

export const seeds = features.flatMap((f) => f.seeds);
export const globals = features.flatMap((f) => f.globals);
export const collections = features.flatMap((f) => f.collections);
`
      : `import type { Feature } from "@core/types";
${imports}

const features: Feature[] = [
${arrayItems}
];

export const seeds = features.flatMap((f) => f.seeds);
export const globals = features.flatMap((f) => f.globals);
export const collections = features.flatMap((f) => f.collections);
`;

  writeFileSync(configFile, content, "utf-8");
  logger.debug(`Writing config to ${configFile}`);
  logger.success(
    `✔ Regenerated features config with ${features.length} features`,
  );
}
