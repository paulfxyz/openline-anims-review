# Openline page-by-page implementation matrix

Use these files and the linked records together. The complete source pack preserves their dependencies; do not treat a captured HTML file as a production application.

## Home

[Working QA view](https://openline-anims-review.vercel.app/qa/home) · Contextual page

### Import files

- `qa/home.html`
- `js/home-why.js`
- `js/referral.js`

### Apply and verify

- **delivery-home-original-three:** Restore the last approved original illustrations under How does Openline work? for Choose your destination, Buy an eSIM in seconds and Scan & connect. Keep the selected Why Openline and Referral replacements.
- **home-why-fit:** Option 3 is fitted to the 407 × 302 home slot, with readable content and without the board wrapper competing with the page.
- **referral-fit:** Referral option 3 matches the original orange, fits its 576 × 520 slot and keeps the selected animation. Background plus signs fade smoothly from 0% on the left to full treatment on the right.

Animation keys: `referral` (3: Link in Flight), `homewhy` (3: The Handover).

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Multiple Tier-1

[Working QA view](https://openline-anims-review.vercel.app/qa/multiple-tier1) · Contextual page

### Import files

- `qa/multiple-tier1.html`
- `qa/connectivity-copy.json`
- `qa/connectivity-changes.js`
- `qa/redesign/profile-switching.html`
- `qa/profile-switching.css`
- `qa/redesign/operator-showcase.html`
- `qa/operator-showcase.js`
- `qa/operator-showcase.css`
- `qa/operators.json`
- `qa/assets/operators/README.md`

### Apply and verify

- **profile-switching-explainer:** A new, prominent two-route explainer replaces the marked eSIM-switching warning and probability cards on Multi Tier-1, with a matching entry on Unlimited replacing the old competitor-throttling comparison. It distinguishes network selection within one profile from occasionally issuing an entirely new profile/provider setup.
- **compact-profile-explainer:** The marked section now uses two equal cards with larger diagrams, 28px headings and 18px body text, replacing the dense multi-paragraph layout and tiny technical labels. One card explains a network change within the same eSIM; the other explains an entirely new profile/provider. Longer policy details are collapsed beneath.
- **multi-tier1-profile-copy:** Hero, infrastructure explanation, partner introductions, selection cards, market narrative, three-step process, access checklist and closing copy now explain the network/profile distinction without promising the strongest signal, cheapest price, millisecond handoffs or no setup in every situation.
- **multi-tier1-operator-ribbons:** Replaced the large static 36-logo wall with two seamless rows moving slowly in opposite directions, consistent logo sizing, readable names and soft edge fades. Pause motion and a searchable Browse operators dialog provide direct control and access to the full roster without waiting.

Animation keys: `tier1` (3: Price Auction), `t1ai` (3: Neural Sweep), `t1market` (5: Ticker Tape), `t1access` (1: Operator Roster).

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Global eSIM

[Working QA view](https://openline-anims-review.vercel.app/qa/global-esim) · Contextual page

### Import files

- `qa/global-esim.html`
- `qa/core.js`
- `qa/recolor.js`
- `qa/paint.js`

### Apply and verify

- **global-esim-orange:** All section accents, tinted blocks, icon tiles and contextual animations now use the Openline orange family instead of the mixed blue, purple and green treatments.

Animation keys: `what` (1: Etch & Activate), `travel` (3: Trip Tape).

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Network

[Working QA view](https://openline-anims-review.vercel.app/qa/network) · Contextual page

### Import files

- `qa/network.html`
- `qa/core.js`
- `qa/recolor.js`
- `qa/paint.js`

### Apply and verify

- **page-identities:** Network blue, Security teal, AdBlocking ultraviolet, Unlimited magenta and Blog newsprint are switchable within each page.

Animation keys: `nethero` (6: Network HUD), `why` (3: Feature Stack).

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Security

[Working QA view](https://openline-anims-review.vercel.app/qa/security) · Contextual page

### Import files

- `qa/security.html`
- `qa/core.js`
- `qa/recolor.js`
- `qa/paint.js`

### Apply and verify

- **page-identities:** Network blue, Security teal, AdBlocking ultraviolet, Unlimited magenta and Blog newsprint are switchable within each page.

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## AdBlocking

[Working QA view](https://openline-anims-review.vercel.app/qa/adblocking) · Contextual page

### Import files

- `qa/adblocking.html`
- `qa/core.js`
- `qa/recolor.js`
- `qa/paint.js`

### Apply and verify

- **page-identities:** Network blue, Security teal, AdBlocking ultraviolet, Unlimited magenta and Blog newsprint are switchable within each page.

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Unlimited

[Working QA view](https://openline-anims-review.vercel.app/qa/unlimited) · Contextual page

### Import files

- `qa/unlimited.html`
- `qa/connectivity-copy.json`
- `qa/unlimited-plan-copy.json`
- `qa/connectivity-changes.js`
- `qa/redesign/profile-switching.html`
- `qa/profile-switching.css`

### Apply and verify

- **page-identities:** Network blue, Security teal, AdBlocking ultraviolet, Unlimited magenta and Blog newsprint are switchable within each page.
- **profile-switching-explainer:** A new, prominent two-route explainer replaces the marked eSIM-switching warning and probability cards on Multi Tier-1, with a matching entry on Unlimited replacing the old competitor-throttling comparison. It distinguishes network selection within one profile from occasionally issuing an entirely new profile/provider setup.
- **compact-profile-explainer:** The marked section now uses two equal cards with larger diagrams, 28px headings and 18px body text, replacing the dense multi-paragraph layout and tiny technical labels. One card explains a network change within the same eSIM; the other explains an entirely new profile/provider. Longer policy details are collapsed beneath.
- **unlimited-profile-copy:** The consolidated copy now distinguishes the fixed-package full-speed allowance guarantee from unlimited plans with no Openline-imposed cap or throttling, while local MNO fair-use rules can still apply. Hero, feature cards, use cases, checklist, illustration labels and closing copy are aligned.
- **unlimited-fixed-vs-mno-fair-use:** Fixed packages guarantee the entire purchased allowance at full available network speed without usage-based throttling: 10 GB means all 10 GB. Openline imposes no cap or throttling on unlimited plans, but a local mobile network operator may temporarily reduce speed after heavy use within 24 hours. Fixed data is the recommendation for avoiding that throttling. For recurring unlimited-plan slowdowns, Openline will try another profile/infrastructure whose fair-use policy may better suit the customer’s location and usage.

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Business

[Working QA view](https://openline-anims-review.vercel.app/qa/business) · Contextual page

### Import files

- `qa/business.html`

### Apply and verify


Animation keys: `bizhero` (2: Invoice Showdown), `bizneeds` (1: Console Tabs).
- Preserve surrounding source content; apply selected slot replacements where listed and shared typography/fit rules. No unlisted full-page redesign is approved.

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Hospitality

[Working QA view](https://openline-anims-review.vercel.app/qa/hospitality) · Contextual page

### Import files

- `qa/hospitality.html`

### Apply and verify


Animation keys: `hosp` (3: Every Property Type).
- Preserve surrounding source content; apply selected slot replacements where listed and shared typography/fit rules. No unlisted full-page redesign is approved.

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## IoT

[Working QA view](https://openline-anims-review.vercel.app/qa/iot) · Contextual page

### Import files

- `qa/iot.html`
- `js/iot-cells.js`
- `qa/core.js`
- `qa/paint.js`
- `qa/recolor.js`

### Apply and verify

- **iot-chrome:** Purple and indigo accents become neutral steel, graphite and gunmetal with a restrained chrome sheen.

Animation keys: `iotwide` (6: The Shelf, Collapsed), `iotchip` (1: The Tray Ejects), `iotdark` (1: Night Side).

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Openline+

[Working QA view](https://openline-anims-review.vercel.app/qa/openline-plus) · Contextual page

### Import files

- `qa/openline-plus.html`
- `js/plus.js`
- `qa/animation-fixes.js`

### Apply and verify

- **nomad-stability:** Built for Digital Nomads no longer repeatedly fades its city labels. Connection motion continues and the number is the fictional US example +1 202 555 0148.

Animation keys: `pluslounge` (1: Two Lanes, One Clock), `plusnomad` (1: Six Cities, One Number), `pluskyc` (0: Current).

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Login

[Working QA view](https://openline-anims-review.vercel.app/qa/login) · Contextual page

### Import files

- `qa/login.html`

### Apply and verify


Animation keys: `aloha` (6: Globe & Pin).
- Preserve surrounding source content; apply selected slot replacements where listed and shared typography/fit rules. No unlisted full-page redesign is approved.

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## About

[Working QA view](https://openline-anims-review.vercel.app/qa/about) · Contextual page

### Import files

- `qa/about.html`

### Apply and verify

- **about-layout:** The earlier About redesign remains available beside the original, including its principles, team presentation, local clocks and partner strip.

Animation keys: `prin` (3: Switches We Left Off), `team` (3: Against the Industry).

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## About — redesign

[Working QA view](https://openline-anims-review.vercel.app/qa/about-redesign) · Retained alternative

### Import files

- `qa/about-redesign.html`
- `qa/redesign/about.main.html`
- `qa/redesign/rd.css`
- `qa/redesign.js`

### Apply and verify

- **about-layout:** The earlier About redesign remains available beside the original, including its principles, team presentation, local clocks and partner strip.
- **about-network-spacing:** The two Most Reliable Connection cards have consistent inset padding, clear title-to-list spacing and aligned icon/bullet rows. Comparison titles use scoped heading styles instead of inheriting generic paragraph margins and sizing.
- **about-startup-locked:** Open Startup now explains that public results are coming very, very soon. A lock notice and keyboard-operable Show / Hide results preview control replace the previous live-looking sample metrics.
- **about-team-cities:** The local-time roster now lists New York, Lisbon, Warsaw, Ankara, Bristol, Berlin, Paris, Singapore and Bali in the supplied order, with city badges instead of fictional staff initials.
- **redesign-button-parity:** About and Contact action buttons use the current Openline type scale and icon sizing: 16px / 24px, weight 500 for main actions; 14px compact contact actions and mobile purchase CTAs; 16px button icons. Trailing arrows match the source shape and slide 4px over 150ms without shifting the text or lifting the button.

Animation keys: `prin` (3: Switches We Left Off), `team` (3: Against the Industry).

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## OMDM Market

[Working QA view](https://openline-anims-review.vercel.app/qa/omdm-market) · Contextual page

### Import files

- `qa/omdm-market.html`

### Apply and verify


Animation keys: `omhero` (7: The Board), `ombook` (6: Cards, Alive), `omctrl` (6: Onboarding).
- Preserve surrounding source content; apply selected slot replacements where listed and shared typography/fit rules. No unlisted full-page redesign is approved.

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Blog

[Working QA view](https://openline-anims-review.vercel.app/qa/blog) · Contextual page

### Import files

- `qa/blog.html`

### Apply and verify

- **page-identities:** Network blue, Security teal, AdBlocking ultraviolet, Unlimited magenta and Blog newsprint are switchable within each page.

Animation keys: `blog` (2: Topic Picker), `blogv` (6: The Long Read).

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Installation Guide

[Working QA view](https://openline-anims-review.vercel.app/qa/installation-guide) · Contextual page

### Import files

- `qa/installation-guide.html`
- `qa/redesign/installation-preflight.html`
- `qa/installation-preflight.js`
- `qa/installation-preflight.css`
- `qa/support/boot.js`

### Apply and verify

- **installation-preflight-install-first:** The marked block is now a two-path decision: I already have my eSIM is first and primary, with a large orange Install my eSIM button leading directly to the existing setup guide. I have a purchase code is a separate neutral secondary card whose Redeem purchase code button goes to /start. The forced three-step redemption roadmap and directional bridge are removed.
- **installation-preflight-detail-modals:** Which code is which and Connection checklist are now larger, icon-led buttons opening dedicated native dialogs. The first distinguishes an Openline purchase code from the eSIM activation code and SM-DP+ address used for manual phone setup. The second explains activation timing, private Wi-Fi and the three essential mobile-data settings.
- **start-flow:** Animated key, large GAZE19-MULCH29-NYMPH13-format input, code validation, and a concise plan review with three clear Activate / Gift / Account cards. The centred activation confirmation uses an off-by-default readiness switch; the chosen code-to-eSIM animation is preserved.
- **start-gift-unlock-transfer:** Gift now explains that the purchase owner will still receive an email to validate the purchase. An unused code starts locked for transfer. Unlock for transfer opens an explicit confirmation; confirming exposes Copy gift message and a Ready to transfer / not activated status. Unlocking is separate from activating the plan.
- **help-modals:** Searchable help and compatibility modals use the included 2,737-article and 9,496-device datasets, shared launchers, keyboard controls and deep-link states.

Animation keys: `install` (3: Chapter Deck).

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Contact

[Working QA view](https://openline-anims-review.vercel.app/qa/contact) · Contextual page

### Import files

- `qa/contact.html`

### Apply and verify

- **contact-layout:** The earlier Contact redesign remains alongside the original, with contact methods, support process, chat preview and global support block.

Animation keys: `contact` (10: Two Doors).

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Contact — redesign

[Working QA view](https://openline-anims-review.vercel.app/qa/contact-redesign) · Retained alternative

### Import files

- `qa/contact-redesign.html`
- `qa/redesign/contact.main.html`
- `qa/redesign/rd.css`
- `qa/redesign.js`
- `qa/support/boot.js`

### Apply and verify

- **redesign-button-parity:** About and Contact action buttons use the current Openline type scale and icon sizing: 16px / 24px, weight 500 for main actions; 14px compact contact actions and mobile purchase CTAs; 16px button icons. Trailing arrows match the source shape and slide 4px over 150ms without shifting the text or lifting the button.
- **contact-layout:** The earlier Contact redesign remains alongside the original, with contact methods, support process, chat preview and global support block.
- **contact-channels:** WhatsApp +1 (555) 484-2461; Instagram and Messenger/Facebook @askopenline; email ask@openline.com. The Contact page adds a Live hotline widget below 24/7 Global Support: +1 (8) 123 - ONLINE.
- **contact-chat-seeking:** Each of the three How Our Chat Support Works steps seeks its matching animation scene. Automatic playback continues and highlights follow the SVG clock.

Animation keys: `contact` (10: Two Doors).

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Affiliate

[Working QA view](https://openline-anims-review.vercel.app/qa/affiliate) · Contextual page

### Import files

- `qa/affiliate.html`

### Apply and verify


Animation keys: `affil` (3: What You Actually Get).
- Preserve surrounding source content; apply selected slot replacements where listed and shared typography/fit rules. No unlisted full-page redesign is approved.

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Product Hunt — redesign

[Working QA view](https://openline-anims-review.vercel.app/qa/producthunt) · Campaign concept

### Import files

- `qa/producthunt.html`
- `qa/producthunt.js`
- `qa/producthunt.css`
- `qa/producthunt-page.css`
- `qa/support/boot.js`

### Apply and verify

- **producthunt-qa:** The existing /producthunt redesign is available as the 21st QA page, preserving Kitty, the two reward lanes, four-rung ladder, steps, eligibility table, claim area and fine print. It has the shared page menu, review panel, page notes, theme controls, export and support tools.

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## France

[Working QA view](https://openline-anims-review.vercel.app/qa/country-fr-redesign) · Original-template refinement

### Import files

- `qa/country-fr-redesign.html`
- `qa/country-fr-refinement.js`
- `qa/country-fr-refinement.css`
- `qa/calendar-range.js`
- `qa/country-fr-data.js`
- `qa/redesign/country-fr-dialogs.html`
- `qa/redesign/country-fr-support.html`
- `qa/country-fr-support.js`
- `qa/country-fr-support.css`

### Apply and verify

- **country-fr-unlimited-refinement:** Paul rejected the full selector redesign. The original France template is restored: centered Unlimited block followed by the original Data Bundles section. Unlimited keeps aligned travel-date/day controls and consistent feature/action spacing. The latest presets use numbers and days only, stronger original-style shadows and a restrained selected lift.
- **country-fr-fair-use:** Fair usage applies and its question-mark icon are one clickable/tappable button with no underline and a close 4px text-to-icon gap. Clicking either the words or the icon opens the existing compact policy modal, without changing its explanation.
- **country-fr-calendar-range:** Select travel dates opens an actual start/end calendar range picker again, not two date input fields. The original two-month desktop pattern is retained with readable day targets, clear month navigation, orange endpoints, a soft range band/hover preview, start/end summaries and Reset. Mobile shows one navigable month rather than squeezing two calendars.
- **country-fr-calendar-polish:** The calendar’s visible keyboard-instruction line is hidden while the accessible description and shortcuts remain. A clearer quote card separates the X-day plan, Unlimited-data label, total USD price and daily rate. Reset is Openline orange with a reset icon; Apply has a stronger primary treatment and animated trailing arrow.
- **france-duration-cards-and-support:** Removed the icons from 3 / 5 / 7 / 10 / 15 / 30-day tiles. Added subtle neutral shadows and a stronger orange selected shadow with the original-style gentle lift. The unrelated coverage graphic beside the FAQs is replaced with a KB → Openline AI → human team support animation and a prominent live-chat CTA.
- **country-fr-unlimited-intro:** The description below Unlimited Data returns to the original marketing sentence, exactly as requested. No other page copy or layout is changed.

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Activate a plan

[Working QA view](https://openline-anims-review.vercel.app/qa/start) · Activation + gift sender

### Import files

- `qa/start.html`
- `qa/start.js`
- `qa/start.css`
- `qa/start-profile.js`
- `qa/start-profile.css`
- `qa/start-changelog.md`
- `qa/assets/start-brand-mark.png`
- `qa/assets/start-demo-qr.png`

### Apply and verify

- **start-flow:** Animated key, large GAZE19-MULCH29-NYMPH13-format input, code validation, and a concise plan review with three clear Activate / Gift / Account cards. The centred activation confirmation uses an off-by-default readiness switch; the chosen code-to-eSIM animation is preserved.
- **start-gift-unlock-transfer:** Gift now explains that the purchase owner will still receive an email to validate the purchase. An unused code starts locked for transfer. Unlock for transfer opens an explicit confirmation; confirming exposes Copy gift message and a Ready to transfer / not activated status. Unlocking is separate from activating the plan.
- **start-gift-recipient:** Added the recipient side of gifting: a gift-code entry, plan review with unlocked status, Keep it for later, guarded Redeem & activate, chosen code-to-profile animation, immediate QR, setup, recipient-specific label/folder and final account handoff. The sender can open the recipient view after unlocking, or a recipient can enter through Received a gift or the dedicated query-mode link.
- **start-profile-handoff:** After activation, the page immediately shows the eSIM QR and plan card. Manual details and IDs are collapsed underneath. The inline sequence then continues through Setup & connect → Make it yours → a clearly labelled simulated connection and account handoff. There is no Set up my eSIM gate or all-in-one profile modal.
- **start-focused-redesign:** Full /qa/start flow simplification: less visible copy, larger native-font headings and controls, three distinct plan actions, a centred 24px readiness label with a real switch, immediately visible QR, collapsed manual details, three essential phone settings, optional organisation and a clear Go to my account finale.
- **start-normal-header-actions:** Restored the source-style 64px normal header with logo, Destinations / Features / Pro / Resources, Openline+ Beta, cart, Sign In and EN / $ controls. Mobile has support, cart and a working menu. Gift this code and Go to my account are larger icon-and-arrow buttons; completion View my eSIM and Edit label or folder are full secondary buttons. The bottom Check my device / Need a hand row is removed.
- **start-quick-profile-modals:** Install your eSIM repeats the QR above device instructions. Setup explicitly selects Openline as primary mobile data, disables mobile data on other SIMs/eSIMs and automatic data switching, enables roaming on Openline, and adds a brief airplane-mode ON/OFF refresh. Completion icons are centred with their labels; View my eSIM and Edit label or folder open compact dialogs rather than revisiting previous steps.
- **start-action-arrows:** The same source-style 150ms arrow nudge now covers purchase-code entry, review, profile setup, back links, QR download, full-guide and account handoffs. Forward/back arrows move 4px in their direction; diagonal and download arrows follow their own direction.
- **help-modals:** Searchable help and compatibility modals use the included 2,737-article and 9,496-device datasets, shared launchers, keyboard controls and deep-link states.

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Receive a gifted eSIM

[Working QA view](https://openline-anims-review.vercel.app/qa/start?recipient=1) · Recipient journey

### Import files

- `qa/start.html`
- `qa/start.js`
- `qa/start.css`
- `qa/start-profile.js`
- `qa/start-profile.css`
- `qa/start-changelog.md`
- `qa/assets/start-brand-mark.png`
- `qa/assets/start-demo-qr.png`

### Apply and verify

- **start-flow:** Animated key, large GAZE19-MULCH29-NYMPH13-format input, code validation, and a concise plan review with three clear Activate / Gift / Account cards. The centred activation confirmation uses an off-by-default readiness switch; the chosen code-to-eSIM animation is preserved.
- **start-gift-unlock-transfer:** Gift now explains that the purchase owner will still receive an email to validate the purchase. An unused code starts locked for transfer. Unlock for transfer opens an explicit confirmation; confirming exposes Copy gift message and a Ready to transfer / not activated status. Unlocking is separate from activating the plan.
- **start-gift-recipient:** Added the recipient side of gifting: a gift-code entry, plan review with unlocked status, Keep it for later, guarded Redeem & activate, chosen code-to-profile animation, immediate QR, setup, recipient-specific label/folder and final account handoff. The sender can open the recipient view after unlocking, or a recipient can enter through Received a gift or the dedicated query-mode link.
- **start-profile-handoff:** After activation, the page immediately shows the eSIM QR and plan card. Manual details and IDs are collapsed underneath. The inline sequence then continues through Setup & connect → Make it yours → a clearly labelled simulated connection and account handoff. There is no Set up my eSIM gate or all-in-one profile modal.
- **start-focused-redesign:** Full /qa/start flow simplification: less visible copy, larger native-font headings and controls, three distinct plan actions, a centred 24px readiness label with a real switch, immediately visible QR, collapsed manual details, three essential phone settings, optional organisation and a clear Go to my account finale.
- **start-normal-header-actions:** Restored the source-style 64px normal header with logo, Destinations / Features / Pro / Resources, Openline+ Beta, cart, Sign In and EN / $ controls. Mobile has support, cart and a working menu. Gift this code and Go to my account are larger icon-and-arrow buttons; completion View my eSIM and Edit label or folder are full secondary buttons. The bottom Check my device / Need a hand row is removed.
- **start-quick-profile-modals:** Install your eSIM repeats the QR above device instructions. Setup explicitly selects Openline as primary mobile data, disables mobile data on other SIMs/eSIMs and automatic data switching, enables roaming on Openline, and adds a brief airplane-mode ON/OFF refresh. Completion icons are centred with their labels; View my eSIM and Edit label or folder open compact dialogs rather than revisiting previous steps.
- **start-action-arrows:** The same source-style 150ms arrow nudge now covers purchase-code entry, review, profile setup, back links, QR download, full-guide and account handoffs. Forward/back arrows move 4px in their direction; diagonal and download arrows follow their own direction.
- **help-modals:** Searchable help and compatibility modals use the included 2,737-article and 9,496-device datasets, shared launchers, keyboard controls and deep-link states.

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Support chat

[Working QA view](https://openline-anims-review.vercel.app/qa/chat) · Interactive support concept

### Import files

- `qa/chat.html`
- `qa/support/chat.js`
- `qa/support/support.js`
- `qa/support/support.css`
- `qa/support/boot.js`
- `qa/assets/ai/README.md`
- `qa/assets/support-portraits/README.md`

### Apply and verify

- **contact-channels:** WhatsApp +1 (555) 484-2461; Instagram and Messenger/Facebook @askopenline; email ask@openline.com. The Contact page adds a Live hotline widget below 24/7 Global Support: +1 (8) 123 - ONLINE.
- **chat-sidebar-ai:** Full-height collapsed rail opens on any tap/click; rail arrow, expanded-panel arrow and header icon toggle it. Nine editable prompts and seven AI providers use real locally hosted logos/favicons.
- **chat-fresh-clear:** Animated welcome icon and Gary’s How can I help you? greeting appear for a new guest or after confirmed Clear chat. Text, files, voice, local history and simulated replies remain.
- **chat-brand-portraits:** The chat header, animated welcome and Gary avatar use the actual Openline mark already sourced for /start. Seven circular photo portraits form one centred row directly above Here to help you stay connected, in both the fresh welcome and conversation intro.
- **help-modals:** Searchable help and compatibility modals use the included 2,737-article and 9,496-device datasets, shared launchers, keyboard controls and deep-link states.

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Knowledge base + device checker

[Working QA view](https://openline-anims-review.vercel.app/qa/kb) · Help tools

### Import files

- `qa/kb.html`
- `qa/support/support.js`
- `qa/support/search.mjs`
- `qa/support/minisearch.mjs`
- `qa/support/md.js`
- `qa/data/kb-articles.json`
- `qa/data/devices.js`
- `qa/kb.css`

### Apply and verify

- **help-modals:** Searchable help and compatibility modals use the included 2,737-article and 9,496-device datasets, shared launchers, keyboard controls and deep-link states.

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.

## Modal builder

[Working QA view](https://openline-anims-review.vercel.app/qa/modals) · Design tool

### Import files

- `qa/modals.html`
- `qa/modals.js`
- `qa/modals.css`
- `qa/modal-templates.js`
- `qa/modal-illus.js`
- `qa/icons-lib.js`

### Apply and verify

- **modal-builder:** Eight types, 60 Openline templates, 358 animated icons, 16 content-block types, custom images, one/two actions and real-page backdrop preview.

Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.
