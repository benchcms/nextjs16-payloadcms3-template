"use server";

import { z } from "zod";
import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import {
  contactFormSchema,
  type ContactFormState,
  type EmailTemplateGenerator,
} from "./schema";

// PUBLIC API

/**
 * Creates a Server Action for contact form submissions compatible with useActionState.
 *
 * @param generateEmailHtml - Function that generates the email HTML template from validated form data
 * @returns Server Action compatible with useActionState
 *
 * See README.md for usage examples.
 */
export function createContactFormAction(
  generateEmailHtml: EmailTemplateGenerator,
) {
  return async (
    prevState: ContactFormState,
    formData: FormData,
  ): Promise<ContactFormState> => {
    try {
      // Extract data from FormData
      const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone") || undefined,
        subject: formData.get("subject"),
        message: formData.get("message"),
      };

      // Validate form data
      const formValidation = contactFormSchema.safeParse(rawData);

      if (!formValidation.success) {
        const { fieldErrors, formErrors } = z.flattenError(
          formValidation.error,
        );

        return {
          success: false,
          error:
            formErrors.length > 0 ? formErrors.join(", ") : "Validation failed",
          fieldErrors,
        };
      }

      const validatedData = formValidation.data;

      // Generate email HTML using the provided template generator
      const emailHtml = generateEmailHtml(validatedData);

      const payload = await getPayload({ config: configPromise });

      // 1. Save to database
      const doc = await payload.create({
        collection: "contact-emails",
        data: {
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          subject: validatedData.subject,
          message: validatedData.message,
        },
      });

      // 2. Send email with generated HTML
      await payload.sendEmail({
        to: process.env.CONTACT_EMAIL || "admin@example.com",
        subject: `New Contact: ${validatedData.subject}`,
        html: emailHtml,
      });

      return { success: true, id: doc.id };
    } catch (error) {
      console.error("Failed to submit contact email:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };
}
