"use client";

import React, { useEffect, useState } from 'react';
import { BookOpen, Users, Award, LucideIcon } from 'lucide-react';
import { getServices } from '@/lib/clientDb';

const iconMap: Record<string, LucideIcon> = {
    BookOpen: BookOpen,
    Users: Users,
    Award: Award
};

const fallbackServices = [
    {
        title: "Books & Exam Papers",
        description: "Over a thousand students use our free resources to support them with their studies. Our resources include books and exam papers.",
        icon: "BookOpen",
        link: "#",
    },
    {
        title: "Quality Teachers",
        description: "Ibrahim Tuition ensures a competency-based hiring of tutors. We ensure that every tutor has a qualified CRB screening.",
        icon: "Users",
        link: "/about",
    },
    {
        title: "Our Top Classes",
        description: "We provide feedback to the parents and discuss an appropriate personalised plan for the student based on initial assessments.",
        icon: "Award",
        link: "/courses",
    }
];

export default function Services() {
    const [services, setServices] = useState<any[]>(fallbackServices);

    useEffect(() => {
        let active = true;
        async function loadServices() {
            try {
                const data = await getServices();
                if (active && Array.isArray(data) && data.length > 0) {
                    setServices(data);
                }
            } catch (err) {
                console.warn("Failed to fetch services from API, using fallback data:", err);
            }
        }
        loadServices();
        return () => {
            active = false;
        };
    }, []);

    return (
        <section id="services" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h6 className="text-orange-500 font-bold tracking-wide uppercase text-sm mb-3">
                        Ibrahim Tuition Centre
                    </h6>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                        Why Choose Us
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        We offer personalised sessions that reflect the learning of students at their school (the national curriculum)
                        thereby supporting them to prepare and upgrade themselves for higher levels and sets. Students are taught
                        successful learning techniques so they can become independent learners.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const IconComponent = iconMap[service.icon] || Award;
                        return (
                            <div
                                key={index}
                                className="group p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-orange-500 transition-all duration-300 hover:-translate-y-2 text-center"
                            >
                                {/* Icon Container */}
                                <div className="w-16 h-16 mx-auto mb-6 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                                    <div className="group-hover:text-white transition-colors duration-300 text-blue-900">
                                        <IconComponent className="w-8 h-8" />
                                    </div>
                                </div>

                                {/* Text Content */}
                                <h4 className="text-xl font-bold text-slate-900 mb-4">
                                    {service.title}
                                </h4>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Action Link */}
                                <a
                                    href={service.link || "#"}
                                    className="inline-block text-sm font-bold text-blue-900 uppercase tracking-wider hover:text-orange-500 transition-colors"
                                >
                                    Read More +
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}