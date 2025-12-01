# Feature Documentation Guidelines

This directory contains the feature-based architecture of the application. Each feature folder (e.g., `blog`, `events`) MUST contain a `README.md` file.

This `README.md` serves as the **primary instruction manual for the Skeleton Agent** (and human developers) to build the frontend UI.

## README Structure

Every feature `README.md` must follow this exact structure:

### 1. Overview
Brief description of what the feature does.

### 2. Queries (Read Operations)
*Only if applicable.*
List all public query functions exported from `queries/*.ts`.
- **Format**: `functionName(params): ReturnType`
- **Description**: What it fetches.
- **Slug Queries**: Explicitly mention if a query by slug (e.g., `getCategory(slug)`) allows displaying a specific group/item on *any* page (flexible placement).

### 3. Mutations (Write Operations)
*Only if applicable.*
- List public mutation functions.
- **Validation**: Explicitly reference the Zod schema from `mutations/schema.ts`.
- **Instruction**: Tell the agent to use this schema for client-side validation.

### 4. UI Components to Create
List the views and components the agent should build.
- **Terminology**: Use **"View"** instead of "Page" to imply flexibility.
- **Placement**: Explicitly state "Dedicated page OR section on Home/About page" where appropriate.
- **NO Code Examples**: Do not provide component code examples (unless it's a complex form logic). Let the agent use its templates.

### 5. Data Display Guidelines
List the key data types and how to display their fields.
- **Images**: **CRITICAL**. You MUST use this exact instruction for image fields:
  > **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
- **Icons**: Do NOT instruct to use specific icons or emojis. The agent is authorized to use `lucide-react` at its discretion.
- **Fields**: List **ALL** fields available in the type and how they should be rendered.

## Example Template

```markdown
# Feature Name

## Overview
Description...

## Queries

### `getItems(): Promise<Item[]>`
Get all items.

### `getItem(slug: string): Promise<Item | null>`
Get single item.

## UI Components to Create

### Pages / Sections

**View**: Items List
- **Purpose**: List all items
- **Placement**: Dedicated page OR section on Home page.
- **Data Source**: `getItems()`

### Components

**Component**: `ItemCard`
- **Purpose**: Preview of an item
- **Props**: `{ item: Item }`

## Data Display Guidelines

### Item (`Item`)
- **`name`** (string): Name.
- **`image`** (upload/Media): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
```
