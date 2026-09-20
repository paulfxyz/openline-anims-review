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
      <animate attributeName="opacity" values="0.16;0.16;0" dur="${DUR}s" keyTimes="0;0.70;0.80" repeatCount="indefinite"/>
    </rect>
    <rect x="${gx(0) + 6}" y="${gy(0) - 8}" width="2.5" height="${GRID_R * CELL + 8}" fill="${G.orange}">
      <animate attributeName="x" values="${gx(0) + 6};${gx(GRID_C - 1) + 20};${gx(GRID_C - 1) + 20}" dur="${DUR}s"
        keyTimes="0;0.70;1" calcMode="linear" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;1;0" dur="${DUR}s" keyTimes="0;0.70;0.80" repeatCount="indefinite"/>
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

export const NET_HERO_VARIANTS = [netCurrent, handoff, uptime, arcs, race, mesh, hud];
export const WHY_VARIANTS = [whyCurrent, sweep, failGrid, stack];
