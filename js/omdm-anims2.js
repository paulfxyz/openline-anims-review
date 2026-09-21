/* ─────────────────────────────────────────────────────────────────────────
   Purpose-built animations for the designed /omdm-market page.
   Fintech-clean surface only — light ground, one blue accent, mono numerals.
   Self-contained: no kit import, so the page cannot be broken by a board edit.

   heroBook       576 × 460   five routes repricing on one clock
   venueCost      704 × 420   the cost of holding a rate card for a year
   bookFlow      1280 × 420   base rate in, six families applied, quote out
   depthNarrows   576 × 460   each counterparty that joins closes the spread
   auditTrail     624 × 440   each entry seals the one before it
   ───────────────────────────────────────────────────────────────────────── */

const MO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const SA = '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Helvetica, Arial, sans-serif';

const C = {
  ground: '#FFFFFF',
  rise: '#F4F7FC',
  line: '#E2E8F2',
  lineHard: '#C8D3E6',
  text: '#0F172A',
  dim: '#5A6880',
  faint: '#93A0B8',
  accent: '#3B5BDB',
  accentSoft: '#E7EBFC',
  up: '#0F7A55',
  upSoft: '#E4F4EC',
  down: '#C0343E',
  downSoft: '#FCECEC',
};

const num = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${MO}" font-size="${o.size || 13}" font-weight="${o.w || 600}"` +
  ` fill="${o.fill || C.text}" text-anchor="${o.a || 'start'}"` +
  `${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${s}</text>`;

const txt = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${SA}" font-size="${o.size || 13}" font-weight="${o.w || 400}"` +
  ` fill="${o.fill || C.text}" text-anchor="${o.a || 'start'}">${s}</text>`;

const lab = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${MO}" font-size="${o.size || 9.5}" font-weight="600"` +
  ` letter-spacing="${o.ls || 1.4}" fill="${o.fill || C.faint}" text-anchor="${o.a || 'start'}">${s}</text>`;

const card = (x, y, w, h, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r == null ? 12 : o.r}"` +
  ` fill="${o.fill || C.ground}"${o.stroke === null ? '' : ` stroke="${o.stroke || C.line}" stroke-width="${o.sw || 1}"`}/>`;

/* reveal a group once, then hold for the rest of the loop */
const showAt = (t, dur, id) =>
  `<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${t.toFixed(4)};${Math.min(t + 0.05, 0.999).toFixed(4)};1"` +
  ` dur="${dur}s" repeatCount="indefinite" fill="freeze"${id ? ` id="${id}"` : ''}/>`;

/* ════════════════════════════════════════════════════════════════════════
   The venue — "the rate card was fair in October"
   ════════════════════════════════════════════════════════════════════════ */
const VW = 704, VH = 420;

/* wholesale capacity drifts cheaper through the year; the contract does not */
const MONTHS = ['OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP'];
const MARKET = [0.79, 0.76, 0.72, 0.69, 0.73, 0.67, 0.62, 0.59, 0.64, 0.70, 0.66, 0.61];
const CARD_RATE = 0.79;

