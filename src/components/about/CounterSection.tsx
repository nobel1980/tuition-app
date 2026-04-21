"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Users, GraduationCap, ClipboardCheck, Heart } from "lucide-react";

const counters = [
    {
        id: 1,
        label: "Quality Teachers",
        value: 21,
        suffix: "",
        icon: <GraduationCap className="w-8 h-8" />,
    },
    {
        id: 2,
        label: "Class and Exam",
        value: 46,
        suffix: "",
        icon: <ClipboardCheck className="w-8 h-8" />,
    },
    {
        id: 3,
        label: "Enrolled Students",
        value: 434,
        suffix: "+",
        icon: <Users className="w-8 h-8" />,
    },
    {
        id: 4,
        label: "Satisfied Parents",
        value: 562,
        suffix: "+",
        icon: <Heart className="w-8 h-8" />,
    },
];

export default function CounterSection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <section ref={ref} className="relative py-20 bg-blue-900 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {counters.map((counter) => (
                        <div key={counter.id} className="text-center">
                            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 text-orange-400">
                                {counter.icon}
                            </div>
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                                <CountUp
                                    key={inView ? "active" : "inactive"}
                                    start={0}
                                    end={inView ? counter.value : 0}
                                    duration={2.5}
                                    separator=","
                                />
                                <span className="text-orange-500 ml-1">{counter.suffix}</span>
                            </div>
                            <p className="text-blue-100 font-bold uppercase tracking-wider text-xs md:text-sm">
                                {counter.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}