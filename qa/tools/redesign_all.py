"""Build the remaining /qa alternatives from the captured content.

Unlike the captures, these pages have a new chapter structure, navigation,
hero composition and semantic card system. Page plans set reading order and
layout independently. Copy/assets come from the original /qa HTML; the build
fails if text outside illustration islands disappears.
"""
from pathlib import Path
from copy import deepcopy
from collections import Counter
import json
import re
from bs4 import BeautifulSoup, Tag, NavigableString, Comment

Q = Path(__file__).resolve().parents[1]
PLANS = {
    "home": dict(title="Home", kind="journey", accent="#FF5314", label="Go somewhere.",
                 order=[0,2,1,5,3,4,6,7,8,9,10,11], modes={1:"scorecard",2:"catalog",3:"comparison",4:"steps",5:"logos",6:"split",7:"quotes",11:"referral"}),
    "multiple-tier1": dict(title="Multiple Tier-1", kind="infrastructure", accent="#06B6D4", label="Inside the network.",
                 order=[0,1,4,6,5,7,2,3,8,9], modes={1:"brief",4:"split",6:"steps",5:"split-reverse",7:"split",2:"logos",3:"directory"}),
    "global-esim": dict(title="Global eSIM", kind="travel", accent="#FF5314", label="One eSIM. Every journey.",
                 order=[0,3,2,5,4,1,6,7,8], modes={3:"steps",2:"split",5:"split-reverse",4:"directory",1:"brief",7:"logos"}),
    "network": dict(title="Network", kind="performance", accent="#FF5314", label="Performance, without compromise.",
                 order=[0,1,4,2,6,3,5,7,8,9], modes={1:"scorecard",4:"scorecard",2:"split",6:"comparison",3:"directory",5:"logos",8:"logos"}),
    "security": dict(title="Security", kind="protection", accent="#FF5314", label="Protection is built in.",
                 order=[0,1,3,2,4], modes={1:"threats",3:"steps",2:"comparison"}),
    "adblocking": dict(title="AdBlocking", kind="clean", accent="#FF5314", label="Less noise. More internet.",
                 order=[0,2,1,6,3,4,5,7], modes={2:"comparison",1:"threats",6:"steps",3:"benefits",4:"split",5:"checklist"}),
    "unlimited": dict(title="Unlimited", kind="speed", accent="#FF5314", label="Your data. Your rules.",
                 order=[0,1,3,2,4,5], modes={1:"manifesto",3:"comparison",2:"usecases",4:"checklist"}),
    "business": dict(title="Business", kind="enterprise", accent="#2563EB", label="One team. One connection.",
                 order=[0,6,1,4,5,7,3,2,8,9], modes={6:"comparison",1:"benefits",4:"split",5:"usecases",7:"pricing",3:"steps",2:"brief",8:"logos"}),
    "hospitality": dict(title="Hospitality", kind="partner", accent="#0D9488", label="A better welcome.",
                 order=[0,2,5,4,7,6,1,3,8,9], modes={2:"usecases",5:"quotes",4:"pricing",7:"calculator",6:"steps",1:"benefits",3:"checklist",8:"logos"}),
    "iot": dict(title="IoT", kind="engineering", accent="#525965", label="From factory to field.",
                 order=[0,1,2,3,5,4,7,8,6,9], modes={1:"scorecard",2:"industries",3:"iot",5:"brief",4:"market",7:"steps",8:"pricing",6:"statement"}),
    "openline-plus": dict(title="Openline+", kind="premium", accent="#FF5314", label="A life without borders.",
                 order=[0,1,5,2,4,3,6,8,7,9], modes={1:"pricing",5:"split",2:"benefits",4:"split-reverse",3:"logos",6:"comparison",8:"split",7:"brief"}),
    "login": dict(title="Sign in", kind="access", accent="#FF5314", label="Welcome to Openline.",
                 order=[0], modes={}),
    "omdm-market": dict(title="OMDM Market", kind="exchange", accent="#4F46E5", label="The market behind the connection.",
                 order=[0,1,2,3,4,5], modes={1:"steps",2:"market",3:"usecases",4:"split",5:"steps"}),
    "blog": dict(title="Blog", kind="editorial", accent="#111111", label="The Openline Journal.",
                 order=[0,1,2,3], modes={1:"editorial",2:"directory",3:"subscribe"}),
    "installation-guide": dict(title="Installation Guide", kind="guide", accent="#FF5314", label="From purchase to connected.",
                 order=None, modes={}),
    "affiliate": dict(title="Affiliate", kind="earnings", accent="#16A34A", label="Good connections pay.",
                 order=[0,3,5,2,4,1,6,7], modes={3:"pricing",5:"quotes",2:"steps",4:"toolkit",1:"benefits",6:"faq"}),
}

