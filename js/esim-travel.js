import { G, gWrap, bloom, dots, phone, mono, label, card, gPill, gIcon } from './g-shared.js';

const pillsB = (right = 'One eSIM, every border') => [
  gPill('orange', `${gIcon('plane')}${right}`, { top: '14px', right: '14px' }),
  gPill('ink', `${gIcon('shield')}No ID, no forms`, { bottom: '20px', left: '14px' }),
];

/* ══════════════════════════════════════════════════════════════════
   0 · CURRENT — replica of the three stacked comparison lanes
   ══════════════════════════════════════════════════════════════════ */
export const travelCurrent = {
  id: 'travel-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'Three stacked rows, three cost bars',
  desc: 'Three near-identical cards — local SIM cards, carrier roaming, Openline — each with a dot crawling a track and a COST bar underneath. The Openline row gets an orange border and a shorter bar. The comparison is sound, but the three rows look the same at a glance, the cost bars are abstract, and a quarter of the panel below the last card is empty.',
  pros: ['Honest side-by-side framing that survives scrutiny', 'Cheap, and the orange row is unmistakable'],
  cons: ['Three rows of the same shape — the eye has nothing to follow', 'A bar labelled COST with no unit persuades nobody', 'No sense of place, so "three countries" is only a caption', 'Bottom quarter of the panel is dead space'],
  scores: { story: 3, motion: 3, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const rows = [
      { y: 88, t: 'Local SIM cards', m: 'A NEW CARD AT EACH BORDER', c: G.red, cost: 1, dot: 0.96, stops: [0.34, 0.66], icon: 'card' },
      { y: 196, t: 'Carrier roaming', m: 'GETS THROUGH, AT A PRICE', c: G.amber, cost: 0.92, dot: 0.7, stops: [], icon: 'bars' },
      { y: 304, t: 'Openline global eSIM', m: 'ONE ESIM, NO STOPS', c: G.orange, cost: 0.24, dot: 0.86, stops: [], icon: 'zap', on: true },
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 330, 230, uid)}
    ${mono(40, 56, 'ONE TRIP · THREE COUNTRIES', { size: 10.5, op: 0.32 })}
    ${rows.map((r, i) => `
      <g transform="translate(40 ${r.y})">
        ${card(0, 0, 560, 86, { r: 16, fill: G.white, stroke: r.on ? G.orange : G.line, sw: r.on ? 2.5 : 1.5 })}
        <g transform="translate(22 26)">
          ${r.icon === 'card' ? `<rect x="0" y="0" width="17" height="13" rx="2.5" fill="none" stroke="${r.c}" stroke-width="2"/><path d="M 0 5 H 17" stroke="${r.c}" stroke-width="2"/>`
            : r.icon === 'bars' ? `<path d="M 1 13 V 10 M 6 13 V 6 M 11 13 V 2 M 16 13 V 7" stroke="${r.c}" stroke-width="2.2" stroke-linecap="round"/>`
            : `<path d="M 9 0 L 2 8 H 8 L 6 14 L 15 5 H 9 Z" fill="${r.c}"/>`}
        </g>
        ${label(52, 36, r.t, { size: 15 })}
        ${mono(538, 35, r.m, { size: 9.5, anchor: 'end', op: 0.4, fill: r.c })}
        <line x1="22" y1="58" x2="538" y2="58" stroke="${G.line}" stroke-width="2"/>
        ${r.stops.map(s => `<circle cx="${22 + s * 516}" cy="58" r="6" fill="${G.white}" stroke="${G.gray}" stroke-width="2"/>`).join('')}
        <circle cx="${22 + r.dot * 516}" cy="58" r="8.5" fill="${r.c}" stroke="${G.ink}" stroke-width="2">
          <animate attributeName="cx" values="${22 + r.dot * 516};${22 + r.dot * 516 - 8};${22 + r.dot * 516}"
            dur="${3 + i * 0.4}s" repeatCount="indefinite"/>
        </circle>
        ${mono(22, 80, 'COST', { size: 8.5, op: 0.3 })}
        <line x1="56" y1="76" x2="538" y2="76" stroke="${G.line}" stroke-width="3" stroke-linecap="round"/>
        <line x1="56" y1="76" x2="${56 + r.cost * 482}" y2="76" stroke="${r.c}" stroke-width="3" stroke-linecap="round"/>
      </g>`).join('')}`;
    return { svg: gWrap(inner), pills: pillsB('One eSIM, every border') };
  },
};

/* ══════════════════════════════════════════════════════════════════
   1 · BORDER RUN — one journey, two travellers, three borders
   ══════════════════════════════════════════════════════════════════ */
export const borderRun = {
  id: 'borderrun',
  name: 'Border Run',
  family: 'Narrative',
  tagline: 'The same trip, run twice, on one line',
  desc: 'A single itinerary line — Lisbon, Madrid, Rome, Tokyo — with two travellers on it. The plastic-SIM traveller halts at every border while a spinner reads "find a shop", "new card", "top up". The Openline traveller never stops: the network label above it just changes mid-stride. Same argument as today, but one continuous line instead of three parallel rows, and real place names instead of a caption.',
  pros: ['One line to follow, so the eye always knows where to look', 'Named cities make "three countries" concrete', 'The stop-and-go rhythm gives the loop built-in tension', 'Fills the frame edge to edge with no dead quarter'],
  cons: ['City names need localising with the rest of the page', 'Two travellers on one line needs spacing care at 390 px'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const stops = [
      { x: 192, n: 'Lisbon', d: 'DEPART' },
      { x: 324, n: 'Madrid', d: 'BORDER' },
      { x: 456, n: 'Rome', d: 'BORDER' },
      { x: 588, n: 'Tokyo', d: 'BORDER' },
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(340, 250, 250, uid)}
    ${mono(40, 44, 'ONE TRIP · FOUR NETWORKS · ZERO SWAPS', { size: 10.5, op: 0.32 })}

    <!-- the itinerary line -->
    <line x1="192" y1="250" x2="588" y2="250" stroke="${G.line}" stroke-width="6" stroke-linecap="round"/>
    ${stops.map((s, i) => `
      <g transform="translate(${s.x} 250)">
        ${i > 0 ? `<line x1="0" y1="-62" x2="0" y2="62" stroke="${G.gray}" stroke-width="1.5" stroke-dasharray="4 5" opacity="0.5"/>` : ''}
        <circle r="10" fill="${G.white}" stroke="${G.ink}" stroke-width="2.5"/>
        <circle r="4" fill="${G.ink}" opacity="0.6"/>
        ${label(0, -20, s.n, { size: 13.5, anchor: 'middle', op: 0.8 })}
        ${mono(0, 30, s.d, { size: 8.5, anchor: 'middle', op: 0.28 })}
      </g>`).join('')}

    <!-- ── lane A · plastic traveller, above the line ── -->
    ${label(40, 158, 'Plastic SIM', { size: 14.5, op: 0.55 })}
    ${mono(40, 178, 'stops at every border', { size: 9.5, op: 0.28 })}
    <g class="trav-a">
      <animateTransform attributeName="transform" type="translate" dur="12s" repeatCount="indefinite"
        keyTimes="0;0.14;0.31;0.45;0.62;0.76;0.93;1"
        values="192,166; 324,166; 324,166; 456,166; 456,166; 588,166; 588,166; 588,166"
        calcMode="spline" keySplines="0.4 0 0.3 1;0 0 1 1;0.4 0 0.3 1;0 0 1 1;0.4 0 0.3 1;0 0 1 1;0 0 1 1"/>
      <circle r="15" fill="#F3F4F6" stroke="${G.gray}" stroke-width="2.5"/>
      <rect x="-7" y="-5" width="14" height="10" rx="2" fill="${G.gray}"/>
      <g opacity="0">
        <animate attributeName="opacity" values="0;1;1;0;0;1;1;0;0;1;1;0"
          dur="12s" keyTimes="0;0.15;0.29;0.32;0.46;0.47;0.60;0.63;0.77;0.78;0.91;1" repeatCount="indefinite"/>
        <circle r="22" fill="none" stroke="${G.red}" stroke-width="2.5" stroke-dasharray="26 112" stroke-linecap="round">
          <animateTransform attributeName="transform" type="rotate" values="0;360" dur="1.1s" repeatCount="indefinite"/>
        </circle>
      </g>
      <g transform="translate(0 -40)">
        <rect x="-56" y="-17" width="112" height="26" rx="13" fill="${G.red}" opacity="0">
          <animate attributeName="opacity" values="0;0.95;0.95;0;0;0.95;0.95;0;0;0.95;0.95;0"
            dur="12s" keyTimes="0;0.15;0.29;0.32;0.46;0.47;0.60;0.63;0.77;0.78;0.91;1" repeatCount="indefinite"/>
        </rect>
        <text y="1" text-anchor="middle" font-size="10.5" font-weight="700" fill="${G.white}" opacity="0"
          letter-spacing="0.6" style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">
          <animate attributeName="opacity" values="0;1;1;0;0;1;1;0;0;1;1;0"
            dur="12s" keyTimes="0;0.15;0.29;0.32;0.46;0.47;0.60;0.63;0.77;0.78;0.91;1" repeatCount="indefinite"/>
          <tspan data-role="stall">FIND A SHOP</tspan>
        </text>
      </g>
    </g>

    <!-- ── lane B · Openline traveller, below the line ── -->
    ${label(40, 326, 'Openline eSIM', { size: 14.5, fill: G.deep })}
    ${mono(40, 346, 'never stops, never swaps', { size: 9.5, op: 0.32, fill: G.deep })}
    <line x1="192" y1="334" x2="588" y2="334" stroke="${G.orange}" stroke-width="4" stroke-linecap="round"
      opacity="0.22" stroke-dasharray="14 10">
      <animate attributeName="stroke-dashoffset" values="0;-24" dur="0.8s" repeatCount="indefinite"/>
    </line>
    <g class="trav-b">
      <animateTransform attributeName="transform" type="translate" dur="12s" repeatCount="indefinite"
        keyTimes="0;1" values="192,334; 592,334" calcMode="linear"/>
      <circle r="16" fill="${G.orange}"/>
      <circle r="16" fill="none" stroke="${G.orange}" stroke-width="2.5" opacity="0.55">
        <animate attributeName="r" values="16;32" dur="1.9s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.55;0" dur="1.9s" repeatCount="indefinite"/>
      </circle>
      <path d="M -4 -7 L 4 0 L -4 7 Z" fill="${G.white}"/>
      <g transform="translate(0 42)">
        <rect x="-62" y="-15" width="124" height="27" rx="13.5" fill="${G.ink}"/>
        <text y="4" text-anchor="middle" font-size="11" font-weight="700" fill="${G.white}"
          letter-spacing="0.6" style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">
          <tspan data-role="net">MEO · LIVE</tspan>
        </text>
      </g>
    </g>

    <g transform="translate(192 416)">
      <rect x="0" y="0" width="238" height="32" rx="16" fill="${G.orange}"/>
      <text x="119" y="21" text-anchor="middle" font-size="12.5" font-weight="700" fill="${G.white}"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">0 swaps · 0 shops · 0 forms</text>
    </g>`;

    return {
      svg: gWrap(inner),
      pills: pillsB('4 networks, 1 eSIM'),
      init(root) {
        const stall = root.querySelector('[data-role="stall"]');
        const net = root.querySelector('[data-role="net"]');
        if (!stall || !net) return null;
        const stalls = ['FIND A SHOP', 'NEW CARD', 'TOP UP AGAIN'];
        const nets = ['MEO · LIVE', 'VODAFONE ES · LIVE', 'TIM IT · LIVE', 'NTT JP · LIVE'];
        let k = 0;
        const t0 = setInterval(() => { stall.textContent = stalls[k % stalls.length]; k++; }, 4000);
        let j = 0;
        const t1 = setInterval(() => { j = (j + 1) % nets.length; net.textContent = nets[j]; }, 3000);
        return () => { clearInterval(t0); clearInterval(t1); };
      },
    };
  },
};

