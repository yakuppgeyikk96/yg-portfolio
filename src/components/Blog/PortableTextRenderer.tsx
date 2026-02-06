"use client";

import type {
  ArbitraryTypedObject,
  PortableTextBlock,
} from "@portabletext/types";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mb-4 mt-12 text-3xl font-bold text-foreground md:text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 text-2xl font-bold text-foreground md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 text-xl font-bold text-foreground md:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-3 mt-6 text-lg font-semibold text-foreground">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed text-muted">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary/50 pl-6 italic text-muted">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 ml-6 list-disc space-y-2 text-muted">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 ml-6 list-decimal space-y-2 text-muted">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded-md bg-surface px-2 py-0.5 font-mono text-sm text-primary">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={
          value?.href?.startsWith("http") ? "noopener noreferrer" : undefined
        }
        className="text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/50">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

type PortableTextRendererProps = {
  content: (PortableTextBlock | ArbitraryTypedObject)[];
};

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  return (
    <div>
      <PortableText value={content} components={portableTextComponents} />
    </div>
  );
}
