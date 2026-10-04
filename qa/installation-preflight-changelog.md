# Installation preflight: a simpler visual flow

Date: 2026-10-04. Scope: the full preflight/roadmap region marked in
[Paul's screenshot](https://snap.paulfleury.com/G904sb1P), on the
[QA installation guide](https://openline-anims-review.vercel.app/qa/installation-guide#ig-preflight).

## Current handoff for Irina

Replace the previous two-column explainer and separate four-step roadmap with one clean card.
The main sequence is deliberately short and visual:

- **Find your code:** the purchase code comes from the order email or dashboard.
- **Create your eSIM:** redeem at `/start` for the eSIM profile, QR code and manual setup details.
- **Install and connect:** select the device and setup method in the existing guide.

Three matched previews make the transformation visible: purchase-code ticket, eSIM profile,
phone. The code is an example and the QR icon is illustrative, not an installable credential.
The flow runs horizontally on desktop and vertically on mobile, without flashing labels or
changing the selected hero animation.

## What stays easy to find

- Check compatibility opens the existing device checker.
- Redeem purchase code links to the `/qa/start` preview.
- I already have my eSIM jumps to the existing installation steps.
- Connection checklist jumps to the existing connection/activation instructions.
- A short visible timing notice says to wait before confirming activation at `/start` if travelling
  later: confirmation starts the plan and ends gifting.

## Details without repetition

The optional “Which code is which?” row retains the purchase-code/eSIM-profile distinction,
the former “activation code” naming and the separate manual eSIM activation code. Those details
are no longer repeated across several main paragraphs and a separate information banner.
The unsupported “about a minute” setup estimate is removed.

Keep the native Openline type, orange action colour, consistent preview sizing, generous but
compact spacing and short directional button-arrow feedback. Honour reduced motion.

## Scope boundary

Only the existing marked preflight region is rebuilt by `qa/tools/installation_preflight.py`.
The selected installation animation and all surrounding captured HTML remain unchanged.
No checkout, code redemption or eSIM provisioning is performed by this block.

The unchanged walkthrough still uses destination-activation/connection language. The new notice
explicitly concerns confirmation at `/start`; final product handoff must reconcile those terms
without silently rewriting unrelated instructions.

The QA panel and global export contain `installation-preflight-simplified`, with the earlier
two-block entry explicitly superseded. No `/delivery` is created.
