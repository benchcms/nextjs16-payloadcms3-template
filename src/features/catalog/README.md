# Catalog

## Overview

The Catalog feature manages catalog categories and items. It allows displaying a hierarchical catalog with categories and subcategories, and items with pricing, specifications, and galleries.

## Queries (Read Operations)

### `getCatalogItems(options?): Promise<CatalogItem[]>`

Get a list of catalog items with optional filtering.

- **Parameters**: 
  - `options`: `{ limit?: number; page?: number; category?: string; }`
- **Returns**: `Promise<CatalogItem[]>`

### `getCatalogItem(slug: string): Promise<CatalogItem | null>`

Get a single catalog item by slug.

- **Parameters**: `slug` (string)
- **Returns**: `Promise<CatalogItem | null>`

### `getCatalogCategories(): Promise<CatalogCategory[]>`

Get all catalog categories (including nested ones).

### `getRootCatalogCategories(): Promise<CatalogCategory[]>`

Get root catalog categories (categories without parents).

### `getCatalogCategory(slug: string): Promise<CatalogCategory | null>`

Get a single catalog category by slug.

### `getCatalogSubCategories(parentSlug: string): Promise<CatalogCategory[]>`

Get subcategories of a specific category.

### `getItemsByCategory(categorySlug: string, limit?: number): Promise<CatalogItem[]>`

Get catalog items for a specific category.

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
- **Data Source**: `getItemsByCategory(slug)` (or `getCatalogItems` with category filter)

### Components

**Component**: `CatalogCard`
- **Purpose**: Preview of a catalog item
- **Props**: `{ item: CatalogItem }`
- **Must Include**: Image, Name, Price, Category.

**Component**: `CategoryNav`
- **Purpose**: Navigation through categories and subcategories
- **Props**: `{ categories: CatalogCategory[] }`
- **Data Source**: `getRootCatalogCategories()` + `getCatalogSubCategories()`

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