def clean_text(node):
    return re.sub(r"\s+", " ", node.get_text(" ", strip=True)).strip()

def tokens(node):
    c = deepcopy(node)
    for e in c.select('style,script,svg,[data-qa-slot],.sr-only'):
        e.decompose()
    return Counter(w for w in re.findall(r"[\w$%+@.-]+", c.get_text(" ", strip=True).lower()) if re.search(r"\w",w))

def cls(node):
    return " ".join(node.get("class", []))

def opaque_art(node):
    """Preserve self-contained illustrations, phone mockups and logo tracks."""
    if node.name == "svg":
        return True
    c = cls(node)
    return any(x in c.split() for x in ["ol-scene", "ol-om-stage"]) or (
        node.name == "div" and "relative" in c and
        ("hidden lg:block" in c or "aspect-video" in c) and
        node.select_one("svg") is not None and node.find(["h1","h2"]) is None)

def attrs_copy(node):
    return {k:v for k,v in node.attrs.items() if k in ["id","href","src","srcset","alt","type","name","value","placeholder","for",
        "required","autocomplete","checked","selected","multiple","min","max","step","viewBox","target","rel",
        "aria-label","aria-hidden","aria-expanded","aria-controls","role","open","rows","colspan"] or
        k.startswith("data-ol-")}

def action(node, text):
    href = node.get("href", "")
    if re.search(r"compatib|check my phone",text,re.I):
        return {"data-ol-open":"compat"}
    if re.search(r"live chat|contact.*support|chat with|start.*chat",text,re.I):
        return {"data-ol-open":"chat"}
    if re.search(r"knowledge base|browse.*help",text,re.I):
        return {"data-ol-open":"kb"}
    if href and href != "#" and not href.startswith("javascript:"):
        return {}
    if re.search(r"choose.*destination|buy.*esim|browse.*plan|shop.*plan|find.*plan|see.*price",text,re.I):
        return {"data-rx-action":"plans"}
    if re.search(r"get.*started|request|contact|join|apply|become.*partner|demo",text,re.I):
        return {"data-rx-action":"contact"}
    if re.search(r"subscribe|join.*newsletter|stay.*updated|get.*link",text,re.I):
        return {"data-rx-action":"preview"}
    if re.search(r"learn more|how it works|view.*guide",text,re.I):
        return {"data-rx-action":"next"}
    return {"data-rx-action":"preview"}

