/* ─────────────────────────────────────────────────────────────────────────
   /omdm-market — "What moves a price on OMDM".

   Net-new block. The live section is a six-card grid with no visual at all,
   so option 0 replicates that grid and options 1–10 propose a band that sits
   above or in place of it, drawn to 1280 x 420 inside the page's 1280px
   container. Options 1–5 are INST, 6–10 are FIN. See STYLE-OMDM.md.
   ───────────────────────────────────────────────────────────────────────── */
import { boxWrap, INST, FIN, TONES, INK, WHITE, GRAY, LINE, UP, DOWN } from './kit.js';

const W = 1280;
const H = 420;
const wB = boxWrap(W, H);
const MO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const noPills = [];

const t = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}"${o.m ? ` font-family="${MO}"` : ''} font-size="${o.size || 13}"` +
  ` font-weight="${o.w || 400}" fill="${o.fill || '#fff'}" opacity="${o.op == null ? 1 : o.op}"` +
  ` text-anchor="${o.a || 'start'}"${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${s}</text>`;

const lab = (x, y, s, fill, o = {}) =>
  t(x, y, s, { m: true, size: o.size || 10, ls: o.ls || 1.4, fill, a: o.a, op: o.op });

const rect = (x, y, w, h, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r == null ? 5 : o.r}"` +
  ` fill="${o.fill || 'none'}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 1}"` : ''}` +
  `${o.op == null ? '' : ` opacity="${o.op}"`}/>`;

/* the six families exactly as the live page names them */
const FAMS = [
  ['Quality of service', 'QUALITY OF SERVICE', 31, ['Live throughput', 'Attach success', 'Latency percentiles', 'Congestion windows']],
  ['Geopolitical & climate risk', 'GEOPOLITICAL & CLIMATE RISK', 18, ['Sanctions exposure', 'Regulatory change', 'Grid stability', 'Severe weather']],
  ['Pricing & spread', 'PRICING & SPREAD', 24, ['Wholesale rate', 'Competing quotes', 'Volatility', 'Bid-ask spread']],
  ['Liquidity arrangements', 'LIQUIDITY ARRANGEMENTS', 12, ['Upfront vs deferred', 'Settlement window', 'Commitment size', 'Credit terms']],
  ['Compliance & counterparty', 'COMPLIANCE & COUNTERPARTY', 15, ['KYC / KYB status', 'Minimum level held', 'Jurisdiction', 'Audit trail']],
  ['Tier & standing', 'TIER & STANDING', 9, ['MNO', 'Full MVNO', 'MVNO-reseller', 'Reseller']],
];
const SHORT = ['Quality', 'Risk', 'Pricing', 'Liquidity', 'Compliance', 'Tier'];
/* live values per family, per named signal — four signals, three tick states */
const VALS = [
  [['412', '408', '419'], ['98.7', '98.4', '98.9'], ['31', '33', '29'], ['Low', 'Low', 'Med']],
  [['None', 'None', 'None'], ['Stable', 'Stable', 'Watch'], ['Nominal', 'Nominal', 'Nominal'], ['Watch', 'Alert', 'Watch']],
  [['0.79', '0.78', '0.80'], ['4', '5', '4'], ['2.1%', '2.3%', '2.0%'], ['0.07', '0.06', '0.08']],
  [['Both', 'Both', 'Both'], ['T+30', 'T+14', 'T+30'], ['12 TB', '8 TB', '12 TB'], ['Approved', 'Approved', 'Approved']],
  [['Cleared', 'Cleared', 'Cleared'], ['MVNO', 'MVNO', 'MNO'], ['JP / SG', 'JP / SG', 'JP / SG'], ['Complete', 'Complete', 'Complete']],
  [['14', '14', '15'], ['9', '9', '9'], ['22', '23', '22'], ['31', '30', '31']],
];


const repricing = (x, y, vals, o = {}) => {
  const n = vals.length;
  const kt = vals.map((_, i) => (i / n).toFixed(4)).concat('1').join(';');
  return `<text x="${x}" y="${y}" font-family="${MO}" font-size="${o.size || 14}" font-weight="${o.w || 500}"` +
    ` fill="${o.fill || '#fff'}" text-anchor="${o.a || 'end'}">` +
    vals.map((v, i) =>
      `<tspan x="${x}" opacity="0">${v}` +
      `<animate attributeName="opacity" values="${vals.map((_, j) => (j === i ? '1' : '0')).join(';')};${i === 0 ? '1' : '0'}"` +
      ` keyTimes="${kt}" dur="${o.dur || 9}s" repeatCount="indefinite" calcMode="discrete"/></tspan>`
    ).join('') + '</text>';
};

/* ══════════════════════════════════════════════════════════════════════════
   OPTION 0 — the six-card grid as it ships
   ══════════════════════════════════════════════════════════════════════════ */
export const bookCurrent = {
  id: 'ob-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'Six static cards and no visual',
  desc:
    'What ships now: a three-by-two grid of cards, each with a signal count, a paragraph ' +
    'and four named signals. The content is genuinely strong — the signal names are ' +
    'specific and checkable — but the section that explains a live pricing engine has ' +
    'nothing live in it, and the reader has to assemble "a hundred signals become one ' +
    'price" in their own head.',
  pros: ['Copy is specific and credible', 'Scannable', 'Signal names are checkable'],
  cons: ['Nothing demonstrates the mechanism', 'Six paragraphs is a lot of reading', 'No price appears anywhere in the section'],
  scores: { story: 3, motion: 1, perf: 5, mobile: 4, brand: 3, ease: 5 },
  build: () => ({
    pills: noPills,
    svg: wB(`
      ${rect(0, 0, W, H, { fill: '#FAFAFB', r: 0 })}
      ${FAMS.map((f, i) => {
        const col = i % 3, row = (i / 3) | 0;
        const x = 20 + col * 414, y = 18 + row * 196;
        return `
        ${rect(x, y, 394, 176, { fill: WHITE, stroke: LINE, r: 10 })}
        ${rect(x + 20, y + 20, 74, 20, { fill: TONES.orange.wash, r: 10 })}
        ${lab(x + 30, y + 34, f[2] + ' SIGNALS', TONES.orange.main, { size: 8 })}
        ${t(x + 20, y + 62, f[0], { size: 15, w: 700, fill: INK })}
        ${[0, 1].map(k => t(x + 20, y + 84 + k * 16,
          k === 0 ? 'Measured continuously and fed into every quote on' : 'the route, rather than promised on a rate card.',
          { size: 11, fill: '#5A6070' })).join('')}
        ${f[3].map((sg, j) => {
          const sx = x + 20 + (j % 2) * 186, sy = y + 118 + ((j / 2) | 0) * 24;
          return `${rect(sx, sy, 176, 19, { fill: '#F4F5F7', r: 4 })}
            ${t(sx + 8, sy + 13.5, sg, { size: 9.5, fill: '#5A6070' })}`;
        }).join('')}`;
      }).join('')}
      ${lab(W / 2, H - 6, 'NOTHING IN THIS SECTION MOVES, AND NO PRICE IS EVER SHOWN', GRAY, { a: 'middle', size: 9 })}`),
  }),
};

/* ══════════════════════════════════════════════════════════════════════════
   DIRECTION A — INST
   ══════════════════════════════════════════════════════════════════════════ */

/* A1 ── The Signal Floor */
export const signalFloor = {
  id: 'ob-floor',
  name: 'The Signal Floor',
  family: 'A · institutional',
  tagline: 'Six columns of live signals, one price',
  desc:
    'Six narrow columns, one per family, each carrying its four named signals with a value ' +
    'that ticks. Every column feeds a rail along the bottom that terminates in the composed ' +
    'quote on the right. It keeps all of the page\'s existing specificity — every signal name ' +
    'survives — and adds the one thing the card grid cannot do, which is show the hundred ' +
    'signals arriving at a single number.',
  pros: ['Preserves every signal name already written', 'Shows inputs and output in one frame', 'Scales to more families without redrawing'],
  cons: ['Dense — needs the full 1280 to breathe', 'Stacks awkwardly on mobile'],
  scores: { story: 5, motion: 4, perf: 4, mobile: 2, brand: 5, ease: 4 },
  build: () => {
    const colW = 178, gap = 12, x0 = 24;
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        <circle cx="200" cy="0" r="300" fill="${INST.rise}" opacity="0.5"/>
        ${lab(24, 28, 'THE BOOK · 109 SIGNALS IN SIX FAMILIES', INST.text, { size: 10 })}
        ${lab(W - 24, 28, 'JP · TIER-1 · USD / GB', INST.faint, { a: 'end' })}

        ${FAMS.map((f, i) => {
          const x = x0 + i * (colW + gap);
          const beg = (i * 1.4).toFixed(2);
          return `<g>
            ${rect(x, 44, colW, 268, { fill: INST.panel, r: 6 })}
            <rect x="${x}" y="44" width="${colW}" height="268" rx="6" fill="${INST.gold}" opacity="0">
              <animate attributeName="opacity" values="0;0.07;0;0" keyTimes="0;0.05;0.16;1"
                dur="9s" begin="${beg}s" repeatCount="indefinite"/></rect>
            ${rect(x, 44, colW, 2, { fill: INST.gold, r: 0, op: 0.35 })}
            ${lab(x + 14, 66, f[2] + ' SIGNALS', INST.gold, { size: 8, op: 0.9 })}
            ${t(x + 14, 90, SHORT[i], { size: 14, w: 700, fill: INST.text })}
            ${f[3].map((sg, j) => {
              const sy = 112 + j * 44;
              return `
              ${lab(x + 14, sy + 10, sg.toUpperCase(), INST.faint, { size: 7.5, ls: 0.9 })}
              ${repricing(x + colW - 14, sy + 30, VALS[i][j],
                { fill: INST.text, size: VALS[i][j][0].length > 5 ? 12 : 15, w: 600, dur: (6 + i * 0.5 + j).toFixed(1) })}
              ${rect(x + 14, sy + 34, colW - 28, 3, { fill: 'rgba(255,255,255,0.07)', r: 1.5 })}
              <rect x="${x + 14}" y="${sy + 34}" width="${colW - 28}" height="3" rx="1.5"
                fill="${INST.up}" opacity="0.5">
                <animate attributeName="width" values="${colW - 28};${((colW - 28) * 0.55).toFixed(0)};${colW - 28}"
                  keyTimes="0;0.5;1" dur="${(5 + i * 0.4 + j * 0.3).toFixed(1)}s" repeatCount="indefinite"/></rect>`;
            }).join('')}
            <line x1="${x + colW / 2}" y1="312" x2="${x + colW / 2}" y2="344" stroke="${INST.line}"/>
            <circle cx="${x + colW / 2}" cy="344" r="3" fill="${INST.gold}" opacity="0.4">
              <animate attributeName="opacity" values="0.4;1;0.4;0.4" keyTimes="0;0.06;0.2;1"
                dur="9s" begin="${beg}s" repeatCount="indefinite"/></circle>
          </g>`;
        }).join('')}

        <line x1="${x0 + colW / 2}" y1="344" x2="${W - 200}" y2="344" stroke="${INST.line}"/>
        <circle r="4" fill="${INST.gold}">
          <animateMotion dur="9s" repeatCount="indefinite" keyTimes="0;0.9;1" keyPoints="0;1;1"
            calcMode="linear" path="M ${x0 + colW / 2} 344 L ${W - 200} 344"/></circle>

        ${rect(W - 196, 322, 172, 66, { fill: INST.panel, r: 8, stroke: INST.goldDim })}
        ${lab(W - 182, 342, 'COMPOSED MID', INST.faint, { size: 8 })}
        ${repricing(W - 38, 376, ['0.87', '0.86', '0.88', '0.87'], { fill: INST.gold, size: 28, w: 700, dur: 9 })}
        ${lab(24, 376, 'MEASURED ON THE GROUND, NOT PROMISED ON A RATE CARD', INST.dim, { size: 9 })}`),
    };
  },
};

