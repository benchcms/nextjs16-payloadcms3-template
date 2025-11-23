import { CollectionConfig } from "payload";

import i18n from "../i18n/jobOffers.json";

export const JobOffers: CollectionConfig = {
  slug: "job-offers",
  access: {
    read: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "location", "active", "postedDate"],
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
              name: "location",
              type: "text",
              label: i18n.fields.location,
              required: true,
            },
            {
              name: "description",
              type: "richText",
              label: i18n.fields.description,
              required: true,
            },
            {
              name: "requirements",
              type: "richText",
              label: i18n.fields.requirements,
              required: true,
            },
            {
              name: "applicationLink",
              type: "text",
              label: i18n.fields.applicationLink,
            },
            {
              name: "active",
              type: "checkbox",
              label: i18n.fields.active,
              defaultValue: true,
            },
          ],
        },
        {
          label: i18n.tabs.advanced,
          fields: [
            {
              name: "postedDate",
              type: "date",
              label: i18n.fields.postedDate,
              defaultValue: () => new Date(),
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
