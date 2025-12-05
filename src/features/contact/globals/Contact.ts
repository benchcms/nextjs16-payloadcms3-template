import { GlobalConfig } from "payload";
import i18n from "../i18n/contact.json";

export const Contact: GlobalConfig = {
  slug: "contact",
  access: {
    read: ({ req: { user } }) => !!user,
  },
  label: i18n.label,
  fields: [
    {
      name: "email",
      type: "email",
      label: i18n.fields.email,
    },
    {
      name: "phone",
      type: "text",
      label: i18n.fields.phone,
    },
    {
      name: "address",
      type: "textarea",
      label: i18n.fields.address,
    },
  ],
};