/* A2 ── Six Lanes */
export const sixLanes = {
  id: 'ob-lanes',
  name: 'Six Lanes',
  family: 'A · institutional',
  tagline: 'Signals travelling into the quote gate',
  desc:
    'Six horizontal lanes running left to right, one per family, with signal packets moving ' +
    'along each at a different rate — quality of service fast and constant, tier and standing ' +
    'slow and occasional. They converge on a gate at the right that emits a requote each time ' +
    'enough arrive. The wide band is the natural shape for this, and the varying cadences ' +
    'communicate something true: not all signals move at the same speed.',
  pros: ['Uses the full width as a strength', 'Different cadences carry real information', 'Reads without any labels'],
  cons: ['Loses the four named signals per family', 'Packet metaphors are common in telecom'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 3, brand: 4, ease: 4 },
  build: () => {
    const x0 = 210, x1 = W - 250;
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        <circle cx="${W - 200}" cy="${H / 2}" r="260" fill="${INST.rise}" opacity="0.45"/>
        ${lab(24, 28, 'THE BOOK · SIGNAL ARRIVAL', INST.text, { size: 10 })}
        ${lab(W - 24, 28, 'EVERY QUOTE IS THE OUTPUT, NEVER AN INPUT', INST.faint, { a: 'end' })}

        ${FAMS.map((f, i) => {
          const y = 66 + i * 46;
          const speed = [2.2, 6.5, 2.8, 5.5, 4.4, 8].at(i);
          const count = [6, 2, 5, 3, 3, 2].at(i);
          return `<g>
            ${t(24, y + 5, SHORT[i], { size: 12.5, w: 600, fill: INST.text })}
            ${lab(150, y + 4, f[2] + '', INST.gold, { size: 10, a: 'end', op: 0.85 })}
            ${lab(158, y + 4, 'SIG', INST.faint, { size: 7.5 })}
            <line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${INST.line}"/>
            ${Array.from({ length: count }, (_, k) => {
              const beg = ((speed / count) * k).toFixed(2);
              return `<rect x="0" y="${y - 3.5}" width="14" height="7" rx="2" fill="${INST.gold}" opacity="0.8">
                <animate attributeName="x" values="${x0};${x1 - 14}" dur="${speed}s"
                  begin="${beg}s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.08;0.9;1"
                  dur="${speed}s" begin="${beg}s" repeatCount="indefinite"/></rect>`;
            }).join('')}
          </g>`;
        }).join('')}

        <path d="M ${x1} 50 L ${x1 + 26} 50 L ${x1 + 26} 344 L ${x1} 344" fill="none" stroke="${INST.lineHard}"/>
        ${rect(x1 + 26, 160, 4, 74, { fill: INST.gold, r: 2, op: 0.5 })}

        ${rect(W - 196, 150, 172, 94, { fill: INST.panel, r: 8, stroke: INST.goldDim })}
        ${lab(W - 182, 172, 'REQUOTE', INST.faint, { size: 8 })}
        ${repricing(W - 38, 212, ['0.87', '0.88', '0.86', '0.87'], { fill: INST.gold, size: 30, w: 700, dur: 9 })}
        ${lab(W - 182, 232, 'JP · TIER-1', INST.dim, { size: 8 })}
        <rect x="${W - 196}" y="150" width="172" height="94" rx="8" fill="none" stroke="${INST.gold}" opacity="0">
          <animate attributeName="opacity" values="0;0.8;0;0" keyTimes="0;0.04;0.2;1" dur="2.25s" repeatCount="indefinite"/></rect>

        ${lab(24, H - 24, 'NOT EVERY SIGNAL MOVES AT THE SAME SPEED — QUALITY IS CONTINUOUS, STANDING IS RARE',
          INST.dim, { size: 9 })}`),
    };
  },
};

/* A3 ── The Waterfall */
export const waterfall = {
  id: 'ob-waterfall',
  name: 'The Waterfall',
  family: 'A · institutional',
  tagline: 'Wholesale base, six adjustments, final quote',
  desc:
    'The most institutional shape in the set and the one a wholesale buyer will already know ' +
    'how to read. A wholesale base rate on the left, then six steps — one per family — each ' +
    'adding or subtracting basis points, landing on the quoted price at the right. It is the ' +
    'only option that shows the direction and the size of each family\'s contribution rather ' +
    'than merely that it contributed.',
  pros: ['Instantly familiar to the target buyer', 'Shows sign and magnitude, not just presence', 'Defensible as a real pricing explanation'],
  cons: ['Implies the adjustments are additive and fixed', 'The numbers have to be genuinely representative'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 3, brand: 5, ease: 4 },
  build: () => {
    const steps = [0.06, 0.04, -0.03, -0.02, 0.01, -0.01];
    const base = 0.72;
    const yBot = 322, scale = 900;
    const bw = 112, gap = 34, x0 = 96;
    let run = base;
    const bars = steps.map((d, i) => {
      const from = run; run = +(run + d).toFixed(3);
      const yTop = yBot - (Math.max(from, run) - 0.6) * scale;
      const hgt = Math.abs(d) * scale;
      return { i, d, from, to: run, x: x0 + (i + 1) * (bw + gap), yTop, hgt };
    });
    const finalPx = run.toFixed(2);
    const yOf = (v) => yBot - (v - 0.6) * scale;
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        <circle cx="120" cy="0" r="280" fill="${INST.rise}" opacity="0.45"/>
        ${lab(24, 28, 'HOW A QUOTE IS BUILT · JP · TIER-1', INST.text, { size: 10 })}
        ${lab(W - 24, 28, 'USD / GB', INST.faint, { a: 'end' })}

        <line x1="24" y1="${yBot}" x2="${W - 24}" y2="${yBot}" stroke="${INST.line}"/>

        ${rect(x0, yOf(base), bw, (base - 0.6) * scale, { fill: 'rgba(255,255,255,0.10)', r: 3 })}
        ${t(x0 + bw / 2, yOf(base) - 12, base.toFixed(2), { m: true, size: 15, w: 600, a: 'middle', fill: INST.text })}
        ${lab(x0 + bw / 2, yBot + 20, 'WHOLESALE', INST.faint, { size: 8, a: 'middle' })}
        ${lab(x0 + bw / 2, yBot + 34, 'BASE', INST.faint, { size: 8, a: 'middle' })}

        ${bars.map(b => {
          const up = b.d > 0;
          const beg = (0.5 + b.i * 0.85).toFixed(2);
          return `<g>
            <line x1="${b.x - gap}" y1="${yOf(b.from)}" x2="${b.x}" y2="${yOf(b.from)}"
              stroke="${INST.line}" stroke-dasharray="2 3"/>
            <rect x="${b.x}" y="${b.yTop.toFixed(1)}" width="${bw}" height="0" rx="3"
              fill="${up ? INST.up : INST.down}" opacity="0.85">
              <animate attributeName="height" values="0;${b.hgt.toFixed(1)};${b.hgt.toFixed(1)}"
                keyTimes="0;0.1;1" dur="10s" begin="${beg}s" repeatCount="indefinite" fill="freeze"/></rect>
            ${t(b.x + bw / 2, b.yTop - 10, (up ? '+' : '−') + Math.abs(b.d * 100).toFixed(0) + ' bp',
              { m: true, size: 12, w: 600, a: 'middle', fill: up ? INST.up : INST.down })}
            ${lab(b.x + bw / 2, yBot + 20, SHORT[b.i].toUpperCase(), INST.faint, { size: 8, a: 'middle' })}
            ${lab(b.x + bw / 2, yBot + 34, FAMS[b.i][2] + ' SIG', INST.faint, { size: 7.5, a: 'middle', op: 0.7 })}
          </g>`;
        }).join('')}

        ${rect(W - 184, yOf(+finalPx), 132, (+finalPx - 0.6) * scale, { fill: INST.goldDim, r: 3 })}
        ${rect(W - 184, yOf(+finalPx), 132, 3, { fill: INST.gold, r: 0 })}
        ${t(W - 118, yOf(+finalPx) - 14, finalPx, { m: true, size: 24, w: 700, a: 'middle', fill: INST.gold })}
        ${lab(W - 118, yBot + 20, 'QUOTED', INST.gold, { size: 8, a: 'middle' })}
        ${lab(W - 118, yBot + 34, 'CONTINUOUSLY', INST.faint, { size: 7.5, a: 'middle' })}

        ${lab(24, H - 14, 'REPRESENTATIVE ADJUSTMENTS — THE BOOK RECOMPUTES ALL SIX CONTINUOUSLY',
          INST.dim, { size: 9 })}`),
    };
  },
};

