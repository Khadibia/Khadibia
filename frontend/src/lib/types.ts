export type LinkType = "live_demo" | "external_demo" | "narrative" | "github";

export interface Profile {
  name: string;
  title: string;
  location: string;
  tagline: string;
  agent: {
    name: string;
    built_by: string;
    intro: string;
  };
}

export interface Project {
  slug: string;
  title: string;
  tags: string[];
  summary: string;
  featured?: boolean;
  link_type?: LinkType;
  github?: string;
  demo_url?: string;
  demo_space?: string;
  product_url?: string;
  docs_url?: string;
  npm?: string;
  video_demo?: string;
  metrics?: Record<string, number | string>;
}

export interface ExperienceRole {
  company: string;
  title: string;
  start: string;
  end: string;
  bullets: string[];
  tags?: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  start: string;
  end: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  badge?: string;
  description?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export function getProjectLinks(project: Project): { label: string; url: string }[] {
  const links: { label: string; url: string }[] = [];

  if (project.demo_url) links.push({ label: "Live Demo", url: project.demo_url });
  if (project.product_url) links.push({ label: "Product", url: project.product_url });
  if (project.docs_url) links.push({ label: "Docs", url: project.docs_url });
  if (project.npm) links.push({ label: "npm", url: `https://www.npmjs.com/package/${project.npm}` });
  if (project.video_demo) links.push({ label: "Video", url: project.video_demo });
  if (project.github) links.push({ label: "GitHub", url: project.github });
  if (project.demo_space && !project.demo_url) {
    links.push({ label: "HF Space", url: project.demo_space });
  }

  return links;
}
