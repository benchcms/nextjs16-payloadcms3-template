import { GlobalConfig, Field } from "payload";

import i18n from "../i18n.json";

const dayFields: Field[] = [
    {
        name: "open",
        type: "text",
        label: i18n.globals.openingHours.fields.openTime,
    },
    {
        name: "close",
        type: "text",
        label: i18n.globals.openingHours.fields.closeTime,
    },
    {
        name: "isOpen",
        type: "checkbox",
        label: i18n.globals.openingHours.fields.isOpen,
        defaultValue: true,
    },
];

export const OpeningHours: GlobalConfig = {
    slug: "opening-hours",
    access: {
        read: () => true,
    },
    endpoints: false,
    label: i18n.globals.openingHours.label,
    fields: [
        {
            name: "monday",
            type: "group",
            label: i18n.globals.openingHours.fields.monday,
            fields: dayFields,
        },
        {
            name: "tuesday",
            type: "group",
            label: i18n.globals.openingHours.fields.tuesday,
            fields: dayFields,
        },
        {
            name: "wednesday",
            type: "group",
            label: i18n.globals.openingHours.fields.wednesday,
            fields: dayFields,
        },
        {
            name: "thursday",
            type: "group",
            label: i18n.globals.openingHours.fields.thursday,
            fields: dayFields,
        },
        {
            name: "friday",
            type: "group",
            label: i18n.globals.openingHours.fields.friday,
            fields: dayFields,
        },
        {
            name: "saturday",
            type: "group",
            label: i18n.globals.openingHours.fields.saturday,
            fields: dayFields,
        },
        {
            name: "sunday",
            type: "group",
            label: i18n.globals.openingHours.fields.sunday,
            fields: dayFields,
        },
    ],
};
