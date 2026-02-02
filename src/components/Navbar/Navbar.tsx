"use client";

import type { Locale } from "@/types/locale";
import { Briefcase, Home, Mail, User } from "lucide-react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavbarItem } from "./NavbarItem";

const navLinks = [
  { href: "", labelKey: "home", icon: Home },
  { href: "/work", labelKey: "work", icon: Briefcase },
  { href: "/about", labelKey: "about", icon: User },
  { href: "/contact", labelKey: "contact", icon: Mail },
] as const;

const labels: Record<string, Record<Locale, string>> = {
  home: { en: "Home", tr: "Ana Sayfa" },
  work: { en: "Work", tr: "Projeler" },
  about: { en: "About", tr: "Hakkımda" },
  contact: { en: "Contact", tr: "İletişim" },
};

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname() ?? "/";

  const isActive = (path: string) => {
    const fullPath = path ? `/${locale}${path}` : `/${locale}`;
    if (path === "") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(fullPath);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-40"
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-center px-6">
        <div className="hidden items-center gap-1 overflow-x-auto md:flex md:gap-2">
          {navLinks.map(({ href, labelKey, icon }) => (
            <NavbarItem
              key={href || "home"}
              href={href ? `/${locale}${href}` : `/${locale}`}
              icon={icon}
              active={isActive(href)}
            >
              {labels[labelKey]?.[locale] ?? labelKey}
            </NavbarItem>
          ))}
        </div>
        <div className="absolute right-4 top-4">
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </nav>
    </motion.header>
  );
}
