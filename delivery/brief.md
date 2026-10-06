# Openline implementation brief for Irina

Release: 6 October 2026, r2. This is the implementation handoff from Paul's design review, not a production launch or a claim that the prototype backends exist. Begin at the [delivery hub](https://openline-anims-review.vercel.app/delivery), read Paul's introduction and use the interactive checklist alongside the source pack.

## Paul's expectation

Paul has taken over the animation exploration and refinement and expects the complete retained handoff to be implemented, not only selected visuals. In return for that work taken off Irina's plate, he asks for additional design initiative, character and polish in the web panel, cart/checkout and mobile app, while respecting the existing Openline identity.

Use the interactive checklist to mark each item applied, then verified in context, and flag blocked work instead of silently skipping it. Copy the progress link or export a JSON backup to resume or share your status; it is a snapshot, not a shared live server tracker. See `checklist-guide.md` for the save/restore rules.

## What to deliver

Integrate the retained design direction into your existing Openline work. Treat the illustrations, wording, block structure, typography, spacing, modals and interaction states as one package. Do not implement only the animations and miss the smaller revisions.

- **Decision baseline:** 30 submitted animation choices were checked against Paul's saved Comet state on 6 October. There were no newer QA overrides or notes. Openline+ KYC option 0 means keep current, not replace it.
- **Contextual coverage:** 22 page entries, including the original/retained About and Contact pairs, Product Hunt and the lightly refined France original template. Four extra tools cover Start, Chat, Help and the Modal Builder; Start also has a recipient entry.
- **Retained alternatives:** About and Contact redesigns remain available beside their originals. The later batch of 16 alternatives was rejected and removed. Do not recreate it.
- **France:** The full plan-selector redesign was rejected. Keep the original template and Data Bundles; apply only the current restrained Unlimited, calendar, fair-use and FAQ-support refinements.
- **Blog decision:** Topic Picker is the current contextual default. The Long Read is also in the submitted selections but uses the same hero slot. Deliver it as a retained alternative, not an additional second illustration; ask Paul before replacing the default.
- **Colour:** IoT Chrome and Global eSIM orange are explicitly selected defaults. Other currently enabled QA page identities are review directions, not a blanket production sign-off.

## Your first hour

1. Open the delivery hub and download the source pack. Read this brief, `import-guide.md`, `page-matrix.md`, `copy-changes.md` and `change-ledger.md`.
2. Run `node delivery/serve.mjs` from the pack root, then visit `http://localhost:8080/delivery`. This dependency-free server supports the same basic clean URLs as Vercel. Other generic static servers may need `.html` paths.
3. Walk the page matrix. Compare each affected section with your current source at staging and production; use the QA page as the visual/interaction reference and its listed modules as the implementation source.
4. Port one isolated illustration first, then a block, then a full flow. Do not copy the QA toolbar, reviewer storage, capture scaffolding or fixture data into the production app.
5. Record each item as Done, In progress, Blocked or Not applicable with a reason. Return staging URLs, source/design links and screenshots, not just “implemented”.

## Scope by workstream

### Identity and shared UI

- **Typography:** Keep Openline's native `ui-sans-serif, system-ui, sans-serif` UI stack. Play is reserved for the wordmark, not body text; monospace is for actual codes and technical fields. Use `qa/typography.css` and `.js` as the reference. Native system fonts intentionally differ slightly by operating system.
- **Buttons:** Match existing Openline sizes and 8px corners. Primary action type is generally 16px/24px, weight 500; compact contexts can use 14px. Use the source-shaped arrow and a restrained 4px hover/focus/press translation without moving the label. Keep touch targets at least 44px.
- **Animation fit:** Preserve aspect ratio. The portable runtime includes the QA context-fit pass and transparent-background handling, but flagged slot differences still require visual acceptance in your real layout. Never fix fit with `preserveAspectRatio="none"` or a stretched bitmap.
- **Clean customer presentation:** Do not restore “Demo only”, “Demo complete”, “Saved in this browser tab” and similar notices in the customer-facing mockups. Keep technical boundaries in implementation documentation, and do not ship false success claims before the backend exists.
- **Review tools:** The searchable bottom page dropdown, 22 page entries, panel notes, modal builder and complete non-animation ledger are handoff/review tools. They are not customer navigation.

### Homepage, Global eSIM and IoT

