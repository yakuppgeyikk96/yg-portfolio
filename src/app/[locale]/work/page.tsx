import ProjectShowcase from "@/components/ProjectShowcase";
import { getAllProjects } from "@/lib/sanity/projects";
import type { Locale } from "@/types/locale";

const uiStrings: Record<string, Record<Locale, string>> = {
  title: {
    en: "My Work",
    tr: "Projelerim",
  },
  description: {
    en: "A showcase of projects I've built and contributed to.",
    tr: "Geliştirdiğim ve katkıda bulunduğum projelerin vitrini.",
  },
};

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = locale === "tr" || locale === "en" ? locale : "en";

  const projects = await getAllProjects(safeLocale);

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

        {projects.map((project, index) => (
          <ProjectShowcase
            key={project._id}
            project={project}
            index={index}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </main>
  );
}
