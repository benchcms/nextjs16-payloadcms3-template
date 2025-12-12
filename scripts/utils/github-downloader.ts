import { extract } from "tar";
import { mkdirSync, existsSync } from "fs";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import chalk from "chalk";

interface DownloadOptions {
  repoOwner: string;
  repoName: string;
  branch?: string;
  componentPath: string; // Path within the repo, e.g., "features/events" or just "events" if at root?
  targetDir: string;
}

/**
 * Downloads a specific folder from a GitHub repository using the Archive API and Node.js streams.
 * No git client required.
 */
export async function downloadComponent({
  repoOwner,
  repoName,
  branch = "master",
  componentPath,
  targetDir,
}: DownloadOptions): Promise<void> {
  if (existsSync(targetDir)) {
    throw new Error(`Target directory already exists: ${targetDir}`);
  }

  const url = `https://github.com/${repoOwner}/${repoName}/archive/refs/heads/${branch}.tar.gz`;
  console.log(chalk.dim(`Downloading from: ${url}`));

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

    // Ensure parent dir exists
    // mkdirSync(targetDir, { recursive: true }); // tar will likely create the dir structure if we pipe correctly, but let's see.
    // Actually, we want to extract INTO the target dir, but usually we extract to a temp dir and then move.
    // However, `tar.extract` with `cwd` and `strip` might work directly if we create the target dir first.
    // BUT we need to filter for the specific component folder.

    // Let's create the target directory
    mkdirSync(targetDir, { recursive: true });

    // Stream the body to tar extractor
    // We need to transform the Web ReadableStream to a Node Readable stream if fetch is standard fetch.
    // In Node 20+ global fetch is available. 'stream.Readable.fromWeb' can convert.
    // However, if we are in environment where Response.body is already an async iterable (it is in standard fetch),
    // Readable.from() handles it.

    const nodeStream = Readable.fromWeb(response.body as any);

    // The GitHub archive wraps everything in `${repoName}-${branch}` folder.
    // e.g. nextjs16-payloadcms3-features-main/features/events/...
    // We want to extract only files starting with `${repoName}-${branch}/${componentPath}`
    // And we want to strip that prefix so they land in `targetDir`.

    // NOTE: simpler approach might be extracting to a temp dir and moving.
    // But let's try to be streamed.

    let foundAny = false;

    await pipeline(
      nodeStream,
      extract({
        cwd: targetDir,
        strip: 1 + componentPath.split("/").length, // Strip repo-branch/ + component/path/ parts
        filter: (path) => {
          // We have to match the full path inside tar
          // e.g. benchcms-features-main/src/features/foo/index.ts
          // Matches if path starts with `${repoName}-${branch}/${componentPath}/`

          // Actually, GitHub archive root folder name is not guaranteed to be just repo-branch.
          // It is usually `${repo}-${branch}` but `repo` might be normalized.
          // BUT, tar passes the path. The first segment is the root folder.

          const parts = path.split("/");
          if (parts.length < 2) return false; // Likely root folder itself

          // We don't know the exact root folder name easily without peeking.
          // But effectively we want `*/${componentPath}/*`

          // Let's construct the relative path inside the archive AFTER the root folder.
          const relativePath = parts.slice(1).join("/");

          if (!relativePath) return false;

          // Check if this file belongs to the component
          // componentPath might be "features/events"
          // relativePath might be "features/events/index.ts"
          if (
            relativePath.startsWith(componentPath + "/") ||
            relativePath === componentPath
          ) {
            foundAny = true;
            return true;
          }

          return false;
        },
      }),
    );

    if (!foundAny) {
      // If tar finished but nothing matched, cleanup and throw
      // It means the component path was not found in the archive
      throw new Error(`Component '${componentPath}' not found in repository.`);
    }
  } catch (error) {
    // Cleanup if partially created
    // if (existsSync(targetDir)) rmSync(targetDir, { recursive: true, force: true });
    throw error;
  }
}
