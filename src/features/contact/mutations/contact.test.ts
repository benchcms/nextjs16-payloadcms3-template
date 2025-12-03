import { describe, it, expect, vi } from "vitest";
import { createContactFormAction } from "./contact";

describe("Contact mutations", () => {
  describe("createContactFormAction", () => {
    it("returns a function", () => {
      const action = createContactFormAction((data) => `<p>${data.name}</p>`);
      expect(typeof action).toBe("function");
    });

    it("validates required fields", async () => {
      const action = createContactFormAction((data) => `<p>${data.name}</p>`);
      const formData = new FormData();

      const result = await action({}, formData);

      expect(result.success).toBe(false);
      expect(result).toHaveProperty("fieldErrors");
    });

    it("validates email format", async () => {
      const action = createContactFormAction((data) => `<p>${data.email}</p>`);
      const formData = new FormData();
      formData.append("name", "John Doe");
      formData.append("email", "invalid-email");
      formData.append("subject", "Test");
      formData.append("message", "Test message");

      const result = await action({}, formData);

      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.fieldErrors?.email).toBeDefined();
      }
    });

    it("validates name length constraints", async () => {
      const action = createContactFormAction((data) => `<p>${data.name}</p>`);
      const formData = new FormData();
      formData.append("name", "a".repeat(101)); // Exceeds 100 char limit
      formData.append("email", "test@example.com");
      formData.append("subject", "Test");
      formData.append("message", "Test message");

      const result = await action({}, formData);

      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.fieldErrors?.name).toBeDefined();
      }
    });

    it("validates subject length constraints", async () => {
      const action = createContactFormAction(
        (data) => `<p>${data.subject}</p>`,
      );
      const formData = new FormData();
      formData.append("name", "John Doe");
      formData.append("email", "test@example.com");
      formData.append("subject", "a".repeat(201)); // Exceeds 200 char limit
      formData.append("message", "Test message");

      const result = await action({}, formData);

      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.fieldErrors?.subject).toBeDefined();
      }
    });

    it("validates message length constraints", async () => {
      const action = createContactFormAction(
        (data) => `<p>${data.message}</p>`,
      );
      const formData = new FormData();
      formData.append("name", "John Doe");
      formData.append("email", "test@example.com");
      formData.append("subject", "Test");
      formData.append("message", "a".repeat(5001)); // Exceeds 5000 char limit

      const result = await action({}, formData);

      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.fieldErrors?.message).toBeDefined();
      }
    });

    it("accepts optional phone field", async () => {
      const action = createContactFormAction((data) => `<p>${data.name}</p>`);
      const formData = new FormData();
      formData.append("name", "John Doe");
      formData.append("email", "test@example.com");
      formData.append("subject", "Test");
      formData.append("message", "Test message");
      // phone is optional, not included

      const result = await action({}, formData);

      // Should not fail validation due to missing phone
      expect(result).toBeDefined();
    });

    it("calls template generator with validated data", async () => {
      const templateGenerator = vi.fn((data) => `<p>${data.name}</p>`);
      const action = createContactFormAction(templateGenerator);
      const formData = new FormData();
      formData.append("name", "John Doe");
      formData.append("email", "test@example.com");
      formData.append("subject", "Test Subject");
      formData.append("message", "Test message");

      await action({}, formData);

      expect(templateGenerator).toHaveBeenCalledWith({
        name: "John Doe",
        email: "test@example.com",
        phone: undefined,
        subject: "Test Subject",
        message: "Test message",
      });
    });

    it("handles empty string phone as undefined", async () => {
      const templateGenerator = vi.fn((data) => `<p>${data.name}</p>`);
      const action = createContactFormAction(templateGenerator);
      const formData = new FormData();
      formData.append("name", "John Doe");
      formData.append("email", "test@example.com");
      formData.append("phone", ""); // Empty string
      formData.append("subject", "Test");
      formData.append("message", "Test message");

      await action({}, formData);

      expect(templateGenerator).toHaveBeenCalledWith(
        expect.objectContaining({
          phone: undefined,
        }),
      );
    });
  });
});
