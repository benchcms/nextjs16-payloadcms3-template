# Products

## Overview

The Products feature manages a catalog of products organized by categories (hierarchical).

## Queries (Read Operations)

### `getProductItems(options?): Promise<ProductItem[]>`

Get product items with optional filtering.

- **Parameters**: 
  - `options`: `{ limit?: number; page?: number; category?: string; }`
- **Returns**: `Promise<ProductItem[]>`

### `getProductItem(slug: string): Promise<ProductItem | null>`

Get a single product item by slug.

### `getProductCategories(): Promise<ProductCategory[]>`

Get all product categories.

### `getProductCategory(slug: string): Promise<ProductCategory | null>`

Get a single product category by slug.

### `getRootProductCategories(): Promise<ProductCategory[]>`

Get top-level categories (no parent).

### `getProductSubCategories(parentSlug: string): Promise<ProductCategory[]>`

Get subcategories for a specific parent category.

### `getProductsByCategory(categorySlug: string, limit?: number): Promise<ProductItem[]>`

Get products for a specific category.

## UI Components to Create

### Pages / Sections

**View**: Catalog Main
- **Purpose**: Main catalog page
- **Placement**: Dedicated page OR section on Home page (featured products).
- **Data Source**: `getRootProductCategories()` and/or `getProductItems()`
- **Layout**: Grid of categories or featured products.

**View**: Category Detail
- **Purpose**: Category page (products + subcategories)
- **Placement**: Dedicated page.
- **Data Source**: `getProductCategory(slug)`, `getProductSubCategories(slug)`, `getProductsByCategory(slug)`
- **Layout**: List of subcategories + Grid of products.

**View**: Product Detail
- **Purpose**: Product detail page
- **Placement**: Dedicated page.
- **Data Source**: `getProductItem(slug)`
- **Layout**: Product image, details, price, related info.

### Components

**Component**: `ProductCard`
- **Purpose**: Preview of a product
- **Props**: `{ product: ProductItem }`
- **Must Include**: Image, Name, Price, Category.

**Component**: `CategoryCard`
- **Purpose**: Link to a category
- **Props**: `{ category: ProductCategory }`

## Data Display Guidelines

### Product Item (`ProductItem`)

- **`name`** (string): Product name.
- **`description`** (richText): Product details.
- **`price`** (number): Price.
- **`gallery`** (array of upload/Media): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Use the first image as the main display. Check for existence and use `url`.
- **`categories`** (relationship): Linked categories.
- **`specifications`** (array): List of specs. Each item has `name` and `value`.
- **`relatedProducts`** (relationship): List of related `ProductItem`s.
- **`order`** (number): Sort order.
- **`slug`** (string): URL slug.

### Product Category (`ProductCategory`)

- **`name`** (string): Category name.
- **`image`** (upload/Media): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
