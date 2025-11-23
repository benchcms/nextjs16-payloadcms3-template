import { Payload } from "payload";
import { faker } from "@faker-js/faker";

export async function seedRestaurantMenu(payload: Payload) {
  console.log("🌱 Seeding restaurant menu...");

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

  console.log(`  ✓ Created ${categories.length} menu categories`);
  console.log("✅ Restaurant menu seeded");
}
