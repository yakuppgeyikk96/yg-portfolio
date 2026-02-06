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
      name: "category",
      title: "Kategori",
      description: "Teknolojinin ait olduğu kategori",
      type: "string",
      options: {
        list: [
          { title: "Programming Languages", value: "languages" },
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "Database", value: "database" },
          { title: "DevOps", value: "devops" },
          { title: "Mobile", value: "mobile" },
          { title: "Tools", value: "tools" },
        ],
        layout: "dropdown",
      },
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
      category: "category",
      order: "order",
    },
    prepare({ title, category, order }) {
      const categoryLabels: Record<string, string> = {
        languages: "Programming Languages",
        frontend: "Frontend",
        backend: "Backend",
        database: "Database",
        devops: "DevOps",
        mobile: "Mobile",
        tools: "Tools",
      };
      return {
        title: title || "Adsız",
        subtitle: `${categoryLabels[category] ?? "Kategorisiz"} | Sıra: ${order ?? 0}`,
      };
    },
  },
});
