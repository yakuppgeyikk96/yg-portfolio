"use client";

import Button from "@/components/ui/Button";
import type { HeroSectionProps } from "@/types/hero";
import { motion } from "motion/react";

const Hero = ({ content }: HeroSectionProps) => {
  const { name, tagline, primaryCta, secondaryCta } = content;

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center bg-background text-foreground"
      aria-label="Hero"
    >
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.h1
          className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {name}
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-muted sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          {tagline}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <Button href={primaryCta.href} variant="primary">
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button href={secondaryCta.href} variant="outline">
              {secondaryCta.label}
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
