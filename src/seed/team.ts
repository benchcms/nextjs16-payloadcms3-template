import { Payload } from "payload";
import { faker } from "@faker-js/faker";

export async function seedTeam(payload: Payload) {
    console.log("🌱 Seeding team...");

    const departments = ["Leadership", "Engineering", "Sales", "Marketing"];

    for (let i = 0; i < departments.length; i++) {
        await payload.create({
            collection: "team",
            data: {
                name: departments[i],
                slug: faker.helpers.slugify(departments[i]).toLowerCase(),
                order: i,
                items: Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () => ({
                    name: faker.person.fullName(),
                    role: faker.person.jobTitle(),
                    bio: faker.person.bio(),
                    email: faker.internet.email(),
                    phone: faker.phone.number(),
                    linkedin: faker.helpers.maybe(() => `https://linkedin.com/in/${faker.internet.username()}`),
                    twitter: faker.helpers.maybe(() => `https://twitter.com/${faker.internet.username()}`),
                })),
            },
        });
    }

    console.log(`  ✓ Created ${departments.length} team groups`);
    console.log("✅ Team seeded");
}
