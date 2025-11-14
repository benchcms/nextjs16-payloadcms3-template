import { CollectionConfig } from "payload";

import { SlugField } from "../fields/SlugField";

export const BlogCategories: CollectionConfig = {
  slug: "blog-categories",
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
              unique: true,
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
            SlugField("name"),
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
