export interface HeroCta {
  label: string;
  href: string;
}

export interface HeroContent {
  name: string;
  tagline: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  aboutTitle?: string;
  aboutDescription?: string;
}

export interface HeroSectionProps {
  content: HeroContent;
}
