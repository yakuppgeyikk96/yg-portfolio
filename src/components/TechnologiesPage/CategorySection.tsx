"use client";

import { motion } from "motion/react";
import type { TechnologyGroup } from "@/types/technology";
import { TechDetailCard } from "./TechDetailCard";

type CategorySectionProps = {
  group: TechnologyGroup;
  index: number;
};

export function CategorySection({ group, index }: CategorySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="mb-16 last:mb-0"
    >
      <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">
        {group.label}
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-6">
        {group.technologies.map((tech, techIndex) => (
          <TechDetailCard
            key={tech._id}
            name={tech.name}
            icon={tech.icon}
            index={techIndex}
          />
        ))}
      </div>
    </motion.div>
  );
}
