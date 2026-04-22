import courses from "@/data/courses.json";
import teachers from "@/data/teachers.json";

export function getCourseBySlug(slug: string) {
    const course = courses.find((c) => c.slug === slug);
    if (!course) return undefined;
    
    // Explicitly find the teacher and attach it, casting to any if TS complains, 
    // but here we just construct a new object.
    const teacher = teachers.find((t) => t.id === (course as any).teacherId);
    
    return {
        ...course,
        teacher: teacher || null
    };
}