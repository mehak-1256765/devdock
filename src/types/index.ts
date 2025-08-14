export interface ReadmeData {
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  installation: string;
  usage: string;
  contributing: string;
  license: string;
  githubProfile: string;
  demoImageUrl: string;
}

export interface Snippet {
  difficulty: any;
  id: string;
  title: string;
  description: string;
  code: string;
  category: string;
  language: string;
  isFavorite?: boolean;
  isCustom?: boolean;
   createdAt?: string;
   tags?: string[];
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
}

export type Theme = 'light' | 'dark';