/* ─────────────────────────────────────────────────────────────────────────
   /home — the product panel inside "Why choose Openline?" (300 × 374).

   The section is a six-cell grid. Five cells are orange Openline-vs-Others
   comparison cards; the sixth — this one — is a white-ish panel holding a
   floating phone with a QR code. Dimensions, palette and copy are mirrored
   from openline-revisions-hub.vercel.app/home:

     card    300 × 374, rounded 12, 2px #FF5314 border, #FAFAFA ground
     scene   linear-gradient(160deg, rgba(255,83,20,.08), #fff 62%)
     pill    "Online in 30s", white on #FF5314, at x165 y11, 117 × 28
     badge   "Connected", #047857 on #ECFDF5, 9px/700
     meta    "Tier-1 · 5G", mono 8.5px, rgba(11,11,15,.47)
     chips   "Stay connected" / "At the fullest speed", white .9, rounded 8

   Option 0 replicates what ships, unsynchronised loops included. 1–15 are
   proposals. Every figure across the proposals is illustrative and is flagged
   as such in that option's cons — none of it is benchmarked. Carrier and
   country names are placeholders and must be checked against real coverage
   and real contracts before anything here ships.
   ───────────────────────────────────────────────────────────────────────── */
import { boxWrap, TONES, INK, WHITE, LINE } from './kit.js';

const MO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const W = 300, H = 374;
const w = boxWrap(W, H);
const noPills = [];

const OR = TONES.orange.main;      /* #FF5314 */
const ORD = TONES.orange.deep;     /* #E23D00 */
const ORW = TONES.orange.wash;
const GND = '#FAFAFA';
const GRN = '#047857';
const GRNW = '#ECFDF5';
const GRND = '#10B981';
const MUT = 'rgba(11,11,15,0.47)';
const MUT2 = 'rgba(11,11,15,0.30)';
const PHONE = '#0F0F12';
const GREY = '#98A2B3';
const GREYD = '#667085';

/* ── primitives ──────────────────────────────────────────────────────── */

const t = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}"${o.m ? ` font-family="${MO}"` : ''} font-size="${o.size || 11}"` +
  ` font-weight="${o.w || 400}" fill="${o.fill || INK}"${o.op == null ? '' : ` opacity="${o.op}"`}` +
  ` text-anchor="${o.a || 'start'}"${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${s}</text>`;

const lab = (x, y, s, o = {}) =>
  t(x, y, s, { m: true, size: o.size || 8, ls: o.ls == null ? 1.1 : o.ls, fill: o.fill || MUT, a: o.a, op: o.op, w: o.w });

const rect = (x, y, ww, hh, o = {}) =>
  `<rect x="${x}" y="${y}" width="${ww}" height="${hh}" rx="${o.r == null ? 8 : o.r}"` +
  ` fill="${o.fill || 'none'}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 1}"` : ''}` +
  `${o.op == null ? '' : ` opacity="${o.op}"`}/>`;

/* The card itself: #FAFAFA ground, 2px orange border, warm scene wash.
   Drawn by every option so the panel always reads as the same cell. */
const shell = (uid, extraDefs = '') => `
  <defs>
    <linearGradient id="${uid}-scene" x1="0" y1="0" x2="0.55" y2="1">
      <stop offset="0" stop-color="${OR}" stop-opacity="0.08"/>
      <stop offset="0.62" stop-color="#FFFFFF" stop-opacity="1"/>
    </linearGradient>
    ${extraDefs}
  </defs>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="12" fill="${GND}" stroke="${OR}" stroke-width="2"/>
  <rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="11" fill="url(#${uid}-scene)"/>`;

/* The orange "Online in 30s" pill, at its live position. */
const claimPill = (text, o = {}) => `
  <g${o.anim ? '' : ''}>
    ${rect(165, 11, 117, 28, { fill: o.fill || OR, r: 14 })}
    ${t(223, 29, text, { size: 11.5, w: 700, fill: WHITE, a: 'middle' })}
  </g>`;

/* A QR block: deterministic pattern plus three corner finders, so it reads
   as a real code rather than noise. */
const qr = (x, y, size) => {
  const n = 13;
  const c = size / n;
  let cells = '';
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const corner = (i < 4 && j < 4) || (i < 4 && j > n - 5) || (i > n - 5 && j < 4);
      if (corner) continue;
      /* deterministic hash so the code is stable across renders */
      if (((i * 7 + j * 13 + ((i * j) % 5)) % 3) === 0) {
        cells += `<rect x="${(x + j * c).toFixed(2)}" y="${(y + i * c).toFixed(2)}" width="${(c * 0.86).toFixed(2)}" height="${(c * 0.86).toFixed(2)}" fill="${INK}"/>`;
      }
    }
  }
  const finder = (fx, fy) => `
    <rect x="${fx}" y="${fy}" width="${(c * 3.4).toFixed(2)}" height="${(c * 3.4).toFixed(2)}" fill="none" stroke="${INK}" stroke-width="${(c * 0.7).toFixed(2)}"/>
    <rect x="${(fx + c * 1.2).toFixed(2)}" y="${(fy + c * 1.2).toFixed(2)}" width="${(c * 1.05).toFixed(2)}" height="${(c * 1.05).toFixed(2)}" fill="${INK}"/>`;
  return cells + finder(x, y) + finder(x + size - c * 3.4, y) + finder(x, y + size - c * 3.4);
};

/* The phone: body, screen, speaker slot. */
const phone = (x, y, ww, hh) => `
  ${rect(x, y, ww, hh, { fill: PHONE, r: 20 })}
  ${rect(x + 5, y + 5, ww - 10, hh - 10, { fill: WHITE, r: 16 })}
  ${rect(x + ww / 2 - 13, y + 11, 26, 4, { fill: '#2A2A31', r: 2 })}`;

/* Wi-Fi arcs radiating from a point, each on its own delay. */
const arcs = (cx, cy, dur, o = {}) => {
  const path = (r) => `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r}`;
  return [0, 1, 2].map((i) => {
    const r = 12 + i * 9;
    return `<path d="${path(r)}" fill="none" stroke="${o.stroke || OR}" stroke-width="2.4"
      stroke-linecap="round" opacity="0">
      <animate attributeName="opacity" values="${o.vals || '0;0.85;0'}"
        keyTimes="0;0.5;1" dur="${dur}s" begin="${(o.begin || 0) + i * 0.22}s"
        repeatCount="indefinite"/>
    </path>`;
  }).join('');
};

/* The two outline chips, at their live positions. */
const chips = (o = {}) => {
  const chip = (x, y, ww, text, mark) => `
    ${rect(x, y, ww, 30, { fill: 'rgba(255,255,255,0.9)', stroke: 'rgba(11,11,15,0.10)', r: 8 })}
    ${mark(x + 15, y + 15)}
    ${t(x + 27, y + 19, text, { size: 11.5, w: 500, fill: '#171717' })}`;
  const wifiMark = (cx, cy) => `
    <path d="M ${cx - 5} ${cy} A 7 7 0 0 1 ${cx + 5} ${cy}" fill="none" stroke="${GREYD}" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy + 3.5}" r="1.5" fill="${GREYD}"/>`;
  const gaugeMark = (cx, cy) => `
    <path d="M ${cx - 5.5} ${cy + 2.5} A 5.5 5.5 0 0 1 ${cx + 5.5} ${cy + 2.5}" fill="none" stroke="${GREYD}" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M ${cx} ${cy + 2.5} L ${cx + 3} ${cy - 2}" stroke="${GREYD}" stroke-width="1.5" stroke-linecap="round"/>`;
  return `
    <g${o.op == null ? '' : ` opacity="${o.op}"`}>
      ${chip(16, 286, 131, 'Stay connected', wifiMark)}
      ${chip(16, 324, 153, 'At the fullest speed', gaugeMark)}
    </g>`;
};

/* Discrete text frames. The final keyTimes pair never displays, so an extra
   value is appended to keep the counts equal — see STYLE notes on the
   calcMode="discrete" trap. */
const seq = (x, y, list, dur, o = {}) => {
  const n = list.length;
  const even = Array.from({ length: n }, (_, i) => (i / n).toFixed(4));
  /* o.kt must carry exactly one stop per label: keyTimes ends up kt.length + 1
     and values n + 1, and SVG drops the whole animation if those disagree.
     Two options shipped one stop short during review, silently freezing their
     counters, so fall back to even spacing rather than emitting a broken tag. */
  let kt = o.kt || even;
  if (kt.length !== n) {
    if (typeof console !== 'undefined') {
      console.warn(`home-why seq(): ${kt.length} keyTimes for ${n} labels — using even spacing`);
    }
    kt = even;
  }
  const keyTimes = kt.concat('1').join(';');
  return list.map((s, i) => {
    const vals = list.map((_, j) => (j === i ? '1' : '0'));
    vals.push(i === 0 ? '1' : '0');
    return `<text x="${x}" y="${y}"${o.m ? ` font-family="${MO}"` : ''} font-size="${o.size || 11}"
      font-weight="${o.w || 400}" fill="${o.fill || INK}" text-anchor="${o.a || 'start'}"
      ${o.ls ? `letter-spacing="${o.ls}"` : ''} opacity="0">${s}<animate attributeName="opacity"
        values="${vals.join(';')}" keyTimes="${keyTimes}" dur="${dur}s"
        repeatCount="indefinite" calcMode="discrete"/></text>`;
  }).join('');
};

