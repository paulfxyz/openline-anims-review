/* ══ /iot · "The SIM card is dead. Long live eSIM." ════════════════════
   This section is a 3-column bento grid, not a hero. Measured on the live
   page at a 1440px viewport, the three animated cells are:

     cell 1  740 x 234   wide, light   — sits beside "Global Out of the Box"
     cell 2  360 x 234   single, light — sits beside "Smaller Form Factor"
     cell 3  740 x 234   wide, DARK    — sits beside "Instant Activation"

   Every option below is drawn to exactly those boxes, so it drops into the
   grid cell with no re-cropping. The purple system is kept.              */

import { mk, INK, WHITE, GRAY, LINE, GREEN, GREEN_SOFT, GREEN_TEXT, RED, AMBER } from './kit.js';

const K = mk('purple');
const { P, mono, label, num, card, panel, badge, tick, MONO } = K;

export const WIDE = { w: 740, h: 234, layout: 'wide' };
export const SMALL = { w: 360, h: 234, layout: 'small' };

/* wrappers bound to the two real boxes */
const wrapW = (inner) => `<svg viewBox="0 0 740 234" preserveAspectRatio="xMidYMid meet"
  aria-hidden="true" style="width:100%;height:100%">${inner}</svg>`;
const wrapS = (inner) => `<svg viewBox="0 0 360 234" preserveAspectRatio="xMidYMid meet"
  aria-hidden="true" style="width:100%;height:100%">${inner}</svg>`;

const dotsW = (uid, w = 740, h = 234, op = 0.13) => `
  <defs><pattern id="cd-${uid}" width="19" height="19" patternUnits="userSpaceOnUse">
    <circle cx="1.4" cy="1.4" r="1.4" fill="${P.main}" opacity="${op}"/></pattern></defs>
  <rect width="${w}" height="${h}" fill="url(#cd-${uid})"/>`;

const bloomC = (cx, cy, r, uid, color = P.main, peak = 0.2) => `
  <defs><radialGradient id="cb-${uid}" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="${color}" stop-opacity="${peak}"/>
    <stop offset="60%" stop-color="${color}" stop-opacity="${peak * 0.3}"/>
    <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
  </radialGradient></defs>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#cb-${uid})"/>`;

/* dark cell backdrop — the live cell 3 is a near-black gradient panel */
const darkBg = (uid) => `
  <defs>
    <linearGradient id="dk-${uid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1A1526"/><stop offset="0.5" stop-color="#0D0B14"/>
      <stop offset="1" stop-color="#241A38"/>
    </linearGradient>
    <pattern id="dd-${uid}" width="19" height="19" patternUnits="userSpaceOnUse">
      <circle cx="1.4" cy="1.4" r="1.3" fill="#B79CFF" opacity="0.16"/></pattern>
  </defs>
  <rect width="740" height="234" fill="url(#dk-${uid})"/>
  <rect width="740" height="234" fill="url(#dd-${uid})"/>`;

const wMono = (x, y, t, o = {}) =>
  `<text x="${x}" y="${y}" font-size="${o.size || 9.5}" font-weight="700" letter-spacing="${o.ls ?? 1.1}"
    fill="${o.fill || '#EDE9FE'}" opacity="${o.op ?? 0.55}" text-anchor="${o.anchor || 'start'}"
    style="font-family:${MONO}">${t}</text>`;

const noPills = [];

/* ═════════════════════════════════════════════════════════════════════
   CELL 1 · WIDE 740 × 234 — global out of the box
   ═════════════════════════════════════════════════════════════════════ */

export const c1Current = {
  id: 'c1-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'Grey bars with purple dots on them',
  desc: 'Eleven grey bars of varying height sit on a baseline with purple dots scattered across them. It is the widest animated cell in the section and it is carrying an abstract chart that is not a chart — the bars have no axis, no label and no unit, the dots decode to nothing, and the cell sits directly beside "Global Out of the Box: ship one SKU worldwide", a claim it does not illustrate at all.',
  pros: ['Quiet, and it does not compete with the six text cards', 'Correct palette, and the dot texture matches the rest of the page'],
  cons: ['Reads as a chart but has no axis, unit or label — so it decodes to nothing', 'Says nothing about the card it sits beside', 'Barely moves; the dots drift and that is all', 'Wastes the widest cell in the grid on texture'],
  scores: { story: 1, motion: 2, perf: 5, mobile: 3, brand: 3, ease: 5 },
  build: (uid) => {
    const hs = [46, 72, 58, 86, 104, 66, 96, 52, 78, 62, 40];
    return {
      svg: wrapW(`
        ${dotsW(uid)}
        ${bloomC(430, 130, 190, uid)}
        ${hs.map((h, i) => `<rect x="${170 + i * 34}" y="${188 - h}" width="24" height="${h}" rx="2"
          fill="#D8D8DE" opacity="0.9"/>`).join('')}
        ${hs.map((h, i) => [0, 1, 2].map(k => `<circle cx="${176 + i * 34 + (k % 2) * 11}"
          cy="${186 - (h * (0.25 + k * 0.3))}" r="4" fill="${P.main}" opacity="${0.55 + k * 0.12}">
          <animate attributeName="cy" values="${186 - h * (0.25 + k * 0.3)};${180 - h * (0.25 + k * 0.3)};${186 - h * (0.25 + k * 0.3)}"
            dur="${(2.6 + i * 0.12 + k * 0.3).toFixed(2)}s" repeatCount="indefinite"/></circle>`).join('')).join('')}
        <path d="M 160 189 H 580" stroke="${INK}" stroke-width="2.5"/>`),
      pills: noPills,
    };
  },
};

