import About from "@/components/About";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import { getHeroContent } from "@/lib/sanity/hero";
import { getTechnologies } from "@/lib/sanity/technologies";
import { Locale } from "@/types/locale";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = locale === "tr" || locale === "en" ? locale : "en";

  const [heroContent, technologies] = await Promise.all([
    getHeroContent(safeLocale),
    getTechnologies(safeLocale),
  ]);

  return (
    <main>
      <Hero content={heroContent} />
      <About
        title={heroContent.aboutTitle}
        description={heroContent.aboutDescription}
      />
      <TechStack technologies={technologies} locale={safeLocale} />
    </main>
  );
}