/* Fade a group in once per loop and hold it. */
const showAt = (from, to, dur) => `
  <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${from};${to};1"
    dur="${dur}s" repeatCount="indefinite"/>`;

/* ══════════════════════════════════════════════════════════════════════
   0 · Current — faithful replica, unsynchronised loops included
   ══════════════════════════════════════════════════════════════════════ */
const current = {
  id: 'hw-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'A phone floating in a comparison grid',
  desc:
    'What ships now: a phone drifts up and down, a line sweeps the QR code, a green "Connected" ' +
    'badge rises, three Wi-Fi arcs pulse and an orange "Online in 30s" pill floats — on six ' +
    'separate loops running at 2.2, 2.6, 2.6, 3, 5.5, 6 and 7 seconds. Nothing ever finishes, and ' +
    'nothing lines up. It is also the only cell in a six-cell comparison grid that does not ' +
    'compare anything: the other five argue Openline against Others, and this one shows a device.',
  pros: ['Attractive, well-drawn artwork', 'Establishes the product is a phone eSIM', 'Warm and on-brand'],
  cons: [
    'The only cell in the grid that makes no argument',
    'Six unsynchronised loops keep it busy without ever resolving',
    '"Online in 30s" is asserted while no clock ever runs',
    'The QR is scanned forever and never installs anything',
    'The identical panel is reused verbatim lower down the page',
  ],
  scores: { story: 2, motion: 3, perf: 4, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => ({
    pills: noPills,
    svg: w(`
      ${shell(uid, `
        <radialGradient id="${uid}-glow">
          <stop offset="0" stop-color="${OR}" stop-opacity="0.22"/>
          <stop offset="1" stop-color="${OR}" stop-opacity="0"/>
        </radialGradient>`)}

      <circle cx="150" cy="150" r="118" fill="url(#${uid}-glow)">
        <animate attributeName="opacity" values="0.55;1;0.55" keyTimes="0;0.5;1" dur="7s" repeatCount="indefinite"/>
      </circle>

      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -7;0 0"
          keyTimes="0;0.5;1" dur="6s" repeatCount="indefinite" calcMode="spline"
          keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
        ${phone(90, 44, 120, 268)}
        ${qr(114, 78, 72)}

        <g opacity="0.9">
          ${arcs(228, 92, 2.4)}
        </g>

        ${rect(113, 162, 70, 17, { fill: GRNW, r: 8.5 })}
        <circle cx="122" cy="170.5" r="2.6" fill="${GRND}"/>
        ${t(128, 174, 'Connected', { size: 9, w: 700, fill: GRN })}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 4;0 0;0 0"
            keyTimes="0;0.35;1" dur="2.6s" repeatCount="indefinite"/>
          ${t(122, 199, 'Tier-1 · 5G', { m: true, size: 8.5, fill: MUT })}
        </g>

        ${/* the sweep stops short of the badge at y162 - at the old 80px size
             the code's bottom row sat underneath it. */ ''}
        <rect x="116" y="80" width="68" height="2.4" rx="1.2" fill="${OR}" opacity="0.8">
          <animate attributeName="y" values="80;148;80" keyTimes="0;0.5;1" dur="2.6s" repeatCount="indefinite"/>
        </rect>
      </g>

      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0"
          keyTimes="0;0.5;1" dur="5.5s" repeatCount="indefinite"/>
        ${claimPill('Online in 30s')}
      </g>

      ${chips()}`),
  }),
};

/* ══════════════════════════════════════════════════════════════════════
   1 · Thirty Seconds — same artwork, one clock, the claim made true
   ══════════════════════════════════════════════════════════════════════ */
const thirtySeconds = {
  id: 'hw-thirty',
  name: 'Thirty Seconds',
  family: 'Minimal change',
  tagline: 'The same panel, with the clock actually running',
  desc:
    'The smallest change that fixes the honesty problem. Identical artwork, but every loop is ' +
    'collapsed onto one nine-second clock: the scan line crosses the code exactly once, a ring ' +
    'fills beneath it, the pill counts 30s down to Online, and only then does "Connected · ' +
    'Tier-1 · 5G" land and the Wi-Fi arcs start. Then it rests for three full seconds before ' +
    'starting again. The headline claim stops being an assertion and becomes something a visitor ' +
    'can sit and watch happen.',
  pros: [
    'Keeps the existing artwork exactly — lowest-risk option here',
    'Turns the most checkable claim on the card into a demonstration',
    'One synchronised loop with a genuine rest, instead of six that never align',
  ],
  cons: [
    'Still does not compare Openline to anything',
    'The 30 seconds is compressed into 9, so it is representative rather than literal',
  ],
  scores: { story: 4, motion: 4, perf: 4, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 9;
    const R = 26, CIRC = (2 * Math.PI * R).toFixed(1);
    return {
      pills: noPills,
      svg: w(`
        ${shell(uid, `
          <radialGradient id="${uid}-glow">
            <stop offset="0" stop-color="${OR}" stop-opacity="0.2"/>
            <stop offset="1" stop-color="${OR}" stop-opacity="0"/>
          </radialGradient>`)}

        <circle cx="150" cy="150" r="118" fill="url(#${uid}-glow)"/>

        ${phone(90, 44, 120, 268)}

        <g opacity="1">
          <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.3;0.38;1" dur="${dur}s" repeatCount="indefinite"/>
          ${qr(114, 78, 72)}
          <rect x="116" y="80" width="68" height="2.4" rx="1.2" fill="${OR}">
            <animate attributeName="y" values="80;80;148;148" keyTimes="0;0.04;0.26;1" dur="${dur}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.9;0.9;0;0" keyTimes="0;0.05;0.25;0.3;1" dur="${dur}s" repeatCount="indefinite"/>
          </rect>
        </g>

        <g opacity="0">
          ${showAt(0.3, 0.38, dur)}
          <circle cx="150" cy="118" r="${R}" fill="none" stroke="${LINE}" stroke-width="5"/>
          <circle cx="150" cy="118" r="${R}" fill="none" stroke="${OR}" stroke-width="5"
            stroke-linecap="round" stroke-dasharray="${CIRC}" stroke-dashoffset="${CIRC}"
            transform="rotate(-90 150 118)">
            <animate attributeName="stroke-dashoffset" values="${CIRC};${CIRC};0;0"
              keyTimes="0;0.32;0.6;1" dur="${dur}s" repeatCount="indefinite"/>
          </circle>
          ${seq(150, 122, ['18%', '46%', '74%', '100%', '100%'], dur, {
        m: true, size: 12, w: 700, a: 'middle', fill: ORD,
        kt: ['0', '0.36', '0.44', '0.52', '0.60'],
      })}
        </g>

        <g opacity="0">
          ${showAt(0.62, 0.68, dur)}
          ${rect(113, 162, 70, 17, { fill: GRNW, r: 8.5 })}
          <circle cx="122" cy="170.5" r="2.6" fill="${GRND}"/>
          ${t(128, 174, 'Connected', { size: 9, w: 700, fill: GRN })}
          ${t(122, 199, 'Tier-1 · 5G', { m: true, size: 8.5, fill: MUT })}
          ${arcs(228, 92, 2.2, { begin: 0 })}
        </g>

        ${rect(165, 11, 117, 28, { fill: OR, r: 14 })}
        ${seq(223, 29, ['Online in 30s', 'Online in 21s', 'Online in 12s', 'Online in 4s', 'Online', 'Online'], dur, {
        size: 11.5, w: 700, a: 'middle', fill: WHITE,
        kt: ['0', '0.14', '0.30', '0.46', '0.62', '0.80'],
      })}

        ${chips()}`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════
   2 · Both, Not Either — the section's own thesis, plotted
   ══════════════════════════════════════════════════════════════════════ */
const bothNotEither = {
  id: 'hw-both',
  name: 'Both, Not Either',
  family: 'The argument',
  tagline: 'Cheap on one axis, reliable on the other',
  desc:
    'The section promises "you shouldn\'t have to choose between cheap or reliable" and then never ' +
    'shows the trade-off it is claiming to break. This plots it: price across, reliability up. ' +
    'Four grey competitors settle into the only two corners the market normally offers — cheap ' +
    'and patchy, or reliable and expensive — and then Openline lands in the corner that is ' +
    'supposed to be empty. It is the one option here that argues the section\'s actual headline, ' +
    'and it makes the panel a peer of the five comparison cards beside it rather than the odd one out.',
  pros: [
    'Argues the exact sentence printed above the grid',
    'Makes the cell a comparison, like the five cards around it',
    'A shape nothing else on the page uses — it will not be mistaken for decoration',
  ],
  cons: [
    'Competitor positions are illustrative, not benchmarked — do not ship as a market claim',
    'Loses the phone, so the panel no longer shows the product',
    'A scatter plot is the densest thing here to read at 300px wide',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const X0 = 52, X1 = 268, Y0 = 92, Y1 = 268;
    /* x: 0 = cheapest .. 1 = priciest   y: 0 = patchy .. 1 = reliable */
    const px = (v) => (X0 + v * (X1 - X0)).toFixed(1);
    const py = (v) => (Y1 - v * (Y1 - Y0)).toFixed(1);
    /* Dots are kept clear of the two corner captions below: the bottom-left
       pair stays above the caption baseline, the right-hand pair below the
       top-right one. At the first positions tried, "RELIABLE, PRICIER" ran
       straight through a competitor dot. */
    const RIVALS = [
      [0.13, 0.30, 0.10], [0.28, 0.42, 0.16],
      [0.70, 0.74, 0.22], [0.88, 0.60, 0.28],
    ];
    return {
      pills: noPills,
      svg: w(`
        ${shell(uid)}

        ${lab(20, 30, 'CHEAP OR RELIABLE?', { size: 9, w: 700, fill: ORD, ls: 1.4 })}
        ${t(20, 50, 'The market makes you pick one.', { size: 11, fill: MUT })}

        ${rect(X0, Y0, X1 - X0, Y1 - Y0, { fill: 'rgba(255,255,255,0.55)', stroke: 'rgba(11,11,15,0.08)', r: 6 })}
        <line x1="${X0}" y1="${py(0.5)}" x2="${X1}" y2="${py(0.5)}" stroke="rgba(11,11,15,0.07)" stroke-dasharray="3 3"/>
        <line x1="${px(0.5)}" y1="${Y0}" x2="${px(0.5)}" y2="${Y1}" stroke="rgba(11,11,15,0.07)" stroke-dasharray="3 3"/>

        ${lab(X0, Y1 + 15, 'CHEAPER', { size: 7.5, fill: MUT2 })}
        ${lab(X1, Y1 + 15, 'PRICIER', { size: 7.5, fill: MUT2, a: 'end' })}
        <g transform="translate(${X0 - 10} ${(Y0 + Y1) / 2}) rotate(-90)">
          ${lab(0, 0, 'MORE RELIABLE', { size: 7.5, fill: MUT2, a: 'middle' })}
        </g>

        ${RIVALS.map(([x, y, d], i) => `
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;0.9;0.9" keyTimes="0;${d};${(d + 0.06).toFixed(2)};1"
              dur="${dur}s" repeatCount="indefinite"/>
            <circle cx="${px(x)}" cy="${py(y)}" r="6.5" fill="${GREY}"/>
          </g>`).join('')}

        ${/* captions live in the two opposite corners of the plot, anchored to
             its edges, so they can never land on a dot. */ ''}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.40;0.47;1" dur="${dur}s" repeatCount="indefinite"/>
          ${lab(X0 + 9, Y1 - 9, 'CHEAP, PATCHY', { size: 7, fill: MUT2 })}
          ${lab(X1 - 9, Y0 + 15, 'RELIABLE, PRICIER', { size: 7, fill: MUT2, a: 'end' })}
        </g>

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.54;0.62;1" dur="${dur}s" repeatCount="indefinite"/>
          <circle cx="${px(0.2)}" cy="${py(0.86)}" r="9" fill="none" stroke="${OR}" stroke-width="2" opacity="0.5">
            <animate attributeName="r" values="9;19;9" keyTimes="0;0.5;1" dur="2.6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0;0.5" keyTimes="0;0.5;1" dur="2.6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="${px(0.2)}" cy="${py(0.86)}" r="8" fill="${OR}"/>
          ${t(Number(px(0.2)) + 15, Number(py(0.86)) + 4, 'Openline', { size: 11, w: 700, fill: ORD })}
        </g>

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.70;0.78;1" dur="${dur}s" repeatCount="indefinite"/>
          ${t(20, 310, 'Both. Not either.', { size: 15, w: 700, fill: INK })}
          ${t(20, 330, 'Cheapest price, on a Tier-1 network.', { size: 11, fill: MUT })}
        </g>`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════
   3 · The Handover — the operator changes, the connection does not
   ══════════════════════════════════════════════════════════════════════ */
const theHandover = {
  id: 'hw-handover',
  name: 'The Handover',
  family: 'Mechanism',
  tagline: 'The network underneath changes; the line never breaks',
  desc:
    'The grid claims "always connected to strongest operator" two cells to the left and then never ' +
    'shows it. Here the operator name swaps three times, the signal bars stay at four of four ' +
    'through every swap, and a single unbroken line runs the width of the card with a dot ' +
    'travelling along it — crossing each handover without a gap. It demonstrates the one thing ' +
    'that makes "reliable" credible rather than asserted: you can see the thing change and see ' +
    'that nothing drops.',
  pros: [
    'Proves the multi-Tier-1 claim the grid makes but never shows',
    'The unbroken line is the whole argument in one glance',
    'Keeps a device-and-signal reading, so it still looks like connectivity',
  ],
  cons: [
    'Names three real carriers — confirm each is genuinely in the pool before shipping',
    'Close in spirit to the Multi-Tier-1 cell two places to its left',
  ],
  scores: { story: 5, motion: 5, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 12;
    const CARRIERS = ['Vodafone', 'Orange', 'T-Mobile'];
    const bars = (x, y) => [0, 1, 2, 3].map((i) =>
      `<rect x="${x + i * 7}" y="${y - (i + 1) * 4}" width="4.5" height="${(i + 1) * 4}" rx="1" fill="${GRND}"/>`).join('');
    return {
      pills: noPills,
      svg: w(`
        ${shell(uid)}

        ${lab(20, 30, 'ONE CONNECTION', { size: 9, w: 700, fill: ORD, ls: 1.4 })}
        ${t(20, 50, 'Three networks underneath it.', { size: 11, fill: MUT })}

        ${rect(20, 66, 260, 96, { fill: 'rgba(255,255,255,0.8)', stroke: 'rgba(11,11,15,0.09)', r: 10 })}

        ${lab(36, 88, 'OPERATOR', { size: 7.5, fill: MUT2 })}
        ${seq(36, 112, CARRIERS.concat(CARRIERS[0]), dur, { size: 17, w: 700, fill: INK, kt: ['0', '0.25', '0.5', '0.75'] })}
        ${seq(36, 130, ['Tier-1 · 5G', 'Tier-1 · 5G', 'Tier-1 · 5G', 'Tier-1 · 5G'], dur, { m: true, size: 8.5, fill: MUT, kt: ['0', '0.25', '0.5', '0.75'] })}

        <g transform="translate(232 126)">${bars(0, 0)}</g>
        ${lab(232, 88, 'SIGNAL', { size: 7.5, fill: MUT2 })}
        ${lab(264, 142, '4/4', { size: 8, fill: GRN, w: 700, a: 'end' })}

        ${rect(20, 176, 260, 40, { fill: GRNW, r: 10 })}
        <circle cx="38" cy="196" r="3.4" fill="${GRND}"/>
        ${t(50, 200, 'Connected the whole time', { size: 12, w: 700, fill: GRN })}

        ${lab(20, 244, 'HANDOVERS', { size: 7.5, fill: MUT2 })}
        <line x1="20" y1="264" x2="280" y2="264" stroke="${GRND}" stroke-width="3" stroke-linecap="round"/>
        ${[0.25, 0.5, 0.75].map((f) => `
          <g>
            <line x1="${20 + f * 260}" y1="256" x2="${20 + f * 260}" y2="272" stroke="${OR}" stroke-width="2"/>
            ${lab(20 + f * 260, 286, 'SWITCH', { size: 6.5, fill: OR, a: 'middle' })}
          </g>`).join('')}
        <circle cx="20" cy="264" r="5" fill="${OR}">
          <animate attributeName="cx" values="20;280" keyTimes="0;1" dur="${dur}s" repeatCount="indefinite"/>
        </circle>

        ${t(20, 322, 'No drop, no reconnect, nothing to do.', { size: 11, fill: MUT })}
        ${t(20, 344, 'Always on the strongest network.', { size: 12, w: 700, fill: INK })}`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════
   4 · Held at Full Speed — the throttling claim, drawn
   ══════════════════════════════════════════════════════════════════════ */
const heldFullSpeed = {
  id: 'hw-fullspeed',
  name: 'Held at Full Speed',
  family: 'The argument',
  tagline: 'Others fall off after the cap; this line does not',
  desc:
    'The grid claims "no throttling / fair speeds — maximum speed, always" and shows two words to ' +
    'prove it. This draws it instead: data used along the bottom, speed up the side, a fair-use ' +
    'cap marked two-thirds across. Both lines run flat and together until the cap, then the grey ' +
    'one falls to a throttled floor and the orange one carries straight on. The gap after the cap ' +
    'is the entire product claim, and it is the kind of shape a visitor understands before they ' +
    'have read a single label.',
  pros: [
    'Turns a two-word claim into a shape you read instantly',
    'The lines are identical until the cap, which is the honest part of the story',
    'Reads at a glance even at card size',
  ],
  cons: [
    'Speeds and the cap position are illustrative, not measured — they must be replaced with real figures',
    '"Others" is a composite, which is a claim about competitors worth having reviewed',
    'Another line chart if Held at Full Speed and The Receipt both ship',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const X0 = 40, X1 = 276, Y0 = 96, Y1 = 246;
    const CAP = 0.62;
    const px = (v) => (X0 + v * (X1 - X0)).toFixed(1);
    const py = (v) => (Y1 - v * (Y1 - Y0)).toFixed(1);
    /* full speed to the cap, then grey drops to 0.24 and orange holds */
    const ol = `M ${px(0)} ${py(0.84)} L ${px(CAP)} ${py(0.84)} L ${px(1)} ${py(0.82)}`;
    const ot = `M ${px(0)} ${py(0.84)} L ${px(CAP)} ${py(0.84)} L ${px(CAP + 0.06)} ${py(0.26)} L ${px(1)} ${py(0.24)}`;
    return {
      pills: noPills,
      svg: w(`
        ${shell(uid, `
          <clipPath id="${uid}-rev">
            <rect x="${X0}" y="${Y0 - 10}" width="0" height="${Y1 - Y0 + 20}">
              <animate attributeName="width" values="0;0;${X1 - X0};${X1 - X0}"
                keyTimes="0;0.08;0.62;1" dur="${dur}s" repeatCount="indefinite"/>
            </rect>
          </clipPath>`)}

        ${lab(20, 30, 'NO THROTTLING', { size: 9, w: 700, fill: ORD, ls: 1.4 })}
        ${t(20, 50, 'Full speed, past the cap.', { size: 11, fill: MUT })}

        ${rect(X0, Y0, X1 - X0, Y1 - Y0, { fill: 'rgba(255,255,255,0.55)', stroke: 'rgba(11,11,15,0.08)', r: 6 })}
        ${[0.24, 0.54, 0.84].map((g) => `<line x1="${X0}" y1="${py(g)}" x2="${X1}" y2="${py(g)}" stroke="rgba(11,11,15,0.06)"/>`).join('')}

        <line x1="${px(CAP)}" y1="${Y0}" x2="${px(CAP)}" y2="${Y1}" stroke="${OR}" stroke-width="1.4" stroke-dasharray="4 3" opacity="0.7"/>
        ${lab(px(CAP), Y0 - 7, 'FAIR-USE CAP', { size: 7, fill: OR, a: 'middle', w: 700 })}

        ${lab(X0 - 6, py(0.84) + 3, 'FULL', { size: 7, fill: MUT2, a: 'end' })}
        ${lab(X0 - 6, py(0.24) + 3, 'SLOW', { size: 7, fill: MUT2, a: 'end' })}
        ${lab(X0, Y1 + 15, 'DATA USED', { size: 7.5, fill: MUT2 })}

        <g clip-path="url(#${uid}-rev)">
          <path d="${ot}" fill="none" stroke="${GREY}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="${ol}" fill="none" stroke="${OR}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.64;0.72;1" dur="${dur}s" repeatCount="indefinite"/>
          <circle cx="${px(1)}" cy="${py(0.82)}" r="4.5" fill="${OR}"/>
          ${t(px(1) - 4, py(0.82) - 12, 'Openline', { size: 10.5, w: 700, fill: ORD, a: 'end' })}
          <circle cx="${px(1)}" cy="${py(0.24)}" r="4" fill="${GREY}"/>
          ${t(px(1) - 4, py(0.24) - 11, 'Others', { size: 10, w: 700, fill: GREYD, a: 'end' })}
        </g>

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.76;0.84;1" dur="${dur}s" repeatCount="indefinite"/>
          ${rect(20, 286, 260, 34, { fill: GRNW, r: 10 })}
          <circle cx="38" cy="303" r="3.4" fill="${GRND}"/>
          ${t(50, 307, 'Same speed at 1 GB and at 20 GB', { size: 11.5, w: 700, fill: GRN })}
          ${t(20, 344, 'Maximum speed, always.', { size: 12, w: 700, fill: INK })}
        </g>`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════
   5 · The Receipt — the price claim, itemised
   ══════════════════════════════════════════════════════════════════════ */
const theReceipt = {
  id: 'hw-receipt',
  name: 'The Receipt',
  family: 'The argument',
  tagline: 'One price here, four lines everywhere else',
  desc:
    'The first cell in the grid promises "cheapest price — always, no surprises, no markups" and ' +
    'proves it with the words "guaranteed best price". This itemises it. Two totals start at the ' +
    'same number; then the Others column adds a roaming add-on, an admin fee and a markup, one ' +
    'line at a time, its total ticking up with each. The Openline total never moves. The argument ' +
    'is not that Openline is cheaper in the abstract — it is that the number you were quoted is ' +
    'the number you pay, which is a far more specific and more defensible promise.',
  pros: [
    'Makes "no surprises, no markups" literal — you watch the surprises get added',
    'The still column beside the climbing one is a very legible contrast',
    'Fees are the thing travellers have actually been burned by',
  ],
  cons: [
    'Every figure is illustrative — real prices and fee names must replace them before shipping',
    'Naming fee types is a claim about competitors and should be reviewed',
    'Currency is hardcoded to $, so it needs the same locale work as the rest of the page',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 11;
    /* Short labels on purpose: the row is 125 wide and at the fuller wording
       ("Roaming add-on") the name ran into the amount. */
    const ADDS = [['Roaming', '+2.50'], ['Admin fee', '+1.50'], ['Markup', '+3.00']];
    const TOTALS = ['$9.00', '$11.50', '$13.00', '$16.00', '$16.00'];
    return {
      pills: noPills,
      svg: w(`
        ${shell(uid)}

        ${lab(20, 30, 'NO SURPRISES', { size: 9, w: 700, fill: ORD, ls: 1.4 })}
        ${t(20, 50, 'The quote is the price.', { size: 11, fill: MUT })}

        ${rect(20, 66, 125, 120, { fill: 'rgba(255,255,255,0.9)', stroke: OR, sw: 1.6, r: 10 })}
        ${lab(34, 88, 'OPENLINE', { size: 7.5, fill: ORD, w: 700 })}
        ${t(34, 122, '$9.00', { m: true, size: 21, w: 700, fill: INK })}
        ${t(34, 142, 'One line.', { size: 10.5, fill: MUT })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.80;0.88;1" dur="${dur}s" repeatCount="indefinite"/>
          ${rect(34, 154, 97, 20, { fill: GRNW, r: 6 })}
          ${t(44, 168, 'Nothing added', { size: 9.5, w: 700, fill: GRN })}
        </g>

        ${rect(155, 66, 125, 120, { fill: 'rgba(255,255,255,0.72)', stroke: 'rgba(11,11,15,0.12)', r: 10 })}
        ${lab(169, 88, 'OTHERS', { size: 7.5, fill: MUT2, w: 700 })}
        ${seq(169, 122, TOTALS, dur, {
        m: true, size: 21, w: 700, fill: GREYD,
        kt: ['0', '0.22', '0.40', '0.58', '0.76'],
      })}
        ${t(169, 142, 'Plus extras.', { size: 10.5, fill: MUT })}

        ${ADDS.map(([name, amt], i) => {
        const y = 206 + i * 34;
        const on = 0.22 + i * 0.18;
        return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(2)};${(on + 0.05).toFixed(2)};1"
              dur="${dur}s" repeatCount="indefinite"/>
            ${rect(155, y, 125, 26, { fill: 'rgba(11,11,15,0.04)', r: 6 })}
            ${t(167, y + 17, name, { size: 9.5, fill: GREYD })}
            ${t(272, y + 17, amt, { m: true, size: 10, w: 700, fill: '#B4232A', a: 'end' })}
          </g>`;
      }).join('')}

        ${/* Three ghost rows mirroring the Others additions, one for one, so
             the comparison reads row by row. A single empty box with a dash in
             it read as an unfinished panel rather than as "nothing here". */ ''}
        ${ADDS.map((_, i) => {
      const y = 206 + i * 34;
      return `${rect(20, y, 125, 26, { fill: 'rgba(255,255,255,0.45)', stroke: 'rgba(11,11,15,0.06)', r: 6 })}
          ${t(82.5, y + 18, '—', { size: 13, w: 700, fill: MUT2, a: 'middle' })}`;
    }).join('')}

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.80;0.88;1" dur="${dur}s" repeatCount="indefinite"/>
          ${t(20, 330, 'Same price at checkout', { size: 12, w: 700, fill: INK })}
          ${t(20, 350, 'as the one on the card.', { size: 12, w: 700, fill: INK })}
        </g>`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════
   6 · The Install — what actually happens in those thirty seconds
   ══════════════════════════════════════════════════════════════════════ */
const theInstall = {
  id: 'hw-install',
  name: 'The Install',
  family: 'Mechanism',
  tagline: 'Scan, consent, install, connected',
  desc:
    'The card promises "online in 30s" and then shows a code being scanned forever. This shows the ' +
    'whole thing instead: the code is read, an "Add eSIM?" sheet appears, the profile installs ' +
    'against a progress bar, and the screen lands on a green tick with "Connected · Tier-1 · 5G". ' +
    'It is the only option that answers the question the pill raises — what am I actually agreeing ' +
    'to, and how many taps is it — which is the last thing standing between a curious visitor and ' +
    'a purchase.',
  pros: [
    'Answers the real objection: how much work is this',
    'Shows the product doing its job, not a metaphor for it',
    'Four clear beats, so the loop has an obvious beginning and end',
  ],
  cons: [
    'The sheet wording must match the real iOS and Android install prompts before it ships',
    'The densest option on this board — four screens inside a 110px-wide phone',
    'Implies a tap count, so a slower real install would read as a broken promise',
  ],
  scores: { story: 5, motion: 5, perf: 4, mobile: 4, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 12;
    return {
      pills: noPills,
      svg: w(`
        ${shell(uid)}
        ${claimPill('Online in 30s')}

        <g>
          ${phone(90, 44, 120, 268)}

          ${/* A · the code is read */ ''}
          <g opacity="1">
            <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.18;0.24;1"
              dur="${dur}s" repeatCount="indefinite"/>
            ${qr(114, 78, 72)}
            <rect x="116" y="80" width="68" height="2.4" rx="1.2" fill="${OR}">
              <animate attributeName="y" values="80;80;148;148" keyTimes="0;0.02;0.16;1"
                dur="${dur}s" repeatCount="indefinite"/>
            </rect>
            ${lab(150, 178, 'SCAN TO ADD', { size: 7.5, fill: MUT2, a: 'middle' })}
          </g>

          ${/* B · consent */ ''}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.24;0.30;0.44;0.50;1"
              dur="${dur}s" repeatCount="indefinite"/>
            ${rect(100, 92, 100, 104, { fill: WHITE, stroke: 'rgba(11,11,15,0.12)', r: 10 })}
            ${t(150, 120, 'Add eSIM?', { size: 11.5, w: 700, fill: INK, a: 'middle' })}
            ${lab(150, 138, 'OPENLINE', { size: 7, fill: MUT2, a: 'middle' })}
            ${rect(114, 154, 72, 24, { fill: OR, r: 12 })}
            ${t(150, 170, 'Install', { size: 10.5, w: 700, fill: WHITE, a: 'middle' })}
          </g>

          ${/* C · installing */ ''}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.50;0.56;0.68;0.74;1"
              dur="${dur}s" repeatCount="indefinite"/>
            ${lab(150, 126, 'INSTALLING', { size: 7.5, fill: MUT, a: 'middle' })}
            ${rect(112, 138, 76, 6, { fill: 'rgba(11,11,15,0.08)', r: 3 })}
            <rect x="112" y="138" width="0" height="6" rx="3" fill="${OR}">
              <animate attributeName="width" values="0;0;76;76" keyTimes="0;0.52;0.66;1"
                dur="${dur}s" repeatCount="indefinite"/>
            </rect>
            ${seq(150, 166, ['eSIM profile', 'Network', 'APN', 'Done'], dur, {
      size: 9, fill: MUT2, a: 'middle', kt: ['0', '0.54', '0.58', '0.63'],
    })}
          </g>

          ${/* D · connected, and it rests here */ ''}
          <g opacity="0">
            ${showAt(0.74, 0.80, dur)}
            <circle cx="150" cy="118" r="23" fill="${GRNW}"/>
            <path d="M 139 118 L 147 126 L 162 111" fill="none" stroke="${GRND}"
              stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
            ${rect(113, 162, 70, 17, { fill: GRNW, r: 8.5 })}
            <circle cx="122" cy="170.5" r="2.6" fill="${GRND}"/>
            ${t(128, 174, 'Connected', { size: 9, w: 700, fill: GRN })}
            ${t(122, 199, 'Tier-1 · 5G', { m: true, size: 8.5, fill: MUT })}
            ${arcs(228, 92, 2.2, { begin: 0 })}
          </g>
        </g>

        ${chips()}`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════
   7 · One Tap — the smallest honest change on the board
   ══════════════════════════════════════════════════════════════════════ */
const oneTap = {
  id: 'hw-onetap',
  name: 'One Tap',
  family: 'Minimal change',
  tagline: 'The scan resolves, once, and stops',
  desc:
    'Identical to what ships — same phone, same pill, same chips, same wording — except the scan ' +
    'happens once instead of forever. A tap ripple lands on the code, the code resolves into a ' +
    'green tick, "Connected · Tier-1 · 5G" settles underneath, and the card stops moving. No new ' +
    'copy, no new claim, no chart, nothing to fact-check. If the goal is to stop the panel looking ' +
    'broken without reopening any decision about the section, this is the whole fix and nothing more.',
  pros: [
    'Nothing to sign off: no new numbers, no new words, no competitor claim',
    'Ends at rest, so the grid stops fidgeting while it is being read',
    'Cheapest option here to build and the safest to ship',
  ],
  cons: [
    'Adds no argument — the cell still compares nothing',
    'Least memorable option on the board',
    'A tap ripple implies tapping, but most people scan the code with another device',
  ],
  scores: { story: 3, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 8;
    return {
      pills: noPills,
      svg: w(`
        ${shell(uid)}
        ${claimPill('Online in 30s')}

        <g>
          ${phone(90, 44, 120, 268)}

          <g opacity="1">
            <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.40;0.48;1"
              dur="${dur}s" repeatCount="indefinite"/>
            ${qr(114, 78, 72)}
          </g>

          ${/* one tap ripple on the code */ ''}
          <circle cx="150" cy="114" r="6" fill="none" stroke="${OR}" stroke-width="2.4" opacity="0">
            <animate attributeName="r" values="6;6;34;34" keyTimes="0;0.20;0.44;1"
              dur="${dur}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0;0.9;0;0" keyTimes="0;0.20;0.26;0.44;1"
              dur="${dur}s" repeatCount="indefinite"/>
          </circle>

          <g opacity="0">
            ${showAt(0.48, 0.56, dur)}
            <circle cx="150" cy="114" r="23" fill="${GRNW}"/>
            <path d="M 139 114 L 147 122 L 162 107" fill="none" stroke="${GRND}"
              stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
            ${rect(113, 162, 70, 17, { fill: GRNW, r: 8.5 })}
            <circle cx="122" cy="170.5" r="2.6" fill="${GRND}"/>
            ${t(128, 174, 'Connected', { size: 9, w: 700, fill: GRN })}
            ${t(122, 199, 'Tier-1 · 5G', { m: true, size: 8.5, fill: MUT })}
            ${arcs(228, 92, 2.2, { begin: 0 })}
          </g>
        </g>

        ${chips()}`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════
   8 · Across the Border — the connection survives the crossing
   ══════════════════════════════════════════════════════════════════════ */
const acrossBorder = {
  id: 'hw-border',
  name: 'Across the Border',
  family: 'Geography',
  tagline: 'Three countries, no reconnection',
  desc:
    'A traveller moves left to right across three countries. Each border is a dashed line, and ' +
    'nothing happens when it is crossed: the signal stays at four bars, no "searching", no ' +
    'reconnect, no new SIM. The whole argument is an absence — the moment where a normal SIM drops ' +
    'and this one does not. It is aimed squarely at the only anxiety a traveller actually has, ' +
    'which is what happens at the airport on the other side.',
  pros: [
    'Speaks to the real fear: landing somewhere and having no service',
    'The claim is an absence of drama, which is easy to draw honestly',
    'Country labels make it instantly legible without reading a word of copy',
  ],
  cons: [
    'Country choice implies specific coverage — pick markets that are actually live',
    'Loses the phone and the QR, so the product itself is off screen',
    'Similar in spirit to The Handover; shipping both would be repetitive',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const Y = 168;
    const B1 = 112, B2 = 198;
    const bars = [0, 1, 2, 3].map((i) => {
      const h = 7 + i * 5;
      return rect(224 + i * 11, 268 - h, 7, h, { fill: OR, r: 1.5 });
    }).join('');
    return {
      pills: noPills,
      svg: w(`
        ${shell(uid)}

        ${lab(20, 30, 'ONE SIM, THREE COUNTRIES', { size: 9, w: 700, fill: ORD, ls: 1.4 })}
        ${t(20, 50, 'Cross a border, stay online.', { size: 11, fill: MUT })}

        ${rect(20, 96, 260, 116, { fill: 'rgba(255,255,255,0.55)', stroke: 'rgba(11,11,15,0.08)', r: 8 })}

        <line x1="${B1}" y1="104" x2="${B1}" y2="204" stroke="rgba(11,11,15,0.16)" stroke-dasharray="3 3"/>
        <line x1="${B2}" y1="104" x2="${B2}" y2="204" stroke="rgba(11,11,15,0.16)" stroke-dasharray="3 3"/>
        ${lab(66, 122, 'PT', { size: 8, fill: MUT2, a: 'middle' })}
        ${lab(155, 122, 'ES', { size: 8, fill: MUT2, a: 'middle' })}
        ${lab(239, 122, 'FR', { size: 8, fill: MUT2, a: 'middle' })}

        ${/* the route, drawn as the traveller advances */ ''}
        <line x1="34" y1="${Y}" x2="266" y2="${Y}" stroke="rgba(11,11,15,0.10)"
          stroke-width="2.5" stroke-linecap="round" stroke-dasharray="2 5"/>
        <line x1="34" y1="${Y}" x2="266" y2="${Y}" stroke="${OR}" stroke-width="2.5"
          stroke-linecap="round" stroke-dasharray="232" stroke-dashoffset="232">
          <animate attributeName="stroke-dashoffset" values="232;0;0" keyTimes="0;0.74;1"
            dur="${dur}s" repeatCount="indefinite"/>
        </line>

        <circle cy="${Y}" r="6.5" fill="${OR}" cx="34">
          <animate attributeName="cx" values="34;266;266" keyTimes="0;0.74;1"
            dur="${dur}s" repeatCount="indefinite"/>
        </circle>

        ${/* nothing happens at either crossing — that is the point */ ''}
        ${[[B1, 0.30], [B2, 0.56]].map(([x, at]) => `
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;0;0"
              keyTimes="0;${at.toFixed(2)};${(at + 0.04).toFixed(2)};${(at + 0.16).toFixed(2)};1"
              dur="${dur}s" repeatCount="indefinite"/>
            ${lab(x, 196, 'NO DROP', { size: 7, fill: GRN, a: 'middle', w: 700 })}
          </g>`).join('')}

        ${/* stacked, not inline: at 17px mono the figure ran into the caption */ ''}
        ${lab(20, 236, 'SIGNAL', { size: 7.5, fill: MUT2 })}
        ${t(20, 266, '4 / 4', { m: true, size: 22, w: 700, fill: INK })}
        ${t(20, 284, 'for the whole journey', { size: 10.5, fill: MUT })}
        ${bars}

        <g opacity="0">
          ${showAt(0.80, 0.88, dur)}
          ${t(20, 330, 'One SIM, three countries.', { size: 12, w: 700, fill: INK })}
          ${t(20, 350, 'Nothing to swap, nothing to reconnect.', { size: 12, w: 700, fill: INK })}
        </g>`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════
   9 · No Paperwork — the fields empty themselves
   ══════════════════════════════════════════════════════════════════════ */
const noPaperwork = {
  id: 'hw-nokyc',
  name: 'No Paperwork',
  family: 'Product truth',
  tagline: 'Three fields nobody has to fill',
  desc:
    'The grid already claims "anonymous / no KYC" in a cell of its own and proves it with two ' +
    'words. This dramatises it: a signup form shows the three things every other provider demands ' +
    '— full name, passport number, home address — and one by one each field empties itself and is ' +
    'tagged "not required". What is left is an empty form and a green line saying there is nothing ' +
    'to hand over. It converts a privacy claim into something you watch happen.',
  pros: [
    'Privacy is the strongest differentiator on the page and currently the least dramatised',
    'Emptying is a satisfying, unusual motion — subtraction rather than the usual filling up',
    'Directly supports a claim the grid already makes, so it needs no new positioning',
  ],
  cons: [
    'A "no KYC" claim is jurisdiction-dependent and should go past legal before it ships',
    'Implies competitors always demand a passport, which is a claim about them',
    'Form fields at card size are close to the smallest legible type on the board',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const FIELDS = [['Full name', 0.16], ['Passport number', 0.34], ['Home address', 0.52]];
    return {
      pills: noPills,
      svg: w(`
        ${shell(uid)}

        ${lab(20, 30, 'ANONYMOUS BY DEFAULT', { size: 9, w: 700, fill: ORD, ls: 1.4 })}
        ${t(20, 50, 'No name. No passport. No KYC.', { size: 11, fill: MUT })}

        ${FIELDS.map(([name, at], i) => {
      const y = 80 + i * 60;
      return `
          ${rect(20, y, 260, 44, { fill: 'rgba(255,255,255,0.7)', stroke: 'rgba(11,11,15,0.09)', r: 8 })}
          ${lab(34, y + 16, name.toUpperCase(), { size: 7, fill: MUT2 })}
          ${/* the value drains away */ ''}
          <rect x="34" y="${y + 24}" width="120" height="9" rx="4.5" fill="rgba(11,11,15,0.22)">
            <animate attributeName="width" values="120;120;0;0"
              keyTimes="0;${at.toFixed(2)};${(at + 0.09).toFixed(2)};1"
              dur="${dur}s" repeatCount="indefinite"/>
          </rect>
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1"
              keyTimes="0;${(at + 0.07).toFixed(2)};${(at + 0.12).toFixed(2)};1"
              dur="${dur}s" repeatCount="indefinite"/>
            ${rect(178, y + 12, 88, 20, { fill: GRNW, r: 6 })}
            ${t(222, y + 26, 'not required', { size: 9, w: 700, fill: GRN, a: 'middle' })}
          </g>`;
    }).join('')}

        <g opacity="0">
          ${showAt(0.72, 0.80, dur)}
          ${rect(20, 262, 176, 26, { fill: GRNW, r: 8 })}
          <circle cx="35" cy="275" r="3" fill="${GRND}"/>
          ${t(46, 279, 'Nothing to hand over', { size: 11, w: 700, fill: GRN })}
          ${t(20, 330, 'We never ask for it.', { size: 12, w: 700, fill: INK })}
          ${t(20, 350, 'So we can never lose it.', { size: 12, w: 700, fill: INK })}
        </g>`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════
   10 · Delivered Instantly — two timestamps, two seconds apart
   ══════════════════════════════════════════════════════════════════════ */
const deliveredInstantly = {
  id: 'hw-instant',
  name: 'Delivered Instantly',
  family: 'Product truth',
  tagline: 'Paid, then delivered, same second',
  desc:
    'The grid claims "instant digital delivery" and leaves it at that. This shows a receipt ' +
    'instead: payment confirmed at one timestamp, eSIM delivered two seconds later, both stamped ' +
    'in monospace as if lifted from an order log. Below it, greyed out, sits the alternative ' +
    'everyone has lived through — a physical SIM that ships in days. The comparison needs no ' +
    'adjectives; two clock times do the work.',
  pros: [
    'A timestamp is the most credible way to show speed — it reads as evidence, not marketing',
    'The greyed shipping row lands the contrast without naming a competitor',
    'Monospace numerals match the rest of the site\'s data treatment',
  ],
  cons: [
    'The timestamps are illustrative and must reflect real median delivery before shipping',
    'Two seconds invites scepticism — worth confirming against actual order data',
    'Third option on this board built from rows and numbers rather than motion',
  ],
  scores: { story: 4, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 10;
    return {
      pills: noPills,
      svg: w(`
        ${shell(uid)}

        ${lab(20, 30, 'INSTANT DELIVERY', { size: 9, w: 700, fill: ORD, ls: 1.4 })}
        ${t(20, 50, 'Paid, then delivered.', { size: 11, fill: MUT })}

        <g opacity="0">
          ${showAt(0.10, 0.18, dur)}
          ${rect(20, 74, 260, 52, { fill: 'rgba(255,255,255,0.85)', stroke: 'rgba(11,11,15,0.09)', r: 8 })}
          <circle cx="42" cy="100" r="9" fill="${ORW}"/>
          <path d="M 37 100 L 41 104 L 47 96" fill="none" stroke="${ORD}"
            stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          ${t(60, 96, 'Payment confirmed', { size: 11, w: 500, fill: INK })}
          ${t(60, 112, '14:02:07', { m: true, size: 9.5, fill: MUT })}
        </g>

        ${/* the gap between the two rows is the entire claim */ ''}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.24;0.30;1"
            dur="${dur}s" repeatCount="indefinite"/>
          <line x1="42" y1="128" x2="42" y2="146" stroke="rgba(11,11,15,0.14)" stroke-width="2" stroke-dasharray="2 3"/>
          ${rect(58, 128, 52, 18, { fill: GRNW, r: 6 })}
          ${t(84, 141, '+2s', { m: true, size: 9.5, w: 700, fill: GRN, a: 'middle' })}
        </g>

        <g opacity="0">
          ${showAt(0.36, 0.44, dur)}
          ${rect(20, 150, 260, 52, { fill: 'rgba(255,255,255,0.95)', stroke: GRND, sw: 1.4, r: 8 })}
          <circle cx="42" cy="176" r="9" fill="${GRNW}"/>
          <path d="M 37 176 L 41 180 L 47 172" fill="none" stroke="${GRN}"
            stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          ${t(60, 172, 'eSIM delivered', { size: 11, w: 700, fill: INK })}
          ${t(60, 188, '14:02:09', { m: true, size: 9.5, fill: GRN })}
        </g>

        ${/* the alternative, greyed */ ''}
        <g opacity="0">
          ${showAt(0.56, 0.64, dur)}
          ${rect(20, 224, 260, 44, { fill: 'rgba(11,11,15,0.035)', r: 8 })}
          ${t(38, 244, 'Physical SIM', { size: 10.5, w: 500, fill: GREYD })}
          ${t(38, 259, 'ships in 3–5 days', { size: 9.5, fill: MUT2 })}
          ${lab(262, 250, 'THE OLD WAY', { size: 7, fill: MUT2, a: 'end' })}
        </g>

        <g opacity="0">
          ${showAt(0.74, 0.82, dur)}
          ${t(20, 330, 'No post. No waiting.', { size: 12, w: 700, fill: INK })}
          ${t(20, 350, 'It is on your phone before you close the tab.', { size: 11, w: 700, fill: INK })}
        </g>`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════
   11 · The Odometer — the price spins down and locks
   ══════════════════════════════════════════════════════════════════════ */
const theOdometer = {
  id: 'hw-odo',
  name: 'The Odometer',
  family: 'Number',
  tagline: 'One enormous number, settling',
  desc:
    'The grid says "cheapest price — always" and prints it in the same size as everything else. ' +
    'This makes the price the whole panel: a monospace figure the width of the card spins down ' +
    'from what the market charges, slows, lands on the Openline price and locks with a padlock ' +
    'and a green "price locked" tag. Nothing else moves. It is the loudest, plainest option on the ' +
    'board and the one that survives being seen for half a second on a phone.',
  pros: [
    'Enormous type — the only option here that is legible from across the room',
    'Settling then locking answers both halves of the claim: cheapest, and always',
    'No chart to read and nothing to interpret',
  ],
  cons: [
    'The starting figure and the final price are illustrative and must be real before shipping',
    'A price on the card commits the section to it, and prices change',
    'Shows no product and makes no reliability argument at all',
  ],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 5, ease: 5 },
  build: (uid) => {
    const dur = 9;
    /* One stop per frame. The last two frames are the same price so the number
       comes to rest on it rather than snapping back. */
    const SPIN = ['$14.00', '$12.60', '$11.20', '$10.10', '$9.40', '$9.00', '$9.00'];
    return {
      pills: noPills,
      svg: w(`
        ${shell(uid)}

        ${lab(20, 30, 'CHEAPEST PRICE — ALWAYS', { size: 9, w: 700, fill: ORD, ls: 1.4 })}
        ${t(20, 50, 'And it stays there.', { size: 11, fill: MUT })}

        ${lab(20, 118, 'PER MONTH', { size: 7.5, fill: MUT2 })}
        ${seq(20, 176, SPIN, dur, {
      m: true, size: 44, w: 700, fill: INK,
      kt: ['0', '0.10', '0.20', '0.30', '0.40', '0.52', '0.74'],
    })}

        ${/* underline sweeps in as the number settles */ ''}
        <rect x="20" y="192" width="0" height="4" rx="2" fill="${OR}">
          <animate attributeName="width" values="0;0;210;210" keyTimes="0;0.52;0.66;1"
            dur="${dur}s" repeatCount="indefinite"/>
        </rect>

        <g opacity="0">
          ${showAt(0.66, 0.74, dur)}
          ${rect(20, 212, 150, 28, { fill: GRNW, r: 8 })}
          ${/* padlock */ ''}
          <path d="M 38 224 v -4 a 4 4 0 0 1 8 0 v 4" fill="none" stroke="${GRN}" stroke-width="1.8" stroke-linecap="round"/>
          ${rect(36, 224, 12, 10, { fill: GRN, r: 2 })}
          ${t(58, 231, 'Price locked', { size: 11, w: 700, fill: GRN })}
        </g>

        <g opacity="0">
          ${showAt(0.78, 0.86, dur)}
          ${t(20, 266, 'Same price next month.', { size: 11, fill: MUT })}
          ${t(20, 330, 'The cheapest price.', { size: 12, w: 700, fill: INK })}
          ${t(20, 350, 'Then it stops moving.', { size: 12, w: 700, fill: INK })}
        </g>`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════
   12 · The Gauge — the needle reaches full and stays
   ══════════════════════════════════════════════════════════════════════ */
const theGauge = {
  id: 'hw-gauge',
  name: 'The Gauge',
  family: 'Brand',
  tagline: 'The needle goes all the way, and holds',
  desc:
    'The card already carries the chip "at the fullest speed" and nothing on it moves at speed. ' +
    'This draws the chip: a wide dial, a needle sweeping from nothing to full, the arc filling ' +
    'orange behind it, and then — the important part — the needle stops and does not fall back. ' +
    'Most speed graphics peak and decay, which is exactly the "up to" promise Openline is arguing ' +
    'against. This one holds, and holding is the claim.',
  pros: [
    'Turns an existing chip on the card into the panel\'s main event — no new copy needed',
    'Holding rather than decaying is a precise visual rebuttal of "up to" pricing',
    'Instantly readable; a dial needs no legend',
  ],
  cons: [
    'Dials are a common fintech and telco device, so it is the least distinctive option here',
    'Percentage of full speed is a soft measure — a real figure would be stronger and riskier',
    'No product, no price and no competitor in frame',
  ],
  scores: { story: 4, motion: 5, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 9;
    const CX = 150, CY = 232, R = 82;
    const LEN = (Math.PI * R).toFixed(1);
    return {
      pills: noPills,
      svg: w(`
        ${shell(uid)}

        ${lab(20, 30, 'AT THE FULLEST SPEED', { size: 9, w: 700, fill: ORD, ls: 1.4 })}
        ${t(20, 50, 'No cap, no crawl.', { size: 11, fill: MUT })}

        ${rect(20, 66, 132, 24, { fill: GRNW, r: 8 })}
        <circle cx="34" cy="78" r="3" fill="${GRND}"/>
        ${t(45, 82, 'No cap applied', { size: 10.5, w: 700, fill: GRN })}

        ${/* dial track, then the fill */ ''}
        <path d="M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}" fill="none"
          stroke="rgba(11,11,15,0.09)" stroke-width="13" stroke-linecap="round"/>
        <path d="M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}" fill="none"
          stroke="${OR}" stroke-width="13" stroke-linecap="round"
          stroke-dasharray="${LEN}" stroke-dashoffset="${LEN}">
          <animate attributeName="stroke-dashoffset" values="${LEN};${LEN};9;9"
            keyTimes="0;0.08;0.60;1" dur="${dur}s" repeatCount="indefinite"/>
        </path>

        ${/* needle — rotates about the dial centre and then holds */ ''}
        <g>
          <animateTransform attributeName="transform" type="rotate"
            values="-88 ${CX} ${CY};-88 ${CX} ${CY};82 ${CX} ${CY};82 ${CX} ${CY}"
            keyTimes="0;0.08;0.60;1" dur="${dur}s" repeatCount="indefinite"
            calcMode="spline" keySplines="0 0 1 1;0.25 0.1 0.2 1;0 0 1 1"/>
          <line x1="${CX}" y1="${CY}" x2="${CX}" y2="${CY - R + 20}" stroke="${INK}"
            stroke-width="3" stroke-linecap="round"/>
        </g>
        <circle cx="${CX}" cy="${CY}" r="7" fill="${INK}"/>

        ${/* readout sits below the baseline: the needle sweeps the whole upper
             half of the dial and was drawing straight through this text. */ ''}
        ${seq(CX, CY + 40, ['0%', '34%', '68%', '92%', '100%', '100%'], dur, {
      m: true, size: 27, w: 700, fill: INK, a: 'middle',
      kt: ['0', '0.14', '0.28', '0.44', '0.58', '0.76'],
    })}
        ${lab(CX, CY + 58, 'OF FULL SPEED', { size: 7, fill: MUT2, a: 'middle' })}

        <g opacity="0">
          ${showAt(0.66, 0.76, dur)}
          ${t(20, 330, 'Full speed, held.', { size: 12, w: 700, fill: INK })}
          ${t(20, 350, 'Not "up to". Not "after the cap".', { size: 12, w: 700, fill: INK })}
        </g>`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════
   13 · Two Screens — the same moment on two SIMs
   ══════════════════════════════════════════════════════════════════════ */
const twoScreens = {
  id: 'hw-two',
  name: 'Two Screens',
  family: 'Comparison',
  tagline: 'One is online, one is still searching',
  desc:
    'The five cells around this panel are all Openline-versus-Others rows. This one becomes the ' +
    'same argument in its native form: two phones, side by side, the same second after landing. ' +
    'The left one ticks over to "Connected · Tier-1". The right one cycles "Searching…", then ' +
    '"Searching…", then settles on "No service". Nothing is exaggerated and no brand is named — ' +
    'the asymmetry does all the work, and it makes this cell finally match the grid it sits in.',
  pros: [
    'The only option that adopts the exact Openline-vs-Others shape of the five sibling cards',
    'Two phones make the comparison concrete instead of abstract',
    'The punchline is in the difference, so it reads even with the labels ignored',
  ],
  cons: [
    '"No service" is a hard claim about competitors and needs sign-off before it ships',
    'Two phones at card width leaves each screen about 100px wide for text',
    'Risks reading as unkind rather than confident, depending on the copy chosen',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 3, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 10;
    return {
      pills: noPills,
      svg: w(`
        ${shell(uid)}

        ${lab(20, 30, 'SAME MOMENT, TWO SIMS', { size: 9, w: 700, fill: ORD, ls: 1.4 })}
        ${t(20, 50, 'Wheels down. Phones on.', { size: 11, fill: MUT })}

        ${lab(79, 78, 'OPENLINE', { size: 7.5, w: 700, fill: ORD, a: 'middle' })}
        ${lab(221, 78, 'OTHERS', { size: 7.5, w: 700, fill: MUT2, a: 'middle' })}

        ${phone(24, 88, 110, 170)}
        ${phone(166, 88, 110, 170)}

        ${/* left: connects */ ''}
        <g opacity="0">
          ${showAt(0.18, 0.26, dur)}
          <circle cx="79" cy="146" r="18" fill="${GRNW}"/>
          <path d="M 71 146 L 77 152 L 88 139" fill="none" stroke="${GRND}"
            stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
          ${rect(46, 180, 66, 16, { fill: GRNW, r: 8 })}
          ${t(79, 192, 'Connected', { size: 8.5, w: 700, fill: GRN, a: 'middle' })}
          ${t(79, 212, 'Tier-1 · 5G', { m: true, size: 8, fill: MUT, a: 'middle' })}
        </g>

        ${/* right: does not */ ''}
        <g>
          ${[0, 1, 2].map((i) => `
            <circle cx="${209 + i * 12}" cy="146" r="3.2" fill="${GREY}" opacity="0.35">
              <animate attributeName="opacity" values="0.35;1;0.35" keyTimes="0;0.5;1"
                dur="1.1s" begin="${(i * 0.18).toFixed(2)}s" repeatCount="indefinite"/>
            </circle>`).join('')}
          <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.58;0.66;1"
            dur="${dur}s" repeatCount="indefinite"/>
        </g>
        ${/* clears before "No service" lands, or the two share the same line */ ''}
        <g>
          <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.58;0.66;1"
            dur="${dur}s" repeatCount="indefinite"/>
          ${seq(221, 194, ['Searching…', 'Searching…', 'Searching…'], dur, {
      size: 9.5, fill: MUT, a: 'middle', kt: ['0', '0.22', '0.42'],
    })}
        </g>
        <g opacity="0">
          ${showAt(0.66, 0.74, dur)}
          <circle cx="221" cy="146" r="18" fill="rgba(11,11,15,0.05)"/>
          <line x1="214" y1="139" x2="228" y2="153" stroke="${GREYD}" stroke-width="2.6" stroke-linecap="round"/>
          <line x1="228" y1="139" x2="214" y2="153" stroke="${GREYD}" stroke-width="2.6" stroke-linecap="round"/>
          ${rect(186, 180, 70, 16, { fill: 'rgba(11,11,15,0.06)', r: 8 })}
          ${t(221, 192, 'No service', { size: 8.5, w: 700, fill: GREYD, a: 'middle' })}
        </g>

        <g opacity="0">
          ${showAt(0.78, 0.86, dur)}
          ${t(20, 330, 'One of them is already online.', { size: 12, w: 700, fill: INK })}
          ${t(20, 350, 'The other is still looking for a network.', { size: 11, w: 700, fill: INK })}
        </g>`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════
   14 · The Stack — many networks behind one card
   ══════════════════════════════════════════════════════════════════════ */
const theStack = {
  id: 'hw-stack',
  name: 'The Stack',
  family: 'Texture',
  tagline: 'Every network, behind one SIM',
  desc:
    'The site claims partnerships with 50+ Tier-1 carriers and shows a mast. This shows a deck: ' +
    'grey carrier cards fanned out behind a single orange Openline card, with the name on the ' +
    'front card cycling through the networks underneath it. You are not buying one network, you ' +
    'are buying the stack — and the one card in front never changes while everything behind it ' +
    'does. It is the calmest, most premium-feeling option on the board.',
  pros: [
    'Communicates "you get all of them" in one glance, with no chart',
    'The 50+ figure is taken from the live site copy rather than invented here',
    'Calm and brand-forward — the least busy option of the fifteen',
  ],
  cons: [
    'The named carriers are illustrative and must be replaced with real, contractual partners',
    'The most abstract option: it shows a metaphor rather than the product or a number',
    'Fanned cards are a widely used fintech device, so it is not a distinctive shape',
  ],
  scores: { story: 4, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 5 },
  build: (uid) => {
    const dur = 10;
    const NAMES = ['Vodafone', 'Orange', 'T-Mobile', 'Telefónica', 'Vodafone'];
    return {
      pills: noPills,
      svg: w(`
        ${shell(uid)}

        ${lab(20, 30, 'FIFTY NETWORKS, ONE SIM', { size: 9, w: 700, fill: ORD, ls: 1.4 })}
        ${t(20, 50, 'You are not buying one carrier.', { size: 11, fill: MUT })}

        ${/* the deck behind */ ''}
        ${[[-9, 0.30], [-4.5, 0.48], [4.5, 0.66], [9, 0.84]].map(([deg, op], i) => `
          ${/* no labels on the deck: the front card covers exactly where they
               would sit, so they were invisible weight. */ ''}
          <g transform="rotate(${deg} 150 210)" opacity="${op}">
            ${rect(64, 122, 172, 104, { fill: WHITE, stroke: 'rgba(11,11,15,0.10)', r: 12 })}
            <animate attributeName="opacity" values="${op};${(op * 0.55).toFixed(2)};${op}"
              keyTimes="0;0.5;1" dur="${(3.4 + i * 0.7).toFixed(1)}s" repeatCount="indefinite"/>
          </g>`).join('')}

        ${/* the one card in front never changes */ ''}
        ${rect(64, 122, 172, 104, { fill: OR, r: 12 })}
        ${lab(82, 150, 'OPENLINE', { size: 7.5, w: 700, fill: 'rgba(255,255,255,0.8)' })}
        ${t(82, 182, 'One SIM', { size: 19, w: 700, fill: WHITE })}
        ${lab(82, 202, 'NOW ON', { size: 7, fill: 'rgba(255,255,255,0.72)' })}
        ${seq(132, 204, NAMES, dur, {
      size: 10, w: 700, fill: WHITE, kt: ['0', '0.20', '0.40', '0.60', '0.80'],
    })}

        ${/* on its own solid chip: over the scene wash and the deck edges this
             row was washing out to near-illegible grey. */ ''}
        <g opacity="0">
          ${showAt(0.30, 0.40, dur)}
          ${rect(20, 246, 260, 34, { fill: 'rgba(255,255,255,0.92)', stroke: 'rgba(11,11,15,0.09)', r: 8 })}
          ${t(34, 270, '50+', { m: true, size: 19, w: 700, fill: ORD })}
          ${t(76, 269, 'Tier-1 carriers, one profile', { size: 11, fill: INK })}
        </g>

        <g opacity="0">
          ${showAt(0.58, 0.68, dur)}
          ${t(20, 330, 'You get the whole stack.', { size: 12, w: 700, fill: INK })}
          ${t(20, 350, 'The card in front never changes.', { size: 12, w: 700, fill: INK })}
        </g>`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════
   15 · Signal, All Day — reliability as a claim about time
   ══════════════════════════════════════════════════════════════════════ */
const signalAllDay = {
  id: 'hw-allday',
  name: 'Signal, All Day',
  family: 'Data',
  tagline: 'Twenty-four hours, no drop',
  desc:
    '"Most reliable" is a claim about time, and a still image cannot make it — which is precisely ' +
    'why this cell currently fails. This draws a full day: twelve two-hour buckets building left ' +
    'to right, each pairing an Openline bar at full signal against a grey competitor bar beside ' +
    'it that dips twice. The orange row never breaks. Reliability is the one claim on this page that can only be proven by ' +
    'duration, and this is the option that spends the duration proving it.',
  pros: [
    'Proves the one claim a still image structurally cannot: consistency over time',
    'Paired bars filling in sequence is a natural, satisfying build',
    'The two grey dips are the whole argument and need no caption',
  ],
  cons: [
    'The signal series and the two dips are illustrative, not measured — replace before shipping',
    'A competitor series shown as dropping is a claim about them that needs review',
    'Fourth chart on this board; shipping it alongside Held at Full Speed would be repetitive',
  ],
  scores: { story: 5, motion: 4, perf: 4, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 11;
    /* Twelve two-hour buckets, and the two series sit SIDE BY SIDE rather than
       overlaid. Overlaid, the Openline bars are full height and opaque, so they
       covered the rival series completely and the two dips — the entire
       argument of this option — could never be seen. At 24 single-hour columns
       the pairs were also too fine to read at card width. */
    const RIVAL = [1, 1, 0.97, 0.72, 0.30, 0.52, 0.96, 1, 0.94, 0.42, 0.78, 1];
    const N = RIVAL.length;
    const X0 = 24, BW = 6.4, PAIR = 2, PITCH = 21.4;
    const TOP = 138, BOT = 240, SPAN = BOT - TOP;
    return {
      pills: noPills,
      svg: w(`
        ${shell(uid)}

        ${lab(20, 30, 'TWENTY-FOUR HOURS', { size: 9, w: 700, fill: ORD, ls: 1.4 })}
        ${t(20, 50, 'Reliability is a claim about time.', { size: 11, fill: MUT })}

        ${lab(20, 78, 'SIGNAL HELD', { size: 7.5, fill: MUT2 })}
        ${t(20, 112, '24 / 24 h', { m: true, size: 25, w: 700, fill: INK })}

        <line x1="${X0 - 4}" y1="${BOT}" x2="278" y2="${BOT}" stroke="rgba(11,11,15,0.12)"/>

        ${RIVAL.map((v, i) => {
      const x = X0 + i * PITCH;
      const gh = Math.max(3, SPAN * v);
      const on = 0.10 + (i / N) * 0.46;
      const t0 = on.toFixed(3), t1 = (on + 0.04).toFixed(3);
      return `
          <rect x="${x.toFixed(1)}" y="${TOP}" width="${BW}" height="${SPAN}" rx="2"
            fill="${OR}" opacity="0">
            <animate attributeName="opacity" values="0;0;0.95;0.95" keyTimes="0;${t0};${t1};1"
              dur="${dur}s" repeatCount="indefinite"/>
          </rect>
          <rect x="${(x + BW + PAIR).toFixed(1)}" y="${(BOT - gh).toFixed(1)}" width="${BW}"
            height="${gh.toFixed(1)}" rx="2" fill="${GREY}" opacity="0">
            <animate attributeName="opacity" values="0;0;0.8;0.8" keyTimes="0;${t0};${t1};1"
              dur="${dur}s" repeatCount="indefinite"/>
          </rect>`;
    }).join('')}

        ${lab(X0, 254, '00:00', { size: 7, fill: MUT2 })}
        ${lab(278, 254, '24:00', { size: 7, fill: MUT2, a: 'end' })}

        ${/* legend below the chart: beside the headline figure it covered it */ ''}
        <g opacity="0">
          ${showAt(0.64, 0.72, dur)}
          ${rect(20, 266, 260, 22, { fill: ORW, r: 6 })}
          <rect x="30" y="273" width="8" height="8" rx="2" fill="${OR}"/>
          ${t(46, 281, 'Openline — full signal, every hour', { size: 10, w: 700, fill: ORD })}
          ${rect(20, 292, 260, 22, { fill: 'rgba(11,11,15,0.05)', r: 6 })}
          <rect x="30" y="299" width="8" height="8" rx="2" fill="${GREY}"/>
          ${t(46, 307, 'Others — two drops in the same day', { size: 10, fill: GREYD })}
        </g>

        <g opacity="0">
          ${showAt(0.80, 0.88, dur)}
          ${t(20, 338, 'Full signal, all day.', { size: 12, w: 700, fill: INK })}
          ${t(20, 356, 'That is what "reliable" has to mean.', { size: 12, w: 700, fill: INK })}
        </g>`),
    };
  },
};

export const HOME_WHY_VARIANTS = [
  current,
  thirtySeconds, bothNotEither, theHandover, heldFullSpeed, theReceipt,
  theInstall, oneTap, acrossBorder, noPaperwork, deliveredInstantly,
  theOdometer, theGauge, twoScreens, theStack, signalAllDay,
];

export const HOME_WHY_BOX = { w: W, h: H };
