"""Bring the existing Product Hunt redesign into /qa; never rewrite its source.
The QA copy adds shared tools, brand parity and honest simulation boundaries.
"""
from pathlib import Path
import re

Q = Path(__file__).resolve().parents[1]
R = Q.parent
text = (R / "producthunt.html").read_text()

def replace(old, new):
    global text
    assert old in text, f"Source changed; missing: {old[:70]}"
    text = text.replace(old, new)

replace('<title>Product Hunt launch — Openline</title>',
        '<title>QA · Product Hunt redesign · Openline</title><meta name="robots" content="noindex">')
replace('<link rel="stylesheet" href="css/producthunt.css" />',
        '<link rel="stylesheet" href="/qa/qa.css">\n'
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Play:wght@700&display=swap">\n'
        '<link rel="stylesheet" id="qa-site-css" href="/qa/producthunt-page.css">')
(Q / "producthunt-page.css").write_text((R / "css/producthunt.css").read_text() + '\n' + (Q / "producthunt.css").read_text())
text = re.sub(r'<link rel="icon"[^>]*>', '<link rel="icon" href="/qa/assets/start-brand-mark.png">', text, count=1)
replace('<body>', '<body class="ph-qa" data-qa-page="producthunt">')
text = re.sub(r'<div class="rev-bar">[\s\S]*?</div>', '''<aside class="ph-qa-notice">
  <div class="wrap"><b>QA · Campaign draft</b><span>Interactive preview only. No reward is issued, no claim link is fetched and no email is sent.</span>
  <a href="/producthunt" target="_blank" rel="noopener">Original redesign ↗︎</a></div>
</aside>''', text, count=1)
replace('src="img/kitty-ph.png"', 'src="/img/kitty-ph.png"')
replace('href="index.html">Animation review</a>', 'href="/qa">All QA pages</a>')
replace('Launching this September', 'Launch date to be confirmed')
# Actual Openline mark; all other artwork is preserved.
text = re.sub(r'(<a class="hd-brand"[^>]*>)\s*<svg[\s\S]*?</svg>',
              r'\1<img class="ph-qa-mark" src="/qa/assets/start-brand-mark.png" width="32" height="32" alt="">', text, count=1)
text = re.sub(r'(<div class="wrap ft-row">)\s*<svg[\s\S]*?</svg>',
              r'\1<img class="ph-qa-mark" src="/qa/assets/start-brand-mark.png" width="32" height="32" alt="Openline">', text, count=1)
replace('<div class="mk" id="mk" role="dialog" aria-modal="true" aria-labelledby="mkTitle">',
        '<dialog class="mk" id="mk" aria-labelledby="mkTitle">')
replace('''</div>

<script src="js/producthunt-page.js"></script>''', '''</dialog>

<div hidden aria-hidden="true"><div id="overview"></div><div id="boards"></div><nav id="nav-pages"></nav><nav id="nav-sections"></nav></div>
<script type="module" src="/qa/producthunt.js"></script>
<script type="module" src="/qa/qa.js"></script>''')
replace('''Pick what you did and paste the URL. Your guaranteed 10% is issued as soon as this is
        submitted — you will not be waiting for it.''',
        'Try the claim journey with an example link and email. This /qa version only simulates the result; nothing is submitted or sent.')
replace('''Your 10% code is issued on submit, before anyone reviews the link. Review can only
          raise it.''', 'Campaign concept: a 10% floor, with any judged uplift later. This preview cannot issue a usable reward.')
replace('id="mkSubmit">Issue my code', 'id="mkSubmit">Preview my code')
replace('Step 2 of 3 · Checking', 'Step 2 of 3 · Simulation')
replace('<h3>Reading your link</h3>', '<h3>Previewing the claim</h3>')
replace('''Three automatic checks, then the code. Nothing here is a person waiting — the human read
        happens after you have your code.''',
        'Only URL and email format are checked locally. The following review steps are simulated; this page does not open your link or check an account.')
replace('Link opens and is publicly readable', 'Public-link review · simulated')
replace('Mentions Openline <span', 'Openline mention review · simulated <span')
replace('First claim from this account', 'First-claim review · simulated')
replace('Step 3 of 3 · Issued', 'Step 3 of 3 · Demo result')
replace('<h3>Your 10% is live</h3>', '<h3>Your example reward</h3>')
replace('''Use it now, on any plan. We have emailed a copy to <b id="mkMailEcho">your inbox</b>.''',
        'This is not a redeemable code. No email has been sent to <b id="mkMailEcho">the example address</b>.')
replace('<div class="mk-code-k">Working now</div>', '<div class="mk-code-k">Preview only · not redeemable</div>')
replace('id="mkCode">PH-10-XXXXXX', 'id="mkCode">DEMO-PH-10-XXXXXX')
replace('Copy code', 'Copy demo code')
replace('Under review · uplift only', 'Proposed next step · not running')
replace('''A person is reading your link now. If it earns more than 10%, <b>we email a replacement
          code</b> — usually within two hours. <b>This one keeps working either way.</b>''',
        'The live service would queue a human review and notify you of any uplift. No reviewer, email service or discount backend is connected in this preview.')
replace('Claim another link', 'Try another link')
replace('id="inlineGo">Get my code now', 'id="inlineGo">Preview the claim')
replace('''<b>No account needed.</b> We ask for an email only so we can send the
            larger code if your post earns one. Nothing else is stored.''',
        '<b>QA preview.</b> You can use an example URL and email. Neither is sent to a server or saved to browser storage.')
replace('<div class="cf-next-k">What happens after you press it</div>',
        '<div class="cf-next-k">Proposed live journey · simulated here</div>')
replace('A working 10% code appears on screen', 'A sample 10% code appears on screen')
replace('We need somewhere to send the code.', 'Enter a valid email format for this preview. No email will be sent.')
# Accessible inline feedback and honest clipboard fallback.
replace('<div class="mk-actions">\n        <button class="btn btn-ghost" id="mkAnother">',
        '<p class="ph-copy-status" id="phCopyStatus" role="status"></p>'
        '<textarea class="ph-copy-fallback" id="phCopyFallback" readonly hidden aria-label="Demo code to copy manually"></textarea>\n'
        '<div class="mk-actions">\n        <button class="btn btn-ghost" id="mkAnother">')
text = text.replace('id="mkLinkErr"', 'id="mkLinkErr" role="alert"')
text = text.replace('id="mkMailErr"', 'id="mkMailErr" role="alert"')
text = text.replace('id="inlineErr"', 'id="inlineErr" role="alert"')
(Q / "producthunt.html").write_text(text)
print("Built /qa/producthunt from the preserved root redesign.")
