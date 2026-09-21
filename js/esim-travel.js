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


/* ══════════════════════════════════════════════════════════════════
   4–9 · six further directions for "Everything You Need for
   Seamless Travel". Same 640 × 460 box, same orange system.
   ══════════════════════════════════════════════════════════════════ */

/* ─── 4 · THE BILL ───────────────────────────────────────────────── */
export const theBill = {
  id: 'travel-bill',
  name: 'The Bill',
  family: 'Cost',
  tagline: 'A roaming invoice building against a flat line',
  desc:
    'Two weeks of a trip drawn as money. The roaming line steps up every day and never comes back ' +
    'down — $12, $24, $36 — while the Openline line is paid once on day one and stays flat. The gap ' +
    'between them shades in, and the total is named at the end. Nothing else on this board makes the ' +
    'reader wince.',
  pros: [
    'Money is the only unit that makes roaming feel dangerous',
    'The shaded gap needs no legend and no explanation',
    'Fourteen daily steps give it a real sense of accumulation',
  ],
  cons: ['Depends on a roaming figure we should be able to cite', 'Purely financial — no product, no place'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 12, days = 14, per = 12, flat = 19;
    const x0 = 110, x1 = 560, y0 = 372, yTop = 110;
    const maxV = per * days;
    const px = (d) => x0 + (d / days) * (x1 - x0);
    const py = (v) => y0 - (v / maxV) * (y0 - yTop);
    const roam = Array.from({ length: days + 1 }, (_, d) => `${px(d).toFixed(0)} ${py(d * per).toFixed(0)}`);
    const inner = `
    ${dots(uid)}
    ${bloom(340, 210, 250, uid)}
    ${label(110, 62, 'Fourteen days abroad, in money', { size: 15, op: 0.5 })}
    <line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="${G.line}" stroke-width="2"/>
    ${[0, 42, 84, 126, 168].map((v) => `
      <line x1="${x0}" y1="${py(v)}" x2="${x1}" y2="${py(v)}" stroke="${G.line}" stroke-width="1" opacity="0.6"/>
      ${mono(x0 - 12, py(v) + 4, `$${v}`, { size: 9.5, anchor: 'end', op: 0.4 })}`).join('')}

    <!-- the gap between the two lines -->
    <path d="M ${roam.join(' L ')} L ${px(days).toFixed(0)} ${py(flat).toFixed(0)} L ${x0} ${py(flat).toFixed(0)} Z"
      fill="${G.red}" opacity="0">
      <animate attributeName="opacity" values="0;0;0.1;0.1" keyTimes="0;0.6;0.72;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </path>

    <!-- roaming, stepping up daily -->
    <polyline points="${roam.join(' ')}" fill="none" stroke="${G.red}" stroke-width="3"
      stroke-linecap="round" stroke-dasharray="1200" stroke-dashoffset="1200">
      <animate attributeName="stroke-dashoffset" values="1200;0;0" keyTimes="0;0.6;1"
        dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </polyline>
    ${Array.from({ length: days + 1 }, (_, d) => d).filter((d) => d % 2 === 0 && d > 0).map((d) => `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.04 + (d / days) * 0.56).toFixed(3)};${(0.07 + (d / days) * 0.56).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <circle cx="${px(d).toFixed(0)}" cy="${py(d * per).toFixed(0)}" r="3.5" fill="${G.red}"/>
      </g>`).join('')}

    <!-- openline, paid once -->
    <line x1="${x0}" y1="${py(flat)}" x2="${x1}" y2="${py(flat)}" stroke="${G.orange}" stroke-width="3.5"
      stroke-dasharray="460" stroke-dashoffset="460">
      <animate attributeName="stroke-dashoffset" values="460;0;0" keyTimes="0;0.2;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </line>
    <circle cx="${x0}" cy="${py(flat)}" r="5" fill="${G.orange}"/>
    ${label(x0 + 10, py(flat) - 14, 'Openline — $19, paid once', { size: 12.5, fill: G.orange })}

    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${label(x1, py(maxV) - 16, 'Roaming — $168', { size: 13, anchor: 'end', fill: G.red })}
      ${card(384, 396, 176, 44, { r: 11, fill: G.wash, stroke: G.orange, sw: 2 })}
      ${label(400, 424, '$149 not spent', { size: 15, fill: G.orange })}
    </g>
    ${mono(110, 424, 'ONE TRIP, ONE PHONE', { size: 9.5, op: 0.35 })}`;
    return { svg: gWrap(inner), pills: pillsB('$19, not $168') };
  },
};

