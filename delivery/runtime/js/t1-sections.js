/* ══ /multiple-tier1 · three mid-page sections (cyan system) ══════════ */

import { mk, INK, WHITE, GRAY, LINE, GREEN, GREEN_SOFT, GREEN_TEXT, RED, AMBER, pill, icon } from './kit.js';

const K = mk('cyan');
const { P, wrap, dots, bloom, mono, label, num, card, panel, phoneLight, bars, mast, chipIcon, flowLine, packets, badge, tick, MONO } = K;

const OPS = [
  { n: 'Vodafone', g: '5G', s: 94, p: 0.42 },
  { n: 'Orange', g: '5G', s: 88, p: 0.38 },
  { n: 'T-Mobile', g: 'LTE', s: 82, p: 0.45 },
  { n: 'Telefónica', g: '5G', s: 79, p: 0.36 },
];

const pAI = (t = 'AI-powered') => [pill('cyan', `${icon('brain')}${t}`, { top: '14px', right: '14px' })];
const pMK = (t = 'OMDM market') => [pill('cyan', `${icon('trend')}${t}`, { top: '14px', left: '14px' })];
const pAC = (t = 'Premium access') => [pill('cyan', `${icon('signal')}${t}`, { top: '14px', right: '14px' })];

/* ════════════════════════════════════════════════════════════════════
   SECTION 1 · AI-POWERED NETWORK SELECTION
   ════════════════════════════════════════════════════════════════════ */

export const aiCurrent = {
  id: 'ai-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'A pulsing chip above a static score list',
  desc: 'A cyan chip inside two concentric rings, the caption "evaluating every second", and a bordered card listing four operators with score bars — one of them outlined as the pick. The rings pulse and nothing else changes. The copy promises a decision taken every second on three inputs; the panel shows the result of one decision, frozen.',
  pros: ['The scoreboard framing is right — numbers beside names', 'Cheap, tidy, and consistent with the page'],
  cons: ['"Every second" is asserted while nothing updates', 'The three inputs named in the copy — signal, congestion, price — are absent', 'No sense of a choice being made, only of a choice already made', 'Rings pulsing is decoration, not information'],
  scores: { story: 3, motion: 2, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const inner = `
    ${dots(uid)}
    ${bloom(320, 150, 170, uid)}
    <circle cx="320" cy="146" r="70" fill="none" stroke="${P.main}" stroke-width="1.6" opacity="0.3"/>
    <circle cx="320" cy="146" r="52" fill="none" stroke="${P.main}" stroke-width="2" opacity="0.5">
      <animate attributeName="r" values="46;72" dur="2.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;0" dur="2.4s" repeatCount="indefinite"/>
    </circle>
    ${chipIcon(320, 146, 1.05)}
    ${mono(320, 206, 'EVALUATING EVERY SECOND', { size: 10, anchor: 'middle', op: 0.42 })}
    ${panel(60, 236, 520, 196)}
    ${OPS.map((o, i) => {
      const y = 274 + i * 42;
      const on = i === 2;
      return `
      ${on ? `<rect x="72" y="${y - 21}" width="496" height="38" rx="10" fill="none" stroke="${P.main}" stroke-width="2"/>` : ''}
      ${label(92, y + 5, o.n, { size: 15 })}
      <g transform="translate(${100 + o.n.length * 8.4} ${y - 8})">
        <rect width="30" height="17" rx="5" fill="${P.wash}" stroke="${P.main}" stroke-width="1.2"/>
        <text x="15" y="12.5" text-anchor="middle" font-size="9.5" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">${o.g}</text>
      </g>
      <line x1="390" y1="${y}" x2="500" y2="${y}" stroke="${LINE}" stroke-width="4" stroke-linecap="round"/>
      <line x1="390" y1="${y}" x2="${390 + (o.s / 100) * 110}" y2="${y}" stroke="${P.main}" stroke-width="4" stroke-linecap="round"/>
      ${num(548, y + 5, String(o.s), { size: 13, anchor: 'end', op: 0.75 })}`;
    }).join('')}`;
    return { svg: wrap(inner), pills: pAI() };
  },
};

