"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    ChevronRight
} from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PrivacyPolicyContent from "@/components/layout/PrivacyPolicyContent";
import siteDataFallback from "@/data/site.json";
import { getSettings } from "@/lib/clientDb";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();
    const [siteData, setSiteData] = useState<any>(siteDataFallback);
    const [callbackEmail, setCallbackEmail] = useState("");
    const [callbackSubmitted, setCallbackSubmitted] = useState(false);

    const handleCallbackSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (callbackEmail.trim()) {
            setCallbackSubmitted(true);
            setTimeout(() => {
                setCallbackSubmitted(false);
                setCallbackEmail("");
            }, 3000);
        }
    };

    useEffect(() => {
        let active = true;
        async function fetchSettings() {
            try {
                const settings = await getSettings();
                if (active && settings && settings.site_settings) {
                    setSiteData(settings.site_settings);
                }
            } catch (err) {
                console.warn("Failed to load settings from API, using fallback JSON:", err);
            }
        }
        fetchSettings();
        return () => { active = false; };
    }, []);

    if (pathname && pathname.startsWith('/portal')) {
        return null;
    }

    return (
        <footer className="relative bg-white">
            {/* 1. CALL TO ACTION SECTION (Promo) */}
            <section className="relative z-10 -mb-16 container mx-auto px-4">
                <div className="bg-gradient-to-br from-[#0c1938] via-[#10224d] to-[#081329] border border-blue-900/40 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(8,18,36,0.3)] overflow-hidden relative">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full -ml-20 -mb-20 blur-3xl pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03),_transparent_70%)] pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                        {/* Text Content */}
                        <div className="lg:col-span-7 text-center lg:text-left">
                            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/20 mb-5 backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                </span>
                                Academic Excellence
                            </div>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                                Become A Part Of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Our Family!</span>
                            </h3>
                            <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed font-light mb-0">
                                Our expert tutors help students realise their potential and boost their grades through tailored, interactive learning experiences that make a difference.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start">
                                <Link
                                    href="/register"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-7 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_10px_25px_rgba(249,115,22,0.5)] hover:scale-[1.02] active:scale-95 group text-sm"
                                >
                                    Enroll Now
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>
                            </div>
                        </div>

                        {/* Interactive Callback consultation request form */}
                        <div className="lg:col-span-5 w-full">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-inner relative overflow-hidden">
                                {callbackSubmitted ? (
                                    <div className="text-center py-6">
                                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h4 className="text-white font-bold text-lg mb-1">Request Received!</h4>
                                        <p className="text-slate-300 text-xs">Our coordinator will contact you shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleCallbackSubmit} className="space-y-4">
                                        <h4 className="text-white font-bold text-md text-center lg:text-left">Get a Free Consultation</h4>
                                        <p className="text-slate-400 text-xs text-center lg:text-left">Enter your email or phone number to request a callback.</p>
                                        <div className="flex flex-col sm:flex-row gap-2.5">
                                            <input 
                                                type="text" 
                                                placeholder="Email or Phone Number" 
                                                value={callbackEmail}
                                                onChange={(e) => setCallbackEmail(e.target.value)}
                                                required
                                                className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                                            />
                                            <button 
                                                type="submit" 
                                                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(249,115,22,0.3)] hover:scale-[1.02] active:scale-95 whitespace-nowrap"
                                            >
                                                Submit Request
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
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
                                    src={siteData.footerLogo || "/images/footer-logo.png"}
                                    alt={`${siteData.name} Logo`}
                                    width={200}
                                    height={60}
                                    className="h-10 w-auto"
                                />
                            </Link>
                            <p className="leading-relaxed">
                                {siteData.description || "Our focus is to teach students to emerge as independent, creative learners thereby encouraging their attitude towards academic learning."}
                            </p>
                        </div>

                        {/* Column 2: Social Links */}
                        <div className="space-y-6">
                            <h4 className="text-white text-xl font-bold relative pb-2 inline-block">
                                Follow Us
                                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-orange-500 rounded-full"></span>
                            </h4>
                            <p className="text-slate-300 leading-relaxed text-sm">
                                Stay updated with our latest news, educational resources, and announcements on our social networks.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    {
                                        name: "Facebook",
                                        icon: (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                className="w-5 h-5"
                                            >
                                                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                                            </svg>
                                        ),
                                        href: siteData.socials?.facebook || "https://www.facebook.com/IbrahimTuition.co.uk/",
                                        hoverClass: "hover:bg-blue-600 hover:text-white hover:border-blue-600"
                                    },
                                    {
                                        name: "X (Twitter)",
                                        icon: (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                                className="w-4.5 h-4.5"
                                            >
                                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                                            </svg>
                                        ),
                                        href: siteData.socials?.twitter || "https://x.com/",
                                        hoverClass: "hover:bg-black hover:text-white hover:border-black"
                                    },
                                    {
                                        name: "Instagram",
                                        icon: (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-5 h-5"
                                            >
                                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                            </svg>
                                        ),
                                        href: siteData.socials?.instagram || "https://www.instagram.com/",
                                        hoverClass: "hover:bg-pink-600 hover:text-white"
                                    },
                                    {
                                        name: "LinkedIn",
                                        icon: (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-5 h-5"
                                            >
                                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                                <rect width="4" height="12" x="2" y="9" />
                                                <circle cx="4" cy="4" r="2" />
                                            </svg>
                                        ),
                                        href: siteData.socials?.linkedin || "https://www.linkedin.com/",
                                        hoverClass: "hover:bg-blue-700 hover:text-white"
                                    },
                                    {
                                        name: "YouTube",
                                        icon: (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-5 h-5"
                                            >
                                                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                                                <polygon points="10 15 15 12 10 9" />
                                            </svg>
                                        ),
                                        href: siteData.socials?.youtube || "https://www.youtube.com/",
                                        hoverClass: "hover:bg-red-600 hover:text-white"
                                    }
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 rounded-full flex items-center justify-center bg-slate-800/80 text-slate-400 border border-slate-700/40 transition-all duration-300 ${social.hoverClass} hover:scale-110 active:scale-95 shadow-md`}
                                        title={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Column 3: Useful Links */}
                        <div>
                            <h4 className="text-white text-xl font-bold mb-6">Useful Links</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: "Our Classes", href: "/courses" },
                                    { name: "Latest Services", href: "/subjects" },
                                    { name: "Our Teachers", href: "/about" },
                                    { name: "Notice Board", href: "/about" }
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
                                    <span>
                                        {siteData.contact?.address?.street}, {siteData.contact?.address?.locality}, {siteData.contact?.address?.city}, {siteData.contact?.address?.postcode}
                                    </span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Phone className="text-orange-500 shrink-0" size={20} />
                                    <span>{siteData.contact?.phone}</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Mail className="text-orange-500 shrink-0" size={20} />
                                    <span>{siteData.contact?.email}</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Clock className="text-orange-500 shrink-0" size={20} />
                                    <span>{siteData.hours?.display}</span>
                                </li>
                            </ul>
                        </div>

                    </div>

                    {/* 3. BOTTOM BAR */}
                    <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <p>
                            Copyright © {currentYear} <span className="text-white font-semibold">{siteData.companyName || siteData.name}</span> | All Rights Reserved
                        </p>
                        <div className="flex gap-6">
                            <Link href="/" className="hover:text-white">Home</Link>
                            <Link href="/about" className="hover:text-white">About Us</Link>
                            <Link href="/contact" className="hover:text-white">Contact Us</Link>
                            <Dialog>
                                <DialogTrigger render={<Link href="/privacy-policy" className="hover:text-white" />}>
                                    Privacy Policy
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto bg-white p-6 md:p-10 shadow-2xl rounded-2xl border border-slate-100">
                                    <DialogHeader className="mb-6">
                                        <DialogTitle className="text-2xl font-bold text-slate-900">Privacy Policy</DialogTitle>
                                    </DialogHeader>
                                    <PrivacyPolicyContent isModal={true} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}