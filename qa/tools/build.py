# Turns /tmp/raw-<slug>.html into qa/<slug>.html: localises same-origin assets,
# rewrites nav to /qa, injects qa.css/qa.js. Then convert large PNGs to WebP
# (see README) so the repo stays small.
import re, json, sys
sys.path.insert(0,'/tmp')
exec(open('/tmp/snapshot.py').read().split('async def main')[0])  # reuse PAGES, fetch_asset, localize
meta=json.load(open('/tmp/snapmeta.json'))
for slug,title in PAGES.items():
    h=open(f'/tmp/raw-{slug}.html').read()
    h=h.replace('href="/assets/index-CXnBdUOO.css"','href="/qa/assets/site.css" id="qa-site-css"')
    h=localize(h)
    def lk(m):
        t=m.group(1)
        if t in PAGES: return f'href="/qa/{t}"'
        return 'href="/qa"'
    h=re.sub(r'href="#([a-z0-9-]+)"',lk,h)
    h=h.replace('href="/"','href="/qa/home"')
    h=re.sub(r'<title>.*?</title>',f'<title>QA · {title} — Openline</title>',h,flags=re.S)
    h=h.replace('</head>','<link rel="stylesheet" href="/qa/qa.css">\n<meta name="robots" content="noindex">\n</head>',1)
    h=re.sub(r'<body([^>]*)>',lambda m:f'<body{m.group(1)} data-qa-page="{slug}">',h,count=1)
    tail=('\n<div id="overview" hidden></div><div id="boards" hidden></div><nav id="nav-pages" hidden></nav><nav id="nav-sections" hidden></nav>'
          '\n<script type="module" src="/qa/qa.js"></script>\n</body>')
    h=h.replace('</body>',tail,1) if '</body>' in h else h+tail
    open(f'/home/user/workspace/openline-anims/qa/{slug}.html','w').write(h)
    print(slug,len(h),h.count('data-qa-slot='))
