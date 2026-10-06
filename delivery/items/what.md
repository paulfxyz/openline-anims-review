# Etch & Activate

what · option 1 · ID `etch` · Selected direction

[Isolated preview](https://openline-anims-review.vercel.app/delivery/preview.html?key=what) · [In-context QA](https://openline-anims-review.vercel.app/qa/global-esim)

## Files

- Original: `js/esim-what.js`, export `WHAT_VARIANTS`.
- Frozen: `delivery/runtime/js/esim-what.js`.
- Entry point: `delivery/runtime/mount.js`, key `what`.
- Copy the whole runtime directory plus manifest; shared relative imports and init closures are required.

## Fit and identity

Native viewBox: `0 0 640 460`. Measured slot: 584 × 420. Identity: Openline orange.
Native geometry closely matches the measured slot. Check responsive label size and companion pills.

## Mount

```js
const control = await mountAnimation(element, 'what');
// control.setPaused(true); control.dispose();
```

## Integration checks

Keep native Openline typography, unique SVG IDs and lifecycle cleanup. Check desktop/mobile, reduced motion, pause, pills and surrounding padding. Illustration labels/counts/prices are presentation fixtures unless wired to real data; reconcile claims with the current connectivity copy. Do not copy reviewer controls or treat this artwork as a working network/provisioning integration.
