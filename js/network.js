/* ══ /network · hero + "Why Our Network is Different" ════════════════ */

import { G, gWrap, bloom, dots, phone, mono, label, card, gPill, gIcon } from './g-shared.js';

const pillsN = (top = 'Enterprise Grade', bottom = '99.9% Uptime') => {
  const out = [gPill('orange', `${gIcon('shield')}${top}`, { top: '14px', right: '14px' })];
  if (bottom) out.push(gPill('white', `<span class="dot"></span>${bottom}`, { bottom: '20px', right: '18px' }));
  return out;
};

const CARRIERS = [
  { n: 'Vodafone', ping: '18 ms', mbps: 214 },
  { n: 'Orange', ping: '24 ms', mbps: 188 },
  { n: 'T-Mobile', ping: '21 ms', mbps: 236 },
  { n: 'Telefónica', ping: '27 ms', mbps: 171 },
];

/* the black mast the live hero draws */
const mast = (x, y, s = 1, on = false) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <path d="M 0 -46 L -26 34 L 26 34 Z" fill="${on ? G.orange : G.ink}"/>
    <path d="M -14 4 L 14 4 M -20 20 L 20 20" stroke="${G.wash}" stroke-width="3" opacity="0.5"/>
    <circle cy="-52" r="6" fill="${G.orange}"/>
  </g>`;

/* ══════════════════════ HERO · 0 · CURRENT ══════════════════════ */
export const netCurrent = {
  id: 'net-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'Phone, three masts, dotted lines',
  desc: 'A phone with signal bars in the middle, three black masts around it, dotted connectors and a soft orange bloom. It is a clean diagram of "several towers, one device", but the dotted lines never carry anything, nothing ever switches, and the masts are all equally inactive — so the two claims in the headline, reliability and automatic switching, are both left unproven.',
  pros: ['Clean, balanced composition that reads instantly', 'Already matches the rest of the page perfectly'],
  cons: ['Completely static — the connectors carry no traffic', 'Nothing switches, so "automatic network switching" is unillustrated', 'Reliability is a claim about time, and nothing here shows time passing', 'All three masts look identical and idle'],
  scores: { story: 3, motion: 1, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const inner = `
    ${dots(uid)}
    ${bloom(320, 230, 200, uid)}
    ${[[320, 108, 0.82], [172, 318, 0.9], [468, 318, 0.9]].map(m => `
      <path d="M 320 230 L ${m[0]} ${m[1]}" stroke="${G.gray}" stroke-width="2" stroke-dasharray="3 6" opacity="0.6"/>
      ${mast(m[0], m[1], m[2])}`).join('')}
    ${phone({
      x: 320, y: 230, w: 92, h: 176, glowId: uid, screen: `
      <rect x="0" y="0" width="82" height="166" fill="${G.orange}"/>
      <g transform="translate(22 108)">
        ${[0, 1, 2, 3].map(i => `<rect x="${i * 11}" y="${-8 - i * 9}" width="7" height="${8 + i * 9}" rx="2" fill="${G.white}"/>`).join('')}
      </g>` })}`;
    return { svg: gWrap(inner), pills: pillsN() };
  },
};

/* ══════════════════════ HERO · 1 · MAST HANDOFF ══════════════════════ */
export const handoff = {
  id: 'handoff',
  name: 'Mast Handoff',
  family: 'Narrative',
  tagline: 'The switch, happening, on a loop',
  desc: 'The same three masts, but one is always live: its signal cone lights, packets stream down the connector, the carrier name and latency appear beside it, and every 2.8 seconds the network hands off to the next mast while the phone\'s bars stay full throughout. Smallest possible change to what is live, and it turns the diagram into proof.',
  pros: ['Proves automatic switching literally, with no copy', 'Full bars through every handoff is the reliability argument', 'Same masts, same phone, same composition — tiny diff to ship', 'Carrier names and latencies make it feel measured, not drawn'],
  cons: ['Needs the handoff cadence tuned or it reads as instability', 'Three masts caps it at three carriers'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 4, brand: 5, ease: 5 },
  build: (uid) => {
    const masts = [
      { x: 320, y: 118, s: 0.82, path: 'M 320 168 L 320 200', above: true },
      { x: 158, y: 308, s: 0.9, path: 'M 174 258 L 294 238' },
      { x: 482, y: 308, s: 0.9, path: 'M 466 258 L 346 238' },
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 230, 210, uid)}
    ${masts.map((m, i) => `
      <g class="nm" data-nm="${i}">
        <path d="${m.path}" stroke="${G.gray}" stroke-width="2" stroke-dasharray="3 6" opacity="0.55"/>
        <g class="up">
          <path d="${m.path}" stroke="${G.orange}" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="10 9">
            <animate attributeName="stroke-dashoffset" values="0;-19" dur="0.75s" repeatCount="indefinite"/>
          </path>
          ${[0, 0.35].map(b => `<circle r="4.5" fill="${G.orange}"><animateMotion dur="0.95s" begin="${b}s" repeatCount="indefinite" path="${m.path}"/></circle>`).join('')}
        </g>
        <!-- signal cone -->
        <g class="cone">
          <path d="M ${m.x} ${m.y - 52} l -46 -30 a 78 78 0 0 1 92 0 Z" fill="${G.orange}" opacity="0.18"/>
          <circle cx="${m.x}" cy="${m.y - 52}" r="10" fill="none" stroke="${G.orange}" stroke-width="2.5">
            <animate attributeName="r" values="8;28" dur="1.6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;0" dur="1.6s" repeatCount="indefinite"/>
          </circle>
        </g>
        ${mast(m.x, m.y, m.s)}
        <g class="mtag" transform="translate(${m.x + (m.above ? 96 : 0)} ${m.above ? m.y - 66 : m.y + 56})">
          <text text-anchor="middle" font-size="14.5" font-weight="700" fill="${G.ink}" class="mname" opacity="0.4">${CARRIERS[i].n}</text>
          <text y="19" text-anchor="middle" font-size="11" font-weight="700" class="mping" opacity="0.3" fill="${G.ink}"
            style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${CARRIERS[i].ping}</text>
        </g>
      </g>`).join('')}
    ${phone({
      x: 320, y: 230, w: 96, h: 182, glowId: uid, screen: `
      <rect x="0" y="0" width="86" height="172" fill="${G.orange}"/>
      <g transform="translate(23 112)">
        ${[0, 1, 2, 3].map(i => `<rect x="${i * 11}" y="${-8 - i * 9}" width="7" height="${8 + i * 9}" rx="2" fill="${G.white}"/>`).join('')}
      </g>
      ${mono(43, 44, 'LOCKED', { size: 8.5, anchor: 'middle', fill: G.white, op: 0.7 })}
      <g transform="translate(43 138)">
        <rect x="-34" y="-11" width="68" height="22" rx="11" fill="${G.white}" opacity="0.22"/>
        <text y="4" text-anchor="middle" font-size="9" font-weight="700" fill="${G.white}" letter-spacing="0.5"
          style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><tspan data-role="nlive">VODAFONE</tspan></text>
      </g>` })}
    <g transform="translate(40 396)">
      <rect x="0" y="0" width="212" height="34" rx="17" fill="${G.ink}"/>
      <text x="106" y="22" text-anchor="middle" font-size="11.5" font-weight="700" fill="${G.white}"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><tspan data-role="nsw">SWITCHED 147× TODAY</tspan></text>
    </g>`;

    return {
      svg: gWrap(inner),
      pills: pillsN('Auto-Switch', ''),
      init(root) {
        const ms = [...root.querySelectorAll('.nm')];
        const live = root.querySelector('[data-role="nlive"]');
        if (!ms.length) return null;
        let i = 0;
        const tick = () => {
          ms.forEach((m, k) => m.classList.toggle('on', k === i));
          if (live) live.textContent = CARRIERS[i].n.toUpperCase();
          i = (i + 1) % ms.length;
        };
        tick();
        const id = setInterval(tick, 2800);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════════════ HERO · 2 · UPTIME TRACE ══════════════════════ */
export const uptime = {
  id: 'uptime',
  name: 'Uptime Trace',
  family: 'Reliability',
  tagline: 'One unbroken line, whatever fails',
  desc: 'A continuous signal trace scrolls across the frame with a live 99.9% readout. Underneath, three carrier lanes take turns carrying it — and one of them drops out completely, going red, while the trace above never so much as dips because another carrier picked it up. The headline says "most reliable"; this is reliability as a measurement rather than an adjective.',
  pros: ['Directly visualises the 99.9% SLA in the stat row', 'The unbroken line through a visible failure is the whole argument', 'Feels like monitoring, which is the most credible register for this claim', 'Never pauses: the trace always scrolls'],
  cons: ['Introduces one alarm red into a warm palette', 'Abstract — no phone, no masts, so it loses the hardware cue'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 4, brand: 3, ease: 4 },
  build: (uid) => {
    const wave = 'M 0 0 C 26 -22 52 18 78 0 C 104 -24 130 16 156 0 C 182 -20 208 20 234 0 C 260 -22 286 18 312 0';
    const inner = `
    ${dots(uid)}
    ${bloom(320, 170, 220, uid)}
    ${mono(40, 46, 'NETWORK UPTIME · LIVE', { size: 10.5, op: 0.32 })}

    <!-- the trace -->
    <g transform="translate(40 172)">
      <rect x="0" y="-84" width="560" height="168" rx="20" fill="${G.white}" stroke="${G.line}" stroke-width="1.5"/>
      <line x1="24" y1="0" x2="536" y2="0" stroke="${G.line}" stroke-width="1.5" stroke-dasharray="4 6"/>
      <g transform="translate(24 0)">
        <svg x="0" y="-70" width="512" height="140" viewBox="0 0 512 140" overflow="hidden">
          <g transform="translate(0 70)">
            <g>
              <path d="${wave}" fill="none" stroke="${G.orange}" stroke-width="3.2" stroke-linecap="round"/>
              <path d="${wave}" fill="none" stroke="${G.orange}" stroke-width="3.2" stroke-linecap="round" transform="translate(312 0)"/>
              <path d="${wave}" fill="none" stroke="${G.orange}" stroke-width="3.2" stroke-linecap="round" transform="translate(624 0)"/>
              <animateTransform attributeName="transform" type="translate" values="0,0;-312,0" dur="3.2s" repeatCount="indefinite" calcMode="linear"/>
            </g>
          </g>
        </svg>
      </g>
      <text x="536" y="-48" text-anchor="end" font-size="32" font-weight="700" fill="${G.deep}"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">99.9%</text>
      ${mono(536, -28, 'NEVER DROPPED', { size: 9, anchor: 'end', op: 0.4 })}
    </g>

    <!-- carrier lanes underneath -->
    ${mono(40, 288, 'CARRYING IT RIGHT NOW', { size: 10, op: 0.32 })}
    ${[0, 1, 2].map(i => `
      <g class="ul" data-ul="${i}" transform="translate(40 ${302 + i * 40})">
        <rect x="0" y="0" width="560" height="32" rx="10" fill="${G.white}" stroke="${G.line}" stroke-width="1.5" class="ushell"/>
        <circle cx="20" cy="16" r="6" fill="${G.gray}" class="udot"/>
        <text x="38" y="21" font-size="13" font-weight="700" fill="${G.ink}" opacity="0.7">${CARRIERS[i].n}</text>
        <g class="ubar" transform="translate(150 16)">
          <line x1="0" y1="0" x2="330" y2="0" stroke="${G.line}" stroke-width="4" stroke-linecap="round"/>
          <line x1="0" y1="0" x2="330" y2="0" stroke="${G.orange}" stroke-width="4" stroke-linecap="round"
            stroke-dasharray="14 10" class="uflow" opacity="0">
            <animate attributeName="stroke-dashoffset" values="0;-24" dur="0.7s" repeatCount="indefinite"/>
          </line>
        </g>
        <text x="540" y="21" text-anchor="end" font-size="11" font-weight="700" class="ustate" fill="${G.ink}" opacity="0.3"
          style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">STANDBY</text>
      </g>`).join('')}`;

    return {
      svg: gWrap(inner),
      pills: pillsN('99.9% SLA', ''),
      init(root) {
        const ls = [...root.querySelectorAll('.ul')];
        if (!ls.length) return null;
        let i = 0, phase = 0;
        const set = (el, s) => {
          el.querySelector('.udot').setAttribute('fill', s === 'on' ? '#FF5314' : s === 'dead' ? '#DC2626' : '#9CA3AF');
          el.querySelector('.ushell').setAttribute('stroke', s === 'on' ? '#FF5314' : s === 'dead' ? '#DC2626' : '#E5E7EB');
          el.querySelector('.uflow').setAttribute('opacity', s === 'on' ? '1' : '0');
          const st = el.querySelector('.ustate');
          st.textContent = s === 'on' ? 'CARRYING' : s === 'dead' ? 'OUTAGE' : 'STANDBY';
          st.setAttribute('opacity', s === 'standby' ? '0.3' : '0.9');
          st.setAttribute('fill', s === 'dead' ? '#DC2626' : s === 'on' ? '#E23D00' : '#0B0B0F');
        };
        const tick = () => {
          ls.forEach(l => set(l, 'standby'));
          set(ls[i], 'on');
          if (phase % 3 === 2) set(ls[(i + 1) % ls.length], 'dead');
          i = (i + 1) % ls.length;
          phase++;
        };
        tick();
        const id = setInterval(tick, 2600);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════════════ HERO · 3 · COVERAGE ARCS ══════════════════════ */
export const arcs = {
  id: 'netarcs',
  name: 'Coverage Arcs',
  family: 'Reach',
  tagline: '190+ countries, as a place not a number',
  desc: 'A dotted globe turns slowly while named cities light up in sequence and arcs fire from each one into the device at the centre. It answers the question the stat row raises — 190+ countries, but where? — and puts an actual destination in the visitor\'s head, which is what they are really shopping for.',
  pros: ['Turns the 190+ stat into somewhere the visitor might be going', 'Continuous rotation means there is never a dead frame', 'The most emotionally warm of the six', 'Reusable on the storefront and the country pages'],
  cons: ['Says nothing about switching or reliability specifically', 'City labels need localising with the rest of the page'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 4, brand: 4, ease: 3 },
  build: (uid) => {
    const cities = [
      { a: -140, r: 168, n: 'Tokyo' },
      { a: -78, r: 182, n: 'Lisbon' },
      { a: -26, r: 160, n: 'Dubai' },
      { a: 34, r: 176, n: 'São Paulo' },
      { a: 96, r: 166, n: 'Cape Town' },
      { a: 152, r: 180, n: 'New York' },
    ];
    const cx = 340, cy = 232;
    const pt = c => [cx + Math.cos(c.a * Math.PI / 180) * c.r, cy + Math.sin(c.a * Math.PI / 180) * c.r * 0.72];
    const inner = `
    ${dots(uid)}
    ${bloom(cx, cy, 210, uid)}
    ${mono(40, 46, 'ONE eSIM · 190+ COUNTRIES', { size: 10.5, op: 0.32 })}

    <!-- globe -->
    <g transform="translate(${cx} ${cy})">
      <circle r="150" fill="none" stroke="${G.orange}" stroke-width="1.5" opacity="0.2"/>
      <circle r="150" fill="${G.orange}" opacity="0.03"/>
      ${[-100, -50, 0, 50, 100].map(y => `<ellipse cy="${y}" rx="${Math.sqrt(Math.max(0, 150 * 150 - y * y))}" ry="8" fill="none" stroke="${G.orange}" stroke-width="1.2" opacity="0.14"/>`).join('')}
      <g>
        ${[0, 1, 2, 3].map(i => `<ellipse rx="${38 + i * 36}" ry="150" fill="none" stroke="${G.orange}" stroke-width="1.2" opacity="0.14"/>`).join('')}
        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="42s" repeatCount="indefinite"/>
      </g>
    </g>

    <!-- city nodes + arcs -->
    ${cities.map((c, i) => {
      const [x, y] = pt(c);
      const d = `M ${x.toFixed(1)} ${y.toFixed(1)} Q ${((x + cx) / 2).toFixed(1)} ${(Math.min(y, cy) - 58).toFixed(1)} ${cx} ${cy}`;
      const b = (i * 6.6 / cities.length).toFixed(2);
      return `
      <path d="${d}" fill="none" stroke="${G.orange}" stroke-width="2" opacity="0.16"/>
      <path d="${d}" fill="none" stroke="${G.orange}" stroke-width="2.6" stroke-linecap="round"
        stroke-dasharray="240" stroke-dashoffset="240">
        <animate attributeName="stroke-dashoffset" values="240;0;0;240" dur="6.6s" begin="${b}s"
          keyTimes="0;0.22;0.62;1" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0;0.95;0.95;0" dur="6.6s" begin="${b}s"
          keyTimes="0;0.10;0.62;1" repeatCount="indefinite"/>
      </path>
      <circle r="4.5" fill="${G.orange}">
        <animateMotion dur="6.6s" begin="${b}s" keyTimes="0;0.22;1" keyPoints="0;1;1" calcMode="linear" path="${d}" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;1;0;0" dur="6.6s" begin="${b}s" keyTimes="0;0.20;0.24;1" repeatCount="indefinite"/>
      </circle>
      <g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">
        <circle r="6" fill="${G.white}" stroke="${G.orange}" stroke-width="2.5"/>
        <circle r="6" fill="none" stroke="${G.orange}" stroke-width="2">
          <animate attributeName="r" values="6;20;20" dur="6.6s" begin="${b}s" keyTimes="0;0.16;1" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.9;0;0" dur="6.6s" begin="${b}s" keyTimes="0;0.16;1" repeatCount="indefinite"/>
        </circle>
        <text ${x > cx ? 'x="14"' : 'x="-14" text-anchor="end"'} y="5" font-size="12.5" font-weight="700" fill="${G.ink}" opacity="0.55">${c.n}</text>
      </g>`;
    }).join('')}

    <!-- the device at the centre -->
    ${phone({
      x: cx, y: cy, w: 78, h: 150, glowId: uid, screen: `
      <rect x="0" y="0" width="68" height="140" fill="${G.orange}"/>
      <g transform="translate(17 92)">
        ${[0, 1, 2, 3].map(i => `<rect x="${i * 9}" y="${-6 - i * 7}" width="6" height="${6 + i * 7}" rx="2" fill="${G.white}"/>`).join('')}
      </g>
      ${mono(34, 36, 'ONLINE', { size: 7.5, anchor: 'middle', fill: G.white, op: 0.75 })}` })}

    <g transform="translate(40 396)">
      <rect x="0" y="0" width="198" height="34" rx="17" fill="${G.ink}"/>
      <text x="99" y="22" text-anchor="middle" font-size="11.5" font-weight="700" fill="${G.white}"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><tspan data-role="ncity">LISBON · CONNECTED</tspan></text>
    </g>`;

    return {
      svg: gWrap(inner),
      pills: pillsN('190+ countries', 'Same quality everywhere'),
      init(root) {
        const el = root.querySelector('[data-role="ncity"]');
        if (!el) return null;
        const names = ['TOKYO', 'LISBON', 'DUBAI', 'SÃO PAULO', 'CAPE TOWN', 'NEW YORK'];
        let i = 0;
        const id = setInterval(() => { el.textContent = `${names[i]} · CONNECTED`; i = (i + 1) % names.length; }, 1100);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════════════ HERO · 4 · SPEED RACE ══════════════════════ */
export const race = {
  id: 'netrace',
  name: 'Speed Race',
  family: 'Data-led',
  tagline: 'Openline against a single carrier',
  desc: 'Four carrier bars grow and shrink live with real-looking Mbps values, and the Openline bar always tracks whichever is currently fastest while a single-carrier bar beside it is stuck with whatever it got. The stat row already claims 5G-ready and fastest speeds; this is the only option that shows a number being won rather than asserted.',
  pros: ['Puts a measurable number behind "fastest speeds"', 'Bars are the clearest possible motion — instantly readable', 'Cheapest of the six to build and to render', 'Trivially wired to real speed-test data later'],
  cons: ['Loses the hardware motif entirely — no masts, no phone', 'Invented numbers need replacing with real ones before launch', 'Implicitly compares against competitors — check the claim wording'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 3, ease: 5 },
  build: (uid) => {
    const bw = 62, gap = 26, x0 = 96, base = 340, maxH = 210;
    const bars = [...CARRIERS.map(c => ({ ...c, kind: 'c' })), { n: 'Openline', mbps: 236, kind: 'o' }];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 250, 220, uid)}
    ${mono(40, 46, 'LIVE THROUGHPUT · SAME LOCATION', { size: 10.5, op: 0.32 })}
    <line x1="56" y1="${base}" x2="600" y2="${base}" stroke="${G.line}" stroke-width="2"/>
    ${[50, 100, 150, 200].map(v => `
      <line x1="56" y1="${base - (v / 250) * maxH}" x2="600" y2="${base - (v / 250) * maxH}"
        stroke="${G.line}" stroke-width="1" stroke-dasharray="3 6" opacity="0.8"/>
      ${mono(52, base - (v / 250) * maxH + 4, String(v), { size: 8.5, anchor: 'end', op: 0.28 })}`).join('')}
    ${bars.map((b, i) => {
      const x = x0 + i * (bw + gap);
      const o = b.kind === 'o';
      return `
      <g data-bar="${i}">
        <rect x="${x}" y="${base - 80}" width="${bw}" height="80" rx="8"
          fill="${o ? G.orange : G.gray}" opacity="${o ? 1 : 0.35}" data-bh="${i}"/>
        ${o ? `<rect x="${x - 4}" y="${base - 232}" width="${bw + 8}" height="232" rx="10" fill="none"
          stroke="${G.orange}" stroke-width="2" stroke-dasharray="5 6" opacity="0.5"/>` : ''}
        <text x="${x + bw / 2}" y="${base + 22}" text-anchor="middle" font-size="11.5" font-weight="700"
          fill="${o ? G.deep : G.ink}" opacity="${o ? 1 : 0.5}">${b.n}</text>
        <text x="${x + bw / 2}" y="${base + 40}" text-anchor="middle" font-size="10.5" font-weight="700"
          fill="${G.ink}" opacity="0.32" style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"
          data-bv="${i}">0</text>
      </g>`;
    }).join('')}
    <g transform="translate(40 404)">
      <rect x="0" y="0" width="252" height="34" rx="17" fill="${G.ink}"/>
      <text x="126" y="22" text-anchor="middle" font-size="11.5" font-weight="700" fill="${G.white}"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><tspan data-role="rwin">OPENLINE PICKED T-MOBILE</tspan></text>
    </g>
`;

    return {
      svg: gWrap(inner),
      pills: pillsN('5G Ready', ''),
      init(root) {
        const rects = [...root.querySelectorAll('[data-bh]')];
        const vals = [...root.querySelectorAll('[data-bv]')];
        const win = root.querySelector('[data-role="rwin"]');
        if (!rects.length) return null;
        const base = 340, maxH = 210;
        const tick = () => {
          const ms = CARRIERS.map(c => Math.round(c.mbps * (0.72 + Math.random() * 0.42)));
          const best = Math.max(...ms);
          const bi = ms.indexOf(best);
          const all = [...ms, best];
          all.forEach((v, i) => {
            const h = Math.max(14, Math.min(maxH, (v / 250) * maxH));
            const r = rects[i];
            r.style.transition = 'y .8s cubic-bezier(.2,.7,.3,1), height .8s cubic-bezier(.2,.7,.3,1)';
            r.setAttribute('height', String(h));
            r.setAttribute('y', String(base - h));
            vals[i].textContent = String(v);
          });
          if (win) win.textContent = `OPENLINE PICKED ${CARRIERS[bi].n.toUpperCase()}`;
        };
        tick();
        const id = setInterval(tick, 1700);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════════════ HERO · 5 · CARRIER MESH ══════════════════════ */
export const mesh = {
  id: 'netmesh',
  name: 'Carrier Mesh',
  family: 'Premium / texture',
  tagline: '50+ carriers as one surface',
  desc: 'A field of fifty carrier nodes breathes gently behind the device. A single beam reaches from the centre to whichever node is currently strongest and slides between them without ever letting go, while the rest of the mesh keeps pulsing. Pure texture, no storytelling — the calmest and most premium of the six, and the only one that makes "50+" look like fifty.',
  pros: ['Makes the 50+ carrier claim visible as quantity, not a number', 'Beautiful at rest — good for a hero someone screenshots', 'Never sits still, but never demands attention either', 'Scales with the carrier count without redesign'],
  cons: ['No explicit story — leans entirely on the headline', 'Fifty animated nodes is the heaviest paint cost of the six'],
  scores: { story: 3, motion: 5, perf: 3, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const nodes = [];
    let k = 0;
    for (let r = 0; r < 6; r++) {
      const count = r % 2 ? 8 : 9;
      for (let c = 0; c < count; c++) {
        const x = 78 + c * 62 + (r % 2 ? 31 : 0);
        const y = 96 + r * 54;
        const dist = Math.hypot(x - 320, y - 230);
        if (dist < 62) continue;
        nodes.push({ x, y, d: (k++ % 9) * 0.26 });
      }
    }
    const inner = `
    ${dots(uid)}
    ${bloom(320, 230, 230, uid)}
    ${mono(40, 46, '50+ TIER-1 CARRIERS · ONE SURFACE', { size: 10.5, op: 0.32 })}
    <g>
      ${nodes.map(n => `
        <circle cx="${n.x}" cy="${n.y}" r="5.5" fill="${G.orange}" opacity="0.2">
          <animate attributeName="opacity" values="0.16;0.62;0.16" dur="3.4s" begin="${n.d.toFixed(2)}s" repeatCount="indefinite"/>
          <animate attributeName="r" values="4.5;7;4.5" dur="3.4s" begin="${n.d.toFixed(2)}s" repeatCount="indefinite"/>
        </circle>`).join('')}
    </g>
    <!-- the live beam -->
    <g data-beam>
      <line x1="320" y1="230" x2="320" y2="230" stroke="${G.orange}" stroke-width="3" stroke-linecap="round"
        opacity="0.9" data-beamline/>
      <circle r="12" fill="none" stroke="${G.orange}" stroke-width="2.5" data-beamring cx="320" cy="230">
        <animate attributeName="r" values="9;24" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.9;0" dur="1.5s" repeatCount="indefinite"/>
      </circle>
    </g>
    ${phone({
      x: 320, y: 230, w: 86, h: 164, glowId: uid, screen: `
      <rect x="0" y="0" width="76" height="154" fill="${G.orange}"/>
      <g transform="translate(19 100)">
        ${[0, 1, 2, 3].map(i => `<rect x="${i * 10}" y="${-7 - i * 8}" width="6.5" height="${7 + i * 8}" rx="2" fill="${G.white}"/>`).join('')}
      </g>
      ${mono(38, 38, 'STRONGEST', { size: 7.5, anchor: 'middle', fill: G.white, op: 0.8 })}
      <g transform="translate(38 126)">
        <rect x="-30" y="-10" width="60" height="20" rx="10" fill="${G.white}" opacity="0.22"/>
        <text y="4" text-anchor="middle" font-size="8" font-weight="700" fill="${G.white}"
          style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><tspan data-role="mname">ORANGE</tspan></text>
      </g>` })}
    <g transform="translate(40 402)">
      <rect x="0" y="0" width="226" height="34" rx="17" fill="${G.ink}"/>
      <text x="113" y="22" text-anchor="middle" font-size="11.5" font-weight="700" fill="${G.white}"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">ALWAYS ON THE BEST NODE</text>
    </g>`;

    return {
      svg: gWrap(inner),
      pills: pillsN('Enterprise Grade', '50+ carriers pooled'),
      init(root) {
        const line = root.querySelector('[data-beamline]');
        const ring = root.querySelector('[data-beamring]');
        const nm = root.querySelector('[data-role="mname"]');
        if (!line) return null;
        const targets = nodes.filter(n => Math.hypot(n.x - 320, n.y - 230) > 90);
        let i = 0;
        const tick = () => {
          const t = targets[i % targets.length];
          line.style.transition = 'all .7s cubic-bezier(.2,.7,.3,1)';
          ring.style.transition = 'all .7s cubic-bezier(.2,.7,.3,1)';
          line.setAttribute('x2', String(t.x));
          line.setAttribute('y2', String(t.y));
          ring.setAttribute('cx', String(t.x));
          ring.setAttribute('cy', String(t.y));
          if (nm) nm.textContent = CARRIERS[i % CARRIERS.length].n.toUpperCase();
          i++;
        };
        tick();
        const id = setInterval(tick, 1800);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════════════ HERO · 6 · NETWORK HUD ══════════════════════ */
export const hud = {
  id: 'nethud',
  name: 'Network HUD',
  family: 'Credibility',
  tagline: 'The control room, not the diagram',
  desc: 'A dark telemetry panel: active carrier, band, latency, throughput, switches today, a live uptime sparkline and a scrolling event log that records each handoff as it happens. Nothing is illustrated — the artwork is the readout. The most convincing register available for an enterprise-grade claim, and the cheapest to keep truthful because it can be wired to real values.',
  pros: ['Reads as infrastructure rather than marketing', 'The event log gives continuous, purposeful motion', 'Every element can be made real later instead of decorative', 'Strong contrast against the warm page — it pops'],
  cons: ['Dark panel is the biggest visual departure from the page', 'Dense: needs rows dropped on a phone', 'Only works if the numbers eventually become real'],
  scores: { story: 4, motion: 5, perf: 5, mobile: 3, brand: 3, ease: 4 },
  build: (uid) => {
    const W = G.white;
    const inner = `
    ${dots(uid)}
    <g transform="translate(34 46)">
      <rect x="0" y="0" width="572" height="368" rx="22" fill="${G.ink}"/>
      <rect x="0" y="0" width="572" height="44" rx="22" fill="${W}" opacity="0.04"/>
      <rect x="0" y="30" width="572" height="14" fill="${W}" opacity="0.04"/>
      <circle cx="24" cy="22" r="5" fill="#4ADE80"><animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite"/></circle>
      ${mono(40, 26, 'OPENLINE NETWORK · LIVE', { size: 10, fill: W, op: 0.55 })}
      ${mono(548, 26, 'EU-WEST', { size: 10, fill: W, op: 0.35, anchor: 'end' })}

      <!-- metric tiles -->
      ${[['ACTIVE CARRIER', 'hcar', 'Vodafone'], ['LATENCY', 'hlat', '18 ms'], ['THROUGHPUT', 'hthr', '214 Mbps'], ['SWITCHES TODAY', 'hsw', '147']].map((m, i) => `
        <g transform="translate(${20 + i * 134} 62)">
          <rect x="0" y="0" width="124" height="74" rx="14" fill="${W}" opacity="0.05"/>
          ${mono(14, 24, m[0], { size: 8.5, fill: W, op: 0.42 })}
          <text x="14" y="52" font-size="17" font-weight="700" fill="${i === 0 ? G.orange : W}"
            style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><tspan data-role="${m[1]}">${m[2]}</tspan></text>
        </g>`).join('')}

      <!-- uptime sparkline -->
      <g transform="translate(20 152)">
        <rect x="0" y="0" width="258" height="94" rx="14" fill="${W}" opacity="0.05"/>
        ${mono(14, 24, 'UPTIME · 30 DAYS', { size: 8.5, fill: W, op: 0.42 })}
        <text x="244" y="26" text-anchor="end" font-size="13" font-weight="700" fill="#4ADE80"
          style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">99.97%</text>
        <g transform="translate(14 74)">
          ${Array.from({ length: 30 }, (_, i) => {
      const h = 10 + ((i * 7) % 11) * 2.4 + (i === 11 ? -6 : 0);
      return `<rect x="${i * 7.6}" y="${-h}" width="5" height="${h}" rx="1.5" fill="${i === 11 ? '#F59E0B' : '#4ADE80'}" opacity="0.8">
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.8s" begin="${(i * 0.08).toFixed(2)}s" repeatCount="indefinite"/>
          </rect>`;
    }).join('')}
        </g>
      </g>

      <!-- carrier signal board -->
      <g transform="translate(294 152)">
        <rect x="0" y="0" width="258" height="94" rx="14" fill="${W}" opacity="0.05"/>
        ${mono(14, 24, 'POOL · SIGNAL', { size: 8.5, fill: W, op: 0.42 })}
        ${CARRIERS.map((c, i) => `
          <g transform="translate(14 ${40 + i * 13})">
            <text font-size="9" font-weight="700" fill="${W}" opacity="0.55"
              style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${c.n}</text>
            <g transform="translate(96 -3)">
              ${[0, 1, 2, 3, 4].map(b => `<rect x="${b * 9}" y="${-b * 1.6}" width="6" height="${4 + b * 1.6}" rx="1"
                fill="${G.orange}" opacity="${0.25 + b * 0.12}">
                <animate attributeName="opacity" values="${0.25 + b * 0.12};0.95;${0.25 + b * 0.12}" dur="2.6s"
                  begin="${(i * 0.3 + b * 0.14).toFixed(2)}s" repeatCount="indefinite"/></rect>`).join('')}
            </g>
            <text x="200" font-size="9" font-weight="700" fill="${W}" opacity="0.4"
              style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${c.ping}</text>
          </g>`).join('')}
      </g>

      <!-- event log -->
      <g transform="translate(20 262)">
        <rect x="0" y="0" width="532" height="88" rx="14" fill="${W}" opacity="0.05"/>
        ${mono(14, 22, 'EVENT LOG', { size: 8.5, fill: W, op: 0.42 })}
        <g data-log>
          ${[0, 1, 2].map(i => `
            <text x="14" y="${44 + i * 20}" font-size="10.5" font-weight="600" fill="${W}" opacity="${0.75 - i * 0.22}"
              style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace" data-logrow="${i}">—</text>`).join('')}
        </g>
      </g>
    </g>`;

    return {
      svg: gWrap(inner),
      pills: pillsN('Enterprise Grade', ''),
      init(root) {
        const rows = [...root.querySelectorAll('[data-logrow]')];
        const car = root.querySelector('[data-role="hcar"]');
        const lat = root.querySelector('[data-role="hlat"]');
        const thr = root.querySelector('[data-role="hthr"]');
        const sw = root.querySelector('[data-role="hsw"]');
        if (!rows.length) return null;
        let i = 0, n = 147;
        const log = [];
        const tick = () => {
          const from = CARRIERS[i % CARRIERS.length];
          const to = CARRIERS[(i + 1) % CARRIERS.length];
          const ms = 30 + Math.round(Math.random() * 28);
          const t = new Date(Date.now()).toISOString().slice(11, 19);
          log.unshift(`${t}  handoff ${from.n} → ${to.n}  ·  ${ms} ms  ·  no drop`);
          log.length = Math.min(log.length, 3);
          rows.forEach((r, k) => { r.textContent = log[k] || '—'; });
          if (car) car.textContent = to.n;
          if (lat) lat.textContent = `${to.ping}`;
          if (thr) thr.textContent = `${Math.round(to.mbps * (0.8 + Math.random() * 0.35))} Mbps`;
          n += 1;
          if (sw) sw.textContent = String(n);
          i++;
        };
        tick();
        const id = setInterval(tick, 2100);
        return () => clearInterval(id);
      },
    };
  },
};

/* ════════════════════════════════════════════════════════════════════
   "WHY OUR NETWORK IS DIFFERENT" — the left panel beside the 4 cards
   ════════════════════════════════════════════════════════════════════ */

const pillsWhy = () => [
  gPill('white', `<span class="dot"></span>190+ countries · all live`, { bottom: '20px', left: '18px' }),
];

const GRID_C = 14, GRID_R = 8, CELL = 30;
const gx = (c) => 108 + c * CELL;
const gy = (r) => 118 + r * CELL;

export const whyCurrent = {
  id: 'why-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'A grid of squares twinkling at random',
  desc: 'A field of small rounded squares in assorted orange tints, fading in and out on random timers, with a "190+ countries · ALL LIVE" badge pinned underneath. It is pleasant texture, but the twinkle is noise: nothing is being counted, nothing is being reached, and the four feature cards beside it — switching, 5G, redundancy, roaming — get no visual support at all.',
  pros: ['Pretty, cheap, and clearly alive', 'Abstract enough that it never contradicts the copy'],
  cons: ['Random twinkle communicates nothing specific', 'Not actually a map, so "190+ countries" is unsupported', 'None of the four adjacent feature cards are illustrated', 'No beginning or end, so nothing ever resolves'],
  scores: { story: 2, motion: 3, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const cells = [];
    for (let r = 0; r < GRID_R; r++) {
      for (let c = 0; c < GRID_C; c++) {
        const seed = (r * 7 + c * 13) % 11;
        const op = [0.1, 0.18, 0.3, 0.5, 0.75, 1][seed % 6];
        cells.push(`<rect x="${gx(c)}" y="${gy(r)}" width="21" height="21" rx="5" fill="${G.orange}" opacity="${op}">
          <animate attributeName="opacity" values="${op};${Math.min(1, op + 0.35)};${op}" dur="${(2.4 + seed * 0.22).toFixed(2)}s"
            begin="${(seed * 0.31).toFixed(2)}s" repeatCount="indefinite"/></rect>`);
      }
    }
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 200, uid)}
    ${cells.join('')}
    <g transform="translate(96 384)">
      <rect x="0" y="0" width="450" height="46" rx="14" fill="${G.white}" stroke="${G.ink}" stroke-width="2"/>
      <g transform="translate(22 23)">
        <path d="M 0 -7 a 7 7 0 0 1 14 0 c 0 6 -7 12 -7 12 s -7 -6 -7 -12 z" fill="none" stroke="${G.orange}" stroke-width="2"/>
      </g>
      <text x="52" y="29" font-size="15" font-weight="700" fill="${G.ink}">190+ countries</text>
      ${mono(428, 28, 'ALL LIVE', { size: 10, anchor: 'end', op: 0.45 })}
    </g>`;
    return { svg: gWrap(inner), pills: [] };
  },
};

/* 1 · COVERAGE SWEEP */
export const sweep = {
  id: 'whysweep',
  name: 'Coverage Sweep',
  family: 'Purposeful motion',
  tagline: 'The same grid, but counting something',
  desc: 'The identical field of squares, except a soft column sweep crosses it left to right, lighting each column as it passes and leaving it lit behind. A counter climbs with the sweep — 12 countries, 87, 190 — and a ticker names the country each column represents. Same artwork, same cost, but now the motion means "we checked every one of these".',
  pros: ['Almost no change to what is live — a sweep and a counter', 'Turns random twinkle into a measurable claim', 'The counter reaching 190+ gives the loop a real resolution', 'Country names put a place in the visitor\'s head'],
  cons: ['Still not a real map, so a sceptic can still ask where', 'The sweep needs to be slow enough not to feel like a scan line'],
  scores: { story: 4, motion: 5, perf: 5, mobile: 5, brand: 5, ease: 5 },
  build: (uid) => {
    const DUR = 6.4;
    const cells = [];
    for (let r = 0; r < GRID_R; r++) {
      for (let c = 0; c < GRID_C; c++) {
        const seed = (r * 7 + c * 13) % 11;
        const lit = [0.32, 0.5, 0.72, 0.95, 1][seed % 5];
        const t = 0.08 + (c / GRID_C) * 0.62;
        cells.push(`
        <rect x="${gx(c)}" y="${gy(r)}" width="21" height="21" rx="5" fill="${G.orange}" opacity="0.1"/>
        <rect x="${gx(c)}" y="${gy(r)}" width="21" height="21" rx="5" fill="${G.orange}" opacity="0">
          <animate attributeName="opacity" values="0;0;${lit};${lit};0" dur="${DUR}s"
            keyTimes="0;${t.toFixed(3)};${(t + 0.035).toFixed(3)};0.90;1" repeatCount="indefinite"/>
        </rect>`);
      }
    }
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 200, uid)}
    ${mono(108, 96, 'CHECKING EVERY NETWORK', { size: 10, op: 0.32 })}
    ${cells.join('')}
    <!-- the sweep itself -->
    <rect x="${gx(0) - 6}" y="${gy(0) - 8}" width="26" height="${GRID_R * CELL + 8}" fill="${G.orange}" opacity="0.14">
      <animate attributeName="x" values="${gx(0) - 6};${gx(GRID_C - 1) + 8};${gx(GRID_C - 1) + 8}" dur="${DUR}s"
        keyTimes="0;0.70;1" calcMode="linear" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.16;0.16;0;0" dur="${DUR}s" keyTimes="0;0.70;0.80;1" repeatCount="indefinite"/>
    </rect>
    <rect x="${gx(0) + 6}" y="${gy(0) - 8}" width="2.5" height="${GRID_R * CELL + 8}" fill="${G.orange}">
      <animate attributeName="x" values="${gx(0) + 6};${gx(GRID_C - 1) + 20};${gx(GRID_C - 1) + 20}" dur="${DUR}s"
        keyTimes="0;0.70;1" calcMode="linear" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;1;0;0" dur="${DUR}s" keyTimes="0;0.70;0.80;1" repeatCount="indefinite"/>
    </rect>

    <g transform="translate(96 384)">
      <rect x="0" y="0" width="450" height="46" rx="14" fill="${G.white}" stroke="${G.ink}" stroke-width="2"/>
      <text x="22" y="30" font-size="17" font-weight="700" fill="${G.deep}"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><tspan data-role="wcount">190+</tspan></text>
      <text x="92" y="29" font-size="15" font-weight="700" fill="${G.ink}">countries</text>
      <text x="428" y="29" text-anchor="end" font-size="10.5" font-weight="700" fill="${G.deep}" letter-spacing="1"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><tspan data-role="wname">ALL LIVE</tspan></text>
    </g>`;

    return {
      svg: gWrap(inner),
      pills: [],
      init(root) {
        const cnt = root.querySelector('[data-role="wcount"]');
        const nm = root.querySelector('[data-role="wname"]');
        if (!cnt) return null;
        const names = ['PORTUGAL', 'JAPAN', 'BRAZIL', 'KENYA', 'ITALY', 'THAILAND', 'CANADA', 'ALL LIVE'];
        const steps = ['12', '38', '71', '104', '138', '166', '190+', '190+'];
        let i = 0;
        const id = setInterval(() => {
          cnt.textContent = steps[i % steps.length];
          nm.textContent = names[i % names.length];
          i++;
        }, 800);
        return () => clearInterval(id);
      },
    };
  },
};

/* 2 · FAILOVER GRID */
export const failGrid = {
  id: 'whyfail',
  name: 'Failover Grid',
  family: 'Narrative',
  tagline: 'A carrier goes dark, neighbours cover it',
  desc: 'The grid becomes the carrier pool. Every few seconds a cluster of cells goes dark — an outage — and the cells around it immediately brighten to absorb the load, with a readout of "rerouted in 40 ms · session kept". Of the four feature cards beside this panel, redundancy is the one a customer actually worries about, and this is the only option that shows it.',
  pros: ['Illustrates the redundancy card, the one that sells reliability', 'A visible failure with no visible consequence is a strong proof', 'Keeps the existing grid artwork and cost', 'Gives the loop a clear beginning, crisis and resolution'],
  cons: ['Introduces a dark/alarm state into a warm panel', 'Showing outages at all is a tone decision worth a second opinion'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const cells = [];
    for (let r = 0; r < GRID_R; r++) {
      for (let c = 0; c < GRID_C; c++) {
        const seed = (r * 7 + c * 13) % 11;
        const op = [0.22, 0.34, 0.5, 0.7, 0.9][seed % 5];
        cells.push(`<rect data-cell="${r}-${c}" x="${gx(c)}" y="${gy(r)}" width="21" height="21" rx="5"
          fill="${G.orange}" opacity="${op}" data-base="${op}"/>`);
      }
    }
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 200, uid)}
    ${mono(108, 96, 'CARRIER POOL · SELF-HEALING', { size: 10, op: 0.32 })}
    ${cells.join('')}
    <g transform="translate(96 384)">
      <rect x="0" y="0" width="450" height="46" rx="14" fill="${G.white}" stroke="${G.ink}" stroke-width="2"/>
      <circle cx="26" cy="23" r="6" fill="#4ADE80" data-role="wdot"/>
      <text x="48" y="29" font-size="14.5" font-weight="700" fill="${G.ink}"><tspan data-role="wstate">All carriers nominal</tspan></text>
      ${mono(428, 28, '99.9% UPTIME', { size: 10, anchor: 'end', op: 0.45 })}
    </g>`;

    return {
      svg: gWrap(inner),
      pills: [],
      init(root) {
        const cells = [...root.querySelectorAll('[data-cell]')];
        const state = root.querySelector('[data-role="wstate"]');
        const dot = root.querySelector('[data-role="wdot"]');
        if (!cells.length) return null;
        const byKey = {};
        cells.forEach(el => { byKey[el.dataset.cell] = el; });
        cells.forEach(el => { el.style.transition = 'opacity .45s ease, fill .45s ease'; });
        const reset = () => cells.forEach(el => {
          el.setAttribute('fill', '#FF5314');
          el.setAttribute('opacity', el.dataset.base);
        });
        const timers = [];
        let round = 0;
        const cycle = () => {
          reset();
          if (state) state.textContent = 'All carriers nominal';
          if (dot) dot.setAttribute('fill', '#4ADE80');
          timers.push(setTimeout(() => {
            const r0 = 1 + (round * 3) % (GRID_R - 3);
            const c0 = 2 + (round * 5) % (GRID_C - 4);
            const dead = [];
            for (let r = r0; r < r0 + 2; r++) for (let c = c0; c < c0 + 3; c++) dead.push(`${r}-${c}`);
            dead.forEach(k => { const el = byKey[k]; if (el) { el.setAttribute('fill', '#0B0B0F'); el.setAttribute('opacity', '0.28'); } });
            // neighbours absorb the load
            for (let r = r0 - 1; r <= r0 + 2; r++) {
              for (let c = c0 - 1; c <= c0 + 3; c++) {
                const k = `${r}-${c}`;
                if (dead.includes(k)) continue;
                const el = byKey[k];
                if (el) el.setAttribute('opacity', '1');
              }
            }
            if (state) state.textContent = 'Rerouted in 40 ms · session kept';
            if (dot) dot.setAttribute('fill', '#F59E0B');
            round++;
          }, 1500));
          timers.push(setTimeout(cycle, 4200));
        };
        cycle();
        return () => timers.forEach(clearTimeout);
      },
    };
  },
};

/* 3 · FEATURE STACK */
export const stack = {
  id: 'whystack',
  name: 'Feature Stack',
  family: 'Feature-led',
  tagline: 'The four cards, animated in order',
  desc: 'Four labelled layers — Automatic Switching, LTE/5G, Redundancy, Global Roaming — stacked as a diagram of the network. Each lights in turn with its own small animation and its metric, in perfect step with the four cards sitting beside it. The panel stops being decorative texture and becomes a legend for the content next to it.',
  pros: ['One-to-one with the four cards, so the section finally coheres', 'Each layer earns its own beat instead of one generic loop', 'Scales if a fifth feature is ever added', 'Every label is already written — nothing new to localise'],
  cons: ['Most diagrammatic of the three; least atmospheric', 'Loses the map-ish feel of the current grid entirely', 'Tied to the card copy, so the two must change together'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 3 },
  build: (uid) => {
    const layers = [
      { t: 'Automatic Switching', m: 'Zero manual intervention' },
      { t: 'LTE / 5G Ready', m: 'Up to 1 Gbps' },
      { t: 'Redundancy Built-In', m: '99.9% uptime' },
      { t: 'Global Roaming', m: '190+ countries' },
    ];
    const LH = 72;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 230, 210, uid)}
    ${mono(70, 76, 'FOUR LAYERS · ONE NETWORK', { size: 10, op: 0.32 })}
    ${layers.map((l, i) => `
      <g class="sl" data-sl="${i}" transform="translate(70 ${100 + i * LH})">
        <rect x="0" y="0" width="500" height="${LH - 12}" rx="16" fill="${G.white}" stroke="${G.line}"
          stroke-width="1.5" class="sshell"/>
        <g transform="translate(22 ${(LH - 12) / 2})">
          <rect x="0" y="-17" width="34" height="34" rx="9" fill="${G.orange}" opacity="0.12" class="sicon"/>
          <g transform="translate(9 -8)" fill="none" stroke="${G.orange}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="sglyph">
            ${i === 0 ? '<path d="M 0 12 h 6 l 4 -10 l 4 10 h 6"/>'
        : i === 1 ? '<path d="M 1 14 V 11 M 6 14 V 7 M 11 14 V 2 M 16 14 V 6"/>'
          : i === 2 ? '<path d="M 8 0 l 8 3 v 6 c 0 4 -4 6 -8 7 c -4 -1 -8 -3 -8 -7 V 3 z"/>'
            : '<circle cx="8" cy="8" r="8"/><path d="M 0 8 h 16 M 8 0 a 12 10 0 0 0 0 16 a 12 10 0 0 0 0 -16"/>'}
          </g>
        </g>
        <text x="72" y="${(LH - 12) / 2 - 3}" font-size="15.5" font-weight="700" fill="${G.ink}">${l.t}</text>
        <text x="72" y="${(LH - 12) / 2 + 16}" font-size="11.5" font-weight="700" fill="${G.ink}" opacity="0.4" class="smeta"
          style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${l.m}</text>
        <!-- the per-layer motion, only visible when the layer is live -->
        <g class="sflow" opacity="0" transform="translate(320 ${(LH - 12) / 2})">
          <line x1="0" y1="0" x2="128" y2="0" stroke="${G.orange}" stroke-width="3" stroke-linecap="round"
            stroke-dasharray="12 9" opacity="0.5">
            <animate attributeName="stroke-dashoffset" values="0;-21" dur="0.7s" repeatCount="indefinite"/>
          </line>
          ${[0, 0.33, 0.66].map(b => `<circle r="4.5" fill="${G.orange}"><animateMotion dur="1.1s" begin="${b}s"
            repeatCount="indefinite" path="M 0 0 L 128 0"/></circle>`).join('')}
        </g>
        <g class="stick" opacity="0" transform="translate(468 ${(LH - 12) / 2})">
          <circle r="13" fill="${G.orange}"/>
          <path d="M -5 0.5 L -1.5 4 L 5.5 -3.5" fill="none" stroke="${G.white}" stroke-width="2.6"
            stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </g>`).join('')}`;

    return {
      svg: gWrap(inner),
      pills: pillsWhy(),
      init(root) {
        const ls = [...root.querySelectorAll('.sl')];
        if (!ls.length) return null;
        let i = 0;
        const tick = () => {
          ls.forEach((l, k) => {
            const on = k === i;
            l.querySelector('.sshell').setAttribute('stroke', on ? '#FF5314' : '#E5E7EB');
            l.querySelector('.sshell').setAttribute('stroke-width', on ? '2.5' : '1.5');
            l.querySelector('.sicon').setAttribute('opacity', on ? '1' : '0.12');
            l.querySelector('.sglyph').setAttribute('stroke', on ? '#FFFFFF' : '#FF5314');
            l.querySelector('.smeta').setAttribute('opacity', on ? '0.75' : '0.4');
            l.querySelector('.sflow').setAttribute('opacity', on ? '1' : '0');
            l.querySelector('.stick').setAttribute('opacity', on ? '1' : '0');
          });
          i = (i + 1) % ls.length;
        };
        tick();
        const id = setInterval(tick, 1900);
        return () => clearInterval(id);
      },
    };
  },
};


/* ══ HERO · 7–9 · three further directions ═══════════════════════════ */

/* ─── 7 · THE FLOOR ─────────────────────────────────────────────── */
export const theFloor = {
  id: 'net-floor',
  name: 'The Floor',
  family: 'Guarantee',
  tagline: 'Not the best case — the worst one',
  desc:
    'Every network page on the internet shows a peak figure. This shows the floor: the slowest ' +
    'measurement taken across a week, per carrier, with the guaranteed minimum drawn as a line ' +
    'nothing drops below. It is the only claim on this board that a buyer can hold us to, which is ' +
    'exactly why it is worth making.',
  pros: [
    'A floor is a promise; a peak is an advertisement',
    'Differentiates immediately from every competitor hero',
    'The line nothing crosses is legible without a legend',
  ],
  cons: ['Commits publicly to a number operations must hold', 'Lower headline figures than a peak claim'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 12, floor = 96;
    const series = CARRIERS.map((c, ci) => ({
      n: c.n,
      pts: Array.from({ length: 14 }, (_, i) => floor + 22 + Math.round(58 * Math.abs(Math.sin(i * 0.9 + ci * 1.7))) ),
    }));
    const x0 = 106, x1 = 560, y0 = 340, yTop = 108, vMax = 260;
    const px = (i) => x0 + (i / 13) * (x1 - x0);
    const py = (v) => y0 - (v / vMax) * (y0 - yTop);
    const cols = [G.orange, '#7C3AED', '#0EA5E9', G.amber];
    const inner = `
    ${dots(uid)}
    ${bloom(330, 210, 250, uid)}
    ${label(106, 62, 'The slowest reading of the week, not the fastest', { size: 15, op: 0.5 })}
    <line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="${G.line}" stroke-width="2"/>
    ${[100, 160, 220].map((v) => `
      <line x1="${x0}" y1="${py(v)}" x2="${x1}" y2="${py(v)}" stroke="${G.line}" stroke-width="1" opacity="0.55"/>
      ${mono(x0 - 12, py(v) + 4, `${v}`, { size: 9, anchor: 'end', op: 0.35 })}`).join('')}
    ${series.map((s, i) => `
      <polyline points="${s.pts.map((v, k) => `${px(k).toFixed(0)} ${py(v).toFixed(0)}`).join(' ')}"
        fill="none" stroke="${cols[i]}" stroke-width="2.2" opacity="0.75"
        stroke-dasharray="900" stroke-dashoffset="900">
        <animate attributeName="stroke-dashoffset" values="900;0;0" keyTimes="0;${(0.24 + i * 0.1).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      </polyline>`).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <line x1="${x0}" y1="${py(floor)}" x2="${x1}" y2="${py(floor)}" stroke="${G.ink}" stroke-width="3"/>
      ${label(x0 + 8, py(floor) + 24, 'Guaranteed floor — 96 Mbps', { size: 13 })}
      ${mono(x1, py(floor) + 24, 'NOTHING CROSSED IT', { size: 9.5, anchor: 'end', op: 0.45 })}
    </g>
    ${series.map((s, i) => `
      ${mono(x1 + 6, py(s.pts[13]) + 4, s.n, { size: 9, op: 0.5, fill: cols[i] })}`).join('')}
    ${mono(106, 424, 'FOUR TIER-1 CARRIERS \u00b7 14 DAYS \u00b7 WORST READING PER DAY', { size: 9.5, op: 0.35 })}`;
    return { svg: gWrap(inner), pills: pillsN('Floor, not peak', '96 Mbps minimum') };
  },
};

/* ─── 8 · WHO YOU ARE ON ────────────────────────────────────────── */
export const whoYoureOn = {
  id: 'net-whoson',
  name: 'Who You Are On',
  family: 'Transparency',
  tagline: 'The carrier named, in real time',
  desc:
    'Most providers refuse to say whose network you are actually using. This names it — carrier, ' +
    'country, band, and the moment it hands over — as a live readout that keeps updating. ' +
    'Transparency is the cheapest differentiator available here, because the only reason not to show ' +
    'this is that the answer is embarrassing.',
  pros: [
    'Names what competitors deliberately hide',
    'Turns a technical readout into a trust argument',
    'Reads as a product feature as much as an animation',
  ],
  cons: ['Commits to disclosing carrier relationships', 'A handover mid-session can look like instability'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 12;
    const rows = [
      ['Lisbon, PT', 'MEO', 'n78 · 3500 MHz', '18 ms'],
      ['Madrid, ES', 'Movistar', 'n78 · 3500 MHz', '21 ms'],
      ['Paris, FR', 'Orange', 'n1 · 2100 MHz', '24 ms'],
      ['Berlin, DE', 'Telekom', 'n78 · 3600 MHz', '19 ms'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 250, uid)}
    ${label(96, 62, 'We will always tell you whose network you are on', { size: 15, op: 0.5 })}
    ${card(96, 92, 448, 252, { r: 16, fill: G.white, stroke: G.line })}
    ${mono(120, 122, 'LIVE CONNECTION', { size: 9.5, op: 0.45 })}
    <circle cx="524" cy="117" r="4.5" fill="${G.orange}">
      <animate attributeName="opacity" values="0.35;1;0.35" keyTimes="0;0.5;1" dur="2.2s" repeatCount="indefinite"/>
    </circle>
    <line x1="120" y1="138" x2="520" y2="138" stroke="${G.line}"/>
    ${rows.map((r, i) => {
      const on = i / rows.length, off = (i + 1) / rows.length;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0"
          keyTimes="0;${on.toFixed(4)};${(on + 0.006).toFixed(4)};${off.toFixed(4)};${Math.min(off + 0.006, 1).toFixed(4)};1"
          dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
        ${mono(120, 176, 'WHERE', { size: 9, op: 0.4 })}
        ${label(120, 200, r[0], { size: 15 })}
        ${mono(120, 232, 'CARRIER', { size: 9, op: 0.4 })}
        ${label(120, 258, r[1], { size: 20, fill: G.orange })}
        ${mono(120, 292, 'BAND', { size: 9, op: 0.4 })}
        ${label(120, 314, r[2], { size: 13, op: 0.75 })}
        ${mono(520, 176, 'LATENCY', { size: 9, anchor: 'end', op: 0.4 })}
        ${label(520, 204, r[3], { size: 22, anchor: 'end' })}
        ${[0, 1, 2, 3].map((b) => `
          <rect x="${472 + b * 13}" y="${262 - b * 7}" width="9" height="${14 + b * 7}" rx="2" fill="${G.orange}" opacity="0.9"/>`).join('')}
        ${mono(520, 314, 'TIER-1, DIRECT', { size: 9, anchor: 'end', op: 0.45, fill: G.orange })}
      </g>`;
    }).join('')}
    ${mono(96, 396, 'HANDOVER IS AUTOMATIC AND NAMED \u2014 NO SILENT DOWNGRADE TO A CHEAPER PARTNER', { size: 9.5, op: 0.38 })}`;
    return { svg: gWrap(inner), pills: pillsN('Carrier named', 'No silent downgrade') };
  },
};

/* ─── 9 · WHAT BREAKS FIRST ─────────────────────────────────────── */
export const whatBreaksFirst = {
  id: 'net-breaks',
  name: 'What Breaks First',
  family: 'Guarantee',
  tagline: 'One carrier fails and nothing above it notices',
  desc:
    'A carrier is pulled out mid-session and the traffic it was carrying moves to the next one ' +
    'inside a frame, with the session counter never resetting. It is the single most enterprise-' +
    'relevant thing this hero can say, and it is the argument for multiple Tier-1 relationships ' +
    'rather than an assertion that they exist.',
  pros: [
    'Demonstrates redundancy instead of claiming uptime',
    'The unbroken session counter is the proof, and it needs no words',
    'Directly answers the procurement question about single-carrier risk',
  ],
  cons: ['Showing a failure on a hero is a nerve-holding decision', 'Needs the failover to genuinely be this fast'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 4, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 12;
    const cs = CARRIERS.map((c) => c.n);
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 250, uid)}
    ${label(96, 62, 'Pull one carrier out. Nothing above it notices.', { size: 15, op: 0.5 })}
    ${cs.map((n, i) => {
      const x = 104 + i * 112;
      const dead = i === 1;
      return `<g>
        ${card(x, 104, 96, 104, { r: 12, fill: G.white, stroke: G.line })}
        ${mast(x + 48, 168, 0.62, false)}
        ${mono(x + 48, 228, n, { size: 9.5, anchor: 'middle', op: 0.5 })}
        ${dead ? `
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.34;0.37;0.72;0.76;1"
              dur="${dur}s" repeatCount="indefinite"/>
            ${card(x, 104, 96, 104, { r: 12, fill: '#FEF2F2', stroke: G.red, sw: 2 })}
            <path d="M ${x + 34} 150 l 28 28 M ${x + 62} 150 l -28 28" stroke="${G.red}" stroke-width="3" stroke-linecap="round"/>
            ${mono(x + 48, 200, 'DOWN', { size: 9.5, anchor: 'middle', op: 0.9, fill: G.red })}
          </g>` : ''}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.04 + i * 0.05).toFixed(3)};${(0.08 + i * 0.05).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <rect x="${x + 22}" y="118" width="52" height="5" rx="2.5" fill="${G.orange}" opacity="${dead ? 0.35 : 0.9}"/>
        </g>
      </g>`;
    }).join('')}

    <!-- the traffic path, rerouting -->
    <path d="M 152 240 Q 320 286, 320 300" fill="none" stroke="${G.orange}" stroke-width="2.4" opacity="0.6"/>
    <path d="M 264 240 Q 320 286, 320 300" fill="none" stroke="${G.red}" stroke-width="2.4" opacity="0">
      <animate attributeName="opacity" values="0.6;0.6;0;0;0.6;0.6" keyTimes="0;0.34;0.37;0.72;0.76;1"
        dur="${dur}s" repeatCount="indefinite"/>
    </path>
    <path d="M 376 240 Q 320 286, 320 300" fill="none" stroke="${G.orange}" stroke-width="2.4" opacity="0.6">
      <animate attributeName="stroke-width" values="2.4;2.4;4.4;4.4;2.4;2.4" keyTimes="0;0.34;0.4;0.72;0.78;1"
        dur="${dur}s" repeatCount="indefinite"/>
    </path>
    <path d="M 488 240 Q 320 286, 320 300" fill="none" stroke="${G.orange}" stroke-width="2.4" opacity="0.6"/>

    ${card(160, 300, 320, 104, { r: 14, fill: G.ink, stroke: G.ink })}
    ${mono(320, 330, 'SESSIONS CARRIED', { size: 9.5, anchor: 'middle', fill: G.white, op: 0.5 })}
    ${label(320, 372, '41,208', { size: 34, anchor: 'middle', fill: G.white })}
    ${mono(320, 394, 'never reset, never dropped', { size: 9.5, anchor: 'middle', fill: G.orange, op: 0.9 })}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.4;0.44;0.7;0.74;1"
        dur="${dur}s" repeatCount="indefinite"/>
      ${mono(500, 268, 'REROUTED IN 40 ms', { size: 9.5, anchor: 'end', op: 0.8, fill: G.orange })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsN('Carrier-level failover', 'No session dropped') };
  },
};

/* ══ WHY · 4–9 · six further directions ═════════════════════════════ */

/* ─── 4 · THE PROCUREMENT ANSWER ────────────────────────────────── */
export const procurement = {
  id: 'why-proc',
  name: 'The Procurement Answer',
  family: 'Enterprise',
  tagline: 'The four questions a buyer actually asks',
  desc:
    'Written for the person who has to justify the purchase internally. Four questions — who carries ' +
    'the traffic, what happens when one fails, what is the contractual floor, who is accountable — ' +
    'each answered in one line with a figure. It is the least decorative option on the board and ' +
    'probably the most useful.',
  pros: [
    'Answers the questions that actually block an enterprise deal',
    'Every answer is a specific, checkable commitment',
    'Extremely cheap to build and to keep accurate',
  ],
  cons: ['Dry — no visual idea at all', 'Reads as a table rather than an animation'],
  scores: { story: 5, motion: 2, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: (uid) => {
    const dur = 11;
    const qs = [
      ['Whose network carries my traffic?', 'Four named Tier-1 carriers, disclosed per country'],
      ['What happens when one fails?', 'Automatic handover in under 40 ms, session preserved'],
      ['What is the contractual floor?', '96 Mbps and 99.9% availability, per month'],
      ['Who is accountable when it breaks?', 'One contract with us, not four with carriers'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${label(96, 60, 'The four questions procurement asks', { size: 15, op: 0.5 })}
    ${qs.map(([q, a], i) => {
      const y = 92 + i * 80;
      const on = 0.06 + i * 0.14;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(96, y, 448, 66, { r: 12, fill: G.white, stroke: G.line })}
        <rect x="96" y="${y}" width="4" height="66" rx="2" fill="${G.orange}"/>
        ${mono(120, y + 26, `Q${i + 1}`, { size: 9.5, op: 0.4 })}
        ${label(154, y + 26, q, { size: 13.5 })}
        ${label(120, y + 50, a, { size: 12.5, fill: G.orange })}
      </g>`;
    }).join('')}
    ${mono(96, 428, 'NO PEAK FIGURES ON THIS SLIDE \u2014 EVERY NUMBER IS A FLOOR', { size: 9.5, op: 0.35 })}`;
    return { svg: gWrap(inner), pills: pillsN('Enterprise Grade', 'One contract') };
  },
};

/* ─── 5 · THE HANDOVER, SLOWED DOWN ─────────────────────────────── */
export const handoverSlow = {
  id: 'why-handover',
  name: 'Forty Milliseconds',
  family: 'Proof',
  tagline: 'The failover, at a speed you can watch',
  desc:
    'One event, expanded: a carrier drops and the session moves. Four stages — detection, decision, ' +
    'attach, resume — each with its own millisecond cost, adding to forty. Slowing a claim down until ' +
    'it can be inspected is more persuasive than repeating it, and it is the only option here that ' +
    'shows the mechanism rather than the outcome.',
  pros: [
    'Turns a number into a mechanism, which is much harder to dismiss',
    'The running total adding to 40 ms is a satisfying payoff',
    'Gives engineering something accurate to sign off on',
  ],
  cons: ['Requires the real stage timings', 'Technical framing may lose a non-specialist reader'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 4, brand: 4, ease: 3 },
  build: (uid) => {
    const dur = 10;
    const stages = [
      ['Detection', 'Carrier stops answering', 12],
      ['Decision', 'Next-best carrier selected', 9],
      ['Attach', 'Profile activates on the new carrier', 14],
      ['Resume', 'Session continues, same IP', 5],
    ];
    let acc = 0;
    const totals = stages.map(([, , ms]) => (acc += ms));
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 250, uid)}
    ${label(96, 62, 'One failover, slowed down', { size: 15, op: 0.5 })}
    ${stages.map(([nm, note, ms], i) => {
      const y = 100 + i * 62;
      const on = 0.06 + i * 0.13;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(96, y, 448, 50, { r: 11, fill: G.white, stroke: G.line })}
        <circle cx="122" cy="${y + 25}" r="10" fill="${G.wash}"/>
        ${mono(122, y + 29, `${i + 1}`, { size: 10, anchor: 'middle', op: 0.8, fill: G.orange })}
        ${label(148, y + 22, nm, { size: 13.5 })}
        ${mono(148, y + 38, note, { size: 9.5, op: 0.42 })}
        <rect x="392" y="${y + 21}" width="${ms * 5}" height="8" rx="4" fill="${G.orange}" opacity="0.8"/>
        ${mono(524, y + 30, `${ms} ms`, { size: 11, anchor: 'end', op: 0.75 })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.7;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(96, 356, 448, 60, { r: 12, fill: G.wash, stroke: G.orange, sw: 2 })}
      ${label(124, 392, 'Total, detection to resume', { size: 13.5 })}
      ${label(516, 394, `${totals[3]} ms`, { size: 24, anchor: 'end', fill: G.orange })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsN('40 ms failover', 'Session preserved') };
  },
};

/* ─── 6 · WHAT ONE CARRIER COSTS YOU ────────────────────────────── */
export const oneCarrierCost = {
  id: 'why-onecarrier',
  name: 'What One Carrier Costs',
  family: 'Comparison',
  tagline: 'The single-carrier provider, on the same week',
  desc:
    'Two availability strips for the same seven days: a single-carrier provider, with three visible ' +
    'outages, and four carriers combined, with none. The comparison is the argument — every provider ' +
    'claims high availability, and almost none of them can claim it without a single point of ' +
    'failure behind the number.',
  pros: [
    'The two strips make the difference visible in one glance',
    'Attacks the specific weakness of the cheap competitor',
    'Availability is the metric enterprise buyers actually contract on',
  ],
  cons: ['Comparative claims about competitors need care', 'Outage figures must be defensible'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 11, cells = 56;
    const outages = [11, 12, 31, 44, 45, 46];
    const strip = (y, bad, labelTxt, sub, col) => `
      ${mono(96, y - 14, labelTxt, { size: 9.5, op: 0.45 })}
      ${Array.from({ length: cells }, (_, i) => {
        const down = bad && outages.includes(i);
        return `<rect x="${96 + i * 8}" y="${y}" width="6" height="34" rx="1.5"
          fill="${down ? G.red : col}" opacity="${down ? 0.95 : 0.8}"/>`;
      }).join('')}
      ${label(548, y + 24, sub, { size: 13, anchor: 'end', fill: bad ? G.red : G.orange })}`;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 250, uid)}
    ${label(96, 62, 'The same seven days, two networks', { size: 15, op: 0.5 })}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.06;0.16;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${strip(120, true, 'A SINGLE-CARRIER PROVIDER', '3 outages', G.gray)}
      ${mono(96, 176, 'SIX HOURS OFFLINE \u00b7 99.6%', { size: 9.5, op: 0.45, fill: G.red })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.36;0.46;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${strip(230, false, 'FOUR TIER-1 CARRIERS, COMBINED', 'none', G.orange)}
      ${mono(96, 286, 'ZERO MINUTES OFFLINE \u00b7 100% THIS WEEK', { size: 9.5, op: 0.5, fill: G.orange })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.72;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(96, 322, 452, 88, { r: 14, fill: G.white, stroke: G.line })}
      ${label(124, 356, 'Every provider quotes availability.', { size: 14 })}
      ${label(124, 382, 'Ask how many carriers are behind the number.', { size: 14, fill: G.orange })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsN('Four carriers', 'No single point of failure') };
  },
};

/* ─── 7 · THE BANDS ─────────────────────────────────────────────── */
export const theBands = {
  id: 'why-bands',
  name: 'The Bands',
  family: 'Proof',
  tagline: 'Why a cheap eSIM is slow in the same place',
  desc:
    'The reason two eSIMs perform differently in the same street is band access, and nobody explains ' +
    'it. Here the bands a Tier-1 agreement reaches are drawn against the ones a wholesale reseller ' +
    'is limited to — the fast mid-band is simply missing from the cheap lane. It converts a price ' +
    'difference into a technical one.',
  pros: [
    'Explains the performance gap instead of asserting it',
    'Gives a salesperson a concrete answer to "why are you more expensive"',
    'Nothing else in the category explains band access at all',
  ],
  cons: ['Needs a technical reviewer to keep it honest', 'Band names mean nothing to most readers'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 3 },
  build: (uid) => {
    const dur = 10;
    const bands = [
      ['n78 · 3500 MHz', 'Fast mid-band', true, false],
      ['n1 · 2100 MHz', 'Wide coverage', true, true],
      ['n28 · 700 MHz', 'Indoors and rural', true, false],
      ['B3 · 1800 MHz', 'LTE fallback', true, true],
      ['B20 · 800 MHz', 'Deep indoor LTE', true, false],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${label(96, 60, 'Same street, different bands', { size: 15, op: 0.5 })}
    ${mono(330, 92, 'OPENLINE', { size: 9.5, anchor: 'middle', op: 0.6, fill: G.orange })}
    ${mono(478, 92, 'CHEAP RESELLER', { size: 9.5, anchor: 'middle', op: 0.45 })}
    ${bands.map(([nm, note, ours, theirs], i) => {
      const y = 108 + i * 58;
      const on = 0.06 + i * 0.11;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(96, y, 448, 46, { r: 11, fill: G.white, stroke: G.line })}
        ${label(120, y + 22, nm, { size: 13 })}
        ${mono(120, y + 38, note, { size: 9.5, op: 0.4 })}
        <circle cx="330" cy="${y + 23}" r="11" fill="${G.wash}"/>
        <path d="M 324 ${y + 23} l 4.5 4.5 l 8 -9" fill="none" stroke="${G.orange}" stroke-width="2.4" stroke-linecap="round"/>
        ${theirs
          ? `<circle cx="478" cy="${y + 23}" r="11" fill="#F3F4F6"/>
             <path d="M 472 ${y + 23} l 4.5 4.5 l 8 -9" fill="none" stroke="${G.gray}" stroke-width="2.4" stroke-linecap="round"/>`
          : `<circle cx="478" cy="${y + 23}" r="11" fill="#FEF2F2"/>
             <path d="M 473 ${y + 18} l 10 10 M 483 ${y + 18} l -10 10" stroke="${G.red}" stroke-width="2.2" stroke-linecap="round"/>`}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(96, 424, 'THE MISSING ROWS ARE WHY A CHEAP eSIM IS SLOW IN THE SAME PLACE', { size: 9.5, op: 0.42, fill: G.orange })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsN('Full band access', 'Tier-1 direct') };
  },
};

/* ─── 8 · THE NIGHT SHIFT ───────────────────────────────────────── */
export const nightShift = {
  id: 'why-night',
  name: 'The Night Shift',
  family: 'Proof',
  tagline: 'Performance at the hour everyone else degrades',
  desc:
    'Congestion is when a network actually gets tested, and every provider quotes figures from ' +
    'quiet hours. This plots twenty-four hours: the reseller line collapses through the evening peak ' +
    'while the multi-carrier line stays inside its band, because traffic moves to whichever carrier ' +
    'is least loaded. It is the most honest performance claim on the board.',
  pros: [
    'Tests the claim at the only hour that matters',
    'Load-balancing across carriers is a real advantage that nothing else here shows',
    'The diverging lines need no explanation',
  ],
  cons: ['Needs genuine hourly data', 'A 24-hour axis is dense at this size'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 3 },
  build: (uid) => {
    const dur = 12;
    const ours = [186, 190, 192, 188, 184, 180, 176, 178, 182, 186, 184, 180,
      176, 172, 170, 168, 166, 162, 158, 156, 160, 168, 176, 184];
    const theirs = [176, 182, 184, 180, 174, 168, 158, 146, 138, 132, 128, 124,
      118, 112, 104, 96, 84, 68, 54, 48, 62, 92, 128, 158];
    const x0 = 106, x1 = 560, y0 = 350, yTop = 104, vMax = 210;
    const px = (i) => x0 + (i / 23) * (x1 - x0);
    const py = (v) => y0 - (v / vMax) * (y0 - yTop);
    const path = (arr) => arr.map((v, i) => `${px(i).toFixed(0)} ${py(v).toFixed(0)}`).join(' ');
    const inner = `
    ${dots(uid)}
    ${bloom(330, 210, 250, uid)}
    ${label(106, 60, 'Twenty-four hours, including the evening peak', { size: 15, op: 0.5 })}
    <rect x="${px(17).toFixed(0)}" y="${yTop}" width="${(px(21) - px(17)).toFixed(0)}" height="${y0 - yTop}"
      fill="${G.red}" opacity="0.06"/>
    ${mono(((px(17) + px(21)) / 2).toFixed(0), yTop - 8, 'PEAK', { size: 9, anchor: 'middle', op: 0.4, fill: G.red })}
    <line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="${G.line}" stroke-width="2"/>
    ${[0, 6, 12, 18, 23].map((h) => `
      ${mono(px(h).toFixed(0), y0 + 20, `${String(h).padStart(2, '0')}:00`, { size: 9, anchor: 'middle', op: 0.35 })}`).join('')}
    <polyline points="${path(theirs)}" fill="none" stroke="${G.gray}" stroke-width="2.6"
      stroke-dasharray="1000" stroke-dashoffset="1000">
      <animate attributeName="stroke-dashoffset" values="1000;0;0" keyTimes="0;0.6;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </polyline>
    <polyline points="${path(ours)}" fill="none" stroke="${G.orange}" stroke-width="3.4"
      stroke-dasharray="1000" stroke-dashoffset="1000">
      <animate attributeName="stroke-dashoffset" values="1000;0;0" keyTimes="0;0.6;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </polyline>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.64;0.72;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${label(x0 + 8, py(ours[2]) - 14, 'Openline — four carriers', { size: 12.5, fill: G.orange })}
      ${label(px(19).toFixed(0), py(theirs[19]) + 24, 'Single carrier — 48 Mbps at 19:00', { size: 12, fill: G.gray })}
      ${card(372, 388, 176, 44, { r: 11, fill: G.wash, stroke: G.orange, sw: 2 })}
      ${label(388, 416, '3.2× at peak', { size: 15, fill: G.orange })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsN('Load-balanced', '3.2× at peak') };
  },
};

