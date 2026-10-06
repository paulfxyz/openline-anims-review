# Current

pluskyc · option 0 · ID `ky-current` · Keep current

[Isolated preview](https://openline-anims-review.vercel.app/delivery/preview.html?key=pluskyc) · [In-context QA](https://openline-anims-review.vercel.app/qa/openline-plus)

## Files

- Original: `js/plus.js`, export `KYC_VARIANTS`.
- Frozen: `delivery/runtime/js/plus.js`.
- Entry point: `delivery/runtime/mount.js`, key `pluskyc`.
- Copy the whole runtime directory plus manifest; shared relative imports and init closures are required.

## Fit and identity

Native viewBox: `0 0 574 432`. Measured slot: 574 × 440. Identity: As shipped.
Native geometry closely matches the measured slot. Check responsive label size and companion pills.

## Mount

```js
const control = await mountAnimation(element, 'pluskyc');
// control.setPaused(true); control.dispose();
```

## Integration checks

Keep native Openline typography, unique SVG IDs and lifecycle cleanup. Check desktop/mobile, reduced motion, pause, pills and surrounding padding. Illustration labels/counts/prices are presentation fixtures unless wired to real data; reconcile claims with the current connectivity copy. Do not copy reviewer controls or treat this artwork as a working network/provisioning integration.
