"""Load portfolio content from the shared content/ directory."""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any

import yaml

CONTENT_DIR = Path(os.environ.get("CONTENT_DIR", Path(__file__).resolve().parent.parent / "content"))


def _read_yaml(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
    with path.open(encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


def _read_text(path: Path) -> str:
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8").strip()


def get_profile() -> dict[str, Any]:
    return _read_yaml(CONTENT_DIR / "profile.yaml")


def get_about() -> str:
    return _read_text(CONTENT_DIR / "about.md")


def get_skills() -> list[str]:
    data = _read_yaml(CONTENT_DIR / "skills.yaml")
    return data.get("skills", [])


def get_education() -> list[dict[str, Any]]:
    data = _read_yaml(CONTENT_DIR / "education.yaml")
    return data.get("education", [])


def get_experience() -> list[dict[str, Any]]:
    data = _read_yaml(CONTENT_DIR / "experience.yaml")
    return data.get("roles", [])


def list_projects() -> list[dict[str, Any]]:
    projects_dir = CONTENT_DIR / "projects"
    if not projects_dir.exists():
        return []
    projects = []
    for path in sorted(projects_dir.glob("*.yaml")):
        data = _read_yaml(path)
        if data:
            projects.append(data)
    return projects


def get_project(slug: str) -> dict[str, Any] | None:
    path = CONTENT_DIR / "projects" / f"{slug}.yaml"
    data = _read_yaml(path)
    return data if data else None


def get_architecture(slug: str) -> str:
    return _read_text(CONTENT_DIR / "architecture" / f"{slug}.md")


def search_projects(query: str) -> list[dict[str, Any]]:
    q = query.lower()
    results = []
    for project in list_projects():
        haystack = " ".join(
            [
                project.get("title", ""),
                project.get("summary", ""),
                " ".join(project.get("tags", [])),
                project.get("slug", ""),
            ]
        ).lower()
        if q in haystack or any(term in haystack for term in q.split()):
            results.append(project)
    return results
