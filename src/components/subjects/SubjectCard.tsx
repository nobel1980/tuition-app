"use client";

import Image from 'next/image';
import * as LucideIcons from 'lucide-react';

interface SubjectProps {
    subject: {
        title: string;
        keyStages: string;
        description: string;
        image: string;
        icon: string;
    };
}

export default function SubjectCard({ subject }: SubjectProps) {
    // Dynamically select icon based on JSON string
    const IconComponent = (LucideIcons as any)[subject.icon.charAt(0).toUpperCase() + subject.icon.slice(1)] || LucideIcons.Book;

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full transition-all hover:shadow-2xl">
            <div className="relative h-52 w-full">
                <Image
                    src={subject.image}
                    alt={subject.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-50 text-blue-900 rounded-lg">
                        <IconComponent size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{subject.title}</h4>
                </div>

                <h6 className="text-orange-600 font-semibold text-sm mb-3 uppercase tracking-wide">
                    {subject.keyStages}
                </h6>

                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    {subject.description}
                </p>
            </div>
        </div>
    );
}