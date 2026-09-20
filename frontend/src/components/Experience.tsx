import { getExperience } from "@/lib/content";
import type { ExperienceRole } from "@/lib/types";

function formatDate(start: string, end: string): string {
  if (end.toLowerCase() === "present") {
    return `${start} — Present`;
  }
  return `${start} — ${end}`;
}

function RoleTimelineItem({ role, isLast }: { role: ExperienceRole; isLast: boolean }) {
  const isPresent = role.end.toLowerCase() === "present";

  return (
    <div className="relative pl-6 sm:pl-8 group">
      {/* Vertical Spine Line */}
      {!isLast && (
        <div className="absolute left-[9px] sm:left-[11px] top-6 bottom-0 w-[2px] bg-border group-hover:bg-accent/40 transition-colors" />
      )}

      {/* Node Marker */}
      <div className={`absolute left-0 top-1.5 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full border bg-background transition-all ${
        isPresent
          ? "border-accent shadow-[0_0_12px_rgba(200,255,62,0.4)]"
          : "border-border group-hover:border-accent/60"
      }`}>
        <div className={`h-2 w-2 rounded-full ${isPresent ? "bg-accent animate-pulse" : "bg-muted group-hover:bg-accent"}`} />
      </div>

      {/* Role Content Card */}
      <article className="rounded-2xl border border-border/80 bg-surface/80 p-5 sm:p-6 backdrop-blur-md glow-border mb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/60 pb-3">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-foreground font-medium group-hover:text-accent transition-colors">
              {role.title}
            </h3>
            <p className="text-sm font-medium text-accent mt-0.5">{role.company}</p>
          </div>
          <span className="inline-flex items-center self-start sm:self-auto rounded-full border border-border bg-surface-elevated px-3 py-1 font-mono text-xs text-muted">
            {formatDate(role.start, role.end)}
          </span>
        </div>

        {/* Bullets */}
        <ul className="mt-4 space-y-2.5">
          {role.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Role Tags */}
        {role.tags && role.tags.length > 0 && (
          <div className="mt-5 pt-3 border-t border-border/60 flex flex-wrap gap-1.5">
            {role.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border/80 bg-background/60 px-2 py-0.5 font-mono text-[11px] text-muted hover:text-accent hover:border-accent/40 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}

export function Experience() {
  const roles = getExperience();

  if (roles.length === 0) return null;

  return (
    <section id="experience" className="space-y-6 pt-6">
      <div className="border-b border-border/80 pb-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Track Record
          </p>
        </div>
        <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-foreground font-normal">
          Engineering Experience & Impact
        </h2>
        <p className="mt-1 text-sm text-muted">
          Hands-on machine learning, agentic orchestration, and backend infrastructure in production.
        </p>
      </div>

      <div className="mt-8 relative">
        {roles.map((role, idx) => (
          <RoleTimelineItem
            key={`${role.company}-${role.start}`}
            role={role}
            isLast={idx === roles.length - 1}
          />
        ))}
      </div>
    </section>
  );
}