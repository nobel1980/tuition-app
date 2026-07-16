"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TeacherProps {
    teacher: { 
        name: string; 
        role: string; 
        image: string; 
        bio?: string; 
        subjects?: string[];
        subject_tags?: string[];
    };
}

export default function TeacherCard({ teacher }: TeacherProps) {
    const [showBio, setShowBio] = useState(false);
    const tags = teacher.subjects || teacher.subject_tags || [];

    const getSubjectColor = (subject: string) => {
        const colors: Record<string, string> = {
            maths: 'bg-blue-50 text-blue-700 border-blue-100',
            english: 'bg-amber-50 text-amber-700 border-amber-100',
            biology: 'bg-emerald-50 text-emerald-700 border-emerald-100',
            chemistry: 'bg-teal-50 text-teal-700 border-teal-100',
            physics: 'bg-violet-50 text-violet-700 border-violet-100',
            science: 'bg-indigo-50 text-indigo-700 border-indigo-100',
            verbal: 'bg-rose-50 text-rose-700 border-rose-100',
            'non-verbal': 'bg-pink-50 text-pink-700 border-pink-100',
        };
        return colors[subject.toLowerCase()] || 'bg-slate-50 text-slate-700 border-slate-100';
    };

    return (
        <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 transition-all hover:shadow-md">
            <h4 className="text-blue-900 font-black uppercase text-xs tracking-[0.2em] mb-5">Your Instructor</h4>
            <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-inner bg-slate-200 shrink-0">
                    <Image
                        src={teacher.image || "/images/icons/avatar-1.png"}
                        alt={teacher.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 64px, (max-width: 1200px) 80px, 100px"
                    />
                </div>
                <div>
                    <p className="font-black text-blue-900 leading-tight">{teacher.name}</p>
                    <p className="text-sm text-orange-600 font-bold">{teacher.role}</p>
                </div>
            </div>

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-4">
                    {tags.map((subj) => (
                        <span 
                            key={subj} 
                            className={`text-[10px] font-bold border px-2 py-0.5 rounded-md capitalize ${getSubjectColor(subj)}`}
                        >
                            {subj}
                        </span>
                    ))}
                </div>
            )}

            {teacher.bio && (
                <div className="mt-5">
                    <button
                        type="button"
                        onClick={() => setShowBio(!showBio)}
                        className="flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-orange-600 transition-colors w-full cursor-pointer z-50 touch-manipulation"
                    >
                        {showBio ? "Hide Details" : "View Details"}
                        {showBio ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${showBio ? 'max-h-[500px] opacity-100 mt-4 pt-4 border-t border-slate-200/60' : 'max-h-0 opacity-0'}`}
                    >
                        <p className="text-sm text-slate-500 italic leading-relaxed">"{teacher.bio}"</p>
                    </div>
                </div>
            )}
        </div>
    );
}