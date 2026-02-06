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

export type TechnologyCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "mobile"
  | "tools";

export interface TechnologyWithDetails {
  _id: string;
  name: string;
  icon: string;
  order: number;
  category: TechnologyCategory;
}

export interface TechnologyGroup {
  category: TechnologyCategory;
  label: string;
  technologies: TechnologyWithDetails[];
}
