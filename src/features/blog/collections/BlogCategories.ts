import { CollectionConfig } from "payload";

import i18n from "../i18n/blogCategories.json";
import { SlugField } from "@/src/fields/SlugField";

export const BlogCategories: CollectionConfig = {
  slug: "blog-categories",
  access: {
    read: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
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
              name: "name",
              type: "text",
              label: i18n.fields.name,
              required: true,
              unique: true,
            },
            {
              name: "description",
              type: "textarea",
              label: i18n.fields.description,
            },
            {
              name: "icon",
              type: "upload",
              label: i18n.fields.icon,
              relationTo: "media",
            },
          ],
        },
        {
          label: i18n.tabs.advanced,
          fields: [
            SlugField("name"),
            {
              name: "order",
              type: "number",
              label: i18n.fields.order,
              defaultValue: 0,
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
