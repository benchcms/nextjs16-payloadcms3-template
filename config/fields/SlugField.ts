import type { TextField } from "payload";

const toSlug = (str: string): string =>
  str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const SlugField = (fromField: string): TextField => ({
  name: "slug",
  label: "Slug",
  type: "text",
  required: true,
  unique: true,

  hooks: {
    beforeValidate: [
      ({ data, value }) => {
        let slug = value as string | undefined;

        if ((!slug || slug === "") && fromField && data?.[fromField]) {
          slug = String(data[fromField]);
        }

        if (!slug) return slug;
        return toSlug(slug);
      },
    ],
  },

  validate: (value) => {
    if (!value) return true;
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) || "Invalid slug format.";
  },
});
