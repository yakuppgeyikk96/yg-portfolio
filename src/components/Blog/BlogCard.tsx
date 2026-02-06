"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Calendar, Clock } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import type { BlogPostSummary } from "@/types/blog";

type BlogCardProps = {
  post: BlogPostSummary;
  index: number;
  locale: string;
};

export function BlogCard({ post, index, locale }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    locale === "tr" ? "tr-TR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-surface/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-[0_0_20px_rgba(234,88,12,0.1)]"
    >
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="flex h-full flex-col"
      >
        <div className="relative aspect-video shrink-0 overflow-hidden">
          <Image
            src={urlFor(post.featuredImage).width(600).height(338).url()}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          {post.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {post.title}
          </h3>

          <p className="mb-4 line-clamp-2 flex-grow text-sm leading-relaxed text-muted">
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center gap-4 border-t border-border/50 pt-4 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readingTime} {locale === "tr" ? "dk" : "min"}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
