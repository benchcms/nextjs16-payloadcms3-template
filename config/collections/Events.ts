import { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "location", "date"],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "content",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "richText",
              required: true,
            },
            {
              name: "location",
              type: "text",
              required: true,
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "date",
              type: "date",
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
              admin: {
                date: {
                  pickerAppearance: "dayAndTime",
                },
              },
            },
          ],
        },
        {
          label: "links",
          fields: [
            {
              name: "virtualLink",
              type: "text",
            },
            {
              name: "registrationLink",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};
