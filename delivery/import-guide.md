# Importing the Openline delivery

This pack contains editable source, not a set of GIFs. Use its isolated animation runtime for illustrations and its page source maps for larger changes. It does not assume your production app uses the same framework as these static prototypes.

## Package layout

| Path | Purpose |
| --- | --- |
| `delivery/index.html` | Handoff hub with decisions, live previews, page routes and change ledger |
| `delivery/manifest.json` | Frozen decisions, IDs, dimensions, source modules, styles and page map |
| `delivery/runtime/` | Frozen selected-animation adapter and dependency modules |
| `delivery/items/<key>.md` | Per-item source, option, slot, colour and import notes |
| `delivery/brief.md` | Full instruction brief |
| `delivery/change-ledger.md` | Complete QA records, including superseded/rejected history |
| `delivery/copy-changes.md` | Exact before/after and new wording records |
| `delivery/page-matrix.md` | Page-by-page files, scope and implementation tests |
| `delivery/acceptance.md` | Production and UI acceptance checklist |
| `qa/*-changelog.md` | Detailed scope-specific implementation history |
| `qa/`, `js/`, `css/`, `img/` | Editable original source and assets in the ZIP |
| `delivery/integrity.json` | SHA-256 inventory of files in this release pack |
| `delivery/checklist-data.json` | Blank, generated inventory of import and verification items |
| `delivery/checklist-guide.md` | Interactive progress tracking, URL snapshots and backup/restore instructions |

The ZIP is a frozen source snapshot. Links to `/qa` show the working review site and may change later; the manifest, frozen runtime and downloaded source pack are the release record. Historical alternatives may remain in shared registry files because selected artwork depends on those modules, but they are not selected deliverables. Deleted/rejected page designs are not reintroduced.

Run the source pack with `node delivery/serve.mjs`, then open `http://localhost:8080/delivery`. It needs a current Node.js installation and no package install. Serve from the pack root rather than opening `index.html` with `file://`, because the demos use ES modules, fetch and root-relative routes.

## Isolated animation import

Copy `delivery/runtime/` and `delivery/manifest.json` together, preserving their relative paths. The adapter imports only the selected board module for a key; modules can contain unused alternatives, which your production build can prune after integration.

```html
<link rel="stylesheet" href="/openline-delivery/runtime/animation.css">
<figure>
  <div id="referral-art"></div>
  <figcaption class="sr-only">Share Openline with a friend.</figcaption>
</figure>
<script type="module">
  import {mountAnimation} from '/openline-delivery/runtime/mount.js';
  const control = await mountAnimation(
    document.querySelector('#referral-art'), 'referral'
  );
  // Hook a visible pause control to control.setPaused(true/false).
  // Call control.dispose() when this page/component unmounts.
</script>
```

Use the exact key and option ID from the manifest; do not rely on array positions after editing a registry. The runtime keeps the selected SVG/JS motion, unique SVG identifiers, QA text fixes, native typography, chosen palette, Chrome treatment, context fit and companion pills. Reduced motion, a hidden document and offscreen illustrations pause playback. A pause/resume remount may restart a JS sequence at its first frame.

The artwork is decorative by default. Put its explanatory content in accessible surrounding HTML; do not make essential product information available only inside animated SVG. Review contrast and actual readable label size at the smallest supported width. The source's `init(host)` callbacks must run with their original module closures; copying only the raw SVG loses JS-driven motion.

### React lifecycle example

This is an adapter example, not a mandatory framework migration. Include the runtime stylesheet once at app level.

```jsx
import {useEffect, useRef} from 'react';
import {mountAnimation} from './openline-delivery/runtime/mount.js';

export function OpenlineAnimation({animationKey}) {
  const element = useRef(null);
  useEffect(() => {
    let cancelled = false;
    let control;
    mountAnimation(element.current, animationKey).then(result => {
      if (cancelled) result.dispose();
      else control = result;
    }).catch(error => {
      // Render an accessible static fallback in your app.
      console.error('Animation could not be mounted', error);
    });
    return () => { cancelled = true; control?.dispose(); };
  }, [animationKey]);
  return <div ref={element} />;
}
```

### Fit, colour and asset rules

