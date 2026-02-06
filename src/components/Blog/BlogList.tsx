"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X } from "lucide-react";
import type { BlogPostSummary } from "@/types/blog";
import type { Locale } from "@/types/locale";
import { BlogCard } from "./BlogCard";

const uiStrings: Record<string, Record<Locale, string>> = {
  searchPlaceholder: {
    en: "Search posts...",
    tr: "Yazılarda ara...",
  },
  allTags: {
    en: "All",
    tr: "Tümü",
  },
  noResults: {
    en: "No posts found matching your criteria.",
    tr: "Arama kriterlerinize uygun yazı bulunamadı.",
  },
  noPosts: {
    en: "No blog posts yet. Stay tuned!",
    tr: "Henüz blog yazısı yok. Takipte kalın!",
  },
};

type BlogListProps = {
  posts: BlogPostSummary[];
  locale: Locale;
};

export function BlogList({ posts, locale }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = activeTag === null || post.tags.includes(activeTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, activeTag]);

  if (posts.length === 0) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 text-center text-muted"
      >
        {uiStrings.noPosts[locale]}
      </motion.p>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-10 space-y-4"
      >
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={uiStrings.searchPlaceholder[locale]}
            className="w-full rounded-xl border border-border/50 bg-surface/50 py-3 pl-11 pr-10 text-foreground outline-none backdrop-blur-sm transition-colors placeholder:text-muted/50 focus:border-primary/50 focus:shadow-[0_0_10px_rgba(234,88,12,0.1)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted/50 transition-colors hover:text-foreground"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeTag === null
                  ? "bg-primary text-white"
                  : "border border-border/50 bg-surface/50 text-muted hover:border-primary/50 hover:text-primary"
              }`}
            >
              {uiStrings.allTags[locale]}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setActiveTag(activeTag === tag ? null : tag)
                }
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeTag === tag
                    ? "bg-primary text-white"
                    : "border border-border/50 bg-surface/50 text-muted hover:border-primary/50 hover:text-primary"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <BlogCard
                key={post._id}
                post={post}
                index={index}
                locale={locale}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center text-muted"
        >
          {uiStrings.noResults[locale]}
        </motion.p>
      )}
    </div>
  );
}
