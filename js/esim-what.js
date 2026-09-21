import { G, gWrap, bloom, dots, phone, mono, label, card, gPill, gIcon } from './g-shared.js';

/* Pills used across this board — same two the live panel floats. */
const pillsA = (right = 'Installs in 30s') => [
  gPill('orange', `${gIcon('zap')}${right}`, { top: '14px', right: '14px' }),
  gPill('ink', `${gIcon('globe')}190+ countries`, { bottom: '20px', left: '14px' }),
];

/* ══════════════════════════════════════════════════════════════════
   0 · CURRENT — one-to-one replica of what ships today
   ══════════════════════════════════════════════════════════════════ */
export const whatCurrent = {
  id: 'what-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'Plastic SIM → phone, one dashed arrow',
  desc: 'A grey plastic SIM on the left, a dashed arrow, and a phone with an orange chip that pulses. The arrow marches and the chip breathes; nothing else happens. Two thirds of the frame is empty dotted background, and the only idea — "digital instead of plastic" — is already fully stated in the first 200 ms.',
  pros: ['Reads instantly, impossible to misunderstand', 'Very light and never distracts from the copy'],
  cons: ['Dead after half a second — no reason to keep watching', 'The left half is a grey rectangle with no meaning', 'Says nothing about installing, travelling, or multiple plans', 'Large empty margins make the panel feel unfinished'],
  scores: { story: 3, motion: 2, perf: 5, mobile: 4, brand: 3, ease: 5 },
  build: (uid) => {
    const inner = `
    ${dots(uid)}
    ${bloom(430, 240, 220, uid)}
    <!-- plastic SIM -->
    <g opacity="0.85">
      ${card(110, 190, 120, 92, { r: 12, fill: '#F3F4F6', stroke: '#D1D5DB' })}
      <path d="M 122 274 L 218 198" stroke="${G.red}" stroke-width="2.5" opacity="0.5"/>
      <rect x="196" y="190" width="34" height="26" fill="#F3F4F6"/>
      <path d="M 196 216 L 222 190" stroke="#D1D5DB" stroke-width="1.5"/>
    </g>
    ${label(170, 312, 'plastic SIM', { size: 13, op: 0.45, anchor: 'middle' })}
    ${mono(170, 332, 'swap · lose · repeat', { size: 10, anchor: 'middle', op: 0.3 })}
    <!-- dashed arrow -->
    <g>
      <path d="M 256 236 L 322 236" stroke="${G.orange}" stroke-width="3.5" stroke-linecap="round"
        stroke-dasharray="10 9" opacity="0.9">
        <animate attributeName="stroke-dashoffset" values="0;-19" dur="0.9s" repeatCount="indefinite"/>
      </path>
      <path d="M 330 236 L 318 229 L 318 243 Z" fill="${G.orange}"/>
    </g>
    <!-- phone -->
    ${phone({
      x: 448, y: 236, w: 156, h: 292, glowId: uid, screen: `
      <rect x="0" y="0" width="146" height="282" fill="#17171C"/>
      <g transform="translate(73 132)">
        <rect x="-30" y="-24" width="60" height="48" rx="11" fill="${G.orange}"/>
        <rect x="-30" y="-24" width="60" height="48" rx="11" fill="none" stroke="${G.white}" stroke-width="2" opacity="0.55"/>
        <rect x="-15" y="-11" width="30" height="22" rx="5" fill="none" stroke="${G.white}" stroke-width="2" opacity="0.8"/>
        <animateTransform attributeName="transform" type="scale" additive="sum"
          values="1;1.07;1" dur="2.6s" repeatCount="indefinite"/>
      </g>
      ${mono(73, 186, 'eSIM ACTIVE', { size: 9.5, anchor: 'middle', fill: G.white, op: 0.8 })}
      <rect x="28" y="202" width="90" height="5" rx="2.5" fill="${G.white}" opacity="0.14"/>
      <rect x="28" y="202" width="58" height="5" rx="2.5" fill="${G.orange}">
        <animate attributeName="width" values="34;80;34" dur="3.4s" repeatCount="indefinite"/>
      </rect>` })}
    ${label(448, 406, 'eSIM', { size: 15, anchor: 'middle' })}
    ${mono(448, 426, 'already in your phone', { size: 10, anchor: 'middle', op: 0.32 })}`;
    return { svg: gWrap(inner), pills: pillsA() };
  },
};

/* ══════════════════════════════════════════════════════════════════
   1 · ETCH & ACTIVATE — show the install, not the comparison
   ══════════════════════════════════════════════════════════════════ */
