import { Feature } from "../config";
import { seedCatalog } from "./seed/catalog";
import { CatalogCategories } from "./collections/CatalogCategories";
import { CatalogItems } from "./collections/CatalogItems";

export const catalogConfig: Feature = {
  globals: [],
  collections: [CatalogCategories, CatalogItems],
  seeds: [seedCatalog],
};
