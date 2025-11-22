import { Payload } from "payload";

export async function seedHours(payload: Payload) {
    console.log("🌱 Seeding opening hours...");

    await payload.updateGlobal({
        slug: "opening-hours",
        data: {
            monday: { isOpen: true, open: "09:00", close: "18:00" },
            tuesday: { isOpen: true, open: "09:00", close: "18:00" },
            wednesday: { isOpen: true, open: "09:00", close: "18:00" },
            thursday: { isOpen: true, open: "09:00", close: "18:00" },
            friday: { isOpen: true, open: "09:00", close: "17:00" },
            saturday: { isOpen: true, open: "10:00", close: "16:00" },
            sunday: { isOpen: false },
        },
    });

    console.log("✅ Opening hours seeded");
}
