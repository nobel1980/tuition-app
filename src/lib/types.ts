export interface Course {
    id: string;
    slug: string;
    title: string;
    seoTitle: string;        // Added for SEO
    seoDescription: string;  // Added for SEO
    ageRange: string;
    startingPrice: string;   // Renamed from 'price' to match JSON
    rating: number;          // Added
    image: string;
    ogImage: string;         // Added for Social SEO
    bannerImage: string;     // Added for Page Banners
    overview: string;        // Added
    subjects: string[];      // Renamed from 'features' to match JSON
    description: string;     // Added
    fees: {                  // Added nested object
        group: string;
        oneToOne: string;
    };
    teacher: {               // Added nested object
        name: string;
        role: string;
        image: string;
        bio?: string;        // Optional field
    };
}

export interface SiteConfig {
    name: string;
    description: string;    // Added for default meta tags
    url: string;            // Added for canonical links
    ogImage: string;        // Added for site-wide social sharing
    phone: string[];
    email: string;
    address: {              // Changed to object for structured schema.org data
        street: string;
        city: string;
        postcode: string;
        country: string;
    };
    openingHours: string;
    links: {                // Added for footer/social links
        twitter: string;
        facebook: string;
    };
}