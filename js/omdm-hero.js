/* ─────────────────────────────────────────────────────────────────────────
   /omdm-market — hero scene, drawn to the real measured box: 576 x 460.

   Option 0 replicates what ships today: a static order-book panel on the
   site's orange brand surface. Options 1–5 are Direction A (INST,
   institutional navy). Options 6–10 are Direction B (FIN, fintech-clean).
   Both directions are documented in STYLE-OMDM.md.
   ───────────────────────────────────────────────────────────────────────── */
import { boxWrap, INST, FIN, TONES, GOLD, GOLD_SOFT, UP, DOWN, INK, WHITE, GRAY, LINE } from './kit.js';

const W = 576;
const H = 460;
const wB = boxWrap(W, H);
const MO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const noPills = [];
/* soft ambient lift — a flat circle shows its edge when the stage crops it */
let _gid = 0;
const glow = (cx, cy, r, op = 0.5) => {
  const id = `gl${_gid++}`;
  return `<defs><radialGradient id="${id}" cx="50%" cy="50%" r="50%">` +
    `<stop offset="0" stop-color="${INST.rise}" stop-opacity="${op}"/>` +
    `<stop offset="0.55" stop-color="${INST.rise}" stop-opacity="${(op * 0.45).toFixed(3)}"/>` +
    `<stop offset="1" stop-color="${INST.rise}" stop-opacity="0"/></radialGradient></defs>` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id})"/>`;
};


/* text helper — `m` for monospace, `a` for anchor, `ls` for letter-spacing */
const t = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}"${o.m ? ` font-family="${MO}"` : ''} font-size="${o.size || 11}"` +
  ` font-weight="${o.w || 400}" fill="${o.fill || '#fff'}" opacity="${o.op == null ? 1 : o.op}"` +
  ` text-anchor="${o.a || 'start'}"${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${s}</text>`;

/* uppercase tracked micro-label */
const lab = (x, y, s, fill, o = {}) =>
  t(x, y, s, { m: true, size: o.size || 9, ls: o.ls || 1.4, fill, a: o.a, op: o.op });

