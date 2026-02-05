import type { Technology } from "@/types/technology";
import type { Locale } from "@/types/locale";
import { sanityClient } from "./client";
import { technologiesQuery } from "./queries";

type SanityTechnology = {
  _id: string;
  name?: string | null;
  icon?: string | null;
  order?: number | null;
};

export async function getTechnologies(locale: Locale): Promise<Technology[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const safeLocale = locale === "tr" || locale === "en" ? locale : "en";

  if (!projectId) {
    return [];
  }

  try {
    const data = await sanityClient.fetch<SanityTechnology[] | null>(
      technologiesQuery,
      { locale: safeLocale }
    );

    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data
      .filter(
        (item): item is SanityTechnology & { name: string; icon: string } =>
          Boolean(item.name && item.icon)
      )
      .map((item) => ({
        _id: item._id,
        name: item.name,
        icon: item.icon,
        order: item.order ?? 0,
      }));
  } catch {
    return [];
  }
}
