import { constructMetadata } from "@/lib/seo";
import Link from "next/link";
import PrivacyPolicyContent from "@/components/layout/PrivacyPolicyContent";

export const metadata = constructMetadata({
    title: "Privacy Policy",
    description: "Read our privacy policy to understand how Ibrahim Tuition Centre collects, protects, and uses your personal data in accordance with UK GDPR."
});

export default function PrivacyPolicyPage() {
    return (
        <main className="bg-slate-50 min-h-screen pb-20">
            {/* Page Header */}
            <div className="relative py-24 bg-slate-900 text-center overflow-hidden">
                <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/bg/banner-bg.jpg')" }}
                />
                <div className="relative z-10 container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
                    <div className="flex justify-center gap-2 text-gray-300">
                        <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-orange-500">Privacy Policy</span>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 mt-16 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-10">
                    
                    {/* Sticky Sidebar Navigation */}
                    <aside className="lg:w-1/4 hidden lg:block">
                        <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
                                Policy Sections
                            </h3>
                            <nav className="flex flex-col gap-2.5 text-sm text-slate-600">
                                <a href="#introduction" className="hover:text-blue-900 hover:font-medium transition-all">1. Introduction</a>
                                <a href="#data-we-collect" className="hover:text-blue-900 hover:font-medium transition-all">2. Information We Collect</a>
                                <a href="#how-we-collect" className="hover:text-blue-900 hover:font-medium transition-all">3. How We Collect It</a>
                                <a href="#how-we-use" className="hover:text-blue-900 hover:font-medium transition-all">4. How We Use Your Data</a>
                                <a href="#legal-basis" className="hover:text-blue-900 hover:font-medium transition-all">5. Legal Basis</a>
                                <a href="#sharing" className="hover:text-blue-900 hover:font-medium transition-all">6. Sharing of Information</a>
                                <a href="#security" className="hover:text-blue-900 hover:font-medium transition-all">7. Data Security</a>
                                <a href="#retention" className="hover:text-blue-900 hover:font-medium transition-all">8. Data Retention</a>
                                <a href="#rights" className="hover:text-blue-900 hover:font-medium transition-all">9. Your Rights</a>
                                <a href="#cookies" className="hover:text-blue-900 hover:font-medium transition-all">10. Cookies</a>
                                <a href="#contact" className="hover:text-blue-900 hover:font-medium transition-all">11. Contact Us</a>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Text Content */}
                    <article className="lg:w-3/4 bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 prose prose-slate max-w-none">
                        <PrivacyPolicyContent isModal={false} />
                    </article>

                </div>
            </div>
        </main>
    );
}
