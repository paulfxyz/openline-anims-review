"""Idempotent QA-only copy update. Preserve page structures and animation
slots, replace the marked disclosure / old Unlimited comparison section,
and produce the same before/after data used by the QA panel and export.
"""
from pathlib import Path
import html
import json
import re

Q = Path(__file__).resolve().parents[1]
data = json.loads((Q / "connectivity-copy.json").read_text())
fragment = (Q / "redesign/profile-switching.html").read_text()
css = (Q / "profile-switching.css").read_text()
START = "<!-- qa-profile-switching:start -->"
END = "<!-- qa-profile-switching:end -->"
PATHS = {
    "SIM": '<path d="M7 3h7.5L19 7.5V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><rect x="8" y="10" width="8" height="7" rx="1"/><path d="M8 13.5h8M12 10v7"/>',
    "SIGNAL": '<path d="M4 20v-3M9 20v-7M14 20V9M19 20V4"/>',
    "SWITCH": '<path d="M4 7h15l-4-4M20 17H5l4 4"/><path d="M19 7l-4 4M5 17l4-4"/>',
    "INFO": '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    "ARROW": '<path d="M5 12h14M12 5l7 7-7 7"/>',
}

def svg(key):
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + PATHS[key] + "</svg>"

def compact(text):
    return re.sub(r"\s+", "", html.unescape(re.sub(r"<[^>]+>", "", text)))

def block(slug):
    is_unlimited = slug == "unlimited"
    values = {
        "VARIANT": "is-unlimited" if is_unlimited else "",
        "KICKER": "The flexibility behind unlimited" if is_unlimited else "More than a network switch",
        "TITLE": "Unlimited use does not mean one profile forever." if is_unlimited else "A better connection can mean a different eSIM.",
        "INTRO": (
            "Network selection and profile replacement are two parts of the same approach. "
            "If your current service setup is no longer a good fit, we can issue a new eSIM "
            "and move you to a different underlying provider. This should be uncommon, but it is part of the service."
            if is_unlimited else
            "Our multi-network and unlimited-use approach is built on flexibility. Usually, "
            "we work with the network options on your current eSIM. When that is not enough, "
            "we can issue another profile on the fly and change the service setup behind your connection."
        ),
        "LINK": "/qa/multiple-tier1#profile-switching" if is_unlimited else "/qa/unlimited#profile-switching",
        "LINK_LABEL": "How multi-network works" if is_unlimited else "How this supports unlimited use",
    }
    result = fragment
    for key, value in values.items():
        result = result.replace("{{" + key + "}}", html.escape(value, quote=True))
    for key in PATHS:
        result = result.replace("{{" + key + "}}", svg(key))
    assert "{{" not in result
    return result.replace(START, START + '\n<style data-cpx>\n' + css + "\n</style>", 1)

def replace_section(text, slug):
    new = block(slug).rstrip()
    if START in text:
        a = text.index(START)
        b = text.index(END, a) + len(END)
        return text[:a] + new + text[b:]
    needle = "Important: eSIM Switching" if slug == "multiple-tier1" else "Compare how different providers handle your data usage"
    for match in re.finditer(r"<section\b[^>]*>[\s\S]*?</section>", text):
        if needle in html.unescape(match.group(0)):
            return text[:match.start()] + new + text[match.end():]
    raise RuntimeError(f"Cannot find the intended {slug} block")

def rewrite(text, records):
    ordinary = [r for r in records if "stat" not in r]
    lookup = {compact(r["before"]): r for r in ordinary}
    already = {compact(r["after"]): r for r in ordinary}
    found = set()
    def heading_or_paragraph(m):
        key = compact(m.group(3))
        record = lookup.get(key)
        if record:
            found.add(record["before"])
            content = record.get("html", html.escape(record["after"], quote=False))
            return m.group(1) + content + m.group(4)
        if key in already:
            found.add(already[key]["before"])
        return m.group(0)
    # Headings may contain per-word accent/reveal spans. Keep their outer
    # element and classes; replace only the human-readable inner copy.
    text = re.sub(r"(<(h[1-4]|p)\b[^>]*>)([\s\S]*?)(</\2>)", heading_or_paragraph, text)
    def leaf(m):
        raw = m.group(0)
        key = compact(raw)
        record = lookup.get(key)
        if record:
            found.add(record["before"])
            leading = re.match(r"\s*", raw).group()
            trailing = re.search(r"\s*$", raw).group()
            return leading + html.escape(record["after"], quote=False) + trailing
        if key in already:
            found.add(already[key]["before"])
        return raw
    text = re.sub(r"(?<=>)[^<>]+(?=<)", leaf, text)
    for r in records:
        if "stat" not in r:
            continue
        old_value, old_label, new_value, new_label = r["stat"]
        pattern = r"(<div\b[^>]*>)" + re.escape(old_value) + r"(</div>\s*<div\b[^>]*>)" + re.escape(old_label) + r"(</div>)"
        text, count = re.subn(pattern, lambda m: m[1] + new_value + m[2] + new_label + m[3], text)
        if count or new_label in text:
            found.add(r["before"])
    missing = [r["before"] for r in records if r["before"] not in found]
    if missing:
        raise RuntimeError("Copy keys not located: " + repr(missing))
    return text