- **Homepage:** Use The Handover and Link in Flight for the two selected slots. Referral uses the same orange as its container, fits its real slot and fades the background plus field from zero on the left to full treatment on the right. The original comparison board was also fixed.
- **Three-step homepage block:** Restore the last approved original illustrations under “How does Openline work?”, separately from the two selected replacements. See the [marked section](https://snap.paulfleury.com/WFyHY3dq); the image identifies scope, not the original source revision. Recover that source version or ask Paul to identify it. Preserve the good [Multiple Tier-1 and related illustrations](https://snap.paulfleury.com/sYy1sv34).
- **Global eSIM:** Apply orange-only accents, washes, icon tiles and selected animations. Keep neutral backgrounds, photography and actual brand logos unchanged; do not repaint raster logos. Compare the [first reference](https://snap.paulfleury.com/qkt0DcHt) and [second reference](https://snap.paulfleury.com/TvGQ270G) with the [current revisions page](https://openline-revisions-hub.vercel.app/global-esim).
- **IoT:** Chrome is the selected default, not an optional purple-first state. Steel, graphite and gunmetal replace purple/indigo, with restrained metallic gradients. Keep Openline branding and meaningful online status colour.

### Connectivity, unlimited and France

- **Network versus profile:** Both Multi Tier-1 and Unlimited distinguish a network change inside the existing eSIM from an occasional new profile with a different provider/infrastructure. Two equal cards, larger labels and short copy replace the dense explanations; optional detail is collapsed.
- **Fixed package promise:** “Buy 10 GB and get all 10 GB at full speed, guaranteed, with no usage-based throttling.” Full speed means the available network speed, not a fixed Mbps rate or immunity to congestion.
- **Unlimited promise:** Openline adds no cap or throttling. Local MNO fair-use rules may temporarily reduce speed after heavy use within 24 hours; thresholds and recovery vary. Recommend fixed data for no usage-based throttling.
- **Best-effort replacement:** If unlimited throttling recurs, Openline will try another profile/infrastructure with a fair-use policy better suited to the location and usage. Do not promise an improvement, seamless installation, zero interruption, a universal threshold, an automatic midnight reset, free replacement or balance/validity carry-over without product confirmation.
- **Operator showcase:** Replace the static wall with the two slow counter-moving operator rows, soft edges, Pause and searchable Browse operators. Preserve the 36 names and corrected Three, Telefónica and SK Telecom logo mappings. This work did not verify commercial partnerships or logo usage rights.
- **France copy:** Use exactly “Perfect for heavy users. Stream, video call, and browse without limits.” Keep the separate prominent fair-use explanation.
- **France selector:** No icons beside 3/5/7/10/15/30 days. Use subtle original-style shadows and an orange selected treatment. “Fair usage applies” plus its closely spaced question-mark icon is one accessible, non-underlined button.
- **Calendar:** Real start/end range selection, two months desktop and one mobile, orange endpoints, preview band, clearer day/price summary, orange Reset and stronger Apply. Hide the visible keyboard-tip line but keep accessible help. Cancel must not commit a draft; reopen restores applied dates. Dates do not schedule activation.
- **France support:** Keep the existing FAQ text and replace only the marked graphic with KB → Openline AI → human team. Steps are clickable, animation continues, pause/reduced-motion work, and the live-chat CTA opens support.

Exact before/after strings are in `copy-changes.md` and the original scoped changelogs. Use the latest consolidated values rather than applying old and new revisions twice.

### About, Contact and Openline+

- **About:** Keep the retained redesign and original comparison. Correct the Network Technology cards' padding, list alignment and heading spacing. Show the requested nine cities: New York, Lisbon, Warsaw, Ankara, Bristol, Berlin, Paris, Singapore and Bali.
- **Open Startup:** Expanded by default, Show/Hide still works, every value remains locked. Use “coming very, very soon”; do not restore the removed sample figures or “Live” badges.
- **Contact:** WhatsApp `https://wa.me/15554842461`; Instagram `https://www.instagram.com/askopenline/`; Messenger `https://m.me/askopenline`; Facebook `https://www.facebook.com/askopenline`; email `ask@openline.com`. These are Paul's supplied destinations, not a new verification of account ownership.
- **Hotline:** Below 24/7 Global Support, add “Coming soon · Live hotline” with `+1 (8) 123 - ONLINE`. This is a display concept, not a dialable operational number. Do not add a `tel:` action.
- **Support process:** Each “How Our Chat Support Works” stage is clickable/keyboard-operable and seeks its animation while continuing playback. Reduced motion preserves manual selection.
- **Digital Nomads:** City labels stay visible rather than blinking. Preserve the connection motion and use the fictional US example `+1 202 555 0148`, not a real customer/contact number.

### Installation, activation and gifting

- **Installation guide:** Primary card “I already have my eSIM” → “Install my eSIM” goes to the existing guide. Secondary card “I have a purchase code” → “Redeem purchase code” goes to production `/start`. Do not force existing eSIM owners through redemption.
- **Code explanation:** An Openline purchase code is redeemed with Openline; it is not the phone's manual activation code. The resulting eSIM supplies its QR and manual details. Retain the dedicated code-definition and connection-checklist dialogs.
- **Start entry:** Normal header, animated key, large code input, concise review and three clear choices: Activate, Gift, Account. No “Check my device” or “Need a hand” clutter in this view.
- **Confirmation:** Checking a code is read-only. Activation requires the central, larger readiness switch, initially off, and an explicit confirmation that the plan begins now and the code can no longer be gifted. Server-side eligibility must still be rechecked at confirmation.
- **Details and finish:** Show the eSIM QR immediately, with collapsible SM-DP+ address, activation code and profile identifier fields. ICCID identifies the subscription/profile; EID belongs to the device's eUICC and should only be shown if the actual device/backend supplies it. Do not invent an “IDID” field or expose raw provisioning secrets in logs.
- **Setup & connect:** Repeat the QR briefly in “Install your eSIM”. Select Openline as primary mobile data, turn off other SIM/eSIM mobile data and automatic data switching, enable roaming on Openline, then suggest a quick airplane-mode refresh. Paul's near-travel/private-Wi-Fi guidance is advice, not a claim that the browser can configure or detect these settings.
- **Quick actions:** “View my eSIM” and “Edit label or folder” are aligned icon buttons opening short dialogs, not navigation back through previous steps. End with the connected/activated presentation and account handoff; production must distinguish confirmed activation from unverified physical connectivity.
- **Gift sender:** An unused code starts locked for transfer. Explain that the owner still receives an email to validate the purchase. Unlock confirmation makes clear that anyone holding the unlocked code can redeem it, but unlocking does not start validity or bypass validation.
- **Gift recipient:** Enter via the gift entry or `?recipient=1`, review the eligible code, keep it for later or explicitly redeem and activate, then QR/setup/label/folder/account. Locked transfer and pending owner validation block redemption. Neither codes nor sender personal details belong in URLs. The current in-memory ledger is not security or persistence.

### Support, help and other concepts

- **Chat:** Whole sidebar bar opens it; arrow and header icon toggle open/closed. Use the official Openline mark for Gary and modal branding. Centre the seven illustrative portraits above the support message; do not present stock portraits as verified staff.
- **AI handoff:** Nine useful prompts and seven correctly branded AI providers. Modal explains copying then pasting into the provider's own interface. Use the configured web URLs and explicit user action; do not promise automatic app opening, prompt injection into another service or an existing login. Clipboard failure must be handled truthfully.
- **Clear chat:** Confirmation replaces “Reset demo”. A fresh welcome with large animated icon and initial bot message follows. Production must actually perform the promised server deletion/issue resolution, with its retention policy and failure handling, before claiming it is done.
- **Help:** Preserve the KB and compatibility search/modal entry points, error/empty results, keyboard/focus behaviour and imported datasets. The current local corpus is not proof that every device or article is current.
- **Modal Builder:** A design tool with reusable templates, icons and HTML output. Copy a chosen configuration into the app's dialog system, not the whole builder into the customer site.
- **Product Hunt:** Retain the campaign redesign and its interactions as a concept. Reward rules, prices, launch date and eligibility require approval. Local format validation is not proof verification; reward/email/account backends are not connected.
- **OMDM:** The three submitted illustration choices are the delivery baseline. The separate root `/omdm` full-page concept is supplementary reference only; its market figures are illustrative, not live telemetry.

## Additional work for you

These are explicit new implementation/design tasks, not claims that every captured QA page has already been changed.

- **Floating labels:** Change “Openline Mobile” to “Mobile app” and move “Revisions” to the top right. Preserve actions and test header/chat/mobile safe-area overlap. [Marked reference](https://snap.paulfleury.com/gF4BQJty).
- **Certification trigger:** One shield badge reading `GDPR · SOC2 ···`, opening the certification modal. Check evidence, scope and wording before publication; a condensed badge is not a certification audit. [Marked reference](https://snap.paulfleury.com/hgg5y4Gk).
- **Global eSIM and homepage:** Bring the orange-only QA treatment into your implementation and restore the three original How-it-works illustrations as described above.
- **Web panel:** Apply the same native typography, spacing, button/modal consistency and clear state hierarchy to purchases, profile cards, code details, receipts, status, gifting and account organisation.
- **Cart and checkout:** Give the cart, order summary, totals, validation, payment selection and responsive checkout more design care. Cover empty cart, pending/failure/cancel/retry, 3DS, confirmation and receipts; do not silently add unsupported payment methods or commercial rules.
- **Mobile app for Kerem:** Produce ready-to-build screens and state annotations for checkout/payment/3DS, pending/failure/retry/success, purchase-code viewing/copying, owner validation, gift unlock/recipient redemption, activation readiness/errors, QR/manual details, installation guidance, profile naming/folders and account return. Show a same-device installation route only if the supported platform/API permits it.
- **Implementation handoff:** Include component names, assets, responsive rules, transitions, API dependencies and accessibility notes. UI polish should reduce engineering guesswork, not merely add decoration.

## Deadline and return format

Please send a first progress update on **Thursday 8 October 2026**, then a full progress report by **Friday 9 October around 13:00 Europe/Lisbon**, approximately 72 hours after this brief. This is a report-back deadline; identify any work that still needs product approval, engineering or more time.

For each entry, return its ID, status, staging link, implementation/design source, desktop/mobile screenshots, tests completed, remaining blocker, owner and next ETA. Group backend dependencies separately from design integration. Use `report-template.md` as the starting point.

## Release gate

Do not publish to production until Paul has reviewed staging, the current copy/claims are reconciled, accessibility and reduced-motion checks pass, and relevant backend actions are connected truthfully. The [QA workspace](https://openline-anims-review.vercel.app/qa), [choice board](https://openline-anims-review.vercel.app/choice) and [original review boards](https://openline-anims-review.vercel.app/) remain reference history, not blanket approval of every option they contain.
