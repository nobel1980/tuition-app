import { notFound } from "next/navigation";
import Image from "next/image";
import { getCourseBySlug } from "@/lib/dataMapper";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getLiveSiteConfig, getCourseSchema } from "@/lib/seo";
import EnrollmentCard from "@/components/courses/sidebar/EnrollmentCard";
import TeacherCard from "@/components/courses/sidebar/TeacherCard";
import RelatedClasses from "@/components/courses/sidebar/RelatedClasses";
import { User, PoundSterling, CheckCircle2, Star } from "lucide-react";
import type { Metadata } from "next";
import coursesData from "@/data/courses.json";
import { getCourses } from "@/lib/clientDb";

export async function generateStaticParams() {
    try {
        const courses = await getCourses();
        if (Array.isArray(courses)) {
            return courses.map((course: any) => ({
                slug: course.slug,
            }));
        }
    } catch (err) {
        console.warn("Failed to fetch courses in generateStaticParams, using local JSON:", err);
    }
    return coursesData.map((course) => ({
        slug: course.slug,
    }));
}

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const course = await getCourseBySlug(slug);
    const siteConfig = await getLiveSiteConfig();

    if (!course) return { title: "Course Not Found" };

    return {
        title: course.seoTitle,
        description: course.seoDescription,
        alternates: {
            canonical: `${siteConfig.url}/courses/${course.slug}`,
        },
        openGraph: {
            title: course.seoTitle,
            description: course.seoDescription,
            url: `${siteConfig.url}/courses/${course.slug}`,
            images: [{ url: course.ogImage }],
        },
    };
}

export default async function CoursePage({ params }: Props) {
    const { slug } = await params;
    const course = await getCourseBySlug(slug);
    if (!course) return notFound();

    const siteConfig = await getLiveSiteConfig();
    const courseJsonLd = getCourseSchema(course, siteConfig);

    return (
        <div className="bg-white">
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
            />

            {/* HERO */}
            <section className="relative h-64 flex items-center justify-center bg-blue-900">
                <Image
                    src={course.bannerImage || '/images/bg/banner-bg-5.jpg'}
                    alt={`${course.title} tuition`}
                    fill
                    priority
                    className="object-cover opacity-30"
                />
                <h1 className="relative z-10 text-4xl font-extrabold text-white uppercase">
                    {course.title} Tuition {course.ageRange}
                </h1>
            </section>

            {/* MAIN */}
            <div className="max-w-7xl mx-auto px-4 py-10">
                <Breadcrumbs
                    items={[
                        { label: "Our Classes", href: "/courses" },
                        { label: course.title },
                    ]}
                />

                <div className="grid lg:grid-cols-3 gap-12 mt-6">
                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="relative h-[400px] rounded-3xl overflow-hidden shadow">
                            <Image src={course.image || '/images/courses/primary.jpg'} alt={course.title} fill className="object-cover" />
                        </div>

                        <div className="flex flex-wrap items-center gap-6 border-b pb-4 text-slate-700 font-semibold">
                            <span className="flex items-center gap-2">
                                <User className="text-orange-500" size={18} />
                                {course.ageRange}
                            </span>
                            <span className="flex items-center gap-2">
                                <PoundSterling className="text-orange-500" size={18} />
                                {course.startingPrice}
                            </span>
                            {course.rating !== undefined && course.rating !== null && (
                                <span className="flex items-center gap-1 sm:border-l sm:pl-6">
                                    <span className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={i < course.rating ? "fill-orange-400 text-orange-400" : "text-slate-200"}
                                            />
                                        ))}
                                    </span>
                                    <span className="text-sm font-bold text-slate-500 ml-1">
                                        ({course.rating}.0)
                                    </span>
                                </span>
                            )}
                        </div>

                        {course.description && (
                            <div className="p-6 bg-slate-50 border-l-4 border-orange-500 rounded-r-2xl shadow-sm my-6">
                                <p className="text-slate-700 text-lg leading-relaxed font-medium italic">
                                    "{course.description}"
                                </p>
                            </div>
                        )}

                        {/* Overview */}
                        <section>
                            <h2 className="text-2xl font-bold text-blue-900 mb-3">
                                Class Overview
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                {course.overview}
                            </p>
                        </section>

                        {/* Subjects */}
                        <section aria-labelledby="subjects-heading">
                            <h2
                                id="subjects-heading"
                                className="text-2xl font-bold text-blue-900 mb-4"
                            >
                                Curriculum & Subjects
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                {(course.subjects as string[]).map((subject: string, i: number) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl"
                                    >
                                        <CheckCircle2 className="text-orange-500" size={18} />
                                        <span className="font-medium">{subject}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* SIDEBAR */}
                    <aside className="space-y-6 sticky top-24 h-fit">
                        <EnrollmentCard
                            groupFee={course.fees.group}
                            privateFee={course.fees.oneToOne}
                        />

                        {course.teachers && course.teachers.length > 0 ? (
                            course.teachers.map((t: any) => (
                                <TeacherCard key={t.id} teacher={t} />
                            ))
                        ) : (
                            course.teacher && <TeacherCard teacher={course.teacher} />
                        )}

                        <RelatedClasses currentSlug={course.slug} />
                    </aside>
                </div>
            </div>
        </div>
    );
}