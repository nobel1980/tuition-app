import { Metadata } from "next";
import siteDataFallback from "@/data/site.json";
import { getSettings } from "@/lib/clientDb";

export const SITE_CONFIG = {
    name: "Ibrahim Tuition",
    description: "Expert primary and secondary tuition in London. Specializing in 11 Plus, GCSE, and SATS preparation in Stepney Green.",
    url: "https://ibrahimtuition.co.uk",
    ogImage: "https://ibrahimtuition.co.uk/images/og-main.jpg",
    links: {
        twitter: "https://twitter.com/ibrahimtuition",
        facebook: "https://facebook.com/ibrahimtuition",
    },
    address: {
        street: "Stepney Green",
        city: "London",
        postcode: "E1 4UT",
        country: "GB"
    }
};

/**
 * Fetch dynamic site configuration from database settings, falling back to static files.
 */
export async function getLiveSiteConfig() {
    try {
        const settings = await getSettings();
        if (settings && settings.site_settings) {
            return {
                ...siteDataFallback,
                ...settings.site_settings
            };
        }
    } catch (e) {
        console.warn("Failed to fetch dynamic site config for SEO, falling back to JSON:", e);
    }
    return siteDataFallback;
}

/**
 * Construct metadata dynamically.
 */
export function constructMetadata({
    title,
    description,
    image,
    icons = "/favicon.ico",
    noIndex = false,
    siteConfig = SITE_CONFIG
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
    siteConfig?: any;
} = {}): Metadata {
    const resolvedTitle = title || siteConfig.name;
    const resolvedDesc = description || siteConfig.description;
    const resolvedImg = image || siteConfig.ogImage;

    return {
        title: {
            default: resolvedTitle,
            template: `%s | ${siteConfig.name}`
        },
        description: resolvedDesc,
        keywords: [
            "11 Plus Tuition London",
            "GCSE Maths Tutor",
            "Primary Tutoring Stepney Green",
            "KS2 SATS Preparation",
            "Ibrahim Tuition Centre"
        ],
        openGraph: {
            title: resolvedTitle,
            description: resolvedDesc,
            images: [{ url: resolvedImg }],
            type: "website",
            siteName: siteConfig.name
        },
        twitter: {
            card: "summary_large_image",
            title: resolvedTitle,
            description: resolvedDesc,
            images: [resolvedImg],
            creator: "@ibrahimtuition"
        },
        icons,
        metadataBase: new URL(siteConfig.url),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
        alternates: {
            canonical: siteConfig.url,
        },
        verification: {
            google: "PG0oMfoOTpjDkIXPyG-UqWAqHK44fxsGc20XebY6Ie0",
        }
    };
}

/**
 * Generate Structured Course Schema data dynamically.
 */
export function getCourseSchema(course: any, siteConfig: any = SITE_CONFIG) {
    return {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": `${course.title} Class`,
        "description": course.overview,
        "provider": {
            "@type": "LocalBusiness",
            "name": siteConfig.name,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": (siteConfig.address?.street || siteConfig.contact?.address?.street || ""),
                "addressLocality": (siteConfig.address?.city || siteConfig.contact?.address?.city || ""),
                "postalCode": (siteConfig.address?.postcode || siteConfig.contact?.address?.postcode || ""),
                "addressCountry": (siteConfig.address?.country || siteConfig.contact?.address?.country || "GB")
            }
        },
        "offers": {
            "@type": "Offer",
            "price": course.startingPrice.replace(/[^\d.]/g, ''),
            "priceCurrency": "GBP"
        }
    };
}