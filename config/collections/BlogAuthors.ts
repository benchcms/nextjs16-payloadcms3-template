import { CollectionConfig } from "payload";

import i18n from "../i18n.json";
import { SlugField } from "../fields/SlugField";

export const BlogAuthors: CollectionConfig = {
  slug: "blog-authors",
  access: {
    read: () => true,
  },
  endpoints: false,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
  },
  labels: {
    singular: i18n.collections.blogAuthors.labels.singular,
    plural: i18n.collections.blogAuthors.labels.plural,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: i18n.collections.blogAuthors.tabs.content,
          fields: [
            {
              name: "name",
              type: "text",
              label: i18n.collections.blogAuthors.fields.name,
              required: true,
              unique: true,
            },
            {
              name: "description",
              type: "textarea",
              label: i18n.collections.blogAuthors.fields.description,
            },
            {
              name: "icon",
              type: "upload",
              label: i18n.collections.blogAuthors.fields.icon,
              relationTo: "media",
            },
          ],
        },
        {
          label: i18n.collections.blogAuthors.tabs.advanced,
          fields: [
            SlugField("name"),
            {
              name: "order",
              type: "number",
              label: i18n.collections.blogAuthors.fields.order,
              defaultValue: 0,
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
