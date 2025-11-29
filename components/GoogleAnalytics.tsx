import Script from "next/script";
import { getSettings } from "@/src/features/settings/queries/settings";

/**
 * Google Analytics component that conditionally loads GA scripts
 * when a Google Analytics ID is configured in Settings.
 * 
 * This is a server component that fetches settings and only renders
 * the GA tracking scripts if googleAnalyticsId is present.
 */
export default async function GoogleAnalytics() {
    const settings = await getSettings();

    // Don't render anything if GA ID is not configured
    if (!settings.googleAnalyticsId) {
        return null;
    }

    const gaId = settings.googleAnalyticsId;

    return (
        <>
            {/* Load the Google Analytics library */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />

            {/* Initialize Google Analytics */}
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
            </Script>
        </>
    );
}
