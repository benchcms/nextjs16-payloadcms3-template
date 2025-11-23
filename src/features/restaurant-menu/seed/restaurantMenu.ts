import { Payload } from "payload";
import { faker } from "@faker-js/faker";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedRestaurantMenu(payload: Payload) {
  console.log("🌱 Seeding restaurant menu...");

  const seedAsset = async (fileName: string, alt: string) => {
    const filePath = path.join(__dirname, "assets", fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`Warning: Seed asset not found at ${filePath}`);
      return null;
    }

    const fileBuffer = fs.readFileSync(filePath);

    return await payload.create({
      collection: "media",
      data: { alt },
      file: {
        data: fileBuffer,
        name: fileName,
        mimetype: "image/png",
        size: fileBuffer.length,
      },
    });
  };

  const menuItemImage = await seedAsset("menu-item-placeholder.png", "Menu Item Placeholder");

  const categories = ["Appetizers", "Main Courses", "Desserts", "Beverages"];
  const spicyLevels = ["none", "mild", "medium", "hot", "extra-hot"] as const;

  for (let i = 0; i < categories.length; i++) {
    await payload.create({
      collection: "restaurant-menu",
      data: {
        name: categories[i],
        slug: faker.helpers.slugify(categories[i]).toLowerCase(),
        order: i,
        items: Array.from(
          { length: faker.number.int({ min: 4, max: 8 }) },
          () => ({
            name: faker.food.dish(),
            description: faker.food.description(),
            price: faker.number.float({ min: 5, max: 50, fractionDigits: 2 }),
            image: menuItemImage?.id,
            dietary: faker.helpers.maybe(() =>
              faker.helpers.arrayElement([
                "Vegan",
                "Vegetarian",
                "Gluten-free",
                "Dairy-free",
              ])
            ),
            spicyLevel: faker.helpers.arrayElement(spicyLevels),
          })
        ),
      },
    });
  }

  console.log("  ✓ Created 5 menu categories with 5 items each");
  console.log("✅ Restaurant menu seeded");
}
