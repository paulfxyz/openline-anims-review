# OMDM — style and animation notes

Everything net-new introduced for the `/omdm-market` redesign, for handover. The
live page ships with no animations at all (only a 361px pulsing blob), so every
moving element here is new and every token below needs adding to the design
system before this goes to production.

Surface decision: **fintech-clean only.** The institutional / navy direction was
explored and dropped. Nothing in this document describes a second surface.

---

## 1 · Tokens

Declared once on `:root` in `css/omdm.css`. Light ground, one blue accent,
monospaced numerals throughout. Numbers are data and must never be set in the
body sans.

| Token | Value | Use |
| --- | --- | --- |
| `--ground` | `#F7F9FC` | page ground |
| `--ground-2` | `#FFFFFF` | alternating band ground |
| `--panel` | `#FFFFFF` | cards, stages |
| `--rise` | `#F1F5FB` | inset rows inside a card |
| `--line` | `#E2E8F2` | hairlines, card borders |
| `--line-hard` | `#C8D3E6` | axis rules, ghost bars |
| `--text` | `#0F172A` | primary text |
| `--dim` | `#5A6880` | body copy |
| `--faint` | `#93A0B8` | mono eyebrows, captions |
| `--accent` | `#3B5BDB` | the one accent — CTAs, downward deltas, the quote |
| `--accent-soft` | `#E7EBFC` | accent pills and washes |
| `--up` | `#0F7A55` | upward adjustment |
| `--down` | `#C0343E` | cost, loss, the gap |
| `--r-card` | `16px` | cards |
| `--r-stage` | `18px` | animation stages |
| `--shadow` | `0 1px 2px rgba(15,23,42,.06), 0 8px 24px rgba(15,23,42,.05)` | all raised surfaces |

The SVG animations repeat these as a literal `C` object in
`js/omdm-anims2.js` rather than importing them, so a board edit elsewhere in the
review app cannot change the page's artwork. **If a token changes, change it in
both places.**

### Rules

- One accent only. Blue carries CTAs, the final quote, and downward price
  movement. Green is reserved for upward adjustments. Red is reserved for cost.
- Every number is mono. Every label is mono uppercase with `0.14em` tracking.
- No gradient fills on data. The only gradients on the page are the two ambient
  radial washes behind the hero and the access block.
- Axis truncation must be declared. Both charts label their minimum value.

---

## 2 · Measured boxes

Animations are drawn at the box they occupy, never scaled to fit.

| Slot | Box | Origin |
| --- | --- | --- |
| Hero | **576 × 460** | measured from the live page (`.ol-scene`) |
| Why a market | **704 × 420** | net-new — sized to the two-column grid |
| The book | **1280 × 420** | net-new — full content width |
| Who trades | **576 × 460** | matches the hero box |
| Controls | **624 × 440** | net-new |

The stages hold their aspect ratio with `aspect-ratio` and the SVG scales inside,
so the artwork is resolution-independent but never reflows.

---

## 3 · The two purpose-built animations

Both live in `js/omdm-anims2.js` and are used only by the page, not by the
review boards.

### `venueCost` — 704 × 420 · 10s loop

Twelve months of DE · Tier-1 against a rate card signed once in October. The
market line drifts cheaper through the year, the rate card doesn't, and the gap
between them is shaded in `--down`. Ends on three readouts: what was paid, what
the market averaged, and the difference per terabyte.

Timeline: reveal completes at 40%, the gap is named at 42%, readouts land at
46 / 52 / 60%. The remaining 40% of the loop holds the finished state, so anyone
scrolling past sees the conclusion rather than a half-drawn chart.

Data is a literal array (`MARKET`) and must be replaced with a real series
before production. The claim it makes — that wholesale capacity gets cheaper
through a contract year — has to be defensible.

### `bookFlow` — 1280 × 420 · 12s loop

A waterfall from the wholesale base rate to the quote. Eight columns: base rate,
six family adjustments, final quote. Each family column carries its name, signal
count, signed delta and a one-line reason that appears beneath the chart while
that step is active.

Deltas are representative, not live: `+0.04 +0.02 −0.06 −0.03 +0.01 −0.02`
applied to a `0.79` base, giving `0.75`.

The six columns are ordered identically to the six family cards below the chart,
and each card repeats its own delta and takes a left rail in the matching colour
(`--up` or `--accent`). **If the step order changes in one place it must change
in the other** — that one-to-one mapping is the whole point of the block.

Y axis runs `0.70`–`0.87` and the bars are truncated to it. The minimum is
labelled on the axis and the range is stated in the top-right header.

---

## 4 · Reused board variants

Three slots pull the fintech-clean variant straight from the review boards, so a
decision made in the review carries through to the page with no re-drawing:

| Slot | Variant | Board file |
| --- | --- | --- |
| Hero | `finBoard` | `js/omdm-hero.js` |
| Who trades | `bothSidesVerified` | `js/omdm-hero.js` |
| Controls | `reconciled` | `js/omdm-ctrl.js` |

Swap a slot by changing `PLAN` in `js/omdm-page.js`. Nothing else needs touching.

---

## 5 · Content that is real and must not be re-invented

Taken verbatim from the live page. The earlier draft of this redesign carried an
invented "104 signals" and wrong family names; these are the correct figures.

**109 signals in six families:**

| Family | Count | Signals named on the live page |
| --- | --- | --- |
| Quality of service | 31 | Live throughput, Attach success, Latency percentiles, Congestion windows |
| Geopolitical & climate risk | 18 | Sanctions exposure, Regulatory change, Grid stability, Severe weather |
| Pricing & spread | 24 | Wholesale rate, Competing quotes, Volatility, Bid-ask spread |
| Liquidity arrangements | 12 | Upfront vs deferred, Settlement window, Commitment size, Credit terms |
| Compliance & counterparty | 15 | KYC/KYB status, Minimum level held, Jurisdiction, Audit trail |
| Tier & standing | 9 | MNO, Full MVNO, MVNO-reseller, Reseller |

**Four controls:** KYC and KYB before quoting · Minimum level enforcement ·
Immutable audit trail · Segregated settlement.

---

## 6 · Structural changes from the live page

- **"A rate card is a guess" is promoted.** It was a subheading buried inside the
  venue section; it is now the section's headline, carrying the chart that proves
  it. It is the strongest line on the page.
- **The three venue claims became a list, not cards.** Beside a 704-wide chart,
  three boxed cards competed with it. Rules and a bullet let the chart lead.
- **The book section splits its header across the width** so the chart gets the
  full 1280 without a column of empty space above it.
- **The six family cards now carry their own delta** and tie visually to the
  waterfall column above them.
- **Copy rewritten throughout.** The original mixed metaphors and asserted things
  it did not show. Every section now states one idea and the animation beside it
  demonstrates that idea.

---

## 7 · Accessibility and performance

- All motion is declarative SMIL inside inline SVG. No JS animation loop, no
  `requestAnimationFrame`, nothing to clean up on unmount.
- `@media (prefers-reduced-motion: reduce)` disables every `animate`,
  `animateTransform` and `animateMotion` inside a stage, leaving the final
  composition legible as a still.
- Each stage SVG carries `role="img"` and an `aria-label` describing what it
  shows.
- Every `keyTimes` sequence ends at `1` and matches its `values` length — Chrome
  rejects the animation outright otherwise, and it fails silently.
