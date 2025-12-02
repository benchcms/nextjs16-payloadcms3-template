import { describe, it, expect } from "vitest";
import { getMenuCategories, getMenuCategory } from "./restaurantMenu";

describe("Restaurant Menu queries", () => {
  it("getMenuCategories returns without error", async () => {
    const result = await getMenuCategories();
    expect(Array.isArray(result)).toBe(true);
  });

  it("getMenuCategory returns without error", async () => {
    const result = await getMenuCategory("non-existent-slug");
    expect(result).toBeNull();
  });
});
