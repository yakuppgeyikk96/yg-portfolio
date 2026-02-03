import { defineField, defineType } from "sanity";

const localeString = {
  name: "localeString",
  type: "object",
  fields: [
    { name: "en", type: "string", title: "English" },
    { name: "tr", type: "string", title: "Türkçe" },
  ],
};

export const homePageType = defineType({
  name: "homePage",
  title: "Anasayfa",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "İsim",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "tr", type: "string", title: "Türkçe" },
      ],
    }),
    defineField({
      name: "tagline",
      title: "Kısa açıklama (tagline)",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "tr", type: "string", title: "Türkçe" },
      ],
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Birincil buton metni",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "tr", type: "string", title: "Türkçe" },
      ],
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Birincil buton link",
      type: "string",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "İkincil buton metni",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "tr", type: "string", title: "Türkçe" },
      ],
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "İkincil buton link",
      type: "string",
    }),
    defineField({
      name: "aboutTitle",
      title: "Hakkımda Başlık",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "tr", type: "string", title: "Türkçe" },
      ],
    }),
    defineField({
      name: "aboutDescription",
      title: "Hakkımda Açıklama",
      type: "object",
      fields: [
        { name: "en", type: "text", title: "English" },
        { name: "tr", type: "text", title: "Türkçe" },
      ],
    }),
  ],
});
