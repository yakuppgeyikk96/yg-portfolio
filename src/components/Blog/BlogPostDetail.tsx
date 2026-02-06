"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import type { BlogPost } from "@/types/blog";
import type { Locale } from "@/types/locale";
import { PortableTextRenderer } from "./PortableTextRenderer";

const uiStrings: Record<string, Record<Locale, string>> = {
  backToBlog: {
    en: "Back to Blog",
    tr: "Blog'a Dön",
  },
  minRead: {
    en: "min read",
    tr: "dk okuma",
  },
};

type BlogPostDetailProps = {
  post: BlogPost;
  locale: Locale;
};

export function BlogPostDetail({ post, locale }: BlogPostDetailProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    locale === "tr" ? "tr-TR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <article>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          href={`/${locale}/blog`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          {uiStrings.backToBlog[locale]}
        </Link>
      </motion.div>

      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-10"
      >
        {post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-gradient-primary mb-4 text-3xl font-bold md:text-5xl">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar size={16} />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={16} />
            {post.readingTime} {uiStrings.minRead[locale]}
          </span>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="relative mb-10 aspect-video overflow-hidden rounded-2xl border border-border/50"
      >
        <Image
          src={urlFor(post.featuredImage).width(1200).height(675).url()}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="mx-auto max-w-3xl"
      >
        <PortableTextRenderer content={post.body} />
      </motion.div>

      {post.tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-3xl border-t border-border/50 pt-8"
        >
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </article>
  );
}
