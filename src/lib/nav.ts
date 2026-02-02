import type { Locale } from "@/types/locale";

const LOCALES = ["en", "tr"] as const;

/**
 * Pathname'dan locale çıkarıp verilen locale ile path üretir.
 * Örn: /tr/work → getLocalizedPath("en", "/tr/work") → /en/work
 */
export function getLocalizedPath(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${locale}`;

  const firstIsLocale = LOCALES.includes(segments[0] as Locale);
  const pathWithoutLocale = firstIsLocale ? segments.slice(1) : segments;
  const rest =
    pathWithoutLocale.length > 0 ? `/${pathWithoutLocale.join("/")}` : "";

  return `/${locale}${rest}`;
}
