# Openline — Animation Review

A review surface for proposed header and section animations across the Openline
site, plus two full page redesigns. Built as a static site: no build step, no
dependencies, no framework.

## What's in it

**`index.html`** — the review app. 30 boards, each covering one animation slot on
one page of the live site. Every board opens on option 0, a faithful replica of
what currently ships (bugs included), followed by 15 proposed alternatives. Each
proposal carries a family, a tagline, a rationale, pros and cons, and scores for
story, motion, performance, mobile, brand and ease. A comparison matrix sits
below each board.

Boards are grouped by the page they affect: Multiple Tier-1, Global eSIM, Home,
Network, Business, Hospitality, IoT, Openline+, Login, About, OMDM Market, Blog,
Contact and Affiliate. One board is an icon set rather than animations (31 Aloha
badge options).

**`choice.html`** (`/choice`) — the selection walkthrough. It steps through every
board one at a time, renders all of that board's options live side by side, and
asks for one pick per section, by click or number key. Picks persist in
`localStorage`, and the summary screen at the end emits both a Markdown table and
a machine-readable JSON block to copy back. It reads the same board registry as
the review app, so it can never drift out of sync with it.

Every animation is embedded at the real measured size of the box it would occupy
on the live page, so nothing looks better here than it would in production.

**`omdm.html`** — a full redesign of `/omdm-market` in a fintech-clean direction:
light ground, a single blue accent, monospaced numerals. Notes in
`STYLE-OMDM.md`.

Recommendation panels on most boards were written when those boards carried 10
options, so they do not consider options 11–15; the boards say so in the UI. The
Home › "Why choose Openline?" panel is the exception — its recommendation was
written against all fifteen.

**`producthunt.html`** — a full redesign of `/producthunt`. The hero is kept
exactly as it ships; everything below is rebuilt, and the claim flow becomes a
working three-state modal instead of a button that scrolls to itself. Notes in
`STYLE-PRODUCTHUNT.md`.

## Running it locally

Any static file server will do:

```bash
python3 -m http.server 8099
```

Then open `http://localhost:8099`.

## Structure

```
index.html            review app shell
omdm.html             /omdm-market redesign
producthunt.html      /producthunt redesign
css/                  style.css (review app), omdm.css, producthunt.css
js/
  boards.js           board registry — nav badges derive counts from here
  board.js            board renderer
  kit.js              shared SVG kit: mk(tone) → wrap/card/label/mono/…
  g-shared.js         orange-token kit for the Global eSIM family
  <page>.js           variant registries, one file per page or section
img/                  raster assets
STYLE-OMDM.md         design tokens and handover notes
STYLE-PRODUCTHUNT.md  design tokens, strategy and handover notes
```

## Conventions

Variants are plain objects:

```js
{ id, name, family, tagline, desc, pros[], cons[],
  scores: { story, motion, perf, mobile, brand, ease },
  build: (uid) => ({ svg, pills, init? }) }
```

Animation is SMIL inside inline SVG — no runtime animation library. Two rules
matter: every `keyTimes` must start at 0 and end at 1 with a length matching its
`values`, and `transform` must be animated with `animateTransform` rather than
`animate`. Registry arrays are declared at the end of each file so variant
constants are initialised before use.

Setting `chosen: <index>` on a board marks the selected option with a badge, a
tick in the nav, a highlighted matrix row, and makes it the default on load.

## /qa — picks in context

