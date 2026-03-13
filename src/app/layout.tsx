import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GP Travels | Premium Travel Experiences",
  description: "Explore amazing destinations with GP Travels, your trusted partner for unforgettable journeys. Luxury tours, expert guides, and personalized itineraries.",
  openGraph: {
    title: "GP Travels | Premium Travel Experiences",
    description: "Explore amazing destinations with GP Travels, your trusted partner for unforgettable journeys.",
    images: ["/og-image.jpg"], // You would need to add this image
  },
};

import NextAuthProvider from "@/components/providers/NextAuthProvider";
import ClientLayout from "@/components/layout/ClientLayout";
import { getSiteSettings } from "@/lib/settings";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings = {};
  try {
    settings = await getSiteSettings();
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
  }

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextAuthProvider>
          <ClientLayout settings={settings}>
            {children}
          </ClientLayout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
