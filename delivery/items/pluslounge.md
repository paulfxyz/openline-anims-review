# Two Lanes, One Clock

pluslounge · option 1 · ID `lg-lanes` · Selected direction

[Isolated preview](https://openline-anims-review.vercel.app/delivery/preview.html?key=pluslounge) · [In-context QA](https://openline-anims-review.vercel.app/qa/openline-plus)

## Files

- Original: `js/plus.js`, export `LOUNGE_VARIANTS`.
- Frozen: `delivery/runtime/js/plus.js`.
- Entry point: `delivery/runtime/mount.js`, key `pluslounge`.
- Copy the whole runtime directory plus manifest; shared relative imports and init closures are required.

## Fit and identity

Native viewBox: `0 0 574 642`. Measured slot: 574 × 642. Identity: As shipped.
Native geometry closely matches the measured slot. Check responsive label size and companion pills.

## Mount

```js
const control = await mountAnimation(element, 'pluslounge');
// control.setPaused(true); control.dispose();
```

## Integration checks

Keep native Openline typography, unique SVG IDs and lifecycle cleanup. Check desktop/mobile, reduced motion, pause, pills and surrounding padding. Illustration labels/counts/prices are presentation fixtures unless wired to real data; reconcile claims with the current connectivity copy. Do not copy reviewer controls or treat this artwork as a working network/provisioning integration.
