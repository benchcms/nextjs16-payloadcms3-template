# Opening Hours

## Overview

The Opening Hours feature manages the business operating hours for each day of the week. It is a global setting.

## Types

- **`OpeningHours`**: Weekly opening hours schedule with start date for scheduling.
- **`DaySchedule`**: Individual day schedule with open/close times and isOpen flag.

## Queries (Read Operations)

### Data Structure

The `opening-hours` feature is implemented as a **Collection** with the slug `opening-hours`.

### Fields

- **startDate** (date, required): The date from which these opening hours apply. The system will always use the document with the most recent `startDate` that is in the past (or today).
- **monday** (group)
  - **open** (text): Opening time (e.g., "09:00")
  - **close** (text): Closing time (e.g., "18:00")
  - **isOpen** (checkbox): Whether the place is open on this day
- **tuesday**... **sunday** (same structure as monday)

## Usage

The feature exposes a `getOpeningHours` function that returns the currently active opening hours based on the server's date.

```typescript
import { getOpeningHours } from "@/src/features/opening-hours/queries/openingHours";

const openingHours = await getOpeningHours();
```

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
- **Props**: `{ hours: OpeningHours }`
- **Structure**:
  - Loop through days (Monday - Sunday)
  - Show "Closed" if `isOpen` is false
  - Show "Open - Close" times if `isOpen` is true

**Component**: `TodayStatus`

- **Purpose**: Show if currently open/closed
- **Props**: `{ hours: OpeningHours }`
- **Logic**: Determine current day and check status

## Data Display Guidelines

### Opening Hours (`OpeningHours`)

- **`monday`**, **`tuesday`**, **`wednesday`**, **`thursday`**, **`friday`**, **`saturday`**, **`sunday`** (`DaySchedule`): Day schedules.

### Day Schedule (`DaySchedule`)

- **`isOpen`** (boolean): If false, display "Closed".
- **`open`** (string): Opening time (e.g., "09:00").
- **`close`** (string): Closing time (e.g., "18:00").
