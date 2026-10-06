# Console Tabs

bizneeds · option 1 · ID `ntabs` · Selected direction

[Isolated preview](https://openline-anims-review.vercel.app/delivery/preview.html?key=bizneeds) · [In-context QA](https://openline-anims-review.vercel.app/qa/business)

## Files

- Original: `js/business-needs.js`, export `BIZ_NEEDS_VARIANTS`.
- Frozen: `delivery/runtime/js/business-needs.js`.
- Entry point: `delivery/runtime/mount.js`, key `bizneeds`.
- Copy the whole runtime directory plus manifest; shared relative imports and init closures are required.

## Fit and identity

Native viewBox: `0 0 640 460`. Measured slot: 584 × 440. Identity: As shipped.
Native artwork and destination slot differ. QA context-fit is included; validate in the final responsive component, never stretch.

## Mount

```js
const control = await mountAnimation(element, 'bizneeds');
// control.setPaused(true); control.dispose();
```

## Integration checks

Keep native Openline typography, unique SVG IDs and lifecycle cleanup. Check desktop/mobile, reduced motion, pause, pills and surrounding padding. Illustration labels/counts/prices are presentation fixtures unless wired to real data; reconcile claims with the current connectivity copy. Do not copy reviewer controls or treat this artwork as a working network/provisioning integration.