def convert(node, soup, parent_grid=False):
    if isinstance(node, Comment):
        return None
    if isinstance(node, NavigableString):
        return NavigableString(str(node))
    if node.name in ["script","style"]:
        return None
    if node.name in ["div","span"] and not clean_text(node) and not node.select_one("svg,img,video,canvas,input,select,textarea,button,a,[data-qa-slot]"):
        if not re.search(r"width:\s*\d+%",node.get("style","")) and not node.select_one('[style*="width:"]'):
            return None
    if node.get("data-qa-slot"):
        out = deepcopy(node)
        out["class"] = ["rx-slot"]
        out.attrs.pop("style",None)
        out.attrs.pop("id",None)
        out["data-rx-slot"] = node["data-qa-slot"]
        return out
    if opaque_art(node):
        out = deepcopy(node)
        if node.name == "svg":
            vb = node.get("viewbox", node.get("viewBox","")).split()
            is_icon = len(vb)==4 and float(vb[2])<=64
            if is_icon:
                out["class"] = ["rx-icon"]
                out["width"]="24"; out["height"]="24"
            else:
                out["class"] = list(out.get("class", []))+["rx-illustration"]
        else:
            out["class"] = [x for x in out.get("class",[]) if x not in ["hidden","lg:block"]]+["rx-art-island"]
        return out
    c = cls(node); text = clean_text(node)
    tag = node.name
    data = node.get("data-slot","")
    outcls=[]
    if "sr-only" in c.split():
        return deepcopy(node)
    if data == "card":
        tag="article"; outcls=["rx-card"]
    elif data=="card-title":
        tag="h3"
    elif data=="card-description":
        tag="p"
    elif data in ["card-header","card-content","card-footer"]:
        outcls=["rx-card-"+data.split("-")[1]]
    elif tag in ["h1","h2","h3","h4"]:
        outcls=["rx-"+tag]
    elif tag in ["p"]:
        outcls=["rx-copy"]
    elif tag in ["table"]:
        outcls=["rx-table"]
    elif tag=="img":
        outcls=["rx-img"]
        if "object-contain" in c:
            outcls+=["rx-logo-image"]
        elif "rounded-full" in c:
            outcls+=["rx-avatar-image"]
    elif tag in ["button","a"]:
        is_label = tag=="button" and ("rounded-full px-5 py-2" in c or "mb-4 rounded-full" in c) and len(text)<45
        if is_label:
            tag="span"; outcls=["rx-eyebrow"]
        elif tag=="a" and (node.find(["h3","article"]) or node.select_one('[data-slot="card"]')):
            outcls=["rx-card-link"]
        else:
            outcls=["rx-button" if tag=="button" or node.find("button") or "rounded" in c else "rx-link"]
    elif tag in ["div","span"]:
        if "grid" in c.split() and re.search(r"grid-cols-(?:[23456]|\[)",c):
            outcls=["rx-grid"]
            cols=re.findall(r"(?:^|:|\s)grid-cols-([23456])",c)
            outcls+=["rx-cols-"+str(min(4,int(cols[-1]))) if cols else "rx-cols-2"]
        elif "flex" in c.split() and "flex-col" not in c.split():
            outcls=["rx-row"]
            if "justify-between" in c:outcls+=["rx-between"]
            if "flex-wrap" in c:outcls+=["rx-flexwrap"]
        elif re.search(r"space-y-[3468]",c):
            outcls=["rx-stack"]
        elif "rounded" in c and ("border" in c or "bg-" in c):
            outcls=["rx-surface"]
        if re.search(r"text-(?:[23456]xl|\[[3456]\dpx\])",c) and len(text)<35:
            outcls+=["rx-number"]
        if "text-muted-foreground" in c or "text-gray-500" in c:
            outcls+=["rx-muted"]
        if any(t in c for t in ["text-primary","text-blue-700","text-teal-700","text-green-700","text-purple-600","text-cyan-600","text-cyan-700"]):
            outcls+=["rx-accent"]
    if tag=="div" and parent_grid and not outcls and node.find(["h3","h4","p"]) and not node.select_one("[data-qa-slot]") and not node.find("h1") and not node.find_parent(attrs={"data-slot":"card"}):
        outcls=["rx-card"]
    if "absolute" in c.split() and text and not node.find(["h1","h2"]) and not node.select_one("[data-qa-slot]"):
        outcls+=["rx-legacy-badge"]
    market_classes={
        "ol-om-fams":["rx-grid","rx-cols-3"], "ol-om-fam":["rx-card"],
        "ol-om-parts":["rx-grid","rx-cols-3"], "ol-om-stats":["rx-grid","rx-cols-4"],
        "ol-om-venue-grid":["rx-grid","rx-cols-2"], "ol-om-ctrl-grid":["rx-grid","rx-cols-2"],
        "ol-om-ctrl-list":["rx-stack"], "ol-om-ctrl-i":["rx-card"],
        "ol-om-access-card":["rx-card"], "ol-om-steps":["rx-grid","rx-cols-3"],
        "ol-om-trust":["rx-grid","rx-cols-3"], "ol-om-eyebrow":["rx-eyebrow"],
    }
    for name,classes in market_classes.items():
        if name in c.split():outcls=classes;break
    out=soup.new_tag(tag)
    out.attrs=attrs_copy(node)
    # Preserve responsive alternative copy (e.g. desktop/mobile CTAs) instead
    # of displaying both captured versions at once.
    visibility=[x for x in c.split() if x=="hidden" or re.match(r"(?:sm|md|lg|xl):(hidden|block|flex)$",x)] if tag in ["a","button","p","span"] else []
    if outcls or visibility:out["class"]=outcls+visibility
    if tag=="img":
        out["loading"]="lazy"
        # Source assets retain their intrinsic aspect, not their old utility sizing.
    if tag=="a" and out.get("target")=="_blank":
        out["rel"]="noopener noreferrer"
    if tag in ["a","button"]:
        out.attrs.update(action(node,text))
        if tag=="button":out["type"]="button"
    if tag=="input" and node.get("type") not in ["checkbox","radio","range"]:
        out["class"]=["rx-input"]
        if not out.get("aria-label"):
            out["aria-label"]=out.get("placeholder") or "Your details"
    # Keep numeric widths of source progress bars, but not layout overrides.
    if "style" in node.attrs and re.search(r"(width:\s*\d+%|--)",node["style"]) and not node.find(["h1","h2","h3"]):
        out["style"]=node["style"]
    for child in node.children:
        converted=convert(child,soup,parent_grid="rx-grid" in outcls)
        if converted is not None:out.append(converted)
    # Avoid invalid nested buttons/links in source marketing CTAs.
    if tag=="a":
        for b in out.find_all("button"):
            b.name="span";b.attrs={"class":["rx-button-label"]}
    if tag=="div" and not out.attrs and len(out.contents)==1 and isinstance(out.contents[0],Tag):
        return out.contents[0].extract()
    return out

