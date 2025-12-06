# Contact

## Overview

The Contact feature manages the business's contact information, social media links, and contact form submissions. It serves as the central source for all contact-related data.

## Types

- **`Contact`**: Global contact information (email, phone, address).

## Queries (Read Operations)

### `getContact(): Promise<Contact>`

Get the global contact information and social media links.

- **Returns**: `Promise<Contact>` - Object containing contact info and socials

## Mutations (Write Operations)

### `createContactFormAction(generateEmailHtml): ServerAction`

Creates a Server Action for contact form submissions compatible with `useActionState`.

**Architecture Pattern:**
- This is a **factory function** that runs on the client
- It takes a template generator function and returns a Server Action
- The factory orchestrates the flow:
  1. **Client-side**: Validates form data and generates HTML using the provided template function
  2. **Server-side**: Passes validated data and generated HTML to a server function for database storage and email sending
- This pattern separates concerns: templating (client) from server operations (database, email)

- **Parameters**:
  - `generateEmailHtml: (data: ValidatedContactData) => string` - Function that generates the HTML email template from validated form data
    - Called on the client-side with validated form data
    - Must return an HTML string (not a function)
    - Data object contains:
      - `data.name: string` - Sender's name
      - `data.email: string` - Sender's email
      - `data.phone?: string` - Sender's phone (optional)
      - `data.subject: string` - Message subject
      - `data.message: string` - Message content

- **Validation Schema**: `contactFormSchema` from `mutations/schema.ts`
  - Use this schema for frontend form validation
  - The schema is exported and can be imported in client components
  - Validation happens on the client before calling the server

- **Email Configuration**: Contact form submissions are sent to the email configured in the Contact global (`email` field). This field must be set in the admin panel for contact form submissions to work.

- **Returns**: Server Action compatible with `useActionState`
  - Returns `ContactFormState` (discriminated union):
    - Success: `{ success: true; id: string | number }`
    - Error: `{ success: false; error: string; fieldErrors?: Record<string, string[]> }`
    - Initial: `{}`

**Example:**
```typescript
const action = createContactFormAction((data) => {
  return `
    <h2>New message from ${data.name}</h2>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p>${data.message}</p>
  `;
});

// Use with useActionState in a form component
const [state, formAction] = useActionState(action, {});
```

## UI Components to Create

### Pages / Sections

**View**: Contact Page

- **Purpose**: Display contact information and a contact form
- **Placement**: Dedicated page.
- **Data Source**:
  - `getContact()` (for contact info)
  - `createContactFormAction` mutation (for form submission)

## Data Display Guidelines

### Contact Info (`Contact`)

- **`email`** (email): Contact email.
- **`phone`** (text): Contact phone.
- **`address`** (textarea): Physical address.
