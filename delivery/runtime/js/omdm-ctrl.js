/* ─────────────────────────────────────────────────────────────────────────
   /omdm-market — "Built to be audited".

   Net-new block. The live section is a four-item list with no visual, so
   option 0 replicates that list and options 1–10 propose a panel to sit
   beside it at 624 x 440 inside the page's 1280px container.
   Options 1–5 INST, 6–10 FIN. See STYLE-OMDM.md.
   ───────────────────────────────────────────────────────────────────────── */
import { boxWrap, INST, FIN, TONES, INK, WHITE, GRAY, LINE } from './kit.js';

const W = 624;
const H = 440;
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


const t = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}"${o.m ? ` font-family="${MO}"` : ''} font-size="${o.size || 12}"` +
  ` font-weight="${o.w || 400}" fill="${o.fill || '#fff'}" opacity="${o.op == null ? 1 : o.op}"` +
  ` text-anchor="${o.a || 'start'}"${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${s}</text>`;

const lab = (x, y, s, fill, o = {}) =>
  t(x, y, s, { m: true, size: o.size || 9, ls: o.ls || 1.3, fill, a: o.a, op: o.op });

const rect = (x, y, w, h, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r == null ? 5 : o.r}"` +
  ` fill="${o.fill || 'none'}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 1}"` : ''}` +
  `${o.op == null ? '' : ` opacity="${o.op}"`}/>`;

const tick = (x, y, col, sc = 1) =>
  `<path d="M ${x} ${y} l ${3.6 * sc} ${3.6 * sc} l ${6.6 * sc} ${-7.2 * sc}" fill="none"` +
  ` stroke="${col}" stroke-width="${2 * sc}" stroke-linecap="round" stroke-linejoin="round"/>`;

const cross = (x, y, col, s = 5) =>
  `<path d="M ${x - s} ${y - s} L ${x + s} ${y + s} M ${x + s} ${y - s} L ${x - s} ${y + s}"` +
  ` stroke="${col}" stroke-width="2" stroke-linecap="round"/>`;

/* the four controls exactly as the live page words them */
const CTRLS = [
  ['KYC and KYB before quoting', 'No counterparty reaches the book without verification of both the individual and the business behind them.'],
  ['Minimum level enforcement', 'Routes carry a minimum counterparty standing. The book will not match below it.'],
  ['Immutable audit trail', 'Quote, match and settlement are recorded and reconcilable, per counterparty and per route.'],
  ['Segregated settlement', 'Upfront and deferred arrangements are tracked apart, so exposure is always known.'],
];
const SHORT = ['KYC / KYB', 'MINIMUM LEVEL', 'AUDIT TRAIL', 'SEGREGATION'];

/* ══════════════════════════════════════════════════════════════════════════
   OPTION 0 — the four-item list as it ships
   ══════════════════════════════════════════════════════════════════════════ */
export const ctrlCurrent = {
  id: 'oc-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'Four headings and four sentences',
  desc:
    'What ships now: the four controls as a plain list, each a bold heading over one line of ' +
    'explanation, with nothing beside it. The writing is precise and the controls are the right ' +
    'four. But a section arguing "we can show our working" shows none of it, which is the one ' +
    'place on the page where an assertion is least likely to be taken on trust.',
  pros: ['Short and precise', 'The right four controls', 'No overclaiming'],
  cons: ['A section about evidence that presents no evidence', 'Nothing distinguishes it from any compliance page', 'Half the section is empty space'],
  scores: { story: 2, motion: 1, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: () => ({
    pills: noPills,
    svg: wB(`
      ${rect(0, 0, W, H, { fill: '#FAFAFB', r: 0 })}
      ${CTRLS.map((c, i) => {
        const y = 34 + i * 100;
        return `
        ${rect(34, y, W - 68, 84, { fill: WHITE, stroke: LINE, r: 8 })}
        <circle cx="58" cy="${y + 28}" r="9" fill="${TONES.orange.wash}"/>
        ${tick(53.5, y + 28, TONES.orange.main, 0.85)}
        ${t(80, y + 32, c[0], { size: 14, w: 700, fill: INK })}
        ${t(80, y + 54, c[1].slice(0, 62) + (c[1].length > 62 ? '…' : ''), { size: 11, fill: '#5A6070' })}
        ${t(80, y + 70, c[1].length > 62 ? c[1].slice(62, 120) : '', { size: 11, fill: '#5A6070' })}`;
      }).join('')}
      ${lab(W / 2, H - 10, 'NO EVIDENCE IS SHOWN ANYWHERE IN THIS SECTION', GRAY, { a: 'middle', size: 8.5 })}`),
  }),
};

/* ══════════════════════════════════════════════════════════════════════════
   DIRECTION A — INST
   ══════════════════════════════════════════════════════════════════════════ */

/* A1 ── The Gate */
export const theGate = {
  id: 'oc-gate',
  name: 'The Gate',
  family: 'A · institutional',
  tagline: 'Four counterparties approach, one is refused',
  desc:
    'A queue of counterparties moving toward the book. Each is checked at the gate — individual ' +
    'verified, business verified, standing sufficient — and admitted with a reference. The third ' +
    'fails business verification and is turned away, and the queue continues without it. The ' +
    'refusal is the point: a gate that never rejects anything is not a gate.',
  pros: ['Shows the control working, including a rejection', 'Dramatises "before quoting" precisely', 'One clear narrative'],
  cons: ['Only covers the first two controls', 'A visible rejection needs sign-off'],
  scores: { story: 5, motion: 4, perf: 4, mobile: 4, brand: 5, ease: 4 },
  build: () => {
    const q = [
      ['Operator · MNO', 'JP', true, 'a91f'],
      ['Full MVNO', 'SG', true, '7c02'],
      ['Reseller', 'BR', false, '—'],
      ['Enterprise · IoT', 'DE', true, 'd4b8'],
    ];
    const dur = 16;
    const slot = 1 / q.length;          /* each card owns a quarter of the cycle */
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        ${glow(`80`, `0`, `220`, 0.5)}
        ${lab(28, 32, 'VERIFIED BEFORE QUOTING', INST.text, { size: 9.5 })}
        ${lab(W - 28, 32, 'LIVE', INST.up, { a: 'end' })}

        ${rect(W - 130, 52, 102, 300, { fill: INST.panel, r: 6 })}
        ${lab(W - 79, 74, 'THE BOOK', INST.gold, { a: 'middle', size: 8.5 })}
        <line x1="${W - 148}" y1="52" x2="${W - 148}" y2="352" stroke="${INST.lineHard}" stroke-dasharray="4 4"/>
        ${lab(W - 156, 68, 'GATE', INST.faint, { a: 'end', size: 8 })}

        ${q.map(([nm, cc, pass, ref], i) => {
          const on = i * slot;
          /* absolute keyTimes inside one cycle — each card is visible only in its own window */
          const kIn = (on + 0.012).toFixed(4);
          const kChk1 = (on + 0.055).toFixed(4);
          const kChk2 = (on + 0.095).toFixed(4);
          const kMove = (on + 0.135).toFixed(4);
          const kArr = (on + 0.205).toFixed(4);
          const kOut = (on + 0.235).toFixed(4);
          const dx = pass ? 300 : 110;
          return `<g opacity="0">
            <animate attributeName="opacity"
              values="0;0;1;1;${pass ? '1' : '0'};0;0"
              keyTimes="0;${on.toFixed(4)};${kIn};${kArr};${kOut};${(on + 0.245).toFixed(4)};1"
              dur="${dur}s" repeatCount="indefinite"/>
            <g>
              <animateTransform attributeName="transform" type="translate"
                values="0 0;0 0;${dx} 0;${dx} 0;0 0"
                keyTimes="0;${kMove};${kArr};${kOut};1"
                dur="${dur}s" repeatCount="indefinite"/>
              ${rect(28, 150, 186, 96, { fill: INST.panel, r: 6, stroke: pass ? INST.line : INST.down })}
              ${lab(44, 174, cc + ' · COUNTERPARTY', INST.faint, { size: 8 })}
              ${t(44, 196, nm, { size: 13, w: 700, fill: INST.text })}
              ${['INDIVIDUAL', 'BUSINESS'].map((chk, j) => {
                const cy = 214 + j * 20;
                const ok = pass || j === 0;
                return `${lab(44, cy + 4, chk, INST.faint, { size: 7.5 })}
                  <g opacity="0">
                    <animate attributeName="opacity" values="0;0;1;1;0;0"
                      keyTimes="0;${j ? kChk2 : kChk1};${((j ? +kChk2 : +kChk1) + 0.006).toFixed(4)};${kOut};${(on + 0.245).toFixed(4)};1"
                      dur="${dur}s" repeatCount="indefinite"/>
                    ${ok ? tick(150, cy, INST.up, 0.8) : cross(154, cy - 1, INST.down, 4)}
                    ${lab(170, cy + 4, ok ? 'VERIFIED' : 'REFUSED', ok ? INST.up : INST.down, { size: 7.5 })}
                  </g>`;
              }).join('')}
            </g>
          </g>`;
        }).join('')}

        ${rect(28, 300, 260, 1, { fill: INST.line, r: 0 })}
        ${lab(28, 326, 'ADMITTED WITH A REFERENCE', INST.dim, { size: 8.5 })}
        ${lab(28, 344, 'REFUSED — NO RECORD REACHES THE BOOK', INST.faint, { size: 8.5 })}
        ${lab(28, H - 22, 'NO COUNTERPARTY REACHES THE BOOK WITHOUT VERIFICATION OF BOTH', INST.dim, { size: 8.5 })}
        ${lab(28, H - 8, 'THE INDIVIDUAL AND THE BUSINESS BEHIND THEM', INST.faint, { size: 8.5 })}`),
    };
  },
};

