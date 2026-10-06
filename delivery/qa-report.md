# Openline delivery release verification

Release: 2026-10-06-r1. Scope: the new delivery hub, frozen selections, portable animation runtime, documentation and source packaging. Existing QA implementations are preserved; this report is not a fresh end-to-end certification of every existing flow, a Safari/iOS device test or a production backend test.

## Decision and inventory checks

- **30 selected keys:** All key/option pairs match `qa/selections.json` and the saved Comet decision snapshot checked on 6 October. No newer QA overrides were present.
- **Explicit exceptions:** KYC option 0 remains current. Blog Topic Picker is the current contextual default; The Long Read is a retained alternative for that same slot.
- **Coverage:** 22 page entries, four extra tools, an additional recipient entry, 55 change records and 186 recorded wording entries. Wording entries include original-to-current, later clarifications and new copy; they are not 186 unique independent production changes.
- **Source mapping:** Every listed runtime module and page source file exists. Eight native artwork/slot-ratio differences are flagged for final responsive integration review: tier1, t1ai, t1market, t1access, travel, bizhero, bizneeds and blog.
- **History:** Three records are rejected or superseded and are excluded from the default active ledger view. Other records can retain historical descriptions, but their implementation notes identify the latest direction.

## Browser checks performed

Chromium desktop at 1440 × 1000 and mobile emulation at 375 × 812 were used. The hub's first view, workbench, page cards, expanded wording record, additional requests, documentation dialog and closing/download area were inspected.

- **Animation runtime:** All 30 options were selected through the UI, rendered with nonzero dimensions and captured. No uncaught browser errors or failed local asset responses were observed in that pass.
- **Selected refinements:** Referral's matching orange and plus fade, the stable Nomad labels/US number and neutral IoT treatment were inspected. Contained companion pills were clamped inside preview edges, and same-row stacking follows the QA pattern when space allows.
- **Motion controls:** Pause and resume toggle correctly. Reduced-motion inspection showed a paused SVG at a readable static frame with its static class applied. Lifecycle cleanup is implemented; source-host/backend performance still needs app-level testing.
- **Search/filter states:** Animation empty results, three IoT results, five extra-flow entries, four retained/refinement entries, France search and page empty results were tested. Ledger filters return 55 total, 52 active, three historical and four new Irina-task records.
- **Documents:** Brief, import guide, acceptance checklist, report template, page matrix, copy inventory, full ledger and selections open in the document dialog. Exact France wording appears in the expanded record. Escape closes the document and returns focus.
- **Working preview:** Recipient flow loads in the embedded dialog. Escape closes the outer preview and removes its iframe after the close event; the external/new-tab URL is also available.
- **Routes:** All 27 page/extra entry URLs returned HTTP 200 through the clean-URL local server. This is a route smoke check, not proof of full functional coverage of each existing page.
- **Responsive fit:** The mobile document dialog fits within the viewport and the page reports 375px scroll width at a 375px viewport. No horizontal page overflow was observed in the tested states.
- **Exploratory checks:** Empty searches, rapidly changing selected items, expanding historical/current records and opening/closing documents and embedded references were exercised. Backend destructive actions were not performed.

## Packaging and deployment checks

The source archive is generated from public repository/source files only. Its integrity inventory records SHA-256 hashes; `.git`, `.vercel`, dependencies, environment files, the archive itself and private commercial correspondence are excluded.

The release process requires an archive integrity test, a hash comparison of archive members, and a live check of `/delivery`, its manifest and ZIP after deployment. The final chat completion reports whether those deployment checks passed; they are not evidence that the production Openline app was updated.

## Remaining acceptance gates

Irina still needs to reconcile the Blog choice and original homepage source version with Paul, check real-layout fit and readable animation labels, validate claims/content, integrate backend behaviours and supply staging evidence. No actual purchase, email, transfer, provisioning, chat deletion or reward was executed by this release.
