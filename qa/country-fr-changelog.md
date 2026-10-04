# France plan-selector redesign

Date: 2026-10-04. This is a separate `/qa/country-fr-redesign` alternative to the
[supplied France review page](https://openline-revisions-hub.vercel.app/country-fr).
The source app is unchanged. This is not a production checkout.

## Irina handoff

Apply the structure, copy, colours, motion and extra elements together, not only the illustrations.
The QA panel and global Copy for Computer export include `country-fr-plan-selector` and
`country-fr-fair-use`; this page is also in the quick page menu and QA hub.

- **Hero action:** “Buy your eSIM in France now” and the lower “View Plans” action scroll
  to the plan-type choice instead of opening a purchase modal or skipping configuration.
- **Plan types:** two prominent, keyboard-accessible Unlimited Plan / Fixed Plan choices replace
  the always-stacked offers. Each explains its actual promise before selection.
- **Unlimited configuration:** 3, 5, 7, 10, 15 and 30-day presets; custom whole-day input;
  travel-date mode with both dates included; clear invalid-range/input handling.
- **Fixed configuration:** five source-curated popular choices, all 25 packages on demand,
  data and validity filters, package selection, no-results state and reset. Validities are
  taken from the actual source fixture rows rather than empty 7/14-day filters.
- **Selection summary:** one consistent France/data/duration/price/benefit panel. No quotation
  remains actionable after an invalid duration or a filter removes the selected fixed package.
  Mobile package selection moves to the summary; desktop keeps it beside the configuration.
- **Actions:** purchase review and demo cart add/view/remove are functional local previews,
  including repeated items. No money is taken and no actual order/profile is created.
- **Colour and type:** the established Openline orange, black, warm whites and native UI font.
  No new typeface. Existing header, France photograph and surrounding page are retained.
  The reused Kitty thumbnail is contained at its natural aspect ratio rather than stretched.
- **Motion:** restrained plan-panel transitions, card state feedback, price nudge, source-style
  arrow motion and a slow profile-connector dot. Text/prices do not blink; reduced motion is static.

## Fair-use trigger and modal

- Before: dotted underline on the entire “Fair usage applies” button and a small plain-text modal.
- After: un-underlined explanatory text with a separate question-mark icon and accessible name.
  On mobile the icon has a 44px hit target without an oversized visible symbol.
- The native dialog has the official Openline mark, two readable plan-promise cards, a distinct
  local-network notice and an explanation of trying another eSIM infrastructure.
- “Choose a Fixed Plan” closes the dialog and changes the plan type. A secondary action returns
  to the current selection. Escape, close, backdrop and keyboard focus are supported.
- Links lead to the current [Unlimited explanation](https://openline-anims-review.vercel.app/qa/unlimited)
  and [Multi Tier-1 profile explanation](https://openline-anims-review.vercel.app/qa/multiple-tier1#profile-switching).

The policy text is generated from `qa/unlimited-plan-copy.json`:

- Fixed packages guarantee every purchased GB at full available network speed without usage-based
  throttling. Buying 10 GB means all 10 GB.
- Unlimited plans have no cap or throttling imposed by Openline. Local MNO fair-use rules may
  still temporarily reduce speed after heavy use within 24 hours; thresholds/recovery vary.
- Fixed packages are recommended when avoiding that throttling is the priority.
- If unlimited throttling recurs, Openline will try another profile/provider infrastructure with
  a potentially better-fitting fair-use policy, without guaranteeing an improvement.
- Network conditions can still affect actual speed. Replacement may require installation;
  balance/validity carry-over, charges, universal thresholds and automatic resets are not invented.

## Data provenance and preview boundaries

The six unlimited prices and 25 fixed-package prices were checked in the supplied review page.
Custom-duration pricing follows its piecewise linear interpolation and per-day extrapolation,
as implemented in the [source frontend](https://openline-revisions-hub.vercel.app/assets/index-BGxHRtu5.js).
These are review fixtures, not confirmed commercial inventory or live quotes.

The input accepts 1–365 days as a prototype guard, not a new product rule. Travel dates only
calculate a duration; they do not schedule activation. Cart/selection memory lasts only for the
open page, with no account or server persistence. Surrounding inherited reviews, comparisons
and claims are marked reference content and remain outside this focused redesign.

## Editable files

- `qa/redesign/country-fr-plans.html`: selection and modal markup.
- `qa/country-fr.css`: scoped native-brand styling, responsiveness and motion.
- `qa/country-fr.js`: accessible selection, dates, filtering, modal and demo-cart behaviour.
- `qa/country-fr-data.js`: source-review fixtures and pricing function.
- `qa/tools/country_fr.py`: read-only source capture and alternative-page builder.
- `qa/assets/country-fr-manifest.md`: real assets, exact native font and style evidence.

Run `python qa/tools/country_fr.py` after changing the fragment, stylesheet or shared policy data.
The source screenshot/capture is not a production approval and `/delivery` remains deferred.
