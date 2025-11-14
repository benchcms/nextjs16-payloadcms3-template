import { CollectionConfig } from "payload";

import { SlugField } from "../fields/SlugField";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "publishedDate"],
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
              relationTo: "blog-categories",
              required: true,
            },
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "featuredImage",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "excerpt",
              type: "textarea",
            },
            {
              name: "content",
              type: "richText",
              required: true,
            },
            {
              name: "author",
              type: "relationship",
              relationTo: "team-items",
              required: true,
            },
            {
              name: "tags",
              type: "array",
              fields: [
                {
                  name: "tag",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          label: "seo",
          fields: [
            {
              name: "metaTitle",
              type: "text",
            },
            {
              name: "metaDescription",
              type: "textarea",
            },
          ],
        },
        {
          label: "advanced",
          fields: [
            SlugField("title"),
            {
              name: "publishedDate",
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
