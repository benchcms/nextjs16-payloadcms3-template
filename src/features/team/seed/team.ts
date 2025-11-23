import { Payload } from "payload";
import { faker } from "@faker-js/faker";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedTeam(payload: Payload) {
  console.log("🌱 Seeding team...");

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

  const teamMemberImage = await seedAsset("team-member-placeholder.png", "Team Member Placeholder");

  const departments = ["Leadership", "Engineering", "Sales", "Marketing"];

  for (let i = 0; i < departments.length; i++) {
    await payload.create({
      collection: "team",
      data: {
        name: departments[i],
        slug: faker.helpers.slugify(departments[i]).toLowerCase(),
        order: i,
        items: Array.from(
          { length: faker.number.int({ min: 3, max: 6 }) },
          () => ({
            name: faker.person.fullName(),
            role: faker.person.jobTitle(),
            bio: faker.person.bio(),
            photo: teamMemberImage?.id,
            email: faker.internet.email(),
            phone: faker.phone.number(),
            linkedin: faker.helpers.maybe(
              () => `https://linkedin.com/in/${faker.internet.username()}`
            ),
            twitter: faker.helpers.maybe(
              () => `https://twitter.com/${faker.internet.username()}`
            ),
          })
        ),
      },
    });
  }

  console.log(`  ✓ Created ${departments.length} team groups`);
  console.log("✅ Team seeded");
}
