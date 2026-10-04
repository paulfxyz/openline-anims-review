# France original-template refinement: assets

The design reference is the [original France review page](https://openline-revisions-hub.vercel.app/country-fr).
Paul rejected the new plan-type selector and dark summary; this version preserves the original
template and only lightly improves the Unlimited block.

- **Font:** the actual source uses `ui-sans-serif, system-ui, sans-serif` with emoji fallbacks.
  This is retained, not replaced by a new display font. The existing wordmark keeps its own styling.
- **Palette:** original Openline orange `#FF5314`, pale orange background, white cards and neutral text.
  No dark purchase sidebar or alternate country-page identity is introduced.
- **Hero:** the original [France photograph](https://openline-revisions-hub.vercel.app/assets/09d59bc7e55dc6aaf6f731773a47432ec242154a-BM3QEqNZ.png)
  is hosted as `france-landmark.webp`, retaining its cover crop.
- **Mark:** the existing local `start-brand-mark.png` matches the
  [source Openline mark](https://openline-revisions-hub.vercel.app/assets/384308522d5465642033b4d908da028d55c6aeb6-BKkbtTfp.png).
- **Other media:** inherited source assets are reused from the local QA cache or the original URLs.
  The local Kitty badge uses `object-fit: contain` to preserve its aspect ratio.
- **Product data:** all 25 fixed fixtures and six unlimited price presets were read from the supplied
  reference. Interpolation follows its [frontend implementation](https://openline-revisions-hub.vercel.app/assets/index-BGxHRtu5.js).
  They remain explicitly labelled review data, not live commercial prices.

There is no new hero artwork, font, marquee, selector animation or profile illustration in this
restrained version. Existing source hover treatments remain, with reduced-motion support.