export const aiTrace = {
  id: 'aitrace',
  name: 'Decision Trace',
  family: 'Mechanism',
  tagline: 'The three inputs, the score, the winner',
  desc: 'Signal, congestion and price enter as three live streams, meet at a scoring node, and produce a score for each operator. Every 2.2 seconds the leader changes and a one-line reason appears — "+6 signal, −12 congestion, −$0.04/GB" — while the chosen row locks in cyan. It is the only option that shows the AI\'s reasoning rather than its verdict.',
  pros: ['Names the exact three inputs the copy claims are used', 'A visible reason makes the claim auditable rather than magical', 'Continuous: streams flow even between decisions', 'Keeps the existing scoreboard, so it reads as an upgrade not a rewrite'],
  cons: ['Most information-dense of the five', 'The reason line needs localising'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 3, brand: 5, ease: 4 },
  build: (uid) => {
    const feeds = [
      { y: 92, t: 'SIGNAL', c: P.main },
      { y: 140, t: 'CONGESTION', c: AMBER },
      { y: 188, t: 'PRICE', c: GREEN },
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(300, 140, 180, uid)}
    ${feeds.map((f, i) => `
      ${mono(40, f.y - 14, f.t, { size: 9.5, op: 0.4 })}
      <path d="M 40 ${f.y} L 250 ${f.y}" stroke="${LINE}" stroke-width="3" stroke-linecap="round"/>
      <path d="M 40 ${f.y} L 250 ${f.y}" stroke="${f.c}" stroke-width="3" stroke-linecap="round"
        stroke-dasharray="10 8" opacity="0.85">
        <animate attributeName="stroke-dashoffset" values="0;-18" dur="${(0.7 + i * 0.12).toFixed(2)}s" repeatCount="indefinite"/>
      </path>
      ${packets(`M 40 ${f.y} L 250 ${f.y}`, 1, 1.4 + i * 0.2).replace(/fill="[^"]+"/, `fill="${f.c}"`)}
      <path d="M 250 ${f.y} Q 286 ${f.y} 296 140" stroke="${f.c}" stroke-width="2" opacity="0.28" fill="none"/>`).join('')}

    <!-- scoring node -->
    <circle cx="320" cy="140" r="46" fill="${P.wash}" stroke="${P.main}" stroke-width="2.5"/>
    <circle cx="320" cy="140" r="46" fill="none" stroke="${P.main}" stroke-width="2" opacity="0.6">
      <animate attributeName="r" values="46;66" dur="2.2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.55;0" dur="2.2s" repeatCount="indefinite"/>
    </circle>
    ${mono(320, 132, 'SCORE', { size: 9, anchor: 'middle', op: 0.5 })}
    <text x="320" y="158" text-anchor="middle" font-size="22" font-weight="700" fill="${P.deep}"
      style="font-family:${MONO}"><tspan data-role="ascore">94</tspan></text>

    <!-- reason -->
    ${mono(392, 118, 'WHY THIS ONE', { size: 9.5, op: 0.4 })}
    <text x="392" y="146" font-size="12.5" font-weight="700" fill="${INK}" opacity="0.72"
      style="font-family:${MONO}"><tspan data-role="areason">+6 signal</tspan></text>
    <text x="392" y="168" font-size="12.5" font-weight="700" fill="${INK}" opacity="0.45"
      style="font-family:${MONO}"><tspan data-role="areason2">−12 congestion</tspan></text>

    <!-- scoreboard -->
    ${panel(40, 226, 560, 200)}
    ${mono(62, 254, 'OPERATOR', { size: 9, op: 0.38 })}
    ${mono(300, 254, 'LIVE SCORE', { size: 9, op: 0.38 })}
    ${mono(578, 254, 'STATE', { size: 9, op: 0.38, anchor: 'end' })}
    <line x1="40" y1="266" x2="600" y2="266" stroke="${LINE}" stroke-width="1.5"/>
    ${OPS.map((o, i) => {
      const y = 296 + i * 33;
      return `
      <g data-arow="${i}">
        <rect x="46" y="${y - 15}" width="548" height="30" rx="8" fill="${P.main}" opacity="0" data-aglow/>
        ${label(62, y + 5, o.n, { size: 14 })}
        <line x1="300" y1="${y}" x2="470" y2="${y}" stroke="${LINE}" stroke-width="4" stroke-linecap="round"/>
        <line x1="300" y1="${y}" x2="${300 + (o.s / 100) * 170}" y2="${y}" stroke="${P.main}" stroke-width="4"
          stroke-linecap="round" data-abar/>
        ${num(496, y + 5, String(o.s), { size: 12.5, op: 0.7 })}
        <text x="578" y="${y + 4}" text-anchor="end" font-size="10" font-weight="700" fill="${INK}" opacity="0.3"
          letter-spacing="1" style="font-family:${MONO}" data-astate>STANDBY</text>
      </g>`;
    }).join('')}`;

    return {
      svg: wrap(inner),
      pills: pAI('Evaluating every second'),
      init(root) {
        const rows = [...root.querySelectorAll('[data-arow]')];
        const sc = root.querySelector('[data-role="ascore"]');
        const r1 = root.querySelector('[data-role="areason"]');
        const r2 = root.querySelector('[data-role="areason2"]');
        if (!rows.length) return null;
        const reasons = [
          ['+6 signal', '−12 congestion'],
          ['+9 signal', '−$0.04/GB'],
          ['−18 congestion', '+4 signal'],
          ['−$0.06/GB', '+2 signal'],
        ];
        let i = 0;
        const tick = () => {
          const scores = OPS.map(o => Math.max(52, Math.min(99, o.s + Math.round((Math.random() - 0.5) * 16))));
          const best = scores.indexOf(Math.max(...scores));
          rows.forEach((row, k) => {
            row.querySelector('[data-aglow]').setAttribute('opacity', k === best ? '0.10' : '0');
            const bar = row.querySelector('[data-abar]');
            bar.style.transition = 'all .6s cubic-bezier(.2,.7,.3,1)';
            bar.setAttribute('x2', String(300 + (scores[k] / 100) * 170));
            bar.setAttribute('stroke', k === best ? P.main : '#9CA3AF');
            row.querySelector('text[data-astate]') || null;
            const st = row.querySelector('[data-astate]');
            st.textContent = k === best ? 'SELECTED' : 'STANDBY';
            st.setAttribute('opacity', k === best ? '1' : '0.3');
            st.setAttribute('fill', k === best ? P.deep : INK);
            const numEl = [...row.querySelectorAll('text')].find(t => /^\d+$/.test(t.textContent.trim()));
            if (numEl) numEl.textContent = String(scores[k]);
          });
          if (sc) sc.textContent = String(scores[best]);
          if (r1) r1.textContent = reasons[best][0];
          if (r2) r2.textContent = reasons[best][1];
          i++;
        };
        tick();
        const id = setInterval(tick, 2200);
        return () => clearInterval(id);
      },
    };
  },
};

export const aiBoard = {
  id: 'aiboard',
  name: 'Live Reorder',
  family: 'Minimal change',
  tagline: 'The scoreboard actually re-sorts',
  desc: 'Exactly the card that is live now, except the scores move and the rows physically re-sort every two seconds, with the new leader sliding to the top and locking into the cyan selected state. One behaviour added, nothing redrawn — and "evaluating every second" stops being a caption and becomes something you can watch.',
  pros: ['Smallest possible diff against the component that ships today', 'Re-sorting is instantly legible with zero explanation', 'No new metaphor, no new colours, nothing to localise', 'Survives the phone better than any other option here'],
  cons: ['Does not explain what drives the scores', 'Rows moving can feel jumpy if the interval is too short'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 5, ease: 5 },
  build: (uid) => {
    const inner = `
    ${dots(uid)}
    ${bloom(320, 120, 160, uid)}
    ${chipIcon(320, 116, 1)}
    <circle cx="320" cy="116" r="46" fill="none" stroke="${P.main}" stroke-width="2" opacity="0.5">
      <animate attributeName="r" values="40;66" dur="2.2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.55;0" dur="2.2s" repeatCount="indefinite"/>
    </circle>
    <text x="320" y="176" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="1.1"
      fill="${INK}" opacity="0.45" style="font-family:${MONO}"><tspan data-role="bcount">1,438</tspan> EVALUATIONS IN THE LAST MINUTE</text>
    ${panel(50, 206, 540, 222)}
    ${mono(72, 236, 'OPERATOR', { size: 9, op: 0.38 })}
    ${mono(400, 236, 'SCORE', { size: 9, op: 0.38 })}
    ${mono(566, 236, 'PICK', { size: 9, op: 0.38, anchor: 'end' })}
    <line x1="50" y1="248" x2="590" y2="248" stroke="${LINE}" stroke-width="1.5"/>
    <g data-bwrap>
      ${OPS.map((o, i) => `
        <g data-brow="${i}" transform="translate(0 ${276 + i * 40})">
          <rect x="60" y="-17" width="520" height="34" rx="9" fill="${P.main}" opacity="0" data-bglow/>
          ${label(72, 5, o.n, { size: 14.5 })}
          <g transform="translate(${80 + o.n.length * 8.4} -10)">
            <rect width="30" height="17" rx="5" fill="${P.wash}" stroke="${P.main}" stroke-width="1.2"/>
            <text x="15" y="12.5" text-anchor="middle" font-size="9.5" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">${o.g}</text>
          </g>
          <line x1="280" y1="0" x2="460" y2="0" stroke="${LINE}" stroke-width="4" stroke-linecap="round"/>
          <line x1="280" y1="0" x2="${280 + (o.s / 100) * 180}" y2="0" stroke="${P.main}" stroke-width="4"
            stroke-linecap="round" data-bbar/>
          ${num(488, 5, String(o.s), { size: 13, op: 0.72 })}
          <g data-bmark opacity="0" transform="translate(556 0)">
            <circle r="12" fill="${P.main}"/>
            <path d="M -4.5 0.5 L -1 4 L 5 -3" fill="none" stroke="${WHITE}" stroke-width="2.6"
              stroke-linecap="round" stroke-linejoin="round"/>
          </g>
        </g>`).join('')}
    </g>`;

    return {
      svg: wrap(inner),
      pills: pAI(),
      init(root) {
        const rows = [...root.querySelectorAll('[data-brow]')];
        const cnt = root.querySelector('[data-role="bcount"]');
        if (!rows.length) return null;
        rows.forEach(r => { r.style.transition = 'transform .7s cubic-bezier(.2,.7,.3,1)'; });
        let n = 1438;
        const tick = () => {
          const scores = OPS.map(o => Math.max(54, Math.min(99, o.s + Math.round((Math.random() - 0.5) * 20))));
          const order = scores.map((s, k) => [s, k]).sort((a, b) => b[0] - a[0]).map(x => x[1]);
          order.forEach((k, slot) => {
            const row = rows[k];
            row.setAttribute('transform', `translate(0 ${276 + slot * 40})`);
            const first = slot === 0;
            row.querySelector('[data-bglow]').setAttribute('opacity', first ? '0.10' : '0');
            row.querySelector('[data-bmark]').setAttribute('opacity', first ? '1' : '0');
            const bar = row.querySelector('[data-bbar]');
            bar.style.transition = 'all .6s cubic-bezier(.2,.7,.3,1)';
            bar.setAttribute('x2', String(280 + (scores[k] / 100) * 180));
            bar.setAttribute('stroke', first ? P.main : '#9CA3AF');
            const numEl = [...row.querySelectorAll('text')].find(t => /^\d+$/.test(t.textContent.trim()));
            if (numEl) numEl.textContent = String(scores[k]);
          });
          n += 23 + Math.floor(Math.random() * 9);
          if (cnt) cnt.textContent = n.toLocaleString('en-US');
        };
        tick();
        const id = setInterval(tick, 2100);
        return () => clearInterval(id);
      },
    };
  },
};

export const aiNeural = {
  id: 'aineural',
  name: 'Neural Sweep',
  family: 'Literal AI',
  tagline: 'The model, drawn',
  desc: 'A small three-layer network: signal, congestion, price and latency as inputs, a hidden layer, four operator outputs. Pulses travel the edges continuously, edge weights brighten and dim, and the winning output node flares with its operator name. If the section headline is going to say "machine learning algorithms", this is the picture of that sentence.',
  pros: ['Unmistakably says "model", which is the section\'s claim', 'Endless motion along the edges — no dead frames at all', 'Abstract enough to stay true when the real model changes', 'Distinct from every other panel on the page'],
  cons: ['A neural-net diagram is a well-worn AI cliché', 'Explains nothing concrete about the actual decision', 'Loses the operator scoreboard, which was the honest part'],
  scores: { story: 3, motion: 5, perf: 4, mobile: 4, brand: 3, ease: 4 },
  build: (uid) => {
    const L1 = ['SIGNAL', 'CONGESTION', 'PRICE', 'LATENCY'].map((t, i) => ({ x: 106, y: 116 + i * 76, t }));
    const L2 = Array.from({ length: 5 }, (_, i) => ({ x: 320, y: 96 + i * 66 }));
    const L3 = OPS.map((o, i) => ({ x: 530, y: 116 + i * 76, t: o.n }));
    const edges = [];
    L1.forEach((a, i) => L2.forEach((b, j) => edges.push({ a, b, d: ((i + j) % 7) * 0.4 })));
    L2.forEach((a, i) => L3.forEach((b, j) => edges.push({ a, b, d: ((i + j) % 6) * 0.45 })));
    const inner = `
    ${dots(uid)}
    ${bloom(320, 230, 230, uid)}
    ${mono(40, 56, 'SIGNAL · CONGESTION · PRICE → THE PICK', { size: 10, op: 0.32 })}
    ${edges.map(e => `
      <line x1="${e.a.x}" y1="${e.a.y}" x2="${e.b.x}" y2="${e.b.y}" stroke="${P.main}" stroke-width="1.2" opacity="0.13"/>
      <line x1="${e.a.x}" y1="${e.a.y}" x2="${e.b.x}" y2="${e.b.y}" stroke="${P.main}" stroke-width="1.8" opacity="0">
        <animate attributeName="opacity" values="0;0.55;0" dur="2.6s" begin="${e.d.toFixed(2)}s" repeatCount="indefinite"/>
      </line>`).join('')}
    ${L1.map(n => `
      <circle cx="${n.x}" cy="${n.y}" r="13" fill="${WHITE}" stroke="${P.main}" stroke-width="2.5"/>
      <circle cx="${n.x}" cy="${n.y}" r="5" fill="${P.main}"/>
      ${mono(n.x - 22, n.y + 4, n.t, { size: 9, anchor: 'end', op: 0.42 })}`).join('')}
    ${L2.map((n, i) => `
      <circle cx="${n.x}" cy="${n.y}" r="11" fill="${P.wash}" stroke="${P.main}" stroke-width="2"/>
      <circle cx="${n.x}" cy="${n.y}" r="4" fill="${P.main}" opacity="0.5">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.9s" begin="${(i * 0.3).toFixed(2)}s" repeatCount="indefinite"/>
      </circle>`).join('')}
    ${L3.map((n, i) => `
      <g data-out="${i}">
        <circle cx="${n.x}" cy="${n.y}" r="15" fill="${WHITE}" stroke="${GRAY}" stroke-width="2.5" data-oring/>
        <circle cx="${n.x}" cy="${n.y}" r="6" fill="${GRAY}" data-odot/>
        <text x="${n.x + 26}" y="${n.y + 5}" font-size="13" font-weight="700" fill="${INK}" opacity="0.4" data-oname>${n.t}</text>
      </g>`).join('')}
    ${badge(40, 402, 'SELECTED: VODAFONE 5G', { w: 244, h: 34, size: 11.5 })}
    <text x="40" y="402" opacity="0"></text>`;

    return {
      svg: wrap(inner),
      pills: pAI('Machine learning'),
      init(root) {
        const outs = [...root.querySelectorAll('[data-out]')];
        const b = [...root.querySelectorAll('text')].find(t => t.textContent.startsWith('SELECTED'));
        if (!outs.length) return null;
        let i = 0;
        const tick = () => {
          outs.forEach((o, k) => {
            const on = k === i;
            o.querySelector('[data-oring]').setAttribute('stroke', on ? P.main : '#9CA3AF');
            o.querySelector('[data-oring]').setAttribute('r', on ? '19' : '15');
            o.querySelector('[data-odot]').setAttribute('fill', on ? P.main : '#9CA3AF');
            o.querySelector('[data-odot]').setAttribute('r', on ? '8' : '6');
            const nm = o.querySelector('[data-oname]');
            nm.setAttribute('opacity', on ? '1' : '0.4');
            nm.setAttribute('fill', on ? P.deep : INK);
          });
          if (b) b.textContent = `SELECTED: ${OPS[i].n.toUpperCase()} ${OPS[i].g}`;
          i = (i + 1) % outs.length;
        };
        tick();
        const id = setInterval(tick, 2000);
        return () => clearInterval(id);
      },
    };
  },
};

export const aiRadar = {
  id: 'airadar',
  name: 'Trade-off Radar',
  family: 'Premium',
  tagline: 'Signal against price, plotted',
  desc: 'Operators are plotted on two axes — signal strength outward, price around — and a slow radar sweep passes over them. As the beam crosses each one its readings appear; the one closest to the ideal corner gets a locked cyan ring and the panel names it. It makes the trade-off visible, which is the actual reason an AI is needed here at all.',
  pros: ['Shows a trade-off rather than a single number, which is honest', 'The sweep guarantees continuous motion with no repeated restart', 'Calm and premium — the best-looking option of the five', 'Plotting positions carries more information than a bar ever does'],
  cons: ['Two-axis plots need a legend, and legends need translating', 'Least obvious at a glance; rewards a second look but demands one'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 3, brand: 5, ease: 3 },
  build: (uid) => {
    const cx = 318, cy = 232, R = 158;
    const pts = OPS.map((o, i) => {
      const a = -150 + i * 62;
      const r = 62 + (o.s - 75) * 4.2;
      return { ...o, x: cx + Math.cos(a * Math.PI / 180) * r, y: cy + Math.sin(a * Math.PI / 180) * r };
    });
    const inner = `
    ${dots(uid)}
    ${bloom(cx, cy, 210, uid)}
    ${mono(40, 50, 'SIGNAL ↑  ·  PRICE →  ·  BEST CORNER WINS', { size: 10, op: 0.32 })}
    <g transform="translate(${cx} ${cy})">
      ${[0.33, 0.66, 1].map(f => `<circle r="${R * f}" fill="none" stroke="${P.main}" stroke-width="1.4" opacity="0.18"/>`).join('')}
      ${[0, 45, 90, 135].map(a => `<line x1="${-Math.cos(a * Math.PI / 180) * R}" y1="${-Math.sin(a * Math.PI / 180) * R}"
        x2="${Math.cos(a * Math.PI / 180) * R}" y2="${Math.sin(a * Math.PI / 180) * R}" stroke="${P.main}" stroke-width="1.2" opacity="0.13"/>`).join('')}
      <!-- sweep -->
      <g>
        <path d="M 0 0 L ${R} 0 A ${R} ${R} 0 0 0 ${R * Math.cos(-0.5)} ${R * Math.sin(-0.5)} Z" fill="${P.main}" opacity="0.16"/>
        <line x1="0" y1="0" x2="${R}" y2="0" stroke="${P.main}" stroke-width="2.5" opacity="0.8"/>
        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="5.2s" repeatCount="indefinite"/>
      </g>
      <circle r="9" fill="${INK}"/>
      ${mono(0, 30, 'IDEAL', { size: 8.5, anchor: 'middle', op: 0.3 })}
    </g>
    ${pts.map((p, i) => `
      <g data-rp="${i}">
        <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="10" fill="${WHITE}" stroke="${GRAY}" stroke-width="2.5" data-rring/>
        <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="${GRAY}" data-rdot/>
        <text x="${(p.x + (p.x > cx ? 18 : -18)).toFixed(1)}" y="${(p.y + 5).toFixed(1)}"
          text-anchor="${p.x > cx ? 'start' : 'end'}" font-size="12.5" font-weight="700" fill="${INK}" opacity="0.45" data-rname>${p.n}</text>
        <text x="${(p.x + (p.x > cx ? 18 : -18)).toFixed(1)}" y="${(p.y + 21).toFixed(1)}"
          text-anchor="${p.x > cx ? 'start' : 'end'}" font-size="10" font-weight="700" fill="${INK}" opacity="0"
          style="font-family:${MONO}" data-rmeta>${p.s} · $${p.p.toFixed(2)}/GB</text>
      </g>`).join('')}
    ${badge(40, 400, 'LOCKED: VODAFONE · 94 · $0.42/GB', { w: 282, h: 34, size: 11 })}`;

    return {
      svg: wrap(inner),
      pills: pAI('Signal × price'),
      init(root) {
        const ps = [...root.querySelectorAll('[data-rp]')];
        const b = [...root.querySelectorAll('text')].find(t => t.textContent.startsWith('LOCKED'));
        if (!ps.length) return null;
        let i = 0;
        const tick = () => {
          ps.forEach((p, k) => {
            const on = k === i;
            p.querySelector('[data-rring]').setAttribute('stroke', on ? P.main : '#9CA3AF');
            p.querySelector('[data-rring]').setAttribute('r', on ? '14' : '10');
            p.querySelector('[data-rdot]').setAttribute('fill', on ? P.main : '#9CA3AF');
            p.querySelector('[data-rname]').setAttribute('opacity', on ? '1' : '0.45');
            p.querySelector('[data-rname]').setAttribute('fill', on ? P.deep : INK);
            p.querySelector('[data-rmeta]').setAttribute('opacity', on ? '0.55' : '0');
          });
          const o = OPS[i];
          if (b) b.textContent = `LOCKED: ${o.n.toUpperCase()} · ${o.s} · $${o.p.toFixed(2)}/GB`;
          i = (i + 1) % ps.length;
        };
        tick();
        const id = setInterval(tick, 1300);
        return () => clearInterval(id);
      },
    };
  },
};

export const aiTicker = {
  id: 'aiticker',
  name: 'Evaluation Log',
  family: 'Credibility',
  tagline: 'Every second, on the record',
  desc: 'A scrolling log of evaluations, one line per check: timestamp, operator, signal, congestion, price, verdict. New lines arrive continuously and a counter reports the rate — "24 checks/sec · 1,438 in the last minute". No illustration at all. If "every second" is the claim, a log is the most direct possible evidence of it.',
  pros: ['Turns the section\'s headline claim into something countable', 'Reads as a system doing work, not a drawing of one', 'Lightest of the five and the sharpest on a retina screen', 'Extends to any number of inputs without redesign'],
  cons: ['Coldest option; no brand illustration whatsoever', 'Dense — needs fewer columns on a phone', 'Fabricated log lines are a credibility risk until they are real'],
  scores: { story: 4, motion: 5, perf: 5, mobile: 3, brand: 3, ease: 4 },
  build: (uid) => {
    const inner = `
    ${dots(uid)}
    ${bloom(320, 230, 200, uid)}
    <g transform="translate(36 48)">
      <rect width="568" height="364" rx="20" fill="${INK}"/>
      <rect width="568" height="44" rx="20" fill="${WHITE}" opacity="0.04"/>
      <rect y="30" width="568" height="14" fill="${WHITE}" opacity="0.04"/>
      <circle cx="24" cy="22" r="5" fill="${P.main}"><animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite"/></circle>
      ${mono(40, 26, 'NETWORK SELECTION ENGINE', { size: 10, fill: WHITE, op: 0.55 })}
      <text x="544" y="26" text-anchor="end" font-size="10" font-weight="700" fill="${P.main}" letter-spacing="1.1"
        style="font-family:${MONO}"><tspan data-role="trate">24 CHECKS/SEC</tspan></text>
      ${mono(24, 70, 'TIME', { size: 8.5, fill: WHITE, op: 0.35 })}
      ${mono(108, 70, 'OPERATOR', { size: 8.5, fill: WHITE, op: 0.35 })}
      ${mono(248, 70, 'SIG', { size: 8.5, fill: WHITE, op: 0.35 })}
      ${mono(316, 70, 'CONG', { size: 8.5, fill: WHITE, op: 0.35 })}
      ${mono(396, 70, '$/GB', { size: 8.5, fill: WHITE, op: 0.35 })}
      ${mono(544, 70, 'VERDICT', { size: 8.5, fill: WHITE, op: 0.35, anchor: 'end' })}
      <line x1="24" y1="82" x2="544" y2="82" stroke="${WHITE}" stroke-width="1" opacity="0.1"/>
      <g data-tlog>
        ${Array.from({ length: 7 }, (_, i) => `<g data-trow="${i}" transform="translate(0 ${106 + i * 30})" opacity="0"></g>`).join('')}
      </g>
      <g transform="translate(24 324)">
        <rect width="212" height="30" rx="15" fill="${P.main}" opacity="0.18"/>
        <text x="106" y="20" text-anchor="middle" font-size="11" font-weight="700" fill="${P.main}"
          style="font-family:${MONO}"><tspan data-role="tmin">1,438 IN THE LAST MINUTE</tspan></text>
      </g>
    </g>`;

    return {
      svg: wrap(inner),
      pills: pAI('Every second'),
      init(root) {
        const rows = [...root.querySelectorAll('[data-trow]')];
        if (!rows.length) return null;
        const rate = root.querySelector('[data-role="trate"]');
        const minEl = root.querySelector('[data-role="tmin"]');
        const NS = 'http://www.w3.org/2000/svg';
        const lines = [];
        let n = 1438;
        const make = () => {
          const o = OPS[Math.floor(Math.random() * OPS.length)];
          const sig = 60 + Math.floor(Math.random() * 40);
          const cong = Math.floor(Math.random() * 60);
          const price = (0.32 + Math.random() * 0.2).toFixed(2);
          const win = sig > 84 && cong < 30;
          const t = new Date().toISOString().slice(11, 19) + '.' + String(Math.floor(Math.random() * 9));
          return { t, o: o.n, sig, cong, price, win };
        };
        const render = () => {
          rows.forEach((g, i) => {
            const d = lines[i];
            if (!d) { g.setAttribute('opacity', '0'); return; }
            g.setAttribute('opacity', String(Math.max(0.16, 1 - i * 0.1)));
            g.innerHTML = '';
            const add = (x, txt, fill, anchor, mono2 = true) => {
              const e = document.createElementNS(NS, 'text');
              e.setAttribute('x', String(x));
              e.setAttribute('font-size', '11');
              e.setAttribute('font-weight', '700');
              e.setAttribute('fill', fill);
              if (anchor) e.setAttribute('anchor', anchor);
              if (anchor) e.setAttribute('text-anchor', anchor);
              if (mono2) e.setAttribute('style', 'font-family:ui-monospace,SFMono-Regular,Menlo,monospace');
              e.textContent = txt;
              g.appendChild(e);
            };
            add(24, d.t, '#FFFFFF');
            g.lastChild.setAttribute('opacity', '0.5');
            add(108, d.o, d.win ? P.main : '#FFFFFF');
            if (!d.win) g.lastChild.setAttribute('opacity', '0.8');
            add(248, String(d.sig), '#FFFFFF'); g.lastChild.setAttribute('opacity', '0.65');
            add(316, String(d.cong) + '%', '#FFFFFF'); g.lastChild.setAttribute('opacity', '0.65');
            add(396, '$' + d.price, '#FFFFFF'); g.lastChild.setAttribute('opacity', '0.65');
            add(544, d.win ? 'SWITCH' : 'hold', d.win ? P.main : '#FFFFFF', 'end');
            if (!d.win) g.lastChild.setAttribute('opacity', '0.4');
          });
        };
        const tick = () => {
          lines.unshift(make());
          lines.length = Math.min(lines.length, 7);
          render();
          n += 24;
          if (n > 1499) n = 1400;
          if (rate) rate.textContent = `${22 + Math.floor(Math.random() * 6)} CHECKS/SEC`;
          if (minEl) minEl.textContent = `${n.toLocaleString('en-US')} IN THE LAST MINUTE`;
        };
        tick(); tick(); tick();
        const id = setInterval(tick, 700);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══ AI · 6–9 ═══════════════════════════════════════════════════════ */

export const aiWhyThisOne = {
  id: 'ai-whythis',
  name: 'Why This One',
  family: 'Explainability',
  tagline: 'The decision, with its reasons printed',
  desc:
    'Every "AI-powered" claim on the internet is a black box. This one opens it: four candidate ' +
    'carriers are scored on latency, throughput, congestion and cost, the winner is picked, and the ' +
    'reason is written out in a sentence a human can check. Showing the working is the only way this ' +
    'claim stops sounding like decoration.',
  pros: [
    'Turns an unverifiable buzzword into an auditable decision',
    'The written reason is quotable in sales conversations',
    'Scoring rows give the panel real information density',
  ],
  cons: ['Commits to a scoring model we must keep honest', 'Four rows of numbers is a lot to read at a glance'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 11;
    const rows = OPS.map((o, i) => ({ ...o, score: [92, 78, 71, 64][i] }));
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 250, uid)}
    ${mono(72, 56, 'DECISION LOG \u00b7 14:22:08', { size: 9.5, op: 0.45 })}
    ${label(72, 84, 'Why this carrier, and not the others', { size: 15, op: 0.75 })}
    ${mono(388, 112, 'LATENCY', { size: 8.5, anchor: 'middle', op: 0.4 })}
    ${mono(452, 112, 'SPEED', { size: 8.5, anchor: 'middle', op: 0.4 })}
    ${mono(514, 112, 'LOAD', { size: 8.5, anchor: 'middle', op: 0.4 })}
    ${mono(566, 112, 'SCORE', { size: 8.5, anchor: 'end', op: 0.4 })}
    ${rows.map((o, i) => {
      const y = 122 + i * 54;
      const on = 0.06 + i * 0.1;
      const win = i === 0;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(72, y, 496, 44, { r: 11, fill: WHITE, stroke: LINE })}
        ${label(96, y + 27, o.n, { size: 13 })}
        ${mono(96, y + 40, o.g, { size: 8, op: 0.3 })}
        ${mono(388, y + 28, `${[18, 24, 21, 27][i]} ms`, { size: 10, anchor: 'middle', op: 0.6 })}
        ${mono(452, y + 28, `${o.s}`, { size: 10, anchor: 'middle', op: 0.6 })}
        ${mono(514, y + 28, `${Math.round(o.p * 100)}%`, { size: 10, anchor: 'middle', op: 0.6 })}
        ${num(566, y + 30, `${o.score}`, { size: 15, anchor: 'end', fill: win ? P.deep : GRAY })}
        ${win ? `<g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.52;0.6;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          ${card(72, y, 496, 44, { r: 11, fill: P.wash, stroke: P.main, sw: 2 })}
          ${label(96, y + 27, o.n, { size: 13 })}
          ${mono(96, y + 40, 'SELECTED', { size: 8, op: 0.6, fill: P.deep })}
          ${num(566, y + 30, `${o.score}`, { size: 15, anchor: 'end', fill: P.deep })}
        </g>` : ''}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 352, 496, 72, { r: 12, fill: WHITE, stroke: LINE })}
      ${mono(96, 378, 'REASON', { size: 8.5, op: 0.4 })}
      ${label(96, 404, 'Lowest latency and the least loaded cell within range.', { size: 13, fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pAI('Decision shown') };
  },
};

export const aiBeforeYouNotice = {
  id: 'ai-before',
  name: 'Before You Notice',
  family: 'Proof',
  tagline: 'The switch happens mid-stream, and nothing stutters',
  desc:
    'A video stream plays while the carrier underneath it changes twice. The bitrate line dips for ' +
    'two frames and recovers; the buffer never empties. Selection only matters if the switching is ' +
    'invisible, and this is the single most convincing way to say so — by showing the seam and how ' +
    'small it is.',
  pros: [
    'Shows the seam rather than hiding it, which is more credible',
    'Buffer health is the metric a user actually experiences',
    'Two switches in one loop proves it is routine, not a one-off',
  ],
  cons: ['Admitting a dip at all is a choice', 'Needs real telemetry to stay honest'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 4, brand: 4, ease: 3 },
  build: (uid) => {
    const dur = 12;
    const pts = Array.from({ length: 52 }, (_, i) => {
      const base = 3200 + 180 * Math.sin(i * 0.6);
      if (i === 17 || i === 18) return base - 620;
      if (i === 35 || i === 36) return base - 540;
      return base;
    });
    const x0 = 80, x1 = 560, y0 = 322, yTop = 168;
    const px = (i) => x0 + (i / 51) * (x1 - x0);
    const py = (v) => y0 - ((v - 2400) / 1200) * (y0 - yTop);
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 250, uid)}
    ${mono(72, 54, 'ONE STREAM \u00b7 TWO CARRIER CHANGES', { size: 9.5, op: 0.45 })}
    ${card(72, 74, 496, 62, { r: 12, fill: WHITE, stroke: LINE })}
    ${label(96, 104, 'Playing, uninterrupted', { size: 15 })}
    ${mono(96, 124, 'BUFFER NEVER BELOW 4.2 s', { size: 8.5, op: 0.4 })}
    ${[0, 1, 2, 3, 4, 5].map((i) => `
      <rect x="${446 + i * 19}" y="${118 - i * 7}" width="13" height="${8 + i * 7}" rx="2" fill="${P.main}" opacity="0.85"/>`).join('')}

    ${card(72, 152, 496, 196, { r: 14, fill: WHITE, stroke: LINE })}
    ${mono(88, 172, 'BITRATE \u00b7 kbps', { size: 8.5, op: 0.4 })}
    <polyline points="${pts.map((v, i) => `${px(i).toFixed(0)} ${py(v).toFixed(0)}`).join(' ')}"
      fill="none" stroke="${P.main}" stroke-width="2.6" stroke-dasharray="900" stroke-dashoffset="900">
      <animate attributeName="stroke-dashoffset" values="900;0;0" keyTimes="0;0.72;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </polyline>
    ${[[17, 'Vodafone \u2192 Orange', 0.26], [35, 'Orange \u2192 T-Mobile', 0.52]].map(([i, txt, on]) => `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <line x1="${px(i).toFixed(0)}" y1="${yTop}" x2="${px(i).toFixed(0)}" y2="${y0}"
          stroke="${AMBER}" stroke-width="1.6" stroke-dasharray="4 5"/>
        ${mono(px(i).toFixed(0), yTop - 6, txt, { size: 8.5, anchor: 'middle', op: 0.6, fill: AMBER })}
      </g>`).join('')}
    ${[['DROPPED FRAMES', '0'], ['REBUFFERS', '0'], ['SWITCH TIME', '38 ms']].map(([k, v], i) => `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.76 + i * 0.05).toFixed(3)};${(0.82 + i * 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${mono(72 + i * 172, 380, k, { size: 8.5, op: 0.4 })}
        ${num(72 + i * 172, 408, v, { size: 20, fill: P.deep })}
      </g>`).join('')}`;
    return { svg: wrap(inner), pills: pAI('Invisible switching') };
  },
};

