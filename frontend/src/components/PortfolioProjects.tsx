"use client";

import { useState } from "react";
import { getProjectLinks, type Project } from "@/lib/types";

type FilterCategory = "All" | "Agents & MCP" | "Computer Vision" | "MLOps & Systems";

function triggerAskKhadibia(project: Project) {
  const query = `Tell me about the architecture and technical details of ${project.title}: ${project.summary}`;
  window.dispatchEvent(
    new CustomEvent("khadibia-ask", {
      detail: { query },
    })
  );
}

function ProjectCard({ project, isHeroBento = false }: { project: Project; isHeroBento?: boolean }) {
  const links = getProjectLinks(project);

  return (
    <article
      className={`group relative flex flex-col rounded-2xl border border-border/80 bg-surface/80 p-5 backdrop-blur-md transition-all duration-300 glow-border hover:-translate-y-1 ${
        isHeroBento
          ? "lg:col-span-2 bg-gradient-to-br from-surface to-surface-elevated/90 border-border-highlight/30"
          : "col-span-1"
      }`}
    >
      {/* Top row: Flagship badge / category badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {project.featured && (
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
              Flagship
            </span>
          )}
          {project.metrics && Object.entries(project.metrics).map(([key, val]) => (
            <span
              key={key}
              className="rounded-full border border-border bg-surface-elevated px-2 py-0.5 font-mono text-[10px] text-accent-secondary"
            >
              {key.toUpperCase()}: <span className="font-semibold text-white">{val}</span>
            </span>
          ))}
        </div>

        {/* Ask Khadibia AI quick trigger */}
        <button
          type="button"
          onClick={() => triggerAskKhadibia(project)}
          className="flex items-center gap-1 rounded-lg border border-border/70 bg-surface px-2 py-1 text-[11px] font-mono text-muted hover:border-accent hover:text-accent transition-colors"
          title={`Ask Khadibia about ${project.title}`}
        >
          <span className="text-accent">✦</span>
          <span>Ask AI</span>
        </button>
      </div>

      {/* Project Title */}
      <h3 className={`mt-3 font-serif font-medium text-foreground group-hover:text-accent transition-colors ${
        isHeroBento ? "text-2xl" : "text-xl"
      }`}>
        {project.title}
      </h3>

      {/* Summary */}
      <p className={`mt-2 leading-relaxed text-muted ${isHeroBento ? "text-sm sm:text-base" : "text-sm line-clamp-3"}`}>
        {project.summary}
      </p>

      {/* Tags */}
      {project.tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/70 bg-background/60 px-2 py-0.5 font-mono text-[11px] text-muted/90 group-hover:border-border transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Links Footer */}
      <div className="mt-auto pt-5 flex flex-wrap items-center gap-2">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/5 px-3 py-1 text-xs font-medium text-accent hover:bg-accent hover:text-background transition-all"
          >
            <span>{link.label}</span>
            <svg className="h-3 w-3 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        ))}

        {project.link_type === "narrative" && links.length === 0 && (
          <button
            type="button"
            onClick={() => triggerAskKhadibia(project)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent hover:bg-accent hover:text-background transition-all"
          >
            <span>Ask Khadibia for Deep Dive</span>
            <span className="text-xs">→</span>
          </button>
        )}
      </div>
    </article>
  );
}

export function PortfolioProjects({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: FilterCategory[] = [
    "All",
    "Agents & MCP",
    "Computer Vision",
    "MLOps & Systems",
  ];

  const filteredProjects = projects.filter((project) => {
    // Filter by Category
    if (activeCategory === "Agents & MCP") {
      const match = project.tags?.some((t) =>
        ["MCP", "AI Agents", "Tool Calling", "LLMs", "RAG", "smolagents"].includes(t)
      );
      if (!match) return false;
    } else if (activeCategory === "Computer Vision") {
      const match = project.tags?.some((t) =>
        ["Computer Vision", "SAM", "DeepLab", "QGIS", "GIS"].includes(t)
      );
      if (!match) return false;
    } else if (activeCategory === "MLOps & Systems") {
      const match = project.tags?.some((t) =>
        ["MLOps", "PyTorch", "FastAPI", "Docker", "XGBoost", "MLflow"].includes(t)
      );
      if (!match) return false;
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = project.title.toLowerCase().includes(q);
      const inSummary = project.summary.toLowerCase().includes(q);
      const inTags = project.tags?.some((t) => t.toLowerCase().includes(q));
      if (!inTitle && !inSummary && !inTags) return false;
    }

    return true;
  });

  return (
    <section id="projects" className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              Engineering Showcase
            </p>
          </div>
          <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-foreground font-normal">
            Bento Projects & Deployments
          </h2>
          <p className="mt-1 text-sm text-muted">
            Production agents, MLOps pipelines, computer vision segmentation, and MCP servers.
          </p>
        </div>

        {/* Search input */}
        <div className="w-full sm:w-64">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by tech or keyword…"
            className="w-full rounded-xl border border-border/80 bg-surface px-3.5 py-2 text-xs text-foreground placeholder:text-muted/60 outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              activeCategory === cat
                ? "bg-accent text-background font-semibold shadow-md shadow-accent/20"
                : "border border-border/80 bg-surface text-muted hover:text-foreground hover:border-border-highlight"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project, idx) => {
          const isHero = project.featured && (idx === 0 || idx === 1) && activeCategory === "All";
          return <ProjectCard key={project.slug} project={project} isHeroBento={isHero} />;
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted">
          <p className="text-sm">No projects matched your filter.</p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="mt-3 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs text-accent"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
