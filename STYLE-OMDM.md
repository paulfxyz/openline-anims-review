# OMDM — style and animation notes

Everything net-new introduced for the `/omdm-market` redesign, for handover. The
live page ships with no animations at all (only a 361px pulsing blob), so every
moving element here is new and every token below needs adding to the design
system before this goes to production.

Surface decision: **the page is fintech-clean only.** Light ground, one blue
accent, no navy and no gold. Everything in this document describes that surface.

This is a decision about *the page*, not about the review. The three OMDM review
boards deliberately carry both directions so the choice stays arguable — in
`js/omdm-book.js`, `js/omdm-hero.js` and `js/omdm-ctrl.js`, options 1–5 are
institutional (`INST` — navy ground, gold accent) and options 6–10 are
fintech-clean (`FIN`), with options 11–15 added later across both registers.
An earlier version of this document said the institutional direction had been
"explored and dropped", which contradicted the code and is corrected here: it is
not used *on the page*, and it is still on the boards for comparison.

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

## 3 · The five purpose-built animations

All five live in `js/omdm-anims2.js` and are used only by the page, never by the
review boards. Every slot on the page is drawn for the box it occupies and for
the copy beside it.

**None of the five carries production data.** Each one's figures are literal
arrays or hard-coded constants chosen to make the argument legible, and each
states this in its own `cons`. Before this page ships, every number below needs
replacing with a real series, and the claim each animation makes needs to be
defensible on that real data.

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

### `heroBook` — 576 × 460 · hero

The order book the page describes, quoting on a single clock. Ten reprices per
loop, one route at a time: the row lights, its bid and ask move, the change cell
is **computed from that move rather than asserted**, depth adjusts with it, and
the footer names the route that just repriced and what it did. Bid and ask are
set in neutral text — green and red carry direction of movement, which is what
they mean in a book.

Because every cell derives from one event, nothing on the stage can contradict
anything else. Five routes is a small book; a real feed is needed to keep it
truthful in production.

### `depthNarrows` — 576 × 460 · who trades

The block makes one claim — a deeper book prices better for everyone standing in
it — so that is what this draws. Six counterparties arrive one at a time (a
Tier-1 operator, a buyer, a competing aggregator, an enterprise fleet), with the
best bid rising and the best ask falling as each joins. The spread closes from
`0.11` to `0.04`, and the closing line makes the point explicit: the improvement
belongs to everyone, **including the competitor who caused it**.

Spread figures are illustrative. Six rows is tight at this height.

### `auditTrail` — 624 × 440 · controls

The trail the caption describes, doing what the caption says. Five entries
append in sequence, and each shows the previous entry's seal as its own input,
with a link drawn between them — so removing a line visibly breaks every line
after it. The third entry is a **match refused** because the counterparty sits
below the minimum standing the route requires, which is the one control the page
asserts and otherwise never shows.

Five lines is a small sample, and hash chaining needs a plain-language gloss for
non-technical readers.

---

## 4 · Why the page reuses no board variants

An earlier draft mounted three review-board variants directly (`finBoard`,
`bothSidesVerified`, `reconciled`) so a decision made in the review would carry
through without re-drawing. **That is no longer true and the approach was
abandoned.** Every slot is now purpose-built in `js/omdm-anims2.js`.

The reason is recorded in `js/omdm-page.js`: the board variants were argued for a
different frame, and next to this page's copy they contradicted their own
captions. A board variant is built to win an argument about *how to animate a
section*; a page slot has to demonstrate the specific sentence printed beside it.
The two briefs pull apart, and when they did, the caption lost.

The practical consequence for handover: **choosing a variant on an OMDM review
board does not change the page.** The boards decide the direction; the page
slots are then drawn to match it. Swapping a slot still means editing `PLAN` in
`js/omdm-page.js`, but the thing you swap in has to be built for that box and
that copy first.

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

### Arithmetic check, 2026-09-21

Every figure the five stages display was recomputed from the source arrays. All
of it foots:

- **`venueCost`** — `MARKET` averages `0.6817`, shown as `0.68`. Exactly 11 of 12
  months sit below the `0.79` card, matching `11 OF 12 OVERPAID`. `0.79 − 0.6817
  = 0.1083/GB × 1000 = $108.33/TB`, shown as `$108/TB`.
- **`bookFlow`** — the six counts are `31/18/24/12/15/9 = 109`, matching the real
  figures above, in the documented order. `0.79 + 0.04 + 0.02 − 0.06 − 0.03 +
  0.01 − 0.02 = 0.75`, matching `YOUR QUOTE`. Base and quote both sit inside the
  declared `0.70–0.87` axis.
- **`heroBook`** — every `CHANGE` cell is the actual percentage move of that
  row's ask, so the claim that the cell is derived rather than asserted holds.
- **`auditTrail`** — the hash chain `9f2c → 4a71 → c0d8 → 71be → e35a` is
  consistent, each entry carrying the previous seal.
- **Cross-stage** — `DE · Tier-1` agrees across three stages: the hero asks
  `0.67–0.68`, the venue says the market averaged `0.68`, and the parts band
  `0.54–0.69` contains both. That consistency is deliberate; keep it.

