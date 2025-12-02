import path from "path";
import { Payload } from "payload";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";
import { seedAsset } from "@/src/utils/seed";
import { createRichTextParagraphs } from "@/src/utils/lexical";
import { toSlug } from "@/src/fields/SlugField";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedCatalog(payload: Payload) {
    console.log("🌱 Seeding catalog...");

    const categoryImage = await seedAsset(payload, __dirname, "catalog-category-placeholder.png", "Catalog Category Placeholder");
    // Use category image as fallback if item image is missing
    const catalogItemImage = await seedAsset(payload, __dirname, "catalog-item-placeholder.png", "Catalog Item Placeholder") || categoryImage;

    // Create categories (nested)
    const categories = [];
    const rootCategories = [];

    // Create 3 root categories
    for (let i = 0; i < 3; i++) {
        const name = faker.commerce.department();
        const slug = toSlug(name);

        const existing = await payload.find({
            collection: "catalog-categories",
            where: { slug: { equals: slug } },
            limit: 1,
        });

        let category;
        if (existing.docs.length === 0) {
            category = await payload.create({
                collection: "catalog-categories",
                data: {
                    name,
                    description: faker.lorem.sentence(),
                    slug,
                    order: i,
                    image: categoryImage?.id,
                },
            });
        } else {
            category = existing.docs[0];
        }
        categories.push(category);
        rootCategories.push(category);

        // Create 2 subcategories for each root category
        for (let j = 0; j < 2; j++) {
            const subName = `${name} - ${faker.commerce.productAdjective()}`;
            const subSlug = toSlug(subName);

            const existingSub = await payload.find({
                collection: "catalog-categories",
                where: { slug: { equals: subSlug } },
                limit: 1,
            });

            if (existingSub.docs.length === 0) {
                const subCategory = await payload.create({
                    collection: "catalog-categories",
                    data: {
                        name: subName,
                        description: faker.lorem.sentence(),
                        slug: subSlug,
                        order: j,
                        image: categoryImage?.id,
                        parent: category.id,
                    },
                });
                categories.push(subCategory);
            } else {
                categories.push(existingSub.docs[0]);
            }
        }
    }
    console.log(`  ✓ Created/found ${categories.length} categories`);

    // Create items
    let createdItems = 0;
    for (let i = 0; i < 20; i++) {
        const name = faker.commerce.productName();
        const slug = toSlug(name);

        const existing = await payload.find({
            collection: "catalog-items",
            where: { slug: { equals: slug } },
            limit: 1,
        });

        if (existing.docs.length === 0) {
            // Assign to 1-3 random categories
            const assignedCategories = faker.helpers.arrayElements(categories, faker.number.int({ min: 1, max: 3 })).map(c => c.id);

            await payload.create({
                collection: "catalog-items",
                data: {
                    name,
                    slug,
                    categories: assignedCategories,
                    price: parseFloat(faker.commerce.price()),
                    description: createRichTextParagraphs(
                        Array.from({ length: 3 }, () => faker.lorem.paragraph())
                    ),
                    gallery: catalogItemImage ? [catalogItemImage.id] : [],
                    specifications: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => ({
                        name: faker.commerce.productMaterial(),
                        value: faker.commerce.productAdjective(),
                    })),
                    order: i,
                },
            });
            createdItems++;
        }
    }
    console.log(`  ✓ Created ${createdItems} items`);

    console.log("✅ Catalog seeded");
}
