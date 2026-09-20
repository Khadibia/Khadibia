"use client";

import { useState, useRef, useEffect } from "react";
import { HintButtons } from "@/components/HintButtons";
import type { ChatMessage } from "@/lib/types";

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// Lightweight, safe markdown-like message renderer
function FormattedMessage({ content }: { content: string }) {
  // Split by code blocks first
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(renderTextWithFormatting(content.slice(lastIndex, match.index), lastIndex));
    }
    const language = match[1] || "text";
    const code = match[2];
    const key = `code-${match.index}`;
    parts.push(
      <div key={key} className="my-2 overflow-hidden rounded-lg border border-border bg-[#0a0c10]">
        <div className="flex items-center justify-between border-b border-border/60 bg-surface px-3 py-1 text-[11px] font-mono text-muted">
          <span>{language}</span>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(code)}
            className="hover:text-accent transition-colors"
          >
            Copy
          </button>
        </div>
        <pre className="p-3 text-xs font-mono text-[#dcdfe4] overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push(renderTextWithFormatting(content.slice(lastIndex), lastIndex));
  }

  return <div className="space-y-1.5">{parts}</div>;
}

function renderTextWithFormatting(text: string, baseKey: number) {
  const lines = text.split("\n");
  return (
    <div key={baseKey} className="space-y-1">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1.5" />;

        // Bullet point
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{parseInlineStyles(trimmed.slice(2))}</span>
            </div>
          );
        }

        // Numbered item
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="font-mono text-xs text-accent font-semibold">{numMatch[1]}.</span>
              <span>{parseInlineStyles(numMatch[2])}</span>
            </div>
          );
        }

        return <p key={idx}>{parseInlineStyles(line)}</p>;
      })}
    </div>
  );
}

function parseInlineStyles(text: string): React.ReactNode[] {
  // Regex for bold **bold** and inline `code` and [link](url)
  const tokens = text.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);
  return tokens.map((token, i) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-surface-elevated border border-border/70 px-1.5 py-0.5 font-mono text-xs text-accent"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = token.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return token;
  });
}

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll ONLY within the internal chat container so the page viewport does not jump
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    setInput("");
    setLoading(true);

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: trimmed,
      timestamp: time,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // First try relative /chat endpoint (standard in production or reverse proxy)
      let response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, session_id: sessionId }),
      });

      // If Next.js dev server on port 3000 returned 404 HTML, automatically fallback to local FastAPI backend on port 8080
      const contentType = response.headers.get("content-type") || "";
      if (response.status === 404 || !contentType.includes("application/json")) {
        try {
          const fallback = await fetch("http://localhost:8080/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: trimmed, session_id: sessionId }),
          });
          response = fallback;
        } catch {
          // If port 8080 is not reachable, continue with response inspection
        }
      }

      const finalContentType = response.headers.get("content-type") || "";
      if (!finalContentType.includes("application/json")) {
        const textBody = await response.text();
        if (response.status === 404 || textBody.includes("<!DOCTYPE")) {
          throw new Error(
            "Backend chat endpoint (/chat) returned 404 HTML. Make sure the FastAPI agent is running on port 8080."
          );
        }
        throw new Error(`Server returned ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!response.ok) {
        let detail = typeof data.detail === "string" ? data.detail : data.error;
        if (Array.isArray(data.detail)) {
          detail = data.detail.map((d: any) => d.msg || JSON.stringify(d)).join(", ");
        }
        if (detail && detail.includes("invalid_api_key")) {
          detail = "Groq API key error: Invalid API key in .env. Please update GROQ_API_KEY with a valid key.";
        }
        throw new Error(detail ?? "Something went wrong.");
      }

      if (data.session_id) setSessionId(data.session_id);

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content: data.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reach Khadibia.");
    } finally {
      setLoading(false);
    }
  }

  // Listen to custom "khadibia-ask" events dispatched from anywhere on the page (e.g. project cards)
  useEffect(() => {
    const handleAsk = (event: Event) => {
      const customEvent = event as CustomEvent<{ query: string }>;
      if (customEvent.detail?.query) {
        const chatEl = document.getElementById("chat");
        if (chatEl) {
          chatEl.scrollIntoView({ behavior: "smooth" });
        }
        void sendMessage(customEvent.detail.query);
      }
    };

    window.addEventListener("khadibia-ask", handleAsk);
    return () => window.removeEventListener("khadibia-ask", handleAsk);
  }, [sessionId, loading]);

  function resetChat() {
    setMessages([]);
    setSessionId(null);
    setError(null);
  }

  return (
    <section
      id="chat"
      className="relative flex flex-col rounded-2xl border border-border/80 bg-surface/90 shadow-2xl backdrop-blur-xl overflow-hidden transition-all glow-border"
    >
      {/* Copilot Header */}
      <div className="flex items-center justify-between border-b border-border/80 bg-surface-elevated/70 px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 border border-accent/30">
            <span className="font-mono text-sm font-bold text-accent">K</span>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-surface animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg font-medium text-foreground">Khadibia Copilot</h2>
              <span className="rounded border border-accent/30 bg-accent/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent">
                smolagents + Groq
              </span>
            </div>
            <p className="text-xs text-muted">Ask anything about Anthony&apos;s architectures, code, or background</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={resetChat}
              className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs text-muted hover:text-foreground hover:border-border-highlight transition-colors"
            >
              Reset
            </button>
          )}
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-mono text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Online
          </span>
        </div>
      </div>

      {/* Messages Stream */}
      <div
        ref={chatContainerRef}
        className="min-h-[280px] max-h-[460px] space-y-4 overflow-y-auto p-4 sm:p-6"
      >
        {messages.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-background/40 p-5 sm:p-6">
            <div className="flex items-center gap-2.5 text-foreground font-medium text-sm">
              <span className="text-accent text-base">✦</span>
              <span>Ask Khadibia directly or pick a suggested query:</span>
            </div>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              Khadibia has real-time context on Anthony&apos;s engineering projects (MCP servers, ChurnPred MLOps, FieldWatch CV, and Bumblebee).
            </p>
            <div className="mt-4">
              <HintButtons onSelect={sendMessage} disabled={loading} />
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[92%] sm:max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-accent text-background font-medium shadow-md shadow-accent/15"
                  : "border border-border/80 bg-surface-elevated text-foreground shadow-sm"
              }`}
            >
              {message.role === "user" ? (
                <p>{message.content}</p>
              ) : (
                <FormattedMessage content={message.content} />
              )}
            </div>
            {message.timestamp && (
              <span className="mt-1 text-[10px] font-mono text-muted/60 px-1">
                {message.timestamp}
              </span>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-border/80 bg-surface-elevated px-4 py-3 text-xs text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span>Khadibia is querying neural knowledge…</span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-between rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-red-300 underline text-[11px] ml-2"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form
        className="border-t border-border/80 bg-surface-elevated/40 p-3 sm:p-4"
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
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Khadibia anything (e.g., 'How did you build the Cencori MCP server?')"
            disabled={loading}
            className="flex-1 rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted/60 focus:border-accent focus:ring-1 focus:ring-accent/30 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex items-center gap-1.5 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-background transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span>Send</span>
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </form>
    </section>
  );
}