- **Fit:** `viewBox` is preserved or recut with the existing QA context-fit function, never stretched. `slot` gives the measured desktop context. Review responsive fit in the real destination page, especially entries flagged by the manifest.
- **Pills:** The adapter carries companion pill text and positions. Check that pills do not overlap the illustration in the actual slot; do not duplicate old pills outside the mount. Sample “live” counts/carriers/prices in these pills are illustrative and need content approval or real data.
- **Referral:** The isolated sample supplies the orange container so the transparent artwork is visible. In production use the exact surrounding section orange, avoid a second conflicting gradient, and keep the left-to-right plus fade.
- **IoT:** Preserve Chrome as default. Its three cell aspect ratios differ; do not expand the small chip cell to the wide-cell dimensions.
- **Global eSIM:** Recolour the page's accents as well as its SVGs. Copying only the animation cannot make blue/purple/green page cards orange.
- **Native type:** Use the font stack, not a downloaded lookalike. Do not globally force that stack onto third-party brand wordmarks.
- **Images/logos:** Keep original proportions; use the asset README files for operator logos, AI providers and portraits. Review licensing and identity claims before production.

## Importing a block or flow

1. Find the page in `page-matrix.md`. Open its current QA route and each relevant change record.
2. For captured pages, locate the existing production component corresponding to the listed `data-qa-slot`, section ID or block. Port the scoped markup/style/behaviour, not the entire captured static page.
3. About/Contact use fragments under `qa/redesign/`, shared `rd.css` and `redesign.js`. Extract only the relevant section and namespace its selectors in your application.
4. Installation uses its fragment plus `installation-preflight.js/.css`; France uses the original captured template plus refinement/calendar/support modules. Preserve unrelated layout.
5. Start is a fuller process reference: use `start.html`, `start.js`, `start-profile.js` and both CSS files. Translate the explicit states into your app and replace all fixtures with authenticated server results.
6. Shared support uses `qa/support/`. Reuse the components/patterns and AI destination configuration, not the simulated bot, local deletion or reviewer state as a production backend.
7. Modal Builder export is a starting point for the chosen configuration. Wire real buttons, error handling and focus behaviour into your existing dialog system.
8. Replace `/qa/...` navigation with intended customer routes. The QA page dropdown, theme controls, toolbar, fixture controls, `/choice` links and reviewer exports should not ship in the customer UI.

## Backend contracts to define with engineering

These are requirements to implement, not invented endpoint names or claims about existing APIs.

| Feature | Authoritative server behaviour | Required non-happy states |
| --- | --- | --- |
| Purchase-code check | Return eligible plan and ownership/validation/transfer status without consuming code | Invalid, used, expired if supported, locked, pending validation, network failure |
| Gift unlock | Authenticate owner and explicitly unlock unused code; keep an audit trail | Not owner, already redeemed, cancelled, retry-safe duplicate |
| Recipient redemption | Atomically validate and consume once; bind resulting profile to recipient | Race with another redeemer, pending owner validation, revoked/locked transfer |
| Activation | Idempotent provisioning operation with authoritative status and validity rules | Pending, timeout/unknown outcome, failed, retry/reconciliation |
| eSIM details | Authenticated access to real QR/LPA, SM-DP+, activation code and profile IDs | Not ready, revoked, unauthorized, sensitive-field copy failure |
| Label/folder | Persist to the correct authenticated account | Validation failure, save failure, concurrency, session expiration |
| Chat clearing | Apply disclosed deletion/retention rules and issue resolution on the server | Failure without false success; distinguish deletion from ticket resolution |
| Payments | Existing PSP flow with safe intent/confirmation handling and webhook reconciliation | 3DS, pending, declined, cancelled, duplicate submit, timeout, receipt |
| Product Hunt reward | Validate eligibility/proof and issue approved reward once | Ineligible, duplicate, pending, rejected, service error |

Do not put purchase codes, QR provisioning secrets, chat transcripts or API credentials into analytics, query strings, handoff manifests or public logs. Never ship the `.invalid` QR fixture or browser-only ledger as an installable profile or security boundary.

## Baseline comparison limits

The destinations are [staging.openline.com](https://staging.openline.com), [openline.com](https://openline.com) and the [revisions reference](https://openline-revisions-hub.vercel.app). Their content may have moved independently; this pack records the intended QA changes rather than claiming a complete automated production diff.

The 6 October fetch exposed conflicting country-count metadata: staging 130+, production 210+, while QA/reference copy commonly uses 190+. Reconcile a single authoritative coverage source before shipping; do not silently choose the largest count. Likewise reconcile old KB/compatibility badges with the shipped datasets, partner/compliance claims, market metrics and campaign pricing.

The screenshot links are scope references. Still images cannot prove an animation's historical timing; recover the intended original homepage source revision before restoring it. Re-test in the real app's CSS, framework lifecycle, routing, CSP and browser support matrix.
