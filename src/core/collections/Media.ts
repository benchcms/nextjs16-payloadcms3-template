import type { CollectionConfig } from "payload";

import i18n from "../i18n/media.json";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  labels: {
    singular: i18n.labels.singular,
    plural: i18n.labels.plural,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: i18n.fields.alt,
      required: true,
    },
  ],
  upload: {
    staticDir: "./uploads",
  },
};
