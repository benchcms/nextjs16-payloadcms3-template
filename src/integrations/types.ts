import { Field } from "payload";

export type Integration = {
  slug: string;
  label: string | { [key: string]: string };
  fields: Field[];
};
