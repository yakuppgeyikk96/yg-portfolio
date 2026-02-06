import TechnologiesPageContent from "@/components/TechnologiesPage";
import { getAllTechnologies } from "@/lib/sanity/technologies";
import type { Locale } from "@/types/locale";
import type {
  TechnologyCategory,
  TechnologyGroup,
  TechnologyWithDetails,
} from "@/types/technology";

const uiStrings: Record<string, Record<Locale, string>> = {
  title: {
    en: "Technologies",
    tr: "Teknolojiler",
  },
  description: {
    en: "The tools and technologies I work with.",
    tr: "Çalıştığım araç ve teknolojiler.",
  },
};

const categoryLabels: Record<TechnologyCategory, Record<Locale, string>> = {
  languages: { en: "Programming Languages", tr: "Programlama Dilleri" },
  frontend: { en: "Frontend", tr: "Frontend" },
  backend: { en: "Backend", tr: "Backend" },
  database: { en: "Database", tr: "Veritabanı" },
  devops: { en: "DevOps", tr: "DevOps" },
  mobile: { en: "Mobile", tr: "Mobil" },
  tools: { en: "Tools", tr: "Araçlar" },
};

const categoryOrder: TechnologyCategory[] = [
  "languages",
  "frontend",
  "backend",
  "database",
  "devops",
  "mobile",
  "tools",
];

function groupTechnologies(
  technologies: TechnologyWithDetails[],
  locale: Locale
): TechnologyGroup[] {
  const grouped = new Map<TechnologyCategory, TechnologyWithDetails[]>();

  for (const tech of technologies) {
    const existing = grouped.get(tech.category) ?? [];
    existing.push(tech);
    grouped.set(tech.category, existing);
  }

  return categoryOrder
    .filter((cat) => grouped.has(cat))
    .map((cat) => ({
      category: cat,
      label: categoryLabels[cat][locale],
      technologies: grouped.get(cat)!,
    }));
}

export default async function TechnologiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale =
    locale === "tr" || locale === "en" ? locale : "en";

  const technologies = await getAllTechnologies(safeLocale);
  const groups = groupTechnologies(technologies, safeLocale);

  return (
    <main className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center md:mb-24">
          <h1 className="text-gradient-primary mb-4 text-3xl font-bold md:text-5xl">
            {uiStrings.title[safeLocale]}
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted">
            {uiStrings.description[safeLocale]}
          </p>
        </div>

        <TechnologiesPageContent groups={groups} />
      </div>
    </main>
  );
}
