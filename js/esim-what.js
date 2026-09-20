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

export const WHAT_VARIANTS = [whatCurrent, etch, twoWays, drawer];
