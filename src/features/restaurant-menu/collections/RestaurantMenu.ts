import { CollectionConfig } from "payload";

import i18n from "../i18n/restaurantMenu.json";
import { SlugField } from "@/src/fields/SlugField";

export const RestaurantMenu: CollectionConfig = {
    slug: "restaurant-menu",
    access: {
        read: ({ req: { user } }) => !!user,
    },
    admin: {
        useAsTitle: "name",
        defaultColumns: ["name", "order"],
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
                            name: "name",
                            type: "text",
                            label: i18n.fields.name,
                            required: true,
                        },
                        {
                            name: "items",
                            type: "array",
                            label: i18n.fields.items.label,
                            labels: {
                                singular: i18n.fields.items.labels.singular,
                                plural: i18n.fields.items.labels.plural,
                            },
                            fields: [
                                {
                                    name: "name",
                                    type: "text",
                                    label: i18n.fields.items.fields.name,
                                    required: true,
                                },
                                {
                                    name: "description",
                                    type: "textarea",
                                    label: i18n.fields.items.fields.description,
                                },
                                {
                                    name: "price",
                                    type: "number",
                                    label: i18n.fields.items.fields.price,
                                },
                                {
                                    name: "image",
                                    type: "upload",
                                    label: i18n.fields.items.fields.image,
                                    relationTo: "media",
                                },
                                {
                                    name: "dietary",
                                    type: "text",
                                    label: i18n.fields.items.fields.dietary,
                                },
                                {
                                    name: "spicyLevel",
                                    type: "select",
                                    label: i18n.fields.items.fields.spicy,
                                    options: [
                                        { label: i18n.fields.items.fields.options.none, value: "none" },
                                        { label: i18n.fields.items.fields.options.mild, value: "mild" },
                                        { label: i18n.fields.items.fields.options.medium, value: "medium" },
                                        { label: i18n.fields.items.fields.options.hot, value: "hot" },
                                        { label: i18n.fields.items.fields.options.extraHot, value: "extra-hot" },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: i18n.tabs.advanced,
                    fields: [
                        SlugField("name"),
                        {
                            name: "order",
                            type: "number",
                            label: i18n.fields.order,
                            defaultValue: 0,
                            required: true,
                        },
                    ],
                },
            ],
        },
    ],
};
