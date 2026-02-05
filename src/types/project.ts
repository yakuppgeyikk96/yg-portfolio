export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: SanityImage;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  order: number;
}
