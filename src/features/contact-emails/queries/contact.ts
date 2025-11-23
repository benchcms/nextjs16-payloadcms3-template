"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";

// TYPES
export type ContactEmailData = {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    /** HTML template for the email - agent must generate this */
    emailHtml: string;
};

export type ContactEmailResult = {
    success: boolean;
    id?: string | number;
    error?: string;
};

// PUBLIC API

/**
 * Submit a contact email
 * 
 * This function:
 * 1. Saves the contact submission to the database
 * 2. Sends an email notification with the provided HTML template
 * 
 * @param data Contact form data including custom emailHtml
 * @returns Success status and document ID
 */
export async function submitContactEmail(
    data: ContactEmailData
): Promise<ContactEmailResult> {
    try {
        const payload = await getPayload({ config: configPromise });

        // 1. Save to database
        const doc = await payload.create({
            collection: "contact-emails",
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                subject: data.subject,
                message: data.message,
            },
        });

        // 2. Send email with provided HTML
        await payload.sendEmail({
            to: process.env.CONTACT_EMAIL || "admin@example.com",
            subject: `New Contact: ${data.subject}`,
            html: data.emailHtml,
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
