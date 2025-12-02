import { describe, it, expect } from "vitest";
import { getUpcomingEvents, getEvents, getEvent } from "./events";

describe("Events queries", () => {
  it("getUpcomingEvents returns without error", async () => {
    const result = await getUpcomingEvents();
    expect(Array.isArray(result)).toBe(true);
  });

  it("getUpcomingEvents with options returns without error", async () => {
    const result = await getUpcomingEvents({ limit: 5 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("getEvents returns without error", async () => {
    const result = await getEvents();
    expect(result.docs).toBeDefined();
  });

  it("getEvents with options returns without error", async () => {
    const result = await getEvents({ limit: 5, page: 1 });
    expect(result.docs).toBeDefined();
  });

  it("getEvent returns without error", async () => {
    const result = await getEvent("non-existent-slug");
    expect(result).toBeNull();
  });
});
