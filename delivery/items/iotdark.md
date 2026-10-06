# Night Side

iotdark · option 1 · ID `c3-night` · Selected direction

[Isolated preview](https://openline-anims-review.vercel.app/delivery/preview.html?key=iotdark) · [In-context QA](https://openline-anims-review.vercel.app/qa/iot)

## Files

- Original: `js/iot-cells.js`, export `C3_VARIANTS`.
- Frozen: `delivery/runtime/js/iot-cells.js`.
- Entry point: `delivery/runtime/mount.js`, key `iotdark`.
- Copy the whole runtime directory plus manifest; shared relative imports and init closures are required.

## Fit and identity

Native viewBox: `0 0 740 234`. Measured slot: 740 × 234. Identity: Chrome.
Native geometry closely matches the measured slot. Check responsive label size and companion pills.

## Mount

```js
const control = await mountAnimation(element, 'iotdark');
// control.setPaused(true); control.dispose();
```

## Integration checks

Keep native Openline typography, unique SVG IDs and lifecycle cleanup. Check desktop/mobile, reduced motion, pause, pills and surrounding padding. Illustration labels/counts/prices are presentation fixtures unless wired to real data; reconcile claims with the current connectivity copy. Do not copy reviewer controls or treat this artwork as a working network/provisioning integration.
