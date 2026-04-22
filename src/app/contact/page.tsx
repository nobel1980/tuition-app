import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { constructMetadata } from "@/lib/seo";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
    title: "Contact Us",
    description: "Get in touch with Ibrahim Tuition Centre for inquiries about our primary, 11 Plus, and GCSE courses."
});

export default function ContactPage() {
    return (
        <main>
            {/* Page Header (Breadcrumbs) */}
            <div className="relative py-24 bg-slate-900 text-center overflow-hidden">
                <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/bg/banner-bg.jpg')" }}
                />
                <div className="relative z-10 container mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h2>
                    <div className="flex justify-center gap-2 text-gray-300">
                        <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-orange-500">Contact</span>
                    </div>
                </div>
            </div>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Left Column: Contact Info Box */}
                        <div className="lg:w-5/12">
                            <ContactInfo />
                        </div>

                        {/* Right Column: Contact Form */}
                        <div className="lg:w-7/12">
                            <div className="mb-10">
                                <h2 className="text-3xl font-bold text-slate-900">Join With Us</h2>
                            </div>
                            <ContactForm />
                        </div>
                    </div>
                </div>

                {/* Google Map Section */}
                <div className="mt-20 h-[450px] w-full bg-gray-100 grayscale hover:grayscale-0 transition-all duration-500">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.446820542363!2d-0.0528656!3d51.5233634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761d36d2999999%3A0x7d018d9f4e2f9d6c!2sIbrahim%20Tuition%20Centre!5e0!3m2!1sen!2suk!4v1713692575000!5m2!1sen!2suk"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>
        </main>
    );
}