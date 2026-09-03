# Bumblebee — Ops AI Agent

I built Bumblebee at Ihifix Technologies: a 27-tool MCP-powered agent connecting LLaMA to live business systems.

## Architecture

- **Transport:** MCP over stdio — tool servers run as subprocesses, JSON-RPC handshake
- **LLM:** LLaMA via Groq / inference API
- **Backend:** FastAPI serving a single-page chat UI
- **Tools (27):** database queries, email send, SMS trigger, CSV bulk operations, Paystack revenue lookups, registration counts, voice input (speech-to-text)
- **Voice:** Browser MediaRecorder → `/api/speech` → transcribed text → agent

## What made it production-grade

- Token auth on API routes
- Session-scoped CSV uploads for bulk email
- Tool-call visibility in the UI (recruiters can see routing)
- Rate limiting and structured error responses

## Note

Bumblebee is private/work code — this portfolio agent (Khadibia) narrates the architecture; the live system is not publicly hosted.
