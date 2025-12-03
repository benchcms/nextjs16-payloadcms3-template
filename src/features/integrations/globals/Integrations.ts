import { GlobalConfig } from "payload";

import i18n from "../i18n/integrations.json";

export const Integrations: GlobalConfig = {
  slug: "integrations",
  access: {
    read: ({ req: { user } }) => !!user,
  },
  label: i18n.label,
  fields: [
    {
      name: "googleAnalyticsId",
      type: "text",
      label: i18n.fields.googleAnalyticsId,
    },
  ],
};