def chunks(main):
    n=main
    while True:
        kids=[k for k in n.find_all(recursive=False) if k.name not in ["style","script"]]
        if len(kids)==1 and kids[0].name=="div":
            n=kids[0]
        else:break
    return [deepcopy(k) for k in kids if clean_text(k) or k.find("img")]

def section_title(section, index):
    h=section.find(["h1","h2","h3"])
    if h:return clean_text(h)
    if section.find("img"):return "Our network partners"
    return "The Openline difference" if index else "Welcome"

def make_chapter(source, i, mode, soup):
    original=deepcopy(source)
    title=section_title(source,i)
    # Elevate the section heading from the old grid into its own editorial rail.
    heading=source.find(["h2","h1"])
    header=soup.new_tag("header",attrs={"class":"rx-section-head"})
    kicker=soup.new_tag("span",attrs={"class":"rx-chapter-number"})
    kicker.string=f"{i:02d}"
    header.append(kicker)
    h=soup.new_tag("h2");h.string=title;header.append(h)
    if heading:heading.decompose()
    for b in source.select("button"):
        if ("mb-4" in cls(b) and "rounded-full" in cls(b)):
            p=soup.new_tag("p",attrs={"class":"rx-eyebrow"});p.string=clean_text(b);header.insert(1,p);b.decompose()
            break
    # Lead copy becomes part of the header, no repeated heading inside the body.
    p=source.find("p")
    if p and len(clean_text(p))>35 and not p.find_parent(attrs={"data-slot":"card"}):
        lead=convert(p,soup);lead["class"]=["rx-section-lead"];header.append(lead);p.decompose()
    outer=soup.new_tag("section",attrs={"class":f"rx-chapter rx-mode-{mode}","id":f"rx-chapter-{i}","data-rx-title":title})
    inner=soup.new_tag("div",attrs={"class":"rx-wrap"})
    inner.append(header)
    content=soup.new_tag("div",attrs={"class":"rx-content"})
    converted=convert(source,soup)
    if converted:content.append(converted)
    slots=content.select("[data-qa-slot]")
    if len(slots)==1 and mode in ["split","split-reverse","referral"]:
        art=slots[0].extract()
        # The illustration is now a dedicated sibling, not a nested card.
        for div in list(content.find_all("div"))[::-1]:
            if not clean_text(div) and not div.select_one("img,svg,input,textarea,select"):
                div.decompose()
            elif "rx-grid" in div.get("class",[]) and len(div.find_all(recursive=False))==1:
                div["class"]=[x for x in div["class"] if not x.startswith("rx-cols") and x!="rx-grid"]
        copy=soup.new_tag("div",attrs={"class":"rx-feature-copy"})
        for child in list(content.contents):copy.append(child.extract())
        stage=soup.new_tag("div",attrs={"class":"rx-feature-art"});stage.append(art)
        feature=soup.new_tag("div",attrs={"class":"rx-feature-grid"})
        if mode=="split-reverse":feature.extend([stage,copy])
        else:feature.extend([copy,stage])
        content.append(feature)
    inner.append(content);outer.append(inner)
    # Optional FAQ disclosure preserves source copy but makes it browsable.
    if mode=="faq":
        for card in content.select("article.rx-card"):
            question=card.find(["h3","h4"])
            if question:
                card.name="details"
                summary=soup.new_tag("summary");summary.string=clean_text(question);question.decompose()
                card.insert(0,summary)
    return outer, original

