import { GlobalConfig } from "payload";

import i18n from "../i18n.json";

export const CompanyInfo: GlobalConfig = {
  slug: "company-info",
  access: {
    read: () => true,
  },
  endpoints: false,
  label: i18n.globals.companyInfo.label,
  fields: [
    {
      name: "description",
      type: "textarea",
      label: i18n.globals.companyInfo.fields.description,
    },
    {
      name: "contact",
      type: "group",
      label: i18n.globals.companyInfo.fields.contact,
      fields: [
        {
          name: "email",
          type: "email",
          label: i18n.globals.companyInfo.fields.email,
        },
        {
          name: "phone",
          type: "text",
          label: i18n.globals.companyInfo.fields.phone,
        },
        {
          name: "address",
          type: "textarea",
          label: i18n.globals.companyInfo.fields.address,
        },
      ],
    },
    {
      name: "socials",
      type: "group",
      label: i18n.globals.companyInfo.fields.socials,
      fields: [
        {
          name: "facebook",
          type: "text",
          label: i18n.globals.companyInfo.fields.facebook,
        },
        {
          name: "instagram",
          type: "text",
          label: i18n.globals.companyInfo.fields.instagram,
        },
        {
          name: "linkedin",
          type: "text",
          label: i18n.globals.companyInfo.fields.linkedin,
        },
        {
          name: "twitter",
          type: "text",
          label: i18n.globals.companyInfo.fields.twitter,
        },
      ],
    },
    {
      name: "settings",
      type: "group",
      label: i18n.globals.companyInfo.fields.settings,
      fields: [
        {
          name: "googleAnalyticsId",
          type: "text",
          label: i18n.globals.companyInfo.fields.googleAnalyticsId,
        },
      ],
    },
  ],
};
