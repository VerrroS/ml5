#!/usr/bin/env python3
# build.py
import os
from pathlib import Path

import markdown

from staticjinja import Site

markdowner = markdown.Markdown(output_format="html5")


def md_context(template):
    markdown_content = Path(template.filename).read_text()
    return {"documentation_html": markdowner.convert(markdown_content)}


def render_md(site, template, **kwargs):
    out = site.outpath / Path(template.name).with_suffix(".html")

    # Compile and stream the result
    os.makedirs(out.parent, exist_ok=True)
    site.get_template("documentation.html").stream(**kwargs).dump(str(out), encoding="utf-8")


site = Site.make_site(
    searchpath="templates",
    outpath=".",
    contexts=[(r".*\.md", md_context)],
    rules=[(r".*\.md", render_md)],
)

site.render(use_reloader=True)