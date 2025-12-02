import { describe, it, expect } from "vitest";
import {
  getBlogPosts,
  getBlogPost,
  getBlogCategories,
  getBlogAuthors,
  getBlogAuthor,
  getBlogCategory,
  getBlogPostsByAuthor,
  getBlogPostsByCategory,
} from "./blog";

describe("Blog queries", () => {
  it("getBlogPosts returns without error", async () => {
    const result = await getBlogPosts();
    expect(result.docs).toBeDefined();
  });

  it("getBlogPosts with options returns without error", async () => {
    const result = await getBlogPosts({ limit: 5, page: 1 });
    expect(result.docs).toBeDefined();
  });

  it("getBlogPost returns without error", async () => {
    const result = await getBlogPost("non-existent-slug");
    expect(result).toBeNull();
  });

  it("getBlogCategories returns without error", async () => {
    const result = await getBlogCategories();
    expect(Array.isArray(result)).toBe(true);
  });

  it("getBlogAuthors returns without error", async () => {
    const result = await getBlogAuthors();
    expect(Array.isArray(result)).toBe(true);
  });

  it("getBlogAuthor returns without error", async () => {
    const result = await getBlogAuthor("non-existent-slug");
    expect(result).toBeNull();
  });

  it("getBlogCategory returns without error", async () => {
    const result = await getBlogCategory("non-existent-slug");
    expect(result).toBeNull();
  });

  it("getBlogPostsByAuthor returns without error", async () => {
    const result = await getBlogPostsByAuthor("non-existent-slug");
    expect(result.docs).toBeDefined();
  });

  it("getBlogPostsByCategory returns without error", async () => {
    const result = await getBlogPostsByCategory("non-existent-slug");
    expect(result.docs).toBeDefined();
  });
});
