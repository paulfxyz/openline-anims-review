# Mobile extension verification

Scope: 28 new browser-based React views, six connected workflows and delivery integration. This is a UI design reference, not a native build or live backend implementation.

## Release checks

- Every catalog entry renders in gallery and player; every referenced workflow ID exists.
- Gallery search, empty state, category filters, screen jump, workflow restart, back/next and copied deep links.
- Cart remove/restore/quantity and consistent totals; invalid email prevents continuation; payment selection, bank return, pending/failure paths and receipt/code access.
- Gifting confirmation, unused/activated distinction, owner-validation pending and locked-recipient variants.
- Activation readiness initially off, confirmation/cancel, provisioning progress/failure/retry, QR/manual details and platform-specific setup.
- Required settings before continuing; labels/folders save/cancel, folder creation, top-up quote and fixed-plan arithmetic.
- Troubleshooting, fair-use explanation, replacement consent and local support presentation.
- Account privacy/deletion/export dialogs with no actual destructive operation.
- Native dialog Escape/focus handling, reduced motion, 375px responsive fit and no uncaught browser errors.
- Source/asset integrity, fresh live `/mobile`, delivery links and backward-compatible restoration of an r2 checklist progress snapshot.

Final test observations are appended after the browser pass. Real PSP, email, provisioning, native installation, account persistence and support delivery are not validated by these checks.

## Browser observations

All 28 catalog entries rendered in the interactive player and were captured at desktop size without inner horizontal overflow or uncaught page errors. The gallery restored all 28 entries after an empty search. At a 375px viewport, the QR, settings, profile and privacy views reported a 375px page width without horizontal overflow; the phone opens in interactive mode automatically.

The purchase path reached the purchase code and guarded activation, provisioning, QR, installation, required data settings, label/folder save and profile return. Invalid email was blocked, the readiness action started disabled, and the resulting profile retained the edited label and folder. An activated code no longer offered Gift.

Unlock cancellation stayed on the unlock view, confirmation opened gift sharing, locked recipient state disabled redemption, and pending owner validation led through its recheck view to readiness. Folder creation and top-up-to-cart amount propagation were checked. Replacement review required consent; local support messages rendered; account-deletion review opened a non-destructive dialog and Escape closed it. Payment pending stayed pending under the pending scenario, and failure returned to method selection.

Two issues found during testing were fixed: custom-switch artwork no longer intercepts the checkbox pointer target, and folder selectors have explicit accessible labels. These checks validate the browser UI reference only, not real provider operations.

The phone presentation was fitted to the mobile viewport without scaling down its text; in the 375 × 812 check its frame ran from y=303 to y=795, keeping the primary footer action available while the content scrolls internally. The 28 mobile checklist entries load from delivery, and an r2 progress link restored its verified referral item as 1 of 327 without marking new work complete.
