# Contact Emails

## Overview

The Contact Emails feature allows website visitors to send messages through a contact form. Messages are stored in the database and sent via email to the site administrator.

## Mutations (Write Operations)

### `submitContactEmail(data: ContactEmailData): Promise<ContactEmailResult>`

Submits a contact form message.

- **Parameters**: 
  - `data: ContactEmailData` - Contact form data object
    - `name: string` - Sender's name (required, max 100 chars)
    - `email: string` - Sender's email (required, valid email format)
    - `phone?: string` - Sender's phone number (optional)
    - `subject: string` - Message subject (required, max 200 chars)
    - `message: string` - Message content (required, max 5000 chars)
    - `emailHtml: string` - HTML template for the email notification (required)

- **Validation Schema**: `contactEmailSchema` from `mutations/schema.ts`
  - Use this schema for frontend form validation
  - The schema is exported and can be imported in client components

- **Returns**: `Promise<ContactEmailResult>`
  - `success: boolean` - Whether submission succeeded
  - `id?: string | number` - Document ID if successful
  - `error?: string` - Error message if failed
  - `validationErrors?: Record<string, string[]>` - Field-level validation errors

- **Example**:
```tsx
"use client";
import { useState } from "react";
import { submitContactEmail } from "@/src/features/contact-emails/mutations/contact";
import { contactEmailSchema } from "@/src/features/contact-emails/mutations/schema";

export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        setErrors({});

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            subject: formData.get("subject") as string,
            message: formData.get("message") as string,
            emailHtml: `<p><strong>From:</strong> ${formData.get("name")}</p>...`,
        };

        // Validate with Zod schema
        const validation = contactEmailSchema.safeParse(data);
        if (!validation.success) {
            setErrors(validation.error.flatten().fieldErrors);
            setStatus("error");
            return;
        }

        // Submit to server
        const result = await submitContactEmail(data);
        
        if (result.success) {
            setStatus("success");
            e.currentTarget.reset();
        } else {
            setStatus("error");
            if (result.validationErrors) {
                setErrors(result.validationErrors);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields */}
        </form>
    );
}
```

## UI Components to Create

### Pages / Sections

**View**: Contact Page
- **Purpose**: Display contact information and a contact form
- **Placement**: Dedicated page.
- **Data Source**: 
  - Settings global (for contact info, address, phone, email)
  - `submitContactEmail` mutation (for form submission)
- **Layout**: Two-column layout (contact info + form)
- **Special Notes**: This is typically the only page needed for this feature

### Components

**Component**: `ContactForm`
- **Purpose**: Contact form with validation and submission handling
- **Props**: None (can optionally accept settings for pre-filling)
- **Must Include**:
  - Name field (text input)
  - Email field (email input)
  - Phone field (optional text input)
  - Subject field (text input)
  - Message field (textarea)
  - Submit button
  - Loading state during submission
  - Success message after submission
  - Error display for validation failures
- **Special Notes**: 
  - Must use `"use client"` directive (form interactivity required)
  - Import and use `contactEmailSchema` for validation
  - Build the `emailHtml` string from form data

## Data Display Guidelines

This feature is primarily for data submission. However, the `ContactEmail` type contains the following fields:

### Contact Email (`ContactEmail`)

- **`name`** (string): Sender's name.
- **`email`** (email): Sender's email.
- **`phone`** (text): Sender's phone.
- **`subject`** (text): Message subject.
- **`message`** (textarea): Message content.
- **`submittedAt`** (date): Submission timestamp.
- **`slug`** (string): Collection slug.

## Examples

See the mutation example above for complete form implementation.

### Email HTML Template Example

```tsx
const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h2>New Contact Form Submission</h2>
        <div class="field">
            <span class="label">Name:</span> ${data.name}
        </div>
        <div class="field">
            <span class="label">Email:</span> ${data.email}
        </div>
        ${data.phone ? `<div class="field"><span class="label">Phone:</span> ${data.phone}</div>` : ''}
        <div class="field">
            <span class="label">Subject:</span> ${data.subject}
        </div>
        <div class="field">
            <span class="label">Message:</span><br/>
            ${data.message.replace(/\n/g, '<br/>')}
        </div>
    </div>
</body>
</html>
`;
```
