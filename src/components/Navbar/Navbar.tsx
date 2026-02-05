"use client";

import type { Locale } from "@/types/locale";
import { Briefcase, Code2, Home, Mail, PenLine } from "lucide-react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavbarItem } from "./NavbarItem";

const navLinks = [
  { href: "", labelKey: "home", icon: Home },
  { href: "/work", labelKey: "work", icon: Briefcase },
  { href: "/technologies", labelKey: "technologies", icon: Code2 },
  { href: "/blog", labelKey: "blog", icon: PenLine },
  { href: "/contact", labelKey: "contact", icon: Mail },
] as const;

const labels: Record<string, Record<Locale, string>> = {
  home: { en: "Home", tr: "Ana Sayfa" },
  work: { en: "Work", tr: "Projeler" },
  technologies: { en: "Tech", tr: "Teknolojiler" },
  blog: { en: "Blog", tr: "Blog" },
  contact: { en: "Contact", tr: "İletişim" },
};

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-4"
    >
      <nav
        className={`hidden items-center gap-1 rounded-2xl px-2 py-2 transition-all duration-300 md:flex md:gap-2 ${
          scrolled
            ? "border border-border/50 bg-background/80 shadow-lg backdrop-blur-xl"
            : ""
        }`}
      >
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
      </nav>
      <div className="absolute right-4 top-4">
        <LanguageSwitcher currentLocale={locale} />
      </div>
    </motion.header>
  );
}
