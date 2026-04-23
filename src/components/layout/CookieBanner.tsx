"use client";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import Link from "next/link";

export default function CookieBanner() {
    const { showBanner, acceptCookies, declineCookies } = useCookieConsent();

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 bg-white border-t border-slate-200 shadow-2xl animate-in slide-in-from-bottom duration-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-slate-600 text-sm md:text-base leading-relaxed">
                    <p>
                        We use cookies to improve your experience and analyze our traffic.
                        By clicking "Accept", you consent to our use of cookies as described in our{" "}
                        <Link href="/privacy-policy" className="text-blue-900 font-bold underline">
                            Privacy Policy
                        </Link>.
                    </p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button
                        onClick={declineCookies}
                        className="flex-1 md:flex-none px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                        Decline All
                    </button>
                    <button
                        onClick={acceptCookies}
                        className="flex-1 md:flex-none px-8 py-3 bg-blue-900 text-white text-sm font-bold rounded-xl hover:bg-orange-500 transition-all shadow-lg shadow-blue-900/10"
                    >
                        Accept Cookies
                    </button>
                </div>
            </div>
        </div>
    );
}