const rect = (x, y, w, h, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r == null ? 4 : o.r}"` +
  ` fill="${o.fill || 'none'}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 1}"` : ''}` +
  `${o.op == null ? '' : ` opacity="${o.op}"`}/>`;

/* a slow continuous opacity pulse — markets do not ease-out */
const pulse = (dur, from = 0.35, to = 1) =>
  `<animate attributeName="opacity" values="${from};${to};${from}" keyTimes="0;0.5;1"` +
  ` dur="${dur}s" repeatCount="indefinite"/>`;

/* a number that reprices: steps through `vals` on a slow cycle */
const repricing = (x, y, vals, o = {}) => {
  const n = vals.length;
  const kt = vals.map((_, i) => (i / n).toFixed(4)).concat('1').join(';');
  return `<text x="${x}" y="${y}" font-family="${MO}" font-size="${o.size || 12}" font-weight="${o.w || 500}"` +
    ` fill="${o.fill || '#fff'}" text-anchor="${o.a || 'end'}">` +
    `<animate attributeName="opacity" values="${vals.map(() => '1').join(';')};1" keyTimes="${kt}"` +
    ` dur="${o.dur || 8}s" repeatCount="indefinite" calcMode="discrete"/>` +
    vals.map((v, i) =>
      `<tspan x="${x}" opacity="0">${v}` +
      `<animate attributeName="opacity" values="${vals.map((_, j) => (j === i ? '1' : '0')).join(';')};${i === 0 ? '1' : '0'}"` +
      ` keyTimes="${kt}" dur="${o.dur || 8}s" repeatCount="indefinite" calcMode="discrete"/></tspan>`
    ).join('') + '</text>';
};

/* dotted ground used by the live orange panel */
const dotted = (fill, op) => `
  <defs><pattern id="odg" width="16" height="16" patternUnits="userSpaceOnUse">
    <circle cx="1.5" cy="1.5" r="1.1" fill="${fill}" opacity="${op}"/></pattern></defs>
  <rect width="${W}" height="${H}" fill="url(#odg)"/>`;

/* ══════════════════════════════════════════════════════════════════════════
   OPTION 0 — the panel as it ships today
   ══════════════════════════════════════════════════════════════════════════ */
const ROWS0 = [
  ['JP · Tier-1', '0.84', '0.91', '-6.2%', 0.42, false],
  ['DE · Tier-1', '0.61', '0.66', '+2.4%', 0.68, true],
  ['US · Tier-1', '0.72', '0.79', '-3.1%', 0.55, false],
  ['BR · Tier-2', '1.14', '1.25', '+5.8%', 0.33, false],
];

export const heroCurrent = {
  id: 'om-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'A static book on an orange ground',
  desc:
    'What ships now. The panel is well composed — the column order is right and the ' +
    'depth bars are a good idea — but nothing moves, so a page whose whole argument is ' +
    '"prices change continuously" proves the opposite. The orange also makes a wholesale ' +
    'venue read like a consumer travel page.',
  pros: ['Correct column order', 'Tier naming is clear', 'Depth bars already present'],
  cons: ['Entirely static', 'Consumer-brand orange on an institutional product', 'One decimal of story'],
  scores: { story: 2, motion: 1, perf: 5, mobile: 4, brand: 3, ease: 5 },
  build: () => ({
    pills: noPills,
    svg: wB(`
      <rect width="${W}" height="${H}" fill="#FFFDFB"/>
      ${dotted(TONES.orange.main, 0.1)}
      <circle cx="${W - 90}" cy="${H - 70}" r="120" fill="${TONES.orange.main}" opacity="0.07"/>
      <circle cx="82" cy="${H - 40}" r="90" fill="${TONES.orange.main}" opacity="0.05"/>

      <circle cx="30" cy="${58}" r="4" fill="${UP}"/>
      ${lab(42, 62, 'OMDM · LIVE BOOK', INK, { size: 10 })}
      ${lab(W - 26, 62, 'USD / GB', GRAY, { size: 9, a: 'end' })}

      <rect x="26" y="80" width="${W - 52}" height="152" rx="6" fill="${WHITE}" stroke="${INK}" stroke-width="2"/>
      ${lab(40, 100, 'ROUTE', GRAY)}
      ${lab(250, 100, 'BID', GRAY, { a: 'end' })}
      ${lab(320, 100, 'ASK', GRAY, { a: 'end' })}
      ${lab(400, 100, 'CHG', GRAY, { a: 'end' })}
      ${lab(430, 100, 'DEPTH', GRAY)}
      ${ROWS0.map(([route, bid, ask, chg, depth, hot], i) => {
        const y = 118 + i * 28;
        return `
        ${hot ? rect(28, y - 2, W - 56, 26, { fill: TONES.orange.wash, r: 3 }) : ''}
        ${t(40, y + 15, route, { size: 11, w: 600, fill: INK })}
        ${t(250, y + 15, bid, { m: true, size: 11, a: 'end', fill: hot ? INK : GRAY, w: hot ? 600 : 400 })}
        ${t(320, y + 15, ask, { m: true, size: 11, a: 'end', fill: hot ? INK : GRAY, w: hot ? 600 : 400 })}
        ${t(400, y + 15, chg, { m: true, size: 11, a: 'end', fill: chg[0] === '+' ? UP : DOWN })}
        ${rect(430, y + 8, 112, 4, { fill: LINE, r: 2 })}
        ${rect(430, y + 8, 112 * depth, 4, { fill: TONES.orange.main, r: 2 })}`;
      }).join('')}

      ${['QoS', 'risk', 'liquidity', 'KYB', 'tier'].map((c, i) => {
        const x = 150 + i * 58;
        return `${rect(x, 248, 54, 18, { fill: WHITE, stroke: LINE, r: 9 })}
          <circle cx="${x + 10}" cy="257" r="2.6" fill="${TONES.orange.main}" opacity="${i === 3 ? 1 : 0.5}"/>
          ${t(x + 17, 261, c, { m: true, size: 8, fill: INK, op: 0.7 })}`;
      }).join('')}
      ${lab(W / 2, 320, 'NOTHING ON THIS PANEL MOVES', GRAY, { a: 'middle', op: 0.55 })}`),
  }),
};

/* ══════════════════════════════════════════════════════════════════════════
   DIRECTION A — INST (institutional navy)
   ══════════════════════════════════════════════════════════════════════════ */

/* A1 ── The Book */
const ROWS_A = [
  ['JP · Tier-1', ['0.84', '0.83', '0.85', '0.84'], ['0.91', '0.90', '0.92', '0.91'], '-6.2%', 0.42],
  ['DE · Tier-1', ['0.61', '0.62', '0.61', '0.63'], ['0.66', '0.67', '0.66', '0.68'], '+2.4%', 0.68],
  ['US · Tier-1', ['0.72', '0.71', '0.72', '0.70'], ['0.79', '0.78', '0.79', '0.77'], '-3.1%', 0.55],
  ['SG · Tier-1', ['0.58', '0.59', '0.58', '0.60'], ['0.63', '0.64', '0.63', '0.65'], '+1.1%', 0.61],
  ['BR · Tier-2', ['1.14', '1.16', '1.15', '1.14'], ['1.25', '1.27', '1.26', '1.25'], '+5.8%', 0.33],
];

export const theBook = {
  id: 'om-book',
  name: 'The Book',
  family: 'A · institutional',
  tagline: 'The order book, actually quoting',
  desc:
    'The live panel rebuilt on the navy surface and given the one thing it lacks: ' +
    'movement. Five routes carry a bid and an ask that reprice on a slow continuous ' +
    'cycle, depth bars breathe with the size behind each price, and the clock in the ' +
    'corner advances. Gold marks only the route currently being requoted. It is the ' +
    'most literal reading of "priced like a market" and the easiest to defend.',
  pros: ['Proves the core claim directly', 'Reads instantly to anyone who has seen a terminal', 'Reuses the column order already on the page'],
  cons: ['Least surprising of the five', 'Needs real numbers to avoid looking like a mock'],
  scores: { story: 5, motion: 4, perf: 4, mobile: 3, brand: 5, ease: 4 },
  build: () => ({
    pills: noPills,
    svg: wB(`
      ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
      ${glow(`90`, `20`, `180`, 0.8)}
      <circle cx="30" cy="40" r="4" fill="${INST.up}">${pulse(2.4, 0.4, 1)}</circle>
      ${lab(42, 44, 'OMDM · LIVE BOOK', INST.text, { size: 10 })}
      ${lab(W - 26, 44, 'USD / GB', INST.faint, { a: 'end' })}

      ${rect(26, 62, W - 52, 26, { fill: INST.panel, r: 4 })}
      ${lab(40, 79, 'ROUTE', INST.faint)}
      ${lab(268, 79, 'BID', INST.faint, { a: 'end' })}
      ${lab(340, 79, 'ASK', INST.faint, { a: 'end' })}
      ${lab(412, 79, 'CHG', INST.faint, { a: 'end' })}
      ${lab(436, 79, 'DEPTH', INST.faint)}

      ${ROWS_A.map(([route, bids, asks, chg, depth], i) => {
        const y = 96 + i * 46;
        const beg = (i * 1.6).toFixed(1);
        return `
        <g>
          ${rect(26, y, W - 52, 40, { fill: i % 2 ? 'rgba(255,255,255,0.02)' : 'none', r: 4 })}
          ${rect(26, y, W - 52, 40, { fill: INST.goldDim, r: 4, op: 0 })}
          <rect x="26" y="${y}" width="${W - 52}" height="40" rx="4" fill="${INST.gold}" opacity="0">
            <animate attributeName="opacity" values="0;0.10;0;0" keyTimes="0;0.06;0.16;1"
              dur="8s" begin="${beg}s" repeatCount="indefinite"/></rect>
          <rect x="26" y="${y}" width="2" height="40" fill="${INST.gold}" opacity="0">
            <animate attributeName="opacity" values="0;1;0;0" keyTimes="0;0.06;0.2;1"
              dur="8s" begin="${beg}s" repeatCount="indefinite"/></rect>

          ${t(40, y + 24, route, { size: 11.5, w: 600, fill: INST.text })}
          ${repricing(268, y + 24, bids, { fill: INST.up, size: 12.5, w: 500, dur: 8 })}
          ${repricing(340, y + 24, asks, { fill: INST.down, size: 12.5, w: 500, dur: 8 })}
          ${t(412, y + 24, chg, { m: true, size: 11, a: 'end', fill: chg[0] === '+' ? INST.up : INST.down })}
          ${rect(436, y + 17, 104, 5, { fill: 'rgba(255,255,255,0.08)', r: 2.5 })}
          <rect x="436" y="${y + 17}" width="${(104 * depth).toFixed(0)}" height="5" rx="2.5" fill="${INST.gold}" opacity="0.75">
            <animate attributeName="width"
              values="${(104 * depth).toFixed(0)};${(104 * depth * 0.72).toFixed(0)};${(104 * depth).toFixed(0)}"
              keyTimes="0;0.5;1" dur="${(5 + i * 0.7).toFixed(1)}s" repeatCount="indefinite"/></rect>
        </g>`;
      }).join('')}

      ${rect(26, H - 44, W - 52, 1, { fill: INST.line, r: 0 })}
      ${lab(40, H - 22, 'REPRICED', INST.faint)}
      ${repricing(120, H - 21, ['4s AGO', '1s AGO', '2s AGO', '0s AGO'], { fill: INST.dim, size: 10, a: 'start', dur: 8 })}
      ${lab(W - 26, H - 22, '109 SIGNALS FEEDING', INST.gold, { a: 'end', op: 0.85 })}`),
  }),
};

/* A2 ── Two Sides */
export const twoSides = {
  id: 'om-sides',
  name: 'Two Sides',
  family: 'A · institutional',
  tagline: 'Bid ladder, ask ladder, and the cross',
  desc:
    'A market needs someone on the other side, and this is the only option that shows ' +
    'both of them. Buyers stack up the left, sellers down the right, each rung sized by ' +
    'the capacity behind it. The spread narrows until the two sides meet, a trade prints ' +
    'in gold at the cross, and the ladders rebuild. It argues the participants section of ' +
    'the page inside the hero.',
  pros: ['Shows supply and demand, not just a price', 'The print is a genuine payoff moment', 'Distinct from every competitor hero'],
  cons: ['Needs a caption for a reader who has never seen a ladder', 'Busiest option in the set'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 2, brand: 5, ease: 3 },
  build: () => {
    const bidRungs = [[0.78, 0.9], [0.79, 0.72], [0.80, 0.55], [0.81, 0.38], [0.82, 0.22]];
    const askRungs = [[0.88, 0.85], [0.87, 0.68], [0.86, 0.5], [0.85, 0.34], [0.84, 0.2]];
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        ${glow(`${W / 2}`, `${H / 2}`, `150`, 0.55)}
        ${lab(30, 40, 'JP · TIER-1 · THE CROSS', INST.text, { size: 10 })}
        ${lab(W - 26, 40, 'USD / GB', INST.faint, { a: 'end' })}

        ${lab(30, 72, 'BIDS', INST.up, { size: 9.5 })}
        ${lab(W - 26, 72, 'ASKS', INST.down, { size: 9.5, a: 'end' })}

        ${bidRungs.map(([px, sz], i) => {
          const y = 88 + i * 34;
          const w = 168 * sz;
          return `<g>
            <rect x="${196 - w}" y="${y}" width="${w}" height="22" rx="3" fill="${INST.up}" opacity="0.26">
              <animate attributeName="width" values="${w.toFixed(0)};${(w * 0.74).toFixed(0)};${w.toFixed(0)}"
                keyTimes="0;0.5;1" dur="${(4.5 + i * 0.6).toFixed(1)}s" repeatCount="indefinite"/></rect>
            ${t(190, y + 16, px.toFixed(2), { m: true, size: 12, a: 'end', fill: INST.text, w: 500 })}
            ${lab(24, y + 16, (sz * 40).toFixed(0) + ' TB', INST.faint, { size: 8.5 })}
          </g>`;
        }).join('')}

        ${askRungs.map(([px, sz], i) => {
          const y = 88 + i * 34;
          const w = 168 * sz;
          return `<g>
            <rect x="${W - 196}" y="${y}" width="${w}" height="22" rx="3" fill="${INST.down}" opacity="0.26">
              <animate attributeName="width" values="${w.toFixed(0)};${(w * 0.74).toFixed(0)};${w.toFixed(0)}"
                keyTimes="0;0.5;1" dur="${(5 + i * 0.5).toFixed(1)}s" repeatCount="indefinite"/></rect>
            ${t(W - 190, y + 16, px.toFixed(2), { m: true, size: 12, fill: INST.text, w: 500 })}
            ${lab(W - 24, y + 16, (sz * 40).toFixed(0) + ' TB', INST.faint, { size: 8.5, a: 'end' })}
          </g>`;
        }).join('')}

        <line x1="${W / 2}" y1="80" x2="${W / 2}" y2="272" stroke="${INST.line}" stroke-width="1" stroke-dasharray="3 4"/>

        <g>
          ${rect(W / 2 - 74, 296, 148, 46, { fill: INST.panel, r: 6, stroke: INST.gold, sw: 1 })}
          ${lab(W / 2, 314, 'PRINTED', INST.gold, { a: 'middle', size: 9 })}
          ${t(W / 2, 334, '0.83', { m: true, size: 19, w: 600, a: 'middle', fill: INST.text })}
          <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.44;0.5;0.78;0.86;1"
            dur="9s" repeatCount="indefinite"/>
        </g>
        <g opacity="0">
          ${lab(W / 2, 320, 'SPREAD NARROWING', INST.dim, { a: 'middle', size: 9 })}
          <animate attributeName="opacity" values="1;1;0;0;1;1" keyTimes="0;0.4;0.5;0.8;0.88;1"
            dur="9s" repeatCount="indefinite"/>
        </g>

        ${rect(26, H - 40, W - 52, 1, { fill: INST.line, r: 0 })}
        ${lab(W / 2, H - 18, 'A MARKET ONLY WORKS IF SOMEONE IS ON THE OTHER SIDE', INST.faint, { a: 'middle', size: 8.5 })}`),
    };
  },
};

