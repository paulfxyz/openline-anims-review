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
  (`qa/support/chat.js`) — fresh guest welcome, local history, composer with files (pick, drop, paste), voice notes (MediaRecorder,
  demo fallback), simulated replies, and a collapsible panel: WhatsApp / Instagram / Messenger / email,
  "Ask an AI about us" (ChatGPT, Claude, Perplexity, Gemini, Grok, Copilot, Le Chat, clipboard handoff), KB and
  compatibility. The badge opens it on every /qa page.
- **Help modals** `/qa/kb`: the knowledge-base and device-compatibility modals (`qa/support/support.js`) on the
  real open-source data (`qa/data/kb-articles.json` from openline-kb, `qa/data/devices.js` from openline-check;
  search engine `qa/support/search.mjs` from openline-kb). Opened by `data-ol-open` markup, `#kb` / `#compat=`
  hashes, `Openline.open()`, or ⌘K; the page documents each with live examples.
- Home › Why choose: board embed is now the real 407 × 302 slot; 3 · The Handover redrawn for it.
- **Page menu**: the page name in the bottom dock opens a filterable list of all 21 pages plus the tools
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

The earlier About and Contact alternatives are retained, together with the
separately requested Product Hunt redesign added to QA on October 4. The later batch of
16 alternatives was removed at Paul's request, including its generator and
dedicated assets. The review now contains 18 original product pages plus these three
redesigns. Shared typography, page identities, modal/chat tools and the Openline+
nomad animation fixes are preserved. No `/delivery` has been created.

### /qa/producthunt: existing redesign in context

