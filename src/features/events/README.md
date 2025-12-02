# Events

## Overview

The Events feature manages upcoming events, workshops, or gatherings. It allows listing events, showing details for a specific event, and handling event registration links.

## Queries (Read Operations)

### `getUpcomingEvents(options?): Promise<Event[]>`

Get a list of upcoming events.

- **Parameters**: 
  - `options`: `{ limit?: number; sort?: string; }`
  - `limit`: Maximum number of events to return (default: `10`)
  - `sort`: Sort order (default: `"date"`)
- **Returns**: `Promise<Event[]>` - Array of Event objects

### `getEvents(options?): Promise<PaginatedDocs<Event>>`

Get all events (past and future) with pagination support.

- **Parameters**: 
  - `options`: `{ limit?: number; page?: number; sort?: string; }`
  - `sort`: Sort order (default: `"-date"`)
- **Returns**: `Promise<PaginatedDocs<Event>>` - Includes `docs`, `totalDocs`, `totalPages`, `page`, `hasNextPage`, `hasPrevPage`

### `getEvent(slug: string): Promise<Event | null>`

Get a single event by its slug.

- **Parameters**: 
  - `slug`: The unique slug of the event
- **Returns**: `Promise<Event | null>` - Event object or null if not found

## UI Components to Create

### Pages / Sections

**View**: Events List
- **Purpose**: List all upcoming events
- **Placement**: Dedicated page OR section on Home page.
- **Data Source**: `getUpcomingEvents()` or `getEvents()`
- **Layout**: Grid of event cards

**View**: Event Detail
- **Purpose**: Display full details of a specific event
- **Placement**: Dedicated page.
- **Data Source**: `getEvent(slug)`
- **Layout**: Detail view with large image, info sidebar/header, and full description

### Components

**Component**: `EventCard`
- **Purpose**: Preview summary of an event in a list
- **Props**: `{ event: Event }`
- **Must Include**:
  - Image (if available)
  - Title
  - Date (formatted)
  - Location
  - Link to detail page

## Data Display Guidelines

### Event Fields (`Event` type)

- **`title`** (string): Display as main heading.
- **`date`** (string/date): Display formatted (e.g., "Sat, Nov 29, 2025"). Required.
- **`endDate`** (string/date): Optional. If present, show range (e.g., "Nov 29 - Dec 1").
- **`location`** (string): Display the location.
- **`image`** (upload/Media): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
- **`description`** (richText): Display using a Rich Text renderer.
- **`registrationLink`** (string): If present, show as a "Register" or "Buy Tickets" button.
- **`virtualLink`** (string): If present, show as "Join Online" button or link.
- **`slug`** (string): URL slug.
