# Captures every page of openline-revisions-hub at 1440px, marks each animated
# slot with data-qa-slot, and writes raw HTML to /tmp/raw-<slug>.html.
# Run build.py afterwards. Needs Playwright + Chromium.
import asyncio, json, re, os, hashlib, urllib.request, urllib.parse
from playwright.async_api import async_playwright
EXE='/home/user/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome'
BASE='https://openline-revisions-hub.vercel.app'
OUT='/home/user/workspace/openline-anims/qa'
PAGES={'home':'Home','multiple-tier1':'Multiple Tier-1','global-esim':'Global eSIM','network':'Network','business':'Business',
 'hospitality':'Hospitality','iot':'IoT','openline-plus':'Openline+','login':'Login','about':'About','omdm-market':'OMDM Market',
 'blog':'Blog','installation-guide':'Installation Guide','contact':'Contact','affiliate':'Affiliate'}
LOC={ # key: (page, kind, arg)
 'tier1':('multiple-tier1','hero',None),'t1ai':('multiple-tier1','scene','AI-Powered'),'t1market':('multiple-tier1','scene','Data Stock Market'),
 't1access':('multiple-tier1','scene','Access to 50'),'what':('global-esim','scene','What is an eSIM'),'travel':('global-esim','scene','Seamless Travel'),
 'referral':('home','scene','Refer a friend'),'homewhy':('home','homewhy',None),'nethero':('network','hero',None),'why':('network','scene','Why Our Network'),
 'bizhero':('business','scene','Keep Your Team'),'bizneeds':('business','scene','Everything Your Business'),'hosp':('hospitality','hero',None),
 'iotwide':('iot','scene','Global Out of the Box'),'iotchip':('iot','scene','Smaller Form Factor'),'iotdark':('iot','scene','Instant Activation'),
 'pluslounge':('openline-plus','scene','Travel Like a VIP'),'plusnomad':('openline-plus','scene','Digital Nomads'),'pluskyc':('openline-plus','scene','Verified & Secure'),
 'aloha':('login','aloha',None),'prin':('about','scene','Our Principles'),'team':('about','scene','Built by Travelers'),
 'omhero':('omdm-market','scene','Wholesale data'),'ombook':('omdm-market','scene','What actually moves'),'omctrl':('omdm-market','scene','KYC and KYB'),
 'blog':('blog','scene','Travel Smarter'),'install':('installation-guide','install',None),'contact':('contact','hero',None),'affil':('affiliate','hero',None)}
# blogv shares the blog hero slot
MARK=r"""(locs)=>{
 const vis=e=>{const r=e.getBoundingClientRect(); return r.width>20&&r.height>20;};
 const heads=[...document.querySelectorAll('h1,h2,h3')].map(h=>({t:h.innerText.replace(/\s+/g,' '),y:h.getBoundingClientRect().top+scrollY}));
 const near=y=>{let b=null,d=1e9; for(const h of heads){const dd=Math.abs(h.y-y); if(dd<d){d=dd;b=h.t;}} return b||'';};
 const res={};
 for(const [key,kind,arg] of locs){
  let el=null;
  if(kind==='scene'){ el=[...document.querySelectorAll('.ol-scene,.ol-om-stage')].filter(vis).find(e=>near(e.getBoundingClientRect().top+scrollY).includes(arg)); }
  else if(kind==='hero'){ const s=[...document.querySelectorAll('main svg, section svg, svg')].find(s=>{const r=s.getBoundingClientRect(); return r.width>=500&&r.top+scrollY<900&&!s.closest('header,nav');}); el=s&&s.parentElement; }
  else if(kind==='homewhy'){ el=[...document.querySelectorAll('.ol-scene')].find(e=>e.closest('.border-2.border-primary')&&vis(e)); }
  else if(kind==='install'){ el=document.querySelector('div.relative.aspect-video'); }
  else if(kind==='aloha'){ el=document.querySelector('div.w-14.h-14'); }
  if(el){ const r=el.getBoundingClientRect(); el.setAttribute('data-qa-slot',key); el.setAttribute('data-qa-w',Math.round(r.width)); el.setAttribute('data-qa-h',Math.round(r.height)); res[key]=[Math.round(r.width),Math.round(r.height)]; }
  else res[key]=null;
 }
 return res;}"""
assets={}
def fetch_asset(url):
    full=urllib.parse.urljoin(BASE+'/',url)
    if full in assets: return assets[full]
    path=urllib.parse.urlparse(full).path
    ext=os.path.splitext(path)[1][:6] or '.bin'
    name=hashlib.md5(full.encode()).hexdigest()[:12]+ext
    dst=os.path.join(OUT,'assets',name)
    if not os.path.exists(dst):
        try:
            req=urllib.request.Request(full,headers={'User-Agent':'Mozilla/5.0'})
            data=urllib.request.urlopen(req,timeout=30).read(); open(dst,'wb').write(data)
        except Exception as e:
            print('  asset fail',full,e); assets[full]=url; return url
    assets[full]='/qa/assets/'+name; return assets[full]
def localize(html):
    # same-origin asset refs only (keep external CDNs)
    def rep(m):
        u=m.group(2)
        if u.startswith('data:') or u.startswith('#') : return m.group(0)
        if u.startswith('/assets/') or u.startswith(BASE):
            return m.group(1)+fetch_asset(u)+m.group(3)
        return m.group(0)
    html=re.sub(r'((?:src|href)=")([^"]+)(")',rep,html)
    html=re.sub(r'(url\(&quot;)([^&]+)(&quot;\))',rep,html)
    html=re.sub(r'(url\(")([^"]+)("\))',rep,html)
    html=re.sub(r"(url\(')([^']+)('\))",rep,html)
    return html
async def main():
    meta={}
    async with async_playwright() as p:
        br=await p.chromium.launch(executable_path=EXE)
        pg=await br.new_page(viewport={'width':1440,'height':900})
        for slug,title in PAGES.items():
            await pg.goto(BASE+'/'+slug, wait_until='networkidle')
            H=await pg.evaluate('document.documentElement.scrollHeight')
            for y in range(0,H+900,450):
                await pg.evaluate(f'scrollTo(0,{y})'); await pg.wait_for_timeout(110)
            await pg.wait_for_timeout(900)
            await pg.evaluate('scrollTo(0,0)'); await pg.wait_for_timeout(500)
            locs=[[k,v[1],v[2]] for k,v in LOC.items() if v[0]==slug]
            got=await pg.evaluate(MARK,locs)
            print(slug,got)
            meta[slug]={'title':title,'slots':got}
            html=await pg.evaluate("""()=>{const d=document.documentElement.cloneNode(true);
               d.querySelectorAll('script').forEach(s=>s.remove());
               d.querySelectorAll('link[rel=modulepreload]').forEach(s=>s.remove());
               return '<!DOCTYPE html>\\n'+d.outerHTML;}""")
            open(f'/tmp/raw-{slug}.html','w').write(html)
        await br.close()
    json.dump(meta,open('/tmp/snapmeta.json','w'),indent=1)
asyncio.run(main())
