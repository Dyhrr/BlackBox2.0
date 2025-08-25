
from django import template
from django.conf import settings
from django.utils.safestring import mark_safe
from pathlib import Path
import json

register = template.Library()

DEV = bool(getattr(settings, "DEBUG", False))
DEV_SERVER = getattr(settings, "VITE_DEV_SERVER", "http://127.0.0.1:5173")
MANIFEST_PATH = getattr(settings, "VITE_MANIFEST_PATH", Path(getattr(settings, "BASE_DIR")) / "static" / ".vite" / "manifest.json")

def _load_manifest():
    try:
        with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}

def _static_url(rel: str) -> str:
    base = (getattr(settings, "STATIC_URL", "/static/") or "/static/").rstrip("/")
    rel = rel.lstrip("/")
    return f"{base}/.vite/{rel}"

@register.simple_tag
def vite_hmr_client():
    if DEV:
        return mark_safe(f'<script type="module" src="{DEV_SERVER}/@vite/client"></script>')
    return ""

@register.simple_tag
def vite_react_refresh():
    return ""

@register.simple_tag
def vite_asset(entry: str):
    if DEV:
        entry = entry.lstrip("/")
        return mark_safe(f'<script type="module" src="{DEV_SERVER}/{entry}"></script>')

    manifest = _load_manifest()
    chunk = manifest.get(entry)
    if not chunk:
        return ""

    tags = []
    for css in chunk.get("css", []):
        tags.append(f'<link rel="stylesheet" href="{_static_url(css)}">')
    if "file" in chunk:
        tags.append(f'<script type="module" src="{_static_url(chunk["file"])}"></script>')
    return mark_safe("\n".join(tags))
