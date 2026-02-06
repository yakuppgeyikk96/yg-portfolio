"use client";

import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import { SocialLinks } from "./SocialLinks";
import type { Locale } from "@/types/locale";
import { socialLinks } from "@/lib/social";

const uiStrings: Record<string, Record<Locale, string>> = {
  title: {
    en: "Let's Work Together",
    tr: "Birlikte Çalışalım",
  },
  description: {
    en: "Have a project in mind or want to collaborate? I'd love to hear from you.",
    tr: "Aklınızda bir proje mi var veya işbirliği yapmak mı istiyorsunuz? Sizden haber almak isterim.",
  },
  cta: {
    en: "Get in Touch",
    tr: "İletişime Geç",
  },
};

type ContactCTAProps = {
  locale: Locale;
};

export function ContactCTA({ locale }: ContactCTAProps) {
  const safeLocale = locale === "tr" || locale === "en" ? locale : "en";

  return (
    <section className="relative py-24 md:py-32" aria-label="Contact CTA">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-gradient-primary mb-4 text-3xl font-bold md:text-4xl"
        >
          {uiStrings.title[safeLocale]}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-muted"
        >
          {uiStrings.description[safeLocale]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <Button href={`/${safeLocale}/contact`} variant="primary">
            {uiStrings.cta[safeLocale]}
          </Button>
        </motion.div>

        <SocialLinks links={socialLinks} />
      </div>
    </section>
  );
}

export default ContactCTA;
