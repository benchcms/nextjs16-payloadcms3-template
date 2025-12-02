import { describe, it, expect } from "vitest";
import {
  getCatalogItems,
  getCatalogItem,
  getRootCatalogCategories,
  getCatalogSubCategories,
  getCatalogCategory,
} from "./catalog";

describe("Catalog queries", () => {
  it("getCatalogItems returns without error", async () => {
    const result = await getCatalogItems();
    expect(result.docs).toBeDefined();
  });

  it("getCatalogItems with options returns without error", async () => {
    const result = await getCatalogItems({ limit: 5, page: 1 });
    expect(result.docs).toBeDefined();
  });

  it("getCatalogItem returns without error", async () => {
    const result = await getCatalogItem("non-existent-slug");
    expect(result).toBeNull();
  });

  it("getRootCatalogCategories returns without error", async () => {
    const result = await getRootCatalogCategories();
    expect(Array.isArray(result)).toBe(true);
  });

  it("getCatalogSubCategories returns without error", async () => {
    const result = await getCatalogSubCategories("non-existent-slug");
    expect(Array.isArray(result)).toBe(true);
  });

  it("getCatalogCategory returns without error", async () => {
    const result = await getCatalogCategory("non-existent-slug");
    expect(result).toBeNull();
  });
});
