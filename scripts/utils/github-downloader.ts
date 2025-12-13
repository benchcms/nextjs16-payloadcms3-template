import { extract } from "tar";
import {
  mkdirSync,
  existsSync,
  rmSync,
  renameSync,
  mkdtempSync,
  createWriteStream,
} from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import chalk from "chalk";

interface DownloadOptions {
  repoOwner: string;
  repoName: string;
  branch?: string;
}

interface ComponentMapping {
  /** Path within the repo (e.g., "events" or "google-analytics") */
  componentPath: string;
  /** Target directory on the local filesystem */
  targetDir: string;
}

/**
 * Downloads multiple components from a GitHub repository in a single archive download.
 * Downloads tar -> Extracts to temp -> Moves all components -> Cleanup
 */
export async function downloadComponents(
  { repoOwner, repoName, branch = "master" }: DownloadOptions,
  components: ComponentMapping[],
): Promise<void> {
  if (components.length === 0) {
    return;
  }

  // Check all target directories before starting
  for (const { targetDir } of components) {
    if (existsSync(targetDir)) {
      throw new Error(`Target directory already exists: ${targetDir}`);
    }
  }

  const url = `https://github.com/${repoOwner}/${repoName}/archive/refs/heads/${branch}.tar.gz`;
  console.log(chalk.dim(`Downloading from: ${url}`));

  // Create temp directory for extraction
  const tempDir = mkdtempSync(join(tmpdir(), "benchcms-"));
  const tarPath = join(tempDir, "source.tar.gz");

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `Repository or branch not found: ${repoOwner}/${repoName}#${branch}`,
        );
      }
      throw new Error(
        `Failed to download archive: ${response.status} ${response.statusText}`,
      );
    }

    if (!response.body) {
      throw new Error("Response body is empty");
    }

    // 1. Download tarball to temp file
    // @ts-ignore - Readable.fromWeb is available in recent Node versions
    await pipeline(
      Readable.fromWeb(response.body as any),
      createWriteStream(tarPath),
    );

    console.log(chalk.dim("   Download complete. Extracting..."));

    // 2. Extract tarball
    await extract({
      file: tarPath,
      cwd: tempDir,
      strip: 1, // Remove the root folder (repo-branch)
    });

    // 3. Move all component folders to their targets
    for (const { componentPath, targetDir } of components) {
      const sourcePath = join(tempDir, componentPath);

      if (!existsSync(sourcePath)) {
        throw new Error(
          `Component '${componentPath}' not found in repository.`,
        );
      }

      // Ensure parent dir of target exists
      mkdirSync(join(targetDir, ".."), { recursive: true });

      renameSync(sourcePath, targetDir);
      console.log(chalk.dim(`   Extracted: ${componentPath}`));
    }
  } catch (error) {
    throw error;
  } finally {
    // 4. Cleanup
    try {
      if (existsSync(tempDir)) {
        rmSync(tempDir, { recursive: true, force: true });
      }
    } catch (cleanupError) {
      console.warn("Failed to clean up temp directory:", cleanupError);
    }
  }
}

/**
 * Downloads a specific folder from a GitHub repository.
 * Convenience wrapper for single-component downloads.
 */
export async function downloadComponent({
  repoOwner,
  repoName,
  branch = "master",
  componentPath,
  targetDir,
}: DownloadOptions & ComponentMapping): Promise<void> {
  await downloadComponents({ repoOwner, repoName, branch }, [
    { componentPath, targetDir },
  ]);
}
