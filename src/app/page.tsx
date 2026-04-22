import HeroSlider from "@/components/home/HeroSlider";
import Services from "@/components/home/Services";
import CourseCard from "@/components/home/CourseCard";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import { constructMetadata } from "@/lib/seo";
import Image from "next/image";

// Data Imports (Replace with API calls in Phase 2)
import courses from "@/data/courses.json";
import reviews from "@/data/reviews.json";

export const metadata = constructMetadata({
  title: "Home",
  description: "Tailored learning experiences in Maths, English, and Science for academic success."
});

export default async function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section (Replaces PHP Slider) */}
      <HeroSlider />

      {/* 2. Welcome/About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h6 className="text-blue-900 font-bold flex items-center gap-2">
              <span className="text-xl">+</span> Ibrahim Tuition Centre
            </h6>
            <h2 className="text-4xl font-extrabold text-slate-900 my-6">
              Invest in your child’s future
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The core aim of Ibrahim Tuition is to offer an extensive fine-tuned
              learning experience for students in Maths, English and Science.
              We mentor your child to reach their complete potential.
            </p>
            <p className="font-bold text-slate-800">
              Our focus is to teach students to emerge as independent creative
              learners, encouraging their attitude towards academic learning.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/bg/home-about-img.jpg"
                alt="Students studying"
                width={800}
                height={600}
                priority
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Section */}
      <Services />

      {/* 4. Courses Grid (Replaces hardcoded PHP lists) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h6 className="text-blue-900 font-semibold">We love what we do</h6>
            <h2 className="text-3xl font-bold mt-2">Our Top Courses</h2>
            <p className="text-gray-500 mt-4">
              Initial assessments guide our personalized plans for every student.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Social Proof & FAQ */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-8">Our Happy Parents</h2>
            <Testimonials reviews={reviews} />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <FAQ />
          </div>
        </div>
      </section>
    </main>
  );
}