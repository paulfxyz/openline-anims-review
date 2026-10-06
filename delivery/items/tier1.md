# Price Auction

tier1 · option 3 · ID `auction` · Selected direction

[Isolated preview](https://openline-anims-review.vercel.app/delivery/preview.html?key=tier1) · [In-context QA](https://openline-anims-review.vercel.app/qa/multiple-tier1)

## Files

- Original: `js/registry.js`, export `VARIANTS`.
- Frozen: `delivery/runtime/js/registry.js`.
- Entry point: `delivery/runtime/mount.js`, key `tier1`.
- Copy the whole runtime directory plus manifest; shared relative imports and init closures are required.

## Fit and identity

Native viewBox: `0 0 640 560`. Measured slot: 576 × 420. Identity: As shipped.
Native artwork and destination slot differ. QA context-fit is included; validate in the final responsive component, never stretch.

## Mount

```js
const control = await mountAnimation(element, 'tier1');
// control.setPaused(true); control.dispose();
```

## Integration checks

Keep native Openline typography, unique SVG IDs and lifecycle cleanup. Check desktop/mobile, reduced motion, pause, pills and surrounding padding. Illustration labels/counts/prices are presentation fixtures unless wired to real data; reconcile claims with the current connectivity copy. Do not copy reviewer controls or treat this artwork as a working network/provisioning integration.
