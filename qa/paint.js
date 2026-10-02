/* ══════════════════════════════════════════════════════════════════════
   Applies a recolour mapper to live DOM.

   Originals are remembered the first time an element is seen, so switching
   theme always starts from the shipped colours — themes never compound —
   and "As shipped" restores them exactly.
   ══════════════════════════════════════════════════════════════════════ */

import { recolor } from './recolor.js';

const ATTRS = ['style', 'fill', 'stroke', 'stop-color', 'flood-color', 'lighting-color', 'color', 'values', 'from', 'to'];
const SEL = ATTRS.map((a) => `[${a}]`).join(',');
const orig = new WeakMap();      // element -> { attr: original value }
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
      if (el.getAttribute(a) !== v) el.setAttribute(a, v);
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
