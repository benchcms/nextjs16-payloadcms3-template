import { Payload } from "payload";
import { faker } from "@faker-js/faker";
import { createRichText } from "@/src/utils/lexical";

export async function seedFAQ(payload: Payload) {
    console.log("🌱 Seeding FAQ...");

    const categories = ["General", "Pricing", "Technical", "Support"];

    for (let i = 0; i < categories.length; i++) {
        await payload.create({
            collection: "faq",
            data: {
                name: categories[i],
                slug: faker.helpers.slugify(categories[i]).toLowerCase(),
                order: i,
                items: Array.from({ length: faker.number.int({ min: 3, max: 5 }) }, () => ({
                    question: faker.lorem.sentence() + "?",
                    answer: createRichText(faker.lorem.paragraph()),
                })),
            },
        });
    }

    console.log(`  ✓ Created ${categories.length} FAQ groups`);
    console.log("✅ FAQ seeded");
}
