import { getFeaturedProjects, getProjectLinks, getProjects } from "@/lib/content";
import type { Project } from "@/lib/types";

function ProjectCard({ project }: { project: Project }) {
  const links = getProjectLinks(project);

  return (
    <article className="flex h-full min-w-[280px] max-w-[320px] flex-col rounded-xl border border-border bg-background/50 p-4 transition-colors hover:border-accent/30 sm:min-w-[300px]">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="font-serif text-lg text-foreground">{project.title}</h3>
        {project.featured && (
          <span className="shrink-0 rounded-full border border-accent/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
            Featured
          </span>
        )}
      </div>

      <p className="line-clamp-4 text-sm leading-relaxed text-muted">{project.summary}</p>

      {project.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto pt-4">
        {links.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-accent/30 px-3 py-1 text-xs text-accent transition-colors hover:bg-accent/10"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : project.link_type === "narrative" ? (
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted/70">
            Ask Khadibia for details
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function PortfolioProjects() {
  const featured = getFeaturedProjects();
  const allProjects = getProjects();
  const otherProjects = allProjects.filter((project) => !project.featured);

  return (
    <section id="projects" className="space-y-8">
      <div>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">Flagship</p>
        <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      {otherProjects.length > 0 && (
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            More projects
          </p>
          <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {otherProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
