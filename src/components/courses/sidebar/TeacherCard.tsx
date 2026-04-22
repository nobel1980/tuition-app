"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TeacherProps {
    teacher: { name: string; role: string; image: string; bio?: string; };
}

export default function TeacherCard({ teacher }: TeacherProps) {
    const [showBio, setShowBio] = useState(false);

    return (
        <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 transition-all hover:shadow-md">
            <h4 className="text-blue-900 font-black uppercase text-xs tracking-[0.2em] mb-5">Your Instructor</h4>
            <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-inner bg-slate-200 shrink-0">
                    <Image
                        src={teacher.image}
                        alt={teacher.name}
                        fill
                        className="object-cover"
                        // ADD THIS LINE:
                        sizes="(max-width: 768px) 64px, (max-width: 1200px) 80px, 100px"
                    />
                </div>
                <div>
                    <p className="font-black text-blue-900 leading-tight">{teacher.name}</p>
                    <p className="text-sm text-orange-600 font-bold">{teacher.role}</p>
                </div>
            </div>

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