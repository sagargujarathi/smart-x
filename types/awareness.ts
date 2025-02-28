export interface AwarenessProgram {
  id: number;
  title: string;
  description: string;
  image: string;
  category: "water" | "electricity" | "general";
  readTime: string;
  link: string;
}

export interface Scheme {
  id: number;
  title: string;
  description: string;
  deadline: string;
  category: "water" | "electricity" | "general";
  status: "active" | "inactive";
}

export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
}
