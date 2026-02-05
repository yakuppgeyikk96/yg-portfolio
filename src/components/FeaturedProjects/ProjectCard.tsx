"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-surface/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-[0_0_20px_rgba(234,88,12,0.1)]"
    >
      <div className="relative aspect-video shrink-0 overflow-hidden">
        <Image
          src={urlFor(project.image).width(600).height(338).url()}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {project.title}
        </h3>

        <p className="mb-4 flex-grow line-clamp-2 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        {(project.githubUrl || project.liveUrl) && (
          <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-border/50 bg-background px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Github size={16} />
                Source Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-border/50 bg-background px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-primary/50 hover:text-primary"
              >
                <ExternalLink size={16} />
                Preview
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
