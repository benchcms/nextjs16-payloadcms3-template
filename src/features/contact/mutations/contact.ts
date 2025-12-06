import { z } from "zod";
import {
  contactFormSchema,
  type ContactFormState,
  type EmailTemplateGenerator,
} from "./schema";
import { submitContactForm } from "./submit";

// PUBLIC API

/**
 * Creates a Server Action for contact form submissions compatible with useActionState.
 *
 * This is a factory function that runs on the client and orchestrates the flow:
 * 1. Validates form data on the client
 * 2. Generates HTML email template using the provided generator function
 * 3. Calls a server function to handle database storage and email sending
 *
 * @param generateEmailHtml - Function that generates the HTML email template from validated form data.
 *                            Must return an HTML string (not a function).
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

      // Validate form data (client-side)
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

      // Generate email HTML using the provided template generator (client-side)
      const emailHtml = generateEmailHtml(validatedData);

      // Call server function to handle database storage and email sending
      const result = await submitContactForm(validatedData, emailHtml);
      return result;
    } catch (error) {
      console.error("Failed to submit contact email:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };
}
