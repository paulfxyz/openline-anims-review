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

export const AI_VARIANTS = [aiCurrent, aiTrace, aiBoard, aiNeural, aiRadar, aiTicker];
