#!/usr/bin/env python3
import argparse
import re
import sys
from pathlib import Path


def validate(deck_path: Path) -> list[str]:
    root = deck_path if deck_path.is_dir() else deck_path.parent
    index = root / "index.html" if deck_path.is_dir() else deck_path
    css = root / "styles.css"
    js = root / "app.js"
    errors = []

    for path in (index, css, js):
        if not path.exists():
            errors.append(f"missing required file: {path}")

    if errors:
        return errors

    html = index.read_text(encoding="utf-8")
    styles = css.read_text(encoding="utf-8")
    script = js.read_text(encoding="utf-8")
    slides = re.findall(r'<section\b[^>]*class="[^"]*\bslide\b[^"]*"[^>]*>', html)
    scenes = re.findall(r'data-scene="([^"]+)"', html)
    ids = re.findall(r'\bid="([^"]+)"', html)
    image_tags = re.findall(r'<img\b[^>]*>', html)

    if not slides:
        errors.append("index.html has no slide sections")
    if len(scenes) != len(slides):
        errors.append("every slide must have one data-scene")
    if len(scenes) != len(set(scenes)):
        errors.append("data-scene values must be unique")
    if len(ids) != len(set(ids)):
        errors.append("HTML ids must be unique")
    if "progressBar" not in ids or "counter" not in ids:
        errors.append("top bar must include progressBar and counter")
    if "prefers-reduced-motion" not in styles:
        errors.append("styles.css must support prefers-reduced-motion")
    if "showSlide(0)" not in script:
        errors.append("app.js must initialize the first slide")
    if any(not re.search(r'\balt="[^"]+"', tag) for tag in image_tags):
        errors.append("every image must have non-empty alt text")

    local_sources = re.findall(r'(?:src|href)="([^"]+)"', html)
    for source in local_sources:
        if source.startswith(("http://", "https://", "#", "data:")):
            continue
        if not (root / source).exists():
            errors.append(f"missing local asset: {source}")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate a Paper Deck folder or index.html")
    parser.add_argument("deck", type=Path)
    args = parser.parse_args()
    errors = validate(args.deck.expanduser().resolve())

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    print("Paper Deck validation passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
