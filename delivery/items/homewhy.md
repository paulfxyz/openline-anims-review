# The Handover

homewhy · option 3 · ID `hw-handover` · Selected direction

[Isolated preview](https://openline-anims-review.vercel.app/delivery/preview.html?key=homewhy) · [In-context QA](https://openline-anims-review.vercel.app/qa/home)

## Files

- Original: `js/home-why.js`, export `HOME_WHY_VARIANTS`.
- Frozen: `delivery/runtime/js/home-why.js`.
- Entry point: `delivery/runtime/mount.js`, key `homewhy`.
- Copy the whole runtime directory plus manifest; shared relative imports and init closures are required.

## Fit and identity

Native viewBox: `0 0 407 302`. Measured slot: 407 × 302. Identity: As shipped.
Native geometry closely matches the measured slot. Check responsive label size and companion pills.

## Mount

```js
const control = await mountAnimation(element, 'homewhy');
// control.setPaused(true); control.dispose();
```

## Integration checks

Keep native Openline typography, unique SVG IDs and lifecycle cleanup. Check desktop/mobile, reduced motion, pause, pills and surrounding padding. Illustration labels/counts/prices are presentation fixtures unless wired to real data; reconcile claims with the current connectivity copy. Do not copy reviewer controls or treat this artwork as a working network/provisioning integration.
