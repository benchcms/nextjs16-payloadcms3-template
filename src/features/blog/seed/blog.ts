import { Payload } from "payload";
import { faker } from "@faker-js/faker";
import { createRichTextParagraphs } from "@/src/utils/lexical";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedBlog(payload: Payload) {
  console.log("🌱 Seeding blog...");

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

  const categoryImage = await seedAsset("blog-category-placeholder.png", "Blog Category Placeholder");
  const authorImage = await seedAsset("blog-author-placeholder.png", "Blog Author Placeholder");
  const postImage = await seedAsset("blog-post-placeholder.png", "Blog Post Placeholder");

  // Create categories
  const categories = [];
  for (let i = 0; i < 5; i++) {
    const name = faker.word.noun();
    const category = await payload.create({
      collection: "blog-categories",
      data: {
        name,
        description: faker.lorem.sentence(),
        slug: faker.helpers.slugify(name).toLowerCase(),
        order: i,
        icon: categoryImage?.id,
      },
    });
    categories.push(category);
  }
  console.log(`  ✓ Created ${categories.length} categories`);

  // Create authors
  const authors = [];
  for (let i = 0; i < 3; i++) {
    const name = faker.person.fullName();
    const author = await payload.create({
      collection: "blog-authors",
      data: {
        name,
        description: faker.person.bio(),
        slug: faker.helpers.slugify(name).toLowerCase(),
        order: i,
        icon: authorImage?.id,
      },
    });
    authors.push(author);
  }
  console.log(`  ✓ Created ${authors.length} authors`);

  // Create blog posts
  for (let i = 0; i < 15; i++) {
    const title = faker.lorem.sentence();
    await payload.create({
      collection: "blog-posts",
      data: {
        title,
        slug: faker.helpers.slugify(title).toLowerCase(),
        content: createRichTextParagraphs(
          Array.from({ length: 5 }, () => faker.lorem.paragraph())
        ),
        excerpt: faker.lorem.paragraph(),
        publishedDate: faker.date.past().toISOString(),
        author: faker.helpers.arrayElement(authors).id,
        category: faker.helpers.arrayElement(categories).id,
        featuredImage: postImage?.id,
        tags: faker.helpers.maybe(() =>
          Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
            tag: faker.word.noun(),
          }))
        ),
      },
    });
  }
  console.log(`  ✓ Created 15 blog posts`);

  console.log("✅ Blog seeded");
}
