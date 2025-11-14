import { CollectionConfig } from "payload";

export const FAQItems: CollectionConfig = {
  slug: "faq-items",
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "order"],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "content",
          fields: [
            {
              name: "category",
              type: "relationship",
              relationTo: "faq-groups",
              required: true,
            },
            {
              name: "question",
              type: "text",
              required: true,
            },
            {
              name: "answer",
              type: "richText",
              required: true,
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
