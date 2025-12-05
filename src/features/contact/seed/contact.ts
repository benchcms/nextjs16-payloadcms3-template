import { Payload } from "payload";
import { faker } from "@faker-js/faker";

export async function seedContact(payload: Payload) {
  console.log("🌱 Seeding contact...");

  await payload.updateGlobal({
    slug: "contact",
    data: {
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(true),
    },
  });

  console.log("✅ Contact seeded");
}