/* A3 ── The Tape */
export const theTape = {
  id: 'om-tape',
  name: 'The Tape',
  family: 'A · institutional',
  tagline: 'The record of what actually traded',
  desc:
    'Not quotes — prints. A vertical tape of completed trades scrolls upward, each line ' +
    'carrying route, size, price, counterparty class and a settlement reference. Quotes are ' +
    'a promise; a tape is evidence, and it doubles as proof of the audit claim further down ' +
    'the page. The quietest option here and probably the most credible.',
  pros: ['Evidence rather than assertion', 'Supports the audit section for free', 'Very cheap to run'],
  cons: ['No price discovery shown', 'Reads as a log unless the typography is right'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 4, brand: 5, ease: 5 },
  build: () => {
    const prints = [
      ['14:22:07', 'JP · T1', '2.4 TB', '0.83', 'MVNO', 'a91f'],
      ['14:22:04', 'DE · T1', '8.0 TB', '0.62', 'MNO', '7c02'],
      ['14:21:58', 'US · T1', '1.2 TB', '0.72', 'IOT', 'd4b8'],
      ['14:21:51', 'SG · T1', '5.6 TB', '0.59', 'MVNO', '31e7'],
      ['14:21:44', 'BR · T2', '0.8 TB', '1.15', 'RESELL', '9a55'],
      ['14:21:36', 'GB · T1', '12.0 TB', '0.54', 'MNO', 'b60c'],
      ['14:21:29', 'FR · T1', '3.1 TB', '0.57', 'MVNO', '2f81'],
    ];
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        ${glow(`${W - 40}`, `30`, `150`, 0.5)}
        <circle cx="30" cy="40" r="4" fill="${INST.up}">${pulse(2.2, 0.35, 1)}</circle>
        ${lab(42, 44, 'OMDM · THE TAPE', INST.text, { size: 10 })}
        ${lab(W - 26, 44, 'SETTLED PRINTS', INST.faint, { a: 'end' })}

        ${rect(26, 60, W - 52, 20, { fill: 'none', r: 0 })}
        ${lab(40, 74, 'TIME', INST.faint, { size: 8.5 })}
        ${lab(112, 74, 'ROUTE', INST.faint, { size: 8.5 })}
        ${lab(258, 74, 'SIZE', INST.faint, { size: 8.5, a: 'end' })}
        ${lab(330, 74, 'PRICE', INST.faint, { size: 8.5, a: 'end' })}
        ${lab(360, 74, 'COUNTERPARTY', INST.faint, { size: 8.5 })}
        ${lab(W - 26, 74, 'REF', INST.faint, { size: 8.5, a: 'end' })}
        <line x1="26" y1="82" x2="${W - 26}" y2="82" stroke="${INST.line}"/>

        <clipPath id="om-tape-clip"><rect x="26" y="86" width="${W - 52}" height="300"/></clipPath>
        <g clip-path="url(#om-tape-clip)">
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 42;0 -252;0 -252"
              keyTimes="0;0.92;1" dur="16s" repeatCount="indefinite"/>
            ${prints.concat(prints).map(([tm, rt, sz, px, cp, ref], i) => {
              const y = 86 + i * 42;
              return `<g>
                ${rect(26, y, W - 52, 36, { fill: i % 2 ? 'rgba(255,255,255,0.025)' : 'none', r: 3 })}
                ${t(40, y + 23, tm, { m: true, size: 10, fill: INST.faint })}
                ${t(112, y + 23, rt, { size: 11, w: 600, fill: INST.text })}
                ${t(258, y + 23, sz, { m: true, size: 10.5, a: 'end', fill: INST.dim })}
                ${t(330, y + 23, px, { m: true, size: 12.5, w: 600, a: 'end', fill: INST.gold })}
                ${rect(360, y + 11, 62, 15, { fill: 'rgba(255,255,255,0.05)', r: 3 })}
                ${lab(366, y + 22, cp, INST.dim, { size: 8 })}
                ${t(W - 26, y + 23, ref, { m: true, size: 10, a: 'end', fill: INST.faint })}
              </g>`;
            }).join('')}
          </g>
        </g>
        <rect x="26" y="86" width="${W - 52}" height="34" fill="url(#om-tape-fade)"/>
        <defs><linearGradient id="om-tape-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${INST.ground}" stop-opacity="0.95"/>
          <stop offset="1" stop-color="${INST.ground}" stop-opacity="0"/></linearGradient></defs>

        <line x1="26" y1="392" x2="${W - 26}" y2="392" stroke="${INST.line}"/>
        ${lab(40, 414, 'EVERY ACTION LEAVES A RECORD', INST.dim, { size: 9 })}
        ${lab(W - 26, 414, '190+ COUNTRIES', INST.gold, { size: 9, a: 'end', op: 0.85 })}`),
    };
  },
};

/* A4 ── Repricing Clock */
export const repricingClock = {
  id: 'om-clock',
  name: 'The Repricing Clock',
  family: 'A · institutional',
  tagline: 'A hundred signals, one price',
  desc:
    'One route, one price plate in gold, and the six signal families arranged around it. ' +
    'Each family lights in turn, sends a pulse inward, and the price recomputes when it ' +
    'lands — so the number visibly is the output of the signals rather than a figure ' +
    'someone typed. This is the hero that sets up "what moves a price on OMDM" directly ' +
    'below it.',
  pros: ['Explains the mechanism, not just the result', 'Hands off cleanly to the next section', 'Strong single focal point'],
  cons: ['Abstract — no route or counterparty detail', 'Radial layouts are harder to make feel institutional'],
  scores: { story: 5, motion: 4, perf: 4, mobile: 4, brand: 4, ease: 4 },
  build: () => {
    const fams = [
      ['QUALITY OF SERVICE', 31], ['GEOPOLITICAL RISK', 18], ['PRICING & SPREAD', 24],
      ['LIQUIDITY', 12], ['COMPLIANCE', 15], ['TIER & STANDING', 9],
    ];
    const cx = W / 2, cy = 236, R = 148;
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        ${glow(`${cx}`, `${cy}`, `${R + 30}`, 0.4)}
        ${lab(30, 40, 'JP · TIER-1 · CONTINUOUS REPRICING', INST.text, { size: 10 })}
        ${lab(W - 26, 40, 'USD / GB', INST.faint, { a: 'end' })}

        <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${INST.line}" stroke-dasharray="2 5"/>

        ${fams.map(([nm, n], i) => {
          const a = (-90 + i * 60) * Math.PI / 180;
          const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
          const beg = (i * 1.5).toFixed(2);
          const anchor = Math.abs(Math.cos(a)) < 0.3 ? 'middle' : (Math.cos(a) > 0 ? 'start' : 'end');
          const ox = anchor === 'start' ? 16 : anchor === 'end' ? -16 : 0;
          return `<g>
            <line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${cx}" y2="${cy}"
              stroke="${INST.gold}" stroke-width="1" opacity="0">
              <animate attributeName="opacity" values="0;0.5;0;0" keyTimes="0;0.06;0.2;1"
                dur="9s" begin="${beg}s" repeatCount="indefinite"/></line>
            <circle r="3.4" fill="${INST.gold}" opacity="0">
              <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.04;0.16;0.2;1"
                dur="9s" begin="${beg}s" repeatCount="indefinite"/>
              <animateMotion dur="9s" begin="${beg}s" repeatCount="indefinite"
                keyTimes="0;0.18;1" keyPoints="0;1;1" calcMode="linear"
                path="M ${x.toFixed(1)} ${y.toFixed(1)} L ${cx} ${cy}"/></circle>
            <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="${INST.panel}" stroke="${INST.lineHard}"/>
            <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="${INST.gold}" opacity="0">
              <animate attributeName="opacity" values="0;1;0;0" keyTimes="0;0.05;0.18;1"
                dur="9s" begin="${beg}s" repeatCount="indefinite"/></circle>
            ${lab(x + ox, y + (anchor === 'middle' ? (Math.sin(a) < 0 ? -16 : 24) : 4), nm, INST.dim, { size: 8, a: anchor })}
            ${t(x + ox, y + (anchor === 'middle' ? (Math.sin(a) < 0 ? -4 : 36) : 17), n + ' signals',
              { m: true, size: 8.5, fill: INST.faint, a: anchor })}
          </g>`;
        }).join('')}

        ${rect(cx - 74, cy - 40, 148, 80, { fill: INST.panel, r: 8, stroke: INST.goldDim })}
        ${lab(cx, cy - 20, 'MID', INST.faint, { a: 'middle', size: 8.5 })}
        ${repricing(cx + 44, cy + 12, ['0.87', '0.86', '0.88', '0.87', '0.89', '0.88'],
          { fill: INST.gold, size: 30, w: 600, dur: 9 })}
        ${lab(cx, cy + 30, 'RECOMPUTED CONTINUOUSLY', INST.faint, { a: 'middle', size: 7.5 })}

        ${lab(W / 2, H - 20, '109 SIGNALS IN SIX FAMILIES FEED EVERY QUOTE', INST.dim, { a: 'middle', size: 9 })}`),
    };
  },
};

