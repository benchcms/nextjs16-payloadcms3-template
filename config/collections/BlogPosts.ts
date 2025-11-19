import { CollectionConfig } from "payload";

import i18n from "../i18n.json";
import { SlugField } from "../fields/SlugField";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  access: {
    read: () => true,
  },
  endpoints: false,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "publishedDate"],
  },
  labels: {
    singular: i18n.collections.blogPosts.labels.singular,
    plural: i18n.collections.blogPosts.labels.plural,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: i18n.collections.blogPosts.tabs.content,
          fields: [
            {
              name: "category",
              type: "relationship",
              label: i18n.collections.blogPosts.fields.category,
              relationTo: "blog-categories",
              required: true,
            },
            {
              name: "title",
              type: "text",
              label: i18n.collections.blogPosts.fields.title,
              required: true,
            },
            {
              name: "featuredImage",
              type: "upload",
              label: i18n.collections.blogPosts.fields.featuredImage,
              relationTo: "media",
            },
            {
              name: "excerpt",
              type: "textarea",
              label: i18n.collections.blogPosts.fields.excerpt,
            },
            {
              name: "content",
              type: "richText",
              label: i18n.collections.blogPosts.fields.content,
              required: true,
            },
            {
              name: "author",
              type: "relationship",
              label: i18n.collections.blogPosts.fields.author,
              relationTo: "blog-authors",
              required: true,
            },
            {
              name: "tags",
              type: "array",
              label: i18n.collections.blogPosts.fields.tags,
              fields: [
                {
                  name: "tag",
                  type: "text",
                  label: i18n.collections.blogPosts.fields.tag,
                },
              ],
            },
          ],
        },
        {
          label: i18n.collections.blogPosts.tabs.seo,
          fields: [
            {
              name: "metaTitle",
              type: "text",
              label: i18n.collections.blogPosts.fields.metaTitle,
            },
            {
              name: "metaDescription",
              type: "textarea",
              label: i18n.collections.blogPosts.fields.metaDescription,
            },
          ],
        },
        {
          label: i18n.collections.blogPosts.tabs.advanced,
          fields: [
            SlugField("title"),
            {
              name: "publishedDate",
              type: "date",
              label: i18n.collections.blogPosts.fields.publishedDate,
              defaultValue: () => new Date(),
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
