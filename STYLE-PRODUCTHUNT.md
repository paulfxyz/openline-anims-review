# /producthunt — page redesign, style and handover notes

Companion to `producthunt.html`, `css/producthunt.css` and `js/producthunt-page.js`.
Everything here is derived from the live page at
`openline-revisions-hub.vercel.app/producthunt`, measured or quoted rather than
invented.

The hero is deliberately untouched — same badge, headline, lead, buttons, launch
chip and Kitty portrait, with the original `kitty-ph.png` asset. Everything below
it is rebuilt.

---

## 1 · What the live page does, and where it loses people

The page asks to be rewarded **four times**: in the hero, on each of the two
route cards, and again in the claim block. Not one of those asks is attached to a
mechanism — every `Claim your reward` button is an anchor that scrolls to the
claim block, and the claim block's own button scrolls to itself. A visitor who
upvotes, returns and presses the button is shown a paragraph telling them to
press the button.

| Problem | Where | Why it costs |
| --- | --- | --- |
| No way to submit anything | Whole page | Every action taken before this is fixed is unclaimable |
| The guarantee is buried | `Guaranteed: 10% off, minimum`, inside a card | The strongest fact on the page is set in small type below a paragraph |
| Percentages never become money | `$1,000` appears once | A ratio is not felt; an amount is compared |
| The brief is a single word | "Post something funny" | Excludes the useful posts and tells nobody what qualifies |
| The fourth ask adds no information | Claim block | By then the offer has been read twice; repeating it in bolder type cannot convert |

---

## 2 · The redesign, section by section

| # | Section | Live | Now |
| --- | --- | --- | --- |
| 1 | Hero | as shipped | **unchanged** |
| 2 | — | none | **Guarantee band** — black, `10%` at 44px mono, the floor stated before anything else |
| 3 | Two routes | two cards, guarantee in small orange type | **Two lanes**, explicitly labelled *Guaranteed* and *Judged*, each with what it pays in 30px mono |
| 4 | Gradient bar | flat bar, three captions | **Four rungs**, each priced in money against a $1,000 annual plan |
| 5 | — | none | **How it works** — three steps with real timings (30s, 10s, instant then <2h) |
| 6 | — | none | **What counts** — a nine-row table including the three things that pay nothing |
| 7 | Claim block | a paragraph and a dead button | **Claim** — a two-column shell: the four guarantees on the left, a working paste field on the right |
| 8 | Fine print | two lines under a button | **Fine print** — six questions answered in full, on the dark ground |

### Copy changes

| Section | Live | Now | Why |
| --- | --- | --- | --- |
| Two routes | *Two ways in. Both pay.* | *Two lanes in. Both pay.* | "Lane" is the word the rest of the page now uses |
| Route 1 | *Upvote & comment* | *Thirty seconds, paid* | Leads with effort, which is the real objection |
| Route 2 | *Post something funny* | *Post something good* | "Funny" narrows the brief and excludes the useful posts |
| Claim block | *Did something? Come and get paid.* | *Send us the link. We set the discount.* | Stops asking a question it knows the answer to, and instructs |
| Claim sub | "Comment, review, upvote or post - send us the link and we will set your discount." | "One paste is the whole claim. Ten per cent is guaranteed before anyone reads it." | Cost, then guarantee |
| Fine print | *Takes a minute. We read every one.* | *A person reads every claim, usually within two hours* | Both halves become checkable |
| — | "no judging, no lottery" | dropped | The other lane is explicitly judged; naming both lanes plainly is more honest |

### Two substantive strategy changes

1. **The floor is issued immediately.** The 10% is guaranteed, so it does not need
   review. A working code appears the moment a link arrives, and only the judged
   uplift waits. Nobody leaves empty-handed, at no extra cost. Stated three times
   on the page and enforced by the modal.
2. **Review can only raise the tier.** Said explicitly in the guarantee band, the
   claim block, the modal and the fine print. It removes the suspicion that the
   judged lane can pay nothing.

`one reward per person` is promised on the live page and cannot currently be
enforced. The claim copy now says it is checked against the Product Hunt account
on the submitted link, which is the only check that is actually possible.

---

## 3 · The claim mechanism

Three states inside one modal, 560px wide, with a progress rail:

1. **Paste** — lane picker (Product Hunt / a post elsewhere), link field, email
   field, and the guarantee restated in a green note. Both fields validate
   inline.
2. **Checking** — three rows tick through in about two seconds, captioned as: the
   link opens publicly, it mentions Openline, it is the first claim from that
   account. No human is in this loop. **In this build nothing is actually
   checked** — the three rows are a fixed 430ms cadence and their `0.3s / 0.6s /
   0.9s` timings are captions, not measurements.
