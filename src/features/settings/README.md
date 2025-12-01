# Settings

## Overview

The Settings feature manages global application settings, including contact information, social media links, and analytics configuration.

## Queries (Read Operations)

### `getSettings(): Promise<Setting>`

Get the global application settings.

- **Returns**: `Promise<Setting>` - Object containing all settings

## UI Components to Create

**NO Dedicated Page**. This feature provides data used by other components (Header, Footer, Contact Page).

### Usage in Components

- **Footer**: Use `settings.socials` to display social media links.
- **Contact Page**: Use `settings.contact` (email, phone, address) to display contact info.
- **Layout**: Use `settings.googleAnalyticsId` to initialize analytics (if applicable).

## Data Display Guidelines

### Contact Info (`settings.contact`)

- **`email`** (email): Display as `mailto:` link.
- **`phone`** (text): Display as `tel:` link.
- **`address`** (textarea): Display with line breaks preserved.

### Social Media (`settings.socials`)

- **`facebook`** (text): Facebook URL.
- **`instagram`** (text): Instagram URL.
- **`linkedin`** (text): LinkedIn URL.
- **`twitter`** (text): Twitter URL.

### Other Settings

- **`googleAnalyticsId`** (text): Google Analytics ID.
- **`slug`** (string): Global slug.
