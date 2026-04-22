import Link from "next/link";
import { ChevronRight } from "lucide-react";
import coursesData from "@/data/courses.json";

export default function RelatedClasses({ currentSlug }: { currentSlug: string }) {
    const otherClasses = coursesData.filter(c => c.slug !== currentSlug).slice(0, 3);

    return (
        <div className="space-y-4">
            <h4 className="text-blue-900 font-black uppercase text-xs tracking-[0.2em] px-2">Other Classes</h4>
            <div className="grid gap-3">
                {otherClasses.map((item) => (
                    <Link
                        key={item.id}
                        href={`/courses/${item.slug}`}
                        className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-orange-200 hover:shadow-sm transition-all"
                    >
                        <span className="font-bold text-slate-700 group-hover:text-blue-900">{item.title}</span>
                        <ChevronRight size={18} className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                    </Link>
                ))}
            </div>
        </div>
    );
}