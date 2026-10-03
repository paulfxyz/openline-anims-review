/* Built-in illustrations for modal images — flat SVG, Openline palette,
   no photography to licence. Each one is a 560 × 240 banner that also
   reads when cropped to a square. Returned as data: URIs so an exported
   modal stays self-contained. */

import { FONT_SANS } from './typography.js';

const OR = '#FF5314', ORD = '#E23D00', ORS = '#FFE4D6', ORW = '#FFF7F3', INK = '#0B0B0F', MUT = '#C9CCD4', GR = '#16A34A';

const wrap = (inner, bg = ORW) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 240">
  <style>text { font-family: ${FONT_SANS}; font-variant-numeric: tabular-nums; }</style>
  <rect width="560" height="240" fill="${bg}"/>
  <g opacity=".5">${Array.from({ length: 14 }, (_, i) => Array.from({ length: 7 }, (_, j) =>
    `<circle cx="${20 + i * 40}" cy="${16 + j * 36}" r="1.4" fill="${INK}" opacity=".18"/>`).join('')).join('')}</g>
  ${inner}</svg>`;

const phone = (x, y, w = 96, h = 176, screen = '') => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${INK}"/>
  <rect x="${x + 6}" y="${y + 6}" width="${w - 12}" height="${h - 12}" rx="13" fill="#fff"/>
  <rect x="${x + w / 2 - 14}" y="${y + 11}" width="28" height="6" rx="3" fill="${INK}"/>
  <g transform="translate(${x + 6} ${y + 6})">${screen}</g>`;

const qrBlock = (x, y, s) => {
  let out = '';
  const n = 9, c = s / n;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const corner = (i < 3 && j < 3) || (i < 3 && j > 5) || (i > 5 && j < 3);
    if (corner) continue;
    if ((i * 5 + j * 7 + i * j) % 3 === 0) out += `<rect x="${x + j * c}" y="${y + i * c}" width="${c * .9}" height="${c * .9}" fill="${INK}"/>`;
  }
  const f = (fx, fy) => `<rect x="${fx}" y="${fy}" width="${c * 3}" height="${c * 3}" fill="none" stroke="${INK}" stroke-width="${c * .6}"/><rect x="${fx + c}" y="${fy + c}" width="${c}" height="${c}" fill="${INK}"/>`;
  return out + f(x, y) + f(x + s - c * 3, y) + f(x, y + s - c * 3);
};

