import GoogleAnalytics from "./GoogleAnalytics";
import { getIntegrations } from "../queries/integrations";

/**
 * Integrations component that conditionally loads third-party tracking scripts
 * based on what API keys are configured in the Integrations global.
 *
 * This is a server component that fetches integration settings and renders
 * the appropriate tracking scripts.
 */
export default async function Integrations() {
  const integrations = await getIntegrations();

  return (
    <>
      {/* Google Analytics - only if ID is configured */}
      {integrations.googleAnalyticsId && (
        <GoogleAnalytics gaId={integrations.googleAnalyticsId} />
      )}

      {/* Future: Other tracking scripts */}
      {/* {integrations.metaPixelId && <MetaPixel pixelId={integrations.metaPixelId} />} */}
    </>
  );
}