export const aiLearns = {
  id: 'ai-learns',
  name: 'It Learns The Route',
  family: 'Intelligence',
  tagline: 'The same commute, four weeks apart',
  desc:
    'Intelligence means the second run is better than the first. The same journey is plotted in week ' +
    'one and week four: the dead spot the first run hit is pre-empted in the fourth, because the ' +
    'carrier is switched before the gap rather than after it. That is a real definition of learning, ' +
    'and it is checkable.',
  pros: [
    'Gives "AI" a concrete, falsifiable meaning',
    'Pre-emption rather than reaction is a genuinely strong claim',
    'The two-run comparison carries itself',
  ],
  cons: ['Needs the model to actually behave this way', 'Two overlaid routes is the busiest option here'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 3, brand: 5, ease: 2 },
  build: (uid) => {
    const dur = 13;
    const x0 = 80, x1 = 566;
    const px = (t) => x0 + t * (x1 - x0);
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${mono(72, 52, 'SAME COMMUTE \u00b7 WEEK 1 vs WEEK 4', { size: 9.5, op: 0.45 })}

    ${mono(72, 96, 'WEEK 1', { size: 9, op: 0.45 })}
    <line x1="${x0}" y1="132" x2="${x1}" y2="132" stroke="${LINE}" stroke-width="2.5"/>
    <line x1="${x0}" y1="132" x2="${x1}" y2="132" stroke="${P.main}" stroke-width="3"
      stroke-dasharray="486" stroke-dashoffset="486">
      <animate attributeName="stroke-dashoffset" values="486;0;0" keyTimes="0;0.4;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </line>
    <rect x="${px(0.52).toFixed(0)}" y="124" width="${(px(0.62) - px(0.52)).toFixed(0)}" height="16" rx="8" fill="${RED}" opacity="0"/>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.24;0.3;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <rect x="${px(0.52).toFixed(0)}" y="124" width="${(px(0.62) - px(0.52)).toFixed(0)}" height="16" rx="8" fill="${RED}" opacity="0.8"/>
      ${mono(px(0.57).toFixed(0), 116, 'DEAD SPOT \u00b7 9 s OFFLINE', { size: 8.5, anchor: 'middle', op: 0.7, fill: RED })}
      ${mono(px(0.7).toFixed(0), 158, 'switched after the gap', { size: 8.5, op: 0.4 })}
    </g>

    ${mono(72, 232, 'WEEK 4', { size: 9, op: 0.45, fill: P.deep })}
    <line x1="${x0}" y1="268" x2="${x1}" y2="268" stroke="${LINE}" stroke-width="2.5"/>
    <line x1="${x0}" y1="268" x2="${x1}" y2="268" stroke="${P.main}" stroke-width="3.5"
      stroke-dasharray="486" stroke-dashoffset="486">
      <animate attributeName="stroke-dashoffset" values="486;486;0;0" keyTimes="0;0.44;0.82;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </line>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.56;0.62;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <line x1="${px(0.46).toFixed(0)}" y1="248" x2="${px(0.46).toFixed(0)}" y2="288" stroke="${GREEN}" stroke-width="2"/>
      ${mono(px(0.46).toFixed(0), 240, 'SWITCHED HERE, BEFORE THE GAP', { size: 8.5, anchor: 'middle', op: 0.7, fill: GREEN_TEXT })}
      ${tick(px(0.6).toFixed(0), 300, 'No outage', { size: 11.5 })}
    </g>

    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.82;0.9;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 348, 496, 76, { r: 13, fill: P.wash, stroke: P.main, sw: 2 })}
      ${label(96, 380, 'Nine seconds offline in week one.', { size: 14 })}
      ${label(96, 406, 'None in week four, on the same train.', { size: 14, fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pAI('Learns your routes') };
  },
};

