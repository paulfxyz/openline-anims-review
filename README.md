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
