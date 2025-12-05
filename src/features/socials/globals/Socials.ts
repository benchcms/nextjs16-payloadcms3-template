import { GlobalConfig } from "payload";
import i18n from "../i18n/socials.json";

export const Socials: GlobalConfig = {
  slug: "socials",
  access: {
    read: ({ req: { user } }) => !!user,
  },
  label: i18n.label,
  fields: [
    {
      name: "facebook",
      type: "text",
      label: i18n.fields.facebook,
    },
    {
      name: "instagram",
      type: "text",
      label: i18n.fields.instagram,
    },
    {
      name: "linkedin",
      type: "text",
      label: i18n.fields.linkedin,
    },
    {
      name: "twitter",
      type: "text",
      label: i18n.fields.twitter,
    },
  ],
};
