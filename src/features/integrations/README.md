# Integrations

## Overview

The Integrations feature manages third-party API configurations and provides tracking script components for analytics services. API keys and IDs are configured via the admin panel and should never be seeded.

## Queries (Read Operations)

### `getIntegrations(): Promise<Integration>`

Get the global integration configurations.

- **Returns**: `Promise<Integration>` - Object containing all integration settings

## Components

### `GoogleAnalytics`

**Server Component**: Renders Google Analytics tracking scripts. Automatically checks if GA is configured and only loads if an ID is present.

- **Usage**: Import directly in any layout or page where you want GA tracking
- **Behavior**: Returns `null` if `googleAnalyticsId` is not configured
- **Location**: `src/features/integrations/components/GoogleAnalytics.tsx`

**Typical Usage**:

- Import in root layout for site-wide tracking
- Import in specific pages for page-level tracking

## Data Display Guidelines

### Integration Settings (`Integration`)

- **`googleAnalyticsId`** (text): Google Analytics measurement ID (format: G-XXXXXXXXXX). Configure in Admin Panel → Integrations.
- **`slug`** (string): Global slug.

## UI Components to Create

**IMPORTANT**: Include the `GoogleAnalytics` component in the root layout to enable site-wide tracking.

### Root Layout Integration

Import and add `GoogleAnalytics` to the root layout:

```tsx
import GoogleAnalytics from "@/src/features/integrations/components/GoogleAnalytics";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
```

**NO Dedicated Page**. This feature provides configuration and script components used by the application layout.
