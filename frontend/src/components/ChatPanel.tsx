"use client";

import { useState } from "react";

import { HintButtons } from "@/components/HintButtons";
import type { ChatMessage } from "@/lib/types";

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    setInput("");
    setLoading(true);

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, session_id: sessionId }),
      });

      const data = await response.json();

      if (!response.ok) {
        const detail = typeof data.detail === "string" ? data.detail : data.error;
        throw new Error(detail ?? "Something went wrong.");
      }

      if (data.session_id) setSessionId(data.session_id);

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reach Khadibia.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="chat" className="flex flex-col rounded-2xl border border-border bg-surface/60">
      <div className="border-b border-border px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl text-foreground">Khadibia</h2>
            <p className="text-xs text-muted">Ask about projects, experience, or skills</p>
          </div>
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
            Online
          </span>
        </div>
      </div>

      <div className="max-h-[min(240px,32vh)] space-y-4 overflow-y-auto px-4 py-4 sm:max-h-[280px] sm:px-5">
        {messages.length === 0 && (
          <div className="rounded-xl border border-dashed border-border/80 bg-background/40 p-4">
            <p className="text-sm text-muted">
              Start with a question — Khadibia pulls answers from Anthony&apos;s portfolio content.
            </p>
            <div className="mt-4">
              <HintButtons onSelect={sendMessage} disabled={loading} />
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[80%] ${
                message.role === "user"
                  ? "bg-accent text-background"
                  : "border border-border bg-background text-foreground"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted">
              Khadibia is thinking…
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

      </div>

      <form
        className="border-t border-border bg-surface/80 px-4 py-4 sm:px-5"
        onSubmit={(event) => {
          event.preventDefault();
          void sendMessage(input);
        }}
      >
        {messages.length > 0 && (
          <div className="mb-3">
            <HintButtons onSelect={sendMessage} disabled={loading} />
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Khadibia anything…"
            disabled={loading}
            className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent/50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-xl bg-accent px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </section>
  );
}
