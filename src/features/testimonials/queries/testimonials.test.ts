import { describe, it, expect } from "vitest";
import { getTestimonials } from "./testimonials";

describe("Testimonials queries", () => {
  it("getTestimonials returns without error", async () => {
    const result = await getTestimonials();
    expect(result.docs).toBeDefined();
  });

  it("getTestimonials with options returns without error", async () => {
    const result = await getTestimonials({ limit: 5, page: 1 });
    expect(result.docs).toBeDefined();
  });
});
