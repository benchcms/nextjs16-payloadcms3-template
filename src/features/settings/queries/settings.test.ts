import { describe, it, expect } from "vitest";
import { getSettings } from "./settings";

describe("Settings queries", () => {
  it("getSettings returns without error", async () => {
    const result = await getSettings();
    expect(result).toBeDefined();
  });
});
