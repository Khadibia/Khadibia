# Anthony Enujeko Portfolio + Khadibia Agent

Single-service portfolio: static UI + Khadibia chat agent (smolagents + Groq), deployed to **Google Cloud Run**.

## Structure

```
portfolio/
├── content/          # Shared YAML/Markdown — site + agent
├── agent/            # FastAPI + smolagents + static file serving
├── frontend/         # Next.js static export (built into agent image)
├── Dockerfile        # Multi-stage: build UI → run API + static
└── .env              # Local secrets (do not commit)
```
