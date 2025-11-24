import path from "path";
import { Payload } from "payload";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";
import { seedAsset } from "@/src/utils/seed";
import { createRichTextParagraphs } from "@/src/utils/lexical";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedBlog(payload: Payload) {
  console.log("🌱 Seeding blog...");

  const categoryImage = await seedAsset(payload, __dirname, "blog-category-placeholder.png", "Blog Category Placeholder");
  const authorImage = await seedAsset(payload, __dirname, "blog-author-placeholder.png", "Blog Author Placeholder");
  const postImage = await seedAsset(payload, __dirname, "blog-post-placeholder.png", "Blog Post Placeholder");

  // Create categories
  const categories = [];
  for (let i = 0; i < 5; i++) {
    const name = faker.word.noun();
    const slug = faker.helpers.slugify(name).toLowerCase();

    const existing = await payload.find({
      collection: "blog-categories",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      const category = await payload.create({
        collection: "blog-categories",
        data: {
          name,
          description: faker.lorem.sentence(),
          slug,
          order: i,
          icon: categoryImage?.id,
        },
      });
      categories.push(category);
    } else {
      categories.push(existing.docs[0]);
    }
  }
  console.log(`  ✓ Created/found ${categories.length} categories`);

  // Create authors
  const authors = [];
  for (let i = 0; i < 3; i++) {
    const name = faker.person.fullName();
    const slug = faker.helpers.slugify(name).toLowerCase();

    const existing = await payload.find({
      collection: "blog-authors",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      const author = await payload.create({
        collection: "blog-authors",
        data: {
          name,
          description: faker.person.bio(),
          slug,
          order: i,
          icon: authorImage?.id,
        },
      });
      authors.push(author);
    } else {
      authors.push(existing.docs[0]);
    }
  }
  console.log(`  ✓ Created/found ${authors.length} authors`);

  // Create blog posts
  let createdPosts = 0;
  for (let i = 0; i < 15; i++) {
    const title = faker.lorem.sentence();
    const slug = faker.helpers.slugify(title).toLowerCase();

    const existing = await payload.find({
      collection: "blog-posts",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      await payload.create({
        collection: "blog-posts",
        data: {
          title,
          slug,
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
      createdPosts++;
    }
  }
  console.log(`  ✓ Created ${createdPosts} blog posts`);

  console.log("✅ Blog seeded");
}
