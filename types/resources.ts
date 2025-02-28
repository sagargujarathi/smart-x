export interface AwarenessProgram {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
  link: string;
}

export interface GovernmentScheme {
  id: number;
  title: string;
  description: string;
  deadline: string;
  category: string;
  status: 'active' | 'upcoming' | 'closed';
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
