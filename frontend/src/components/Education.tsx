import { getEducation } from "@/lib/content";

export function Education() {
  const education = getEducation();

  if (education.length === 0) return null;

  return (
    <section id="education" className="space-y-6 pt-6">
      <div className="border-b border-border/80 pb-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Academic Background
          </p>
        </div>
        <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-foreground font-normal">
          Education & Degrees
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {education.map((entry) => (
          <div
            key={`${entry.institution}-${entry.start}`}
            className="rounded-2xl border border-border/80 bg-surface/80 p-5 backdrop-blur-md glow-border"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-serif text-lg font-medium text-foreground">{entry.degree}</h3>
                <p className="text-sm text-accent mt-0.5">{entry.institution}</p>
              </div>
              <span className="rounded-full border border-border bg-surface-elevated px-2.5 py-0.5 font-mono text-xs text-muted">
                {entry.start} — {entry.end}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
