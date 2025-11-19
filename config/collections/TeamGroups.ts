import { CollectionConfig } from "payload";

import i18n from "../i18n.json";

export const TeamGroups: CollectionConfig = {
  slug: "team-groups",
  access: {
    read: () => true,
  },
  endpoints: false,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
  },
  labels: {
    singular: i18n.collections.teamGroups.labels.singular,
    plural: i18n.collections.teamGroups.labels.plural,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: i18n.collections.teamGroups.tabs.content,
          fields: [
            {
              name: "name",
              type: "text",
              label: i18n.collections.teamGroups.fields.name,
              required: true,
            },
            {
              name: "description",
              type: "textarea",
              label: i18n.collections.teamGroups.fields.description,
            },
            {
              name: "icon",
              type: "upload",
              label: i18n.collections.teamGroups.fields.icon,
              relationTo: "media",
            },
          ],
        },
        {
          label: i18n.collections.teamGroups.tabs.advanced,
          fields: [
            {
              name: "order",
              type: "number",
              label: i18n.collections.teamGroups.fields.order,
              defaultValue: 0,
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
