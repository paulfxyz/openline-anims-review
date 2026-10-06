import { C, chip, glow, CARRIERS } from './chip.js';
import { CURRENT_SVG } from './current-svg.js';
import { icon, pill, basePills, svgWrap } from './shared.js';

/* ─────────────────────────  0 · CURRENT  ───────────────────────── */
const current = {
  id: 'current',
  name: 'Current',
  tagline: 'What is live today',
  desc: 'Three static lanes, one comet every 5 s. Reads as decoration — the switching story stays implicit and long pauses leave the frame idle.',
  family: 'Baseline',
  pros: ['Zero work; already shipped', 'Very light payload'],
  cons: ['Long idle gaps between comets', 'Switching story stays implicit', 'Reads as decoration'],
  scores: {'story': 2, 'motion': 2, 'perf': 5, 'mobile': 3, 'brand': 5, 'ease': 5},
  build: (uid) => ({ svg: CURRENT_SVG.replace(/t1-/g, `t1-${uid}-`), pills: basePills }),
};

/* ─────────────────────────  1 · LIVE HANDOFF  ───────────────────────── */
const handoff = {
  id: 'handoff',
  name: 'Live Handoff',
  tagline: 'The switch, made literal',
  desc: 'One lane is always live and the AI hands off to the next every few seconds: the lane lights, packets stream, the chip pulses and the carrier badge updates in sync. Same lanes, same chip — it now demonstrates the headline instead of decorating it.',
  family: 'Narrative',
  pros: ['Demonstrates the headline literally', 'Smallest diff from what is live', 'Carrier + price badges stay in sync'],
  cons: ['Still the same three-lane frame', 'Timing must feel deliberate, not twitchy'],
  scores: {'story': 5, 'motion': 5, 'perf': 5, 'mobile': 4, 'brand': 5, 'ease': 5},
  build: (uid) => {
    const lanes = [
      { y: 120, d: 'M 30 120 C 150 120 250 200 290 222', tail: 'M 30 120 C 150 120 250 200 290 222 L 324 222', pin: 222 },
      { y: 280, d: 'M 30 280 L 290 280', tail: 'M 30 280 L 324 280', pin: 280 },
      { y: 440, d: 'M 30 440 C 150 440 250 360 290 338', tail: 'M 30 440 C 150 440 250 360 290 338 L 324 338', pin: 338 },
    ];
    const inner = `
    ${glow(400, 280, 198, uid)}
    ${lanes.map((l, i) => `
      <g class="lane" data-lane="${i}">
        <path d="${l.d}" fill="none" stroke="${C.gray}" stroke-width="5" stroke-linecap="round" opacity="0.28"/>
        <g class="live">
          <path d="${l.tail}" fill="none" stroke="${C.cyan}" stroke-width="5" stroke-linecap="round" opacity="0.9" stroke-dasharray="14 12">
            <animate attributeName="stroke-dashoffset" values="0;-52" dur="1.1s" repeatCount="indefinite"/>
          </path>
          ${[0, 0.36, 0.72].map(b => `
          <circle r="5" fill="${C.white}">
            <animateMotion dur="1.1s" begin="${b}s" repeatCount="indefinite" path="${l.tail}"/>
          </circle>`).join('')}
        </g>
        <rect x="290" y="${l.pin - 4}" width="16" height="8" rx="2" fill="${C.ink}"/>
        <g transform="translate(30 ${l.y})">
          <circle class="halo live-el" r="9" fill="none" stroke="${C.cyan}" stroke-width="2.5" opacity="0">
            <animate attributeName="r" values="10;28" dur="1.6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.55;0" dur="1.6s" repeatCount="indefinite"/>
          </circle>
          <circle class="node" r="10" fill="${C.gray}" stroke="${C.ink}" stroke-width="1.5"/>
        </g>
        <text class="tag" x="14" y="${l.y - 28}" font-size="15" font-weight="700" fill="${C.ink}" opacity="0.42">${CARRIERS[i].name}</text>
        <text class="meta" x="14" y="${l.y + 40}" font-size="12.5" font-weight="600" fill="${C.ink}" opacity="0.32">${CARRIERS[i].ping} · ${CARRIERS[i].price}/GB</text>
      </g>`).join('')}
    ${chip({ x: 400, y: 280 })}
    <g class="flashes"></g>`;

    return {
      svg: svgWrap(inner),
      pills: basePills,
      init(root) {
        const svg = root.querySelector('svg');
        const laneEls = [...svg.querySelectorAll('.lane')];
        const flashes = svg.querySelector('.flashes');
        const badge = root.querySelector('[data-role="carrier"]');
        const priceEl = root.querySelector('[data-role="price"]');
        let i = 0;
        const set = () => {
          laneEls.forEach((el, k) => el.classList.toggle('on', k === i));
          if (badge) badge.textContent = `${CARRIERS[i].name} · Active`;
          if (priceEl) priceEl.textContent = `${CARRIERS[i].price}/GB · Best Price`;
          const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          g.setAttribute('class', 'flash');
          g.innerHTML = `<circle r="100" fill="none" stroke="${C.cyan}" stroke-width="4"/>`;
          flashes.appendChild(g);
          setTimeout(() => g.remove(), 1000);
          i = (i + 1) % laneEls.length;
        };
        set();
        const t = setInterval(set, 2800);
        return () => clearInterval(t);
      },
    };
  },
};

