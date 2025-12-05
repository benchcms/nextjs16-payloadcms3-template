# Contact

## Overview

The Contact feature manages the business's contact information, social media links, and contact form submissions. It serves as the central source for all contact-related data.

## Queries (Read Operations)

### `getContact(): Promise<Contact>`

Get the global contact information and social media links.

- **Returns**: `Promise<Contact>` - Object containing contact info and socials

## Mutations (Write Operations)

### `createContactFormAction(generateEmailHtml): ServerAction`

Creates a Server Action for contact form submissions compatible with `useActionState`.

- **Parameters**:
  - `generateEmailHtml: (data: ContactFormData) => string` - Function that generates the HTML email template from validated form data
    - `data.name: string` - Sender's name
    - `data.email: string` - Sender's email
    - `data.phone?: string` - Sender's phone (optional)
    - `data.subject: string` - Message subject
    - `data.message: string` - Message content

- **Validation Schema**: `contactFormSchema` from `mutations/schema.ts`
  - Use this schema for frontend form validation
  - The schema is exported and can be imported in client components

- **Email Configuration**: Contact form submissions are sent to the email configured in the Contact global (`email` field). This field must be set in the admin panel for contact form submissions to work.

- **Returns**: Server Action compatible with `useActionState`
  - Returns `ContactFormState` (discriminated union):
    - Success: `{ success: true; id: string | number }`
    - Error: `{ success: false; error: string; fieldErrors?: Record<string, string[]> }`
    - Initial: `{}`

## UI Components to Create

### Pages / Sections

**View**: Contact Page

- **Purpose**: Display contact information and a contact form
- **Placement**: Dedicated page.
- **Data Source**:
  - `getContact()` (for contact info, address, phone, email)
  - `createContactFormAction` mutation (for form submission)
- **Layout**: Two-column layout (contact info + form)

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
  - Loading state during submission (via `isPending`)
  - Success message after submission
  - Error display for validation failures
- **Special Notes**:
  - Must use `"use client"` directive (form interactivity required)
  - Import and use `contactFormSchema` for validation if needed
  - Create server action file with custom email template

## Data Display Guidelines

### Contact Info (`Contact`)

- **`email`** (email): Display as `mailto:` link.
- **`phone`** (text): Display as `tel:` link.
- **`address`** (textarea): Display with line breaks preserved.

### Contact Email (`ContactEmail`) - _For Admin/Internal Use_

- **`name`** (string): Sender's name.
- **`email`** (email): Sender's email.
- **`phone`** (text): Sender's phone.
- **`subject`** (text): Message subject.
- **`message`** (textarea): Message content.
- **`submittedAt`** (date): Submission timestamp.
