"use client";

import { useState } from "react";
import Link from "next/link";
import type { Profile } from "@/lib/types";

export function Nav({ profile }: { profile: Profile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-border group-hover:border-accent/60 transition-colors">
              <span className="font-mono text-sm font-bold text-accent">AE</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base font-medium tracking-tight text-foreground group-hover:text-accent transition-colors">
                {profile.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                {profile.title}
              </span>
            </div>
          </Link>

        </div>

        {/* Desktop Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a
            href="#chat"
            className="flex items-center gap-1.5 text-muted hover:text-accent transition-colors group"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60 group-hover:bg-accent transition-colors" />
            <span>Khadibia Copilot</span>
          </a>
          <a
            href="#projects"
            className="text-muted hover:text-foreground transition-colors"
          >
            Projects
          </a>
          <a
            href="#experience"
            className="text-muted hover:text-foreground transition-colors"
          >
            Experience
          </a>
          <a
            href="#skills"
            className="text-muted hover:text-foreground transition-colors"
          >
            Skills
          </a>
          <a
            href="#certifications"
            className="text-muted hover:text-foreground transition-colors"
          >
            Certifications
          </a>
          <a
            href="#education"
            className="text-muted hover:text-foreground transition-colors"
          >
            Education
          </a>
        </nav>

        {/* Action icons & CV button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="https://github.com/Khadibia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-foreground hover:border-accent/40 transition-colors"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </Link>
          <Link
            href="https://huggingface.co/Khadibia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hugging Face Profile"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-foreground hover:border-accent/40 transition-colors"
            title="Hugging Face"
          >
            <span className="text-base leading-none">🤗</span>
          </Link>
          <a
            href="/Anthony_Enujeko_CV.pdf"
            download="Anthony_Enujeko_CV.pdf"
            className="flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-xs font-medium text-accent hover:bg-accent hover:text-background transition-all"
          >
            <svg className="h-3.5 w-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-foreground"
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface/95 backdrop-blur-xl px-4 py-4 space-y-3">
          <a
            href="#chat"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm text-accent font-medium"
          >
            Ask Khadibia Copilot
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm text-foreground hover:text-accent"
          >
            Projects
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm text-foreground hover:text-accent"
          >
            Experience
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm text-foreground hover:text-accent"
          >
            Skills Matrix
          </a>
          <a
            href="#certifications"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm text-foreground hover:text-accent"
          >
            Certifications
          </a>
          <div className="pt-2 border-t border-border/60 flex items-center gap-3">
            <a
              href="/Anthony_Enujeko_CV.pdf"
              download="Anthony_Enujeko_CV.pdf"
              className="flex-1 text-center rounded-lg border border-accent/40 bg-accent/10 py-2 text-xs font-medium text-accent"
            >
              Download CV
            </a>
            <Link
              href="https://github.com/Khadibia"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border text-muted hover:text-foreground"
            >
              GitHub
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
