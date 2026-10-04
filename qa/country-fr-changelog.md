# France: original template with light Unlimited refinements

Updated 2026-10-04 after Paul's rejection of the full selector redesign.
The [original France template](https://openline-revisions-hub.vercel.app/country-fr) is the
design reference. The existing QA URL is retained so previously shared links show the correction.

## Rejected: do not implement

The large Unlimited / Fixed choice cards, dark sticky selection summary and rebuilt fixed-package
cards were rejected. They are removed from the served page and their stylesheet, script and markup
fragment have been deleted. This is not an additional alternative to keep or include in `/delivery`.

## Current handoff for Irina

- Preserve the original hero, centered Unlimited card, Data Bundles below it, fixed-card design,
  source orange palette, native font and surrounding page.
- Limit visual changes to the Unlimited block: align the date selector and day counter in a
  lighter control strip; keep all six presets level, with no selected-card scale jump; reduce
  heavy borders/shadows; align feature rows; give Purchase / Add to Cart consistent heights and icons.
- Use Paul's restored original Unlimited introduction: “Perfect for heavy users. Stream, video call,
  and browse without limits.” Keep the corrected plan-wide promise and the separate fair-use
  disclosure; do not restore the claim that every unlimited plan is free from local-operator throttling.
- Show “Fair usage applies” without an underline, followed by a separate question-mark button.
  Use a compact policy modal in the original template's style, not the rejected large selector UI.
- The modal explains fixed-data full-speed allowance, unlimited with no Openline-imposed cap or
  throttling, possible local MNO fair-use slowdown after heavy use within 24 hours, and trying
  another profile/infrastructure when throttling is frequent, without guaranteeing an improvement.
- “View fixed packages” closes the modal and scrolls to the original Data Bundles section.
  The hero CTA still scrolls to Choose Your Plan; there is no plan-type chooser or sidebar.

## Calendar range modal restored

“Select travel dates” opens the normal calendar-based start/end picker again, replacing the
temporary pair of date-input fields. This follows the original two-month desktop pattern rather
than introducing another page layout.

- Two readable month grids on desktop; one navigable month on mobile, with full-size day targets.
- Orange start/end points, a soft in-range band and pointer preview while choosing an end date.
- Clear start/end summaries, editable endpoints, Reset and a live inclusive day count.
- Previous/next month navigation, disabled past dates and keyboard arrows, Home/End, Page Up/Down;
  Shift+Page Up/Down moves by year. Same-day and reverse-order selections are supported.
- Apply commits the range to the existing day counter, compact two-line date label and price.
  Cancel, Escape and backdrop dismissal discard changes; reopening restores only applied dates.
- The quote uses `unlimitedPrice()` and USD, exactly like the Unlimited block. The original
  reference modal's fixed daily estimate and mixed `$`/EUR label are not copied.
- Calendar-day arithmetic covers daylight-saving and leap-day boundaries. The existing
  1–365-day preview guard remains; choosing dates never activates or schedules an eSIM.

The panel/export has a separate `country-fr-calendar-range` record for Irina. No surrounding
page capture or Fixed Plan layout was changed during this modal-only update.

## Unlimited introduction restored

At Paul's explicit request on 2026-10-04, only the description below “Unlimited Data” changes:

- Before: “No data cap from Openline. Local network fair use applies.”
- After: “Perfect for heavy users. Stream, video call, and browse without limits.”

The separate fair-use notice, its policy modal, the plan-wide explanation and calendar range
picker remain unchanged. The panel/export records this as `country-fr-unlimited-intro`.

## Prototype boundaries

Duration presets, editable day count, date-duration selection and local purchase/cart previews
work without a real checkout. Data Bundles keeps its captured source-card markup, including its
popular view and catalogue filters. Its original calculator can be used on the source reference
page; it is not reimplemented as part of this focused Unlimited refinement.

Prices are review fixtures, not live quotes. The 1–365-day input guard is a preview safeguard, not
a commercial promise. Dates calculate duration, not activation scheduling. No payment, order,
provisioning, account synchronisation or server persistence is connected. Existing surrounding
reviews and comparison claims remain reference content rather than newly verified evidence.

## Files and reporting

- `qa/tools/country_fr.py`: capture original markup and apply scoped refinements.
- `qa/country-fr-refinement.css`: small Unlimited-only visual adjustments and compact dialog styles.
- `qa/country-fr-refinement.js`: source-control behaviour and safe local demonstrations.
- `qa/calendar-range.js`: inclusive range selection, calendar navigation and accessible keyboard behaviour.
- `qa/redesign/country-fr-dialogs.html`: compact policy, date and preview dialogs.
- `qa/unlimited-plan-copy.json`: shared current product-policy wording.
- `qa/country-fr-data.js`: preserved source-review catalogue and pricing function.

The QA panel and Copy for Computer export record the rejected design separately from the current
`country-fr-unlimited-refinement` handoff. The original remote site and other QA pages are unchanged.

For modal-only edits, run `python qa/tools/country_fr.py --refresh-local` to refresh the controlled
dialog group and scoped CSS without recapturing or rewriting the original surrounding page.
