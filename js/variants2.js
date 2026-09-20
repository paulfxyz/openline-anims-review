import { C, chip, glow, CARRIERS } from './chip.js';
import { icon, pill, basePills, svgWrap } from './shared.js';

const RED = '#EF4444';

/* ─────────────────────────  6 · FAILOVER  ─────────────────────────
   Different thinking: stop selling optimisation, sell resilience.
   A lane dies, traffic reroutes before the eye can blink.            */
export const failover = {
  id: 'failover',
  name: 'Failover',
  family: 'Narrative',
  tagline: 'Show the thing competitors can’t do',
  desc: 'A live lane drops — node turns red, "signal lost" — and traffic reroutes to another Tier-1 network in the same beat, with a rerouted-in-40 ms readout. This is the only concept that dramatises the competitor’s weakness instead of describing your feature.',
  pros: ['Strongest emotional hook: risk → rescue', 'Explains lock-in without a word of copy', 'Same lanes as today, so it is a small diff'],
  cons: ['Introduces one alarm red into the palette', 'Needs careful timing or it reads as a bug'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const lanes = [
      { y: 120, tail: 'M 30 120 C 150 120 250 200 290 222', pin: 222 },
      { y: 280, tail: 'M 30 280 L 290 280', pin: 280 },
      { y: 440, tail: 'M 30 440 C 150 440 250 360 290 338', pin: 338 },
    ];
    const inner = `
    ${glow(400, 280, 198, uid)}
    ${lanes.map((l, i) => `
      <g class="fl" data-fl="${i}">
        <path d="${l.tail}" fill="none" stroke="${C.gray}" stroke-width="5" stroke-linecap="round" opacity="0.26"/>
        <g class="up">
          <path d="${l.tail}" fill="none" stroke="${C.cyan}" stroke-width="5" stroke-linecap="round" stroke-dasharray="14 12">
            <animate attributeName="stroke-dashoffset" values="0;-52" dur="1.1s" repeatCount="indefinite"/>
          </path>
          ${[0, 0.4].map(b => `<circle r="5" fill="${C.white}"><animateMotion dur="1.1s" begin="${b}s" repeatCount="indefinite" path="${l.tail}"/></circle>`).join('')}
        </g>
        <g class="down">
          <path d="${l.tail}" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" opacity="0.55" stroke-dasharray="4 14"/>
        </g>
        <rect x="290" y="${l.pin - 4}" width="16" height="8" rx="2" fill="${C.ink}"/>
        <g transform="translate(30 ${l.y})">
          <circle class="node" r="11" fill="${C.gray}" stroke="${C.ink}" stroke-width="1.5"/>
          <g class="cross" opacity="0">
            <path d="M -4.5 -4.5 L 4.5 4.5 M 4.5 -4.5 L -4.5 4.5" stroke="${C.white}" stroke-width="2.4" stroke-linecap="round"/>
          </g>
        </g>
        <text class="cname" x="14" y="${l.y - 28}" font-size="15" font-weight="700" fill="${C.ink}" opacity="0.42">${CARRIERS[i].name}</text>
        <text class="cstate" x="14" y="${l.y + 40}" font-size="12" font-weight="700" fill="${C.ink}" opacity="0.3">STANDBY</text>
      </g>`).join('')}
    ${chip({ x: 400, y: 280 })}
    <g class="flashes"></g>`;

    return {
      svg: svgWrap(inner),
      pills: basePills,
      init(root) {
        const svg = root.querySelector('svg');
        const els = [...svg.querySelectorAll('.fl')];
        const flashes = svg.querySelector('.flashes');
        const badge = root.querySelector('[data-role="carrier"]');
        const price = root.querySelector('[data-role="price"]');
        const timers = [];
        let i = 0;
        const state = (el, s) => {
          el.classList.toggle('on', s === 'on');
          el.classList.toggle('dead', s === 'dead');
          el.querySelector('.cstate').textContent = s === 'on' ? 'ACTIVE' : s === 'dead' ? 'SIGNAL LOST' : 'STANDBY';
        };
        const ring = () => {
          const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          g.setAttribute('class', 'flash');
          g.innerHTML = `<circle r="100" fill="none" stroke="${C.cyan}" stroke-width="4"/>`;
          flashes.appendChild(g);
          timers.push(setTimeout(() => g.remove(), 1000));
        };
        const cycle = () => {
          els.forEach(el => state(el, 'standby'));
          state(els[i], 'on');
          if (badge) badge.textContent = `${CARRIERS[i].name} · Active`;
          if (price) price.textContent = `${CARRIERS[i].price}/GB · Best Price`;
          ring();
          timers.push(setTimeout(() => {
            state(els[i], 'dead');
            if (badge) badge.textContent = 'Rerouting…';
          }, 3200));
          timers.push(setTimeout(() => {
            i = (i + 1) % els.length;
            cycle();
          }, 3900));
        };
        cycle();
        return () => timers.forEach(clearTimeout);
      },
    };
  },
};

