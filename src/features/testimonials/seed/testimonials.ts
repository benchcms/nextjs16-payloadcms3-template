import { Payload } from "payload";
import { faker } from "@faker-js/faker";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedTestimonials(payload: Payload) {
  console.log("🌱 Seeding testimonials...");

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

  const authorImage = await seedAsset("testimonial-author-placeholder.png", "Testimonial Author Placeholder");

  for (let i = 0; i < 12; i++) {
    await payload.create({
      collection: "testimonials",
      data: {
        client: faker.person.fullName(),
        company: faker.helpers.maybe(() => faker.company.name()),
        quote: faker.lorem.paragraph(),
        photo: authorImage?.id,
        rating: faker.number.int({ min: 4, max: 5 }),
        date: faker.date.past({ years: 2 }).toISOString(),
      },
    });
  }

  console.log("  ✓ Created 12 testimonials");
  console.log("✅ Testimonials seeded");
}