/* A4 ── The Matrix */
export const signalMatrix = {
  id: 'ob-matrix',
  name: 'The Matrix',
  family: 'A · institutional',
  tagline: 'One cell per signal, all 109 of them',
  desc:
    'The literal hundred. Every one of the 109 signals gets a cell, grouped into six labelled ' +
    'blocks, and cells light as they resample — dense and fast on the left, sparse and slow on ' +
    'the right. The claim in the section heading is "over a hundred signals", and this is the ' +
    'only option where a reader can actually count them.',
  pros: ['Makes the headline number literally verifiable', 'Very cheap to run', 'Striking at a glance'],
  cons: ['Abstract — a cell means nothing on its own', 'Risks reading as decorative'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: () => {
    let idx = 0;
    const cell = 13, cg = 4, cols = 8;
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        <circle cx="${W / 2}" cy="0" r="340" fill="${INST.rise}" opacity="0.4"/>
        ${lab(24, 28, 'THE BOOK · ALL 109 SIGNALS', INST.text, { size: 10 })}
        ${lab(W - 24, 28, 'CELL LIGHTS WHEN THE SIGNAL RESAMPLES', INST.faint, { a: 'end' })}

        ${FAMS.map((f, i) => {
          const bx = 24 + i * 208;
          const rows = Math.ceil(f[2] / cols);
          const rate = [1.6, 7, 2.4, 5, 4, 9].at(i);
          return `<g>
            ${rect(bx, 48, 192, 244, { fill: INST.panel, r: 6 })}
            ${rect(bx, 48, 192, 2, { fill: INST.gold, r: 0, op: 0.3 })}
            ${lab(bx + 14, 70, f[2] + ' SIGNALS', INST.gold, { size: 8, op: 0.9 })}
            ${t(bx + 14, 92, SHORT[i], { size: 13.5, w: 700, fill: INST.text })}
            ${Array.from({ length: f[2] }, (_, k) => {
              const cx2 = bx + 14 + (k % cols) * (cell + cg);
              const cy2 = 108 + ((k / cols) | 0) * (cell + cg);
              const beg = ((rate / f[2]) * k + (idx++ % 3) * 0.11).toFixed(2);
              return `<rect x="${cx2}" y="${cy2}" width="${cell}" height="${cell}" rx="2"
                fill="rgba(255,255,255,0.07)"/>
                <rect x="${cx2}" y="${cy2}" width="${cell}" height="${cell}" rx="2" fill="${INST.gold}" opacity="0">
                  <animate attributeName="opacity" values="0;0.95;0.1;0" keyTimes="0;0.05;0.4;1"
                    dur="${rate}s" begin="${beg}s" repeatCount="indefinite"/></rect>`;
            }).join('')}
            ${lab(bx + 14, 108 + rows * (cell + cg) + 22, ['CONTINUOUS', 'DAILY', 'CONTINUOUS', 'PER DEAL', 'ON CHANGE', 'RARE'].at(i),
              INST.faint, { size: 7.5 })}
          </g>`;
        }).join('')}

        ${rect(24, 308, W - 48, 1, { fill: INST.line, r: 0 })}
        ${lab(24, 340, 'RESAMPLED IN THE LAST SECOND', INST.faint, { size: 9 })}
        ${repricing(250, 342, ['31', '44', '38', '52', '41'], { fill: INST.text, size: 16, w: 600, a: 'start', dur: 5 })}
        ${lab(W - 268, 340, 'COMPOSED MID', INST.faint, { size: 9, a: 'end' })}
        ${repricing(W - 24, 348, ['0.87', '0.86', '0.88', '0.87'], { fill: INST.gold, size: 26, w: 700, dur: 9 })}
        ${lab(24, H - 14, 'OVER A HUNDRED SIGNALS FEED EVERY QUOTE, IN SIX FAMILIES', INST.dim, { size: 9 })}`),
    };
  },
};

/* A5 ── Contribution */
export const contribution = {
  id: 'ob-contrib',
  name: 'Contribution',
  family: 'A · institutional',
  tagline: 'Who moved the price today',
  desc:
    'A single stacked bar spanning the band: what actually shifted this route\'s price over the ' +
    'last twenty-four hours, by family, with the segments resizing as the attribution changes. ' +
    'Below it, the one signal inside each family that did the most work, named. It answers a ' +
    'sharper question than "what feeds a price" — it answers "what moved it".',
  pros: ['Answers the more interesting question', 'One shape, no reading required', 'Names a specific cause per family'],
  cons: ['Attribution is a strong claim to publish', 'Needs live data to stay honest'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 3 },
  build: () => {
    const shares = [0.31, 0.19, 0.22, 0.11, 0.1, 0.07];
    const causes = ['Congestion windows in Tokyo', 'Typhoon advisory, Kyushu', 'Two new quotes on the route',
      'Deferred terms requested', 'Counterparty level raised', 'Reseller withdrew'];
    const x0 = 24, wTot = W - 48;
    let acc = 0;
    const segs = shares.map((s, i) => { const x = x0 + wTot * acc; acc += s; return { i, x, w: wTot * s, s }; });
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: INST.ground, r: 0 })}
        <circle cx="300" cy="0" r="300" fill="${INST.rise}" opacity="0.45"/>
        ${lab(24, 28, 'WHAT MOVED JP · TIER-1 IN THE LAST 24 HOURS', INST.text, { size: 10 })}
        ${lab(W - 24, 28, 'ATTRIBUTION BY FAMILY', INST.faint, { a: 'end' })}

        ${segs.map(g => {
          const alt = g.i % 2 === 0;
          return `<g>
            <rect x="${g.x.toFixed(1)}" y="56" width="${(g.w - 3).toFixed(1)}" height="54" rx="3"
              fill="${alt ? INST.gold : 'rgba(255,255,255,0.14)'}" opacity="${alt ? 0.8 : 1}">
              <animate attributeName="height" values="54;44;54" keyTimes="0;0.5;1"
                dur="${(6 + g.i * 0.8).toFixed(1)}s" repeatCount="indefinite"/></rect>
            ${t(g.x + 12, 90, (g.s * 100).toFixed(0) + '%', { m: true, size: 17, w: 700, fill: alt ? INST.ground : INST.text })}
          </g>`;
        }).join('')}

        ${segs.map(g => `
          <line x1="${(g.x + g.w / 2).toFixed(1)}" y1="116" x2="${(g.x + g.w / 2).toFixed(1)}" y2="138"
            stroke="${INST.line}"/>
          ${rect(g.x, 138, g.w - 3, 112, { fill: INST.panel, r: 6 })}
          ${lab(g.x + 12, 160, FAMS[g.i][2] + ' SIGNALS', INST.gold, { size: 7.5, op: 0.85 })}
          ${t(g.x + 12, 182, SHORT[g.i], { size: 13.5, w: 700, fill: INST.text })}
          ${lab(g.x + 12, 206, 'LARGEST MOVER', INST.faint, { size: 7 })}
          ${t(g.x + 12, 226, causes[g.i].length > 24 ? causes[g.i].slice(0, 23) + '…' : causes[g.i],
            { size: 10.5, fill: INST.dim })}
          <circle cx="${g.x + 12}" cy="240" r="2.5" fill="${INST.up}">
            <animate attributeName="opacity" values="0.3;1;0.3" keyTimes="0;0.5;1"
              dur="${(2 + g.i * 0.3).toFixed(1)}s" repeatCount="indefinite"/></circle>
          ${lab(g.x + 22, 243, 'STILL ACTIVE', INST.faint, { size: 7 })}`).join('')}

        ${rect(24, 274, W - 48, 1, { fill: INST.line, r: 0 })}
        ${lab(24, 306, 'NET MOVE', INST.faint, { size: 9 })}
        ${t(122, 310, '−6.2%', { m: true, size: 20, w: 700, fill: INST.down })}
        ${lab(280, 306, 'FROM', INST.faint, { size: 9 })}
        ${t(324, 310, '0.93', { m: true, size: 18, w: 600, fill: INST.dim })}
        ${lab(396, 306, 'TO', INST.faint, { size: 9 })}
        ${repricing(494, 312, ['0.87', '0.86', '0.88', '0.87'], { fill: INST.gold, size: 24, w: 700, dur: 9 })}
        ${lab(W - 24, 306, 'A RATE CARD WOULD HAVE MOVED BY NOTHING', INST.dim, { size: 9, a: 'end' })}
        ${lab(24, H - 14, 'PRICES MOVE WHEN THE UNDERLYING CONDITIONS MOVE, NOT WHEN A CONTRACT COMES UP FOR RENEWAL',
          INST.faint, { size: 9 })}`),
    };
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   DIRECTION B — FIN
   ══════════════════════════════════════════════════════════════════════════ */

const finShadow = `<defs><filter id="ob-fs" x="-20%" y="-20%" width="140%" height="140%">
  <feDropShadow dx="0" dy="5" stdDeviation="9" flood-color="#0F172A" flood-opacity="0.07"/>
  </filter></defs>`;

/* B1 ── Cards, Alive */
export const cardsAlive = {
  id: 'ob-alive',
  name: 'Cards, Alive',
  family: 'B · fintech-clean',
  tagline: 'The existing grid, with a pulse',
  desc:
    'The most conservative option and therefore the most likely to actually ship: the six cards ' +
    'stay exactly where they are, on the light surface, and each gains a live micro-chart plus ' +
    'one ticking value from its own signal set. No layout change, no new section, no copy ' +
    'rewrite — the grid simply stops being dead.',
  pros: ['Zero layout or copy risk', 'Keeps all six paragraphs and signal names', 'Fastest of any option to implement'],
  cons: ['Still no composed price anywhere', 'Six small animations compete for attention'],
  scores: { story: 3, motion: 3, perf: 4, mobile: 5, brand: 3, ease: 5 },
  build: () => {
    const series = [
      [0.4, 0.55, 0.45, 0.62, 0.5, 0.68, 0.58, 0.72],
      [0.7, 0.68, 0.72, 0.6, 0.64, 0.55, 0.58, 0.5],
      [0.5, 0.58, 0.52, 0.6, 0.48, 0.56, 0.62, 0.54],
      [0.3, 0.34, 0.32, 0.4, 0.44, 0.42, 0.5, 0.48],
      [0.8, 0.82, 0.8, 0.84, 0.86, 0.84, 0.88, 0.9],
      [0.55, 0.55, 0.6, 0.58, 0.58, 0.62, 0.6, 0.64],
    ];
    const vals = [
      ['412 Mbps', '408 Mbps', '419 Mbps'], ['Elevated', 'Elevated', 'Watch'],
      ['0.87 mid', '0.86 mid', '0.88 mid'], ['T+30', 'T+14', 'Upfront'],
      ['100% cleared', '100% cleared', '100% cleared'], ['4 tiers live', '4 tiers live', '4 tiers live'],
    ];
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${finShadow}
        ${FAMS.map((f, i) => {
          const col = i % 3, row = (i / 3) | 0;
          const x = 20 + col * 414, y = 16 + row * 198;
          const sr = series[i];
          const px0 = x + 232, px1 = x + 374, py0 = y + 150, py1 = y + 106;
          const sx = (k) => px0 + (px1 - px0) * (k / (sr.length - 1));
          const sy = (v) => py0 - (py0 - py1) * v;
          const path = sr.map((v, k) => `${k ? 'L' : 'M'} ${sx(k).toFixed(1)} ${sy(v).toFixed(1)}`).join(' ');
          return `
          <g filter="url(#ob-fs)">${rect(x, y, 394, 178, { fill: FIN.panel, r: 14, stroke: FIN.line })}</g>
          ${rect(x + 20, y + 20, 78, 20, { fill: FIN.accentSoft, r: 10 })}
          ${lab(x + 31, y + 34, f[2] + ' SIGNALS', FIN.accent, { size: 8 })}
          <circle cx="${x + 374}" cy="${y + 30}" r="4" fill="${FIN.up}">
            <animate attributeName="opacity" values="0.35;1;0.35" keyTimes="0;0.5;1"
              dur="${(2 + i * 0.2).toFixed(1)}s" repeatCount="indefinite"/></circle>
          ${t(x + 20, y + 64, f[0], { size: 15, w: 700, fill: FIN.text })}
          ${lab(x + 20, y + 88, 'LATEST', FIN.faint, { size: 7.5 })}
          ${repricing(x + 20, y + 112, vals[i], { fill: FIN.text, size: 17, w: 700, a: 'start', dur: (7 + i) })}
          ${[0, 1].map(k => `<line x1="${px0}" y1="${sy(k).toFixed(1)}" x2="${px1}" y2="${sy(k).toFixed(1)}"
            stroke="${FIN.line}"/>`).join('')}
          <path d="${path}" fill="none" stroke="${FIN.accent}" stroke-width="2" stroke-linecap="round"
            pathLength="1" stroke-dasharray="1" stroke-dashoffset="1">
            <animate attributeName="stroke-dashoffset" values="1;0;0" keyTimes="0;0.7;1"
              dur="${(7 + i * 0.5).toFixed(1)}s" repeatCount="indefinite"/></path>
          ${f[3].slice(0, 2).map((sg, j) => `
            ${rect(x + 20 + j * 186, y + 140, 176, 20, { fill: FIN.rise, r: 5 })}
            ${t(x + 28 + j * 186, y + 154, sg, { size: 9.5, fill: FIN.dim })}`).join('')}`;
        }).join('')}`),
    };
  },
};

/* B2 ── The Composer */
export const composer = {
  id: 'ob-composer',
  name: 'The Composer',
  family: 'B · fintech-clean',
  tagline: 'Switch a family off and watch the price break',
  desc:
    'Six toggles on the left, a price on the right. Each family switches off in turn and the ' +
    'price visibly degrades — first to a wider spread, then to a stale figure, then to "rate ' +
    'card" when only one input is left. It proves the argument by subtraction, which is more ' +
    'persuasive than addition: this is what pricing without these signals actually looks like.',
  pros: ['Proves the claim by removing things', 'The failure states are the memorable part', 'Obvious interactive version later'],
  cons: ['Showing your product broken is a bold choice', 'Needs careful copy on each failure state'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 3 },
  build: () => ({
    pills: noPills,
    svg: wB(`
      ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
      ${finShadow}
      <g filter="url(#ob-fs)">${rect(24, 24, 580, 372, { fill: FIN.panel, r: 16, stroke: FIN.line })}</g>
      ${lab(52, 60, 'SIGNAL FAMILIES FEEDING THIS QUOTE', FIN.faint, { size: 9 })}

      ${FAMS.map((f, i) => {
        const y = 78 + i * 52;
        const off = 2 + i * 1.5;           /* seconds — keep numeric */
        const k1 = (off / 12).toFixed(4), k2 = ((off + 0.3) / 12).toFixed(4);
        return `<g>
          ${t(52, y + 26, f[0], { size: 13.5, w: 600, fill: FIN.text })}
          ${t(400, y + 26, f[2] + ' signals', { m: true, size: 10.5, a: 'end', fill: FIN.faint })}
          ${rect(508, y + 14, 44, 24, { fill: FIN.rise, r: 12 })}
          <rect x="508" y="${y + 14}" width="44" height="24" rx="12" fill="${FIN.accent}">
            <animate attributeName="opacity" values="1;1;0.15;0.15;1" keyTimes="0;${k1};${k2};0.93;1"
              dur="12s" repeatCount="indefinite"/></rect>
          <circle cy="${y + 26}" r="9" fill="${FIN.panel}">
            <animate attributeName="cx" values="540;540;520;520;540" keyTimes="0;${k1};${k2};0.93;1"
              dur="12s" repeatCount="indefinite"/></circle>
        </g>`;
      }).join('')}

      <g filter="url(#ob-fs)">${rect(636, 24, W - 660, 372, { fill: FIN.panel, r: 16, stroke: FIN.line })}</g>
      ${lab(672, 60, 'RESULTING QUOTE · JP · TIER-1', FIN.faint, { size: 9 })}

      <g>
        ${t(W - 60, 176, '0.87', { m: true, size: 76, w: 700, a: 'end', fill: FIN.accent })}
        <animate attributeName="opacity" values="1;1;0;0;1;1" keyTimes="0;0.2;0.26;0.86;0.94;1" dur="12s" repeatCount="indefinite"/>
      </g>
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.2;0.26;0.6;0.66;1" dur="12s" repeatCount="indefinite"/>
        ${t(W - 60, 176, '0.81 – 0.94', { m: true, size: 48, w: 700, a: 'end', fill: FIN.dim })}
        ${lab(672, 210, 'SPREAD WIDENS — QUALITY AND RISK ARE GONE', FIN.down, { size: 9 })}
      </g>
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.6;0.66;0.86;1" dur="12s" repeatCount="indefinite"/>
        ${t(W - 60, 176, '1.09', { m: true, size: 76, w: 700, a: 'end', fill: FIN.down })}
        ${lab(672, 210, 'ONE INPUT LEFT — THIS IS A RATE CARD', FIN.down, { size: 9 })}
      </g>
      <g>
        ${lab(672, 210, 'ALL SIX FAMILIES LIVE — QUOTED CONTINUOUSLY', FIN.up, { size: 9 })}
        <animate attributeName="opacity" values="1;1;0;0;1;1" keyTimes="0;0.2;0.26;0.86;0.94;1" dur="12s" repeatCount="indefinite"/>
      </g>

      ${rect(672, 246, W - 732, 1, { fill: FIN.line, r: 0 })}
      ${lab(672, 278, 'CONFIDENCE', FIN.faint, { size: 9 })}
      ${rect(672, 292, 500, 10, { fill: FIN.rise, r: 5 })}
      <rect x="672" y="292" width="500" height="10" rx="5" fill="${FIN.accent}">
        <animate attributeName="width" values="500;500;280;280;90;90;500;500"
          keyTimes="0;0.2;0.26;0.6;0.66;0.86;0.94;1" dur="12s" repeatCount="indefinite"/></rect>
      ${t(672, 344, 'Take the signals away and you are back to guessing.', { size: 14, fill: FIN.dim })}
      ${lab(672, 374, 'A RATE CARD IS A GUESS. A MARKET IS AN ANSWER.', FIN.faint, { size: 9 })}`),
  }),
};

/* B3 ── Flow to Price */
export const flowToPrice = {
  id: 'ob-flow',
  name: 'Flow to Price',
  family: 'B · fintech-clean',
  tagline: 'Six streams merging into one number',
  desc:
    'Six labelled streams on the left, each weighted by its signal count, curving across the ' +
    'band and merging into a single price node on the right. The cleanest possible statement ' +
    'of the section\'s thesis with no numbers to defend beyond the counts already published, ' +
    'and the shape survives being shrunk to a phone.',
  pros: ['One clear idea, no data claims', 'Beautiful at any size', 'Weights carry the signal counts honestly'],
  cons: ['Says nothing about how signals combine', 'Flow diagrams are a familiar device'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: () => {
    const total = FAMS.reduce((a, f) => a + f[2], 0);
    const xA = 340, xB = W - 300;
    const cyT = 210;
    let acc = 0;
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${finShadow}
        ${lab(24, 34, 'OVER A HUNDRED SIGNALS, IN SIX FAMILIES', FIN.faint, { size: 9 })}
        ${lab(W - 24, 34, '109 TOTAL', FIN.accent, { size: 9, a: 'end' })}

        ${FAMS.map((f, i) => {
          const y = 66 + i * 52;
          const th = 8 + (f[2] / total) * 96;
          const yEnd = cyT - 52 + (acc / total) * 104 + (f[2] / total) * 52;
          acc += f[2];
          const d = `M ${xA} ${y + 18} C ${(xA + xB) / 2} ${y + 18}, ${(xA + xB) / 2} ${yEnd.toFixed(1)}, ${xB} ${yEnd.toFixed(1)}`;
          return `<g>
            ${t(24, y + 23, f[0], { size: 13.5, w: 600, fill: FIN.text })}
            ${rect(268, y + 6, 58, 24, { fill: FIN.accentSoft, r: 6 })}
            ${t(297, y + 23, String(f[2]), { m: true, size: 13, w: 700, a: 'middle', fill: FIN.accent })}
            <path d="${d}" fill="none" stroke="${FIN.accent}" stroke-width="${th.toFixed(1)}"
              stroke-linecap="round" opacity="0.16"/>
            <path d="${d}" fill="none" stroke="${FIN.accent}" stroke-width="${th.toFixed(1)}"
              stroke-linecap="round" opacity="0.5" pathLength="1" stroke-dasharray="0.16 0.84"
              stroke-dashoffset="1">
              <animate attributeName="stroke-dashoffset" values="1;0" dur="${(4 + i * 0.7).toFixed(1)}s"
                repeatCount="indefinite"/></path>
          </g>`;
        }).join('')}

        <g filter="url(#ob-fs)">${rect(xB, cyT - 78, 264, 156, { fill: FIN.panel, r: 16, stroke: FIN.line })}</g>
        ${lab(xB + 28, cyT - 46, 'COMPOSED MID · JP · TIER-1', FIN.faint, { size: 8.5 })}
        ${repricing(xB + 236, cyT + 18, ['0.87', '0.86', '0.88', '0.87'], { fill: FIN.accent, size: 58, w: 700, dur: 9 })}
        ${lab(xB + 28, cyT + 44, 'USD / GB', FIN.faint, { size: 8.5 })}
        <circle cx="${xB + 236}" cy="${cyT + 40}" r="4" fill="${FIN.up}">
          <animate attributeName="opacity" values="0.35;1;0.35" keyTimes="0;0.5;1" dur="2.2s" repeatCount="indefinite"/></circle>
        ${lab(xB + 28, cyT + 62, 'REPRICED CONTINUOUSLY', FIN.dim, { size: 8.5 })}
        ${lab(24, H - 16, 'STREAM THICKNESS IS THE SIGNAL COUNT — NOT AN ASSERTION ABOUT WEIGHTING',
          FIN.faint, { size: 8.5 })}`),
    };
  },
};