export const venueCost = {
  id: 'omv-cost',
  name: 'The Cost of a Rate Card',
  family: 'The venue',
  tagline: 'Fair in October, 23% too high by September',
  desc:
    'One route over twelve months. The rate card is a flat line, agreed once. The market line ' +
    'below it is what the same capacity was actually worth each month. The shaded gap between ' +
    'them is money — and because wholesale data gets cheaper through the year while a contract ' +
    'does not, the gap only widens. It ends on the one number that matters: what the difference ' +
    'cost per terabyte.',
  pros: [
    'Makes the argument with arithmetic rather than adjectives',
    'The widening gap is self-explanatory — no legend needed',
    'Ends on a single number a buyer can take to a meeting',
  ],
  cons: ['Commits to a specific price trajectory we must be able to defend', 'Chart literacy assumed'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid = 'v') => {
    const dur = 10;
    const x0 = 76, x1 = 648, yT = 108, yB = 296;
    const vMin = 0.55, vMax = 0.82;
    const X = (i) => x0 + ((x1 - x0) * i) / (MONTHS.length - 1);
    const Y = (v) => yB - ((v - vMin) / (vMax - vMin)) * (yB - yT);
    const yCard = Y(CARD_RATE);

    const pts = MARKET.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
    const shade =
      `M ${X(0).toFixed(1)} ${yCard.toFixed(1)} L ${X(MONTHS.length - 1).toFixed(1)} ${yCard.toFixed(1)} ` +
      MARKET.map((v, i) => `L ${X(MONTHS.length - 1 - i).toFixed(1)} ${Y(MARKET[MONTHS.length - 1 - i]).toFixed(1)}`).join(' ') +
      ' Z';

    const avg = MARKET.reduce((a, b) => a + b, 0) / MARKET.length;
    const perTB = Math.round((CARD_RATE - avg) * 1000);
    const over = MARKET.filter((v) => v < CARD_RATE).length;

    const clip = `vc${uid}`;
    return {
      pills: [],
      svg: `<svg viewBox="0 0 ${VW} ${VH}" xmlns="http://www.w3.org/2000/svg" role="img"
        aria-label="Twelve months of market price against a fixed rate card">
        <rect width="${VW}" height="${VH}" fill="${C.ground}"/>

        ${lab(40, 44, 'DE · TIER-1 · USD PER GB')}
        ${lab(VW - 40, 44, 'OCT — SEP', { a: 'end' })}

        <!-- gridlines -->
        ${[0.60, 0.65, 0.70, 0.75, 0.80].map((v) => `
          <line x1="${x0}" y1="${Y(v).toFixed(1)}" x2="${x1}" y2="${Y(v).toFixed(1)}"
            stroke="${C.line}" stroke-width="1"/>
          ${num(x0 - 12, Y(v) + 4, v.toFixed(2), { size: 9.5, a: 'end', fill: C.faint, w: 500 })}`).join('')}

        <clipPath id="${clip}"><rect x="${x0 - 2}" y="${yT - 30}" width="0" height="${yB - yT + 70}">
          <animate attributeName="width" values="0;${(x1 - x0 + 4).toFixed(0)};${(x1 - x0 + 4).toFixed(0)}"
            keyTimes="0;0.40;1" dur="${dur}s" repeatCount="indefinite"/></rect></clipPath>

        <g clip-path="url(#${clip})">
          <path d="${shade}" fill="${C.down}" opacity="0.10"/>
          <polyline points="${pts}" fill="none" stroke="${C.text}" stroke-width="2.6"
            stroke-linejoin="round" stroke-linecap="round"/>
          ${MARKET.map((v, i) => `<circle cx="${X(i).toFixed(1)}" cy="${Y(v).toFixed(1)}" r="3.4"
            fill="${C.ground}" stroke="${C.text}" stroke-width="2"/>`).join('')}
        </g>

        <!-- the rate card: flat, agreed once -->
        <line x1="${x0}" y1="${yCard.toFixed(1)}" x2="${x1}" y2="${yCard.toFixed(1)}"
          stroke="${C.accent}" stroke-width="2.4" stroke-dasharray="7 5"/>
        <circle cx="${X(0).toFixed(1)}" cy="${yCard.toFixed(1)}" r="5" fill="${C.accent}"/>
        ${card(x0 + 8, yCard - 46, 210, 34, { fill: C.accentSoft, stroke: null, r: 8 })}
        ${lab(x0 + 22, yCard - 24, 'RATE CARD · SIGNED ONCE · 0.79', { fill: C.accent, size: 9 })}

        <!-- month axis -->
        <line x1="${x0}" y1="${yB}" x2="${x1}" y2="${yB}" stroke="${C.lineHard}" stroke-width="1.5"/>
        ${MONTHS.map((m, i) => lab(X(i).toFixed(1), yB + 22, m, { a: 'middle', size: 8.5, ls: 0.8 })).join('')}

        <!-- the gap, named -->
        <g opacity="0">${showAt(0.42, dur)}
          ${(() => {
            const i = 7; // the widest point
            const yc = (yCard + Y(MARKET[i])) / 2;
            return `
              <line x1="${X(i).toFixed(1)}" y1="${(yCard + 3).toFixed(1)}" x2="${X(i).toFixed(1)}"
                y2="${(Y(MARKET[i]) - 3).toFixed(1)}" stroke="${C.down}" stroke-width="2"/>
              ${card(X(i) + 14, yc - 17, 142, 34, { fill: C.ground, stroke: C.down, r: 8 })}
              ${lab(X(i) + 28, yc + 4, `${over} OF 12 OVERPAID`, { fill: C.down, size: 9 })}`;
          })()}
        </g>

        <!-- readout -->
        ${[
          ['PAID EVERY MONTH', CARD_RATE.toFixed(2), C.text, 0.46],
          ['MARKET AVERAGED', avg.toFixed(2), C.up, 0.52],
          ['LEFT ON THE TABLE', `$${perTB}/TB`, C.down, 0.60],
        ].map(([k, v, col, at], i) => {
          const w = (VW - 80 - 28) / 3;
          const x = 40 + i * (w + 14);
          return `<g opacity="0">${showAt(at, dur)}
            ${card(x, 330, w, 62, { fill: C.rise, stroke: null })}
            ${lab(x + 18, 354, k, { size: 8.5 })}
            ${num(x + w - 18, 378, v, { size: 22, w: 700, a: 'end', fill: col })}
          </g>`;
        }).join('')}
      </svg>`,
    };
  },
};

/* ════════════════════════════════════════════════════════════════════════
   The book — base rate in, six families applied, quote out
   ════════════════════════════════════════════════════════════════════════ */
const BW = 1280, BH = 420;

const STEPS = [
  ['Quality of service', 31, +0.04, 'Measured throughput and attach success above the route average'],
  ['Geopolitical &amp; climate risk', 18, +0.02, 'Grid instability and a severe-weather watch on the landing side'],
  ['Pricing &amp; spread', 24, -0.06, 'Four counterparties quoting the same route, spread at 0.07'],
  ['Liquidity arrangements', 12, -0.03, 'Settled upfront at T+0 rather than deferred to T+30'],
  ['Compliance &amp; counterparty', 15, +0.01, 'Cleared KYB, holding above the route minimum'],
  ['Tier &amp; standing', 9, -0.02, 'Full MVNO with a two-year delivery record'],
];