export const etch = {
  id: 'etch',
  name: 'Etch & Activate',
  family: 'Product truth',
  tagline: 'The 30 seconds the copy promises, on screen',
  desc: 'A QR code is scanned by a sweeping beam, the profile streams across as packets, and inside the phone a SIM outline draws itself line by line while a ring counts 0 → 100% and the signal bars fill. It ends on "eSIM ACTIVE · 28s" and restarts. The headline claims a 30-second install; this is the only option that actually shows one.',
  pros: ['Demonstrates the exact promise in the body copy', 'Continuous — every moment of the loop has something moving', 'The QR code makes the mechanism obvious with no words', 'Ends on a resolved state, so a screenshot still reads well'],
  cons: ['Busier than the current panel', 'A four-beat loop needs the timing tuned or it feels rushed'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    /* QR module grid — deterministic, so it looks like a real code */
    const cells = [];
    const seed = [0xB5, 0x3C, 0x6E, 0xD1, 0x92, 0x47, 0xAB, 0x58, 0xF2, 0x1D, 0x74, 0xC9];
    for (let r = 0; r < 11; r++) {
      for (let c = 0; c < 11; c++) {
        const corner = (r < 3 && c < 3) || (r < 3 && c > 7) || (r > 7 && c < 3);
        if (corner) continue;
        if ((seed[(r + c) % seed.length] >> (c % 7)) & 1) {
          cells.push(`<rect x="${c * 10}" y="${r * 10}" width="8" height="8" rx="1.5" fill="${G.ink}" opacity="0.82"/>`);
        }
      }
    }
    const finder = (x, y) => `
      <rect x="${x}" y="${y}" width="28" height="28" rx="4" fill="none" stroke="${G.ink}" stroke-width="5"/>
      <rect x="${x + 9}" y="${y + 9}" width="10" height="10" rx="2" fill="${G.ink}"/>`;

    const simPath = 'M 26 18 L 88 18 Q 104 18 104 34 L 104 96 Q 104 112 88 112 L 26 112 Q 10 112 10 96 L 10 34 Q 10 18 26 18 Z';

    const inner = `
    ${dots(uid)}
    ${bloom(436, 232, 215, uid)}

    <!-- ── QR card ─────────────────────────────────────── -->
    <g transform="translate(74 148)">
      ${card(0, 0, 140, 140, { r: 18, fill: G.white, stroke: '#EBD5CB', sw: 2 })}
      <g transform="translate(15 15)">
        ${finder(0, 0)}${finder(82, 0)}${finder(0, 82)}
        ${cells.join('')}
      </g>
      <!-- scan beam -->
      <g clip-path="none">
        <rect x="8" y="0" width="124" height="26" fill="${G.orange}" opacity="0.22">
          <animate attributeName="y" values="6;110;6" dur="4.6s" keyTimes="0;0.34;1"
            calcMode="spline" keySplines="0.4 0 0.6 1;0 0 1 1" repeatCount="indefinite"/>
        </rect>
        <rect x="8" y="0" width="124" height="2.5" rx="1.25" fill="${G.orange}">
          <animate attributeName="y" values="18;122;18" dur="4.6s" keyTimes="0;0.34;1"
            calcMode="spline" keySplines="0.4 0 0.6 1;0 0 1 1" repeatCount="indefinite"/>
        </rect>
      </g>
    </g>
    ${label(144, 316, 'Scan the QR code', { size: 14, op: 0.7, anchor: 'middle' })}
    ${mono(144, 336, 'no card · no shop · no wait', { size: 10, anchor: 'middle', op: 0.32 })}

    <!-- ── packet stream QR → phone ────────────────────── -->
    <path id="ps-${uid}" d="M 222 218 C 268 218 300 226 336 232" fill="none" stroke="${G.orange}"
      stroke-width="2.5" stroke-dasharray="7 8" opacity="0.5">
      <animate attributeName="stroke-dashoffset" values="0;-15" dur="0.75s" repeatCount="indefinite"/>
    </path>
    ${[0, 0.9, 1.8, 2.7].map(b => `
      <circle r="4.5" fill="${G.orange}">
        <animateMotion dur="3.6s" begin="${b}s" repeatCount="indefinite"
          path="M 222 218 C 268 218 300 226 336 232"/>
        <animate attributeName="opacity" values="0;1;1;0" dur="3.6s" begin="${b}s" repeatCount="indefinite"/>
      </circle>`).join('')}

    <!-- ── phone ───────────────────────────────────────── -->
    ${phone({
      x: 452, y: 232, w: 164, h: 300, glowId: uid, screen: `
      <rect x="0" y="0" width="154" height="290" fill="#17171C"/>

      <!-- etching SIM outline -->
      <g transform="translate(20 42)">
        <path d="${simPath}" fill="none" stroke="${G.white}" stroke-width="2" opacity="0.13"/>
        <path d="${simPath}" fill="${G.orange}" opacity="0.10">
          <animate attributeName="opacity" values="0;0;0.16;0.16;0" dur="4.6s"
            keyTimes="0;0.34;0.52;0.88;1" repeatCount="indefinite"/>
        </path>
        <path d="${simPath}" fill="none" stroke="${G.orange}" stroke-width="3.2"
          stroke-linecap="round" stroke-dasharray="360" stroke-dashoffset="360">
          <animate attributeName="stroke-dashoffset" values="360;360;0;0;360" dur="4.6s"
            keyTimes="0;0.16;0.46;0.92;1" repeatCount="indefinite"/>
        </path>
        <!-- contact pads etch in after the outline -->
        ${[0, 1, 2].map(i => [0, 1].map(j => `
          <rect x="${30 + j * 26}" y="${44 + i * 18}" width="18" height="10" rx="2" fill="${G.orange}" opacity="0">
            <animate attributeName="opacity" values="0;0;0.85;0.85;0" dur="4.6s"
              keyTimes="0;${(0.42 + (i * 2 + j) * 0.016).toFixed(3)};${(0.48 + (i * 2 + j) * 0.016).toFixed(3)};0.92;1"
              repeatCount="indefinite"/>
          </rect>`).join('')).join('')}
      </g>
      <text x="77" y="170" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="1.1"
        fill="${G.white}" opacity="0" style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">WRITING PROFILE
        <animate attributeName="opacity" values="0;0;0.55;0.55;0;0" dur="4.6s" keyTimes="0;0.16;0.22;0.44;0.50;1" repeatCount="indefinite"/>
      </text>

      <!-- progress ring -->
      <g transform="translate(77 200)">
        <circle r="26" fill="none" stroke="${G.white}" stroke-width="4" opacity="0.12"/>
        <circle r="26" fill="none" stroke="${G.orange}" stroke-width="4" stroke-linecap="round"
          transform="rotate(-90)" stroke-dasharray="163.4" stroke-dashoffset="163.4">
          <animate attributeName="stroke-dashoffset" values="163.4;163.4;0;0;163.4" dur="4.6s"
            keyTimes="0;0.26;0.62;0.92;1" repeatCount="indefinite"/>
        </circle>
        <!-- check mark on completion -->
        <path d="M -8 1 L -2 7 L 9 -5" fill="none" stroke="${G.orange}" stroke-width="3.4"
          stroke-linecap="round" stroke-linejoin="round" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" dur="4.6s"
            keyTimes="0;0.62;0.68;0.92;1" repeatCount="indefinite"/>
        </path>
      </g>

      <!-- signal bars fill in -->
      <g transform="translate(48 252)">
        ${[0, 1, 2, 3].map(i => `
          <rect x="${i * 13}" y="${-6 - i * 5}" width="8" height="${8 + i * 5}" rx="2" fill="${G.white}" opacity="0.14"/>
          <rect x="${i * 13}" y="${-6 - i * 5}" width="8" height="${8 + i * 5}" rx="2" fill="${G.orange}" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" dur="4.6s"
              keyTimes="0;${(0.56 + i * 0.03).toFixed(2)};${(0.61 + i * 0.03).toFixed(2)};0.92;1" repeatCount="indefinite"/>
          </rect>`).join('')}
      </g>
      <text x="102" y="258" font-size="9" font-weight="700" letter-spacing="1" fill="${G.orange}" opacity="0"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">eSIM ACTIVE
        <animate attributeName="opacity" values="0;0;1;1;0" dur="4.6s" keyTimes="0;0.64;0.70;0.92;1" repeatCount="indefinite"/>
      </text>` })}
    ${label(452, 412, 'Installed in 28 seconds', { size: 15, anchor: 'middle' })}
    ${mono(452, 432, 'profile written · network locked', { size: 10, anchor: 'middle', op: 0.32 })}`;
    return { svg: gWrap(inner), pills: pillsA('Installs in 30s') };
  },
};

