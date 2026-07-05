import { notFound } from "next/navigation";
import Image from "next/image";
import { getCourseBySlug } from "@/lib/dataMapper";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import EnrollmentCard from "@/components/courses/sidebar/EnrollmentCard";
import TeacherCard from "@/components/courses/sidebar/TeacherCard";
import RelatedClasses from "@/components/courses/sidebar/RelatedClasses";
import { User, PoundSterling, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import coursesData from "@/data/courses.json";

export async function generateStaticParams() {
    return coursesData.map((course) => ({
        slug: course.slug,
    }));
}

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const course = getCourseBySlug(slug);

    if (!course) return { title: "Course Not Found" };

    return {
        title: course.seoTitle,
        description: course.seoDescription,
        alternates: {
            canonical: `https://ibrahimtuition.co.uk/courses/${course.slug}`,
        },
        openGraph: {
            title: course.seoTitle,
            description: course.seoDescription,
            url: `https://ibrahimtuition.co.uk/courses/${course.slug}`,
            images: [{ url: course.ogImage }],
        },
    };
}

export default async function CoursePage({ params }: Props) {
    const { slug } = await params;  // FIXED: await params
    const course = getCourseBySlug(slug);
    if (!course) return notFound();

    const courseJsonLd = {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.title,
        description: course.overview,
        provider: {
            "@type": "Organization",
            name: "Ibrahim Tuition",
            sameAs: "https://ibrahimtuition.co.uk",
        },
        offers: [
            {
                "@type": "Offer",
                price: course.startingPrice.replace("£", ""),
                priceCurrency: "GBP",
            },
        ],
    };

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
                    src={course.bannerImage}
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
                            <Image src={course.image} alt={course.title} fill className="object-cover" />
                        </div>

                        <div className="flex gap-6 border-b pb-4 text-slate-700 font-semibold">
                            <span className="flex items-center gap-2">
                                <User className="text-orange-500" size={18} />
                                {course.ageRange}
                            </span>
                            <span className="flex items-center gap-2">
                                <PoundSterling className="text-orange-500" size={18} />
                                {course.startingPrice}
                            </span>
                        </div>

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
                                {course.subjects.map((subject, i) => (
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

                        {course.teacher && <TeacherCard teacher={course.teacher} />}

                        <RelatedClasses currentSlug={course.slug} />
                    </aside>
                </div>
            </div>
        </div>
    );
}