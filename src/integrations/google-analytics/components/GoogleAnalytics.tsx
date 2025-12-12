import Script from "next/script";
import { getIntegrations } from "@integrations/queries";

/**
 * Google Analytics tracking scripts.
 * Automatically checks if GA is configured and only loads if ID is present.
 */
export async function GoogleAnalytics() {
  const integrations = await getIntegrations();

  // Access the grouped settings
  // @ts-ignore - Types will be fixed after regeneration
  const settings = integrations.googleAnalytics;

  if (!settings?.id) {
    return null;
  }

  return (
    <>
      {/* Load the Google Analytics library */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${settings.id}`}
      />

      {/* Initialize Google Analytics */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${settings.id}');
        `}
      </Script>
    </>
  );
}