/* ─── 9 · THE CONTRACT LINE ─────────────────────────────────────── */
export const contractLine = {
  id: 'why-contract',
  name: 'The Contract Line',
  family: 'Enterprise',
  tagline: 'What is written down, versus what is advertised',
  desc:
    'Two columns: the figures a network page advertises, and the figures that appear in the contract. ' +
    'Everyone has the first column. Filling in the second — a floor, a credit, a named remedy — is ' +
    'the actual differentiator, and printing it on the marketing page is a statement of confidence ' +
    'no competitor will copy quickly.',
  pros: [
    'The empty competitor column is the most persuasive element available',
    'Moves the conversation from marketing claims to contractual ones',
    'Gives sales a page to point at during a negotiation',
  ],
  cons: ['Only works if legal will actually sign these terms', 'Invites a buyer to hold us to every line'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 4, brand: 5, ease: 2 },
  build: (uid) => {
    const bits = [
      ['Throughput floor', '96 Mbps', 'peak figures only'],
      ['Availability', '99.9% monthly', 'best effort'],
      ['Failover time', 'under 40 ms', 'unspecified'],
      ['Service credit', 'automatic', 'on request'],
      ['Carriers disclosed', 'per country', 'never'],
    ];
    const dur = 11;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${label(96, 60, 'Advertised, and written down', { size: 15, op: 0.5 })}
    ${mono(352, 94, 'IN OUR CONTRACT', { size: 9.5, anchor: 'middle', op: 0.6, fill: G.orange })}
    ${mono(486, 94, 'TYPICAL ELSEWHERE', { size: 9.5, anchor: 'middle', op: 0.42 })}
    ${bits.map(([nm, ours, theirs], i) => {
      const y = 110 + i * 56;
      const on = 0.06 + i * 0.12;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(96, y, 448, 44, { r: 10, fill: i % 2 ? '#FAFAFB' : G.white, stroke: G.line })}
        ${label(120, y + 28, nm, { size: 13 })}
        ${label(352, y + 28, ours, { size: 13, anchor: 'middle', fill: G.orange })}
        ${mono(486, y + 28, theirs, { size: 9.5, anchor: 'middle', op: 0.4 })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.7;0.78;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(96, 424, 'THE LEFT COLUMN IS THE PRODUCT. THE RIGHT COLUMN IS WHY IT COSTS MORE.', { size: 9.5, op: 0.42, fill: G.orange })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsN('Contractual floors', null) };
  },
};

/* ── nethero 10 ── */
export const netTheMap = {
  id: 'net-themap',
  name: 'Coverage, Honestly',
  family: 'Transparency',
  tagline: 'Where it is excellent, good, and thin',
  desc:
    'Every coverage map in this industry is a single flat colour over whole continents. This grades ' +
    'it in three bands and admits the thin one — naming the regions where coverage is partial instead ' +
    'of pretending otherwise. Publishing the weak band is what makes the strong band believable.',
  pros: [
    'Admitting a weakness makes every other claim on the page credible',
    'Three honest bands are more useful than one flattering colour',
    'Pre-empts the support ticket from somebody who trusted a flat map',
  ],
  cons: ['Exposes gaps a competitor can quote', 'Requires per-region data we must maintain'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 11;
    const bands = [
      ['Excellent', '5G, multiple carriers', 96, G.orange, 'Western Europe \u00b7 Japan \u00b7 Korea \u00b7 UAE'],
      ['Good', 'LTE or better, two carriers', 61, G.amber, 'North America \u00b7 Brazil \u00b7 India \u00b7 Australia'],
      ['Thin', 'One carrier, LTE only', 33, G.gray, 'Parts of Central Africa and Central Asia'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${label(96, 62, 'Coverage, graded honestly', { size: 15, op: 0.5 })}
    ${bands.map(([nm, note, n, col, where], i) => {
      const y = 92 + i * 104;
      const on = 0.08 + i * 0.16;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.06).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(96, y, 448, 86, { r: 13, fill: G.white, stroke: G.line })}
        <rect x="96" y="${y}" width="5" height="86" rx="2.5" fill="${col}"/>
        ${label(124, y + 30, nm, { size: 15 })}
        ${mono(124, y + 50, note, { size: 9, op: 0.4 })}
        ${mono(124, y + 70, where, { size: 8.5, op: 0.32 })}
        <text x="520" y="${y + 44}" font-size="24" font-weight="800" text-anchor="end" fill="${col}">${n}</text>
        ${mono(520, y + 64, 'COUNTRIES', { size: 8, anchor: 'end', op: 0.35 })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.8;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(96, 424, 'WE PUBLISH THE THIN BAND. NOBODY ELSE IN THIS CATEGORY DOES.', { size: 9.5, op: 0.5, fill: G.orange })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsN('Graded, not flat', '190 countries') };
  },
};

/* ── why 10 ── */
export const whyTheIncident = {
  id: 'why-incident',
  name: 'The Incident Report',
  family: 'Trust',
  tagline: 'What happened last time something broke',
  desc:
    'Nothing proves an operations culture like a published post-mortem. One real incident is written ' +
    'out — detected at 03:12, failover at 03:12, root cause in a carrier routing change, 41 customers ' +
    'affected for under a minute, and the fix. Publishing a failure honestly is the strongest trust ' +
    'signal on the whole page.',
  pros: [
    'Nothing else here proves an operations culture this convincingly',
    'Naming a small blast radius turns an incident into evidence',
    'Aligns with the audit and transparency language used elsewhere',
  ],
  cons: [
    'Commits us to publishing the next one too, including a bad one',
    'A marketing page showing an outage is a nerve-holding decision',
  ],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 11;
    const lines = [
      ['03:12:04', 'Carrier routing change detected', 'automated'],
      ['03:12:04', 'Traffic moved to the next carrier', '38 ms'],
      ['03:12:41', 'Engineer paged and acknowledged', 'on call'],
      ['04:06:00', 'Root cause confirmed with the carrier', 'their change'],
      ['09:00:00', 'Post-mortem published', 'public'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${label(96, 58, 'Incident 2026-031, in full', { size: 15, op: 0.5 })}
    ${mono(96, 80, '41 CUSTOMERS AFFECTED \u00b7 LONGEST IMPACT 52 SECONDS', { size: 9, op: 0.42 })}
    ${lines.map(([ts, nm, tag], i) => {
      const y = 98 + i * 56;
      const on = 0.06 + i * 0.12;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(96, y, 448, 46, { r: 11, fill: G.white, stroke: G.line })}
        ${mono(120, y + 28, ts, { size: 10, op: 0.5, fill: G.orange })}
        ${label(212, y + 28, nm, { size: 12.5 })}
        ${mono(520, y + 28, tag, { size: 8.5, anchor: 'end', op: 0.35 })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.74;0.82;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(96, 386, 448, 56, { r: 12, fill: G.wash, stroke: G.orange, sw: 2 })}
      ${label(120, 420, 'Every incident is published. This is the last one.', { size: 13.5, fill: G.orange })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsN('Post-mortems published', null) };
  },
};

/* ══ HERO · 11–15 ══════════════════════════════════════════════════ */

/* ─── 11 · A DAY ON THE NETWORK ─────────────────────────────────── */
export const netTheDay = {
  id: 'net-theday',
  name: 'A Day on the Network',
  family: 'Journey',
  tagline: 'One itinerary, five places, one session',
  desc:
    'A real day laid out as a route: 07:10 at Lisbon airport, a train to Madrid, an underground ' +
    'platform, a bus, a hotel at 23:40. A dot travels it while the carrier under it changes four ' +
    'times, and the session bar below runs for sixteen and a half hours without a break. The switching ' +
    'claim stops being a diagram and becomes somebody\u2019s Tuesday.',
  pros: [
    'Puts the switching where the customer experiences it \u2014 a journey, not a topology',
    'Named places and times are concrete in a way masts and nodes are not',
    'The unbroken session bar carries the reliability claim without a word',
  ],
  cons: [
    'A five-stop route is the densest layout on the board and loses stops on a phone',
    'One itinerary looks specific, so it invites \u201cwhat about my route?\u201d',
    'Needs the place names localised with the rest of the page',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const dur = 14;
    const stops = [
      ['07:10', 'Lisbon airport', 'MEO'],
      ['10:20', 'Madrid Atocha', 'Movistar'],
      ['13:40', 'Metro, line 1', 'Movistar'],
      ['17:15', 'Bus to Toledo', 'Orange'],
      ['23:40', 'Hotel in Toledo', 'Vodafone'],
    ];
    const y = 214;
    const sx = (i) => 120 + i * 110;
    const route = `M 120 ${y} L 560 ${y}`;
    const inner = `
    ${dots(uid)}
    ${bloom(330, 200, 240, uid)}
    ${label(96, 58, 'One day, five places, one session', { size: 15, op: 0.5 })}
    <line x1="120" y1="${y}" x2="560" y2="${y}" stroke="${G.line}" stroke-width="3"/>
    <line x1="120" y1="${y}" x2="560" y2="${y}" stroke="${G.orange}" stroke-width="3"
      stroke-dasharray="440" stroke-dashoffset="440">
      <animate attributeName="stroke-dashoffset" values="440;0;0" keyTimes="0;0.80;1"
        dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </line>
    ${stops.map(([t, place, car], i) => {
      const x = sx(i);
      const on = (i * 0.8) / stops.length;
      const t1 = on.toFixed(3);
      const t2 = (on + 0.02).toFixed(3);
      return `<g>
        ${mono(x, 154, place, { size: 9.5, anchor: 'middle', op: 0.4 })}
        ${mono(x, 176, t, { size: 11, anchor: 'middle', op: 0.55 })}
        <circle cx="${x}" cy="${y}" r="8" fill="${G.white}" stroke="${G.line}" stroke-width="3"/>
        <rect x="${x - 46}" y="244" width="92" height="26" rx="13" fill="${G.white}" stroke="${G.line}" stroke-width="1.5"/>
        ${mono(x, 261, car, { size: 9.5, anchor: 'middle', op: 0.35 })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${t1};${t2};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <circle cx="${x}" cy="${y}" r="8" fill="${G.orange}" stroke="${G.white}" stroke-width="3"/>
          <rect x="${x - 46}" y="244" width="92" height="26" rx="13" fill="${G.wash}" stroke="${G.orange}" stroke-width="2"/>
          ${mono(x, 261, car, { size: 9.5, anchor: 'middle', op: 0.95, fill: G.deep })}
          ${i > 0 ? mono(x - 55, 296, '38 ms', { size: 8.5, anchor: 'middle', op: 0.5, fill: G.orange }) : ''}
        </g>
      </g>`;
    }).join('')}
    <circle r="7" fill="${G.orange}">
      <animateMotion dur="${dur}s" keyTimes="0;0.80;1" keyPoints="0;1;1" calcMode="linear"
        path="${route}" repeatCount="indefinite"/>
    </circle>
    ${card(96, 320, 448, 92, { r: 14, fill: G.ink, stroke: G.ink })}
    ${mono(120, 348, 'ONE SESSION, ALL DAY', { size: 9.5, fill: G.white, op: 0.5 })}
    ${label(120, 384, '16 h 30 m', { size: 30, fill: G.white })}
    ${mono(520, 348, 'FOUR HANDOVERS', { size: 9.5, anchor: 'end', fill: G.white, op: 0.5 })}
    ${mono(520, 384, 'NO RECONNECT \u00b7 SAME IP', { size: 9.5, anchor: 'end', fill: G.orange, op: 0.95 })}
    <rect x="120" y="396" width="400" height="5" rx="2.5" fill="${G.white}" opacity="0.14"/>
    <rect x="120" y="396" width="0" height="5" rx="2.5" fill="${G.orange}">
      <animate attributeName="width" values="0;400;400" keyTimes="0;0.80;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </rect>
    ${mono(96, 436, 'FIVE PLACES \u00b7 FOUR CARRIERS \u00b7 NOTHING TOUCHED ON THE PHONE', { size: 9.5, op: 0.35 })}`;
    return { svg: gWrap(inner), pills: pillsN('Automatic switching', null) };
  },
};

/* ─── 12 · THE THREE NUMBERS ────────────────────────────────────── */
export const netThreeNumbers = {
  id: 'net-threenumbers',
  name: 'The Three Numbers',
  family: 'Typographic',
  tagline: 'The page\u2019s own figures, set large',
  desc:
    'No illustration at all. The three figures the page already claims \u2014 50+ Tier-1 carriers, 190+ ' +
    'countries, 99.9% uptime over twelve months \u2014 each fill the frame in turn with one plain line under ' +
    'them and a rule that draws itself. It invents nothing and asserts nothing new; it just stops ' +
    'burying the numbers in a stat strip nobody reads.',
  pros: [
    'Every claim is already published, so there is nothing to verify or defend',
    'Legible at 390px and in a compare tile, unlike every diagram on this board',
    'The lightest option here by a wide margin \u2014 type and two rectangles',
  ],
  cons: [
    'Repeats the stat strip that already sits under the hero',
    'No product, no device, no place \u2014 nothing to look at between beats',
    'Only as good as the typeface it lands in',
  ],
  scores: { story: 3, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 13.5;
    const beats = [
      ['50+', 'Tier-1 carriers under contract', 'NOT ONE WHOLESALE DEAL RESOLD AS A NETWORK'],
      ['190+', 'countries, live today', 'ONE PROFILE \u00b7 NO SWAPS \u00b7 NO LOCAL SIM'],
      ['99.9%', 'uptime, last twelve months', 'MEASURED OVER A YEAR, NOT A GOOD WEEK'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 240, uid)}
    ${mono(320, 74, 'THE THREE NUMBERS THIS PAGE ALREADY CLAIMS', { size: 10.5, anchor: 'middle', op: 0.32 })}
    ${beats.map(([big, line, sub], i) => {
      const on = (i / beats.length).toFixed(4);
      const b = (i / beats.length + 0.004).toFixed(4);
      const c = Math.min((i + 1) / beats.length - 0.004, 1).toFixed(4);
      const d = Math.min((i + 1) / beats.length, 1).toFixed(4);
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${on};${b};${c};${d};1"
          dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
        <text x="320" y="248" text-anchor="middle" font-size="120" font-weight="800" fill="${G.ink}">${big}</text>
        <rect x="170" y="272" width="0" height="5" rx="2.5" fill="${G.orange}">
          <animate attributeName="width" values="0;300;300" keyTimes="0;${(Number(b) + 0.06).toFixed(4)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        </rect>
        ${label(320, 316, line, { size: 24, anchor: 'middle', op: 0.85 })}
        ${mono(320, 348, sub, { size: 10, anchor: 'middle', op: 0.4 })}
      </g>`;
    }).join('')}
    ${[0, 1, 2].map(i => {
      const on = (i / 3).toFixed(4);
      const b = (i / 3 + 0.004).toFixed(4);
      const c = Math.min((i + 1) / 3 - 0.004, 1).toFixed(4);
      const d = Math.min((i + 1) / 3, 1).toFixed(4);
      return `<circle cx="${300 + i * 20}" cy="400" r="4" fill="${G.orange}" opacity="0.25">
        <animate attributeName="opacity" values="0.25;0.25;1;1;0.25;0.25" keyTimes="0;${on};${b};${c};${d};1"
          dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
      </circle>`;
    }).join('')}`;
    return { svg: gWrap(inner), pills: pillsN('Enterprise Grade', '99.9% uptime') };
  },
};

/* ─── 13 · FOUR PROFILES, ONE CHIP ──────────────────────────────── */
export const netTheChip = {
  id: 'net-thechip',
  name: 'Four Profiles, One Chip',
  family: 'Hardware',
  tagline: 'Where the carriers actually live',
  desc:
    'The eSIM itself, drawn large, with four carrier profiles installed on it and a beam to whichever ' +
    'one is carrying traffic. Nothing else on this board shows the object the customer is buying \u2014 the ' +
    'masts belong to somebody else and the mesh is a metaphor. This says the four contracts are already ' +
    'on the chip before the plane lands.',
  pros: [
    'Shows the thing being sold rather than the infrastructure behind it',
    'Explains why switching needs no app, no shop and no plastic',
    'One large object reads well in a compare tile and on a phone',
  ],
  cons: [
    'A chip is a static object, so the motion is limited to the active profile moving',
    'Four profiles is a simplification of how profiles and carriers actually map',
    'Least emotional option on the board \u2014 no place, no person',
  ],
  scores: { story: 4, motion: 3, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 12;
    const rows = CARRIERS.map((c) => [c.n, c.ping]);
    const inner = `
    ${dots(uid)}
    ${bloom(200, 200, 220, uid)}
    ${label(88, 58, 'Four carrier profiles, already on the chip', { size: 15, op: 0.5 })}

    <rect x="88" y="104" width="204" height="156" rx="26" fill="${G.ink}"/>
    <rect x="100" y="116" width="180" height="132" rx="18" fill="#17171C"/>
    ${[0, 1, 2, 3, 4].map(i => `
      <rect x="${116 + i * 32}" y="132" width="22" height="12" rx="3" fill="${G.orange}" opacity="0.35">
        <animate attributeName="opacity" values="0.25;0.85;0.25" dur="2.6s" begin="${(i * 0.32).toFixed(2)}s" repeatCount="indefinite"/>
      </rect>`).join('')}
    ${label(190, 194, 'OPENLINE', { size: 15, fill: G.white, anchor: 'middle' })}
    ${mono(190, 218, 'eSIM \u00b7 4 PROFILES', { size: 9.5, anchor: 'middle', fill: G.white, op: 0.45 })}
    ${mono(88, 282, 'NO PLASTIC \u00b7 NO SHOP \u00b7 NO SWAP', { size: 9.5, op: 0.35 })}

    ${rows.map(([nm, ping], i) => {
      const ry = 104 + i * 46;
      const on = (i / rows.length).toFixed(4);
      const b = (i / rows.length + 0.006).toFixed(4);
      const c = Math.min((i + 1) / rows.length - 0.006, 1).toFixed(4);
      const d = Math.min((i + 1) / rows.length, 1).toFixed(4);
      const beam = `M 292 182 C 330 182, 330 ${ry + 20}, 372 ${ry + 20}`;
      return `<g>
        ${card(372, ry, 188, 38, { r: 11, fill: G.white, stroke: G.line })}
        ${mono(390, ry + 24, nm.toUpperCase(), { size: 9.5, op: 0.35 })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${on};${b};${c};${d};1"
            dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
          ${card(372, ry, 188, 38, { r: 11, fill: G.wash, stroke: G.orange, sw: 2 })}
          ${mono(390, ry + 24, nm.toUpperCase(), { size: 9.5, op: 0.95, fill: G.deep })}
          ${mono(544, ry + 24, ping, { size: 9.5, anchor: 'end', op: 0.6 })}
          <path d="${beam}" fill="none" stroke="${G.orange}" stroke-width="2.6" stroke-linecap="round"
            stroke-dasharray="10 8">
            <animate attributeName="stroke-dashoffset" values="0;-18" dur="0.7s" repeatCount="indefinite"/>
          </path>
        </g>
      </g>`;
    }).join('')}
    ${mono(372, 300, 'CARRYING TRAFFIC NOW', { size: 9.5, op: 0.32 })}

    ${card(88, 318, 472, 82, { r: 14, fill: G.white, stroke: G.line })}
    ${label(112, 350, 'The switching happens on the chip, not in an app', { size: 15 })}
    ${mono(112, 376, 'FOUR CONTRACTS INSTALLED BEFORE THE PLANE LANDS \u00b7 50+ CARRIERS ACROSS THE NETWORK', { size: 9, op: 0.4 })}`;
    return { svg: gWrap(inner), pills: pillsN('One eSIM, four profiles', null) };
  },
};

/* ─── 14 · THE CALL THAT DOES NOT DROP ──────────────────────────── */
export const netTheCall = {
  id: 'net-thecall',
  name: 'The Call That Holds',
  family: 'Product moment',
  tagline: 'A video call through two carrier switches',
  desc:
    'A video call runs in the frame with its timer climbing past three minutes. Twice underneath it the ' +
    'carrier changes and a small notice slides in \u2014 switched to Movistar, 38 ms \u2014 while the call quality ' +
    'chip stays green and the timer never resets. Every other option here argues about the network; ' +
    'this shows the one moment a customer would actually notice it failing.',
  pros: [
    'Frames reliability as the thing the customer cares about, not as telemetry',
    'A call timer that never resets is understood instantly, with no legend',
    'The switch notice doubles as the transparency argument',
  ],
  cons: [
    'A call UI looks like somebody else\u2019s app and dates quickly',
    'Implies we guarantee call quality, which depends on the far end too',
    'Faces have to be abstract or we need real people and releases',
  ],
  scores: { story: 5, motion: 4, perf: 4, mobile: 4, brand: 3, ease: 3 },
  build: (uid) => {
    const dur = 12;
    const times = ['00:41', '01:29', '02:18', '03:07'];
    const switches = [
      [0.28, 'SWITCHED TO MOVISTAR \u00b7 38 ms'],
      [0.62, 'SWITCHED TO ORANGE \u00b7 36 ms'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 240, uid)}
    ${label(96, 58, 'A video call, through two carrier switches', { size: 15, op: 0.5 })}

    ${card(150, 80, 340, 236, { r: 18, fill: G.ink, stroke: G.ink })}
    <rect x="164" y="96" width="152" height="170" rx="12" fill="#1D1D22"/>
    <circle cx="240" cy="172" r="30" fill="${G.orange}" opacity="0.9"/>
    ${label(240, 179, 'AM', { size: 16, fill: G.white, anchor: 'middle' })}
    <rect x="324" y="96" width="152" height="170" rx="12" fill="#1D1D22"/>
    <circle cx="400" cy="172" r="30" fill="${G.white}" opacity="0.18"/>
    ${label(400, 179, 'JL', { size: 16, fill: G.white, anchor: 'middle' })}
    ${times.map((t, i) => {
      const on = (i / times.length).toFixed(4);
      const b = (i / times.length + 0.004).toFixed(4);
      const c = Math.min((i + 1) / times.length - 0.004, 1).toFixed(4);
      const d = Math.min((i + 1) / times.length, 1).toFixed(4);
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${on};${b};${c};${d};1"
          dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
        ${mono(476, 298, t, { size: 13, anchor: 'end', fill: G.white, op: 0.9 })}
      </g>`;
    }).join('')}
    <g transform="translate(164 284)">
      <rect x="0" y="0" width="128" height="24" rx="12" fill="#10B981" opacity="0.18"/>
      <circle cx="16" cy="12" r="5" fill="#34D399"/>
      ${mono(30, 16, 'QUALITY GOOD', { size: 9, fill: '#34D399', op: 0.95 })}
    </g>

    ${mono(96, 346, 'THE NETWORK UNDER THE CALL', { size: 9.5, op: 0.32 })}
    <line x1="96" y1="372" x2="544" y2="372" stroke="${G.line}" stroke-width="4"/>
    <line x1="96" y1="372" x2="544" y2="372" stroke="${G.orange}" stroke-width="4"
      stroke-dasharray="448" stroke-dashoffset="448">
      <animate attributeName="stroke-dashoffset" values="448;0;0" keyTimes="0;0.88;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </line>
    ${switches.map(([at, txt], i) => {
      const x = 96 + Number(at) * 448;
      const b = (Number(at) + 0.012).toFixed(3);
      const c = (Number(at) + 0.20).toFixed(3);
      const d = (Number(at) + 0.23).toFixed(3);
      return `<g>
        <rect x="${x.toFixed(0)}" y="360" width="3" height="24" rx="1.5" fill="${G.ink}" opacity="0.55"/>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${at};${b};${c};${d};1"
            dur="${dur}s" repeatCount="indefinite"/>
          ${card(96 + i * 4, 396, 300, 34, { r: 17, fill: G.wash, stroke: G.orange, sw: 2 })}
          ${mono(116 + i * 4, 418, txt, { size: 9.5, op: 0.95, fill: G.deep })}
        </g>
      </g>`;
    }).join('')}
    ${mono(544, 418, 'TIMER NEVER RESET', { size: 9.5, anchor: 'end', op: 0.35 })}`;
    return { svg: gWrap(inner), pills: pillsN('Session preserved', null) };
  },
};

/* ─── 15 · TOLD BY A TRAVELLER ────────────────────────────────── */
export const netToldByTraveller = {
  id: 'net-told',
  name: 'Told by a Traveller',
  family: 'Editorial',
  tagline: 'Two customers, in their own words',
  desc:
    'Two quotes, one at a time, each with the figures behind it: someone who crossed eleven countries ' +
    'in three weeks and changed no settings, and someone who sat through a carrier outage and heard ' +
    'about it from the news rather than from their phone. Ten diagrams on this board argue the claim; ' +
    'this is the only one where a customer makes it.',
  pros: [
    'A human voice against ten technical panels is the strongest possible contrast',
    'Quotes carry the claim without us appearing to grade our own work',
    'Cheap, calm, and readable at any size',
  ],
  cons: [
    'Needs two real, attributable customers or it is worthless',
    'Barely animates \u2014 it is a page of type that changes every six seconds',
    'Referring to a carrier outage, even unnamed, needs a legal read',
  ],
  scores: { story: 5, motion: 2, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 12;
    const quotes = [
      {
        lines: ['\u201cI only knew it had switched', 'because the name at the top of', 'the screen changed.\u201d'],
        who: 'Hannah \u00b7 eleven countries in three weeks',
        stats: [['11', 'COUNTRIES'], ['3', 'WEEKS'], ['0', 'SETTINGS TOUCHED']],
      },
      {
        lines: ['\u201cA carrier went down one evening.', 'I read about it in the news the', 'next day, not on my phone.\u201d'],
        who: 'Daniel \u00b7 Rome \u00b7 during a regional outage',
        stats: [['1', 'CARRIER DOWN'], ['38 ms', 'TO MOVE'], ['0', 'CALLS DROPPED']],
      },
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 240, uid)}
    ${mono(96, 54, 'WHAT CUSTOMERS SAY ABOUT THE SWITCHING', { size: 10, op: 0.32 })}
    <text x="88" y="172" font-size="130" font-weight="800" fill="${G.orange}" opacity="0.16">\u201c</text>
    ${quotes.map((q, i) => {
      const on = (i / quotes.length).toFixed(4);
      const b = (i / quotes.length + 0.005).toFixed(4);
      const c = Math.min((i + 1) / quotes.length - 0.005, 1).toFixed(4);
      const d = Math.min((i + 1) / quotes.length, 1).toFixed(4);
      const ls = q.lines.map((t, k) => label(126, 130 + k * 40, t, { size: 24 })).join('');
      const st = q.stats.map(([v, lbl], k) => {
        const x = 96 + k * 152;
        return `${card(x, 320, 140, 76, { r: 13, fill: G.white, stroke: G.line })}
          <text x="${x + 20}" y="${358}" font-size="26" font-weight="800" fill="${G.orange}">${v}</text>
          ${mono(x + 20, 380, lbl, { size: 8.5, op: 0.4 })}`;
      }).join('');
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${on};${b};${c};${d};1"
          dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
        ${ls}
        ${label(126, 286, q.who, { size: 13, op: 0.5 })}
        ${st}
      </g>`;
    }).join('')}
    ${mono(96, 432, 'THE CLAIM IS THE SAME AS THE HEADLINE. THE VOICE IS NOT OURS.', { size: 9.5, op: 0.32 })}`;
    return { svg: gWrap(inner), pills: pillsN('Customer words', null) };
  },
};

/* ══ WHY · 11–15 ═══════════════════════════════════════════════════ */

/* ─── 11 · THE TRANSCRIPT ─────────────────────────────────────── */
export const whyTranscript = {
  id: 'why-transcript',
  name: 'The Transcript',
  family: 'Editorial',
  tagline: 'A support chat, printed in full',
  desc:
    'Four messages between a customer on the Rome metro and support. She says the data died; support ' +
    'replies that it did not \u2014 she moved carrier at 09:13:58 and the session held \u2014 then explains that ' +
    'underground she was on 800 MHz. The section claims advanced technology; a transcript is the only ' +
    'format where the technology answers a real person.',
  pros: [
    'Two voices make the argument instead of us asserting it alone',
    'Shows support can see the switch log, which is itself a differentiator',
    'Warmer and more readable than the six tables already on this board',
  ],
  cons: [
    'Opens with a customer complaining, which is a nerve-holding first frame',
    'Naming carriers in a support script needs sign-off',
    'Four bubbles of text is slow reading beside four feature cards',
  ],
  scores: { story: 5, motion: 3, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 12;
    const msgs = [
      { side: 'them', y: 84, h: 46, t: '09:14', lines: ['My data just died on the metro in Rome.'] },
      { side: 'us', y: 142, h: 70, t: '09:14', lines: ['It didn\u2019t. You moved carrier at 09:13:58', 'and the session never dropped.'] },
      { side: 'them', y: 224, h: 46, t: '09:15', lines: ['So why did it feel slow for a minute?'] },
      { side: 'us', y: 282, h: 70, t: '09:15', lines: ['Down there you were on 800 MHz \u2014 it', 'reaches the platform. 3500 does not.'] },
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 230, uid)}
    ${label(96, 58, 'One support conversation, printed in full', { size: 15, op: 0.5 })}
    ${msgs.map((m, i) => {
      const us = m.side === 'us';
      const x = us ? 224 : 96;
      const on = 0.06 + i * 0.16;
      const t1 = on.toFixed(3);
      const t2 = (on + 0.05).toFixed(3);
      const fill = us ? G.orange : '#F3F4F6';
      const txt = us ? G.white : G.ink;
      const ls = m.lines.map((t, k) =>
        `<text x="${x + 20}" y="${m.y + 30 + k * 24}" font-size="13.5" font-weight="600" fill="${txt}">${t}</text>`).join('');
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${t1};${t2};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <rect x="${x}" y="${m.y}" width="320" height="${m.h}" rx="16" fill="${fill}"/>
        ${ls}
        ${mono(us ? x - 12 : x + 332, m.y + m.h - 8, m.t, { size: 8.5, op: 0.35, anchor: us ? 'end' : 'start' })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.80;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(96, 368, 448, 62, { r: 13, fill: G.wash, stroke: G.orange, sw: 2 })}
      ${label(120, 396, 'Support can see which carrier you were on, and when.', { size: 13.5 })}
      ${mono(120, 418, 'MOST PROVIDERS CANNOT, BECAUSE THERE IS ONLY EVER ONE', { size: 9, op: 0.45, fill: G.deep })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsN('Switch log, per session', null) };
  },
};

/* ─── 12 · ONE SENTENCE ──────────────────────────────────────── */
export const whyOneSentence = {
  id: 'why-onesentence',
  name: 'One Sentence',
  family: 'Typographic',
  tagline: 'The difference, with nothing drawn',
  desc:
    'No grid, no cards, no chart. \u201cMost eSIMs resell one carrier\u201d sits greyed and underlined, then the ' +
    'answer lands large: in each country we contract with three to five. The page already states that ' +
    'figure in body copy where nobody reads it; this is the same claim at the size it deserves, and it ' +
    'is the only option on the board a visitor can take in without stopping.',
  pros: [
    'Readable in under two seconds, which no other option here manages',
    'Uses a figure already published on the page, so nothing new to defend',
    'Cheapest thing on the board to build, localise and maintain',
  ],
  cons: [
    'Some visitors read a text-only panel as an unfinished section',
    'Carries none of the proof the rest of the board offers',
    'A long translation breaks the line lengths and the whole effect',
  ],
  scores: { story: 4, motion: 2, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 10;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 240, uid)}
    ${mono(320, 84, 'THE WHOLE DIFFERENCE, IN ONE SENTENCE', { size: 10, anchor: 'middle', op: 0.32 })}
    ${label(320, 168, 'Most eSIMs resell one carrier.', { size: 28, anchor: 'middle', op: 0.35 })}
    <rect x="116" y="182" width="0" height="3" rx="1.5" fill="${G.orange}" opacity="0.6">
      <animate attributeName="width" values="0;0;408;408" keyTimes="0;0.08;0.22;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </rect>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.26;0.34;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${label(320, 258, 'In each country we contract', { size: 34, anchor: 'middle' })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.40;0.48;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${label(320, 304, 'with three to five.', { size: 34, anchor: 'middle', fill: G.orange })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.70;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(320, 358, 'SO THERE IS ALWAYS A SECOND ONE, AND USUALLY A THIRD', { size: 10, anchor: 'middle', op: 0.42 })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.80;0.88;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(320, 420, 'EVERYTHING ELSE ON THIS PAGE IS DETAIL', { size: 9.5, anchor: 'middle', op: 0.32 })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsN('3\u20135 carriers per country', null) };
  },
};

/* ─── 13 · STREET LEVEL ──────────────────────────────────────── */
export const whyStreetLevel = {
  id: 'why-street',
  name: 'Street Level',
  family: 'Spatial',
  tagline: 'The same address, three depths down',
  desc:
    'A cross-section of one place: the pavement, a caf\u00e9 basement, a metro platform. A phone descends ' +
    'through them while the band it is using changes from 3500 MHz to 2100 to 800, and beside it a ' +
    'single-carrier eSIM loses its bars on the way down. It puts the coverage argument in a building ' +
    'rather than in a table of frequencies.',
  pros: [
    'Places the claim somewhere the visitor has actually stood',
    'Explains why two eSIMs differ in the same street without naming a frequency first',
    'The descending phone gives the loop a direction, which the grid options lack',
  ],
  cons: [
    'A cross-section is an illustration job, not a layout job \u2014 the most drawing on the board',
    'Band-to-depth mapping is a simplification an engineer will want to qualify',
    'Three stacked levels leave little room for labels at 390px',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 3, brand: 4, ease: 2 },
  build: (uid) => {
    const dur = 11;
    const levels = [
      ['Pavement', 'n78 \u00b7 3500 MHz', 4, 4],
      ['Caf\u00e9 basement', 'n1 \u00b7 2100 MHz', 4, 2],
      ['Metro platform', 'B20 \u00b7 800 MHz', 4, 0],
    ];
    const bars = (x, y, on, col) => `<g transform="translate(${x} ${y})">${[0, 1, 2, 3].map(i =>
      `<rect x="${i * 11}" y="${-6 - i * 6}" width="7" height="${6 + i * 6}" rx="2"
        fill="${i < on ? col : G.line}"/>`).join('')}</g>`;
    const inner = `
    ${dots(uid)}
    ${bloom(300, 220, 230, uid)}
    ${label(96, 58, 'One address, three depths', { size: 15, op: 0.5 })}
    ${mono(390, 92, 'OPENLINE', { size: 9, anchor: 'middle', op: 0.6, fill: G.deep })}
    ${mono(486, 92, 'ONE CARRIER', { size: 9, anchor: 'middle', op: 0.42 })}
    ${levels.map(([nm, band, ours, theirs], i) => {
      const y = 104 + i * 102;
      const on = 0.10 + i * 0.22;
      const t1 = on.toFixed(3);
      const t2 = (on + 0.06).toFixed(3);
      return `<g>
        ${card(96, y, 448, 88, { r: 12, fill: i === 0 ? G.white : '#FAFAFB', stroke: G.line })}
        <rect x="96" y="${y}" width="5" height="88" rx="2.5" fill="${i === 2 ? G.gray : G.orange}" opacity="${1 - i * 0.28}"/>
        ${label(124, y + 34, nm, { size: 15 })}
        ${mono(124, y + 56, band, { size: 9.5, op: 0.42 })}
        ${mono(124, y + 76, i === 0 ? 'ABOVE GROUND' : i === 1 ? 'ONE FLOOR DOWN' : 'TWENTY METRES DOWN', { size: 8.5, op: 0.28 })}
        <g opacity="0.25">
          <animate attributeName="opacity" values="0.25;0.25;1;1" keyTimes="0;${t1};${t2};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          ${bars(372, y + 58, ours, G.orange)}
          ${theirs > 0
            ? bars(468, y + 58, theirs, G.gray)
            : `${bars(468, y + 58, 0, G.gray)}${mono(468, y + 78, 'NO SERVICE', { size: 8.5, op: 0.8, fill: G.red })}`}
        </g>
      </g>`;
    }).join('')}
    <line x1="300" y1="116" x2="300" y2="368" stroke="${G.ink}" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.35"/>
    <g>
      <animateMotion dur="${dur}s" keyTimes="0;0.70;1" keyPoints="0;1;1" calcMode="linear"
        path="M 300 132 L 300 358" repeatCount="indefinite"/>
      <rect x="-11" y="-19" width="22" height="38" rx="5" fill="${G.ink}"/>
      <rect x="-8" y="-16" width="16" height="32" rx="3" fill="${G.orange}"/>
    </g>
    ${mono(96, 424, 'THE CHEAP eSIM IS NOT SLOWER DOWN HERE \u2014 IT IS NOT HERE AT ALL', { size: 9.5, op: 0.42, fill: G.deep })}`;
    return { svg: gWrap(inner), pills: pillsN('Full band access', null) };
  },
};

/* ─── 14 · IN THE APP ────────────────────────────────────────── */
export const whyInTheApp = {
  id: 'why-intheapp',
  name: 'In the App',
  family: 'Product demo',
  tagline: 'The network screen, doing the switching',
  desc:
    'The app\u2019s network screen on a phone: who you are connected to, how many carriers are available ' +
    'where you are standing, and a switch history that gains a row while you watch. Everything else on ' +
    'this board argues about the network in the abstract; this shows the screen where a customer can ' +
    'check the claim themselves.',
  pros: [
    'Turns four marketing cards into a feature a customer can open and verify',
    'The switch history gaining a row is proof rather than illustration',
    'Reusable in the app store listing and in onboarding',
  ],
  cons: [
    'Commits the app to a screen that may not exist yet',
    'Covers the same ground as the hero\u2019s carrier readout if both are chosen',
    'Phone-in-a-panel is the most common eSIM visual there is',
  ],
  scores: { story: 4, motion: 4, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const dur = 11;
    const names = ['Vodafone ES', 'Movistar', 'Orange ES'];
    const screen = `
      <rect x="0" y="0" width="190" height="370" fill="#17171C"/>
      <text x="16" y="44" font-size="15" font-weight="700" fill="${G.white}">Network</text>
      <rect x="16" y="58" width="158" height="92" rx="14" fill="${G.orange}"/>
      <text x="32" y="84" font-size="8.5" font-weight="700" letter-spacing="1.1" fill="${G.white}" opacity="0.75"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">CONNECTED TO</text>
      ${names.map((n, i) => {
        const on = (i / names.length).toFixed(4);
        const b = (i / names.length + 0.006).toFixed(4);
        const c = Math.min((i + 1) / names.length - 0.006, 1).toFixed(4);
        const d = Math.min((i + 1) / names.length, 1).toFixed(4);
        return `<g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${on};${b};${c};${d};1"
            dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
          <text x="32" y="112" font-size="18" font-weight="700" fill="${G.white}">${n}</text>
        </g>`;
      }).join('')}
      <text x="32" y="134" font-size="8.5" font-weight="700" letter-spacing="1.1" fill="${G.white}" opacity="0.8"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">5G \u00b7 18 ms \u00b7 n78</text>
      <rect x="16" y="162" width="158" height="44" rx="12" fill="${G.white}" opacity="0.07"/>
      <text x="32" y="182" font-size="8.5" font-weight="700" letter-spacing="1.1" fill="${G.white}" opacity="0.5"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">CARRIERS HERE</text>
      <text x="32" y="199" font-size="11.5" font-weight="700" fill="${G.white}">4 available, 4 contracted</text>
      <text x="16" y="232" font-size="8.5" font-weight="700" letter-spacing="1.1" fill="${G.white}" opacity="0.5"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">SWITCH HISTORY</text>
      ${[['09:14', 'Movistar', '38 ms'], ['08:02', 'Orange ES', '41 ms'], ['07:36', 'Vodafone ES', '36 ms']].map((r, i) => {
        const ry = 244 + i * 34;
        const t1 = (0.30 + i * 0.16).toFixed(3);
        const t2 = (0.36 + i * 0.16).toFixed(3);
        return `<g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${t1};${t2};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <rect x="16" y="${ry}" width="158" height="28" rx="9" fill="${G.white}" opacity="0.06"/>
          <text x="28" y="${ry + 18}" font-size="8.5" font-weight="700" fill="${G.orange}"
            style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${r[0]}</text>
          <text x="66" y="${ry + 18}" font-size="10.5" font-weight="700" fill="${G.white}" opacity="0.9">${r[1]}</text>
          <text x="162" y="${ry + 18}" text-anchor="end" font-size="8.5" font-weight="700" fill="${G.white}" opacity="0.45"
            style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${r[2]}</text>
        </g>`;
      }).join('')}`;
    const inner = `
    ${dots(uid)}
    ${bloom(230, 220, 220, uid)}
    ${label(96, 58, 'You can check it yourself, in the app', { size: 15, op: 0.5 })}
    ${phone({ x: 230, y: 250, w: 200, h: 380, glowId: uid, screen })}
    ${card(384, 150, 176, 200, { r: 14, fill: G.white, stroke: G.line })}
    ${label(406, 184, 'Nothing hidden', { size: 15 })}
    ${[
      'The carrier you are on, named',
      'How many are available here',
      'Every switch, with its latency',
      'No silent downgrade',
    ].map((t, i) => `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.14 + i * 0.14).toFixed(3)};${(0.20 + i * 0.14).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <circle cx="410" cy="${208 + i * 34}" r="3.5" fill="${G.orange}"/>
        <text x="422" y="${212 + i * 34}" font-size="11" font-weight="600" fill="${G.ink}" opacity="0.7">${t}</text>
      </g>`).join('')}
    ${mono(384, 384, 'THE FOUR FEATURE CARDS BESIDE', { size: 9.5, op: 0.35 })}
    ${mono(384, 402, 'THIS PANEL ARE ALL ONE SCREEN', { size: 9.5, op: 0.35 })}
    ${mono(384, 420, 'IN THE APP', { size: 9.5, op: 0.35 })}`;
    return { svg: gWrap(inner), pills: pillsN('Visible in the app', null) };
  },
};

/* ─── 15 · THE RING ─────────────────────────────────────────── */
export const whyTheRing = {
  id: 'why-thering',
  name: 'The Ring',
  family: 'Single gesture',
  tagline: 'Remove one arc and the circle still closes',
  desc:
    'One shape, no table. Four arcs make a ring, one per carrier. A quarter of it goes dark and the two ' +
    'neighbouring arcs immediately stretch to close the gap, so the ring is never broken. It is the ' +
    'redundancy claim as a single gesture, and the only option on this board that still reads as a ' +
    'thumbnail or a favicon.',
  pros: [
    'One idea at one size \u2014 legible at 390px and in the compare tile',
    'No numbers to keep accurate and nothing to translate but the caption',
    'The closing gap is satisfying and repeats well without wearing out',
  ],
  cons: [
    'Abstract: it proves nothing on its own and leans on the caption',
    'Says nothing about speed, bands, coverage or price',
    'A ring implies equal carriers, which is not how the pool actually behaves',
  ],
  scores: { story: 3, motion: 4, perf: 5, mobile: 5, brand: 5, ease: 5 },
  build: (uid) => {
    const dur = 11;
    const cx = 320, cy = 222, r = 112;
    const pol = (a) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
    const arc = (a1, a2) => {
      const [x1, y1] = pol(a1);
      const [x2, y2] = pol(a2);
      const large = a2 - a1 > 180 ? 1 : 0;
      return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
    };
    const quarters = [[5, 85], [95, 175], [185, 265], [275, 355]];
    const labelAt = (a, t) => {
      const [lx, ly] = [cx + (r + 40) * Math.cos((a * Math.PI) / 180), cy + (r + 40) * Math.sin((a * Math.PI) / 180)];
      return mono(lx, ly + 4, t, { size: 9.5, anchor: 'middle', op: 0.5 });
    };
    const inner = `
    ${dots(uid)}
    ${bloom(cx, cy, 230, uid)}
    ${mono(320, 70, 'FOUR CARRIERS, ONE RING', { size: 10, anchor: 'middle', op: 0.32 })}

    <g opacity="1">
      <animate attributeName="opacity" values="1;1;0;0;1;1" keyTimes="0;0.34;0.36;0.74;0.76;1"
        dur="${dur}s" repeatCount="indefinite"/>
      ${quarters.map(([a1, a2]) =>
        `<path d="${arc(a1, a2)}" fill="none" stroke="${G.orange}" stroke-width="18"/>`).join('')}
    </g>

    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.34;0.36;0.74;0.76;1"
        dur="${dur}s" repeatCount="indefinite"/>
      <path d="${arc(95, 175)}" fill="none" stroke="${G.gray}" stroke-width="18" opacity="0.25" stroke-dasharray="9 9"/>
      <path d="${arc(5, 170)}" fill="none" stroke="${G.orange}" stroke-width="18"/>
      <path d="${arc(180, 265)}" fill="none" stroke="${G.orange}" stroke-width="18"/>
      <path d="${arc(275, 355)}" fill="none" stroke="${G.orange}" stroke-width="18"/>
      ${mono(cx, cy + 146, 'ONE CARRIER DOWN \u00b7 RING STILL CLOSED', { size: 9.5, anchor: 'middle', op: 0.6, fill: G.deep })}
    </g>

    ${quarters.map(([a1, a2], i) => labelAt((a1 + a2) / 2, CARRIERS[i].n.toUpperCase())).join('')}

    <circle cx="${cx}" cy="${cy}" r="16" fill="${G.ink}"/>
    <circle cx="${cx}" cy="${cy}" r="16" fill="none" stroke="${G.ink}" stroke-width="2">
      <animate attributeName="r" values="16;34" dur="2.2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.5;0" dur="2.2s" repeatCount="indefinite"/>
    </circle>
    ${mono(cx, cy + 5, '1', { size: 12, anchor: 'middle', fill: G.white, op: 0.9 })}

    ${label(320, 400, 'Take one away and the circle still closes.', { size: 17, anchor: 'middle' })}
    ${mono(320, 428, 'THAT IS WHAT REDUNDANCY MEANS \u00b7 99.9% UPTIME', { size: 9.5, anchor: 'middle', op: 0.35 })}`;
    return { svg: gWrap(inner), pills: pillsN('Redundancy Built-In', null) };
  },
};

/* ── registries ── */
export const NET_HERO_VARIANTS = [netCurrent, handoff, uptime, arcs, race, mesh, hud,
  theFloor, whoYoureOn, whatBreaksFirst,
  netTheMap,
  netTheDay, netThreeNumbers, netTheChip, netTheCall, netToldByTraveller];
export const WHY_VARIANTS = [whyCurrent, sweep, failGrid, stack, procurement, handoverSlow,
  oneCarrierCost, theBands, nightShift, contractLine,
  whyTheIncident,
  whyTranscript, whyOneSentence, whyStreetLevel, whyInTheApp, whyTheRing];
