# Globe & Pin

aloha · option 6 · ID `ic-globe` · Selected direction

[Isolated preview](https://openline-anims-review.vercel.app/delivery/preview.html?key=aloha) · [In-context QA](https://openline-anims-review.vercel.app/qa/login)

## Files

- Original: `js/icons.js`, export `ICONS`.
- Frozen: `delivery/runtime/js/icons.js`.
- Entry point: `delivery/runtime/mount.js`, key `aloha`.
- Copy the whole runtime directory plus manifest; shared relative imports and init closures are required.

## Fit and identity

Native viewBox: `0 0 64 64`. Measured slot: 56 × 56. Identity: Light-neutral tile · #F3F4F6.
Native geometry closely matches the measured slot. Check responsive label size and companion pills.

## Mount

```js
const control = await mountAnimation(element, 'aloha');
// control.setPaused(true); control.dispose();
```

## Integration checks

Keep native Openline typography, unique SVG IDs and lifecycle cleanup. Check desktop/mobile, reduced motion, pause, pills and surrounding padding. Illustration labels/counts/prices are presentation fixtures unless wired to real data; reconcile claims with the current connectivity copy. Do not copy reviewer controls or treat this artwork as a working network/provisioning integration.
