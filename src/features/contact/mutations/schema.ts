import { z } from "zod";

/**
 * Zod schema for contact form validation
 * Export this schema to use it in frontend forms for client-side validation
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z.email("Invalid email address"),
  phone: z.string().optional(),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message must be less than 5000 characters"),
});

// TYPES

/**
 * Form data type
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * State type for useActionState - discriminated union
 */
export type ContactFormState =
  | { success: true; id: string | number }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> }
  | Record<string, never>; // Initial empty state

/**
 * Function type for generating email HTML templates
 */
export type EmailTemplateGenerator = (data: ContactFormData) => string;
