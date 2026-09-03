"use client";

const HINTS = [
  "Tell me about ChurnPred",
  "What did you build at FieldWatch?",
  "Explain Bumblebee and MCP",
  "What are your core skills?",
  "Walk me through your experience",
];

interface HintButtonsProps {
  onSelect: (hint: string) => void;
  disabled?: boolean;
}

export function HintButtons({ onSelect, disabled }: HintButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {HINTS.map((hint) => (
        <button
          key={hint}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(hint)}
          className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {hint}
        </button>
      ))}
    </div>
  );
}
