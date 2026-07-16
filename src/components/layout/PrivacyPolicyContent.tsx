import React from "react";
import Link from "next/link";
import { Shield, Eye, Lock, RefreshCw, UserCheck, Mail, Phone, MapPin } from "lucide-react";

interface PrivacyPolicyContentProps {
    isModal?: boolean;
}

export default function PrivacyPolicyContent({ isModal = false }: PrivacyPolicyContentProps) {
    return (
        <div className="space-y-10 text-slate-700 leading-relaxed text-left">
            <div className="flex items-center gap-3 text-orange-600 mb-2">
                <Shield size={24} />
                <span className="font-bold uppercase tracking-wider text-sm">Safe & Secure</span>
            </div>
            {!isModal && <p className="text-slate-500 text-sm mb-8">Last Updated: July 14, 2026</p>}

            {/* 1. Introduction */}
            <section id="introduction" className="scroll-mt-28">
                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-orange-500">1.</span> Introduction
                </h2>
                <p className="text-sm md:text-base">
                    Welcome to <strong>Ibrahim Tuition Centre</strong>. We are committed to protecting and respecting your privacy. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                    (<Link href="/privacy-policy" className="text-blue-900 underline font-semibold">ibrahimtuition.co.uk</Link>) and use our tutoring services.
                </p>
                <p className="text-sm md:text-base mt-3">
                    For the purpose of the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018, the data controller is 
                    <strong> Ibrahim Tuition Centre Ltd</strong>, based at 24-30 Assembly Passage, Stepney Green, London, E1 4UT.
                </p>
            </section>

            {/* 2. Information We Collect */}
            <section id="data-we-collect" className="scroll-mt-28">
                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-orange-500">2.</span> The Information We Collect
                </h2>
                <p className="text-sm md:text-base mb-3">
                    We may collect and process different kinds of personal data about you (and your child) which we have grouped together as follows:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm md:text-base">
                    <li><strong>Identity Data:</strong> First name, last name, date of birth of the student, and name of the parent/guardian.</li>
                    <li><strong>Contact Data:</strong> Billing address, email address, and telephone numbers.</li>
                    <li><strong>Academic Data:</strong> Student&apos;s current school, key stages, current grades, educational history, assessment test scores, and learning requirements.</li>
                    <li><strong>Transaction Data:</strong> Details about payments to and from you and other details of services you have purchased from us.</li>
                    <li><strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting, operating system, and platform when you access our site.</li>
                </ul>
            </section>

            {/* 3. How We Collect */}
            <section id="how-we-collect" className="scroll-mt-28">
                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-orange-500">3.</span> How We Collect Your Personal Information
                </h2>
                <p className="text-sm md:text-base mb-3">
                    We use different methods to collect data from and about you including through:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm md:text-base">
                    <li><strong>Direct Interactions:</strong> You may give us your Identity, Contact, and Academic data by filling in forms on our website (such as our contact or registration forms), or by corresponding with us by phone, email, or in person.</li>
                    <li><strong>Automated Technologies:</strong> As you interact with our website, we may automatically collect Technical Data about your equipment, browsing actions, and patterns. We collect this personal data by using cookies and other similar technologies.</li>
                </ul>
            </section>

            {/* 4. How We Use */}
            <section id="how-we-use" className="scroll-mt-28">
                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-orange-500">4.</span> How We Use Your Personal Information
                </h2>
                <p className="text-sm md:text-base mb-3">
                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm md:text-base">
                    <li>To register you and your child as a client and perform the tutoring contract.</li>
                    <li>To administer assessment tests and design tailored academic plans.</li>
                    <li>To communicate updates on student progress, attendance, and feedback.</li>
                    <li>To manage payments, fees, and collections.</li>
                    <li>To send you administrative information, e.g. schedule changes or updates to our terms.</li>
                    <li>To improve our website, customer relations, and user experience.</li>
                </ul>
            </section>

            {/* 5. Legal Basis */}
            <section id="legal-basis" className="scroll-mt-28">
                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-orange-500">5.</span> Legal Basis for Processing
                </h2>
                <p className="text-sm md:text-base mb-3">
                    Under the UK GDPR, we rely on the following lawful bases to process your information:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                            <UserCheck size={16} className="text-blue-900" /> Contractual Necessity
                        </h4>
                        <p className="text-xs text-slate-600">
                            Required to fulfill our contract to deliver academic tutoring and feedback to you and your child.
                        </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                            <Lock size={16} className="text-blue-900" /> Legitimate Interests
                        </h4>
                        <p className="text-xs text-slate-600">
                            Necessary to run our tutoring center efficiently, keep our records updated, and secure our services.
                        </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                            <Eye size={16} className="text-blue-900" /> Legal Compliance
                        </h4>
                        <p className="text-xs text-slate-600">
                            Where required to comply with regulatory obligations, safeguarding, and HMRC tax guidelines.
                        </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                            <RefreshCw size={16} className="text-blue-900" /> Consent
                        </h4>
                        <p className="text-xs text-slate-600">
                            For non-essential cookies and promotional marketing materials where you have explicitly opted in.
                        </p>
                    </div>
                </div>
            </section>

            {/* 6. Sharing */}
            <section id="sharing" className="scroll-mt-28">
                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-orange-500">6.</span> Sharing of Your Information
                </h2>
                <p className="text-sm md:text-base">
                    We do not sell, rent, or trade your personal data to third parties. We may share your information with trusted service providers:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-sm md:text-base">
                    <li><strong>Service Providers:</strong> IT hosting and system administration services, payment gateways, and email dispatch tools.</li>
                    <li><strong>Professional Advisers:</strong> Accountants, auditors, legal advisors, and insurers.</li>
                    <li><strong>Legal and Safeguarding Bodies:</strong> Regulatory and law enforcement agencies if necessary to meet safeguarding obligations.</li>
                </ul>
            </section>

            {/* 7. Security */}
            <section id="security" className="scroll-mt-28">
                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-orange-500">7.</span> Data Security
                </h2>
                <p className="text-sm md:text-base">
                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, accessed in an unauthorised way, altered, or disclosed. 
                    In addition, we limit access to your personal data to those employees, tutors, and contractors who have a business need to know.
                </p>
            </section>

            {/* 8. Retention */}
            <section id="retention" className="scroll-mt-28">
                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-orange-500">8.</span> Data Retention
                </h2>
                <p className="text-sm md:text-base">
                    We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including satisfying any legal, accounting, or reporting requirements. Typically, client records are kept for up to 6 years after the contract ends.
                </p>
            </section>

            {/* 9. Your Rights */}
            <section id="rights" className="scroll-mt-28">
                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-orange-500">9.</span> Your Data Protection Rights
                </h2>
                <p className="text-sm md:text-base mb-3">
                    Under UK data protection law, you have rights including:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm md:text-base">
                    <li><strong>Your right of access:</strong> You have the right to ask us for copies of your personal information.</li>
                    <li><strong>Your right to rectification:</strong> You have the right to ask us to rectify personal information you think is inaccurate.</li>
                    <li><strong>Your right to erasure:</strong> You have the right to ask us to erase your personal information in certain circumstances.</li>
                    <li><strong>Your right to restriction of processing:</strong> You have the right to ask us to restrict processing.</li>
                    <li><strong>Your right to object to processing:</strong> You have the right to object to the processing of your personal information.</li>
                </ul>
            </section>

            {/* 10. Cookies */}
            <section id="cookies" className="scroll-mt-28">
                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-orange-500">10.</span> Cookies
                </h2>
                <p className="text-sm md:text-base">
                    Our website uses cookies to distinguish you from other users. This helps us to provide you with a good experience and improve our site. 
                    You can manage your preferences through our interactive Cookie Banner or browser settings.
                </p>
            </section>

            {/* 11. Contact Us */}
            <section id="contact" className="scroll-mt-28 pb-4">
                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-orange-500">11.</span> Contact Us
                </h2>
                <p className="text-sm md:text-base mb-4">
                    If you have any questions about this Privacy Policy, including any requests to exercise your legal rights, please contact us using the details below:
                </p>
                
                <div className="bg-slate-900 text-white rounded-xl p-5 md:p-6 flex flex-col md:flex-row gap-4 justify-between shadow-sm">
                    <div className="space-y-3">
                        <h3 className="text-base font-bold text-orange-500">Ibrahim Tuition Centre</h3>
                        <ul className="space-y-2 text-xs md:text-sm text-slate-300">
                            <li className="flex items-start gap-2.5">
                                <MapPin size={16} className="text-orange-500 shrink-0 mt-0.5" />
                                <span>24-30 Assembly Passage, Stepney Green, London, E1 4UT</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone size={16} className="text-orange-500 shrink-0" />
                                <span>+44 7723001329</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail size={16} className="text-orange-500 shrink-0" />
                                <span>info@ibrahimtuition.co.uk</span>
                            </li>
                        </ul>
                    </div>
                    <div className="border-t border-slate-800 md:border-t-0 md:border-l md:pl-6 pt-4 md:pt-0 max-w-xs text-xs text-slate-400 self-center">
                        <p>
                            You also have the right to lodge a complaint with the <strong>Information Commissioner&apos;s Office (ICO)</strong>, the UK regulator for data protection (www.ico.org.uk).
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
