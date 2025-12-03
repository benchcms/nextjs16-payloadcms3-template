# Integrations

## Overview

The Integrations feature manages third-party API configurations and provides tracking script components for analytics services. API keys and IDs are configured via the admin panel and should never be seeded.

## Queries (Read Operations)

### `getIntegrations(): Promise<Integration>`

Get the global integration configurations.

- **Returns**: `Promise<Integration>` - Object containing all integration settings

## Components

This feature provides a parent script component and child components for specific services.

### `Integrations`

**Parent Component**: Server component that conditionally loads tracking scripts based on which API keys are configured.

- **Usage**: Import and include in root layout (`app/(frontend)/layout.tsx`)
- **Behavior**: Automatically renders only the tracking scripts for services with configured API keys

**Example**:

```tsx
import Integrations from "@/src/features/integrations/components/Integrations";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Integrations />
        {children}
      </body>
    </html>
  );
}
```

### `GoogleAnalytics`

**Child Component**: Renders Google Analytics tracking scripts. This component is called by the parent `Integrations` component.

- **Props**: `{ gaId: string }` - Google Analytics measurement ID
- **Usage**: Do not use directly - it's rendered by the `Integrations` component

## Data Display Guidelines

### Integration Settings (`Integration`)

- **`googleAnalyticsId`** (text): Google Analytics measurement ID (format: G-XXXXXXXXXX). Configure in Admin Panel → Integrations.
- **`slug`** (string): Global slug.

## UI Components to Create

**IMPORTANT**: Include the `Integrations` component in the root layout to enable tracking scripts.

### Root Layout Integration

Add the `<Integrations />` component to `app/(frontend)/layout.tsx`:

```tsx
import Integrations from "@/src/features/integrations/components/Integrations";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Integrations />
        {children}
      </body>
    </html>
  );
}
```

**NO Dedicated Page**. This feature provides configuration and script components used by the application layout.
