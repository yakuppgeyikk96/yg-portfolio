import Hero from "@/components/Hero";
import { getHeroContent } from "@/lib/sanity/hero";
import { Locale } from "@/types/locale";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = locale === "tr" || locale === "en" ? locale : "en";
  const heroContent = await getHeroContent(safeLocale);

  return (
    <main>
      <Hero content={heroContent} />
    </main>
  );
}
