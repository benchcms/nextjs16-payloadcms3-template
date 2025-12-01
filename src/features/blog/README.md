# Blog

## Overview

The Blog feature manages blog posts, categories, and authors. It allows displaying a list of posts, filtering by category/author, and showing individual post details.

## Queries (Read Operations)

### `getBlogPosts(options?): Promise<BlogPost[]>`

Get a list of blog posts with optional filtering.

- **Parameters**: 
  - `options`: `{ limit?: number; page?: number; category?: string; author?: string; }`
- **Returns**: `Promise<BlogPost[]>`

### `getBlogPost(slug: string): Promise<BlogPost | null>`

Get a single blog post by slug.

- **Parameters**: `slug` (string)
- **Returns**: `Promise<BlogPost | null>`

### `getBlogCategories(): Promise<BlogCategory[]>`

Get all blog categories.

### `getBlogCategory(slug: string): Promise<BlogCategory | null>`

Get a single blog category by slug.

### `getBlogAuthors(): Promise<BlogAuthor[]>`

Get all blog authors.

### `getBlogAuthor(slug: string): Promise<BlogAuthor | null>`

Get a single blog author by slug.

### `getBlogPostsByAuthor(authorSlug: string, limit?: number): Promise<BlogPost[]>`

Get blog posts for a specific author.

### `getBlogPostsByCategory(categorySlug: string, limit?: number): Promise<BlogPost[]>`

Get blog posts for a specific category.

## UI Components to Create

### Pages / Sections

**View**: Blog List
- **Purpose**: List recent blog posts
- **Placement**: Dedicated page OR section on Home page.
- **Data Source**: `getBlogPosts()`
- **Layout**: Grid of post cards. Optional sidebar with categories.

**View**: Blog Detail
- **Purpose**: Display full blog post
- **Placement**: Dedicated page.
- **Data Source**: `getBlogPost(slug)`
- **Layout**: Article layout with header image, title, author info, and rich text content.

**View**: Category List
- **Purpose**: List posts in a specific category
- **Placement**: Dedicated page.
- **Data Source**: `getBlogPostsByCategory(slug)` (or `getBlogPosts` with category filter)

**View**: Author List
- **Purpose**: List posts by a specific author
- **Placement**: Dedicated page.
- **Data Source**: `getBlogPostsByAuthor(slug)` (or `getBlogPosts` with author filter)

### Components

**Component**: `BlogCard`
- **Purpose**: Preview of a blog post
- **Props**: `{ post: BlogPost }`
- **Must Include**: Image, Title, Excerpt, Date, Author, Category.

## Data Display Guidelines

### Blog Post (`BlogPost`)

- **`title`** (string): Main heading.
- **`featuredImage`** (upload/Media): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
- **`excerpt`** (textarea): Short summary.
- **`content`** (richText): Article body.
- **`publishedDate`** (date): Format nicely.
- **`author`** (relationship): Display author name and photo.
- **`category`** (relationship): Display category name.
- **`tags`** (array): List of tags. Each item has a `tag` field (string).
- **`metaTitle`** (text): SEO title (optional display).
- **`metaDescription`** (textarea): SEO description (optional display).
- **`slug`** (string): URL slug.

### Blog Author (`BlogAuthor`)

- **`name`** (string): Author name.
- **`photo`** (upload/Media): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.

### Blog Category (`BlogCategory`)

- **`name`** (string): Category name.
