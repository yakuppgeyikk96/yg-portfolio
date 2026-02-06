"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CheckCircle2, ExternalLink, Github } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import type { Project } from "@/types/project";

type ProjectShowcaseProps = {
  project: Project;
  index: number;
  reverse?: boolean;
};

export function ProjectShowcase({
  project,
  index,
  reverse = false,
}: ProjectShowcaseProps) {
  return (
    <div
      className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-12 ${
        reverse ? "md:flex-row-reverse" : ""
      } ${index > 0 ? "mt-20 md:mt-28" : ""}`}
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 md:w-1/2"
      >
        <Image
          src={urlFor(project.image).width(800).height(450).url()}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="w-full md:w-1/2"
      >
        <span className="text-6xl font-bold leading-none text-primary/10 md:text-7xl">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h2 className="mt-2 mb-3 text-2xl font-bold text-foreground md:text-3xl">
          {project.title}
        </h2>

        <p className="mb-5 leading-relaxed text-muted">
          {project.description}
        </p>

        {project.highlights.length > 0 && (
          <ul className="mb-5 space-y-2">
            {project.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted">
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0 text-primary/60"
                />
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {project.technologies.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {(project.githubUrl || project.liveUrl) && (
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-border/50 bg-surface/50 px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-primary/50 hover:text-primary"
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
                className="flex items-center gap-2 rounded-lg border border-border/50 bg-surface/50 px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-primary/50 hover:text-primary"
              >
                <ExternalLink size={16} />
                Preview
              </a>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default ProjectShowcase;
