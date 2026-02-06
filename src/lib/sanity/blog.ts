import type {
  ArbitraryTypedObject,
  PortableTextBlock,
} from "@portabletext/types";
import type { BlogPost, BlogPostSummary } from "@/types/blog";
import type { Locale } from "@/types/locale";
import type { SanityImage } from "@/types/project";
import { sanityClient } from "./client";
import { allBlogPostsQuery, blogPostBySlugQuery } from "./queries";

type PortableTextContent = (PortableTextBlock | ArbitraryTypedObject)[];

type SanityBlogPost = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  body?: PortableTextContent | null;
  featuredImage?: SanityImage | null;
  publishedAt?: string | null;
  tags?: string[] | null;
  featured?: boolean | null;
};

function estimateReadingTime(blocks: PortableTextContent): number {
  const text =
    blocks
      ?.filter((b) => b._type === "block")
      .map((b) =>
        "children" in b
          ? (b.children as { text?: string }[])
              .map((c) => c.text ?? "")
              .join("")
          : ""
      )
      .join(" ") ?? "";
  return Math.max(
    1,
    Math.round(text.split(/\s+/).filter(Boolean).length / 200)
  );
}

export async function getAllBlogPosts(
  locale: Locale
): Promise<BlogPostSummary[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const safeLocale = locale === "tr" || locale === "en" ? locale : "en";

  if (!projectId) {
    return [];
  }

  try {
    const data = await sanityClient.fetch<SanityBlogPost[] | null>(
      allBlogPostsQuery,
      { locale: safeLocale }
    );

    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data
      .filter(
        (item): item is SanityBlogPost & {
          title: string;
          slug: string;
          excerpt: string;
          featuredImage: SanityImage;
          publishedAt: string;
        } =>
          Boolean(
            item.title &&
              item.slug &&
              item.excerpt &&
              item.featuredImage &&
              item.publishedAt
          )
      )
      .map((item) => ({
        _id: item._id,
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        featuredImage: item.featuredImage,
        publishedAt: item.publishedAt,
        tags: item.tags ?? [],
        readingTime: item.body ? estimateReadingTime(item.body) : 1,
      }));
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(
  slug: string,
  locale: Locale
): Promise<BlogPost | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const safeLocale = locale === "tr" || locale === "en" ? locale : "en";

  if (!projectId) {
    return null;
  }

  try {
    const data = await sanityClient.fetch<SanityBlogPost | null>(
      blogPostBySlugQuery,
      { slug, locale: safeLocale }
    );

    if (!data?.title || !data?.slug || !data?.body) {
      return null;
    }

    return {
      _id: data._id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt ?? "",
      body: data.body,
      featuredImage: data.featuredImage!,
      publishedAt: data.publishedAt ?? new Date().toISOString(),
      tags: data.tags ?? [],
      readingTime: estimateReadingTime(data.body),
    };
  } catch {
    return null;
  }
}
