"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

type NavbarItemProps = {
  href: string;
  children: React.ReactNode;
  icon: LucideIcon;
  active?: boolean;
};

export function NavbarItem({
  href,
  children,
  icon: Icon,
  active,
}: NavbarItemProps) {
  return (
    <Link
      href={href}
      className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active ? "text-primary" : "text-foreground hover:text-primary"
      }`}
    >
      {active && (
        <motion.span
          layoutId="navbar-active"
          className="absolute inset-0 rounded-full bg-primary/10"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <Icon size={16} className="relative z-10" />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
