import { CollectionConfig } from "payload";

export const FAQGroups: CollectionConfig = {
  slug: "faq-groups",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "content",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "textarea",
            },
            {
              name: "icon",
              type: "upload",
              relationTo: "media",
            },
          ],
        },
        {
          label: "advanced",
          fields: [
            {
              name: "order",
              type: "number",
              defaultValue: 0,
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
