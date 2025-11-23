import { Payload } from "payload";
import { faker } from "@faker-js/faker";
import { createRichTextParagraphs } from "@/src/utils/lexical";

export async function seedJobOffers(payload: Payload) {
  console.log("🌱 Seeding job offers...");

  for (let i = 0; i < 8; i++) {
    await payload.create({
      collection: "job-offers",
      data: {
        title: faker.person.jobTitle(),
        location: faker.location.city() + ", " + faker.location.country(),
        description: createRichTextParagraphs([
          faker.lorem.paragraph(),
          faker.lorem.paragraph(),
          faker.lorem.paragraph(),
        ]),
        requirements: createRichTextParagraphs([
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
        ]),
        applicationLink: faker.internet.url(),
        active: faker.datatype.boolean({ probability: 0.7 }),
        postedDate: faker.date.recent({ days: 30 }).toISOString(),
      },
    });
  }

  console.log("  ✓ Created 8 job offers");
  console.log("✅ Job offers seeded");
}