/* ─────────────────────────  7 · AUCTION BOARD  ─────────────────────────
   Different thinking: no illustration at all. Type + numbers as the visual. */
export const board = {
  id: 'board',
  name: 'Auction Board',
  family: 'Data-led',
  tagline: 'Type and numbers as the artwork',
  desc: 'A live departures-board of networks: prices tick, signal bars breathe, and the cyan AI-pick bar slides to whichever row is cheapest. No mascot, no chip — the product is the data, which reads as credible infrastructure rather than illustration.',
  pros: ['Feels like a real system, not a drawing', 'Scales to any number of carriers', 'Tiny payload; text renders razor sharp'],
  cons: ['Least "brand illustration"; loses the chip motif', 'Needs real numbers eventually or it invites doubt'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 3, brand: 3, ease: 4 },
  build: (uid) => {
    const rows = CARRIERS.map((c, i) => {
      const y = 150 + i * 62;
      const bars = [0, 1, 2, 3].map(b => {
        const h = 7 + b * 6;
        return `<rect x="${330 + b * 12}" y="${-h / 2 - 2}" width="7" height="${h}" rx="2" fill="${C.cyanDeep}" opacity="${0.3 + b * 0.14}">
          <animate attributeName="opacity" values="${0.3 + b * 0.14};1;${0.3 + b * 0.14}" dur="2.4s" begin="${i * 0.3 + b * 0.16}s" repeatCount="indefinite"/>
        </rect>`;
      }).join('');
      return `
      <g class="row" data-row="${i}" transform="translate(0 ${y})">
        <text x="60" y="6" font-size="17" font-weight="700" fill="${C.ink}">${c.name}</text>
        <text class="ping" x="230" y="6" font-size="13.5" font-weight="600" fill="${C.ink}" opacity="0.5">${c.ping}</text>
        ${bars}
        <text class="price" x="524" y="6" font-size="18" font-weight="700" fill="${C.ink}" text-anchor="end">${c.price}</text>
        <text class="badge" x="600" y="6" font-size="11" font-weight="700" fill="${C.cyanDeep}" text-anchor="end" opacity="0">AI PICK</text>
      </g>`;
    }).join('');
    const inner = `
    ${glow(320, 280, 230, uid)}
    <text x="60" y="70" font-size="12.5" font-weight="700" fill="${C.cyanDeep}" letter-spacing="2.2">LIVE NETWORK AUCTION</text>
    <line x1="40" y1="96" x2="600" y2="96" stroke="${C.ink}" stroke-width="2" opacity="0.12"/>
    <text x="60" y="120" font-size="11.5" font-weight="700" fill="${C.ink}" opacity="0.4" letter-spacing="1.4">NETWORK</text>
    <text x="230" y="120" font-size="11.5" font-weight="700" fill="${C.ink}" opacity="0.4" letter-spacing="1.4">LATENCY</text>
    <text x="330" y="120" font-size="11.5" font-weight="700" fill="${C.ink}" opacity="0.4" letter-spacing="1.4">SIGNAL</text>
    <text x="524" y="120" font-size="11.5" font-weight="700" fill="${C.ink}" opacity="0.4" letter-spacing="1.4" text-anchor="end">€ / GB</text>
    <rect class="marker" x="40" y="120" width="560" height="46" rx="14" fill="${C.cyan}" opacity="0.14" stroke="${C.cyan}" stroke-width="2.5"/>
    ${rows}
    <line x1="40" y1="474" x2="600" y2="474" stroke="${C.ink}" stroke-width="2" opacity="0.12"/>
    <text x="60" y="502" font-size="12.5" font-weight="600" fill="${C.ink}" opacity="0.45">Re-priced every 30 s across 50+ Tier-1 networks</text>`;

    return {
      svg: svgWrap(inner),
      pills: [basePills[0]],
      init(root) {
        const svg = root.querySelector('svg');
        const rowEls = [...svg.querySelectorAll('.row')];
        const marker = svg.querySelector('.marker');
        const badge = root.querySelector('[data-role="carrier"]');
        let vals = CARRIERS.map(c => parseFloat(c.price.replace('€', '')));
        const tick = () => {
          vals = vals.map(v => Math.min(0.62, Math.max(0.24, v + (Math.random() - 0.5) * 0.06)));
          let best = 0;
          vals.forEach((v, k) => { if (v < vals[best]) best = k; });
          rowEls.forEach((el, k) => {
            const t = el.querySelector('.price');
            t.textContent = `€${vals[k].toFixed(2)}`;
            t.setAttribute('fill', k === best ? C.cyanDeep : C.ink);
            el.querySelector('.badge').setAttribute('opacity', k === best ? '1' : '0');
            el.querySelector('.ping').textContent = `${14 + Math.round(Math.random() * 22)} ms`;
          });
          marker.style.transform = `translateY(${best * 62 + 8}px)`;
          if (badge) badge.textContent = `${CARRIERS[best].name} · Active`;
        };
        tick();
        const t = setInterval(tick, 2200);
        return () => clearInterval(t);
      },
    };
  },
};