/* A2 ── The Bar */
export const theBar = {
  id: 'oc-bar',
  name: 'The Bar',
  family: 'A · institutional',
  tagline: 'Quotes below the minimum standing bounce',
  desc:
    'One route with a minimum counterparty standing drawn as a physical bar. Quotes arrive from ' +
    'below carrying their tier; the ones that clear the bar land in the book, and the ones that ' +
    'do not visibly bounce off it and fall away. It makes "the book will not match below it" a ' +
    'mechanical fact rather than a policy statement.',
  pros: ['Turns a policy line into a mechanism', 'Reads with no labels at all', 'Cheap to run'],
  cons: ['Covers only the second control', 'Implies standing is a single scalar'],
  scores: { story: 4, motion: 5, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: () => {
    const quotes = [
      ['MNO', 4, true], ['Reseller', 1, false], ['Full MVNO', 3, true],
      ['MVNO-reseller', 2, false], ['MNO', 4, true],
    ];
    const barY = 190, dur = 14, each = dur / quotes.length;
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        ${glow(`${W / 2}`, `60`, `230`, 0.45)}
        ${lab(28, 32, 'JP · TIER-1 · MINIMUM STANDING: FULL MVNO', INST.text, { size: 9.5 })}
        ${lab(W - 28, 32, 'ENFORCED AT MATCH', INST.faint, { a: 'end' })}

        ${rect(28, 56, W - 56, 110, { fill: INST.panel, r: 6 })}
        ${lab(44, 78, 'MATCHED INTO THE BOOK', INST.gold, { size: 8.5 })}
        ${[0, 1, 2].map(i => `
          ${rect(44 + i * 178, 92, 164, 56, { fill: 'rgba(255,255,255,0.05)', r: 4 })}
          ${lab(56 + i * 178, 112, ['MNO · JP', 'FULL MVNO · SG', 'MNO · DE'].at(i), INST.dim, { size: 8 })}
          ${t(192 + i * 178, 136, ['0.84', '0.61', '0.72'].at(i), { m: true, size: 17, w: 600, a: 'end', fill: INST.text })}`).join('')}

        <line x1="28" y1="${barY}" x2="${W - 28}" y2="${barY}" stroke="${INST.gold}" stroke-width="3"/>
        ${lab(28, barY - 10, 'THE BAR — FULL MVNO OR ABOVE', INST.gold, { size: 8.5 })}

        ${quotes.map(([nm, tier, pass], i) => {
          const x = 52 + i * 108;
          const beg = (i * each).toFixed(2);
          const yStart = 392, yEnd = pass ? 150 : barY - 26;
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.06;0.62;0.8;1"
              dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/>
            <g>
              <animateTransform attributeName="transform" type="translate"
                values="0 0;0 ${(yEnd - yStart).toFixed(0)};0 ${pass ? (yEnd - yStart).toFixed(0) : (yEnd - yStart + 150).toFixed(0)};0 ${pass ? (yEnd - yStart).toFixed(0) : (yEnd - yStart + 150).toFixed(0)}"
                keyTimes="0;0.5;0.78;1" dur="${dur}s" begin="${beg}s" repeatCount="indefinite" fill="freeze"/>
              ${rect(x, yStart, 92, 46, { fill: INST.panel, r: 5, stroke: pass ? INST.up : INST.down })}
              ${lab(x + 10, yStart + 18, nm.length > 9 ? nm.slice(0, 9) : nm, INST.dim, { size: 7 })}
              ${t(x + 82, yStart + 38, 'L' + tier, { m: true, size: 15, w: 700, a: 'end', fill: pass ? INST.up : INST.down })}
            </g>
          </g>`;
        }).join('')}

        ${lab(28, 418, 'QUOTES ARRIVING — LEVEL SHOWN', INST.faint, { size: 8.5 })}
        ${lab(W - 28, 418, 'BELOW THE BAR NEVER MATCHES', INST.down, { size: 8.5, a: 'end' })}`),
    };
  },
};

/* A3 ── The Chain */
export const theChain = {
  id: 'oc-chain',
  name: 'The Chain',
  family: 'A · institutional',
  tagline: 'Append-only, each line sealing the last',
  desc:
    'The audit trail as what it actually is: an append-only record where every entry carries the ' +
    'hash of the one before it. Quote, match and settlement append in sequence, each new line ' +
    'sealing its predecessor, and an attempt to alter an earlier line lights the whole chain red ' +
    'and is rejected. It is the only option that demonstrates immutability rather than claiming it.',
  pros: ['Demonstrates immutability instead of asserting it', 'Engineers will trust it immediately', 'Covers quote, match and settlement together'],
  cons: ['Chained-hash imagery suggests blockchain, which may not be the intent', 'Needs the real record format to stay honest'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 3, brand: 5, ease: 4 },
  build: () => {
    const rows = [
      ['QUOTE', 'JP · T1 · 0.84 / 0.91', 'a91f3c'],
      ['QUOTE', 'JP · T1 · 0.83 / 0.90', '7c02be'],
      ['MATCH', 'JP · T1 · 2.4 TB @ 0.83', 'd4b8a1'],
      ['SETTLE', 'T+30 · deferred · cleared', '31e7f0'],
      ['QUOTE', 'DE · T1 · 0.61 / 0.66', '9a5512'],
    ];
    const dur = 15;
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        ${glow(`${W - 60}`, `20`, `200`, 0.45)}
        ${lab(28, 32, 'IMMUTABLE AUDIT TRAIL', INST.text, { size: 9.5 })}
        ${lab(W - 28, 32, 'APPEND ONLY', INST.faint, { a: 'end' })}

        ${rows.map((r, i) => {
          const y = 56 + i * 58;
          const beg = (i * 1.5).toFixed(2);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;${(0.06 + i * 0.02).toFixed(3)};1"
              dur="${dur}s" begin="${beg}s" repeatCount="indefinite" fill="freeze"/>
            ${rect(28, y, W - 56, 48, { fill: INST.panel, r: 5 })}
            ${rect(28, y, 3, 48, { fill: r[0] === 'SETTLE' ? INST.gold : r[0] === 'MATCH' ? INST.up : INST.lineHard, r: 0 })}
            ${lab(44, y + 20, r[0], r[0] === 'SETTLE' ? INST.gold : INST.dim, { size: 8 })}
            ${t(112, y + 22, r[1], { size: 11.5, w: 500, fill: INST.text })}
            ${lab(44, y + 38, 'SEALS', INST.faint, { size: 7 })}
            ${t(84, y + 39, i === 0 ? 'genesis' : rows[i - 1][2], { m: true, size: 9, fill: INST.faint })}
            ${t(W - 44, y + 30, r[2], { m: true, size: 12, w: 600, a: 'end', fill: INST.gold, op: 0.85 })}
            ${i > 0 ? `<path d="M 40 ${y - 10} L 40 ${y}" stroke="${INST.gold}" stroke-width="1.5" opacity="0.5"/>` : ''}
          </g>`;
        }).join('')}

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.72;0.78;0.9;0.94;1"
            dur="${dur}s" repeatCount="indefinite"/>
          ${rect(28, 114, W - 56, 48, { fill: 'none', r: 5, stroke: INST.down, sw: 2 })}
          ${rect(28, 346, W - 56, 46, { fill: INST.panel, r: 6, stroke: INST.down })}
          ${cross(52, 369, INST.down, 6)}
          ${t(74, 366, 'Alteration rejected', { size: 12.5, w: 700, fill: INST.down })}
          ${lab(74, 383, 'EVERY SUBSEQUENT SEAL WOULD BREAK', INST.faint, { size: 8 })}
        </g>
        <g>
          ${lab(28, 370, 'QUOTE, MATCH AND SETTLEMENT — RECONCILABLE PER COUNTERPARTY AND PER ROUTE',
            INST.dim, { size: 8.5 })}
          <animate attributeName="opacity" values="1;1;0;0;1;1" keyTimes="0;0.72;0.78;0.9;0.94;1"
            dur="${dur}s" repeatCount="indefinite"/>
        </g>
        ${lab(28, H - 12, 'A MARKET MOVING REAL MONEY HAS TO BE ABLE TO SHOW ITS WORKING', INST.faint, { size: 8.5 })}`),
    };
  },
};

/* A4 ── Two Pots */
export const twoPots = {
  id: 'oc-pots',
  name: 'Two Pots',
  family: 'A · institutional',
  tagline: 'Upfront and deferred, never mixed',
  desc:
    'Segregated settlement made physical. Trades sort into two columns as they settle — paid ' +
    'upfront on the left, deferred on the right — and the exposure figure under the deferred ' +
    'column updates as it fills and drains. The single most important control for a ' +
    'counterparty deciding whether to put real volume through the book, and the one the live ' +
    'list buries last.',
  pros: ['Addresses the objection a treasury team actually has', 'Exposure is a number, not an adjective', 'Promotes the most important control'],
  cons: ['Least visually exciting of the five', 'Publishing an exposure figure is a commitment'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: () => {
    const items = [
      ['JP · T1', '2.4 TB', 0], ['DE · T1', '8.0 TB', 1], ['US · T1', '1.2 TB', 0],
      ['SG · T1', '5.6 TB', 1], ['BR · T2', '0.8 TB', 0], ['GB · T1', '12.0 TB', 1],
    ];
    const dur = 18;
    let ln = [0, 0];
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        ${glow(`${W / 2}`, `0`, `240`, 0.4)}
        ${lab(28, 32, 'SEGREGATED SETTLEMENT', INST.text, { size: 9.5 })}
        ${lab(W - 28, 32, 'TRACKED APART', INST.faint, { a: 'end' })}

        ${[0, 1].map(c => `
          ${rect(28 + c * 300, 52, 268, 300, { fill: INST.panel, r: 8 })}
          ${rect(28 + c * 300, 52, 268, 2, { fill: c ? INST.gold : INST.up, r: 0, op: 0.5 })}
          ${lab(48 + c * 300, 76, c ? 'DEFERRED' : 'PAID UPFRONT', c ? INST.gold : INST.up, { size: 9 })}
          ${lab(272 + c * 300, 76, c ? 'T+14 / T+30' : 'T+0', INST.faint, { size: 8, a: 'end' })}`).join('')}

        ${items.map(([rt, sz, col], i) => {
          const slot = ln[col]++;
          const y = 96 + slot * 50;
          const x = 48 + col * 300;
          const beg = (i * 2.2).toFixed(2);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.05;1" dur="${dur}s"
              begin="${beg}s" repeatCount="indefinite" fill="freeze"/>
            <animateTransform attributeName="transform" type="translate" values="0 -22;0 0;0 0"
              keyTimes="0;0.05;1" dur="${dur}s" begin="${beg}s" repeatCount="indefinite" fill="freeze"/>
            ${rect(x, y, 228, 40, { fill: 'rgba(255,255,255,0.05)', r: 4 })}
            ${t(x + 14, y + 25, rt, { size: 12, w: 600, fill: INST.text })}
            ${t(x + 214, y + 25, sz, { m: true, size: 12, a: 'end', fill: col ? INST.gold : INST.up })}
          </g>`;
        }).join('')}

        ${rect(28, 368, W - 56, 1, { fill: INST.line, r: 0 })}
        ${lab(28, 394, 'KNOWN EXPOSURE', INST.faint, { size: 9 })}
        <text x="${W - 28}" y="400" font-family="${MO}" font-size="24" font-weight="700"
          text-anchor="end" fill="${INST.gold}">
          <tspan>25.6 TB</tspan>
          <animate attributeName="opacity" values="1;1;1" keyTimes="0;0.5;1" dur="${dur}s" repeatCount="indefinite"/>
        </text>
        ${lab(28, 414, 'DEFERRED SIDE ONLY — UPFRONT CARRIES NONE', INST.dim, { size: 8.5 })}
        ${lab(28, H - 8, 'SO EXPOSURE IS ALWAYS KNOWN', INST.faint, { size: 8.5 })}`),
    };
  },
};

/* A5 ── Four Stamps */
export const fourStamps = {
  id: 'oc-stamps',
  name: 'Four Stamps',
  family: 'A · institutional',
  tagline: 'One trade through all four controls',
  desc:
    'A single trade travelling down the full control stack, collecting a stamp at each stage — ' +
    'verified, standing checked, recorded, segregated — and emerging with a settlement reference ' +
    'that ties all four together. The only option that covers every control in one pass, which ' +
    'makes it the safest choice if the section has to keep all four with equal weight.',
  pros: ['Covers all four controls in one frame', 'Ends on a single verifiable reference', 'Order matches the live list'],
  cons: ['Four stages is a lot for one panel', 'Less pointed than options that pick one control'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: () => {
    const dur = 14;
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        ${glow(`70`, `0`, `220`, 0.45)}
        ${lab(28, 32, 'ONE TRADE, FOUR CONTROLS', INST.text, { size: 9.5 })}
        ${lab(W - 28, 32, 'JP · T1 · 2.4 TB @ 0.83', INST.faint, { a: 'end' })}

        <line x1="58" y1="58" x2="58" y2="330" stroke="${INST.line}" stroke-dasharray="3 4"/>

        ${CTRLS.map((c, i) => {
          const y = 58 + i * 70;
          const k = (p) => ((i * 0.22 + p * 0.2)).toFixed(3);
          return `<g>
            <circle cx="58" cy="${y + 22}" r="13" fill="${INST.panel}" stroke="${INST.line}"/>
            <circle cx="58" cy="${y + 22}" r="13" fill="none" stroke="${INST.gold}" opacity="0">
              <animate attributeName="opacity" values="0;1;1" keyTimes="0;${k(0.2)};1" dur="${dur}s"
                repeatCount="indefinite" fill="freeze"/></circle>
            <g opacity="0">
              <animate attributeName="opacity" values="0;1;1" keyTimes="0;${k(0.3)};1" dur="${dur}s"
                repeatCount="indefinite" fill="freeze"/>
              ${tick(52, y + 22, INST.up, 0.85)}
            </g>
            ${lab(88, y + 16, SHORT[i], INST.gold, { size: 8, op: 0.9 })}
            ${t(88, y + 36, c[0], { size: 12.5, w: 600, fill: INST.text })}
            <g opacity="0">
              <animate attributeName="opacity" values="0;1;1" keyTimes="0;${k(0.4)};1" dur="${dur}s"
                repeatCount="indefinite" fill="freeze"/>
              ${rect(W - 168, y + 10, 140, 26, { fill: 'rgba(255,255,255,0.05)', r: 4 })}
              ${lab(W - 156, y + 27, ['INDIVIDUAL + BUSINESS', 'FULL MVNO · CLEARS', 'a91f3c RECORDED', 'DEFERRED · T+30'].at(i),
                INST.dim, { size: 7.5 })}
            </g>
          </g>`;
        }).join('')}

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.88;0.94;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(28, 344, W - 56, 60, { fill: INST.panel, r: 8, stroke: INST.goldDim })}
          ${lab(48, 366, 'SETTLEMENT REFERENCE', INST.faint, { size: 8 })}
          ${t(W - 48, 388, 'OMDM-a91f3c-7c02', { m: true, size: 18, w: 700, a: 'end', fill: INST.gold })}
          ${lab(48, 388, 'TIES ALL FOUR TOGETHER', INST.dim, { size: 8.5 })}
        </g>
        ${lab(28, H - 8, 'EVERY ACTION LEAVES A RECORD', INST.faint, { size: 8.5 })}`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   DIRECTION B — FIN
   ══════════════════════════════════════════════════════════════════════════ */

const finShadow = `<defs><filter id="oc-fs" x="-20%" y="-20%" width="140%" height="140%">
  <feDropShadow dx="0" dy="5" stdDeviation="9" flood-color="#0F172A" flood-opacity="0.07"/>
  </filter></defs>`;

/* B1 ── Onboarding */
export const onboarding = {
  id: 'oc-onboard',
  name: 'Onboarding',
  family: 'B · fintech-clean',
  tagline: 'A counterparty clearing all four checks',
  desc:
    'The light-surface reading of the gate: one counterparty card working through the four ' +
    'controls as a progress flow, each resolving to a green state with the specific thing that ' +
    'was checked named beside it. Calm rather than dramatic, and it reads as a product screen ' +
    'the reader could imagine using.',
  pros: ['Feels like the real product', 'Names what was checked at each step', 'Excellent on mobile'],
  cons: ['No rejection shown, so less proof of rigour', 'Familiar onboarding pattern'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: () => {
    const dur = 12;
    const detail = ['Passport and directorship verified', 'Full MVNO — clears JP · Tier-1',
      'Quote, match and settlement recorded', 'Deferred, tracked apart from upfront'];
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${finShadow}
        <g filter="url(#oc-fs)">${rect(28, 28, W - 56, 384, { fill: FIN.panel, r: 16, stroke: FIN.line })}</g>
        ${lab(56, 62, 'COUNTERPARTY ONBOARDING', FIN.faint, { size: 9 })}
        ${t(56, 96, 'Nakamura Telecom KK', { size: 20, w: 700, fill: FIN.text })}
        ${t(56, 118, 'Full MVNO · Japan · applying to quote JP · Tier-1', { size: 11.5, fill: FIN.dim })}

        ${rect(56, 138, W - 112, 1, { fill: FIN.line, r: 0 })}

        ${CTRLS.map((c, i) => {
          const y = 156 + i * 58;
          const k = (p) => ((i * 0.22 + p * 0.18)).toFixed(3);
          return `<g>
            <circle cx="74" cy="${y + 18}" r="13" fill="${FIN.rise}"/>
            <circle cx="74" cy="${y + 18}" r="13" fill="#E8F6F0" opacity="0">
              <animate attributeName="opacity" values="0;1;1" keyTimes="0;${k(0.3)};1" dur="${dur}s"
                repeatCount="indefinite" fill="freeze"/></circle>
            <g opacity="0">
              <animate attributeName="opacity" values="0;1;1" keyTimes="0;${k(0.4)};1" dur="${dur}s"
                repeatCount="indefinite" fill="freeze"/>
              ${tick(68, y + 18, FIN.up, 0.85)}
            </g>
            <g opacity="0.35">
              <animate attributeName="opacity" values="0.35;1;1" keyTimes="0;${k(0.4)};1" dur="${dur}s"
                repeatCount="indefinite" fill="freeze"/>
              ${t(104, y + 15, c[0], { size: 13.5, w: 600, fill: FIN.text })}
              ${t(104, y + 34, detail[i], { size: 10.5, fill: FIN.dim })}
            </g>
            ${i < 3 ? `<line x1="74" y1="${y + 33}" x2="74" y2="${y + 45}" stroke="${FIN.line}" stroke-width="2"/>` : ''}
          </g>`;
        }).join('')}

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.9;0.96;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(56, 388, W - 112, 1, { fill: FIN.line, r: 0 })}
          ${rect(56, 396, 168, 26, { fill: '#E8F6F0', r: 13 })}
          ${tick(72, 409, FIN.up, 0.85)}
          ${lab(92, 413, 'ADMITTED TO THE BOOK', FIN.up, { size: 8.5 })}
          ${t(W - 56, 414, 'OMDM-a91f3c', { m: true, size: 12, w: 600, a: 'end', fill: FIN.accent })}
        </g>`),
    };
  },
};

/* B2 ── Reconciled */
export const reconciled = {
  id: 'oc-recon',
  name: 'Reconciled',
  family: 'B · fintech-clean',
  tagline: 'Quoted, matched, settled — and it ties',
  desc:
    'Three columns — quoted, matched, settled — with the totals resolving to a zero difference ' +
    'at the bottom. "Reconcilable" is the actual word the live copy uses, and this is what the ' +
    'word means to anyone who has closed a book. The difference line landing on zero is the ' +
    'whole payoff.',
  pros: ['Uses the section\'s own word literally', 'Zero difference is a universally understood signal', 'Very cheap to run'],
  cons: ['Reads as accounting, not as product', 'Requires the totals to be real'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: () => {
    const dur = 10;
    const cols = [['QUOTED', '184', '412.6 TB'], ['MATCHED', '96', '268.4 TB'], ['SETTLED', '96', '268.4 TB']];
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${finShadow}
        ${lab(28, 38, 'TODAY ON JP · TIER-1', FIN.faint, { size: 9 })}
        ${lab(W - 28, 38, 'RECONCILABLE PER ROUTE', FIN.accent, { size: 9, a: 'end' })}

        ${cols.map((c, i) => {
          const x = 28 + i * 192;
          const beg = (i * 1.1).toFixed(2);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.08;1" dur="${dur}s"
              begin="${beg}s" repeatCount="indefinite" fill="freeze"/>
            <g filter="url(#oc-fs)">${rect(x, 58, 176, 150, { fill: FIN.panel, r: 14, stroke: FIN.line })}</g>
            ${lab(x + 20, 84, c[0], FIN.faint, { size: 8.5 })}
            ${t(x + 156, 132, c[1], { m: true, size: 34, w: 700, a: 'end', fill: i ? FIN.accent : FIN.text })}
            ${lab(x + 20, 152, 'EVENTS', FIN.faint, { size: 7.5 })}
            ${rect(x + 20, 162, 136, 1, { fill: FIN.line, r: 0 })}
            ${t(x + 156, 190, c[2], { m: true, size: 14, w: 600, a: 'end', fill: FIN.dim })}
            ${lab(x + 20, 190, 'VOLUME', FIN.faint, { size: 7.5 })}
          </g>`;
        }).join('')}

        ${[1, 2].map(i => `<path d="M ${28 + i * 192 - 16} 133 l 10 0 m -4 -4 l 4 4 l -4 4"
          stroke="${FIN.lineHard}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`).join('')}

        ${rect(28, 232, W - 56, 1, { fill: FIN.line, r: 0 })}
        ${CTRLS.slice(2).map((c, i) => {
          const y = 250 + i * 54;
          return `
          ${rect(28, y, W - 56, 44, { fill: FIN.rise, r: 10 })}
          <circle cx="52" cy="${y + 22}" r="10" fill="#E8F6F0"/>
          ${tick(46.5, y + 22, FIN.up, 0.8)}
          ${t(76, y + 27, c[0], { size: 12.5, w: 600, fill: FIN.text })}
          ${lab(W - 44, y + 26, 'ENFORCED', FIN.up, { size: 8, a: 'end' })}`;
        }).join('')}

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.72;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(28, 362, W - 56, 52, { fill: FIN.accentSoft, r: 12 })}
          ${lab(52, 384, 'DIFFERENCE', FIN.accent, { size: 8.5 })}
          ${t(52, 406, 'Matched and settled tie, per counterparty and per route.', { size: 11, fill: FIN.dim })}
          ${t(W - 52, 398, '0.00', { m: true, size: 28, w: 700, a: 'end', fill: FIN.accent })}
        </g>`),
    };
  },
};

/* B3 ── Exposure */
export const exposure = {
  id: 'oc-exposure',
  name: 'Exposure',
  family: 'B · fintech-clean',
  tagline: 'Two pots and a number you can act on',
  desc:
    'The clean-surface reading of segregated settlement: two stacked meters, upfront and ' +
    'deferred, filling as trades settle, with known exposure stated underneath and a limit line ' +
    'the deferred bar never crosses. The limit is what makes it a control rather than a report.',
  pros: ['Shows a limit, not just a total', 'The most treasury-legible option', 'Works at any width'],
  cons: ['Publishing a limit invites questions about it', 'Covers one control only'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: () => {
    const dur = 12;
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${finShadow}
        <g filter="url(#oc-fs)">${rect(28, 28, W - 56, 384, { fill: FIN.panel, r: 16, stroke: FIN.line })}</g>
        ${lab(56, 62, 'SEGREGATED SETTLEMENT', FIN.faint, { size: 9 })}
        ${t(56, 96, 'Tracked apart, always', { size: 20, w: 700, fill: FIN.text })}

        ${[['Paid upfront', '142.8 TB', 0.72, FIN.up], ['Deferred', '25.6 TB', 0.34, FIN.accent]].map(([nm, amt, frac, col], i) => {
          const y = 132 + i * 108;
          return `<g>
            ${t(56, y + 16, nm, { size: 13.5, w: 600, fill: FIN.text })}
            ${t(W - 56, y + 16, amt, { m: true, size: 16, w: 700, a: 'end', fill: col })}
            ${rect(56, y + 30, W - 112, 22, { fill: FIN.rise, r: 11 })}
            <rect x="56" y="${y + 30}" width="0" height="22" rx="11" fill="${col}" opacity="0.85">
              <animate attributeName="width" values="0;${((W - 112) * frac).toFixed(0)};${((W - 112) * frac).toFixed(0)}"
                keyTimes="0;0.4;1" dur="${dur}s" begin="${(i * 0.8).toFixed(1)}s" repeatCount="indefinite" fill="freeze"/></rect>
            ${lab(56, y + 70, i ? 'T+14 AND T+30 ARRANGEMENTS' : 'SETTLED AT T+0 — NO EXPOSURE CARRIED',
              FIN.faint, { size: 8 })}
            ${i === 1 ? `
              <line x1="${56 + (W - 112) * 0.6}" y1="${y + 22}" x2="${56 + (W - 112) * 0.6}" y2="${y + 60}"
                stroke="${FIN.down}" stroke-width="2" stroke-dasharray="4 3"/>
              ${lab(56 + (W - 112) * 0.6 + 8, y + 22, 'LIMIT', FIN.down, { size: 8 })}` : ''}
          </g>`;
        }).join('')}

        ${rect(56, 350, W - 112, 1, { fill: FIN.line, r: 0 })}
        ${lab(56, 376, 'KNOWN EXPOSURE', FIN.faint, { size: 9 })}
        ${t(W - 56, 384, '25.6 TB', { m: true, size: 26, w: 700, a: 'end', fill: FIN.accent })}
        ${t(56, 400, 'Deferred side only, recomputed on every settlement.', { size: 11, fill: FIN.dim })}`),
    };
  },
};

/* B4 ── Nothing Anonymous */
export const nothingAnonymous = {
  id: 'oc-anon',
  name: 'Nothing Anonymous',
  family: 'B · fintech-clean',
  tagline: 'Every print carries an identity',
  desc:
    'A short list of prints, each with a verified counterparty chip attached, and one attempt ' +
    'with no identity that is refused in place. The live page says "nothing trades anonymously" ' +
    'on the venue section and never shows it; this is that sentence, drawn. The refusal is what ' +
    'makes the rest of the list mean something.',
  pros: ['Draws a line already written on the page', 'The refusal is the proof', 'Ties controls back to the book'],
  cons: ['Needs a real format for the identity chip', 'Refusals on a marketing page need sign-off'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: () => {
    const rows = [
      ['JP · T1', '2.4 TB @ 0.83', 'Nakamura Telecom KK', true],
      ['DE · T1', '8.0 TB @ 0.62', 'Rheinmobil GmbH', true],
      ['US · T1', '1.2 TB @ 0.72', '—', false],
      ['SG · T1', '5.6 TB @ 0.59', 'Straits Connect Pte', true],
    ];
    const dur = 12;
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${finShadow}
        ${lab(28, 38, 'EVERY PRINT, EVERY COUNTERPARTY', FIN.faint, { size: 9 })}
        ${lab(W - 28, 38, 'NOTHING TRADES ANONYMOUSLY', FIN.accent, { size: 9, a: 'end' })}

        ${rows.map(([rt, dt, cp, ok], i) => {
          const y = 58 + i * 82;
          const beg = (i * 1.4).toFixed(2);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.07;1" dur="${dur}s"
              begin="${beg}s" repeatCount="indefinite" fill="freeze"/>
            <g filter="url(#oc-fs)">${rect(28, y, W - 56, 70, { fill: FIN.panel, r: 12, stroke: ok ? FIN.line : FIN.down })}</g>
            ${t(52, y + 28, rt, { size: 13, w: 700, fill: FIN.text })}
            ${t(52, y + 50, dt, { m: true, size: 11.5, fill: FIN.dim })}
            ${ok ? `
              ${rect(214, y + 18, 288, 22, { fill: '#E8F6F0', r: 11 })}
              ${tick(228, y + 29, FIN.up, 0.75)}
              ${lab(246, y + 33, 'VERIFIED · KYC + KYB', FIN.up, { size: 7.5 })}
              ${t(214, y + 56, cp, { size: 11.5, w: 600, fill: FIN.text })}
              ${t(W - 52, y + 32, 'a91f3c', { m: true, size: 11, a: 'end', fill: FIN.accent })}
              ${lab(W - 52, y + 52, 'RECORDED', FIN.faint, { size: 7.5, a: 'end' })}` : `
              ${rect(214, y + 18, 288, 22, { fill: '#FDECEE', r: 11 })}
              ${cross(228, y + 29, FIN.down, 4.5)}
              ${lab(246, y + 33, 'NO VERIFIED COUNTERPARTY', FIN.down, { size: 7.5 })}
              ${t(214, y + 56, 'Refused — never reached the book', { size: 11.5, w: 600, fill: FIN.down })}
              ${t(W - 52, y + 32, '—', { m: true, size: 11, a: 'end', fill: FIN.faint })}
              ${lab(W - 52, y + 52, 'NO RECORD', FIN.faint, { size: 7.5, a: 'end' })}`}
          </g>`;
        }).join('')}
        ${lab(28, H - 14, 'VERIFICATION OF BOTH THE INDIVIDUAL AND THE BUSINESS, BEFORE A PRICE IS EVER SEEN',
          FIN.faint, { size: 8 })}`),
    };
  },
};

/* B5 ── Show the Working */
export const showTheWorking = {
  id: 'oc-working',
  name: 'Show the Working',
  family: 'B · fintech-clean',
  tagline: 'Open one trade and read everything behind it',
  desc:
    'One settled trade expanded into its full record: both counterparties with their ' +
    'verification state, the standing check that allowed the match, the price with the signal ' +
    'snapshot behind it, the settlement arrangement and the reference. It is the literal answer ' +
    'to "has to be able to show its working" — one object containing all four controls at once.',
  pros: ['Most complete answer to the section heading', 'Shows all four controls as one artefact', 'Reads as a real receipt'],
  cons: ['Densest of the FIN options', 'Every field needs to exist in the real system'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 3, brand: 4, ease: 3 },
  build: () => {
    const dur = 11;
    const fields = [
      ['BUYER', 'Nakamura Telecom KK', 'KYC + KYB cleared', true],
      ['SELLER', 'Rheinmobil GmbH', 'KYC + KYB cleared', true],
      ['STANDING', 'Full MVNO', 'Clears JP · Tier-1 minimum', true],
      ['PRICE', '0.83 USD / GB', 'From a 109-signal snapshot', true],
      ['SETTLEMENT', 'Deferred · T+30', 'Segregated from upfront', true],
    ];
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${finShadow}
        <g filter="url(#oc-fs)">${rect(28, 28, W - 56, 384, { fill: FIN.panel, r: 16, stroke: FIN.line })}</g>
        ${lab(56, 60, 'SETTLED TRADE · FULL RECORD', FIN.faint, { size: 9 })}
        ${t(56, 92, 'JP · Tier-1 · 2.4 TB', { size: 19, w: 700, fill: FIN.text })}
        ${t(W - 56, 92, 'OMDM-a91f3c', { m: true, size: 13, w: 700, a: 'end', fill: FIN.accent })}
        ${rect(56, 108, W - 112, 1, { fill: FIN.line, r: 0 })}

        ${fields.map(([k, v, note], i) => {
          const y = 124 + i * 56;
          const kt = (0.08 + i * 0.13).toFixed(3);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;${kt};1" dur="${dur}s"
              repeatCount="indefinite" fill="freeze"/>
            ${lab(56, y + 14, k, FIN.faint, { size: 8 })}
            ${t(56, y + 36, v, { size: 13.5, w: 600, fill: FIN.text })}
            ${rect(320, y + 14, 248, 26, { fill: FIN.rise, r: 8 })}
            ${tick(334, y + 27, FIN.up, 0.75)}
            ${t(352, y + 32, note, { size: 10.5, fill: FIN.dim })}
          </g>`;
        }).join('')}

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.82;0.9;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(56, 396, 232, 1, { fill: FIN.line, r: 0 })}
          ${lab(56, 392, 'RECONCILABLE PER COUNTERPARTY AND PER ROUTE', FIN.accent, { size: 8 })}
        </g>`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   ROUND TWO — options 11–15. Axes the first ten left alone: the artefact a
   third party receives, claims paired with figures, the month’s refusals in
   aggregate, the latency of the record, and standing as something earned.
   ══════════════════════════════════════════════════════════════════════════ */

/* a figure that steps through `vals` on a slow cycle — the same mechanism the
   hero and book files call `repricing`, which this file did not need until now */
const stepper = (x, y, vals, o = {}) => {
  const n = vals.length;
  const kt = vals.map((_, i) => (i / n).toFixed(4)).concat('1').join(';');
  return `<text x="${x}" y="${y}" font-family="${MO}" font-size="${o.size || 14}" font-weight="${o.w || 600}"` +
    ` fill="${o.fill || '#fff'}" text-anchor="${o.a || 'end'}">` +
    vals.map((v, i) =>
      `<tspan x="${x}" opacity="0">${v}` +
      `<animate attributeName="opacity" values="${vals.map((_, j) => (j === i ? '1' : '0')).join(';')};${i === 0 ? '1' : '0'}"` +
      ` keyTimes="${kt}" dur="${o.dur || 10}s" repeatCount="indefinite" calcMode="discrete"/></tspan>`
    ).join('') + '</text>';
};

/* 11 ── The Export (INST) */
export const theExport = {
  id: 'oc-export',
  name: 'The Export',
  family: 'A · institutional',
  tagline: 'The pack an auditor actually receives',
  desc:
    'The other options show the record being written. This one shows it leaving the building. A ' +
    'period is selected, the pack builds — 5,412 quotes, 2,784 matches, 2,784 settlements, ' +
    '10,980 sealed entries — and it closes with a checksum and a seal time. It answers the ' +
    'question the section provokes and never addresses: fine, but can my auditor get it, and in ' +
    'what form.',
  pros: ['Answers the due-diligence question directly', 'A checksum on a finite pack is a stronger claim than “immutable”', 'The counts tie back to the reconciliation option'],
  cons: ['Committing to a file format and a checksum is a real product commitment', 'A build-progress bar is a dull piece of motion', 'Nothing about verification or segregation appears'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: () => {
    const dur = 12;
    const fields = [['PERIOD', '01 – 30 SEP'], ['ROUTE', 'JP · TIER-1'], ['COUNTERPARTIES', 'ALL 34']];
    const counts = [
      ['QUOTES', ['1,204', '3,880', '5,412']],
      ['MATCHES', ['612', '1,996', '2,784']],
      ['SETTLEMENTS', ['612', '1,996', '2,784']],
      ['ENTRIES SEALED', ['2,428', '7,872', '10,980']],
    ];
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        ${glow(`${W - 80}`, `0`, `230`, 0.45)}
        ${lab(28, 32, 'AUDIT EXPORT', INST.text, { size: 9.5 })}
        ${lab(W - 28, 32, 'FOR A THIRD PARTY', INST.faint, { a: 'end' })}

        ${rect(28, 48, W - 56, 72, { fill: INST.panel, r: 6 })}
        ${fields.map(([k, v], i) => {
          const x = 44 + i * 188;
          return `${lab(x, 72, k, INST.faint, { size: 7.5 })}
            ${t(x, 96, v, { m: true, size: 13, w: 600, fill: INST.text })}`;
        }).join('')}

        ${lab(28, 148, 'BUILDING PACK', INST.faint, { size: 8.5 })}
        ${rect(28, 158, W - 56, 6, { fill: 'rgba(255,255,255,0.08)', r: 3 })}
        <rect x="28" y="158" width="0" height="6" rx="3" fill="${INST.gold}">
          <animate attributeName="width" values="0;${W - 56};${W - 56}" keyTimes="0;0.5;1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/></rect>

        ${counts.map(([k, vals], i) => {
          const y = 186 + i * 44;
          return `
          ${rect(28, y, W - 56, 36, { fill: i % 2 ? 'rgba(255,255,255,0.025)' : 'none', r: 4 })}
          ${lab(44, y + 22, k, INST.dim, { size: 8.5 })}
          ${stepper(W - 44, y + 26, vals, { fill: i === 3 ? INST.gold : INST.text, size: 17, w: 700, dur: dur / 2 })}`;
        }).join('')}

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.7;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(28, 366, W - 56, 46, { fill: INST.panel, r: 6, stroke: INST.goldDim })}
          ${lab(44, 386, 'SHA-256', INST.faint, { size: 7.5 })}
          ${t(104, 388, 'a91f3c…7c02be', { m: true, size: 12, w: 600, fill: INST.gold })}
          ${lab(44, 404, 'SEALED 30 SEP 23:59:58 UTC · 1.4 MB · CSV + JSON', INST.faint, { size: 7.5 })}
          ${tick(W - 148, 390, INST.up, 0.9)}
          ${lab(W - 128, 394, 'READY', INST.up, { size: 9 })}
        </g>
        ${lab(28, H - 8, 'EVERY LINE IN THE PACK CAN BE RE-DERIVED FROM THE CHAIN IT CAME FROM', INST.faint, { size: 8.5 })}`),
    };
  },
};

/* 12 ── Claim and Artefact (FIN) */
export const claimAndArtefact = {
  id: 'oc-claims',
  name: 'Claim and Artefact',
  family: 'B · fintech-clean',
  tagline: 'Each of the four sentences, with the figure behind it',
  desc:
    'The four controls in the page\u2019s own words, set large, each paired with one number that ' +
    'backs it — 34 of 41 applications admitted, 128 quotes blocked below the bar, 10,980 sealed ' +
    'entries, 25.6 TB of deferred exposure tracked apart. No illustration, no flow, no card. It ' +
    'is the smallest possible change that turns the section from four claims into four claims ' +
    'with evidence.',
  pros: ['Keeps all four controls at equal weight, in the live order', 'Cheapest option here by a wide margin', 'Every figure is one number the system can produce'],
  cons: ['No motion worth the name — four figures landing', 'Type-only beside a four-item list risks looking like a second list', 'Four disconnected metrics do not tell a story'],
  scores: { story: 4, motion: 2, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: () => {
    const dur = 10;
    const rows = [
      ['34 / 41', 'ADMITTED OF APPLIED', FIN.text],
      ['128', 'QUOTES BLOCKED BELOW THE BAR', FIN.accent],
      ['10,980', 'SEALED ENTRIES IN SEPTEMBER', FIN.text],
      ['25.6 TB', 'DEFERRED EXPOSURE, TRACKED APART', FIN.accent],
    ];
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${lab(28, 40, 'WHAT WE CLAIM', FIN.faint, { size: 9 })}
        ${lab(W - 28, 40, 'WHAT BACKS IT · SEPTEMBER', FIN.accent, { size: 9, a: 'end' })}

        ${CTRLS.map((c, i) => {
          const y = 76 + i * 88;
          const on = (0.12 + i * 0.14).toFixed(3);
          const onE = (0.18 + i * 0.14).toFixed(3);
          const [fig, note, col] = rows[i];
          return `<g>
            ${rect(28, y, W - 56, 1, { fill: FIN.line, r: 0 })}
            <rect x="28" y="${y - 1}" width="0" height="2" fill="${FIN.accent}">
              <animate attributeName="width" values="0;0;${W - 56};${W - 56}" keyTimes="0;${on};${onE};1"
                dur="${dur}s" repeatCount="indefinite" fill="freeze"/></rect>
            ${t(28, y + 34, c[0], { size: 21, w: 700, fill: FIN.text })}
            ${lab(28, y + 56, SHORT[i], FIN.faint, { size: 7.5 })}
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${onE};1"
                dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
              ${t(W - 28, y + 38, fig, { m: true, size: 32, w: 700, a: 'end', fill: col })}
              ${lab(W - 28, y + 58, note, FIN.faint, { size: 7.5, a: 'end' })}
            </g>
          </g>`;
        }).join('')}
        ${rect(28, 428, W - 56, 1, { fill: FIN.line, r: 0 })}
        ${lab(28, 420, 'FOUR SENTENCES, FOUR FIGURES — JP · TIER-1, SEPTEMBER', FIN.dim, { size: 8.5 })}`),
    };
  },
};

/* 13 ── What Got Stopped (INST) */
export const whatGotStopped = {
  id: 'oc-stopped',
  name: 'What Got Stopped',
  family: 'A · institutional',
  tagline: 'A month of refusals, counted',
  desc:
    'The Gate and Nothing Anonymous each show one refusal as a moment. This shows the month in ' +
    'aggregate: 41 applications, 34 admitted, 7 refused — three for unverifiable business ' +
    'ownership, two for a sanctioned jurisdiction, two for standing below every route minimum — ' +
    'plus 128 quotes blocked at the bar and no anonymous prints at all. It is the shape of ' +
    'answer a compliance review expects, which is a tally rather than an anecdote.',
  pros: ['A rate, not an anecdote — harder to dismiss', 'Names the three refusal grounds separately', 'The zero at the end is the strongest figure on the panel'],
  cons: ['Publishing a refusal rate invites questions about who was refused', 'Needs real monthly figures and a policy on restating them', 'Entirely a statistics panel — no product surface visible'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: () => {
    const dur = 12;
    const x0 = 28, wTot = W - 56;
    const admW = (wTot * 34 / 41).toFixed(0);
    const refW = (wTot * 7 / 41).toFixed(0);
    const reasons = [['Business ownership could not be verified', 3], ['Sanctioned jurisdiction', 2], ['Standing below every route minimum', 2]];
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        ${glow(`120`, `0`, `240`, 0.45)}
        ${lab(28, 32, 'WHAT THE CONTROLS STOPPED IN SEPTEMBER', INST.text, { size: 9.5 })}
        ${lab(W - 28, 32, 'ALL ROUTES', INST.faint, { a: 'end' })}

        ${lab(28, 64, 'APPLIED TO QUOTE', INST.faint, { size: 8.5 })}
        ${t(W - 28, 68, '41', { m: true, size: 20, w: 700, a: 'end', fill: INST.text })}
        ${rect(x0, 78, wTot, 30, { fill: 'rgba(255,255,255,0.08)', r: 4 })}

        <rect x="${x0}" y="126" width="0" height="30" rx="4" fill="${INST.up}" opacity="0.8">
          <animate attributeName="width" values="0;${admW};${admW}" keyTimes="0;0.22;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/></rect>
        <rect y="126" height="30" rx="4" fill="${INST.down}" opacity="0.85">
          <animate attributeName="x" values="${x0};${+x0 + +admW + 4};${+x0 + +admW + 4}" keyTimes="0;0.22;1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <animate attributeName="width" values="0;${+refW - 4};${+refW - 4}" keyTimes="0;0.22;1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/></rect>
        <line x1="${x0 + 40}" y1="108" x2="${x0 + 40}" y2="126" stroke="${INST.line}"/>
        <line x1="${W - 68}" y1="108" x2="${W - 68}" y2="126" stroke="${INST.line}"/>
        ${lab(x0 + 14, 174, '34 ADMITTED', INST.up, { size: 9 })}
        ${lab(W - 28, 174, '7 REFUSED', INST.down, { size: 9, a: 'end' })}

        ${reasons.map(([why, n], i) => {
          const y = 194 + i * 46;
          const on = (0.32 + i * 0.1).toFixed(3);
          const onE = (0.37 + i * 0.1).toFixed(3);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${onE};1" dur="${dur}s"
              repeatCount="indefinite" fill="freeze"/>
            ${rect(28, y, W - 56, 38, { fill: INST.panel, r: 5 })}
            ${rect(28, y, 3, 38, { fill: INST.down, r: 0 })}
            ${cross(52, y + 19, INST.down, 4.5)}
            ${t(74, y + 24, why, { size: 12, w: 500, fill: INST.text })}
            ${t(W - 44, y + 25, String(n), { m: true, size: 16, w: 700, a: 'end', fill: INST.down })}
          </g>`;
        }).join('')}

        ${rect(28, 348, W - 56, 1, { fill: INST.line, r: 0 })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${lab(28, 376, 'QUOTES BLOCKED BELOW THE ROUTE MINIMUM', INST.dim, { size: 8.5 })}
          ${t(W - 28, 382, '128', { m: true, size: 22, w: 700, a: 'end', fill: INST.gold })}
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.78;0.86;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${lab(28, 408, 'PRINTS WITHOUT A VERIFIED COUNTERPARTY', INST.dim, { size: 8.5 })}
          ${t(W - 28, 414, '0', { m: true, size: 22, w: 700, a: 'end', fill: INST.up })}
        </g>
        ${lab(28, 434, 'A CONTROL THAT NEVER REFUSES ANYTHING IS NOT A CONTROL', INST.faint, { size: 8.5 })}`),
    };
  },
};

/* 14 ── Twenty-Two Milliseconds (FIN) */
export const twentyTwoMs = {
  id: 'oc-ms',
  name: 'Twenty-Two Milliseconds',
  family: 'B · fintech-clean',
  tagline: 'The record is written before the money moves',
  desc:
    'One trade on a millisecond scale: the quote is accepted at 14:22:04.118, matched eight ' +
    'milliseconds later, sealed into the trail fourteen after that. Twenty-two milliseconds from ' +
    'quote to sealed record, against a settlement instruction that will not clear for thirty ' +
    'days. The gap between those two numbers is the whole argument — the audit trail is written ' +
    'synchronously, not reconstructed from a nightly batch.',
  pros: ['Answers a sharp technical objection no other option addresses', 'One interval to remember, and it is a small one', 'Reads instantly on a phone'],
  cons: ['A specific latency figure is a commitment engineering has to hold', 'Milliseconds are abstract to a commercial reader', 'Covers the audit trail only'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 9;
    const sh = `<defs><filter id="${uid}-sh" x="-20%" y="-20%" width="140%" height="140%">` +
      `<feDropShadow dx="0" dy="5" stdDeviation="9" flood-color="#0F172A" flood-opacity="0.07"/></filter></defs>`;
    const x0 = 64, x1 = 560;
    const at = (ms) => (x0 + (ms / 22) * (x1 - x0)).toFixed(1);
    const marks = [[0, '14:22:04.118', 'QUOTE ACCEPTED'], [8, '.126', 'MATCHED'], [22, '.140', 'SEALED INTO THE TRAIL']];
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${sh}
        ${lab(28, 40, 'ONE TRADE, TO THE MILLISECOND', FIN.faint, { size: 9 })}
        ${lab(W - 28, 40, 'JP · TIER-1 · 2.4 TB @ 0.83', FIN.faint, { size: 9, a: 'end' })}

        ${lab(W / 2, 92, 'QUOTE TO SEALED RECORD', FIN.faint, { size: 9, a: 'middle' })}
        ${t(W / 2, 150, '22 ms', { m: true, size: 58, w: 700, a: 'middle', fill: FIN.accent })}

        <line x1="${x0}" y1="216" x2="${x1}" y2="216" stroke="${FIN.lineHard}" stroke-width="2"/>
        <circle cy="216" r="7" fill="${FIN.accent}">
          <animate attributeName="cx" values="${x0};${x1};${x1}" keyTimes="0;0.42;1" dur="${dur}s"
            repeatCount="indefinite"/></circle>
        <rect x="${x0}" y="213" width="0" height="6" rx="3" fill="${FIN.accent}">
          <animate attributeName="width" values="0;${x1 - x0};${x1 - x0}" keyTimes="0;0.42;1" dur="${dur}s"
            repeatCount="indefinite"/></rect>

        ${marks.map(([ms, stamp, what], i) => {
          const x = at(ms);
          const a = i === 0 ? 'start' : i === 2 ? 'end' : 'middle';
          const on = (0.04 + (ms / 22) * 0.38).toFixed(3);
          const onE = (+on + 0.03).toFixed(3);
          return `
          <line x1="${x}" y1="196" x2="${x}" y2="236" stroke="${FIN.lineHard}"/>
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${onE};1" dur="${dur}s"
              repeatCount="indefinite" fill="freeze"/>
            ${t(x, 188, stamp, { m: true, size: 12, w: 600, a, fill: FIN.text })}
            ${lab(x, 258, what, FIN.dim, { size: 8, a })}
            ${lab(x, 274, '+' + ms + ' ms', FIN.faint, { size: 8, a })}
          </g>`;
        }).join('')}

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.52;0.6;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          <g filter="url(#${uid}-sh)">${rect(28, 300, W - 56, 76, { fill: FIN.panel, r: 14, stroke: FIN.line })}</g>
          ${lab(52, 328, 'SETTLEMENT INSTRUCTION', FIN.faint, { size: 8 })}
          ${t(52, 352, 'Deferred · T+30 · segregated from upfront', { size: 13, w: 600, fill: FIN.text })}
          ${t(W - 52, 348, 'T+30', { m: true, size: 24, w: 700, a: 'end', fill: FIN.accent })}
        </g>
        ${lab(28, 404, 'THE RECORD EXISTS THIRTY DAYS BEFORE THE MONEY MOVES', FIN.dim, { size: 8.5 })}
        ${lab(28, 424, 'RECORDED SYNCHRONOUSLY, NOT RECONSTRUCTED FROM A NIGHTLY BATCH', FIN.faint, { size: 8.5 })}`),
    };
  },
};

/* 15 ── Standing, Earned (FIN) */
export const standingEarned = {
  id: 'oc-standing',
  name: 'Standing, Earned',
  family: 'B · fintech-clean',
  tagline: 'Six months of delivery, three levels, more routes',
  desc:
    'Minimum level enforcement read as an opportunity rather than a barrier. One counterparty\u2019s ' +
    'standing over six months: reseller in April, MVNO-reseller from June once the delivery record ' +
    'supported it, full MVNO in September — and the count of routes it may quote rising from 3 to ' +
    '11 to 24 behind it. The Bar shows the door closed; this shows what opens it.',
  pros: ['The only option that frames a control as something a buyer can act on', 'Draws “the delivery record sitting behind it”, which no option uses', 'Gives the section a positive ending'],
  cons: ['Softens a section whose job is rigour', 'Promotion criteria have to be real and published, or this is a promise', 'The route counts are illustrative'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 3, ease: 4 },
  build: (uid) => {
    const dur = 12;
    const sh = `<defs><filter id="${uid}-sh" x="-20%" y="-20%" width="140%" height="140%">` +
      `<feDropShadow dx="0" dy="5" stdDeviation="9" flood-color="#0F172A" flood-opacity="0.07"/></filter></defs>`;
    const months = ['APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP'];
    const level = [0, 0, 1, 1, 1, 2];               /* 0 reseller, 1 MVNO-reseller, 2 full MVNO */
    const bands = [['FULL MVNO', 132], ['MVNO-RESELLER', 186], ['RESELLER', 240]];
    const yOf = (l) => [240, 186, 132].at(l);
    const xOf = (i) => 88 + i * 84;
    const step = months.map((_, i) => {
      const x = xOf(i), y = yOf(level[i]);
      const prev = i ? yOf(level[i - 1]) : y;
      return (i ? `L ${x} ${prev} L ${x} ${y} ` : `M ${x} ${y} `) + `L ${x + 42} ${y}`;
    }).join(' ');
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${sh}
        ${lab(28, 40, 'STANDING IS EARNED, NOT DECLARED', FIN.faint, { size: 9 })}
        ${lab(W - 28, 40, 'TIER &amp; STANDING · 9 SIGNALS', FIN.accent, { size: 9, a: 'end' })}

        ${t(28, 74, 'Straits Connect Pte', { size: 17, w: 700, fill: FIN.text })}
        ${lab(W - 28, 72, 'SIX MONTHS ON THE BOOK', FIN.faint, { size: 8, a: 'end' })}

        ${lab(28, 108, 'MNO — NOT REACHABLE BY PROMOTION', FIN.faint, { size: 7.5 })}
        <line x1="28" y1="114" x2="${W - 28}" y2="114" stroke="${FIN.line}" stroke-dasharray="3 4"/>
        ${bands.map(([nm, y]) => `
          <line x1="28" y1="${y}" x2="${W - 28}" y2="${y}" stroke="${FIN.line}"/>
          ${lab(28, y - 8, nm, FIN.dim, { size: 7.5 })}`).join('')}

        <path d="${step}" fill="none" stroke="${FIN.accent}" stroke-width="3" stroke-linecap="round"
          pathLength="1" stroke-dasharray="1" stroke-dashoffset="1">
          <animate attributeName="stroke-dashoffset" values="1;0;0" keyTimes="0;0.45;1" dur="${dur}s"
            repeatCount="indefinite"/></path>

        ${months.map((m, i) => {
          const x = xOf(i), y = yOf(level[i]);
          const on = (0.06 + i * 0.065).toFixed(3);
          const onE = (+on + 0.03).toFixed(3);
          return `
          ${lab(x + 21, 270, m, FIN.faint, { size: 8, a: 'middle' })}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${onE};1" dur="${dur}s"
              repeatCount="indefinite" fill="freeze"/>
            <circle cx="${x + 21}" cy="${y}" r="5" fill="${FIN.panel}" stroke="${FIN.accent}" stroke-width="2.5"/>
          </g>`;
        }).join('')}

        ${rect(28, 294, W - 56, 1, { fill: FIN.line, r: 0 })}
        ${lab(28, 322, 'ROUTES IT MAY QUOTE', FIN.faint, { size: 8.5 })}
        ${stepper(W - 28, 330, ['3', '11', '24'], { fill: FIN.accent, size: 28, w: 700, dur: dur })}
        ${lab(28, 358, 'DELIVERY RECORD', FIN.faint, { size: 8.5 })}
        ${t(W - 28, 364, '38 SETTLEMENTS, ALL ON TIME', { m: true, size: 13, w: 600, a: 'end', fill: FIN.up })}

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.6;0.68;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(28, 382, W - 56, 34, { fill: FIN.accentSoft, r: 10 })}
          ${tick(48, 399, FIN.up, 0.85)}
          ${t(72, 404, 'Promoted to full MVNO — now clears the JP · Tier-1 minimum', { size: 12, w: 600, fill: FIN.text })}
        </g>
        ${lab(28, 432, 'THE BOOK WILL NOT MATCH BELOW THE MINIMUM, BUT THE MINIMUM CAN BE MET', FIN.faint, { size: 8.5 })}`),
    };
  },
};

export const OMDM_CTRL_VARIANTS = [
  ctrlCurrent,
  theGate, theBar, theChain, twoPots, fourStamps,
  onboarding, reconciled, exposure, nothingAnonymous, showTheWorking,
  theExport, claimAndArtefact, whatGotStopped, twentyTwoMs, standingEarned,
];
