export interface BlogItem {
  id: string;
  date: Date;
  title: string;
  href?: string;
}

export interface BlogContent {
  id: string;
  date: Date;
  title: string;
  subtitle?: string;
  href?: string;
  author?: string;
  authorImage?: string;
  backgroundImage?: string;
  content?: string;
}