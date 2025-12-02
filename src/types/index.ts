export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  mainImage?: any;
  link?: string;
  tags?: string[];
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  overview?: string;
  body?: any;
}

export interface Experience {
  _id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  companyLogo?: any;
  technologies?: string[];
}