def neutral_usage_cards(text):
    """The former competitor failures are now neutral customer use cases."""
    pattern = (
        r'<div class="flex items-start gap-2 p-2 rounded-lg bg-red-50 border border-red-200">'
        r'<svg\b[^>]*>[\s\S]*?</svg><div class="flex-1">'
        r'<div class="text-xs text-red-900 mb-0.5">Your use</div>'
        r'<div class="text-xs text-red-700">[^<]*</div></div></div>'
    )
    def neutral(m):
        card = m[0].replace('<div class=', '<div data-cpx-usage class=', 1)
        for before, after in (
            ("bg-red-50", "bg-gray-50"), ("border-red-200", "border-gray-200"),
            ("text-red-900", "text-gray-700"), ("text-red-700", "text-gray-600"),
            ("text-red-600", "text-gray-500"), ("lucide-x ", "lucide-circle-dot "),
        ):
            card = card.replace(before, after)
        return re.sub(
            r'(<svg\b[^>]*>)[\s\S]*?(</svg>)',
            lambda s: s[1] + '<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="1"></circle>' + s[2],
            card, count=1,
        )
    text, count = re.subn(pattern, neutral, text)
    if text.count("data-cpx-usage") != 4:
        raise RuntimeError(f"Expected four neutral Unlimited usage cards; changed {count}")
    return text

for slug in ("multiple-tier1", "unlimited"):
    path = Q / (slug + ".html")
    original = path.read_text()
    revised = replace_section(original, slug)
    # Do not rewrite the new component when scanning the captured copy.
    a, b = revised.index(START), revised.index(END) + len(END)
    outside = revised[:a] + "<!-- CPX_SLOT -->" + revised[b:]
    outside = rewrite(outside, data[slug])
    if slug == "unlimited":
        outside = neutral_usage_cards(outside)
    revised = outside.replace("<!-- CPX_SLOT -->", revised[a:b], 1)
    path.write_text(revised)
    print(slug, len(data[slug]), "copy records; profile explainer updated")

# The registry imports this generated JS so one source drives implementation,
# the in-panel before/after view, Markdown export and machine-readable data.
public = {
    slug: [{k:r[k] for k in ("area","before","after")} for r in data[slug]]
    for slug in ("multiple-tier1","unlimited")
}
(Q / "connectivity-changes.js").write_text(
    "// Generated by qa/tools/connectivity_copy.py from connectivity-copy.json.\n"
    "export const CONNECTIVITY_COPY = " + json.dumps(public, ensure_ascii=False, indent=2) + ";\n"
)
lines = [
    "# Connectivity wording and profile-switching update",
    "", "Date: " + data["date"], "", data["basis"], "",
    "## New entry on both pages", "",
    "A prominent two-route explainer distinguishes network selection within an existing profile "
    "from occasional replacement of the whole profile/provider setup. It discloses possible installation "
    "or activation, removes the unverified 90% / 10% split and fixed 30-second promise, and links the two pages.",
    "",
    "Unlimited's former red competitor-failure rows are now neutral grey customer-use rows with "
    "circle markers, so the design no longer presents the customer's use case as a failure.",
    "",
    "## Delivery boundaries", "",
    "The illustration is not a real profile switch. No promise is added about automatic/silent installation, "
    "zero interruption, a fixed replacement time, data-balance/validity carry-over or charges. "
    "Those implementation and commercial details still need product confirmation.", "",
]
for slug, records in public.items():
    lines += ["## /qa/" + slug, ""]
    for record in records:
        lines += ["### " + record["area"], "- Before: " + record["before"], "- After: " + record["after"], ""]
(Q / "connectivity-changelog.md").write_text("\n".join(lines))
