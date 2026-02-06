import { defineField, defineType } from "sanity";

export const blogPostType = defineType({
  name: "blogPost",
  title: "Blog Yazısı",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
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
      name: "excerpt",
      title: "Özet",
      type: "object",
      fields: [
        { name: "en", type: "text", title: "English", rows: 3 },
        { name: "tr", type: "text", title: "Türkçe", rows: 3 },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "İçerik",
      type: "object",
      fields: [
        {
          name: "en",
          type: "array",
          title: "English",
          of: [
            { type: "block" },
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                { name: "alt", type: "string", title: "Alt Text" },
                { name: "caption", type: "string", title: "Caption" },
              ],
            },
          ],
        },
        {
          name: "tr",
          type: "array",
          title: "Türkçe",
          of: [
            { type: "block" },
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                { name: "alt", type: "string", title: "Alt Text" },
                { name: "caption", type: "string", title: "Caption" },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "featuredImage",
      title: "Kapak Görseli",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Yayın Tarihi",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Etiketler",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featured",
      title: "Öne Çıkan",
      description: "Öne çıkan yazı olarak işaretle",
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
      title: "Yayın Tarihi",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Sıralama",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title.tr",
      subtitle: "publishedAt",
      media: "featuredImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Adsız",
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString("tr-TR")
          : "Tarih yok",
        media,
      };
    },
  },
});
