"""Preserve the original France template and lightly refine Unlimited only.
The rejected selector redesign must not be rebuilt. The remote app is read-only.
"""
import asyncio
import hashlib
import html
import json
import re
import sys
from pathlib import Path
from urllib.parse import urljoin, urlparse
from playwright.async_api import async_playwright

Q = Path(__file__).resolve().parents[1]
BASE = "https://openline-revisions-hub.vercel.app"
SOURCE = BASE + "/country-fr"
EXE = "/home/user/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome"
SLUG = "country-fr-redesign"
POLICY = json.loads((Q / "unlimited-plan-copy.json").read_text())
PATHS = {
    "INFINITY": '<path d="M12 12c-2-3-3.4-5-6-5a5 5 0 0 0 0 10c2.6 0 4-2 6-5s3.4-5 6-5a5 5 0 0 1 0 10c-2.6 0-4-2-6-5z"/>',
    "STACK": '<rect x="6" y="3" width="12" height="15" rx="2"/><path d="M9 7h6M9 11h6M3 8v11a2 2 0 0 0 2 2h11"/>',
    "CALENDAR": '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2"/>',
    "MINUS": '<path d="M5 12h14"/>',
    "PLUS": '<path d="M5 12h14M12 5v14"/>',
    "SIGNAL": '<path d="M4 20v-3M9 20v-7M14 20V9M19 20V4"/>',
    "SIM": '<path d="M7 3h7.5L19 7.5V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><rect x="8" y="10" width="8" height="7" rx="1"/><path d="M8 13.5h8M12 10v7"/>',
    "HEADSET": '<path d="M3 14v-3a9 9 0 0 1 18 0v3M21 15v3a3 3 0 0 1-3 3h-3"/><rect x="2" y="12" width="4" height="7" rx="2"/><rect x="18" y="12" width="4" height="7" rx="2"/>',
    "CHECK": '<path d="m5 12 4 4L19 6"/>',
    "ARROW": '<path d="M5 12h14M12 5l7 7-7 7"/>',
    "CART": '<path d="M3 3h2l3 13h10l3-10H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/>',
    "HELP": '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
    "CLOSE": '<path d="m6 6 12 12M18 6 6 18"/>',
}
def icon(name):
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + PATHS[name] + "</svg>"

def fragment():
    text = (Q / "redesign/country-fr-dialogs.html").read_text()
    records = {r["area"]:r["after"] for r in POLICY["copy"]}
    values = {
        "FIXED_PROMISE": records["Fixed-package guarantee"],
        "UNLIMITED_PROMISE": records["Openline-side promise"],
        "MNO_RULES": records["24-hour heavy-use disclosure"],
        "PROFILE_TRY": POLICY["section"]["PROFILE_TEXT"]["after"],
    }
    for key, value in values.items():
        text = text.replace("{{"+key+"}}", html.escape(value, quote=True))
    for key in PATHS:
        text = text.replace("{{"+key+"}}", icon(key))
    text = text.replace("{{PRESETS}}", "".join(
        f'<button type="button" class="fr-duration" data-days="{d}" aria-pressed="{str(d==7).lower()}"><b>{d}</b><span>days</span></button>'
        for d in [3,5,7,10,15,30]
    ))
    assert "{{" not in text
    return text

