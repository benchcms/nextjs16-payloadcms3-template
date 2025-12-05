# Catalog

## Overview

The Catalog feature manages catalog categories and items. It allows displaying a hierarchical catalog with categories and subcategories, and items with pricing, specifications, and galleries.

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
- **Layout**: Grid of item cards. Optional sidebar with categories.

**View**: Catalog Detail

- **Purpose**: Display full catalog item
- **Placement**: Dedicated page.
- **Data Source**: `getCatalogItem(slug)`
- **Layout**: Gallery, title, price, specifications, and rich text description.

**View**: Category List

- **Purpose**: List items in a specific category
- **Placement**: Dedicated page.
- **Data Source**: `getCatalogItems({ category: slug })`

### Components

**Component**: `CatalogCard`

- **Purpose**: Preview of a catalog item
- **Props**: `{ item: CatalogItem }`
- **Must Include**: Image, Name, Price, Category.

**Component**: `CategoryNav`

- **Purpose**: Navigation through categories and subcategories
- **Props**: `{ categories: CatalogCategory[] }`
- **Data Source**: `getRootCatalogCategories()` + `getCatalogSubCategories(parentSlug)`

## Data Display Guidelines

### Catalog Item (`CatalogItem`)

- **`name`** (string): Item name.
- **`gallery`** (upload/Media[]): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
- **`price`** (number): Price. Format as currency (e.g., "12.50 €").
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
- **`parent`** (relationship): Parent category (if subcategory).
- **`slug`** (string): URL slug.
- **`order`** (number): Sort order.
