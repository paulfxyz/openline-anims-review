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
policy = json.loads((Q / "unlimited-plan-copy.json").read_text())
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
    "CHAT": '<path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.4L3 21l1.6-5.5A8.5 8.5 0 1 1 21 11.5z"/>',
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
        "TITLE": "Unlimited use does not mean one profile forever." if is_unlimited else "A better connection. More than one way.",
        "INTRO": (
            "Network selection and profile replacement are two parts of the same approach. "
            "If your current service setup is no longer a good fit, we can issue a new eSIM "
            "and move you to a different underlying provider. This should be uncommon, but it is part of the service."
            if is_unlimited else
            "When a network switch is not enough, we can replace your eSIM and change the provider behind it."
        ),
        "LINK": "/qa/multiple-tier1#profile-switching" if is_unlimited else "/qa/unlimited#profile-switching",
        "LINK_LABEL": "How multi-network works" if is_unlimited else "How this supports unlimited use",
        "NETWORK_TEXT": "We use another network available to your current plan. Your eSIM stays the same.",
        "NETWORK_STAYS": "Your existing eSIM profile remains in use.",
        "PROFILE_TITLE_1": "New eSIM.",
        "PROFILE_TITLE_2": "Different provider.",
        "PROFILE_TEXT": "Sometimes we replace the whole profile to move your connection to a better-fitting provider.",
        "PROFILE_STAYS": "This flexibility supports both multi-network access and our unlimited-use approach.",
        "DISCLOSURE_TITLE": "Occasionally, we may replace your eSIM profile entirely.",
        "DISCLOSURE_TEXT": "It should be uncommon, but changing the whole profile is part of how we work to maintain a good service. You may need to install or enable the replacement on your phone. If a setup step is needed, we’ll guide you through it.",
        "SHORT_NOTE": "Profile changes are rare. If a new installation is needed, we’ll guide you.",
    }
    if is_unlimited:
        values.update({key: record["after"] for key, record in policy["section"].items()})
        # The fuller policy remains in the disclosure and in the shared fair-use
        # modal's data source. This is a concise presentation, not a new promise.
        values.update({
            "INTRO": "If local fair-use rules keep slowing you down, we’ll try another eSIM from a different provider.",
            "NETWORK_TEXT": "A network switch keeps your current eSIM. It does not necessarily change its fair-use rules.",
            "PROFILE_TITLE_1": "New eSIM.",
            "PROFILE_TITLE_2": "Different provider.",
            "PROFILE_TEXT": "We’ll try a replacement profile with fair-use rules better suited to your location and usage.",
            "SHORT_NOTE": "Local rules still apply. A better result is not guaranteed; choose fixed data to avoid usage-based throttling.",
        })
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
    for r in ordinary:
        for alias in r.get("aliases", []):
            lookup[compact(alias)] = r
    already = {}
    for r in ordinary:
        already.setdefault(compact(r["after"]), []).append(r)
    found = set()
    def heading_or_paragraph(m):
        key = compact(m.group(3))
        record = lookup.get(key)
        if record:
            found.add(record["before"])
            content = record.get("html", html.escape(record["after"], quote=False))
            return m.group(1) + content + m.group(4)
        for record in already.get(key, []):
            found.add(record["before"])
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
        for record in already.get(key, []):
            found.add(record["before"])
        return raw
    text = re.sub(r"(?<=>)[^<>]+(?=<)", leaf, text)
    for r in records:
        if "stat" not in r:
            continue
        old_value, old_label, new_value, new_label = r["stat"]
        count = 0
        for value, label in [(old_value, old_label), *r.get("stat_aliases", [])]:
            pattern = r"(<div\b[^>]*>)" + re.escape(value) + r"(</div>\s*<div\b[^>]*>)" + re.escape(label) + r"(</div>)"
            text, changed = re.subn(pattern, lambda m: m[1] + new_value + m[2] + new_label + m[3], text)
            count += changed
        if count or new_label in text:
            found.add(r["before"])
    missing = [r["before"] for r in records if r["before"] not in found]
    if missing:
        raise RuntimeError("Copy keys not located: " + repr(missing))
    return text

def current_records(slug):
    """Keep original-to-current and previous-to-current logs without replaying
    superseded prose. Both old captures and already-updated pages are accepted."""
    if slug != "unlimited":
        return data[slug]
    latest = {compact(r["before"]): r for r in policy["copy"]}
    result = []
    matched = set()
    for base in data[slug]:
        r = dict(base)
        update = latest.get(compact(base["after"]))
        if update:
            matched.add(update["before"])
            r["after"] = update["after"]
            r["aliases"] = [base["after"]]
            r.pop("html", None)
            if "html" in update:
                r["html"] = update["html"]
            if "stat" in base:
                r["stat_aliases"] = [base["stat"][2:]]
                r["stat"] = base["stat"][:2] + update["stat"][2:]
        result.append(r)
    missing = [r["before"] for r in policy["copy"] if r["before"] not in matched]
    if missing:
        raise RuntimeError("Revision has no base copy record: " + repr(missing))
    return result

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
    outside = rewrite(outside, current_records(slug))
    if slug == "unlimited":
        outside = neutral_usage_cards(outside)
    revised = outside.replace("<!-- CPX_SLOT -->", revised[a:b], 1)
    path.write_text(revised)
    print(slug, len(data[slug]), "copy records; profile explainer updated")

# The registry imports this generated JS so one source drives implementation,
# the in-panel before/after view, Markdown export and machine-readable data.
public = {
    slug: [{k:r[k] for k in ("area","before","after")} for r in current_records(slug)]
    for slug in ("multiple-tier1","unlimited")
}
policy_public = [
    {k:r[k] for k in ("area", "before", "after")}
    for r in [*policy["copy"], *policy["section"].values()]
]
(Q / "connectivity-changes.js").write_text(
    "// Generated by qa/tools/connectivity_copy.py from connectivity-copy.json.\n"
    "export const CONNECTIVITY_COPY = " + json.dumps(public, ensure_ascii=False, indent=2) + ";\n"
    "export const UNLIMITED_PLAN_COPY = " + json.dumps(policy_public, ensure_ascii=False, indent=2) + ";\n"
)
lines = [
    "# Connectivity wording and profile-switching update",
    "", "Date: " + data["date"], "", data["basis"], "",
    "## Latest clarification for Irina: fixed packages versus unlimited", "",
    policy["basis"], "",
    "Apply this latest Unlimited copy together with its existing QA page identity, native typography, "
    "animation geometry/timings, neutral use-case rows and the added profile-replacement section. "
    "The Unlimited before/after inventory below is consolidated original-to-current copy. The final "
    "revision section records the immediately previous wording versus this latest clarification, "
    "including the replacement component. Do not restore the earlier generic adaptive-service copy. "
    "Multi Tier-1 and Global eSIM remain unchanged by this clarification.", "",
    "## New entry on both pages", "",
    "Latest presentation revision: larger 18px card copy and 28px headings, two concise route cards, "
    "an expandable replacement disclosure and a live-chat CTA. The current page-specific introduction "
    "and short note are documented in the QA registry's compact-profile-explainer entry. Longer "
    "policy copy below remains the detailed product-policy record, not the default visible layout.", "",
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
lines += ["## Latest Unlimited revision: previous to current", ""]
for record in policy_public:
    lines += ["### " + record["area"], "- Before: " + record["before"], "- After: " + record["after"], ""]
(Q / "connectivity-changelog.md").write_text("\n".join(lines))
