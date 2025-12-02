import { Feature } from "../index";
import { seedCatalog } from "./seed/catalog";
import { CatalogCategories } from "./collections/CatalogCategories";
import { CatalogItems } from "./collections/CatalogItems";

const feature: Feature = {
    globals: [],
    collections: [CatalogCategories, CatalogItems],
    seeds: [seedCatalog],
};

export default feature;
