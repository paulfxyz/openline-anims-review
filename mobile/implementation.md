# Openline Mobile: 28 additional views

These are new companion views and interactive workflows for Irina and Kerem. They extend, rather than overwrite, [Irina’s 19-screen app reference](https://openline-revisions-hub.vercel.app/app-screens), inspected on 7 October 2026.

## Match the existing stack

The reference bundle identifies React 18.3.1 and Lucide React 0.487.0, and the rendered page uses Tailwind-style utilities, native system typography and Openline orange `#FF5314`. The source page's phone containers measure 340 × 700px, with 24px corners; buttons use 12px corners and bold 14–16px labels. The new gallery follows those measurements and component conventions.

The editable extension uses React 18.3.1, React DOM 18.3.1, Lucide React 0.487.0, Vite and Tailwind 4. It is a browser-rendered design reference, not a React Native project or a compiled iOS/Android application. The exact upstream Vite/Tailwind patch versions were not confirmed, and the upstream source repository was not available in the connected account's inspected repository list.

## Where to start

- Open [the mobile extension](https://openline-anims-review.vercel.app/mobile).
- Browse all 28 views, filter by workflow, or start one of the six connected journeys.
- “Interactive flow” opens the live phone, workflow steps, production notes and a screen switcher.
- Payment pending, gift-recipient and provisioning views expose additional state controls outside the customer UI.
- “Copy view link” points directly to a screen. Only the screen ID enters the URL, never a purchase code or personal details.

## Source and build

`mobile-src/src/catalog.js` defines all 28 screens, six workflows and their backend notes. `mobile-src/src/main.jsx` contains the reusable mobile primitives, screen components and review shell; `style.css` contains the matched visual system.

```sh
cd mobile-src
npm ci
npm run build
```

The build writes static assets into `mobile/`, preserving the implementation documents there. Run the existing repository preview server with `node delivery/serve.mjs`, then open `/mobile`; or use `npm run dev` inside `mobile-src` while developing. The mark and safe QR fixture are copied into `mobile-src/public/` so the new mobile UI does not depend on a separate QA server. Delivery/QA navigation links require the integrated repository host.

## Reusable components

`StatusBar`, `BottomNav`, `IconTile`, `Chip`, `Button`, `Row`, `Notice`, `Plan`, `Summary`, `Toggle`, `Sheet` and the phone container follow the same Openline patterns. Import the selected view into Irina’s component tree, replace the local callbacks with application navigation, and use the current project’s data and dialog infrastructure.

The gallery previews are deliberately inert. Open a view to interact with its controls; the native dialogs support keyboard dismissal and keep irreversible actions behind an explicit review step.

## Six connected workflows

- **Purchase and payment:** cart, receipt details, payment method, bank authentication, pending reconciliation, receipt and purchase-code details.
- **Give and receive:** code details, transfer unlock, gift message, recipient eligibility, owner validation pending and activation readiness.
- **Activate and connect:** readiness consent, provisioning/recovery, QR/manual details, iPhone/Android installation, data settings, label/folder and account return.
- **Manage eSIMs:** profile, rename/folder, folder creation, fixed-data top-up, usage and reminders.
- **Connection support:** troubleshooting, fair-use explanation, profile-replacement review and KB/AI/human support.
- **Orders and account:** receipts/refund status, privacy preferences, export and deletion review.

## Product wording carried forward from QA

The existing app reference contains older wording that conflicts with the subsequent QA decisions. This extension intentionally uses the current product direction rather than copying those discrepancies:

- Checking a purchase code does not activate it. Explicit confirmed activation starts validity immediately, not a blanket “starts on install” claim.
- An unused code must be unlocked for gifting; owner purchase-email validation still applies.
- Fixed packages provide the full purchased allowance at full available network speed without usage-based throttling. Unlimited remains subject to local MNO fair use, including possible temporary slowdowns after heavy use within 24 hours.
- Replacing a profile is best-effort, may need installation and does not imply guaranteed improvement, free replacement or preserved balance/validity.
- The fixed-plan usage example is internally consistent: 6.8 GB remaining out of 10 GB means 68% remaining, not 32%.
- No universal purchase-code expiry, guaranteed installation time or automatic best-network switch is introduced.

Irina’s original page remains unchanged. Product rules still need agreement with the production backend and current terms before shipping.

## Real implementation boundaries

All profile, customer, price, payment and usage values are illustrative fixtures. No card data is collected, payment processed, email sent, server deletion executed or eSIM provisioned. Clipboard and text-receipt download are local user-triggered actions.

The QR is the existing non-installable QA asset. Manual fields use a `.invalid` SM-DP+ host and test activation code. Replace them with authenticated data; do not log or place provisioning secrets in URLs. ICCID identifies a profile/subscription; EID belongs to the device and is not invented here.

Bank authentication must use the real PSP’s hosted flow. Never implement the reference's explanatory bank screen as a form requesting banking credentials. Unknown payment/provisioning outcomes must reconcile the same idempotent operation before retrying.

Phone settings are user-confirmed instructions, not remotely changed settings. Use real native capabilities where supported and distinguish provisioned, installed and physically connected states.

Gift eligibility and one-time redemption require atomic server validation. Account labels/folders/preferences need authenticated persistence. Support messages, ticket creation, refunds, account data export and deletion require real service integration and truthful status.

## Assets and provenance

- UI, stack evidence and dimensions: [Irina’s app-screen reference](https://openline-revisions-hub.vercel.app/app-screens).
- Observed JavaScript bundle: [reference application bundle](https://openline-revisions-hub.vercel.app/assets/index-BGxHRtu5.js).
- Observed styling: [reference stylesheet](https://openline-revisions-hub.vercel.app/assets/index-CXnBdUOO.css).
- Openline mark: `mobile-src/public/brand.png`, an exact copy of the existing `qa/assets/start-brand-mark.png`; no replacement logo was invented.
- QR: `mobile-src/public/esim-qr.png`, an exact copy of existing `qa/assets/start-demo-qr.png`, a safe design fixture, not a provisioned eSIM.
- Icons: Lucide React, same observed version as the reference. Native system typography follows the source instead of introducing a different font.