export const ILLUS = {
  'qr-install': { name: 'Scan to install', svg: () => wrap(`
    ${phone(240, 32, 96, 176, `<rect x="12" y="28" width="60" height="60" rx="6" fill="${ORW}"/>${qrBlock(18, 34, 48)}
      <rect x="12" y="102" width="60" height="7" rx="3.5" fill="${INK}" opacity=".7"/><rect x="18" y="116" width="48" height="5" rx="2.5" fill="${MUT}"/>
      <rect x="12" y="136" width="60" height="18" rx="9" fill="${OR}"/>`)}
    <path d="M150 120h60" stroke="${OR}" stroke-width="3" stroke-dasharray="6 6" stroke-linecap="round"/>
    <rect x="70" y="80" width="80" height="80" rx="14" fill="#fff" stroke="${ORS}" stroke-width="2"/>${qrBlock(82, 92, 56)}
    <path d="M360 120h50" stroke="${OR}" stroke-width="3" stroke-dasharray="6 6" stroke-linecap="round"/>
    <circle cx="450" cy="120" r="34" fill="${GR}"/><path d="M436 120l10 10 18-20" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`) },
  activation: { name: 'Activating', svg: () => wrap(`
    ${[110, 80, 50].map((r, i) => `<circle cx="280" cy="128" r="${r}" fill="none" stroke="${OR}" stroke-width="2" opacity="${0.15 + i * 0.15}"/>`).join('')}
    ${phone(232, 40, 96, 176, `<rect x="16" y="40" width="52" height="40" rx="8" fill="${OR}"/><rect x="24" y="52" width="36" height="16" rx="3" fill="#fff" opacity=".85"/>
      <path d="M22 118v-8M32 118v-14M42 118v-20M52 118v-26M62 118v-32" stroke="${GR}" stroke-width="5" stroke-linecap="round"/>
      <rect x="12" y="136" width="60" height="7" rx="3.5" fill="${INK}" opacity=".7"/>`)}
    <rect x="370" y="70" width="120" height="34" rx="17" fill="${INK}"/><circle cx="388" cy="87" r="5" fill="#4ADE80"/><text x="400" y="92" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#fff">Tier-1 · 5G</text>
    <rect x="70" y="150" width="120" height="34" rx="17" fill="#fff" stroke="${ORS}" stroke-width="2"/><text x="130" y="172" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="${ORD}">Online in 30s</text>`) },
  globe: { name: 'Coverage', svg: () => wrap(`
    <circle cx="280" cy="120" r="92" fill="#fff" stroke="${ORS}" stroke-width="2"/>
    <ellipse cx="280" cy="120" rx="40" ry="92" fill="none" stroke="${ORS}" stroke-width="2"/>
    <path d="M188 120h184M200 74h160M200 166h160" stroke="${ORS}" stroke-width="2"/>
    ${[[240, 88], [318, 104], [262, 150], [338, 160], [296, 66]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 1 ? 9 : 6}" fill="${i === 1 ? OR : INK}"/>`).join('')}
    <path d="M240 88 Q 280 60 318 104 T 338 160" fill="none" stroke="${OR}" stroke-width="3" stroke-dasharray="6 6"/>
    <rect x="400" y="96" width="112" height="48" rx="12" fill="${INK}"/><text x="416" y="118" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#fff">190+ countries</text>
    <text x="416" y="134" font-family="ui-monospace,monospace" font-size="10" fill="#FFB08F">ONE eSIM</text>`) },
  arrival: { name: 'Landed', svg: () => wrap(`
    <circle cx="420" cy="78" r="38" fill="${ORS}"/><circle cx="420" cy="78" r="24" fill="${OR}"/>
    <path d="M60 196h440" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <path d="M120 150l26-8 26 18 26-6-34-50 18-6 58 44 46-14a12 12 0 0 1 8 22l-150 50-30-22z" fill="${INK}"/>
    <rect x="330" y="150" width="150" height="34" rx="17" fill="#fff" stroke="${ORS}" stroke-width="2"/><circle cx="350" cy="167" r="5" fill="${GR}"/>
    <text x="362" y="172" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="${INK}">Connected · Tokyo</text>`) },
  boarding: { name: 'Lounge pass', svg: () => wrap(`
    <rect x="110" y="44" width="340" height="152" rx="18" fill="${INK}"/>
    <path d="M350 44v152" stroke="#fff" stroke-opacity=".25" stroke-width="2" stroke-dasharray="6 6"/>
    <text x="134" y="84" font-family="ui-monospace,monospace" font-size="11" fill="#FFB08F" letter-spacing="2">OPENLINE+ LOUNGE</text>
    <text x="134" y="122" font-family="system-ui,sans-serif" font-size="30" font-weight="800" fill="#fff">LIS → HND</text>
    <text x="134" y="152" font-family="ui-monospace,monospace" font-size="11" fill="#fff" opacity=".6">GATE 14 · 1 GUEST</text>
    <rect x="368" y="78" width="64" height="64" rx="8" fill="#fff"/>${qrBlock(374, 84, 52)}
    <rect x="134" y="168" width="70" height="8" rx="4" fill="${OR}"/>`, ORW) },
  gift: { name: 'Reward', svg: () => wrap(`
    <rect x="220" y="96" width="120" height="98" rx="10" fill="${OR}"/>
    <rect x="210" y="72" width="140" height="34" rx="8" fill="${ORD}"/>
    <rect x="272" y="72" width="16" height="122" fill="#fff" opacity=".9"/>
    <path d="M280 72c-14-34-50-30-42-8 6 14 42 8 42 8zM280 72c14-34 50-30 42-8-6 14-42 8-42 8z" fill="none" stroke="#fff" stroke-width="5"/>
    ${[[160, 70], [400, 60], [140, 170], [420, 176], [190, 120], [380, 130]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 2 ? 5 : 7}" fill="${i % 3 ? OR : INK}" opacity="${i % 2 ? .5 : .9}"/>`).join('')}
    <rect x="370" y="88" width="94" height="34" rx="17" fill="${INK}"/><text x="417" y="110" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="800" fill="#fff">+ $5</text>`) },
  transfer: { name: 'New phone', svg: () => wrap(`
    ${phone(120, 32, 96, 176, `<rect x="16" y="56" width="52" height="40" rx="8" fill="${MUT}"/>`)}
    ${phone(344, 32, 96, 176, `<rect x="16" y="56" width="52" height="40" rx="8" fill="${OR}"/><rect x="24" y="68" width="36" height="16" rx="3" fill="#fff" opacity=".85"/>`)}
    <path d="M232 104h96M316 92l12 12-12 12" stroke="${OR}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M328 140h-96M244 128l-12 12 12 12" stroke="${INK}" stroke-opacity=".25" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`) },
  usage: { name: 'Data usage', svg: () => wrap(`
    <path d="M180 170a100 100 0 0 1 200 0" fill="none" stroke="${ORS}" stroke-width="22" stroke-linecap="round"/>
    <path d="M180 170a100 100 0 0 1 184-54" fill="none" stroke="${OR}" stroke-width="22" stroke-linecap="round"/>
    <text x="280" y="160" text-anchor="middle" font-family="system-ui,sans-serif" font-size="38" font-weight="800" fill="${INK}">8.4 GB</text>
    <text x="280" y="186" text-anchor="middle" font-family="ui-monospace,monospace" font-size="11" fill="${INK}" opacity=".5" letter-spacing="1.5">OF 10 GB USED</text>`) },
  secure: { name: 'Secure', svg: () => wrap(`
    <path d="M280 36l70 26v50c0 44-30 78-70 90-40-12-70-46-70-90V62z" fill="${INK}"/>
    <path d="M250 120l22 22 40-42" stroke="${OR}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="384" y="100" width="120" height="34" rx="17" fill="#fff" stroke="${ORS}" stroke-width="2"/><text x="444" y="122" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="${INK}">PCI Level 1</text>`) },
};

export const illusSrc = (k) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent((ILLUS[k] || ILLUS.activation).svg())}`;
export const resolveSrc = (src) => (src && src.startsWith('illus:') ? illusSrc(src.slice(6)) : src || '');
