import { GlobalConfig } from "payload";

import i18n from "../i18n";

export const Settings: GlobalConfig = {
    slug: "settings",
    access: {
        read: ({ req: { user } }) => !!user,
    },
    label: i18n.globals.settings.label,
    fields: [
        {
            name: "contact",
            type: "group",
            label: i18n.globals.settings.fields.contact,
            fields: [
                {
                    name: "email",
                    type: "email",
                    label: i18n.globals.settings.fields.email,
                },
                {
                    name: "phone",
                    type: "text",
                    label: i18n.globals.settings.fields.phone,
                },
                {
                    name: "address",
                    type: "textarea",
                    label: i18n.globals.settings.fields.address,
                },
            ],
        },
        {
            name: "socials",
            type: "group",
            label: i18n.globals.settings.fields.socials,
            fields: [
                {
                    name: "facebook",
                    type: "text",
                    label: i18n.globals.settings.fields.facebook,
                },
                {
                    name: "instagram",
                    type: "text",
                    label: i18n.globals.settings.fields.instagram,
                },
                {
                    name: "linkedin",
                    type: "text",
                    label: i18n.globals.settings.fields.linkedin,
                },
                {
                    name: "twitter",
                    type: "text",
                    label: i18n.globals.settings.fields.twitter,
                },
            ],
        },
        {
            name: "googleAnalyticsId",
            type: "text",
            label: i18n.globals.settings.fields.googleAnalyticsId,
        },
    ],
};
