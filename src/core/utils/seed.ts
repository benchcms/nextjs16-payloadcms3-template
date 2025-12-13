import fs from "fs";
import path from "path";
import { Payload } from "payload";

export async function seedAsset(
  payload: Payload,
  baseDir: string,
  fileName: string,
  alt: string,
) {
  const filePath = path.join(baseDir, "assets", fileName);

  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: Seed asset not found at ${filePath}`);
    return null;
  }

  // Clean up orphan files (files that exist in uploads but not in DB)
  // This prevents accumulation of duplicates like filename-1.png, filename-2.png
  const uploadDir = path.join(process.cwd(), "uploads");
  const parsed = path.parse(fileName);
  const name = parsed.name;
  const ext = parsed.ext;
  const regex = new RegExp(`^${name}(-\\d+)?${ext}$`);

  if (fs.existsSync(uploadDir)) {
    const files = fs.readdirSync(uploadDir);
    for (const file of files) {
      if (regex.test(file)) {
        const existingInDb = await payload.find({
          collection: "media",
          where: {
            filename: {
              equals: file,
            },
          },
          limit: 1,
        });

        if (existingInDb.docs.length === 0) {
          try {
            fs.unlinkSync(path.join(uploadDir, file));
            console.log(`  Deleted orphan file: ${file}`);
          } catch (e) {
            console.warn(`  Failed to delete orphan file: ${file}`, e);
          }
        }
      }
    }
  }

  const fileBuffer = fs.readFileSync(filePath);

  return await payload.create({
    collection: "media",
    data: { alt },
    file: {
      data: fileBuffer,
      name: fileName,
      mimetype: "image/png",
      size: fileBuffer.length,
    },
  });
}
