import { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "client",
    defaultColumns: ["client", "rating", "date"],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "content",
          fields: [
            {
              name: "client",
              type: "text",
              required: true,
            },
            {
              name: "company",
              type: "text",
            },
            {
              name: "quote",
              type: "textarea",
              required: true,
            },
            {
              name: "photo",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "rating",
              type: "number",
              min: 1,
              max: 5,
              defaultValue: 5,
            },
          ],
        },
        {
          label: "advanced",
          fields: [
            {
              name: "date",
              type: "date",
              defaultValue: () => new Date(),
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
