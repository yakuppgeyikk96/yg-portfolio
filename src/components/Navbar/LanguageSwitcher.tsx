"use client";

import { Dropdown } from "@/components/ui/Dropdown";
import { getLocalizedPath } from "@/lib/nav";
import type { Locale } from "@/types/locale";
import { locales } from "@/types/locale";
import { usePathname } from "next/navigation";
import React from "react";

const localeLabels: Record<Locale, React.ReactNode> = {
  en: "🇺🇸 English",
  tr: "🇹🇷 Türkçe",
};

type LanguageSwitcherProps = {
  currentLocale: Locale;
};

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";

  const items = locales
    .filter((loc) => loc !== currentLocale)
    .map((loc) => ({
      label: localeLabels[loc],
      href: getLocalizedPath(pathname, loc),
    }));

  return (
    <Dropdown
      trigger={<span>{localeLabels[currentLocale]}</span>}
      items={items}
      align="right"
    />
  );
}
