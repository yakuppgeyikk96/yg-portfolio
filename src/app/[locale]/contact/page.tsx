import { ContactForm, ContactInfo } from "@/components/ContactPage";
import type { Locale } from "@/types/locale";

const uiStrings: Record<string, Record<Locale, string>> = {
  title: {
    en: "Contact",
    tr: "İletişim",
  },
  description: {
    en: "Have a project in mind? Let's talk about it.",
    tr: "Aklınızda bir proje mi var? Hadi konuşalım.",
  },
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale =
    locale === "tr" || locale === "en" ? locale : "en";

  return (
    <main className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center md:mb-24">
          <h1 className="text-gradient-primary mb-4 text-3xl font-bold md:text-5xl">
            {uiStrings.title[safeLocale]}
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted">
            {uiStrings.description[safeLocale]}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <ContactForm locale={safeLocale} />
          </div>
          <div className="lg:col-span-2">
            <ContactInfo locale={safeLocale} />
          </div>
        </div>
      </div>
    </main>
  );
}
