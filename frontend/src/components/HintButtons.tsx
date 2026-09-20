"use client";

const HINTS = [
  { label: "Cencori MCP Server", query: "Explain @cencori/mcp and how the Model Context Protocol was implemented" },
  { label: "ChurnPred MLOps", query: "Tell me about ChurnPred: champion/challenger, ROC-AUC, and MLflow tracking" },
  { label: "FieldWatch Vision", query: "What computer vision models did Anthony build at FieldWatch (SAM, DeepLab)?" },
  { label: "Bumblebee Agent", query: "Explain Bumblebee: the 27-tool MCP agent, voice, and SMS automation" },
  { label: "Production Stack", query: "What is Anthony's core technical stack and experience with production AI?" },
];

interface HintButtonsProps {
  onSelect: (hint: string) => void;
  disabled?: boolean;
}

export function HintButtons({ onSelect, disabled }: HintButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {HINTS.map((item) => (
        <button
          key={item.label}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(item.query)}
          className="group flex items-center gap-1.5 rounded-full border border-border/80 bg-surface px-3 py-1.5 text-xs text-muted transition-all hover:border-accent/40 hover:bg-surface-elevated hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="text-[10px] text-accent/60 group-hover:text-accent">✦</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
