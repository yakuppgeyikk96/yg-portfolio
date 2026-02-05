import { defineField, defineType } from "sanity";

export const technologyType = defineType({
  name: "technology",
  title: "Teknoloji",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Teknoloji Adı",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "tr", type: "string", title: "Türkçe" },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "SVG İkon",
      description:
        "Ham SVG kodu. viewBox ve currentColor kullanın. Örnek: <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">...</svg>",
      type: "text",
      validation: (Rule) => Rule.required(),
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
      title: "name.tr",
      subtitle: "order",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Adsız",
        subtitle: `Sıra: ${subtitle ?? 0}`,
      };
    },
  },
});
