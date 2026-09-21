# /producthunt — reworded strategy and style notes

Companion to the two new review boards (`phclaim`, `phmodal`). Everything here
is derived from the live page at `openline-revisions-hub.vercel.app/producthunt`,
measured or quoted rather than invented.

---

## 1 · What the live page does, and where it loses people

The page currently asks to be rewarded **four times**: in the hero, on each of
the two route cards, and again in the claim block. Not one of those asks is
attached to a mechanism — every `Claim your reward` button is an anchor that
scrolls to the claim block, and the claim block's own button scrolls to itself.

A visitor who upvotes, returns, and presses the button is shown a paragraph
telling them to press the button.

Three further problems, in order of how much they cost:

| Problem | Where | Why it costs |
| --- | --- | --- |
| No way to submit anything | Whole page | Every action taken before this is fixed is unclaimable |
| The guarantee is buried | `Guaranteed: 10% off, minimum`, inside a card | The single strongest fact on the page is set in small type below a paragraph |
| Percentages never become money | `$1,000` appears once | A ratio is not felt; an amount is compared |
| The fourth ask adds no information | Claim block | By then the offer has been read twice; repeating it in bolder type cannot convert |

## 2 · The reworded strategy

The strategy does not need new incentives. It needs the existing ones stated in
the order a visitor actually decides in: **what will this cost me → what am I
guaranteed → how do I hand it over.** The current page runs that sequence
backwards, leading with the ceiling and burying the floor.

### Headline changes

| Section | Live | Proposed | Why |
| --- | --- | --- | --- |
| Hero | *Help us launch. Get rewarded for it.* | *Help us launch. Nobody does it for free.* | States the guarantee in the first thing anybody reads |
| Hero sub | "anywhere from 10% to the whole thing" | "Ten per cent minimum, up to a free year — worth up to $1,000" | Names the floor first and the money once |
| Two routes | *Two ways in. Both pay.* | keep — it is the best line on the page | — |
| Route 1 | *Upvote & comment* | *Thirty seconds, paid* | Leads with effort, which is the real objection |
| Route 2 | *Post something funny* | *Post something good* | "Funny" narrows the brief and excludes the useful posts |
| Claim block | *Did something? Come and get paid.* | *Send us the link. We set the discount.* | Stops asking a question it already knows the answer to, and instructs |
| Claim block sub | "Comment, review, upvote or post - send us the link and we will set your discount." | "One link is the whole claim. Ten per cent is guaranteed before anyone reads it." | Cost, then guarantee |
| Fine print | *Takes a minute. We read every one.* | *One paste. A person reads every claim, usually within two hours.* | Both halves become checkable |

### Two substantive strategy changes

1. **Issue the floor immediately.** The 10% is guaranteed, so it does not need
   review. Issuing a working code the moment a link arrives means nobody leaves
   empty-handed, and only the judged uplift waits. This is a materially better
   offer than the page currently makes, at no extra cost. See modal option 3,
   *Code On The Spot*.
2. **Drop "no judging" as a phrase.** The live copy says "no judging, no
   lottery" on the guaranteed route while the other route is explicitly judged.
   Naming both lanes plainly — guaranteed and judged — is more honest and
   removes the suspicion that the judged lane can pay nothing. See claim option
   4, *Two Lanes*.

### One thing to fix regardless of which option wins

`one reward per person` is promised and cannot currently be enforced. Only the
Product Hunt sign-in route (modal option 10) can actually check it.

---

## 3 · Measured boxes

| Slot | Box | Source |
| --- | --- | --- |
| Claim block inner | **768 × 360** | measured at 1440px — `max-w-3xl`, `rounded-3xl`, 2px border |
| Claim modal | **560 × 620** | net-new; there is no modal on the live page |

## 4 · Tokens taken from the live page (not invented)

```
orange          #FF5314     button fill, icon tile
orange dark     #E23D00     hover
block ground    rgba(255,83,20,0.04)   →  #FFF3EE flattened
block border    rgba(255,83,20,0.20)   →  #FFD2C0 flattened, 2px
button radius   8px
block radius    24px
font stack      ui-sans-serif, system-ui, …   (system, as live)
```

## 5 · Style elements added by this work — for handover

These do not exist on the live page and would need adding to the design system:

| Token / pattern | Value | Used by |
| --- | --- | --- |
| `--ph-green` | `#12855C` | guarantee confirmations, verified states |
| `--ph-green-soft` | `#E6F5EE` | guarantee panel grounds |
| `--ph-ink` | `#101418` | headings inside animation artwork |
| `--ph-dim` | `#5F6B77` | body copy inside artwork |
| `--ph-faint` | `#98A3AE` | mono eyebrow labels, fine print |
| `--ph-line` | `#E6E9ED` | field and card hairlines |
| Mono eyebrow | mono, 9.5px, 600, `1.3` letter-spacing, uppercase | every panel label |
| Mono numerals | all figures, codes, percentages and amounts | consistency with OMDM |
| Guarantee panel | green ground, tick, 13px 600 text | four options across both boards |
| Claim field | 416 × 50, 10px radius, 1.8px orange stroke when active | every modal input option |

Uppercase is used **only** for mono eyebrow labels inside artwork. No
user-facing sentence is set in uppercase.

## 6 · Motion

All artwork is inline SVG with SMIL — no new dependency, and it honours
`prefers-reduced-motion` through the existing review-app stylesheet.

Two conventions worth keeping if these ship:

- **Reveal window.** Every progressive reveal completes inside the first 45% of
  its loop, so the assembled composition holds for the majority of every cycle.
  A visitor glancing at the block should see the finished argument, not a
  half-built one.
- **Typing.** Text that types itself is animated as progressive substrings, not
  as absolutely-positioned characters. Per-character placement assumes a font
  advance no real font matches, and the result reads as `x. com/paul f l eur y`.

## 7 · Sources

- Live page, content and measurements:
  <https://openline-revisions-hub.vercel.app/producthunt>
- Plan pricing used in the receipt options (Openline Unlimited, 12 months,
  $1,000) is taken from the ceiling figure the live page itself states:
  "Up to: 100% off, worth up to $1,000".
