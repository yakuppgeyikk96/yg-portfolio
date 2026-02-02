import { redirect } from "next/navigation";
import React from "react";

const locales = ["en", "tr"] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "tr";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = React.use(params);
  const isValid = locales.includes(locale as Locale);

  if (!isValid) {
    redirect(`/${defaultLocale}`);
  }

  return <>{children}</>;
}
