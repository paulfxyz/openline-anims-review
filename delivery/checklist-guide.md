# Using Irina's implementation checklist

Use the interactive checklist near the beginning of the delivery page. It covers every selected animation, current block/interaction change, deduplicated wording entry, page/flow sign-off, additional request and final acceptance check.

## Applied is not the same as verified

- **Applied:** You have imported or implemented the item. For a reference/decision item, “Handled” means you have reviewed and resolved its instruction, not installed an extra competing version.
- **Verified:** You have checked the result in its real destination context. Checking Verified also checks Applied; unchecking Applied clears verification.
- **Blocked:** The item still needs work or a decision. Blocking clears verification but preserves whether you already applied part of it.
- **Overall progress:** The percentage counts verified items only. Applied totals include verified items; blocked work is never counted as verified.

A page sign-off does not automatically complete its underlying items. Rejected and superseded designs are excluded; the Blog alternative is a decision check rather than an instruction to put two illustrations in one slot.

## Keep or share progress

Progress is encoded in the URL fragment after `#`. The browser does not send that fragment to the static website server; there is no shared database, login or cross-user synchronization.

- **Copy my progress link:** Save/bookmark the link or send it to Paul. Opening it restores that snapshot of your statuses. Changes made by another person do not update your copy automatically.
- **Export progress:** Downloads a JSON backup with stable task IDs and statuses. Keep it for later or use Import progress on another browser.
- **Import progress:** Previews how many items match, then asks permission before replacing those matching statuses. Unknown IDs are ignored; newer unmatched tasks remain unchanged. Invalid/duplicate entries are rejected without changing progress.
- **Export report:** Downloads a Markdown report of every item, its status and a resume link. Add staging/design links, screenshots, blocker explanations and ETAs before sending it.
- **Reset:** Requires confirmation. It resets this current progress snapshot, not previously exported backups, source files, production state or other people's links.

The original clean delivery URL opens a fresh checklist. Keep your progress link or JSON export before leaving; changing device, using a clean URL or losing the address bar fragment does not recover your earlier work automatically. Known earlier releases are mapped by stable IDs so their progress links still restore existing items while new tasks start unchecked. For an unknown release, import the JSON backup rather than applying a mismatched positional URL.

## Work in manageable groups

Filter by page/area, type or progress and search for an element such as QR, referral, calendar or cart. Expand a group, read each item's instructions and reference, then mark it applied and verified; use Blocked whenever something needs product or engineering attention.

The source archive includes the blank inventory and checklist code, never your actual progress. Self-reported completion is not independent testing or Paul's production approval. No payment, provisioning, transfer or other backend action is executed when you tick a box.
