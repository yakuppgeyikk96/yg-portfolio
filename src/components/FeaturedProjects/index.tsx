"use client";

import type { Locale } from "@/types/locale";
import type { Project } from "@/types/project";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "./ProjectCard";

const uiStrings: Record<string, Record<Locale, string>> = {
  title: {
    en: "Featured Projects",
    tr: "Öne Çıkan Projeler",
  },
  viewAll: {
    en: "View All",
    tr: "Tümünü Gör",
  },
};

type FeaturedProjectsProps = {
  projects: Project[];
  locale: Locale;
};

export function FeaturedProjects({ projects, locale }: FeaturedProjectsProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  const safeLocale = locale === "tr" || locale === "en" ? locale : "en";

  return (
    <section className="relative py-24 md:py-32" aria-label="Featured Projects">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          title={uiStrings.title[safeLocale]}
          linkText={uiStrings.viewAll[safeLocale]}
          linkHref={`/${safeLocale}/work`}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
