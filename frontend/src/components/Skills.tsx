import { getEducation } from "@/lib/content";

export function Skills() {
  const education = getEducation();

  if (education.length === 0) return null;

  return (
    <section id="education" className="space-y-4">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Education</p>
      <div className="rounded-xl border border-border bg-background/50 p-4 sm:p-5">
        <div className="space-y-3">
          {education.map((entry) => (
            <div key={`${entry.institution}-${entry.start}`}>
              <h3 className="text-sm text-foreground">{entry.degree}</h3>
              <p className="text-sm text-muted">{entry.institution}</p>
              <span className="font-mono text-xs text-muted/80">
                {entry.start} — {entry.end}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}