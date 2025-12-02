import { CollectionConfig } from "payload";

import i18n from "../i18n/catalogItems.json";
import { SlugField } from "@/src/fields/SlugField";

export const CatalogItems: CollectionConfig = {
    slug: "catalog-items",
    access: {
        read: ({ req: { user } }) => !!user,
    },
    admin: {
        useAsTitle: "name",
        defaultColumns: ["name", "price", "order"],
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
                            name: "categories",
                            type: "relationship",
                            label: i18n.fields.categories,
                            relationTo: "catalog-categories",
                            hasMany: true,
                            required: true,
                        },
                        {
                            name: "price",
                            type: "number",
                            label: i18n.fields.price,
                        },
                        {
                            name: "gallery",
                            type: "upload",
                            label: i18n.fields.gallery,
                            relationTo: "media",
                            hasMany: true,
                        },
                        {
                            name: "description",
                            type: "richText",
                            label: i18n.fields.description,
                        },
                        {
                            name: "specifications",
                            type: "array",
                            label: i18n.fields.specifications.label,
                            labels: {
                                singular: i18n.fields.specifications.labels.singular,
                                plural: i18n.fields.specifications.labels.plural,
                            },
                            fields: [
                                {
                                    name: "name",
                                    type: "text",
                                    label: i18n.fields.specifications.fields.name,
                                    required: true,
                                },
                                {
                                    name: "value",
                                    type: "text",
                                    label: i18n.fields.specifications.fields.value,
                                    required: true,
                                },
                            ],
                        },
                        {
                            name: "relatedItems",
                            type: "relationship",
                            label: i18n.fields.relatedItems,
                            relationTo: "catalog-items",
                            hasMany: true,
                            filterOptions: ({ id }) => {
                                return {
                                    id: {
                                        not_equals: id,
                                    },
                                };
                            },
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
