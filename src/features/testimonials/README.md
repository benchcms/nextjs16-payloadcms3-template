# Testimonials

## Overview

The Testimonials feature manages client reviews and feedback.

## Queries (Read Operations)

### `getTestimonials(options?): Promise<PaginatedDocs<Testimonial>>`

Get all testimonials with pagination, sorted by date (newest first).

- **Parameters**: 
  - `options`: `{ limit?: number; page?: number; }`
- **Returns**: `Promise<PaginatedDocs<Testimonial>>` - Includes `docs`, `totalDocs`, `totalPages`, `page`, `hasNextPage`, `hasPrevPage`

## UI Components to Create

### Pages / Sections

**View**: Testimonials List
- **Purpose**: List all testimonials
- **Placement**: Dedicated page OR section on Home/About page.
- **Data Source**: `getTestimonials()`
- **Layout**: Grid or list of testimonial cards.

### Components

**Component**: `TestimonialCard`
- **Purpose**: Display a single testimonial
- **Props**: `{ testimonial: Testimonial }`
- **Must Include**: Quote, Client Name, Company (if available), Rating (stars), Photo (if available).

## Data Display Guidelines

### Testimonial (`Testimonial`)

- **`quote`** (textarea): The review text.
- **`client`** (string): Client name.
- **`company`** (string): Company name (optional).
- **`rating`** (number): 1-5. Display as stars (e.g., "★★★★★").
- **`photo`** (upload/Media): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
- **`date`** (date): Date of testimonial.
