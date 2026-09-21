/* ─────────────────────────────────────────────────────────────────────────
   Purpose-built animations for the designed /omdm-market page.
   Fintech-clean surface only — light ground, one blue accent, mono numerals.
   Self-contained: no kit import, so the page cannot be broken by a board edit.

   venueCost  704 × 420   the cost of holding a rate card for a year
   bookFlow  1280 × 420   base rate in, six families applied, quote out
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
