"""Replace only the original operator-logo wall with an accessible rolling showcase.
Original images remain intact; derived WebP files trim padding and standardise size.
"""
from pathlib import Path
import html
import json
import re
import subprocess
import unicodedata

Q = Path(__file__).resolve().parents[1]
ROOT = Q.parent
PAGE = Q / "multiple-tier1.html"
DATA = Q / "operators.json"
START = "<!-- qa-operator-showcase:start -->"
END = "<!-- qa-operator-showcase:end -->"
source = PAGE.read_text()
section = next(m for m in re.finditer(r"<section\b[^>]*>[\s\S]*?</section>", source)
               if "200+ Partner Operators" in m[0])
FIXES = {
    "Telefónica": "/qa/assets/operators/telefonica-original.png",
    "Three": "/qa/assets/operators/three-original.svg",
    "SK Telecom": "/qa/assets/operators/sk-telecom-original.png",
}
if DATA.exists():
    operators = json.loads(DATA.read_text())
else:
    operators = []
    for src, name in re.findall(r'<img\b[^>]*src="([^"]+)"[^>]*alt="([^"]+)"', section[0]):
        name = html.unescape(name)
        slug = re.sub(r"[^a-z0-9]+", "-", unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode().lower()).strip("-")
        operators.append({"name": name, "slug": slug, "original": src})
    assert len(operators) == 36 and len({o["name"] for o in operators}) == 36

for operator in operators:
    original = FIXES.get(operator["name"], operator["original"])
    image = ROOT / original.lstrip("/")
    output = Q / "assets/operators" / (operator["slug"] + ".webp")
    assert image.is_file(), image
    if not output.exists() or output.stat().st_mtime < image.stat().st_mtime:
        subprocess.run(["magick", "-background", "none", str(image), "-fuzz", "2%",
                        "-trim", "+repage", "-resize", "300x112>", "-strip",
                        "-quality", "88", str(output)], check=True)
    operator["src"] = "/qa/assets/operators/" + output.name
    operator["asset_source"] = original
DATA.write_text(json.dumps(operators, ensure_ascii=False, indent=2) + "\n")

def card(o):
    name = html.escape(o["name"], quote=True)
    return f'<li class="ops-card" data-ops-name="{name}"><div class="ops-logo"><img src="{o["src"]}" alt="" width="150" height="56" loading="lazy" decoding="async"></div><span>{name}</span></li>'

rows = []
for number, group in enumerate((operators[:18], operators[18:]), 1):
    rows.append(f'<div class="ops-viewport" tabindex="0" role="group" aria-label="Operator row {number}. Scroll horizontally to explore."><div class="ops-track"><ul class="ops-group">{"".join(card(o) for o in group)}</ul></div></div>')
markup = (Q / "redesign/operator-showcase.html").read_text()
markup = markup.replace("{{ROWS}}", "\n".join(rows)).replace("{{CARDS}}", "".join(card(o) for o in operators))
markup = markup.replace("{{COUNT}}", str(len(operators)))
markup = markup.replace(START, START + '\n<style data-ops>\n' + (Q / "operator-showcase.css").read_text() + "\n</style>", 1)
assert "{{" not in markup
if START in source:
    a, b = source.index(START), source.index(END) + len(END)
else:
    a = source.index('<div data-slot="card" class="text-card-foreground flex flex-col gap-6 rounded-xl border-2', section.start())
    depth, b = 0, None
    for m in re.finditer(r"<div\b[^>]*>|</div>", source[a:]):
        depth += -1 if m[0].startswith("</") else 1
        if depth == 0:
            b = a + m.end()
            break
    assert b and b < section.end()
source = source[:a] + markup.strip() + source[b:]
script = '<script type="module" src="/qa/operator-showcase.js"></script>'
if script not in source:
    source = source.replace("</body>", script + "</body>", 1)
PAGE.write_text(source)
print("Updated only the 36-logo wall; retained section heading, availability copy, CTA and other animations.")
