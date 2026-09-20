/* Palette-aware drawing kit.
   The revisions hub runs a different accent per page family — cyan on
   /multiple-tier1, blue on /business, teal on /hospitality, purple on /iot,
   orange on /global-esim and /home. `mk(tone)` returns builders already
   bound to the right accent so every board stays faithful to its page.   */

export const TONES = {
  cyan: { main: '#06B6D4', deep: '#0891B2', wash: '#ECFEFF', soft: '#CFFAFE' },
  blue: { main: '#2563EB', deep: '#1D4ED8', wash: '#EFF6FF', soft: '#DBEAFE' },
  teal: { main: '#0D9488', deep: '#0F766E', wash: '#F0FDFA', soft: '#CCFBF1' },
  purple: { main: '#8B5CF6', deep: '#7C3AED', wash: '#F5F3FF', soft: '#EDE9FE' },
  orange: { main: '#FF5314', deep: '#E23D00', wash: '#FFF7F3', soft: '#FFE4D6' },
  /* /affiliate ships green — the only page on the hub that does */
  green: { main: '#16A34A', deep: '#15803D', wash: '#F0FDF4', soft: '#DCFCE7' },
  /* proposed character for /omdm-market: institutional navy, not orange.
     Documented in STYLE-OMDM.md — navy panels, gold accent, tabular mono. */
  market: { main: '#1B2A4A', deep: '#0E1A33', wash: '#F5F7FB', soft: '#DCE3F0' },
};

/* OMDM market semantics — bid/ask/gold, exported for the market boards */
export const GOLD = '#C08B2C';
export const GOLD_SOFT = '#F7EBD2';
export const UP = '#127C52';
export const DOWN = '#B4232A';
export const TERM = '#0A1122';

export const INK = '#0B0B0F';
export const WHITE = '#FFFFFF';
export const GRAY = '#9CA3AF';
export const LINE = '#E5E7EB';
export const GREEN = '#10B981';
export const GREEN_SOFT = '#D1FAE5';
export const GREEN_TEXT = '#065F46';
export const RED = '#DC2626';
export const AMBER = '#F59E0B';

export const VB = '0 0 640 460';
const MONO = 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace';