/* ─── 5 · SEVEN BORDERS ──────────────────────────────────────────── */
export const sevenBorders = {
  id: 'travel-seven',
  name: 'Seven Borders',
  family: 'Coverage',
  tagline: 'An itinerary that never disconnects',
  desc:
    'A real route — Lisbon, Madrid, Paris, Berlin, Warsaw, Istanbul, Dubai — drawn as a single ' +
    'continuous line with the signal bar never dropping. Each border crossing flashes the country ' +
    'code and the network it handed over to, and the connection counter keeps counting. It is the ' +
    'clearest possible statement of "one eSIM, every border".',
  pros: [
    'Names real cities and real handovers instead of an abstract globe',
    'The unbroken signal bar is the whole promise in one element',
    'Handover labels make it credible to somebody who knows how roaming works',
  ],
  cons: ['Seven labels is tight at this width', 'Implies coverage parity we should verify per route'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 3, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 14;
    const stops = [
      ['Lisbon', 'PT', 'MEO'], ['Madrid', 'ES', 'Movistar'], ['Paris', 'FR', 'Orange'],
      ['Berlin', 'DE', 'Telekom'], ['Warsaw', 'PL', 'Plus'], ['Istanbul', 'TR', 'Turkcell'],
      ['Dubai', 'AE', 'Etisalat'],
    ];
    const x0 = 78, x1 = 566, y = 210;
    const px = (i) => x0 + (i / (stops.length - 1)) * (x1 - x0);
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 260, uid)}
    ${label(78, 62, 'One plan, seven borders, no gap', { size: 15, op: 0.5 })}
    <path d="M ${px(0)} ${y} ${stops.map((_, i) => i ? `Q ${((px(i - 1) + px(i)) / 2).toFixed(0)} ${y - (i % 2 ? 34 : -34)}, ${px(i).toFixed(0)} ${y}` : '').join(' ')}"
      fill="none" stroke="${G.line}" stroke-width="2.5"/>
    <path d="M ${px(0)} ${y} ${stops.map((_, i) => i ? `Q ${((px(i - 1) + px(i)) / 2).toFixed(0)} ${y - (i % 2 ? 34 : -34)}, ${px(i).toFixed(0)} ${y}` : '').join(' ')}"
      fill="none" stroke="${G.orange}" stroke-width="3.5" stroke-linecap="round"
      stroke-dasharray="900" stroke-dashoffset="900">
      <animate attributeName="stroke-dashoffset" values="900;0;0" keyTimes="0;0.7;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </path>
    ${stops.map(([city, cc, net], i) => {
      const on = (i / stops.length) * 0.7;
      return `<g>
        <circle cx="${px(i).toFixed(0)}" cy="${y}" r="6" fill="${G.white}" stroke="${G.line}" stroke-width="2.5"/>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(4)};${(on + 0.03).toFixed(4)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <circle cx="${px(i).toFixed(0)}" cy="${y}" r="6" fill="${G.orange}"/>
          ${mono(px(i).toFixed(0), i % 2 ? y - 48 : y + 34, cc, { size: 11, anchor: 'middle', op: 0.8, fill: G.orange })}
          ${label(px(i).toFixed(0), i % 2 ? y - 30 : y + 52, city, { size: 11.5, anchor: 'middle', op: 0.75 })}
          ${mono(px(i).toFixed(0), i % 2 ? y - 16 : y + 68, net, { size: 9, anchor: 'middle', op: 0.38 })}
        </g>
      </g>`;
    }).join('')}

    <!-- the signal bar that never drops -->
    ${card(78, 336, 488, 76, { r: 14, fill: G.white, stroke: G.line })}
    ${mono(100, 362, 'SIGNAL, ACROSS ALL SEVEN', { size: 9.5, op: 0.42 })}
    ${Array.from({ length: 40 }, (_, i) => `
      <rect x="${100 + i * 11.5}" y="374" width="7" height="24" rx="2" fill="${G.orange}" opacity="0.85"/>`).join('')}
    ${label(544, 396, '100%', { size: 14, anchor: 'end', fill: G.orange })}`;
    return { svg: gWrap(inner), pills: pillsB('Seven borders, one plan') };
  },
};

/* ─── 6 · THE DRAWER OF SIMS ─────────────────────────────────────── */
export const drawerOfSims = {
  id: 'travel-drawer',
  name: 'The Drawer',
  family: 'Comparison',
  tagline: 'What the old way leaves behind',
  desc:
    'A drawer of dead SIM cards from previous trips — Thailand 2019, Peru 2022, a snapped Japanese ' +
    'one — each with the money still stranded on it. The drawer closes and a single line replaces it. ' +
    'It is the funniest option on the board and the only one that makes the alternative look absurd ' +
    'rather than merely expensive.',
  pros: [
    'Immediately recognisable to anybody who has travelled with plastic',
    'Humour is rare in this category and lands hard',
    'The stranded balances are a cost nobody thinks about',
  ],
  cons: ['Depends on illustration quality to avoid looking cheap', 'Nostalgic rather than forward-looking'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 11;
    const sims = [
      ['Thailand', '2019', '$4.20 left'],
      ['Peru', '2022', '$1.80 left'],
      ['Japan', '2023', 'snapped'],
      ['Kenya', '2024', '$7.10 left'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 250, uid)}
    ${label(96, 62, 'The drawer, after four trips', { size: 15, op: 0.5 })}
    ${card(96, 92, 448, 200, { r: 16, fill: '#F8F8F9', stroke: G.line })}
    ${sims.map(([ct, yr, bal], i) => {
      const y = 114 + i * 44;
      const dead = bal === 'snapped';
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.04 + i * 0.09).toFixed(3)};${(0.08 + i * 0.09).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(120, y, 76, 34, { r: 6, fill: '#EDEEF0', stroke: '#D8DADE' })}
        <path d="M 128 ${y + 30} L 168 ${y + 4}" stroke="${dead ? G.red : '#C9CCD2'}" stroke-width="2"/>
        ${label(212, y + 22, ct, { size: 13, op: 0.75 })}
        ${mono(300, y + 22, yr, { size: 10, op: 0.4 })}
        ${mono(512, y + 22, bal, { size: 10.5, anchor: 'end', op: dead ? 0.8 : 0.55, fill: dead ? G.red : G.ink })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.48;0.54;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(520, 282, '$13.10 stranded on plastic', { size: 10, anchor: 'end', op: 0.5, fill: G.red })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.7;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(96, 320, 448, 86, { r: 16, fill: G.wash, stroke: G.orange, sw: 2 })}
      ${label(124, 356, 'One plan. Nothing left behind, nothing snapped.', { size: 15, fill: G.orange })}
      ${mono(124, 380, 'TOP UP THE SAME PLAN IN EVERY COUNTRY YOU GO TO NEXT', { size: 9.5, op: 0.45 })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsB('Nothing left behind') };
  },
};

/* ─── 7 · TWO MINUTES BEFORE ─────────────────────────────────────── */
export const twoMinutesBefore = {
  id: 'travel-before',
  name: 'Two Minutes Before',
  family: 'Timing',
  tagline: 'Bought at the gate, working on arrival',
  desc:
    'A clock runs from the departure gate to the arrivals hall, and the plan is bought in the two ' +
    'minutes before boarding. It answers the objection nobody voices — that this is one more thing ' +
    'to organise before a trip — by showing it fitting into the gap where people are already looking ' +
    'at their phone.',
  pros: [
    'Removes the planning objection, which is the quiet reason people default to roaming',
    'A single clock is the cheapest possible narrative device',
    'Puts the purchase at the moment of highest intent',
  ],
  cons: ['Assumes airport wifi, which is not always there', 'Less visually interesting than a map'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 10;
    const marks = [
      ['Gate', '14:22', 'Buying the plan', 0.1],
      ['Boarding', '14:24', 'Installed, switched off', 0.32],
      ['Landing', '17:05', 'Airplane mode off', 0.62],
      ['Arrivals', '17:06', 'Online, no queue', 0.82],
    ];
    const x0 = 100, x1 = 548, y = 226;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 250, uid)}
    ${label(100, 62, 'Bought at the gate. Working on arrival.', { size: 15, op: 0.5 })}
    <line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${G.line}" stroke-width="3"/>
    <line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${G.orange}" stroke-width="3.5"
      stroke-dasharray="448" stroke-dashoffset="448">
      <animate attributeName="stroke-dashoffset" values="448;0;0" keyTimes="0;0.82;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </line>
    ${marks.map(([nm, time, note, t], i) => {
      const x = x0 + t * (x1 - x0);
      const up = i % 2 === 0;
      return `<g>
        <circle cx="${x.toFixed(0)}" cy="${y}" r="7" fill="${G.white}" stroke="${G.line}" stroke-width="2.5"/>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(t * 0.82).toFixed(4)};${(t * 0.82 + 0.04).toFixed(4)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <circle cx="${x.toFixed(0)}" cy="${y}" r="7" fill="${G.orange}"/>
          <line x1="${x.toFixed(0)}" y1="${up ? y - 14 : y + 14}" x2="${x.toFixed(0)}" y2="${up ? y - 40 : y + 40}"
            stroke="${G.orange}" stroke-width="1.6" opacity="0.5"/>
          ${mono(x.toFixed(0), up ? y - 70 : y + 62, time, { size: 12, anchor: 'middle', op: 0.85, fill: G.orange })}
          ${label(x.toFixed(0), up ? y - 50 : y + 82, nm, { size: 13, anchor: 'middle' })}
          ${mono(x.toFixed(0), up ? y - 92 : y + 100, note, { size: 9, anchor: 'middle', op: 0.4 })}
        </g>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.86;0.92;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(196, 372, 248, 48, { r: 12, fill: G.wash, stroke: G.orange, sw: 2 })}
      ${label(320, 402, 'Two minutes of effort, total', { size: 14, anchor: 'middle', fill: G.orange })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsB('Two minutes, once') };
  },
};

