import { notFound } from "next/navigation";
import { BlogPostDetail } from "@/components/Blog";
import { getBlogPostBySlug } from "@/lib/sanity/blog";
import type { Locale } from "@/types/locale";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const safeLocale: Locale =
    locale === "tr" || locale === "en" ? locale : "en";

  const post = await getBlogPostBySlug(slug, safeLocale);

  if (!post) {
    notFound();
  }

  return (
    <main className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <BlogPostDetail post={post} locale={safeLocale} />
      </div>
    </main>
  );
}
