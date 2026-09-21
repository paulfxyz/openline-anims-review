# OMDM — style systems for handover

The /omdm-market page currently borrows the site's orange brand surface. OMDM is a
wholesale venue, not a consumer product, and the orange makes it read like a travel
landing page. This document defines **two** candidate characters for the page, both
implemented in `js/kit.js` and `css/style.css`, so whichever is chosen can be
handed to implementation without redrawing it.

Every animation option on the OMDM boards is tagged with the direction it belongs
to, so the review can compare the two characters directly rather than in the
abstract.

---

## Measured boxes

Taken from the live page at a 1440px viewport. Animations are drawn to these
exact boxes, not to a generic canvas.

| Block | Box | Aspect | Status on the live page |
| --- | --- | --- | --- |
| Hero scene (right column) | **576 × 460** | 1.252 | Exists — a static "LIVE BOOK" panel, class `ol-scene` |
| "What moves a price on OMDM" | **1280 × 420** | 3.048 | **Net-new.** The section is a six-card grid with no visual |
| "Built to be audited" | **624 × 440** | 1.418 | **Net-new.** The section is a four-item list with no visual |

The page's content container is 1280px throughout.

### Scoping note

The live page has effectively no animation. The only moving element anywhere on it
is a 361px pulsing gradient blob behind the hero (`olScPulse`); the hero's order
book panel is static markup, and every other section is text and cards. So this is
not a redesign of existing animations — the hero panel is rebuilt and animated, and
the other two blocks are new insertions. Anything added is documented below.

---

## Direction A — INST (institutional)

A dark navy trading surface. The reference points are an exchange terminal and a
settlement report, not a SaaS marketing page. Gold appears only on the instrument
itself — never on chrome, never on body copy.

Exported as `INST` from `js/kit.js`. Stage class `tone-inst`.

| Token | Value | Use |
| --- | --- | --- |
| `ground` | `#0A1122` | Page/panel ground |
| `panel` | `#101A31` | Raised cards |
| `rise` | `#16223D` | Top-left ambient lift, hovered rows |
| `line` | `rgba(255,255,255,0.10)` | Hairline rules, grid |
| `lineHard` | `rgba(255,255,255,0.20)` | Table frame, active borders |
| `text` | `#E8EDF7` | Primary text |
| `dim` | `#8595B4` | Labels, secondary |
| `faint` | `#5A6B8C` | Column headers, timestamps |
| `gold` | `#C8A24A` | The instrument, the venue mark, the chosen price |
| `goldDim` | `rgba(200,162,74,0.22)` | Gold fills, depth bars |
| `up` | `#2FA37A` | Bid side, positive change |
| `down` | `#D85560` | Ask side, negative change |

**Rules**

- Every number is monospace and right-aligned. Prices carry two decimals, always,
  including trailing zeros — `0.80`, never `0.8`.
- Column headers are uppercase monospace at 9–10px with letter-spacing, in `faint`.
- Rules are 1px and never darker than `lineHard`. No drop shadows on a dark ground;
  elevation is expressed by `rise`, not by shadow.
- Radii are tight: 4px on rows and cells, 10px on outer panels. Nothing is pill-shaped
  except a status dot.
- Green and red mean bid and ask, or up and down. They are never decorative.
- Gold is scarce by design. If more than about 8% of the surface is gold, it has
  stopped meaning "this is the instrument".

## Direction B — FIN (fintech-clean)

A light cool surface. The reference points are a modern payments dashboard —
credible and calm, lighter and more approachable than the terminal. No gold, one
accent, more air.

Exported as `FIN` from `js/kit.js`. Stage class `tone-fin`.

| Token | Value | Use |
| --- | --- | --- |
| `ground` | `#F7F9FC` | Page ground |
| `panel` | `#FFFFFF` | Cards, table surface |
| `rise` | `#EEF2F9` | Zebra rows, inset wells |
| `line` | `#E2E8F2` | Hairlines |
| `lineHard` | `#C8D3E6` | Emphasised borders |
| `text` | `#0F172A` | Primary text |
| `dim` | `#5A6880` | Secondary |
| `faint` | `#93A0B8` | Column headers |
| `accent` | `#3B5BDB` | The single accent — CTAs, selected state, the instrument |
| `accentSoft` | `#E7EBFC` | Accent fills, bars |
| `up` | `#0F7A55` | Positive |
| `down` | `#C0343E` | Negative |

**Rules**

- Labels are sans. Monospace is kept for figures only, so numbers still read as data.
- Radii are generous: 8px on rows, 16px on panels. Soft single-layer shadow
  (`0 1px 2px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.05)`) for elevation.
- One accent. A second hue is a bug, not a choice.
- Whitespace does the work the borders do in Direction A — fewer rules, more gap.
- Green and red keep their financial meaning but appear at lower saturation than
  Direction A, because they sit on white.

---

## What carries across both

- The OMDM wordmark treatment, the `OMDM™ — Openline Mobile Data Market` eyebrow,
  and all page copy are unchanged.
- Bid/ask/change/depth is the canonical column order in every table.
- The six signal families ("quality of service, risk, liquidity, terms, coverage,
  counterparty") keep their names and counts.
- Motion is slow and continuous rather than triggered and bouncy: a market does not
  ease-out. Repricing ticks, depth bars breathe, timestamps advance. Nothing
  scales, nothing springs.

## Handover

- Tokens: `INST` and `FIN` in `js/kit.js`
- Stage surfaces: `.tone-inst` and `.tone-fin` in `css/style.css`
- Boxes: `OMDM_HERO`, `OMDM_BOOK`, `OMDM_CTRL` in `js/kit.js`
- Animation sources: `js/omdm-hero.js`, `js/omdm-book.js`, `js/omdm-ctrl.js`
