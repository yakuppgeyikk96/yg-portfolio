import type { Project } from "@/types/project";
import type { Locale } from "@/types/locale";
import { sanityClient } from "./client";
import { featuredProjectsQuery } from "./queries";

type SanityProject = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  image?: Project["image"] | null;
  technologies?: string[] | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  order?: number | null;
};

export async function getFeaturedProjects(
  locale: Locale
): Promise<Project[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const safeLocale = locale === "tr" || locale === "en" ? locale : "en";

  if (!projectId) {
    return [];
  }

  try {
    const data = await sanityClient.fetch<SanityProject[] | null>(
      featuredProjectsQuery,
      { locale: safeLocale }
    );

    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data
      .filter(
        (item): item is SanityProject & {
          title: string;
          slug: string;
          description: string;
          image: Project["image"];
        } => Boolean(item.title && item.slug && item.description && item.image)
      )
      .map((item) => ({
        _id: item._id,
        title: item.title,
        slug: item.slug,
        description: item.description,
        image: item.image,
        technologies: item.technologies ?? [],
        liveUrl: item.liveUrl ?? undefined,
        githubUrl: item.githubUrl ?? undefined,
        order: item.order ?? 0,
      }));
  } catch {
    return [];
  }
}