export const aiOffSwitch = {
  id: 'ai-off',
  name: 'The Off Switch',
  family: 'Control',
  tagline: 'Automatic, until you say otherwise',
  desc:
    'Automation makes people nervous when they cannot override it. Three modes — automatic, ' +
    'preferred carrier, and pinned — with the selection moving between them and the consequence shown ' +
    'each time. It converts the AI claim from something done to the user into something they hold the ' +
    'controls for, which is the more mature position.',
  pros: [
    'Addresses the trust objection that every automation claim creates',
    'Pinning a carrier is a genuine enterprise requirement',
    'Reads as a product surface rather than a marketing animation',
  ],
  cons: ['Undercuts the automatic story slightly', 'Requires the modes to actually exist in the app'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 12;
    const modes = [
      ['Automatic', 'We choose, every few seconds', 'Best available, always'],
      ['Preferred', 'Your carrier first, if it is usable', 'Falls back only when it must'],
      ['Pinned', 'This carrier, or nothing', 'For compliance and testing'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${mono(72, 56, 'SELECTION MODE', { size: 9.5, op: 0.45 })}
    ${label(72, 84, 'Automatic, until you say otherwise', { size: 15, op: 0.75 })}
    ${modes.map(([nm, note, out], i) => {
      const y = 112 + i * 86;
      const on = i / 3, off = (i + 1) / 3;
      return `<g>
        ${card(72, y, 496, 74, { r: 13, fill: WHITE, stroke: LINE })}
        <circle cx="104" cy="${y + 37}" r="11" fill="none" stroke="${LINE}" stroke-width="2"/>
        ${label(132, y + 33, nm, { size: 14 })}
        ${mono(132, y + 54, note, { size: 9, op: 0.4 })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0"
            keyTimes="0;${on.toFixed(4)};${(on + 0.008).toFixed(4)};${off.toFixed(4)};${Math.min(off + 0.008, 1).toFixed(4)};1"
            dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
          ${card(72, y, 496, 74, { r: 13, fill: P.wash, stroke: P.main, sw: 2 })}
          <circle cx="104" cy="${y + 37}" r="11" fill="${P.main}"/>
          <path d="M 98 ${y + 37} l 4.5 4.5 l 8 -9" fill="none" stroke="${WHITE}" stroke-width="2.4" stroke-linecap="round"/>
          ${label(132, y + 33, nm, { size: 14 })}
          ${mono(132, y + 54, note, { size: 9, op: 0.45 })}
          ${mono(544, y + 40, out, { size: 9, anchor: 'end', op: 0.6, fill: P.deep })}
        </g>
      </g>`;
    }).join('')}
    ${mono(72, 402, 'THE MODEL DECIDES BY DEFAULT. IT NEVER DECIDES OVER YOU.', { size: 9, op: 0.38 })}`;
    return { svg: wrap(inner), pills: pAI('You keep control') };
  },
};

/* ── registry ── */

export const aiTheCost = {
  id: 'ai-cost',
  name: 'What The Choice Costs',
  family: 'Outcome',
  tagline: 'The same hour, priced two ways',
  desc:
    'Selection is usually sold as a quality story, but it is also a price one. An hour of traffic is ' +
    'priced twice: routed to whichever carrier is cheapest-and-good-enough, and pinned to a single ' +
    'carrier throughout. The gap is the argument, and it is the only version of this panel that a ' +
    'finance reader will care about.',
  pros: [
    'Adds a commercial argument to a panel that is currently purely technical',
    'The two totals are impossible to misread',
    'Works for both the consumer and the business audience',
  ],
  cons: ['Needs real wholesale pricing to be honest', 'Overlaps with the market panel below it'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const slots = [['14:00', 'Vodafone', 0.61], ['14:15', 'Orange', 0.58], ['14:30', 'Telef\u00f3nica', 0.54],
      ['14:45', 'T-Mobile', 0.57]];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${mono(72, 54, 'ONE HOUR OF TRAFFIC, PRICED TWICE', { size: 9.5, op: 0.45 })}
    ${slots.map(([t, c, p], i) => {
      const y = 82 + i * 62;
      const on = 0.06 + i * 0.12;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(72, y, 496, 50, { r: 11, fill: WHITE, stroke: LINE })}
        ${mono(96, y + 30, t, { size: 11, op: 0.5 })}
        ${label(164, y + 30, c, { size: 13.5 })}
        ${mono(360, y + 30, 'cheapest available, still Tier-1', { size: 8.5, op: 0.38 })}
        ${num(544, y + 32, `\u20ac${p.toFixed(2)}`, { size: 14, anchor: 'end', fill: P.deep })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 340, 240, 88, { r: 12, fill: WHITE, stroke: LINE })}
      ${mono(96, 368, 'PINNED TO ONE CARRIER', { size: 8.5, op: 0.4 })}
      ${num(96, 406, '\u20ac0.74 / GB', { size: 19, fill: GRAY })}
      ${card(328, 340, 240, 88, { r: 12, fill: P.wash, stroke: P.main, sw: 2 })}
      ${mono(352, 368, 'CHOSEN EVERY 15 MINUTES', { size: 8.5, op: 0.5, fill: P.deep })}
      ${num(352, 406, '\u20ac0.58 / GB', { size: 19, fill: P.deep })}
    </g>
    ${mono(72, 448, 'TWENTY-TWO PERCENT, WITHOUT DROPPING A TIER', { size: 9, op: 0.35 })}`;
    return { svg: wrap(inner), pills: pAI('22% cheaper per GB') };
  },
};

/* ── registry ── */

/* ══ AI · 11–15 ═════════════════════════════════════════════════════ */

export const aiSentence = {
  id: 'ai-sentence',
  name: 'The Sentence',
  family: 'Typographic',
  tagline: 'The section\u2019s own claim, with live numbers inside it',
  desc:
    'No illustration at all. The sentence the section already uses is set large, its three inputs \u2014 ' +
    'signal strength, network congestion, wholesale pricing \u2014 pulled onto their own lines, and a ' +
    'reading pinned to each one that changes every three seconds. The copy is the artwork; the numbers ' +
    'are the only evidence that it is more than copy.',
  pros: [
    'The one option with no diagram to misread \u2014 it reads as fast as a headline',
    'Puts the page\u2019s own three inputs in front of the reader with values attached',
    'Cheapest possible build and perfectly sharp at any size',
  ],
  cons: [
    'Three flipping numbers is the least motion of any option here',
    'A wall of type next to a wall of type \u2014 the section already has a heading and four cards',
  ],
  scores: { story: 4, motion: 2, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 9;
    const flip = (k, n) => {
      const on = k / n, off = (k + 1) / n;
      const b = Math.min(on + 0.006, 1), d = Math.min(off + 0.006, 1);
      return `<animate attributeName="opacity" values="0;0;1;1;0;0"
        keyTimes="0;${on.toFixed(4)};${b.toFixed(4)};${off.toFixed(4)};${d.toFixed(4)};1"
        dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>`;
    };
    const rows = [
      ['signal strength', ['\u221271 dBm', '\u221268 dBm', '\u221274 dBm']],
      ['network congestion', ['18% busy', '31% busy', '12% busy']],
      ['wholesale pricing', ['\u20ac0.58/GB', '\u20ac0.61/GB', '\u20ac0.54/GB']],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(300, 210, 240, uid)}
    <circle cx="60" cy="50" r="5" fill="${P.main}">
      <animate attributeName="opacity" values="1;0.25;1" dur="1.4s" repeatCount="indefinite"/>
    </circle>
    ${mono(76, 54, 'READING NOW', { size: 9.5, op: 0.42 })}
    ${label(58, 108, 'Our model weighs', { size: 22, op: 0.78 })}
    ${rows.map(([phrase, vals], i) => {
      const y = 158 + i * 62;
      const states = vals.map((v, k) => `<g opacity="0">${flip(k, vals.length)}
        <text x="584" y="${y}" text-anchor="end" font-size="14" font-weight="700" fill="${P.deep}"
          style="font-family:${MONO}">${v}</text></g>`).join('');
      return `
      <rect x="58" y="${y - 24}" width="4" height="32" rx="2" fill="${P.main}"/>
      ${label(76, y, phrase, { size: 24, fill: P.deep })}
      <line x1="76" y1="${y + 16}" x2="584" y2="${y + 16}" stroke="${LINE}" stroke-width="1.2"/>
      ${states}`;
    }).join('')}
    ${label(58, 372, 'and connects you to the best', { size: 22, op: 0.78 })}
    ${label(58, 404, 'Tier-1 network \u2014 every second.', { size: 22, op: 0.78 })}
    ${mono(584, 404, 'NO ILLUSTRATION', { size: 9, anchor: 'end', op: 0.26 })}`;
    return { svg: wrap(inner), pills: pAI('The claim, measured') };
  },
};

export const aiOnScreen = {
  id: 'ai-onscreen',
  name: 'On Your Screen',
  family: 'Product surface',
  tagline: 'What the handset actually shows when it switches',
  desc:
    'The handset, at device scale, doing the thing the section describes: the status card reads ' +
    '\u201cVodafone 5G\u201d, the ranked list of what else is reachable sits under it, and a toast drops \u2014 ' +
    '\u201cSwitched to Orange \u00b7 41 ms\u201d \u2014 before the card follows. Beside it, three lines name what the user ' +
    'has to do about any of it, which is nothing.',
  pros: [
    'Shows the product rather than a symbol for the product',
    'The toast is the exact artefact a user would recognise from their own phone',
    'Answers \u201cwill it interrupt me?\u201d in the same frame as \u201cdoes it switch?\u201d',
  ],
  cons: [
    'Commits the app to a screen that must eventually exist in this form',
    'A 196px-wide screen means the list rows are small on a phone',
  ],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 8;
    const win = (a, b) => {
      const b1 = Math.min(a + 0.01, 1), b2 = Math.min(b + 0.01, 1);
      return `<animate attributeName="opacity" values="0;0;1;1;0;0"
        keyTimes="0;${a.toFixed(4)};${b1.toFixed(4)};${b.toFixed(4)};${b2.toFixed(4)};1"
        dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>`;
    };
    const list = [['Vodafone', '94'], ['Orange', '91'], ['T-Mobile', '78']];
    const body = `
      ${mono(22, 32, '09:41', { size: 9, op: 0.42 })}
      <circle cx="148" cy="28" r="4" fill="${P.main}"/>
      ${mono(160, 32, 'LIVE', { size: 8.5, op: 0.4 })}
      ${card(16, 46, 164, 98, { r: 14, fill: P.wash, stroke: P.main, sw: 1.6 })}
      ${mono(34, 74, 'CONNECTED VIA', { size: 8.5, op: 0.45 })}
      <g opacity="0">${win(0, 0.5)}${label(34, 104, 'Vodafone 5G', { size: 17 })}</g>
      <g opacity="0">${win(0.52, 1)}${label(34, 104, 'Orange 5G', { size: 17 })}</g>
      ${bars(34, 130, 4, 4, { unit: 9, step: 5 })}
      ${mono(34, 170, 'ALSO REACHABLE HERE', { size: 8.5, op: 0.4 })}
      ${list.map(([nm, sc], i) => {
        const y = 198 + i * 30;
        return `
        ${label(34, y, nm, { size: 12.5, op: 0.72 })}
        ${mono(166, y, sc, { size: 11, anchor: 'end', op: 0.45 })}
        <line x1="34" y1="${y + 10}" x2="166" y2="${y + 10}" stroke="${LINE}" stroke-width="1"/>`;
      }).join('')}
      <g opacity="0">${win(0, 0.5)}
        <circle cx="24" cy="194" r="4.5" fill="${P.main}"/>
      </g>
      <g opacity="0">${win(0.52, 1)}
        <circle cx="24" cy="224" r="4.5" fill="${P.main}"/>
      </g>
      <g opacity="0">${win(0.0, 0.2)}
        <rect x="14" y="296" width="168" height="46" rx="12" fill="${INK}"/>
        <text x="30" y="318" font-size="12" font-weight="700" fill="${WHITE}">Switched to Vodafone</text>
        ${mono(30, 334, '38 ms \u00b7 NOTHING TO ACCEPT', { size: 7.5, fill: WHITE, op: 0.55 })}
      </g>
      <g opacity="0">${win(0.5, 0.72)}
        <rect x="14" y="296" width="168" height="46" rx="12" fill="${INK}"/>
        <text x="30" y="318" font-size="12" font-weight="700" fill="${WHITE}">Switched to Orange</text>
        ${mono(30, 334, '41 ms \u00b7 NOTHING TO ACCEPT', { size: 7.5, fill: WHITE, op: 0.55 })}
      </g>`;
    const inner = `
    ${dots(uid)}
    ${bloom(210, 230, 230, uid)}
    ${phoneLight({ x: 200, y: 236, w: 196, h: 372, body })}
    ${mono(336, 148, 'WHAT THE USER SEES', { size: 9.5, op: 0.45 })}
    ${label(336, 184, 'Almost nothing.', { size: 21 })}
    ${tick(338, 224, 'The status line changes', { stroke: P.main, size: 12.5 })}
    ${tick(338, 258, 'No prompt, no confirmation', { stroke: P.main, size: 12.5 })}
    ${tick(338, 292, 'The call carries on', { stroke: P.main, size: 12.5 })}
    ${card(336, 322, 248, 84, { r: 13, fill: P.wash, stroke: P.main, sw: 2 })}
    ${mono(358, 352, 'SWITCHES TODAY', { size: 8.5, op: 0.5 })}
    ${num(358, 386, '37, none noticed', { size: 15, fill: P.deep })}`;
    return { svg: wrap(inner), pills: pAI('Seen from the phone') };
  },
};

export const aiAcrossCity = {
  id: 'ai-city',
  name: 'Across The City',
  family: 'Spatial',
  tagline: 'Best here is not best four hundred metres later',
  desc:
    'A plan view: three overlapping coverage areas, one route crossing all of them, and a dot ' +
    'travelling it. Where the areas overlap the carrier hands over and a chip names it \u2014 ' +
    '\u201cVodafone \u2192 Orange \u00b7 41 ms\u201d. It makes the case that selection is a geographic problem, which is ' +
    'the reason a static list of partners cannot answer it.',
  pros: [
    'The only option that says why the answer keeps changing: you moved',
    'Overlapping coverage is a fact of the network, not a metaphor we invented',
    'One continuous loop with no reset flash \u2014 the dot simply keeps going',
  ],
  cons: [
    'Abstract circles are not a real map, and a sharp reader will ask for one',
    'Two handover chips at once can crowd the middle of the frame',
  ],
  scores: { story: 5, motion: 5, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const dur = 9;
    const route = 'M 74 406 C 168 396 196 306 266 274 C 344 240 372 186 448 156 C 500 136 538 120 566 108';
    const areas = [
      { x: 168, y: 322, r: 112, n: 'Vodafone', m: '5G \u00b7 n78' },
      { x: 330, y: 234, r: 116, n: 'Orange', m: '5G \u00b7 n78' },
      { x: 486, y: 158, r: 104, n: 'T-Mobile', m: 'LTE \u00b7 B3' },
    ];
    const hands = [
      { x: 266, y: 274, t: 'Vodafone \u2192 Orange', ms: '41 ms \u00b7 NO DROP', on: 0.3 },
      { x: 448, y: 156, t: 'Orange \u2192 T-Mobile', ms: '36 ms \u00b7 NO DROP', on: 0.66 },
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 240, 250, uid)}
    ${mono(40, 46, 'ONE ROUTE \u00b7 THREE COVERAGE AREAS \u00b7 PLAN VIEW', { size: 9.5, op: 0.42 })}
    ${areas.map((b, i) => `
      <circle cx="${b.x}" cy="${b.y}" r="${b.r}" fill="${P.main}" opacity="${(0.07 + i * 0.015).toFixed(3)}"/>
      <circle cx="${b.x}" cy="${b.y}" r="${b.r}" fill="none" stroke="${P.main}" stroke-width="1.4"
        stroke-dasharray="7 7" opacity="0.4"/>
      ${mono(b.x, b.y - b.r + 24, b.n.toUpperCase(), { size: 9.5, anchor: 'middle', op: 0.55, fill: P.deep })}
      ${mono(b.x, b.y - b.r + 40, b.m, { size: 8.5, anchor: 'middle', op: 0.3 })}`).join('')}
    ${flowLine(route, { w: 3.4, dur: 0.9 })}
    ${hands.map((h) => `
      <circle cx="${h.x}" cy="${h.y}" r="7" fill="${WHITE}" stroke="${P.main}" stroke-width="2.5"/>
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0"
          keyTimes="0;${h.on.toFixed(3)};${(h.on + 0.03).toFixed(3)};${(h.on + 0.2).toFixed(3)};${(h.on + 0.23).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite"/>
        <rect x="${h.x - 76}" y="${h.y - 54}" width="152" height="42" rx="11" fill="${INK}"/>
        <text x="${h.x}" y="${h.y - 34}" text-anchor="middle" font-size="11" font-weight="700" fill="${WHITE}">${h.t}</text>
        ${mono(h.x, h.y - 20, h.ms, { size: 8, anchor: 'middle', fill: WHITE, op: 0.55 })}
      </g>`).join('')}
    <circle r="7" fill="${P.main}">
      <animateMotion dur="${dur}s" repeatCount="indefinite" path="${route}"/>
    </circle>
    <circle r="7" fill="none" stroke="${P.main}" stroke-width="2" opacity="0.45">
      <animateMotion dur="${dur}s" repeatCount="indefinite" path="${route}"/>
      <animate attributeName="r" values="7;19;7" keyTimes="0;0.5;1" dur="1.6s" repeatCount="indefinite"/>
    </circle>
    ${mono(40, 444, 'THE BEST NETWORK IS A PLACE, NOT A PREFERENCE', { size: 9, op: 0.34 })}`;
    return { svg: wrap(inner), pills: pAI('Switches as you move') };
  },
};

export const aiFourPromises = {
  id: 'ai-promises',
  name: 'Four Promises',
  family: 'Editorial',
  tagline: 'The section\u2019s four cards, each given a number',
  desc:
    'The section already makes four promises in four small cards \u2014 AI-powered selection, dynamic ' +
    'optimisation, price intelligence, instant switching \u2014 and none of them carries a figure. Here each ' +
    'one is quoted on the left and answered on the right: 1,438 evaluations a minute, 37 switches today, ' +
    '\u20ac0.58 average fill, 41 ms median. A ledger, set as type.',
  pros: [
    'Uses copy that is already on the page, so nothing new has to be approved',
    'Four claims and four numbers is easy to keep current and easy to audit',
    'Reads as a summary of the whole section rather than one idea from it',
  ],
  cons: [
    'It is a table \u2014 there is no scene and very little movement',
    'Quoting our own marketing has a slightly self-satisfied tone if the numbers ever slip',
  ],
  scores: { story: 5, motion: 2, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 12;
    const rows = [
      ['\u201cAI-Powered Selection\u201d', 'SIGNAL, CONGESTION AND PRICE, IN REAL TIME', '1,438', 'EVALUATIONS A MINUTE'],
      ['\u201cDynamic Optimization\u201d', 'SWITCH WHEN A BETTER OPTION APPEARS', '37', 'SWITCHES TODAY, 6 CARRIERS'],
      ['\u201cPrice Intelligence\u201d', 'ROUTE THROUGH THE CHEAPEST USABLE CARRIER', '\u20ac0.58', 'AVERAGE FILL, 22% UNDER LIST'],
      ['\u201cInstant Switching\u201d', 'SEAMLESS TRANSITIONS IN MILLISECONDS', '41 ms', 'MEDIAN, 180 ms AT THE 99TH'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 250, uid)}
    ${mono(56, 52, 'THE FOUR PROMISES IN THIS SECTION, MEASURED', { size: 9.5, op: 0.45 })}
    <line x1="56" y1="70" x2="584" y2="70" stroke="${INK}" stroke-width="2"/>
    ${rows.map(([claim, sub, fig, note], i) => {
      const y = 110 + i * 84;
      const on = 0.06 + i * 0.13;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${label(56, y, claim, { size: 17 })}
        ${mono(56, y + 20, sub, { size: 8.5, op: 0.38 })}
        ${num(584, y - 2, fig, { size: 22, anchor: 'end' })}
        ${mono(584, y + 20, note, { size: 8.5, anchor: 'end', op: 0.4 })}
        <line x1="56" y1="${y + 40}" x2="584" y2="${y + 40}" stroke="${LINE}" stroke-width="1.2"/>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.68;0.76;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(56, 442, 'FOUR CLAIMS ON THE PAGE \u00b7 FOUR NUMBERS WE CAN BE HELD TO', { size: 9.5, op: 0.5, fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pAI('Four claims, four numbers') };
  },
};

export const aiWorstCase = {
  id: 'ai-worstcase',
  name: 'Worst Case',
  family: 'Statistics',
  tagline: 'Ten thousand switches, including the slow ones',
  desc:
    'A distribution rather than a demo: ten thousand switch times in twenty-millisecond bins, with the ' +
    'median marked at 41 ms and the ninety-ninth percentile at 180 ms. The tail is drawn instead of ' +
    'hidden. \u201cMilliseconds\u201d is a marketing word until somebody shows the slow end of the curve, which ' +
    'is the number a procurement team will actually ask for.',
  pros: [
    'The only option that volunteers its worst case, which buys credibility cheaply',
    'A histogram is the register enterprise buyers already read',
    'Every figure on it survives translation \u2014 there is almost no copy',
  ],
  cons: [
    'Percentiles mean nothing to a consumer visitor',
    'Publishing a p99 invites somebody to measure it themselves',
    'One build-in and then it holds \u2014 the least kinetic option here',
  ],
  scores: { story: 4, motion: 3, perf: 5, mobile: 4, brand: 3, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const bins = [180, 2900, 3400, 1600, 820, 430, 260, 170, 110, 70, 40, 18, 8, 4];
    const maxV = 3400, base = 342, top = 132, bw = 26, step = 34.6, x0 = 84;
    const px = (ms) => x0 + (ms / 280) * 484;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 250, uid)}
    ${mono(56, 52, 'TEN THOUSAND SWITCHES \u00b7 HOW LONG EACH ONE TOOK', { size: 9.5, op: 0.45 })}
    ${mono(56, 76, 'SWITCHES PER 20 ms BIN', { size: 8.5, op: 0.32 })}
    <line x1="${x0}" y1="${base}" x2="568" y2="${base}" stroke="${LINE}" stroke-width="2"/>
    ${bins.map((v, i) => {
      const h = (v / maxV) * (base - top);
      const x = (x0 + i * step + (step - bw) / 2).toFixed(1);
      const yTo = (base - h).toFixed(1);
      const a = (0.04 + i * 0.03).toFixed(3);
      const b = (0.1 + i * 0.03).toFixed(3);
      return `<rect x="${x}" y="${base}" width="${bw}" height="0" rx="3" fill="${P.main}" opacity="${v > 800 ? 0.95 : 0.55}">
        <animate attributeName="y" values="${base};${base};${yTo};${yTo}" keyTimes="0;${a};${b};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <animate attributeName="height" values="0;0;${h.toFixed(1)};${h.toFixed(1)}" keyTimes="0;${a};${b};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      </rect>`;
    }).join('')}
    ${[0, 40, 80, 120, 160, 200, 240, 280].map((ms) =>
      mono(px(ms).toFixed(0), base + 20, String(ms), { size: 8.5, anchor: 'middle', op: 0.32 })).join('')}
    ${mono(568, base + 38, 'MILLISECONDS', { size: 8.5, anchor: 'end', op: 0.3 })}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.5;0.58;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <line x1="${px(41).toFixed(0)}" y1="${top}" x2="${px(41).toFixed(0)}" y2="${base}" stroke="${P.deep}"
        stroke-width="2" stroke-dasharray="5 5"/>
      ${mono(px(41) + 8, top + 12, 'MEDIAN 41 ms', { size: 9, op: 0.65, fill: P.deep })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.7;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <line x1="${px(180).toFixed(0)}" y1="${top}" x2="${px(180).toFixed(0)}" y2="${base}" stroke="${AMBER}"
        stroke-width="2" stroke-dasharray="5 5"/>
      ${mono(px(180) + 8, top + 12, '99TH PERCENTILE 180 ms', { size: 9, op: 0.8, fill: AMBER })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.74;0.82;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(56, 386, 252, 56, { r: 12, fill: P.wash, stroke: P.main, sw: 2 })}
      ${mono(78, 410, 'HALF OF THEM UNDER', { size: 8.5, op: 0.5 })}
      ${num(78, 432, '41 ms', { size: 17, fill: P.deep })}
      ${card(332, 386, 252, 56, { r: 12, fill: WHITE, stroke: LINE })}
      ${mono(354, 410, 'SLOWEST OF THE TEN THOUSAND', { size: 8.5, op: 0.4 })}
      ${num(354, 432, '240 ms', { size: 17 })}
    </g>`;
    return { svg: wrap(inner), pills: pAI('41 ms median, 180 ms p99') };
  },
};

/* ── registry ── */
export const AI_VARIANTS = [aiCurrent, aiTrace, aiBoard, aiNeural, aiRadar, aiTicker, aiWhyThisOne, aiBeforeYouNotice, aiLearns, aiOffSwitch, aiTheCost, aiSentence, aiOnScreen, aiAcrossCity, aiFourPromises, aiWorstCase];
