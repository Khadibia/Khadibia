import { getEducation, getSkills } from "@/lib/content";

export function Skills() {
  const skills = getSkills();
  const education = getEducation();

  if (skills.length === 0 && education.length === 0) return null;

  return (
    <section id="skills" className="grid gap-4 lg:grid-cols-2">
      {skills.length > 0 && (
        <div className="rounded-xl border border-border bg-background/50 p-4 sm:p-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Skills</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border px-3 py-1 text-sm text-foreground transition-colors hover:border-accent/40 hover:text-accent"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="rounded-xl border border-border bg-background/50 p-4 sm:p-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Education</p>
          <div className="mt-3 space-y-3">
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
      )}
    </section>
  );
}