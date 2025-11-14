import { CollectionConfig } from "payload";

export const JobOffers: CollectionConfig = {
  slug: "job-offers",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "location", "active", "postedDate"],
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
              name: "location",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "richText",
              required: true,
            },
            {
              name: "requirements",
              type: "richText",
              required: true,
            },
            {
              name: "applicationLink",
              type: "text",
            },
            {
              name: "active",
              type: "checkbox",
              defaultValue: true,
            },
          ],
        },
        {
          label: "advanced",
          fields: [
            {
              name: "postedDate",
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
