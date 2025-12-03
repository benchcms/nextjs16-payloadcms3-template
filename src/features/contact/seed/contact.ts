import { Payload } from "payload";
import { faker } from "@faker-js/faker";

export async function seedContact(payload: Payload) {
  console.log("🌱 Seeding contact...");

  await payload.updateGlobal({
    slug: "contact",
    data: {
      info: {
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(true),
      },
      socials: {
        facebook: `https://facebook.com/${faker.internet.username()}`,
        instagram: `https://instagram.com/${faker.internet.username()}`,
        linkedin: `https://linkedin.com/company/${faker.internet.username()}`,
        twitter: `https://twitter.com/${faker.internet.username()}`,
      },
    },
  });

  console.log("✅ Contact seeded");
}
