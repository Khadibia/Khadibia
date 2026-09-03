import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { load } from "js-yaml";

import type { EducationEntry, ExperienceRole, Profile, Project } from "./types";

function contentDir(): string {
  const snapshot = join(process.cwd(), "content-snapshot");
  if (existsSync(snapshot)) return snapshot;
  return join(process.cwd(), "..", "content");
}

function readYaml<T>(filename: string): T {
  const path = join(contentDir(), filename);
  if (!existsSync(path)) return {} as T;
  return (load(readFileSync(path, "utf-8")) as T) ?? ({} as T);
}

function readText(filename: string): string {
  const path = join(contentDir(), filename);
  if (!existsSync(path)) return "";
  return readFileSync(path, "utf-8").trim();
}

export function getProfile(): Profile {
  return readYaml<Profile>("profile.yaml");
}

export function getAbout(): string {
  return readText("about.md");
}

export function getSkills(): string[] {
  const data = readYaml<{ skills: string[] }>("skills.yaml");
  return data.skills ?? [];
}

export function getEducation(): EducationEntry[] {
  const data = readYaml<{ education: EducationEntry[] }>("education.yaml");
  return data.education ?? [];
}

export function getExperience(): ExperienceRole[] {
  const data = readYaml<{ roles: ExperienceRole[] }>("experience.yaml");
  return data.roles ?? [];
}

export function getProjects(): Project[] {
  const projectsDir = join(contentDir(), "projects");
  if (!existsSync(projectsDir)) return [];

  return readdirSync(projectsDir)
    .filter((name) => name.endsWith(".yaml"))
    .map((name) => readYaml<Project>(join("projects", name)))
    .filter((project) => project.slug);
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((project) => project.featured);
}

export function getProjectLinks(project: Project): { label: string; url: string }[] {
  const links: { label: string; url: string }[] = [];

  if (project.demo_url) links.push({ label: "Live demo", url: project.demo_url });
  if (project.product_url) links.push({ label: "Product", url: project.product_url });
  if (project.video_demo) links.push({ label: "Video", url: project.video_demo });
  if (project.github) links.push({ label: "GitHub", url: project.github });
  if (project.demo_space && !project.demo_url) {
    links.push({ label: "HF Space", url: project.demo_space });
  }

  return links;
}
