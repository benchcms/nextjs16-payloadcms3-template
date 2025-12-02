# Restaurant Menu

## Overview

The Restaurant Menu feature manages menu categories (e.g., "Starters", "Main Courses") and their dishes. It allows displaying the full menu organized by category.

## Queries (Read Operations)

### `getMenuCategories(): Promise<RestaurantMenu[]>`

Get all menu categories, including their dishes.

- **Returns**: `Promise<RestaurantMenu[]>` - Array of RestaurantMenu objects (categories)

### `getMenuCategory(slug: string): Promise<RestaurantMenu | null>`

Get a single menu category by its slug.

- **Use Case**: Display a specific category (e.g., "Beverages" or "Specials") on a specific page or section (e.g., Home page highlight).
- **Parameters**: 
  - `slug`: The unique slug of the category
- **Returns**: `Promise<RestaurantMenu | null>` - RestaurantMenu object or null

## UI Components to Create

### Pages / Sections

**View**: Menu Page
- **Purpose**: Display the full restaurant menu
- **Placement**: Dedicated page OR section on Home page.
- **Data Source**: `getMenuCategories()`
- **Layout**: Stack of sections, one for each category.

**View**: Specific Menu Section
- **Purpose**: Display dishes from a single category
- **Placement**: Any relevant page.
- **Data Source**: `getMenuCategory(slug)`

### Components

**Component**: `MenuSection`
- **Purpose**: Display a single category of dishes
- **Props**: `{ category: RestaurantMenu }`
- **Structure**:
  - Heading: `category.name`
  - Grid/List: Loop through `category.items` and render `MenuItem`

**Component**: `MenuItem`
- **Purpose**: Display individual dish details
- **Props**: `{ item: NonNullable<RestaurantMenu['items']>[number] }`
- **Must Include**:
  - Name
  - Description
  - Price (formatted)
  - Image (if available)
  - Dietary info (if available)
  - Spicy level (if applicable)

## Data Display Guidelines

### Menu Category (`RestaurantMenu` type)

- **`name`** (string): Category title.
- **`items`** (array): List of dishes.
- **`order`** (number): Sort order.
- **`slug`** (string): URL slug.

### Menu Item (`RestaurantMenu['items'][number]`)

- **`name`** (string): Dish name.
- **`description`** (textarea): Dish description.
- **`price`** (number): Price. Format as currency (e.g., "12.50 €").
- **`image`** (upload/Media): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
- **`dietary`** (text): Dietary info (e.g., "Vegetarian", "GF").
- **`spicyLevel`** (select): "none", "mild", "medium", "hot", "extra-hot". Display as text.
