/* ══════════════════════════════════════════════════════════════════════
   Recolouring engine for /qa.

   A theme is a rule for moving colours around the OKLCH wheel. Lightness
   and chroma are kept, so a pale wash stays a pale wash and a deep shade
   stays deep — only the hue travels. Neutrals (very low chroma) are never
   touched, which is what keeps text, borders and greys intact.

   Works on any string that carries colours — the site's stylesheet, inline
   style attributes, SVG fill/stroke/stop-color and SMIL `values` — so the
   page and the animations are recoloured by exactly the same rule.
   ══════════════════════════════════════════════════════════════════════ */

/* ── sRGB ↔ OKLCH ─────────────────────────────────────────────────── */

const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

export function rgbToOklch(r, g, b) {
  r = toLin(r / 255); g = toLin(g / 255); b = toLin(b / 255);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.hypot(A, B);
  let H = (Math.atan2(B, A) * 180) / Math.PI;
  if (H < 0) H += 360;
  return [L, C, H];
}

function oklchToLinRgb(L, C, H) {
  const h = (H * Math.PI) / 180;
  const A = C * Math.cos(h), B = C * Math.sin(h);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

/* Out-of-gamut colours lose chroma until they fit, rather than clipping a
   channel — clipping shifts the hue, which is the one thing a theme must
   not do. */
export function oklchToRgb(L, C, H) {
  const ok = (rgb) => rgb.every((v) => v >= -0.0005 && v <= 1.0005);
  let lin = oklchToLinRgb(L, C, H);
  if (!ok(lin)) {
    let lo = 0, hi = C;
    for (let i = 0; i < 22; i++) {
      const mid = (lo + hi) / 2;
      if (ok(oklchToLinRgb(L, mid, H))) lo = mid; else hi = mid;
    }
    lin = oklchToLinRgb(L, lo, H);
  }
  return lin.map((v) => Math.round(Math.min(1, Math.max(0, toGam(Math.min(1, Math.max(0, v))))) * 255));
}

const hex2 = (n) => n.toString(16).padStart(2, '0');

/* ── Families ─────────────────────────────────────────────────────── */

/* Each accent the hub uses, by OKLCH hue. A colour belongs to the family
   whose centre is nearest; its offset from that centre is preserved when it
   moves, so a gradient from orange to a warmer orange stays a gradient. */
export const FAMILIES = [
  { k: 'red', c: 25 },
  { k: 'orange', c: 37 },   /* #FF5314 sits exactly here */
  { k: 'amber', c: 72 },
  { k: 'gold', c: 92 },
  { k: 'green', c: 150 },
  { k: 'teal', c: 182 },
  { k: 'cyan', c: 215 },
  { k: 'blue', c: 262 },
  { k: 'indigo', c: 278 },
  { k: 'purple', c: 300 },
  { k: 'pink', c: 350 },
];

const hueDist = (a, b) => { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; };
const signed = (a, b) => { let d = (a - b) % 360; if (d > 180) d -= 360; if (d < -180) d += 360; return d; };

function familyOf(H) {
  let best = FAMILIES[0], bd = 999;
  for (const f of FAMILIES) { const d = hueDist(H, f.c); if (d < bd) { bd = d; best = f; } }
  return best;
}

/* ── Themes ───────────────────────────────────────────────────────── */

/* scope:
     'brand'  — only the Openline orange family moves (the brand colour)
     'all'    — every page accent moves onto the target hue, so cyan Tier-1,
                purple IoT and green Affiliate all become one colour
   keepStatus: leave greens, reds and saturated ambers alone so "connected" stays green and
   errors stay red — they are signals, not brand.
   chroma: multiplier; 0 gives a monochrome site. */
export function makeMapper(theme) {
  if (!theme || (theme.id === 'original' && theme.ink == null)) return null;
  /* A theme is anchored on one target colour. Its hue is where the accents
     go; its lightness and chroma, relative to Openline orange, say how much
     darker/lighter and how much more or less vivid they become. Shifts are
     weighted by each colour's own chroma, so pale washes stay pale and only
     the saturated accents take the full move. */
  const t = hexToHue(theme.hex || '#FF5314');
  const target = theme.hue != null ? theme.hue : t.H;
  const dL = theme.hex ? t.L - BRAND.L : 0;
  const cm = theme.chroma != null ? theme.chroma : (theme.hex ? Math.min(1.25, t.C / BRAND.C) : 1);
  const scope = theme.scope || 'all';
  const keep = theme.keepStatus !== false;
  const ink = theme.ink != null ? theme.ink : null;
  const inkC = theme.inkC != null ? theme.inkC : 0.05;
  const cache = new Map();

  return (r, g, b) => {
    const key = (r << 16) | (g << 8) | b;
    if (cache.has(key)) return cache.get(key);
    const [L, C, H] = rgbToOklch(r, g, b);
    let out = null;
    const fam = familyOf(H);
    /* Tailwind's orange-50…200 tints drift towards 75° and read as amber by
       hue alone; on this site they are always brand tints, so pale warm
       colours count as brand too. Saturated ambers (stars, warnings) don't. */
    const isBrand = fam.k === 'orange' || (fam.k === 'red' && H > 30) || (H > 30 && H < 62)
      || (L > 0.88 && H > 30 && H < 82);
    /* brand washes (#FFF7F3 and friends) are barely chromatic but clearly
       orange; anything else that faint is a neutral and stays put */
    const floor = isBrand ? 0.006 : 0.05;
    if (C >= floor) {
      const isStatus = fam.k === 'green' || fam.k === 'red' || (H >= 62 && H < 100 && C > 0.1);
      let move = scope === 'all' ? true : isBrand;
      if (keep && isStatus && !isBrand) move = false;
      if (move) {
        /* keep a colour's offset inside its own family so gradients survive;
           damp it for other families, whose offsets mean nothing next to
           the target (an off-centre purple must not land on red) */
        const raw = Math.max(-14, Math.min(14, signed(H, fam.c)));
        const off = isBrand ? raw : raw * 0.35;
        const wgt = Math.min(1, C / 0.16);
        const nL = Math.min(0.99, Math.max(0.05, L + dL * wgt));
        out = oklchToRgb(nL, C * cm, (target + off + 360) % 360);
      }
    }
    /* ink: tint the near-blacks (body text, dark panels, footers) towards
       a hue, so a corporate page reads navy rather than charcoal */
    if (!out && ink != null && C < 0.05 && L < 0.42) {
      out = oklchToRgb(Math.min(0.5, L + 0.015), Math.max(C, inkC * Math.min(1, 0.35 + L * 2)), ink);
    }
    cache.set(key, out);
    return out;
  };
}

const BRAND = { L: 0.672, C: 0.218 };

/* ── String rewriting ─────────────────────────────────────────────── */

/* hex is guarded so url(#id) / href="#id" fragment references and Tailwind's
   escaped arbitrary-value selectors (.bg-\[\#ff5314\]) survive untouched —
   rewriting the selector would unhook it from the class in the markup. */
const RE = /(?<!url\(|href="|xlink:href="|[\w&\\-])#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])|rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[,/]\s*([\d.%]+)\s*)?\)|oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:deg)?\s*(\/\s*[\d.%]+)?\s*\)/g;

export function recolor(str, map) {
  if (!map || !str || typeof str !== 'string') return str;
  return str.replace(RE, (m, hx, r, g, b, a, oL, oC, oH, oA) => {
    if (hx) {
      let h = hx;
      if (h.length <= 4) h = h.split('').map((c) => c + c).join('');
      const R = parseInt(h.slice(0, 2), 16), G = parseInt(h.slice(2, 4), 16), B = parseInt(h.slice(4, 6), 16);
      const o = map(R, G, B);
      if (!o) return m;
      return '#' + o.map(hex2).join('') + (h.length === 8 ? h.slice(6, 8) : '');
    }
    if (r != null) {
      const o = map(+r, +g, +b);
      if (!o) return m;
      return a != null ? `rgba(${o[0]},${o[1]},${o[2]},${a})` : `rgb(${o[0]},${o[1]},${o[2]})`;
    }
    /* oklch: convert through sRGB so it is judged by the same family rule */
    const L = oL.endsWith('%') ? parseFloat(oL) / 100 : +oL;
    const rgb = oklchToRgb(L, +oC, +oH);
    const o = map(rgb[0], rgb[1], rgb[2]);
    if (!o) return m;
    const [nL, nC, nH] = rgbToOklch(o[0], o[1], o[2]);
    return `oklch(${nL.toFixed(3)} ${nC.toFixed(3)} ${nH.toFixed(2)}${oA ? ' ' + oA : ''})`;
  });
}

export function hexToHue(hex) {
  const h = hex.replace('#', '');
  const [L, C, H] = rgbToOklch(parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16));
  return { L, C, H };
}

/* ── Presets ──────────────────────────────────────────────────────── */

export const PRESETS = [
  { id: 'original', name: 'As shipped', sw: ['#FF5314', '#06B6D4', '#8B5CF6'], note: 'Every page keeps its own accent, exactly like the live site.' },
  { id: 'unified', name: 'All orange', hex: '#FF5314', scope: 'all', sw: ['#FF5314'], note: 'Cyan Tier-1, purple IoT, navy OMDM and green Affiliate all move onto Openline orange.' },
  { id: 'cobalt', name: 'Cobalt', hex: '#2563EB', scope: 'all', sw: ['#2563EB'], note: 'One cobalt blue for brand and page accents.' },
  { id: 'emerald', name: 'Emerald', hex: '#059669', scope: 'all', keepStatus: false, sw: ['#059669'], note: 'Green brand, status greens included.' },
  { id: 'violet', name: 'Violet', hex: '#7C3AED', scope: 'all', sw: ['#7C3AED'], note: 'One violet across the site.' },
  { id: 'magenta', name: 'Magenta', hex: '#DB2777', scope: 'all', sw: ['#DB2777'], note: 'One magenta across the site.' },
  { id: 'teal', name: 'Teal', hex: '#0D9488', scope: 'all', sw: ['#0D9488'], note: 'One teal across the site.' },
  { id: 'mono', name: 'Graphite', hex: '#3F3F46', scope: 'all', chroma: 0, sw: ['#3F3F46'], note: 'Monochrome. Green, red and amber status colours keep their colour.' },
];
