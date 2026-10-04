# Multi Tier-1: rolling operator showcase

The new presentation replaces only the static logo wall on the [Multi Tier-1 QA page](https://openline-anims-review.vercel.app/qa/multiple-tier1#operator-showcase). The section’s existing headline, network-availability wording, purchase CTA and surrounding selected animations are retained.

## Presentation

- **Two slow rows:** The original 36 operator names are split into two rows of 18, moving in opposite directions. Identical copies create seamless loops without a blank gap.
- **Consistent marks:** Original brand colours are preserved. Trimmed, proportionally resized WebP assets fit consistent logo areas, with readable names underneath.
- **Soft edges:** Horizontal masks let cards fade gently into the surrounding page instead of creating a hard cropped edge or another large boxed grid.
- **Less vertical space:** The default surface is two compact rows, not the former six-row wall. All 36 remain available without waiting through the animation.

## Controls and accessibility

- **Pause motion:** Explicit pause/play controls preserve the user’s choice. Hovering or focusing a ribbon temporarily pauses both rows.
- **Browse operators:** A native modal contains the complete roster and local search. Accent and punctuation normalisation supports queries such as “telefonica”, “att” and “3”.
- **Focus and dismissal:** Search receives focus; Escape, close and backdrop dismissal return it to the browse button. A sticky modal header keeps the close control available.
- **Reduced motion:** No automatic scrolling. Two native horizontally scrollable rows remain available, alongside the searchable directory.
- **Offscreen behaviour:** Animation stops when the section is outside the viewport, the browser tab is hidden, or the directory is open.
- **No duplicate announcements:** Repeated visual loop groups are `aria-hidden` and inert. Original names remain readable in the lists; decorative image alt text does not duplicate their captions.
- **Timing:** Desktop loops are 106s and 116s; mobile loops are 96s and 106s. Card widths and row gaps keep motion calm and linear.

## Source corrections

The original grid paired three names with the wrong logo images. The showcase corrects these without changing other pages’ shared assets:

- **Telefónica:** Replaced the duplicated Movistar mark with [Telefónica’s 2021 logo](https://commons.wikimedia.org/wiki/File:Telef%C3%B3nica_2021_logo.svg), consistent with [Telefónica’s brand page](https://www.telefonica.com/en/about-us/brands/).
- **Three:** Replaced the duplicated Vodafone mark with the [Three UK logo](https://logotyp.us/logo/three-uk/).
- **SK Telecom:** Replaced the KT image with the [SK Telecom logo](https://www.logo.wine/logo/SK_Telecom).

Original downloads, full asset URLs and derived-file notes are recorded in `qa/assets/operators/README.md`. This is presentation work, not verification of partnership agreements, operator availability or brand-use permission.

## Regeneration and handoff

- **Roster:** `qa/operators.json`, with original and corrected source paths.
- **Markup:** `qa/redesign/operator-showcase.html`.
- **Styles/runtime:** `qa/operator-showcase.css` and `qa/operator-showcase.js`.
- **Build:** `python qa/tools/operator_showcase.py`; only the marked logo-wall region is replaced.
- **Reporting:** The global QA panel and Copy for Computer export include `multi-tier1-operator-ribbons`. The work remains in `/qa`, not `/delivery`.

## Verification

- All 36 corrected/retained image assets load; loop copies have the same measured width as their originals.
- Automatic motion, hover pause, manual pause/resume and offscreen pausing were exercised.
- Desktop and 375px mobile layouts fit without horizontal page overflow. The full directory remains inside its modal viewport.
- Accent-insensitive and punctuation-insensitive search, “3” → Three, no-results feedback, Escape/focus return and the sticky close control were checked.
- Reduced-motion playback is disabled; the static rows remain manually scrollable.
- The source outside the logo-wall replacement and its added script tag is byte-identical, preserving the existing page and animation choices.
