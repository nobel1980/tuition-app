import { constructMetadata, getLiveSiteConfig } from "@/lib/seo";
import coursesData from "@/data/courses.json";
import CoursesGrid from "./CoursesGrid";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Image from "next/image";

export async function generateMetadata() {
    const siteConfig = await getLiveSiteConfig();
    return constructMetadata({
        title: "Our Classes",
        description: "Explore our tailored classes for 11 Plus, GCSE, and primary level students in London.",
        siteConfig
    });
}

export default function CoursesPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Banner */}
            <div className="relative h-[300px] flex items-center justify-center bg-blue-900">
                <Image
                    src="/images/bg/home-about-img.jpg"
                    alt="Courses Banner"
                    fill
                    priority
                    className="object-cover opacity-40"
                />
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 uppercase tracking-tight">Our Classes</h1>
                </div>
            </div>

            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <Breadcrumbs
                        items={[
                            { label: "Our Classes" }
                        ]}
                    />
                    
                    <div className="text-center max-w-2xl mx-auto mb-16 mt-8">
                        <h2 className="text-3xl font-bold text-blue-900">Choose Your Path to Success</h2>
                        <p className="text-gray-500 mt-4 text-lg">
                            We offer specialized tuition for all key stages. Find the perfect fit for your child's academic journey.
                        </p>
                    </div>

                    <CoursesGrid initialCourses={coursesData} />
                </div>
            </section>
        </main>
    );
}