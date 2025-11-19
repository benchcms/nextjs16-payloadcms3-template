import { CollectionConfig } from "payload";

import i18n from "../i18n.json";

export const TeamItems: CollectionConfig = {
  slug: "team-items",
  access: {
    read: () => true,
  },
  endpoints: false,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
  },
  labels: {
    singular: i18n.collections.teamItems.labels.singular,
    plural: i18n.collections.teamItems.labels.plural,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: i18n.collections.teamItems.tabs.content,
          fields: [
            {
              name: "category",
              type: "relationship",
              label: i18n.collections.teamItems.fields.category,
              relationTo: "team-groups",
              required: true,
            },
            {
              name: "name",
              type: "text",
              label: i18n.collections.teamItems.fields.name,
              required: true,
            },
            {
              name: "role",
              type: "text",
              label: i18n.collections.teamItems.fields.role,
              required: true,
            },
            {
              name: "bio",
              type: "richText",
              label: i18n.collections.teamItems.fields.bio,
            },
            {
              name: "photo",
              type: "upload",
              label: i18n.collections.teamItems.fields.photo,
              relationTo: "media",
            },
            {
              name: "email",
              type: "email",
              label: i18n.collections.teamItems.fields.email,
            },
            {
              name: "phone",
              type: "text",
              label: i18n.collections.teamItems.fields.phone,
            },
          ],
        },
        {
          label: i18n.collections.teamItems.tabs.socials,
          fields: [
            {
              name: "linkedin",
              type: "text",
              label: i18n.collections.teamItems.fields.linkedin,
            },
            {
              name: "twitter",
              type: "text",
              label: i18n.collections.teamItems.fields.twitter,
            },
            {
              name: "facebook",
              type: "text",
              label: i18n.collections.teamItems.fields.facebook,
            },
            {
              name: "instagram",
              type: "text",
              label: i18n.collections.teamItems.fields.instagram,
            },
          ],
        },
        {
          label: i18n.collections.teamItems.tabs.advanced,
          fields: [
            {
              name: "order",
              type: "number",
              label: i18n.collections.teamItems.fields.order,
              defaultValue: 0,
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
