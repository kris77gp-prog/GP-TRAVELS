import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedTours } from "@/components/sections/FeaturedTours";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { QuickContact } from "@/components/sections/QuickContact";
import { CONTACT_INFO } from "@/lib/data";
import { prisma } from "@/lib/db";

import { getSiteSettings, getTestimonials } from "@/lib/settings";

export default async function Home() {
  let featuredTours: any[] = [];
  let settings: any = {};
  let testimonials: any[] = [];

  try {
    const [toursRes, settingsRes, testimonialsRes] = await Promise.all([
      prisma.tour.findMany({
        where: { featured: true },
        take: 3
      }),
      getSiteSettings(),
      getTestimonials()
    ]);
    featuredTours = toursRes;
    settings = settingsRes;
    testimonials = testimonialsRes;
  } catch (error) {
    console.error("Failed to fetch home page data:", error);
  }

  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection settings={settings} />

      <FeaturedTours tours={featuredTours} />

      <WhyChooseUs />

      <Testimonials testimonials={testimonials} />

      <QuickContact settings={settings} />
    </main>
  );
}
