import { notFound } from 'next/navigation';
import coursesData from '@/data/courses.json';

// In v16, params is a Promise
export default async function CourseDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const course = coursesData.find((c) => c.slug === slug);

    if (!course) notFound();

    return (
        <main className="container mx-auto py-20">
            <h1 className="text-4xl font-bold">{course.title}</h1>
            <p className="mt-4 text-gray-600">{course.ageRange}</p>
            {/* ... detail content */}
        </main>
    );
}