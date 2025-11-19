import { CollectionConfig } from "payload";

import i18n from "../i18n.json";

export const FAQGroups: CollectionConfig = {
  slug: "faq-groups",
  access: {
    read: () => true,
  },
  endpoints: false,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
  },
  labels: {
    singular: i18n.collections.faqGroups.labels.singular,
    plural: i18n.collections.faqGroups.labels.plural,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: i18n.collections.faqGroups.tabs.content,
          fields: [
            {
              name: "name",
              type: "text",
              label: i18n.collections.faqGroups.fields.name,
              required: true,
            },
            {
              name: "description",
              type: "textarea",
              label: i18n.collections.faqGroups.fields.description,
            },
            {
              name: "icon",
              type: "upload",
              label: i18n.collections.faqGroups.fields.icon,
              relationTo: "media",
            },
          ],
        },
        {
          label: i18n.collections.faqGroups.tabs.advanced,
          fields: [
            {
              name: "order",
              type: "number",
              label: i18n.collections.faqGroups.fields.order,
              defaultValue: 0,
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
