"use client";

import { useState } from "react";
import { Book, Heart, GraduationCap, Target } from "lucide-react";

const tabData = [
    {
        id: "improve",
        label: "Improve Grades",
        icon: <Target size={20} />,
        title: "Improve Grades",
        description: "To see whether students understand their attainment level, essay comments, and homework assignments, we set dedicated times for them to talk with teachers out of class.",
        image: "/images/service/2.jpg"
    },
    {
        id: "confidence",
        label: "Boost Confidence",
        icon: <Heart size={20} />,
        title: "Boost Confidence",
        description: "We promote self-esteem and confidence as the foundation for all learning. Without these, a student's interest in living out their skills greatly diminishes.",
        image: "/images/service/6.jpg"
    },
    {
        id: "exams",
        label: "Prep for Exams",
        icon: <GraduationCap size={20} />,
        title: "Prep for Exams",
        description: "Exams serve more than one purpose. We help instructors and students understand exactly what is being tested to make the experience more useful.",
        image: "/images/service/3.jpg"
    }
];

export default function ServicesTab() {
    const [activeTab, setActiveTab] = useState(tabData[1].id); // Default to Boost Confidence

    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h6 className="text-orange-600 font-bold uppercase tracking-widest mb-2">What We Do</h6>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Services We Provide</h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Tabs */}
                    <div className="lg:w-1/3 flex flex-col gap-3">
                        {tabData.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-4 p-5 rounded-xl text-left transition-all font-semibold ${activeTab === tab.id
                                        ? "bg-blue-900 text-white shadow-lg translate-x-2"
                                        : "bg-white text-slate-700 hover:bg-slate-100"
                                    }`}
                            >
                                <span className={activeTab === tab.id ? "text-orange-400" : "text-blue-900"}>
                                    {tab.icon}
                                </span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="lg:w-2/3 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 min-h-[400px]">
                        {tabData.filter(t => t.id === activeTab).map((content) => (
                            <div key={content.id} className="flex flex-col md:flex-row gap-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="md:w-1/2 space-y-6">
                                    <h3 className="text-2xl font-bold text-slate-900">{content.title}</h3>
                                    <p className="text-gray-600 leading-relaxed italic border-l-4 border-orange-500 pl-6">
                                        {content.description}
                                    </p>
                                    <a href="/classes" className="inline-block text-blue-900 font-bold border-b-2 border-orange-500 hover:text-orange-500 transition-colors">
                                        View Classes
                                    </a>
                                </div>
                                <div className="md:w-1/2">
                                    <img src={content.image} alt={content.title} className="rounded-2xl shadow-lg h-64 w-full object-cover" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}