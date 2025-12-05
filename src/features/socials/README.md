# Socials

## Overview

The Socials feature manages the business's social media links. It provides a central location to configure URLs for Facebook, Instagram, LinkedIn, and Twitter.

## Queries (Read Operations)

### `getSocials(): Promise<Social>`

Get the global social media links.

- **Returns**: `Promise<Social>` - Object containing social media URLs.

## UI Components to Create

### Components

**Component**: `SocialLinks`

- **Purpose**: Display social media icons with links.
- **Placement**: Footer, Contact Page, or Header.
- **Data Source**: `getSocials()`
- **Props**: None (fetches data internally or accepts data as props).
- **Icons**: Use appropriate icons for each social platform.

## Data Display Guidelines

### Social Media (`Social`)

- **`facebook`** (text): Facebook URL. Display with Facebook icon.
- **`instagram`** (text): Instagram URL. Display with Instagram icon.
- **`linkedin`** (text): LinkedIn URL. Display with LinkedIn icon.
- **`twitter`** (text): Twitter URL. Display with Twitter icon.