/* ─────────────────────────  2 · ORBIT LOCK  ───────────────────────── */
const orbit = {
  id: 'orbit',
  name: 'Orbit Lock',
  tagline: '50+ networks, one always locked',
  desc: 'Carriers orbit the chip on a dashed ring and lock onto a beam as they pass the antenna gate. Continuous motion with no dead frames, and it visualises the size of the network pool rather than just three lanes.',
  family: 'Scale',
  pros: ['Never idle; one continuous loop', 'Communicates the size of the pool', 'No JS at all — pure SMIL'],
  cons: ['Orbiting labels are busy on small screens', 'Less explicit about price'],
  scores: {'story': 4, 'motion': 5, 'perf': 5, 'mobile': 3, 'brand': 4, 'ease': 4},
  build: (uid) => {
    const cx = 330, cy = 280, R = 190, N = 5, DUR = 22;
    const nodes = CARRIERS.map((c, i) => {
      const off = -(DUR / N) * i;
      return `
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="${DUR}s" begin="${off}s" repeatCount="indefinite"/>
        <g transform="translate(${cx - R} ${cy})">
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="${DUR}s" begin="${off}s" repeatCount="indefinite"/>
            <rect x="-56" y="-18" width="112" height="36" rx="18" fill="${C.white}" stroke="${C.ink}" stroke-width="2.5"/>
            <circle cx="-38" cy="0" r="4.5" fill="${C.cyan}">
              <animate attributeName="opacity" values="0.35;1;0.35" dur="${DUR / N}s" begin="${off}s" repeatCount="indefinite"/>
            </circle>
            <text x="6" y="5" font-size="12.5" font-weight="700" fill="${C.ink}" text-anchor="middle">${c.name}</text>
          </g>
        </g>
      </g>`;
    }).join('');

    const inner = `
    ${glow(cx, cy, 210, uid)}
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.gray}" stroke-width="2" opacity="0.28" stroke-dasharray="6 12">
      <animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="60s" repeatCount="indefinite"/>
    </circle>
    <circle cx="${cx}" cy="${cy}" r="${R - 34}" fill="none" stroke="${C.cyan}" stroke-width="1.5" opacity="0.16"/>
    ${nodes}
    <!-- lock beam at the 9 o'clock gate -->
    <g>
      <path d="M ${cx - 76} ${cy} L ${cx - R + 46} ${cy}" stroke="${C.cyan}" stroke-width="5" stroke-linecap="round" opacity="0.85" stroke-dasharray="12 10">
        <animate attributeName="stroke-dashoffset" values="0;44" dur="0.9s" repeatCount="indefinite"/>
      </path>
      ${[0, 0.3, 0.6].map(b => `<circle r="4.5" fill="${C.white}"><animateMotion dur="0.9s" begin="${b}s" repeatCount="indefinite" path="M ${cx - R + 46} ${cy} L ${cx - 76} ${cy}"/></circle>`).join('')}
      <circle cx="${cx - R + 46}" cy="${cy}" r="14" fill="none" stroke="${C.cyan}" stroke-width="3">
        <animate attributeName="r" values="14;34" dur="${DUR / N}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0" dur="${DUR / N}s" repeatCount="indefinite"/>
      </circle>
      <path d="M ${cx - 152} ${cy - 40} A 158 158 0 0 0 ${cx - 152} ${cy + 40}" fill="none" stroke="${C.cyan}" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
      <text x="${cx - R + 46}" y="${cy + 54}" font-size="12.5" font-weight="700" fill="${C.cyanDeep}" text-anchor="middle" opacity="0.95">LOCKED</text>
    </g>
    ${chip({ x: cx, y: cy, scale: 0.8 })}`;

    return {
      svg: svgWrap(inner),
      pills: [basePills[0], basePills[1], pill('white', `${icon('zap')}147 Optimizations Today`, { bottom: '20px', right: '20px' })],
    };
  },
};

