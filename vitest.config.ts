import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    testTimeout: 30000,
    include: ["**/*.test.ts"],
    setupFiles: ["dotenv/config"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "@core": path.resolve(__dirname, "src/core"),
      "@features": path.resolve(__dirname, "src/features"),
      "@integrations": path.resolve(__dirname, "src/integrations"),
    },
  },
});
