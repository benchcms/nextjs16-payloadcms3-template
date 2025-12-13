import { readdirSync, writeFileSync, statSync, existsSync } from "fs";
import { join } from "path";
import chalk from "chalk";

/**
 * Convert string to camelCase
 */
export function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Regenerates the src/features/config.ts file based on subdirectories in src/features
 */
export function regenerateFeaturesConfig() {
  const featuresDir = join(process.cwd(), "src/features");
  const configFile = join(featuresDir, "config.ts");

  if (!existsSync(featuresDir)) {
    console.warn(chalk.yellow(`Warning: ${featuresDir} does not exist.`));
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

  const imports = features
    .map((f) => `import { ${toCamelCase(f)}Config } from "./${f}/config";`)
    .join("\n");

  const arrayItems = features
    .map((f) => `  ${toCamelCase(f)}Config,`)
    .join("\n");

  const content =
    features.length === 0
      ? `import type { Feature } from "./types";

const features: Feature[] = [];

export const seeds = features.flatMap((f) => f.seeds);
export const globals = features.flatMap((f) => f.globals);
export const collections = features.flatMap((f) => f.collections);
`
      : `import type { Feature } from "./types";
${imports}

const features: Feature[] = [
${arrayItems}
];

export const seeds = features.flatMap((f) => f.seeds);
export const globals = features.flatMap((f) => f.globals);
export const collections = features.flatMap((f) => f.collections);
`;

  writeFileSync(configFile, content, "utf-8");
  console.log(
    chalk.green(
      `✔ Regenerated features config with ${features.length} features.`,
    ),
  );
}

/**
 * Regenerates the src/integrations/config.ts file based on subdirectories in src/integrations
 */
export function regenerateIntegrationsConfig() {
  const integrationsDir = join(process.cwd(), "src/integrations");
  const configFile = join(integrationsDir, "config.ts");

  if (!existsSync(integrationsDir)) {
    console.warn(chalk.yellow(`Warning: ${integrationsDir} does not exist.`));
    return;
  }

  // Get all directories in src/integrations that have a config.ts
  const integrationsFileList = readdirSync(integrationsDir).filter((file) => {
    const fullPath = join(integrationsDir, file);
    if (!statSync(fullPath).isDirectory()) return false;
    if (file.startsWith(".") || file === "test") return false;
    return existsSync(join(fullPath, "config.ts"));
  });

  const imports = integrationsFileList
    .map((f) => `import { ${toCamelCase(f)} } from "./${f}/config";`)
    .join("\n");

  const arrayItems = integrationsFileList
    .map((f) => `  ${toCamelCase(f)},`)
    .join("\n");

  const content =
    integrationsFileList.length === 0
      ? `export const integrations = [];
`
      : `${imports}

export const integrations = [
${arrayItems}
];
`;

  writeFileSync(configFile, content, "utf-8");
  console.log(
    chalk.green(
      `✔ Regenerated integrations config with ${integrationsFileList.length} integrations.`,
    ),
  );
}
