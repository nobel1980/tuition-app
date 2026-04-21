import Image from 'next/image';
import { Course } from '@/lib/types';

export default function CourseCard({ course }: { course: Course }) {
    return (
        <div className="border rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 bg-white">
            <div className="relative h-56 w-full bg-gray-100">
                {/* Pricing Badge */}
                <span className="absolute top-4 left-4 z-10 bg-orange-500 text-white px-3 py-1 rounded-md font-bold text-sm shadow-md">
                    {course.price}
                </span>

                {/* Next.js Optimized Image */}
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={parseInt(course.id) <= 3} // Priority for top row images
                />
            </div>

            <div className="p-6 text-center">
                <h3 className="text-xl font-extrabold text-blue-900 mb-2 uppercase tracking-tight">
                    {course.title}
                </h3>

                <p className="text-xs font-semibold text-orange-600 mb-4 bg-orange-50 inline-block px-2 py-1 rounded">
                    {course.ageRange}
                </p>

                <ul className="text-sm text-slate-600 mb-6 space-y-2 min-h-[80px]">
                    {course.features.map((feature, index) => (
                        <li key={index} className="flex items-center justify-center gap-1">
                            <span className="w-1 h-1 bg-orange-500 rounded-full" />
                            {feature}
                        </li>
                    ))}
                </ul>

                <button className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-orange-500 transition-colors shadow-blue-900/10 shadow-lg">
                    Get Admission
                </button>
            </div>
        </div>
    );
}