"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    ChevronRight
} from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();

    if (pathname && pathname.startsWith('/portal')) {
        return null;
    }

    return (
        <footer className="relative bg-white">
            {/* 1. CALL TO ACTION SECTION (Promo) */}
            <section className="relative z-10 -mb-16 container mx-auto px-4">
                <div className="bg-blue-900 rounded-[2rem] p-8 md:p-12 shadow-2xl overflow-hidden relative">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="hidden lg:block w-1/3">
                            <Image
                                src="/images/bg/promo-img.png"
                                alt="Promo"
                                width={400}
                                height={300}
                                className="w-full h-auto object-contain max-h-48"
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Become A Part Of Our Family!
                            </h3>
                            <p className="text-blue-100 text-lg max-w-xl mb-6">
                                Our expert tutors help students realise their potential and boost their grades through tailored learning experiences.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-block bg-orange-500 hover:bg-white hover:text-blue-900 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg active:scale-95"
                            >
                                Enroll Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. MAIN FOOTER */}
            <div className="pt-32 pb-12 bg-slate-900 text-slate-300">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                        {/* Column 1: Logo & About */}
                        <div className="space-y-6">
                            <Link href="/">
                                <Image
                                    src="/images/footer-logo.png"
                                    alt="Ibrahim Tuition Logo"
                                    width={200}
                                    height={60}
                                    className="h-10 w-auto"
                                />
                            </Link>
                            <p className="leading-relaxed">
                                Our focus is to teach students to emerge as independent, creative learners thereby encouraging their attitude towards academic learning.
                            </p>
                        </div>

                        {/* Column 2: Facebook Widget */}
                        <div className="min-h-[250px]">
                            <h4 className="text-white text-xl font-bold mb-6">Facebook</h4>
                            <Script
                                async
                                defer
                                crossOrigin="anonymous"
                                src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v21.0"
                            />
                            <div
                                className="fb-page"
                                data-href="https://www.facebook.com/IbrahimTuition.co.uk/"
                                data-tabs="timeline"
                                data-small-header="false"
                                data-adapt-container-width="true"
                                data-hide-cover="false"
                                data-show-facepile="true"
                            >
                                <blockquote cite="https://www.facebook.com/IbrahimTuition.co.uk/" className="fb-xfbml-parse-ignore">
                                    <a href="https://www.facebook.com/IbrahimTuition.co.uk/">Ibrahim Tuition Centre</a>
                                </blockquote>
                            </div>
                        </div>

                        {/* Column 3: Useful Links */}
                        <div>
                            <h4 className="text-white text-xl font-bold mb-6">Useful Links</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: "Our Classes", href: "/courses" },
                                    { name: "Latest Services", href: "/subject" },
                                    { name: "Our Teachers", href: "/teachers" },
                                    { name: "Notice Board", href: "/notice" }
                                ].map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="flex items-center gap-2 hover:text-orange-500 transition-colors group">
                                            <ChevronRight size={16} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Contact Info */}
                        <div>
                            <h4 className="text-white text-xl font-bold mb-6">Get In Touch</h4>
                            <ul className="space-y-5">
                                <li className="flex items-start gap-4">
                                    <MapPin className="text-orange-500 shrink-0 mt-1" size={20} />
                                    <span>24-30 Assembly Passage, Stepney Green, London, E1 4UT</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Phone className="text-orange-500 shrink-0" size={20} />
                                    <span>+44 7723001329</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Mail className="text-orange-500 shrink-0" size={20} />
                                    <span>info@ibrahimtuition.co.uk</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Clock className="text-orange-500 shrink-0" size={20} />
                                    <span>Mon - Sun: 09:00 - 18:00</span>
                                </li>
                            </ul>
                        </div>

                    </div>

                    {/* 3. BOTTOM BAR */}
                    <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <p>
                            Copyright © {currentYear} <span className="text-white font-semibold">Ibrahim Tuition Centre</span> | All Rights Reserved
                        </p>
                        <div className="flex gap-6">
                            <Link href="/" className="hover:text-white">Home</Link>
                            <Link href="/about" className="hover:text-white">About Us</Link>
                            <Link href="/contact" className="hover:text-white">Contact Us</Link>
                            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}