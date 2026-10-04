# Activate a plan: focused flow redesign

The current version is on [Openline QA /start](https://openline-anims-review.vercel.app/qa/start). It replaces the crowded review and modal-based profile handoff while preserving the chosen key and code-to-profile animation.

## Entry and choice

- **Enter code:** A large purchase-code input, one primary check button, and concise reassurance that checking does not start the plan. “Where’s my code?” opens a dedicated explanation.
- **Your plan:** One concise sample-plan card followed by clearly separated Activate my plan, Gift this code and My account actions. Travelling-later guidance remains visible without dominating the page.
- **Gift:** Copies a private example message, never sends it. An activated purchase code cannot be gifted.
- **Confirm:** The plan starts immediately and gifting ends. The centred “I’m ready to start this plan now” label is larger and paired with a keyboard-operable switch that defaults OFF every time the modal opens. Activation remains disabled until consent is ON.

## Inline eSIM handoff

- **eSIM details:** QR and plan information appear directly after the chosen activation animation. No “Set up my eSIM” gate button and no full-flow modal.
- **Manual details:** A collapsed disclosure holds SM-DP+ address, activation code, full activation string, ICCID and profile ID with individual copy controls. Confirmation code is not needed for the sample; EID is explicitly unlinked, never invented.
- **Setup & connect:** Private Wi-Fi installation, followed by three large cards: Mobile data = Openline; automatic data switching = OFF; Data roaming = ON for Openline.
- **Detailed help:** Dedicated native dialogs hold iPhone/Samsung/Pixel installation steps and connection tips. Activate just before departure or on arrival; use private Wi-Fi, not airport/public Wi-Fi or cellular 4G/5G for profile setup because these networks may block it. Roaming guidance applies to Openline, not the home SIM.
- **Make it yours:** Larger optional label/folder controls, live profile preview, custom folder validation and one Finish setup action.
- **Completion:** The intended “You’re connected” finale and activated-profile state lead to Go to my account. View my eSIM and Edit label or folder are now substantial secondary buttons, not small text links. Technical simulation boundaries are recorded in the handoff rather than displayed on the customer-facing screen, as Paul requested.

## Presentation and behaviour

- **Type and spacing:** Native Openline UI font, larger body text and controls, clear action hierarchy, generous blocks and responsive single-column mobile layouts. Play is reserved for the wordmark; technical codes remain monospace.
- **Motion:** Selected key float/draw and code-to-profile animation are preserved. Directional arrows retain source-style hover/focus/press movement. Reduced-motion preferences disable the nonessential motion.
- **Details on demand:** Code help, timing, phone-specific instructions, connection tips, save behaviour and preview controls are moved out of the main sequence into dialogs.
- **Accessibility:** Native focus-trapping dialogs, Escape/close/backdrop dismissal, focus return, labelled switch, native disclosure, clear focus outlines and button-sized tap targets.

## Preview boundaries and production handoff

- **No live activation:** No provisioning, account, payment or messaging APIs are called. The demo's successful timing animation is not evidence of production activation or physical connectivity.
- **Safe fixtures:** QR encodes a harmless notice. Manual server uses `.invalid`; all identifiers and credentials are fictional. Purchase codes never enter storage or URLs.
- **Local organisation only:** The optional label and folder are stored for this browser tab, with a truthful in-memory fallback when storage is unavailable. Account links open `/qa/login`.
- **Failure states:** Empty/malformed/unknown/used codes, lookup failure and recoverable activation failure remain available. Restart cancels outstanding work; reopening confirmation resets consent.
- **Irina handoff:** Apply copy, layout, typography, icons, spacing, dialogs and state transitions together with the animation. Replace fixtures with authoritative server results and gate any real connected-state assertion on actual evidence. This is QA work, not production approval or the deferred `/delivery` package.

## QA checks

- **Responsive review:** Entry, choices, confirmation, QR, setup, organisation and completion were checked at desktop and 375px mobile widths. Entry/review also fit at 320px; expanded manual values did not create mobile horizontal overflow.
- **Consent and errors:** Keyboard Space toggles the switch; reopening resets it OFF. Empty, malformed, unknown, used and connection-error codes were exercised, as was recoverable activation failure with gifting still available.
- **Interactions:** Native help-dialog open/close and focus return, three device guides, manual-detail disclosure, profile copying, clipboard-denied fallback, optional blank fields and required custom-folder names were checked.
- **Persistence and motion:** Storage-denied fallback stays truthful, restarting clears organisation and cancels pending activation work, and reduced-motion mode removes the key animation. No page JavaScript errors were observed in those tested flows.

## Latest header and presentation revision

- **Normal header:** 64px source-style Openline navigation, official mark, Destinations / Features / Pro / Resources, Openline+ Beta, cart, Sign In and EN / $. Mobile has support, cart and an expandable navigation dialog. Locale is currently English/USD only; no new account or checkout backend is connected.
- **Entry buttons:** Gift this code and Go to my account are larger icon-and-arrow buttons with distinct orange-tinted and neutral treatments.
- **Removed clutter:** The Check my device / Need a hand row is gone. Customer-facing demo, no-real-activation, simulated-connection and browser-tab-save notices are removed throughout the flow.
- **Review controls:** Scenario testing and restart remain behind a footer review-controls entry. Activation still requires the readiness switch and stays a safe local fixture; QR and `.invalid` manual details cannot install a real plan.

## QR reminder and quick completion actions

- **Install your eSIM:** The QR is repeated in a compact card above iPhone/Samsung/Pixel instructions, with a download action. Users do not need to close setup to find it.
- **Unambiguous data settings:** Select Openline as the primary mobile-data line. Turn OFF mobile data on other SIMs/eSIMs and automatic data switching. Turn ON roaming for the Openline eSIM. The details clarify that other lines may remain available for calls and texts.
- **Connection refresh:** A short airplane-mode ON/OFF reminder follows the three settings. Let the phone reconnect, then try a webpage; this is not a guarantee or detected connectivity.
- **Aligned completion buttons:** Icon wrappers and text use explicit flex centring; the view/edit icon and label centres are aligned.
- **View my eSIM:** Opens a small native dialog with the current label, QR, download and collapsed manual details. The completion screen stays underneath.
- **Edit label or folder:** Opens a focused form with saved values. Existing folders and new folders work; unnamed new folders are rejected. Save synchronises all profile displays without returning to previous steps. Cancel, Escape and backdrop dismissal discard uncommitted edits.
- **Boundaries unchanged:** Only label/folder storage is attempted locally. The QR and credentials remain safe fixtures, and no device settings or service activation are performed.

## Gift ownership and transfer unlock

- **Owner email:** Gifting explains Paul’s product rule: the purchase owner will still receive an email to validate the purchase. No email destination, delivery time or completed validation is invented.
- **Explicit unlock:** Unused codes begin “Locked for transfer”. Unlock for transfer opens a confirmation explaining that anyone with the unlocked code can redeem it, without starting plan validity or removing owner email validation.
- **Ready to share:** Confirming changes the state to “Ready to transfer · not activated” and reveals Copy gift message. Cancel or closing the pending confirmation does not unlock.
- **State safeguards:** Unlock state is scoped to each code in memory, so a different code never inherits permission. Restart clears the run; used/activated codes cannot enter gifting. No code or unlock state is stored persistently.
- **Production boundary:** This is local concept behaviour, not an ownership change. A live version needs authenticated ownership checks, transfer/unlock and purchase-validation email services. No email was sent and no real purchase was unlocked during this work.

## Recipient journey

- **Open it:** Use [the recipient entry](https://openline-anims-review.vercel.app/qa/start?recipient=1), “Received a gift?” on the normal entry, or “Open recipient view” after a sender unlocks a code. The latter carries the code in memory into the recipient input, not into the URL or browser storage.
- **Receive and check:** The recipient gets a distinct gift welcome, code input and read-only check. Review shows the plan and its unlocked state, without the sender’s gifting actions or private account information.
- **Choose the moment:** Keep it for later leaves the code unused. Redeem & activate opens the existing readiness switch with recipient-specific wording about immediate validity and no further transfer.
- **Finish the gift:** The selected code-to-profile animation leads directly to “Your gift is now your eSIM”, QR/manual details, Setup & connect, Make it yours and the account handoff. Quick QR/edit modals continue working without backtracking.
- **Blocked paths:** Locked transfer asks the sender to unlock. Pending purchase validation asks the purchase owner to confirm their email. Both prevent activation and offer Check again plus a copyable private message. No email is resent or fabricated.
- **Retry and reuse:** Activation failure leaves the gift unused. Successful activation marks its code redeemed in the current run; the sender cannot redeem that same code again. This in-memory behaviour is not a substitute for server-side single-use enforcement.
- **Separate organisation:** Only label/folder values are session-stored, under separate purchase and recipient keys. Sender names, emails, labels, custom folders and purchase codes are not handed over to the recipient.
- **Review controls:** Journey selects sender or recipient. Gift locked and owner-validation-pending responses join the existing unknown, used, network and activation-failure states. Ready is the eligible gift fixture; production must obtain eligibility and validation status from the server.
- **Backend boundary:** No live redemption, email validation, recipient account binding or eSIM activation is performed. The production claim must validate all eligibility conditions and consume the code atomically before reporting activation success.
