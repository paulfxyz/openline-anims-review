# Installation preflight: install first, redeem if needed

Updated 2026-10-04 from [Paul's latest marked section](https://snap.paulfleury.com/5jVTMFQm).
Review it in the [QA installation guide](https://openline-anims-review.vercel.app/qa/installation-guide#ig-preflight).

## Current layout for Irina

- Two clear choices replace the compulsory redemption journey.
- **Primary, first:** “I already have my eSIM.” Visitors with a QR or manual details use the large
  orange **Install my eSIM** CTA. It scrolls and focuses the existing Learn step by step guide.
- **Secondary:** “I have a purchase code.” A neutral card explains that the code must first create
  a profile. Its outlined **Redeem purchase code** button links to `/start`, which redirects to
  `/qa/start` in this app. Both actions have 58px targets, aligned arrows and larger native type.
- Retain the compatibility checker, and stack the install-ready card first on mobile.
- Two larger icon-led buttons replace the former small detail links. Each opens a dedicated
  native dialog with readable text, clear close controls, focus management and mobile scrolling.

The earlier Purchase code → Openline eSIM bridge, three-step roadmap and primary redemption
button are superseded. The old text-heavy four-step arrangement also remains retired.

## Which code is which?

The dedicated code dialog explains:

- **Openline purchase code:** comes from the order email/dashboard and is entered at `/start`.
  It is not entered in the phone’s eSIM settings.
- **eSIM activation code:** supplied with the eSIM profile, alongside the SM-DP+ address, for
  manual phone setup. The QR code is the alternative installation method.
- Older wording called the purchase code an “activation code”; the two codes are not interchangeable.
- An unused purchase code can be unlocked for transfer in the `/start` gifting flow. The purchase
  owner still receives an email to validate the purchase. Confirming activation starts validity and
  ends gifting, so customers travelling later should wait.

The example code and QR illustration are not installable credentials.

## Connection checklist

The second dialog incorporates Paul's supplied Openline setup guidance:

- Activate just before departure or once at the destination.
- Use stable, private Wi-Fi during activation. Avoid airport/public Wi-Fi and 4G/5G, since those
  networks may block the profile download or activation process.
- Select the Openline eSIM as the primary Mobile Data / Cellular Data line.
- Turn mobile data on other SIMs/eSIMs **OFF**, along with automatic data switching.
- Turn data roaming **ON for the Openline eSIM**, not the home SIM.
- Briefly turn airplane mode ON, then OFF. Allow reconnection and try opening a webpage.

The settings badges are recommendations, not interactive toggles or detected device state.
The preview cannot change the phone’s settings. Device labels may vary.
“Open setup guide” closes the dialog and moves focus to the existing installation instructions.

## Styling and behaviour

Use the native Openline font, orange actions, consistent panel padding, larger help-button text
and short arrow motion. The two route cards stack on mobile, with installation first.
All important instructions are in the dedicated dialogs rather than repeated throughout the main card.
Reduced motion leaves icons static. Escape, backdrop dismissal and close buttons return to the trigger.

## Scope and regeneration

- Markup: `qa/redesign/installation-preflight.html`.
- Styles: `qa/installation-preflight.css`, scoped `.igp-*`.
- Interactions: `qa/installation-preflight.js`, including the two native dialogs and guide anchors.
- Builder: `python qa/tools/installation_preflight.py`.
- Route alias: `start.html`, redirecting `/start` to `/qa/start`.

The builder replaces only the preflight region. The selected installation animation and every
surrounding captured HTML block remain unchanged. The rest of the walkthrough is not silently rewritten.
No checkout, payment, code redemption, profile provisioning or actual device configuration is performed.

The panel and Copy for Computer export contain the current layout record
`installation-preflight-install-first` and the updated `installation-preflight-detail-modals` record.
This remains QA work; no `/delivery` is created.
