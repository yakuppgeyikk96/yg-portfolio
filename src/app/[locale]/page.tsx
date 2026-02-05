import About from "@/components/About";
import ContactCTA from "@/components/ContactCTA";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import { getHeroContent } from "@/lib/sanity/hero";
import { getFeaturedProjects } from "@/lib/sanity/projects";
import { getTechnologies } from "@/lib/sanity/technologies";
import { Locale } from "@/types/locale";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = locale === "tr" || locale === "en" ? locale : "en";

  const [heroContent, technologies, featuredProjects] = await Promise.all([
    getHeroContent(safeLocale),
    getTechnologies(safeLocale),
    getFeaturedProjects(safeLocale),
  ]);

  return (
    <main>
      <Hero content={heroContent} />
      <About
        title={heroContent.aboutTitle}
        description={heroContent.aboutDescription}
      />
      <TechStack technologies={technologies} locale={safeLocale} />
      <FeaturedProjects projects={featuredProjects} locale={safeLocale} />
      <ContactCTA locale={safeLocale} />
    </main>
  );
}
