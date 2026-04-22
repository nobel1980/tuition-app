"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, Quote } from "lucide-react";

interface Review {
    author_name: string;
    rating: number;
    text: string;
    profile_photo_url?: string;
}

interface TestimonialsProps {
    reviews: Review[];
}

export default function Testimonials({ reviews }: TestimonialsProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 6000, stopOnInteraction: false }),
    ]);

    // Update dots when the slide changes
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    // Click handler for dots
    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    const RenderStars = ({ rating }: { rating: number }) => (
        <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    className={i < rating ? "fill-orange-400 text-orange-400" : "text-slate-600"}
                />
            ))}
        </div>
    );

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            {/* Carousel Container */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y">
                    {reviews.map((review, index) => (
                        <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                            <div className="bg-slate-800/40 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-slate-700/50 shadow-2xl">
                                <Quote className="text-orange-500 mb-6 w-12 h-12 opacity-20" />

                                <p className="text-lg md:text-xl text-slate-200 italic mb-8 leading-relaxed font-light">
                                    "{review.text}"
                                </p>

                                <div className="flex items-center justify-between gap-4 border-t border-slate-700/50 pt-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-orange-500/30">
                                            <img
                                                src={review.profile_photo_url || "/images/icons/avatar.png"}
                                                alt={review.author_name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-lg">{review.author_name}</p>
                                            <RenderStars rating={review.rating} />
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Google Review</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-3 mt-8">
                {reviews.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`transition-all duration-300 rounded-full ${index === selectedIndex
                                ? "w-8 h-2 bg-orange-500"
                                : "w-2 h-2 bg-slate-600 hover:bg-slate-400"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}