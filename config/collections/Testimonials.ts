import { CollectionConfig } from "payload";

import i18n from "../i18n.json";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  access: {
    read: () => true,
  },
  endpoints: false,
  admin: {
    useAsTitle: "client",
    defaultColumns: ["client", "rating", "date"],
  },
  labels: {
    singular: i18n.collections.testimonials.labels.singular,
    plural: i18n.collections.testimonials.labels.plural,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: i18n.collections.testimonials.tabs.content,
          fields: [
            {
              name: "client",
              type: "text",
              label: i18n.collections.testimonials.fields.client,
              required: true,
            },
            {
              name: "company",
              type: "text",
              label: i18n.collections.testimonials.fields.company,
            },
            {
              name: "quote",
              type: "textarea",
              label: i18n.collections.testimonials.fields.quote,
              required: true,
            },
            {
              name: "photo",
              type: "upload",
              label: i18n.collections.testimonials.fields.photo,
              relationTo: "media",
            },
            {
              name: "rating",
              type: "number",
              label: i18n.collections.testimonials.fields.rating,
              min: 1,
              max: 5,
              defaultValue: 5,
            },
          ],
        },
        {
          label: i18n.collections.testimonials.tabs.advanced,
          fields: [
            {
              name: "date",
              type: "date",
              label: i18n.collections.testimonials.fields.date,
              defaultValue: () => new Date(),
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
