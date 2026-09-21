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

/* ─────────────────────────  11 · NEVER NOTICED  ─────────────────────────
   Different thinking: the switch as the customer experiences it — on the
   status bar of their own phone, with the call still running.            */
export const noticed = {
  id: 't1h-noticed',
  name: 'Never Noticed',
  family: 'Product truth',
  tagline: 'The handover from the customer’s side of the glass',
  desc: 'One phone fills the frame: a call timer running past four minutes, a live waveform, and the carrier name in the status bar changing from Vodafone to Orange to T-Mobile while the timer never resets. The page claims transitions in milliseconds you will not even notice — this shows that claim from the only surface a customer ever looks at, instead of from a network diagram.',
  pros: ['Answers the question the copy raises: will I feel the switch', 'A phone UI is legible at any width, including 390 px', 'Uses the real carrier names and a status bar people already read'],
  cons: ['A handset mock-up dates fast and invites OS nitpicking', 'Deliberately undramatic — the point is that nothing happens', 'Drops the chip motif, so it breaks continuity with the rest of the hero'],
  scores: { story: 5, motion: 3, perf: 4, mobile: 5, brand: 4, ease: 3 },
  build: (uid) => {
    const wave = Array.from({ length: 15 }, (_, i) => {
      const h = 12 + ((i * 11) % 38);
      const x = 214 + i * 14;
      const hi = h + 24, lo = Math.max(8, h - 6);
      const y0 = (300 - h / 2).toFixed(1), y1 = (300 - hi / 2).toFixed(1), y2 = (300 - lo / 2).toFixed(1);
      const d = (1.3 + (i % 5) * 0.24).toFixed(2), b = (i * 0.08).toFixed(2);
      return `<rect x="${x}" y="${y0}" width="7" height="${h}" rx="3.5" fill="${C.cyan}" opacity="0.9">
        <animate attributeName="height" values="${h};${hi};${lo};${h}" dur="${d}s" begin="${b}s" repeatCount="indefinite"/>
        <animate attributeName="y" values="${y0};${y1};${y2};${y0}" dur="${d}s" begin="${b}s" repeatCount="indefinite"/>
      </rect>`;
    }).join('');
    const sigBars = [0, 1, 2, 3].map(b => {
      const h = 5 + b * 4;
      return `<rect x="${392 + b * 7}" y="${92 - h}" width="4.5" height="${h}" rx="1.5" fill="${C.white}" opacity="0.8"/>`;
    }).join('');
    const inner = `
    ${glow(320, 280, 214, uid)}
    <rect x="178" y="36" width="284" height="488" rx="38" fill="${C.ink}"/>
    <rect x="188" y="46" width="264" height="468" rx="30" fill="#101016"/>
    <rect x="292" y="58" width="56" height="9" rx="4.5" fill="#000" opacity="0.9"/>
    <!-- status bar -->
    <text class="sbname" x="208" y="92" font-size="13.5" font-weight="700" fill="${C.white}" opacity="0.85">Vodafone</text>
    <text x="278" y="92" font-size="11.5" font-weight="700" fill="${C.cyan}" opacity="0.9">5G</text>
    ${sigBars}
    <rect x="422" y="82" width="20" height="11" rx="3" fill="none" stroke="${C.white}" stroke-width="1.6" opacity="0.6"/>
    <rect x="424" y="84" width="13" height="7" rx="1.5" fill="${C.white}" opacity="0.7"/>
    <line x1="208" y1="108" x2="442" y2="108" stroke="${C.white}" stroke-width="1" opacity="0.1"/>
    <!-- the call -->
    <text x="208" y="146" font-size="11.5" font-weight="700" fill="${C.white}" opacity="0.4" letter-spacing="1.8">ON A CALL</text>
    <text class="ctime" x="208" y="200" font-size="46" font-weight="700" fill="${C.white}">04:37</text>
    <text x="208" y="228" font-size="12.5" font-weight="600" fill="${C.white}" opacity="0.4">Lisbon to Berlin · HD voice</text>
    <rect x="204" y="252" width="232" height="96" rx="18" fill="${C.white}" opacity="0.05"/>
    ${wave}
    <text x="214" y="376" font-size="11.5" font-weight="700" fill="${C.white}" opacity="0.35" letter-spacing="1.6">NETWORK</text>
    <text x="428" y="376" font-size="11.5" font-weight="700" fill="${C.cyan}" opacity="0.85" text-anchor="end" letter-spacing="1.2">AUTO</text>
    <line x1="208" y1="392" x2="442" y2="392" stroke="${C.white}" stroke-width="1" opacity="0.1"/>
    <!-- the switch notice -->
    <g class="toast" opacity="0">
      <rect x="204" y="416" width="232" height="60" rx="16" fill="${C.cyan}" opacity="0.16"/>
      <rect x="204" y="416" width="232" height="60" rx="16" fill="none" stroke="${C.cyan}" stroke-width="1.8" opacity="0.8"/>
      <circle cx="230" cy="446" r="5" fill="${C.cyan}"/>
      <text class="ttext" x="248" y="442" font-size="13" font-weight="700" fill="${C.white}">Switched to Orange</text>
      <text x="248" y="461" font-size="11" font-weight="600" fill="${C.white}" opacity="0.45">call unaffected</text>
    </g>
    <text x="320" y="548" font-size="13" font-weight="600" fill="${C.ink}" opacity="0.45" text-anchor="middle">Three networks in four minutes. The timer never restarted.</text>`;
    return {
      svg: svgWrap(inner),
      pills: [basePills[0], basePills[1]],
      init(root) {
        const svg = root.querySelector('svg');
        const nameEl = svg.querySelector('.sbname');
        const timeEl = svg.querySelector('.ctime');
        const toast = svg.querySelector('.toast');
        const toastText = svg.querySelector('.ttext');
        const badge = root.querySelector('[data-role="carrier"]');
        const timers = [];
        let secs = 277, i = 0;
        const two = (n) => (n < 10 ? '0' + n : '' + n);
        const fmt = (n) => two(Math.floor(n / 60)) + ':' + two(n % 60);
        timeEl.textContent = fmt(secs);
        const tick = setInterval(() => { secs += 1; timeEl.textContent = fmt(secs); }, 1000);
        const swap = setInterval(() => {
          i = (i + 1) % CARRIERS.length;
          const nm = CARRIERS[i].name;
          nameEl.textContent = nm;
          toastText.textContent = 'Switched to ' + nm;
          toast.setAttribute('opacity', '1');
          if (badge) badge.textContent = `${nm} · Active`;
          timers.push(setTimeout(() => toast.setAttribute('opacity', '0'), 1600));
        }, 3400);
        return () => { clearInterval(tick); clearInterval(swap); timers.forEach(clearTimeout); };
      },
    };
  },
};

