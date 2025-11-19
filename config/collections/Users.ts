import type { CollectionConfig } from "payload";

import i18n from "../i18n.json";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  labels: {
    singular: i18n.collections.users.labels.singular,
    plural: i18n.collections.users.labels.plural,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};
