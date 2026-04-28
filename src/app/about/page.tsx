import { constructMetadata } from "@/lib/seo";
import CounterSection from "@/components/about/CounterSection";
import ServicesTab from "@/components/about/ServicesTab";
import Link from "next/link";
import Image from "next/image";
import GoogleReviews from "@/components/GoogleReviews";

export const metadata = constructMetadata({
    title: "About Us",
    description: "Ibrahim Tuition Centre is well known for teaching students from Key Stage 1 to A-Levels, delivering extraordinary teaching across all stages."
});

export default function AboutPage() {
    return (
        <main>
            {/* Page Header */}
            <div className="relative py-24 bg-slate-900 text-center overflow-hidden">
                <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/bg/banner-bg.jpg')" }}
                />
                <div className="relative z-10 container mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h2>
                    <div className="flex justify-center gap-2 text-gray-300">
                        <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-orange-500">About</span>
                    </div>
                </div>
            </div>

            {/* Welcome Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <Image
                                src="/images/bg/about-img.png"
                                alt="About Ibrahim Tuition"
                                width={600}
                                height={400}
                                className="w-full h-auto rounded-2xl shadow-xl"
                            />
                        </div>
                        <div className="lg:w-1/2 space-y-6">
                            <h6 className="text-orange-600 font-bold uppercase tracking-wider">
                                Welcome To Our Tuition Centre
                            </h6>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                                Ibrahim Tuition Centre
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Ibrahim Tuition Centre is well known for teaching students from Key Stage 1 to A-Levels.
                                    They deliver extraordinary teaching to students from all stages and levels.
                                </p>
                                <p>
                                    Essential subjects are taught based on age, individual talents, and competence.
                                    Regular motivation is given to students to exceed their goals and targets.
                                </p>
                                <p>
                                    We aim to teach energetically, ensuring our tutors stay updated with the national
                                    curriculum to encourage students to attain excellent grades.
                                </p>
                            </div>
                            <button className="bg-blue-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-500 transition-all">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <CounterSection />
            <ServicesTab />
            <GoogleReviews />
        </main>
    );
}