/* ══════════════════════════════════════════════════════════════════
   2 · ONE CARD, THREE FLAGS — the calm, premium option
   ══════════════════════════════════════════════════════════════════ */
export const oneCard = {
  id: 'onecard',
  name: 'One Card, Every Flag',
  family: 'Premium / calm',
  tagline: 'Nothing moves except the network name',
  desc: 'A single Openline eSIM card sits centred, throughput ticking on its face. As the trip advances, only the network label and flag change — Vodafone ES, TIM IT, NTT JP — with a soft handoff ripple and no interruption to the data flow. Underneath, three counters stay pinned at zero: swaps, shops, forms. The quietest option, and the one that reads most like a finished product rather than a diagram.',
  pros: ['Calmest motion on the board — never competes with the copy', 'Continuity is the whole message: the flow literally never breaks', 'Smallest, sharpest frame; survives 390 px untouched', 'Zero-counters are the most persuasive line on the panel'],
  cons: ['Less dramatic than a comparison — no villain', 'Needs real network names kept accurate per region'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 5, ease: 5 },
  build: (uid) => {
    const inner = `
    ${dots(uid)}
    ${bloom(320, 208, 230, uid)}
    ${mono(40, 50, 'ONE eSIM · FOUR COUNTRIES · ONE SESSION', { size: 10.5, op: 0.32 })}

    <!-- handoff ripple -->
    <g transform="translate(320 208)">
      <circle r="120" fill="none" stroke="${G.orange}" stroke-width="2" opacity="0">
        <animate attributeName="r" values="86;172" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.4;0" dur="3s" repeatCount="indefinite"/>
      </circle>
    </g>

    <!-- the card -->
    <g transform="translate(320 208)">
      <rect x="-172" y="-104" width="344" height="208" rx="26" fill="${G.ink}"/>
      <rect x="-172" y="-104" width="344" height="208" rx="26" fill="none" stroke="${G.orange}" stroke-width="2.5" opacity="0.55"/>
      <!-- brand row -->
      <g transform="translate(-142 -66)">
        <path d="M 14 0 A 14 14 0 1 0 28 14" fill="none" stroke="${G.white}" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="25" cy="3" r="4.5" fill="${G.orange}"/>
        <text x="42" y="14" font-size="16" font-weight="700" fill="${G.white}">Openline</text>
      </g>
      ${mono(142, -52, 'GLOBAL eSIM', { size: 9, anchor: 'end', fill: G.white, op: 0.4 })}

      <!-- chip -->
      <g transform="translate(-142 -24)">
        <rect x="0" y="0" width="52" height="40" rx="7" fill="${G.orange}" opacity="0.9"/>
        <path d="M 0 13 H 52 M 0 27 H 52 M 17 0 V 40 M 35 0 V 40" stroke="${G.ink}" stroke-width="2" opacity="0.35"/>
      </g>

      <!-- live network label -->
      <g transform="translate(-76 -10)">
        ${mono(0, 0, 'CONNECTED VIA', { size: 8.5, fill: G.white, op: 0.38 })}
        <text y="26" font-size="22" font-weight="700" fill="${G.white}">
          <tspan data-role="flag">🇵🇹</tspan> <tspan data-role="netname">MEO</tspan>
        </text>
        <g transform="translate(2 44)">
          <circle r="4" fill="#4ADE80"/>
          <circle r="4" fill="none" stroke="#4ADE80" stroke-width="1.5">
            <animate attributeName="r" values="4;11" dur="1.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.7;0" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          ${mono(14, 4, 'SESSION NEVER DROPPED', { size: 8.5, fill: G.white, op: 0.45 })}
        </g>
      </g>

      <!-- throughput trace along the bottom of the card -->
      <g transform="translate(-142 74)">
        <path d="M 0 0 H 284" stroke="${G.white}" stroke-width="2" opacity="0.1"/>
        <path d="M 0 0 C 22 -16 44 14 66 0 C 88 -16 110 14 132 0 C 154 -16 176 14 198 0 C 220 -16 242 14 264 0 C 276 -8 282 -4 284 0"
          fill="none" stroke="${G.orange}" stroke-width="2.5" stroke-linecap="round" opacity="0.85">
          <animateTransform attributeName="transform" type="translate" values="-66,0;0,0" dur="1.6s" repeatCount="indefinite"/>
        </path>
        ${mono(0, 24, 'DATA FLOWING', { size: 8.5, fill: G.white, op: 0.35 })}
        <text x="284" y="28" text-anchor="end" font-size="11" font-weight="700" fill="${G.orange}"
          style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><tspan data-role="mbps">42.6 Mbps</tspan></text>
      </g>
    </g>

    <!-- zero counters -->
    <g transform="translate(164 366)">
      ${[['0', 'SIM SWAPS'], ['0', 'SHOPS'], ['0', 'FORMS']].map((c, i) => `
        <g transform="translate(${i * 156} 0)">
          ${card(0, 0, 146, 66, { r: 16, fill: G.white, stroke: G.line })}
          <text x="18" y="44" font-size="30" font-weight="700" fill="${G.orange}">${c[0]}</text>
          ${mono(50, 42, c[1], { size: 9.5, op: 0.4 })}
        </g>`).join('')}
    </g>`;

    return {
      svg: gWrap(inner),
      pills: pillsB('Handoff you never feel'),
      init(root) {
        const flag = root.querySelector('[data-role="flag"]');
        const name = root.querySelector('[data-role="netname"]');
        const mbps = root.querySelector('[data-role="mbps"]');
        if (!flag || !name) return null;
        const nets = [['🇵🇹', 'MEO'], ['🇪🇸', 'Vodafone ES'], ['🇮🇹', 'TIM IT'], ['🇯🇵', 'NTT JP']];
        let i = 0;
        const t0 = setInterval(() => {
          i = (i + 1) % nets.length;
          flag.textContent = nets[i][0];
          name.textContent = nets[i][1];
        }, 3000);
        const t1 = setInterval(() => {
          if (mbps) mbps.textContent = (36 + Math.random() * 18).toFixed(1) + ' Mbps';
        }, 900);
        return () => { clearInterval(t0); clearInterval(t1); };
      },
    };
  },
};

