import { describe, it, expect } from "vitest";
import { getPressReleases, getPressRelease } from "./pressReleases";

describe("Press Releases queries", () => {
  it("getPressReleases returns without error", async () => {
    const result = await getPressReleases();
    expect(result.docs).toBeDefined();
  });

  it("getPressReleases with options returns without error", async () => {
    const result = await getPressReleases({ limit: 5, page: 1 });
    expect(result.docs).toBeDefined();
  });

  it("getPressRelease returns without error", async () => {
    const result = await getPressRelease("non-existent-slug");
    expect(result).toBeNull();
  });
});
