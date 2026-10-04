"""Capture the supplied France review page and replace only its plan selector.
The original remote app is read-only. Run after editing the fragment/CSS/policy.
"""
import asyncio
import hashlib
import html
import json
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
    text = (Q / "redesign/country-fr-plans.html").read_text()
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
        assets = await page.locator("img[src]").evaluate_all("(es)=>es.map(e=>e.getAttribute('src'))")
        asset_map = {url:asset_path(url) for url in assets}
        text = await page.evaluate("""({part,css,slug,assetMap,source})=>{
          const d=document.documentElement.cloneNode(true);
          d.querySelectorAll('script,link[rel=modulepreload]').forEach(e=>e.remove());
          const head=[...d.querySelectorAll('h2')].find(e=>e.textContent.replace(/\\s+/g,' ').trim()==='Choose Your Plan');
          const section=head?.closest('section');
          if(!section)throw new Error('Source plan section not found; stop rather than replace another block');
          const box=document.createElement('div');box.innerHTML=part;
          section.replaceWith(...box.childNodes);
          d.querySelector('body').dataset.qaPage=slug;
          d.querySelector('title').textContent='QA · France plan selector redesign · Openline';
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
          if(header){const notice=document.createElement('aside');notice.className='fr-source-notice';notice.innerHTML='<b>QA · France plan-selector alternative</b><span>Demo prices and cart. No payment or activation.</span><a href="'+source+'" target="_blank" rel="noopener">Original page ↗</a>';header.after(notice);}
          const sectionNew=d.querySelector('#fr-plans');
          const note=document.createElement('p');note.className='fr-reference-note';note.textContent='Below: surrounding content retained from the supplied review page. Its claims, sample reviews and price comparisons have not been re-verified as part of this selector redesign.';
          sectionNew.after(note);
          const qaCss=document.createElement('link');qaCss.rel='stylesheet';qaCss.href='/qa/qa.css';d.querySelector('head').append(qaCss);
          const robots=document.createElement('meta');robots.name='robots';robots.content='noindex';d.querySelector('head').append(robots);
          const style=document.createElement('style');style.dataset.fr='';style.textContent=css;d.querySelector('body').prepend(style);
          const hosts=document.createElement('div');hosts.hidden=true;hosts.setAttribute('aria-hidden','true');hosts.innerHTML='<div id="overview"></div><div id="boards"></div><nav id="nav-pages"></nav><nav id="nav-sections"></nav>';d.querySelector('body').append(hosts);
          for(const src of ['/qa/country-fr.js','/qa/qa.js']){const script=document.createElement('script');script.type='module';script.src=src;d.querySelector('body').append(script);}
          return '<!DOCTYPE html>\\n'+d.outerHTML;
        }""", {"part":fragment(),"css":(Q/"country-fr.css").read_text(),"slug":SLUG,"assetMap":asset_map,"source":SOURCE})
        (Q / (SLUG+".html")).write_text(text)
        await browser.close()
        print(SLUG, len(text), "bytes; source hero/surroundings retained, selector replaced")

asyncio.run(main())
