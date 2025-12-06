"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import { type ContactFormState } from "./schema";

export interface ValidatedContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Server-only function that handles the actual submission of the contact form.
 * This function executes on the server and handles:
 * - Fetching the contact email from the Contact global
 * - Saving the contact message to the database
 * - Sending the email with the generated HTML template
 *
 * @param validatedData - Pre-validated contact form data (from client)
 * @param emailHtml - Pre-generated email HTML template (from client)
 * @returns Result state with success/error information
 */
export async function submitContactForm(
  validatedData: ValidatedContactData,
  emailHtml: string,
): Promise<ContactFormState> {
  try {
    const payload = await getPayload({ config: configPromise });

    // 1. Fetch contact global to get recipient email
    const contactGlobal = await payload.findGlobal({
      slug: "contact",
    });

    const recipientEmail = contactGlobal.email;

    if (!recipientEmail) {
      throw new Error(
        "Contact email not configured. Please set the email in the Contact global settings.",
      );
    }

    // 2. Save to database
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

    // 3. Send email with generated HTML
    await payload.sendEmail({
      to: recipientEmail,
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
}
