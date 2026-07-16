"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/components/home/CourseCard";
import { getCourses } from "@/lib/clientDb";

interface CoursesGridProps {
    initialCourses: any[];
}

export default function CoursesGrid({ initialCourses }: CoursesGridProps) {
    const [courses, setCourses] = useState<any[]>(initialCourses);

    useEffect(() => {
        let active = true;
        async function fetchCourses() {
            try {
                const data = await getCourses();
                if (active && Array.isArray(data)) {
                    setCourses(data);
                }
            } catch (err) {
                console.warn("Failed to fetch courses from API, using fallback data:", err);
            }
        }
        fetchCourses();
        return () => {
            active = false;
        };
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
}
