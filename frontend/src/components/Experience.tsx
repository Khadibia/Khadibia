import { getExperience } from "@/lib/content";
import type { ExperienceRole } from "@/lib/types";

function formatDate(start: string, end: string): string {
  return `${start} — ${end}`;
}

function RoleCard({ role }: { role: ExperienceRole }) {
  return (
    <article className="rounded-xl border border-border bg-background/50 p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="font-serif text-lg text-foreground">{role.title}</h3>
          <p className="text-sm text-accent">{role.company}</p>
        </div>
        <span className="font-mono text-xs text-muted">
          {formatDate(role.start, role.end)}
        </span>
      </div>

      <ul className="mt-3 space-y-2">
        {role.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {bullet}
          </li>
        ))}
      </ul>

      {role.tags && role.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {role.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export function Experience() {
  const roles = getExperience();

  if (roles.length === 0) return null;

  return (
    <section id="experience" className="space-y-4">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Experience</p>
      <div className="grid gap-4 lg:grid-cols-2">
        {roles.map((role) => (
          <RoleCard key={`${role.company}-${role.start}`} role={role} />
        ))}
      </div>
    </section>
  );
}