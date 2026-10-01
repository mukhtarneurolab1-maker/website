export type ResearchItem = {
  id: string;
  slug: string;
  title: string;
  card_title: string;
  card_summary: string;
  subtitle: string;
  question: string;
  body: string;
  extra_line: string;
  image_url: string | null;
  image_caption: string;
  accent: string;
  sort_order: number;
  published: boolean;
};

export type Publication = {
  id: string;
  authors: string;
  title: string;
  venue: string;
  year_label: string;
  note: string;
  doi_url: string | null;
  image_url: string | null;
  category: "first" | "collaborative" | "chapter" | string;
  featured: boolean;
  sort_order: number;
  published: boolean;
};

export type Award = {
  id: string;
  year_label: string;
  title: string;
  detail: string;
  category: "fellowship" | "recognition" | string;
  sort_order: number;
  published: boolean;
};

export type Resource = {
  id: string;
  title: string;
  summary: string;
  body: string;
  url: string | null;
  link_label: string;
  citation: string;
  sort_order: number;
  published: boolean;
};

export type GalleryItem = {
  id: string;
  image_url: string;
  alt: string;
  caption: string;
  sort_order: number;
  published: boolean;
};
