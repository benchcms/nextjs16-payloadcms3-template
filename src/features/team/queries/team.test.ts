import { describe, it, expect } from "vitest";
import { getTeamGroups, getTeamGroup } from "./team";

describe("Team queries", () => {
  it("getTeamGroups returns without error", async () => {
    const result = await getTeamGroups();
    expect(Array.isArray(result)).toBe(true);
  });

  it("getTeamGroup returns without error", async () => {
    const result = await getTeamGroup("non-existent-slug");
    expect(result).toBeNull();
  });
});
