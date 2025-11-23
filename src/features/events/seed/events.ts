import { Payload } from "payload";
import { faker } from "@faker-js/faker";
import { createRichTextParagraphs } from "@/src/utils/lexical";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedEvents(payload: Payload) {
  console.log("🌱 Seeding events...");

  const seedAsset = async (fileName: string, alt: string) => {
    const filePath = path.join(__dirname, "assets", fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`Warning: Seed asset not found at ${filePath}`);
      return null;
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
  };

  const eventImage = await seedAsset("event-placeholder.png", "Event Placeholder");

  for (let i = 0; i < 10; i++) {
    const startDate = faker.date.future();
    const endDate = faker.helpers.maybe(
      () =>
        new Date(
          startDate.getTime() +
          faker.number.int({ min: 1, max: 8 }) * 60 * 60 * 1000
        )
    );

    await payload.create({
      collection: "events",
      data: {
        title: faker.lorem.sentence(),
        image: eventImage?.id,
        description: createRichTextParagraphs([
          faker.lorem.paragraph(),
          faker.lorem.paragraph(),
        ]),
        location: faker.location.city() + ", " + faker.location.country(),
        date: startDate.toISOString(),
        endDate: endDate?.toISOString(),
        virtualLink: faker.helpers.maybe(() => faker.internet.url()),
        registrationLink: faker.helpers.maybe(() => faker.internet.url()),
      },
    });
  }

  console.log("  ✓ Created 10 events");
  console.log("✅ Events seeded");
}
