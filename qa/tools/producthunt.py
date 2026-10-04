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
text = re.sub(r'<div class="rev-bar">[\s\S]*?</div>', '', text, count=1)
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
        'Choose what you shared, then add your link and email.')
replace('''Your 10% code is issued on submit, before anyone reviews the link. Review can only
          raise it.''', 'Start with 10%. A great contribution can earn even more.')
replace('id="mkSubmit">Issue my code', 'id="mkSubmit">Get my code')
replace('Step 2 of 3 · Checking', 'Step 2 of 3 · Preparing')
replace('<h3>Reading your link</h3>', '<h3>Preparing your code</h3>')
replace('''Three automatic checks, then the code. Nothing here is a person waiting — the human read
        happens after you have your code.''',
        'A few quick checks, then your code.')
replace('Link opens and is publicly readable', 'Link format')
replace('Mentions Openline <span', 'Email format <span')
replace('First claim from this account', 'Code prepared')
replace('Step 3 of 3 · Issued', 'Step 3 of 3 · Your code')
replace('<h3>Your 10% is live</h3>', '<h3>Your 10% code</h3>')
replace('''Use it now, on any plan. We have emailed a copy to <b id="mkMailEcho">your inbox</b>.''',
        'Copy your code and choose your next destination.')
replace('<div class="mk-code-k">Working now</div>', '<div class="mk-code-k">Your reward</div>')
replace('id="mkCode">PH-10-XXXXXX', 'id="mkCode">PH-QA-10-XXXXXX')
replace('Under review · uplift only', 'A little extra for great contributions')
replace('''A person is reading your link now. If it earns more than 10%, <b>we email a replacement
          code</b> — usually within two hours. <b>This one keeps working either way.</b>''',
        'Contributions can earn more than 10% after review.')
replace('Claim another link', 'Try another link')
replace('id="inlineGo">Get my code now', 'id="inlineGo">Get my code')
replace('''<b>No account needed.</b> We ask for an email only so we can send the
            larger code if your post earns one. Nothing else is stored.''',
        '<b>Keep it simple.</b> Share your post and tell us where to reach you.')
replace('<div class="cf-next-k">What happens after you press it</div>',
        '<div class="cf-next-k">Your next steps</div>')
replace('A working 10% code appears on screen', 'Your 10% code appears on screen')
replace('We need somewhere to send the code.', 'Enter a valid email address.')
# Accessible inline feedback and honest clipboard fallback.
replace('<div class="mk-actions">\n        <button class="btn btn-ghost" id="mkAnother">',
        '<p class="ph-copy-status" id="phCopyStatus" role="status"></p>'
        '<textarea class="ph-copy-fallback" id="phCopyFallback" readonly hidden aria-label="Code to copy manually"></textarea>\n'
        '<div class="mk-actions">\n        <button class="btn btn-ghost" id="mkAnother">')
text = text.replace('id="mkLinkErr"', 'id="mkLinkErr" role="alert"')
text = text.replace('id="mkMailErr"', 'id="mkMailErr" role="alert"')
text = text.replace('id="inlineErr"', 'id="inlineErr" role="alert"')
(Q / "producthunt.html").write_text(text)
print("Built /qa/producthunt from the preserved root redesign.")
