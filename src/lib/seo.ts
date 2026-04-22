import { Metadata } from "next";

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

export function constructMetadata({
    title = SITE_CONFIG.name,
    description = SITE_CONFIG.description,
    image = SITE_CONFIG.ogImage,
    icons = "/favicon.ico",
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title: {
            default: title,
            template: `%s | ${SITE_CONFIG.name}`
        },
        description,
        keywords: [
            "11 Plus Tuition London",
            "GCSE Maths Tutor",
            "Primary Tutoring Stepney Green",
            "KS2 SATS Preparation",
            "Ibrahim Tuition Centre"
        ],
        openGraph: {
            title,
            description,
            images: [{ url: image }],
            type: "website",
            siteName: SITE_CONFIG.name
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "@ibrahimtuition"
        },
        icons,
        metadataBase: new URL(SITE_CONFIG.url),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
        alternates: {
            canonical: SITE_CONFIG.url,
        },
        verification: {
            google: "PG0oMfoOTpjDkIXPyG-UqWAqHK44fxsGc20XebY6Ie0",
        }
    };
}

export function getCourseSchema(course: any) {
    return {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": `${course.title} Class`,
        "description": course.overview,
        "provider": {
            "@type": "LocalBusiness",
            "name": SITE_CONFIG.name,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": SITE_CONFIG.address.street,
                "addressLocality": SITE_CONFIG.address.city,
                "postalCode": SITE_CONFIG.address.postcode,
                "addressCountry": SITE_CONFIG.address.country
            }
        },
        "offers": {
            "@type": "Offer",
            "price": course.startingPrice.replace(/[^\d.]/g, ''),
            "priceCurrency": "GBP"
        }
    };
}