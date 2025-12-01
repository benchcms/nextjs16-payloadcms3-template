# Job Offers

## Overview

The Job Offers feature manages job listings. It allows displaying a list of active job openings and detailed job descriptions.

## Queries (Read Operations)

### `getActiveJobOffers(): Promise<JobOffer[]>`

Get all active job offers, sorted by posted date (newest first).

- **Returns**: `Promise<JobOffer[]>`

### `getJobOffers(): Promise<JobOffer[]>`

Get all job offers (including inactive).

### `getJobOffer(slug: string): Promise<JobOffer | null>`

Get a single job offer by slug.

- **Parameters**: `slug` (string)
- **Returns**: `Promise<JobOffer | null>`

## UI Components to Create

### Pages / Sections

**View**: Job List
- **Purpose**: List open positions
- **Placement**: Dedicated page OR section on About/Careers page.
- **Data Source**: `getActiveJobOffers()`
- **Layout**: List of job cards or simple list.

**View**: Job Detail
- **Purpose**: Display job details
- **Placement**: Dedicated page.
- **Data Source**: `getJobOffer(slug)`
- **Layout**: Detail view with description and "Apply Now" button (mailto link).

### Components

**Component**: `JobCard`
- **Purpose**: Preview of a job offer
- **Props**: `{ job: JobOffer }`
- **Must Include**: Title, Location, Type, Salary (if available).

## Data Display Guidelines

### Job Offer (`JobOffer`)

- **`title`** (string): Job title.
- **`description`** (richText): Full job description.
- **`requirements`** (richText): Job requirements list.
- **`location`** (string): e.g., "Remote", "New York".
- **`applicationLink`** (string): External application URL (optional).
- **`active`** (checkbox): Status of the offer.
- **`postedDate`** (date): Date posted.
- **`slug`** (string): URL slug.
