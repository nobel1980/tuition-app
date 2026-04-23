"use server";

import { contactSchema, type ContactFormData } from "@/lib/schemas";

export async function submitContactForm(data: ContactFormData) {
    try {
        // Validate data on the server side as well
        const parsedData = contactSchema.parse(data);

        // Simulate server delay/DB operation
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // You would typically send an email or save to DB here
        console.log("Form successfully submitted:", parsedData);

        return { success: true, message: "Message sent successfully!" };
    } catch (error) {
        console.error("Form submission failed:", error);
        return { success: false, message: "Failed to send message. Please try again." };
    }
}
