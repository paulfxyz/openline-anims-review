# Topic Picker

blog · option 2 · ID `blogtopics` · Current Blog default; shared-slot decision remains

[Isolated preview](https://openline-anims-review.vercel.app/delivery/preview.html?key=blog) · [In-context QA](https://openline-anims-review.vercel.app/qa/blog)

## Files

- Original: `js/iot-blog.js`, export `BLOG_VARIANTS`.
- Frozen: `delivery/runtime/js/iot-blog.js`.
- Entry point: `delivery/runtime/mount.js`, key `blog`.
- Copy the whole runtime directory plus manifest; shared relative imports and init closures are required.

## Fit and identity

Native viewBox: `0 0 640 460`. Measured slot: 576 × 540. Identity: Newsprint.
Native artwork and destination slot differ. QA context-fit is included; validate in the final responsive component, never stretch.

## Mount

```js
const control = await mountAnimation(element, 'blog');
// control.setPaused(true); control.dispose();
```

## Integration checks

Keep native Openline typography, unique SVG IDs and lifecycle cleanup. Check desktop/mobile, reduced motion, pause, pills and surrounding padding. Illustration labels/counts/prices are presentation fixtures unless wired to real data; reconcile claims with the current connectivity copy. Do not copy reviewer controls or treat this artwork as a working network/provisioning integration.
