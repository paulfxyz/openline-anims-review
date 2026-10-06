/* Shared tokens + artwork for the /global-esim boards.
   The live page runs the warm Openline orange system, not the cyan of
   /multiple-tier1, so these boards keep that palette exactly.          */

export const G = {
  orange: '#FF5314',
  deep: '#E23D00',
  amber: '#F59E0B',
  red: '#DC2626',
  ink: '#0B0B0F',
  gray: '#9CA3AF',
  line: '#E5E7EB',
  white: '#FFFFFF',
  wash: '#FFF7F3',
};

export const VBG = '0 0 640 460';

export const gWrap = (inner, extra = '') =>
  `<svg viewBox="${VBG}" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style="width:100%;height:100%" ${extra}>${inner}</svg>`;

/* soft radial bloom behind the subject — same feel as the live panel */
export const bloom = (cx, cy, r, uid, color = G.orange) => `
  <defs>
    <radialGradient id="bl-${uid}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.20"/>
      <stop offset="60%" stop-color="${color}" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#bl-${uid})"/>`;

/* the dotted field the live panel uses as its background texture */
export const dots = (uid) => `
  <defs>
    <pattern id="dt-${uid}" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="1.6" cy="1.6" r="1.6" fill="${G.orange}" opacity="0.13"/>
    </pattern>
  </defs>
  <rect x="0" y="0" width="640" height="460" fill="url(#dt-${uid})"/>`;

/* phone shell, drawn at (x,y) as its centre. Returns markup only;
   the inner screen is a slot the caller fills.                        */
export function phone({ x, y, w = 156, h = 300, screen = '', glowId = null }) {
  const rx = 22;
  return `
  <g transform="translate(${x - w / 2} ${y - h / 2})">
    ${glowId ? `<rect x="-10" y="-10" width="${w + 20}" height="${h + 20}" rx="${rx + 8}" fill="${G.orange}" opacity="0.10"/>` : ''}
    <rect x="0" y="0" width="${w}" height="${h}" rx="${rx}" fill="${G.ink}"/>
    <rect x="5" y="5" width="${w - 10}" height="${h - 10}" rx="${rx - 5}" fill="#17171C"/>
    <rect x="${w / 2 - 22}" y="14" width="44" height="7" rx="3.5" fill="#000" opacity="0.85"/>
    <g transform="translate(5 5)">
      <svg x="0" y="0" width="${w - 10}" height="${h - 10}" viewBox="0 0 ${w - 10} ${h - 10}" overflow="hidden">
        ${screen}
      </svg>
    </g>
  </g>`;
}

/* small mono caption, matching the live panel's monospace micro-labels */
export const mono = (x, y, t, opts = {}) =>
  `<text x="${x}" y="${y}" font-size="${opts.size || 11}" font-weight="${opts.weight || 700}"
     letter-spacing="${opts.ls || 1.1}" fill="${opts.fill || G.ink}" opacity="${opts.op ?? 0.42}"
     text-anchor="${opts.anchor || 'start'}" style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${t}</text>`;

export const label = (x, y, t, opts = {}) =>
  `<text x="${x}" y="${y}" font-size="${opts.size || 14}" font-weight="${opts.weight || 700}"
     fill="${opts.fill || G.ink}" opacity="${opts.op ?? 1}" text-anchor="${opts.anchor || 'start'}">${t}</text>`;

/* a rounded card used by several variants */
export const card = (x, y, w, h, opts = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${opts.r || 14}"
     fill="${opts.fill || G.white}" stroke="${opts.stroke || G.line}" stroke-width="${opts.sw || 1.5}"
     opacity="${opts.op ?? 1}"/>`;

export const gPill = (tone, html, pos) => ({ tone, html, pos });

export function gIcon(name) {
  const p = {
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM19 19h2v2h-2z"/>',
    layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m6.08 13-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83L17.9 13"/>',
    plane: '<path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2a.5.5 0 0 0-.5.8l3.4 4.2-2.7 2.7a.5.5 0 0 0 .3.85l3.2.3.3 3.2a.5.5 0 0 0 .85.3l2.7-2.7 4.2 3.4a.5.5 0 0 0 .8-.5Z"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  }[name];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ic">${p}</svg>`;
}
