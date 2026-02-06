import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Proje",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Proje Adı",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "tr", type: "string", title: "Türkçe" },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "object",
      fields: [
        { name: "en", type: "text", title: "English", rows: 3 },
        { name: "tr", type: "text", title: "Türkçe", rows: 3 },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Proje Görseli",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "technologies",
      title: "Teknolojiler",
      description: "Projede kullanılan teknolojiler (etiketler)",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "liveUrl",
      title: "Canlı URL",
      description: "Projenin yayında olduğu adres",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      description: "Projenin GitHub deposu",
      type: "url",
    }),
    defineField({
      name: "highlights",
      title: "Öne Çıkan Özellikler",
      description:
        'Projenin 3-4 key feature\'ı. Örn: "Real-time data synchronization with WebSocket" / "WebSocket ile gerçek zamanlı veri senkronizasyonu"',
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "en",
              type: "string",
              title: "English",
              placeholder: "e.g. Server-side rendering with Next.js App Router",
            },
            {
              name: "tr",
              type: "string",
              title: "Türkçe",
              placeholder: "örn. Next.js App Router ile sunucu taraflı render",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Öne Çıkan",
      description: "Anasayfada gösterilsin mi?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sıralama",
      description: "Küçük sayılar önce gösterilir",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: "Sıralama",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title.tr",
      subtitle: "featured",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Adsız",
        subtitle: subtitle ? "⭐ Öne Çıkan" : "Normal",
        media,
      };
    },
  },
});
