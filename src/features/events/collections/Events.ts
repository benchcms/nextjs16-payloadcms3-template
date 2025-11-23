import { CollectionConfig } from "payload";

import i18n from "../i18n/events.json";

export const Events: CollectionConfig = {
  slug: "events",
  access: {
    read: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "location", "date"],
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
              name: "title",
              type: "text",
              label: i18n.fields.title,
              required: true,
            },
            {
              name: "description",
              type: "richText",
              label: i18n.fields.description,
              required: true,
            },
            {
              name: "location",
              type: "text",
              label: i18n.fields.location,
              required: true,
            },
            {
              name: "image",
              type: "upload",
              label: i18n.fields.image,
              relationTo: "media",
            },
            {
              name: "date",
              type: "date",
              label: i18n.fields.date,
              required: true,
              admin: {
                date: {
                  pickerAppearance: "dayAndTime",
                },
              },
            },
            {
              name: "endDate",
              type: "date",
              label: i18n.fields.endDate,
              admin: {
                date: {
                  pickerAppearance: "dayAndTime",
                },
              },
            },
          ],
        },
        {
          label: i18n.tabs.links,
          fields: [
            {
              name: "virtualLink",
              type: "text",
              label: i18n.fields.virtualLink,
            },
            {
              name: "registrationLink",
              type: "text",
              label: i18n.fields.registrationLink,
            },
          ],
        },
      ],
    },
  ],
};
