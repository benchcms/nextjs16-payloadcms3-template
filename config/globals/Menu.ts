import { GlobalConfig } from "payload";

import i18n from "../i18n.json";

export const Menu: GlobalConfig = {
    slug: "menu",
    access: {
        read: () => true,
    },
    endpoints: false,
    label: i18n.globals.menu.label,
    fields: [
        {
            name: "pdf",
            type: "upload",
            label: i18n.globals.menu.fields.pdf,
            relationTo: "media",
        },
        {
            name: "categories",
            type: "array",
            label: i18n.globals.menu.fields.categories,
            labels: {
                singular: i18n.globals.menu.fields.category,
                plural: i18n.globals.menu.fields.categories,
            },
            fields: [
                {
                    name: "name",
                    type: "text",
                    label: i18n.globals.menu.fields.categoryName,
                    required: true,
                },
                {
                    name: "dishes",
                    type: "array",
                    label: i18n.globals.menu.fields.dishes,
                    labels: {
                        singular: i18n.globals.menu.fields.dish,
                        plural: i18n.globals.menu.fields.dishes,
                    },
                    fields: [
                        {
                            name: "name",
                            type: "text",
                            label: i18n.globals.menu.fields.name,
                            required: true,
                        },
                        {
                            name: "description",
                            type: "textarea",
                            label: i18n.globals.menu.fields.description,
                        },
                        {
                            name: "price",
                            type: "number",
                            label: i18n.globals.menu.fields.price,
                        },
                        {
                            name: "image",
                            type: "upload",
                            label: i18n.globals.menu.fields.image,
                            relationTo: "media",
                        },
                        {
                            name: "dietary",
                            type: "text",
                            label: i18n.globals.menu.fields.dietary,
                        },
                        {
                            name: "spicyLevel",
                            type: "select",
                            label: i18n.globals.menu.fields.spicy,
                            options: [
                                { label: i18n.globals.menu.fields.options.none, value: "none" },
                                { label: i18n.globals.menu.fields.options.mild, value: "mild" },
                                { label: i18n.globals.menu.fields.options.medium, value: "medium" },
                                { label: i18n.globals.menu.fields.options.hot, value: "hot" },
                                { label: i18n.globals.menu.fields.options.extraHot, value: "extra-hot" },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};
