import coursesFallback from "@/data/courses.json";
import teachersFallback from "@/data/teachers.json";
import { getCourses } from "@/lib/clientDb";

export async function getCourseBySlug(slug: string) {
    try {
        const courses = await getCourses();
        const course = courses.find((c: any) => c.slug === slug);
        if (!course) return undefined;

        // API matches courses with teacher relation loaded
        return {
            ...course,
            teacher: course.teacher || null
        };
    } catch (error) {
        console.warn("getCourseBySlug API call failed, falling back to local JSON:", error);
        
        const course = coursesFallback.find((c) => c.slug === slug);
        if (!course) return undefined;
        
        const teacher = teachersFallback.find((t) => t.id === (course as any).teacherId);
        return {
            ...course,
            teacher: teacher || null
        };
    }
}