/* A5 ── Rate Card vs Market */
export const rateCardVsMarket = {
  id: 'om-guess',
  name: 'A Guess and an Answer',
  family: 'A · institutional',
  tagline: 'The rate card frozen beside the live mid',
  desc:
    'The page already has the best line on the site — "a rate card is a guess, a market is ' +
    'an answer" — and nothing draws it. A flat annual rate card sits as a dead horizontal ' +
    'rule while the market mid moves beneath it, and the gap between the two fills in as ' +
    'money left on the table. It is the most commercially pointed option: the animation is ' +
    'the argument for buying.',
  pros: ['Draws the strongest line of copy on the page', 'Quantifies the benefit in one gap', 'Immediately legible to a CFO'],
  cons: ['Comparative claims invite scrutiny of the numbers', 'Less "venue", more "pitch"'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: () => {
    const pts = [0.62, 0.58, 0.55, 0.6, 0.52, 0.48, 0.5, 0.44, 0.47, 0.41, 0.38, 0.42, 0.36, 0.33, 0.35, 0.3];
    const x0 = 56, x1 = W - 40, yTop = 110, yBot = 330;
    const sx = (i) => x0 + (x1 - x0) * (i / (pts.length - 1));
    const sy = (v) => yBot - (yBot - yTop) * v;
    const card = sy(0.62);
    const line = pts.map((v, i) => `${i ? 'L' : 'M'} ${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(' ');
    const area = `${line} L ${sx(pts.length - 1).toFixed(1)} ${card} L ${x0} ${card} Z`;
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        ${glow(`120`, `30`, `170`, 0.45)}
        ${lab(30, 40, 'DE · TIER-1 · TWELVE MONTHS', INST.text, { size: 10 })}
        ${lab(W - 26, 40, 'USD / GB', INST.faint, { a: 'end' })}

        ${[0, 0.25, 0.5, 0.75, 1].map(f =>
          `<line x1="${x0}" y1="${sy(f).toFixed(1)}" x2="${x1}" y2="${sy(f).toFixed(1)}"
            stroke="${INST.line}" stroke-dasharray="2 6"/>`).join('')}

        <path d="${area}" fill="${INST.gold}" opacity="0">
          <animate attributeName="opacity" values="0;0.16;0.16" keyTimes="0;0.55;1" dur="9s" repeatCount="indefinite"/></path>

        <line x1="${x0}" y1="${card.toFixed(1)}" x2="${x1}" y2="${card.toFixed(1)}"
          stroke="${INST.down}" stroke-width="2" stroke-dasharray="7 5"/>
        ${lab(x0, card - 12, 'ANNUAL RATE CARD — SET ONCE, NEVER REVISITED', INST.down, { size: 8.5, op: 0.9 })}

        <path d="${line}" fill="none" stroke="${INST.up}" stroke-width="2.4" stroke-linecap="round"
          pathLength="1" stroke-dasharray="1" stroke-dashoffset="1">
          <animate attributeName="stroke-dashoffset" values="1;0;0" keyTimes="0;0.55;1"
            dur="9s" repeatCount="indefinite"/></path>
        <circle r="4.5" fill="${INST.up}">
          <animateMotion dur="9s" repeatCount="indefinite" keyTimes="0;0.55;1" keyPoints="0;1;1"
            calcMode="linear" path="${line}"/></circle>

        ${lab(x1, sy(0.3) + 22, 'OMDM MID — REPRICED CONTINUOUSLY', INST.up, { size: 8.5, a: 'end' })}

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.6;0.72;1" dur="9s" repeatCount="indefinite"/>
          ${rect(W / 2 - 96, 356, 192, 52, { fill: INST.panel, r: 8, stroke: INST.goldDim })}
          ${lab(W / 2, 374, 'LEFT ON THE TABLE', INST.faint, { a: 'middle', size: 8.5 })}
          ${t(W / 2, 398, '31%', { m: true, size: 22, w: 600, a: 'middle', fill: INST.gold })}
        </g>
        ${lab(40, H - 16, 'A RATE CARD IS A GUESS. A MARKET IS AN ANSWER.', INST.dim, { size: 9 })}`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   DIRECTION B — FIN (fintech-clean)
   ══════════════════════════════════════════════════════════════════════════ */

const finShadow = `<defs><filter id="om-fs" x="-20%" y="-20%" width="140%" height="140%">
  <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#0F172A" flood-opacity="0.07"/>
  </filter></defs>`;

/* B1 ── Quote Card */
export const quoteCard = {
  id: 'om-quote',
  name: 'The Quote Card',
  family: 'B · fintech-clean',
  tagline: 'One route, one live price, one action',
  desc:
    'The light-surface counterpart to The Book, and the opposite bet: instead of showing ' +
    'the whole venue, show one quote well. A single white card carries the route, a live ' +
    'bid and ask, a sparkline and a countdown to the next reprice. Calm, obviously ' +
    'credible, and the easiest of all eleven to build and to make work on a phone.',
  pros: ['Cleanest and most legible option overall', 'Works at any width', 'Cheapest to implement'],
  cons: ['Shows a price, not a market', 'Could belong to any fintech product'],
  scores: { story: 3, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: () => {
    const spark = [0.5, 0.56, 0.48, 0.62, 0.55, 0.68, 0.6, 0.72, 0.65, 0.78, 0.7, 0.82];
    const px0 = 76, px1 = W - 76, py0 = 314, py1 = 264;
    const sx = (i) => px0 + (px1 - px0) * (i / (spark.length - 1));
    const sy = (v) => py0 - (py0 - py1) * v;
    const path = spark.map((v, i) => `${i ? 'L' : 'M'} ${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(' ');
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${finShadow}
        <g filter="url(#om-fs)">
          ${rect(48, 60, W - 96, 340, { fill: FIN.panel, r: 16, stroke: FIN.line })}
        </g>
        <circle cx="76" cy="94" r="4" fill="${FIN.up}">${pulse(2.4, 0.4, 1)}</circle>
        ${lab(88, 98, 'LIVE QUOTE', FIN.faint, { size: 9 })}
        ${lab(W - 76, 98, 'USD / GB', FIN.faint, { size: 9, a: 'end' })}

        ${t(76, 142, 'Japan · Tier-1', { size: 21, w: 700, fill: FIN.text })}
        ${t(76, 164, 'NTT Docomo, KDDI, SoftBank', { size: 11, fill: FIN.dim })}

        ${rect(76, 184, 180, 62, { fill: FIN.rise, r: 10 })}
        ${lab(92, 204, 'BID', FIN.faint, { size: 8.5 })}
        ${repricing(240, 232, ['0.84', '0.83', '0.85', '0.84'], { fill: FIN.up, size: 26, w: 700, dur: 8 })}

        ${rect(268, 184, 180, 62, { fill: FIN.rise, r: 10 })}
        ${lab(284, 204, 'ASK', FIN.faint, { size: 8.5 })}
        ${repricing(432, 232, ['0.91', '0.90', '0.92', '0.91'], { fill: FIN.down, size: 26, w: 700, dur: 8 })}

        ${[0, 0.5, 1].map(f => `<line x1="${px0}" y1="${sy(f).toFixed(1)}" x2="${px1}" y2="${sy(f).toFixed(1)}"
          stroke="${FIN.line}"/>`).join('')}
        <path d="${path}" fill="none" stroke="${FIN.accent}" stroke-width="2.4" stroke-linecap="round"
          pathLength="1" stroke-dasharray="1" stroke-dashoffset="1">
          <animate attributeName="stroke-dashoffset" values="1;0;0" keyTimes="0;0.7;1" dur="8s" repeatCount="indefinite"/></path>
        <circle r="4" fill="${FIN.accent}">
          <animateMotion dur="8s" repeatCount="indefinite" keyTimes="0;0.7;1" keyPoints="0;1;1"
            calcMode="linear" path="${path}"/></circle>

        ${lab(76, 334, 'LAST 24 HOURS', FIN.faint, { size: 8.5 })}
        ${lab(W - 76, 334, 'NEXT REPRICE IN', FIN.faint, { size: 8.5, a: 'end' })}
        ${repricing(W - 76, 374, ['0:08', '0:06', '0:04', '0:02'], { fill: FIN.text, size: 15, w: 600, dur: 8 })}

        ${rect(76, 350, 148, 32, { fill: FIN.accent, r: 8 })}
        ${t(150, 371, 'Request access', { size: 12, w: 600, a: 'middle', fill: '#FFFFFF' })}
        ${lab(W / 2, H - 22, '109 SIGNALS FEED THIS QUOTE', FIN.faint, { a: 'middle', size: 9 })}`),
    };
  },
};

/* B2 ── Board */
export const finBoard = {
  id: 'om-finboard',
  name: 'The Board',
  family: 'B · fintech-clean',
  tagline: 'The book, on white',
  desc:
    'A direct A/B against option 1: identical information, opposite surface. Zebra rows, ' +
    'soft indigo depth bars, one accent, no gold, and far more air between the numbers. ' +
    'Useful precisely because it isolates the surface question — if this reads as credible ' +
    'as the navy version, the page does not need to go dark at all.',
  pros: ['Isolates the surface decision cleanly', 'Lighter page feels faster', 'Consistent with the rest of the site'],
  cons: ['Less venue authority than the navy', 'White tables are a crowded look in fintech'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 3, ease: 5 },
  build: () => ({
    pills: noPills,
    svg: wB(`
      ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
      ${finShadow}
      <g filter="url(#om-fs)">${rect(32, 56, W - 64, 348, { fill: FIN.panel, r: 16, stroke: FIN.line })}</g>
      <circle cx="58" cy="88" r="4" fill="${FIN.up}">${pulse(2.4, 0.4, 1)}</circle>
      ${lab(70, 92, 'OMDM · LIVE BOOK', FIN.text, { size: 9.5 })}
      ${lab(W - 58, 92, 'USD / GB', FIN.faint, { size: 9, a: 'end' })}

      <line x1="58" y1="106" x2="${W - 58}" y2="106" stroke="${FIN.line}"/>
      ${lab(58, 126, 'ROUTE', FIN.faint, { size: 8.5 })}
      ${lab(272, 126, 'BID', FIN.faint, { size: 8.5, a: 'end' })}
      ${lab(340, 126, 'ASK', FIN.faint, { size: 8.5, a: 'end' })}
      ${lab(404, 126, 'CHG', FIN.faint, { size: 8.5, a: 'end' })}
      ${lab(424, 126, 'DEPTH', FIN.faint, { size: 8.5 })}

      ${ROWS_A.map(([route, bids, asks, chg, depth], i) => {
        const y = 138 + i * 46;
        const beg = (i * 1.6).toFixed(1);
        return `<g>
          ${i % 2 ? rect(44, y, W - 88, 40, { fill: FIN.rise, r: 8 }) : ''}
          <rect x="44" y="${y}" width="${W - 88}" height="40" rx="8" fill="${FIN.accentSoft}" opacity="0">
            <animate attributeName="opacity" values="0;1;0;0" keyTimes="0;0.06;0.18;1"
              dur="8s" begin="${beg}s" repeatCount="indefinite"/></rect>
          ${t(58, y + 25, route, { size: 11.5, w: 600, fill: FIN.text })}
          ${repricing(272, y + 25, bids, { fill: FIN.up, size: 12.5, w: 600, dur: 8 })}
          ${repricing(340, y + 25, asks, { fill: FIN.down, size: 12.5, w: 600, dur: 8 })}
          ${t(404, y + 25, chg, { m: true, size: 11, a: 'end', fill: chg[0] === '+' ? FIN.up : FIN.down })}
          ${rect(424, y + 18, 98, 5, { fill: FIN.line, r: 2.5 })}
          <rect x="424" y="${y + 18}" width="${(98 * depth).toFixed(0)}" height="5" rx="2.5" fill="${FIN.accent}" opacity="0.8">
            <animate attributeName="width"
              values="${(98 * depth).toFixed(0)};${(98 * depth * 0.72).toFixed(0)};${(98 * depth).toFixed(0)}"
              keyTimes="0;0.5;1" dur="${(5 + i * 0.7).toFixed(1)}s" repeatCount="indefinite"/></rect>
        </g>`;
      }).join('')}

      ${lab(58, H - 28, 'REPRICED', FIN.faint, { size: 9 })}
      ${repricing(132, H - 27, ['4s AGO', '1s AGO', '2s AGO', '0s AGO'], { fill: FIN.dim, size: 10, a: 'start', dur: 8 })}
      ${lab(W - 58, H - 28, '109 SIGNALS FEEDING', FIN.accent, { size: 9, a: 'end' })}`),
  }),
};

/* B3 ── The Gap */
export const theGap = {
  id: 'om-gap',
  name: 'The Gap',
  family: 'B · fintech-clean',
  tagline: 'What the rate card costs you, on white',
  desc:
    'The light-surface reading of the rate-card argument. A horizontal meter runs from the ' +
    'rate-card price down to the live market price, and the distance between the two ' +
    'handles is labelled in plain money. Less chart, more instrument — it works at a ' +
    'glance and survives being screenshotted into a deck.',
  pros: ['One idea, stated once, unmissable', 'Excellent on mobile', 'Screenshot-friendly for sales'],
  cons: ['Single-idea — no venue depth', 'The number needs to be defensible'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: () => {
    const x0 = 76, x1 = W - 76, y = 236;
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${finShadow}
        <g filter="url(#om-fs)">${rect(48, 96, W - 96, 268, { fill: FIN.panel, r: 16, stroke: FIN.line })}</g>
        ${lab(76, 134, 'DE · TIER-1 · WHAT YOU PAY', FIN.faint, { size: 9 })}
        ${t(76, 166, 'A rate card is a guess.', { size: 17, w: 700, fill: FIN.text })}

        ${rect(x0, y - 4, x1 - x0, 8, { fill: FIN.rise, r: 4 })}
        <rect x="${x0}" y="${y - 4}" width="0" height="8" rx="4" fill="${FIN.accent}" opacity="0.85">
          <animate attributeName="width" values="0;${(x1 - x0) * 0.62};${(x1 - x0) * 0.62}"
            keyTimes="0;0.5;1" dur="8s" repeatCount="indefinite"/></rect>

        <g>
          <circle cx="${x1}" cy="${y}" r="9" fill="${FIN.panel}" stroke="${FIN.down}" stroke-width="2.5"/>
          ${lab(x1, y - 26, 'RATE CARD', FIN.down, { size: 8.5, a: 'middle' })}
          ${t(x1, y + 34, '1.09', { m: true, size: 15, w: 700, a: 'middle', fill: FIN.text })}
        </g>
        <g>
          <circle cy="${y}" r="9" fill="${FIN.panel}" stroke="${FIN.accent}" stroke-width="2.5">
            <animate attributeName="cx" values="${x1};${x0 + (x1 - x0) * 0.62};${x0 + (x1 - x0) * 0.62}"
              keyTimes="0;0.5;1" dur="8s" repeatCount="indefinite"/></circle>
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.45;0.58;1" dur="8s" repeatCount="indefinite"/>
            ${lab(x0 + (x1 - x0) * 0.62, y - 26, 'OMDM MID', FIN.accent, { size: 8.5, a: 'middle' })}
            ${t(x0 + (x1 - x0) * 0.62, y + 34, '0.66', { m: true, size: 15, w: 700, a: 'middle', fill: FIN.text })}
          </g>
        </g>

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.6;0.74;1" dur="8s" repeatCount="indefinite"/>
          ${rect(x0 + (x1 - x0) * 0.62, y - 52, (x1 - x0) * 0.38, 20, { fill: FIN.accentSoft, r: 5 })}
          ${lab(x0 + (x1 - x0) * 0.81, y - 38, '39% OVERPAID', FIN.accent, { size: 9, a: 'middle' })}
          ${rect(76, 300, W - 152, 40, { fill: FIN.rise, r: 10 })}
          ${t(96, 326, 'A market is an answer — quoted, repriced and settled continuously.',
            { size: 11, fill: FIN.dim })}
        </g>
        ${lab(W / 2, H - 20, 'MEASURED ON DE · TIER-1 OVER TWELVE MONTHS', FIN.faint, { a: 'middle', size: 8.5 })}`),
    };
  },
};

/* B4 ── Six Families */
export const sixFamilies = {
  id: 'om-families',
  name: 'Six Families',
  family: 'B · fintech-clean',
  tagline: 'The signal stack, assembling a price',
  desc:
    'The clean-surface counterpart to The Repricing Clock, but linear rather than radial: ' +
    'six labelled signal bars stack upward, each contributing its share, and the composed ' +
    'price resolves at the top once the last one lands. A stack is easier to read than a ' +
    'ring and it maps one-to-one onto the six cards in the section below.',
  pros: ['Explains the mechanism with no jargon', 'Mirrors the six cards below it exactly', 'Very strong on mobile'],
  cons: ['Less atmospheric than the radial version', 'Bar charts are a familiar shape'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 3, ease: 4 },
  build: () => {
    const fams = [['Quality of service', 31, 0.9], ['Geopolitical & climate risk', 18, 0.56],
      ['Pricing & spread', 24, 0.74], ['Liquidity arrangements', 12, 0.44],
      ['Compliance & counterparty', 15, 0.5], ['Tier & standing', 9, 0.34]];
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${finShadow}
        <g filter="url(#om-fs)">${rect(40, 48, W - 80, 364, { fill: FIN.panel, r: 16, stroke: FIN.line })}</g>
        ${lab(66, 80, 'WHAT MOVES A PRICE', FIN.faint, { size: 9 })}
        ${lab(W - 66, 80, '109 SIGNALS · SIX FAMILIES', FIN.accent, { size: 9, a: 'end' })}

        ${fams.map(([nm, n, frac], i) => {
          const y = 104 + i * 44;
          const beg = (i * 0.6).toFixed(2);
          const w = (330 * frac).toFixed(0);
          return `<g>
            ${t(66, y + 20, nm, { size: 11.5, w: 600, fill: FIN.text })}
            ${t(196, y + 20, n + ' signals', { m: true, size: 9.5, fill: FIN.faint })}
            ${rect(272, y + 10, 200, 12, { fill: FIN.rise, r: 6 })}
            <rect x="272" y="${y + 10}" width="0" height="12" rx="6" fill="${FIN.accent}" opacity="0.85">
              <animate attributeName="width" values="0;${(200 * frac).toFixed(0)};${(200 * frac).toFixed(0)}"
                keyTimes="0;0.34;1" dur="9s" begin="${beg}s" repeatCount="indefinite" fill="freeze"/></rect>
            ${t(W - 66, y + 20, (frac * 100).toFixed(0) + '%', { m: true, size: 10.5, a: 'end', fill: FIN.dim })}
          </g>`;
        }).join('')}

        <line x1="66" y1="372" x2="${W - 66}" y2="372" stroke="${FIN.line}"/>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.55;0.68;1" dur="9s" repeatCount="indefinite"/>
          ${lab(66, 396, 'COMPOSED MID · JP · TIER-1', FIN.faint, { size: 8.5 })}
          ${t(W - 66, 400, '0.87', { m: true, size: 26, w: 700, a: 'end', fill: FIN.accent })}
        </g>
        ${lab(W / 2, H - 14, 'EVERY QUOTE IS THE OUTPUT, NEVER AN INPUT', FIN.faint, { a: 'middle', size: 8.5 })}`),
    };
  },
};

/* B5 ── Both Sides, Verified */
export const bothSidesVerified = {
  id: 'om-verified',
  name: 'Both Sides, Verified',
  family: 'B · fintech-clean',
  tagline: 'Who is on the book, and what they cleared',
  desc:
    'The only option that leads with the participants rather than the price. Counterparties ' +
    'arrive on the book as cards — operator, MVNO, reseller, IoT — each passing KYC and KYB ' +
    'before a quote appears beside it. It answers the question an institutional buyer asks ' +
    'first, which is not "what is the price" but "who else is here and have you checked them".',
  pros: ['Leads on the real institutional objection', 'Folds the controls section into the hero', 'Differentiates from every price-first competitor'],
  cons: ['Defers the price, which is the headline', 'Most elements of any option here'],
  scores: { story: 5, motion: 4, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: () => {
    const parts = [
      ['Operator · MNO', 'Monetising idle overnight capacity', '12.0 TB', FIN.accent],
      ['MVNO · reseller', 'Buying at market instead of a rate card', '5.6 TB', FIN.up],
      ['Enterprise · IoT', 'Fleet data across 41 countries', '1.2 TB', FIN.accent],
      ['Aggregator', 'Two-sided, quoting both ways', '8.4 TB', FIN.up],
    ];
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${finShadow}
        ${lab(40, 44, 'ON THE BOOK RIGHT NOW', FIN.faint, { size: 9 })}
        ${lab(W - 40, 44, 'VERIFIED BEFORE QUOTING', FIN.accent, { size: 9, a: 'end' })}

        ${parts.map(([nm, sub, sz, col], i) => {
          const y = 62 + i * 84;
          const beg = (i * 1.1).toFixed(2);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.12;1" dur="9s"
              begin="${beg}s" repeatCount="indefinite" fill="freeze"/>
            <animateTransform attributeName="transform" type="translate" values="26 0;0 0;0 0"
              keyTimes="0;0.12;1" dur="9s" begin="${beg}s" repeatCount="indefinite" fill="freeze"/>
            <g filter="url(#om-fs)">${rect(40, y, W - 80, 70, { fill: FIN.panel, r: 12, stroke: FIN.line })}</g>
            ${rect(56, y + 16, 38, 38, { fill: FIN.accentSoft, r: 10 })}
            <circle cx="75" cy="${y + 35}" r="6" fill="none" stroke="${col}" stroke-width="2"/>
            ${t(110, y + 30, nm, { size: 12.5, w: 700, fill: FIN.text })}
            ${t(110, y + 48, sub, { size: 10.5, fill: FIN.dim })}
            ${t(W - 60, y + 30, sz, { m: true, size: 13, w: 700, a: 'end', fill: FIN.text })}
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.2;0.3;1" dur="9s"
                begin="${beg}s" repeatCount="indefinite" fill="freeze"/>
              ${rect(W - 128, y + 38, 68, 17, { fill: '#E8F6F0', r: 8.5 })}
              <path d="M ${W - 120} ${y + 47} l 3.6 3.6 l 6.4 -7" fill="none" stroke="${FIN.up}"
                stroke-width="2" stroke-linecap="round"/>
              ${lab(W - 106, y + 50, 'KYC + KYB', FIN.up, { size: 7.5 })}
            </g>
          </g>`;
        }).join('')}
        ${lab(W / 2, H - 16, 'OPEN TO ANYONE WHO PASSES THE CHECKS — INCLUDING THE PEOPLE WE COMPETE WITH',
          FIN.faint, { a: 'middle', size: 8 })}`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   ROUND TWO — options 11–15. Axes the first ten left alone: geography,
   the matching decision, depth, pure type, and the request interface.
   ══════════════════════════════════════════════════════════════════════════ */

/* 11 ── Where It Trades (INST) */
export const whereItTrades = {
  id: 'om-routes',
  name: 'Where It Trades',
  family: 'A · institutional',
  tagline: 'The book laid out as geography',
  desc:
    'Every other option on this board is a table, a ladder or a chart. This one is a map: six ' +
    'routes sit on a schematic graticule carrying their own live price, prints travel the arcs ' +
    'between them, and a severe-weather advisory over Kyushu reprices Tokyo by four basis points ' +
    'while you watch. It draws a sentence the page states and never shows — routes are priced ' +
    'for the world they run through.',
  pros: ['The only spatial reading of the book', 'Ties a named risk signal to a visible price move', 'Feels global without asserting a country count'],
  cons: ['The map is schematic — no coastlines, so it can read as a network diagram', 'Six prices at six angles scan slower than one column', 'Node labels crowd badly below 420px'],
  scores: { story: 4, motion: 4, perf: 4, mobile: 2, brand: 4, ease: 3 },
  build: () => {
    /* x, y, route code, price, label anchor, dx, dy */
    const nodes = [
      [96, 168, 'US · T1', '0.72', 'middle', 0, 24],
      [214, 146, 'GB · T1', '0.54', 'end', -14, -4],
      [258, 158, 'DE · T1', '0.61', 'start', 14, -4],
      [414, 252, 'SG · T1', '0.58', 'middle', 0, 24],
      [474, 172, 'JP · T1', '0.84', 'start', 14, -4],
      [168, 286, 'BR · T2', '1.14', 'middle', 0, 24],
    ];
    const arcs = [
      ['M 96 168 Q 148 130 214 146', 3.2],
      ['M 214 146 Q 236 136 258 158', 2.4],
      ['M 258 158 Q 350 150 414 252', 4.4],
      ['M 414 252 Q 466 226 474 172', 2.8],
      ['M 214 146 Q 150 224 168 286', 3.6],
    ];
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        ${glow(`300`, `140`, `250`, 0.55)}
        ${lab(30, 40, 'OMDM · THE BOOK BY ROUTE', INST.text, { size: 10 })}
        ${lab(W - 26, 40, 'USD / GB', INST.faint, { a: 'end' })}

        ${rect(26, 68, W - 52, 268, { fill: INST.panel, r: 8 })}
        ${[104, 144, 184, 224, 264, 304].map(y =>
          `<line x1="40" y1="${y}" x2="${W - 40}" y2="${y}" stroke="${INST.line}" stroke-dasharray="2 6"/>`).join('')}
        ${[64, 120, 176, 232, 288, 344, 400, 456, 512].map(x =>
          `<line x1="${x}" y1="84" x2="${x}" y2="320" stroke="${INST.line}" stroke-dasharray="2 6" opacity="0.6"/>`).join('')}

        ${arcs.map(([d, dur], i) => `
          <path d="${d}" fill="none" stroke="${INST.lineHard}" stroke-width="1" stroke-dasharray="3 4"/>
          <rect x="-4" y="-2.5" width="8" height="5" rx="1.5" fill="${INST.gold}" opacity="0.9">
            <animateMotion dur="${dur}s" begin="${(i * 0.7).toFixed(1)}s" repeatCount="indefinite" path="${d}"/>
          </rect>`).join('')}

        ${nodes.map(([x, y, code, px, a, dx, dy]) => `
          <circle cx="${x}" cy="${y}" r="5.5" fill="${INST.ground}" stroke="${INST.gold}" stroke-width="1.8"/>
          ${lab(x + dx, y + dy, code, INST.faint, { size: 8, a })}
          ${t(x + dx, y + dy + 18, px, { m: true, size: 14, w: 700, a, fill: INST.gold })}`).join('')}

        <circle cx="474" cy="172" r="8" fill="none" stroke="${INST.gold}" stroke-width="1.5">
          <animate attributeName="r" values="8;28" dur="2.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;0" dur="2.6s" repeatCount="indefinite"/>
        </circle>

        <circle cx="34" cy="368" r="3.5" fill="${INST.gold}">${pulse(2.6, 0.3, 1)}</circle>
        ${lab(48, 372, 'SEVERE WEATHER ADVISORY · KYUSHU — JP · TIER-1 +4 BP', INST.gold, { size: 8.5, op: 0.9 })}
        ${lab(48, 388, 'GEOPOLITICAL &amp; CLIMATE RISK · 18 SIGNALS', INST.faint, { size: 8 })}

        ${rect(26, 404, W - 52, 1, { fill: INST.line, r: 0 })}
        ${lab(30, 426, 'ROUTES ARE PRICED FOR THE WORLD THEY RUN THROUGH', INST.dim, { size: 9 })}
        ${lab(W - 26, 426, 'SIX OF THE ROUTES ON THE BOOK', INST.faint, { size: 8.5, a: 'end' })}`),
    };
  },
};

/* 12 ── Best Fill (FIN) */
export const bestFill = {
  id: 'om-fill',
  name: 'Best Fill',
  family: 'B · fintech-clean',
  tagline: 'The cheapest quote loses',
  desc:
    'One order — 8.0 TB on DE · Tier-1 — and the four quotes competing for it. The cheapest at ' +
    '0.59 is refused for standing below the route minimum, the next at 0.61 is passed over on ' +
    '94.1% attach success, and the fill lands at 0.63. It draws the page\u2019s own line that ' +
    'nothing else here touches: the cheapest quote is not always the best fill, and quality, ' +
    'risk and settlement terms are part of the match.',
  pros: ['Shows the matching logic, not just the price', 'Explains why a buyer should not simply sort by price', 'Every rejection names its reason'],
  cons: ['Four rows of five columns is a lot of reading for a hero', 'Publishing a fill decision invites argument about the rule', 'Says nothing about repricing, which is the headline claim'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 3, brand: 4, ease: 4 },
  build: (uid) => {
    const sh = `<defs><filter id="${uid}-sh" x="-20%" y="-20%" width="140%" height="140%">` +
      `<feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#0F172A" flood-opacity="0.07"/></filter></defs>`;
    const rows = [
      ['0.59', 'Larga Telecom', 'MVNO-RESELLER', '97.4%', 'T+30', 'REFUSED', FIN.down, '#FDECEE'],
      ['0.61', 'Rheinmobil GmbH', 'FULL MVNO', '94.1%', 'T+14', 'PASSED OVER', FIN.dim, FIN.rise],
      ['0.63', 'Nordwest Mobil AG', 'FULL MVNO', '99.2%', 'T+30', 'FILLED', FIN.accent, FIN.accentSoft],
      ['0.66', 'Deutsche Netz AG', 'MNO', '99.4%', 'UPFRONT', 'NEXT IN LINE', FIN.faint, FIN.rise],
    ];
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${sh}
        ${lab(30, 44, 'MATCHED ON MORE THAN PRICE', FIN.faint, { size: 9 })}
        ${lab(W - 30, 44, 'DE · TIER-1 · 8.0 TB REQUESTED', FIN.accent, { size: 9, a: 'end' })}

        <g filter="url(#${uid}-sh)">${rect(28, 60, W - 56, 300, { fill: FIN.panel, r: 16, stroke: FIN.line })}</g>
        ${lab(52, 90, 'QUOTE', FIN.faint, { size: 8 })}
        ${lab(128, 90, 'COUNTERPARTY', FIN.faint, { size: 8 })}
        ${lab(352, 90, 'ATTACH', FIN.faint, { size: 8, a: 'end' })}
        ${lab(372, 90, 'TERMS', FIN.faint, { size: 8 })}
        ${lab(W - 52, 90, 'MATCH', FIN.faint, { size: 8, a: 'end' })}
        <line x1="52" y1="98" x2="${W - 52}" y2="98" stroke="${FIN.line}"/>

        ${rows.map(([px, cp, st, at, tm, vd, col, wash], i) => {
          const y = 108 + i * 62;
          const beg = (i * 0.7).toFixed(2);
          const win = vd === 'FILLED';
          const kv = (0.34 + i * 0.06).toFixed(3);
          const kvE = (0.38 + i * 0.06).toFixed(3);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.06;1" dur="10s"
              begin="${beg}s" repeatCount="indefinite" fill="freeze"/>
            ${win ? `<rect x="40" y="${y}" width="${W - 80}" height="54" rx="10" fill="${FIN.accentSoft}" opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.7;1" dur="10s"
                repeatCount="indefinite" fill="freeze"/></rect>
            <rect x="40" y="${y}" width="3" height="54" rx="1.5" fill="${FIN.accent}" opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.7;1" dur="10s"
                repeatCount="indefinite" fill="freeze"/></rect>` : ''}
            ${t(52, y + 34, px, { m: true, size: 20, w: 700, fill: win ? FIN.accent : FIN.text })}
            ${t(128, y + 26, cp, { size: 12, w: 600, fill: FIN.text })}
            ${lab(128, y + 42, st, FIN.faint, { size: 7.5 })}
            ${t(352, y + 30, at, { m: true, size: 12.5, a: 'end', fill: at === '94.1%' ? FIN.down : FIN.dim })}
            ${lab(372, y + 30, tm, FIN.dim, { size: 8.5 })}
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${kv};${kvE};1" dur="10s"
                repeatCount="indefinite" fill="freeze"/>
              ${rect(W - 168, y + 16, 116, 22, { fill: wash, r: 11 })}
              ${lab(W - 110, y + 31, vd, col, { size: 7.5, a: 'middle' })}
            </g>
          </g>`;
        }).join('')}

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.8;1" dur="10s"
            repeatCount="indefinite" fill="freeze"/>
          ${t(30, 392, 'Filled at 0.63 — two basis points above the cheapest quote on the route.',
            { size: 12, fill: FIN.text })}
          ${t(30, 412, 'Refused on standing, passed over on attach success. Both are priced signals.',
            { size: 11, fill: FIN.dim })}
        </g>
        ${lab(W - 30, 434, 'QUALITY, RISK AND TERMS ARE PART OF THE MATCH', FIN.accent, { size: 8.5, a: 'end' })}`),
    };
  },
};

/* 13 ── A Deeper Book (INST) */
export const deeperBook = {
  id: 'om-depth',
  name: 'A Deeper Book',
  family: 'A · institutional',
  tagline: 'More counterparties, tighter spread',
  desc:
    'One gesture, held for the whole loop: the bid and the ask closing on each other. Two ' +
    'counterparties quote JP · Tier-1 and the spread is 0.14 on 12 TB of depth; at five it is ' +
    '0.08 on 38 TB; at nine it is 0.04 on 84 TB, with the mid steady at 0.83 throughout. It is ' +
    'the argument behind the page\u2019s boldest paragraph — that competitors are welcome in the ' +
    'book, because a deeper book prices better for everyone standing in it.',
  pros: ['One idea, one shape, readable in a second', 'Makes the open-to-competitors paragraph make commercial sense', 'Survives being shrunk to a phone or a slide'],
  cons: ['Steps through three states rather than moving continuously', 'The depth figures are illustrative and would need real book data', 'Shows no route detail and no signals'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 5 },
  build: () => {
    const x0 = 64, x1 = 512, lo = 0.72, hi = 0.94;
    const px = (v) => x0 + ((v - lo) / (hi - lo)) * (x1 - x0);
    const bids = [0.76, 0.80, 0.82], asks = [0.90, 0.88, 0.86];
    const bx = bids.map(v => px(v).toFixed(1));
    const ax = asks.map(v => px(v).toFixed(1));
    const bw = bids.map((v, i) => (px(asks[i]) - px(v)).toFixed(1));
    const kt = '0;0.28;0.36;0.61;0.69;0.94;1';
    const seq = (a) => `${a[0]};${a[0]};${a[1]};${a[1]};${a[2]};${a[2]};${a[2]}`;
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        ${glow(`${W / 2}`, `210`, `210`, 0.6)}
        ${lab(30, 40, 'JP · TIER-1 · THE SPREAD', INST.text, { size: 10 })}
        ${lab(W - 26, 40, 'USD / GB', INST.faint, { a: 'end' })}

        ${lab(W / 2, 96, 'BID-ASK SPREAD', INST.faint, { a: 'middle', size: 9 })}
        ${repricing(W / 2, 142, ['0.14', '0.08', '0.04'], { fill: INST.gold, size: 40, w: 700, a: 'middle', dur: 12 })}

        ${lab(x0, 180, 'BID', INST.up, { size: 8.5 })}
        ${repricing(x0 + 34, 181, ['0.76', '0.80', '0.82'], { fill: INST.text, size: 12.5, w: 600, a: 'start', dur: 12 })}
        ${lab(x1, 180, 'ASK', INST.down, { size: 8.5, a: 'end' })}
        ${repricing(x1 - 34, 181, ['0.90', '0.88', '0.86'], { fill: INST.text, size: 12.5, w: 600, dur: 12 })}

        ${rect(x0, 196, x1 - x0, 28, { fill: 'rgba(255,255,255,0.05)', r: 4 })}
        <rect y="196" height="28" rx="4" fill="${INST.gold}" opacity="0.30">
          <animate attributeName="x" values="${seq(bx)}" keyTimes="${kt}" dur="12s" repeatCount="indefinite"/>
          <animate attributeName="width" values="${seq(bw)}" keyTimes="${kt}" dur="12s" repeatCount="indefinite"/>
        </rect>
        <rect y="188" width="3" height="44" fill="${INST.up}">
          <animate attributeName="x" values="${seq(bx)}" keyTimes="${kt}" dur="12s" repeatCount="indefinite"/>
        </rect>
        <rect y="188" width="3" height="44" fill="${INST.down}">
          <animate attributeName="x" values="${seq(ax)}" keyTimes="${kt}" dur="12s" repeatCount="indefinite"/>
        </rect>
        <line x1="${px(0.83).toFixed(1)}" y1="182" x2="${px(0.83).toFixed(1)}" y2="238"
          stroke="${INST.lineHard}" stroke-dasharray="3 3"/>
        ${lab(px(0.83), 252, 'MID 0.83 — UNMOVED', INST.faint, { size: 8, a: 'middle' })}

        <line x1="${x0}" y1="268" x2="${x1}" y2="268" stroke="${INST.line}"/>
        ${[0.72, 0.94].map((v, i) => `${lab(px(v), 284, v.toFixed(2), INST.faint, { size: 8, a: i ? 'end' : 'start' })}`).join('')}

        ${lab(30, 326, 'COUNTERPARTIES QUOTING THIS ROUTE', INST.dim, { size: 9 })}
        ${repricing(W - 26, 330, ['2', '5', '9'], { fill: INST.gold, size: 20, w: 700, dur: 12 })}
        ${Array.from({ length: 9 }, (_, i) => {
          const stage = i < 2 ? 0 : i < 5 ? 1 : 2;
          const v = [0, 1, 2].map(s => (s >= stage ? '1' : '0.14')).concat('0.14').join(';');
          return `<circle cx="${184 + i * 26}" cy="356" r="6" fill="${INST.gold}" opacity="0.14">
            <animate attributeName="opacity" values="${v}" keyTimes="0;0.3333;0.6667;1"
              dur="12s" calcMode="discrete" repeatCount="indefinite"/></circle>`;
        }).join('')}

        ${rect(26, 384, W - 52, 1, { fill: INST.line, r: 0 })}
        ${lab(30, 408, 'DEPTH AT THE MID', INST.faint, { size: 9 })}
        ${repricing(W - 26, 412, ['12 TB', '38 TB', '84 TB'], { fill: INST.text, size: 17, w: 600, dur: 12 })}
        ${lab(30, 436, 'A DEEPER BOOK PRICES BETTER FOR EVERYONE STANDING IN IT', INST.dim, { size: 9 })}`),
    };
  },
};

/* 14 ── Quoted, Repriced, Settled (FIN) */
export const quotedRepricedSettled = {
  id: 'om-three',
  name: 'Quoted, Repriced, Settled',
  family: 'B · fintech-clean',
  tagline: 'Three words from the lead, and today\u2019s count under each',
  desc:
    'No illustration at all: the three verbs already in the opening paragraph set large, each ' +
    'lighting in turn with the day\u2019s figure beside it — 184 quotes, 1,206 reprices, 96 ' +
    'settled for 268.4 TB. The copy is the artwork, and the numbers are the proof that the ' +
    'sentence is describing something that happened rather than something intended.',
  pros: ['Nothing to misread — the words are the picture', 'Cheapest option on the board to build and to load', 'Gives the hero three concrete figures it currently has none of'],
  cons: ['No sense of a market, a book or a counterparty', 'Type-only heroes look underbuilt beside a chart', 'Three daily counters need a real source before launch'],
  scores: { story: 3, motion: 2, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: () => {
    const items = [
      ['Quoted', '184', 'QUOTES SENT INTO THE BOOK'],
      ['Repriced', '1,206', 'TIMES THE MID MOVED'],
      ['Settled', '96', 'MATCHED AND CLEARED · 268.4 TB'],
    ];
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${lab(40, 54, 'JP · TIER-1 · TODAY SO FAR', FIN.faint, { size: 9 })}
        ${lab(W - 40, 54, 'OMDM', FIN.accent, { size: 9, a: 'end' })}

        ${items.map(([word, figure, note], i) => {
          const y = 132 + i * 104;
          const on = (0.1 + i * 0.22).toFixed(3);
          const onE = (0.16 + i * 0.22).toFixed(3);
          return `<g>
            ${rect(40, y - 48, W - 80, 1, { fill: FIN.line, r: 0 })}
            <rect x="40" y="${y - 49}" width="0" height="2" fill="${FIN.accent}">
              <animate attributeName="width" values="0;0;${W - 80};${W - 80}" keyTimes="0;${on};${onE};1"
                dur="9s" repeatCount="indefinite" fill="freeze"/></rect>
            ${t(40, y, word, { size: 44, w: 700, fill: FIN.lineHard })}
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${onE};1"
                dur="9s" repeatCount="indefinite" fill="freeze"/>
              ${t(40, y, word, { size: 44, w: 700, fill: FIN.text })}
              ${t(W - 40, y, figure, { m: true, size: 30, w: 700, a: 'end', fill: FIN.accent })}
            </g>
            ${lab(40, y + 22, note, FIN.faint, { size: 8.5 })}
          </g>`;
        }).join('')}

        ${lab(40, 434, 'EVERY ROUTE QUOTED, REPRICED AND SETTLED — CONTINUOUSLY', FIN.dim, { size: 9 })}
        <circle cx="${W - 46}" cy="430" r="4" fill="${FIN.up}">${pulse(2.4, 0.4, 1)}</circle>`),
    };
  },
};

/* 15 ── The RFQ (INST) */
export const theRfq = {
  id: 'om-rfq',
  name: 'The RFQ',
  family: 'A · institutional',
  tagline: 'A request typed in, three quotes back, ticking down',
  desc:
    'The interface rather than the abstraction. A request is typed into the terminal — route, ' +
    'size, settlement, minimum attach — the quote button fires, and three counterparties answer ' +
    'inside a firm-for-eight-seconds window that visibly counts down. It answers the question a ' +
    'qualified buyer has after the headline, which is not \u201cis it a market\u201d but ' +
    '\u201cwhat do I actually do here, and how long is the price good for\u201d.',
  pros: ['Shows the product doing the thing instead of symbolising it', 'The expiry countdown is a claim no other option makes', 'Sets up the access-by-request block at the foot of the page'],
  cons: ['Implies an RFQ workflow that has to exist exactly as drawn', 'A form is a cold first impression for a hero', 'The typing sequence eats four seconds before anything is quoted'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 3, brand: 5, ease: 3 },
  build: () => {
    const fields = [
      ['ROUTE', 'DE · TIER-1'],
      ['SIZE', '8.0 TB'],
      ['SETTLEMENT', 'T+30 DEFERRED'],
      ['MIN ATTACH', '99.0%'],
    ];
    const quotes = [
      ['0.63', 'Nordwest Mobil AG', 'FULL MVNO · 99.2%', true],
      ['0.65', 'Deutsche Netz AG', 'MNO · 99.4%', false],
      ['0.66', 'Rheinmobil GmbH', 'FULL MVNO · 99.1%', false],
    ];
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        ${glow(`120`, `40`, `200`, 0.5)}
        ${lab(30, 38, 'REQUEST FOR QUOTE', INST.text, { size: 10 })}
        ${lab(W - 26, 38, 'OMDM TERMINAL', INST.faint, { a: 'end' })}

        ${rect(26, 52, W - 52, 150, { fill: INST.panel, r: 8 })}
        ${fields.map(([k, v], i) => {
          const y = 82 + i * 34;
          const on = (0.04 + i * 0.06).toFixed(3);
          const onE = (0.07 + i * 0.06).toFixed(3);
          return `
          ${lab(44, y, k, INST.faint, { size: 8 })}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${onE};1"
              dur="14s" repeatCount="indefinite" fill="freeze"/>
            ${t(W - 44, y + 1, v, { m: true, size: 13, w: 600, a: 'end', fill: INST.text })}
          </g>
          ${rect(44, y + 10, W - 88, 1, { fill: INST.line, r: 0 })}`;
        }).join('')}
        <rect x="${W - 40}" width="2" height="14" fill="${INST.gold}">
          <animate attributeName="y" values="70;104;138;172;172" keyTimes="0;0.07;0.13;0.19;1"
            dur="14s" calcMode="discrete" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.22;0.26;1"
            dur="14s" repeatCount="indefinite"/>
        </rect>

        ${rect(26, 214, 170, 32, { fill: 'none', r: 6, stroke: INST.gold })}
        ${lab(111, 234, 'REQUEST QUOTE', INST.gold, { size: 9, a: 'middle' })}
        <rect x="26" y="214" width="170" height="32" rx="6" fill="${INST.gold}" opacity="0">
          <animate attributeName="opacity" values="0;0;0.22;0;0" keyTimes="0;0.25;0.28;0.33;1"
            dur="14s" repeatCount="indefinite"/></rect>
        ${lab(212, 234, 'FIRM FOR 8 SECONDS', INST.faint, { size: 8 })}

        ${quotes.map(([px, cp, meta, best], i) => {
          const y = 254 + i * 48;
          const on = (0.3 + i * 0.05).toFixed(3);
          const onE = (0.33 + i * 0.05).toFixed(3);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${onE};1"
              dur="14s" repeatCount="indefinite" fill="freeze"/>
            ${rect(26, y, W - 52, 42, { fill: INST.panel, r: 5, stroke: best ? INST.gold : 'none', sw: best ? 1 : 0 })}
            ${t(44, y + 28, px, { m: true, size: 18, w: 700, fill: best ? INST.gold : INST.text })}
            ${t(118, y + 22, cp, { size: 12, w: 600, fill: INST.text })}
            ${lab(118, y + 35, meta, INST.faint, { size: 7.5 })}
            ${best ? lab(W - 44, y + 27, 'BEST OFFER', INST.gold, { size: 8, a: 'end' })
              : lab(W - 44, y + 27, 'IN LINE', INST.faint, { size: 8, a: 'end' })}
          </g>`;
        }).join('')}

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.36;0.4;1"
            dur="14s" repeatCount="indefinite" fill="freeze"/>
          ${lab(30, 438, 'QUOTE EXPIRES IN', INST.faint, { size: 9 })}
          ${repricing(W - 26, 442, ['0:08', '0:06', '0:04', '0:02'], { fill: INST.text, size: 18, w: 600, dur: 8 })}
        </g>
        ${lab(30, 414, 'ACCESS IS BY REQUEST, AND BY VERIFICATION', INST.dim, { size: 8.5 })}`),
    };
  },
};

export const OMDM_HERO_VARIANTS = [
  heroCurrent,
  theBook, twoSides, theTape, repricingClock, rateCardVsMarket,
  quoteCard, finBoard, theGap, sixFamilies, bothSidesVerified,
  whereItTrades, bestFill, deeperBook, quotedRepricedSettled, theRfq,
];
