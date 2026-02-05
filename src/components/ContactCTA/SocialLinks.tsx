"use client";

import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import type { SocialLink } from "@/types/contact";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
} as const;

type SocialLinksProps = {
  links: SocialLink[];
};

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {links.map((link, index) => {
        const Icon = iconMap[link.platform];
        return (
          <motion.a
            key={link.platform}
            href={link.url}
            target={link.platform === "email" ? undefined : "_blank"}
            rel={link.platform === "email" ? undefined : "noopener noreferrer"}
            aria-label={link.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              delay: 0.4 + index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.1 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-muted transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Icon size={18} />
          </motion.a>
        );
      })}
    </div>
  );
}
