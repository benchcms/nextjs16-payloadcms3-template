import type { CollectionConfig } from "payload";

import i18n from "../i18n/admins.json";

export const Admins: CollectionConfig = {
  slug: "admins",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  labels: {
    singular: i18n.labels.singular,
    plural: i18n.labels.plural,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};
