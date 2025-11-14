import { CollectionConfig } from "payload";

export const TeamItems: CollectionConfig = {
  slug: "team-items",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
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
              relationTo: "team-groups",
              required: true,
            },
            {
              name: "name",
              type: "text",
              required: true,
            },
            {
              name: "role",
              type: "text",
              required: true,
            },
            {
              name: "bio",
              type: "richText",
            },
            {
              name: "photo",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "email",
              type: "email",
            },
            {
              name: "phone",
              type: "text",
            },
          ],
        },
        {
          label: "socials",
          fields: [
            {
              name: "linkedin",
              type: "text",
            },
            {
              name: "twitter",
              type: "text",
            },
            {
              name: "facebook",
              type: "text",
            },
            {
              name: "instagram",
              type: "text",
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
