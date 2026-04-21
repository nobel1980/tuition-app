"use client";

import { useState } from "react";
import { User, Mail, Phone, AtSign, Send } from "lucide-react";

export default function ContactForm() {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        // Simulate API call to your Laravel backend/Server Action
        await new Promise((res) => setTimeout(res, 1500));
        setLoading(false);
        alert("Message sent successfully!");
    }

    const inputClass = "w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:bg-white outline-none transition-all";
    const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                    <User className={iconClass} />
                    <input type="text" placeholder="First Name*" required className={inputClass} />
                </div>
                <div className="relative">
                    <Mail className={iconClass} />
                    <input type="email" placeholder="Email Address*" required className={inputClass} />
                </div>
                <div className="relative">
                    <Phone className={iconClass} />
                    <input type="text" placeholder="Contact Number*" required className={inputClass} />
                </div>
                <div className="relative">
                    <AtSign className={iconClass} />
                    <input type="text" placeholder="Subject*" required className={inputClass} />
                </div>
            </div>

            <div className="relative">
                <textarea
                    placeholder="Your Message"
                    rows={6}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:bg-white outline-none transition-all"
                />
            </div>

            <div className="text-center md:text-left">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-3 bg-blue-900 text-white px-10 py-4 rounded-full font-bold hover:bg-orange-500 transition-all disabled:opacity-50"
                >
                    {loading ? "SENDING..." : "SUBMIT MESSAGE"}
                    {!loading && <Send size={18} />}
                </button>
            </div>
        </form>
    );
}