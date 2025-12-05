import { Field } from "payload";
import i18n from "./i18n.json";

export const googleAnalytics = {
  slug: "googleAnalytics",
  label: i18n.label,
  fields: [
    {
      name: "id",
      type: "text",
      label: i18n.fields.id.label,
    },
  ] as Field[],
};
