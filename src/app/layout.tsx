
import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import ClientLayout from "@/components/layout/ClientLayout";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "GP Tours & Travels | Premium India Tour Packages & Global Ticket Booking",
  description: "Experience the best of India with GP Tours & Travels. We specialize in Incredible India tours, Kerala vacation packages, and seamless domestic & international flight, train, and bus bookings at competitive rates.",
  keywords: "GP Tours, GP Travels, India Tour Packages, Incredible India Tours, Kerala Tour Packages, South India Travel Agency, Best Travel Agency in India, Air Ticket Booking India, International Flight Booking, Train Ticket Booking India, Bus Booking India, Luxury Car Rental India, Holiday Packages India, Vacation Planning India",
  openGraph: {
    title: "GP Tours & Travels | Incredible India Travel Experiences",
    description: "Book your complete India journey with GP Tours & Travels. Premium tour packages and global ticket bookings for the modern traveler.",
    images: ["/og-image.jpg"],
    url: 'https://www.gptourstravel.com',
    siteName: 'GP Tours & Travels',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // THE SHELL IS NOW INSTANT
  // Navbar and Footer are passed as props to ClientLayout,
  // allowing them to stay as Server Components with their own Suspendable data fetching.
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
        <meta name="google-site-verification" content="wjcDMXNI74xDU2PI5VUWWRo3gUqneGdtI6s0ftNGc2U" />
      </head>
      <body className={`${outfit.variable} antialiased`}>
        <NextAuthProvider>
          <ClientLayout 
            navbar={
              <Suspense fallback={<div className="h-20 bg-white/50 animate-pulse fixed top-0 w-full z-[100]" />}>
                <Navbar />
              </Suspense>
            }
            footer={
              <Suspense fallback={<div className="h-64 bg-slate-900 animate-pulse" />}>
                <Footer />
              </Suspense>
            }
          >
            {children}
          </ClientLayout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