/* ══════════════════════════════════════════════════════════════════
   2 · TWO WAYS — the comparison, made to hurt
   ══════════════════════════════════════════════════════════════════ */
export const twoWays = {
  id: 'twoways',
  name: 'Two Ways In',
  family: 'Comparative',
  tagline: 'The plastic route, timed against the digital one',
  desc: 'Two lanes race the same errand. The top lane drags a plastic SIM through order → ship → shop → swap, stalling visibly at each gate with a day counter climbing. The bottom lane beams a profile straight into the phone and finishes in 28 seconds, then waits for the loser. The current panel asserts that digital is better; this one proves it.',
  pros: ['Makes the pain concrete instead of implying it', 'The stall beats give the loop natural rhythm and tension', 'Uses the whole frame — no empty third', 'Numbers do the arguing, which survives translation'],
  cons: ['Most complex of the three to build and tune', 'Deliberately unflattering to physical SIMs — check tone against brand voice'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const gates = [
      { x: 188, t: 'ORDER' },
      { x: 300, t: 'SHIP' },
      { x: 412, t: 'SHOP' },
      { x: 524, t: 'SWAP' },
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(330, 300, 250, uid)}

    <!-- ══ lane 1 · plastic ══ -->
    ${label(40, 92, 'Plastic SIM', { size: 15, op: 0.55 })}
    ${mono(40, 112, 'four stops · four ways to fail', { size: 10, op: 0.3 })}
    <line x1="40" y1="150" x2="600" y2="150" stroke="${G.line}" stroke-width="5" stroke-linecap="round"/>
    <line x1="40" y1="150" x2="600" y2="150" stroke="${G.red}" stroke-width="5" stroke-linecap="round"
      stroke-dasharray="6 16" opacity="0.4"/>
    ${gates.map(g => `
      <g transform="translate(${g.x} 150)">
        <circle r="9" fill="${G.white}" stroke="${G.gray}" stroke-width="2.5"/>
        <circle r="3.5" fill="${G.gray}"/>
        ${mono(0, 28, g.t, { size: 9.5, anchor: 'middle', op: 0.38 })}
      </g>`).join('')}
    <!-- the plastic card, stalling at each gate -->
    <g>
      <animateTransform attributeName="transform" type="translate" dur="9s" repeatCount="indefinite"
        keyTimes="0;0.10;0.22;0.32;0.44;0.54;0.66;0.76;0.88;1"
        values="40,150; 188,150; 188,150; 300,150; 300,150; 412,150; 412,150; 524,150; 524,150; 524,150"
        calcMode="spline"
        keySplines="0.4 0 0.3 1;0 0 1 1;0.4 0 0.3 1;0 0 1 1;0.4 0 0.3 1;0 0 1 1;0.4 0 0.3 1;0 0 1 1;0 0 1 1"/>
      <g transform="translate(-17 -13)">
        <rect x="0" y="0" width="34" height="26" rx="4" fill="#F3F4F6" stroke="#B9BEC7" stroke-width="2"/>
        <rect x="21" y="0" width="13" height="9" fill="#FFF7F3"/>
        <path d="M 21 9 L 34 0" stroke="#B9BEC7" stroke-width="1.6"/>
        <rect x="6" y="9" width="11" height="9" rx="1.5" fill="#CBD2DA"/>
      </g>
      <circle r="17" fill="none" stroke="${G.red}" stroke-width="2.5" opacity="0">
        <animate attributeName="opacity" values="0;0.8;0;0;0.8;0;0;0.8;0;0;0.8;0" dur="9s"
          keyTimes="0;0.13;0.20;0.34;0.36;0.42;0.56;0.58;0.64;0.78;0.80;1" repeatCount="indefinite"/>
        <animate attributeName="r" values="12;22;12;12;22;12;12;22;12;12;22;12" dur="9s"
          keyTimes="0;0.13;0.20;0.34;0.36;0.42;0.56;0.58;0.64;0.78;0.80;1" repeatCount="indefinite"/>
      </circle>
    </g>
    <!-- day counter -->
    <g transform="translate(590 104)">
      <rect x="-34" y="-16" width="68" height="30" rx="8" fill="${G.ink}"/>
      <text y="5" text-anchor="middle" font-size="13" font-weight="700" fill="${G.white}"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><tspan data-role="days">3 days</tspan></text>
    </g>

    <!-- divider -->
    <line x1="40" y1="236" x2="600" y2="236" stroke="${G.line}" stroke-width="1.5" stroke-dasharray="4 6"/>
    ${mono(320, 228, 'SAME ERRAND, TWO ROUTES', { size: 9.5, anchor: 'middle', op: 0.28 })}

    <!-- ══ lane 2 · openline ══ -->
    ${label(40, 296, 'Openline eSIM', { size: 15, fill: G.deep })}
    ${mono(40, 316, 'one stop · over the air', { size: 10, op: 0.34, fill: G.deep })}
    <line x1="40" y1="356" x2="600" y2="356" stroke="${G.line}" stroke-width="5" stroke-linecap="round"/>
    <line x1="40" y1="356" x2="600" y2="356" stroke="${G.orange}" stroke-width="5" stroke-linecap="round"
      stroke-dasharray="16 10">
      <animate attributeName="stroke-dashoffset" values="0;-26" dur="0.8s" repeatCount="indefinite"/>
    </line>
    ${[0, 0.28, 0.56].map(b => `
      <circle r="5.5" fill="${G.orange}">
        <animateMotion dur="1.6s" begin="${b}s" repeatCount="indefinite" path="M 40 356 L 560 356"/>
      </circle>`).join('')}
    <g transform="translate(40 356)">
      <circle r="10" fill="${G.orange}"/>
      <circle r="10" fill="none" stroke="${G.orange}" stroke-width="2" opacity="0.5">
        <animate attributeName="r" values="10;26" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.5;0" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      ${mono(0, -22, 'BUY', { size: 9.5, anchor: 'middle', op: 0.38 })}
    </g>
    <!-- the phone at the finish -->
    ${phone({
      x: 588, y: 356, w: 58, h: 108, screen: `
      <rect x="0" y="0" width="48" height="98" fill="#17171C"/>
      <rect x="12" y="30" width="24" height="20" rx="5" fill="${G.orange}"/>
      <path d="M 17 40 L 21 45 L 31 35" fill="none" stroke="${G.white}" stroke-width="2.4"
        stroke-linecap="round" stroke-linejoin="round" opacity="0.95"/>
      <rect x="10" y="62" width="28" height="4" rx="2" fill="${G.orange}" opacity="0.6"/>` })}
    <g transform="translate(588 286)">
      <rect x="-36" y="-16" width="72" height="30" rx="8" fill="${G.orange}"/>
      <text y="5" text-anchor="middle" font-size="13" font-weight="700" fill="${G.white}"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">00:28</text>
    </g>
    ${mono(600, 434, 'ONE IS A PURCHASE. THE OTHER IS A LOGISTICS PROBLEM.', { size: 10, anchor: 'end', op: 0.3 })}`;

    return {
      svg: gWrap(inner),
      pills: pillsA('28s vs 3 days'),
      init(root) {
        const t = root.querySelector('[data-role="days"]');
        if (!t) return null;
        const seq = ['0 days', '1 day', '1 day', '2 days', '2 days', '3 days', '3 days', '3 days', '3 days'];
        let k = 0;
        const id = setInterval(() => { t.textContent = seq[k % seq.length]; k++; }, 1000);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════════════════════════════════════════════════════════
   3 · PROFILE DRAWER — sell the bullet the copy already makes
   ══════════════════════════════════════════════════════════════════ */
export const drawer = {
  id: 'drawer',
  name: 'Profile Drawer',
  family: 'Feature-led',
  tagline: 'Many plans, one device — as an object',
  desc: 'The phone opens a drawer of stored eSIM profiles — Japan, Spain, Brazil, Home. The stack shuffles on a slow beat, the front card turns Openline orange and reads ACTIVE while the rest sit dimmed and ready, and a counter holds at "4 profiles · 1 device". It is the only option that illustrates the strongest bullet on the page instead of the weakest.',
  pros: ['Turns an abstract feature into something tangible', 'Destination names put a place in the visitor\'s head', 'Calm, premium motion — no alarm colours, no racing', 'Reuses the card motif already on the storefront'],
  cons: ['Does not show the install, so it leans on the copy for "30 seconds"', 'Country names need localising alongside the rest of the page'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: (uid) => {
    const profiles = [
      { n: 'Japan', m: '5 GB · 30 days', f: '🇯🇵' },
      { n: 'Spain', m: '10 GB · 15 days', f: '🇪🇸' },
      { n: 'Brazil', m: '3 GB · 7 days', f: '🇧🇷' },
      { n: 'Home', m: 'Number kept', f: '🏠' },
    ];
    const cw = 246, ch = 66;
    const inner = `
    ${dots(uid)}
    ${bloom(330, 230, 240, uid)}

    <!-- phone, left, screen shows the drawer opening -->
    ${phone({
      x: 116, y: 230, w: 150, h: 286, glowId: uid, screen: `
      <rect x="0" y="0" width="140" height="276" fill="#17171C"/>
      ${mono(16, 40, 'MY eSIMs', { size: 9.5, fill: G.white, op: 0.45 })}
      ${[0, 1, 2, 3].map(i => `
        <g transform="translate(14 ${54 + i * 40})">
          <rect x="0" y="0" width="112" height="32" rx="7"
            fill="${i === 0 ? G.orange : G.white}" opacity="${i === 0 ? 1 : 0.07}"/>
          <rect x="9" y="11" width="16" height="11" rx="2.5" fill="${G.white}" opacity="${i === 0 ? 0.85 : 0.3}"/>
          <rect x="32" y="11" width="${46 - i * 6}" height="4" rx="2" fill="${G.white}" opacity="${i === 0 ? 0.9 : 0.25}"/>
          <rect x="32" y="19" width="${30 - i * 4}" height="3" rx="1.5" fill="${G.white}" opacity="${i === 0 ? 0.6 : 0.16}"/>
          ${i === 0 ? `<circle cx="100" cy="16" r="3.5" fill="${G.white}"><animate attributeName="opacity" values="1;0.35;1" dur="2s" repeatCount="indefinite"/></circle>` : ''}
        </g>`).join('')}
      <rect x="14" y="230" width="112" height="26" rx="13" fill="${G.orange}" opacity="0.18"/>
      ${mono(70, 247, '+ ADD eSIM', { size: 8.5, anchor: 'middle', fill: G.orange, op: 0.9 })}` })}

    <!-- the shuffling stack -->
    <g class="dw" transform="translate(240 96)">
      ${profiles.map((p, i) => `
        <g class="dcard" data-dc="${i}">
          <rect x="0" y="0" width="${cw}" height="${ch}" rx="16" class="dshell"
            fill="${G.white}" stroke="${G.line}" stroke-width="1.5"/>
          <g transform="translate(18 ${ch / 2})">
            <rect x="0" y="-13" width="34" height="26" rx="5" class="dchip" fill="${G.line}"/>
            <rect x="24" y="-13" width="10" height="8" fill="${G.white}" class="dnotch"/>
            <path d="M 24 -5 L 34 -13" stroke="${G.white}" stroke-width="1.4"/>
          </g>
          <text x="66" y="${ch / 2 - 4}" font-size="16" font-weight="700" fill="${G.ink}" class="dname">${p.f} ${p.n}</text>
          <text x="66" y="${ch / 2 + 16}" font-size="11.5" font-weight="600" fill="${G.ink}" opacity="0.45" class="dmeta"
            style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${p.m}</text>
          <g class="dstate" opacity="0">
            <rect x="${cw - 78}" y="${ch / 2 - 12}" width="62" height="24" rx="12" fill="${G.white}" opacity="0.2"/>
            <text x="${cw - 47}" y="${ch / 2 + 4}" text-anchor="middle" font-size="10" font-weight="700"
              fill="${G.white}" letter-spacing="1" style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">ACTIVE</text>
          </g>
        </g>`).join('')}
    </g>

    <!-- link from phone to stack -->
    <path d="M 196 230 C 214 230 224 228 238 228" fill="none" stroke="${G.orange}" stroke-width="2.5"
      stroke-dasharray="6 7" opacity="0.45">
      <animate attributeName="stroke-dashoffset" values="0;-13" dur="0.8s" repeatCount="indefinite"/>
    </path>

    <g transform="translate(240 402)">
      <rect x="0" y="0" width="162" height="34" rx="17" fill="${G.ink}"/>
      <text x="81" y="22" text-anchor="middle" font-size="12.5" font-weight="700" fill="${G.white}"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">4 profiles · 1 device</text>
    </g>
    ${mono(420, 424, 'switch in one tap', { size: 10, op: 0.3 })}`;

    return {
      svg: gWrap(inner),
      pills: pillsA('Multiple plans, one phone'),
      init(root) {
        const cards = [...root.querySelectorAll('.dcard')];
        if (!cards.length) return null;
        const step = 74, n = cards.length;
        let front = 0;
        const place = () => {
          cards.forEach((c, i) => {
            const slot = (i - front + n) % n;
            c.setAttribute('transform', `translate(${slot * 9} ${slot * step}) scale(${1 - slot * 0.02})`);
            c.style.transformOrigin = '0 0';
            c.classList.toggle('front', slot === 0);
            c.querySelector('.dshell').setAttribute('fill', slot === 0 ? '#FF5314' : '#FFFFFF');
            c.querySelector('.dshell').setAttribute('stroke', slot === 0 ? '#FF5314' : '#E5E7EB');
            c.querySelector('.dstate').setAttribute('opacity', slot === 0 ? '1' : '0');
            c.querySelector('.dname').setAttribute('fill', slot === 0 ? '#FFFFFF' : '#0B0B0F');
            c.querySelector('.dmeta').setAttribute('fill', slot === 0 ? '#FFFFFF' : '#0B0B0F');
            c.querySelector('.dmeta').setAttribute('opacity', slot === 0 ? '0.75' : '0.45');
            c.querySelector('.dchip').setAttribute('fill', slot === 0 ? '#FFFFFF' : '#E5E7EB');
            c.querySelector('.dchip').setAttribute('opacity', slot === 0 ? '0.55' : '1');
            c.querySelector('.dnotch').setAttribute('fill', slot === 0 ? '#FF5314' : '#FFFFFF');
            c.style.opacity = slot > 2 ? '0.35' : '1';
          });
        };
        place();
        const id = setInterval(() => { front = (front + 1) % n; place(); }, 2600);
        return () => clearInterval(id);
      },
    };
  },
};


/* ══════════════════════════════════════════════════════════════════
   4–9 · six further directions for "What is an eSIM?"
   Same 640 × 460 box, same orange system, same two floating pills.
   ══════════════════════════════════════════════════════════════════ */

/* a small reusable ticket/QR block */
const qrBlock = (x, y, s, col = G.ink) => {
  const cells = [
    '1110111', '1000101', '1011101', '0001000',
    '1101011', '1000001', '1110111',
  ];
  return `<g transform="translate(${x} ${y}) scale(${s})">${cells.map((row, r) =>
    row.split('').map((c, i) => (c === '1'
      ? `<rect x="${i * 7}" y="${r * 7}" width="6" height="6" fill="${col}"/>` : '')).join('')).join('')}</g>`;
};

/* ─── 4 · NO POST OFFICE ─────────────────────────────────────────── */
export const noPostOffice = {
  id: 'what-nopost',
  name: 'No Post Office',
  family: 'Comparison, honestly',
  tagline: 'Four days of plastic against thirty seconds of eSIM',
  desc:
    'The live panel puts a plastic SIM beside a phone and leaves the viewer to infer the point. ' +
    'This makes the comparison the point: the plastic lane runs through order, ship, wait, collect, ' +
    'swap — five stations and a four-day clock — while the eSIM lane finishes one station in before ' +
    'the plastic lane has left the building. The idea is the same as today, argued rather than implied.',
  pros: [
    'Keeps the live comparison but gives it a cost the viewer can feel',
    'The two clocks running at different speeds do the persuading, not the copy',
    'Explains why an eSIM matters to somebody who does not care what one is',
  ],
  cons: ['Busiest option on the board', 'Two-lane layouts compress badly under 400px'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const dur = 12;
    const plastic = ['Order', 'Ship', 'Wait', 'Collect', 'Swap'];
    const x0 = 96, x1 = 552;
    const px = (i, n) => x0 + (i / (n - 1)) * (x1 - x0);
    const inner = `
    ${dots(uid)}
    ${bloom(320, 150, 250, uid)}
    ${label(96, 62, 'A plastic SIM, end to end', { size: 15, op: 0.5 })}
    <line x1="${x0}" y1="128" x2="${x1}" y2="128" stroke="${G.line}" stroke-width="2.5"/>
    ${plastic.map((s, i) => `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.04 + i * 0.13).toFixed(3)};${(0.08 + i * 0.13).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <circle cx="${px(i, 5)}" cy="128" r="7" fill="${G.white}" stroke="${G.gray}" stroke-width="2.5"/>
        ${mono(px(i, 5), 112, s, { size: 10, anchor: 'middle', op: 0.5 })}
      </g>`).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.56;0.6;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${label(x1 + 14, 134, '4 days', { size: 16, fill: G.red })}
    </g>

    ${label(96, 250, 'An eSIM, end to end', { size: 15, fill: G.orange })}
    <line x1="${x0}" y1="316" x2="${x1}" y2="316" stroke="${G.line}" stroke-width="2.5"/>
    <line x1="${x0}" y1="316" x2="${px(1, 5)}" y2="316" stroke="${G.orange}" stroke-width="4"/>
    ${['Scan', 'Live'].map((s, i) => `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.04 + i * 0.06).toFixed(3)};${(0.07 + i * 0.06).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <circle cx="${px(i, 5)}" cy="316" r="8" fill="${G.orange}"/>
        ${mono(px(i, 5), 300, s, { size: 10, anchor: 'middle', op: 0.6, fill: G.orange })}
      </g>`).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.14;0.18;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${label(px(1, 5) + 22, 322, '30 seconds', { size: 16, fill: G.orange })}
      ${mono(px(1, 5) + 22, 342, 'and the plastic lane has not shipped yet', { size: 10, op: 0.4 })}
    </g>
    ${qrBlock(486, 372, 1.1, G.ink)}
    ${mono(552, 424, 'the whole supply chain', { size: 10, anchor: 'end', op: 0.32 })}`;
    return { svg: gWrap(inner), pills: pillsA('30s, not 4 days') };
  },
};

/* ─── 5 · THE PROFILE ────────────────────────────────────────────── */
export const theProfile = {
  id: 'what-profile',
  name: 'The Profile',
  family: 'Product truth',
  tagline: 'What actually arrives, and where it goes',
  desc:
    'An eSIM is a file written to a chip that is already soldered into the phone. This says exactly ' +
    'that: a profile descends into the device, lands on the embedded chip, and the carrier details ' +
    'fill in field by field — operator, ICCID, APN, status. It is the most literal option on the ' +
    'board and the only one that would satisfy somebody technical.',
  pros: [
    'Accurate — this is genuinely what an eSIM is',
    'The filling fields give it a real sense of completion',
    'Earns credibility with the buyer who reads specifications',
  ],
  cons: ['Least emotional option here', 'Field names mean nothing to a holiday traveller'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const fields = [
      ['OPERATOR', 'Openline · Tier-1'],
      ['ICCID', '8944 4771 0293 8841'],
      ['APN', 'internet.openline'],
      ['STATUS', 'Enabled'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 230, 260, uid)}
    ${label(96, 70, 'A profile, written to a chip already in the phone', { size: 15, op: 0.5 })}

    <!-- the descending profile -->
    <g>
      ${card(232, 104, 176, 62, { r: 12, fill: G.white, stroke: G.orange, sw: 2 })}
      ${mono(252, 130, 'PROFILE', { size: 9.5, op: 0.5 })}
      ${label(252, 152, 'openline.esim', { size: 14 })}
      <animateTransform attributeName="transform" type="translate" values="0 -40;0 0;0 0;0 14;0 14"
        keyTimes="0;0.16;0.3;0.38;1" dur="${dur}s" repeatCount="indefinite" calcMode="spline"
        keySplines="0.4 0 0.2 1;0 0 1 1;0.4 0 0.2 1;0 0 1 1"/>
      <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.12;0.32;0.4;1"
        dur="${dur}s" repeatCount="indefinite"/>
    </g>

    <!-- the embedded chip -->
    ${card(240, 196, 160, 116, { r: 16, fill: G.ink, stroke: G.ink })}
    ${mono(320, 222, 'eUICC', { size: 9.5, anchor: 'middle', fill: G.white, op: 0.55 })}
    <g transform="translate(320 262)">
      <rect x="-30" y="-22" width="60" height="44" rx="9" fill="${G.orange}" opacity="0.25"/>
      <rect x="-30" y="-22" width="60" height="44" rx="9" fill="none" stroke="${G.orange}" stroke-width="2"/>
      <rect x="-14" y="-9" width="28" height="18" rx="4" fill="none" stroke="${G.orange}" stroke-width="2" opacity="0.8"/>
      <rect x="-30" y="-22" width="60" height="44" rx="9" fill="${G.orange}" opacity="0">
        <animate attributeName="opacity" values="0;0;0.55;0;0" keyTimes="0;0.3;0.38;0.5;1" dur="${dur}s" repeatCount="indefinite"/>
      </rect>
    </g>
    ${mono(320, 300, 'soldered in at the factory', { size: 9.5, anchor: 'middle', fill: G.white, op: 0.4 })}

    <!-- the fields filling in -->
    ${fields.map(([k, v], i) => `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.42 + i * 0.09).toFixed(3)};${(0.46 + i * 0.09).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${mono(430, 214 + i * 30, k, { size: 9, op: 0.42 })}
        ${label(430, 232 + i * 30, v, { size: 12.5, fill: i === 3 ? G.orange : G.ink })}
      </g>`).join('')}
    ${mono(96, 424, 'nothing arrives in the post', { size: 10, op: 0.3 })}`;
    return { svg: gWrap(inner), pills: pillsA('Written, not posted') };
  },
};

/* ─── 6 · SHELF OF COUNTRIES ─────────────────────────────────────── */
export const shelfOfCountries = {
  id: 'what-shelf',
  name: 'A Shelf of Countries',
  family: 'Why it matters',
  tagline: 'Plans stacked in the phone, none of them plastic',
  desc:
    'The strongest argument for an eSIM is not that it is digital — it is that you can hold many at ' +
    'once. Six country plans sit stacked inside the phone and the active one lifts to the front as ' +
    'the traveller moves: Portugal, then Japan, then Brazil. No swapping, nothing to lose, and the ' +
    'previous plan is still there when you go back.',
  pros: [
    'Argues the benefit rather than defining the technology',
    'Multiple simultaneous plans is the thing a plastic SIM genuinely cannot do',
    'The stack is legible even as a still frame',
  ],
  cons: ['Does not explain what an eSIM is, which is the section heading', 'Card stacks are a familiar device'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 4, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 12;
    const plans = [
      ['Portugal', '5 GB · 30 days', G.orange],
      ['Japan', '10 GB · 14 days', '#7C3AED'],
      ['Brazil', '3 GB · 7 days', '#0EA5E9'],
      ['Germany', '8 GB · 30 days', '#16A34A'],
      ['Kenya', '2 GB · 14 days', G.amber],
      ['Global', '20 GB · 90 days', G.ink],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 240, 250, uid)}
    ${label(96, 62, 'Six plans, one phone, nothing to swap', { size: 15, op: 0.5 })}
    ${plans.map(([nm, meta, col], i) => {
      const on = i / plans.length, off = (i + 1) / plans.length;
      return `<g>
        ${card(150 + i * 12, 300 - i * 34, 300, 56, { r: 12, fill: G.white, stroke: G.line })}
        <rect x="${150 + i * 12}" y="${300 - i * 34}" width="5" height="56" rx="2.5" fill="${col}"/>
        ${label(176 + i * 12, 326 - i * 34, nm, { size: 14 })}
        ${mono(176 + i * 12, 344 - i * 34, meta, { size: 10, op: 0.42 })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0"
            keyTimes="0;${on.toFixed(4)};${(on + 0.005).toFixed(4)};${off.toFixed(4)};${Math.min(off + 0.005, 1).toFixed(4)};1"
            dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
          ${card(150 + i * 12, 300 - i * 34, 300, 56, { r: 12, fill: col, stroke: col })}
          ${label(176 + i * 12, 326 - i * 34, nm, { size: 14, fill: G.white })}
          ${mono(176 + i * 12, 344 - i * 34, meta, { size: 10, op: 0.8, fill: G.white })}
          ${mono(420 + i * 12, 332 - i * 34, 'LIVE', { size: 9, anchor: 'end', fill: G.white, op: 0.9 })}
        </g>
      </g>`;
    }).join('')}
    ${mono(96, 424, 'the one you need is already installed', { size: 10, op: 0.32 })}`;
    return { svg: gWrap(inner), pills: pillsA('Six at once') };
  },
};

/* ─── 7 · SCAN IT ────────────────────────────────────────────────── */
export const scanIt = {
  id: 'what-scan',
  name: 'Scan It',
  family: 'Product truth',
  tagline: 'The single gesture the whole product needs',
  desc:
    'One QR code, one camera frame, one confirmation. No comparison, no explanation, no plastic — ' +
    'just the gesture, at the size it happens. It is the most confident option on the board because ' +
    'it assumes the reader already knows what an eSIM is and only wants to know what they have to do.',
  pros: [
    'Answers the practical question instead of the definitional one',
    'One idea, held at full size — easily the clearest option here',
    'Works at any width, so mobile loses nothing',
  ],
  cons: ['Says nothing about what an eSIM is, under a heading that asks', 'Least informative option on the board'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 8;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 230, 240, uid)}
    ${card(180, 118, 280, 224, { r: 20, fill: G.white, stroke: G.line })}
    ${qrBlock(258, 158, 3.3, G.ink)}
    <!-- the scan sweep -->
    <g>
      <rect x="196" y="160" width="248" height="3" fill="${G.orange}" opacity="0.9"/>
      <animateTransform attributeName="transform" type="translate" values="0 0;0 140;0 0;0 0"
        keyTimes="0;0.45;0.9;1" dur="${dur}s" repeatCount="indefinite" calcMode="spline"
        keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0 0 1 1"/>
      <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.45;0.52;1" dur="${dur}s" repeatCount="indefinite"/>
    </g>
    ${[[196, 160], [412, 160], [196, 300], [412, 300]].map(([x, y], i) => {
      const sx = i % 2 ? -1 : 1, sy = i > 1 ? -1 : 1;
      return `<path d="M ${x} ${y + 26 * sy} L ${x} ${y} L ${x + 26 * sx} ${y}" fill="none"
        stroke="${G.orange}" stroke-width="3.5" stroke-linecap="round"/>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.52;0.58;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(180, 358, 280, 54, { r: 14, fill: G.orange, stroke: G.orange })}
      <path d="M 212 385 l 7 7 l 13 -15" fill="none" stroke="${G.white}" stroke-width="3" stroke-linecap="round"/>
      ${label(246, 391, 'Connected in Portugal', { size: 15, fill: G.white })}
    </g>
    ${label(320, 100, 'This is the entire install', { size: 15, anchor: 'middle', op: 0.5 })}`;
    return { svg: gWrap(inner), pills: pillsA('One scan') };
  },
};

/* ─── 8 · LANDED ─────────────────────────────────────────────────── */
export const landed = {
  id: 'what-landed',
  name: 'Landed',
  family: 'Why it matters',
  tagline: 'The first ninety seconds in a new country',
  desc:
    'The moment the product is actually for: wheels down, airplane mode off, and a choice between ' +
    'finding a shop, paying roaming, or the plan already sitting in the phone. Two lanes stall and ' +
    'the third connects. It never defines an eSIM and does not need to — it shows the exact minute ' +
    'the reader will remember.',
  pros: [
    'Anchored in a real moment rather than a technology',
    'Names the two alternatives explicitly, which the live panel never does',
    'The strongest emotional option on the board',
  ],
  cons: ['Three lanes is a lot of reading', 'Overlaps the Travel board directly above it'],
  scores: { story: 5, motion: 4, perf: 4, mobile: 3, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 11;
    const lanes = [
      ['Find a shop', 'Queue, passport, 40 minutes', G.gray, 0.34, 'Still queuing'],
      ['Turn on roaming', '$12 a day, no warning', G.red, 0.52, '$84 by Friday'],
      ['Openline, already installed', 'Nothing to do', G.orange, 0.2, 'Online'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 120, 250, uid)}
    <g transform="translate(96 74)">
      <path d="M 0 0 l 22 -8 l 6 10 l 18 -4 l -4 12 l -20 6 z" fill="${G.ink}" opacity="0.7"/>
    </g>
    ${label(156, 78, 'Wheels down. Airplane mode off.', { size: 16 })}
    ${mono(156, 98, 'THREE WAYS TO GET ONLINE', { size: 9.5, op: 0.4 })}

    ${lanes.map(([nm, note, col, end, out], i) => {
      const y = 152 + i * 84;
      const last = i === 2;
      return `<g>
        ${card(96, y, 448, 66, { r: 14, fill: last ? G.wash : G.white, stroke: last ? G.orange : G.line, sw: last ? 2 : 1.5 })}
        ${label(120, y + 28, nm, { size: 14 })}
        ${mono(120, y + 48, note, { size: 10, op: 0.45 })}
        <rect x="320" y="${y + 30}" width="140" height="6" rx="3" fill="${G.line}"/>
        <rect x="320" y="${y + 30}" width="6" height="6" rx="3" fill="${col}">
          <animate attributeName="width" values="6;${(140 * end).toFixed(0)};${(140 * end).toFixed(0)}"
            keyTimes="0;${last ? '0.2' : '0.62'};1" dur="${dur}s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.2 1;0 0 1 1"/>
        </rect>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${last ? '0.22' : '0.64'};${last ? '0.27' : '0.69'};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          ${label(520, y + 38, out, { size: 12, anchor: 'end', fill: col })}
        </g>
      </g>`;
    }).join('')}
    ${mono(96, 424, 'the third lane needed no shop, no forms and no roaming bill', { size: 10, op: 0.32 })}`;
    return { svg: gWrap(inner), pills: pillsA('Online on landing') };
  },
};

