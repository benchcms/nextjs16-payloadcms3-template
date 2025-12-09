# Catalog

## Overview

The Catalog feature manages a hierarchical catalog system. Categories form a tree structure where each category can have a parent category and child subcategories. Items (products) are usually placed at leaf categories (categories without children), but can exist at any level. The feature supports browsing through the category hierarchy with breadcrumb navigation.

## Types

- **`CatalogItem`**: Catalog item with name, gallery, price, description, specifications, and related items.
- **`CatalogCategory`**: Catalog category with name, description, image, and parent category.
- **`Specification`**: Name-value pair for item specifications.

## Queries (Read Operations)

### `getCatalogItems(options?): Promise<PaginatedDocs<CatalogItem>>`

Get a list of catalog items with optional filtering and pagination.

- **Parameters**:
  - `options`: `{ limit?: number; page?: number; category?: string; }`
- **Returns**: `Promise<PaginatedDocs<CatalogItem>>` - Includes `docs`, `totalDocs`, `totalPages`, `page`, `hasNextPage`, `hasPrevPage`

### `getCatalogItem(slug: string): Promise<CatalogItem | null>`

Get a single catalog item by slug.

- **Parameters**: `slug` (string)
- **Returns**: `Promise<CatalogItem | null>`

### `getRootCatalogCategories(): Promise<CatalogCategory[]>`

Get root catalog categories (categories without parents).

### `getCatalogSubCategories(parentSlug: string): Promise<CatalogCategory[]>`

Get subcategories of a specific category.

- **Parameters**: `parentSlug` (string)
- **Returns**: `Promise<CatalogCategory[]>`

### `getCatalogCategory(slug: string): Promise<CatalogCategory | null>`

Get a single catalog category by slug.

- **Parameters**: `slug` (string)
- **Returns**: `Promise<CatalogCategory | null>`

## UI Components to Create

### Pages / Sections

**View**: Catalog List

- **Purpose**: List catalog items
- **Placement**: Dedicated page OR section on Home page.
- **Data Source**: `getCatalogItems()`

**View**: Catalog Detail

- **Purpose**: Display full catalog item
- **Placement**: Dedicated page.
- **Data Source**: `getCatalogItem(slug)`

**View**: Category Detail

- **Purpose**: Display a category with breadcrumb navigation, subcategories (if any), and items (if any)
- **Placement**: Dedicated page.
- **Data Source**:
  - `getCatalogCategory(slug)` - Get category details and parent for breadcrumbs
  - `getCatalogSubCategories(slug)` - Get child categories for drilling down
  - `getCatalogItems({ category: slug })` - Get items in this category (display only if items exist)

## Data Display Guidelines

### Catalog Item (`CatalogItem`)

- **`name`** (string): Item name.
- **`gallery`** (upload/Media[]): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
- **`price`** (number): Price.
- **`description`** (richText): Item description.
- **`categories`** (relationship[]): Associated categories.
- **`specifications`** (array): List of specs. Each item has `name` and `value` fields.
- **`relatedItems`** (relationship[]): Related catalog items.
- **`slug`** (string): URL slug.
- **`order`** (number): Sort order.

### Catalog Category (`CatalogCategory`)

- **`name`** (string): Category name.
- **`description`** (textarea): Category description.
- **`image`** (upload/Media): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
- **`parent`** (relationship): Parent category. Use this to build breadcrumb navigation by traversing up the hierarchy.
- **`slug`** (string): URL slug.
- **`order`** (number): Sort order.
