export const heroQuery = `*[_type == "homePage"][0] {
  "name": name[$locale],
  "tagline": tagline[$locale],
  "primaryCta": {
    "label": primaryCtaLabel[$locale],
    "href": primaryCtaHref
  },
  "secondaryCta": {
    "label": secondaryCtaLabel[$locale],
    "href": secondaryCtaHref
  },
  "aboutTitle": aboutTitle[$locale],
  "aboutDescription": aboutDescription[$locale]
}`;

export const technologiesQuery = `*[_type == "technology"] | order(order asc)[0...8] {
  _id,
  "name": name[$locale],
  icon,
  order
}`;

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(order asc)[0...3] {
  _id,
  "title": title[$locale],
  "slug": slug.current,
  "description": description[$locale],
  image,
  technologies,
  "highlights": highlights[][$locale],
  liveUrl,
  githubUrl,
  order
}`;

export const allProjectsQuery = `*[_type == "project"] | order(order asc) {
  _id,
  "title": title[$locale],
  "slug": slug.current,
  "description": description[$locale],
  image,
  technologies,
  "highlights": highlights[][$locale],
  liveUrl,
  githubUrl,
  order
}`;
