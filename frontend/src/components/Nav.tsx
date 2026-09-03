import Link from "next/link";

import { getProfile } from "@/lib/content";

export function Nav() {
  const profile = getProfile();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Portfolio
          </span>
          <span className="hidden text-muted sm:inline">/</span>
          <span className="hidden font-serif text-sm text-foreground sm:inline">
            {profile.name}
          </span>
        </div>

        <nav className="flex items-center gap-4 text-sm">
          <a href="#chat" className="text-muted transition-colors hover:text-accent">
            {profile.agent.name}
          </a>
          <a href="#projects" className="text-muted transition-colors hover:text-accent">
            Projects
          </a>
          <a href="#experience" className="text-muted transition-colors hover:text-accent">
            Experience
          </a>
          <a
            href="/Anthony_Enujeko_CV.pdf"
            download="Anthony_Enujeko_CV.pdf"
            className="text-muted transition-colors hover:text-accent"
          >
            CV
          </a>
          <Link
            href="https://github.com/Khadibia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
          >
            GitHub
          </Link>
        </nav>
      </div>
    </header>
  );
}
