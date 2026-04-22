"use client";

import React from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
    {
        id: 1,
        title: "Starting £7.99/Hour",
        subtitle: "Small class sizes",
        description: "One teacher to three or four students",
        bgImage: "/images/bg/slide11.jpg",
        primaryBtn: { text: "Learn More", link: "/subject" },
        secondaryBtn: { text: "Contact Us", link: "/contact" },
    },
    {
        id: 2,
        title: "Message Notification",
        subtitle: "Personal messaging service for parents",
        description: "On a daily basis parents will be notified in detail of their child’s progress.",
        bgImage: "/images/bg/slide12.jpg",
        primaryBtn: { text: "Our Services", link: "/subject" },
        secondaryBtn: { text: "Read More", link: "/about" },
    },
];

export default function HeroSlider() {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

    return (
        <section className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="relative flex-[0_0_100%] min-w-0 h-[600px] md:h-[700px] flex items-center"
                    >
                        {/* Background Image with Overlay */}
                        <div
                            className="absolute inset-0 z-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.bgImage})` }}
                        >
                            <div className="absolute inset-0 bg-slate-900/60" />
                        </div>

                        {/* Content */}
                        <div className="container mx-auto px-4 z-10">
                            <div className="max-w-2xl text-white animate-in fade-in slide-in-from-bottom-8 duration-1000">
                                <h4 className="text-xl md:text-2xl font-medium text-orange-400 mb-2">
                                    {slide.subtitle}
                                </h4>
                                <h2 className="text-5xl md:text-7xl font-extrabold mb-6">
                                    {slide.title}
                                </h2>
                                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">
                                    {slide.description}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href={slide.primaryBtn.link}
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2"
                                    >
                                        {slide.primaryBtn.text} <span>→</span>
                                    </Link>
                                    <Link
                                        href={slide.secondaryBtn.link}
                                        className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white px-8 py-4 rounded-full font-bold transition-all"
                                    >
                                        {slide.secondaryBtn.text}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}