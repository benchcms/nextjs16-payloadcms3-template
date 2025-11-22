import "dotenv/config";
import { getPayload } from "payload";
import configPromise from "@/src/payload.config";

// Import all seed functions
import { seedCompany } from "../seed/company";
import { seedHours } from "../seed/hours";
import { seedBlog } from "../seed/blog";
import { seedTeam } from "../seed/team";
import { seedFAQ } from "../seed/faq";
import { seedRestaurant } from "../seed/restaurant";
import { seedEvents } from "../seed/events";
import { seedJobs } from "../seed/jobs";
import { seedTestimonials } from "../seed/testimonials";
import { seedPress } from "../seed/press";

async function seed() {
    console.log("🌱 Starting database seed...\n");

    const payload = await getPayload({ config: configPromise });

    try {
        // Seed in order (globals first, then collections)
        await seedCompany(payload);
        await seedHours(payload);
        await seedBlog(payload);
        await seedTeam(payload);
        await seedFAQ(payload);
        await seedRestaurant(payload);
        await seedEvents(payload);
        await seedJobs(payload);
        await seedTestimonials(payload);
        await seedPress(payload);

        console.log("\n🎉 Database seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("\n❌ Seed failed:", error);
        process.exit(1);
    }
}

// Run seed
seed();
