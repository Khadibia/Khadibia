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

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}