export const c1Inventory = {
  id: 'c1-inv',
  name: 'Inventory to Zero',
  family: 'Supply chain',
  tagline: 'Forty-two SKUs become one',
  desc: 'Six regional SIM bins sit along the cell — EU, NA, APAC, LATAM, MENA, AFR — each holding a stock figure. One by one they drain to zero and their stock flows right into a single eSIM box, while two counters run: SKUs 42 → 1, and units held 8,400 → 0. It is the literal content of the card it sits beside, and the wide shape is exactly right for a row of bins emptying into one.',
  pros: ['Illustrates the adjacent card precisely instead of decorating it', 'Two counters give the cell a number a procurement reader cares about', 'A left-to-right drain is the natural motion for a 3.2:1 cell', 'Zero inventory is the strongest single claim on the page'],
  cons: ['Six bins plus labels is close to the text budget for a 234px cell', 'Invented stock figures need to stay plausible'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 3, brand: 4, ease: 4 },
  build: (uid) => {
    const bins = [['EU', 1840], ['NA', 1320], ['APAC', 2100], ['LATAM', 980], ['MENA', 1240], ['AFR', 920]];
    const inner = `
      ${dotsW(uid)}
      ${bloomC(560, 120, 180, uid)}
      ${mono(28, 30, 'REGIONAL SIM INVENTORY', { size: 9, op: 0.34 })}
      ${mono(712, 30, 'ONE SKU', { size: 9, op: 0.34, anchor: 'end' })}
      ${bins.map(([n, q], i) => `
        <g transform="translate(${30 + i * 74} 58)">
          <rect width="58" height="86" rx="7" fill="${WHITE}" stroke="${INK}" stroke-width="2"/>
          <rect x="6" y="${6}" width="46" height="74" rx="4" fill="${P.soft}">
            <animate attributeName="height" values="74;0" dur="0.7s" begin="${0.5 + i * 0.32}s" fill="freeze"/>
            <animate attributeName="y" values="6;80" dur="0.7s" begin="${0.5 + i * 0.32}s" fill="freeze"/>
          </rect>
          ${mono(29, 102, n, { size: 8.5, anchor: 'middle', op: 0.45 })}
          <text x="29" y="50" font-size="12" font-weight="700" text-anchor="middle" fill="${P.deep}" style="font-family:${MONO}">${q}
            <animate attributeName="opacity" values="1;0" dur="0.4s" begin="${0.5 + i * 0.32}s" fill="freeze"/></text>
          <text x="29" y="50" font-size="12" font-weight="700" text-anchor="middle" fill="${INK}" opacity="0" style="font-family:${MONO}">0
            <animate attributeName="opacity" values="0;0.35" dur="0.3s" begin="${1.1 + i * 0.32}s" fill="freeze"/></text>
          <circle r="4" fill="${P.main}" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" dur="1.1s" begin="${0.8 + i * 0.32}s"/>
            <animateMotion dur="1.1s" begin="${0.8 + i * 0.32}s"
              path="M 29 82 Q ${200 - i * 74} 160 ${524 - i * 74} 100"/>
          </circle>
        </g>`).join('')}
      <g transform="translate(556 48)">
        <rect width="120" height="94" rx="12" fill="${P.main}" stroke="${INK}" stroke-width="2.5"/>
        <rect x="34" y="30" width="52" height="36" rx="6" fill="${P.deep}" stroke="${WHITE}" stroke-width="2"/>
        <text x="60" y="54" font-size="11" font-weight="700" text-anchor="middle" fill="${WHITE}" style="font-family:${MONO}">eSIM</text>
        ${mono(60, 106, 'SHIPS ANYWHERE', { size: 8.5, anchor: 'middle', op: 0.45 })}
      </g>
      <g transform="translate(30 184)">
        <g opacity="0"><animate attributeName="opacity" values="0;1" dur="0.4s" begin="2.5s" fill="freeze"/>
          ${card(0, 0, 148, 36, { r: 9, fill: INK, stroke: INK })}
          ${mono(12, 15, 'SKUS', { size: 8, op: 0.5, fill: WHITE })}
          <text x="12" y="30" font-size="13" font-weight="700" fill="${P.main}" style="font-family:${MONO}">42 → 1</text>
          ${card(160, 0, 176, 36, { r: 9, fill: GREEN_SOFT, stroke: GREEN, sw: 2 })}
          ${mono(172, 15, 'UNITS HELD', { size: 8, op: 0.6, fill: GREEN_TEXT })}
          <text x="172" y="30" font-size="13" font-weight="700" fill="${GREEN_TEXT}" style="font-family:${MONO}">8,400 → 0</text>
        </g>
      </g>`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c1Conveyor = {
  id: 'c1-conv',
  name: 'Ship Once',
  family: 'Manufacturing',
  tagline: 'Identical devices, destination assigned at the end',
  desc: 'A conveyor runs the full width of the cell. Identical devices travel along it, and only at the very end does each one receive a destination — JP, DE, BR, KE, SG — assigned over the air, with the hardware never changing. A line above reads "one board, one firmware, one part number". It answers the manufacturing question the card raises, and a conveyor is the one composition that genuinely needs a 3.2:1 cell.',
  pros: ['Uses the extreme width as the subject rather than fighting it', 'Speaks directly to a hardware manufacturer, who is the buyer here', 'Continuous motion with no reset, so it never looks finished', 'Destination-at-the-end is the whole eSIM argument in one beat'],
  cons: ['A conveyor is a factory metaphor, not literally what happens', 'Small device shapes are close to the legibility floor on mobile'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 3, brand: 4, ease: 4 },
  build: (uid) => {
    const dests = ['JP', 'DE', 'BR', 'KE', 'SG'];
    const inner = `
      ${dotsW(uid)}
      ${bloomC(370, 120, 220, uid)}
      ${mono(28, 30, 'ONE BOARD · ONE FIRMWARE · ONE PART NUMBER', { size: 9, op: 0.34 })}
      <path d="M 20 164 H 720" stroke="${INK}" stroke-width="2.5"/>
      ${Array.from({ length: 24 }, (_, i) => `<path d="M ${20 + i * 30} 164 l 8 10" stroke="${INK}" stroke-width="1.6" opacity="0.28"/>`).join('')}
      ${dests.map((d, i) => `
        <g>
          <animateTransform attributeName="transform" type="translate" values="-90 0;740 0"
            dur="${dests.length * 1.9}s" begin="${i * 1.9}s" repeatCount="indefinite"/>
          <g transform="translate(0 96)">
            <rect width="62" height="56" rx="8" fill="${WHITE}" stroke="${INK}" stroke-width="2.5"/>
            <rect x="12" y="12" width="24" height="18" rx="4" fill="${P.soft}" stroke="${INK}" stroke-width="1.6"/>
            <circle cx="48" cy="42" r="4" fill="${P.main}"/>
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.7;0.76;1" dur="${dests.length * 1.9}s"
                begin="${i * 1.9}s" repeatCount="indefinite"/>
              <rect x="12" y="-26" width="40" height="22" rx="5" fill="${P.main}" stroke="${INK}" stroke-width="2"/>
              <text x="32" y="-10" font-size="10.5" font-weight="700" text-anchor="middle" fill="${WHITE}" style="font-family:${MONO}">${d}</text>
            </g>
          </g>
        </g>`).join('')}
      <g transform="translate(530 52)">
        <rect width="186" height="40" rx="10" fill="${INK}"/>
        <circle cx="20" cy="20" r="5" fill="${P.main}"><animate attributeName="opacity" values="1;0.2;1" dur="1.1s" repeatCount="indefinite"/></circle>
        ${mono(36, 24, 'PROFILE PUSHED HERE', { size: 9, op: 0.75, fill: WHITE })}
      </g>
      <path d="M 623 92 V 132" stroke="${P.main}" stroke-width="2.5" stroke-dasharray="7 6">
        <animate attributeName="stroke-dashoffset" values="0;-13" dur="0.5s" repeatCount="indefinite"/></path>
      ${mono(28, 210, 'NO REGIONAL VARIANT · NO SIM TO FIT · NO SECOND SKU', { size: 9, op: 0.34 })}`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c1Ticks = {
  id: 'c1-ticks',
  name: 'One Ninety',
  family: 'Minimal',
  tagline: 'A hundred and ninety ticks, one part',
  desc: 'A baseline runs the width of the cell carrying a hundred and ninety fine ticks. They fill left to right as a counter climbs to 190, a handful of country codes surface above the moving edge, and when it reaches the end a single line lands in the middle: one SKU. It is the lightest option here by a wide margin, it is the only one with no illustration to maintain, and the count is the entire argument.',
  pros: ['Almost nothing to draw, so nothing can look wrong at any size', 'Uses the full 740px width as a measuring device', 'A climbing counter is the most reliable motion there is', 'Reads correctly even when the cell is squeezed on mobile'],
  cons: ['Abstract — no device, no chip, no object anywhere in it', 'Close in spirit to the counter already used elsewhere on the site'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: (uid) => {
    const codes = [['JP', 96], ['DE', 206], ['BR', 318], ['KE', 430], ['SG', 542], ['MX', 648]];
    const inner = `
      ${dotsW(uid)}
      ${bloomC(370, 140, 230, uid)}
      ${mono(28, 30, 'COUNTRIES REACHED BY THE SAME PART', { size: 9, op: 0.34 })}
      <g transform="translate(28 150)">
        ${Array.from({ length: 95 }, (_, i) => `<path d="M ${i * 7.2} 0 V ${i % 10 === 0 ? -18 : -10}"
          stroke="${LINE}" stroke-width="1.6"/>`).join('')}
        <g clip-path="url(#tk-${uid})">
          <clipPath id="tk-${uid}"><rect x="0" y="-24" width="0" height="30">
            <animate attributeName="width" values="0;684" dur="3.4s" fill="freeze" repeatCount="indefinite" begin="0s;t.end+1.6s"/>
          </rect></clipPath>
          ${Array.from({ length: 95 }, (_, i) => `<path d="M ${i * 7.2} 0 V ${i % 10 === 0 ? -18 : -10}"
            stroke="${P.main}" stroke-width="1.8"/>`).join('')}
        </g>
        <path d="M 0 0 H 684" stroke="${INK}" stroke-width="2.5"/>
        <g><animateTransform id="t" attributeName="transform" type="translate" values="0 0;684 0" dur="3.4s"
            fill="freeze" repeatCount="indefinite" begin="0s;t.end+1.6s"/>
          <path d="M 0 6 V -28" stroke="${P.deep}" stroke-width="2.5"/>
          <circle cy="-28" r="4" fill="${P.deep}"/>
        </g>
      </g>
      ${codes.map(([c, x], i) => `<g opacity="0" transform="translate(${x} 0)">
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.04;0.3;0.4" dur="3.4s"
          begin="${(x / 684 * 3.4).toFixed(2)}s" repeatCount="indefinite"/>
        ${mono(0, 106, c, { size: 10, anchor: 'middle', op: 0.6, fill: P.deep })}</g>`).join('')}
      <g transform="translate(28 74)">
        <text x="0" y="0" font-size="34" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">190</text>
        <text x="74" y="0" font-size="12" fill="${INK}" opacity="0.45">countries covered</text>
      </g>
      <g transform="translate(556 50)" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.66;0.72;0.94;1" dur="5s" repeatCount="indefinite"/>
        ${card(0, 0, 156, 44, { r: 11, fill: INK, stroke: INK })}
        ${mono(78, 19, 'PART NUMBERS', { size: 8, anchor: 'middle', op: 0.5, fill: WHITE })}
        <text x="78" y="36" font-size="15" font-weight="700" text-anchor="middle" fill="${P.main}" style="font-family:${MONO}">1</text>
      </g>`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c1Customs = {
  id: 'c1-customs',
  name: 'Straight Through',
  family: 'Logistics',
  tagline: 'Six borders, nothing to swap',
  desc: 'A pallet of finished devices travels the width of the cell through six border gates. At each one a stamp lands — no SIM swap, no local variant, no re-flash, no import of SIM stock — and the pallet never stops moving. The card beside it promises no regional inventory management; this is that promise drawn as the thing a logistics manager actually fears, which is a shipment held at a border.',
  pros: ['Frames the benefit as a risk removed, which lands harder than a feature', 'Continuous single-direction motion suits the cell perfectly', 'Stamps give six small payoffs across one pass', 'Speaks to operations, not just engineering'],
  cons: ['Six stamps in 234px of height is tight', 'Border gates imply a customs claim the copy does not make'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 3, brand: 4, ease: 4 },
  build: (uid) => {
    const gates = [['no SIM swap', 128], ['no local variant', 248], ['no re-flash', 368], ['no SIM stock', 488], ['no rework', 608]];
    const inner = `
      ${dotsW(uid)}
      ${bloomC(370, 130, 220, uid)}
      ${mono(28, 28, 'ONE SHIPMENT, FIVE BORDERS', { size: 9, op: 0.34 })}
      ${gates.map(([, x]) => `<path d="M ${x} 58 V 176" stroke="${LINE}" stroke-width="2" stroke-dasharray="5 5"/>`).join('')}
      <path d="M 16 176 H 726" stroke="${INK}" stroke-width="2.5"/>
      ${gates.map(([t, x], i) => `
        <g transform="translate(${x} 0)" opacity="0">
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.04;0.82;0.9" dur="8s"
            begin="${(0.9 + i * 1.3)}s" repeatCount="indefinite"/>
          <g transform="rotate(-7 0 50)">
            ${card(-52, 34, 104, 26, { r: 6, fill: GREEN_SOFT, stroke: GREEN, sw: 2 })}
            ${mono(0, 51, t.toUpperCase(), { size: 7.5, anchor: 'middle', op: 1, fill: GREEN_TEXT })}
          </g>
        </g>`).join('')}
      <g>
        <animateTransform attributeName="transform" type="translate" values="-110 0;760 0" dur="8s" repeatCount="indefinite"/>
        <g transform="translate(0 102)">
          <rect width="96" height="62" rx="6" fill="${WHITE}" stroke="${INK}" stroke-width="2.5"/>
          ${[0, 1, 2].map(i => `<rect x="${8 + i * 28}" y="10" width="22" height="20" rx="3" fill="${P.soft}" stroke="${INK}" stroke-width="1.6"/>`).join('')}
          ${[0, 1, 2].map(i => `<rect x="${8 + i * 28}" y="34" width="22" height="20" rx="3" fill="${P.soft}" stroke="${INK}" stroke-width="1.6"/>`).join('')}
          <path d="M 8 70 H 88 M 18 70 V 78 M 78 70 V 78" stroke="${INK}" stroke-width="2"/>
        </g>
      </g>
      ${mono(28, 210, 'THE SAME PALLET CLEARS EVERY ONE OF THEM', { size: 9, op: 0.34 })}`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c1Strip = {
  id: 'c1-strip',
  name: 'One Line, Every Country',
  family: 'Breadth',
  tagline: 'The country changes, the device does not',
  desc: 'A single device sits fixed in the centre of the cell while a strip of country codes and local carrier names scrolls continuously behind it. Its network label updates as each one passes; its hardware never changes and the strip never stops. Because the strip runs the full 740px and loops seamlessly, the cell reads as genuinely live rather than as a looping animation that has been caught mid-cycle.',
  pros: ['Truly endless motion — no visible reset anywhere in the loop', 'The fixed device against a moving world is the cleanest possible framing', 'Carrier names are concrete proof rather than a count', 'Degrades gracefully: at any crop it still reads correctly'],
  cons: ['Least numeric option — no figure for a procurement reader', 'Scrolling text is the one motion that can feel like a ticker cliché'],
  scores: { story: 4, motion: 5, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const rows = [['JP', 'NTT Docomo'], ['DE', 'Telekom'], ['BR', 'Vivo'], ['KE', 'Safaricom'],
      ['SG', 'Singtel'], ['MX', 'Telcel'], ['AU', 'Telstra'], ['ZA', 'Vodacom'], ['IN', 'Airtel'], ['US', 'AT&T']];
    const one = (off) => rows.map(([c, n], i) => `
      <g transform="translate(${off + i * 148} 0)">
        ${mono(0, 0, c, { size: 12, op: 0.7, fill: P.deep })}
        <text x="26" y="0" font-size="12" fill="${INK}" opacity="0.5">${n}</text>
      </g>`).join('');
    const inner = `
      ${dotsW(uid)}
      ${bloomC(370, 118, 210, uid)}
      ${mono(28, 26, 'THE SAME PART, WHEREVER IT LANDS', { size: 9, op: 0.34 })}
      <svg x="0" y="52" width="740" height="46" viewBox="0 0 740 46" overflow="hidden">
        <g transform="translate(0 28)">
          <g>${one(0)}${one(1480)}
            <animateTransform attributeName="transform" type="translate" values="0 0;-1480 0" dur="20s" repeatCount="indefinite"/>
          </g>
        </g>
      </svg>
      <svg x="0" y="150" width="740" height="46" viewBox="0 0 740 46" overflow="hidden">
        <g transform="translate(0 28)">
          <g>${one(-700)}${one(780)}
            <animateTransform attributeName="transform" type="translate" values="0 0;1480 0" dur="26s" repeatCount="indefinite"/>
          </g>
        </g>
      </svg>
      <defs><radialGradient id="sf-${uid}" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${WHITE}" stop-opacity="1"/>
        <stop offset="0.62" stop-color="${WHITE}" stop-opacity="1"/>
        <stop offset="1" stop-color="${WHITE}" stop-opacity="0"/>
      </radialGradient></defs>
      <ellipse cx="370" cy="122" rx="122" ry="96" fill="url(#sf-${uid})"/>
      <g transform="translate(370 122)">
        <rect x="-44" y="-46" width="88" height="92" rx="12" fill="${WHITE}" stroke="${INK}" stroke-width="2.5"/>
        <rect x="-24" y="-28" width="48" height="34" rx="6" fill="${P.main}" stroke="${INK}" stroke-width="2"/>
        <text y="-6" font-size="10.5" font-weight="700" text-anchor="middle" fill="${WHITE}" style="font-family:${MONO}">eSIM</text>
        ${[0, 1, 2, 3].map(i => `<rect x="${-46 - 6}" y="${-24 + i * 16}" width="6" height="7" rx="1.5" fill="${INK}"/>`).join('')}
        ${[0, 1, 2, 3].map(i => `<rect x="${46}" y="${-24 + i * 16}" width="6" height="7" rx="1.5" fill="${INK}"/>`).join('')}
        ${mono(0, 30, 'ONE SKU', { size: 9, anchor: 'middle', op: 0.5 })}
      </g>
      ${mono(28, 216, 'NO REGIONAL INVENTORY · NO PRE-INSTALLED CARD', { size: 9, op: 0.34 })}`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c1Shelf = {
  id: 'c1-shelf',
  name: 'The Shelf, Collapsed',
  family: 'Before / after',
  tagline: 'Five trays of plastic, gone',
  desc: 'The left two thirds of the cell hold a shelf of five labelled SIM trays with their stock counts. On cue they lift, slide right and fold into one eSIM chip on the far right, leaving the shelf visibly empty with its outlines still drawn. The abandoned outlines are the point: the reader sees the space that used to be occupied. It is the most direct before-and-after available in a cell this wide.',
  pros: ['Before and after in a single frame, which the width makes possible', 'The empty outlines left behind make the saving visible', 'One clear beat — nothing to read to understand it', 'Works as a still image as well as an animation'],
  cons: ['One beat means a short loop that repeats visibly', 'Leaves no room for a figure or a counter'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const trays = [['SIM-EU-01', 1840], ['SIM-NA-02', 1320], ['SIM-AP-03', 2100], ['SIM-LA-04', 980], ['SIM-ME-05', 1240]];
    const inner = `
      ${dotsW(uid)}
      ${bloomC(620, 120, 170, uid)}
      ${mono(28, 28, 'BEFORE', { size: 9, op: 0.34 })}
      ${mono(712, 28, 'AFTER', { size: 9, op: 0.34, anchor: 'end' })}
      ${trays.map(([n, q], i) => `
        <g transform="translate(28 ${46 + i * 33})">
          <rect width="200" height="27" rx="5" fill="none" stroke="${LINE}" stroke-width="1.6" stroke-dasharray="4 4"/>
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;0 0;420 ${28 - i * 33};420 ${28 - i * 33}"
              keyTimes="0;${(0.12 + i * 0.05).toFixed(2)};${(0.34 + i * 0.05).toFixed(2)};1" dur="7s" repeatCount="indefinite"/>
            <g>
              <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;${(0.3 + i * 0.05).toFixed(2)};${(0.36 + i * 0.05).toFixed(2)};1"
                dur="7s" repeatCount="indefinite"/>
              <rect width="200" height="27" rx="5" fill="${WHITE}" stroke="${INK}" stroke-width="2"/>
              <rect x="8" y="7" width="20" height="14" rx="3" fill="${P.soft}" stroke="${INK}" stroke-width="1.4"/>
              ${mono(36, 18, n, { size: 8.5, op: 0.6 })}
              <text x="190" y="18" font-size="9.5" font-weight="700" text-anchor="end" fill="${P.deep}" style="font-family:${MONO}">${q}</text>
            </g>
          </g>
        </g>`).join('')}
      <g transform="translate(556 74)">
        <g opacity="0.25"><animate attributeName="opacity" values="0.25;1" dur="0.5s" begin="2.6s" fill="freeze"/>
          <rect width="120" height="88" rx="12" fill="${P.main}" stroke="${INK}" stroke-width="2.5"/>
          <rect x="34" y="26" width="52" height="36" rx="6" fill="${P.deep}" stroke="${WHITE}" stroke-width="2"/>
          <text x="60" y="50" font-size="11" font-weight="700" text-anchor="middle" fill="${WHITE}" style="font-family:${MONO}">eSIM</text>
        </g>
        ${mono(60, 106, 'ONE SKU · 190+ COUNTRIES', { size: 8.5, anchor: 'middle', op: 0.45 })}
      </g>
      ${mono(28, 220, 'FIVE PART NUMBERS AND 7,480 UNITS OF PLASTIC, RETIRED', { size: 9, op: 0.34 })}`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const C1_VARIANTS = [c1Current, c1Inventory, c1Conveyor, c1Strip, c1Ticks, c1Customs, c1Shelf];

/* ═════════════════════════════════════════════════════════════════════
   CELL 2 · SMALL 360 × 234 — soldered eSIM / smaller form factor
   ═════════════════════════════════════════════════════════════════════ */

const board360 = (o = {}) => `
  <rect x="${o.x ?? 44}" y="${o.y ?? 52}" width="${o.w ?? 272}" height="${o.h ?? 130}" rx="10"
    fill="${o.fill || '#F7F5FC'}" stroke="${INK}" stroke-width="2.5"/>`;

export const c2Current = {
  id: 'c2-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'A chip and four empty pads',
  desc: 'A purple eSIM chip sits in the middle of the cell with four rounded outlines around it joined by thin grey traces, one of which carries a small moving dot. It is the most on-brief of the three live cells — it is at least drawing an eSIM on a board — but the four outlines are unlabelled, nothing is soldered, no dimension is given, and the cell sits in the row with "Smaller Form Factor" and "Lower Total Cost" without demonstrating either.',
  pros: ['On-subject: it is recognisably an eSIM on a circuit board', 'Simple enough to read at 360px wide', 'Palette and line weight match the rest of the section'],
  cons: ['Four unlabelled outlines that could be anything', 'No dimension, no footprint, no figure — so "smaller" is never shown', 'One drifting dot is the entire animation', 'Nothing indicates the chip is soldered, which is the security claim'],
  scores: { story: 2, motion: 2, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const inner = `
      ${dotsW(uid, 360, 234)}
      ${bloomC(180, 117, 130, uid)}
      <path d="M 96 90 H 180 V 152 M 180 117 H 258 M 96 168 H 180" fill="none" stroke="${LINE}" stroke-width="2"/>
      ${[[78, 90], [258, 90], [258, 117], [78, 168]].map(([x, y]) =>
      `<rect x="${x - 18}" y="${y - 11}" width="36" height="22" rx="6" fill="${WHITE}" stroke="${INK}" stroke-width="2.5"/>`).join('')}
      <g transform="translate(180 117)">
        <rect x="-32" y="-22" width="64" height="44" rx="8" fill="${P.main}" stroke="${INK}" stroke-width="3"/>
        <text y="5" font-size="11" font-weight="700" text-anchor="middle" fill="${WHITE}" style="font-family:${MONO}">eSIM</text>
        ${[-1, 0, 1].map(i => `<rect x="-38" y="${i * 13 - 4}" width="6" height="8" rx="1.5" fill="${INK}"/>`).join('')}
        ${[-1, 0, 1].map(i => `<rect x="32" y="${i * 13 - 4}" width="6" height="8" rx="1.5" fill="${INK}"/>`).join('')}
      </g>
      <circle r="4" fill="${P.main}"><animateMotion dur="2.4s" repeatCount="indefinite" path="M 214 117 H 240"/></circle>`;
    return { svg: wrapS(inner), pills: noPills };
  },
};

export const c2Tray = {
  id: 'c2-tray',
  name: 'The Tray Ejects',
  family: 'Literal',
  tagline: 'Thirty square millimetres, returned',
  desc: 'A SIM tray slides out of the board and off the edge of the cell. The slot it leaves collapses, an eSIM drops into its place and solders down, and a single figure resolves beneath: 30 mm² to 6 mm². It is the most literal reading of "no SIM card slot needed" and it produces the one number the two cards in that row are both about.',
  pros: ['One beat, one number — perfect for the smallest cell in the grid', 'The ejecting tray is unmistakable at any size', 'Serves both neighbouring cards at once: smaller and cheaper', 'Footprint in mm² is the figure a hardware engineer looks for'],
  cons: ['Very short loop, so the repeat is noticeable', 'Only covers form factor, not provisioning or security'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const inner = `
      ${dotsW(uid, 360, 234)}
      ${bloomC(180, 110, 140, uid)}
      ${mono(24, 28, 'SIM SLOT, REMOVED', { size: 9, op: 0.34 })}
      ${board360({ y: 46, h: 118 })}
      <!-- the slot that collapses -->
      <rect x="112" y="76" width="112" height="58" rx="6" fill="#E9E6F2" stroke="${INK}" stroke-width="2">
        <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.4;0.5;1" dur="5.5s" repeatCount="indefinite"/>
      </rect>
      <!-- the tray, sliding out -->
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 0;230 0;230 0"
          keyTimes="0;0.12;0.42;1" dur="5.5s" repeatCount="indefinite"/>
        <g opacity="1"><animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.4;0.46;1" dur="5.5s" repeatCount="indefinite"/>
          <rect x="116" y="80" width="104" height="50" rx="5" fill="${WHITE}" stroke="${INK}" stroke-width="2.5"/>
          <rect x="128" y="90" width="66" height="30" rx="4" fill="#FCD34D" stroke="${INK}" stroke-width="2"/>
          <path d="M 194 90 l -12 0 l 0 10" fill="none" stroke="${INK}" stroke-width="1.8"/>
        </g>
      </g>
      <!-- the eSIM that lands -->
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.5;0.58;1" dur="5.5s" repeatCount="indefinite"/>
        <g transform="translate(168 105)">
          <rect x="-26" y="-17" width="52" height="34" rx="6" fill="${P.main}" stroke="${INK}" stroke-width="2.5"/>
          <text y="4" font-size="9.5" font-weight="700" text-anchor="middle" fill="${WHITE}" style="font-family:${MONO}">eSIM</text>
          ${[-1, 0, 1].map(i => `<rect x="-31" y="${i * 11 - 3}" width="5" height="6" rx="1.2" fill="${INK}"/>`).join('')}
          ${[-1, 0, 1].map(i => `<rect x="26" y="${i * 11 - 3}" width="5" height="6" rx="1.2" fill="${INK}"/>`).join('')}
          <circle r="0" fill="none" stroke="${P.main}" stroke-width="2">
            <animate attributeName="r" values="4;42" dur="0.8s" begin="3.2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.7;0" dur="0.8s" begin="3.2s" repeatCount="indefinite"/>
          </circle>
        </g>
      </g>
      <g transform="translate(24 192)">
        ${card(0, 0, 150, 34, { r: 9, fill: WHITE, stroke: INK, sw: 2 })}
        ${mono(12, 14, 'FOOTPRINT', { size: 7.5, op: 0.45 })}
        <text x="12" y="28" font-size="12" font-weight="700" fill="${INK}" opacity="0.4" style="font-family:${MONO}">30 mm²</text>
        <text x="74" y="28" font-size="12" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">→ 6 mm²</text>
        ${card(162, 0, 174, 34, { r: 9, fill: GREEN_SOFT, stroke: GREEN, sw: 2 })}
        ${mono(174, 14, 'MOVING PARTS', { size: 7.5, op: 0.6, fill: GREEN_TEXT })}
        <text x="174" y="28" font-size="12" font-weight="700" fill="${GREEN_TEXT}" style="font-family:${MONO}">1 → 0</text>
      </g>`;
    return { svg: wrapS(inner), pills: noPills };
  },
};

export const c2Space = {
  id: 'c2-space',
  name: 'Space Reclaimed',
  family: 'Benefit',
  tagline: 'What fits where the slot was',
  desc: 'The slot vanishes and the freed area does not stay empty — a larger battery expands into it and a label names the gain: +18% cell capacity. The cell beside it promises precious PCB space for more sensors, bigger batteries or slimmer designs; this is the only option that shows the space being spent rather than merely saved.',
  pros: ['Shows the payoff, not just the removal — the harder half of the argument', 'Directly quotes the neighbouring card\'s own three examples', 'A battery growing is a single, obvious, satisfying motion', 'Gives the row a percentage it currently lacks'],
  cons: ['+18% is a claim that needs a real basis before it ships', 'Battery is only one of three named uses for the space'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const inner = `
      ${dotsW(uid, 360, 234)}
      ${bloomC(180, 110, 140, uid)}
      ${mono(24, 28, 'WHAT THE SLOT WAS USING', { size: 9, op: 0.34 })}
      ${board360({ y: 46, h: 122 })}
      <!-- battery -->
      <rect x="58" y="60" width="86" height="94" rx="7" fill="${P.soft}" stroke="${INK}" stroke-width="2.5">
        <animate attributeName="width" values="86;150;150;86" keyTimes="0;0.34;0.86;1" dur="6s" repeatCount="indefinite"/>
      </rect>
      ${mono(70, 112, 'CELL', { size: 9, op: 0.5 })}
      <!-- the vacated slot -->
      <g>
        <animate attributeName="opacity" values="1;0;0;1" keyTimes="0;0.3;0.86;1" dur="6s" repeatCount="indefinite"/>
        <rect x="156" y="60" width="96" height="50" rx="5" fill="#E9E6F2" stroke="${INK}" stroke-width="2" stroke-dasharray="5 4"/>
        ${mono(204, 90, 'SIM SLOT', { size: 8, anchor: 'middle', op: 0.45 })}
      </g>
      <!-- the eSIM, tucked into the corner -->
      <g transform="translate(276 134)">
        <rect x="-22" y="-14" width="44" height="28" rx="5" fill="${P.main}" stroke="${INK}" stroke-width="2.5"/>
        <text y="4" font-size="8.5" font-weight="700" text-anchor="middle" fill="${WHITE}" style="font-family:${MONO}">eSIM</text>
      </g>
      <g transform="translate(160 76)" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.36;0.44;0.84;0.9" dur="6s" repeatCount="indefinite"/>
        ${card(0, 0, 90, 30, { r: 8, fill: INK, stroke: INK })}
        <text x="45" y="20" font-size="11.5" font-weight="700" text-anchor="middle" fill="${P.main}" style="font-family:${MONO}">+18%</text>
      </g>
      <g transform="translate(24 192)">
        ${card(0, 0, 312, 34, { r: 9, fill: P.wash, stroke: P.soft, sw: 2 })}
        <text x="14" y="22" font-size="11.5" fill="${INK}" opacity="0.7">or another sensor, or a thinner enclosure</text>
      </g>`;
    return { svg: wrapS(inner), pills: noPills };
  },
};

export const c2Solder = {
  id: 'c2-solder',
  name: 'Solder Down',
  family: 'Security',
  tagline: 'Fixed, and not removable',
  desc: 'The chip descends onto its pads, each joint flashes as it takes, and a seal closes over it — then a hand tries to lift it and cannot. Two lines resolve: nothing to remove, nothing to clone. This is the option for the "Tamper-Proof Security" card in the row above, which currently has no visual support anywhere in the section.',
  pros: ['Covers the security claim, which no other option in the grid does', 'Solder joints taking is a precise, technical, credible detail', 'The failed removal attempt is a memorable half-second', 'Reads at 360px with no text required'],
  cons: ['A hand icon is a new drawing idiom for this page', 'Serves the security card rather than the two beside it'],
  scores: { story: 4, motion: 5, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const inner = `
      ${dotsW(uid, 360, 234)}
      ${bloomC(180, 106, 140, uid)}
      ${mono(24, 28, 'SOLDERED, NOT SEATED', { size: 9, op: 0.34 })}
      ${board360({ y: 66, h: 92 })}
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${132 + (i % 3) * 32}" y="${i < 3 ? 86 : 132}" width="20" height="8" rx="2" fill="#B9A9D8"/>`).join('')}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 -54;0 -54;0 0;0 0"
          keyTimes="0;0.1;0.32;1" dur="6.5s" repeatCount="indefinite"/>
        <g transform="translate(180 112)">
          <rect x="-34" y="-20" width="68" height="40" rx="7" fill="${P.main}" stroke="${INK}" stroke-width="2.5"/>
          <text y="5" font-size="10" font-weight="700" text-anchor="middle" fill="${WHITE}" style="font-family:${MONO}">eSIM</text>
        </g>
      </g>
      ${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${142 + (i % 3) * 32}" cy="${i < 3 ? 90 : 136}" r="0" fill="${AMBER}">
        <animate attributeName="r" values="0;7;0" dur="0.5s" begin="${2.2 + i * 0.13}s" repeatCount="indefinite"/></circle>`).join('')}
      <!-- the failed lift -->
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.56;0.62;0.86;0.92" dur="6.5s" repeatCount="indefinite"/>
        <g transform="translate(242 74)">
          <path d="M 0 22 v -16 a 4 4 0 0 1 8 0 v -6 a 4 4 0 0 1 8 0 v 4 a 4 4 0 0 1 8 0 v 18 a 12 12 0 0 1 -12 12 h -6 a 8 8 0 0 1 -8 -8 z"
            fill="${WHITE}" stroke="${INK}" stroke-width="2.2"/>
          <animateTransform attributeName="transform" type="translate" values="242 74;242 66;242 74" dur="0.7s" repeatCount="indefinite"/>
        </g>
        <g transform="translate(248 46)">
          <path d="M -7 -7 l 14 14 M 7 -7 l -14 14" stroke="${RED}" stroke-width="2.8" stroke-linecap="round"/>
        </g>
      </g>
      <g transform="translate(24 188)">
        ${tick(4, 8, 'Nothing to remove')}
        ${tick(4, 30, 'Nothing to clone or swap')}
      </g>`;
    return { svg: wrapS(inner), pills: noPills };
  },
};

export const c2Section = {
  id: 'c2-section',
  name: 'Cross-Section',
  family: 'Technical',
  tagline: 'The stack, in millimetres',
  desc: 'Two side profiles stacked in the cell: with a SIM tray, the device measures 2.6 mm; without, 1.1 mm. The second profile slims down to meet its dimension line as you watch. It is the driest option here and the most useful to the only reader who matters for this card — a hardware engineer deciding whether the part fits.',
  pros: ['Gives the exact figure the adjacent card implies but never states', 'A dimension line is unambiguous and impossible to misread', 'Extremely cheap to draw and holds up at any size', 'Signals technical seriousness to a specialist audience'],
  cons: ['Dry — nothing charming or memorable about it', 'Figures must be defensible, and vary by enclosure', 'Least motion of the six options in this cell'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 4, brand: 3, ease: 5 },
  build: (uid) => {
    const inner = `
      ${dotsW(uid, 360, 234)}
      ${bloomC(180, 116, 130, uid)}
      ${mono(24, 26, 'DEVICE STACK, IN SECTION', { size: 9, op: 0.34 })}
      <!-- with tray -->
      <g transform="translate(40 58)">
        ${mono(0, -4, 'WITH SIM TRAY', { size: 8, op: 0.4 })}
        <rect y="6" width="212" height="34" rx="4" fill="#EDEAF4" stroke="${INK}" stroke-width="2.2"/>
        <rect x="14" y="14" width="66" height="18" rx="3" fill="#FCD34D" stroke="${INK}" stroke-width="1.8"/>
        <rect x="96" y="16" width="44" height="14" rx="3" fill="${P.soft}" stroke="${INK}" stroke-width="1.6"/>
        <path d="M 226 6 V 40 M 222 6 H 230 M 222 40 H 230" stroke="${INK}" stroke-width="1.8"/>
        <text x="238" y="28" font-size="11.5" font-weight="700" fill="${INK}" opacity="0.5" style="font-family:${MONO}">2.6 mm</text>
      </g>
      <!-- without -->
      <g transform="translate(40 130)">
        ${mono(0, -4, 'eSIM, SOLDERED', { size: 8, op: 0.4 })}
        <rect y="6" width="212" height="34" rx="4" fill="${P.wash}" stroke="${INK}" stroke-width="2.2">
          <animate attributeName="height" values="34;15" dur="1s" begin="1.2s" fill="freeze" repeatCount="indefinite" begin="1.2s;s.end+2s"/>
        </rect>
        <rect x="14" y="14" width="40" height="14" rx="3" fill="${P.main}" stroke="${INK}" stroke-width="1.8">
          <animate id="s" attributeName="y" values="14;9" dur="1s" begin="1.2s" fill="freeze" repeatCount="indefinite"/>
          <animate attributeName="height" values="14;8" dur="1s" begin="1.2s" fill="freeze" repeatCount="indefinite"/>
        </rect>
        <path d="M 226 6 V 40 M 222 6 H 230 M 222 40 H 230" stroke="${P.deep}" stroke-width="1.8">
          <animate attributeName="d" values="M 226 6 V 40 M 222 6 H 230 M 222 40 H 230;M 226 6 V 21 M 222 6 H 230 M 222 21 H 230"
            dur="1s" begin="1.2s" fill="freeze" repeatCount="indefinite"/></path>
        <text x="238" y="22" font-size="11.5" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">1.1 mm</text>
      </g>
      <g transform="translate(40 196)">
        ${mono(0, 0, '58% THINNER STACK · MFF2 · 5 × 6 × 1 MM', { size: 8.5, op: 0.4 })}
      </g>`;
    return { svg: wrapS(inner), pills: noPills };
  },
};

export const c2Pins = {
  id: 'c2-pins',
  name: 'Six Contacts',
  family: 'Minimal',
  tagline: 'The part, named and specified',
  desc: 'A single MFF2 package drawn accurately, its six contacts lighting in sequence as the profile is written, with the part designation and dimensions set in mono beneath it. No metaphor, no before and after — just the component, presented the way a datasheet would present it. In the smallest cell of the grid, being the only calm thing on the page is a real option.',
  pros: ['Calmest option — a welcome pause in a busy bento grid', 'Names the actual package, which builds technical credibility', 'Almost nothing to break at any size or crop', 'Reuses the chip idiom already established elsewhere on the page'],
  cons: ['Makes no argument — it labels rather than persuades', 'Closest of the six to the static cell it replaces'],
  scores: { story: 3, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const inner = `
      ${dotsW(uid, 360, 234)}
      ${bloomC(180, 108, 140, uid)}
      ${mono(24, 28, 'MFF2 · SOLDERED eSIM', { size: 9, op: 0.34 })}
      <g transform="translate(180 108)">
        <rect x="-62" y="-42" width="124" height="84" rx="10" fill="${P.main}" stroke="${INK}" stroke-width="3"/>
        <rect x="-44" y="-26" width="88" height="52" rx="6" fill="${P.deep}" opacity="0.55"/>
        ${[0, 1, 2, 3].map(r => [0, 1, 2, 3, 4].map(c =>
      `<rect x="${-36 + c * 18}" y="${-20 + r * 13}" width="11" height="8" rx="1.5" fill="${WHITE}" opacity="0.5"/>`).join('')).join('')}
        ${[-2, -1, 0, 1, 2, 3].map((i, n) => `
          <rect x="-70" y="${i * 14 - 4}" width="8" height="9" rx="2" fill="#9CA3AF">
            <animate attributeName="fill" values="#9CA3AF;${P.main};#9CA3AF" dur="2.6s" begin="${n * 0.22}s" repeatCount="indefinite"/></rect>
          <rect x="62" y="${i * 14 - 4}" width="8" height="9" rx="2" fill="#9CA3AF">
            <animate attributeName="fill" values="#9CA3AF;${P.main};#9CA3AF" dur="2.6s" begin="${1.3 + n * 0.22}s" repeatCount="indefinite"/></rect>`).join('')}
      </g>
      <g transform="translate(24 186)">
        ${mono(0, 0, '5.0 × 6.0 × 0.9 MM', { size: 9, op: 0.45 })}
        ${mono(0, 18, 'REFLOW SOLDERED · NO SOCKET · NO TRAY', { size: 8.5, op: 0.34 })}
        ${mono(336, 0, 'GSMA SGP.02', { size: 9, op: 0.45, anchor: 'end' })}
      </g>`;
    return { svg: wrapS(inner), pills: noPills };
  },
};

export const c2Shake = {
  id: 'c2-shake',
  name: 'The Shake Test',
  family: 'Field reality',
  tagline: 'One rattles loose. One does not.',
  desc: 'Two boards side by side are vibrated. On the left the removable SIM works its way out of its tray and the connection drops to an error; on the right the soldered eSIM does not move and stays online. A vehicle or industrial-meter buyer has lived exactly this failure, and no figure argues it as well as watching it happen.',
  pros: ['Dramatises a real, expensive, well-known field failure', 'Left-fails / right-holds is the clearest comparison structure there is', 'Emotionally the strongest option in this cell', 'Speaks to automotive and industrial buyers specifically'],
  cons: ['Two boards in 360px is the tightest composition in the set', 'A failure state on our own page needs careful framing', 'Vibration is hard to read as motion at small sizes'],
  scores: { story: 5, motion: 4, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const inner = `
      ${dotsW(uid, 360, 234)}
      ${bloomC(180, 110, 140, uid)}
      ${mono(24, 28, 'VIBRATION, 20 G', { size: 9, op: 0.34 })}
      <!-- removable -->
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;1.6 -1.2;-1.4 1.4;0 0" dur="0.18s" repeatCount="indefinite"/>
        <g transform="translate(22 52)">
          <rect width="148" height="96" rx="9" fill="#F3F1F8" stroke="${INK}" stroke-width="2.5"/>
          <rect x="18" y="30" width="96" height="40" rx="5" fill="#E9E6F2" stroke="${INK}" stroke-width="2"/>
          <rect x="24" y="36" width="70" height="28" rx="4" fill="#FCD34D" stroke="${INK}" stroke-width="2">
            <animate attributeName="x" values="24;24;62;62" keyTimes="0;0.3;0.62;1" dur="5s" repeatCount="indefinite"/>
          </rect>
          ${mono(74, 112, 'REMOVABLE SIM', { size: 8, anchor: 'middle', op: 0.4 })}
        </g>
      </g>
      <g transform="translate(96 178)" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.6;0.66;0.94;1" dur="5s" repeatCount="indefinite"/>
        ${card(-74, 0, 148, 28, { r: 7, fill: '#FEF2F2', stroke: RED, sw: 2 })}
        ${mono(0, 19, 'CONNECTION LOST', { size: 8.5, anchor: 'middle', op: 1, fill: RED })}
      </g>
      <!-- soldered -->
      <g transform="translate(190 52)">
        <rect width="148" height="96" rx="9" fill="${P.wash}" stroke="${INK}" stroke-width="2.5"/>
        <rect x="46" y="34" width="56" height="34" rx="6" fill="${P.main}" stroke="${INK}" stroke-width="2.5"/>
        <text x="74" y="56" font-size="9.5" font-weight="700" text-anchor="middle" fill="${WHITE}" style="font-family:${MONO}">eSIM</text>
        ${[0, 1, 2].map(i => `<rect x="${52 + i * 18}" y="70" width="14" height="6" rx="1.5" fill="#B9A9D8"/>`).join('')}
        ${mono(74, 112, 'SOLDERED eSIM', { size: 8, anchor: 'middle', op: 0.4 })}
      </g>
      <g transform="translate(264 178)">
        ${card(-74, 0, 148, 28, { r: 7, fill: GREEN_SOFT, stroke: GREEN, sw: 2 })}
        <circle cx="-56" cy="14" r="4" fill="${GREEN}"><animate attributeName="opacity" values="1;0.3;1" dur="1.3s" repeatCount="indefinite"/></circle>
        ${mono(6, 19, 'STILL ONLINE', { size: 8.5, anchor: 'middle', op: 1, fill: GREEN_TEXT })}
      </g>
      ${mono(24, 226, 'THE FAILURE MODE A FIELD DEVICE ACTUALLY HAS', { size: 8.5, op: 0.32 })}`;
    return { svg: wrapS(inner), pills: noPills };
  },
};

export const C2_VARIANTS = [c2Current, c2Tray, c2Space, c2Solder, c2Section, c2Pins, c2Shake];

/* ═════════════════════════════════════════════════════════════════════
   CELL 3 · WIDE DARK 740 × 234 — instant activation at fleet scale
   ═════════════════════════════════════════════════════════════════════ */

export const c3Current = {
  id: 'c3-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'A dark globe with purple dots',
  desc: 'A near-black gradient panel holding a purple-ringed sphere, a scattering of dots inside it and two faint elliptical orbits. It is the most striking cell in the section and the only dark surface on the page, but the sphere is centred in a 3.2:1 cell so two thirds of the width is empty gradient, the dots are not placed on any geography, and nothing is activating — which is what the card beside it is about.',
  pros: ['The dark panel is genuinely arresting and anchors the grid', 'Purple on near-black is the best-looking thing on the page', 'Orbit rings give it a quiet, premium feel'],
  cons: ['A centred sphere leaves most of a very wide cell unused', 'Dots are decorative, not placed on any real geography', 'Nothing activates, so it does not serve "Instant Activation"', 'No number anywhere, in the cell that could most easily carry one'],
  scores: { story: 2, motion: 2, perf: 5, mobile: 3, brand: 5, ease: 5 },
  build: (uid) => {
    const dts = [[-38, -22], [12, -34], [44, -8], [-18, 14], [26, 26], [-52, 6], [0, -8], [58, 18], [-30, 36], [18, 44]];
    return {
      svg: wrapW(`
        ${darkBg(uid)}
        ${bloomC(370, 117, 150, uid, '#A78BFA', 0.4)}
        <g transform="translate(370 117)">
          <circle r="76" fill="#0A0713" stroke="${P.main}" stroke-width="3"/>
          <ellipse rx="110" ry="34" fill="none" stroke="#FFFFFF" stroke-width="1.4" opacity="0.18" transform="rotate(-18)"/>
          <ellipse rx="96" ry="28" fill="none" stroke="#FFFFFF" stroke-width="1.2" opacity="0.12" transform="rotate(14)"/>
          ${dts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#C4B5FD">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="${(2 + i * 0.3).toFixed(1)}s" repeatCount="indefinite"/></circle>`).join('')}
        </g>`),
      pills: noPills,
    };
  },
};

export const c3NightSide = {
  id: 'c3-night',
  name: 'Night Side',
  family: 'Scale',
  tagline: 'Devices waking up across a dark earth',
  desc: 'The dark panel becomes the night side of the earth, stretched across the full width of the cell. Devices power on in region after region and each one lights the instant it attaches, with a millisecond figure beside it and an odometer of devices online climbing at the right. It keeps everything that makes this cell the best-looking one on the page and finally gives it a subject.',
  pros: ['Uses the whole 740px instead of centring a sphere in it', 'Keeps the dark treatment that makes this cell work', 'Every light is an activation, so the motion is the message', 'The odometer gives the cell the figure it currently lacks'],
  cons: ['A stretched earth is a looser piece of geography than a globe', 'Loses the orbit rings, which some will miss'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const pins = [[92, 88, '41 ms'], [158, 132, '38 ms'], [232, 96, '52 ms'], [296, 150, '44 ms'],
      [372, 82, '36 ms'], [430, 128, '61 ms'], [498, 100, '47 ms'], [560, 156, '39 ms'], [624, 92, '55 ms']];
    const inner = `
      ${darkBg(uid)}
      ${bloomC(370, 130, 300, uid, '#7C3AED', 0.34)}
      ${wMono(24, 28, 'FLEET ACTIVATION · LIVE', { size: 9, op: 0.5 })}
      <!-- landmass suggestion across the full width -->
      <g fill="#A78BFA" opacity="0.1">
        <ellipse cx="108" cy="110" rx="62" ry="40"/><ellipse cx="142" cy="170" rx="34" ry="34"/>
        <ellipse cx="266" cy="96" rx="52" ry="30"/><ellipse cx="288" cy="152" rx="40" ry="40"/>
        <ellipse cx="452" cy="106" rx="82" ry="40"/><ellipse cx="500" cy="168" rx="38" ry="26"/>
        <ellipse cx="624" cy="118" rx="52" ry="34"/>
      </g>
      ${pins.map(([x, y, ms], i) => `
        <g transform="translate(${x} ${y})">
          <circle r="3" fill="#4C3A78"/>
          <g opacity="0">
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.03;1" dur="6s" begin="${(0.3 + i * 0.4).toFixed(2)}s" fill="freeze"/>
            <circle r="4" fill="${P.main}"/>
            <circle r="4" fill="none" stroke="#C4B5FD" stroke-width="1.6">
              <animate attributeName="r" values="4;22" dur="1.4s" begin="${(0.3 + i * 0.4).toFixed(2)}s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.8;0" dur="1.4s" begin="${(0.3 + i * 0.4).toFixed(2)}s" repeatCount="indefinite"/>
            </circle>
            ${wMono(10, 4, ms, { size: 8, op: 0.55, fill: '#DDD6FE' })}
          </g>
        </g>`).join('')}
      <g transform="translate(524 176)">
        <rect width="192" height="44" rx="10" fill="#FFFFFF" opacity="0.07"/>
        ${wMono(14, 18, 'DEVICES ONLINE', { size: 8, op: 0.5 })}
        <text x="14" y="36" font-size="16" font-weight="700" fill="${WHITE}" style="font-family:${MONO}">9,758</text>
        ${wMono(178, 36, '480 /s', { size: 9, op: 0.6, anchor: 'end', fill: '#C4B5FD' })}
      </g>
      ${wMono(24, 216, 'POWERED ON → ATTACHED → ONLINE · NO TOUCH, NO TRUCK', { size: 8.5, op: 0.38 })}`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c3Wave = {
  id: 'c3-wave',
  name: 'Zero-Touch Wave',
  family: 'Scale',
  tagline: 'Ten thousand devices, one sweep',
  desc: 'A dense field of device tiles fills the width of the dark cell. A wave of provisioning sweeps left to right and every tile it passes turns from grey to lit purple, with a counter running to ten thousand and a rate per second beside it. A handful go amber and then resolve on a retry, because a fleet that never fails is not a fleet anybody believes.',
  pros: ['Makes the word "scale" visible instead of asserting it', 'A dense grid is the ideal use of a very wide cell', 'The retries are the detail that makes the whole thing credible', 'A single sweeping wave is cheap to render and always legible'],
  cons: ['Close in structure to an option already proposed for this page', 'A grid of tiles is abstract — no recognisable device anywhere'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const cols = 34, rows = 6;
    const cells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const amber = (r * cols + c) % 61 === 7;
        const d = 0.25 + c * 0.055 + (r % 2) * 0.02;
        cells.push(`<rect x="${24 + c * 20}" y="${52 + r * 18}" width="13" height="12" rx="2.5" fill="#3A2D5C">
          <animate attributeName="fill" values="#3A2D5C;${amber ? AMBER : P.main}${amber ? `;${P.main}` : ''}"
            dur="${amber ? 1.2 : 0.4}s" begin="${d.toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
        </rect>`);
      }
    }
    const inner = `
      ${darkBg(uid)}
      ${bloomC(370, 120, 300, uid, '#7C3AED', 0.3)}
      ${wMono(24, 32, 'PROVISIONING SWEEP', { size: 9, op: 0.5 })}
      ${wMono(716, 32, 'AUTOMOTIVE · METERS · TRACKERS', { size: 8.5, op: 0.35, anchor: 'end' })}
      ${cells.join('')}
      <rect x="0" y="46" width="34" height="122" fill="#C4B5FD" opacity="0.16">
        <animate attributeName="x" values="-34;716" dur="2.2s" repeatCount="indefinite"/>
      </rect>
      <g transform="translate(24 176)">
        <rect width="150" height="42" rx="10" fill="#FFFFFF" opacity="0.07"/>
        ${wMono(13, 17, 'ACTIVATED', { size: 8, op: 0.5 })}
        <text x="13" y="34" font-size="15" font-weight="700" fill="${WHITE}" style="font-family:${MONO}">10,000</text>
        <rect x="162" width="120" height="42" rx="10" fill="#FFFFFF" opacity="0.07"/>
        ${wMono(175, 17, 'RATE', { size: 8, op: 0.5 })}
        <text x="175" y="34" font-size="15" font-weight="700" fill="#C4B5FD" style="font-family:${MONO}">480 /s</text>
        <rect x="294" width="110" height="42" rx="10" fill="#FFFFFF" opacity="0.07"/>
        ${wMono(307, 17, 'RETRIED', { size: 8, op: 0.5 })}
        <text x="307" y="34" font-size="15" font-weight="700" fill="${AMBER}" style="font-family:${MONO}">7</text>
      </g>
      ${wMono(716, 212, 'ONE API CALL PER BATCH · NO SITE VISITS', { size: 8.5, op: 0.38, anchor: 'end' })}`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c3Timeline = {
  id: 'c3-time',
  name: 'Time to First Byte',
  family: 'Proof',
  tagline: 'Powered on at zero, online at six seconds',
  desc: 'A timeline runs the width of the cell: powered on at 0.0 s, radio attached at 1.2 s, profile written at 3.4 s, online at 5.8 s. One device runs it, and then ten run it in parallel on the same axis to show the number holds at volume. "The moment they are powered on" is a time claim, and this is the only option that puts a clock on it.',
  pros: ['Puts a number on the claim the adjacent card makes', 'A timeline is the most natural possible use of a 3.2:1 cell', 'The parallel run answers the obvious "does it hold at scale" doubt', 'Cheap, precise and legible at every size'],
  cons: ['The four timings must be real measured figures', 'Less atmospheric than the globe or the night side', 'Two passes make for a longer loop'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const steps = [['0.0 s', 'powered on', 60], ['1.2 s', 'radio attached', 218], ['3.4 s', 'profile written', 400], ['5.8 s', 'online', 600]];
    const inner = `
      ${darkBg(uid)}
      ${bloomC(370, 120, 280, uid, '#7C3AED', 0.28)}
      ${wMono(24, 30, 'ZERO-TOUCH PROVISIONING · MEASURED', { size: 9, op: 0.5 })}
      <path d="M 40 112 H 700" stroke="#FFFFFF" stroke-width="2" opacity="0.14"/>
      <path d="M 40 112 H 40" stroke="${P.main}" stroke-width="3">
        <animate attributeName="d" values="M 40 112 H 40;M 40 112 H 700" dur="3s" fill="freeze"
          repeatCount="indefinite" begin="0s;tl.end+1.8s"/></path>
      ${steps.map(([t, l, x], i) => `
        <g transform="translate(${x} 0)" opacity="0.3">
          <animate attributeName="opacity" values="0.3;1" dur="0.3s" begin="${(0.1 + i * 0.75).toFixed(2)}s" fill="freeze"
            repeatCount="indefinite"/>
          <path d="M 0 100 V 124" stroke="#FFFFFF" stroke-width="1.6" opacity="0.3"/>
          <circle cy="112" r="5.5" fill="${i === 3 ? GREEN : P.main}" stroke="#0D0B14" stroke-width="2"/>
          <text y="84" font-size="14" font-weight="700" text-anchor="middle" fill="${WHITE}" style="font-family:${MONO}">${t}</text>
          ${wMono(0, 146, l.toUpperCase(), { size: 8.5, anchor: 'middle', op: 0.5 })}
        </g>`).join('')}
      <g id="tlw"><animate id="tl" attributeName="opacity" values="1;1" dur="3s" repeatCount="indefinite" begin="0s;tl.end+1.8s"/></g>
      <!-- the parallel run -->
      <g transform="translate(0 176)">
        ${wMono(24, 0, 'TEN THOUSAND, IN PARALLEL', { size: 8.5, op: 0.38 })}
        ${Array.from({ length: 10 }, (_, i) => `
          <rect x="${300 + i * 22}" y="-12" width="14" height="14" rx="3" fill="#3A2D5C">
            <animate attributeName="fill" values="#3A2D5C;${GREEN}" dur="0.3s" begin="${(3.4 + i * 0.07).toFixed(2)}s" fill="freeze"/>
          </rect>`).join('')}
        <text x="546" y="0" font-size="13" font-weight="700" fill="${GREEN}" opacity="0" style="font-family:${MONO}">same 5.8 s
          <animate attributeName="opacity" values="0;1" dur="0.4s" begin="4.2s" fill="freeze"/></text>
      </g>
      ${wMono(716, 212, 'NO TECHNICIAN · NO TRUCK · NO SIM TO INSERT', { size: 8.5, op: 0.38, anchor: 'end' })}`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c3Ledger = {
  id: 'c3-ledger',
  name: 'Globe and Ledger',
  family: 'Minimal change',
  tagline: 'Keep the sphere, fill the width',
  desc: 'The sphere that ships stays exactly as it is, but it moves to the left third of the cell and the empty two thirds fill with a live activation ledger: timestamp, region, device class, latency, one line arriving per beat. It is the smallest possible change to the most attractive cell on the page, and it converts wasted gradient into evidence.',
  pros: ['Lowest-risk option in this cell — the sphere is untouched', 'Turns two thirds of empty gradient into live content', 'A streaming log is inexhaustible motion with no visible loop', 'Keeps the orbit rings and the premium dark feel intact'],
  cons: ['Small mono type on a dark field is the weakest point for legibility', 'A log is dense, and this cell sits at the bottom of a long section'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 3, brand: 5, ease: 5 },
  build: (uid) => {
    const rows = [
      ['22:21:04', 'SG · APAC', 'tracker', '38 ms'], ['22:21:04', 'DE · EU', 'meter', '41 ms'],
      ['22:21:05', 'BR · LATAM', 'vehicle', '62 ms'], ['22:21:05', 'KE · AFR', 'meter', '55 ms'],
      ['22:21:06', 'JP · APAC', 'camera', '36 ms'], ['22:21:06', 'US · NA', 'tracker', '44 ms'],
    ];
    const dts = [[-38, -22], [12, -34], [44, -8], [-18, 14], [26, 26], [-52, 6], [0, -8], [58, 18]];
    const inner = `
      ${darkBg(uid)}
      ${bloomC(150, 117, 150, uid, '#A78BFA', 0.4)}
      <g transform="translate(150 117)">
        <circle r="70" fill="#0A0713" stroke="${P.main}" stroke-width="3"/>
        <ellipse rx="102" ry="30" fill="none" stroke="#FFFFFF" stroke-width="1.4" opacity="0.18" transform="rotate(-18)"/>
        <ellipse rx="88" ry="25" fill="none" stroke="#FFFFFF" stroke-width="1.2" opacity="0.12" transform="rotate(14)"/>
        ${dts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#C4B5FD">
          <animate attributeName="opacity" values="0.35;1;0.35" dur="${(1.8 + i * 0.3).toFixed(1)}s" repeatCount="indefinite"/></circle>`).join('')}
      </g>
      ${wMono(300, 32, 'ACTIVATIONS, AS THEY LAND', { size: 9, op: 0.5 })}
      <path d="M 300 44 H 716" stroke="#FFFFFF" stroke-width="1.2" opacity="0.12"/>
      <svg x="300" y="52" width="416" height="126" viewBox="0 0 416 126" overflow="hidden">
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -126" dur="6s" repeatCount="indefinite"/>
          ${[...rows, ...rows].map(([t, r, d, ms], i) => `
            <g transform="translate(0 ${16 + i * 21})">
              ${wMono(0, 0, t, { size: 8.5, op: 0.4 })}
              ${wMono(66, 0, r, { size: 8.5, op: 0.75, fill: '#DDD6FE' })}
              ${wMono(190, 0, d, { size: 8.5, op: 0.4 })}
              ${wMono(300, 0, ms, { size: 8.5, op: 0.7, fill: '#C4B5FD' })}
              <circle cx="330" cy="-3" r="3" fill="${GREEN}"/>
              ${wMono(342, 0, 'ONLINE', { size: 8, op: 0.55, fill: '#86EFAC' })}
            </g>`).join('')}
        </g>
      </svg>
      <g transform="translate(300 186)">
        ${wMono(0, 14, 'DEVICES ONLINE', { size: 8, op: 0.45 })}
        <text x="122" y="16" font-size="15" font-weight="700" fill="${WHITE}" style="font-family:${MONO}">9,758</text>
        ${wMono(416, 14, '480 /s · ZERO TOUCH', { size: 8.5, op: 0.45, anchor: 'end' })}
      </g>`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c3PowerOn = {
  id: 'c3-power',
  name: 'Power On, Online',
  family: 'Concrete',
  tagline: 'Three real devices, doing it',
  desc: 'Three recognisable devices sit across the cell — a utility meter, an asset tracker and a dash camera. Each powers on in turn, a ring pulses out from it, its carrier label resolves and a tick lands, all inside six seconds. It is the only option in this cell with actual devices in it, which matters on a page whose readers build hardware rather than fleets of abstractions.',
  pros: ['Shows real device classes, not dots or tiles', 'Three beats spread naturally across a wide cell', 'Names carriers, which makes the coverage claim concrete', 'Understandable with no text at all'],
  cons: ['Three device illustrations are the most artwork in this cell', 'Only three devices, so "scale" is implied rather than shown'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 4, brand: 5, ease: 3 },
  build: (uid) => {
    const devs = [
      [140, 'METER', 'Telekom · DE', 0.4],
      [370, 'TRACKER', 'Singtel · SG', 1.6],
      [600, 'DASH CAM', 'Vivo · BR', 2.8],
    ];
    const art = (kind) => kind === 'METER'
      ? `<rect x="-34" y="-34" width="68" height="68" rx="9" fill="#171223" stroke="${P.main}" stroke-width="2.5"/>
         <circle r="17" fill="none" stroke="#C4B5FD" stroke-width="2"/>
         <path d="M 0 0 L 10 -11" stroke="#C4B5FD" stroke-width="2.4" stroke-linecap="round"/>
         <rect x="-14" y="22" width="28" height="7" rx="2" fill="${P.main}" opacity="0.6"/>`
      : kind === 'TRACKER'
        ? `<rect x="-26" y="-34" width="52" height="68" rx="14" fill="#171223" stroke="${P.main}" stroke-width="2.5"/>
         <circle cy="-12" r="9" fill="none" stroke="#C4B5FD" stroke-width="2"/>
         <path d="M 0 -3 V 14" stroke="#C4B5FD" stroke-width="2.4" stroke-linecap="round"/>
         <rect x="-12" y="20" width="24" height="6" rx="2" fill="${P.main}" opacity="0.6"/>`
        : `<rect x="-38" y="-26" width="76" height="52" rx="10" fill="#171223" stroke="${P.main}" stroke-width="2.5"/>
         <circle cx="-10" r="13" fill="none" stroke="#C4B5FD" stroke-width="2"/>
         <circle cx="-10" r="5" fill="#C4B5FD" opacity="0.7"/>
         <rect x="14" y="-8" width="16" height="16" rx="3" fill="${P.main}" opacity="0.6"/>`;
    const inner = `
      ${darkBg(uid)}
      ${bloomC(370, 116, 300, uid, '#7C3AED', 0.3)}
      ${wMono(24, 30, 'POWERED ON, THEN ONLINE — NOBODY TOUCHED THEM', { size: 9, op: 0.5 })}
      ${devs.map(([x, kind, carrier, begin]) => `
        <g transform="translate(${x} 116)">
          <g opacity="0.32">
            <animate attributeName="opacity" values="0.32;1" dur="0.4s" begin="${begin}s" fill="freeze" repeatCount="indefinite"/>
            ${art(kind)}
          </g>
          <circle r="4" fill="none" stroke="#C4B5FD" stroke-width="2">
            <animate attributeName="r" values="30;74" dur="1.6s" begin="${begin + 0.3}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.7;0" dur="1.6s" begin="${begin + 0.3}s" repeatCount="indefinite"/>
          </circle>
          ${wMono(0, 58, kind, { size: 8.5, anchor: 'middle', op: 0.4 })}
          <g opacity="0">
            <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${begin + 0.9}s" fill="freeze" repeatCount="indefinite"/>
            <rect x="-56" y="70" width="112" height="26" rx="13" fill="#FFFFFF" opacity="0.08"/>
            <circle cx="-40" cy="83" r="3.6" fill="${GREEN}"/>
            ${wMono(6, 87, carrier, { size: 8, anchor: 'middle', op: 0.8, fill: '#DDD6FE' })}
          </g>
        </g>`).join('')}
      ${wMono(716, 30, 'ONLINE IN UNDER SIX SECONDS, EVERY TIME', { size: 8.5, op: 0.38, anchor: 'end' })}`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c3Odometer = {
  id: 'c3-odo',
  name: 'The Odometer',
  family: 'Minimal',
  tagline: 'One number, very large',
  desc: 'The dark cell carries one enormous mono figure — devices online — climbing continuously, with a thin sparkline of activations per second beneath it and a regional breakdown running quietly along the bottom. In a section of nine cells competing for attention, the widest one saying exactly one thing very loudly is a legitimate strategy.',
  pros: ['Impossible to misread, at any size, on any device', 'The cheapest option here to build and to maintain', 'A single loud number balances a section full of small text', 'Never finishes, so it always looks live'],
  cons: ['Makes no argument about eSIM specifically', 'The figure has to be real and live, or it is theatre', 'Least visually interesting use of the best cell on the page'],
  scores: { story: 3, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const spark = Array.from({ length: 46 }, (_, i) => {
      const v = Math.sin(i * 0.55) * 8 + Math.sin(i * 1.7) * 5 + Math.sin(i * 0.23) * 7 + 16;
      return `${420 + i * 6.4},${(188 - v).toFixed(1)}`;
    }).join(' ');
    const inner = `
      ${darkBg(uid)}
      ${bloomC(300, 116, 300, uid, '#7C3AED', 0.32)}
      ${wMono(24, 34, 'DEVICES ONLINE, RIGHT NOW', { size: 9, op: 0.5 })}
      <text x="24" y="130" font-size="78" font-weight="700" fill="${WHITE}" style="font-family:${MONO}">9,758
        <animate attributeName="opacity" values="1;0.92;1" dur="1.4s" repeatCount="indefinite"/></text>
      <g transform="translate(420 52)">
        ${wMono(0, 0, 'ACTIVATIONS / SECOND', { size: 8.5, op: 0.45 })}
        <text x="0" y="28" font-size="26" font-weight="700" fill="#C4B5FD" style="font-family:${MONO}">480</text>
        <polyline points="${spark}" fill="none" stroke="${P.main}" stroke-width="2" opacity="0.7"
          transform="translate(-420 -52)"/>
      </g>
      ${[['APAC', 3204], ['EU', 2618], ['NA', 1902], ['LATAM', 1210], ['AFR', 824]].map(([r, n], i) => `
        <g transform="translate(${24 + i * 140} 202)">
          ${wMono(0, 0, r, { size: 8.5, op: 0.4 })}
          <text x="52" y="1" font-size="11" font-weight="700" fill="#DDD6FE" opacity="0.85" style="font-family:${MONO}">${n}</text>
        </g>`).join('')}
      <path d="M 24 178 H 716" stroke="#FFFFFF" stroke-width="1.2" opacity="0.1"/>`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const C3_VARIANTS = [c3Current, c3NightSide, c3Wave, c3Ledger, c3Timeline, c3PowerOn, c3Odometer];
