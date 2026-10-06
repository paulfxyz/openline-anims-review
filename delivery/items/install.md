# Chapter Deck

install · option 3 · ID `ig-chapters` · Selected direction

[Isolated preview](https://openline-anims-review.vercel.app/delivery/preview.html?key=install) · [In-context QA](https://openline-anims-review.vercel.app/qa/installation-guide)

## Files

- Original: `js/install-cta.js`, export `INSTALL_VARIANTS`.
- Frozen: `delivery/runtime/js/install-cta.js`.
- Entry point: `delivery/runtime/mount.js`, key `install`.
- Copy the whole runtime directory plus manifest; shared relative imports and init closures are required.

## Fit and identity

Native viewBox: `0 0 576 324`. Measured slot: 576 × 324. Identity: As shipped.
Native geometry closely matches the measured slot. Check responsive label size and companion pills.

## Mount

```js
const control = await mountAnimation(element, 'install');
// control.setPaused(true); control.dispose();
```

## Integration checks

Keep native Openline typography, unique SVG IDs and lifecycle cleanup. Check desktop/mobile, reduced motion, pause, pills and surrounding padding. Illustration labels/counts/prices are presentation fixtures unless wired to real data; reconcile claims with the current connectivity copy. Do not copy reviewer controls or treat this artwork as a working network/provisioning integration.
