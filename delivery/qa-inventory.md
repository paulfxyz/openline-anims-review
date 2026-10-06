# Delivery verification inventory

The new deliverable is the handoff hub and frozen source pack. Existing QA page implementations are preserved; this release does not claim to repeat every historical acceptance test or validate real production backends.

## Interactive checklist update

- Verify inventory covers all selected animation keys, non-historical change IDs, unique current wording, 27 page/flow entries, acceptance items and explicit panel/cart/mobile requests.
- Applied / Verified / Blocked invariants, totals and filters; unchecking Applied clears Verified, Blocked never counts as Verified.
- URL snapshot survives reload and in-page navigation; clean URL begins blank; malformed/mismatched URL shows a warning.
- JSON export/import with confirmation, cancel, unknown IDs and malformed/duplicate data; reset cancel/confirm; Markdown report statuses and resume link.
- Copy link success/fallback, keyboard focus, responsive layout at 375px and desktop; test introduction and all actions.
- Confirm no new browser-storage dependency, shared-server claim, private commercial details or actual production actions.

## Checks before release

- Hub at 1440px and 375px: initial hierarchy, readable type, no horizontal overflow; inspect animation, page, change, request and download sections.
- All 30 selected keys: resolve correct source export/ID, render SVG, run init, pause/resume and dispose without uncaught errors.
- Frozen selection parity: compare 30 key/option pairs to `qa/selections.json`; check KYC current, Blog default/alternative and explicit Chrome/orange defaults.
- Search and filters: animation search, pages/tools/redesigns, current/history/task ledger filters and empty results.
- Docs: load each referenced Markdown file in the dialog, code/table rendering, external file link, Escape/close/focus return.
- Page previews: open/close iframe, new-tab URL, all 27 page/extra entries resolve locally; representative activation/gift/France views are reachable.
- Runtime refinements: referral colour/plus mask, stable nomad labels and US number, IoT neutral palette; reduced-motion static frame.
- Snippet copy: clipboard success if permitted; visible fallback if denied.
- Failure scenarios: empty search, fast selection changes, close document while loading, missing preview key.
- Source files: every manifest module and mapped page file exists; IDs are unique; docs include all change records and copy rows.
- ZIP: unzip test, manifest/checksum parity, no credentials/Git metadata/private commercial note, exact downloaded bytes.
- Deployment: private preview plus live Vercel `/delivery`; public manifest and ZIP load. Existing QA navigation includes delivery.

Record observed results in `qa-report.md`. Unchecked product claims, original homepage source revision and backend integration remain explicit release gates for Irina.
