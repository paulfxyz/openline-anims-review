# France plan-selector redesign: assets and reference

This is a focused conversion-flow alternative to the supplied
[France review page](https://openline-revisions-hub.vercel.app/country-fr), inspected on
2026-10-04. The source page is not changed. The alternative is inside `/qa`.

## Identity and retained assets

- **Direction:** light, performance-focused product UI. The existing Openline identity takes
  priority over generic ecommerce templates: white and warm neutral surfaces, black text,
  Openline orange `#FF5314`, native sans-serif UI, restrained rounded rectangles and short arrow motion.
- **Typography:** the actual source's computed family for h1, h2, body and buttons is
  `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`.
  This is the real brand UI stack, not a substitute. Play remains reserved for the existing
  wordmark; no alternate display font is introduced.
- **Logo:** the official mark already hosted at `/qa/assets/start-brand-mark.png`;
  the source uses [this same Openline asset](https://openline-revisions-hub.vercel.app/assets/384308522d5465642033b4d908da028d55c6aeb6-BKkbtTfp.png).
- **Hero:** retain the source's
  [France landmark photograph](https://openline-revisions-hub.vercel.app/assets/09d59bc7e55dc6aaf6f731773a47432ec242154a-BM3QEqNZ.png),
  localised to `france-landmark.webp`. Use its existing cover crop, never stretch it.
- **Surrounding reference page:** source header, hero, coverage, comparison, review, FAQ and footer
  structures remain as review context. Existing imagery is resolved to already-localised QA
  assets where available, otherwise the original source URL. Legacy claims and reviews are
  explicitly reference content, not newly verified evidence.
- **Kitty badge:** reuse the existing local `/img/kitty-ph.png` in the inherited campaign badge,
  with `object-fit: contain` so the thumbnail does not distort the original artwork.
- **Motion:** retain surrounding captured visuals. New motion is limited to the plan-type state,
  selected-card feedback, price-summary transition, button arrows and a quiet profile-connector
  illustration in the policy modal. Text and prices never blink; reduced motion is static.

## Product data and safety

- All 25 fixed-package data amounts, validities and USD prices, and the six unlimited presets
  were read from the live supplied review page. They are labelled review fixtures, not a live quote.
- Custom-duration prices follow the source's piecewise linear interpolation between presets
  and per-day extrapolation outside them, confirmed in its
  [frontend bundle](https://openline-revisions-hub.vercel.app/assets/index-BGxHRtu5.js).
- Date selection counts both start and end date and says so. The prototype supports 1–365 days;
  that is a preview input guard, not an asserted commercial maximum.
- Purchase review and cart actions are browser-only demonstrations, with no checkout, payment,
  provisioning, account or server persistence.
- The fair-use modal is built from the latest user-approved wording in
  `qa/unlimited-plan-copy.json`, rather than inventing a second policy.
