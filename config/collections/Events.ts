import { CollectionConfig } from "payload";

import i18n from "../i18n.json";

export const Events: CollectionConfig = {
  slug: "events",
  access: {
    read: () => true,
  },
  endpoints: false,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "location", "date"],
  },
  labels: {
    singular: i18n.collections.events.labels.singular,
    plural: i18n.collections.events.labels.plural,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: i18n.collections.events.tabs.content,
          fields: [
            {
              name: "title",
              type: "text",
              label: i18n.collections.events.fields.title,
              required: true,
            },
            {
              name: "description",
              type: "richText",
              label: i18n.collections.events.fields.description,
              required: true,
            },
            {
              name: "location",
              type: "text",
              label: i18n.collections.events.fields.location,
              required: true,
            },
            {
              name: "image",
              type: "upload",
              label: i18n.collections.events.fields.image,
              relationTo: "media",
            },
            {
              name: "date",
              type: "date",
              label: i18n.collections.events.fields.date,
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
              label: i18n.collections.events.fields.endDate,
              admin: {
                date: {
                  pickerAppearance: "dayAndTime",
                },
              },
            },
          ],
        },
        {
          label: i18n.collections.events.tabs.links,
          fields: [
            {
              name: "virtualLink",
              type: "text",
              label: i18n.collections.events.fields.virtualLink,
            },
            {
              name: "registrationLink",
              type: "text",
              label: i18n.collections.events.fields.registrationLink,
            },
          ],
        },
      ],
    },
  ],
};
