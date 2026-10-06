// Frozen verbatim from qa/qa.js at delivery build.
export function fitArt(rec, mount) {
  const svg = mount && mount.querySelector(':scope > svg');
  const def = rec.def || {};
  if (!svg || !svg.viewBox || !svg.viewBox.baseVal || !svg.viewBox.baseVal.width) return;
  const vb = svg.viewBox.baseVal;
  const V = { x: vb.x, y: vb.y, w: vb.width, h: vb.height };
  const full = (n) => {
    if (n.tagName !== 'rect') return false;
    const w = n.getAttribute('width'), h = n.getAttribute('height');
    const num = (v, ref) => (String(v).endsWith('%') ? (parseFloat(v) / 100) * ref : parseFloat(v));
    return num(w, V.w) >= V.w * 0.98 && num(h, V.h) >= V.h * 0.98 && (+n.getAttribute('x') || 0) <= V.x + 1 && (+n.getAttribute('y') || 0) <= V.y + 1;
  };
  const bleed = [...svg.querySelectorAll(':scope > rect, :scope > g > rect')].filter(full);
  if (def.clearFill) {
    bleed.forEach((n) => { const f = (n.getAttribute('fill') || '').trim(); if (f && !f.startsWith('url(')) n.setAttribute('fill', 'none'); });
    /* the soft corner blobs drawn with that panel would be cut by the
       slot's edge once the panel is gone */
    [...svg.querySelectorAll(':scope > circle')].forEach((c) => { if (+c.getAttribute('opacity') <= 0.08) c.remove(); });
  }
  if (def.fit === false) return;
  const arS = rec.w / rec.h, arV = V.w / V.h;
  if (Math.abs(arS / arV - 1) < 0.03) return;

  /* what is drawn, in viewBox units, from the rendered boxes */
  const sr = svg.getBoundingClientRect();
  if (!sr.width) return;
  const k = Math.min(sr.width / V.w, sr.height / V.h);
  const ox = sr.left + (sr.width - V.w * k) / 2, oy = sr.top + (sr.height - V.h * k) / 2;
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  [...svg.children].forEach((n) => {
    if (n.tagName === 'defs' || n.tagName === 'style' || full(n)) return;
    if (n.tagName === 'circle' && +n.getAttribute('r') > V.w * 0.28) return;   // blooms
    const b = n.getBoundingClientRect();
    if (!b.width && !b.height) return;
    x0 = Math.min(x0, V.x + (b.left - ox) / k); y0 = Math.min(y0, V.y + (b.top - oy) / k);
    x1 = Math.max(x1, V.x + (b.right - ox) / k); y1 = Math.max(y1, V.y + (b.bottom - oy) / k);
  });
  if (!isFinite(x0)) return;
  x0 = Math.max(V.x, x0); y0 = Math.max(V.y, y0); x1 = Math.min(V.x + V.w, x1); y1 = Math.min(V.y + V.h, y1);
  const pad = def.pad != null ? def.pad : V.w * 0.055;
  let bw = x1 - x0 + pad * 2, bh = y1 - y0 + pad * 2;
  /* grow the short side to the slot's shape */
  if (bw / bh > arS) bh = bw / arS; else bw = bh * arS;
  /* never zoom past 1.2× of the drawing's own scale, so type stays the
     size it was designed at, give or take */
  const minW = Math.max(V.w, V.h * arS) / 1.2;
  if (bw < minW) { bw = minW; bh = bw / arS; }
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  let nx = cx - bw / 2, ny = cy - bh / 2;
  /* stay inside the original frame where it is big enough to allow it */
  if (bw <= V.w) nx = Math.min(Math.max(nx, V.x), V.x + V.w - bw);
  if (bh <= V.h) ny = Math.min(Math.max(ny, V.y), V.y + V.h - bh);
  const N = { x: +nx.toFixed(1), y: +ny.toFixed(1), w: +bw.toFixed(1), h: +bh.toFixed(1) };
  svg.setAttribute('viewBox', `${N.x} ${N.y} ${N.w} ${N.h}`);
  bleed.forEach((n) => {
    n.setAttribute('x', Math.min(N.x, V.x)); n.setAttribute('y', Math.min(N.y, V.y));
    n.setAttribute('width', Math.max(N.x + N.w, V.x + V.w) - Math.min(N.x, V.x));
    n.setAttribute('height', Math.max(N.y + N.h, V.y + V.h) - Math.min(N.y, V.y));
  });
}

