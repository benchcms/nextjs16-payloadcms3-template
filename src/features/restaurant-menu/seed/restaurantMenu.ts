import path from "path";
import { Payload } from "payload";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";
import { seedAsset } from "@/src/utils/seed";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedRestaurantMenu(payload: Payload) {
  console.log("🌱 Seeding restaurant menu...");

  const menuItemImage = await seedAsset(payload, __dirname, "menu-item-placeholder.png", "Menu Item Placeholder");

  const categories = ["Appetizers", "Main Courses", "Desserts", "Beverages"];
  const spicyLevels = ["none", "mild", "medium", "hot", "extra-hot"] as const;

  for (let i = 0; i < categories.length; i++) {
    const slug = faker.helpers.slugify(categories[i]).toLowerCase();

    const existing = await payload.find({
      collection: "restaurant-menu",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      await payload.create({
        collection: "restaurant-menu",
        data: {
          name: categories[i],
          slug,
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
  }

  console.log("  ✓ Created 5 menu categories with 5 items each");
  console.log("✅ Restaurant menu seeded");
}