def build(slug,plan):
    source=BeautifulSoup((Q/f"{slug}.html").read_text(),"html.parser")
    original=source.main
    if not original:raise RuntimeError(f"No main in {slug}")
    src_tokens=tokens(original)
    parts=chunks(original)
    if slug=="login":
        parts=[deepcopy(original)]
    # Installation has a breadcrumb before its hero; retain it as a plain link.
    if slug=="installation-guide" and len(parts)>1 and clean_text(parts[0])=="Back":
        parts[1].insert(0,parts.pop(0))
    order=plan["order"] or list(range(len(parts)))
    if sorted(order)!=list(range(len(parts))):
        raise RuntimeError(f"{slug}: section plan {order} does not cover {len(parts)} chunks")
    out=source.new_tag("main",attrs={"class":f"rx-main rx-{plan['kind']}","data-rx":slug,
                                   "style":f"--rx-accent:{plan['accent']}"})
    # Preserve original keyframes for native illustration islands.
    for st in original.find_all("style"):
        out.append(deepcopy(st))
    nav=source.new_tag("nav",attrs={"class":"rx-chapters","aria-label":"On this page"})
    label=source.new_tag("span",attrs={"class":"rx-chapters-title"});label.string=plan["title"];nav.append(label)
    hero_source=parts[0]
    hero=source.new_tag("section",attrs={"class":"rx-hero"})
    hero_wrap=source.new_tag("div",attrs={"class":"rx-wrap"})
    mast=source.new_tag("div",attrs={"class":"rx-mast"})
    crumb=source.new_tag("a",href="/qa",attrs={"class":"rx-breadcrumb"});crumb.string="Openline / "+plan["title"];mast.append(crumb)
    index=source.new_tag("span",attrs={"class":"rx-edition"});index.string="Redesign preview";mast.append(index);hero_wrap.append(mast)
    intro=source.new_tag("p",attrs={"class":"rx-intro"});intro.string=plan["label"];hero_wrap.append(intro)
    hero_content=convert(hero_source,source)
    if hero_content.name=="main":hero_content.name="div"
    hero_content["class"]=list(hero_content.get("class",[]))+["rx-hero-content"]
    if slug=="openline-plus":
        summary=hero_content.select_one(".rx-grid.rx-cols-3")
        if summary:
            parent=summary.parent
            summary.extract()
            panel=source.new_tag("aside",attrs={"class":"rx-plus-summary"})
            panel.append(summary)
            trust=parent.select_one(".rx-flexwrap")
            if trust:panel.append(trust.extract())
            parent["class"]=list(parent.get("class",[]))+["rx-plus-copy"]
            hero_content.append(panel)
            hero_content["class"]+=["rx-plus-layout"]
    if slug=="omdm-market":
        # The source uses custom grid classes, not the utility-grid markers.
        frame=hero_content.find("div",recursive=False)
        if frame:
            frame["class"]=["rx-grid","rx-cols-2"]
            for col in frame.find_all(recursive=False):
                if col.find("h1"):col["class"]=["rx-hero-copy"]
                else:col["class"]=["rx-hero-media"]
    hero_grid=hero_content.select_one(".rx-grid")
    if hero_grid and len(hero_grid.find_all(recursive=False))==2 and hero_grid.find("h1"):
        cols=hero_grid.find_all(recursive=False)
        for col in cols:
            if col.find("h1"):
                col["class"]=[x for x in col.get("class",[]) if x!="rx-card"]+["rx-hero-copy"]
            else:
                col["class"]=list(col.get("class",[]))+["rx-hero-media"]
    # Home's animated typewriter capture has three h1s; one accessible title.
    if slug=="home":
        hs=hero_content.find_all("h1")
        if hs:
            for h in hs[1:]:
                h.name="p";h["class"]=["rx-hero-continuation"]
                if clean_text(h) in ["- |","|"]:
                    h["class"]+=["sr-only"]
        images=hero_content.select(".rx-hero-media img")
        if images:
            gallery=images[0].parent
            gallery["class"]=["rx-gallery"]
            for j,image in enumerate(images):
                image["data-rx-frame"]=str(j)
                if j==0:
                    image["class"]+=["is-active"]
                    image["loading"]="eager"
                    image["fetchpriority"]="high"
            for j,button in enumerate(gallery.find_all("button")):
                button.attrs.pop("data-rx-action",None)
                button["data-rx-slide"]=str(j)
                button["aria-pressed"]="true" if j==0 else "false"
        for p in hero_content.find_all("p"):
            if "Or" in clean_text(p) and "quickly buy an eSIM plan" in clean_text(p):
                p["hidden"]=""
    hero_wrap.append(hero_content);hero.append(hero_wrap)
    out.append(hero)
    if slug!="login":
        out.append(nav)
    for display_i,index in enumerate(order[1:],1):
        mode=plan["modes"].get(index,"close" if display_i==len(order)-1 else "cards")
        if slug=="installation-guide":
            mode=["","brief","steps","guide","guide"][min(display_i,4)]
        chapter,_=make_chapter(parts[index],display_i,mode,source)
        out.append(chapter)
        a=source.new_tag("a",href=f"#rx-chapter-{display_i}")
        a.string=chapter["data-rx-title"]
        nav.append(a)
    if slug=="login":
        hero_content["class"]+=["rx-signin"]
    # Every reused source word must survive, apart from the intentionally
    # replaced animation text / inaccessible decoration filtered by tokens().
    missing=src_tokens-tokens(out)
    if missing:raise RuntimeError(f"{slug}: missing source copy {dict(missing)}")
    original.replace_with(out)
    source.body["data-qa-page"]=slug+"-redesign"
    source.title.string=f"QA · {plan['title']} redesign · Openline"
    for href in ["/qa/redesign/all.css"]:
        source.head.append(source.new_tag("link",rel="stylesheet",href=href))
    # Unlayered colour tokens are inlined so the established recolour engine
    # can honour page identities and custom theme controls.
    style=source.new_tag("style",attrs={"data-rx-colors":""})
    style.string=(Q/"redesign/colors.css").read_text()
    out.insert(0,style)
    script=source.new_tag("script",type="module",src="/qa/redesign/all.js")
    source.body.append(script)
    (Q/f"{slug}-redesign.html").write_text(str(source))
    return {"page":slug,"chapters":len(parts),"words_preserved":sum(src_tokens.values()),
            "slots":[x["data-qa-slot"] for x in out.select("[data-qa-slot]")],"mode":plan["kind"]}

if __name__=="__main__":
    report=[build(s,p) for s,p in PLANS.items()]
    (Q/"redesign/content-audit.json").write_text(json.dumps(report,indent=2))
    print(json.dumps(report,indent=2))
