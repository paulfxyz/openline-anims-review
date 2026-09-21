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
        <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.04;0.3;0.4;1" dur="3.4s"
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
          <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.04;0.82;0.9;1" dur="8s"
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
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.36;0.44;0.84;0.9;1" dur="6s" repeatCount="indefinite"/>
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
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.56;0.62;0.86;0.92;1" dur="6.5s" repeatCount="indefinite"/>
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

/* ══ CELL 1 · 7–9 ═══════════════════════════════════════════════════ */

export const c1OneSku = {
  id: 'c1-onesku',
  name: 'One SKU',
  family: 'Operations',
  tagline: 'Eleven part numbers collapsing into one',
  desc:
    'The hardware cost of regional SIMs is not the plastic, it is the catalogue. Eleven part numbers ' +
    'for eleven regions collapse into a single SKU, and the line count drops with them. This is the ' +
    'argument an operations director makes internally, and nothing else in this cell speaks to them.',
  pros: [
    'Speaks directly to the person who signs off on a BOM change',
    'Catalogue complexity is a real cost nobody markets against',
    'The collapse is a satisfying single movement',
  ],
  cons: ['Abstract if the reader has never managed inventory', 'Needs accurate regional SKU naming'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const skus = ['SIM-EU-01', 'SIM-EU-02', 'SIM-UK-01', 'SIM-US-01', 'SIM-CA-01', 'SIM-BR-01',
      'SIM-IN-01', 'SIM-CN-01', 'SIM-JP-01', 'SIM-AU-01', 'SIM-ZA-01'];
    const inner = `
    ${dotsW(uid)}
    ${bloomC(370, 117, 210, uid)}
    ${mono(32, 34, 'BILL OF MATERIALS', { size: 9, op: 0.45 })}
    ${skus.map((s, i) => {
      const col = i % 4, row = Math.floor(i / 4);
      const x = 32 + col * 86, y = 50 + row * 40;
      return `<g>
        <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;${(0.24 + i * 0.022).toFixed(3)};${(0.3 + i * 0.022).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(x, y, 78, 30, { r: 6, fill: WHITE, stroke: LINE })}
        ${mono(x + 39, y + 19, s, { size: 7.5, anchor: 'middle', op: 0.5 })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.56;0.64;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(32, 74, 260, 84, { r: 12, fill: P.wash, stroke: P.main, sw: 2 })}
      ${mono(56, 104, 'ONE PART NUMBER', { size: 9, op: 0.55, fill: P.main })}
      ${label(56, 136, 'ESIM-GLOBAL', { size: 22, fill: P.main })}
    </g>
    ${card(380, 50, 328, 152, { r: 12, fill: WHITE, stroke: LINE })}
    ${[['PART NUMBERS', '11', '1'], ['REGIONAL VARIANTS', '11', '0'], ['CUSTOMS CODES', '6', '1']].map(([k, a, b], i) => {
      const y = 82 + i * 42;
      return `<g>
        ${mono(404, y, k, { size: 8.5, op: 0.4 })}
        ${label(560, y + 4, a, { size: 17, anchor: 'end', op: 0.35 })}
        ${mono(586, y + 2, '\u2192', { size: 12, op: 0.3 })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.6 + i * 0.05).toFixed(3)};${(0.66 + i * 0.05).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          ${label(686, y + 4, b, { size: 19, anchor: 'end', fill: P.main })}
        </g>
      </g>`;
    }).join('')}
    ${mono(32, 214, 'THE CATALOGUE IS THE COST, NOT THE CARD', { size: 8.5, op: 0.35 })}`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c1Truck = {
  id: 'c1-truck',
  name: 'It Ships Once',
  family: 'Operations',
  tagline: 'One shipment, eleven destinations, no re-kitting',
  desc:
    'A single pallet leaves the factory and lands in six countries without a warehouse stop, because ' +
    'no unit needs a local SIM fitted on arrival. The re-kitting step — the one that costs weeks and ' +
    'a partner in every market — is crossed out. It is the logistics version of the argument, which ' +
    'is where the money actually is.',
  pros: [
    'Names the specific step that gets eliminated, rather than a vague saving',
    'Re-kitting is the real pain for any hardware manufacturer',
    'Reads as a supply-chain claim, which this audience trusts more than a feature',
  ],
  cons: ['Needs a defensible week figure', 'Logistics visuals are hard to keep elegant at this height'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const inner = `
    ${dotsW(uid)}
    ${bloomC(370, 117, 210, uid)}
    ${mono(32, 34, 'FACTORY TO FIELD', { size: 9, op: 0.45 })}
    <line x1="60" y1="118" x2="672" y2="118" stroke="${LINE}" stroke-width="2.5"/>
    <line x1="60" y1="118" x2="672" y2="118" stroke="${P.main}" stroke-width="3"
      stroke-dasharray="612" stroke-dashoffset="612">
      <animate attributeName="stroke-dashoffset" values="612;0;0" keyTimes="0;0.6;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </line>
    ${[['Factory', 'Shenzhen', 0], ['Re-kitting', 'removed', 0.34], ['Customs', 'one code', 0.62], ['Field', 'six countries', 1]].map(([nm, note, t], i) => {
      const x = 60 + t * 612;
      const dead = i === 1;
      return `<g>
        <circle cx="${x.toFixed(0)}" cy="118" r="7" fill="${WHITE}" stroke="${LINE}" stroke-width="2.5"/>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(t * 0.6).toFixed(4)};${(t * 0.6 + 0.05).toFixed(4)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <circle cx="${x.toFixed(0)}" cy="118" r="7" fill="${dead ? RED : P.main}"/>
          ${label(x.toFixed(0), i % 2 ? 158 : 92, nm, { size: 13, anchor: 'middle', op: dead ? 0.4 : 1 })}
          ${dead ? `<line x1="${x - 34}" y1="${i % 2 ? 153 : 87}" x2="${x + 34}" y2="${i % 2 ? 153 : 87}"
            stroke="${RED}" stroke-width="2" stroke-linecap="round"/>` : ''}
          ${mono(x.toFixed(0), i % 2 ? 176 : 74, note, { size: 8.5, anchor: 'middle', op: 0.42, fill: dead ? RED : INK })}
        </g>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.68;0.76;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(32, 190, 300, 34, { r: 9, fill: P.wash, stroke: P.main, sw: 1.6 })}
      ${label(48, 212, 'Six weeks and six partners removed', { size: 12, fill: P.main })}
    </g>
    ${mono(708, 214, 'ONE PALLET', { size: 8.5, anchor: 'end', op: 0.35 })}`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c1Coverage = {
  id: 'c1-coverage',
  name: 'On Arrival',
  family: 'Proof',
  tagline: 'Every unit online before it is unboxed',
  desc:
    'A batch of 240 devices reports in as it clears customs in each market, filling a grid cell by ' +
    'cell until every one is green with no field engineer involved. Deployment success is the metric ' +
    'an IoT buyer is judged on internally, and a grid that completes is the most direct way to ' +
    'promise it.',
  pros: [
    'Deployment success rate is the number this buyer reports upward',
    'A grid completing is inherently satisfying and scales to any batch size',
    'No text needed to read the outcome',
  ],
  cons: ['240 cells is busy at 234px tall', 'Claims a completion rate we must be able to defend'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 10, cols = 40, rows = 6;
    const inner = `
    ${dotsW(uid)}
    ${bloomC(370, 117, 210, uid)}
    ${mono(32, 34, 'BATCH 4471 \u00b7 240 UNITS \u00b7 SIX MARKETS', { size: 9, op: 0.45 })}
    ${Array.from({ length: cols * rows }, (_, i) => {
      const on = 0.06 + (i / (cols * rows)) * 0.58;
      return `<rect x="${32 + (i % cols) * 16}" y="${52 + Math.floor(i / cols) * 22}" width="12" height="16" rx="2.5"
        fill="${LINE}">
        <animate attributeName="fill" values="${LINE};${LINE};${P.main};${P.main}"
          keyTimes="0;${on.toFixed(4)};${Math.min(on + 0.01, 1).toFixed(4)};1" dur="${dur}s"
          repeatCount="indefinite" calcMode="discrete" fill="freeze"/>
      </rect>`;
    }).join('')}
    ${[['ONLINE', '240'], ['FIELD VISITS', '0'], ['MEDIAN TIME', '38 s']].map(([k, v], i) => `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.68 + i * 0.05).toFixed(3)};${(0.74 + i * 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${mono(32 + i * 150, 206, k, { size: 8.5, op: 0.4 })}
        ${label(32 + i * 150, 228, v, { size: 17, fill: P.main })}
      </g>`).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.7;0.78;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(708, 220, 'NOT ONE UNIT TOUCHED AFTER IT LEFT THE LINE', { size: 8.5, anchor: 'end', op: 0.4, fill: P.main })}
    </g>`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

/* ══ CELL 2 · 7–9 ═══════════════════════════════════════════════════ */

export const c2Grain = {
  id: 'c2-grain',
  name: 'Grain of Rice',
  family: 'Scale',
  tagline: 'The only comparison anybody remembers',
  desc:
    'A nano-SIM, a grain of rice and an eSIM chip at true relative scale, measured. The rice is there ' +
    'because a millimetre figure means nothing and a familiar object means everything. It is the ' +
    'smallest idea in this cell and probably the most quoted.',
  pros: [
    'An everyday reference beats a measurement every time',
    'Perfect fit for a 360px cell — one idea, no clutter',
    'Instantly memorable and quotable',
  ],
  cons: ['Playful register may not suit an enterprise page', 'A grain of rice is not a precise standard'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 9;
    const inner = `
    ${dotsW(uid, 360, 234)}
    ${bloomC(180, 117, 140, uid)}
    ${mono(24, 32, 'TRUE SCALE', { size: 9, op: 0.45 })}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.06;0.16;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(28, 58, 86, 68, { r: 7, fill: WHITE, stroke: LINE, sw: 1.6 })}
      <path d="M 100 58 l 0 14 l -14 0 z" fill="${LINE}"/>
      ${mono(71, 144, 'NANO-SIM', { size: 8, anchor: 'middle', op: 0.45 })}
      ${mono(71, 160, '12.3 \u00d7 8.8 mm', { size: 8, anchor: 'middle', op: 0.3 })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.3;0.4;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <ellipse cx="180" cy="98" rx="24" ry="9" fill="#EAE6F5" stroke="${LINE}" stroke-width="1.4"/>
      ${mono(180, 144, 'A GRAIN OF RICE', { size: 8, anchor: 'middle', op: 0.45 })}
      ${mono(180, 160, '6.5 \u00d7 2.2 mm', { size: 8, anchor: 'middle', op: 0.3 })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.52;0.62;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(288, 92, 34, 26, { r: 3, fill: P.main, stroke: P.deep, sw: 1.4 })}
      ${Array.from({ length: 4 }, (_, i) => `
        <line x1="288" y1="${98 + i * 6}" x2="280" y2="${98 + i * 6}" stroke="${P.main}" stroke-width="1.4"/>
        <line x1="322" y1="${98 + i * 6}" x2="330" y2="${98 + i * 6}" stroke="${P.main}" stroke-width="1.4"/>`).join('')}
      ${mono(305, 144, 'eSIM', { size: 8, anchor: 'middle', op: 0.6, fill: P.main })}
      ${mono(305, 160, '2.9 \u00d7 2.2 mm', { size: 8, anchor: 'middle', op: 0.4, fill: P.main })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.7;0.8;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(24, 184, 312, 36, { r: 9, fill: P.wash, stroke: P.main, sw: 1.6 })}
      ${label(180, 208, 'Smaller than the rice', { size: 13, anchor: 'middle', fill: P.main })}
    </g>`;
    return { svg: wrapS(inner), pills: noPills };
  },
};

export const c2Sealed = {
  id: 'c2-sealed',
  name: 'Sealed Shut',
  family: 'Durability',
  tagline: 'No slot, no tray, no water in',
  desc:
    'The tray is the hole. A cross-section shows water and dust entering through a SIM slot, then the ' +
    'same enclosure with the slot gone and the IP rating jumping from IP54 to IP68. For outdoor, ' +
    'industrial and automotive devices, sealing is a harder requirement than size, and this cell is ' +
    'the only place to say it.',
  pros: [
    'Ingress protection is a hard spec requirement, not a preference',
    'The removed hole is a single, obvious visual change',
    'Opens up outdoor and industrial buyers that a size argument misses',
  ],
  cons: ['IP ratings depend on the whole enclosure, not the SIM', 'Cross-sections are fiddly at this size'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const inner = `
    ${dotsW(uid, 360, 234)}
    ${bloomC(180, 117, 140, uid)}
    ${mono(24, 32, 'ENCLOSURE, IN SECTION', { size: 9, op: 0.45 })}
    ${card(30, 52, 132, 96, { r: 8, fill: WHITE, stroke: LINE, sw: 2 })}
    <rect x="86" y="48" width="26" height="9" fill="#F3F0FA" stroke="${RED}" stroke-width="1.6"/>
    ${Array.from({ length: 5 }, (_, i) => `
      <circle cx="${92 + i * 5}" cy="46" r="2.2" fill="${RED}" opacity="0.7">
        <animateTransform attributeName="transform" type="translate" values="0 0;0 44;0 44"
          keyTimes="0;${(0.16 + i * 0.05).toFixed(3)};1" dur="${dur}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0.7;0;0" keyTimes="0;${(0.14 + i * 0.05).toFixed(3)};${(0.2 + i * 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite"/>
      </circle>`).join('')}
    ${mono(96, 168, 'WITH A TRAY', { size: 8, anchor: 'middle', op: 0.45 })}
    ${mono(96, 184, 'IP54', { size: 11, anchor: 'middle', op: 0.75, fill: RED })}

    ${mono(180, 104, '\u2192', { size: 15, anchor: 'middle', op: 0.3 })}

    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.48;0.58;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(198, 52, 132, 96, { r: 8, fill: P.wash, stroke: P.main, sw: 2 })}
      ${card(240, 86, 48, 30, { r: 4, fill: P.main })}
      ${mono(264, 168, 'SEALED', { size: 8, anchor: 'middle', op: 0.5, fill: P.main })}
      ${mono(264, 184, 'IP68', { size: 11, anchor: 'middle', op: 0.9, fill: P.main })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.68;0.78;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(180, 216, 'THE TRAY WAS THE WEAKEST POINT', { size: 8.5, anchor: 'middle', op: 0.45, fill: P.main })}
    </g>`;
    return { svg: wrapS(inner), pills: noPills };
  },
};

export const c2Room = {
  id: 'c2-room',
  name: 'What Fits Instead',
  family: 'Scale',
  tagline: 'The space, spent on battery',
  desc:
    'Size only matters if something better goes in the space. The freed volume fills with battery ' +
    'cell, and the runtime figure beside it moves from eleven months to sixteen. That is the answer ' +
    'to "so what" — a smaller part is an engineering detail, five extra months in the field is a ' +
    'product decision.',
  pros: [
    'Converts a size claim into a runtime claim, which is what the buyer specifies on',
    'One clean fill animation, ideal for the small cell',
    'Answers the only real objection to a size argument',
  ],
  cons: ['The runtime figure depends entirely on the device', 'Might over-promise for a mains-powered product'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const inner = `
    ${dotsW(uid, 360, 234)}
    ${bloomC(180, 117, 140, uid)}
    ${mono(24, 32, 'THE SPACE, REALLOCATED', { size: 9, op: 0.45 })}
    ${card(30, 52, 150, 120, { r: 10, fill: WHITE, stroke: LINE, sw: 2 })}
    <rect x="46" y="68" width="118" height="42" rx="5" fill="#F1EDFA" stroke="${LINE}" stroke-width="1.4"
      stroke-dasharray="4 4"/>
    ${mono(105, 94, 'TRAY, REMOVED', { size: 7.5, anchor: 'middle', op: 0.4 })}
    <rect x="46" y="68" width="118" height="42" rx="5" fill="${P.main}" opacity="0">
      <animate attributeName="opacity" values="0;0;0.85;0.85" keyTimes="0;0.24;0.42;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </rect>
    <rect x="46" y="120" width="118" height="36" rx="5" fill="${P.main}" opacity="0.28"/>
    ${mono(105, 143, 'BATTERY', { size: 7.5, anchor: 'middle', op: 0.55, fill: P.main })}
    ${mono(105, 190, 'SAME ENCLOSURE', { size: 8, anchor: 'middle', op: 0.4 })}

    ${card(198, 52, 132, 120, { r: 10, fill: WHITE, stroke: LINE })}
    ${mono(216, 78, 'FIELD RUNTIME', { size: 8, op: 0.4 })}
    ${label(216, 112, '11', { size: 24, op: 0.3 })}
    ${mono(252, 108, 'months', { size: 8.5, op: 0.3 })}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.46;0.56;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(216, 132, '\u2193', { size: 11, op: 0.3 })}
      ${label(216, 162, '16', { size: 30, fill: P.main })}
      ${mono(258, 158, 'months', { size: 8.5, op: 0.5, fill: P.main })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.68;0.78;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(180, 216, 'FIVE MORE MONTHS BETWEEN SITE VISITS', { size: 8.5, anchor: 'middle', op: 0.45, fill: P.main })}
    </g>`;
    return { svg: wrapS(inner), pills: noPills };
  },
};

/* ══ CELL 3 · 7–9 ═══════════════════════════════════════════════════ */

export const c3Fleet = {
  id: 'c3-fleet',
  name: 'The Whole Fleet',
  family: 'Scale',
  tagline: 'Twelve thousand devices, one push',
  desc:
    'Activation at scale is the real claim, and a single device proves nothing. A fleet counter runs ' +
    'from zero to 12,400 as a carrier change rolls out in waves, with the failure count staying at ' +
    'zero and a rollback button that is never pressed. It is the only option in this cell that ' +
    'operates at the size the buyer actually runs.',
  pros: [
    'Matches the scale the buyer runs at rather than a demo of one unit',
    'The unpressed rollback control is a quiet, confident detail',
    'Counters carry the whole story with almost no artwork',
  ],
  cons: ['Big numbers invite scrutiny', 'Risks looking like a generic dashboard'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 12, waves = 5;
    const inner = `
    ${darkBg(uid)}
    ${bloomC(370, 117, 230, uid, '#B79CFF', 0.26)}
    ${wMono(32, 34, 'CARRIER MIGRATION \u00b7 FLEET 12,400', { size: 9, op: 0.5 })}
    ${Array.from({ length: waves }, (_, i) => {
      const y = 56 + i * 30;
      const on = 0.08 + i * 0.12;
      return `<g>
        ${wMono(32, y + 14, `WAVE ${i + 1}`, { size: 8.5, op: 0.4 })}
        <rect x="104" y="${y + 3}" width="420" height="12" rx="6" fill="rgba(255,255,255,0.09)"/>
        <rect x="104" y="${y + 3}" width="0" height="12" rx="6" fill="#B79CFF">
          <animate attributeName="width" values="0;0;420;420" keyTimes="0;${on.toFixed(3)};${(on + 0.1).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" calcMode="spline"
            keySplines="0 0 1 1;0.4 0 0.2 1;0 0 1 1" fill="freeze"/>
        </rect>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(on + 0.1).toFixed(3)};${(on + 0.13).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          ${wMono(542, y + 14, `${2480 * (i + 1)} DONE`, { size: 8.5, op: 0.55, fill: '#B79CFF' })}
        </g>
      </g>`;
    }).join('')}
    ${[['ACTIVATED', '12,400', '#B79CFF'], ['FAILED', '0', '#4ADE80'], ['ROLLED BACK', '0', '#4ADE80']].map(([k, v, c], i) => `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.7 + i * 0.05).toFixed(3)};${(0.76 + i * 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${wMono(32 + i * 168, 210, k, { size: 8.5, op: 0.4 })}
        <text x="${32 + i * 168}" y="230" font-size="19" font-weight="800" fill="${c}">${v}</text>
      </g>`).join('')}
    ${wMono(708, 226, 'NO TRUCK ROLL', { size: 8.5, anchor: 'end', op: 0.4 })}`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c3TheSwitch = {
  id: 'c3-switch',
  name: 'Mid-Contract',
  family: 'Commercial',
  tagline: 'Change carrier without touching the hardware',
  desc:
    'The commercial case, not the technical one: a carrier is renegotiated and the whole fleet moves ' +
    'to the cheaper contract in an afternoon, with the per-device rate dropping on screen. Any ' +
    'operator locked to one carrier by soldered plastic will recognise the trap immediately, which ' +
    'makes this the highest-value message in the cell.',
  pros: [
    'Carrier lock-in is the most expensive problem this audience has',
    'Puts a monetary figure on a technical capability',
    'Nothing in this cell currently makes a commercial argument',
  ],
  cons: ['Carriers may not love seeing this on a marketing page', 'Rate figures must be plausible'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const inner = `
    ${darkBg(uid)}
    ${bloomC(370, 117, 230, uid, '#B79CFF', 0.26)}
    ${wMono(32, 34, 'CONTRACT RENEGOTIATED \u00b7 TUESDAY, 14:20', { size: 9, op: 0.5 })}
    ${card(32, 54, 300, 96, { r: 12, fill: 'rgba(255,255,255,0.05)', stroke: 'rgba(255,255,255,0.14)', sw: 1.5 })}
    ${wMono(56, 82, 'CARRIER, BEFORE', { size: 8.5, op: 0.4 })}
    <text x="56" y="114" font-size="20" font-weight="800" fill="#FFFFFF" opacity="0.5">Carrier A</text>
    ${wMono(56, 136, '\u20ac0.84 PER DEVICE, PER MONTH', { size: 8.5, op: 0.4, fill: '#F87171' })}

    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.34;0.44;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(408, 54, 300, 96, { r: 12, fill: 'rgba(183,156,255,0.14)', stroke: '#B79CFF', sw: 2 })}
      ${wMono(432, 82, 'CARRIER, AFTER', { size: 8.5, op: 0.55, fill: '#B79CFF' })}
      <text x="432" y="114" font-size="20" font-weight="800" fill="#FFFFFF">Carrier C</text>
      ${wMono(432, 136, '\u20ac0.51 PER DEVICE, PER MONTH', { size: 8.5, op: 0.7, fill: '#4ADE80' })}
    </g>
    <path d="M 344 102 H 396" stroke="#B79CFF" stroke-width="2" opacity="0.5"/>
    <path d="M 400 102 l -9 -6 v 12 z" fill="#B79CFF" opacity="0.7"/>

    ${[['HARDWARE CHANGED', 'nothing'], ['SITE VISITS', 'none'], ['ANNUAL SAVING', '\u20ac49,104']].map(([k, v], i) => `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.56 + i * 0.07).toFixed(3)};${(0.64 + i * 0.07).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${wMono(32 + i * 232, 186, k, { size: 8.5, op: 0.4 })}
        <text x="${32 + i * 232}" y="210" font-size="${i === 2 ? 20 : 15}" font-weight="800"
          fill="${i === 2 ? '#4ADE80' : '#FFFFFF'}">${v}</text>
      </g>`).join('')}
    ${wMono(32, 228, 'SOLDERED PLASTIC IS A THREE-YEAR CONTRACT YOU CANNOT LEAVE', { size: 8.5, op: 0.35 })}`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c3ColdStart = {
  id: 'c3-coldstart',
  name: 'Cold Start',
  family: 'Proof',
  tagline: 'Power on to first packet, timed',
  desc:
    'One device, one boot, four stages timed to the millisecond: power, radio scan, profile ' +
    'activation, first packet — ending under nine seconds, with no provisioning step in between. ' +
    'Activation latency is what an integrator measures on the bench, and this is the number they will ' +
    'come back and check.',
  pros: [
    'Exactly what an integrator benchmarks, expressed in their units',
    'A single boot is easier to verify than a fleet claim',
    'Timings give engineering something to hold the product to',
  ],
  cons: ['Depends on module and network conditions', 'A stopwatch is the least imaginative device here'],
  scores: { story: 4, motion: 5, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const st = [['Power on', '0.0 s'], ['Radio scan', '2.4 s'], ['Profile active', '6.1 s'], ['First packet', '8.7 s']];
    const inner = `
    ${darkBg(uid)}
    ${bloomC(370, 117, 230, uid, '#B79CFF', 0.26)}
    ${wMono(32, 34, 'BENCH TEST \u00b7 COLD BOOT', { size: 9, op: 0.5 })}
    <line x1="60" y1="120" x2="672" y2="120" stroke="rgba(255,255,255,0.12)" stroke-width="2.5"/>
    <line x1="60" y1="120" x2="672" y2="120" stroke="#B79CFF" stroke-width="3"
      stroke-dasharray="612" stroke-dashoffset="612">
      <animate attributeName="stroke-dashoffset" values="612;0;0" keyTimes="0;0.66;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </line>
    ${st.map(([nm, tm], i) => {
      const x = 60 + (i / 3) * 612;
      const on = (i / 3) * 0.66;
      const up = i % 2 === 0;
      return `<g>
        <circle cx="${x.toFixed(0)}" cy="120" r="7" fill="#0D0B14" stroke="rgba(255,255,255,0.22)" stroke-width="2.5"/>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(4)};${(on + 0.05).toFixed(4)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <circle cx="${x.toFixed(0)}" cy="120" r="7" fill="#B79CFF"/>
          <text x="${x.toFixed(0)}" y="${up ? 92 : 164}" font-size="13.5" font-weight="700" fill="#FFFFFF"
            text-anchor="middle">${nm}</text>
          ${wMono(x.toFixed(0), up ? 72 : 184, tm, { size: 10, anchor: 'middle', op: 0.7, fill: '#B79CFF' })}
        </g>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.8;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${wMono(32, 218, 'NO PROVISIONING STEP \u00b7 NO TECHNICIAN \u00b7 8.7 s POWER TO PACKET', { size: 9, op: 0.6, fill: '#B79CFF' })}
    </g>`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

/* ── registries ── */

export const c1Recall = {
  id: 'c1-recall',
  name: 'No Recall',
  family: 'Risk',
  tagline: 'A carrier change that does not need the devices back',
  desc:
    'The worst sentence in hardware is "we need the units returned". A regional carrier withdraws and, ' +
    'with soldered plastic, 2,400 devices come back; with an eSIM the profile changes where they are. ' +
    'Recall exposure is the risk a hardware programme manager loses sleep over, and this is the only ' +
    'cell that names it.',
  pros: [
    'Names the catastrophic-risk scenario this buyer is actually insuring against',
    'The two outcomes are starkly different and need no captions',
    'Very strong argument for the design decision at the BOM stage',
  ],
  cons: ['Leads with a frightening scenario', 'Recall cost figures must be plausible'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const inner = `
    ${dotsW(uid)}
    ${bloomC(370, 117, 210, uid)}
    ${mono(32, 30, 'A REGIONAL CARRIER WITHDRAWS \u00b7 2,400 DEVICES IN THE FIELD', { size: 9, op: 0.45 })}
    ${card(32, 46, 332, 150, { r: 12, fill: WHITE, stroke: RED, sw: 2 })}
    ${mono(56, 74, 'WITH A SOLDERED SIM', { size: 8.5, op: 0.5, fill: RED })}
    ${label(56, 112, 'Every unit comes back', { size: 17 })}
    ${mono(56, 136, '2,400 TRUCK ROLLS \u00b7 14 WEEKS \u00b7 \u20ac186,000', { size: 8.5, op: 0.45 })}
    ${mono(56, 170, 'AND THE FLEET IS OFFLINE MEANWHILE', { size: 8.5, op: 0.32 })}
    ${card(388, 46, 320, 150, { r: 12, fill: P.wash, stroke: P.main, sw: 2 })}
    ${mono(412, 74, 'WITH AN eSIM', { size: 8.5, op: 0.55, fill: P.main })}
    ${label(412, 112, 'Nothing moves', { size: 17 })}
    ${mono(412, 136, '2,400 PROFILES REWRITTEN \u00b7 ONE AFTERNOON \u00b7 \u20ac0', { size: 8.5, op: 0.45 })}
    ${mono(412, 170, 'THE FLEET NEVER LEAVES THE FIELD', { size: 8.5, op: 0.32 })}
    ${Array.from({ length: 48 }, (_, i) => {
      const x = 36 + (i % 24) * 13.6, y = 206 + Math.floor(i / 24) * 14;
      return `<rect x="${x.toFixed(0)}" y="${y}" width="10" height="10" rx="2" fill="${LINE}">
        <animate attributeName="fill" values="${LINE};${LINE};${P.main};${P.main}"
          keyTimes="0;${(0.46 + (i / 48) * 0.3).toFixed(4)};${Math.min(0.47 + (i / 48) * 0.3, 1).toFixed(4)};1"
          dur="${dur}s" repeatCount="indefinite" calcMode="discrete" fill="freeze"/>
      </rect>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.8;0.88;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(708, 224, '2,400 UPDATED WITHOUT A SINGLE SITE VISIT', { size: 8.5, anchor: 'end', op: 0.5, fill: P.main })}
    </g>`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c2Vibration = {
  id: 'c2-vibration',
  name: 'It Cannot Shake Loose',
  family: 'Durability',
  tagline: 'The failure mode a tray always has',
  desc:
    'In any vehicle, machine or outdoor cabinet, the commonest connectivity failure is a SIM that has ' +
    'worked its way out of a spring contact. The tray is shaken until the contact intermittently opens; ' +
    'the soldered part cannot. It is a field-reliability argument that a size comparison never makes.',
  pros: [
    'The most common real-world failure mode, and nobody markets against it',
    'Applies to automotive, industrial and outdoor buyers alike',
    'A dropout counter makes the difference measurable',
  ],
  cons: ['Very similar in spirit to the sealing option', 'Vibration is hard to draw convincingly'],
  scores: { story: 4, motion: 5, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 9;
    const inner = `
    ${dotsW(uid, 360, 234)}
    ${bloomC(180, 117, 140, uid)}
    ${mono(24, 30, 'VIBRATION, 8 HOURS', { size: 9, op: 0.45 })}
    <g>
      ${card(30, 48, 132, 74, { r: 8, fill: WHITE, stroke: LINE, sw: 1.8 })}
      ${card(48, 64, 96, 42, { r: 4, fill: '#EDEEF0', stroke: '#D8DADE' })}
      <animateTransform attributeName="transform" type="translate" values="0 0;2.5 -1.5;-2 1.5;1.5 1;0 0"
        keyTimes="0;0.25;0.5;0.75;1" dur="0.28s" repeatCount="indefinite"/>
    </g>
    ${mono(96, 140, 'SPRING CONTACT', { size: 8, anchor: 'middle', op: 0.42 })}
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0;1;0;1;0" keyTimes="0;0.1;0.16;0.36;0.42;0.68;1"
        dur="${dur}s" repeatCount="indefinite"/>
      ${mono(96, 164, 'CONTACT OPEN', { size: 8.5, anchor: 'middle', op: 0.9, fill: RED })}
    </g>
    ${mono(96, 192, '3 DROPOUTS', { size: 11, anchor: 'middle', op: 0.8, fill: RED })}

    ${card(198, 48, 132, 74, { r: 8, fill: P.wash, stroke: P.main, sw: 1.8 })}
    ${card(240, 64, 48, 42, { r: 4, fill: P.main })}
    ${mono(264, 140, 'SOLDERED', { size: 8, anchor: 'middle', op: 0.5, fill: P.main })}
    ${mono(264, 164, 'NOTHING TO MOVE', { size: 8.5, anchor: 'middle', op: 0.5, fill: P.main })}
    ${mono(264, 192, '0 DROPOUTS', { size: 11, anchor: 'middle', op: 0.9, fill: P.main })}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.7;0.8;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(180, 220, 'THE COMMONEST FIELD FAILURE, REMOVED', { size: 8.5, anchor: 'middle', op: 0.45, fill: P.main })}
    </g>`;
    return { svg: wrapS(inner), pills: noPills };
  },
};

export const c3TheDay = {
  id: 'c3-theday',
  name: 'Day Zero',
  family: 'Commercial',
  tagline: 'Revenue starting the day the box lands',
  desc:
    'For a connected product, every day between shipping and activation is deferred revenue. Two ' +
    'timelines run from despatch: with a local SIM the subscription starts on day nineteen after a ' +
    'field visit, with an eSIM it starts on day one. The shaded eighteen days are the cost, and it is ' +
    'a number a CFO will recognise.',
  pros: [
    'Turns activation speed into a revenue-recognition argument',
    'The shaded dead period is a cost nobody currently quantifies',
    'Aimed at the commercial decision-maker rather than the engineer',
  ],
  cons: ['Only relevant to subscription hardware', 'Nineteen days must be defensible'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 11, days = 30;
    const x0 = 96, x1 = 684;
    const px = (d) => x0 + (d / days) * (x1 - x0);
    const inner = `
    ${darkBg(uid)}
    ${bloomC(370, 117, 230, uid, '#B79CFF', 0.26)}
    ${wMono(32, 30, 'THIRTY DAYS FROM DESPATCH', { size: 9, op: 0.5 })}
    ${wMono(32, 66, 'LOCAL SIM', { size: 8.5, op: 0.45 })}
    <rect x="${x0}" y="56" width="${(px(19) - x0).toFixed(0)}" height="20" rx="4" fill="#F87171" opacity="0.22"/>
    <rect x="${px(19).toFixed(0)}" y="56" width="${(x1 - px(19)).toFixed(0)}" height="20" rx="4" fill="#B79CFF" opacity="0.5"/>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.16;0.26;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${wMono((x0 + 8).toFixed(0), 100, 'NOT EARNING \u00b7 19 DAYS \u00b7 FIELD VISIT PENDING', { size: 8.5, op: 0.6, fill: '#F87171' })}
    </g>
    ${wMono(32, 150, 'eSIM', { size: 8.5, op: 0.5, fill: '#B79CFF' })}
    <rect x="${x0}" y="140" width="${(x1 - x0).toFixed(0)}" height="20" rx="4" fill="#B79CFF" opacity="0.5"/>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.4;0.5;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${wMono((x0 + 8).toFixed(0), 184, 'EARNING FROM DAY ONE \u00b7 NO VISIT', { size: 8.5, op: 0.7, fill: '#4ADE80' })}
    </g>
    ${[0, 10, 19, 30].map((d) => `
      ${wMono(px(d).toFixed(0), 214, `DAY ${d}`, { size: 8, anchor: 'middle', op: 0.32 })}`).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.76;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <text x="684" y="184" font-size="19" font-weight="800" text-anchor="end" fill="#4ADE80">+18 earning days per unit</text>
    </g>`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

/* ══ CELL 1 · 11–15 ═════════════════════════════════════════════ */

export const c1Sentence = {
  id: 'c1-sentence',
  name: 'One Sentence',
  family: 'Typographic',
  tagline: 'The card\u2019s own copy, edited live',
  desc:
    'No illustration. The card\u2019s own sentence is set across the cell \u2014 \u201cShip one SKU worldwide. No ' +
    'need to pre-install country-specific SIM cards or manage regional inventory.\u201d \u2014 and the two ' +
    'burdens are struck out where they sit, leaving the first line standing beside a 190 countries ' +
    'panel. A 234px-tall cell holds three lines of type comfortably and nothing else.',
  pros: [
    'Nothing to draw, so nothing can look wrong at any width',
    'Reads as an edit of the card rather than decoration beside it',
    'The only option in this cell a reader can consume in one glance',
  ],
  cons: [
    'Duplicates the copy sitting immediately to its left',
    'Two strike-throughs is the entire animation',
  ],
  scores: { story: 4, motion: 2, perf: 5, mobile: 4, brand: 3, ease: 5 },
  build: (uid) => {
    const dur = 10;
    const inner = `
    ${dotsW(uid)}
    ${bloomC(300, 117, 200, uid)}
    ${mono(32, 30, 'THE CARD, EDITED', { size: 9, op: 0.42 })}
    <text x="32" y="92" font-size="30" font-weight="800" fill="${INK}">Ship one SKU worldwide.</text>
    <rect x="32" y="100" width="0" height="7" rx="3.5" fill="${P.main}" opacity="0.5">
      <animate attributeName="width" values="0;0;318;318" keyTimes="0;0.6;0.72;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </rect>
    ${[['No need to pre-install country-specific SIM cards', 146, 0.3, 470],
       ['or manage regional inventory.', 190, 0.46, 292]].map(([t, y, on, w]) => `
      <g>
        <text x="32" y="${y}" font-size="21" font-weight="600" fill="${INK}" opacity="0.55">${t}</text>
        <rect x="32" y="${Number(y) - 8}" width="0" height="2.6" rx="1.3" fill="${P.deep}">
          <animate attributeName="width" values="0;0;${w};${w}" keyTimes="0;${Number(on).toFixed(3)};${(Number(on) + 0.1).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        </rect>
      </g>`).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.8;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(548, 52, 164, 130, { r: 14, fill: P.wash, stroke: P.main, sw: 2 })}
      ${mono(572, 84, 'WHAT IS LEFT', { size: 8.5, op: 0.5, fill: P.deep })}
      ${num(572, 138, '190+', { size: 40 })}
      ${mono(572, 162, 'COUNTRIES, ONE PART', { size: 8, op: 0.45, fill: P.deep })}
    </g>
    ${mono(32, 216, 'ONE PART NUMBER \u00b7 NO REGIONAL VARIANT \u00b7 NOTHING HELD IN STOCK', { size: 9, op: 0.38 })}`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c1Api = {
  id: 'c1-api',
  name: 'One Integration',
  family: 'Product',
  tagline: 'The request that makes a device global',
  desc:
    'The page promises \u201cone API, one integration\u201d and never shows it. A request goes out with one SKU ' +
    'and markets set to all; the response comes back with 190 countries, an automatic profile and ' +
    'nothing required from the caller. Two panels side by side is the natural shape for a 740px cell, ' +
    'and it is the only option here aimed at the engineer who has to build the integration.',
  pros: [
    'Shows the product doing the work rather than a metaphor for it',
    'Speaks to the developer who evaluates this page technically',
    'Request and response fit the wide cell without inventing composition',
  ],
  cons: [
    'Commits us to field names the real API has to match',
    'Code panels are the least legible option on a phone',
    'Cold for a reader who is not technical',
  ],
  scores: { story: 4, motion: 3, perf: 5, mobile: 2, brand: 3, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const req = ['POST /v1/devices', '{', '  "sku": "OL-IOT-1",', '  "markets": "all",', '  "profile": "auto"', '}'];
    const res = ['201 Created', '{', '  "countries": 190,', '  "carriers": "tier-1 pool",', '  "field_action": null', '}'];
    const inner = `
    ${dotsW(uid)}
    ${bloomC(370, 117, 200, uid)}
    ${mono(32, 28, 'ONE API, ONE INTEGRATION', { size: 9, op: 0.42 })}
    ${card(28, 42, 320, 152, { r: 12 })}
    ${card(392, 42, 320, 152, { r: 12, fill: P.wash, stroke: P.main, sw: 2 })}
    ${req.map((ln, i) => `<g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.04 + i * 0.035).toFixed(3)};${(0.08 + i * 0.035).toFixed(3)};1"
        dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <text x="48" y="${70 + i * 21}" font-size="11.5" font-weight="${i === 0 ? 700 : 500}"
        fill="${i === 0 ? P.deep : INK}" opacity="${i === 0 ? 1 : 0.62}" style="font-family:${MONO}">${ln}</text>
    </g>`).join('')}
    <circle r="5" fill="${P.main}" opacity="0">
      <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.3;0.32;0.42;0.44;1" dur="${dur}s" repeatCount="indefinite"/>
      <animateMotion dur="${dur}s" repeatCount="indefinite" keyPoints="0;0;1;1" keyTimes="0;0.32;0.44;1" calcMode="linear"
        path="M 352 118 L 388 118"/>
    </circle>
    ${res.map((ln, i) => `<g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.46 + i * 0.035).toFixed(3)};${(0.5 + i * 0.035).toFixed(3)};1"
        dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <text x="412" y="${70 + i * 21}" font-size="11.5" font-weight="${i === 0 ? 700 : 500}"
        fill="${i === 0 ? GREEN_TEXT : INK}" opacity="${i === 0 ? 1 : 0.62}" style="font-family:${MONO}">${ln}</text>
    </g>`).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.7;0.78;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${tick(660, 64, '', { stroke: GREEN })}
    </g>
    ${mono(32, 218, 'NO PER-MARKET BUILD \u00b7 NO REGIONAL SKU \u00b7 NO SECOND INTEGRATION', { size: 9, op: 0.38 })}`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c1Ports = {
  id: 'c1-ports',
  name: 'Seven Ports',
  family: 'Geography',
  tagline: 'One factory, seven markets, same part',
  desc:
    'A schematic world band fills the cell. One factory marker in Shenzhen fires seven shipments ' +
    'outward at once \u2014 Rotterdam, Chicago, Santos, Lagos, Mumbai, Istanbul, Sydney \u2014 and each port ' +
    'lights with its country code and the same part number. Nothing else in this cell uses geography, ' +
    'and simultaneous fan-out is a different claim from a single journey: every market at the same time.',
  pros: [
    'A world band is the one subject a 3.2:1 cell was made for',
    'Simultaneous departure says \u201cany market\u201d better than a sequence does',
    'Port names are concrete without naming a carrier or a customer',
  ],
  cons: [
    'The map is schematic, not projected geography, and a cartographer will say so',
    'Seven labelled nodes is dense at 234px tall',
    'Sits close to the shipping options already in this cell',
  ],
  scores: { story: 4, motion: 4, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const dur = 9;
    const fx = 552, fy = 96;
    const ports = [
      ['Rotterdam', 'NL', 300, 62],
      ['Chicago', 'US', 120, 78],
      ['Santos', 'BR', 198, 152],
      ['Lagos', 'NG', 322, 146],
      ['Istanbul', 'TR', 386, 76],
      ['Mumbai', 'IN', 470, 128],
      ['Sydney', 'AU', 654, 178],
    ];
    const inner = `
    ${dotsW(uid)}
    <ellipse cx="150" cy="96" rx="120" ry="46" fill="${P.soft}" opacity="0.45"/>
    <ellipse cx="210" cy="172" rx="70" ry="42" fill="${P.soft}" opacity="0.45"/>
    <ellipse cx="340" cy="104" rx="96" ry="48" fill="${P.soft}" opacity="0.45"/>
    <ellipse cx="512" cy="104" rx="140" ry="56" fill="${P.soft}" opacity="0.45"/>
    <ellipse cx="652" cy="180" rx="52" ry="26" fill="${P.soft}" opacity="0.45"/>
    ${bloomC(fx, fy, 170, uid)}
    ${[60, 117, 174].map((y) => `<line x1="16" y1="${y}" x2="724" y2="${y}" stroke="${LINE}" stroke-width="1" opacity="0.7"/>`).join('')}
    ${mono(32, 28, 'ONE FACTORY \u00b7 SEVEN MARKETS \u00b7 THE SAME PART NUMBER', { size: 9, op: 0.42 })}
    ${ports.map(([nm, cc, x, y], i) => {
      const on = 0.12 + i * 0.07;
      const d = `M ${fx} ${fy} Q ${((fx + Number(x)) / 2).toFixed(0)} ${(Math.min(fy, Number(y)) - 46).toFixed(0)} ${x} ${y}`;
      return `<g>
        <path d="${d}" fill="none" stroke="${P.main}" stroke-width="1.6" opacity="0.28"/>
        <circle cx="${x}" cy="${y}" r="5" fill="${WHITE}" stroke="${LINE}" stroke-width="2"/>
        <circle r="4" fill="${P.deep}" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.08;0.1;${on.toFixed(3)};${(on + 0.02).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite"/>
          <animateMotion dur="${dur}s" repeatCount="indefinite" calcMode="linear"
            keyPoints="0;0;1;1" keyTimes="0;0.1;${on.toFixed(3)};1" path="${d}"/>
        </circle>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.03).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <circle cx="${x}" cy="${y}" r="5.5" fill="${P.main}"/>
          ${label(Number(x), Number(y) - 14, nm, { size: 11.5, anchor: 'middle' })}
          ${mono(Number(x), Number(y) + 20, `${cc} \u00b7 OL-IOT-1`, { size: 7.5, anchor: 'middle', op: 0.42 })}
        </g>
      </g>`;
    }).join('')}
    <circle cx="${fx}" cy="${fy}" r="9" fill="${INK}"/>
    ${mono(fx, fy - 18, 'SHENZHEN', { size: 8, anchor: 'middle', op: 0.5 })}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(462, 14, 250, 32, { r: 10, fill: P.wash, stroke: P.main, sw: 1.8 })}
      ${mono(482, 35, 'MARKETS LIVE 7 / 7 \u00b7 SKUS SHIPPED 1', { size: 9, op: 0.6, fill: P.deep })}
    </g>`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c1Cost = {
  id: 'c1-cost',
  name: 'Cost Removed',
  family: 'Cost',
  tagline: 'Five line items struck off the unit cost',
  desc:
    'Five costs a removable SIM adds to every unit \u2014 the connector, the tray and gasket, regional SIM ' +
    'stock, kitting labour and variant scrap \u2014 sit in a row with their per-unit figures and are struck ' +
    'off one at a time, totalling in a bar beneath. The cell next door promises lower total cost and no ' +
    'option in this section puts a currency figure on it.',
  pros: [
    'The only option here that quantifies money rather than units or SKUs',
    'Five chips across a 740px cell is an honest use of the width',
    'A per-unit figure multiplied by build volume is how this decision is actually argued',
  ],
  cons: [
    'Five invented costs are five numbers to defend',
    'Bill-of-materials detail varies enormously by device',
    'A row of cost chips is the plainest thing in the grid',
  ],
  scores: { story: 5, motion: 3, perf: 5, mobile: 3, brand: 3, ease: 5 },
  build: (uid) => {
    const dur = 11;
    const items = [['SIM connector', '$0.18'], ['Tray and gasket', '$0.06'], ['Regional SIM stock', '$1.42'], ['Kitting labour', '$0.44'], ['Variant scrap', '$0.11']];
    const inner = `
    ${dotsW(uid)}
    ${bloomC(370, 110, 210, uid)}
    ${mono(24, 34, 'WHAT A REMOVABLE SIM ADDS TO EVERY UNIT', { size: 9, op: 0.42 })}
    ${items.map(([nm, cost], i) => {
      const x = 24 + i * 138;
      const on = 0.1 + i * 0.09;
      return `<g>
        ${card(x, 52, 128, 100, { r: 12 })}
        ${label(x + 16, 82, nm.split(' ')[0], { size: 12.5 })}
        ${label(x + 16, 100, nm.split(' ').slice(1).join(' '), { size: 12.5, op: 0.72 })}
        ${num(x + 16, 136, cost, { size: 19, fill: AMBER })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <line x1="${x + 14}" y1="130" x2="${x + 92}" y2="130" stroke="${P.deep}" stroke-width="2.4" stroke-linecap="round"/>
        </g>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.7;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(24, 166, 688, 52, { r: 12, fill: P.wash, stroke: P.main, sw: 2 })}
      ${label(48, 198, 'Out of every unit, before a SIM is bought', { size: 14.5 })}
      ${num(688, 199, '$2.21 \u00d7 240,000 units = $530,400', { size: 15, anchor: 'end' })}
    </g>`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c1Label = {
  id: 'c1-label',
  name: 'Destination: Any',
  family: 'Single gesture',
  tagline: 'One carton, one label, no market field',
  desc:
    'One object, drawn large: a finished carton with its shipping label printing line by line \u2014 SKU ' +
    'OL-IOT-1, 1 of 1; quantity 240; SIM fitted, none; destination, any market \u2014 then a stamp lands ' +
    'reading no regional variant. It makes the claim as a document rather than a process, so there is ' +
    'one thing to look at and one line to remember.',
  pros: [
    'A single memorable artefact instead of a sequence to follow',
    'The destination field reading \u201cany market\u201d is the whole card in two words',
    'Holds up as a still frame, which matters if motion is reduced',
  ],
  cons: [
    'Real shipments do carry a destination, so the label is a device rather than a fact',
    'One beat means a short loop',
  ],
  scores: { story: 4, motion: 3, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 9;
    const fields = [['SKU', 'OL-IOT-1 \u00b7 1 OF 1'], ['QTY', '240 UNITS'], ['SIM FITTED', 'NONE'], ['DESTINATION', 'ANY MARKET']];
    const inner = `
    ${dotsW(uid)}
    ${bloomC(430, 117, 210, uid)}
    ${mono(32, 28, 'THE CARTON THAT LEAVES THE LINE', { size: 9, op: 0.42 })}
    <rect x="36" y="40" width="300" height="170" rx="8" fill="#F6F4FB" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 36 70 H 336" stroke="${INK}" stroke-width="2" opacity="0.35"/>
    <rect x="168" y="40" width="36" height="170" fill="${P.soft}" opacity="0.6"/>
    ${card(56, 76, 260, 120, { r: 6, sw: 2 })}
    ${fields.map(([k, v], i) => `<g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.08 + i * 0.1).toFixed(3)};${(0.13 + i * 0.1).toFixed(3)};1"
        dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(72, 100 + i * 21, k, { size: 7.5, op: 0.4 })}
      <text x="162" y="${100 + i * 21}" font-size="11" font-weight="700" fill="${i === 3 ? P.deep : INK}"
        opacity="${i === 3 ? 1 : 0.72}" style="font-family:${MONO}">${v}</text>
    </g>`).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.5;0.56;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((i) =>
        `<rect x="${72 + i * 8}" y="172" width="${i % 3 ? 2.6 : 4.6}" height="0" fill="${INK}" opacity="0.8">
          <animate attributeName="height" values="0;0;16;16" keyTimes="0;${(0.5 + i * 0.004).toFixed(3)};${(0.53 + i * 0.004).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        </rect>`).join('')}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.4;0.46;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(380, 76, 'DESTINATION', { size: 9, op: 0.45 })}
      <text x="380" y="124" font-size="40" font-weight="800" fill="${INK}">ANY MARKET</text>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.72;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <g transform="translate(380 146) rotate(-4)">
        <rect width="272" height="46" rx="7" fill="none" stroke="${P.deep}" stroke-width="3" opacity="0.8"/>
        <text x="136" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="${P.deep}"
          opacity="0.85" letter-spacing="1.4" style="font-family:${MONO}">NO REGIONAL VARIANT</text>
      </g>
      ${mono(380, 218, '190+ COUNTRIES \u00b7 NOTHING TO PRE-FIT \u00b7 NOTHING TO RE-KIT', { size: 8.5, op: 0.4 })}
    </g>`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

/* ══ CELL 2 · 11–15 ═════════════════════════════════════════════ */

export const c2Layout = {
  id: 'c2-layout',
  name: 'The Layout',
  family: 'Design tool',
  tagline: 'The footprint deleted in the layout editor',
  desc:
    'The cell becomes the board editor the reader works in. The SIM footprint and its keep-out are ' +
    'selected and deleted, two traces re-route, the board edge pulls in and the width label goes from ' +
    '48.0 mm to 44.0 mm with a DRC pass. It is the only option that shows the decision being made in ' +
    'the tool rather than the part being admired.',
  pros: [
    'Puts the benefit in the hardware designer\u2019s own working context',
    'A board edge moving in is a precise, checkable claim',
    'The DRC pass answers the quiet worry that removing it breaks something',
  ],
  cons: [
    'Assumes the reader recognises a layout editor',
    'The millimetre figures depend entirely on the board',
    'Busiest option in the smallest cell',
  ],
  scores: { story: 4, motion: 4, perf: 5, mobile: 3, brand: 3, ease: 3 },
  build: (uid) => {
    const dur = 10;
    const inner = `
    ${dotsW(uid, 360, 234)}
    ${bloomC(180, 110, 140, uid)}
    ${mono(24, 28, 'BOARD LAYOUT \u00b7 REV C', { size: 9, op: 0.42 })}
    ${card(24, 40, 312, 150, { r: 8 })}
    <rect x="44" y="58" width="268" height="114" rx="6" fill="#F3F0FB" stroke="${INK}" stroke-width="2">
      <animate attributeName="width" values="268;268;228;228" keyTimes="0;0.5;0.62;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </rect>
    <rect x="60" y="86" width="52" height="46" rx="5" fill="${P.main}" stroke="${INK}" stroke-width="2"/>
    ${mono(86, 114, 'eSIM', { size: 7.5, anchor: 'middle', op: 0.9, fill: WHITE })}
    <g>
      <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.26;0.34;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <rect x="214" y="74" width="80" height="64" rx="4" fill="#FFFFFF" stroke="${AMBER}" stroke-width="2" stroke-dasharray="5 4"/>
      ${mono(254, 100, 'SIM SLOT', { size: 7.5, anchor: 'middle', op: 0.55 })}
      ${mono(254, 116, 'KEEP-OUT', { size: 7, anchor: 'middle', op: 0.35 })}
      <path d="M 112 108 H 214" stroke="${GRAY}" stroke-width="2"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.4;0.48;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <path d="M 112 100 H 168 V 72 H 248" fill="none" stroke="${P.main}" stroke-width="2.2"/>
      <path d="M 112 118 H 180 V 152 H 248" fill="none" stroke="${P.main}" stroke-width="2.2"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <rect x="196" y="158" width="128" height="24" rx="12" fill="${GREEN_SOFT}"/>
      ${mono(260, 174, 'DRC PASS \u00b7 0 ERRORS', { size: 7.5, anchor: 'middle', op: 0.9, fill: GREEN_TEXT })}
    </g>
    <line x1="44" y1="204" x2="312" y2="204" stroke="${LINE}" stroke-width="2"/>
    <line x1="44" y1="204" x2="272" y2="204" stroke="${P.main}" stroke-width="3" opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.6;0.68;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </line>
    ${mono(24, 226, 'BOARD WIDTH', { size: 8, op: 0.38 })}
    <g>
      <animate attributeName="opacity" values="1;1;0.28;0.28" keyTimes="0;0.6;0.68;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${num(160, 226, '48.0 mm', { size: 13, fill: INK })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.7;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${num(248, 226, '\u2192 44.0 mm', { size: 13 })}
    </g>`;
    return { svg: wrapS(inner), pills: noPills };
  },
};

export const c2Patch = {
  id: 'c2-patch',
  name: 'The Patch',
  family: 'Device class',
  tagline: 'Products a tray makes impossible',
  desc:
    'Every other option in this cell argues that a tray costs space. This one argues that some products ' +
    'cannot have one at all: a 1.6 mm adhesive patch for remote patient monitoring, with the eSIM ' +
    'inside it, and a nano-SIM tray drawn to the same scale hanging above it, plainly too tall to fit. ' +
    'It turns a saving into a gate the product either passes or does not.',
  pros: [
    'Reframes size as feasibility, which is a stronger argument than saving',
    'Uses healthcare, one of the six industries the page already sells to',
    'The tray floating above the patch needs no caption to be understood',
  ],
  cons: [
    'Speaks to one narrow device class rather than the whole audience',
    'A patch in cross-section is a new drawing idiom for this page',
  ],
  scores: { story: 5, motion: 3, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const inner = `
    ${dotsW(uid, 360, 234)}
    ${bloomC(180, 130, 140, uid)}
    ${mono(24, 28, 'ADHESIVE PATCH, IN SECTION \u00b7 1.6 mm', { size: 9, op: 0.42 })}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.24;0.34;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <rect x="150" y="56" width="112" height="48" rx="5" fill="#FFF8F0" stroke="${AMBER}" stroke-width="2" stroke-dasharray="5 4"/>
      ${mono(206, 78, 'NANO-SIM TRAY', { size: 7.5, anchor: 'middle', op: 0.6 })}
      ${mono(206, 94, 'SAME SCALE', { size: 7, anchor: 'middle', op: 0.4 })}
      ${mono(336, 84, 'WILL NOT FIT', { size: 8, anchor: 'end', op: 0.9, fill: AMBER })}
      <path d="M 206 110 V 130" stroke="${AMBER}" stroke-width="2" stroke-dasharray="3 3"/>
    </g>
    <rect x="56" y="140" width="248" height="24" rx="12" fill="${WHITE}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="92" y="146" width="26" height="12" rx="3" fill="${P.main}"/>
    ${mono(131, 156, 'eSIM', { size: 7, op: 0.5 })}
    <path d="M 30 176 Q 180 196 330 176" fill="none" stroke="${INK}" stroke-width="2.5" opacity="0.5"/>
    ${mono(30, 202, 'SKIN', { size: 7.5, op: 0.32 })}
    <line x1="42" y1="140" x2="42" y2="164" stroke="${P.deep}" stroke-width="2"/>
    ${mono(24, 134, '1.6 mm', { size: 8, op: 0.55, fill: P.deep })}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.6;0.7;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${label(24, 222, 'Some products cannot have a slot at all', { size: 13.5 })}
    </g>`;
    return { svg: wrapS(inner), pills: noPills };
  },
};

export const c2Three = {
  id: 'c2-three',
  name: 'Three Ways',
  family: 'Typographic',
  tagline: 'Sensors, battery, thinner \u2014 pick one',
  desc:
    'The card offers the space back for more sensors, a bigger battery or a slimmer design, and every ' +
    'other option in this cell spends it on the battery. Here all three are set as three lines of type ' +
    'with a figure each \u2014 two more sensors, 38% more cell, 1.5 mm thinner \u2014 highlighted in turn. The ' +
    'copy is the artwork, so there is no board to draw at 360px.',
  pros: [
    'Covers all three uses the card names instead of only the battery',
    'Type-only, so it stays legible at any width',
    'Cheapest option in the cell to build and to change later',
  ],
  cons: [
    'No device, board or part anywhere in it',
    'Three figures instead of one, so three things to substantiate',
    'Lowest motion of the options in this cell',
  ],
  scores: { story: 4, motion: 2, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: (uid) => {
    const dur = 9;
    const rows = [['more sensors', '+2'], ['bigger battery', '+38%'], ['slimmer case', '\u22121.5 mm']];
    const inner = `
    ${dotsW(uid, 360, 234)}
    ${bloomC(180, 120, 140, uid)}
    ${mono(24, 34, '30 mm\u00b2 BACK \u00b7 SPEND IT HOW YOU LIKE', { size: 9, op: 0.42 })}
    ${rows.map(([w, fig], i) => {
      const y = 96 + i * 50;
      const on = 0.06 + i * 0.31;
      return `<g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0"
            keyTimes="0;${on.toFixed(3)};${(on + 0.03).toFixed(3)};${(on + 0.26).toFixed(3)};${(on + 0.29).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite"/>
          <rect x="16" y="${y - 30}" width="328" height="42" rx="10" fill="${P.wash}" stroke="${P.main}" stroke-width="1.6"/>
        </g>
        <text x="32" y="${y}" font-size="22" font-weight="700" fill="${INK}">${w}</text>
        ${num(328, y, fig, { size: 18, anchor: 'end' })}
      </g>`;
    }).join('')}
    ${mono(24, 220, 'ONE PART REMOVED, THREE WAYS TO SPEND THE ROOM', { size: 8.5, op: 0.38 })}`;
    return { svg: wrapS(inner), pills: noPills };
  },
};

export const c2Steps = {
  id: 'c2-steps',
  name: 'Two Fewer Steps',
  family: 'Manufacturing',
  tagline: 'What leaves the assembly line with the tray',
  desc:
    'Four figures from the line, not the board: assembly steps from seven to five, placements from 214 ' +
    'to 213, connector part numbers from one to none, and eleven seconds off functional test because ' +
    'there is no tray retention check. It answers the factory question the size options never touch \u2014 ' +
    'what happens to the build.',
  pros: [
    'Talks to manufacturing engineering, a reader this cell currently ignores',
    'Four before-and-after figures are easy to verify internally',
    'Test seconds per unit is a cost a plant manager already tracks',
  ],
  cons: [
    'Four rows of numbers is the driest option in the cell',
    'Figures vary by line and by contract manufacturer',
    'Reads like a spreadsheet rather than a product argument',
  ],
  scores: { story: 4, motion: 3, perf: 5, mobile: 4, brand: 2, ease: 5 },
  build: (uid) => {
    const dur = 10;
    const rows = [['Assembly steps', '7', '5'], ['Placements', '214', '213'], ['Connector part numbers', '1', '0'], ['Functional test', '41 s', '30 s']];
    const inner = `
    ${dotsW(uid, 360, 234)}
    ${bloomC(180, 120, 140, uid)}
    ${mono(24, 28, 'PER UNIT, ON THE LINE', { size: 9, op: 0.42 })}
    ${rows.map(([nm, before, after], i) => {
      const y = 42 + i * 44;
      const on = 0.08 + i * 0.1;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(24, y, 312, 38, { r: 10 })}
        ${label(40, y + 24, nm, { size: 11.5 })}
        ${num(268, y + 25, before, { size: 12, anchor: 'end', fill: GRAY })}
        ${mono(276, y + 25, '\u2192', { size: 9, op: 0.35 })}
        ${num(320, y + 25, after, { size: 14, anchor: 'end' })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.7;0.78;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(24, 226, 'NO TRAY TO PLACE, NO RETENTION TEST TO RUN', { size: 8.5, op: 0.45, fill: P.deep })}
    </g>`;
    return { svg: wrapS(inner), pills: noPills };
  },
};

export const c2Macro = {
  id: 'c2-macro',
  name: 'Macro',
  family: 'Product shot',
  tagline: 'The part, lit, on black',
  desc:
    'A deliberate inversion: the small cell goes dark and holds a lit macro shot of the MFF2 package, ' +
    'its six contacts coming up in sequence under a sheen that travels across the face, with the ' +
    '2.9 \u00d7 2.5 mm scale beneath. The point is treating the component as the product rather than as a ' +
    'diagram \u2014 and the trade is that it puts a second dark surface in a light row.',
  pros: [
    'The only option in this cell with any visual glamour',
    'Rhymes with the dark cell on the right of the same grid',
    'One object, perfectly suited to the smallest box in the section',
  ],
  cons: [
    'A second dark cell may unbalance a row that is otherwise white',
    'Closest in subject to the datasheet option, which also just shows the part',
    'Makes no argument \u2014 it presents, it does not persuade',
  ],
  scores: { story: 2, motion: 4, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 8;
    const inner = `
    <defs>
      <linearGradient id="mg-${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1A1526"/><stop offset="0.55" stop-color="#0D0B14"/>
        <stop offset="1" stop-color="#241A38"/>
      </linearGradient>
      <linearGradient id="mf-${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3B3450"/><stop offset="1" stop-color="#17131F"/>
      </linearGradient>
      <clipPath id="mc-${uid}"><rect x="104" y="70" width="152" height="96" rx="10"/></clipPath>
    </defs>
    <rect width="360" height="234" fill="url(#mg-${uid})"/>
    ${bloomC(180, 112, 150, uid, '#B79CFF', 0.3)}
    ${wMono(24, 28, 'MFF2 \u00b7 eUICC \u00b7 SOLDERED DOWN', { size: 9, op: 0.5 })}
    <rect x="104" y="70" width="152" height="96" rx="10" fill="url(#mf-${uid})" stroke="#6D5C99" stroke-width="1.6"/>
    <g clip-path="url(#mc-${uid})">
      <rect x="-60" y="70" width="46" height="96" fill="#B79CFF" opacity="0.22">
        <animate attributeName="x" values="60;300;300" keyTimes="0;0.5;1" dur="${dur}s" repeatCount="indefinite"/>
      </rect>
    </g>
    <path d="M 134 96 h 28 M 134 110 h 20 M 134 124 h 28" stroke="#B79CFF" stroke-width="2" opacity="0.5"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `
      <rect x="${118 + i * 22}" y="160" width="14" height="12" rx="2" fill="#4B4266">
        <animate attributeName="fill" values="#4B4266;#4B4266;#B79CFF;#B79CFF"
          keyTimes="0;${(0.12 + i * 0.08).toFixed(3)};${(0.16 + i * 0.08).toFixed(3)};1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      </rect>`).join('')}
    <line x1="104" y1="196" x2="256" y2="196" stroke="rgba(255,255,255,0.35)" stroke-width="1.6"/>
    <line x1="104" y1="190" x2="104" y2="202" stroke="rgba(255,255,255,0.35)" stroke-width="1.6"/>
    <line x1="256" y1="190" x2="256" y2="202" stroke="rgba(255,255,255,0.35)" stroke-width="1.6"/>
    ${wMono(180, 220, '2.9 \u00d7 2.5 mm', { size: 9.5, anchor: 'middle', op: 0.7, fill: '#B79CFF' })}
    ${wMono(336, 28, 'SIX CONTACTS', { size: 8, anchor: 'end', op: 0.4 })}`;
    return { svg: wrapS(inner), pills: noPills };
  },
};

/* ══ CELL 3 · 11–15 ═════════════════════════════════════════════ */

export const c3Bid = {
  id: 'c3-bid',
  name: 'The Bid',
  family: 'Marketplace',
  tagline: 'Four operators bid, one wins, 42 ms',
  desc:
    'The page claims real-time bidding across 150+ operators and nothing in this section shows it. A ' +
    'device boots on the left; four operator bids arrive with their per-megabyte rates, the cheapest ' +
    'qualifying one wins, and the device attaches 42 ms later. It makes instant activation a market ' +
    'event rather than a switch being flipped.',
  pros: [
    'The only option that shows OMDM working at the moment of activation',
    'A bid stack is exactly what a very wide dark cell is good at',
    'Answers \u201chow do you get the rate\u201d without a pricing table',
  ],
  cons: [
    'Operators are anonymised, which is less concrete than naming carriers',
    'Rates and the 42 ms figure must be real',
    'Adds a second idea to a cell that is meant to say \u201cinstant\u201d',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 3, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const bids = [['Operator A', '\u20ac0.0046', 0.7, false], ['Operator B', '\u20ac0.0041', 0.55, false], ['Operator C', '\u20ac0.0038', 0.42, true], ['Operator D', '\u20ac0.0052', 0.86, false]];
    const inner = `
    ${darkBg(uid)}
    ${bloomC(320, 117, 230, uid, '#B79CFF', 0.26)}
    ${wMono(32, 30, 'DEVICE POWERS ON \u00b7 THE MARKET OPENS', { size: 9, op: 0.5 })}
    <rect x="32" y="86" width="78" height="58" rx="9" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" stroke-width="1.6"/>
    <circle cx="71" cy="115" r="7" fill="#B79CFF">
      <animate attributeName="opacity" values="0.3;1;0.3" dur="1.6s" repeatCount="indefinite"/>
    </circle>
    ${wMono(32, 166, 'FIRST BOOT \u00b7 06:14', { size: 8.5, op: 0.45 })}
    ${bids.map(([nm, rate, bar, won], i) => {
      const y = 54 + i * 38;
      const on = 0.1 + i * 0.08;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.04).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <rect x="140" y="${y}" width="418" height="30" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" stroke-width="1.2"/>
        <rect x="140" y="${y}" width="${(418 * Number(bar)).toFixed(0)}" height="30" rx="8" fill="#B79CFF" opacity="0.14"/>
        <text x="158" y="${y + 20}" font-size="12.5" font-weight="700" fill="#FFFFFF" opacity="0.9">${nm}</text>
        ${wMono(300, y + 20, 'TIER-1', { size: 8, op: 0.35 })}
        ${wMono(430, y + 20, `${rate} /MB`, { size: 10.5, anchor: 'end', op: 0.8, fill: '#B79CFF' })}
        ${won ? `<g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.5;0.56;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <rect x="140" y="${y}" width="418" height="30" rx="8" fill="none" stroke="#4ADE80" stroke-width="2"/>
          <rect x="474" y="${y + 6}" width="66" height="18" rx="9" fill="#4ADE80" opacity="0.9"/>
          <text x="507" y="${y + 19}" text-anchor="middle" font-size="9" font-weight="800" fill="#0D0B14"
            letter-spacing="1" style="font-family:${MONO}">WON</text>
        </g>` : ''}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.7;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <text x="586" y="110" font-size="36" font-weight="800" fill="#4ADE80" style="font-family:${MONO}">42 ms</text>
      ${wMono(586, 134, 'BID TO ATTACH', { size: 8.5, op: 0.6 })}
      ${wMono(586, 152, 'BEST RATE, THIS LOCATION', { size: 8, op: 0.4 })}
    </g>
    ${wMono(32, 218, '150+ OPERATORS BIDDING \u00b7 CHOSEN PER DEVICE, PER LOCATION, ON EVERY BOOT', { size: 9, op: 0.5 })}`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c3Drives = {
  id: 'c3-drives',
  name: 'Nobody Drives There',
  family: 'Field cost',
  tagline: 'Three site visits that never happen',
  desc:
    'Zero-touch is only worth anything because of where the devices are. Three real deployments sit ' +
    'across the cell \u2014 an offshore wind turbine five hours out by boat, a pipeline sensor 340 km into ' +
    'the Atacama, a basement meter room needing a nine-day access appointment \u2014 and each travel line ' +
    'is struck out as the device comes online by itself.',
  pros: [
    'Puts a cost on the alternative rather than praising the feature',
    'Three named places make \u201cmass deployment\u201d concrete',
    'The kilometres-not-driven total is a line a CFO will read twice',
  ],
  cons: [
    'Three panels of text in a 234px cell is close to the limit',
    'The distances are illustrative and need real deployment examples',
    'Shares its \u201cno field visit\u201d premise with other options in the cell',
  ],
  scores: { story: 5, motion: 3, perf: 5, mobile: 3, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const sites = [
      ['Offshore wind, North Sea', '5 h out by boat', 'WEATHER WINDOW ONLY', 104],
      ['Pipeline sensor, Atacama', '340 km by road', 'TWO-DAY ROUND TRIP', 100],
      ['Meter room, basement level', '9-day access appointment', 'BUILDING MANAGER REQUIRED', 158],
    ];
    const inner = `
    ${darkBg(uid)}
    ${bloomC(370, 110, 230, uid, '#B79CFF', 0.26)}
    ${wMono(32, 30, 'WHERE THE DEVICES ACTUALLY ARE', { size: 9, op: 0.5 })}
    ${sites.map(([nm, travel, note, sw], i) => {
      const x = 24 + i * 232;
      const on = 0.12 + i * 0.12;
      return `<g>
        <rect x="${x}" y="48" width="224" height="124" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.13)" stroke-width="1.4"/>
        <text x="${x + 20}" y="78" font-size="13" font-weight="700" fill="#FFFFFF">${nm}</text>
        <g>
          <text x="${x + 20}" y="106" font-size="12.5" font-weight="600" fill="#F87171" opacity="0.85">${travel}</text>
          <rect x="${x + 16}" y="101" width="0" height="2.2" fill="#F87171">
            <animate attributeName="width" values="0;0;${sw};${sw}" keyTimes="0;${on.toFixed(3)};${(on + 0.07).toFixed(3)};1"
              dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          </rect>
        </g>
        ${wMono(x + 20, 124, note, { size: 7.5, op: 0.32 })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(on + 0.08).toFixed(3)};${(on + 0.13).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <circle cx="${x + 26}" cy="152" r="5" fill="#4ADE80"/>
          ${wMono(x + 40, 156, 'ONLINE BY ITSELF', { size: 8.5, op: 0.8, fill: '#4ADE80' })}
        </g>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.8;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${wMono(32, 214, '0 SITE VISITS \u00b7 14,600 km NOT DRIVEN \u00b7 NOTHING BOOKED WITH A TECHNICIAN', { size: 9.5, op: 0.65, fill: '#B79CFF' })}
    </g>`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c3Boxed = {
  id: 'c3-boxed',
  name: 'Still Boxed',
  family: 'Concrete',
  tagline: 'Four thousand eight hundred units, none unpacked',
  desc:
    'A pallet of forty-eight sealed cartons fills the cell, a hundred units in each. The cartons light ' +
    'in waves as the devices inside attach, the online figure steps up to 4,800, and the punchline is ' +
    'the count that stays at zero: cartons opened. It is the most physical reading of zero-touch \u2014 ' +
    'nobody had to open anything.',
  pros: [
    'Sealed cartons make \u201czero-touch\u201d literal rather than abstract',
    'A pallet grid is a natural fit for a very wide, short cell',
    'The zero that never moves is the most memorable number on the page',
  ],
  cons: [
    'Structurally similar to the tile-sweep option already in this cell',
    'Devices lighting through cardboard is a liberty, not a fact',
    'The figure steps in stages rather than counting smoothly',
  ],
  scores: { story: 4, motion: 5, perf: 4, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 10;
    const cols = 12, rows = 4;
    const counts = ['0', '1,200', '2,400', '3,600', '4,800'];
    const inner = `
    ${darkBg(uid)}
    ${bloomC(370, 110, 240, uid, '#B79CFF', 0.24)}
    ${wMono(32, 30, 'ONE PALLET \u00b7 48 SEALED CARTONS \u00b7 100 UNITS EACH', { size: 9, op: 0.5 })}
    ${Array.from({ length: cols * rows }, (_, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      const x = 30 + c * 57, y = 52 + r * 34;
      const on = 0.12 + (c * 0.055) + r * 0.012;
      return `<g>
        <rect x="${x}" y="${y}" width="52" height="29" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" stroke-width="1.1"/>
        <line x1="${x + 26}" y1="${y}" x2="${x + 26}" y2="${y + 29}" stroke="rgba(255,255,255,0.14)" stroke-width="1.1"/>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.03).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <rect x="${x}" y="${y}" width="52" height="29" rx="3" fill="#B79CFF" opacity="0.2" stroke="#B79CFF" stroke-width="1.3"/>
          <circle cx="${x + 44}" cy="${y + 7}" r="2.6" fill="#4ADE80"/>
        </g>
      </g>`;
    }).join('')}
    <rect x="24" y="190" width="692" height="8" rx="2" fill="rgba(255,255,255,0.1)"/>
    ${counts.map((n, i) => {
      const on = i === 0 ? 0 : 0.14 + i * 0.16;
      const off = i === counts.length - 1 ? 1 : 0.14 + (i + 1) * 0.16;
      const kt = i === 0 ? `0;${off.toFixed(3)};${(off + 0.01).toFixed(3)};1` : `0;${on.toFixed(3)};${(on + 0.01).toFixed(3)};${off.toFixed(3)};1`;
      const vals = i === 0 ? '1;1;0;0' : (i === counts.length - 1 ? '0;0;1;1;1' : '0;0;1;1;0');
      return `<g opacity="${i === 0 ? 1 : 0}">
        <animate attributeName="opacity" values="${vals}" keyTimes="${kt}" dur="${dur}s" repeatCount="indefinite"/>
        <text x="716" y="30" text-anchor="end" font-size="15" font-weight="800" fill="#B79CFF" style="font-family:${MONO}">${n} ONLINE</text>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.74;0.82;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${wMono(32, 220, 'CARTONS OPENED: 0 \u00b7 SIMS FITTED: 0 \u00b7 TECHNICIANS ON SITE: 0', { size: 10, op: 0.7, fill: '#4ADE80' })}
    </g>`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c3Nothing = {
  id: 'c3-nothing',
  name: 'Nothing To Do',
  family: 'Editorial',
  tagline: 'The only message the deployment sends',
  desc:
    'One message card, arriving at 06:02: 4,812 devices activated overnight in 31 countries, no action ' +
    'required. Beneath it, three counts that stayed at zero \u2014 tickets raised, engineers paged, portal ' +
    'logins. It answers the question a fleet owner actually has, which is what this costs them on a ' +
    'Monday morning, and it is the quietest option in the cell by design.',
  pros: [
    'Written in a human voice, which nothing else in this section is',
    'Frames the benefit as the absence of work rather than a feature',
    'Very cheap to build and legible at any width',
  ],
  cons: [
    'Least motion of any option in this cell \u2014 it is close to a still',
    'A notification is a familiar device and may read as a stock idea',
    'The figures are invented and must become real telemetry',
  ],
  scores: { story: 4, motion: 2, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 9;
    const zeros = [['Support tickets raised', '0'], ['Engineers paged', '0'], ['Portal logins needed', '0']];
    const inner = `
    ${darkBg(uid)}
    ${bloomC(370, 100, 230, uid, '#B79CFF', 0.26)}
    ${wMono(32, 30, 'OVERNIGHT, WHILE NOBODY WAS WORKING', { size: 9, op: 0.5 })}
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.08;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <rect x="140" y="48" width="460" height="104" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <circle cx="168" cy="76" r="9" fill="#B79CFF"/>
      ${wMono(188, 80, 'OPENLINE \u00b7 06:02', { size: 8.5, op: 0.5 })}
      <text x="168" y="114" font-size="19" font-weight="700" fill="#FFFFFF">4,812 devices activated in 31 countries.</text>
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.24;0.32;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <text x="168" y="140" font-size="19" font-weight="700" fill="#4ADE80">No action required.</text>
      </g>
    </g>
    ${zeros.map(([nm, n], i) => {
      const x = 40 + i * 226;
      const on = 0.42 + i * 0.1;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <rect x="${x}" y="170" width="210" height="42" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" stroke-width="1.2"/>
        ${wMono(x + 18, 196, nm, { size: 8.5, op: 0.5 })}
        <text x="${x + 188}" y="200" text-anchor="end" font-size="20" font-weight="800" fill="#B79CFF" style="font-family:${MONO}">${n}</text>
      </g>`;
    }).join('')}
    <rect x="356" y="124" width="2.5" height="20" fill="#B79CFF" opacity="0">
      <animate attributeName="opacity" values="0;0.9;0" dur="1.1s" repeatCount="indefinite"/>
    </rect>`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

export const c3Runbook = {
  id: 'c3-runbook',
  name: 'The Runbook',
  family: 'Typographic',
  tagline: 'Five steps struck out, one left',
  desc:
    'The old provisioning runbook, typeset as a numbered list \u2014 unbox at the depot, fit the regional ' +
    'SIM, record the IMSI, wait for the carrier, ship it and hope \u2014 struck out line by line until only ' +
    '\u201cPower on.\u201d is left. This is deliberately the one light option for this cell: the subject is a ' +
    'printed procedure being destroyed, and that only reads as paper. The cost is that the section ' +
    'loses its dark anchor.',
  pros: [
    'The copy is the artwork, so nothing has to be illustrated or maintained',
    'Strike-throughs give five small payoffs in one pass',
    'Names the five jobs an integrator currently does, which is persuasive detail',
  ],
  cons: [
    'Deliberately breaks the dark treatment that makes this cell the best-looking one',
    'A struck-out list is a device used elsewhere on the site',
    'Five lines of type is the most reading in this cell',
  ],
  scores: { story: 5, motion: 3, perf: 5, mobile: 4, brand: 2, ease: 5 },
  build: (uid) => {
    const dur = 11;
    const steps = [
      ['Unbox the device at the depot', 300],
      ['Fit the correct regional SIM', 294],
      ['Record the IMSI against the asset', 336],
      ['Wait for the carrier to activate', 318],
      ['Ship it, and hope it attaches', 296],
    ];
    const inner = `
    <rect width="740" height="234" fill="${WHITE}"/>
    ${dotsW(uid)}
    ${bloomC(230, 117, 200, uid)}
    ${mono(32, 30, 'THE PROVISIONING RUNBOOK, BEFORE', { size: 9, op: 0.42 })}
    ${steps.map(([t, w], i) => {
      const y = 60 + i * 34;
      const on = 0.1 + i * 0.09;
      return `<g>
        ${mono(32, y, `${i + 1}.`, { size: 9.5, op: 0.3 })}
        <text x="58" y="${y}" font-size="16.5" font-weight="600" fill="${INK}" opacity="0.68">${t}</text>
        <rect x="54" y="${Number(y) - 6}" width="0" height="2.2" rx="1.1" fill="${P.deep}">
          <animate attributeName="width" values="0;0;${w};${w}" keyTimes="0;${on.toFixed(3)};${(on + 0.06).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        </rect>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.6;0.7;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(440, 56, 272, 122, { r: 16, fill: P.wash, stroke: P.main, sw: 2.5 })}
      ${mono(468, 90, 'THE RUNBOOK, AFTER', { size: 8.5, op: 0.5, fill: P.deep })}
      <text x="468" y="142" font-size="38" font-weight="800" fill="${INK}">Power on.</text>
      ${mono(468, 164, 'THAT IS THE WHOLE PROCEDURE', { size: 8, op: 0.42 })}
    </g>
    ${mono(32, 216, 'NO DEPOT STEP \u00b7 NO IMSI RECORD \u00b7 NO ACTIVATION WAIT \u00b7 NO FIELD VISIT', { size: 9, op: 0.38 })}`;
    return { svg: wrapW(inner), pills: noPills };
  },
};

/* ── registries ── */
export const C1_VARIANTS = [c1Current, c1Inventory, c1Conveyor, c1Strip, c1Ticks, c1Customs, c1Shelf, c1OneSku, c1Truck, c1Coverage,
  c1Recall, c1Sentence, c1Api, c1Ports, c1Cost, c1Label];
export const C2_VARIANTS = [c2Current, c2Tray, c2Space, c2Solder, c2Section, c2Pins, c2Shake, c2Grain, c2Sealed, c2Room,
  c2Vibration, c2Layout, c2Patch, c2Three, c2Steps, c2Macro];
export const C3_VARIANTS = [c3Current, c3NightSide, c3Wave, c3Ledger, c3Timeline, c3PowerOn, c3Odometer, c3Fleet, c3TheSwitch, c3ColdStart,
  c3TheDay, c3Bid, c3Drives, c3Boxed, c3Nothing, c3Runbook];
