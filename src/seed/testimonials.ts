import { Payload } from "payload";
import { faker } from "@faker-js/faker";

export async function seedTestimonials(payload: Payload) {
    console.log("🌱 Seeding testimonials...");

    for (let i = 0; i < 12; i++) {
        await payload.create({
            collection: "testimonials",
            data: {
                client: faker.person.fullName(),
                company: faker.helpers.maybe(() => faker.company.name()),
                quote: faker.lorem.paragraph(),
                rating: faker.number.int({ min: 4, max: 5 }),
                date: faker.date.past({ years: 2 }).toISOString(),
            },
        });
    }

    console.log("  ✓ Created 12 testimonials");
    console.log("✅ Testimonials seeded");
}
