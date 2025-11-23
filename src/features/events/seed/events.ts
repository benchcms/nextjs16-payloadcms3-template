import { Payload } from "payload";
import { faker } from "@faker-js/faker";
import { createRichTextParagraphs } from "@/src/utils/lexical";

export async function seedEvents(payload: Payload) {
  console.log("🌱 Seeding events...");

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
