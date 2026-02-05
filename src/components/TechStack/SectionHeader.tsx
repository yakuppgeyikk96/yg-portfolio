"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { SectionHeaderProps } from "@/types/technology";

export function SectionHeader({ title, linkText, linkHref }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-12 flex items-center justify-between"
    >
      <h2 className="text-gradient-primary text-3xl font-bold md:text-4xl">
        {title}
      </h2>
      <Link
        href={linkHref}
        className="group flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary md:text-base"
      >
        {linkText}
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </motion.div>
  );
}