/* ══════════════════════════════════════════════════════════════════
   3 · TRIP TAPE — the itinerary as a live feed
   ══════════════════════════════════════════════════════════════════ */
export const tripTape = {
  id: 'triptape',
  name: 'Trip Tape',
  family: 'Data-led',
  tagline: 'The itinerary checks itself off',
  desc: 'An itinerary tape scrolls upward beside the phone. Each leg arrives blank, then fills itself in — network found, signal, data used, cost — and stamps a check. The phone mirrors the active leg. No illustration at all: it reads like the Openline app working, which is exactly what the eight bullets beside it describe, and it extends to any number of countries without redesign.',
  pros: ['Looks like a real product surface, not marketing artwork', 'Scales to any itinerary length — add rows, nothing breaks', 'Every row is a feature from the bullet list, shown not told', 'Lightest of the three; pure type and rules'],
  cons: ['Least emotional — no journey, no place, no drama', 'Dense: needs the row count cut on a phone', 'Invites the question "are these real numbers?"'],
  scores: { story: 4, motion: 5, perf: 5, mobile: 3, brand: 3, ease: 4 },
  build: (uid) => {
    const legs = [
      { c: '🇵🇹 Lisbon', net: 'MEO', d: '0.8 GB', s: 4 },
      { c: '🇪🇸 Madrid', net: 'Vodafone ES', d: '1.4 GB', s: 4 },
      { c: '🇮🇹 Rome', net: 'TIM IT', d: '2.1 GB', s: 3 },
      { c: '🇯🇵 Tokyo', net: 'NTT JP', d: '3.6 GB', s: 4 },
      { c: '🇹🇭 Bangkok', net: 'AIS', d: '1.2 GB', s: 4 },
    ];
    const rowH = 66;
    const inner = `
    ${dots(uid)}
    ${bloom(400, 230, 240, uid)}
    ${mono(40, 46, 'ITINERARY · AUTO-CONNECTED', { size: 10.5, op: 0.32 })}

    <!-- phone mirrors the active leg -->
    ${phone({
      x: 100, y: 246, w: 132, h: 250, glowId: uid, screen: `
      <rect x="0" y="0" width="122" height="240" fill="#17171C"/>
      ${mono(14, 36, 'CURRENT LEG', { size: 8.5, fill: G.white, op: 0.4 })}
      <text x="14" y="62" font-size="15" font-weight="700" fill="${G.white}"><tspan data-role="pcity">Rome</tspan></text>
      <rect x="14" y="76" width="94" height="1" fill="${G.white}" opacity="0.12"/>
      ${mono(14, 100, 'NETWORK', { size: 8, fill: G.white, op: 0.35 })}
      <text x="14" y="120" font-size="11.5" font-weight="700" fill="${G.orange}"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><tspan data-role="pnet">TIM IT</tspan></text>
      ${mono(14, 148, 'DATA USED', { size: 8, fill: G.white, op: 0.35 })}
      <text x="14" y="168" font-size="11.5" font-weight="700" fill="${G.white}"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><tspan data-role="pdata">2.1 GB</tspan></text>
      <g transform="translate(14 198)">
        <rect x="0" y="0" width="94" height="26" rx="13" fill="${G.orange}" opacity="0.2"/>
        ${mono(47, 17, 'CONNECTED', { size: 8.5, anchor: 'middle', fill: G.orange, op: 0.95 })}
      </g>` })}

    <!-- the tape -->
    <g transform="translate(212 80)">
      ${card(0, 0, 388, 300, { r: 18, fill: G.white, stroke: G.line })}
      <g transform="translate(0 0)">
        <rect x="0" y="0" width="388" height="40" rx="18" fill="${G.wash}"/>
        <rect x="0" y="26" width="388" height="14" fill="${G.wash}"/>
        ${mono(20, 26, 'STOP', { size: 9, op: 0.4 })}
        ${mono(150, 26, 'NETWORK FOUND', { size: 9, op: 0.4 })}
        ${mono(286, 26, 'DATA', { size: 9, op: 0.4 })}
        ${mono(368, 26, 'OK', { size: 9, op: 0.4, anchor: 'end' })}
        <line x1="0" y1="40" x2="388" y2="40" stroke="${G.line}" stroke-width="1.5"/>
      </g>
      <svg x="1" y="41" width="386" height="258" viewBox="0 0 386 258" overflow="hidden">
        <g class="tape">
          ${[...legs, ...legs].map((l, i) => `
          <g class="leg" data-leg="${i % legs.length}" transform="translate(0 ${i * rowH})">
            <line x1="19" y1="${rowH - 1}" x2="367" y2="${rowH - 1}" stroke="${G.line}" stroke-width="1.2"/>
            <text x="19" y="${rowH / 2 + 5}" font-size="14" font-weight="700" fill="${G.ink}">${l.c}</text>
            <text x="149" y="${rowH / 2 + 5}" font-size="12" font-weight="700" fill="${G.deep}"
              style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${l.net}</text>
            <g transform="translate(149 ${rowH / 2 + 18})">
              ${[0, 1, 2, 3].map(b => `<rect x="${b * 8}" y="${-4 - b * 3}" width="5" height="${4 + b * 3}" rx="1.5"
                fill="${b < l.s ? G.orange : G.line}"/>`).join('')}
            </g>
            <text x="285" y="${rowH / 2 + 5}" font-size="12.5" font-weight="700" fill="${G.ink}" opacity="0.6"
              style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${l.d}</text>
            <g transform="translate(356 ${rowH / 2})">
              <circle r="11" fill="${G.orange}" opacity="0.12"/>
              <path d="M -4.5 0.5 L -1 4 L 5 -3" fill="none" stroke="${G.orange}" stroke-width="2.6"
                stroke-linecap="round" stroke-linejoin="round"/>
            </g>
          </g>`).join('')}
          <animateTransform attributeName="transform" type="translate" values="0,0;0,${-legs.length * rowH}"
            dur="${legs.length * 2.6}s" repeatCount="indefinite" calcMode="linear"/>
        </g>
      </svg>
      <!-- active row highlight -->
      <rect x="1" y="${41 + 2 * rowH}" width="386" height="${rowH}" fill="none" stroke="${G.orange}" stroke-width="2.5" rx="8" opacity="0.8"/>
      <rect x="1" y="${41 + 2 * rowH}" width="386" height="${rowH}" fill="${G.orange}" opacity="0.05"/>
    </g>
    ${mono(212, 406, 'AUTOMATIC NETWORK SELECTION · NO REGISTRATION · NO ID', { size: 10, op: 0.3 })}
    ${mono(212, 426, 'TOP UP ANYWHERE · ONE APP · NUMBER KEPT ACTIVE', { size: 10, op: 0.3 })}`;

    return {
      svg: gWrap(inner),
      pills: pillsB('Every leg, handled'),
      init(root) {
        const legsData = [
          ['Lisbon', 'MEO', '0.8 GB'], ['Madrid', 'Vodafone ES', '1.4 GB'],
          ['Rome', 'TIM IT', '2.1 GB'], ['Tokyo', 'NTT JP', '3.6 GB'], ['Bangkok', 'AIS', '1.2 GB'],
        ];
        const c = root.querySelector('[data-role="pcity"]');
        const n = root.querySelector('[data-role="pnet"]');
        const d = root.querySelector('[data-role="pdata"]');
        if (!c) return null;
        let i = 2; // aligned with the row sitting in the highlight band at t=0
        const id = setInterval(() => {
          i = (i + 1) % legsData.length;
          c.textContent = legsData[i][0];
          n.textContent = legsData[i][1];
          d.textContent = legsData[i][2];
        }, 2600);
        return () => clearInterval(id);
      },
    };
  },
};

export const TRAVEL_VARIANTS = [travelCurrent, borderRun, oneCard, tripTape];
