import { CollectionConfig } from "payload";

import i18n from "../i18n/testimonials.json";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  access: {
    read: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: "client",
    defaultColumns: ["client", "rating", "date"],
  },
  labels: {
    singular: i18n.labels.singular,
    plural: i18n.labels.plural,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: i18n.tabs.content,
          fields: [
            {
              name: "client",
              type: "text",
              label: i18n.fields.client,
              required: true,
            },
            {
              name: "company",
              type: "text",
              label: i18n.fields.company,
            },
            {
              name: "quote",
              type: "textarea",
              label: i18n.fields.quote,
              required: true,
            },
            {
              name: "photo",
              type: "upload",
              label: i18n.fields.photo,
              relationTo: "media",
            },
            {
              name: "rating",
              type: "number",
              label: i18n.fields.rating,
              min: 1,
              max: 5,
              defaultValue: 5,
            },
          ],
        },
        {
          label: i18n.tabs.advanced,
          fields: [
            {
              name: "date",
              type: "date",
              label: i18n.fields.date,
              defaultValue: () => new Date(),
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
