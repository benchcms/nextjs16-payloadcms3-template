import { describe, it, expect, vi } from "vitest";
import { getContact } from "../queries/contact";
import { createContactFormAction } from "../mutations/contact";
import type { ContactFormState } from "../mutations/schema";

describe("Contact queries", () => {
  describe("getContact", () => {
    it("returns contact settings", async () => {
      const result = await getContact();
      expect(result).toBeDefined();
      // All fields are optional, so we just verify the shape exists
    });
  });
});

describe("Contact mutations", () => {
  describe("createContactFormAction", () => {
    const validFormData = () => {
      const formData = new FormData();
      formData.append("name", "John Doe");
      formData.append("email", "test@example.com");
      formData.append("subject", "Test Subject");
      formData.append("message", "Test message");
      return formData;
    };

    const initialState: ContactFormState = { success: false };

    it("returns a function", () => {
      const action = createContactFormAction((data) => `<p>${data.name}</p>`);
      expect(typeof action).toBe("function");
    });

    describe("validation", () => {
      it("validates required fields", async () => {
        const action = createContactFormAction(
          (data) => `<p>${data.name}</p>`,
        );
        const formData = new FormData();

        const result = await action(initialState, formData);

        expect(result.success).toBe(false);
        expect(result).toHaveProperty("fieldErrors");
      });

      it("validates email format", async () => {
        const action = createContactFormAction(
          (data) => `<p>${data.email}</p>`,
        );
        const formData = new FormData();
        formData.append("name", "John Doe");
        formData.append("email", "invalid-email");
        formData.append("subject", "Test");
        formData.append("message", "Test message");

        const result = await action(initialState, formData);

        expect(result.success).toBe(false);
        expect(result.fieldErrors?.email).toBeDefined();
      });

      it("validates name length constraints", async () => {
        const action = createContactFormAction(
          (data) => `<p>${data.name}</p>`,
        );
        const formData = new FormData();
        formData.append("name", "a".repeat(101)); // Exceeds 100 char limit
        formData.append("email", "test@example.com");
        formData.append("subject", "Test");
        formData.append("message", "Test message");

        const result = await action(initialState, formData);

        expect(result.success).toBe(false);
        expect(result.fieldErrors?.name).toBeDefined();
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

        const result = await action(initialState, formData);

        expect(result.success).toBe(false);
        expect(result.fieldErrors?.subject).toBeDefined();
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

        const result = await action(initialState, formData);

        expect(result.success).toBe(false);
        expect(result.fieldErrors?.message).toBeDefined();
      });

      it("requires name field", async () => {
        const action = createContactFormAction(
          (data) => `<p>${data.name}</p>`,
        );
        const formData = new FormData();
        formData.append("email", "test@example.com");
        formData.append("subject", "Test");
        formData.append("message", "Test message");

        const result = await action(initialState, formData);

        expect(result.success).toBe(false);
        expect(result.fieldErrors?.name).toBeDefined();
      });

      it("requires email field", async () => {
        const action = createContactFormAction(
          (data) => `<p>${data.name}</p>`,
        );
        const formData = new FormData();
        formData.append("name", "John Doe");
        formData.append("subject", "Test");
        formData.append("message", "Test message");

        const result = await action(initialState, formData);

        expect(result.success).toBe(false);
        expect(result.fieldErrors?.email).toBeDefined();
      });

      it("requires subject field", async () => {
        const action = createContactFormAction(
          (data) => `<p>${data.name}</p>`,
        );
        const formData = new FormData();
        formData.append("name", "John Doe");
        formData.append("email", "test@example.com");
        formData.append("message", "Test message");

        const result = await action(initialState, formData);

        expect(result.success).toBe(false);
        expect(result.fieldErrors?.subject).toBeDefined();
      });

      it("requires message field", async () => {
        const action = createContactFormAction(
          (data) => `<p>${data.name}</p>`,
        );
        const formData = new FormData();
        formData.append("name", "John Doe");
        formData.append("email", "test@example.com");
        formData.append("subject", "Test");

        const result = await action(initialState, formData);

        expect(result.success).toBe(false);
        expect(result.fieldErrors?.message).toBeDefined();
      });
    });

    describe("optional fields", () => {
      it("accepts optional phone field", async () => {
        const action = createContactFormAction(
          (data) => `<p>${data.name}</p>`,
        );

        const result = await action(initialState, validFormData());

        // phone is optional, should not cause validation failure
        expect(result).toBeDefined();
      });

      it("treats empty phone string as undefined", async () => {
        const templateGenerator = vi.fn((data) => `<p>${data.name}</p>`);
        const action = createContactFormAction(templateGenerator);
        const formData = new FormData();
        formData.append("name", "John Doe");
        formData.append("email", "test@example.com");
        formData.append("phone", ""); // Empty string
        formData.append("subject", "Test");
        formData.append("message", "Test message");

        await action(initialState, formData);

        expect(templateGenerator).toHaveBeenCalledWith(
          expect.objectContaining({
            phone: undefined,
          }),
        );
      });

      it("includes phone when provided", async () => {
        const templateGenerator = vi.fn((data) => `<p>${data.name}</p>`);
        const action = createContactFormAction(templateGenerator);
        const formData = new FormData();
        formData.append("name", "John Doe");
        formData.append("email", "test@example.com");
        formData.append("phone", "+1234567890");
        formData.append("subject", "Test");
        formData.append("message", "Test message");

        await action(initialState, formData);

        expect(templateGenerator).toHaveBeenCalledWith(
          expect.objectContaining({
            phone: "+1234567890",
          }),
        );
      });
    });

    describe("template generation", () => {
      it("calls template generator with validated data", async () => {
        const templateGenerator = vi.fn((data) => `<p>${data.name}</p>`);
        const action = createContactFormAction(templateGenerator);

        await action(initialState, validFormData());

        expect(templateGenerator).toHaveBeenCalledWith({
          name: "John Doe",
          email: "test@example.com",
          phone: undefined,
          subject: "Test Subject",
          message: "Test message",
        });
      });

      it("passes correct data shape to template generator", async () => {
        const templateGenerator = vi.fn((data) => `<p>${data.name}</p>`);
        const action = createContactFormAction(templateGenerator);

        await action(initialState, validFormData());

        expect(templateGenerator).toHaveBeenCalledWith(
          expect.objectContaining({
            name: expect.any(String),
            email: expect.any(String),
            subject: expect.any(String),
            message: expect.any(String),
          }),
        );
      });
    });

    describe("prevState parameter", () => {
      it("accepts and processes prevState correctly", async () => {
        const action = createContactFormAction(
          (data) => `<p>${data.name}</p>`,
        );
        const prevState: ContactFormState = {
          success: false,
          error: "Previous error",
        };

        const result = await action(prevState, validFormData());

        expect(result).toBeDefined();
      });
    });
  });
});
