import { describe, it, expect } from "vitest";
import { getFAQGroups, getFAQGroup } from "./faq";

describe("FAQ queries", () => {
  it("getFAQGroups returns without error", async () => {
    const result = await getFAQGroups();
    expect(Array.isArray(result)).toBe(true);
  });

  it("getFAQGroup returns without error", async () => {
    const result = await getFAQGroup("non-existent-slug");
    expect(result).toBeNull();
  });
});
