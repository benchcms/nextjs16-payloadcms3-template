import Script from "next/script";

interface GoogleAnalyticsProps {
  gaId: string;
}

/**
 * Google Analytics tracking scripts.
 * This component should be rendered by the parent Integrations component.
 */
export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
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