/* ─────────────────────────  12 · ROLL CALL  ─────────────────────────
   Different thinking: no illustration and no chart — the roster of real
   operator names is the picture, and its length is the argument.        */
export const rollCall = {
  id: 't1h-rollcall',
  name: 'Roll Call',
  family: 'Scale',
  tagline: 'The roster, read out loud',
  desc: 'Three columns of real operator names scroll slowly upward — Vodafone, MTN, stc, du, giffgaff, NTT Docomo, Safaricom — and each name turns cyan as it passes through a fixed evaluation band across the middle of the frame. The page claims 200+ partner operators and 50+ Tier-1 networks; this is the only option where you can actually read them.',
  pros: ['Makes the size of the pool a fact you can check rather than a number in a pill', 'Pure SMIL, no JS, and almost no payload', 'Names the regional carriers the page lists but no animation has ever shown'],
  cons: ['No product, no chip, no motion beyond a slow scroll', 'Every name shown is a legal and partnership claim that has to be true', 'Three columns of 13 px type are hard work at 390 px'],
  scores: { story: 3, motion: 4, perf: 5, mobile: 3, brand: 3, ease: 5 },
  build: (uid) => {
    const names = [
      ['Vodafone', 'Orange', 'T-Mobile', 'Telefónica', 'MEO', 'Movistar', 'Swisscom', 'Proximus', 'Telenor', 'Telia', 'A1', 'TIM', 'Turkcell'],
      ['MTN Group', 'Vodacom', 'Zain', 'stc', 'Mobily', 'du', 'e&amp;', 'Etisalat', 'Safaricom', 'Airtel', 'Ooredoo', 'Orange Egypt', 'Telkom'],
      ['China Mobile', 'NTT Docomo', 'SoftBank', 'KDDI', 'SK Telecom', 'Telstra', 'SingTel', 'UQ Mobile', 'Jio', 'Optus', 'Virgin Mobile', 'giffgaff', 'Lycamobile'],
    ];
    const step = 32, colX = [56, 250, 444], top = 130;
    const cycle = names[0].length * step;
    const column = (list, k, fill, weight, op) => {
      const rows = list.concat(list).map((n, i) =>
        `<text x="${colX[k]}" y="${top + i * step}" font-size="15" font-weight="${weight}" fill="${fill}" opacity="${op}">${n}</text>`).join('');
      const dur = [26, 31, 36][k];
      return `<g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 ${-cycle}" dur="${dur}s" repeatCount="indefinite"/>
        ${rows}
      </g>`;
    };
    const inner = `
    <defs>
      <clipPath id="area-${uid}"><rect x="30" y="108" width="580" height="384" rx="10"/></clipPath>
      <clipPath id="band-${uid}"><rect x="30" y="286" width="580" height="46" rx="12"/></clipPath>
    </defs>
    ${glow(320, 300, 218, uid)}
    <text x="56" y="56" font-size="12.5" font-weight="700" fill="${C.cyanDeep}" letter-spacing="2.2">200+ PARTNER OPERATORS · 50+ TIER-1 NETWORKS</text>
    <text x="56" y="86" font-size="13" font-weight="600" fill="${C.ink}" opacity="0.45">Every one of them checked before a single byte moves</text>
    <text x="584" y="86" font-size="11" font-weight="700" fill="${C.cyanDeep}" text-anchor="end" letter-spacing="1.6">EVALUATING NOW</text>
    <rect x="30" y="286" width="580" height="46" rx="12" fill="${C.cyan}" opacity="0.1"/>
    <rect x="30" y="286" width="580" height="46" rx="12" fill="none" stroke="${C.cyan}" stroke-width="2"/>
    <g clip-path="url(#area-${uid})">
      ${names.map((l, k) => column(l, k, C.ink, 600, 0.38)).join('')}
    </g>
    <g clip-path="url(#band-${uid})">
      ${names.map((l, k) => column(l, k, C.cyanDeep, 700, 1)).join('')}
    </g>
    <line x1="30" y1="508" x2="610" y2="508" stroke="${C.ink}" stroke-width="2" opacity="0.1"/>
    <text x="56" y="536" font-size="12.5" font-weight="600" fill="${C.ink}" opacity="0.45">Competitors sell you one of these. Openline buys from all of them.</text>`;
    return { svg: svgWrap(inner), pills: [basePills[0]] };
  },
};

