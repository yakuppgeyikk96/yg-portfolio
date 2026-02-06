"use client";

import { motion } from "motion/react";

type TechDetailCardProps = {
  name: string;
  icon: string;
  index: number;
};

export function TechDetailCard({ name, icon, index }: TechDetailCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-border/50 bg-surface/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-[0_0_20px_rgba(234,88,12,0.1)]"
    >
      <div
        className="flex h-12 w-12 items-center justify-center text-muted transition-colors group-hover:text-primary md:h-14 md:w-14 [&>svg]:h-full [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: icon }}
        aria-hidden="true"
      />
      <span className="text-center text-sm font-medium text-foreground md:text-base">
        {name}
      </span>
    </motion.div>
  );
}
