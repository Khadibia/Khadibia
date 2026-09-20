import { Certifications } from "@/components/Certifications";
import { ChatPanel } from "@/components/ChatPanel";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { PortfolioProjects } from "@/components/PortfolioProjects";
import { Skills } from "@/components/Skills";
import { getCertifications, getProfile, getProjects } from "@/lib/content";

export default function Home() {
  const profile = getProfile();
  const projects = getProjects();
  const certifications = getCertifications();

  return (
    <main className="flex-1">
      {/* Hero with telemetry strip & instant CTA */}
      <Hero profile={profile} />

      {/* Main content flow */}
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-10 sm:px-6 sm:py-14">
        {/* Khadibia AI Copilot Command Center */}
        <ChatPanel />

        {/* Bento Grid Projects Showcase */}
        <PortfolioProjects projects={projects} />

        {/* Experience Timeline */}
        <Experience />

        {/* Categorized Skills Matrix */}
        <Skills />

        {/* Verified Certifications from CV */}
        <Certifications certifications={certifications} />

        {/* Academic Background */}
        <Education />
      </div>

      {/* Modern High-Polish Footer */}
      <footer className="mt-20 border-t border-border/80 bg-surface/80 py-12 px-4 sm:px-6 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="font-serif text-base font-medium text-foreground">{profile.name}</span>
              <span className="text-muted">·</span>
              <span className="text-xs font-mono text-muted">{profile.title}</span>
            </div>
            <p className="text-xs text-muted/80 mt-1">
              Engineered with Next.js, TailwindCSS & Khadibia Copilot (smolagents)
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-muted">
            <a href="#chat" className="hover:text-accent transition-colors">
              Copilot
            </a>
            <a href="#projects" className="hover:text-accent transition-colors">
              Projects
            </a>
            <a href="#experience" className="hover:text-accent transition-colors">
              Experience
            </a>
            <a href="#skills" className="hover:text-accent transition-colors">
              Skills
            </a>
            <a href="#certifications" className="hover:text-accent transition-colors">
              Certifications
            </a>
            <a
              href="/Anthony_Enujeko_CV.pdf"
              download="Anthony_Enujeko_CV.pdf"
              className="text-accent hover:underline underline-offset-4 font-medium"
            >
              Download CV
            </a>
            <a
              href="https://github.com/Khadibia"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://huggingface.co/Khadibia"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Hugging Face
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
