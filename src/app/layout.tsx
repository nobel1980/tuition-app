import type { Metadata, Viewport } from "next";
import { Roboto, Dosis, Raleway } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import GoogleAnalytics from "@/components/scripts/GoogleAnalytics";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getLiveSiteConfig } from "@/lib/seo";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap"
});
const dosis = Dosis({ subsets: ["latin"], variable: "--font-dosis", display: "swap" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getLiveSiteConfig();

  return {
    metadataBase: new URL(siteConfig.url || "https://ibrahimtuition.co.uk"),
    title: {
      default: `${siteConfig.name || "Ibrahim Tuition"} | Expert Primary & Secondary Tutoring London`,
      template: `%s | ${siteConfig.name || "Ibrahim Tuition"}`
    },
    description: siteConfig.description,
    keywords: siteConfig.seo?.keywords || ["11 Plus Tuition London", "GCSE Maths Tutor", "Primary Tutoring Stepney Green", "Ibrahim Tuition"],
    authors: [{ name: "Md. Shahidul Islam Akand" }],

    // 1. Technical SEO: Verification & Indexing
    verification: {
      google: siteConfig.seo?.googleVerification || "PG0oMfoOTpjDkIXPyG-UqWAqHK44fxsGc20XebY6Ie0",
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
      title: `${siteConfig.name || "Ibrahim Tuition"} | Empowering Students for Success`,
      description: siteConfig.description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage || "/images/og-main.jpg",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name || "Ibrahim Tuition"} Classroom`,
        },
      ],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage || "/images/og-main.jpg"],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e3a8a", // Match your Blue-900 brand color
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteConfig = await getLiveSiteConfig();

  // 3. Local Business Schema (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TutoringBusiness",
    "name": siteConfig.name,
    "image": siteConfig.logo,
    "@id": siteConfig.url,
    "url": siteConfig.url,
    "telephone": siteConfig.contact?.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact?.address?.street,
      "addressLocality": siteConfig.contact?.address?.city,
      "postalCode": siteConfig.contact?.address?.postcode,
      "addressCountry": siteConfig.contact?.address?.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.contact?.address?.latitude,
      "longitude": siteConfig.contact?.address?.longitude
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": siteConfig.hours?.days,
      "opens": siteConfig.hours?.opens,
      "closes": siteConfig.hours?.closes
    }
  };

  return (
    <html
      lang="en"
      className={cn("scroll-smooth", roboto.variable, dosis.variable, raleway.variable, "font-sans")}
      data-scroll-behavior="smooth"
    >
      <head>
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID!} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased text-slate-900 bg-white min-h-screen flex flex-col font-sans">
        <TooltipProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CookieBanner />
        </TooltipProvider>
      </body>
    </html>
  );
}