/* ─── 8 · THE FAMILY ─────────────────────────────────────────────── */
export const theFamily = {
  id: 'travel-family',
  name: 'Four Phones, One Trip',
  family: 'Coverage',
  tagline: 'The plan multiplied across a household',
  desc:
    'Travel is rarely one person. Four phones — two adults, two children — each install from the ' +
    'same purchase and connect in sequence, with the total cost named once at the end against four ' +
    'roaming bills. It is the only option on the board that addresses the family buyer, who is the ' +
    'one with the largest bill to avoid.',
  pros: [
    'Speaks to the highest-value buyer on the page',
    'Four roaming bills against one purchase is the strongest arithmetic available',
    'Nothing else on the board mentions more than one device',
  ],
  cons: ['Needs multi-device purchasing to actually exist', 'Four phones is a lot of repeated artwork'],
  scores: { story: 5, motion: 4, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const dur = 11;
    const who = ['Adult', 'Adult', 'Child', 'Child'];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 250, uid)}
    ${label(96, 62, 'One purchase, four phones', { size: 15, op: 0.5 })}
    ${who.map((w, i) => {
      const x = 106 + i * 116;
      const on = 0.1 + i * 0.12;
      return `<g>
        ${card(x, 100, 92, 168, { r: 14, fill: G.ink, stroke: G.ink })}
        ${card(x + 6, 106, 80, 156, { r: 10, fill: '#17171C', stroke: '#17171C' })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <rect x="${x + 22}" y="160" width="48" height="36" rx="8" fill="${G.orange}" opacity="0.3"/>
          <rect x="${x + 22}" y="160" width="48" height="36" rx="8" fill="none" stroke="${G.orange}" stroke-width="2"/>
          ${Array.from({ length: 4 }, (_, b) => `
            <rect x="${x + 26 + b * 11}" y="${226 - b * 5}" width="7" height="${10 + b * 5}" rx="2" fill="${G.orange}" opacity="0.9"/>`).join('')}
        </g>
        ${mono(x + 46, 288, w, { size: 10, anchor: 'middle', op: 0.42 })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.7;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(96, 320, 216, 92, { r: 14, fill: G.white, stroke: G.line })}
      ${mono(120, 348, 'FOUR ROAMING BILLS', { size: 9.5, op: 0.42 })}
      ${label(120, 384, '$672', { size: 30, fill: G.red })}
      ${card(328, 320, 216, 92, { r: 14, fill: G.wash, stroke: G.orange, sw: 2 })}
      ${mono(352, 348, 'ONE FAMILY PLAN', { size: 9.5, op: 0.45 })}
      ${label(352, 384, '$59', { size: 30, fill: G.orange })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsB('One plan, four phones') };
  },
};

/* ─── 9 · STILL WORKING ──────────────────────────────────────────── */
export const stillWorking = {
  id: 'travel-working',
  name: 'Still Working',
  family: 'Trust',
  tagline: 'The things that keep running while you move',
  desc:
    'Not about data, about consequences. Five things a traveller cannot afford to lose — a boarding ' +
    'pass, two-factor codes, a maps route, a hotel confirmation, a bank app — each shown staying ' +
    'available across a border crossing. It reframes connectivity as risk removal, which is a far ' +
    'stronger motive than saving money.',
  pros: [
    'Reframes the purchase from a saving into an insurance, which converts better',
    'Two-factor codes on a foreign number is a real and under-discussed failure',
    'Every item is specific rather than a generic benefit',
  ],
  cons: ['Five items competes with the bullets beside it', 'Anxiety-led framing may not suit the brand voice'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const items = [
      ['Boarding pass', 'Loads at the gate'],
      ['Two-factor codes', 'Same number, still yours'],
      ['Maps, live', 'Route recalculates on arrival'],
      ['Hotel confirmation', 'In the inbox, not the void'],
      ['Bank app', 'Approves the payment abroad'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 250, uid)}
    ${label(96, 62, 'What keeps working when you cross a border', { size: 15, op: 0.5 })}
    ${items.map(([nm, note], i) => {
      const y = 96 + i * 58;
      const on = 0.08 + i * 0.1;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.04).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(96, y, 448, 46, { r: 11, fill: G.white, stroke: G.line })}
        <circle cx="122" cy="${y + 23}" r="11" fill="${G.wash}"/>
        <path d="M 116 ${y + 23} l 4.5 4.5 l 8 -9" fill="none" stroke="${G.orange}" stroke-width="2.4" stroke-linecap="round"/>
        ${label(148, y + 21, nm, { size: 13.5 })}
        ${mono(148, y + 37, note, { size: 9.5, op: 0.42 })}
        ${mono(520, y + 28, 'ONLINE', { size: 9, anchor: 'end', op: 0.75, fill: G.orange })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(96, 420, 'NONE OF THIS IS ABOUT DATA. IT IS ABOUT NOT BEING STUCK.', { size: 9.5, op: 0.4 })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsB('Nothing stops working') };
  },
};

export const travelTheMorning = {
  id: 'travel-morning',
  name: 'The First Morning',
  family: 'Experience',
  tagline: 'One hour, five things that just work',
  desc:
    'Seamless is an absence, and an absence is hard to draw. This makes it concrete by running the ' +
    'first hour of a trip: the maps route at 07:12, the taxi app at 07:20, a call home at 07:34, a ' +
    'boarding pass check at 07:48, a card payment at 07:55. Five ordinary things, none of them ' +
    'interrupted. The point is that nothing happens.',
  pros: [
    'Makes an absence visible by showing the ordinary things that depend on it',
    'Timestamps give the loop a natural rhythm',
    'Reads as lived experience rather than a feature list',
  ],
  cons: ['No single dramatic moment', 'Five rows compete with the bullets beside it'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const events = [
      ['07:12', 'Maps, from the terminal', 'route loaded in 2 s'],
      ['07:20', 'Taxi booked', 'driver called back'],
      ['07:34', 'Call home', '41 minutes, no drop'],
      ['07:48', 'Boarding pass checked', 'for the flight back'],
      ['07:55', 'Card payment approved', 'bank text arrived'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 250, uid)}
    ${label(96, 62, 'The first hour, uninterrupted', { size: 15, op: 0.5 })}
    <line x1="126" y1="92" x2="126" y2="372" stroke="${G.line}" stroke-width="2.5"/>
    <line x1="126" y1="92" x2="126" y2="372" stroke="${G.orange}" stroke-width="3"
      stroke-dasharray="280" stroke-dashoffset="280">
      <animate attributeName="stroke-dashoffset" values="280;0;0" keyTimes="0;0.66;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </line>
    ${events.map(([t, nm, note], i) => {
      const y = 100 + i * 66;
      const on = (i / 5) * 0.66;
      return `<g>
        <circle cx="126" cy="${y}" r="7" fill="${G.white}" stroke="${G.line}" stroke-width="2.5"/>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(4)};${(on + 0.05).toFixed(4)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <circle cx="126" cy="${y}" r="7" fill="${G.orange}"/>
          ${mono(150, y - 6, t, { size: 10.5, op: 0.55, fill: G.orange })}
          ${label(150, y + 14, nm, { size: 13.5 })}
          ${mono(536, y + 4, note, { size: 9, anchor: 'end', op: 0.4 })}
        </g>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.74;0.82;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(96, 396, 448, 44, { r: 11, fill: G.wash, stroke: G.orange, sw: 2 })}
      ${label(120, 424, 'Nothing here needed thinking about', { size: 14, fill: G.orange })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsB('Nothing to think about') };
  },
};

/* ── registry ── */
export const TRAVEL_VARIANTS = [travelCurrent, borderRun, oneCard, tripTape, theBill,
  sevenBorders, drawerOfSims, twoMinutesBefore, theFamily, stillWorking, travelTheMorning];
