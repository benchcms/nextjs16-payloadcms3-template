# Press Releases

## Overview

The Press Releases feature manages company news and announcements.

## Queries (Read Operations)

### `getPressReleases(options?): Promise<PaginatedDocs<PressRelease>>`

Get all press releases with pagination, sorted by published date (newest first).

- **Parameters**: 
  - `options`: `{ limit?: number; page?: number; }`
- **Returns**: `Promise<PaginatedDocs<PressRelease>>` - Includes `docs`, `totalDocs`, `totalPages`, `page`, `hasNextPage`, `hasPrevPage`

### `getPressRelease(slug: string): Promise<PressRelease | null>`

Get a single press release by slug.

- **Parameters**: `slug` (string)
- **Returns**: `Promise<PressRelease | null>`

## UI Components to Create

### Pages / Sections

**View**: Press List
- **Purpose**: List press releases
- **Placement**: Dedicated page OR section on Home/About page.
- **Data Source**: `getPressReleases()`
- **Layout**: List of news items.

**View**: Press Detail
- **Purpose**: Display press release details
- **Placement**: Dedicated page.
- **Data Source**: `getPressRelease(slug)`
- **Layout**: Article layout.

### Components

**Component**: `PressReleaseCard`
- **Purpose**: Preview of a press release
- **Props**: `{ release: PressRelease }`
- **Must Include**: Title, Date, Image (if available), Excerpt.

## Data Display Guidelines

### Press Release (`PressRelease`)

- **`title`** (string): Headline.
- **`journal`** (text): Name of the publication.
- **`excerpt`** (richText): Short summary or snippet.
- **`link`** (text): URL to the original article.
- **`publishedDate`** (date): Date of release.
- **`slug`** (string): URL slug.
