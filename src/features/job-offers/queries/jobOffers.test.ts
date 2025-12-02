import { describe, it, expect } from "vitest";
import { getActiveJobOffers, getJobOffers, getJobOffer } from "./jobOffers";

describe("Job Offers queries", () => {
  it("getActiveJobOffers returns without error", async () => {
    const result = await getActiveJobOffers();
    expect(result.docs).toBeDefined();
  });

  it("getActiveJobOffers with options returns without error", async () => {
    const result = await getActiveJobOffers({ limit: 5, page: 1 });
    expect(result.docs).toBeDefined();
  });

  it("getJobOffers returns without error", async () => {
    const result = await getJobOffers();
    expect(result.docs).toBeDefined();
  });

  it("getJobOffers with options returns without error", async () => {
    const result = await getJobOffers({ limit: 5, page: 1 });
    expect(result.docs).toBeDefined();
  });

  it("getJobOffer returns without error", async () => {
    const result = await getJobOffer("non-existent-slug");
    expect(result).toBeNull();
  });
});