/* ─── 9 · NOTHING TO LOSE ────────────────────────────────────────── */
export const nothingToLose = {
  id: 'what-nolose',
  name: 'Nothing To Lose',
  family: 'Comparison, honestly',
  tagline: 'The failure modes a plastic SIM has and an eSIM does not',
  desc:
    'Four things that go wrong with plastic — lost in a hotel room, snapped in an adapter, wrong ' +
    'size for the phone, stuck in a drawer at home — struck through one at a time, against a single ' +
    'line that cannot fail because there is no object. It argues by elimination, which is unusual ' +
    'for this category and very hard to disagree with.',
  pros: [
    'Every item is a real experience the reader has had',
    'Argues by elimination, so it never has to make a claim about itself',
    'Cheapest option on the board to build',
  ],
  cons: ['Negative framing throughout', 'Does not show the product at all'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 10;
    const fails = [
      'Lost behind a hotel bed',
      'Snapped in a cheap adapter',
      'Wrong size for the new phone',
      'Left in a drawer at home',
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 250, uid)}
    ${label(96, 66, 'Four ways a plastic SIM fails', { size: 15, op: 0.5 })}
    ${fails.map((f, i) => {
      const y = 118 + i * 52;
      const on = 0.1 + i * 0.13;
      return `<g>
        ${card(96, y, 356, 40, { r: 10, fill: G.white, stroke: G.line })}
        ${label(120, y + 26, f, { size: 13.5, op: 0.8 })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.04).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <line x1="112" y1="${y + 21}" x2="436" y2="${y + 21}" stroke="${G.red}" stroke-width="2.5" stroke-linecap="round"/>
        </g>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.68;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(96, 336, 448, 72, { r: 14, fill: G.wash, stroke: G.orange, sw: 2 })}
      ${label(124, 368, 'An eSIM has none of these failure modes', { size: 15, fill: G.orange })}
      ${mono(124, 390, 'BECAUSE THERE IS NO OBJECT', { size: 9.5, op: 0.45 })}
    </g>
    ${mono(480, 128, 'plastic', { size: 10, anchor: 'end', op: 0.35, fill: G.red })}`;
    return { svg: gWrap(inner), pills: pillsA('No object to lose') };
  },
};

export const whatTheSlot = {
  id: 'what-slot',
  name: 'The Empty Slot',
  family: 'Definition',
  tagline: 'The chip that was always in your phone',
  desc:
    'Most people think an eSIM is a download. It is a chip that shipped inside the phone years ago, ' +
    'waiting for a profile. A cutaway shows the plastic tray beside the soldered eSIM already on the ' +
    'board, and the profile arriving as software into hardware that was always there. It corrects the ' +
    'single most common misunderstanding.',
  pros: [
    'Fixes the misconception that drives most support questions',
    'A cutaway is a genuinely informative image, not a metaphor',
    'Gives the reader a fact they will repeat to somebody else',
  ],
  cons: ['Technical register for a consumer page', 'Board artwork must stay plausible'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${label(96, 62, 'It was already in your phone', { size: 15, op: 0.5 })}
    ${card(96, 92, 448, 200, { r: 16, fill: '#F7F7F9', stroke: G.line })}
    ${mono(120, 120, 'INSIDE THE HANDSET', { size: 9.5, op: 0.42 })}
    <rect x="132" y="142" width="128" height="86" rx="8" fill="${G.white}" stroke="${G.line}" stroke-width="2"
      stroke-dasharray="5 5"/>
    ${mono(196, 190, 'SIM TRAY', { size: 9, anchor: 'middle', op: 0.4 })}
    ${mono(196, 250, 'REMOVABLE, OPTIONAL', { size: 8.5, anchor: 'middle', op: 0.3 })}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.18;0.28;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <rect x="332" y="158" width="72" height="54" rx="5" fill="${G.orange}" stroke="${G.deep}" stroke-width="2"/>
      ${Array.from({ length: 5 }, (_, i) => `
        <line x1="332" y1="${168 + i * 10}" x2="318" y2="${168 + i * 10}" stroke="${G.orange}" stroke-width="2"/>
        <line x1="404" y1="${168 + i * 10}" x2="418" y2="${168 + i * 10}" stroke="${G.orange}" stroke-width="2"/>`).join('')}
      ${mono(368, 236, 'eSIM, SOLDERED', { size: 9, anchor: 'middle', op: 0.6, fill: G.orange })}
      ${mono(368, 256, 'SHIPPED IN 2021', { size: 8.5, anchor: 'middle', op: 0.35 })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.44;0.54;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <path d="M 470 184 H 438" stroke="${G.orange}" stroke-width="2.4"/>
      <path d="M 432 184 l 9 -6 v 12 z" fill="${G.orange}"/>
      ${mono(478, 176, 'THE PROFILE', { size: 8.5, op: 0.5, fill: G.orange })}
      ${mono(478, 192, 'ARRIVES HERE', { size: 8.5, op: 0.5, fill: G.orange })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(96, 320, 448, 92, { r: 16, fill: G.wash, stroke: G.orange, sw: 2 })}
      ${label(124, 356, 'Nothing is delivered. Nothing is installed in a slot.', { size: 14 })}
      ${label(124, 384, 'A profile is written to a chip that was already there.', { size: 14, fill: G.orange })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsA('Already in your phone') };
  },
};

/* ── registry ── */
export const WHAT_VARIANTS = [whatCurrent, etch, twoWays, drawer, noPostOffice,
  theProfile, shelfOfCountries, scanIt, landed, nothingToLose, whatTheSlot];
