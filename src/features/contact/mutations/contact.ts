import { submitContactForm } from "./submit";
import type { ContactFormState, EmailTemplateGenerator } from "./schema";

/**
 * Factory function that creates a Server Action for contact form submissions compatible with useActionState.
 *
 * This factory produces a Server Action that handles contact form submission.
 * To use this, create your own server-side file that imports this factory, calls it with your template function,
 * and exports the resulting server action.
 *
 * @param generateEmailHtml - Function that generates the HTML email template from validated form data.
 *                            This function will be called on the server-side to generate the email HTML.
 * @returns Server Action (async function) compatible with useActionState
 */
export function createContactFormAction(
  generateEmailHtml: EmailTemplateGenerator,
) {
  return async (
    prevState: ContactFormState,
    formData: FormData,
  ): Promise<ContactFormState> => {
    // Forward to server-side function with the template generator
    return submitContactForm(formData, generateEmailHtml);
  };
}
