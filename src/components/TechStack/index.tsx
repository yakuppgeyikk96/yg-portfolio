"use client";

import type { Locale } from "@/types/locale";
import type { Technology } from "@/types/technology";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechCard } from "./TechCard";

const uiStrings: Record<string, Record<Locale, string>> = {
  title: {
    en: "Tech Stack",
    tr: "Teknoloji Yığını",
  },
  viewAll: {
    en: "View All",
    tr: "Tümünü Gör",
  },
};

type TechStackProps = {
  technologies: Technology[];
  locale: Locale;
};

export function TechStack({ technologies, locale }: TechStackProps) {
  if (!technologies || technologies.length === 0) {
    return null;
  }

  const safeLocale = locale === "tr" || locale === "en" ? locale : "en";

  return (
    <section className="relative py-24 md:py-32" aria-label="Tech Stack">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          title={uiStrings.title[safeLocale]}
          linkText={uiStrings.viewAll[safeLocale]}
          linkHref={`/${safeLocale}/technologies`}
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-6">
          {technologies.map((tech, index) => (
            <TechCard
              key={tech._id}
              name={tech.name}
              icon={tech.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;