### Two content problems

1. **`JP · Tier-1` contradicts itself across two adjacent sections.** The hero's
   live book shows JP · Tier-1 asking `0.89–0.90` USD/GB. `bookFlow` then prices
   the same route in the same unit and lands on `YOUR QUOTE 0.75` — 19% apart. A
   reader who reads the hero and the book in order sees one route quoted two
   ways. Cheapest fix is to move `bookFlow` onto a route the hero does not list;
   the alternative is to reconcile the numbers. **Unresolved — needs a decision.**
2. **`Segregated settlement` is never demonstrated.** Three of the four
   documented controls appear in `auditTrail` (KYB re-verification, minimum-level
   enforcement via the refused match, and the immutable trail itself). The fourth
   shows only as `Settled · T+0`, which is settlement *timing*, not segregation.

The `venueCost` tagline previously read "23% too high by September". The card is
29.5% above the September market and the market is 22.8% below the card; the
tagline used the second base to describe the first thing. Corrected to "29% above
market by September", which names its base.

---

## 5b · Localisation status — read before promising a translated page

Audited 2026-09-21 by pseudo-localising every string in a browser and measuring,
not by reading the code. **The layout survives translation; the plumbing does not
exist.** Treat this section as the work item, not as a caveat.

### What the five stages put on screen

267 SVG `<text>` nodes, of which **154 are translatable prose or labels** (the
rest are numerals, route codes and hashes). None of it goes through any
translation layer — there is no `i18n`, no message catalogue and no `Intl` use
anywhere in `js/omdm-anims2.js`. The English sits inline in `build()` template
literals (21 call sites) and in three module-level data arrays (`STEPS`, `TRAIL`,
and the parties list). **Extracting those into a catalogue is the whole job**;
nothing else about these animations resists translation.

### Layout headroom, measured

Every string was expanded with accented pseudo-text and the frozen end-state
re-measured for overflow past the frame and for label collisions:

| String growth | Overflow | Collisions |
| --- | --- | --- |
| +15% | 0 | 0 |
| +30% (typical de/fr) | 1 | 0 |
| +40% | 1 | 0 |
| +60% | 1 | 1 |

That is far better than expected, because most labels are short mono uppercase in
generous panels. The two that do break:

- **`auditTrail` footer** — as one line it left the 624 box at +30%. **Fixed:**
  split into two lines at the em dash, which raises its headroom past +100%.
- **`depthNarrows` row description** — `Buying at market, not a rate card` runs
  into the right-hand `BUYS` badge at +60%. Not fixed; it needs either a shorter
  source string or the badge moved onto its own line. Only bites for the longest
  compounding languages.

### What will still be wrong after the strings are translated

These are not layout problems, so the table above does not catch them:

| Issue | Count | Why it matters |
| --- | --- | --- |
| `.toFixed()` for every numeral | 97 | Hard-codes `.` as the decimal separator. `0.79` must render `0,79` in fr/de/pt — the three markets this page is most likely to need. |
| Hard-coded month abbreviations | 25 | `OCT NOV DEC` is already wrong in German (`OKT`, `DEZ`). Needs `Intl.DateTimeFormat`. |
| Hard-coded `USD` and `$` | 4 + the `$108/TB` readout | Currency code, symbol and symbol *position* are all locale-dependent. |
| English `aria-label` on each stage | 5 | A translated page would still announce every chart in English to a screen reader. |
| `.toUpperCase()` | 3 | Locale-unsafe: Turkish dotted/dotless `i`, German `ß` → `SS`. Needs `toLocaleUpperCase(locale)`. |
| Absolute `x`/`y` with `text-anchor` | throughout | Nothing mirrors for RTL. An Arabic or Hebrew rendering needs a mirrored layout per stage, not a translated catalogue. |

`$108/TB` also assumes **1 TB = 1000 GB** (it is `0.1083 × 1000`). That is the
correct decimal convention for wholesale data, but it should be stated rather
than inferred, and a binary-TB reading would give `$110.93`.

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
- **Reduced motion is handled in JS, not CSS.** `freezeAtEnd()` in
  `js/omdm-page.js` seeks each stage to the end of its longest loop with
  `setCurrentTime()` and then calls `pauseAnimations()`, so a reader who prefers
  reduced motion gets the same held end-state a visitor sees when the loop
  completes.

  The obvious CSS approach — `display: none` on the animation elements — was
  tried first and is wrong. It stops the motion, but it reverts every animated
  attribute to its **base** value, which is the state each stage *starts* in.
  Three of the five stages lost their argument that way: the venue chart ended
  at July with none of its three readouts, `depthNarrows` showed two of six
  counterparties and the opening `0.11` spread instead of the closing `0.04`,
  and `auditTrail` showed two of five entries, omitting the refused match that
  is the only control the page actually demonstrates. **Do not re-add a
  `prefers-reduced-motion` rule to `css/omdm.css`** — `display: none` wins over
  the freeze and reinstates the bug.
- Each stage SVG carries `role="img"` and an `aria-label` describing what it
  shows.
- Every `keyTimes` sequence ends at `1` and matches its `values` length — Chrome
  rejects the animation outright otherwise, and it fails silently.
