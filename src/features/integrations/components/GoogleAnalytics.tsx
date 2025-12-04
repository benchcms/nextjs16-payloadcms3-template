import Script from "next/script";
import { getIntegrations } from "../queries/integrations";

/**
 * Google Analytics tracking scripts.
 * Automatically checks if GA is configured and only loads if ID is present.
 *
 * Usage: Import and place in layout.tsx or any page where you want GA tracking.
 */
export default async function GoogleAnalytics() {
  const integrations = await getIntegrations();

  if (!integrations.googleAnalyticsId) {
    return null;
  }

  return (
    <>
      {/* Load the Google Analytics library */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${integrations.googleAnalyticsId}`}
      />

      {/* Initialize Google Analytics */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${integrations.googleAnalyticsId}');
        `}
      </Script>
    </>
  );
}
