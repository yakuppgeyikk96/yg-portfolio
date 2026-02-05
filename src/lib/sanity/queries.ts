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
