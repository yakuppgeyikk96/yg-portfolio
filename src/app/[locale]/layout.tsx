import { Navbar } from "@/components/Navbar";
import { redirect } from "next/navigation";
import React from "react";

const locales = ["en", "tr"] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "tr";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValid = locales.includes(locale as Locale);

  if (!isValid) {
    redirect(`/${defaultLocale}`);
  }

  return (
    <>
      <Navbar locale={locale as Locale} />
      {children}
    </>
  );
}
