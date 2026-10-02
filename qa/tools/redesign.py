# Builds qa/about-redesign.html and qa/contact-redesign.html: the captured
# page's header and footer, with <main> replaced by qa/redesign/<page>.main.html
# and qa/redesign/rd.css inlined (so the recolour pass reaches it).
import json, re, html, os
Q = os.path.join(os.path.dirname(__file__), '..')
css = open(os.path.join(Q, 'redesign/rd.css')).read()
faq = json.load(open(os.path.join(Q, 'redesign/faq.json')))
for slug, title in [('about', 'About'), ('contact', 'Contact')]:
    page = open(os.path.join(Q, f'{slug}.html')).read()
    main = open(os.path.join(Q, f'redesign/{slug}.main.html')).read()
    if '{{FAQ}}' in main:
        main = main.replace('{{FAQ}}', '\n'.join(
            f'        <details{" open" if i == 0 else ""}><summary>{html.escape(q)}<i data-ic="plus"></i></summary><p>{html.escape(a)}</p></details>'
            for i, (q, a) in enumerate(faq)))
    a = page.index('<main>'); b = page.index('</main>') + len('</main>')
    out = page[:a] + main + page[b:]
    out = out.replace(f'data-qa-page="{slug}"', f'data-qa-page="{slug}-redesign"', 1)
    out = re.sub(r'<title>.*?</title>', f'<title>QA · {title} — redesign — Openline</title>', out, count=1, flags=re.S)
    out = out.replace('</head>', f'<style data-rd>{css}</style>\n</head>', 1)
    out = out.replace('<script type="module" src="/qa/qa.js"></script>',
                      '<script type="module" src="/qa/redesign.js"></script>\n<script type="module" src="/qa/qa.js"></script>', 1)
    open(os.path.join(Q, f'{slug}-redesign.html'), 'w').write(out)
    print(slug, len(out), out.count('data-qa-slot='))
