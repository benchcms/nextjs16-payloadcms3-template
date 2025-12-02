import { describe, it, expect } from "vitest";
import { getOpeningHours } from "./openingHours";

describe("Opening Hours queries", () => {
  it("getOpeningHours returns without error", async () => {
    const result = await getOpeningHours();
    expect(result).toBeDefined();
  });
});
