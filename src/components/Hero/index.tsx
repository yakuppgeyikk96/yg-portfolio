"use client";

import Button from "@/components/ui/Button";
import type { HeroSectionProps } from "@/types/hero";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import ScrollIndicator from "./ScrollIndicator";

const HeroBackground = dynamic(() => import("./HeroBackground"), {
  ssr: false,
  loading: () => null,
});

const Hero = ({ content }: HeroSectionProps) => {
  const { name, tagline, primaryCta, secondaryCta } = content;

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-foreground"
      aria-label="Hero"
    >
      <HeroBackground />

      <div
        className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(22,22,26,0.7)_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.h1
          className="text-gradient-primary text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {name}
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-muted sm:text-xl md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
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

      <ScrollIndicator />
    </section>
  );
};

export default Hero;
