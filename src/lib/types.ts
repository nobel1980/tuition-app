export interface Course {
    id: string;
    slug: string;
    title: string;
    price: string;
    ageRange: string;
    features: string[];
    image: string;
}

export interface SiteConfig {
    name: string;
    phone: string[];
    email: string;
    address: string;
    openingHours: string;
}