/* ─────────────────────────  8 · ROUTE ARCS  ─────────────────────────
   Different thinking: sell travel, not telecom hardware.              */
export const routes = {
  id: 'routes',
  name: 'Route Arcs',
  family: 'Reach',
  tagline: 'Sell the trip, not the SIM',
  desc: 'A dotted grid of the world with named destination nodes; arcs light up city → hub → city, continuously. It moves the hero away from telecom hardware toward the reason people buy: they are going somewhere and want it to just work.',
  pros: ['Emotional and aspirational, travel-first', 'Naturally supports destination landing pages', 'Reads instantly, zero explanation needed'],
  cons: ['Weakest at explaining multi-network switching', 'Dot grid needs care to avoid feeling generic'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const hub = [330, 286];
    const cities = [
      { n: 'Lisbon', x: 96, y: 150 },
      { n: 'Tokyo', x: 566, y: 132 },
      { n: 'New York', x: 74, y: 396 },
      { n: 'Dubai', x: 540, y: 400 },
      { n: 'São Paulo', x: 250, y: 486 },
      { n: 'London', x: 400, y: 96 },
    ];
    const dots = [];
    for (let gx = 0; gx <= 32; gx++) {
      for (let gy = 0; gy <= 18; gy++) {
        const x = 20 + gx * 19, y = 60 + gy * 24;
        const d = Math.hypot(x - hub[0], y - hub[1]);
        if (d > 262) continue;
        dots.push(`<circle cx="${x}" cy="${y}" r="2.1" fill="${C.cyanDeep}" opacity="${Math.max(0.07, 0.34 - d / 900).toFixed(3)}"/>`);
      }
    }
    const arcs = cities.map((c, i) => {
      const mx = (c.x + hub[0]) / 2, my = (c.y + hub[1]) / 2 - 70;
      const d = `M ${c.x} ${c.y} Q ${mx} ${my} ${hub[0]} ${hub[1]}`;
      const dur = 3.4;
      const begin = (i * dur) / cities.length;
      return `
      <path d="${d}" fill="none" stroke="${C.cyanDeep}" stroke-width="3" opacity="0.34"/>
      <path d="${d}" fill="none" stroke="${C.cyan}" stroke-width="4" stroke-linecap="round" opacity="0.95" stroke-dasharray="86 400">
        <animate attributeName="stroke-dashoffset" values="486;0" dur="${dur}s" begin="${begin.toFixed(2)}s" repeatCount="indefinite"/>
      </path>
      <circle r="4.5" fill="${C.white}" stroke="${C.cyan}" stroke-width="2">
        <animateMotion dur="${dur}s" begin="${begin.toFixed(2)}s" repeatCount="indefinite" path="${d}"/>
      </circle>
      <g transform="translate(${c.x} ${c.y})">
        <circle r="16" fill="none" stroke="${C.cyan}" stroke-width="2.5" opacity="0">
          <animate attributeName="r" values="7;24;24" keyTimes="0;0.18;1" dur="${dur}s" begin="${begin.toFixed(2)}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;0;0" keyTimes="0;0.18;1" dur="${dur}s" begin="${begin.toFixed(2)}s" repeatCount="indefinite"/>
        </circle>
        <circle r="8" fill="${C.white}" stroke="${C.ink}" stroke-width="2.5"/>
        <circle r="3.2" fill="${C.cyanDeep}"/>
        <text x="0" y="-24" font-size="13" font-weight="700" fill="${C.ink}" text-anchor="middle" opacity="0.72">${c.n}</text>
      </g>`;
    }).join('');
    const inner = `
    ${glow(hub[0], hub[1], 190, uid)}
    <g>${dots.join('')}</g>
    ${arcs}
    ${chip({ x: hub[0], y: hub[1], scale: 0.66, pins: false })}`;
    return {
      svg: svgWrap(inner),
      pills: [
        basePills[0],
        pill('white', `${icon('globe')}200+ Destinations`, { bottom: '20px', right: '20px' }),
      ],
    };
  },
};