/* ─────────────────────────  13 · RENT OR OWN  ─────────────────────────
   Different thinking: leave the abstract layer entirely and draw the
   physical thing the page defines — who owns the antenna.               */
export const rentOrOwn = {
  id: 't1h-own',
  name: 'Rent Or Own',
  family: 'Category',
  tagline: 'Who actually owns the antenna',
  desc: 'Two halves at ground level. Above the divider, a virtual operator: one grey mast reached through a wholesale contract it does not control. Below it, Openline: three cyan masts with their own foundations, and the beam moving between them. The page spends a whole section on Tier-1 operators owning towers rather than reselling capacity, and no animation has drawn a tower yet.',
  pros: ['Argues the category, not the feature — competitors cannot copy the claim', 'A mast is a concrete object, so the frame reads at a glance', 'Gives the Tier-1 definition section a picture it currently lacks'],
  cons: ['Two stacked halves means a comparison layout, which this board already has twice', 'Says nothing about price', 'Masts need to stay schematic or they start to look like clip art'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const mast = (x, base, h, col, op) => {
      const top = base - h, w = 26;
      const bars = [0, 1, 2].map(i => `<rect x="${x - 16 + i * 12}" y="${top - 16}" width="5" height="16" rx="2.5" fill="${col}" opacity="${op}"/>`).join('');
      const rungs = [0.28, 0.5, 0.72, 0.9].map(f => {
        const y = top + h * f, hw = (w / 2) * f;
        return `<line x1="${x - hw}" y1="${y}" x2="${x + hw}" y2="${y}" stroke="${col}" stroke-width="2" opacity="${op}"/>`;
      }).join('');
      return `<g>
        <line x1="${x - w / 2}" y1="${base}" x2="${x}" y2="${top}" stroke="${col}" stroke-width="3" opacity="${op}"/>
        <line x1="${x + w / 2}" y1="${base}" x2="${x}" y2="${top}" stroke="${col}" stroke-width="3" opacity="${op}"/>
        ${rungs}${bars}
      </g>`;
    };
    const owned = [382, 480, 578];
    const beams = owned.map((x, i) => {
      const d = `M 210 406 C 290 406 ${x - 60} 460 ${x} 452`;
      const bg = (i * 2).toFixed(1);
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.04;0.28;0.33;1" dur="6s" begin="${bg}s" repeatCount="indefinite"/>
        <path d="${d}" fill="none" stroke="${C.cyan}" stroke-width="4" stroke-linecap="round" stroke-dasharray="12 10">
          <animate attributeName="stroke-dashoffset" values="0;-44" dur="0.9s" repeatCount="indefinite"/>
        </path>
        <circle cx="${x}" cy="${452 - 128 - 16}" r="12" fill="none" stroke="${C.cyan}" stroke-width="3">
          <animate attributeName="r" values="10;30" dur="1.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.7;0" dur="1.4s" repeatCount="indefinite"/>
        </circle>
        <text x="${x}" y="${452 + 26}" font-size="11.5" font-weight="700" fill="${C.cyanDeep}" text-anchor="middle">LIVE</text>
      </g>`;
    }).join('');
    const inner = `
    ${glow(420, 400, 190, uid)}
    <text x="40" y="52" font-size="12.5" font-weight="700" fill="${C.cyanDeep}" letter-spacing="2.2">WHO OWNS THE ANTENNA</text>
    <!-- upper half: the reseller -->
    <text x="40" y="96" font-size="17" font-weight="700" fill="${C.ink}" opacity="0.55">A virtual operator</text>
    <text x="40" y="118" font-size="12" font-weight="700" fill="${C.ink}" opacity="0.32" letter-spacing="1.4">RENTS CAPACITY · ONE LANDLORD · NO CONTROL</text>
    <line x1="40" y1="230" x2="610" y2="230" stroke="${C.gray}" stroke-width="2.5" opacity="0.3"/>
    ${mast(520, 230, 96, C.gray, 0.4)}
    <rect x="200" y="156" width="150" height="52" rx="13" fill="${C.white}" stroke="${C.gray}" stroke-width="2" opacity="0.8"/>
    <text x="216" y="180" font-size="11" font-weight="700" fill="${C.ink}" opacity="0.4" letter-spacing="1.2">WHOLESALE</text>
    <text x="216" y="198" font-size="13" font-weight="700" fill="${C.ink}" opacity="0.5">one contract</text>
    <path d="M 90 200 L 196 190" stroke="${C.gray}" stroke-width="3" stroke-dasharray="5 8" opacity="0.4"/>
    <path d="M 354 184 L 498 214" stroke="${C.gray}" stroke-width="3" stroke-dasharray="5 8" opacity="0.4"/>
    <circle cx="82" cy="202" r="9" fill="${C.white}" stroke="${C.gray}" stroke-width="2.5" opacity="0.7"/>
    <text x="82" y="226" font-size="11" font-weight="700" fill="${C.ink}" opacity="0.3" text-anchor="middle">a customer</text>
    <text x="520" y="256" font-size="11.5" font-weight="700" fill="${C.ink}" opacity="0.32" text-anchor="middle">SOMEBODY ELSE’S TOWER</text>
    <line x1="30" y1="292" x2="610" y2="292" stroke="${C.ink}" stroke-width="2" opacity="0.1"/>
    <!-- lower half: Openline -->
    <text x="40" y="332" font-size="17" font-weight="700" fill="${C.ink}">Openline</text>
    <text x="40" y="354" font-size="12" font-weight="700" fill="${C.cyanDeep}" letter-spacing="1.4">OPERATORS THAT OWN THEIR ANTENNAS</text>
    <line x1="40" y1="452" x2="610" y2="452" stroke="${C.ink}" stroke-width="3" opacity="0.5"/>
    ${owned.map(x => mast(x, 452, 128, C.cyanDeep, 0.9)).join('')}
    ${beams}
    ${chip({ x: 160, y: 406, scale: 0.42, pins: false })}
    <text x="382" y="504" font-size="11.5" font-weight="700" fill="${C.ink}" opacity="0.4" text-anchor="middle">Vodafone</text>
    <text x="480" y="504" font-size="11.5" font-weight="700" fill="${C.ink}" opacity="0.4" text-anchor="middle">Orange</text>
    <text x="578" y="504" font-size="11.5" font-weight="700" fill="${C.ink}" opacity="0.4" text-anchor="middle">T-Mobile</text>
    <text x="40" y="540" font-size="12.5" font-weight="600" fill="${C.ink}" opacity="0.45">Resellers rent one network. We buy from the operators that own three.</text>`;
    return { svg: svgWrap(inner), pills: [basePills[0], basePills[1]] };
  },
};

/* ─────────────────────────  14 · DIP BUY  ─────────────────────────
   Different thinking: use the claim the page makes and no animation has
   touched — the wholesale data market, traded 24/7.                     */
export const dipBuy = {
  id: 't1h-dip',
  name: 'Dip Buy',
  family: 'Market',
  tagline: 'The trade that makes the price low',
  desc: 'A wholesale price track builds candle by candle, the AI fires a buy at the low of the run, and the fill is marked at $0.94/GB with −34% against the 30-day average. The page already describes mobile data as a market traded by OMDM; this explains why Openline is cheap instead of asserting it, which nothing else in the hero attempts.',
  pros: ['Explains the mechanism behind the lowest-price claim, not just the claim', 'A trading chart signals competence without a word of copy', 'Extends the OMDM story the rest of the page spends a whole section on'],
  cons: ['Reads as finance, not travel — the wrong register for a consumer hero', 'Prices here are in dollars because the OMDM panel is, while the rest of the board is in euros', 'Candles are small and dense, so 390 px loses most of the detail', 'Overlaps the dedicated OMDM board, so Paul may see this idea twice'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 2, brand: 3, ease: 2 },
  build: (uid) => {
    const dur = 12;
    const series = [1.42, 1.38, 1.44, 1.31, 1.26, 1.33, 1.21, 1.14, 1.18, 1.06, 0.98, 1.02, 0.94, 0.97, 1.05, 1.12, 1.09, 1.16];
    const x0 = 86, x1 = 596, yTop = 150, yBot = 408, hi = 1.52, lo = 0.84, dip = 12;
    const px = (i) => x0 + (i / (series.length - 1)) * (x1 - x0);
    const py = (v) => yBot - ((v - lo) / (hi - lo)) * (yBot - yTop);
    const candles = series.map((v, i) => {
      const o = i === 0 ? 1.46 : series[i - 1];
      const down = v <= o;
      const col = down ? C.cyanDeep : C.gray;
      const yA = py(Math.max(o, v)), yB = py(Math.min(o, v));
      const h = Math.max(4, yB - yA);
      const w = 16;
      const on = (0.04 + (i / series.length) * 0.5).toFixed(3);
      const on2 = (0.07 + (i / series.length) * 0.5).toFixed(3);
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${on2};1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <line x1="${px(i).toFixed(1)}" y1="${(yA - 12).toFixed(1)}" x2="${px(i).toFixed(1)}" y2="${(yA + h + 12).toFixed(1)}" stroke="${col}" stroke-width="2" opacity="0.6"/>
        <rect x="${(px(i) - w / 2).toFixed(1)}" y="${yA.toFixed(1)}" width="${w}" height="${h.toFixed(1)}" rx="3" fill="${col}" opacity="${down ? 0.95 : 0.35}"/>
      </g>`;
    }).join('');
    const grid = [0.9, 1.1, 1.3, 1.5].map(v => `
      <line x1="${x0 - 8}" y1="${py(v).toFixed(1)}" x2="${x1 + 10}" y2="${py(v).toFixed(1)}" stroke="${C.ink}" stroke-width="1" opacity="0.09"/>
      <text x="${x0 - 18}" y="${(py(v) + 4).toFixed(1)}" font-size="11" font-weight="700" fill="${C.ink}" opacity="0.35" text-anchor="end">$${v.toFixed(2)}</text>`).join('');
    const dx = px(dip).toFixed(1), dy = py(series[dip]).toFixed(1);
    const inner = `
    ${glow(340, 300, 216, uid)}
    <text x="40" y="54" font-size="12.5" font-weight="700" fill="${C.cyanDeep}" letter-spacing="2.2">OMDM™ · WHOLESALE DATA MARKET · LIVE</text>
    <text x="40" y="84" font-size="13" font-weight="600" fill="${C.ink}" opacity="0.45">Thousands of buys a day, across networks and regions</text>
    ${grid}
    ${candles}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.58;0.64;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <line x1="${dx}" y1="${dy}" x2="${dx}" y2="456" stroke="${C.cyan}" stroke-width="2" stroke-dasharray="4 6"/>
      <circle cx="${dx}" cy="${dy}" r="9" fill="${C.cyan}" stroke="${C.ink}" stroke-width="2"/>
      <circle cx="${dx}" cy="${dy}" r="12" fill="none" stroke="${C.cyan}" stroke-width="3">
        <animate attributeName="r" values="12;34" dur="1.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0" dur="1.6s" repeatCount="indefinite"/>
      </circle>
      <rect x="${(px(dip) - 78).toFixed(1)}" y="458" width="156" height="42" rx="12" fill="${C.cyan}"/>
      <text x="${dx}" y="484" font-size="14" font-weight="700" fill="${C.white}" text-anchor="middle">FILLED @ $0.94/GB</text>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.7;0.76;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <text x="${x1 + 10}" y="${(py(1.44) + 4).toFixed(1)}" font-size="12.5" font-weight="700" fill="${C.ink}" opacity="0.4" text-anchor="end">30-day average $1.42</text>
      <rect x="86" y="112" width="116" height="30" rx="9" fill="${C.cyanDeep}"/>
      <text x="144" y="133" font-size="14" font-weight="700" fill="${C.white}" text-anchor="middle">-34%</text>
    </g>
    <text x="40" y="534" font-size="12.5" font-weight="600" fill="${C.ink}" opacity="0.5">The AI buys at the dip — and the saving reaches your price.</text>
    ${chip({ x: 588, y: 522, scale: 0.24, pins: false })}`;
    return { svg: svgWrap(inner), pills: [basePills[0]] };
  },
};