/* ─────────────────────────  3 · PRICE AUCTION  ───────────────────────── */
const auction = {
  id: 'auction',
  name: 'Price Auction',
  tagline: 'Show the decision, not the pipe',
  desc: 'Three live carrier cards with signal bars, latency and €/GB. A cyan winner frame moves between them and fires a packet into the chip — the proof that AI picks best signal and lowest price, in one glance.',
  family: 'Data-led',
  pros: ['Shows the decision, with numbers', 'Signal + price in one frame'],
  cons: ['Card stack crowds the right column', 'Card text needs localisation in 20 languages'],
  scores: {'story': 5, 'motion': 4, 'perf': 4, 'mobile': 3, 'brand': 4, 'ease': 4},
  build: (uid) => {
    const cards = [104, 248, 392];
    const chipX = 486, chipY = 280, s = 0.72;
    const cardBlock = (y, i) => {
      const c = CARRIERS[i];
      const bars = [0, 1, 2, 3].map(b => {
        const h = 8 + b * 7;
        return `<rect x="${180 + b * 11}" y="${64 - h}" width="7" height="${h}" rx="2" fill="${C.cyan}" opacity="${0.25 + b * 0.12}">
          <animate attributeName="opacity" values="${0.25 + b * 0.12};1;${0.25 + b * 0.12}" dur="2.2s" begin="${i * 0.4 + b * 0.15}s" repeatCount="indefinite"/>
        </rect>`;
      }).join('');
      return `
      <g class="card" data-card="${i}" transform="translate(20 ${y})">
        <rect class="shell" x="0" y="0" width="226" height="104" rx="18" fill="${C.white}" stroke="${C.gray}" stroke-width="2" opacity="0.9"/>
        <rect class="ring" x="-4" y="-4" width="234" height="112" rx="22" fill="none" stroke="${C.cyan}" stroke-width="3.5" opacity="0"/>
        <text x="20" y="34" font-size="16" font-weight="700" fill="${C.ink}">${c.name}</text>
        <text x="20" y="58" font-size="12.5" font-weight="600" fill="${C.ink}" opacity="0.5">${c.ping} latency</text>
        <text x="20" y="82" font-size="18" font-weight="700" fill="${C.cyanDeep}">${c.price}<tspan font-size="11.5" opacity="0.7"> /GB</tspan></text>
        ${bars}
        <g class="won" opacity="0">
          <rect x="140" y="12" width="70" height="20" rx="10" fill="${C.cyan}"/>
          <text x="175" y="26" font-size="10" font-weight="700" fill="${C.white}" text-anchor="middle" letter-spacing="0.6">SELECTED</text>
        </g>
      </g>`;
    };
    const screen = `
      <g>
        ${[-16, 0, 16].map((dx, k) => `<rect x="${dx - 4}" y="-4" width="8" height="8" rx="2" fill="${C.white}" opacity="0.85">
          <animate attributeName="height" values="8;26;8" dur="1.6s" begin="${k * 0.25}s" repeatCount="indefinite"/>
          <animate attributeName="y" values="8;-10;8" dur="1.6s" begin="${k * 0.25}s" repeatCount="indefinite"/>
        </rect>`).join('')}
      </g>`;
    const inner = `
    ${glow(chipX, chipY, 176, uid)}
    ${cards.map((y, i) => cardBlock(y, i)).join('')}
    ${chip({ x: chipX, y: chipY, scale: s, screen })}
    <g class="shots"></g>`;

    return {
      svg: svgWrap(inner),
      pills: [basePills[0], basePills[1], pill('white', `${icon('zap')}147 Optimizations Today`, { bottom: '20px', right: '20px' })],
      init(root) {
        const svg = root.querySelector('svg');
        const cardEls = [...svg.querySelectorAll('.card')];
        const shots = svg.querySelector('.shots');
        const badge = root.querySelector('[data-role="carrier"]');
        const priceEl = root.querySelector('[data-role="price"]');
        let i = 0;
        const set = () => {
          cardEls.forEach((el, k) => el.classList.toggle('on', k === i));
          if (badge) badge.textContent = `${CARRIERS[i].name} · Active`;
          if (priceEl) priceEl.textContent = `${CARRIERS[i].price}/GB · Best Price`;
          const y = cards[i] + 52;
          const path = `M 250 ${y} C 340 ${y} 380 ${chipY} ${chipX - 74} ${chipY}`;
          const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          g.innerHTML = `
            <path d="${path}" fill="none" stroke="${C.cyan}" stroke-width="4" stroke-linecap="round" opacity="0.35" stroke-dasharray="10 10">
              <animate attributeName="stroke-dashoffset" values="0;-40" dur="0.8s" repeatCount="indefinite"/>
            </path>
            <circle r="6" fill="${C.cyan}"><animateMotion dur="0.85s" begin="0s" repeatCount="indefinite" path="${path}"/></circle>`;
          shots.replaceChildren(g);
          i = (i + 1) % cardEls.length;
        };
        set();
        const t = setInterval(set, 2600);
        return () => clearInterval(t);
      },
    };
  },
};

