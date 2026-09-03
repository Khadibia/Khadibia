import { ChatPanel } from "@/components/ChatPanel";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { PortfolioProjects } from "@/components/PortfolioProjects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 sm:py-8">
        <ChatPanel />
        <PortfolioProjects />
        <Experience />
        <Skills />
      </div>

      <footer className="border-t border-border/60 px-4 py-6 text-center text-xs text-muted sm:px-6">
        Built by Anthony Enujeko · Khadibia agent powered by Hugging Face
      </footer>
    </main>
  );
}
