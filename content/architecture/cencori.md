# Cencori MCP Server (@cencori/mcp)

I built Cencori's official Model Context Protocol server — a thin stdio adapter over Cencori's public HTTP APIs.

## What it exposes

- **Docs:** search_docs, get_doc, list_docs (public, no key)
- **Web:** web_search, web_fetch, web_extract, web_browse (Cencori's own crawler + hybrid index)
- **Platform:** gateway metrics, agents, memory, sessions, governance reads/writes
- **Inference:** text, RAG, embeddings, vision, TTS via Cencori gateway

## Action tiers

| Tier | Gate | Examples |
|------|------|----------|
| Public | none | search_docs, get_doc |
| Read | CENCORI_API_KEY | web_search, list_agents, check_quota |
| Write | CENCORI_MCP_WRITE=1 | web_browse, web_crawl, inference, memory writes |
| Destructive | CENCORI_MCP_DESTRUCTIVE=1 | delete_memory, delete_agent, approve_session |

## Try it

```bash
npx -y @cencori/mcp@latest
```

Docs: https://cencori.com/docs/mcp
