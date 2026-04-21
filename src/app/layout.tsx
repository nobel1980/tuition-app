import type { Metadata, Viewport } from "next";
import { Inter, Dosis } from "next/font/google"; // Optimized font loading
import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// 1. Setup Fonts (matches your brand identity from the original PHP)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dosis = Dosis({ subsets: ["latin"], variable: "--font-dosis" });

// 2. Production Metadata
export const metadata = {
  title: {
    default: "Ibrahim Tuition | Empowering Students for Success",
    template: "%s | Ibrahim Tuition"
  },
  description: "Expert primary and secondary tuition in London. Specializing in 11 Plus, GCSE, and SATS preparation.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Ibrahim Tuition",
    description: "Tailored learning experiences in Maths, English, and Science.",
    url: "https://ibrahimtuition.co.uk",
    siteName: "Ibrahim Tuition",
    images: [{ url: "/images/og-image.jpg" }],
    locale: "en_GB",
    type: "website",
  },
};

// 3. Viewport Configuration (Separate from Metadata in Next.js 14+)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dosis.variable} scroll-smooth`}>
      <body className="antialiased text-slate-900 bg-white min-h-screen flex flex-col">
        <Navbar />
        {/* flex-grow ensures footer stays at bottom on short pages */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}