export const bookFlow = {
  id: 'omb-flow',
  name: 'Base Rate to Quote',
  family: 'The book',
  tagline: 'Every step between the wholesale rate and your price',
  desc:
    'A waterfall, which is the only honest shape for this: the wholesale base rate on the left, ' +
    'each of the six signal families raising or lowering it, and the quote that comes out on the ' +
    'right. Every step carries its family name, how many signals sit inside it, the size of the ' +
    'adjustment and the reason for it, so the final number is never a black box. The six columns ' +
    'map one-to-one onto the six cards underneath.',
  pros: [
    'The quote is fully traceable — no unexplained jump',
    'Reads left to right in the direction the eye already goes',
    'Ties directly to the six family cards below it',
  ],
  cons: ['Needs the full 1280 width to breathe', 'Deltas are representative, not a live quote'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 3, brand: 5, ease: 4 },
  build: (uid = 'b') => {
    const dur = 12;
    const base = 0.79;
    const yB = 306, yT = 116;
    const vMin = 0.70, vMax = 0.87;
    const Y = (v) => yB - ((v - vMin) / (vMax - vMin)) * (yB - yT);
    const BAR = 92;
    const cols = 8;
    const L = 96, R = 48;            // axis labels live in the left margin
    const gap = (BW - L - R - cols * BAR) / (cols - 1);
    const CX = (i) => L + i * (BAR + gap) + BAR / 2;

    let run = base;
    const rows = STEPS.map(([name, n, d, why], i) => {
      const from = run; run = +(run + d).toFixed(4);
      return { name, n, d, why, from, to: run, i };
    });
    const quote = run;

    const stepIn = (i) => 0.07 + i * 0.08;

    return {
      pills: [],
      svg: `<svg viewBox="0 0 ${BW} ${BH}" xmlns="http://www.w3.org/2000/svg" role="img"
        aria-label="Waterfall from wholesale base rate to final quote">
        <rect width="${BW}" height="${BH}" fill="${C.ground}"/>

        ${lab(48, 40, 'JP · TIER-1 · USD PER GB · ONE MOMENT IN THE BOOK')}
        ${lab(BW - 48, 40, `109 SIGNALS, SIX FAMILIES · SCALE ${vMin.toFixed(2)}–${vMax.toFixed(2)}`, { a: 'end' })}

        ${[0.72, 0.76, 0.80, 0.84].map((v) => `
          <line x1="${L}" y1="${Y(v).toFixed(1)}" x2="${BW - R}" y2="${Y(v).toFixed(1)}"
            stroke="${C.line}" stroke-width="1"/>
          ${num(L - 16, Y(v) + 4, v.toFixed(2), { size: 9.5, fill: C.faint, w: 500, a: 'end' })}`).join('')}
        <line x1="${L}" y1="${yB}" x2="${BW - R}" y2="${yB}" stroke="${C.lineHard}" stroke-width="1.5"/>
        ${num(L - 16, yB + 4, vMin.toFixed(2), { size: 9.5, fill: C.faint, w: 500, a: 'end' })}

        <!-- base rate -->
        <g>
          <rect x="${CX(0) - BAR / 2}" y="${Y(base).toFixed(1)}" width="${BAR}"
            height="${(yB - Y(base)).toFixed(1)}" rx="6" fill="#D5DEEE"/>
          ${card(CX(0) - 40, Y(base) - 40, 80, 28, { fill: C.rise, stroke: null, r: 8 })}
          ${num(CX(0), Y(base) - 20, base.toFixed(2), { size: 17, w: 700, a: 'middle' })}
          ${lab(CX(0), yB + 26, 'WHOLESALE', { a: 'middle', size: 8.5, fill: C.dim })}
          ${lab(CX(0), yB + 41, 'BASE RATE', { a: 'middle', size: 8.5, fill: C.dim })}
        </g>

        <!-- six family adjustments -->
        ${rows.map((r) => {
          const i = r.i + 1;
          const up = r.d > 0;
          const yHi = Y(Math.max(r.from, r.to));
          const h = Math.abs(Y(r.from) - Y(r.to));
          const col = up ? C.up : C.accent;
          const soft = up ? C.upSoft : C.accentSoft;
          const at = stepIn(r.i);
          const words = r.name.replace('&amp;', '&').split(' ');
          const l1 = words.slice(0, 2).join(' ');
          const l2 = words.slice(2).join(' ');
          return `
          <g opacity="0">${showAt(at, dur)}
            <line x1="${CX(i - 1) + BAR / 2}" y1="${Y(r.from).toFixed(1)}" x2="${CX(i) - BAR / 2}"
              y2="${Y(r.from).toFixed(1)}" stroke="${C.lineHard}" stroke-width="1.4" stroke-dasharray="4 4"/>
            <rect x="${CX(i) - BAR / 2}" y="${yHi.toFixed(1)}" width="${BAR}" height="${Math.max(h, 4).toFixed(1)}"
              rx="5" fill="${col}" opacity="0.9"/>
            ${card(CX(i) - 40, yHi - 34, 80, 26, { fill: soft, stroke: null, r: 7 })}
            ${num(CX(i), yHi - 16, `${up ? '+' : '−'}${Math.abs(r.d).toFixed(2)}`,
              { size: 13, w: 700, a: 'middle', fill: col })}
            ${lab(CX(i), yB + 26, l1.toUpperCase(), { a: 'middle', size: 8.5, fill: C.dim })}
            ${l2 ? lab(CX(i), yB + 41, l2.toUpperCase(), { a: 'middle', size: 8.5, fill: C.dim }) : ''}
            ${num(CX(i), yB + 59, `${r.n} SIGNALS`, { size: 8.5, a: 'middle', fill: C.faint, w: 500, ls: 0.8 })}
          </g>`;
        }).join('')}

        <!-- the quote -->
        <g opacity="0">${showAt(0.56, dur)}
          <line x1="${CX(6) + BAR / 2}" y1="${Y(quote).toFixed(1)}" x2="${CX(7) - BAR / 2}"
            y2="${Y(quote).toFixed(1)}" stroke="${C.lineHard}" stroke-width="1.4" stroke-dasharray="4 4"/>
          <rect x="${CX(7) - BAR / 2}" y="${Y(quote).toFixed(1)}" width="${BAR}"
            height="${(yB - Y(quote)).toFixed(1)}" rx="6" fill="${C.accent}"/>
          ${card(CX(7) - 52, Y(quote) - 40, 104, 30, { fill: C.accent, stroke: null, r: 8 })}
          ${num(CX(7), Y(quote) - 19, quote.toFixed(2), { size: 19, w: 700, a: 'middle', fill: '#fff' })}
          ${lab(CX(7), yB + 26, 'YOUR QUOTE', { a: 'middle', size: 8.5, fill: C.accent })}
          ${lab(CX(7), yB + 42, 'THIS MOMENT', { a: 'middle', size: 8.5, fill: C.accent })}
        </g>

        <!-- the reason for each step, cycled underneath -->
        ${rows.map((r) => {
          const on = (0.07 + r.i * 0.08).toFixed(4);
          const off = (0.07 + (r.i + 1) * 0.08).toFixed(4);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0;0"
              keyTimes="0;${on};${(+on + 0.014).toFixed(4)};${(+off - 0.014).toFixed(4)};${off};1"
              dur="${dur}s" repeatCount="indefinite"/>
            ${txt(L, BH - 18, `${r.name.replace('&amp;', '&')} — ${r.why}`, { size: 13.5, fill: C.dim })}
          </g>`;
        }).join('')}
        <g opacity="0">${showAt(0.56, dur)}
          ${txt(L, BH - 18, 'Six families, 109 signals, one quote — and every step of it on the record.',
            { size: 13.5, fill: C.text, w: 600 })}
        </g>
      </svg>`,
    };
  },
};

export const VENUE_BOX = { w: VW, h: VH };
export const BOOK_BOX = { w: BW, h: BH };

/* ════════════════════════════════════════════════════════════════════════
   Hero — the live book, made internally consistent.

   The board variant reused here previously coloured the whole bid column
   green and the whole ask column red, which is not what those colours mean
   in a book; its rows flashed "repriced" on one clock while the numbers
   changed on another, so a row could flash without moving; its change column
   was a fixed string unrelated to the prices above it; and its "repriced 4s
   ago / 1s ago / 2s ago" readout counted backwards. All four are fixed here:
   one clock, ten reprices per loop, and every cell derived from the move.
   ════════════════════════════════════════════════════════════════════════ */
const HW = 576, HH = 460;

/* each route carries two quote states and alternates between them; the change
   cell is computed from the move that just happened, never asserted */
const BOOK_ROWS = [
  ['JP · Tier-1', [0.83, 0.90, 12.4], [0.82, 0.89, 11.8]],
  ['DE · Tier-1', [0.62, 0.67, 8.1], [0.63, 0.68, 8.6]],
  ['US · Tier-1', [0.71, 0.78, 15.2], [0.70, 0.77, 14.4]],
  ['SG · Tier-1', [0.59, 0.64, 6.4], [0.60, 0.65, 6.9]],
  ['BR · Tier-2', [1.16, 1.27, 3.2], [1.14, 1.25, 3.0]],
];

export const heroBook = {
  id: 'omh-book',
  name: 'The Live Book',
  family: 'Hero',
  tagline: 'One clock, and every cell derived from the move',
  desc:
    'The order book the page is describing, quoting on a single clock. Ten reprices per loop, ' +
    'one route at a time: the row lights, its bid and ask move, the change cell is computed from ' +
    'that move rather than asserted, depth adjusts with it, and the footer names the route that ' +
    'just repriced and what it did. Bid and ask are set in neutral text — green and red carry ' +
    'direction of movement, which is what they mean in a book.',
  pros: [
    'Every cell is derived from one event, so nothing can contradict anything else',
    'The footer makes each reprice legible instead of leaving it to be noticed',
    'Colour is used the way a trading surface actually uses it',
  ],
  cons: ['Five routes is a small book', 'Requires a real feed to stay truthful in production'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid = 'h') => {
    const dur = 20, eps = 0.004;
    const X = { route: 58, bid: 286, ask: 356, chg: 428, depth: HW - 58 };

    const cell = (x, y, v, o = {}) => num(x, y, v, { a: 'end', size: 12.5, w: 600, ...o });

    const rows = BOOK_ROWS.map(([route, A, B], i) => {
      const t1 = (1 + i * 2) / dur;            // moves to state B
      const t2 = (11 + i * 2) / dur;           // moves back to state A
      const y = 138 + i * 46;
      const pct = (from, to) => (((to - from) / from) * 100).toFixed(1);
      const upB = B[1] > A[1], upA = A[1] > B[1];

      /* one state's cells, shown only while that state is current */
      const state = (S, on, off, up, delta) => `
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0"
            keyTimes="0;${on.toFixed(4)};${(on + eps).toFixed(4)};${off.toFixed(4)};${(off + eps).toFixed(4)};1"
            dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
          ${cell(X.bid, y + 25, S[0].toFixed(2))}
          ${cell(X.ask, y + 25, S[1].toFixed(2))}
          ${cell(X.chg, y + 25, `${up ? '+' : '−'}${Math.abs(delta)}%`, { fill: up ? C.up : C.down, size: 11, w: 700 })}
          ${num(X.depth, y + 25, `${S[2].toFixed(1)} TB`, { a: 'end', size: 11, fill: C.dim, w: 500 })}
        </g>`;

      return `
      <g>
        ${i % 2 ? `<rect x="44" y="${y}" width="${HW - 88}" height="40" rx="8" fill="${C.rise}"/>` : ''}
        ${[t1, t2].map((tt) => `
          <rect x="44" y="${y}" width="${HW - 88}" height="40" rx="8" fill="${C.accentSoft}" opacity="0">
            <animate attributeName="opacity" values="0;0;1;0;0"
              keyTimes="0;${tt.toFixed(4)};${(tt + eps).toFixed(4)};${(tt + 0.05).toFixed(4)};1"
              dur="${dur}s" repeatCount="indefinite"/></rect>`).join('')}
        ${txt(X.route, y + 25, route, { size: 12, w: 600 })}
        ${state(B, t1, t2, upB, pct(A[1], B[1]))}
        ${state(A, t2, 1 - eps * 2, upA, pct(B[1], A[1]))}
        <g opacity="1">
          <animate attributeName="opacity" values="1;1;0;0;1;1"
            keyTimes="0;${t1.toFixed(4)};${(t1 + eps).toFixed(4)};${t2.toFixed(4)};${(t2 + eps).toFixed(4)};1"
            dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
          ${cell(X.bid, y + 25, A[0].toFixed(2))}
          ${cell(X.ask, y + 25, A[1].toFixed(2))}
          ${cell(X.chg, y + 25, `${upA ? '+' : '−'}${Math.abs(pct(B[1], A[1]))}%`,
            { fill: upA ? C.up : C.down, size: 11, w: 700 })}
          ${num(X.depth, y + 25, `${A[2].toFixed(1)} TB`, { a: 'end', size: 11, fill: C.dim, w: 500 })}
        </g>
      </g>`;
    }).join('');

    /* the footer names the reprice that just happened, on the same clock */
    const events = [];
    BOOK_ROWS.forEach(([route, A, B], i) => {
      events.push({ at: (1 + i * 2) / dur, route, from: A[1], to: B[1] });
    });
    BOOK_ROWS.forEach(([route, A, B], i) => {
      events.push({ at: (11 + i * 2) / dur, route, from: B[1], to: A[1] });
    });
    events.sort((a, b) => a.at - b.at);

    const footer = events.map((e, k) => {
      const on = e.at, off = k === events.length - 1 ? null : events[k + 1].at;
      const up = e.to > e.from;
      const body = `
        ${txt(58, HH - 26, 'Last reprice', { size: 11, fill: C.faint })}
        ${txt(138, HH - 26, e.route, { size: 11.5, w: 600 })}
        ${num(258, HH - 26, `ask ${e.from.toFixed(2)}`, { size: 11, fill: C.dim, w: 500 })}
        ${txt(340, HH - 26, '→', { size: 11, fill: C.faint })}
        ${num(360, HH - 26, e.to.toFixed(2), { size: 11.5, w: 700, fill: up ? C.up : C.down })}
        ${lab(HW - 58, HH - 26, up ? 'ASK ROSE' : 'ASK FELL', { a: 'end', fill: up ? C.up : C.down, size: 8.5 })}`;
      /* the last event wraps around the loop seam, so it holds at both ends */
      return off == null
        ? `<g opacity="0"><animate attributeName="opacity" values="1;1;0;0;1;1"
             keyTimes="0;${events[0].at.toFixed(4)};${(events[0].at + eps).toFixed(4)};${on.toFixed(4)};${(on + eps).toFixed(4)};1"
             dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>${body}</g>`
        : `<g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0;0"
             keyTimes="0;${on.toFixed(4)};${(on + eps).toFixed(4)};${off.toFixed(4)};${(off + eps).toFixed(4)};1"
             dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>${body}</g>`;
    }).join('');

    return {
      pills: [],
      svg: `<svg viewBox="0 0 ${HW} ${HH}" xmlns="http://www.w3.org/2000/svg" role="img"
        aria-label="Five Tier-1 routes repricing one at a time on a live book">
        <rect width="${HW}" height="${HH}" fill="${C.ground}"/>
        ${card(32, 56, HW - 64, 348, { r: 16 })}
        <circle cx="58" cy="88" r="4" fill="${C.up}">
          <animate attributeName="opacity" values="0.35;1;0.35" keyTimes="0;0.5;1" dur="2.2s" repeatCount="indefinite"/>
        </circle>
        ${lab(70, 92, 'OMDM · LIVE BOOK', { fill: C.text, size: 9.5 })}
        ${lab(HW - 58, 92, 'USD / GB', { a: 'end' })}
        <line x1="58" y1="106" x2="${HW - 58}" y2="106" stroke="${C.line}"/>
        ${lab(X.route, 126, 'ROUTE')}
        ${lab(X.bid, 126, 'BID', { a: 'end' })}
        ${lab(X.ask, 126, 'ASK', { a: 'end' })}
        ${lab(X.chg, 126, 'CHANGE', { a: 'end' })}
        ${lab(X.depth, 126, 'DEPTH', { a: 'end' })}
        ${rows}
        ${footer}
      </svg>`,
    };
  },
};

/* ════════════════════════════════════════════════════════════════════════
   Who trades — depth narrows the spread.

   The block's copy argues that a deeper book prices better for everyone in
   it, including competitors. The variant previously mounted here listed four
   participant types and showed them clearing KYC, which is the controls
   argument, not this one — and one of its four ("Aggregator") appears nowhere
   in the page copy. This shows the actual claim: each counterparty that joins
   narrows the spread, and the improvement accrues to everybody.
   ════════════════════════════════════════════════════════════════════════ */
const PW = 576, PH = 460;

/* best bid rises and best ask falls as each counterparty joins; every spread
   lands on a clean two decimals so the readout never changes precision */
const JOINERS = [
  ['Openline', 'MVNO · seeding the book', 'Sells', 0.56, 0.67],
  ['Tier-1 operator', 'Idle overnight capacity', 'Sells', 0.575, 0.665],
  ['Regional MVNO', 'Buying at market, not a rate card', 'Buys', 0.59, 0.66],
  ['Competing aggregator', 'Quoting both ways', 'Both', 0.60, 0.66],
  ['Enterprise fleet', 'IoT across 41 countries', 'Buys', 0.605, 0.655],
  ['Reseller group', 'Reselling into 9 markets', 'Both', 0.61, 0.65],
];

export const depthNarrows = {
  id: 'omp-depth',
  name: 'Depth Narrows the Spread',
  family: 'Who trades',
  tagline: 'Including the competitor who just joined',
  desc:
    'The one claim this block makes is that a deeper book prices better for everyone standing in ' +
    'it. So that is what this draws: six counterparties arriving one at a time — a Tier-1 ' +
    'operator, a buyer, a competing aggregator, an enterprise fleet — with the best bid rising ' +
    'and the best ask falling as each joins. The spread closes from 0.11 to 0.04, and the final ' +
    'line makes the point explicit: that improvement belongs to everyone, including the ' +
    'competitor who caused it.',
  pros: [
    'Demonstrates the block\u2019s argument rather than restating the participant list',
    'The converging spread is legible without a legend',
    'Names a competitor joining, which is the uncomfortable part of the claim',
  ],
  cons: ['Spread figures are illustrative', 'Six rows is tight at this height'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid = 'p') => {
    const dur = 18;
    const railX0 = 56, railX1 = PW - 56;
    const vLo = 0.535, vHi = 0.695;
    const PX = (v) => railX0 + ((v - vLo) / (vHi - vLo)) * (railX1 - railX0);
    /* all six arrive inside the first 60%, so the closed spread holds */
    const at = (i) => 0.04 + i * 0.11;

    /* keyTimes must open at 0, so the first position is held from the start of
       the loop until the first counterparty actually arrives */
    const bidKeys = JOINERS.map((j) => PX(j[3]).toFixed(1));
    const askKeys = JOINERS.map((j) => PX(j[4]).toFixed(1));
    const widths = JOINERS.map((j) => (PX(j[4]) - PX(j[3])).toFixed(1));
    const times = ['0', ...JOINERS.map((_, i) => at(i).toFixed(4)), '1'];
    const pad = (k) => [k[0], ...k, k[k.length - 1]];
    const splines = times.slice(1).map(() => '0.4 0 0.2 1').join(';');

    const track = (attr, keys) =>
      `<animate attributeName="${attr}" values="${pad(keys).join(';')}" keyTimes="${times.join(';')}"` +
      ` dur="${dur}s" repeatCount="indefinite" calcMode="spline" keySplines="${splines}"/>`;

    /* a transform list needs animateTransform — plain <animate> is silently
       ignored, which left both markers pinned at their opening positions */
    const slide = (keys) =>
      `<animateTransform attributeName="transform" type="translate"` +
      ` values="${pad(keys).map((k) => `${k} 404`).join(';')}" keyTimes="${times.join(';')}"` +
      ` dur="${dur}s" repeatCount="indefinite" calcMode="spline" keySplines="${splines}"/>`;

    return {
      pills: [],
      svg: `<svg viewBox="0 0 ${PW} ${PH}" xmlns="http://www.w3.org/2000/svg" role="img"
        aria-label="Six counterparties joining a book and narrowing its spread">
        <rect width="${PW}" height="${PH}" fill="${C.ground}"/>
        ${lab(40, 36, 'COUNTERPARTIES QUOTING DE · TIER-1')}

        ${JOINERS.map(([nm, sub, side], i) => {
          const y = 44 + i * 48;
          const on = at(i);
          const sideCol = side === 'Sells' ? C.up : side === 'Buys' ? C.accent : C.text;
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(4)};${(on + 0.03).toFixed(4)};1"
              dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
            <animateTransform attributeName="transform" type="translate" values="18 0;0 0;0 0"
              keyTimes="0;${(on + 0.03).toFixed(4)};1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
            ${card(40, y, PW - 80, 40, { fill: i === 3 ? C.accentSoft : C.ground, stroke: i === 3 ? C.accent : C.line, r: 10 })}
            <circle cx="62" cy="${y + 20}" r="3.5" fill="${sideCol}"/>
            ${txt(78, y + 24, nm, { size: 12.5, w: i === 3 ? 700 : 600 })}
            ${txt(228, y + 24, sub, { size: 11, fill: C.dim })}
            ${lab(PW - 58, y + 24, side.toUpperCase(), { a: 'end', fill: sideCol, size: 8.5 })}
          </g>`;
        }).join('')}

        <!-- the spread, closing as the book deepens -->
        ${card(32, 336, PW - 64, 98, { fill: C.rise, stroke: null, r: 14 })}
        ${lab(56, 362, 'BEST BID \u2014 BEST ASK, USD / GB')}
        <line x1="${railX0}" y1="404" x2="${railX1}" y2="404" stroke="${C.lineHard}" stroke-width="2"/>
        ${num(railX0, 390, vLo.toFixed(2), { size: 9.5, fill: C.faint, w: 500 })}
        ${num(railX1, 390, vHi.toFixed(2), { size: 9.5, a: 'end', fill: C.faint, w: 500 })}

        <rect x="${bidKeys[0]}" y="400" width="${widths[0]}" height="8" rx="4" fill="${C.accent}" opacity="0.2">
          ${track('x', bidKeys)}
          ${track('width', widths)}
        </rect>

        <polygon points="0,-7 6,0 0,7 -6,0" fill="${C.up}" transform="translate(${bidKeys[0]} 404)">
          ${slide(bidKeys)}
        </polygon>
        <polygon points="0,-7 6,0 0,7 -6,0" fill="${C.down}" transform="translate(${askKeys[0]} 404)">
          ${slide(askKeys)}
        </polygon>
        <g transform="translate(${bidKeys[0]} 404)">${slide(bidKeys)}
          ${lab(0, 22, 'BID', { a: 'middle', fill: C.up, size: 8 })}</g>
        <g transform="translate(${askKeys[0]} 404)">${slide(askKeys)}
          ${lab(0, 22, 'ASK', { a: 'middle', fill: C.down, size: 8 })}</g>

        ${JOINERS.map((j, i) => {
          const on = at(i), off = i === JOINERS.length - 1 ? 1 : at(i + 1);
          const spread = (j[4] - j[3]).toFixed(2);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0;0"
              keyTimes="0;${on.toFixed(4)};${(on + 0.012).toFixed(4)};${Math.min(off, 0.994).toFixed(4)};${Math.min(off + 0.006, 0.999).toFixed(4)};1"
              dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
            ${num(PW - 56, 362, `spread ${spread}`, { a: 'end', size: 12.5, w: 700, fill: i === 5 ? C.up : C.text })}
            ${num(56, 426, `${i + 1} of 6 quoting`, { size: 11, fill: C.dim, w: 500 })}
          </g>`;
        }).join('')}

        <g opacity="0">
          ${showAt(0.78, dur)}
          ${txt(PW - 56, 454, 'Narrower for everyone in the book', { size: 12, a: 'end', w: 600, fill: C.up })}
        </g>
      </svg>`,
    };
  },
};

/* ════════════════════════════════════════════════════════════════════════
   Controls — the append-only trail, matching its own caption.

   The caption under this slot says "append-only, each line seals the one
   before it". The variant previously mounted here showed three columns whose
   reconciliation payoff was a difference of 0.00 between two figures that
   were printed identically — a tautology, not a reconciliation — and it
   repeated two of the four control statements already listed beside it. This
   shows the sealing the caption promises, and includes the one thing the
   section claims but never demonstrates: a match refused for standing.
   ════════════════════════════════════════════════════════════════════════ */
const KW = 624, KH = 440;

const TRAIL = [
  ['10428', 'Quote published', 'Tier-1 operator · DE', '9f2c', null],
  ['10429', 'KYB re-verified', 'Regional MVNO', '4a71', null],
  ['10430', 'Match refused', 'Reseller group', 'c0d8', 'Below the minimum standing this route requires'],
  ['10431', 'Matched · 4.0 TB', 'Competing aggregator', '71be', null],
  ['10432', 'Settled · T+0', 'Competing aggregator', 'e35a', null],
];

export const auditTrail = {
  id: 'omc-trail',
  name: 'The Append-Only Trail',
  family: 'Controls',
  tagline: 'Each line carries the hash of the line before it',
  desc:
    'The trail the caption describes, doing what the caption says. Five entries append in ' +
    'sequence, and each one shows the previous entry\u2019s seal as its own input, with a link drawn ' +
    'between them — so removing a line visibly breaks every line after it. The third entry is a ' +
    'match refused because the counterparty sits below the minimum standing the route requires, ' +
    'which is the one control the page asserts and never shows.',
  pros: [
    'Shows the sealing the caption promises instead of a generic ledger',
    'The refused match demonstrates enforcement, not just a policy statement',
    'Adds nothing that duplicates the four control statements beside it',
  ],
  cons: ['Hash chaining needs a plain-language gloss for non-technical readers', 'Five lines is a small sample'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid = 'k') => {
    const dur = 16;
    const at = (i) => 0.06 + i * 0.15;
    return {
      pills: [],
      svg: `<svg viewBox="0 0 ${KW} ${KH}" xmlns="http://www.w3.org/2000/svg" role="img"
        aria-label="An append-only audit trail in which each entry seals the one before it">
        <rect width="${KW}" height="${KH}" fill="${C.ground}"/>
        ${lab(32, 34, 'AUDIT TRAIL \u00b7 JP \u00b7 TIER-1')}
        ${lab(KW - 32, 34, 'APPEND-ONLY', { a: 'end', fill: C.accent })}

        ${TRAIL.map(([seq, event, party, seal, refusal], i) => {
          const y = 48 + i * 68;
          const on = at(i);
          const refused = !!refusal;
          const prev = i > 0 ? TRAIL[i - 1][3] : null;
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(4)};${(on + 0.035).toFixed(4)};1"
              dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
            <animateTransform attributeName="transform" type="translate" values="0 -8;0 0;0 0"
              keyTimes="0;${(on + 0.035).toFixed(4)};1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>

            ${card(32, y, KW - 64, 58, { fill: refused ? C.downSoft : C.ground, stroke: refused ? C.down : C.line, r: 11 })}
            <rect x="32" y="${y}" width="3.5" height="58" rx="2" fill="${refused ? C.down : C.accent}"/>

            ${num(54, y + 24, `#${seq}`, { size: 11, fill: C.faint, w: 500 })}
            ${txt(124, y + 24, event, { size: 13, w: 700, fill: refused ? C.down : C.text })}
            ${refused
              /* the reason needs a full line of its own, clear of the seal chip */
              ? `${txt(258, y + 24, party, { size: 11.5, fill: C.dim })}
                 ${txt(124, y + 43, refusal, { size: 11, fill: C.down })}`
              : txt(124, y + 43, party, { size: 11, fill: C.dim })}

            ${prev ? `
              <!-- the chain, drawn: the previous seal descends into this entry -->
              <path d="M ${KW - 102} ${y - 10} L ${KW - 102} ${y - 2}" stroke="${C.lineHard}"
                stroke-width="1.6" stroke-linecap="round"/>
              <path d="M ${KW - 106} ${y - 6} l 4 4 l 4 -4" fill="none" stroke="${C.lineHard}"
                stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              ${num(KW - 158, y + 23, `carries ${prev}`, { a: 'end', size: 9.5, fill: C.faint, w: 500 })}` : ''}
            ${card(KW - 148, y + 16, 92, 26, { fill: refused ? '#FAD9D9' : C.accentSoft, stroke: null, r: 8 })}
            ${num(KW - 102, y + 34, seal, { a: 'middle', size: 12, w: 700, fill: refused ? C.down : C.accent })}
          </g>`;
        }).join('')}

        <g opacity="0">${showAt(0.82, dur)}
          ${txt(32, KH - 16, 'Each entry carries the hash of the entry before it \u2014 removing one breaks every line after.',
            { size: 12.5, fill: C.dim })}
        </g>
      </svg>`,
    };
  },
};

export const HERO_BOX = { w: HW, h: HH };
export const PARTS_BOX = { w: PW, h: PH };
export const CTRL_BOX = { w: KW, h: KH };
