import { getSkills } from "@/lib/content";

interface SkillCluster {
  title: string;
  badge: string;
  description: string;
  skills: string[];
}

const SKILL_CLUSTERS: SkillCluster[] = [
  {
    title: "AI Agents & LLM Systems",
    badge: "Specialty",
    description: "Architecting autonomous agents and connecting language models to real-world business tools.",
    skills: [
      "Model Context Protocol (MCP)",
      "Tool Calling Agents",
      "smolagents",
      "RAG Pipelines",
      "Groq & LLaMA",
      "LangChain",
      "Multi-Agent Orchestration",
    ],
  },
  {
    title: "Computer Vision & Geospatial",
    badge: "Deep Learning",
    description: "High-accuracy segmentation and detection on satellite, drone, and aerial imagery.",
    skills: [
      "Segment Anything Model (SAM)",
      "DeepLab Segmentation (0.94 IoU)",
      "PyTorch",
      "QGIS Geospatial Workflow",
      "Object Detection",
      "Image Processing",
    ],
  },
  {
    title: "MLOps & Cloud Infrastructure",
    badge: "Production",
    description: "End-to-end model lifecycle, experiment tracking, champion/challenger setups, and containerization.",
    skills: [
      "FastAPI Inference APIs",
      "Docker Containers",
      "MLflow Tracking",
      "Google Cloud (Cloud Run & Compute)",
      "Model Versioning & Artifacts",
      "XGBoost & Scikit-Learn",
    ],
  },
  {
    title: "Languages & Workflow Automation",
    badge: "Engineering",
    description: "Production coding, typed interfaces, and autonomous business workflows.",
    skills: [
      "Python",
      "TypeScript",
      "n8n Automation",
      "RESTful API Design",
      "Git & CI/CD",
      "SQL",
    ],
  },
];

export function Skills() {
  const rawSkills = getSkills();

  return (
    <section id="skills" className="space-y-6 pt-6">
      <div className="border-b border-border/80 pb-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Core Competencies
          </p>
        </div>
        <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-foreground font-normal">
          Technical Skills & Capabilities
        </h2>
        <p className="mt-1 text-sm text-muted">
          Systems engineering across the modern AI, machine learning, and cloud infrastructure spectrum.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {SKILL_CLUSTERS.map((cluster) => (
          <div
            key={cluster.title}
            className="group rounded-2xl border border-border/80 bg-surface/80 p-5 sm:p-6 backdrop-blur-md glow-border transition-all"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-accent transition-colors">
                {cluster.title}
              </h3>
              <span className="rounded-full border border-border bg-surface-elevated px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                {cluster.badge}
              </span>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
              {cluster.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {cluster.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-border/70 bg-background/70 px-2.5 py-1 font-mono text-xs text-foreground/90 transition-colors group-hover:border-border-highlight/40 hover:!border-accent hover:!text-accent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}