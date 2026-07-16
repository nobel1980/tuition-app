"use client";

import { useState } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import Link from "next/link";
import { Shield, Lock, Eye, Settings, ArrowLeft } from "lucide-react";

export default function CookieBanner() {
    const { showBanner, acceptCookies, declineCookies } = useCookieConsent();
    const [isCustomizing, setIsCustomizing] = useState(false);
    const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
    const [marketingEnabled, setMarketingEnabled] = useState(false);

    if (!showBanner) return null;

    const handleSavePreferences = () => {
        if (analyticsEnabled) {
            acceptCookies();
        } else {
            declineCookies();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] max-w-md w-[calc(100%-2rem)] bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)] md:shadow-[0_25px_60px_rgba(15,23,42,0.18)] animate-in fade-in-0 slide-in-from-bottom-10 duration-500 text-slate-800">
            {!isCustomizing ? (
                // 1. Initial Prompt
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                            <Shield size={20} className="animate-pulse" />
                        </div>
                        <div>
                            <h4 className="font-extrabold text-slate-900 tracking-tight text-md">We value your privacy</h4>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Cookie Consent Manager</p>
                        </div>
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed font-medium">
                        We use cookies to customize content, assess website traffic, and deliver a more secure user experience.
                        By clicking <strong className="text-blue-900 font-bold">"Accept All"</strong>, you consent to our use of cookies. Read our{" "}
                        <Link href="/privacy-policy" className="text-orange-500 font-extrabold hover:underline">
                            Privacy Policy
                        </Link>.
                    </p>

                    <div className="flex flex-col gap-2 pt-2">
                        <button
                            onClick={acceptCookies}
                            className="w-full h-11 bg-blue-900 hover:bg-blue-855 text-white text-xs font-black rounded-xl transition-all shadow-md active:scale-98 tracking-wide uppercase"
                        >
                            Accept All Cookies
                        </button>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsCustomizing(true)}
                                className="flex-1 h-10 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                            >
                                <Settings size={14} /> Customize
                            </button>
                            <button
                                onClick={declineCookies}
                                className="flex-1 h-10 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all"
                            >
                                Decline All
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                // 2. Custom Preference Controls
                <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <button
                            onClick={() => setIsCustomizing(false)}
                            className="text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1 text-xs font-bold"
                        >
                            <ArrowLeft size={14} /> Back
                        </button>
                        <h4 className="font-extrabold text-slate-900 text-sm">Cookie Preferences</h4>
                    </div>

                    <div className="space-y-4 max-h-56 overflow-y-auto pr-1">
                        {/* Category 1: Essential */}
                        <div className="flex items-start justify-between gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="space-y-0.5">
                                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-slate-900">
                                    <Lock size={12} className="text-slate-500" /> Strictly Necessary
                                </span>
                                <p className="text-[10px] text-slate-500 leading-relaxed">
                                    Essential cookies required to enable page navigation and security functions. Can't be disabled.
                                </p>
                            </div>
                            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider mt-1">
                                Active
                            </span>
                        </div>

                        {/* Category 2: Analytics */}
                        <div className="flex items-start justify-between gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="space-y-0.5">
                                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-slate-900">
                                    <Eye size={12} className="text-slate-500" /> Performance & Analytics
                                </span>
                                <p className="text-[10px] text-slate-500 leading-relaxed">
                                    Enables us to analyze visitor behavior, count visits, and optimize user experience performance.
                                </p>
                            </div>
                            {/* Toggle Switch */}
                            <button
                                type="button"
                                onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none mt-1 ${
                                    analyticsEnabled ? 'bg-orange-500' : 'bg-slate-200'
                                }`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                        analyticsEnabled ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>

                        {/* Category 3: Marketing */}
                        <div className="flex items-start justify-between gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="space-y-0.5">
                                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-slate-900">
                                    <Settings size={12} className="text-slate-500" /> Marketing Preferences
                                </span>
                                <p className="text-[10px] text-slate-500 leading-relaxed">
                                    Used to deliver relative ad campaigns based on visitor interests and prevent repeat display.
                                </p>
                            </div>
                            {/* Toggle Switch */}
                            <button
                                type="button"
                                onClick={() => setMarketingEnabled(!marketingEnabled)}
                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none mt-1 ${
                                    marketingEnabled ? 'bg-orange-500' : 'bg-slate-200'
                                }`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                        marketingEnabled ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleSavePreferences}
                        className="w-full h-11 bg-blue-900 hover:bg-blue-800 text-white text-xs font-black rounded-xl transition-all shadow-md active:scale-98 tracking-wide uppercase"
                    >
                        Save Preferences
                    </button>
                </div>
            )}
        </div>
    );
}