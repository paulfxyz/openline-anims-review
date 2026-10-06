# Two Doors

contact · option 10 · ID `ct-doors` · Selected direction

[Isolated preview](https://openline-anims-review.vercel.app/delivery/preview.html?key=contact) · [In-context QA](https://openline-anims-review.vercel.app/qa/contact)

## Files

- Original: `js/contact-affil.js`, export `CONTACT_VARIANTS`.
- Frozen: `delivery/runtime/js/contact-affil.js`.
- Entry point: `delivery/runtime/mount.js`, key `contact`.
- Copy the whole runtime directory plus manifest; shared relative imports and init closures are required.

## Fit and identity

Native viewBox: `0 0 576 420`. Measured slot: 576 × 420. Identity: As shipped.
Native geometry closely matches the measured slot. Check responsive label size and companion pills.

## Mount

```js
const control = await mountAnimation(element, 'contact');
// control.setPaused(true); control.dispose();
```

## Integration checks

Keep native Openline typography, unique SVG IDs and lifecycle cleanup. Check desktop/mobile, reduced motion, pause, pills and surrounding padding. Illustration labels/counts/prices are presentation fixtures unless wired to real data; reconcile claims with the current connectivity copy. Do not copy reviewer controls or treat this artwork as a working network/provisioning integration.
