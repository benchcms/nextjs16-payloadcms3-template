import { describe, it, expect } from "vitest";
import { getSocials } from "../queries/socials";

describe("Socials queries", () => {
  describe("getSocials", () => {
    it("returns social links", async () => {
      const result = await getSocials();
      expect(result).toBeDefined();
      expect(result.facebook).toBeDefined();
      expect(result.instagram).toBeDefined();
      expect(result.linkedin).toBeDefined();
      expect(result.twitter).toBeDefined();
    });
  });
});
