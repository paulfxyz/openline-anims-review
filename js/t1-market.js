/* ══ /multiple-tier1 · "The Data Stock Market" (cyan system) ══════════ */

import { mk, INK, WHITE, GRAY, LINE, GREEN, GREEN_SOFT, GREEN_TEXT, RED, pill, icon } from './kit.js';

const K = mk('cyan');
const { P, wrap, dots, bloom, mono, label, num, card, panel, badge, MONO } = K;

const pMK = (t = 'OMDM market') => [pill('cyan', `${icon('trend')}${t}`, { top: '14px', left: '14px' })];

/* deterministic pseudo-random series so every render looks the same */
const series = (n, seed = 7, lo = 0.56, hi = 1.32) => {
  const out = [];
  let v = (lo + hi) / 2;
  for (let i = 0; i < n; i++) {
    const r = Math.sin(seed * (i + 1) * 12.9898) * 43758.5453;
    const f = r - Math.floor(r);
    v += (f - 0.5) * 0.22;
    v = Math.max(lo, Math.min(hi, v));
    out.push(v);
  }
  return out;
};

/* ══════════════ 0 · CURRENT ══════════════ */
export const mkCurrent = {
  id: 'mk-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'One frozen bar chart with a BUY tag',
  desc: 'A card reading "wholesale data · live", a price of $0.94/GB, a green −34% badge and eight bars with one highlighted and tagged BUY. It is the right idea — a market, a dip, a purchase — but the chart never moves, so "trades this market 24/7" is contradicted by a still image, and the single BUY tag reads as a label rather than an event.',
  pros: ['The market metaphor is already correct and on-brand', 'A single price and a single discount are easy to grasp'],
  cons: ['Labelled "live" while nothing updates — the weakest kind of claim', 'One BUY tag cannot show a strategy, only a moment', 'Eight plain bars carry no time axis, so there is no sense of history', 'The saving is asserted in a badge rather than demonstrated'],
  scores: { story: 3, motion: 2, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const vals = [0.62, 0.86, 0.72, 1.0, 0.58, 0.8, 0.94, 0.78];
    const base = 350, maxH = 170;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 250, 200, uid)}
    ${panel(64, 96, 512, 288)}
    ${mono(94, 132, 'WHOLESALE DATA · LIVE', { size: 9.5, op: 0.4 })}
    <text x="94" y="170" font-size="30" font-weight="700" fill="${INK}" style="font-family:${MONO}">$0.94</text>
    ${label(186, 170, '/GB', { size: 15, op: 0.45 })}
    <g transform="translate(452 144)">
      <rect width="94" height="30" rx="15" fill="${GREEN_SOFT}"/>
      <text x="47" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="${GREEN_TEXT}" style="font-family:${MONO}">↗ -34%</text>
    </g>
    ${vals.map((v, i) => {
      const h = v * maxH;
      const x = 98 + i * 54;
      const on = i === 6;
      return `<rect x="${x}" y="${base - h}" width="42" height="${h}" rx="4"
        fill="${on ? P.main : P.soft}" opacity="${on ? 1 : 0.85}"/>
        ${on ? `<g transform="translate(${x + 21} ${base - h - 18})">
          <rect x="-20" y="-13" width="40" height="24" rx="6" fill="${INK}"/>
          <text y="4" text-anchor="middle" font-size="9.5" font-weight="700" fill="${WHITE}" style="font-family:${MONO}">BUY</text>
        </g>` : ''}`;
    }).join('')}
    <line x1="94" y1="${base}" x2="546" y2="${base}" stroke="${LINE}" stroke-width="2"/>
    ${label(94, 372, 'Our AI buys at the dip — and the saving reaches your price.', { size: 12.5, op: 0.5, weight: 600 })}`;
    return { svg: wrap(inner), pills: pMK() };
  },
};

/* ══════════════ 1 · LIVE CANDLES ══════════════ */
export const candles = {
  id: 'mkcandles',
  name: 'Live Candles',
  family: 'Trading floor',
  tagline: 'A real market tape, streaming',
  desc: 'A candlestick chart streams right to left with the price label following the last close, green and red bodies, and a BUY flag that drops on genuine local lows with the fill price beside it. A running "average fill" figure sits under the chart. If the section is going to call this a stock market, this is what a stock market looks like.',
  pros: ['Immediately recognisable as a live market — the metaphor lands with no copy', 'Continuous streaming means the panel is never still', 'BUY flags on actual troughs prove the strategy, not just the intent', 'Red candles make the volatility real, which makes the saving meaningful'],
  cons: ['Introduces red into the cyan palette', 'Candlesticks assume a little financial literacy', 'Most complex of the five to build'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const inner = `
    ${dots(uid)}
    ${bloom(320, 230, 210, uid)}
    ${panel(40, 74, 560, 312)}
    ${mono(66, 108, 'OMDM · WHOLESALE DATA · LIVE', { size: 9.5, op: 0.4 })}
    <text x="66" y="146" font-size="28" font-weight="700" fill="${INK}" style="font-family:${MONO}"><tspan data-role="cprice">$0.94</tspan></text>
    ${label(158, 146, '/GB', { size: 14, op: 0.42 })}
    <g transform="translate(468 120)">
      <rect width="108" height="30" rx="15" fill="${GREEN_SOFT}"/>
      <text x="54" y="20" text-anchor="middle" font-size="12.5" font-weight="700" fill="${GREEN_TEXT}"
        style="font-family:${MONO}"><tspan data-role="cchg">↗ -34%</tspan></text>
    </g>
    <g transform="translate(66 170)">
      ${[0, 1, 2, 3].map(i => `<line x1="0" y1="${i * 42}" x2="510" y2="${i * 42}" stroke="${LINE}" stroke-width="1" stroke-dasharray="3 6"/>`).join('')}
      <svg width="510" height="176" viewBox="0 0 510 176" overflow="hidden">
        <g data-cwrap></g>
      </svg>
    </g>
    <line x1="66" y1="348" x2="576" y2="348" stroke="${LINE}" stroke-width="2"/>
    ${mono(66, 372, 'AVERAGE FILL', { size: 9, op: 0.35 })}
    <text x="168" y="374" font-size="13" font-weight="700" fill="${P.deep}" style="font-family:${MONO}"><tspan data-role="cfill">$0.61/GB</tspan></text>
    ${mono(576, 372, 'YOUR PRICE NEVER MOVES', { size: 9.5, op: 0.35, anchor: 'end' })}`;

    return {
      svg: wrap(inner),
      pills: pMK('Trading 24/7'),
      init(root) {
        const wrapEl = root.querySelector('[data-cwrap]');
        if (!wrapEl) return null;
        const NS = 'http://www.w3.org/2000/svg';
        const priceEl = root.querySelector('[data-role="cprice"]');
        const chgEl = root.querySelector('[data-role="cchg"]');
        const fillEl = root.querySelector('[data-role="cfill"]');
        const N = 26, CW = 19.6, H = 176;
        const lo = 0.5, hi = 1.4;
        const yOf = v => H - ((v - lo) / (hi - lo)) * (H - 16) - 8;
        let data = series(N, 11).map(v => v);
        let fills = [];
        const draw = () => {
          wrapEl.innerHTML = '';
          data.forEach((c, i) => {
            const o = i ? data[i - 1] : c;
            const up = c >= o;
            const wickHi = Math.max(c, o) + 0.05, wickLo = Math.min(c, o) - 0.05;
            const x = i * CW + CW / 2;
            const w = document.createElementNS(NS, 'line');
            w.setAttribute('x1', x); w.setAttribute('x2', x);
            w.setAttribute('y1', yOf(wickHi)); w.setAttribute('y2', yOf(wickLo));
            w.setAttribute('stroke', up ? '#EF4444' : P.main);
            w.setAttribute('stroke-width', '1.4');
            w.setAttribute('opacity', '0.6');
            wrapEl.appendChild(w);
            const b = document.createElementNS(NS, 'rect');
            const top = yOf(Math.max(c, o)), bot = yOf(Math.min(c, o));
            b.setAttribute('x', x - 6); b.setAttribute('width', '12');
            b.setAttribute('y', top); b.setAttribute('height', String(Math.max(3, bot - top)));
            b.setAttribute('rx', '2');
            b.setAttribute('fill', up ? '#EF4444' : P.main);
            b.setAttribute('opacity', up ? '0.75' : '1');
            wrapEl.appendChild(b);
          });
          fills.forEach(f => {
            const i = f.i;
            if (i < 0) return;
            const x = i * CW + CW / 2;
            const g = document.createElementNS(NS, 'g');
            g.setAttribute('transform', `translate(${x} ${yOf(data[i]) + 22})`);
            g.innerHTML = `<path d="M 0 -12 L 5 -4 L -5 -4 Z" fill="${INK}"/>
              <rect x="-26" y="-4" width="52" height="20" rx="5" fill="${INK}"/>
              <text y="10" text-anchor="middle" font-size="9" font-weight="700" fill="#FFFFFF"
                style="font-family:ui-monospace,Menlo,monospace">$${data[i].toFixed(2)}</text>`;
            wrapEl.appendChild(g);
          });
        };
        const tick = () => {
          const last = data[data.length - 1];
          let v = last + (Math.random() - 0.5) * 0.24;
          v = Math.max(0.54, Math.min(1.34, v));
          data.push(v); data.shift();
          fills = fills.map(f => ({ i: f.i - 1 })).filter(f => f.i >= 0);
          // buy on a local low
          const n = data.length;
          if (n > 3 && data[n - 2] < data[n - 3] && v > data[n - 2] && data[n - 2] < 0.78) {
            fills.push({ i: n - 2 });
            if (fills.length > 2) fills.shift();
            if (fillEl) fillEl.textContent = `$${(data[n - 2] * 0.99).toFixed(2)}/GB`;
          }
          if (priceEl) priceEl.textContent = `$${v.toFixed(2)}`;
          if (chgEl) chgEl.textContent = `↗ -${(26 + Math.round(Math.random() * 14))}%`;
          draw();
        };
        draw();
        const id = setInterval(tick, 900);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════ 2 · DIP HUNTER ══════════════ */
export const dipHunter = {
  id: 'mkdip',
  name: 'Dip Hunter',
  family: 'Narrative',
  tagline: 'Watch the AI wait, then buy',
  desc: 'A single smooth price line scrolls past while a cyan marker rides along it. When the line bottoms out the marker flashes, a ring fires, and a "bought" chip drops with the price — then a savings total climbs in the corner. It has the clearest cause and effect of the five: the price fell, so we bought, so you paid less.',
  pros: ['One line, one marker — the simplest possible reading of the story', 'The buy moment is an event with a beginning and an end', 'A climbing savings total is the benefit, not the mechanism', 'Reads perfectly at phone width'],
  cons: ['A smooth line looks less like a real market than candles do', 'Only shows one series, so it cannot show the spread or the alternatives'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: (uid) => {
    const inner = `
    ${dots(uid)}
    ${bloom(320, 230, 200, uid)}
    ${panel(40, 78, 560, 304)}
    ${mono(66, 112, 'WHOLESALE PRICE · LAST 24H', { size: 9.5, op: 0.4 })}
    <text x="66" y="150" font-size="28" font-weight="700" fill="${INK}" style="font-family:${MONO}"><tspan data-role="dprice">$0.94</tspan></text>
    ${label(158, 150, '/GB', { size: 14, op: 0.42 })}
    <g transform="translate(414 124)">
      <rect width="162" height="32" rx="16" fill="${GREEN_SOFT}"/>
      <text x="81" y="21" text-anchor="middle" font-size="12" font-weight="700" fill="${GREEN_TEXT}"
        style="font-family:${MONO}"><tspan data-role="dsave">SAVED $0.00/GB</tspan></text>
    </g>
    <g transform="translate(66 176)">
      ${[0, 1, 2, 3].map(i => `<line x1="0" y1="${i * 44}" x2="510" y2="${i * 44}" stroke="${LINE}" stroke-width="1" stroke-dasharray="3 6"/>`).join('')}
      <svg width="510" height="150" viewBox="0 0 510 150" overflow="hidden">
        <path data-dfill d="" fill="${P.main}" opacity="0.1"/>
        <path data-dline d="" fill="none" stroke="${P.main}" stroke-width="2.6" stroke-linecap="round"/>
        <g data-dbuys></g>
        <g data-dmark>
          <circle r="7" fill="${P.main}"/>
          <circle r="7" fill="none" stroke="${P.main}" stroke-width="2" data-dring opacity="0"/>
        </g>
      </svg>
    </g>
    <line x1="66" y1="344" x2="576" y2="344" stroke="${LINE}" stroke-width="2"/>
    ${label(66, 370, 'Our AI buys at the dip — and the saving reaches your price.', { size: 12.5, op: 0.5, weight: 600 })}`;

    return {
      svg: wrap(inner),
      pills: pMK('Buying the dip'),
      init(root) {
        const line = root.querySelector('[data-dline]');
        const fill = root.querySelector('[data-dfill]');
        const mark = root.querySelector('[data-dmark]');
        const ring = root.querySelector('[data-dring]');
        const buys = root.querySelector('[data-dbuys]');
        if (!line) return null;
        const pEl = root.querySelector('[data-role="dprice"]');
        const sEl = root.querySelector('[data-role="dsave"]');
        const N = 34, W = 510, H = 150, lo = 0.5, hi = 1.4;
        const xOf = i => (i / (N - 1)) * W;
        const yOf = v => H - ((v - lo) / (hi - lo)) * (H - 20) - 10;
        let data = series(N, 3);
        let saved = 0;
        const draw = () => {
          const d = data.map((v, i) => `${i ? 'L' : 'M'} ${xOf(i).toFixed(1)} ${yOf(v).toFixed(1)}`).join(' ');
          line.setAttribute('d', d);
          fill.setAttribute('d', `${d} L ${W} ${H} L 0 ${H} Z`);
          const li = N - 1;
          mark.setAttribute('transform', `translate(${xOf(li).toFixed(1)} ${yOf(data[li]).toFixed(1)})`);
        };
        const flash = () => {
          ring.setAttribute('opacity', '0.9');
          ring.setAttribute('r', '7');
          let r = 7;
          const anim = setInterval(() => {
            r += 3;
            ring.setAttribute('r', String(r));
            ring.setAttribute('opacity', String(Math.max(0, 0.9 - (r - 7) / 26)));
            if (r > 32) { clearInterval(anim); ring.setAttribute('opacity', '0'); }
          }, 40);
        };
        const tick = () => {
          const last = data[N - 1];
          let v = last + (Math.random() - 0.5) * 0.2;
          v = Math.max(0.54, Math.min(1.34, v));
          data.push(v); data.shift();
          // buy when we just turned up from a low
          if (data[N - 2] < data[N - 3] && v > data[N - 2] && data[N - 2] < 0.8) {
            flash();
            saved += 0.94 - data[N - 2];
            if (sEl) sEl.textContent = `SAVED $${saved.toFixed(2)}/GB`;
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('transform', `translate(${xOf(N - 2).toFixed(1)} ${(yOf(data[N - 2]) + 20).toFixed(1)})`);
            g.innerHTML = `<rect x="-24" y="-9" width="48" height="19" rx="5" fill="${INK}"/>
              <text y="4.5" text-anchor="middle" font-size="9" font-weight="700" fill="#FFFFFF"
                style="font-family:ui-monospace,Menlo,monospace">$${data[N - 2].toFixed(2)}</text>`;
            buys.appendChild(g);
            while (buys.children.length > 2) buys.removeChild(buys.firstChild);
          }
          [...buys.children].forEach(g => {
            const t = g.getAttribute('transform').match(/translate\(([-\d.]+) ([-\d.]+)\)/);
            if (t) g.setAttribute('transform', `translate(${(+t[1] - W / (N - 1)).toFixed(1)} ${t[2]})`);
          });
          if (pEl) pEl.textContent = `$${v.toFixed(2)}`;
          if (saved > 2.2) saved = 0;
          draw();
        };
        draw();
        const id = setInterval(tick, 820);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════ 3 · ORDER BOOK ══════════════ */
export const orderBook = {
  id: 'mkbook',
  name: 'Order Book',
  family: 'Credibility',
  tagline: 'Bids, asks and the fill in between',
  desc: 'A two-sided ladder: asks above, bids below, quantities flickering, the spread highlighted in the middle and a cyan "our fill" line landing inside it. It is the most technically literal reading of "we trade this market", and the hardest version for a sceptic to dismiss as an illustration.',
  pros: ['The single most credible register available for a trading claim', 'Constant micro-motion in the quantities with no big restarts', 'Compact and sharp; nothing to localise but four labels', 'Distinct from every other panel on the page'],
  cons: ['Requires the most financial literacy of the five', 'Cold — no benefit to the reader stated visually', 'Depth numbers must eventually be real or it invites doubt'],
  scores: { story: 3, motion: 4, perf: 5, mobile: 3, brand: 3, ease: 4 },
  build: (uid) => {
    const asks = [[1.12, 420], [1.06, 610], [1.01, 880], [0.98, 1240]];
    const bids = [[0.92, 1310], [0.88, 940], [0.84, 660], [0.79, 380]];
    const rh = 28;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 230, 200, uid)}
    ${panel(56, 66, 528, 328)}
    ${mono(82, 98, 'OMDM ORDER BOOK · DATA/GB', { size: 9.5, op: 0.4 })}
    ${mono(558, 98, 'DEPTH · TB', { size: 9, op: 0.32, anchor: 'end' })}
    <line x1="82" y1="110" x2="558" y2="110" stroke="${LINE}" stroke-width="1.5"/>
    ${asks.map((a, i) => {
      const y = 132 + i * rh;
      return `
      <rect x="${558 - (a[1] / 1400) * 300}" y="${y - 11}" width="${(a[1] / 1400) * 300}" height="22" rx="4" fill="#EF4444" opacity="0.1"/>
      <text x="82" y="${y + 4}" font-size="12.5" font-weight="700" fill="#DC2626" style="font-family:${MONO}">$${a[0].toFixed(2)}</text>
      ${mono(150, y + 4, 'ASK', { size: 9, op: 0.3 })}
      <text x="558" y="${y + 4}" text-anchor="end" font-size="11.5" font-weight="700" fill="${INK}" opacity="0.5"
        style="font-family:${MONO}" data-bq>${a[1]}</text>`;
    }).join('')}
    <!-- the spread -->
    <g transform="translate(0 ${132 + asks.length * rh + 6})">
      <rect x="82" y="-15" width="476" height="34" rx="9" fill="${P.main}" opacity="0.12"/>
      <rect x="82" y="-15" width="476" height="34" rx="9" fill="none" stroke="${P.main}" stroke-width="2"/>
      ${mono(98, 5, 'OUR FILL', { size: 9.5, op: 0.5, fill: P.deep })}
      <text x="188" y="7" font-size="15" font-weight="700" fill="${P.deep}" style="font-family:${MONO}"><tspan data-role="ofill">$0.94</tspan></text>
      <text x="544" y="6" text-anchor="end" font-size="11" font-weight="700" fill="${P.deep}" opacity="0.8"
        style="font-family:${MONO}"><tspan data-role="ospread">SPREAD $0.06</tspan></text>
    </g>
    ${bids.map((b, i) => {
      const y = 132 + (asks.length + 1) * rh + 18 + i * rh;
      return `
      <rect x="82" y="${y - 11}" width="${(b[1] / 1400) * 300}" height="22" rx="4" fill="${P.main}" opacity="0.12"/>
      <text x="82" y="${y + 4}" font-size="12.5" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">$${b[0].toFixed(2)}</text>
      ${mono(150, y + 4, 'BID', { size: 9, op: 0.3 })}
      <text x="558" y="${y + 4}" text-anchor="end" font-size="11.5" font-weight="700" fill="${INK}" opacity="0.5"
        style="font-family:${MONO}" data-bq>${b[1]}</text>`;
    }).join('')}
    ${label(56, 424, 'We sit on the bid side and fill inside the spread — the difference is your price.', { size: 12, op: 0.45, weight: 600 })}`;

    return {
      svg: wrap(inner),
      pills: pMK('Live book'),
      init(root) {
        const qs = [...root.querySelectorAll('[data-bq]')];
        const fill = root.querySelector('[data-role="ofill"]');
        const spread = root.querySelector('[data-role="ospread"]');
        if (!qs.length) return null;
        const base = qs.map(q => +q.textContent);
        const id = setInterval(() => {
          qs.forEach((q, i) => {
            const v = Math.max(120, Math.round(base[i] * (0.82 + Math.random() * 0.36)));
            q.textContent = String(v);
          });
          const f = (0.90 + Math.random() * 0.07).toFixed(2);
          if (fill) fill.textContent = `$${f}`;
          if (spread) spread.textContent = `SPREAD $0.0${3 + Math.floor(Math.random() * 6)}`;
        }, 620);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════ 4 · YOUR PRICE VS MARKET ══════════════ */
export const vsMarket = {
  id: 'mkvs',
  name: 'Market vs Your Price',
  family: 'Benefit-led',
  tagline: 'The gap is the whole product',
  desc: 'Two lines on one chart: the wholesale market thrashing up and down, and your price running flat and low beneath it. The space between them fills in as you watch and a counter names it — "you are $0.33/GB below market". It is the only option where the benefit to the reader, not the cleverness of the system, is the subject.',
  pros: ['The reader\'s own price is the hero, not our trading', 'The shaded gap is the single clearest way to draw a saving', 'Flat-versus-volatile also implies predictable billing', 'Very light and very legible on a phone'],
  cons: ['Less exciting than a live market tape', 'Implies your price never rises, which the terms must actually support'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const inner = `
    ${dots(uid)}
    ${bloom(320, 230, 200, uid)}
    ${panel(40, 70, 560, 316)}
    ${mono(66, 104, 'MARKET PRICE VS YOUR PRICE · 24H', { size: 9.5, op: 0.4 })}
    <g transform="translate(66 124)">
      <g><rect width="11" height="11" rx="3" fill="${GRAY}" opacity="0.6"/>${mono(20, 10, 'MARKET', { size: 9.5, op: 0.45 })}</g>
      <g transform="translate(108 0)"><rect width="11" height="11" rx="3" fill="${P.main}"/>${mono(20, 10, 'YOUR PRICE', { size: 9.5, op: 0.45, fill: P.deep })}</g>
    </g>
    <g transform="translate(410 112)">
      <rect width="166" height="34" rx="17" fill="${GREEN_SOFT}"/>
      <text x="83" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="${GREEN_TEXT}"
        style="font-family:${MONO}"><tspan data-role="vgap">$0.33/GB BELOW</tspan></text>
    </g>
    <g transform="translate(66 170)">
      ${[0, 1, 2, 3, 4].map(i => `<line x1="0" y1="${i * 38}" x2="510" y2="${i * 38}" stroke="${LINE}" stroke-width="1" stroke-dasharray="3 6"/>`).join('')}
      <svg width="510" height="160" viewBox="0 0 510 160" overflow="hidden">
        <path data-vgapfill d="" fill="${P.main}" opacity="0.12"/>
        <path data-vmkt d="" fill="none" stroke="${GRAY}" stroke-width="2.4" stroke-linecap="round" opacity="0.75"/>
        <path data-vyou d="" fill="none" stroke="${P.main}" stroke-width="3" stroke-linecap="round"/>
        <g data-vdot><circle r="6" fill="${P.main}"/></g>
      </svg>
    </g>
    <line x1="66" y1="348" x2="576" y2="348" stroke="${LINE}" stroke-width="2"/>
    ${mono(66, 372, 'MARKET', { size: 9, op: 0.35 })}
    <text x="146" y="374" font-size="13" font-weight="700" fill="${INK}" opacity="0.55" style="font-family:${MONO}"><tspan data-role="vm">$0.94</tspan></text>
    ${mono(240, 372, 'YOU PAY', { size: 9, op: 0.35 })}
    <text x="330" y="374" font-size="13" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">$0.61</text>
    ${mono(576, 372, 'FLAT, WHATEVER THE MARKET DOES', { size: 9.5, op: 0.32, anchor: 'end' })}`;

    return {
      svg: wrap(inner),
      pills: pMK('Your price, protected'),
      init(root) {
        const mkt = root.querySelector('[data-vmkt]');
        const you = root.querySelector('[data-vyou]');
        const gap = root.querySelector('[data-vgapfill]');
        const dot = root.querySelector('[data-vdot]');
        if (!mkt) return null;
        const gEl = root.querySelector('[data-role="vgap"]');
        const mEl = root.querySelector('[data-role="vm"]');
        const N = 40, W = 510, H = 160, lo = 0.45, hi = 1.45;
        const xOf = i => (i / (N - 1)) * W;
        const yOf = v => H - ((v - lo) / (hi - lo)) * (H - 22) - 11;
        let data = series(N, 5);
        const YOU = 0.61;
        const draw = () => {
          const dm = data.map((v, i) => `${i ? 'L' : 'M'} ${xOf(i).toFixed(1)} ${yOf(v).toFixed(1)}`).join(' ');
          const dy = data.map((_, i) => `${i ? 'L' : 'M'} ${xOf(i).toFixed(1)} ${yOf(YOU).toFixed(1)}`).join(' ');
          mkt.setAttribute('d', dm);
          you.setAttribute('d', dy);
          gap.setAttribute('d', `${dm} L ${W} ${yOf(YOU).toFixed(1)} L 0 ${yOf(YOU).toFixed(1)} Z`);
          dot.setAttribute('transform', `translate(${W} ${yOf(YOU).toFixed(1)})`);
        };
        const tick = () => {
          const last = data[N - 1];
          let v = last + (Math.random() - 0.5) * 0.22;
          v = Math.max(0.58, Math.min(1.4, v));
          data.push(v); data.shift();
          if (mEl) mEl.textContent = `$${v.toFixed(2)}`;
          if (gEl) gEl.textContent = `$${Math.max(0, v - YOU).toFixed(2)}/GB BELOW`;
          draw();
        };
        draw();
        const id = setInterval(tick, 780);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════ 5 · TICKER TAPE ══════════════ */
export const tape = {
  id: 'mktape',
  name: 'Ticker Tape',
  family: 'Minimal',
  tagline: 'Regional prices, scrolling past',
  desc: 'A horizontal tape of regional wholesale prices scrolls continuously — EU 0.42 ▼, APAC 0.58 ▲, LATAM 0.71 ▼ — above a single headline figure for the average discount. No chart, no card, almost no ink. It is the lightest way to say "this is a live market with many prices in it" and the easiest to keep honest.',
  pros: ['Cheapest of the five in every sense: bytes, paint, build time', 'Many prices at once implies a real market better than one number does', 'Regional names hint at coverage as well as pricing', 'Never restarts — the tape simply keeps moving'],
  cons: ['Least dramatic; no dip, no buy, no story', 'Horizontal scrolling text is easy to ignore', 'Says nothing about what the AI actually does'],
  scores: { story: 3, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const rows = [
      ['EU · WEST', 0.42, -1], ['EU · EAST', 0.51, 1], ['APAC', 0.58, 1], ['LATAM', 0.71, -1],
      ['MENA', 0.63, -1], ['NORTH AM', 0.47, 1], ['AFRICA', 0.82, -1], ['OCEANIA', 0.55, 1],
    ];
    const one = (offset, shift = 0) => rows.map((rr, ii) => {
      const i = ii; const r = rows[(ii + shift) % rows.length];
      const x = offset + i * 168;
      const up = r[2] > 0;
      return `
      <g transform="translate(${x} 0)">
        <text font-size="12" font-weight="700" fill="${INK}" opacity="0.45" style="font-family:${MONO}">${r[0]}</text>
        <text x="96" font-size="13.5" font-weight="700" fill="${up ? '#DC2626' : P.deep}" style="font-family:${MONO}">$${r[1].toFixed(2)}</text>
        <text x="146" font-size="12" font-weight="700" fill="${up ? '#DC2626' : P.deep}">${up ? '▲' : '▼'}</text>
      </g>`;
    }).join('');
    const inner = `
    ${dots(uid)}
    ${bloom(320, 214, 200, uid)}
    ${mono(40, 56, 'OMDM · WHOLESALE DATA · ALL REGIONS', { size: 10, op: 0.32 })}
    ${[0, 1, 2].map(k => `
      <g transform="translate(0 ${118 + k * 52})">
        <rect x="26" y="-22" width="588" height="40" rx="12" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
        <svg x="30" y="-22" width="580" height="40" viewBox="0 0 580 40" overflow="hidden">
          <g transform="translate(0 26)">
            <g>
              ${one(0, k * 3)}${one(1344, k * 3)}
              <animateTransform attributeName="transform" type="translate" values="0,0;-1344,0"
                dur="${(26 + k * 5)}s" repeatCount="indefinite" calcMode="linear"/>
            </g>
          </g>
        </svg>
      </g>`).join('')}
    <g transform="translate(40 296)">
      <rect width="272" height="96" rx="18" fill="${INK}"/>
      ${mono(22, 34, 'AVERAGE VS LIST PRICE', { size: 9, fill: WHITE, op: 0.45 })}
      <text x="22" y="76" font-size="38" font-weight="700" fill="${P.main}" style="font-family:${MONO}"><tspan data-role="tpavg">-34%</tspan></text>
    </g>
    <g transform="translate(336 296)">
      <rect width="264" height="96" rx="18" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
      ${mono(22, 34, 'TRADES IN THE LAST HOUR', { size: 9, op: 0.4 })}
      <text x="22" y="76" font-size="38" font-weight="700" fill="${INK}" style="font-family:${MONO}"><tspan data-role="tptr">1,204</tspan></text>
    </g>
    ${label(40, 428, 'Prices move constantly. Our AI trades them so yours does not have to.', { size: 12, op: 0.45, weight: 600 })}`;

    return {
      svg: wrap(inner),
      pills: pMK('24/7 market'),
      init(root) {
        const avg = root.querySelector('[data-role="tpavg"]');
        const tr = root.querySelector('[data-role="tptr"]');
        let n = 1204;
        const id = setInterval(() => {
          if (avg) avg.textContent = `-${30 + Math.floor(Math.random() * 8)}%`;
          n += 3 + Math.floor(Math.random() * 7);
          if (n > 1400) n = 1180;
          if (tr) tr.textContent = n.toLocaleString('en-US');
        }, 1500);
        return () => clearInterval(id);
      },
    };
  },
};

export const MARKET_VARIANTS = [mkCurrent, candles, dipHunter, orderBook, vsMarket, tape];