export function mk(toneName) {
  const P = TONES[toneName];

  const wrap = (inner) =>
    `<svg viewBox="${VB}" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style="width:100%;height:100%">${inner}</svg>`;

  const dots = (uid, op = 0.13) => `
    <defs><pattern id="kd-${uid}" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="1.6" cy="1.6" r="1.6" fill="${P.main}" opacity="${op}"/></pattern></defs>
    <rect width="640" height="460" fill="url(#kd-${uid})"/>`;

  const bloom = (cx, cy, r, uid, color = P.main) => `
    <defs><radialGradient id="kb-${uid}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.20"/>
      <stop offset="60%" stop-color="${color}" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </radialGradient></defs>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#kb-${uid})"/>`;

  const mono = (x, y, t, o = {}) =>
    `<text x="${x}" y="${y}" font-size="${o.size || 11}" font-weight="${o.weight || 700}"
      letter-spacing="${o.ls ?? 1.1}" fill="${o.fill || INK}" opacity="${o.op ?? 0.42}"
      text-anchor="${o.anchor || 'start'}" style="font-family:${MONO}">${t}</text>`;

  const label = (x, y, t, o = {}) =>
    `<text x="${x}" y="${y}" font-size="${o.size || 14}" font-weight="${o.weight || 700}"
      fill="${o.fill || INK}" opacity="${o.op ?? 1}" text-anchor="${o.anchor || 'start'}">${t}</text>`;

  const num = (x, y, t, o = {}) =>
    `<text x="${x}" y="${y}" font-size="${o.size || 18}" font-weight="700"
      fill="${o.fill || P.deep}" opacity="${o.op ?? 1}" text-anchor="${o.anchor || 'start'}"
      style="font-family:${MONO}">${t}</text>`;

  const card = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 16}"
      fill="${o.fill || WHITE}" stroke="${o.stroke || LINE}" stroke-width="${o.sw ?? 1.5}"
      opacity="${o.op ?? 1}"/>`;

  /* the framed panel the hub uses for most of these blocks */
  const panel = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 18}"
      fill="${WHITE}" stroke="${o.stroke || INK}" stroke-width="${o.sw ?? 2.5}"/>`;

  const phone = ({ x, y, w = 140, h = 270, screen = '', glow = false }) => {
    const rx = Math.round(w * 0.14);
    return `<g transform="translate(${x - w / 2} ${y - h / 2})">
      ${glow ? `<rect x="-9" y="-9" width="${w + 18}" height="${h + 18}" rx="${rx + 7}" fill="${P.main}" opacity="0.10"/>` : ''}
      <rect width="${w}" height="${h}" rx="${rx}" fill="${INK}"/>
      <rect x="5" y="5" width="${w - 10}" height="${h - 10}" rx="${rx - 5}" fill="#17171C"/>
      <rect x="${w / 2 - 20}" y="13" width="40" height="6" rx="3" fill="#000" opacity="0.85"/>
      <g transform="translate(5 5)"><svg width="${w - 10}" height="${h - 10}"
        viewBox="0 0 ${w - 10} ${h - 10}" overflow="hidden">${screen}</svg></g>
    </g>`;
  };

  /* a white phone, which is what /multiple-tier1 actually draws */
  const phoneLight = ({ x, y, w = 150, h = 300, body = '' }) => {
    const rx = Math.round(w * 0.13);
    return `<g transform="translate(${x - w / 2} ${y - h / 2})">
      <rect width="${w}" height="${h}" rx="${rx}" fill="${WHITE}" stroke="${INK}" stroke-width="2.5"/>
      <rect x="${w / 2 - 22}" y="14" width="44" height="7" rx="3.5" fill="${INK}"/>
      <g transform="translate(0 0)"><svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" overflow="hidden">${body}</svg></g>
    </g>`;
  };

  /* signal bars */
  const bars = (x, y, n = 4, on = 4, o = {}) => {
    const u = o.unit || 11, hh = o.step || 8;
    return `<g transform="translate(${x} ${y})">${Array.from({ length: n }, (_, i) =>
      `<rect x="${i * u}" y="${-6 - i * hh}" width="${u - 4}" height="${6 + i * hh}" rx="2"
        fill="${i < on ? (o.fill || P.main) : (o.off || LINE)}" opacity="${i < on ? 1 : 0.9}"/>`).join('')}</g>`;
  };

  /* mast / tower with concentric rings — the /multiple-tier1 motif */
  const mast = (x, y, o = {}) => `
    <g transform="translate(${x} ${y}) scale(${o.s || 1})">
      ${o.rings ? `<circle cy="-34" r="34" fill="none" stroke="${P.main}" stroke-width="1.8" opacity="0.45"/>
        <circle cy="-34" r="34" fill="none" stroke="${P.main}" stroke-width="2" opacity="0.7" class="ring">
          <animate attributeName="r" values="14;46" dur="${o.dur || 2}s" begin="${o.begin || 0}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;0" dur="${o.dur || 2}s" begin="${o.begin || 0}s" repeatCount="indefinite"/>
        </circle>` : ''}
      <path d="M 0 -34 L -15 30 L 15 30 Z" fill="${P.main}"/>
      <path d="M 0 -34 L 0 30" stroke="${INK}" stroke-width="2.5"/>
      <path d="M -9 4 L 9 4 M -12 18 L 12 18" stroke="${INK}" stroke-width="2"/>
      <circle cy="-38" r="4.5" fill="${INK}"/>
    </g>`;

  const chipIcon = (x, y, s = 1, o = {}) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-26" y="-26" width="52" height="52" rx="13" fill="${o.fill || P.main}" stroke="${INK}" stroke-width="2.5"/>
      <path d="M -8 -12 L -14 0 H -4 L -8 12 L 10 -4 H 0 L 6 -12 Z" fill="${WHITE}"/>
    </g>`;

  const flowLine = (d, o = {}) => `
    <path d="${d}" fill="none" stroke="${o.base || LINE}" stroke-width="${o.w || 3}" stroke-linecap="round"/>
    <path d="${d}" fill="none" stroke="${o.fill || P.main}" stroke-width="${o.w || 3}" stroke-linecap="round"
      stroke-dasharray="${o.dash || '12 9'}" opacity="${o.op ?? 0.9}">
      <animate attributeName="stroke-dashoffset" values="0;-21" dur="${o.dur || 0.75}s" repeatCount="indefinite"/>
    </path>`;

  const packets = (d, n = 2, dur = 1.1) =>
    Array.from({ length: n }, (_, i) =>
      `<circle r="4.5" fill="${P.main}"><animateMotion dur="${dur}s" begin="${(i * dur / n).toFixed(2)}s"
        repeatCount="indefinite" path="${d}"/></circle>`).join('');

  const badge = (x, y, t, o = {}) => `
    <g transform="translate(${x} ${y})">
      <rect x="0" y="0" width="${o.w || 120}" height="${o.h || 32}" rx="${(o.h || 32) / 2}"
        fill="${o.fill || INK}"/>
      <text x="${(o.w || 120) / 2}" y="${(o.h || 32) / 2 + 4.5}" text-anchor="middle"
        font-size="${o.size || 12}" font-weight="700" fill="${o.color || WHITE}"
        style="font-family:${MONO}">${t}</text>
    </g>`;

  const tick = (x, y, t, o = {}) => `
    <g transform="translate(${x} ${y})">
      <path d="M 0 0 l 4 4 l 9 -10" fill="none" stroke="${o.stroke || GREEN}" stroke-width="2.6"
        stroke-linecap="round" stroke-linejoin="round"/>
      <text x="22" y="4" font-size="${o.size || 12.5}" font-weight="600" fill="${INK}" opacity="${o.op ?? 0.7}">${t}</text>
    </g>`;

  return { P, wrap, dots, bloom, mono, label, num, card, panel, phone, phoneLight, bars, mast, chipIcon, flowLine, packets, badge, tick, MONO };
}

export function icon(name) {
  const p = {
    brain: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>',
    chart: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>',
    signal: '<path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    dollar: '<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    star: '<path d="M11.5 2.5 14 8l6 .9-4.3 4.2 1 6-5.2-2.8L6.3 19l1-6L3 8.9 9 8z"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    trend: '<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
    bed: '<path d="M2 9V2h20v7"/><path d="M2 11h20v9H2z"/><circle cx="7" cy="14" r="2"/><path d="M11 14h9"/>',
  }[name];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ic">${p}</svg>`;
}

export const pill = (tone, html, pos) => ({ tone, html, pos });
