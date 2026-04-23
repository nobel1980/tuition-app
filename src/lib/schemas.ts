import { z } from "zod";

export const contactSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(5, "Contact Number is required"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