[`/qa`](https://openline-anims-review.vercel.app/qa) puts every chosen option back into the page it belongs to.

- **15 pages** (`/qa/home`, `/qa/multiple-tier1`, … `/qa/affiliate`) are static captures of
  openline-revisions-hub at 1440px with scripts removed. Each animated slot is marked
  `data-qa-slot="<board key>"` and the picked option is mounted into it at the slot's real size.
- **Defaults** come from `qa/selections.json` (the /choice export). Changes live in
  `localStorage` (`openline-qa-v1`) and never touch that file.
- **Panel** (`Q`): swap option, compare with what ships today, leave a note, flip the shared blog
  slot between its two boards. Labels (`O`) sit on every slot.
- **Colour**: `qa/recolor.js` moves accents around the OKLCH wheel (lightness kept, neutrals
  untouched) across the site stylesheet, inline styles, SVG paint and SMIL values. Presets plus a
  custom picker; "every accent" or "Openline orange only"; status green/red/amber can be kept.
- **Export**: "Copy for Computer" gives a Markdown table + machine-readable JSON (picks, notes, theme).
- Option code is imported from `/js` — the same registry as the boards and /choice — so an edit
  to an option shows up in /qa with no copy to update.
- Re-capture: `qa/tools/capture.py` then `qa/tools/build.py`.

### /qa additions

- **Page identities** (`PAGE_STYLES` in `qa/core.js`): Network → Corporate blue (royal blue on navy ink),
  Security → Vault teal, AdBlocking → Ultraviolet, Unlimited → Hot magenta, Blog → Newsprint (mono,
  Openline typography, square corners). Each recolours its page and the animations on it; switchable per page.
- **Features pages** `/qa/security`, `/qa/adblocking`, `/qa/unlimited` captured (no boards; here for identity).
- **Redesigns** `/qa/about-redesign`, `/qa/contact-redesign`: every piece of the live copy kept, new layout,
  plain HTML/CSS on the captured header/footer. Source in `qa/redesign/`, built by `qa/tools/redesign.py`.
- **Modal builder** `/qa/modals`: 8 types, 327 generated + 31 Aloha animated icons (`qa/icons-lib.js`),
  60 Openline templates in 7 categories with a searchable miniature menu (`qa/modal-templates.js`),
  16 content block types (eSIM card, steps, QR, choice, toggle, rating, image, divider…), cover images
  (upload or `qa/modal-illus.js` illustrations), 0–2 CTAs plus a text link; preview over a real page or a phone.
- **Support chat** `/qa/chat`: capture of /all-countries; the support badge opens a full-screen chat
  (`qa/support/chat.js`) — sample history, composer with files (pick, drop, paste), voice notes (MediaRecorder,
  demo fallback), simulated replies, and a collapsible panel: WhatsApp / Instagram / Messenger / email,
  "Ask an AI about us" (ChatGPT, Claude, Perplexity, Gemini, Grok, Copilot, Le Chat, prefilled), KB and
  compatibility. The badge opens it on every /qa page.
- **Help modals** `/qa/kb`: the knowledge-base and device-compatibility modals (`qa/support/support.js`) on the
  real open-source data (`qa/data/kb-articles.json` from openline-kb, `qa/data/devices.js` from openline-check;
  search engine `qa/support/search.mjs` from openline-kb). Opened by `data-ol-open` markup, `#kb` / `#compat=`
  hashes, `Openline.open()`, or ⌘K; the page documents each with live examples.
- Home › Why choose: board embed is now the real 407 × 302 slot; 3 · The Handover redrawn for it.
- **Page menu**: the page name in the bottom dock opens a filterable list of all 20 pages plus the tools
  (type to filter, ↑ ↓ to move, Enter to go, Esc to close).
- Home › Referral: 3 · Link in Flight redrawn for its real 576 × 520 slot, with no background of its own
  so it sits on the box's flat orange (slot `clear: true`); a four-beat ticker fills the middle; its dotted field fades in from 0% at the left edge to 100% at the right.
- **Context fit** (`fitArt` in `qa/qa.js`): options drawn on the 640 × 460 board stage have their viewBox
  re-cut to the slot's shape around what is drawn (even padding, ≤ 1.2× zoom) and their full-bleed layers
  stretched, so dotted fields run edge to edge. `clearFill` drops opaque panels on hero art (Contact,
  Affiliate). Live badges beside a slot step aside when a proposal brings its own; two top-right badges
  share one row.
- **IoT identity** Chrome: purple/indigo become steel and graphite (`scope: 'families'` in `qa/recolor.js`),
  saturated solids take a brushed-metal gradient (`sheen`). Marked `selected: true` — the default, recorded
  in `qa/selections.json` (`pageStyles`), shown as Selected in the panel, hub and export, and restored by Reset.
- Referral board (`/` → Home › Refer a friend box): option 3's dotted field runs past its 576 × 520 frame so
  the 640 × 460 board stage has no bands, and inside the orange box the stage takes the box's own orange.

### /qa typography

- **Reference:** the computed interface font on [Openline](https://openline.com) and the
  [revisions hub](https://openline-revisions-hub.vercel.app/home) uses the native
  `ui-sans-serif, system-ui, sans-serif` stack with emoji fallbacks. Play is reserved for the wordmark.
- **One shared stack:** `qa/typography.css` covers captured pages, About/Contact redesigns, the review
  dock, page menu, hub, animation text, modal builder, chat and help modals. `qa/typography.js`
  mirrors the stacks for standalone copied modal HTML and embedded illustration SVGs.
- **No substitute interface fonts:** Inter-first declarations and decorative monospace labels have
  been removed. Blog keeps its monochrome editorial layout but uses the same Openline family rather
  than loading Newsreader. Real code snippets, keyboard hints, redemption codes and OTP fields retain
  a shared monospace stack; numeric animation text uses tabular figures in the main family.
- **Scope:** font-family changes are confined to `/qa`; the original animation boards are unchanged.
  Font sizes, animation timing and page identities are preserved. Rebuild redesign HTML with
  `python3 qa/tools/redesign.py` after changing `qa/redesign/rd.css`.

### /qa animation refinements

- `qa/animation-fixes.js` applies context-only corrections through `renderOption`, covering both the
  page and hub previews without modifying the original comparison boards.
- Openline+ / Built for Digital Nomads / Six Cities, One Number: destination labels remain steady
  instead of repeating their 350ms entrance fade. The connection dots still travel to the fixed
  number column, which now shows the fictional US example `+1 202 555 0148`.

### /qa retained redesigns

Only the earlier About and Contact alternatives are retained. The later batch of
16 alternatives was removed at Paul's request, including its generator and
dedicated assets. The review is back to 18 original product pages plus these two
redesigns. Shared typography, page identities, modal/chat tools and the Openline+
nomad animation fixes are preserved. No `/delivery` has been created.

### /qa/start: purchase code to eSIM

Standalone process extra inspired by the current [Openline /start](https://openline.com/start),
not another batch of alternative marketing pages. `qa/start.html`, `start.css` and `start.js`
use the shared native UI stack, Openline's orange/ink palette and the live site's logo mark.

- Three-part code entry with uppercase/whitespace normalization, validation, clear and sample-code controls.
- Read-only code check → sample Japan plan → explicit activation confirmation → animated code-to-profile reveal.
- The confirmation follows Paul's requested rule: activation starts validity immediately and removes gifting eligibility.
  It defaults to “Not yet” and requires an explicit readiness checkbox before confirming.
- Gift flow copies a clearly labelled example message; it never sends a message. Account links use the existing `/qa/login`.
- Error controls cover unknown, already-used and connection-error codes plus a recoverable demo activation failure.
- No real redemption/provisioning/account API calls, no persistent code storage and no installable eSIM QR.
  The code format and plan/profile data are demonstration fixtures, not verified production validation rules.
- Accessible native dialogs, keyboard handling, reduced-motion treatment, and mobile layouts.
