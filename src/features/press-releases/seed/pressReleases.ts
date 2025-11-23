import { Payload } from "payload";
import { faker } from "@faker-js/faker";
import { createRichText } from "@/src/utils/lexical";

export async function seedPressReleases(payload: Payload) {
  console.log("🌱 Seeding press releases...");

  for (let i = 0; i < 10; i++) {
    await payload.create({
      collection: "press-releases",
      data: {
        title: faker.lorem.sentence(),
        journal: faker.helpers.maybe(
          () =>
            faker.company.name() +
            " " +
            faker.helpers.arrayElement(["News", "Times", "Journal", "Post"])
        ),
        excerpt: faker.helpers.maybe(() =>
          createRichText(faker.lorem.paragraph())
        ),
        link: faker.helpers.maybe(() => faker.internet.url()),
        publishedDate: faker.date.past({ years: 1 }).toISOString(),
      },
    });
  }

  console.log("  ✓ Created 10 press releases");
  console.log("✅ Press releases seeded");
}
