import type { CollectionConfig } from "payload";

import i18n from "../i18n/users.json";

export const Users: CollectionConfig = {
  slug: "users",
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