/* ─────────────────────────  9 · eSIM WALLET  ─────────────────────────
   Different thinking: show the product surface, not a metaphor.       */
export const wallet = {
  id: 'wallet',
  name: 'eSIM Wallet',
  family: 'Product truth',
  tagline: 'A stack of networks you own',
  desc: 'A wallet of carrier eSIM cards shuffles: the active card sits front in Openline cyan with signal and price, the rest fan behind it. Tangible, physical, and it makes “multiple networks, one SIM” a thing you can almost hold.',
  pros: ['Most tangible: an object, not a diagram', 'Reusable in app store shots and ads', 'Depth and shadow add perceived quality'],
  cons: ['Cards compete with the headline for attention', 'Needs real carrier names or neutral labels for legal'],
  scores: { story: 5, motion: 4, perf: 4, mobile: 4, brand: 4, ease: 3 },
  build: (uid) => {
    const cards = CARRIERS.map((c, i) => `
      <g class="wcard" data-w="${i}">
        <rect x="-130" y="-84" width="260" height="168" rx="24" fill="${C.white}" stroke="${C.ink}" stroke-width="3.5"/>
        <rect class="face" x="-130" y="-84" width="260" height="168" rx="24" fill="${C.cyan}" opacity="0"/>
        <rect class="wchip" x="-100" y="-52" width="56" height="42" rx="8" fill="${C.cyanDeep}" opacity="0.9"/>
        <path class="wtrace" d="M -86 -52 L -86 -10 M -72 -52 L -72 -10 M -100 -38 L -44 -38 M -100 -24 L -44 -24" stroke="${C.ink}" stroke-width="1.6" opacity="0.35"/>
        <text class="wname" x="-100" y="26" font-size="21" font-weight="700" fill="${C.ink}">${c.name}</text>
        <text class="wmeta" x="-100" y="52" font-size="13.5" font-weight="600" fill="${C.ink}" opacity="0.55">${c.ping} · ${c.price}/GB</text>
        ${[0, 1, 2, 3].map(b => `<rect class="wbar" x="${58 + b * 11}" y="${28 - (8 + b * 7)}" width="7" height="${8 + b * 7}" rx="2" fill="${C.cyanDeep}" opacity="${0.35 + b * 0.16}"/>`).join('')}
        <text class="wactive" x="-100" y="-64" font-size="11" font-weight="700" fill="${C.white}" opacity="0" letter-spacing="1.6">ACTIVE NETWORK</text>
      </g>`).join('');
    const inner = `
    ${glow(360, 280, 200, uid)}
    <g transform="translate(360 280)">${cards}</g>`;
    return {
      svg: svgWrap(inner),
      pills: [basePills[0], basePills[3]],
      init(root) {
        const svg = root.querySelector('svg');
        const els = [...svg.querySelectorAll('.wcard')];
        const badge = root.querySelector('[data-role="carrier"]');
        const n = els.length;
        let top = 0;
        const layout = () => {
          els.forEach((el, k) => {
            const d = (k - top + n) % n;               // 0 = front
            const x = d * 26, y = d * -16, rot = d * -3.2, sc = 1 - d * 0.045;
            el.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${sc})`;
            el.style.opacity = d > 3 ? 0 : 1 - d * 0.14;
            el.style.zIndex = n - d;
            el.classList.toggle('front', d === 0);
            // keep DOM order = paint order
            if (d === 0) el.parentNode.appendChild(el);
          });
          // repaint back-to-front
          [...els].sort((a, b) => {
            const da = (els.indexOf(a) - top + n) % n, db = (els.indexOf(b) - top + n) % n;
            return db - da;
          }).forEach(el => el.parentNode.appendChild(el));
          if (badge) badge.textContent = `${CARRIERS[top].name} · Active`;
        };
        layout();
        const t = setInterval(() => { top = (top + 1) % n; layout(); }, 2600);
        return () => clearInterval(t);
      },
    };
  },
};

/* ─────────────────────────  10 · KINETIC HUD  ─────────────────────────
   Different thinking: the AI is the hero, expressed as live telemetry. */
export const hud = {
  id: 'hud',
  name: 'Kinetic HUD',
  family: 'Data-led',
  tagline: 'Make the AI visibly working',
  desc: 'Live telemetry as the artwork: networks scanned per second, current latency, current €/GB, and a signal trace that draws itself endlessly. Almost weightless, sharp on any screen, and it makes the AI claim feel measured rather than asserted.',
  pros: ['Lightest of all ten; excellent LCP and mobile', 'Numbers imply proof and continuous work', 'Trivial to wire to real API values later'],
  cons: ['Least illustrative; needs strong typography discipline', 'Fake-looking if the numbers never plausibly move'],
  scores: { story: 3, motion: 4, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: (uid) => {
    const trace = 'M 40 470 C 110 470 120 400 175 400 C 230 400 240 330 300 330 C 355 330 365 265 425 265 C 485 265 495 200 560 200';
    const inner = `
    ${glow(330, 300, 220, uid)}
    <text x="40" y="112" font-size="12.5" font-weight="700" fill="${C.cyanDeep}" letter-spacing="2.2">OPENLINE AI · LIVE</text>
    <g>
      <text class="k1" x="40" y="192" font-size="66" font-weight="700" fill="${C.ink}">18<tspan font-size="26" opacity="0.5"> ms</tspan></text>
      <text x="40" y="220" font-size="13" font-weight="600" fill="${C.ink}" opacity="0.45">current latency · Vodafone NL</text>
    </g>
    <g>
      <text class="k2" x="330" y="192" font-size="66" font-weight="700" fill="${C.cyanDeep}">€0.38</text>
      <text x="330" y="220" font-size="13" font-weight="600" fill="${C.ink}" opacity="0.45">best price per GB right now</text>
    </g>
    <g>
      <text class="k3" x="40" y="290" font-size="30" font-weight="700" fill="${C.ink}">1 284</text>
      <text x="40" y="314" font-size="13" font-weight="600" fill="${C.ink}" opacity="0.45">network checks this minute</text>
    </g>
    <path d="${trace}" fill="none" stroke="${C.ink}" stroke-width="2" opacity="0.12"/>
    <path d="${trace}" fill="none" stroke="${C.cyan}" stroke-width="4" stroke-linecap="round" stroke-dasharray="180 900">
      <animate attributeName="stroke-dashoffset" values="1080;0" dur="4.5s" repeatCount="indefinite"/>
    </path>
    <circle r="6" fill="${C.cyan}"><animateMotion dur="4.5s" repeatCount="indefinite" path="${trace}"/></circle>
    ${[40, 175, 300, 425, 560].map((x, i) => `<circle cx="${x}" cy="${[470, 400, 330, 265, 200][i]}" r="3.5" fill="${C.cyanDeep}" opacity="0.35"/>`).join('')}
    ${chip({ x: 566, y: 486, scale: 0.3, pins: false })}`;
    return {
      svg: svgWrap(inner),
      pills: [basePills[0]],
      init(root) {
        const svg = root.querySelector('svg');
        const k1 = svg.querySelector('.k1'), k2 = svg.querySelector('.k2'), k3 = svg.querySelector('.k3');
        let checks = 1284;
        const t = setInterval(() => {
          const ms = 14 + Math.round(Math.random() * 12);
          k1.innerHTML = `${ms}<tspan font-size="26" opacity="0.5"> ms</tspan>`;
          k2.textContent = `€${(0.32 + Math.random() * 0.12).toFixed(2)}`;
          checks += 3 + Math.round(Math.random() * 9);
          k3.textContent = checks.toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, ' ');
        }, 1400);
        return () => clearInterval(t);
      },
    };
  },
};

export const VARIANTS2 = [failover, board, routes, wallet, hud];
