# Ticker Tape

t1market · option 5 · ID `mktape` · Selected direction

[Isolated preview](https://openline-anims-review.vercel.app/delivery/preview.html?key=t1market) · [In-context QA](https://openline-anims-review.vercel.app/qa/multiple-tier1)

## Files

- Original: `js/t1-market.js`, export `MARKET_VARIANTS`.
- Frozen: `delivery/runtime/js/t1-market.js`.
- Entry point: `delivery/runtime/mount.js`, key `t1market`.
- Copy the whole runtime directory plus manifest; shared relative imports and init closures are required.

## Fit and identity

Native viewBox: `0 0 640 460`. Measured slot: 584 × 440. Identity: As shipped.
Native artwork and destination slot differ. QA context-fit is included; validate in the final responsive component, never stretch.

## Mount

```js
const control = await mountAnimation(element, 't1market');
// control.setPaused(true); control.dispose();
```

## Integration checks

Keep native Openline typography, unique SVG IDs and lifecycle cleanup. Check desktop/mobile, reduced motion, pause, pills and surrounding padding. Illustration labels/counts/prices are presentation fixtures unless wired to real data; reconcile claims with the current connectivity copy. Do not copy reviewer controls or treat this artwork as a working network/provisioning integration.
