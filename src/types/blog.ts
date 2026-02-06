import type { ArbitraryTypedObject, PortableTextBlock } from "@portabletext/types";
import type { SanityImage } from "./project";

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: (PortableTextBlock | ArbitraryTypedObject)[];
  featuredImage: SanityImage;
  publishedAt: string;
  tags: string[];
  readingTime: number;
}

export type BlogPostSummary = Omit<BlogPost, "body">;
