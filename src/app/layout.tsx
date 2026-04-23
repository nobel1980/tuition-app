import type { Metadata, Viewport } from "next";
import { Inter, Dosis } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import GoogleAnalytics from "@/components/scripts/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const dosis = Dosis({ subsets: ["latin"], variable: "--font-dosis", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ibrahimtuition.co.uk"),
  title: {
    default: "Ibrahim Tuition | Expert Primary & Secondary Tutoring London",
    template: "%s | Ibrahim Tuition"
  },
  description: "Ibrahim Tuition offers tailored learning in Maths, English, and Science. Specializing in 11 Plus, GCSE, and SATS preparation in Stepney Green, London.",
  keywords: ["11 Plus Tuition London", "GCSE Maths Tutor", "Primary Tutoring Stepney Green", "Ibrahim Tuition"],
  authors: [{ name: "Md. Shahidul Islam Akand" }],

  // 1. Technical SEO: Verification & Indexing
  verification: {
    google: "PG0oMfoOTpjDkIXPyG-UqWAqHK44fxsGc20XebY6Ie0", // From your original PHP header
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 2. Social SEO
  openGraph: {
    title: "Ibrahim Tuition | Empowering Students for Success",
    description: "Expert online and in-person tutors helping students boost grades in London.",
    url: "https://ibrahimtuition.co.uk",
    siteName: "Ibrahim Tuition",
    images: [
      {
        url: "/images/og-main.jpg", // Create a high-quality 1200x630 image
        width: 1200,
        height: 630,
        alt: "Ibrahim Tuition Classroom",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim Tuition",
    description: "Tailored learning for 11 Plus, GCSE, and SATS.",
    images: ["/images/og-main.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e3a8a", // Match your Blue-900 brand color
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 3. Local Business Schema (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TutoringBusiness",
    "name": "Ibrahim Tuition",
    "image": "https://ibrahimtuition.co.uk/images/logo.png",
    "@id": "https://ibrahimtuition.co.uk",
    "url": "https://ibrahimtuition.co.uk",
    "telephone": "+447000000000", // Update with real number
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Stepney Green",
      "addressLocality": "London",
      "postalCode": "E1 4UT",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5225, // Update with real coordinates
      "longitude": -0.0461
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "20:00"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${dosis.variable} scroll-smooth`}>
      <head>
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID!} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased text-slate-900 bg-white min-h-screen flex flex-col font-inter">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}