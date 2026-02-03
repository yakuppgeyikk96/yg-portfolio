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
