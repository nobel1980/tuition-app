"use client";

import { useState } from "react";
import { User, Mail, Phone, AtSign, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/schemas";
import { submitContactForm } from "@/app/actions/contact";

export default function ContactForm() {
    const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setSubmitStatus(null);
        const result = await submitContactForm(data);
        
        setSubmitStatus({ success: result.success, message: result.message });
        
        if (result.success) {
            reset();
        }
    };

    const inputClass = "w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:bg-white outline-none transition-all";
    const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="relative">
                        <User className={iconClass} />
                        <input {...register("firstName")} type="text" placeholder="First Name*" className={inputClass} />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.firstName.message}</p>}
                </div>
                <div>
                    <div className="relative">
                        <Mail className={iconClass} />
                        <input {...register("email")} type="email" placeholder="Email Address*" className={inputClass} />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.email.message}</p>}
                </div>
                <div>
                    <div className="relative">
                        <Phone className={iconClass} />
                        <input {...register("phone")} type="text" placeholder="Contact Number*" className={inputClass} />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.phone.message}</p>}
                </div>
                <div>
                    <div className="relative">
                        <AtSign className={iconClass} />
                        <input {...register("subject")} type="text" placeholder="Subject*" className={inputClass} />
                    </div>
                    {errors.subject && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.subject.message}</p>}
                </div>
            </div>

            <div>
                <div className="relative">
                    <textarea
                        {...register("message")}
                        placeholder="Your Message"
                        rows={6}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:bg-white outline-none transition-all"
                    />
                </div>
                {errors.message && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.message.message}</p>}
            </div>

            {submitStatus && (
                <div className={`p-4 rounded-xl text-sm font-bold ${submitStatus.success ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"}`}>
                    {submitStatus.message}
                </div>
            )}

            <div className="text-center md:text-left">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-3 bg-blue-900 text-white px-10 py-4 rounded-full font-bold hover:bg-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "SENDING..." : "SUBMIT MESSAGE"}
                    {!isSubmitting && <Send size={18} />}
                </button>
            </div>
        </form>
    );
}