export interface Technology {
  _id: string;
  name: string;
  icon: string;
  order: number;
}

export interface TechStackProps {
  technologies: Technology[];
  locale: string;
}

export interface TechCardProps {
  name: string;
  icon: string;
  index: number;
}

export interface SectionHeaderProps {
  title: string;
  linkText: string;
  linkHref: string;
}
