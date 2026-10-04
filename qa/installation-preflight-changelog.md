# Installation preflight: purchase code to Openline eSIM

Updated 2026-10-04 from [Paul's latest marked section](https://snap.paulfleury.com/tdNf9Nv5).
Review it in the [QA installation guide](https://openline-anims-review.vercel.app/qa/installation-guide#ig-preflight).

## Current layout for Irina

- Two large comparison columns: **Purchase code → Openline eSIM**. The order code is what the
  customer redeems; the resulting profile is what they install on their phone.
- Below the comparison, retain the three short steps: find the code, create the eSIM, install/connect.
- The main orange redemption action is 56px high with larger type and icon. It links to `/start`.
  In this review app that path redirects to the existing `/qa/start` preview, so the experience
  remains in QA. It does not provision a profile by itself.
- Keep the compatibility checker and the existing “I already have my eSIM” installation anchor.
- Two larger icon-led buttons replace the former small detail links. Each opens a dedicated
  native dialog with readable text, clear close controls, focus management and mobile scrolling.

The prior three-small-preview arrangement and inline code disclosure are superseded by this
latest layout. The old text-heavy explainer plus separate four-step roadmap also remains retired.

## Which code is which?

The dedicated code dialog explains:

- **Openline purchase code:** comes from the order email/dashboard and is entered at `/start`.
  It is not entered in the phone’s eSIM settings.
- **eSIM activation code:** supplied with the eSIM profile, alongside the SM-DP+ address, for
  manual phone setup. The QR code is the alternative installation method.
- Older wording called the purchase code an “activation code”; the two codes are not interchangeable.
- A purchase code can be gifted before activation. Confirming at `/start` starts validity and ends
  gifting, so customers travelling later should wait.

The example code and QR illustration are not installable credentials.

## Connection checklist

The second dialog incorporates Paul's supplied Openline setup guidance:

- Activate just before departure or once at the destination.
- Use stable, private Wi-Fi during activation. Avoid airport/public Wi-Fi and 4G/5G, since those
  networks may block the profile download or activation process.
- Select the Openline eSIM as the primary Mobile Data / Cellular Data line.
- Turn automatic data switching **OFF**.
- Turn data roaming **ON for the Openline eSIM**, not the home SIM.

The settings badges are recommendations, not interactive toggles or detected device state.
The preview cannot change the phone’s settings. Device labels may vary.
“Open setup guide” closes the dialog and moves focus to the existing installation instructions.

## Styling and behaviour

Use the native Openline font, orange actions, consistent panel padding, larger help-button text
and short arrow motion. The large comparison panels stack on mobile; the three steps remain below.
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
`installation-preflight-simplified` and the new `installation-preflight-detail-modals` record.
This remains QA work; no `/delivery` is created.
