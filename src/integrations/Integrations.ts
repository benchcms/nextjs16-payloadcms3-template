import { GlobalConfig, Field } from "payload";
import { activeIntegrations } from "./config";
import i18n from "./i18n.json";

export const Integrations: GlobalConfig = {
  slug: "integrations",
  access: {
    read: ({ req: { user } }) => !!user,
  },
  label: i18n.label,
  fields: activeIntegrations.map((integration) => ({
    name: integration.slug,
    type: "group",
    label: integration.label,
    fields: integration.fields,
    admin: {
      initCollapsed: true,
    },
  })) as Field[],
};
