import { Payload } from "payload";
import { faker } from "@faker-js/faker";

export async function seedCompany(payload: Payload) {
    console.log("🌱 Seeding company info...");

    await payload.updateGlobal({
        slug: "company-info",
        data: {
            description: faker.company.catchPhrase() + ". " + faker.company.buzzPhrase() + ".",
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
        },
    });

    console.log("✅ Company info seeded");
}
