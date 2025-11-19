import type { CollectionConfig } from "payload";

import i18n from "../i18n.json";

export const ContactEmails: CollectionConfig = {
    slug: "contact-emails",
    access: {
        create: () => false, // Created via server-side API only
        read: ({ req: { user } }) => !!user, // Only admins can read
        update: () => false, // No updates allowed
        delete: ({ req: { user } }) => !!user, // Only admins can delete
    },
    endpoints: false,
    admin: {
        useAsTitle: "name",
        defaultColumns: ["name", "email", "subject", "submittedAt"],
    },
    labels: {
        singular: i18n.collections.contactEmails.labels.singular,
        plural: i18n.collections.contactEmails.labels.plural,
    },
    fields: [
        {
            name: "name",
            type: "text",
            label: i18n.collections.contactEmails.fields.name,
            required: true,
        },
        {
            name: "email",
            type: "email",
            label: i18n.collections.contactEmails.fields.email,
            required: true,
        },
        {
            name: "phone",
            type: "text",
            label: i18n.collections.contactEmails.fields.phone,
        },
        {
            name: "subject",
            type: "text",
            label: i18n.collections.contactEmails.fields.subject,
            required: true,
        },
        {
            name: "message",
            type: "textarea",
            label: i18n.collections.contactEmails.fields.message,
            required: true,
        },
        {
            name: "submittedAt",
            type: "date",
            label: i18n.collections.contactEmails.fields.submittedAt,
            admin: {
                readOnly: true,
            },
            defaultValue: () => new Date().toISOString(),
        },
    ],
};
