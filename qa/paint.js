/* ══════════════════════════════════════════════════════════════════════
   Applies a recolour mapper to live DOM.

   Originals are remembered the first time an element is seen, so switching
   theme always starts from the shipped colours — themes never compound —
   and "As shipped" restores them exactly.
   ══════════════════════════════════════════════════════════════════════ */

import { recolor, hexToHue } from './recolor.js';

const ATTRS = ['style', 'fill', 'stroke', 'stop-color', 'flood-color', 'lighting-color', 'color', 'values', 'from', 'to'];
const SEL = ATTRS.map((a) => `[${a}]`).join(',');
const orig = new WeakMap();      // element -> { attr: original value }
const wrote = new WeakMap();     // element -> { attr: value we last wrote }
const origText = new WeakMap();  // <style> -> original css text

let siteCss = null;              // original text of the site stylesheet
let siteStyle = null;            // <style> carrying the recoloured copy

/* The site stylesheet is ~290KB. It is fetched once, and only swapped for a
   recoloured inline copy when a theme is actually active — "As shipped"
   keeps the untouched <link>, so the default view is byte-identical. */
export async function paintSiteCss(map) {
  const link = document.getElementById('qa-site-css');
  if (!link) return;
  if (!map) {
    link.disabled = false;
    if (siteStyle) siteStyle.disabled = true;
    return;
  }
  if (siteCss == null) {
    const r = await fetch(link.href);
    siteCss = await r.text();
  }
  if (!siteStyle) {
    siteStyle = document.createElement('style');
    siteStyle.id = 'qa-site-css-themed';
    link.after(siteStyle);
  }
  siteStyle.textContent = recolor(siteCss, map);
  siteStyle.disabled = false;
  link.disabled = true;
}

export function paintTree(root, map, skip) {
  const els = root.querySelectorAll ? root.querySelectorAll(SEL) : [];
  const list = root.matches && root.matches(SEL) ? [root, ...els] : els;
  for (const el of list) {
    if (skip && skip(el)) continue;
    let o = orig.get(el);
    if (!o) {
      o = {};
      for (const a of ATTRS) if (el.hasAttribute(a)) o[a] = el.getAttribute(a);
      orig.set(el, o);
    }
    for (const a in o) {
      const v = map ? recolor(o[a], map) : o[a];
      if (el.getAttribute(a) !== v) { mark(el, a, v); el.setAttribute(a, v); }
    }
  }
  const styles = root.querySelectorAll ? root.querySelectorAll('style') : [];
  for (const st of styles) {
    if (st.id === 'qa-site-css-themed' || st.dataset.qaOwn != null) continue;
    if (skip && skip(st)) continue;
    if (!origText.has(st)) origText.set(st, st.textContent);
    const t = origText.get(st);
    const v = map ? recolor(t, map) : t;
    if (st.textContent !== v) st.textContent = v;
  }
}

function mark(el, a, v) {
  let w = wrote.get(el);
  if (!w) { w = {}; wrote.set(el, w); }
  w[a] = v;
}

/* Some options animate from script (init) by writing fill/stroke/style at
   runtime — the blog Topic Picker paints its active chip that way. Those
   writes carry the shipped colours and would bypass the theme, so they are
   caught here, remembered as the new original, and recoloured. Our own
   writes are recognised and skipped, so this never loops. */
export function watchMutations(root, getMap, accept) {
  const mo = new MutationObserver((list) => {
    const map = getMap();
    for (const m of list) {
      const el = m.target;
      const a = m.attributeName;
      if (accept && !accept(el)) continue;
      const v = el.getAttribute(a);
      const w = wrote.get(el);
      if (w && w[a] === v) continue;
      let o = orig.get(el);
      if (!o) { o = {}; orig.set(el, o); }
      if (v == null) { delete o[a]; continue; }
      o[a] = v;
      if (!map) continue;
      const nv = recolor(v, map);
      if (nv !== v) { mark(el, a, nv); el.setAttribute(a, nv); }
    }
  });
  mo.observe(root, { subtree: true, attributes: true, attributeFilter: ATTRS });
  return mo;
}

/* Chrome: the saturated solids of the replaced hue (the eSIM chip, the
   module) take a brushed-metal gradient instead of a flat grey. Marked
   before the recolour pass, while their hue can still be read. */
export function chromeSheen(el) {
  el.querySelectorAll('svg').forEach((svg, si) => {
    const hits = [...svg.querySelectorAll('rect, circle, path, ellipse, polygon')].filter((n) => {
      const f = (n.getAttribute('fill') || '').trim();
      if (!/^#[0-9a-f]{6}$/i.test(f)) return false;
      const { L, C, H } = hexToHue(f);
      return C > 0.12 && H > 270 && H < 320 && L > 0.35 && L < 0.7;
    });
    if (!hits.length) return;
    const id = `qa-chrome-${Math.random().toString(36).slice(2, 8)}-${si}`;
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `<linearGradient id="${id}" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0" stop-color="#B9BEC6"/><stop offset="0.42" stop-color="#6B717A"/>
      <stop offset="0.5" stop-color="#4E545C"/><stop offset="0.78" stop-color="#7A8089"/><stop offset="1" stop-color="#3D4249"/></linearGradient>`;
    svg.insertBefore(defs, svg.firstChild);
    hits.forEach((n) => n.setAttribute('fill', `url(#${id})`));
  });
}

