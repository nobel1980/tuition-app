"use client";

import React, { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";

const faqData = [
    {
        id: "panel1",
        question: "How long are the sessions?",
        answer: "Our typical sessions run for 1 to 2 hours depending on the subject and the student's needs. We ensure that every minute is utilized for active learning and practice.",
    },
    {
        id: "panel2",
        question: "Do you provide online or in-person tuition?",
        answer: "We offer both! We have a physical center in London for face-to-face learning, and a robust online platform for students who prefer to learn from the comfort of their home.",
    },
    {
        id: "panel3",
        question: "Looking for a fantastic 11 Plus Tutor?",
        answer: "Sitting the competitive 11 Plus exams can seem a daunting prospect. We provide professional tutors experienced in the 11 Plus, providing tailored sessions to motivate and inspire candidates toward success. We cover any school or entry system.",
    },
];

export default function FAQ() {
    const [openId, setOpenId] = useState<string | null>("panel1");

    const toggleFAQ = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="space-y-4">
            {faqData.map((item) => (
                <div
                    key={item.id}
                    className="border border-slate-700 rounded-xl overflow-hidden bg-slate-800/30 transition-all"
                >
                    <button
                        onClick={() => toggleFAQ(item.id)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-700/50 transition-colors"
                    >
                        <span className="text-lg font-medium text-white">
                            {item.question}
                        </span>
                        <div className="text-orange-500">
                            {openId === item.id ? (
                                <Minus size={20} className="animate-in spin-in-90 duration-300" />
                            ) : (
                                <Plus size={20} className="animate-in fade-in duration-300" />
                            )}
                        </div>
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openId === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            }`}
                    >
                        <div className="p-5 pt-0 text-gray-400 leading-relaxed border-t border-slate-700/50 mt-2">
                            {item.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}