import { getProfile, getSkills } from "@/lib/content";

export function Hero() {
  const profile = getProfile();
  const skills = getSkills();

  return (
    <section className="border-b border-border/60 px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            {profile.agent.name} · AI guide
          </p>
          <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
            {profile.name}
            <span className="text-muted"> · </span>
            {profile.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.tagline}
          </p>
          <p className="mt-3 max-w-2xl text-sm text-muted/80">{profile.agent.intro}</p>
          <a
            href="/Anthony_Enujeko_CV.pdf"
            download="Anthony_Enujeko_CV.pdf"
            className="mt-5 inline-flex items-center rounded-full border border-accent/40 px-4 py-2 text-sm text-accent transition-colors hover:bg-accent/10"
          >
            Download CV
          </a>
        </div>

        {skills.length > 0 && (
          <div className="rounded-xl border border-border bg-background/50 p-4 sm:p-5 lg:max-w-md lg:shrink-0">
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
      </div>
    </section>
  );
}
