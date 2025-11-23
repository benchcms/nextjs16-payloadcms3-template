import { Feature } from "../index";
import { seedBlog } from "./seed/blog";
import { BlogPosts } from "./collections/BlogPosts";
import { BlogAuthors } from "./collections/BlogAuthors";
import { BlogCategories } from "./collections/BlogCategories";

const feature: Feature = {
  globals: [],
  collections: [BlogCategories, BlogAuthors, BlogPosts],
  seeds: [seedBlog],
};

export default feature;
