# Google Analytics Integration

This integration adds Google Analytics 4 (GA4) tracking to the website.

## Configuration

- **Measurement ID**: The GA4 Measurement ID (starts with `G-`).

## Usage

This component is a **Global** integration. It should be included in the root layout of the application to track all page views.

```tsx
// src/app/(frontend)/layout.tsx
import { GoogleAnalytics } from "@/src/integrations/google-analytics";

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
