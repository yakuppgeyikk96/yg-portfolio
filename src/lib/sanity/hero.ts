import type { HeroContent } from "@/types/hero";
import { Locale } from "@/types/locale";
import { sanityClient } from "./client";
import { heroQuery } from "./queries";

const defaultHeroContent: Record<Locale, HeroContent> = {
  en: {
    name: "Yakup Geyik",
    tagline: "Frontend Developer · Building digital experiences",
    primaryCta: { label: "View Work", href: "/en/work" },
    secondaryCta: { label: "Get in Touch", href: "/en/contact" },
  },
  tr: {
    name: "Yakup Geyik",
    tagline: "Frontend Developer · Dijital deneyimler üretiyorum",
    primaryCta: { label: "Projelere Git", href: "/tr/work" },
    secondaryCta: { label: "İletişim", href: "/tr/contact" },
  },
};

type SanityHero = {
  name?: string | null;
  tagline?: string | null;
  primaryCta?: { label?: string | null; href?: string | null };
  secondaryCta?: { label?: string | null; href?: string | null } | null;
  aboutTitle?: string | null;
  aboutDescription?: string | null;
};

function getDefaultHero(locale: Locale): HeroContent {
  return defaultHeroContent[locale] ?? defaultHeroContent.en;
}

function prefixHref(href: string | null | undefined, locale: string): string {
  if (!href) return `/${locale}`;
  if (href.startsWith(`/${locale}/`) || href === `/${locale}`) return href;
  return href.startsWith("/") ? `/${locale}${href}` : `/${locale}/${href}`;
}

export async function getHeroContent(locale: Locale): Promise<HeroContent> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const safeLocale = locale === "tr" || locale === "en" ? locale : "en";

  if (!projectId) {
    return getDefaultHero(safeLocale);
  }

  try {
    const data = await sanityClient.fetch<SanityHero | null>(heroQuery, {
      locale: safeLocale,
    });

    if (!data?.name) {
      return getDefaultHero(safeLocale);
    }

    return {
      name: data.name ?? getDefaultHero(safeLocale).name,
      tagline: data.tagline ?? getDefaultHero(safeLocale).tagline,
      primaryCta: {
        label:
          data.primaryCta?.label ?? getDefaultHero(safeLocale).primaryCta.label,
        href: prefixHref(
          data.primaryCta?.href ?? getDefaultHero(safeLocale).primaryCta.href,
          safeLocale,
        ),
      },
      secondaryCta:
        data.secondaryCta?.label && data.secondaryCta?.href
          ? {
              label: data.secondaryCta.label,
              href: prefixHref(data.secondaryCta.href, safeLocale),
            }
          : getDefaultHero(safeLocale).secondaryCta,
      aboutTitle: data.aboutTitle ?? undefined,
      aboutDescription: data.aboutDescription ?? undefined,
    };
  } catch {
    return getDefaultHero(safeLocale);
  }
}
