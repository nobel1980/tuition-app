"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, User, Phone, BookOpen, GraduationCap, FileText, CheckCircle2 } from "lucide-react";
import { getCourses } from "@/lib/clientDb";

export default function RegisterPage() {
    // Flow stages: "google-login" | "form" | "success"
    const [stage, setStage] = useState<"google-login" | "form" | "success">("google-login");
    const [googleUser, setGoogleUser] = useState({ name: "", email: "" });
    const [courses, setCourses] = useState<any[]>([]);

    // Form inputs
    const [formData, setFormData] = useState({
        mobile_number: "",
        school_name: "",
        class_name: "",
        remarks: ""
    });

    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // Fetch classes for the dropdown
    useEffect(() => {
        let active = true;
        async function fetchCourses() {
            try {
                const data = await getCourses();
                if (active && Array.isArray(data)) {
                    setCourses(data);
                    if (data.length > 0) {
                        setFormData(prev => ({ ...prev, class_name: data[0].title }));
                    }
                }
            } catch (err) {
                console.warn("Failed to load courses, fallback to hardcoded list:", err);
            }
        }
        fetchCourses();
        return () => { active = false; };
    }, []);

    const handleGoogleLogin = () => {
        // Simulating Google OAuth Return details
        setGoogleUser({
            name: "John Smith",
            email: "john.smith@gmail.com"
        });
        setStage("form");
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        const cleanNumber = formData.mobile_number.trim().replace(/[\s-]/g, "");
        if (!/^[0-9]+$/.test(cleanNumber)) {
            setError("Mobile number must contain digits only.");
            setSubmitting(false);
            return;
        }
        if (cleanNumber.length !== 10) {
            setError("Mobile number must be exactly 10 digits long (excluding +44).");
            setSubmitting(false);
            return;
        }

        const payload = {
            name: googleUser.name,
            email: googleUser.email,
            mobile_number: `+44 ${cleanNumber}`,
            school_name: formData.school_name,
            class_name: formData.class_name,
            remarks: formData.remarks
        };

        try {
            const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const res = await fetch(`${apiBase}/api/enroll`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to submit enrollment request");
            }

            setStage("success");
        } catch (err: any) {
            setError(err.message || "An error occurred during submission. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center py-16 px-4">
            <div className="max-w-md w-full bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] relative overflow-hidden">
                {/* Background glow decorator */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-10 -mt-10 blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-900/5 rounded-full -ml-10 -mb-10 blur-2xl pointer-events-none" />

                {/* STAGE 1: Google Authentication */}
                {stage === "google-login" && (
                    <div className="space-y-6 text-center relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mx-auto">
                            <ShieldCheck size={28} />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Academic Enrollment</h2>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Join the Ibrahim Tuition family. Please sign in with your Google account to initialize your application.
                            </p>
                        </div>

                        <button
                            onClick={handleGoogleLogin}
                            className="w-full h-12 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl font-bold text-slate-700 transition-all flex items-center justify-center gap-3 active:scale-98 shadow-sm bg-white"
                        >
                            {/* Google Logo */}
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#EA4335"
                                    d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.488 0-6.315-2.827-6.315-6.315s2.827-6.315 6.315-6.315c1.65 0 3.125.642 4.242 1.688l3.056-3.056C19.06 2.378 15.895 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.898 0 10.967-4.242 10.967-11.24 0-.712-.064-1.396-.187-1.955H12.24z"
                                />
                            </svg>
                            Continue with Google
                        </button>

                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            🔒 Secure OAuth Authenticator
                        </p>
                    </div>
                )}

                {/* STAGE 2: Registration Detail Input Form */}
                {stage === "form" && (
                    <div className="space-y-6 relative z-10">
                        <div className="border-b border-slate-100 pb-4">
                            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Complete Enrollment</h2>
                            <p className="text-slate-400 text-xs mt-1">Logged in as: <span className="font-semibold text-slate-600">{googleUser.email}</span></p>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs font-semibold border border-red-100">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            {/* Pre-filled name */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-600">Applicant Name (Google Profile)</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        value={googleUser.name}
                                        disabled
                                        className="w-full pl-9 pr-4 h-11 border border-slate-200 rounded-xl bg-slate-50 text-slate-500 text-sm font-semibold focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Mobile Number */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-600">Mobile / Contact Number</label>
                                <div className="relative flex items-center border border-slate-200 rounded-xl bg-white focus-within:ring-1 focus-within:ring-orange-500 focus-within:border-orange-500 overflow-hidden">
                                    <div className="pl-3 text-slate-400">
                                        <Phone size={16} />
                                    </div>
                                    <span className="pl-2 pr-1.5 text-slate-500 font-extrabold text-sm select-none">
                                        +44
                                    </span>
                                    <input
                                        type="tel"
                                        placeholder="7123456789"
                                        value={formData.mobile_number}
                                        onChange={(e) => setFormData(prev => ({ ...prev, mobile_number: e.target.value }))}
                                        required
                                        className="flex-1 pr-4 py-3 text-sm font-semibold focus:outline-none bg-transparent"
                                    />
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium">Please enter the 10-digit number following +44.</p>
                            </div>

                            {/* School / Institute Name */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-600">Current School / Institute Name</label>
                                <div className="relative">
                                    <GraduationCap className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Eton College"
                                        value={formData.school_name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, school_name: e.target.value }))}
                                        required
                                        className="w-full pl-9 pr-4 h-11 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                    />
                                </div>
                            </div>

                            {/* Class/Course interested */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-600">Course / Class of Interest</label>
                                <div className="relative">
                                    <BookOpen className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                                    <select
                                        value={formData.class_name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, class_name: e.target.value }))}
                                        required
                                        className="w-full pl-9 pr-4 h-11 border border-slate-200 rounded-xl text-sm font-semibold bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                    >
                                        {courses.length > 0 ? (
                                            courses.map((c) => (
                                                <option key={c.id} value={c.title}>{c.title} Tuition</option>
                                            ))
                                        ) : (
                                            <>
                                                <option value="GCSE">GCSE Tuition</option>
                                                <option value="A-Level">A-Level Tuition</option>
                                                <option value="11 Plus">11 Plus Prep</option>
                                                <option value="KS3 Secondary">KS3 Secondary</option>
                                                <option value="Primary KS2">Primary KS2</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                            </div>

                            {/* Remarks */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-600">Additional Remarks / Focus Topics (Optional)</label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <textarea
                                        placeholder="Looking specifically for assistance in higher GCSE Mathematics topics and calculus..."
                                        rows={3}
                                        value={formData.remarks}
                                        onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                                        className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 resize-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-98"
                            >
                                {submitting ? "Submitting Application..." : "Complete Application"}
                                <ArrowRight size={16} />
                            </button>
                        </form>
                    </div>
                )}

                {/* STAGE 3: Successful Submission */}
                {stage === "success" && (
                    <div className="space-y-6 text-center relative z-10 py-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20">
                            <CheckCircle2 size={32} className="animate-bounce" />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Application Submitted!</h2>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Thank you, <strong className="text-slate-950 font-bold">{googleUser.name}</strong>. Your enrollment request for <strong className="text-blue-900 font-bold">{formData.class_name} Tuition</strong> has been registered successfully.
                            </p>
                            <p className="text-slate-500 text-xs">
                                Our coordinator will contact you at <span className="font-semibold text-slate-700">{formData.mobile_number}</span> to arrange your initial academic assessment.
                            </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                            <Link
                                href="/"
                                className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center shadow-md active:scale-98"
                            >
                                Back to Homepage
                            </Link>
                            <Link
                                href="/courses"
                                className="w-full h-11 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center active:scale-98"
                            >
                                View Classes Directory
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
