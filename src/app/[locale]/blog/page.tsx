import { BlogList } from "@/components/Blog";
import { getAllBlogPosts } from "@/lib/sanity/blog";
import type { Locale } from "@/types/locale";

const uiStrings: Record<string, Record<Locale, string>> = {
  title: {
    en: "Blog",
    tr: "Blog",
  },
  description: {
    en: "Thoughts, tutorials, and insights on web development.",
    tr: "Web geliştirme üzerine düşünceler, rehberler ve içgörüler.",
  },
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale =
    locale === "tr" || locale === "en" ? locale : "en";

  const posts = await getAllBlogPosts(safeLocale);

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

        <BlogList posts={posts} locale={safeLocale} />
      </div>
    </main>
  );
}