def asset_path(url):
    full = urljoin(BASE, url)
    if "09d59bc7e55dc6aaf6f731773a47432ec242154a-BM3QEqNZ.png" in full:
        return "/qa/assets/france-landmark.webp"
    if "384308522d5465642033b4d908da028d55c6aeb6-BKkbtTfp.png" in full:
        return "/qa/assets/start-brand-mark.png"
    if "kitty-ph-" in full:
        return "/img/kitty-ph.png"
    if full.startswith(BASE):
        stem = hashlib.md5(full.encode()).hexdigest()[:12]
        suffix = Path(urlparse(full).path).suffix
        for name in [stem+".webp", stem+suffix]:
            if (Q / "assets" / name).exists():
                return "/qa/assets/"+name
    return full

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=EXE)
        page = await browser.new_page(viewport={"width":1440,"height":1000})
        await page.goto(SOURCE, wait_until="networkidle")
        await page.get_by_role("heading", name="Choose Your Plan").wait_for()
        await page.get_by_role("button", name="Show all 25 plans", exact=True).click()
        all_cards = await page.get_by_role("button", name="Buy Now", exact=True).evaluate_all("""buttons=>buttons.map(b=>{
          const card=b.parentElement.parentElement.parentElement.cloneNode(true);
          const text=card.textContent, gb=Number(text.match(/(\\d+)GB/)[1]), days=Number(text.match(/(\\d+) days/)[1]);
          card.dataset.fuPackage=`fr-${gb}-${days}`;
          const buttons=card.querySelectorAll('button');buttons[0].dataset.fuBuy=card.dataset.fuPackage;
          buttons[1].dataset.fuAdd=card.dataset.fuPackage;buttons[1].setAttribute('aria-label',`Add ${gb} GB for ${days} days to demo cart`);
          return card.outerHTML;
        })""")
        assert len(all_cards) == 25
        await page.get_by_role("button", name="Most Popular", exact=True).click()
        assets = await page.locator("img[src]").evaluate_all("(es)=>es.map(e=>e.getAttribute('src'))")
        asset_map = {url:asset_path(url) for url in assets}
        text = await page.evaluate("""({part,css,slug,assetMap,source,allCards})=>{
          const d=document.documentElement.cloneNode(true);
          d.querySelectorAll('script,link[rel=modulepreload]').forEach(e=>e.remove());
          const head=[...d.querySelectorAll('h2')].find(e=>e.textContent.replace(/\\s+/g,' ').trim()==='Choose Your Plan');
          const section=head?.closest('section');
          if(!section)throw new Error('Source plan section not found; stop rather than replace another block');
          section.id='fr-plans';
          head.nextElementSibling.textContent='Fixed packages: no usage-based throttling. Unlimited plans: local network fair use applies.';
          const unlimitedTitle=[...section.querySelectorAll('h3')].find(e=>e.textContent==='Unlimited Data');
          const unlimited=unlimitedTitle.parentElement.parentElement;
          unlimited.id='fu-unlimited';unlimited.classList.add('fu-unlimited');
          unlimitedTitle.nextElementSibling.textContent='Perfect for heavy users. Stream, video call, and browse without limits.';
          const ub=[...unlimited.querySelectorAll('button')];
          const date=ub.find(b=>b.textContent.trim()==='Select travel dates');
          date.id='fu-date-open';date.parentElement.parentElement.parentElement.classList.add('fu-controls');
          date.querySelector('.flex-1 > div').id='fu-date-label';
          const minus=unlimited.querySelector('.lucide-minus').closest('button');
          const plus=unlimited.querySelector('.lucide-plus').closest('button');
          minus.dataset.fuDelta='-1';plus.dataset.fuDelta='1';minus.setAttribute('aria-label','One fewer day');plus.setAttribute('aria-label','One more day');
          minus.parentElement.classList.add('fu-stepper');
          const count=minus.nextElementSibling;
          count.outerHTML='<input id="fu-days" type="number" min="1" max="365" step="1" inputmode="numeric" value="7" aria-label="Number of days" aria-describedby="fu-error">';
          const durationLabel=minus.parentElement.previousElementSibling;
          if(durationLabel)durationLabel.textContent='or number of days:';
          const presets=ub.filter(b=>/^(3|5|7|10|15|30)\\s*days$/.test(b.textContent.trim()));
          if(presets.length!==6)throw new Error('Unexpected source duration controls');
          presets.forEach(b=>{b.dataset.fuDays=parseInt(b.textContent);b.setAttribute('aria-pressed',b.dataset.fuDays==='7');b.classList.remove('scale-105','shadow-lg');});
          presets[0].parentElement.previousElementSibling.textContent='Popular durations';
          const buy=ub.find(b=>b.textContent.trim()==='Purchase'), add=ub.find(b=>b.textContent.trim()==='Add to Cart');
          buy.dataset.fuBuy='unlimited';add.dataset.fuAdd='unlimited';
          const actions=buy.parentElement, quote=actions.parentElement;
          actions.classList.add('fu-actions');quote.classList.add('fu-quote');
          quote.querySelector('.text-4xl').id='fu-price';quote.querySelector('#fu-price').nextElementSibling.id='fu-rate';
          quote.children[1].classList.add('fu-features');
          const fair=ub.find(b=>b.textContent.trim()==='Fair usage applies');
          const helpSvg=fair.querySelector('svg').outerHTML;
          fair.outerHTML='<span class="fu-fair-label">Fair usage applies</span><button type="button" class="fu-help" data-fu-fair aria-label="Explain fair usage">'+helpSvg+'</button>';
          const error=document.createElement('p');error.id='fu-error';error.className='fu-error';error.hidden=true;error.setAttribute('role','status');quote.before(error);
          const fixedTitle=[...section.querySelectorAll('h3')].find(e=>e.textContent==='Data Bundles');
          const fixed=fixedTitle.parentElement.parentElement;fixed.id='fu-fixed';
          const fixedBuys=[...fixed.querySelectorAll('button')].filter(b=>b.textContent.trim()==='Buy Now');
          const fixedGrid=fixedBuys[0].parentElement.parentElement.parentElement.parentElement;fixedGrid.id='fu-fixed-grid';
          fixedBuys.forEach(b=>{const card=b.parentElement.parentElement.parentElement;const text=card.textContent,gb=Number(text.match(/(\\d+)GB/)[1]),days=Number(text.match(/(\\d+) days/)[1]);card.dataset.fuPackage=`fr-${gb}-${days}`;b.dataset.fuBuy=card.dataset.fuPackage;b.nextElementSibling.dataset.fuAdd=card.dataset.fuPackage;b.nextElementSibling.setAttribute('aria-label',`Add ${gb} GB for ${days} days to demo cart`);});
          for(const b of fixed.querySelectorAll('button')){
            const t=b.textContent.trim();
            if(t==='Most Popular'||t==='All plans'){b.dataset.fuView=t==='Most Popular'?'popular':'all';b.setAttribute('aria-pressed',t==='Most Popular');}
            else if(/^(1|3|5|10|20|30|50)GB\\+?$/.test(t)){b.dataset.fuFilter='data';b.dataset.value=t==='50GB+'?'50+':parseInt(t);b.setAttribute('aria-pressed','false');}
            else if(/^(5|7|10|14|30)d$/.test(t)){b.dataset.fuFilter='days';b.dataset.value=parseInt(t);b.setAttribute('aria-pressed','false');}
            else if(t==='Show all 25 plans')b.dataset.fuMore='';
          }
          const templates=document.createElement('template');templates.id='fu-fixed-all';templates.innerHTML=allCards.join('');d.querySelector('body').append(templates);
          const box=document.createElement('div');box.innerHTML=part;d.querySelector('body').append(...box.childNodes);
          d.querySelector('body').dataset.qaPage=slug;
          d.querySelector('title').textContent='QA · France original template · Openline';
          d.querySelectorAll('img[src]').forEach(e=>{const src=e.getAttribute('src');if(assetMap[src])e.setAttribute('src',assetMap[src]);});
          d.querySelectorAll('link[rel=stylesheet]').forEach(e=>{
            if(e.getAttribute('href').includes('/assets/index-')){e.setAttribute('href','/qa/assets/site.css');e.id='qa-site-css';}
          });
          d.querySelectorAll('link[rel=icon]').forEach(e=>e.setAttribute('href','/qa/assets/start-brand-mark.png'));
          d.querySelectorAll('a[href]').forEach(e=>{
            const h=e.getAttribute('href');
            if(h==='/')e.setAttribute('href','/qa/home');
            else if(h.startsWith('#')&&!h.startsWith('#fr-'))e.setAttribute('href','/qa/'+h.slice(1));
          });
          for(const b of d.querySelectorAll('button')){
            const text=b.textContent.trim();
            if(text==='Buy your eSIM in France now'||text==='View Plans')b.setAttribute('data-fr-scroll','');
            if(text==='Back to all countries')b.outerHTML='<a href="/qa/global-esim" class="'+b.className+'">'+b.innerHTML+'</a>';
          }
          const cart=d.querySelector('header button:has(.lucide-shopping-cart)');
          if(cart){cart.setAttribute('data-fr-cart','');cart.setAttribute('aria-label','View demo cart');}
          d.querySelectorAll('.lucide-list-checks').forEach(svg=>{
            let e=svg;
            while(e&&e.parentElement&&!e.classList.contains('fixed'))e=e.parentElement;
            if(e?.classList.contains('fixed'))e.remove();
          });
          const header=d.querySelector('header');
          if(header){const notice=document.createElement('aside');notice.className='fu-notice';notice.innerHTML='<b>QA · Original template, Unlimited lightly refined.</b> Demo prices and cart; no payment or activation.<a href="'+source+'" target="_blank" rel="noopener">Original page ↗</a>';header.after(notice);}
          const sectionNew=d.querySelector('#fr-plans');
          const note=document.createElement('p');note.className='fu-reference-note';note.textContent='Surrounding content is retained from the supplied review page. Its sample claims, reviews and comparisons have not been re-verified.';
          sectionNew.after(note);
          const qaCss=document.createElement('link');qaCss.rel='stylesheet';qaCss.href='/qa/qa.css';d.querySelector('head').append(qaCss);
          const robots=document.createElement('meta');robots.name='robots';robots.content='noindex';d.querySelector('head').append(robots);
          const style=document.createElement('style');style.dataset.fr='';style.textContent=css;d.querySelector('body').prepend(style);
          const hosts=document.createElement('div');hosts.hidden=true;hosts.setAttribute('aria-hidden','true');hosts.innerHTML='<div id="overview"></div><div id="boards"></div><nav id="nav-pages"></nav><nav id="nav-sections"></nav>';d.querySelector('body').append(hosts);
          for(const src of ['/qa/country-fr-refinement.js','/qa/qa.js']){const script=document.createElement('script');script.type='module';script.src=src;d.querySelector('body').append(script);}
          return '<!DOCTYPE html>\\n'+d.outerHTML;
        }""", {"part":fragment(),"css":(Q/"country-fr-refinement.css").read_text(),"slug":SLUG,"assetMap":asset_map,"source":SOURCE,"allCards":all_cards})
        (Q / (SLUG+".html")).write_text(text)
        await browser.close()
        print(SLUG, len(text), "bytes; original layout retained, Unlimited lightly refined")

if "--refresh-local" in sys.argv:
    # Modal-only iterations must not recapture or change the surrounding source page.
    path = Q / (SLUG+".html")
    text = path.read_text()
    text = text.replace('No data cap from Openline. Local network fair use applies.',
        'Perfect for heavy users. Stream, video call, and browse without limits.', 1)
    text, styles = re.subn(r'<style data-fr(?:="")?>[\s\S]*?</style>',
        lambda m:'<style data-fr="">'+(Q/"country-fr-refinement.css").read_text()+'</style>', text, count=1)
    text, dialogs = re.subn(r'<dialog id="fu-fair"[\s\S]*?<div class="fu-toast" id="fu-toast"[\s\S]*?</div>',
        lambda m:fragment(), text, count=1)
    if styles != 1 or dialogs != 1:
        raise RuntimeError("Expected scoped style and dialog group; surrounding page was not changed")
    path.write_text(text)
    print(SLUG, "local dialogs and scoped CSS refreshed; original page retained")
else:
    asyncio.run(main())
