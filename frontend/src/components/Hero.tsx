import { getProfile } from "@/lib/content";

export function Hero() {
  const profile = getProfile();

  return (
    <section className="border-b border-border/60 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl">
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
    </section>
  );
}
