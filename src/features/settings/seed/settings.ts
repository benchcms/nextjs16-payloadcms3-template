import { Payload } from "payload";
import { faker } from "@faker-js/faker";

export async function seedSettings(payload: Payload) {
  console.log("🌱 Seeding settings...");

  await payload.updateGlobal({
    slug: "settings",
    data: {
      contact: {
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
      googleAnalyticsId: `G-${faker.string.alphanumeric(10).toUpperCase()}`,
    },
  });

  console.log("✅ Settings seeded");
}