The existing [Product Hunt redesign](https://openline-anims-review.vercel.app/producthunt) now has a
QA route at `/qa/producthunt`. The root source page, stylesheet, script and Kitty asset are untouched.
Run `python3 qa/tools/producthunt.py` to rebuild the QA copy and combined page stylesheet.

- Preserves the existing design and page sections rather than creating another alternative.
- Adds the shared dock/page menu, page-level panel notes, full change export, colour preview and support.
  The navigation has 21 entries: 18 original pages and three explicitly retained/requested redesigns.
- Uses the actual Openline mark and native UI stack. Decorative monospace styling is normalised;
  coupon strings stay monospaced. CTA arrows use the same subtle motion and reduced-motion fallback.
- Marks the campaign as a draft and replaces “Launching this September” with an unconfirmed launch-date
  label rather than guessing a new date. Rewards, example pricing, eligibility, review timing and
  platform-policy compatibility remain unapproved campaign concepts.
- The QA-only native claim dialog validates URL/email format, checks the Product Hunt hostname for
  that lane, and animates a simulated review. It generates only a visibly non-redeemable `DEMO-PH-10-…`
  string. No proof link is opened, no email/reward is sent, and no claim details enter storage or a backend.
- Closing cancels pending work; clipboard denial gets selectable fallback text, not a false “Copied”
  confirmation. Modal state headings, focus containment, keyboard access and mobile layout are tested.

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

#### Final profile handoff

- `qa/start-profile.js` / `start-profile.css` extend the final stage into **eSIM details → Setup & connect
  → Make it yours → account handoff**. The success card's primary action starts this flow; details and
  label/folder remain directly accessible and editable.
- Details show a QR image, copyable SM-DP+ address, activation code, full LPA string, ICCID and internal
  Openline profile ID. The sample does not require a confirmation code. EID is explicitly unlinked:
  it belongs to the device's eSIM chip, not the subscription profile; see the
  [GSMA consumer eSIM architecture](https://www.gsma.com/solutions-and-impact/technologies/esim/wp-content/uploads/2024/09/SGP.21-v2.6.pdf).
- `qa/tools/start_demo_qr.py` generates a genuine QR image whose payload is a harmless QA notice, not
  an LPA installation string. The separately displayed manual credentials use the reserved `.invalid`
  domain and an explicit NOT-INSTALLABLE token. All IDs are fictional; no real profile can be installed.
- Device-specific instruction summaries use existing KB articles 17/18/20/21/22 and article 8's
  connection checklist. The full guide opens `/qa/installation-guide#ig-install-steps` in a new tab,
  preserving its layout and animation. Manual iPhone installation terminology is consistent with
  [Apple's setup guidance](https://support.apple.com/en-gb/118669). The prototype keeps the requested
  immediate-validity rule separate from installing/enabling the line at the destination.
- An optional label, existing sample folder or newly named folder update the visible profile. Only
  `{label, folder}` is session-stored under `openline-qa-profile-organisation-v1`, never codes,
  installation credentials or the plan state. Storage failure is disclosed and retains an in-memory
  result. Reset preview clears this demo organisation state.
- The completion screen shows the saved label/folder and links to the existing `/qa/login` sign-in
  preview. It does not claim real account saving, successful phone installation or network connection.
- The final handoff is recorded separately in the global QA manifest/export. This completes the
  review prototype of the purchase-code activation journey; no `/delivery` or account backend was added.

### About redesign refinements

- Network Technology / The Most Reliable Connection: scoped heading styles resolve the generic
  `.rd-card p` cascade that flattened the comparison headings and removed their list spacing.
  Both card bodies now have balanced desktop/mobile padding and consistent bullet spacing.
  The SVG illustrations, geometry and motion are unchanged.
- Open Startup is a locked, coming-very-soon disclosure. Show / Hide results preview is a real
  keyboard-accessible button, expanded by default; every value remains a locked placeholder.
  The former sample financial/user values and Live badges were removed from this section rather
  than hidden with CSS, so expanding never presents fabricated metrics as actual results.
- Team locations are New York, Lisbon, Warsaw, Ankara, Bristol, Berlin, Paris, Singapore and Bali.
  Location badges replace invented employee initials; the footer says “Nine locations, one team.”
  Local clocks use native `Intl.DateTimeFormat` with IANA zones, including
  [Asia/Makassar for Bali](https://time.is/Bali,_Bali),
  [Europe/Istanbul for Ankara](https://time.is/Ankara) and
  [Europe/London for Bristol](https://time.is/Bristol).
  The selected team animation and original About comparison page are unchanged.
- These three refinements have separate entries in `qa/change-log.js` and the full QA export.

### Contact and installation refinements

- Contact redesign: WhatsApp `https://wa.me/15554842461`, Instagram `askopenline`,
  Messenger / Facebook `askopenline`, email `ask@openline.com`. A separate hotline card sits below
  24/7 Global Support, labelled **Coming soon**, displaying `+1 (8) 123 - ONLINE` without a `tel:` action.
- All three support-process steps are keyboard-clickable and seek the SVG's own timeline. The
  loop continues; pressed states follow the current scene. Reduced motion keeps manual seeking.
- `qa/tools/installation_preflight.py` replaces only the two blocks in the marked installation
  screenshot: purchase-code/profile explainer and four-step roadmap. Source is
  `qa/redesign/installation-preflight.html`; CSS is scoped `.igp-*`. The rest of the captured HTML
  and selected installation animation are preserved. Runtime only adds section-anchor IDs.
- Content handoff issue: the existing installation guide says activate at destination; the requested
  /start prototype warns that validity starts immediately. Product must resolve this policy distinction
  before production rather than silently changing unrelated guide copy during a targeted design edit.

### Chat refinements and safe prototype boundaries

- Chat branding now uses the actual Openline mark (`qa/assets/start-brand-mark.png`) in the header,
  animated welcome and Gary's AI avatar, rather than the earlier hand-drawn ring and sparkle.
- Seven [CC0 Pravatar placeholder portraits](https://pravatar.cc/) sit in a single centred row above
  “Here to help you stay connected” in both fresh and existing conversations. They are explicitly
  illustrative, not real employee identities or availability signals, and are served locally from
  `qa/assets/support-portraits/`. Their order is shuffled once per opened chat, not on each render.

- Collapsed sidebar is one full-height button, including its arrow and decorative channel icons.
  Expanded arrow and header icon also toggle it. Hidden content is inert and expanded state is exposed.
- Nine editable AI prompts (the previous four plus phone readiness, data estimate, multi-country
  travel, no-connection troubleshooting, gifting/activation). Every provider opens a native handoff
  dialog and attempts clipboard copying. Success is only stated after the promise resolves;
  denied permission leaves selectable text and a retry. No query-string prompt or chat transcript is sent.
- Official web interface launch destinations checked on 2026-10-03:
  [ChatGPT](https://chatgpt.com/), [Claude](https://claude.ai/new),
  [Perplexity](https://www.perplexity.ai/), [Gemini](https://gemini.google.com/app),
  [Grok](https://grok.com/), [Copilot](https://copilot.microsoft.com/),
  [Le Chat](https://chat.mistral.ai/chat). Standard HTTPS links defer any installed-app handling to the OS;
  an installed app cannot be reliably detected or forcibly launched from this browser preview.
- Provider favicons/logos are stored locally under `qa/assets/ai/`. ChatGPT, Claude, Gemini, Grok and
  Copilot use their published icon assets; Perplexity and Le Chat use Google's cached site favicon
  because those public source pages blocked retrieval. These identify external services, not Openline partners.
- “Clear chat” requires confirmation, defaults to keeping the chat, explains intended live deletion /
  issue-solved semantics, and explicitly discloses that this prototype only clears local data.
  No server deletion API or actual ticket closure is connected. Clearing cancels pending replies,
  stops recordings/playback, releases attachments and returns to an animated guest welcome with Gary's greeting.
- New visitors also begin at the welcome. Saved conversations remain until explicitly cleared.
  The preview labels simulated replies; it does not claim an actual assigned agent or server-encrypted session.

### Redesign button parity

- Compared the retained redesigns to the live [Openline About page](https://openline.com/about) and
  original captures. Main actions use the native UI family at 16px / 24px, weight 500; compact contact
  actions and mobile purchase buttons use 14px. Button icons are 16px; the quiet partner link uses
  14px type and a 12px icon. Corners are 8px, with 8px base gaps and source-like horizontal insets.
- Right-arrow shapes match the current source. Only the arrow shifts 4px over 150ms with the source
  cubic-bezier(.4,0,.2,1); labels stay stationary and the previous whole-button lift is removed.
  The same feedback works for keyboard focus and press, while reduced motion stays static.
- Main desktop buttons follow the 40px baseline and compact channel buttons 36px; mobile tap targets
  remain at least 44px. Purchase CTAs use the source-style “Buy eSIM Now” mobile label and a compact
  country badge, preserving the existing QA copy's 190+ count. The badge hides on the narrowest screens
  rather than shrinking the action text or overflowing its container.
- Button typography/dimensions remain scoped to About and Contact redesign actions, not navigation
  menus, disclosure chevrons or selected illustrations.
- The same arrow treatment also applies to `/qa/start`, including its final profile dialogs, back
  links, guide/account links and QR download. Forward/back arrows nudge 4px; diagonal and downward
  arrows move in their own direction over the same 150ms curve. Loading/disabled states and reduced
  motion stay static. The check-code button restores its SVG after loading and errors.
  `/start` keeps its existing larger inputs, button sizes, type hierarchy and activation animations.

### Connectivity copy and profile flexibility

- On 2026-10-04, the marked Multi Tier-1 warning/probability block was replaced with
  a two-route explainer: selecting a network within the current eSIM, or occasionally
  issuing a whole replacement profile to change the underlying provider and service stack.
  The same prominent section replaces Unlimited's former competitor-throttling comparison.
- This follows Paul's supplied operating principle for multi-network access and unlimited usage.
  Both pages disclose that replacement should be uncommon, may require installation or enabling
  a new profile, and is part of maintaining service. The unsupported 90% / 10% split and fixed
  30-second replacement claim are gone, as is the instruction to remove a working profile first.
- `qa/connectivity-copy.json` records 45 Multi Tier-1 and 53 Unlimited before/after changes.
  Run `python qa/tools/connectivity_copy.py` to apply them idempotently, rebuild the shared section
  from `qa/redesign/profile-switching.html` and `qa/profile-switching.css`, and regenerate
  `qa/connectivity-changes.js` and `qa/connectivity-changelog.md`.
- Hero, feature, checklist, process and closing copy distinguish usage from speed and availability.
  No guarantee of continuous maximum speed, congestion-free service, always-cheapest routing or
  setup-free profile replacement is added. Unlimited's former red competitor-failure rows are now
  neutral grey customer-use rows with circle markers. The selected Operator Roster labels are adjusted
  in the QA adapter only; the selected animation choices, motion and original review boards remain.
- The section has stable text, a gentle connector animation, responsive cards, reduced-motion support,
  and crosslinks between the two explanations. It is not a provisioning workflow. Silent installation,
  zero interruption, balance/validity carry-over, notification policy and replacement charges remain
  product/implementation questions, not promises made by this prototype.
- The QA panel and hub include a new-entry record plus a separate copy record for each page, expandable
  before/after rows and a full changelog link. The same entries appear in the global Markdown and
  machine-readable exports, separately from animation picks.

### Global eSIM orange default

- `/qa/global-esim` now selects an Openline-orange page identity by default, including pale colour
  washes, icon tiles and contextual SVG/JS animation colours previously blue, purple or green.
  The page-specific mapper also recolours green status accents here; their labels preserve meaning.
- Neutral surfaces, photographs and raster partner logos are preserved. Other page identities,
  including the selected IoT Chrome treatment, are unchanged. The panel toggle still allows comparison,
  and the selected default / current toggle state are included in the export.

### Unlimited plan clarification for Irina

- Paul's subsequent 2026-10-04 clarification supersedes the earlier generic Unlimited wording:
  fixed packages guarantee every purchased GB at full available network speed with no usage-based
  throttling. A 10 GB purchase means all 10 GB at full speed. Unlimited plans have no Openline-imposed
  cap or throttling, but remain subject to local MNO fair-use rules, including possible temporary
  slowdown after heavy data use within 24 hours.
- Fixed packages are explicitly recommended when avoiding throttling is the priority. For frequently
  throttled unlimited plans, Openline will try another eSIM profile/provider infrastructure whose
  fair-use policy may better fit the location and usage. Better performance or freedom from future
  throttling is not guaranteed. No universal threshold, recovery period or midnight reset is invented.
  Full available network speed is not a universal Mbps guarantee and still depends on radio conditions.
- `qa/unlimited-plan-copy.json` is the latest revision. The existing connectivity builder composes it
  over the original copy inventory without replaying superseded text. It accepts original captures,
  the previous revision and the current revision, and generates both consolidated original-to-current
  copy and a previous-to-current revision log including the new profile-section wording.
- The panel, hub, Markdown changelog and Copy for Computer export contain the dedicated
  `unlimited-fixed-vs-mno-fair-use` Irina handoff record. Apply this copy with the current page colours,
  native typography, preserved animation geometry/timings, neutral use-case cards and profile explainer.
  The handoff is recorded only; no message has been sent to Irina and no production Openline page changed.
  This revision does not alter Multi Tier-1, Global eSIM or the original animation boards.

### QA reporting beyond animation choices

- `qa/change-log.js` is the shared, manually maintained change inventory: active refinements, exact scopes,
  selected defaults, prototype limitations, rejected alternative decision and pending handoff questions.
- Each page panel has **Beyond animations** and persisted page-level notes. The hub at `/qa#qa-changes`
  shows all changes and accepts notes for the four tools too. Global Copy for Computer includes the inventory,
  page notes, section notes, theme / identity state, shared-slot choices and machine-readable schema v3.
- Animation-pick deltas are explicitly separate from implementation records. Resetting picks retains
  page notes and the inventory. Export contains no entered purchase codes or private chat content.
- The modal builder retains its separate detailed draft and HTML exports; those should accompany the
  global inventory when handing off a specific modal. No `/delivery` has been created.

### France Unlimited / Fixed selector alternative

- `/qa/country-fr-redesign` is a separately requested alternative to the
  [France revisions page](https://openline-revisions-hub.vercel.app/country-fr), which stays untouched.
  It is page 22 in QA, with source comparison, page notes, theme controls, panel records and export.
- `python qa/tools/country_fr.py` captures the supplied source read-only and replaces its plan section
  with `qa/redesign/country-fr-plans.html` and `qa/country-fr.css`. Behaviour is in `qa/country-fr.js`;
  the source-review fixture catalogue and pricing function are in `qa/country-fr-data.js`.
- The original hero and surrounding page remain. Main purchase CTAs scroll to clear Unlimited /
  Fixed choices. The selector retains duration presets, custom days, inclusive travel dates and all
  25 fixed packages, but uses one selection summary rather than scattered purchase buttons.
  Purchase review and cart add/view/remove are honest local-only previews.
- Fair usage is plain text plus a question-mark trigger, not an underlined sentence. The branded
  native modal reads its fixed/full-speed and unlimited/local-MNO policy from
  `qa/unlimited-plan-copy.json` at build time. Rebuild it after policy edits as well as the Unlimited
  page builder. It explains best-effort profile replacement and can switch directly to Fixed.
- `qa/country-fr-changelog.md` records the full Irina handoff: copy, colours, native type, motion,
  selector, modal, source fixtures and preview limits. `qa/assets/country-fr-manifest.md` records real
  source assets and the verified native font. Legacy surrounding claims are labelled reference content.
  No source-app write, real checkout, payment, provisioning or `/delivery` is introduced.
