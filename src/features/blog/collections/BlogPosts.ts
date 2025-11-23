import { CollectionConfig } from "payload";

import i18n from "../i18n/blogPosts.json";
import { SlugField } from "@/src/fields/SlugField";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  access: {
    read: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "publishedDate"],
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
              name: "category",
              type: "relationship",
              label: i18n.fields.category,
              relationTo: "blog-categories",
              required: true,
            },
            {
              name: "title",
              type: "text",
              label: i18n.fields.title,
              required: true,
            },
            {
              name: "featuredImage",
              type: "upload",
              label: i18n.fields.featuredImage,
              relationTo: "media",
            },
            {
              name: "excerpt",
              type: "textarea",
              label: i18n.fields.excerpt,
            },
            {
              name: "content",
              type: "richText",
              label: i18n.fields.content,
              required: true,
            },
            {
              name: "author",
              type: "relationship",
              label: i18n.fields.author,
              relationTo: "blog-authors",
              required: true,
            },
            {
              name: "tags",
              type: "array",
              label: i18n.fields.tags,
              fields: [
                {
                  name: "tag",
                  type: "text",
                  label: i18n.fields.tag,
                },
              ],
            },
          ],
        },
        {
          label: i18n.tabs.seo,
          fields: [
            {
              name: "metaTitle",
              type: "text",
              label: i18n.fields.metaTitle,
            },
            {
              name: "metaDescription",
              type: "textarea",
              label: i18n.fields.metaDescription,
            },
          ],
        },
        {
          label: i18n.tabs.advanced,
          fields: [
            SlugField("title"),
            {
              name: "publishedDate",
              type: "date",
              label: i18n.fields.publishedDate,
              defaultValue: () => new Date(),
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