/* ─────────────────────────  4 · COVERAGE SWEEP  ───────────────────────── */
const sweep = {
  id: 'sweep',
  name: 'Coverage Sweep',
  tagline: 'Global reach around the chip',
  desc: 'A radar sweep rotates out of the chip across a dotted globe; each city node lights exactly as the beam crosses it. Sells 200+ destinations and always-on optimisation, and it loops smoothly with no visible restart.',
  family: 'Reach',
  pros: ['Beautiful, calm, continuous', 'Supports the destinations story'],
  cons: ['Radar reads generic if overused', 'Says little about price or switching'],
  scores: {'story': 3, 'motion': 5, 'perf': 4, 'mobile': 4, 'brand': 4, 'ease': 4},
  build: (uid) => {
    const cx = 400, cy = 280, R = 216, DUR = 9;
    const cities = [
      [-0.35, 0.86], [0.42, 0.78], [-0.72, 0.52], [0.78, 0.44], [-0.9, 0.18],
      [0.94, 0.1], [-0.62, 0.7], [0.2, 0.93], [-0.15, 0.6], [0.62, 0.66], [-0.44, 0.35], [0.36, 0.42],
    ].map(([a, r], i) => {
      const ang = a * Math.PI;
      const rr = R * r;
      const x = cx + Math.cos(ang) * rr, y = cy + Math.sin(ang) * rr;
      let deg = (Math.atan2(y - cy, x - cx) * 180) / Math.PI;
      if (deg < 0) deg += 360;
      const begin = (deg / 360) * DUR;
      return `
      <g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">
        <circle r="18" fill="none" stroke="${C.cyan}" stroke-width="2.5" opacity="0">
          <animate attributeName="r" values="6;26;26" keyTimes="0;0.18;1" dur="${DUR}s" begin="${begin.toFixed(2)}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;0;0" keyTimes="0;0.18;1" dur="${DUR}s" begin="${begin.toFixed(2)}s" repeatCount="indefinite"/>
        </circle>
        <circle r="6.5" fill="${C.white}" stroke="${C.ink}" stroke-width="2" opacity="0.55">
          <animate attributeName="fill" values="${C.cyan};${C.white};${C.white}" keyTimes="0;0.34;1" dur="${DUR}s" begin="${begin.toFixed(2)}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.55;0.55" keyTimes="0;0.34;1" dur="${DUR}s" begin="${begin.toFixed(2)}s" repeatCount="indefinite"/>
          <animate attributeName="r" values="9;6.5;6.5" keyTimes="0;0.34;1" dur="${DUR}s" begin="${begin.toFixed(2)}s" repeatCount="indefinite"/>
        </circle>
      </g>`;
    }).join('');

    const A = 26 * Math.PI / 180;
    const p1 = [(R * Math.cos(-A)).toFixed(1), (R * Math.sin(-A)).toFixed(1)];
    const p2 = [(R * Math.cos(A)).toFixed(1), (R * Math.sin(A)).toFixed(1)];
    const inner = `
    <defs>
      <radialGradient id="sw-${uid}" cx="0" cy="0" r="${R}" gradientUnits="userSpaceOnUse">
        <stop offset="0.2" stop-color="${C.cyan}" stop-opacity="0"/>
        <stop offset="1" stop-color="${C.cyan}" stop-opacity="0.62"/>
      </radialGradient>
    </defs>
    ${glow(cx, cy, 190, uid)}
    <g>
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.cyanDeep}" stroke-width="2" opacity="0.3" stroke-dasharray="4 10"/>
      <circle cx="${cx}" cy="${cy}" r="${R * 0.62}" fill="none" stroke="${C.cyanDeep}" stroke-width="2" opacity="0.2" stroke-dasharray="4 10"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${R}" ry="${R * 0.34}" fill="none" stroke="${C.cyanDeep}" stroke-width="2" opacity="0.18"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${R}" ry="${R * 0.72}" fill="none" stroke="${C.cyanDeep}" stroke-width="2" opacity="0.12"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${R * 0.42}" ry="${R}" fill="none" stroke="${C.cyanDeep}" stroke-width="2" opacity="0.14"/>
    </g>
    <g transform="translate(${cx} ${cy})">
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="${DUR}s" repeatCount="indefinite"/>
        <path d="M 0 0 L ${p1[0]} ${p1[1]} A ${R} ${R} 0 0 1 ${p2[0]} ${p2[1]} Z" fill="url(#sw-${uid})"/>
        <path d="M 0 0 L ${p2[0]} ${p2[1]}" stroke="${C.cyan}" stroke-width="3" stroke-linecap="round" opacity="0.85"/>
      </g>
    </g>
    ${cities}
    ${chip({ x: cx, y: cy, scale: 0.82 })}`;

    return {
      svg: svgWrap(inner),
      pills: [
        basePills[0],
        basePills[1],
        pill('white', `${icon('globe')}200+ Destinations`, { bottom: '64px', right: '300px' }),
        pill('white', `${icon('zap')}147 Optimizations Today`, { bottom: '20px', right: '20px' }),
      ],
    };
  },
};

