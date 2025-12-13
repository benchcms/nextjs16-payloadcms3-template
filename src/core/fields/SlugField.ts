import type { TextField } from "payload";

export const toSlug = (str: string): string =>
  str
    .normalize("NFD") // Split accents from letters
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
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
        // If value is already present, return it as-is (validation will check format)
        if (value) return value;

        // If missing, generate from source field
        if (fromField && data?.[fromField]) {
          return toSlug(String(data[fromField]));
        }

        return value;
      },
    ],
  },

  validate: (value) => {
    if (!value) return true;
    return (
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value as string) ||
      "invalid slug format - format slug invalide"
    );
  },
});
