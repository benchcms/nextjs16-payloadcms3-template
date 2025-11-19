import { CollectionConfig } from "payload";

import i18n from "../i18n.json";

export const JobOffers: CollectionConfig = {
  slug: "job-offers",
  access: {
    read: () => true,
  },
  endpoints: false,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "location", "active", "postedDate"],
  },
  labels: {
    singular: i18n.collections.jobOffers.labels.singular,
    plural: i18n.collections.jobOffers.labels.plural,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: i18n.collections.jobOffers.tabs.content,
          fields: [
            {
              name: "title",
              type: "text",
              label: i18n.collections.jobOffers.fields.title,
              required: true,
            },
            {
              name: "location",
              type: "text",
              label: i18n.collections.jobOffers.fields.location,
              required: true,
            },
            {
              name: "description",
              type: "richText",
              label: i18n.collections.jobOffers.fields.description,
              required: true,
            },
            {
              name: "requirements",
              type: "richText",
              label: i18n.collections.jobOffers.fields.requirements,
              required: true,
            },
            {
              name: "applicationLink",
              type: "text",
              label: i18n.collections.jobOffers.fields.applicationLink,
            },
            {
              name: "active",
              type: "checkbox",
              label: i18n.collections.jobOffers.fields.active,
              defaultValue: true,
            },
          ],
        },
        {
          label: i18n.collections.jobOffers.tabs.advanced,
          fields: [
            {
              name: "postedDate",
              type: "date",
              label: i18n.collections.jobOffers.fields.postedDate,
              defaultValue: () => new Date(),
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