/* ─────────────────────────  5 · DATA RIBBONS  ───────────────────────── */
const ribbons = {
  id: 'ribbons',
  name: 'Data Ribbons',
  tagline: 'Premium, calm, always moving',
  desc: 'Braided cyan ribbons of live traffic flow continuously into the chip, with a throughput readout on its face. The quietest option: no timers, no restarts, no story to read — pure texture that makes the header feel expensive.',
  family: 'Texture',
  pros: ['Premium, quiet, zero timers', 'Best-in-class on mobile'],
  cons: ['No story at all', 'Blur filter costs a little paint time'],
  scores: {'story': 2, 'motion': 5, 'perf': 4, 'mobile': 5, 'brand': 5, 'ease': 5},
  build: (uid) => {
    const paths = [
      'M -20 150 C 140 150 170 246 290 222',
      'M -20 300 C 120 300 180 272 290 280',
      'M -20 452 C 150 452 180 356 290 338',
      'M -20 210 C 130 240 190 236 290 252',
      'M -20 386 C 130 356 190 330 290 310',
    ];
    const ribbon = (d, i) => {
      const w = [13, 16, 13, 6, 6][i];
      const op = [0.6, 0.8, 0.6, 0.3, 0.3][i];
      const dur = 2.4 + i * 0.35;
      return `
      <path d="${d}" fill="none" stroke="url(#rb-${uid})" stroke-width="${w + 10}" stroke-linecap="round" opacity="${op * 0.22}" filter="url(#blur-${uid})"/>
      <path d="${d}" fill="none" stroke="url(#rb-${uid})" stroke-width="${w}" stroke-linecap="round" opacity="${op}" stroke-dasharray="46 22">
        <animate attributeName="stroke-dashoffset" values="0;-136" dur="${dur}s" repeatCount="indefinite"/>
      </path>
      ${[0, 0.5, 1].map(b => `<circle r="${i > 2 ? 2.6 : 4}" fill="${C.white}" opacity="0.9"><animateMotion dur="${2.4 + i * 0.35}s" begin="${b}s" repeatCount="indefinite" path="${d}"/></circle>`).join('')}`;
    };
    const screen = `
      <g>
        ${[-18, -6, 6, 18].map((dx, k) => `<rect x="${dx - 3}" y="-3" width="6" height="6" rx="2" fill="${C.white}" opacity="0.9">
          <animate attributeName="height" values="6;24;10;6" dur="${1.8 + k * 0.2}s" begin="${k * 0.2}s" repeatCount="indefinite"/>
          <animate attributeName="y" values="9;-9;5;9" dur="${1.8 + k * 0.2}s" begin="${k * 0.2}s" repeatCount="indefinite"/>
        </rect>`).join('')}
      </g>`;
    const inner = `
    <defs>
      <filter id="blur-${uid}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="7"/></filter>
      <linearGradient id="rb-${uid}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${C.cyan}" stop-opacity="0.15"/>
        <stop offset="0.55" stop-color="${C.cyan}" stop-opacity="0.9"/>
        <stop offset="1" stop-color="${C.cyanDeep}" stop-opacity="1"/>
      </linearGradient>
    </defs>
    ${glow(400, 280, 198, uid)}
    ${paths.map(ribbon).join('')}
    <rect x="290" y="218" width="16" height="8" rx="2" fill="${C.ink}"/>
    <rect x="290" y="276" width="16" height="8" rx="2" fill="${C.ink}"/>
    <rect x="290" y="334" width="16" height="8" rx="2" fill="${C.ink}"/>
    ${chip({ x: 400, y: 280, screen })}`;

    return {
      svg: svgWrap(inner),
      pills: [
        basePills[0],
        basePills[1],
        pill('white', `${icon('gauge')}1.4 Gbps Live`, { bottom: '90px', right: '200px' }),
        basePills[3],
      ],
    };
  },
};

export const VARIANTS_1 = [current, handoff, orbit, auction, sweep, ribbons];
