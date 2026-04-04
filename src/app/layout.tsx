
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
  title: "GP Tours & Travels | Premium Kerala Tour Packages & Ticket Booking",
  description: "Experience Kerala with GP Tours & Travels. We offer luxury tour packages, domestic & international air tickets, train & bus bookings, and premium car rentals.",
  keywords: "GP Tours, GP Travels, Kerala Tour Packages, Air Ticket Booking Kerala, Train Ticket Booking, Bus Booking, Luxury Car Rental Kerala, GP Travels Kerala",
  openGraph: {
    title: "GP Tours & Travels | Premium Travel Experiences",
    description: "Book your complete journey with GP Tours & Travels. Luxury Kerala tours and seamless ticket bookings.",
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