3. **Issued** — a working `PH-10-XXXXXX` code in a dashed green panel with a copy
   button, plus an orange *under review, uplift only* panel explaining that a
   larger code may replace it and that this one keeps working either way.

The inline field in the claim block hands straight to the modal with the link
already filled in and focus on the email field, so the paste is never repeated.

Escape closes, focus is trapped inside the dialog, focus returns to the trigger,
and the sheet slides from the bottom below 560px.

### What a real build needs

| Endpoint | Does |
| --- | --- |
| `POST /api/ph-claim` | takes `{ link, email, lane }`, runs the three checks, issues and returns a 10% code, queues the claim for human review |
| `POST /api/ph-uplift` | internal — sets the final tier, emails the replacement code, never lowers the issued one |

### What is not real in this build

The flow can be driven end to end without a backend, which is what makes it
reviewable. Be precise about the cost of that, because the page states things to
the visitor that are not true yet:

| Claim the page makes | Reality in this build |
| --- | --- |
| A working `PH-10-XXXXXX` code | `Math.random()` in `js/producthunt-page.js`. Not recorded anywhere, so it cannot be redeemed. |
| "We have emailed a copy to …" | No email is sent. Nothing leaves the browser. |
| Three automatic checks on the link | Nothing is fetched or validated. A fixed timer. |
| "Nothing else is stored" | Technically true — nothing is stored at all, including the claim. |

**Validation only checks URL shape.** `isLink()` is
`/^https?:\/\/[^\s.]+\.[^\s]{2,}$/i`, so `https://example.com` is accepted while
the Product Hunt lane is selected and issues a code. The lane picker changes
nothing about validation. If the lanes are meant to mean different things, the
Product Hunt lane should at minimum require a `producthunt.com` host — a product
decision, not an oversight to paper over in the prototype.

Nothing here blocks a design review. All of it blocks putting the page in front
of real claimants.

---

## 4 · Tokens taken from the live page (not invented)

```
orange          #FF5314     button fill, icon tile, accent type
orange dark     #E23D00     hover
block ground    rgba(255,83,20,0.04)   →  #FFF3EE flattened
block border    rgba(255,83,20,0.20)   →  #FFD2C0 flattened, 2px
button radius   8px
block radius    24px  →  22px / 28px in this build
font stack      system sans, as live
hero gradient   orange-50 → white
```

## 5 · Tokens added by this redesign — for handover

| Token | Value | Used by |
| --- | --- | --- |
| `--ink` | `#0B0B0F` | headings, guarantee band, fine-print ground |
| `--dim` | `#5F6B77` | body copy |
| `--faint` | `#98A3AE` | mono eyebrows, fine print, table keys |
| `--line` | `#E6E9ED` | card and field hairlines |
| `--green` | `#12855C` | the guaranteed lane, issued codes, confirmations |
| `--green-soft` | `#E6F5EE` | guarantee grounds, code panel |
| `--green-line` | `#BCE3D2` | code panel border |
| Mono eyebrow | mono, 10.5px, 700, `0.14em`, uppercase | every section label |
| Mono numerals | all percentages, amounts, codes and timings | consistency with the OMDM page |

Green is the one genuinely new colour. It carries a single meaning throughout —
*this is guaranteed and already yours* — and is never used decoratively.

## 6 · Measured boxes

| Slot | Box | Source |
| --- | --- | --- |
| Claim shell | **1152 × 540** | `--wrap` 1200 less 2×24 padding, at 1440px |
| Claim modal | **560 × auto** | net-new; there is no modal on the live page |
| Kitty portrait | **420 × 420** | matches the live 584px asset scaled into the grid |

## 7 · QA

Checked at 1440px and 390px: no horizontal overflow, no console errors, both
field validations fire, the three modal states advance, the code copies, Escape
closes, and focus is trapped and returned. `prefers-reduced-motion` collapses
every transition.

Re-verified 2026-09-21, in a browser rather than by reading the code — all of the
above still holds. Measured this round: focus stays inside the dialog across 12
`Tab` presses and 8 `Shift+Tab` presses, focus returns to the exact trigger
button on Escape, the inline field hands the link to the modal, both validation
messages block submission, and the mobile sheet fits the 844px viewport exactly
(390 × 750, flush to the bottom).

**Fixed this round:** the rung headings and the six FAQ headings were `<h4>`
directly under an `<h2>`, skipping a level twice. They are now `<h3>`, with
`.rung h3` / `.fq h3` in the stylesheet; computed size and weight are unchanged
(16.5px/700 and 16px/700), so the fix is structural only.