/* B4 ── The Rail */
export const theRail = {
  id: 'ob-rail',
  name: 'The Rail',
  family: 'B · fintech-clean',
  tagline: 'Six chips, one open at a time',
  desc:
    'A horizontal rail of six family chips; each opens in turn into a panel showing its four ' +
    'named signals with live values, then closes and hands to the next. It keeps every word of ' +
    'the existing copy but shows one family at a time instead of six paragraphs at once, which ' +
    'is a real reduction in reading load for the same information.',
  pros: ['Same content, a sixth of the reading at any moment', 'Obvious interactive version', 'Keeps all 24 signal names'],
  cons: ['A reader in a hurry sees only one family', 'Auto-rotation can feel slow'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: () => {
    const dur = 18, each = dur / 6;
    const vals = [
      ['412 Mbps', '98.7%', '31 ms p95', 'Low'],
      ['None', 'Stable', 'Nominal', 'Typhoon watch'],
      ['0.79', '4 quoting', '2.1% 30d', '0.07'],
      ['Both', 'T+30', '12 TB', 'Approved'],
      ['Cleared', 'Full MVNO', 'JP / SG', 'Complete'],
      ['14 live', '9 live', '22 live', '31 live'],
    ];  /* longer-form for the wide panel; VALS holds the compact set */
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${finShadow}
        ${lab(24, 34, 'WHAT MOVES A PRICE ON OMDM', FIN.faint, { size: 9 })}
        ${lab(W - 24, 34, '109 SIGNALS · SIX FAMILIES', FIN.accent, { size: 9, a: 'end' })}

        ${FAMS.map((f, i) => {
          const cw = 196, x = 24 + i * (cw + 12);
          const onN = i * each / dur, offN = (i * each + each * 0.9) / dur;
          const on = onN.toFixed(4), off = offN.toFixed(4);
          const onE = (onN + 0.01).toFixed(4), offE = (offN + 0.01).toFixed(4);
          return `<g>
            ${rect(x, 50, cw, 46, { fill: FIN.panel, r: 10, stroke: FIN.line })}
            <rect x="${x}" y="50" width="${cw}" height="46" rx="10" fill="${FIN.accentSoft}" opacity="0">
              <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${on};${onE};${off};${offE};1"
                dur="${dur}s" repeatCount="indefinite"/></rect>
            ${t(x + 14, 72, SHORT[i], { size: 13, w: 700, fill: FIN.text })}
            ${t(x + cw - 14, 72, f[2] + ' sig', { m: true, size: 10, a: 'end', fill: FIN.faint })}
            ${rect(x + 14, 80, cw - 28, 3, { fill: FIN.line, r: 1.5 })}
            <rect x="${x + 14}" y="80" width="0" height="3" rx="1.5" fill="${FIN.accent}">
              <animate attributeName="width" values="0;0;${cw - 28};0;0" keyTimes="0;${on};${off};${offE};1"
                dur="${dur}s" repeatCount="indefinite"/></rect>
          </g>`;
        }).join('')}

        ${FAMS.map((f, i) => {
          const onN = i * each / dur, offN = (i * each + each * 0.9) / dur;
          const on = onN.toFixed(4), off = offN.toFixed(4);
          const onI = (onN + 0.012).toFixed(4), offI = (offN - 0.012).toFixed(4);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${on};${onI};${offI};${off};1"
              dur="${dur}s" repeatCount="indefinite"/>
            <g filter="url(#ob-fs)">${rect(24, 116, W - 48, 226, { fill: FIN.panel, r: 16, stroke: FIN.line })}</g>
            ${t(56, 162, f[0], { size: 24, w: 700, fill: FIN.text })}
            ${rect(56, 178, 86, 22, { fill: FIN.accentSoft, r: 11 })}
            ${lab(68, 193, f[2] + ' SIGNALS', FIN.accent, { size: 8 })}
            ${f[3].map((sg, j) => {
              const x = 56 + j * 296;
              return `
              ${rect(x, 226, 272, 82, { fill: FIN.rise, r: 12 })}
              ${lab(x + 18, 250, 'SIGNAL', FIN.faint, { size: 7.5 })}
              ${t(x + 18, 272, sg, { size: 13, w: 600, fill: FIN.text })}
              ${t(x + 254, 296, vals[i][j], { m: true, size: 15, w: 700, a: 'end', fill: FIN.accent })}
              <circle cx="${x + 18}" cy="292" r="3" fill="${FIN.up}">
                <animate attributeName="opacity" values="0.3;1;0.3" keyTimes="0;0.5;1"
                  dur="${(2 + j * 0.3).toFixed(1)}s" repeatCount="indefinite"/></circle>
              ${lab(x + 28, 295, 'LIVE', FIN.faint, { size: 7 })}`;
            }).join('')}
          </g>`;
        }).join('')}
        ${lab(24, H - 16, 'A REPRESENTATIVE SLICE OF EACH FAMILY, SHOWN ONE AT A TIME', FIN.faint, { size: 8.5 })}`),
    };
  },
};

/* B5 ── One Input or a Hundred */
export const oneOrHundred = {
  id: 'ob-oneor',
  name: 'One Input or a Hundred',
  family: 'B · fintech-clean',
  tagline: 'The rate card has one field',
  desc:
    'A split band. On the left, a rate card: a single input field, filled in once, dated last ' +
    'January. On the right, 109 cells populating live. The comparison is the entire argument of ' +
    'the section in one glance, and it needs no chart literacy at all — it is the option a ' +
    'non-technical stakeholder will understand fastest.',
  pros: ['Instantly legible to anyone', 'Strongest single contrast in the set', 'No data claims beyond the counts'],
  cons: ['Slightly polemical', 'Says nothing about which signals matter'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: () => {
    let n = 0;
    return {
      pills: noPills,
      svg: wB(`
        ${rect(0, 0, W, H, { fill: FIN.ground, r: 0 })}
        ${finShadow}
        <g filter="url(#ob-fs)">${rect(24, 24, 480, 372, { fill: FIN.panel, r: 16, stroke: FIN.line })}</g>
        ${lab(56, 62, 'HOW CONNECTIVITY IS PRICED TODAY', FIN.faint, { size: 9 })}
        ${t(56, 104, 'The rate card', { size: 26, w: 700, fill: FIN.text })}
        ${rect(56, 132, 416, 1, { fill: FIN.line, r: 0 })}
        ${lab(56, 166, 'INPUTS', FIN.faint, { size: 8.5 })}
        ${t(472, 176, '1', { m: true, size: 64, w: 700, a: 'end', fill: FIN.down })}
        ${rect(56, 206, 416, 58, { fill: FIN.rise, r: 10, stroke: FIN.lineHard })}
        ${lab(74, 230, 'ANNUAL WHOLESALE RATE · DE · TIER-1', FIN.faint, { size: 8 })}
        ${t(74, 252, '1.09', { m: true, size: 18, w: 700, fill: FIN.text })}
        ${t(456, 252, 'locked', { size: 12, a: 'end', fill: FIN.down })}
        ${lab(56, 300, 'LAST REVISED', FIN.faint, { size: 8.5 })}
        ${t(472, 304, '14 JANUARY', { m: true, size: 15, w: 600, a: 'end', fill: FIN.dim })}
        ${lab(56, 336, 'NEXT REVISION', FIN.faint, { size: 8.5 })}
        ${t(472, 340, 'IN 9 MONTHS', { m: true, size: 15, w: 600, a: 'end', fill: FIN.dim })}
        ${lab(56, 374, 'A GUESS, MADE ONCE, KEPT FOR A YEAR', FIN.down, { size: 8.5 })}

        <g filter="url(#ob-fs)">${rect(536, 24, W - 560, 372, { fill: FIN.panel, r: 16, stroke: FIN.line })}</g>
        ${lab(568, 62, 'HOW OMDM PRICES IT', FIN.faint, { size: 9 })}
        ${t(568, 104, 'The book', { size: 26, w: 700, fill: FIN.text })}
        ${rect(568, 132, W - 624, 1, { fill: FIN.line, r: 0 })}
        ${lab(568, 166, 'INPUTS', FIN.faint, { size: 8.5 })}
        ${t(W - 56, 176, '109', { m: true, size: 64, w: 700, a: 'end', fill: FIN.accent })}

        ${FAMS.map((f, i) => {
          const bx = 568 + i * 112;
          return `${lab(bx, 206, SHORT[i].toUpperCase(), FIN.faint, { size: 7, ls: 0.8 })}
          ${Array.from({ length: f[2] }, (_, k) => {
            const cx2 = bx + (k % 6) * 16, cy2 = 216 + ((k / 6) | 0) * 16;
            const beg = ((n++ % 40) * 0.09).toFixed(2);
            return `<rect x="${cx2}" y="${cy2}" width="12" height="12" rx="2.5" fill="${FIN.rise}"/>
              <rect x="${cx2}" y="${cy2}" width="12" height="12" rx="2.5" fill="${FIN.accent}" opacity="0">
                <animate attributeName="opacity" values="0;0.9;0.25;0.25" keyTimes="0;0.06;0.4;1"
                  dur="${(3.6 + i * 0.5).toFixed(1)}s" begin="${beg}s" repeatCount="indefinite"/></rect>`;
          }).join('')}`;
        }).join('')}

        ${lab(568, 322, 'LAST REPRICED', FIN.faint, { size: 8.5 })}
        ${repricing(W - 56, 326, ['2s AGO', '0s AGO', '1s AGO'], { fill: FIN.accent, size: 15, w: 600, dur: 6 })}
        ${lab(568, 352, 'NEXT REVISION', FIN.faint, { size: 8.5 })}
        ${t(W - 56, 356, 'CONTINUOUSLY', { m: true, size: 15, w: 600, a: 'end', fill: FIN.up })}
        ${lab(568, 380, 'AN ANSWER, RECOMPUTED WHILE YOU READ THIS', FIN.up, { size: 8.5 })}`),
    };
  },
};

export const OMDM_BOOK_VARIANTS = [
  bookCurrent,
  signalFloor, sixLanes, waterfall, signalMatrix, contribution,
  cardsAlive, composer, flowToPrice, theRail, oneOrHundred,
];
