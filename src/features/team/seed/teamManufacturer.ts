import path from "path";
import { Payload } from "payload";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";
import { seedAsset } from "@/src/utils/seed";
import { toSlug } from "@/src/fields/SlugField";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedTeamManufacturer(payload: Payload) {
  console.log("🌱 Seeding team (manufacturer context)...");

  const teamMemberImage = await seedAsset(
    payload,
    __dirname,
    "team-member-placeholder.png",
    "Team Member Placeholder",
  );

  const departments = ["Production", "Quality Control", "Logistics", "Management"];

  for (let i = 0; i < departments.length; i++) {
    const slug = toSlug(departments[i]);

    const existing = await payload.find({
      collection: "team",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      await payload.create({
        collection: "team",
        data: {
          name: departments[i],
          slug,
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
                () => `https://linkedin.com/in/${faker.internet.username()}`,
              ),
              twitter: faker.helpers.maybe(
                () => `https://twitter.com/${faker.internet.username()}`,
              ),
            }),
          ),
        },
      });
    }
  }

  console.log(`  ✓ Created ${departments.length} team groups`);
  console.log("✅ Team seeded");
}
