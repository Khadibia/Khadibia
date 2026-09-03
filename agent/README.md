# Khadibia Portfolio

Single-service portfolio: FastAPI serves the static UI and Khadibia chat agent.

- **Agent:** `ToolCallingAgent` + `OpenAIServerModel`
- **Model:** `qwen/qwen3.8-27b` via Groq's OpenAI-compatible API
- **Deploy:** Google Cloud Run via root `Dockerfile`

Set `GROQ_API_KEY` in Cloud Run secrets. Get a free key at [console.groq.com/keys](https://console.groq.com/keys).
