import type { Certification } from "@/lib/types";

export function Certifications({ certifications }: { certifications: Certification[] }) {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="space-y-6 pt-6">
      <div className="border-b border-border/80 pb-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Verified Credentials
          </p>
        </div>
        <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-foreground font-normal">
          Professional Certifications
        </h2>
        <p className="mt-1 text-sm text-muted">
          Formal specializations in AI foundations, deep learning for computer vision, and data analytics.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <div
            key={cert.title}
            className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-surface/80 p-5 sm:p-6 backdrop-blur-md glow-border transition-all hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                  {cert.badge || cert.issuer}
                </span>
                <span className="font-mono text-xs text-muted">
                  {cert.year}
                </span>
              </div>

              <h3 className="mt-3.5 font-serif text-lg sm:text-xl font-medium text-foreground group-hover:text-accent transition-colors leading-snug">
                {cert.title}
              </h3>

              <p className="mt-1 text-xs font-mono text-accent-secondary">
                Issued by {cert.issuer}
              </p>

              {cert.description && (
                <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed">
                  {cert.description}
                </p>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted">
              <span className="flex items-center gap-1.5 text-accent/80 font-mono text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Verified
              </span>
              <span className="font-mono text-[11px] text-muted/80">{cert.issuer}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
