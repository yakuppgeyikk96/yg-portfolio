"use client";

import { motion } from "motion/react";

type AboutProps = {
  title?: string;
  description?: string;
};

export function About({ title, description }: AboutProps) {
  if (!title && !description) {
    return null;
  }

  return (
    <section className="relative py-24 md:py-32" aria-label="About">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          {title && (
            <h2 className="text-gradient-primary text-3xl text-center font-bold md:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg leading-relaxed text-justify text-muted md:text-xl">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default About;
