"use server";

import { z } from "zod";
import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import {
  contactFormSchema,
  type ContactFormState,
  type EmailTemplateGenerator,
} from "./schema";

/**
 * Server-side function that handles the complete contact form submission.
 *
 * This function executes on the server and performs:
 * 1. Validates form data using the Zod schema
 * 2. Calls the template generator function to produce HTML
 * 3. Fetches the recipient email from the Contact global
 * 4. Saves the contact message to the database
 * 5. Sends the email with the generated HTML
 *
 * @param formData - Raw FormData from the form submission
 * @param generateEmailHtml - Template generator function that produces email HTML from validated data
 * @returns Result state with success/error information
 */
export async function submitContactForm(
  formData: FormData,
  generateEmailHtml: EmailTemplateGenerator,
): Promise<ContactFormState> {
  try {
    // 1. Extract and validate form data
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    const formValidation = contactFormSchema.safeParse(rawData);

    if (!formValidation.success) {
      const { fieldErrors, formErrors } = z.flattenError(formValidation.error);

      return {
        success: false,
        error:
          formErrors.length > 0 ? formErrors.join(", ") : "Validation failed",
        fieldErrors,
      };
    }

    const validatedData = formValidation.data;

    // 2. Generate email HTML using the template generator
    const emailHtml = generateEmailHtml(validatedData);

    // 3. Fetch contact email from global configuration
    const payload = await getPayload({ config: configPromise });

    const contactGlobal = await payload.findGlobal({
      slug: "contact",
    });

    const recipientEmail = contactGlobal.email;

    if (!recipientEmail) {
      throw new Error(
        "Contact email not configured. Please set the email in the Contact global settings.",
      );
    }

    // 4. Save to database
    await payload.create({
      collection: "contact-emails",
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        subject: validatedData.subject,
        message: validatedData.message,
      },
    });

    // 5. Send email with generated HTML
    await payload.sendEmail({
      to: recipientEmail,
      subject: `New Contact: ${validatedData.subject}`,
      html: emailHtml,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
