from __future__ import annotations

import os
from pathlib import Path

import yaml
from smolagents import OpenAIServerModel, ToolCallingAgent

from tools import PROFILE_TOOLS

PROMPTS_PATH = Path(__file__).parent / "prompts.yaml"

DEFAULT_MODEL_ID = "qwen/qwen3.8-27b"
DEFAULT_API_BASE = "https://api.groq.com/openai/v1"


def load_system_prompt() -> str:
    with PROMPTS_PATH.open(encoding="utf-8") as f:
        data = yaml.safe_load(f) or {}
    return data.get("system_prompt", "").strip()


def create_agent() -> ToolCallingAgent:
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError("GROQ_API_KEY environment variable is required")

    model_id = os.environ.get("GROQ_MODEL", DEFAULT_MODEL_ID)
    api_base = os.environ.get("GROQ_API_BASE", DEFAULT_API_BASE)

    model = OpenAIServerModel(
        model_id=model_id,
        api_base=api_base,
        api_key=api_key,
        temperature=0.1,
    )

    return ToolCallingAgent(
        tools=PROFILE_TOOLS,
        model=model,
        instructions=load_system_prompt(),
        max_steps=6,
    )
