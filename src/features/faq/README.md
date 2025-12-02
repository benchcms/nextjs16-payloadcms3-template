# FAQ

## Overview

The FAQ (Frequently Asked Questions) feature manages groups of questions and answers. It allows displaying FAQs organized by categories (groups).

## Queries (Read Operations)

### `getFAQGroups(): Promise<Faq[]>`

Get all FAQ groups, including their questions and answers.

- **Returns**: `Promise<Faq[]>` - Array of Faq objects (groups)

### `getFAQGroup(slug: string): Promise<Faq | null>`

Get a single FAQ group by its slug.

- **Use Case**: Display a specific set of questions (e.g., "Shipping") on a relevant page (e.g., Cart or Checkout) or section.
- **Parameters**: 
  - `slug`: The unique slug of the FAQ group
- **Returns**: `Promise<Faq | null>` - Faq object or null

## UI Components to Create

### Pages / Sections

**View**: FAQ List
- **Purpose**: Display all FAQs, organized by group
- **Placement**: Dedicated page OR section on Home/Contact/Support page.
- **Data Source**: `getFAQGroups()`
- **Layout**: Stack of sections, one for each group. Each section contains an accordion or list of questions.

**View**: Specific FAQ Section
- **Purpose**: Display questions from a single group
- **Placement**: Any relevant page (e.g., "Returns" FAQs on the Returns page).
- **Data Source**: `getFAQGroup(slug)`

### Components

**Component**: `FaqAccordion`
- **Purpose**: Display a list of questions and answers with expand/collapse functionality
- **Props**: `{ items: NonNullable<Faq['items']> }`
- **Structure**:
  - List of items
  - Click to expand answer
  - Chevron icon rotation on expand

## Data Display Guidelines

### FAQ Group (`Faq` type)

- **`name`** (string): The group title (e.g., "Shipping", "Returns").
- **`items`** (array): List of Q&A pairs.
- **`order`** (number): Sort order.
- **`slug`** (string): URL slug.

### FAQ Item (`Faq['items'][number]`)

- **`question`** (string): The question text.
- **`answer`** (richText): The answer content. Use a Rich Text renderer.
