# Cards, Alive

ombook · option 6 · ID `ob-alive` · Selected direction

[Isolated preview](https://openline-anims-review.vercel.app/delivery/preview.html?key=ombook) · [In-context QA](https://openline-anims-review.vercel.app/qa/omdm-market)

## Files

- Original: `js/omdm-book.js`, export `OMDM_BOOK_VARIANTS`.
- Frozen: `delivery/runtime/js/omdm-book.js`.
- Entry point: `delivery/runtime/mount.js`, key `ombook`.
- Copy the whole runtime directory plus manifest; shared relative imports and init closures are required.

## Fit and identity

Native viewBox: `0 0 1280 420`. Measured slot: 1232 × 404. Identity: As shipped.
Native geometry closely matches the measured slot. Check responsive label size and companion pills.

## Mount

```js
const control = await mountAnimation(element, 'ombook');
// control.setPaused(true); control.dispose();
```

## Integration checks

Keep native Openline typography, unique SVG IDs and lifecycle cleanup. Check desktop/mobile, reduced motion, pause, pills and surrounding padding. Illustration labels/counts/prices are presentation fixtures unless wired to real data; reconcile claims with the current connectivity copy. Do not copy reviewer controls or treat this artwork as a working network/provisioning integration.
