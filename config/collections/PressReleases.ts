import { CollectionConfig } from "payload";

export const PressReleases: CollectionConfig = {
  slug: "press-releases",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedDate"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "journal",
      type: "text",
    },
    {
      name: "excerpt",
      type: "richText",
    },
    {
      name: "link",
      type: "text",
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
    },
  ],
};
