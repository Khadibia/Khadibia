from __future__ import annotations

import os
import time
import uuid
from collections import defaultdict
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from agent_core import create_agent
from tools import PROFILE_TOOLS

ROOT_DIR = Path(__file__).resolve().parent.parent
load_dotenv(ROOT_DIR / ".env")

STATIC_DIR = Path(
    os.environ.get(
        "STATIC_DIR",
        ROOT_DIR / "frontend" / "out",
    )
)

app = FastAPI(title="Khadibia Portfolio", version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_agent = None
_rate_buckets: dict[str, list[float]] = defaultdict(list)
RATE_LIMIT = int(os.environ.get("RATE_LIMIT_PER_HOUR", "20"))


def get_agent():
    global _agent
    if _agent is None:
        _agent = create_agent()
    return _agent


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    session_id: str | None = None


class ChatResponse(BaseModel):
    answer: str
    session_id: str
    tool_calls: list[dict[str, Any]] = []


def _check_rate_limit(client_ip: str) -> None:
    now = time.time()
    window = _rate_buckets[client_ip]
    _rate_buckets[client_ip] = [t for t in window if now - t < 3600]
    if len(_rate_buckets[client_ip]) >= RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Try again later.")
    _rate_buckets[client_ip].append(now)


@app.get("/health")
def health():
    return {
        "ok": True,
        "tools": len(PROFILE_TOOLS),
        "agent": "Khadibia",
        "agent_type": "ToolCallingAgent",
        "model": os.environ.get("GROQ_MODEL", "qwen/qwen3.8-27b"),
        "provider": "groq",
        "static": STATIC_DIR.is_dir(),
    }


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest, request: Request):
    _check_rate_limit(request.client.host if request.client else "unknown")
    session_id = req.session_id or str(uuid.uuid4())

    try:
        agent = get_agent()
        result = agent.run(req.message)
        answer = str(result).strip() if result else "(no answer)"
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    return ChatResponse(answer=answer, session_id=session_id, tool_calls=[])


if STATIC_DIR.is_dir():
    app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
