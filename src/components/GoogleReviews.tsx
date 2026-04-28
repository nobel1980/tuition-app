import { getGoogleReviews } from "@/lib/google-reviews";
import Testimonials from "@/components/home/Testimonials";
import { Star } from "lucide-react";
import reviewsFallback from "@/data/reviews.json";

export default async function GoogleReviews() {
    const data = await getGoogleReviews();
    
    // Use real reviews if available, otherwise fallback to local data
    const reviews = data?.reviews || reviewsFallback;
    const rating = data?.rating || 5.0;
    const totalReviews = data?.user_ratings_total || reviewsFallback.length;

    // Prepare the Rich Schema (JSON-LD) for SEO
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Service",
        "name": "Ibrahim Tuition Centre",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": rating,
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": totalReviews,
        },
        "review": reviews.map((rev: any) => ({
            "@type": "Review",
            "author": { "@type": "Person", "name": rev.author_name },
            "reviewRating": { "@type": "Rating", "ratingValue": rev.rating },
            "reviewBody": rev.text,
        })),
    };

    return (
        <section className="py-20 bg-slate-900 overflow-hidden">
            {/* Inject Rich Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h6 className="text-orange-500 font-bold uppercase tracking-widest mb-3">
                            Testimonials
                        </h6>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            What Our Parents & Students Say
                        </h2>
                    </div>
                    
                    <div className="flex flex-col items-center md:items-end gap-2 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                        <div className="flex items-center gap-2">
                            <div className="flex text-orange-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={20}
                                        fill={i < Math.floor(rating) ? "currentColor" : "none"} 
                                        className={i < Math.floor(rating) ? "" : "text-slate-600"}
                                    />
                                ))}
                            </div>
                            <span className="text-2xl font-bold text-white">{rating}</span>
                        </div>
                        <p className="text-slate-400 text-sm font-medium">
                            Based on {totalReviews} Google Reviews
                        </p>
                    </div>
                </div>

                <Testimonials reviews={reviews} />
            </div>
        </section>
    );
}