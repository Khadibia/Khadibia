from __future__ import annotations

import json

from smolagents import tool

import content_loader as cl


@tool
def get_about() -> str:
    """Return Anthony Enujeko's about/bio paragraph. Use when the visitor asks who Anthony is, what he does, or what he specializes in."""
    return cl.get_about()


@tool
def get_skills() -> str:
    """Return Anthony's technical skills list. Use when asked about tech stack, skills, or technologies."""
    skills = cl.get_skills()
    return "Skills: " + ", ".join(skills)


@tool
def get_education() -> str:
    """Return Anthony's education history. Use when asked about background, degree, or where he studied."""
    return json.dumps(cl.get_education(), indent=2)


@tool
def get_experience() -> str:
    """Return Anthony's work experience with roles, companies, dates, and bullets. Use when asked about jobs, work history, or what he did at a company."""
    roles = cl.get_experience()
    lines = []
    for role in roles:
        end = role.get("end", "")
        lines.append(f"## {role.get('title')} at {role.get('company')} ({role.get('start')} – {end})")
        for bullet in role.get("bullets", []):
            lines.append(f"- {bullet}")
        if role.get("tags"):
            lines.append(f"Tags: {', '.join(role['tags'])}")
        lines.append("")
    return "\n".join(lines).strip()


@tool
def get_career_narrative() -> str:
    """Synthesize Anthony's career story from education and experience. Use when asked how he got into ML/AI or his career path."""
    edu = cl.get_education()
    roles = cl.get_experience()
    parts = ["Career narrative for Anthony Enujeko:\n"]
    if edu:
        e = edu[0]
        parts.append(
            f"I studied {e.get('degree')} at {e.get('institution')} ({e.get('start')}–{e.get('end')})."
        )
    parts.append(
        "I moved into data science and ML/AI engineering, building production systems — from MLOps and computer vision at FieldWatch, "
        "to MCP-powered agents like Bumblebee at Ihifix, and Cencori's official MCP server."
    )
    for role in roles[:3]:
        parts.append(f"- {role.get('title')} at {role.get('company')}")
    return "\n".join(parts)


@tool
def search_projects(query: str) -> str:
    """Search Anthony's projects by keyword and return matching project summaries.

    Args:
        query: Search keyword such as 'computer vision', 'MCP', or 'churn'.
    """
    results = cl.search_projects(query)
    if not results:
        return f"No projects found matching '{query}'."
    lines = []
    for p in results:
        lines.append(f"### {p.get('title')} (slug: {p.get('slug')})")
        lines.append(p.get("summary", ""))
        lines.append("")
    return "\n".join(lines).strip()


@tool
def get_project(slug: str) -> str:
    """Get full details for a single project by slug.

    Args:
        slug: Project slug such as churnpred, cencori, fieldwatch, or bumblebee.
    """
    project = cl.get_project(slug)
    if not project:
        return f"No project found with slug '{slug}'."
    return json.dumps(project, indent=2)


@tool
def get_project_links(slug: str) -> str:
    """Return demo URLs, GitHub links, and docs for a project.

    Args:
        slug: Project slug such as churnpred, fieldwatch, or cencori.
    """
    project = cl.get_project(slug)
    if not project:
        return f"No project found with slug '{slug}'."
    links = {
        k: v
        for k, v in project.items()
        if k.endswith("_url") or k in ("github", "docs_url", "npm", "demo_space", "product_url", "video_demo")
    }
    links = {k: v for k, v in links.items() if v}
    return json.dumps(links, indent=2)


@tool
def explain_architecture(slug: str) -> str:
    """Return a deep architecture narrative for flagship projects.

    Args:
        slug: Architecture doc slug such as bumblebee or cencori.
    """
    text = cl.get_architecture(slug)
    if not text:
        project = cl.get_project(slug)
        if project:
            return project.get("summary", "No architecture doc available.")
        return f"No architecture documentation for '{slug}'."
    return text


PROFILE_TOOLS = [
    get_about,
    get_skills,
    get_education,
    get_experience,
    get_career_narrative,
    search_projects,
    get_project,
    get_project_links,
    explain_architecture,
]
