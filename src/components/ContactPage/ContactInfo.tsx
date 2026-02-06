"use client";

import { motion } from "motion/react";
import { Mail, MapPin, Clock } from "lucide-react";
import { SocialLinks } from "@/components/ContactCTA/SocialLinks";
import { socialLinks } from "@/lib/social";
import type { Locale } from "@/types/locale";

const uiStrings: Record<string, Record<Locale, string>> = {
  infoTitle: { en: "Get in Touch", tr: "İletişime Geçin" },
  infoDesc: {
    en: "Feel free to reach out through the form or connect with me on social media.",
    tr: "Form aracılığıyla veya sosyal medya üzerinden benimle iletişime geçebilirsiniz.",
  },
  emailLabel: { en: "Email", tr: "E-posta" },
  locationLabel: { en: "Location", tr: "Konum" },
  location: { en: "Turkey", tr: "Türkiye" },
  availability: {
    en: "Available for freelance work",
    tr: "Freelance projelere açığım",
  },
};

type ContactInfoProps = {
  locale: Locale;
};

export function ContactInfo({ locale }: ContactInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="rounded-2xl border border-border/50 bg-surface/50 p-6 backdrop-blur-sm md:p-8">
        <h3 className="mb-3 text-xl font-semibold text-foreground">
          {uiStrings.infoTitle[locale]}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-muted">
          {uiStrings.infoDesc[locale]}
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-muted">
            <Mail size={16} className="shrink-0 text-primary" />
            <a
              href="mailto:yakuppgeyik@gmail.com"
              className="transition-colors hover:text-primary"
            >
              yakuppgeyik@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted">
            <MapPin size={16} className="shrink-0 text-primary" />
            <span>{uiStrings.location[locale]}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted">
            <Clock size={16} className="shrink-0 text-primary" />
            <span>{uiStrings.availability[locale]}</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-surface/50 p-6 backdrop-blur-sm">
        <SocialLinks links={socialLinks} />
      </div>
    </motion.div>
  );
}
