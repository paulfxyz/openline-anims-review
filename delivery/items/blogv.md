# The Long Read

blogv · option 6 · ID `bv-long` · Retained alternative, shared Blog slot

[Isolated preview](https://openline-anims-review.vercel.app/delivery/preview.html?key=blogv) · [In-context QA](https://openline-anims-review.vercel.app/qa/blog)

## Files

- Original: `js/blogvideo.js`, export `BLOGV_VARIANTS`.
- Frozen: `delivery/runtime/js/blogvideo.js`.
- Entry point: `delivery/runtime/mount.js`, key `blogv`.
- Copy the whole runtime directory plus manifest; shared relative imports and init closures are required.

## Fit and identity

Native viewBox: `0 0 576 540`. Measured slot: 576 × 540. Identity: Newsprint.
Native geometry closely matches the measured slot. Check responsive label size and companion pills.

## Mount

```js
const control = await mountAnimation(element, 'blogv');
// control.setPaused(true); control.dispose();
```

## Integration checks

Keep native Openline typography, unique SVG IDs and lifecycle cleanup. Check desktop/mobile, reduced motion, pause, pills and surrounding padding. Illustration labels/counts/prices are presentation fixtures unless wired to real data; reconcile claims with the current connectivity copy. Do not copy reviewer controls or treat this artwork as a working network/provisioning integration.
