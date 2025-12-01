# Opening Hours

## Overview

The Opening Hours feature manages the business operating hours for each day of the week. It is a global setting.

## Queries (Read Operations)

### `getOpeningHours(): Promise<OpeningHour>`

Get the opening hours for all days of the week.

- **Returns**: `Promise<OpeningHour>` - Object containing hours for each day

## UI Components to Create

### Pages / Sections

**View**: Opening Hours Section
- **Purpose**: Display opening hours
- **Placement**: Section on Contact page, Footer, or Header.
- **Data Source**: `getOpeningHours()`
- **Layout**: List of days with their hours

### Components

**Component**: `OpeningHoursList`
- **Purpose**: Display the weekly schedule
- **Props**: `{ hours: OpeningHour }`
- **Structure**:
  - Loop through days (Monday - Sunday)
  - Show "Closed" if `isOpen` is false
  - Show "Open - Close" times if `isOpen` is true

**Component**: `TodayStatus`
- **Purpose**: Show if currently open/closed
- **Props**: `{ hours: OpeningHour }`
- **Logic**: Determine current day and check status

## Data Display Guidelines

### Opening Hour Object (`OpeningHour`)

- **`monday`**, **`tuesday`**, **`wednesday`**, **`thursday`**, **`friday`**, **`saturday`**, **`sunday`** (group): Day objects.
- **`slug`** (string): Global slug.

### Day Object

- **`isOpen`** (boolean): If false, display "Closed".
- **`open`** (string): Opening time (e.g., "09:00").
- **`close`** (string): Closing time (e.g., "18:00").