/* ─────────────────────────  15 · BEST SIGNAL WINS  ─────────────────────────
   Different thinking: one instrument, held large, on the only dark frame
   on the board. Uses the page's own 94 / 88 / 71 network scores.         */
export const dial = {
  id: 't1h-dial',
  name: 'Best Signal Wins',
  family: 'Single gesture',
  tagline: 'One instrument, three scores, a needle that keeps moving',
  desc: 'A dark panel with a single gauge on it. The needle swings between the page’s own network scores — Vodafone 5G at 94, Orange 5G at 88, T-Mobile LTE at 71 — and the winning row lights beneath it. One idea at full size, no diagram, no cards, and the only frame on the board that is not white.',
  pros: ['The only dark option, so it stands apart from every other tile', 'One gesture, so it survives at 390 px with nothing removed', 'Pure SMIL: no JS, no timers, no restarts'],
  cons: ['A dark block on a white page needs the section around it to agree', 'Shows the scoring, not the switching or the price', 'Gauges are a familiar device and can read as a dashboard cliché'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 3, ease: 4 },
  build: (uid) => {
    const cx = 320, cy = 342, R = 158, A0 = 200, SPAN = 140;
    const pt = (deg) => {
      const r = (deg * Math.PI) / 180;
      return [(cx + R * Math.cos(r)).toFixed(1), (cy + R * Math.sin(r)).toFixed(1)];
    };
    const p0 = pt(A0), p1 = pt(A0 + SPAN);
    const arcLen = (R * SPAN * Math.PI) / 180;
    const rot = (s) => (A0 + (s / 100) * SPAN).toFixed(1) + ' ' + cx + ' ' + cy;
    const off = (s) => (arcLen * (1 - s / 100)).toFixed(1);
    const KT = '0;0.30;0.33;0.63;0.66;0.96;1';
    const cands = [['Vodafone', '5G', 94], ['Orange', '5G', 88], ['T-Mobile', 'LTE', 71]];
    const seq = [0, 0, 1, 1, 2, 2, 0];
    const rotVals = seq.map(k => rot(cands[k][2])).join(';');
    const offVals = seq.map(k => off(cands[k][2])).join(';');
    const arcPath = `M ${p0[0]} ${p0[1]} A ${R} ${R} 0 0 1 ${p1[0]} ${p1[1]}`;
    const big = cands.map(([nm, tech, sc], k) => {
      const ops = seq.map(s => (s === k ? '1' : '0')).join(';');
      return `<g opacity="${k === 0 ? 1 : 0}">
        <animate attributeName="opacity" values="${ops}" keyTimes="${KT}" dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        <text x="${cx}" y="${cy - 26}" font-size="82" font-weight="700" fill="${C.cyan}" text-anchor="middle">${sc}</text>
        <text x="${cx}" y="${cy + 14}" font-size="18" font-weight="700" fill="${C.white}" text-anchor="middle">${nm} ${tech}</text>
      </g>`;
    }).join('');
    const rows = cands.map(([nm, tech, sc], k) => {
      const y = 416 + k * 34;
      return `<g>
        <text x="72" y="${y}" font-size="14.5" font-weight="700" fill="${C.white}" opacity="0.7">${nm}</text>
        <text x="200" y="${y}" font-size="11.5" font-weight="700" fill="${C.white}" opacity="0.35" letter-spacing="1.2">${tech}</text>
        <rect x="248" y="${y - 11}" width="240" height="8" rx="4" fill="${C.white}" opacity="0.12"/>
        <rect x="248" y="${y - 11}" width="${(sc / 100 * 240).toFixed(0)}" height="8" rx="4" fill="${C.cyan}" opacity="0.75"/>
        <text x="568" y="${y}" font-size="14.5" font-weight="700" fill="${C.white}" opacity="0.8" text-anchor="end">${sc}</text>
      </g>`;
    }).join('');
    const hlVals = seq.map(k => `0 ${k * 34}`).join(';');
    const inner = `
    <rect x="20" y="28" width="600" height="504" rx="32" fill="${C.ink}"/>
    <rect x="20" y="28" width="600" height="504" rx="32" fill="none" stroke="${C.white}" stroke-width="1.5" opacity="0.1"/>
    <text x="52" y="78" font-size="12" font-weight="700" fill="${C.cyan}" letter-spacing="2.2">EVALUATING EVERY SECOND</text>
    <text x="588" y="78" font-size="12" font-weight="700" fill="${C.white}" opacity="0.32" letter-spacing="1.6" text-anchor="end">SIGNAL SCORE</text>
    <path d="${arcPath}" fill="none" stroke="${C.white}" stroke-width="16" stroke-linecap="round" opacity="0.1"/>
    <path d="${arcPath}" fill="none" stroke="${C.cyan}" stroke-width="16" stroke-linecap="round" stroke-dasharray="${arcLen.toFixed(1)}">
      <animate attributeName="stroke-dashoffset" values="${offVals}" keyTimes="${KT}" dur="9s" repeatCount="indefinite"/>
    </path>
    <g transform="rotate(${rot(94)})">
      <animateTransform attributeName="transform" type="rotate" values="${rotVals}" keyTimes="${KT}" dur="9s" repeatCount="indefinite"/>
      <circle cx="${cx + R}" cy="${cy}" r="13" fill="${C.white}" stroke="${C.ink}" stroke-width="3"/>
    </g>
    ${big}
    <line x1="52" y1="386" x2="588" y2="386" stroke="${C.white}" stroke-width="1.5" opacity="0.1"/>
    <g>
      <animateTransform attributeName="transform" type="translate" values="${hlVals}" keyTimes="${KT}" dur="9s" repeatCount="indefinite" calcMode="discrete"/>
      <rect x="52" y="398" width="536" height="28" rx="9" fill="${C.cyan}" opacity="0.16"/>
    </g>
    ${rows}
    <text x="52" y="512" font-size="12" font-weight="600" fill="${C.white}" opacity="0.35">Best signal wins. You never choose, and never configure anything.</text>`;
    return { svg: svgWrap(inner), pills: [basePills[0]] };
  },
};

export const VARIANTS2 = [failover, board, routes, wallet, hud,
  noticed, rollCall, rentOrOwn, dipBuy, dial];
