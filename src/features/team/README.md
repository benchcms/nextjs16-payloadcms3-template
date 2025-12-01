# Team

## Overview

The Team feature manages groups of team members (e.g., "Management", "Kitchen Staff"). It allows displaying team members organized by these groups.

## Queries (Read Operations)

### `getTeamGroups(): Promise<Team[]>`

Get all team groups, including their members. Sorted by the `order` field.

- **Returns**: `Promise<Team[]>` - Array of Team objects (groups)

### `getTeamGroup(slug: string): Promise<Team | null>`

Get a single team group by its slug.

- **Use Case**: Display a specific team group (e.g., "Leadership") on a specific page (e.g., Home page) without showing the whole team.
- **Parameters**: 
  - `slug`: The unique slug of the team group
- **Returns**: `Promise<Team | null>` - Team object or null

## UI Components to Create

### Pages / Sections

**View**: Team List
- **Purpose**: Display all team members, organized by group
- **Placement**: Dedicated page OR section on About page.
- **Data Source**: `getTeamGroups()`
- **Layout**: Stack of sections, one for each group. Each section contains a grid of member cards.

**View**: Specific Team Section
- **Purpose**: Display members of a single group
- **Placement**: Any relevant page (e.g., "Our Chefs" on the Menu page).
- **Data Source**: `getTeamGroup(slug)`

### Components

**Component**: `TeamGrid`
- **Purpose**: Display a single group of team members
- **Props**: `{ group: Team }`
- **Structure**:
  - Heading: `group.name`
  - Grid: Loop through `group.items` and render `TeamMemberCard`

**Component**: `TeamMemberCard`
- **Purpose**: Display individual member details
- **Props**: `{ member: NonNullable<Team['items']>[number] }`
- **Must Include**:
  - Photo (if available)
  - Name
  - Role
  - Bio (optional)
  - Social links (LinkedIn, Twitter, etc.)

## Data Display Guidelines

### Team Group (`Team` type)

- **`name`** (string): The group title (e.g., "Our Chefs").
- **`items`** (array): List of members.
- **`order`** (number): Sort order.
- **`slug`** (string): URL slug.

### Team Member (`Team['items'][number]`)

- **`name`** (string): Member's full name.
- **`role`** (string): Job title.
- **`photo`** (upload/Media): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
- **`bio`** (textarea): Short biography.
- **`email`** (email): Contact email.
- **`phone`** (text): Contact phone.
- **`linkedin`** (text): LinkedIn URL.
- **`twitter`** (text): Twitter URL.
- **`facebook`** (text): Facebook URL.
- **`instagram`** (text): Instagram URL.
