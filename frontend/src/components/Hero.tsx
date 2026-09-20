"use client";

import { useState } from "react";
import type { Profile } from "@/lib/types";

export function Hero({ profile }: { profile: Profile }) {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText("Kadibiaenu@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function scrollToChat() {
    const chatEl = document.getElementById("chat");
    if (chatEl) {
      chatEl.scrollIntoView({ behavior: "smooth" });
      const input = chatEl.querySelector("input");
      if (input) setTimeout(() => input.focus(), 500);
    }
  }

  return (
    <section className="relative overflow-hidden border-b border-border/70 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[650px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-0 -z-10 h-72 w-72 rounded-full bg-accent-secondary/5 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Main Hero Copy (Col 1-7) */}
          <div className="lg:col-span-7">
            {/* Tag / Agent Guide Chip */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                {profile.agent.name} · Production AI Guide
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground font-normal tracking-tight leading-[1.15]">
              Engineering{" "}
              <span className="inline-block pr-2.5 italic bg-gradient-to-r from-accent via-white to-[#7dd3fc] bg-clip-text text-transparent">
                Production AI
              </span>{" "}
              & Agentic Systems
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted">
              {profile.tagline}{" "}
              <span className="text-foreground/90">
                Specializing in Model Context Protocol (MCP) servers, tool-calling LLM agents,
                production MLOps pipelines, and computer vision deployment.
              </span>
            </p>

            {/* Interactive Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={scrollToChat}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-background shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
                <span>Talk with Khadibia</span>
              </button>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-all hover:border-accent/40 hover:bg-surface-elevated"
              >
                <svg className="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                <span>Explore Bento</span>
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm font-medium text-muted transition-colors hover:text-foreground hover:border-border-highlight"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <svg className="h-4 w-4 text-accent stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-accent">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* High-Tech Telemetry & Agent System Terminal Card (Col 8-12) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border/80 bg-surface/80 p-5 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-muted">anthony@production:~$</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded">
                  Status: Live
                </span>
              </div>

              {/* Engineering Metrics Grid */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border/60 bg-background/60 p-3.5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Bumblebee Agent</p>
                  <p className="mt-1 font-serif text-2xl font-bold text-accent">27 Tools</p>
                  <p className="text-xs text-muted/80">stdio MCP + Voice & SMS</p>
                </div>

                <div className="rounded-xl border border-border/60 bg-background/60 p-3.5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Vision Benchmark</p>
                  <p className="mt-1 font-serif text-2xl font-bold text-foreground">0.94 IoU</p>
                  <p className="text-xs text-muted/80">SAM & DeepLab fine-tuned</p>
                </div>

                <div className="rounded-xl border border-border/60 bg-background/60 p-3.5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted">MLOps Pipeline</p>
                  <p className="mt-1 font-serif text-2xl font-bold text-accent">0.976 ROC</p>
                  <p className="text-xs text-muted/80">XGBoost vs PyTorch</p>
                </div>

                <div className="rounded-xl border border-border/60 bg-background/60 p-3.5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Official MCP Server</p>
                  <p className="mt-1 font-serif text-lg font-bold text-foreground">@cencori/mcp</p>
                  <p className="text-xs text-muted/80">NPM package & stdio adapter</p>
                </div>
              </div>

              {/* Stack badges */}
              <div className="mt-4 pt-3 border-t border-border/60 flex flex-wrap gap-1.5">
                {["Python", "TypeScript", "PyTorch", "FastAPI", "Docker", "GCP", "smolagents"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border/80 bg-surface-elevated px-2 py-0.5 font-mono text-[11px] text-muted hover:text-accent hover:border-accent/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
