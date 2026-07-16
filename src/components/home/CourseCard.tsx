import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';

interface Course {
    id: string;
    title: string;
    slug: string;
    ageRange: string;
    startingPrice: string;
    rating: number;
    image: string;
    subjects: string[];
    description?: string;
}

export default function CourseCard({ course }: { course: Course }) {
    return (
        <div className="group border border-slate-100 rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 bg-white flex flex-col h-full">
            {/* Image Section */}
            <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white px-3 py-1 rounded-lg font-bold text-xs shadow-lg uppercase tracking-tight">
                    {course.startingPrice}
                </div>

                <Image
                    src={course.image || "/images/courses/primary.jpg"}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    // Priority for the first 3 images to improve LCP
                    priority={parseInt(course.id) <= 3}
                />
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow text-center">
                <h3 className="text-xl font-black text-blue-900 mb-1 uppercase tracking-tighter">
                    {course.title} Class
                </h3>

                <div className="flex justify-center gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={14}
                            className={i < course.rating ? "fill-orange-400 text-orange-400" : "text-slate-200"}
                        />
                    ))}
                </div>

                <div className="mb-4">
                    <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-widest border border-orange-100">
                        {course.ageRange}
                    </span>
                </div>

                {course.description && (
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                        {course.description}
                    </p>
                )}

                <ul className="text-sm text-slate-500 mb-6 space-y-1 flex-grow">
                    {course.subjects.slice(0, 3).map((subject, index) => (
                        <li key={index} className="flex items-center justify-center gap-2">
                            <span className="w-1 h-1 bg-blue-900/30 rounded-full" />
                            {subject}
                        </li>
                    ))}
                </ul>

                <Link
                    href={`/courses/${course.slug}`}
                    className="group/btn w-full bg-blue-900 text-white py-3.5 rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-blue-900/10"
                >
                    View Details
                    <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
            </div>
        </div>
    );
}