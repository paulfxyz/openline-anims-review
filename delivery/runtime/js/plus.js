/* ══ /openline-plus · three dark-panel animations ══════════════════════
   This page is the only dark surface in the hub. Measured on the live page
   at a 1440px viewport, the three animated panels are:

     Airport Lounge & Fast Track Access   574 x 642   tall,  orange on dark
     Built for Digital Nomads             574 x 656   tall,  orange on dark
     Verified & Secure                    574 x 432   wide,  green  on dark

   Each panel is the left cell of a two-column block; the right cell holds
   the benefit cards, so the animation never has to carry copy. Every option
   below is drawn to its exact box.                                       */



const MONO = 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace';

export const O = '#FF5314';
export const O_DEEP = '#E23D00';
export const O_SOFT = '#FFB08A';
export const GRN = '#22C55E';
export const GRN_LIT = '#4ADE80';
export const GRN_DEEP = '#16A34A';
export const RD = '#F87171';
export const AMB = '#FBBF24';
export const W = '#FFFFFF';
export const DK = '#0C111C';

export const LOUNGE_BOX = { w: 574, h: 642, layout: 'split' };
export const NOMAD_BOX = { w: 574, h: 656, layout: 'split' };
export const KYC_BOX = { w: 574, h: 432, layout: 'split' };

/* ── dark-panel primitives ─────────────────────────────────────────── */

const wrapBox = (w, h) => (inner) =>
  `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" aria-hidden="true"
    style="width:100%;height:100%">${inner}</svg>`;

const wL = wrapBox(574, 642);
const wN = wrapBox(574, 656);
const wK = wrapBox(574, 432);

/* the warm gradient + dot field the live panels use */
const bg = (uid, w, h, tint = O) => `
  <defs>
    <linearGradient id="pg-${uid}" x1="0" y1="0" x2="0.7" y2="1">
      <stop offset="0" stop-color="${tint}" stop-opacity="0.16"/>
      <stop offset="0.45" stop-color="#0F1420" stop-opacity="1"/>
      <stop offset="1" stop-color="${tint}" stop-opacity="0.1"/>
    </linearGradient>
    <pattern id="pd-${uid}" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="1.4" cy="1.4" r="1.3" fill="${W}" opacity="0.07"/></pattern>
    <radialGradient id="pb-${uid}" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${tint}" stop-opacity="0.3"/>
      <stop offset="60%" stop-color="${tint}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="${tint}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#131826"/>
  <rect width="${w}" height="${h}" fill="url(#pg-${uid})"/>
  <rect width="${w}" height="${h}" fill="url(#pd-${uid})"/>`;

const glow = (cx, cy, r, uid) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#pb-${uid})"/>`;

const m = (x, y, t, o = {}) =>
  `<text x="${x}" y="${y}" font-size="${o.size || 10}" font-weight="${o.weight || 700}"
    letter-spacing="${o.ls ?? 1.1}" fill="${o.fill || W}" opacity="${o.op ?? 0.45}"
    text-anchor="${o.anchor || 'start'}" style="font-family:${MONO}">${t}</text>`;

const t = (x, y, txt, o = {}) =>
  `<text x="${x}" y="${y}" font-size="${o.size || 14}" font-weight="${o.weight || 700}"
    fill="${o.fill || W}" opacity="${o.op ?? 1}" text-anchor="${o.anchor || 'start'}">${txt}</text>`;

/* a dark card with a hairline border, as the live panels draw them */
const dcard = (x, y, w, h, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 14}"
    fill="${o.fill || '#161C2B'}" stroke="${o.stroke || 'rgba(255,255,255,0.13)'}"
    stroke-width="${o.sw ?? 1.5}" opacity="${o.op ?? 1}"/>`;

const chip = (x, y, w, txt, o = {}) => `
  <g transform="translate(${x} ${y})">
    <rect width="${w}" height="${o.h || 28}" rx="${(o.h || 28) / 2}"
      fill="${o.fill || 'rgba(255,255,255,0.08)'}" stroke="${o.stroke || 'rgba(255,255,255,0.16)'}" stroke-width="1.4"/>
    ${m(w / 2, (o.h || 28) / 2 + 3.5, txt, { size: o.size || 9, anchor: 'middle', op: o.op ?? 0.8, fill: o.color || W })}
  </g>`;

const gtick = (x, y, txt, o = {}) => `
  <g transform="translate(${x} ${y})">
    <circle r="9" fill="${o.fill || GRN}" opacity="${o.bgop ?? 0.18}"/>
    <path d="M -4 0 l 3 3.4 l 6 -7" fill="none" stroke="${o.fill || GRN_LIT}" stroke-width="2.2"
      stroke-linecap="round" stroke-linejoin="round"/>
    ${txt ? t(18, 4.5, txt, { size: o.size || 12.5, op: o.op ?? 0.85 }) : ''}
  </g>`;

const noPills = [];

/* ═════════════════════════════════════════════════════════════════════
   1 · AIRPORT LOUNGE & FAST TRACK ACCESS  ·  574 × 642
   ═════════════════════════════════════════════════════════════════════ */

const boardingPass = (x, y, o = {}) => `
  <g transform="translate(${x} ${y})">
    ${dcard(0, 0, 268, 116, { r: 13, fill: '#101624', stroke: o.stroke || 'rgba(255,255,255,0.3)', sw: 2 })}
    ${m(18, 26, 'BOARDING PASS', { size: 8.5, op: 0.45 })}
    <g transform="translate(186 12)">
      <rect width="66" height="20" rx="10" fill="${o.badgeFill || O}"/>
      ${m(33, 14, o.badge || 'PRIORITY', { size: 8, anchor: 'middle', op: 1 })}
    </g>
    ${t(18, 62, 'LIS', { size: 23 })}
    <path d="M 66 55 H 176" stroke="${W}" stroke-width="1.4" opacity="0.28"/>
    <path d="M 180 55 l -9 -6 v 12 z" fill="${O}"/>
    ${t(250, 62, 'SIN', { size: 23, anchor: 'end' })}
    <path d="M 12 82 H 256" stroke="${W}" stroke-width="1.4" opacity="0.16" stroke-dasharray="5 5"/>
    ${m(18, 102, 'GATE A12', { size: 8.5, op: 0.4 })}
    ${m(110, 102, 'SEAT 2A', { size: 8.5, op: 0.4 })}
    ${m(250, 102, o.foot || 'LOUNGE OPEN', { size: 8.5, op: 1, fill: O, anchor: 'end' })}
  </g>`;

export const lgCurrent = {
  id: 'lg-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'A boarding pass and two grey bars',
  desc: 'A boarding pass card reading LIS → SIN with a PRIORITY badge, then two progress bars — one labelled REGULAR QUEUE with a couple of dots on it, one labelled YOUR LANE with a single orange dot — and three pills beneath. The idea is right and the boarding pass is genuinely nice, but the composition occupies about a third of a 642px-tall panel, the two bars never resolve into a comparison, and nothing in it mentions a lounge.',
  pros: ['The boarding pass is a strong, on-brand object', 'Two lanes is the correct idea for a fast-track claim', 'Correct dark treatment and orange accent'],
  cons: ['Uses roughly a third of a very tall panel; the rest is empty gradient', 'The two bars never finish, so the comparison never lands', 'No lounge anywhere in a section whose first word is "Lounge"', 'No figure: not minutes saved, not lounges available, not value'],
  scores: { story: 3, motion: 2, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => ({ pills: noPills, svg: wL(`
    ${bg(uid, 574, 642)}
    ${glow(287, 320, 260, uid)}
    ${boardingPass(153, 176)}
    <g transform="translate(153 320)">
      ${dcard(0, 0, 268, 72, { r: 12 })}
      ${m(18, 26, 'REGULAR QUEUE', { size: 8.5, op: 0.4 })}
      <path d="M 18 48 H 250" stroke="${W}" stroke-width="3" opacity="0.14" stroke-linecap="round"/>
      <circle cx="82" cy="48" r="5" fill="${W}" opacity="0.4"><animate attributeName="cx" values="78;88;78" dur="4s" repeatCount="indefinite"/></circle>
      <circle cx="96" cy="48" r="4" fill="${W}" opacity="0.22"/>
      <circle cx="170" cy="48" r="4" fill="${W}" opacity="0.22"/>
    </g>
    <g transform="translate(153 408)">
      ${dcard(0, 0, 268, 72, { r: 12, stroke: O, sw: 2, fill: 'rgba(255,83,20,0.07)' })}
      ${m(18, 26, 'YOUR LANE', { size: 8.5, op: 0.85, fill: O_SOFT })}
      <path d="M 18 48 H 250" stroke="${W}" stroke-width="3" opacity="0.14" stroke-linecap="round"/>
      <circle cx="60" cy="48" r="7" fill="${O}"><animate attributeName="cx" values="56;66;56" dur="3s" repeatCount="indefinite"/></circle>
    </g>
    <g transform="translate(153 506)">
      ${chip(0, 0, 104, '🛋 Lounge access')}${chip(112, 0, 92, '✈ Fast track', { op: 1 })}${chip(212, 0, 76, '✓ Included', { op: 0.5 })}
    </g>`) }),
};

export const lgTwoLanes = {
  id: 'lg-lanes',
  name: 'Two Lanes, One Clock',
  family: 'Comparison',
  tagline: 'You are through at four minutes. They are not.',
  desc: 'Two vertical queues run down the panel side by side, each a column of waiting figures, with one clock counting for both. In the fast-track lane you advance and clear security at 04:12; in the regular lane the column has barely moved and its own readout keeps climbing past thirty minutes. The tall panel is the reason this works — a queue is a vertical object, and this is the shape for it.',
  pros: ['Uses the full 642px height as the subject rather than padding it', 'One clock across both lanes makes the comparison impossible to dispute', 'The regular lane still running after you finish is the memorable beat', 'Minutes saved is the figure this section has always needed'],
  cons: ['Two columns of figures is the most artwork of the six options', 'Queue times vary hugely by airport, so the numbers need hedging', 'Covers fast track well, lounge only by implication'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const person = (fill, op) => `
      <g opacity="${op}"><circle cy="-9" r="5.4" fill="${fill}"/>
      <path d="M -7 12 v -8 a 7 7 0 0 1 14 0 v 8 z" fill="${fill}"/></g>`;
    return {
      svg: wL(`
      ${bg(uid, 574, 642)}
      ${glow(400, 300, 250, uid)}
      ${m(36, 44, 'SECURITY, SAME TERMINAL, SAME MINUTE', { size: 9, op: 0.4 })}

      <!-- regular lane -->
      <g transform="translate(96 74)">
        ${dcard(-58, 0, 172, 490, { r: 16, fill: 'rgba(255,255,255,0.03)' })}
        ${m(0, 26, 'REGULAR', { size: 8.5, anchor: 'middle', op: 0.4 })}
        <path d="M 0 44 V 452" stroke="${W}" stroke-width="2" opacity="0.1"/>
        ${Array.from({ length: 11 }, (_, i) => `
          <g transform="translate(0 ${430 - i * 36})">
            <animateTransform attributeName="transform" type="translate"
              values="0 ${430 - i * 36};0 ${418 - i * 36}" dur="9s" fill="freeze" repeatCount="indefinite"/>
            ${person(W, 0.3)}
          </g>`).join('')}
        <g transform="translate(0 466)">
          ${dcard(-52, 0, 104, 34, { r: 10, fill: '#121826' })}
          ${m(0, 22, '31:40', { size: 12, anchor: 'middle', op: 0.55 })}
        </g>
      </g>

      <!-- your lane -->
      <g transform="translate(330 74)">
        ${dcard(-58, 0, 172, 490, { r: 16, fill: 'rgba(255,83,20,0.07)', stroke: O, sw: 2 })}
        ${m(0, 26, 'FAST TRACK', { size: 8.5, anchor: 'middle', op: 0.9, fill: O_SOFT })}
        <path d="M 0 44 V 452" stroke="${O}" stroke-width="2" opacity="0.3"/>
        ${Array.from({ length: 3 }, (_, i) => `
          <g transform="translate(0 ${400 - i * 40})">
            <animateTransform attributeName="transform" type="translate"
              values="0 ${400 - i * 40};0 ${120 - i * 40}" dur="3.4s" begin="${0.4 + i * 0.5}s"
              fill="freeze" repeatCount="indefinite"/>
            ${person(O, 1)}
          </g>`).join('')}
        <g transform="translate(0 466)">
          ${dcard(-52, 0, 104, 34, { r: 10, fill: O })}
          ${m(0, 22, '04:12', { size: 12, anchor: 'middle', op: 1 })}
        </g>
      </g>

      <g transform="translate(36 594)">
        ${dcard(0, 0, 502, 34, { r: 10, fill: 'rgba(34,197,94,0.1)', stroke: GRN, sw: 1.6 })}
        ${m(251, 22, '27 MINUTES BACK, EVERY DEPARTURE', { size: 9.5, anchor: 'middle', op: 1, fill: GRN_LIT })}
      </g>`),
      pills: noPills,
    };
  },
};

export const lgDoor = {
  id: 'lg-door',
  name: 'The Door Opens',
  family: 'Payoff',
  tagline: 'Tap, green, in',
  desc: 'A lounge door fills the panel. The boarding pass is presented to the reader, the light turns green, the door swings inward, and what is behind it lights up one thing at a time — a seat, a shower, a hot meal, a desk with power, fast wifi. A counter settles at more than thirteen hundred lounges. It is the only option that shows the thing being bought rather than the queue being skipped.',
  pros: ['Shows the reward, which no other option here does', 'A door opening is a single satisfying beat with a clear payoff', 'The amenity icons answer "what is actually in a lounge?"', 'Tall panel suits a full-height door perfectly'],
  cons: ['Five amenity icons is a lot to land in one pass', 'A generic lounge interior risks looking like stock illustration', 'Says less about fast track, which is half the section title'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 4, brand: 5, ease: 3 },
  build: (uid) => {
    const amen = [['Seat', 'M 4 16 v -7 a 4 4 0 0 1 8 0 v 7 M 2 16 h 12'], ['Shower', 'M 8 3 v 5 M 3 9 h 10 M 5 13 v 2 M 8 12 v 3 M 11 13 v 2'],
      ['Hot meal', 'M 3 6 h 10 a 5 5 0 0 1 -10 0 M 8 3 v 2'], ['Power desk', 'M 3 5 h 10 v 6 h -10 z M 6 14 h 4'], ['Fast wifi', 'M 2 7 a 9 9 0 0 1 12 0 M 4.5 10 a 5.5 5.5 0 0 1 7 0 M 8 13.5 h 0.01']];
    return {
      svg: wL(`
      ${bg(uid, 574, 642)}
      ${glow(287, 330, 250, uid)}
      ${m(36, 44, 'OPENLINE+ LOUNGE ACCESS', { size: 9, op: 0.4 })}

      <!-- what is behind the door -->
      <g transform="translate(287 330)">
        ${dcard(-150, -216, 300, 432, { r: 18, fill: '#0B1019', stroke: 'rgba(255,255,255,0.1)' })}
        ${amen.map(([lab, d], i) => `
          <g transform="translate(${-104 + (i % 2) * 118} ${-150 + Math.floor(i / 2) * 104})" opacity="0">
            <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${2.3 + i * 0.36}s" fill="freeze" repeatCount="indefinite"/>
            <rect x="-26" y="-26" width="52" height="52" rx="13" fill="rgba(255,83,20,0.14)" stroke="${O}" stroke-width="1.6"/>
            <g transform="translate(-8 -8)" stroke="${O_SOFT}" stroke-width="1.7" fill="none" stroke-linecap="round"><path d="${d}"/></g>
            ${m(0, 42, lab.toUpperCase(), { size: 8, anchor: 'middle', op: 0.5 })}
          </g>`).join('')}
        <g transform="translate(0 168)" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.4s" begin="4.2s" fill="freeze" repeatCount="indefinite"/>
          ${t(0, 0, '1,300+', { size: 26, anchor: 'middle', fill: O })}
          ${m(0, 22, 'LOUNGES WORLDWIDE', { size: 8.5, anchor: 'middle', op: 0.45 })}
        </g>
      </g>

      <!-- the door itself, swinging -->
      <g transform="translate(287 330)">
        <g style="transform-origin:-150px 0px">
          <animateTransform attributeName="transform" type="scale" values="1 1;1 1;0.06 1;0.06 1;1 1"
            keyTimes="0;0.24;0.42;0.94;1" dur="9s" repeatCount="indefinite" additive="sum"/>
          ${dcard(-150, -216, 300, 432, { r: 18, fill: '#1A2030', stroke: 'rgba(255,255,255,0.2)', sw: 2 })}
          <path d="M 110 -20 v 40" stroke="${W}" stroke-width="5" opacity="0.35" stroke-linecap="round"/>
        </g>
      </g>

      <!-- the reader -->
      <g transform="translate(470 330)">
        ${dcard(-26, -44, 52, 88, { r: 11, fill: '#101624', stroke: 'rgba(255,255,255,0.18)' })}
        <circle cy="-14" r="10" fill="#243045"/>
        <circle cy="-14" r="10" fill="${GRN}" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.18;0.22;0.94;1" dur="9s" repeatCount="indefinite"/></circle>
        ${m(0, 26, 'TAP', { size: 8, anchor: 'middle', op: 0.4 })}
      </g>
      <g opacity="0">
        <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.04;0.16;0.2;1" dur="9s" repeatCount="indefinite"/>
        <g transform="translate(360 300) scale(0.62)">${boardingPass(0, 0, { foot: 'PRIORITY LANE' })}</g>
      </g>`),
      pills: noPills,
    };
  },
};

export const lgItinerary = {
  id: 'lg-itin',
  name: 'Kerb to Gate',
  family: 'Journey',
  tagline: 'The whole departure, in five steps',
  desc: 'A vertical itinerary runs the height of the panel: arrive at the kerb, clear fast-track security in four minutes, into the lounge for a shower and a meal, priority boarding, seated. A dot travels down the line and each step completes behind it with its own elapsed time. It is the only option that covers both halves of the section title in one pass, and a tall panel is what an itinerary wants.',
  pros: ['Covers lounge and fast track together, which the title requires', 'A vertical timeline is the natural inhabitant of a 574×642 panel', 'Per-step timings give the section five small numbers instead of none', 'Extremely legible — one column, one direction, no crossing lines'],
  cons: ['Five steps is a lot of text for a panel with no copy budget', 'Reads as informational rather than aspirational', 'Longest loop of the six'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const steps = [
      ['00:00', 'Arrive at the kerb', 'LIS · Terminal 1', W],
      ['04:12', 'Fast-track security', 'skipped a 31-minute line', O],
      ['12:30', 'Lounge: shower, hot meal', 'included, no day pass', O],
      ['46:00', 'Priority boarding', 'first group called', O],
      ['52:20', 'Seated, still online', 'same eSIM, same number', GRN],
    ];
    return {
      svg: wL(`
      ${bg(uid, 574, 642)}
      ${glow(287, 320, 250, uid)}
      ${m(36, 44, 'ONE DEPARTURE, END TO END', { size: 9, op: 0.4 })}
      <path d="M 76 92 V 552" stroke="${W}" stroke-width="2" opacity="0.12"/>
      <path d="M 76 92 V 92" stroke="${O}" stroke-width="2.5">
        <animate attributeName="d" values="M 76 92 V 92;M 76 92 V 552" dur="5s" fill="freeze" repeatCount="indefinite"/></path>
      ${steps.map(([tm, ttl, sub, col], i) => `
        <g transform="translate(0 ${100 + i * 112})" opacity="0.28">
          <animate attributeName="opacity" values="0.28;1" dur="0.4s" begin="${(0.3 + i * 1.02).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
          <circle cx="76" r="9" fill="#131826" stroke="${col}" stroke-width="2.5"/>
          <circle cx="76" r="3.6" fill="${col}"/>
          ${dcard(108, -34, 420, 76, { r: 13 })}
          ${m(128, -10, tm, { size: 11, op: 0.55, fill: col })}
          ${t(128, 12, ttl, { size: 14 })}
          ${t(128, 32, sub, { size: 11.5, op: 0.45, weight: 500 })}
        </g>`).join('')}
      <g transform="translate(36 588)">
        ${dcard(0, 0, 502, 36, { r: 11, fill: 'rgba(255,83,20,0.1)', stroke: O, sw: 1.6 })}
        ${m(251, 23, 'LOUNGE + FAST TRACK · INCLUDED IN THE $99', { size: 9.5, anchor: 'middle', op: 1, fill: O_SOFT })}
      </g>`),
      pills: noPills,
    };
  },
};

export const lgCost = {
  id: 'lg-cost',
  name: 'What It Would Have Cost',
  family: 'Value',
  tagline: 'Three hundred and thirty-six dollars, or nothing',
  desc: 'A bill assembles itself down the panel: lounge day pass at fifty-nine dollars, four trips; fast track at twenty-five, four trips; total three hundred and thirty-six a year. Then the whole column is struck through and one line replaces it — included. On a page selling a ninety-nine dollar plan, this is the only option that makes the perk pay for the subscription on screen.',
  pros: ['Only option that connects the perk to the $99 price directly', 'A total being struck out is the clearest value gesture there is', 'Numbers are checkable against real day-pass prices', 'Very cheap to draw and perfectly legible at any size'],
  cons: ['Trip count is an assumption, so the total is arguable', 'A bill is an unglamorous object for an aspirational perk', 'Shows no lounge and no queue'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: (uid) => {
    const rows = [['Lounge day pass', '4 × $59', '$236'], ['Security fast track', '4 × $25', '$100'],
      ['Priority boarding', 'bundled', '$0']];
    return {
      svg: wL(`
      ${bg(uid, 574, 642)}
      ${glow(287, 300, 250, uid)}
      ${m(36, 44, 'BUYING THESE SEPARATELY, ONE YEAR', { size: 9, op: 0.4 })}
      ${dcard(48, 74, 478, 300, { r: 16 })}
      ${rows.map(([l, q, v], i) => `
        <g transform="translate(78 ${130 + i * 62})" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${(0.4 + i * 0.6).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
          ${t(0, 0, l, { size: 14 })}
          ${m(0, 20, q.toUpperCase(), { size: 9, op: 0.38 })}
          ${t(418, 4, v, { size: 17, anchor: 'end', fill: O_SOFT })}
        </g>`).join('')}
      <path d="M 78 320 H 496" stroke="${W}" stroke-width="1.4" opacity="0.18"/>
      <g opacity="0"><animate attributeName="opacity" values="0;1" dur="0.4s" begin="2.3s" fill="freeze" repeatCount="indefinite"/>
        ${t(78, 352, 'Per year', { size: 13, op: 0.55, weight: 600 })}
        ${t(496, 356, '$336', { size: 28, anchor: 'end', fill: O })}
      </g>
      <g opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="3.1s" fill="freeze" repeatCount="indefinite"/>
        <path d="M 60 340 L 514 320" stroke="${RD}" stroke-width="3" stroke-linecap="round"/>
      </g>
      <g transform="translate(48 418)" opacity="0">
        <animate attributeName="opacity" values="0;1" dur="0.5s" begin="3.5s" fill="freeze" repeatCount="indefinite"/>
        ${dcard(0, 0, 478, 118, { r: 16, fill: 'rgba(34,197,94,0.1)', stroke: GRN, sw: 2 })}
        ${m(30, 34, 'WITH OPENLINE+', { size: 9, op: 0.7, fill: GRN_LIT })}
        ${t(30, 76, 'Included', { size: 34, fill: GRN_LIT })}
        ${t(448, 76, '$0', { size: 30, anchor: 'end', fill: GRN_LIT })}
      </g>
      ${m(287, 590, 'THE PERK PAYS FOR MOST OF THE PLAN', { size: 9.5, anchor: 'middle', op: 0.45 })}`),
      pills: noPills,
    };
  },
};

export const lgMap = {
  id: 'lg-map',
  name: 'Where They Are',
  family: 'Breadth',
  tagline: 'Thirteen hundred, counted by hub',
  desc: 'Hub rows fill in down the panel — Lisbon 3, London 14, Dubai 9, Singapore 11, São Paulo 6 — each with a small bar for its lounge count, while a total climbs past thirteen hundred. It answers the question a frequent traveller actually asks about lounge access, which is not whether it exists but whether it exists in the airports they use.',
  pros: ['Answers the real objection: is it in my airports?', 'Named hubs are concrete in a way a total never is', 'A tall panel takes a list of rows without any compression', 'Extends trivially — add hubs as the network grows'],
  cons: ['A list is the least animated idea of the six', 'Naming hubs invites "why not mine?" for anyone not listed', 'No lounge, no queue, no traveller anywhere in it'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 4, brand: 3, ease: 5 },
  build: (uid) => {
    const hubs = [['LHR', 'London', 14], ['SIN', 'Singapore', 11], ['DXB', 'Dubai', 9], ['JFK', 'New York', 8],
      ['GRU', 'São Paulo', 6], ['NRT', 'Tokyo', 5], ['LIS', 'Lisbon', 3], ['NBO', 'Nairobi', 3]];
    const mx = 14;
    return {
      svg: wL(`
      ${bg(uid, 574, 642)}
      ${glow(287, 310, 250, uid)}
      ${m(36, 44, 'LOUNGES, BY HUB', { size: 9, op: 0.4 })}
      ${m(538, 44, '1,300+ TOTAL', { size: 9, op: 0.75, fill: O_SOFT, anchor: 'end' })}
      ${hubs.map(([code, city, n], i) => `
        <g transform="translate(48 ${86 + i * 58})" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.35s" begin="${(0.3 + i * 0.28).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
          ${m(0, 16, code, { size: 12, op: 0.85 })}
          ${t(46, 17, city, { size: 12.5, op: 0.5, weight: 500 })}
          <rect x="176" y="6" width="${mx * 20}" height="14" rx="7" fill="${W}" opacity="0.07"/>
          <rect x="176" y="6" width="0" height="14" rx="7" fill="${O}">
            <animate attributeName="width" values="0;${n * 20}" dur="0.7s" begin="${(0.4 + i * 0.28).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
          </rect>
          ${t(478, 18, String(n), { size: 14, anchor: 'end', fill: O_SOFT })}
        </g>`).join('')}
      <g transform="translate(48 566)">
        ${dcard(0, 0, 478, 56, { r: 14, fill: 'rgba(255,83,20,0.1)', stroke: O, sw: 1.6 })}
        ${m(24, 24, 'AND 1,250 MORE', { size: 9, op: 0.6, fill: O_SOFT })}
        ${t(24, 44, 'Fast track at every one of them', { size: 12.5, op: 0.75, weight: 500 })}
      </g>`),
      pills: noPills,
    };
  },
};

export const lgUpgrade = {
  id: 'lg-upg',
  name: 'Pass, Upgraded',
  family: 'Minimal change',
  tagline: 'The same card, actually finishing',
  desc: 'Exactly the boarding pass that ships, scanned: the badge flips from ECONOMY to PRIORITY, the footer changes to LOUNGE OPEN, and the two lane bars below finally run properly — the regular one crawling to a quarter, yours completing and stamping a time. Nothing new is invented; the existing composition is centred in its panel, given a beginning and an end, and allowed to resolve.',
  pros: ['Lowest-risk option — reuses the objects already approved', 'Fixes the real flaw, which is that nothing currently resolves', 'Fills the tall panel without inventing new artwork', 'Fastest of the six to implement'],
  cons: ['Still no lounge, so half the section title goes unserved', 'Least ambitious option here by some distance', 'A short loop, so the repeat is visible'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 5, ease: 5 },
  build: (uid) => ({
    svg: wL(`
      ${bg(uid, 574, 642)}
      ${glow(287, 320, 250, uid)}
      ${m(36, 44, 'AT THE GATE', { size: 9, op: 0.4 })}
      <g transform="translate(153 120)">
        <g opacity="1"><animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.2;0.26;1" dur="7s" repeatCount="indefinite"/>
          ${boardingPass(0, 0, { badge: 'ECONOMY', badgeFill: 'rgba(255,255,255,0.18)', foot: 'GATE CLOSES 11:40', stroke: 'rgba(255,255,255,0.18)' })}
        </g>
        <g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.22;0.3;1" dur="7s" repeatCount="indefinite"/>
          ${boardingPass(0, 0)}
        </g>
        <rect x="-10" y="-10" width="288" height="136" rx="16" fill="none" stroke="${O}" stroke-width="2.5" opacity="0">
          <animate attributeName="opacity" values="0;0.9;0;0" keyTimes="0;0.16;0.3;1" dur="7s" repeatCount="indefinite"/></rect>
        <rect x="0" y="0" width="268" height="5" fill="${O}" opacity="0.7">
          <animate attributeName="y" values="0;111;0" dur="1.2s" repeatCount="indefinite"/></rect>
      </g>
      <g transform="translate(153 300)">
        ${dcard(0, 0, 268, 80, { r: 12 })}
        ${m(18, 26, 'REGULAR QUEUE', { size: 8.5, op: 0.4 })}
        <path d="M 18 50 H 250" stroke="${W}" stroke-width="5" opacity="0.1" stroke-linecap="round"/>
        <path d="M 18 50 H 18" stroke="${W}" stroke-width="5" opacity="0.35" stroke-linecap="round">
          <animate attributeName="d" values="M 18 50 H 18;M 18 50 H 76" dur="6s" fill="freeze" repeatCount="indefinite"/></path>
        ${m(250, 70, 'STILL WAITING', { size: 8.5, op: 0.35, anchor: 'end' })}
      </g>
      <g transform="translate(153 400)">
        ${dcard(0, 0, 268, 80, { r: 12, stroke: O, sw: 2, fill: 'rgba(255,83,20,0.08)' })}
        ${m(18, 26, 'YOUR LANE', { size: 8.5, op: 0.9, fill: O_SOFT })}
        <path d="M 18 50 H 250" stroke="${W}" stroke-width="5" opacity="0.1" stroke-linecap="round"/>
        <path d="M 18 50 H 18" stroke="${O}" stroke-width="5" stroke-linecap="round">
          <animate attributeName="d" values="M 18 50 H 18;M 18 50 H 250" dur="1.9s" begin="0.4s" fill="freeze" repeatCount="indefinite"/></path>
        ${m(250, 70, 'THROUGH IN 04:12', { size: 8.5, op: 1, fill: O, anchor: 'end' })}
      </g>
      <g transform="translate(153 512)">
        ${chip(0, 0, 104, '🛋 Lounge access', { op: 1 })}${chip(112, 0, 92, '✈ Fast track', { op: 1 })}
        ${chip(212, 0, 76, '✓ Included', { op: 1, stroke: GRN, color: GRN_LIT })}
      </g>`),
    pills: noPills,
  }),
};


/* ═════════════════════════════════════════════════════════════════════
   2 · BUILT FOR DIGITAL NOMADS  ·  574 × 656
   ═════════════════════════════════════════════════════════════════════ */

export const nmCurrent = {
  id: 'nm-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'A wireframe monitor in an empty panel',
  desc: 'A grey monitor outline with four skeleton text lines and one orange bar where a heading would be, an ONLINE wifi pill clipped to its corner, and three pills underneath. It is the weakest of the three panels on this page: the monitor is a loading-state placeholder rather than a picture of anything, it occupies about a fifth of a 656px-tall panel, and nothing in it is specific to a nomad.',
  pros: ['Quiet and unobtrusive', 'The ONLINE pill at least gestures at connectivity'],
  cons: ['A skeleton screen reads as an unfinished component, not a design', 'Uses about a fifth of a very tall panel', 'Nothing about it is specific to nomads — it is a generic computer', 'No city, no country, no number, no month, no figure of any kind'],
  scores: { story: 1, motion: 1, perf: 5, mobile: 3, brand: 2, ease: 5 },
  build: (uid) => ({
    svg: wN(`
      ${bg(uid, 574, 656)}
      ${glow(287, 330, 250, uid)}
      <g transform="translate(287 300)">
        ${dcard(-100, -68, 200, 130, { r: 10, fill: '#111726', stroke: 'rgba(255,255,255,0.55)', sw: 2.5 })}
        <rect x="-84" y="-52" width="112" height="9" rx="4.5" fill="${O}"/>
        ${[0, 1, 2, 3].map(i => `<rect x="-84" y="${-32 + i * 15}" width="${[152, 126, 140, 96][i]}" height="7" rx="3.5" fill="${W}" opacity="0.32"/>`).join('')}
        <rect x="-34" y="62" width="68" height="14" rx="3" fill="${W}" opacity="0.5"/>
        <rect x="-64" y="76" width="128" height="7" rx="3.5" fill="${W}" opacity="0.4"/>
      </g>
      <g transform="translate(358 340)">
        ${dcard(0, 0, 80, 26, { r: 13, fill: W })}
        <g transform="translate(14 13)" stroke="${O}" stroke-width="1.6" fill="none" stroke-linecap="round">
          <path d="M -5 1 a 7 7 0 0 1 10 0 M -2.6 3.6 a 3.6 3.6 0 0 1 5.2 0 M 0 6.4 h 0.01"/></g>
        ${m(50, 17, 'ONLINE', { size: 8.5, anchor: 'middle', op: 1, fill: '#111726' })}
      </g>
      <g transform="translate(140 450)">
        ${chip(0, 0, 96, '✓ No contracts')}${chip(104, 0, 112, '✓ No roaming bills')}${chip(224, 0, 84, '✓ One eSIM')}
      </g>`),
    pills: noPills,
  }),
};

export const nmCities = {
  id: 'nm-cities',
  name: 'Six Cities, One Number',
  family: 'Core promise',
  tagline: 'You move. The number does not.',
  desc: 'A year of moves runs down the panel — Lisbon in January, Bali in March, Medellín in May, Tbilisi in July, Cape Town in September, Bangkok in November. Beside each the local carrier changes, and in a fixed column to the right the same +351 number never does. It is the single most important promise on this page, and nothing currently illustrates it.',
  pros: ['States the actual product: a permanent number across every move', 'The unchanging column against the changing one is the whole argument', 'A tall panel is exactly the right shape for a year of rows', 'Names real nomad cities, which the audience will recognise instantly'],
  cons: ['Six rows plus two columns is dense for a panel with no copy', 'The chosen cities will date as nomad hubs shift'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const legs = [['JAN', 'Lisbon', 'MEO'], ['MAR', 'Bali', 'Telkomsel'], ['MAY', 'Medellín', 'Claro'],
      ['JUL', 'Tbilisi', 'Magti'], ['SEP', 'Cape Town', 'Vodacom'], ['NOV', 'Bangkok', 'AIS']];
    return {
      svg: wN(`
      ${bg(uid, 574, 656)}
      ${glow(180, 320, 250, uid)}
      ${m(36, 42, 'ONE YEAR OF MOVES', { size: 9, op: 0.4 })}
      ${m(538, 42, 'YOUR NUMBER', { size: 9, op: 0.4, anchor: 'end' })}

      <!-- the fixed number column -->
      ${dcard(384, 60, 152, 502, { r: 16, fill: 'rgba(255,83,20,0.07)', stroke: O, sw: 2 })}
      <g transform="translate(460 300)">
        ${t(0, -6, '+351', { size: 24, anchor: 'middle', fill: O })}
        ${t(0, 20, '912 04 88', { size: 15, anchor: 'middle', op: 0.75 })}
        ${m(0, 46, 'UNCHANGED', { size: 8.5, anchor: 'middle', op: 0.55, fill: O_SOFT })}
        <circle cy="72" r="5" fill="${GRN}"><animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite"/></circle>
      </g>

      <path d="M 66 84 V 546" stroke="${W}" stroke-width="2" opacity="0.1"/>
      ${legs.map(([mo, city, carrier], i) => `
        <g transform="translate(0 ${100 + i * 78})" opacity="0.3">
          <animate attributeName="opacity" values="0.3;1" dur="0.35s" begin="${(0.3 + i * 0.7).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
          <circle cx="66" r="8" fill="#131826" stroke="${O}" stroke-width="2.4"/>
          ${m(24, 4, mo, { size: 9, op: 0.45 })}
          ${t(92, -2, city, { size: 15 })}
          ${m(92, 18, carrier.toUpperCase(), { size: 8.5, op: 0.4 })}
          <path d="M 244 -4 H 372" stroke="${O}" stroke-width="1.6" opacity="0.32" stroke-dasharray="5 5"/>
          <circle r="3.5" fill="${O}">
            <animateMotion dur="1.1s" begin="${(0.4 + i * 0.7).toFixed(2)}s" repeatCount="indefinite" path="M 244 -4 H 372"/></circle>
        </g>`).join('')}
      <g transform="translate(36 584)">
        ${dcard(0, 0, 502, 44, { r: 12, fill: 'rgba(34,197,94,0.1)', stroke: GRN, sw: 1.6 })}
        ${m(251, 28, 'SIX COUNTRIES · SIX CARRIERS · ONE NUMBER, NEVER REISSUED', { size: 9, anchor: 'middle', op: 1, fill: GRN_LIT })}
      </g>`),
      pills: noPills,
    };
  },
};

export const nmLockout = {
  id: 'nm-lock',
  name: 'What Breaks Without It',
  family: 'Pain',
  tagline: 'The four things that go wrong every move',
  desc: 'Four failures a nomad has actually lived stack down the panel: a new SIM in every country, a number that changes with it, a two-factor code sent to a dead line, and a bank that freezes the account over a foreign login. Each one is struck through in turn and the Openline+ answer lands beside it. The two-factor lockout is the fear this audience knows best, and no other option names it.',
  pros: ['Names a specific, well-known nomad catastrophe: losing 2FA access', 'Problem-then-answer is the clearest structure for a benefit panel', 'Four beats fill the 656px height naturally', 'Speaks to a reader who has been burned and is shopping for a fix'],
  cons: ['Four negatives on screen before any positive lands', 'The bank-freeze line strays from connectivity', 'Dense — eight short lines of text in total'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const rows = [
      ['A new SIM in every country', 'One eSIM, 190+ countries'],
      ['Your number changes each move', 'A permanent number you keep'],
      ['2FA codes sent to a dead line', 'Your SMS follows you'],
      ['Your bank freezes the card', 'Same number, same country of record'],
    ];
    return {
      svg: wN(`
      ${bg(uid, 574, 656)}
      ${glow(287, 330, 250, uid)}
      ${m(36, 42, 'WHAT MOVING COUNTRY USUALLY COSTS YOU', { size: 9, op: 0.4 })}
      ${rows.map(([bad, good], i) => `
        <g transform="translate(40 ${74 + i * 132})">
          ${dcard(0, 0, 494, 112, { r: 15 })}
          <g transform="translate(26 40)">
            <circle r="11" fill="rgba(248,113,113,0.16)"/>
            <path d="M -4.6 -4.6 l 9.2 9.2 M 4.6 -4.6 l -9.2 9.2" stroke="${RD}" stroke-width="2.2" stroke-linecap="round"/>
          </g>
          <g transform="translate(52 45)">
            ${t(0, 0, bad, { size: 14, op: 0.6 })}
            <path d="M -2 -5 H -2" stroke="${RD}" stroke-width="2.2" stroke-linecap="round">
              <animate attributeName="d" values="M -2 -5 H -2;M -2 -5 H ${bad.length * 7.4}" dur="0.5s"
                begin="${(0.8 + i * 0.8).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/></path>
          </g>
          <g transform="translate(52 80)" opacity="0">
            <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${(1.2 + i * 0.8).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
            ${gtick(-14, -4, good, { size: 13 })}
          </g>
        </g>`).join('')}
      <g transform="translate(40 606)" opacity="0">
        <animate attributeName="opacity" values="0;1" dur="0.4s" begin="4.4s" fill="freeze" repeatCount="indefinite"/>
        ${m(247, 16, 'FOUR PROBLEMS, ONE SUBSCRIPTION', { size: 9.5, anchor: 'middle', op: 0.5 })}
      </g>`),
      pills: noPills,
    };
  },
};

export const nmYear = {
  id: 'nm-year',
  name: 'The Year, Billed',
  family: 'Value',
  tagline: 'Twelve unpredictable months against one flat line',
  desc: 'Twelve monthly bars grow down the panel showing what a nomad actually spends piecing connectivity together — a local SIM here, a roaming bill there, a bad month in Bali — jagged and unpredictable, totalling well over a thousand dollars. A single flat orange line crosses all twelve at ninety-nine, and the two totals resolve at the bottom. It makes the case on cost and on predictability at once.',
  pros: ['Argues price and predictability together, which the plan is built on', 'A jagged line against a flat one is instantly readable', 'Gives the section a headline saving figure it currently lacks', 'Twelve rows use the tall panel without any padding'],
  cons: ['The comparison spend is an estimate and will be challenged', 'A chart is a colder object than the rest of this page', 'Needs to stay in step with the published price'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 3, ease: 4 },
  build: (uid) => {
    const spend = [84, 142, 96, 210, 118, 74, 166, 132, 88, 194, 104, 126];
    const mos = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    const totalA = spend.reduce((a, b) => a + b, 0);
    return {
      svg: wN(`
      ${bg(uid, 574, 656)}
      ${glow(287, 320, 250, uid)}
      ${m(36, 42, 'PIECING IT TOGETHER YOURSELF', { size: 9, op: 0.4 })}
      ${m(538, 42, 'VS OPENLINE+', { size: 9, op: 0.75, fill: O_SOFT, anchor: 'end' })}
      ${spend.map((v, i) => `
        <g transform="translate(64 ${76 + i * 36})">
          ${m(-22, 14, mos[i], { size: 9.5, op: 0.35 })}
          <rect y="4" width="${v * 1.9}" height="17" rx="4" fill="${W}" opacity="0.2">
            <animate attributeName="width" values="0;${v * 1.9}" dur="0.6s" begin="${(0.25 + i * 0.13).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
          </rect>
          ${t(v * 1.9 + 12, 18, `$${v}`, { size: 11, op: 0.4, weight: 600 })}
        </g>`).join('')}
      <!-- the flat $99 line -->
      <g opacity="0"><animate attributeName="opacity" values="0;1" dur="0.5s" begin="2.1s" fill="freeze" repeatCount="indefinite"/>
        <path d="M 252 76 V 512" stroke="${O}" stroke-width="2.5" stroke-dasharray="7 5"/>
        <g transform="translate(252 60)">
          ${dcard(-40, -18, 80, 26, { r: 13, fill: O, stroke: O })}
          ${m(0, 0, '$99 FLAT', { size: 9, anchor: 'middle', op: 1 })}
        </g>
      </g>
      <g transform="translate(40 552)" opacity="0">
        <animate attributeName="opacity" values="0;1" dur="0.5s" begin="2.6s" fill="freeze" repeatCount="indefinite"/>
        ${dcard(0, 0, 238, 76, { r: 14 })}
        ${m(20, 26, 'YOUR WAY, THIS YEAR', { size: 8.5, op: 0.4 })}
        ${t(20, 58, `$${totalA.toLocaleString()}`, { size: 26, op: 0.75 })}
        ${dcard(256, 0, 238, 76, { r: 14, fill: 'rgba(255,83,20,0.1)', stroke: O, sw: 2 })}
        ${m(276, 26, 'OPENLINE+, THIS YEAR', { size: 8.5, op: 0.7, fill: O_SOFT })}
        ${t(276, 58, '$1,188', { size: 26, fill: O })}
      </g>
      ${m(287, 646, 'AND YOU KNOW THE NUMBER TWELVE MONTHS AHEAD', { size: 9, anchor: 'middle', op: 0.4 })}`),
      pills: noPills,
    };
  },
};

export const nmDesk = {
  id: 'nm-desk',
  name: 'Desk, Anywhere',
  family: 'Aspirational',
  tagline: 'The room changes. The signal does not.',
  desc: 'A laptop sits in the middle of the panel while the room around it changes — a Lisbon café, a Bali balcony, a Medellín coworking floor, an airport gate — each rendered as a few simple shapes. Through every change the signal bars stay full, a call comes in on the same number, and the city label updates. It is the only option on this page that sells the life rather than the mechanics.',
  pros: ['The only aspirational option — sells the reason, not the feature', 'Warmest and most memorable of the six', 'The unchanging signal bar is a quiet, effective constant', 'Works beautifully on the dark panel'],
  cons: ['Four background scenes is the most artwork of any option here', 'Risks the generic laptop-on-a-beach cliché if drawn loosely', 'Carries no number at all'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 4, brand: 5, ease: 2 },
  build: (uid) => {
    const scenes = [
      ['Lisbon', 'CAFÉ', `<rect x="-150" y="120" width="300" height="10" rx="5" fill="${O}" opacity="0.3"/>
        <rect x="-130" y="-120" width="80" height="110" rx="6" fill="${W}" opacity="0.06"/>
        <rect x="60" y="-100" width="70" height="90" rx="6" fill="${W}" opacity="0.06"/>
        <circle cx="-96" cy="88" r="16" fill="${W}" opacity="0.08"/>`],
      ['Bali', 'BALCONY', `<rect x="-150" y="120" width="300" height="10" rx="5" fill="${O}" opacity="0.3"/>
        <path d="M -120 60 q 20 -70 -10 -110 M -120 60 q -30 -60 -56 -84 M -120 60 q 46 -54 76 -70" fill="none" stroke="${W}" stroke-width="3" opacity="0.12"/>
        <path d="M -150 96 q 75 -14 150 0 t 150 0" fill="none" stroke="${W}" stroke-width="2.4" opacity="0.1"/>`],
      ['Medellín', 'COWORKING', `<rect x="-150" y="120" width="300" height="10" rx="5" fill="${O}" opacity="0.3"/>
        ${[0, 1, 2, 3, 4].map(i => `<rect x="${-142 + i * 60}" y="-118" width="44" height="104" rx="4" fill="${W}" opacity="0.05"/>`).join('')}
        ${[0, 1, 2, 3, 4].map(i => `<rect x="${-132 + i * 60}" y="-104" width="24" height="16" rx="2" fill="${O}" opacity="0.14"/>`).join('')}`],
      ['Gate 14', 'AIRPORT', `<rect x="-150" y="120" width="300" height="10" rx="5" fill="${O}" opacity="0.3"/>
        <path d="M -150 -100 h 300" stroke="${W}" stroke-width="2" opacity="0.1"/>
        <path d="M 70 -60 l 60 -22 l -6 22 l 22 8 l -76 20 z" fill="${W}" opacity="0.07"/>
        ${[0, 1, 2].map(i => `<rect x="${-140 + i * 44}" y="70" width="34" height="44" rx="5" fill="${W}" opacity="0.06"/>`).join('')}`],
    ];
    const per = 4;
    const dur = scenes.length * per;
    return {
      svg: wN(`
      ${bg(uid, 574, 656)}
      ${glow(287, 340, 260, uid)}
      ${m(36, 42, 'SAME eSIM · SAME NUMBER · DIFFERENT WINDOW', { size: 9, op: 0.4 })}
      <g transform="translate(287 340)">
        ${scenes.map(([, , art], i) => `
          <g opacity="0">
            <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.02;${(1 / scenes.length - 0.03).toFixed(3)};${(1 / scenes.length).toFixed(3)};1"
              dur="${dur}s" begin="${i * per}s" repeatCount="indefinite"/>
            ${art}
          </g>`).join('')}

        <!-- the laptop, constant -->
        <g>
          ${dcard(-104, -74, 208, 132, { r: 9, fill: '#0E1421', stroke: 'rgba(255,255,255,0.45)', sw: 2.5 })}
          <rect x="-88" y="-58" width="104" height="8" rx="4" fill="${O}"/>
          ${[0, 1, 2, 3].map(i => `<rect x="-88" y="${-40 + i * 14}" width="${[156, 130, 144, 100][i]}" height="6" rx="3" fill="${W}" opacity="0.26"/>`).join('')}
          <path d="M -130 60 h 260 l -12 12 h -236 z" fill="${W}" opacity="0.4"/>
          <!-- signal, never dropping -->
          <g transform="translate(62 -52)">
            ${[0, 1, 2, 3].map(i => `<rect x="${i * 7}" y="${-2 - i * 4}" width="4.6" height="${4 + i * 4}" rx="1.4" fill="${GRN_LIT}"/>`).join('')}
          </g>
        </g>

        ${scenes.map(([city, kind], i) => `
          <g transform="translate(0 100)" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.03;${(1 / scenes.length - 0.04).toFixed(3)};${(1 / scenes.length).toFixed(3)};1"
              dur="${dur}s" begin="${i * per}s" repeatCount="indefinite"/>
            ${dcard(-92, 0, 184, 38, { r: 19, fill: '#111726' })}
            ${m(-70, 24, kind, { size: 8.5, op: 0.4 })}
            ${t(72, 25, city, { size: 13.5, anchor: 'end', fill: O_SOFT })}
          </g>`).join('')}
      </g>
      <g transform="translate(287 556)">
        ${dcard(-160, 0, 320, 48, { r: 14, fill: 'rgba(255,83,20,0.08)', stroke: O, sw: 1.6 })}
        <g transform="translate(-136 24)" stroke="${O}" stroke-width="1.8" fill="none" stroke-linecap="round">
          <path d="M -6 -5 a 9 9 0 0 1 12 0 M -3.4 -1.4 a 4.6 4.6 0 0 1 6.8 0 M 0 2.6 h 0.01"/></g>
        ${t(-110, 29, 'Your number is ringing, wherever you are', { size: 12.5, op: 0.8, weight: 600 })}
      </g>
      ${m(287, 640, 'NO CONTRACTS · NO ROAMING BILLS · ONE eSIM', { size: 9, anchor: 'middle', op: 0.35 })}`),
      pills: noPills,
    };
  },
};

export const nmPassport = {
  id: 'nm-pass',
  name: 'Stamps',
  family: 'Credibility',
  tagline: 'Fourteen countries, still the same line',
  desc: 'Entry stamps land on a passport spread one after another, each one naming a country and a month, and beside each a small note that the line stayed up and the number stayed the same. A counter settles at fourteen countries this year. The passport is the single most recognisable nomad object and it is the one thing this page never shows.',
  pros: ['Uses the most ownable object this audience has', 'Stamps landing is naturally satisfying and easy to loop', 'A country counter is a concrete figure with no estimate in it', 'Reads instantly, with or without the labels'],
  cons: ['Stamp artwork is fiddly to get right at this size', 'Implies border crossings rather than connectivity', 'Rotated text can be awkward to keep legible'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 4, brand: 5, ease: 3 },
  build: (uid) => {
    const stamps = [['PRT', 'JAN', -8, 112, 128], ['IDN', 'MAR', 6, 318, 168], ['COL', 'MAY', -5, 150, 286],
      ['GEO', 'JUL', 9, 348, 318], ['ZAF', 'SEP', -7, 126, 430], ['THA', 'NOV', 5, 330, 458]];
    return {
      svg: wN(`
      ${bg(uid, 574, 656)}
      ${glow(287, 320, 250, uid)}
      ${m(36, 42, 'THIS YEAR', { size: 9, op: 0.4 })}
      ${dcard(48, 62, 478, 470, { r: 14, fill: 'rgba(255,255,255,0.035)' })}
      <path d="M 287 62 V 532" stroke="${W}" stroke-width="1.4" opacity="0.1" stroke-dasharray="6 6"/>
      ${stamps.map(([cc, mo, rot, x, y], i) => `
        <g transform="translate(${x} ${y}) rotate(${rot})" opacity="0">
          <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.06;1" dur="7s" begin="${(0.4 + i * 0.85).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
          <g>
            <animateTransform attributeName="transform" type="scale" values="1.9;1" dur="0.28s"
              begin="${(0.4 + i * 0.85).toFixed(2)}s" fill="freeze" repeatCount="indefinite" additive="sum"/>
            <rect x="-52" y="-30" width="104" height="60" rx="8" fill="none" stroke="${O}" stroke-width="2.4" opacity="0.85"/>
            <rect x="-45" y="-23" width="90" height="46" rx="5" fill="none" stroke="${O}" stroke-width="1.2" opacity="0.45"/>
            ${t(0, -2, cc, { size: 17, anchor: 'middle', fill: O_SOFT })}
            ${m(0, 16, mo, { size: 8.5, anchor: 'middle', op: 0.6, fill: O })}
          </g>
          <g transform="rotate(${-rot})" opacity="0">
            <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${(0.8 + i * 0.85).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
            ${gtick(-40, 46, 'online · same number', { size: 9.5, op: 0.5 })}
          </g>
        </g>`).join('')}
      <g transform="translate(48 556)">
        ${dcard(0, 0, 232, 72, { r: 14, fill: 'rgba(255,83,20,0.1)', stroke: O, sw: 2 })}
        ${m(22, 26, 'COUNTRIES THIS YEAR', { size: 8.5, op: 0.65, fill: O_SOFT })}
        ${t(22, 56, '14', { size: 26, fill: O })}
        ${dcard(246, 0, 232, 72, { r: 14 })}
        ${m(268, 26, 'TIMES THE NUMBER CHANGED', { size: 8.5, op: 0.4 })}
        ${t(268, 56, '0', { size: 26, fill: GRN_LIT })}
      </g>`),
      pills: noPills,
    };
  },
};

export const nmClock = {
  id: 'nm-clock',
  name: 'Every Timezone',
  family: 'Mechanism',
  tagline: 'The call finds you anyway',
  desc: 'A clock ring fills the panel with your current city travelling around it as the months pass. Calls and messages arrive from fixed points on the outside — a client in Berlin, a bank in Lisbon, a family group — and every one lands on the same number wherever the marker happens to be. It is the clearest mechanical explanation of what the phone number actually buys.',
  pros: ['Explains the mechanism, not just the promise', 'A circle is a strong, calm centrepiece for a tall dark panel', 'Named senders — client, bank, family — make it concrete', 'Loops forever with no visible reset point'],
  cons: ['A clock ring implies timezones more than it explains numbers', 'Inbound labels around a circle are the hardest thing here to keep tidy', 'More abstract than the city list or the passport'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const senders = [['Client · Berlin', -90], ['Bank · Lisbon', -18], ['Family', 54], ['2FA code', 126], ['Recruiter', 198]];
    const cities = ['LISBON', 'BALI', 'MEDELLÍN', 'TBILISI', 'CAPE TOWN', 'BANGKOK'];
    const R = 132;
    return {
      svg: wN(`
      ${bg(uid, 574, 656)}
      ${glow(287, 316, 260, uid)}
      ${m(36, 42, 'WHEREVER YOU ARE, IT IS THE SAME NUMBER', { size: 9, op: 0.4 })}
      <g transform="translate(287 316)">
        <circle r="${R}" fill="none" stroke="${W}" stroke-width="2" opacity="0.12"/>
        <circle r="${R - 26}" fill="none" stroke="${W}" stroke-width="1.2" opacity="0.07"/>
        ${Array.from({ length: 24 }, (_, i) => `<path d="M 0 ${-R + 8} V ${-R}" stroke="${W}" stroke-width="1.4"
          opacity="${i % 6 === 0 ? 0.3 : 0.12}" transform="rotate(${i * 15})"/>`).join('')}

        <!-- the fixed number at the centre -->
        <circle r="56" fill="#111726" stroke="${O}" stroke-width="2.5"/>
        ${t(0, -6, '+351', { size: 19, anchor: 'middle', fill: O })}
        ${m(0, 14, '912 04 88', { size: 9, anchor: 'middle', op: 0.6 })}

        <!-- you, travelling the ring -->
        <g>
          <animateTransform attributeName="transform" type="rotate" values="0;360" dur="${cities.length * 3}s" repeatCount="indefinite"/>
          <g transform="translate(0 ${-R})">
            <circle r="11" fill="${O}" stroke="#131826" stroke-width="3"/>
            <circle r="11" fill="none" stroke="${O}" stroke-width="2">
              <animate attributeName="r" values="11;28" dur="1.8s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.8;0" dur="1.8s" repeatCount="indefinite"/></circle>
          </g>
        </g>

        <!-- inbound, from fixed points -->
        ${senders.map(([who, deg], i) => {
      const rad = deg * Math.PI / 180;
      const x = Math.cos(rad) * (R + 56), y = Math.sin(rad) * (R + 56);
      const ix = Math.cos(rad) * 58, iy = Math.sin(rad) * 58;
      return `
          <g>
            <path d="M ${x.toFixed(1)} ${y.toFixed(1)} L ${ix.toFixed(1)} ${iy.toFixed(1)}"
              stroke="${O}" stroke-width="1.6" opacity="0.2" stroke-dasharray="5 5"/>
            <circle r="4" fill="${GRN_LIT}">
              <animateMotion dur="${senders.length * 1.6}s" begin="${i * 1.6}s" repeatCount="indefinite"
                path="M ${x.toFixed(1)} ${y.toFixed(1)} L ${ix.toFixed(1)} ${iy.toFixed(1)}"/>
              <animate attributeName="opacity" values="0;1;1;0;0" dur="${senders.length * 1.6}s" begin="${i * 1.6}s"
                keyTimes="0;0.04;${(1 / senders.length - 0.02).toFixed(3)};${(1 / senders.length).toFixed(3)};1" repeatCount="indefinite"/>
            </circle>
            ${m(x * 1.12, y * 1.12 + 4, who.toUpperCase(), { size: 8, anchor: Math.cos(rad) < -0.2 ? 'end' : Math.cos(rad) > 0.2 ? 'start' : 'middle', op: 0.42 })}
          </g>`;
    }).join('')}
      </g>
      <g transform="translate(287 560)">
        ${cities.map((c, i) => `
          <g opacity="0">
            <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.02;${(1 / cities.length - 0.02).toFixed(3)};${(1 / cities.length).toFixed(3)};1"
              dur="${cities.length * 3}s" begin="${i * 3}s" repeatCount="indefinite"/>
            ${dcard(-96, 0, 192, 38, { r: 19, fill: '#111726' })}
            ${m(0, 24, c, { size: 9.5, anchor: 'middle', op: 0.8, fill: O_SOFT })}
          </g>`).join('')}
      </g>
      ${m(287, 640, 'ONE LINE THAT NEVER HAS TO BE REISSUED', { size: 9, anchor: 'middle', op: 0.35 })}`),
      pills: noPills,
    };
  },
};


/* ═════════════════════════════════════════════════════════════════════
   3 · VERIFIED & SECURE  ·  574 × 432  (green on dark)
   ═════════════════════════════════════════════════════════════════════ */

const gbg = (uid) => bg(uid, 574, 432, GRN);

export const kyCurrent = {
  id: 'ky-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'A form, a phone, and a stamp in the way',
  desc: 'A REQUIRED form card listing passport number, home address, selfie and phone number with a green tick on each, beside a phone reading "Identity verified", plus a VERIFIED stamp and a "Card payment required" note. It is the most complete of the three panels on this page — but the stamp is printed directly over the Selfie row, the ticks are all present from the first frame so nothing is ever verified, and it never says why any of this is required.',
  pros: ['Right subject, right palette, and the most finished of the three panels', 'The form-plus-phone pairing is a good, legible structure', 'Green on dark reads as trustworthy without any copy'],
  cons: ['The VERIFIED stamp overlaps the "Selfie" label — a live layout bug', 'Every tick is present from frame one, so nothing is ever seen to pass', 'Never answers the page\'s own question: why is KYC required here?', 'No time, no count, no sense of how long any of it takes'],
  scores: { story: 3, motion: 2, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const fields = ['Passport number', 'Home address', 'Selfie verification', 'Phone number'];
    return {
      svg: wK(`
      ${gbg(uid)}
      ${glow(240, 216, 220, uid)}
      <g transform="translate(58 88)">
        ${dcard(0, 0, 202, 256, { r: 13, fill: '#F7FBF8', stroke: 'rgba(255,255,255,0.5)' })}
        ${m(18, 28, 'REQUIRED', { size: 8, op: 1, fill: GRN_DEEP })}
        ${fields.map((f, i) => `
          <g transform="translate(18 ${52 + i * 50})">
            <text x="0" y="0" font-size="10.5" font-weight="600" fill="#334155">${f}</text>
            <rect y="10" width="166" height="17" rx="5" fill="#E8EEEA"/>
            <rect x="8" y="16" width="${[60, 74, 50, 90][i]}" height="5" rx="2.5" fill="#B9C6BE"/>
            <circle cx="158" cy="18.5" r="8" fill="${GRN}"/>
            <path d="M 154.6 18.5 l 2.6 2.8 l 4.6 -5.4" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
          </g>`).join('')}
      </g>
      <g transform="translate(224 136)" opacity="0.9">
        <rect x="0" y="0" width="92" height="26" rx="5" fill="none" stroke="${GRN_LIT}" stroke-width="2"/>
        ${m(46, 18, 'VERIFIED', { size: 11, anchor: 'middle', op: 1, fill: GRN_LIT })}
      </g>
      <g transform="translate(330 96)">
        ${dcard(0, 0, 146, 246, { r: 20, fill: '#0A0F18', stroke: 'rgba(255,255,255,0.7)', sw: 2.5 })}
        <rect x="52" y="14" width="42" height="9" rx="4.5" fill="#1A2030"/>
        <rect x="7" y="32" width="132" height="206" rx="15" fill="#FAFDFB"/>
        <circle cx="73" cy="98" r="27" fill="${GRN}"/>
        <path d="M 73 86 l -9 5 v 7 c 0 6 4 10 9 12 c 5 -2 9 -6 9 -12 v -7 z" fill="#fff" opacity="0.95"/>
        <text x="73" y="136" font-size="12" font-weight="700" text-anchor="middle" fill="#0F172A">Identity</text>
        <text x="73" y="150" font-size="12" font-weight="700" text-anchor="middle" fill="#0F172A">verified</text>
        ${m(73, 172, 'card payment ·', { size: 7.5, anchor: 'middle', op: 0.5, fill: '#475569' })}
        ${m(73, 183, 'compliant', { size: 7.5, anchor: 'middle', op: 0.5, fill: '#475569' })}
        <rect x="30" y="200" width="86" height="6" rx="3" fill="${GRN}"/>
      </g>
      <g transform="translate(34 396)">
        <g transform="translate(0 -4)" stroke="${W}" stroke-width="1.6" fill="none" opacity="0.6">
          <rect x="0" y="0" width="15" height="11" rx="2"/><path d="M 0 4 h 15"/></g>
        ${t(24, 6, 'Card payment required', { size: 11.5, op: 0.8 })}
      </g>`),
      pills: noPills,
    };
  },
};

export const kyFourChecks = {
  id: 'ky-four',
  name: 'Four Checks, Cleared',
  family: 'Minimal change',
  tagline: 'The same form, actually verifying',
  desc: 'The form that ships, fixed and set in motion: the stamp is moved off the Selfie row, each field is submitted and then cleared in turn with its own elapsed time, and the phone flips to verified only once the fourth check passes. A total lands at the end — verified in three minutes. It changes nothing about the design except that the verification now happens.',
  pros: ['Lowest-risk option — fixes the live overlap bug and nothing else', 'Verifying in sequence is what the panel was always trying to show', '"Three minutes" answers the only real objection to KYC: the hassle', 'Fastest of the six to build and to approve'],
  cons: ['Still does not explain why KYC is required for a phone number', 'Keeps the form, which is the least appealing object available', 'Short loop'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const fields = [['Passport number', '0:24'], ['Home address', '0:41'], ['Selfie verification', '1:52'], ['Payment card', '2:58']];
    return {
      svg: wK(`
      ${gbg(uid)}
      ${glow(240, 216, 220, uid)}
      ${m(34, 34, 'FULL KYC, START TO FINISH', { size: 9, op: 0.4 })}
      <g transform="translate(46 62)">
        ${dcard(0, 0, 250, 300, { r: 13, fill: '#F7FBF8', stroke: 'rgba(255,255,255,0.5)' })}
        ${m(20, 30, 'REQUIRED', { size: 8, op: 1, fill: GRN_DEEP })}
        ${fields.map(([f, tm], i) => `
          <g transform="translate(20 ${56 + i * 58})">
            <text x="0" y="0" font-size="11" font-weight="600" fill="#334155">${f}</text>
            <rect y="11" width="150" height="19" rx="6" fill="#E8EEEA"/>
            <rect x="8" y="17.5" width="0" height="6" rx="3" fill="#9FB3A6">
              <animate attributeName="width" values="0;${[64, 88, 54, 104][i]}" dur="0.5s"
                begin="${(0.3 + i * 0.85).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/></rect>
            <circle cx="170" cy="20.5" r="9" fill="#D7E1DA"/>
            <g opacity="0">
              <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${(0.85 + i * 0.85).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
              <circle cx="170" cy="20.5" r="9" fill="${GRN}"/>
              <path d="M 166 20.5 l 2.8 3 l 5 -5.8" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round"/>
              <text x="188" y="24.5" font-size="9" font-weight="700" fill="${GRN_DEEP}" style="font-family:${MONO}">${tm}</text>
            </g>
          </g>`).join('')}
      </g>
      <g transform="translate(340 66)">
        ${dcard(0, 0, 152, 258, { r: 20, fill: '#0A0F18', stroke: 'rgba(255,255,255,0.7)', sw: 2.5 })}
        <rect x="55" y="14" width="42" height="9" rx="4.5" fill="#1A2030"/>
        <rect x="7" y="32" width="138" height="218" rx="15" fill="#FAFDFB"/>
        <g opacity="1"><animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.56;0.62;1" dur="6.5s" repeatCount="indefinite"/>
          <circle cx="76" cy="104" r="28" fill="none" stroke="#D7E1DA" stroke-width="4"/>
          <circle cx="76" cy="104" r="28" fill="none" stroke="${GRN}" stroke-width="4" stroke-linecap="round"
            stroke-dasharray="176" stroke-dashoffset="176" transform="rotate(-90 76 104)">
            <animate attributeName="stroke-dashoffset" values="176;0" dur="3.6s" fill="freeze" repeatCount="indefinite"/></circle>
          <text x="76" y="150" font-size="11" font-weight="700" text-anchor="middle" fill="#64748B">Verifying…</text>
        </g>
        <g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.58;0.66;1" dur="6.5s" repeatCount="indefinite"/>
          <circle cx="76" cy="104" r="28" fill="${GRN}"/>
          <path d="M 76 92 l -9 5 v 7 c 0 6 4 10 9 12 c 5 -2 9 -6 9 -12 v -7 z" fill="#fff" opacity="0.95"/>
          <text x="76" y="150" font-size="12" font-weight="700" text-anchor="middle" fill="#0F172A">Identity verified</text>
          <text x="76" y="172" font-size="10.5" font-weight="700" text-anchor="middle" fill="${GRN_DEEP}" style="font-family:${MONO}">2:58 TOTAL</text>
          <rect x="33" y="212" width="86" height="6" rx="3" fill="${GRN}"/>
        </g>
      </g>
      ${m(34, 404, 'REAL PHONE NUMBER · CARD PAYMENT · NO CRYPTO', { size: 9, op: 0.35 })}`),
      pills: noPills,
    };
  },
};

export const kyTwoDoors = {
  id: 'ky-doors',
  name: 'Two Doors',
  family: 'Explanation',
  tagline: 'Why this one is different',
  desc: 'The panel splits. On the left, the standard Openline eSIM: anonymous, crypto accepted, no documents, data only. On the right, Openline+: full KYC, card only, and a real phone number with the perks attached. Each side lights up what it unlocks. The copy beside this panel spends its whole first paragraph explaining that these are two different products, and this is the only option that shows it.',
  pros: ['Answers the actual question the section copy raises', 'Protects the anonymous product instead of appearing to contradict it', 'A landscape panel is the right shape for a side-by-side split', 'Turns KYC from a cost into the price of a specific benefit'],
  cons: ['Two columns of feature rows is the densest option here', 'Puts the word "anonymous" next to the word "KYC" on the same panel', 'Needs careful wording to avoid sounding like a downgrade either way'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 3, brand: 4, ease: 4 },
  build: (uid) => {
    const left = [['Anonymous', 1], ['Crypto accepted', 1], ['No documents', 1], ['Real phone number', 0], ['Lounge & perks', 0]];
    const right = [['Full KYC', 1], ['Card payment only', 1], ['Passport & selfie', 1], ['Real phone number', 1], ['Lounge & perks', 1]];
    const col = (x, title, sub, rows, accent, i0) => `
      <g transform="translate(${x} 70)">
        ${dcard(0, 0, 238, 298, { r: 15, fill: accent === GRN ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.035)',
      stroke: accent === GRN ? GRN : 'rgba(255,255,255,0.13)', sw: accent === GRN ? 2 : 1.5 })}
        ${t(22, 34, title, { size: 15, fill: accent === GRN ? GRN_LIT : W })}
        ${m(22, 54, sub, { size: 8.5, op: 0.4 })}
        <path d="M 22 68 H 216" stroke="${W}" stroke-width="1.2" opacity="0.1"/>
        ${rows.map(([lab, on], i) => `
          <g transform="translate(22 ${94 + i * 40})" opacity="0">
            <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${(i0 + i * 0.22).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
            ${on ? `<circle r="8" fill="${accent}" opacity="0.2"/>
              <path d="M -3.6 0 l 2.6 3 l 5.2 -6" fill="none" stroke="${accent === GRN ? GRN_LIT : W}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
        : `<circle r="8" fill="rgba(255,255,255,0.07)"/>
              <path d="M -3.4 -3.4 l 6.8 6.8 M 3.4 -3.4 l -6.8 6.8" stroke="${W}" stroke-width="1.8" opacity="0.32" stroke-linecap="round"/>`}
            ${t(20, 4, lab, { size: 12.5, op: on ? 0.85 : 0.35, weight: 600 })}
          </g>`).join('')}
      </g>`;
    return {
      svg: wK(`
      ${gbg(uid)}
      ${glow(400, 216, 230, uid)}
      ${m(34, 34, 'TWO PRODUCTS, TWO SETS OF RULES', { size: 9, op: 0.4 })}
      ${col(34, 'Openline eSIM', 'STANDARD · DATA', left, W, 0.3)}
      ${col(302, 'Openline+', 'PREMIUM · VOICE & SMS', right, GRN, 0.55)}
      ${m(34, 404, 'A REAL NUMBER IS A REGULATED PRODUCT — THAT IS WHY', { size: 9, op: 0.35 })}`),
      pills: noPills,
    };
  },
};

export const kyLiveness = {
  id: 'ky-live',
  name: 'Liveness Check',
  family: 'Literal',
  tagline: 'Scan, match, number issued',
  desc: 'A face oval sits on the left with a scanning line sweeping it; the ring closes, a match is confirmed against the passport, and on the right a phone number is allocated and written onto a card. It is the most literal and most familiar rendering of identity verification, and it is the only option that connects the check directly to the thing it produces.',
  pros: ['Instantly recognisable — everyone has done this on a phone', 'Links the check to its output: the number gets issued', 'One continuous beat, easy to read at speed', 'Landscape panel suits a left-to-right check-then-issue flow'],
  cons: ['A face outline is a delicate thing to draw without it looking odd', 'Biometric scanning can read as intrusive rather than reassuring', 'Says nothing about what happens to the documents afterwards'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 4, brand: 4, ease: 3 },
  build: (uid) => ({
    svg: wK(`
      ${gbg(uid)}
      ${glow(180, 210, 210, uid)}
      ${m(34, 34, 'LIVENESS CHECK', { size: 9, op: 0.4 })}
      <g transform="translate(152 208)">
        <ellipse rx="76" ry="96" fill="none" stroke="${W}" stroke-width="2" opacity="0.16" stroke-dasharray="14 10"/>
        <ellipse rx="76" ry="96" fill="none" stroke="${GRN}" stroke-width="2.5" stroke-dasharray="14 10" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.44;0.5;0.94;1" dur="7s" repeatCount="indefinite"/></ellipse>
        <!-- face -->
        <g opacity="0.6" stroke="${W}" stroke-width="2.4" fill="none" stroke-linecap="round">
          <ellipse rx="44" ry="58"/>
          <circle cx="-17" cy="-14" r="4" fill="${W}" stroke="none"/>
          <circle cx="17" cy="-14" r="4" fill="${W}" stroke="none"/>
          <path d="M 0 -6 v 14 q 0 4 5 4"/>
          <path d="M -15 30 q 15 11 30 0"/>
        </g>
        <!-- scan line -->
        <g><rect x="-76" y="-6" width="152" height="4" rx="2" fill="${GRN_LIT}" opacity="0.8">
          <animate attributeName="y" values="-100;92;-100" dur="2.4s" repeatCount="indefinite"/></rect></g>
        <g transform="translate(0 124)" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.46;0.52;0.94;1" dur="7s" repeatCount="indefinite"/>
          ${dcard(-80, 0, 160, 32, { r: 16, fill: 'rgba(34,197,94,0.14)', stroke: GRN, sw: 1.6 })}
          ${m(0, 21, 'MATCH · PASSPORT', { size: 9, anchor: 'middle', op: 1, fill: GRN_LIT })}
        </g>
      </g>
      <path d="M 262 208 H 322" stroke="${GRN}" stroke-width="2" opacity="0.3" stroke-dasharray="6 6"/>
      <circle r="4" fill="${GRN_LIT}" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.52;0.56;0.72;0.76;1" dur="7s" repeatCount="indefinite"/>
        <animateMotion dur="7s" repeatCount="indefinite" keyPoints="0;0;1;1" keyTimes="0;0.54;0.72;1" calcMode="linear" path="M 262 208 H 322"/>
      </circle>
      <g transform="translate(336 126)">
        ${dcard(0, 0, 208, 164, { r: 15, fill: 'rgba(255,255,255,0.035)' })}
        ${m(22, 32, 'NUMBER ALLOCATED', { size: 8.5, op: 0.4 })}
        <g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.72;0.78;0.94;1" dur="7s" repeatCount="indefinite"/>
          ${t(22, 74, '+351 912 04 88', { size: 19, fill: GRN_LIT })}
          ${gtick(30, 108, 'Voice, SMS and data', { size: 11.5 })}
          ${gtick(30, 134, 'In your name, legally', { size: 11.5 })}
        </g>
        <g opacity="1"><animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.7;0.76;0.94;1" dur="7s" repeatCount="indefinite"/>
          <rect x="22" y="56" width="150" height="20" rx="6" fill="${W}" opacity="0.07"/>
          <rect x="22" y="96" width="120" height="14" rx="6" fill="${W}" opacity="0.05"/>
          <rect x="22" y="122" width="134" height="14" rx="6" fill="${W}" opacity="0.05"/>
        </g>
      </g>
      ${m(34, 404, 'A REAL NUMBER HAS TO BELONG TO A REAL PERSON', { size: 9, op: 0.35 })}`),
    pills: noPills,
  }),
};

export const kySealed = {
  id: 'ky-seal',
  name: 'Verified, Then Sealed',
  family: 'Privacy',
  tagline: 'Checked once, then locked away',
  desc: 'Documents arrive, are checked, and are then visibly sealed — the passport and selfie collapse into a locked record with a hash on it, while only the result travels onward as a single verified flag. It answers the question this section leaves hanging on a page that also sells an anonymous crypto product: what happens to my passport after you have looked at it?',
  pros: ['Answers the real fear, which is retention rather than verification', 'Coherent with a brand that sells an anonymous product elsewhere', 'Sealing is a single satisfying motion with a clear end state', 'Differentiates from every competitor, who say nothing about this'],
  cons: ['Only works if the retention policy genuinely matches the picture', 'A hash is a technical detail most readers will not decode', 'Raises a concern some readers had not thought of yet'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 3 },
  build: (uid) => ({
    svg: wK(`
      ${gbg(uid)}
      ${glow(190, 210, 220, uid)}
      ${m(34, 34, 'WHAT HAPPENS TO YOUR DOCUMENTS', { size: 9, op: 0.4 })}
      <!-- documents, arriving then collapsing -->
      ${[['Passport', -12, 74], ['Selfie', 7, 110], ['Address', -5, 146]].map(([lab, rot, y], i) => `
        <g transform="translate(120 ${y + 40}) rotate(${rot})">
          <animateTransform attributeName="transform" type="translate" values="120 ${y + 40};120 ${y + 40};120 214;120 214"
            keyTimes="0;0.3;0.48;1" dur="8s" repeatCount="indefinite" additive="sum"/>
          <g opacity="1"><animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.44;0.52;1" dur="8s" repeatCount="indefinite"/>
            ${dcard(-62, -24, 124, 48, { r: 8, fill: '#F7FBF8', stroke: 'rgba(255,255,255,0.4)' })}
            <rect x="-50" y="-12" width="26" height="26" rx="4" fill="#D7E1DA"/>
            <rect x="-16" y="-9" width="58" height="6" rx="3" fill="#C2D0C7"/>
            <rect x="-16" y="3" width="42" height="6" rx="3" fill="#D7E1DA"/>
            <text x="-50" y="34" font-size="8" font-weight="700" fill="${W}" opacity="0.4" style="font-family:${MONO}">${lab.toUpperCase()}</text>
          </g>
        </g>`).join('')}
      <!-- the sealed record -->
      <g transform="translate(120 214)" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.58;0.94;1" dur="8s" repeatCount="indefinite"/>
        ${dcard(-74, -56, 148, 112, { r: 14, fill: '#101A18', stroke: GRN, sw: 2 })}
        <g transform="translate(0 -14)">
          <rect x="-15" y="-6" width="30" height="24" rx="4" fill="none" stroke="${GRN_LIT}" stroke-width="2.4"/>
          <path d="M -8 -6 v -7 a 8 8 0 0 1 16 0 v 7" fill="none" stroke="${GRN_LIT}" stroke-width="2.4"/>
          <circle cy="6" r="2.6" fill="${GRN_LIT}"/>
        </g>
        ${m(0, 30, 'SEALED', { size: 9.5, anchor: 'middle', op: 1, fill: GRN_LIT })}
        ${m(0, 46, 'a7f2…1cb9', { size: 8, anchor: 'middle', op: 0.45 })}
      </g>
      <!-- only the flag travels on -->
      <path d="M 204 214 H 316" stroke="${GRN}" stroke-width="2" opacity="0.28" stroke-dasharray="6 6"/>
      <circle r="4.5" fill="${GRN_LIT}" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.6;0.64;0.8;0.84;1" dur="8s" repeatCount="indefinite"/>
        <animateMotion dur="8s" repeatCount="indefinite" keyPoints="0;0;1;1" keyTimes="0;0.62;0.8;1" calcMode="linear" path="M 204 214 H 316"/>
      </circle>
      <g transform="translate(332 136)">
        ${dcard(0, 0, 212, 156, { r: 15, fill: 'rgba(34,197,94,0.07)', stroke: GRN, sw: 1.6 })}
        ${m(22, 32, 'WHAT WE KEEP', { size: 8.5, op: 0.55, fill: GRN_LIT })}
        <g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.78;0.84;0.94;1" dur="8s" repeatCount="indefinite"/>
          ${t(22, 72, 'verified: true', { size: 17, fill: GRN_LIT })}
          ${m(22, 98, 'AND NOTHING ELSE IN THE CLEAR', { size: 8.5, op: 0.45 })}
          ${gtick(32, 128, 'Docs encrypted at rest', { size: 11.5 })}
        </g>
      </g>
      ${m(34, 404, 'CHECKED ONCE · SEALED · NEVER RE-READ', { size: 9, op: 0.35 })}`),
    pills: noPills,
  }),
};

export const kyRegistry = {
  id: 'ky-reg',
  name: 'The Number Needs a Name',
  family: 'Reason',
  tagline: 'A regulator is the reason, not us',
  desc: 'A phone number is shown being drawn from a national numbering range, and the allocation will not complete until an identity is attached to it — the record sits pending, then clears once the name is bound. It reframes KYC as a legal condition of owning a real number rather than a hoop Openline invented, which is exactly what the paragraph beside it is trying to say.',
  pros: ['Shifts the burden from the brand to the regulation — the right frame', 'Explains why the anonymous product cannot include a phone number', 'A pending record clearing is a clean, single, legible beat', 'Signals a company that understands its own compliance obligations'],
  cons: ['Regulatory framing is dry, and this is a consumer page', 'Numbering-authority detail varies by country', 'Least emotionally warm option of the six'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 4, brand: 3, ease: 4 },
  build: (uid) => ({
    svg: wK(`
      ${gbg(uid)}
      ${glow(300, 210, 230, uid)}
      ${m(34, 34, 'NATIONAL NUMBERING RANGE · PT', { size: 9, op: 0.4 })}
      <g transform="translate(34 62)">
        ${dcard(0, 0, 232, 290, { r: 15, fill: 'rgba(255,255,255,0.035)' })}
        ${[['+351 912 04 86', 'allocated'], ['+351 912 04 87', 'allocated'], ['+351 912 04 88', 'free'],
      ['+351 912 04 89', 'free'], ['+351 912 04 90', 'free']].map(([n, st], i) => `
          <g transform="translate(20 ${46 + i * 48})">
            ${m(0, 0, n, { size: 11, op: st === 'free' ? 0.85 : 0.32 })}
            ${m(192, 0, st.toUpperCase(), { size: 8, anchor: 'end', op: st === 'free' ? 0.6 : 0.3, fill: st === 'free' ? GRN_LIT : W })}
            ${i === 2 ? `<rect x="-12" y="-18" width="216" height="30" rx="7" fill="${GRN}" opacity="0.12"/>
              <rect x="-12" y="-18" width="216" height="30" rx="7" fill="none" stroke="${GRN}" stroke-width="1.6"/>` : ''}
          </g>`).join('')}
      </g>
      <path d="M 272 206 H 322" stroke="${GRN}" stroke-width="2" opacity="0.28" stroke-dasharray="6 6"/>
      <g transform="translate(332 62)">
        ${dcard(0, 0, 212, 290, { r: 15, fill: '#101A18', stroke: 'rgba(255,255,255,0.14)' })}
        ${m(22, 32, 'ALLOCATION RECORD', { size: 8.5, op: 0.45 })}
        ${t(22, 64, '+351 912 04 88', { size: 15, fill: GRN_LIT })}
        <path d="M 22 82 H 190" stroke="${W}" stroke-width="1.2" opacity="0.12"/>
        ${[['Number range', 'PT · mobile'], ['Assigned to', ''], ['Status', '']].map(([k, v], i) => `
          <g transform="translate(22 ${110 + i * 44})">
            ${m(0, 0, k.toUpperCase(), { size: 8, op: 0.35 })}
            ${v ? t(0, 20, v, { size: 12.5, op: 0.8, weight: 600 }) : ''}
          </g>`).join('')}
        <!-- pending, then bound -->
        <g opacity="1"><animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.44;0.5;0.94;1" dur="7s" repeatCount="indefinite"/>
          <g transform="translate(22 174)">
            <rect width="120" height="17" rx="6" fill="${W}" opacity="0.07"/>
            ${m(0, 46, 'PENDING IDENTITY', { size: 9, op: 0.8, fill: AMB })}
          </g>
        </g>
        <g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.46;0.54;0.94;1" dur="7s" repeatCount="indefinite"/>
          ${t(22, 174, 'Paul F. · verified', { size: 12.5, op: 0.9, weight: 600 })}
          ${m(22, 220, 'CLEARED · KYC ON FILE', { size: 9, op: 1, fill: GRN_LIT })}
        </g>
        <g transform="translate(22 248)" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.56;0.62;0.94;1" dur="7s" repeatCount="indefinite"/>
          ${gtick(10, 10, 'Yours, in your name', { size: 11.5 })}
        </g>
      </g>
      ${m(34, 404, 'YOU CANNOT BE ISSUED A REAL LINE ANONYMOUSLY — ANYWHERE', { size: 9, op: 0.35 })}`),
    pills: noPills,
  }),
};

export const kyCommunity = {
  id: 'ky-comm',
  name: 'A Selected Group',
  family: 'Positioning',
  tagline: 'Verification as the door policy',
  desc: 'Applicants arrive at the panel one at a time. Most are verified and join a growing grid of members; a couple are declined and fall away. A counter tracks verified members and the pass rate settles just under ninety percent. It turns KYC from a chore into the thing that makes the group worth joining — which is precisely what the "Curated Community" card beside it claims.',
  pros: ['Reframes friction as exclusivity — the strongest possible spin', 'Directly supports the Curated Community card in the same block', 'Visible declines make the curation claim credible rather than decorative', 'Landscape panel suits an arrivals-into-a-grid composition'],
  cons: ['Showing rejections on a sales page is a bold choice', 'A pass rate figure has to be real and kept current', 'Says nothing about privacy or about why KYC is required at all'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const seats = 40;
    return {
      svg: wK(`
      ${gbg(uid)}
      ${glow(340, 206, 230, uid)}
      ${m(34, 34, 'APPLICANTS', { size: 9, op: 0.4 })}
      ${m(540, 34, 'VERIFIED MEMBERS', { size: 9, op: 0.75, fill: GRN_LIT, anchor: 'end' })}
      <!-- the queue of applicants -->
      <g transform="translate(74 0)">
        ${Array.from({ length: 6 }, (_, i) => {
      const declined = i === 2 || i === 5;
      return `
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 380;0 380;0 ${declined ? 300 : 180};0 ${declined ? 470 : 180}"
              keyTimes="0;0.06;0.4;1" dur="${6 * 1.45}s" begin="${i * 1.45}s" repeatCount="indefinite"/>
            <g opacity="0">
              <animate attributeName="opacity" values="0;1;1;${declined ? 0 : 1};0;0" keyTimes="0;0.05;0.4;0.62;0.72;1"
                dur="${6 * 1.45}s" begin="${i * 1.45}s" repeatCount="indefinite"/>
              <circle cy="-12" r="11" fill="${declined ? 'rgba(248,113,113,0.2)' : 'rgba(34,197,94,0.2)'}"
                stroke="${declined ? RD : GRN}" stroke-width="2"/>
              <path d="M -13 16 v -9 a 13 13 0 0 1 26 0 v 9 z" fill="${declined ? RD : GRN}" opacity="0.4"/>
              <g transform="translate(26 -12)">
                ${declined
          ? `<path d="M -4 -4 l 8 8 M 4 -4 l -8 8" stroke="${RD}" stroke-width="2.4" stroke-linecap="round"/>`
          : `<path d="M -4.4 0 l 3 3.4 l 6 -7" fill="none" stroke="${GRN_LIT}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`}
              </g>
              ${m(-30, 40, declined ? 'DECLINED' : 'VERIFIED', { size: 8, op: 0.7, fill: declined ? RD : GRN_LIT })}
            </g>
          </g>`;
    }).join('')}
      </g>
      <!-- the membership grid -->
      <g transform="translate(212 72)">
        ${dcard(0, 0, 330, 232, { r: 15, fill: 'rgba(34,197,94,0.06)', stroke: GRN, sw: 1.6 })}
        ${Array.from({ length: seats }, (_, i) => `
          <circle cx="${28 + (i % 10) * 30}" cy="${38 + Math.floor(i / 10) * 30}" r="9"
            fill="rgba(255,255,255,0.06)">
            <animate attributeName="fill" values="rgba(255,255,255,0.06);${GRN}" dur="0.3s"
              begin="${(0.4 + i * 0.16).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.85" dur="0.3s" begin="${(0.4 + i * 0.16).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
          </circle>`).join('')}
        <g transform="translate(28 196)">
          ${t(0, 0, '2,418', { size: 22, fill: GRN_LIT })}
          ${m(72, -2, 'VERIFIED NOMADS', { size: 8.5, op: 0.5 })}
          ${m(274, -2, '88% PASS RATE', { size: 8.5, op: 0.5, anchor: 'end' })}
        </g>
      </g>
      ${m(34, 404, 'FULL KYC IS THE DOOR POLICY, NOT THE PAPERWORK', { size: 9, op: 0.35 })}`),
      pills: noPills,
    };
  },
};


/* ══ LOUNGE · 7–9 ═══════════════════════════════════════════════════ */

export const lgDelay = {
  id: 'lg-delay',
  name: 'The Four-Hour Delay',
  family: 'Value',
  tagline: 'The day the membership pays for itself',
  desc:
    'Lounge access is worth nothing on a smooth day and everything on a bad one. This runs a delay: ' +
    'the gate slips from 14:20 to 18:35 in four announcements, and each slip adds what the terminal ' +
    'would have charged for a seat, a meal and wifi. By the third announcement the membership has ' +
    'paid for itself, and the figure is on screen.',
  pros: [
    'Frames the benefit around the moment it is actually used',
    'The running total is the most concrete argument for the tier',
    'Every traveller has had this exact day',
  ],
  cons: ['Leads with an unpleasant scenario', 'Terminal prices vary by airport'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 12;
    const slips = [
      ['14:20', 'On time', 0, 'Boarding as scheduled'],
      ['15:40', 'Delayed 80 min', 14, 'A seat, and somewhere to put a laptop'],
      ['17:05', 'Delayed 2h 45', 32, 'A hot meal instead of a terminal sandwich'],
      ['18:35', 'Delayed 4h 15', 58, 'Wifi that holds a call'],
    ];
    const inner = `
    ${bg(uid, 574, 642)}
    ${glow(287, 200, 230, uid)}
    ${m(34, 48, 'LIS \u2192 SIN \u00b7 GATE 24', { size: 9.5, op: 0.5 })}
    ${t(34, 84, 'The day it pays for itself', { size: 21 })}
    ${slips.map(([time, status, cost, note], i) => {
      const y = 116 + i * 104;
      const on = 0.06 + i * 0.17;
      const bad = i > 0;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${dcard(34, y, 506, 86, { r: 13 })}
        <rect x="34" y="${y}" width="4" height="86" rx="2" fill="${bad ? RD : GRN}"/>
        ${t(58, y + 34, time, { size: 22 })}
        ${m(58, y + 58, status, { size: 9.5, op: 0.55, fill: bad ? RD : GRN })}
        ${t(168, y + 32, note, { size: 12.5, op: 0.8 })}
        ${cost ? `${m(168, y + 56, 'WOULD HAVE COST', { size: 8.5, op: 0.4 })}
          ${t(516, y + 52, `$${cost}`, { size: 24, anchor: 'end', fill: O })}` : `
          ${m(516, y + 52, 'NO COST', { size: 9.5, anchor: 'end', op: 0.4 })}`}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.76;0.84;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${dcard(34, 542, 506, 74, { r: 14, fill: 'rgba(255,83,20,0.14)', stroke: O, sw: 2 })}
      ${m(58, 572, 'ONE DELAYED FLIGHT', { size: 9, op: 0.6 })}
      ${t(58, 600, 'covered the membership, twice over', { size: 14 })}
      ${t(516, 592, '$104', { size: 28, anchor: 'end', fill: O })}
    </g>`;
    return { svg: wL(inner), pills: noPills };
  },
};

export const lgQueue = {
  id: 'lg-queue',
  name: 'The Queue You Skip',
  family: 'Comparison',
  tagline: 'Two lines, one clock, forty minutes apart',
  desc:
    'Two security lanes side by side with the same clock running on both. The general lane advances ' +
    'one traveller at a time and stalls; the fast-track lane clears in four. It is the least abstract ' +
    'possible statement of the benefit, and the stalled lane is doing all the work.',
  pros: [
    'Zero explanation needed — the two lanes say everything',
    'Time, not money, which is the currency this tier actually sells',
    'Holds up as a still frame',
  ],
  cons: ['A very literal treatment', 'Queue metaphors are common in travel marketing'],
  scores: { story: 4, motion: 5, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 11;
    const person = (x, y, col, op = 1) => `
      <g transform="translate(${x} ${y})" opacity="${op}">
        <circle cy="-9" r="6" fill="${col}"/>
        <path d="M -7 8 q 0 -12 7 -12 q 7 0 7 12 z" fill="${col}"/>
      </g>`;
    const inner = `
    ${bg(uid, 574, 642)}
    ${glow(287, 220, 230, uid)}
    ${m(34, 48, 'SECURITY \u00b7 TERMINAL 1', { size: 9.5, op: 0.5 })}
    ${t(34, 84, 'Same clock, two lanes', { size: 21 })}

    ${dcard(34, 112, 240, 420, { r: 14 })}
    ${m(54, 140, 'GENERAL', { size: 9, op: 0.5 })}
    ${Array.from({ length: 11 }, (_, i) => person(154, 180 + i * 32, 'rgba(255,255,255,0.35)')).join('')}
    <g>
      ${person(154, 180, O_SOFT)}
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -44;0 -44"
        keyTimes="0;0.34;1" dur="${dur}s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0 0 1 1"/>
    </g>
    ${m(154, 560, '38 MIN', { size: 13, anchor: 'middle', op: 0.75, fill: RD })}
    ${m(154, 582, 'and still queuing', { size: 9, anchor: 'middle', op: 0.4 })}

    ${dcard(300, 112, 240, 420, { r: 14, fill: 'rgba(255,83,20,0.1)', stroke: O, sw: 2 })}
    ${m(320, 140, 'FAST TRACK', { size: 9, op: 0.7, fill: O })}
    ${Array.from({ length: 4 }, (_, i) => `
      <g opacity="1">
        ${person(420, 180 + i * 32, O)}
        <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;${(0.1 + i * 0.08).toFixed(3)};${(0.14 + i * 0.08).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      </g>`).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.42;0.48;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${gtick(420, 300, '', { fill: GRN_LIT })}
      ${t(420, 340, 'Through', { size: 15, anchor: 'middle', fill: GRN_LIT })}
    </g>
    ${m(420, 560, '4 MIN', { size: 13, anchor: 'middle', op: 0.9, fill: GRN_LIT })}
    ${m(420, 582, 'airside, coffee in hand', { size: 9, anchor: 'middle', op: 0.4 })}

    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.6;0.68;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${dcard(34, 596, 506, 22, { r: 11, fill: 'transparent', stroke: 'transparent', sw: 0 })}
      ${m(287, 612, '34 MINUTES, EVERY DEPARTURE', { size: 10, anchor: 'middle', op: 0.6, fill: O })}
    </g>`;
    return { svg: wL(inner), pills: noPills };
  },
};

export const lgNetwork = {
  id: 'lg-network',
  name: 'Where It Works',
  family: 'Coverage',
  tagline: 'Named airports, not a count',
  desc:
    'Every lounge programme quotes a number of locations and none of them tell you whether your ' +
    'airport is in it. This names them — Lisbon, Madrid, Heathrow, Changi, Dubai, Narita — with the ' +
    'terminal and the lounge, arriving one at a time. A named list is checkable; a count is not.',
  pros: [
    'Checkable against the reader\u2019s own route, which a count never is',
    'Terminal-level detail signals a real programme rather than a rebadged one',
    'Easy to extend as the network grows',
  ],
  cons: ['Needs the real lounge list to stay accurate', 'Invites the question about airports not listed'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 12;
    const ports = [
      ['LIS', 'Lisbon', 'T1 \u00b7 ANA Lounge'],
      ['MAD', 'Madrid', 'T4S \u00b7 Sala VIP'],
      ['LHR', 'Heathrow', 'T5 \u00b7 Aspire'],
      ['SIN', 'Changi', 'T3 \u00b7 SATS Premier'],
      ['DXB', 'Dubai', 'T3 \u00b7 Marhaba'],
      ['NRT', 'Narita', 'T1 \u00b7 IASS'],
    ];
    const inner = `
    ${bg(uid, 574, 642)}
    ${glow(287, 240, 240, uid)}
    ${m(34, 48, 'LOUNGE NETWORK', { size: 9.5, op: 0.5 })}
    ${t(34, 84, 'Named, not counted', { size: 21 })}
    ${ports.map(([cc, city, lounge], i) => {
      const y = 116 + i * 74;
      const on = 0.05 + i * 0.12;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.045).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <animateTransform attributeName="transform" type="translate" values="16 0;0 0;0 0"
          keyTimes="0;${(on + 0.045).toFixed(3)};1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${dcard(34, y, 506, 58, { r: 12 })}
        ${dcard(50, y + 11, 56, 36, { r: 9, fill: 'rgba(255,83,20,0.16)', stroke: 'rgba(255,83,20,0.4)' })}
        ${t(78, y + 35, cc, { size: 15, anchor: 'middle', fill: O })}
        ${t(124, y + 27, city, { size: 14 })}
        ${m(124, y + 45, lounge, { size: 9.5, op: 0.45 })}
        ${gtick(508, y + 29, '', { fill: GRN_LIT })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.8;0.88;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${m(34, 586, 'AND 1,200 MORE \u2014 THE FULL LIST IS PUBLISHED, NOT SUMMARISED', { size: 9.5, op: 0.55, fill: O })}
      ${m(34, 610, 'SEARCH YOUR AIRPORT BEFORE YOU BUY', { size: 9, op: 0.35 })}
    </g>`;
    return { svg: wL(inner), pills: noPills };
  },
};

/* ══ NOMAD · 7–9 ════════════════════════════════════════════════════ */

export const nmMonthEnd = {
  id: 'nm-monthend',
  name: 'The Month That Does Not End',
  family: 'Value',
  tagline: 'Data rolling forward instead of expiring',
  desc:
    'The quiet cruelty of travel data is the expiry date. Three months run side by side: unused ' +
    'gigabytes roll forward instead of vanishing, and the balance grows through a quiet month rather ' +
    'than resetting to zero. For somebody living out of a bag this is the difference between a plan ' +
    'and a subscription they resent.',
  pros: [
    'Attacks expiry, which is the most disliked mechanic in the category',
    'The growing balance is a genuinely pleasant thing to watch',
    'Directly relevant to a nomad rather than a holiday traveller',
  ],
  cons: ['Only works if rollover is actually the policy', 'Three-month timeline is a lot of structure'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 12;
    const months = [
      ['MARCH', 'Bangkok, mostly wifi', 20, 6, 14],
      ['APRIL', 'Lisbon, working from cafés', 20, 23, 11],
      ['MAY', 'Split, tethering a laptop', 20, 28, 3],
    ];
    const inner = `
    ${bg(uid, 574, 656)}
    ${glow(287, 240, 240, uid)}
    ${m(34, 48, 'ROLLING BALANCE', { size: 9.5, op: 0.5 })}
    ${t(34, 84, 'Nothing expires', { size: 21 })}
    ${months.map(([mo, note, add, used, left], i) => {
      const y = 116 + i * 152;
      const on = 0.06 + i * 0.22;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.06).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${dcard(34, y, 506, 132, { r: 14 })}
        ${m(58, y + 30, mo, { size: 10, op: 0.55, fill: O })}
        ${m(58, y + 50, note, { size: 9.5, op: 0.38 })}
        ${t(516, y + 44, `${left} GB`, { size: 28, anchor: 'end', fill: O })}
        ${m(516, y + 62, 'CARRIED FORWARD', { size: 8.5, anchor: 'end', op: 0.4 })}
        <rect x="58" y="${y + 80}" width="458" height="10" rx="5" fill="rgba(255,255,255,0.08)"/>
        <rect x="58" y="${y + 80}" width="0" height="10" rx="5" fill="${O}">
          <animate attributeName="width" values="0;${Math.round((used / (add + left)) * 458)};${Math.round((used / (add + left)) * 458)}"
            keyTimes="0;${(on + 0.14).toFixed(3)};1" dur="${dur}s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.2 1;0 0 1 1"/>
        </rect>
        ${m(58, y + 112, `+${add} GB ADDED \u00b7 ${used} GB USED`, { size: 9, op: 0.42 })}
        ${m(516, y + 112, 'NO RESET', { size: 9, anchor: 'end', op: 0.55, fill: GRN_LIT })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.8;0.88;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${m(34, 600, 'A QUIET MONTH IS NOT A WASTED ONE', { size: 10, op: 0.6, fill: O })}
      ${m(34, 624, 'THE BALANCE KEEPS GOING WHERE YOU DO', { size: 9, op: 0.35 })}
    </g>`;
    return { svg: wN(inner), pills: noPills };
  },
};

export const nmCall = {
  id: 'nm-call',
  name: 'The Call That Holds',
  family: 'Proof',
  tagline: 'Ninety minutes of video, across two cities',
  desc:
    'A nomad is judged by whether the call drops. This runs a ninety-minute video call with the ' +
    'jitter and bitrate plotted, straight through a move from an apartment to a café and a carrier ' +
    'handover in the middle. The line never breaks. It is the one proof this audience actually cares ' +
    'about.',
  pros: [
    'Targets the exact failure that loses this customer their work',
    'A handover mid-call and no drop is a strong, specific claim',
    'Bitrate and jitter are the right metrics for this audience',
  ],
  cons: ['Needs a real captured session to be honest', 'Charts are less warm than the rest of this page'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 4, brand: 4, ease: 3 },
  build: (uid) => {
    const dur = 12;
    const pts = Array.from({ length: 46 }, (_, i) =>
      2100 + Math.round(240 * Math.sin(i * 0.7)) + (i === 22 ? -160 : 0));
    const x0 = 46, x1 = 528, y0 = 400, yTop = 200;
    const px = (i) => x0 + (i / 45) * (x1 - x0);
    const py = (v) => y0 - ((v - 1600) / 900) * (y0 - yTop);
    const inner = `
    ${bg(uid, 574, 656)}
    ${glow(287, 300, 240, uid)}
    ${m(34, 48, 'ONE CALL \u00b7 91 MINUTES', { size: 9.5, op: 0.5 })}
    ${t(34, 84, 'It did not drop', { size: 21 })}
    ${dcard(34, 108, 506, 52, { r: 12 })}
    ${gtick(62, 134, 'Apartment, Lisbon \u2014 then a caf\u00e9, same call', { fill: GRN_LIT, size: 12 })}

    ${dcard(34, 176, 506, 258, { r: 14 })}
    ${m(46, 198, 'BITRATE \u00b7 kbps', { size: 8.5, op: 0.4 })}
    ${[1800, 2100, 2400].map((v) => `
      <line x1="${x0}" y1="${py(v).toFixed(0)}" x2="${x1}" y2="${py(v).toFixed(0)}"
        stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      ${m(x1 + 4, py(v) + 3.5, `${v}`, { size: 8, op: 0.3 })}`).join('')}
    <polyline points="${pts.map((v, i) => `${px(i).toFixed(0)} ${py(v).toFixed(0)}`).join(' ')}"
      fill="none" stroke="${O}" stroke-width="2.6" stroke-dasharray="1000" stroke-dashoffset="1000">
      <animate attributeName="stroke-dashoffset" values="1000;0;0" keyTimes="0;0.66;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </polyline>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.34;0.4;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <line x1="${px(22).toFixed(0)}" y1="${yTop}" x2="${px(22).toFixed(0)}" y2="${y0}"
        stroke="${AMB}" stroke-width="1.6" stroke-dasharray="4 5"/>
      ${m(px(22).toFixed(0), yTop - 8, 'CARRIER HANDOVER', { size: 8.5, anchor: 'middle', op: 0.7, fill: AMB })}
      ${m(px(22).toFixed(0) - 4, py(1700) + 4, '38 ms, no frame lost', { size: 8.5, anchor: 'end', op: 0.5 })}
    </g>

    ${[['DROPS', '0', GRN_LIT], ['AVG JITTER', '6 ms', W], ['HANDOVERS', '1', AMB]].map(([k, v, c], i) => `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.7 + i * 0.06).toFixed(3)};${(0.76 + i * 0.06).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${dcard(34 + i * 172, 452, 162, 82, { r: 12 })}
        ${m(50 + i * 172, 478, k, { size: 8.5, op: 0.42 })}
        ${t(50 + i * 172, 514, v, { size: 26, fill: c })}
      </g>`).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.88;0.94;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${m(34, 578, 'THE ONLY METRIC THIS AUDIENCE ACTUALLY CHECKS', { size: 9.5, op: 0.55, fill: O })}
    </g>`;
    return { svg: wN(inner), pills: noPills };
  },
};

export const nmTaxHome = {
  id: 'nm-numbers',
  name: 'Your Number, Everywhere',
  family: 'Identity',
  tagline: 'The bank still recognises you',
  desc:
    'The practical nightmare of long-term travel is not data — it is a bank that texts a code to a ' +
    'number you can no longer receive. Four accounts are shown still reaching the same number across ' +
    'four countries: bank, government portal, work SSO, and a delivery service. Nothing else on this ' +
    'page addresses it.',
  pros: [
    'Names a real, badly-served problem that genuinely traps long-term travellers',
    'Turns identity continuity into a product benefit',
    'Zero overlap with any other option on the board',
  ],
  cons: ['Depends on keeping a home number reachable, which needs explaining', 'Least visual idea on the board'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 3 },
  build: (uid) => {
    const dur = 11;
    const accts = [
      ['Bank', 'Two-factor code', 'Delivered in Bangkok'],
      ['Government portal', 'Identity confirmation', 'Delivered in Lisbon'],
      ['Work sign-on', 'Device approval', 'Delivered in Split'],
      ['Delivery service', 'Courier verification', 'Delivered in Mexico City'],
    ];
    const inner = `
    ${bg(uid, 574, 656)}
    ${glow(287, 260, 240, uid)}
    ${m(34, 48, 'IDENTITY CONTINUITY', { size: 9.5, op: 0.5 })}
    ${t(34, 84, 'The bank still finds you', { size: 21 })}
    ${dcard(34, 110, 506, 66, { r: 13, fill: 'rgba(255,83,20,0.1)', stroke: O, sw: 2 })}
    ${m(58, 138, 'YOUR NUMBER, UNCHANGED', { size: 9, op: 0.6 })}
    ${t(58, 164, '+351 9\u2022\u2022 \u2022\u2022\u2022 412', { size: 18, fill: O })}
    ${m(516, 156, 'KEPT', { size: 10, anchor: 'end', op: 0.7, fill: GRN_LIT })}
    ${accts.map(([nm, what, where], i) => {
      const y = 198 + i * 92;
      const on = 0.08 + i * 0.15;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${dcard(34, y, 506, 74, { r: 12 })}
        ${t(58, y + 30, nm, { size: 14 })}
        ${m(58, y + 50, what, { size: 9.5, op: 0.42 })}
        ${gtick(370, y + 38, '', { fill: GRN_LIT })}
        ${m(516, y + 42, where, { size: 9.5, anchor: 'end', op: 0.55, fill: GRN_LIT })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.8;0.88;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${m(34, 596, 'FOUR COUNTRIES. NOT ONE LOCKED ACCOUNT.', { size: 10, op: 0.6, fill: O })}
      ${m(34, 620, 'THE FAILURE THAT ACTUALLY SENDS PEOPLE HOME', { size: 9, op: 0.35 })}
    </g>`;
    return { svg: wN(inner), pills: noPills };
  },
};

/* ══ KYC · 7–9 ══════════════════════════════════════════════════════ */

export const kyWhatWeKeep = {
  id: 'ky-keep',
  name: 'What We Keep',
  family: 'Transparency',
  tagline: 'And, more usefully, what we delete',
  desc:
    'A verification page that lists what is checked is ordinary. This lists what is retained and for ' +
    'how long, with the discarded items visibly struck out — the selfie, the document scan, the ' +
    'liveness video, all gone within minutes, leaving a pass or fail and a date. Publishing the ' +
    'deletion side is the only part a privacy-conscious buyer will believe.',
  pros: [
    'Answers the question a privacy-minded buyer actually has',
    'The struck-out items are more persuasive than any assurance',
    'Sets a retention policy in public, which is hard to walk back',
  ],
  cons: ['Legal and compliance must agree to every line', 'Naming a selfie reminds people one was taken'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 11;
    const rows = [
      ['Selfie image', 'Deleted after 4 minutes', false],
      ['Document scan', 'Deleted after 4 minutes', false],
      ['Liveness video', 'Never stored at all', false],
      ['Pass or fail', 'Kept \u2014 required by law', true],
      ['Verification date', 'Kept \u2014 required by law', true],
    ];
    const inner = `
    ${bg(uid, 574, 432, GRN)}
    ${glow(287, 190, 210, uid)}
    ${m(30, 44, 'DATA RETENTION', { size: 9.5, op: 0.5 })}
    ${t(30, 78, 'What we keep, and what goes', { size: 19 })}
    ${rows.map(([nm, note, kept], i) => {
      const y = 102 + i * 56;
      const on = 0.06 + i * 0.12;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${dcard(30, y, 514, 44, { r: 11 })}
        <rect x="30" y="${y}" width="3.5" height="44" rx="2" fill="${kept ? GRN : 'rgba(255,255,255,0.2)'}"/>
        ${t(54, y + 27, nm, { size: 13, op: kept ? 1 : 0.5 })}
        ${!kept ? `<line x1="52" y1="${y + 22}" x2="${54 + nm.length * 7.4}" y2="${y + 22}"
          stroke="${RD}" stroke-width="2" stroke-linecap="round"/>` : ''}
        ${m(520, y + 27, note, { size: 9.5, anchor: 'end', op: kept ? 0.6 : 0.45, fill: kept ? GRN_LIT : RD })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.8;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${m(30, 404, 'THREE OF FIVE ARE GONE BEFORE YOU CLOSE THE TAB', { size: 9.5, op: 0.6, fill: GRN_LIT })}
    </g>`;
    return { svg: wK(inner), pills: noPills };
  },
};

export const kyNinetySeconds = {
  id: 'ky-ninety',
  name: 'Ninety Seconds',
  family: 'Speed',
  tagline: 'The whole check, timed',
  desc:
    'Verification is the step people abandon, and the reason is that it feels open-ended. This ' +
    'removes the uncertainty by timing it: document, face, liveness, decision — four stages with real ' +
    'seconds against each, ending under ninety. The only thing this audience wants to know is how ' +
    'long it takes, and nothing else on the board tells them.',
  pros: [
    'Answers the abandonment question directly',
    'A running total is the cheapest possible reassurance',
    'Sets an internal target the funnel can be measured against',
  ],
  cons: ['A slow day makes the claim false', 'No privacy argument at all'],
  scores: { story: 4, motion: 5, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const stages = [['Document', 22], ['Face match', 18], ['Liveness', 26], ['Decision', 19]];
    let acc = 0;
    const cum = stages.map(([, s]) => (acc += s));
    const inner = `
    ${bg(uid, 574, 432, GRN)}
    ${glow(287, 190, 210, uid)}
    ${m(30, 44, 'MEASURED, NOT ESTIMATED', { size: 9.5, op: 0.5 })}
    ${t(30, 78, 'Eighty-five seconds', { size: 19 })}
    ${stages.map(([nm, secs], i) => {
      const y = 104 + i * 62;
      const on = 0.06 + i * 0.16;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${dcard(30, y, 514, 50, { r: 11 })}
        ${gtick(56, y + 25, '', { fill: GRN_LIT })}
        ${t(82, y + 30, nm, { size: 13.5 })}
        <rect x="250" y="${y + 21}" width="200" height="8" rx="4" fill="rgba(255,255,255,0.09)"/>
        <rect x="250" y="${y + 21}" width="0" height="8" rx="4" fill="${GRN}">
          <animate attributeName="width" values="0;${Math.round((secs / 30) * 200)};${Math.round((secs / 30) * 200)}"
            keyTimes="0;${(on + 0.1).toFixed(3)};1" dur="${dur}s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.2 1;0 0 1 1"/>
        </rect>
        ${m(520, y + 30, `${secs}s`, { size: 11, anchor: 'end', op: 0.7 })}
        ${m(250, y + 44, `${cum[i]}s elapsed`, { size: 8.5, op: 0.32 })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.76;0.84;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${m(30, 404, 'MEDIAN ACROSS 4,100 VERIFICATIONS \u2014 NOT A BEST CASE', { size: 9.5, op: 0.6, fill: GRN_LIT })}
    </g>`;
    return { svg: wK(inner), pills: noPills };
  },
};

export const kyRefused = {
  id: 'ky-refused',
  name: 'Who We Turn Away',
  family: 'Transparency',
  tagline: 'The check has teeth, and here is the evidence',
  desc:
    'A verification badge is only worth something if it is ever withheld. This publishes the refusal ' +
    'rate and the reasons — sanctions match, document failure, duplicate identity, liveness failure — ' +
    'with the count beside each. It is the only option on the board that proves the check is real ' +
    'rather than decorative.',
  pros: [
    'Proves the check is enforced, which every competitor asserts and none demonstrates',
    'Refusal reasons make the process legible',
    'The strongest trust signal available on this page',
  ],
  cons: [
    'Publishing a refusal rate is a commitment to keep publishing it',
    'A high rate reads badly; a low one reads as a rubber stamp',
  ],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 2 },
  build: (uid) => {
    const dur = 11;
    const reasons = [
      ['Document could not be verified', 142],
      ['Liveness check failed', 96],
      ['Duplicate identity', 51],
      ['Sanctions or watchlist match', 18],
    ];
    const total = 307;
    const inner = `
    ${bg(uid, 574, 432, GRN)}
    ${glow(287, 190, 210, uid)}
    ${m(30, 44, 'LAST 90 DAYS', { size: 9.5, op: 0.5 })}
    ${t(30, 78, 'We refused 307 applications', { size: 19 })}
    ${reasons.map(([nm, n], i) => {
      const y = 104 + i * 58;
      const on = 0.06 + i * 0.14;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${dcard(30, y, 514, 46, { r: 11 })}
        <rect x="30" y="${y}" width="3.5" height="46" rx="2" fill="${RD}"/>
        ${t(54, y + 28, nm, { size: 13, op: 0.85 })}
        <rect x="360" y="${y + 19}" width="${Math.round((n / 150) * 110)}" height="8" rx="4" fill="${RD}" opacity="0.6"/>
        ${m(520, y + 28, `${n}`, { size: 12, anchor: 'end', op: 0.75, fill: RD })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.8;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${m(30, 386, `${total} REFUSED OF 9,420 \u00b7 3.3%`, { size: 10, op: 0.6, fill: GRN_LIT })}
      ${m(30, 408, 'A BADGE NOBODY IS EVER REFUSED IS NOT A CHECK', { size: 9, op: 0.35 })}
    </g>`;
    return { svg: wK(inner), pills: noPills };
  },
};

/* ── registries (declared last: they reference every variant above) ── */

export const lgWhoIsIn = {
  id: 'lg-whoisin',
  name: 'Who Comes With You',
  family: 'Value',
  tagline: 'The guest allowance nobody else includes',
  desc:
    'Every lounge programme charges for the second person, and it is the detail that decides whether ' +
    'the membership is used. This states it plainly — you, plus one guest, at no extra cost, on every ' +
    'visit — set against what the same two seats cost at the door and under a competing card.',
  pros: [
    'The guest policy is the detail that decides real-world usage',
    'Direct comparison against a door price is immediately legible',
    'Applies to couples and colleagues alike, which is most travel',
  ],
  cons: ['Commits to a guest allowance with a real cost', 'Purely a terms comparison, not a scene'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 10;
    const rows = [
      ['At the door', 'US$52 each', 'US$104', false],
      ['A competing card', 'guest US$32', 'US$32', false],
      ['Openline Plus', 'guest included', 'US$0', true],
    ];
    const inner = `
    ${bg(uid, 574, 642)}
    ${glow(287, 240, 230, uid)}
    ${m(34, 48, 'TWO PEOPLE, ONE VISIT', { size: 9.5, op: 0.5 })}
    ${t(34, 84, 'Your guest comes free', { size: 21 })}
    <g transform="translate(150 152)">
      <circle r="34" fill="rgba(255,83,20,0.18)" stroke="${O}" stroke-width="2"/>
      ${t(0, 6, 'YOU', { size: 13, anchor: 'middle', fill: O })}
    </g>
    <g transform="translate(250 152)">
      <circle r="34" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.28)" stroke-width="2"/>
      ${t(0, 6, '+1', { size: 15, anchor: 'middle' })}
    </g>
    ${gtick(400, 152, 'Both in, every visit', { fill: GRN_LIT, size: 12.5 })}
    ${rows.map(([nm, note, price, ours], i) => {
      const y = 232 + i * 116;
      const on = 0.1 + i * 0.2;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.07).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${dcard(34, y, 506, 98, ours
          ? { r: 14, fill: 'rgba(255,83,20,0.14)', stroke: O, sw: 2 }
          : { r: 14 })}
        ${t(58, y + 40, nm, { size: 16, op: ours ? 1 : 0.7 })}
        ${m(58, y + 66, note.toUpperCase(), { size: 9, op: ours ? 0.6 : 0.4, fill: ours ? O : W })}
        <text x="516" y="${y + 60}" font-size="30" font-weight="800" text-anchor="end"
          fill="${ours ? GRN_LIT : RD}">${price}</text>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.78;0.86;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${m(34, 612, 'THE ONE TERM THAT DECIDES WHETHER YOU ACTUALLY USE IT', { size: 9.5, op: 0.55, fill: O })}
    </g>`;
    return { svg: wL(inner), pills: noPills };
  },
};

export const nmTwoNumbers = {
  id: 'nm-twonumbers',
  name: 'Two Numbers, One Phone',
  family: 'Practical',
  tagline: 'Work and home, on the same handset',
  desc:
    'A nomad carries one phone and two lives. Both profiles are active at once — a home number for the ' +
    'bank and family, a local number for the landlord and the co-working space — with the work one ' +
    'muted at nine in the evening. Dual-profile is the feature this audience asks for and nothing on ' +
    'this page mentions.',
  pros: [
    'A genuinely requested capability that is currently invisible on the page',
    'Muting one line in the evening is a small, human detail',
    'Distinct from every other option on this board',
  ],
  cons: ['Depends on dual-SIM hardware support', 'Needs careful copy to avoid confusing people'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const lines = [
      ['HOME', '+351 9\u2022\u2022 \u2022\u2022\u2022 412', 'Bank, family, government', O],
      ['LOCAL', '+66 8\u2022 \u2022\u2022\u2022 7719', 'Landlord, co-working, delivery', GRN],
    ];
    const inner = `
    ${bg(uid, 574, 656)}
    ${glow(287, 260, 240, uid)}
    ${m(34, 48, 'BOTH ACTIVE AT ONCE', { size: 9.5, op: 0.5 })}
    ${t(34, 84, 'Two numbers, one handset', { size: 21 })}
    ${lines.map(([tag, num, who, col], i) => {
      const y = 114 + i * 152;
      const on = 0.08 + i * 0.2;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.07).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${dcard(34, y, 506, 132, { r: 14 })}
        <rect x="34" y="${y}" width="5" height="132" rx="2.5" fill="${col}"/>
        ${m(62, y + 32, tag, { size: 9.5, op: 0.6, fill: col })}
        ${t(62, y + 70, num, { size: 24 })}
        ${m(62, y + 96, who.toUpperCase(), { size: 8.5, op: 0.4 })}
        ${[0, 1, 2, 3].map((b) => `
          <rect x="${452 + b * 17}" y="${y + 78 - b * 8}" width="11" height="${14 + b * 8}" rx="2" fill="${col}" opacity="0.9"/>`).join('')}
        ${m(516, y + 110, 'CONNECTED', { size: 8.5, anchor: 'end', op: 0.5, fill: col })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.56;0.64;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${dcard(34, 430, 506, 90, { r: 14, fill: 'rgba(255,83,20,0.12)', stroke: O, sw: 2 })}
      ${m(58, 460, 'AT 21:00', { size: 9, op: 0.6, fill: O })}
      ${t(58, 492, 'Work line muted. Home line still rings.', { size: 15 })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.74;0.82;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${m(34, 570, 'NO SECOND PHONE \u00b7 NO SWAPPING \u00b7 NO MISSED CODES', { size: 9.5, op: 0.55, fill: O })}
      ${m(34, 596, 'THE THING THIS AUDIENCE ASKS FOR MOST', { size: 9, op: 0.35 })}
    </g>`;
    return { svg: wN(inner), pills: noPills };
  },
};

export const kyNoSelfie = {
  id: 'ky-noselfie',
  name: 'Only When It Is Required',
  family: 'Proportionality',
  tagline: 'Most people are never asked for a document',
  desc:
    'Verification reads as a barrier because people assume everyone gets the full check. In practice ' +
    'it is risk-tiered: a standard plan needs nothing, a high-value one needs a document, and only a ' +
    'flagged case needs a selfie. Showing the tiers reassures the ninety-four percent who will never ' +
    'be asked for anything.',
  pros: [
    'Removes the perceived barrier for the large majority of buyers',
    'Risk-tiering is genuinely good practice and worth publicising',
    'The percentage split does the reassuring on its own',
  ],
  cons: ['Discloses the thresholds that trigger a check', 'Compliance must sign off the tiers'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 11;
    const tiers = [
      ['Standard plan', 'Nothing asked for', '94%', GRN],
      ['High-value plan', 'One document', '5%', AMB],
      ['Flagged case', 'Document and liveness', '1%', RD],
    ];
    const inner = `
    ${bg(uid, 574, 432, GRN)}
    ${glow(287, 190, 210, uid)}
    ${m(30, 44, 'RISK-TIERED, NOT BLANKET', { size: 9.5, op: 0.5 })}
    ${t(30, 78, 'Most people are asked for nothing', { size: 19 })}
    ${tiers.map(([nm, what, pct, col], i) => {
      const y = 104 + i * 88;
      const on = 0.08 + i * 0.18;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.07).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${dcard(30, y, 514, 74, { r: 12 })}
        <rect x="30" y="${y}" width="4" height="74" rx="2" fill="${col}"/>
        ${t(56, y + 32, nm, { size: 14.5 })}
        ${m(56, y + 54, what.toUpperCase(), { size: 8.5, op: 0.42 })}
        <rect x="300" y="${y + 32}" width="150" height="10" rx="5" fill="rgba(255,255,255,0.09)"/>
        <rect x="300" y="${y + 32}" width="${Math.round(parseInt(pct, 10) / 94 * 150)}" height="10" rx="5" fill="${col}" opacity="0.8"/>
        <text x="520" y="${y + 46}" font-size="21" font-weight="800" text-anchor="end" fill="${col}">${pct}</text>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.74;0.82;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${m(30, 404, 'NINETY-FOUR PERCENT OF CUSTOMERS NEVER UPLOAD ANYTHING', { size: 9.5, op: 0.6, fill: GRN_LIT })}
    </g>`;
    return { svg: wK(inner), pills: noPills };
  },
};

/* ══ LOUNGE · 11–15 ═════════════════════════════════════════════════ */

export const lgAppPass = {
  id: 'lg-app',
  name: 'Pass On Screen',
  family: 'Product demo',
  tagline: 'Find it, show it, walk in',
  desc:
    'The panel is one tall handset running the pass itself: the lounge list for Lisbon T1 with walk ' +
    'times and an OPEN badge, then the pass with its code and a guest already on it, then the desk ' +
    'admitting two people. The section promises access with \u201cno additional fees or booking ' +
    'required\u201d and this is the only option that shows what the reader will actually be holding.',
  pros: [
    'A 574\u00d7642 box is the exact shape of a phone held upright',
    'Shows the product doing the thing rather than a symbol for it',
    'Walk times and an OPEN badge answer \u201cis it near my gate, is it open now?\u201d',
    'Carries the guest allowance without a second layout',
  ],
  cons: [
    'Commits to a screen design that does not exist yet',
    'A light screen on a dark panel is a strong tonal break',
    'Small interface type is the first thing to fail at 390px',
  ],
  scores: { story: 4, motion: 4, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const dur = 12;
    const rows = [
      ['ANA Lounge', 'T1 airside \u00b7 6 min walk', 'OPEN'],
      ['Aspire Lounge', 'T1 mezzanine \u00b7 9 min', 'OPEN'],
      ['Sala VIP', 'T2 \u00b7 shuttle', 'CLOSED'],
    ];
    const qr = Array.from({ length: 64 }, (_, k) => {
      const cx = k % 8, cy = Math.floor(k / 8);
      const on = (cx * 3 + cy * 5 + ((cx * cy) % 4)) % 5 < 2;
      return on ? `<rect x="${cx * 18}" y="${cy * 18}" width="16" height="16" rx="2" fill="#131826"/>` : '';
    }).join('');
    const inner = `
    ${bg(uid, 574, 642)}
    ${glow(287, 300, 250, uid)}
    ${m(34, 40, 'LOUNGE ACCESS, IN THE APP', { size: 9.5, op: 0.5 })}
    <g transform="translate(143 56)">
      ${dcard(0, 0, 288, 540, { r: 32, fill: '#0A0E18', stroke: 'rgba(255,255,255,0.4)', sw: 2.5 })}
      <rect x="114" y="14" width="60" height="8" rx="4" fill="#1A2030"/>
      <rect x="10" y="30" width="268" height="498" rx="24" fill="#F7FBF8"/>
      <g transform="translate(10 30)">

        <!-- 1 · the lounge list -->
        <g opacity="1">
          <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.28;0.32;1" dur="${dur}s" repeatCount="indefinite"/>
          <text x="22" y="42" font-size="9" font-weight="700" letter-spacing="1.1" fill="#7C8A80" style="font-family:${MONO}">LIS \u00b7 TERMINAL 1</text>
          <text x="22" y="70" font-size="17" font-weight="800" fill="#131826">Lounges near you</text>
          <rect x="22" y="86" width="224" height="34" rx="11" fill="#EBF1EC"/>
          <circle cx="42" cy="103" r="6" fill="none" stroke="#7C8A80" stroke-width="1.8"/>
          <path d="M 46 107 l 5 5" stroke="#7C8A80" stroke-width="1.8" stroke-linecap="round"/>
          <text x="58" y="107" font-size="11" font-weight="600" fill="#7C8A80">Lisbon Airport</text>
          ${rows.map(([nm2, sub, badge], i) => {
      const y = 138 + i * 76;
      const shut = badge === 'CLOSED';
      const on = 0.03 + i * 0.05;
      return `
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.03).toFixed(3)};1"
                dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
              <rect x="22" y="${y}" width="224" height="62" rx="13" fill="#FFFFFF" stroke="${shut ? '#E2E8E3' : '#CFE3D5'}" stroke-width="1.5"/>
              <text x="38" y="${y + 26}" font-size="12.5" font-weight="800" fill="${shut ? '#9AA6A0' : '#131826'}">${nm2}</text>
              <text x="38" y="${y + 45}" font-size="9.5" font-weight="600" fill="#7C8A80">${sub}</text>
              <rect x="${shut ? 186 : 192}" y="${y + 13}" width="${shut ? 46 : 40}" height="17" rx="8.5"
                fill="${shut ? '#EFEFEF' : 'rgba(34,197,94,0.16)'}"/>
              <text x="${shut ? 209 : 212}" y="${y + 25}" font-size="8" font-weight="700" letter-spacing="0.8"
                text-anchor="middle" fill="${shut ? '#9AA6A0' : GRN_DEEP}" style="font-family:${MONO}">${badge}</text>
            </g>`;
    }).join('')}
          <text x="22" y="440" font-size="10.5" font-weight="700" fill="${GRN_DEEP}">Included with Openline+</text>
          <text x="22" y="458" font-size="9.5" font-weight="600" fill="#7C8A80">No fee, no booking</text>
        </g>

        <!-- 2 · the pass -->
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.28;0.32;0.6;0.64;1" dur="${dur}s" repeatCount="indefinite"/>
          <text x="22" y="42" font-size="9" font-weight="700" letter-spacing="1.1" fill="#7C8A80" style="font-family:${MONO}">ANA LOUNGE \u00b7 LIS T1</text>
          <text x="22" y="70" font-size="17" font-weight="800" fill="#131826">Show this at the desk</text>
          <rect x="46" y="88" width="176" height="176" rx="14" fill="#FFFFFF" stroke="#DCE5DF" stroke-width="1.5"/>
          <g transform="translate(63 105)">${qr}</g>
          <rect x="46" y="88" width="176" height="4" fill="${O}" opacity="0.85">
            <animate attributeName="y" values="88;260;88" dur="2.6s" repeatCount="indefinite"/>
          </rect>
          <circle cx="34" cy="296" r="9" fill="rgba(34,197,94,0.18)"/>
          <path d="M 30 296 l 2.8 3 l 5 -5.8" fill="none" stroke="${GRN_DEEP}" stroke-width="2" stroke-linecap="round"/>
          <text x="52" y="300" font-size="12" font-weight="700" fill="#131826">You, plus one guest</text>
          <text x="22" y="330" font-size="10.5" font-weight="600" fill="#7C8A80">Valid for this departure only</text>
          <rect x="22" y="352" width="224" height="40" rx="12" fill="#131826"/>
          <text x="134" y="377" font-size="12" font-weight="800" text-anchor="middle" fill="#FFFFFF">Open the pass</text>
        </g>

        <!-- 3 · admitted -->
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.6;0.64;1" dur="${dur}s" repeatCount="indefinite"/>
          <circle cx="134" cy="150" r="46" fill="${GRN}"/>
          <path d="M 120 150 l 10 11 l 20 -24" fill="none" stroke="#FFFFFF" stroke-width="5"
            stroke-linecap="round" stroke-linejoin="round"/>
          <text x="134" y="234" font-size="19" font-weight="800" text-anchor="middle" fill="#131826">Welcome in</text>
          <text x="134" y="258" font-size="9.5" font-weight="700" letter-spacing="1.1" text-anchor="middle"
            fill="#7C8A80" style="font-family:${MONO}">2 ADMITTED \u00b7 09:14</text>
          <rect x="22" y="290" width="224" height="88" rx="13" fill="#ECFAF0" stroke="#CFE3D5" stroke-width="1.5"/>
          <text x="40" y="318" font-size="12" font-weight="800" fill="#131826">Fast track at Gate A12</text>
          <text x="40" y="338" font-size="10" font-weight="600" fill="#7C8A80">Boarding in 40 minutes</text>
          <text x="40" y="360" font-size="10" font-weight="700" fill="${GRN_DEEP}">Shower and hot food included</text>
        </g>
      </g>
    </g>
    ${m(287, 620, 'INCLUDED WITH THE SUBSCRIPTION \u00b7 NO BOOKING REQUIRED', { size: 9, anchor: 'middle', op: 0.4 })}`;
    return { svg: wL(inner), pills: noPills };
  },
};

export const lgFlap = {
  id: 'lg-flap',
  name: 'Departures Board',
  family: 'Typographic',
  tagline: 'The status column flips in your favour',
  desc:
    'A split-flap departures board fills the panel. Six departures sit in the usual rows, and the ' +
    'status column reads SECURITY 38 MIN on every one of them until the flaps turn over and each ' +
    'line changes to FAST TRACK \u00b7 4 MIN, then LOUNGE OPEN. No illustration, no scene \u2014 the ' +
    'type is the artwork, and the airport supplies the typeface.',
  pros: [
    'A departures board is already a tall column of rows, so the box is filled by the form itself',
    'Reads at a glance and survives being shrunk to a compare tile',
    'The flip is one gesture repeated six times, which is cheap to build and never confusing',
    'Ownable: nothing else on the site looks like terminal signage',
  ],
  cons: [
    'Six rows of small type is the least warm option on the board',
    'Split-flap is a well-used device in travel marketing',
    'Real flap mechanics would need heavier animation than this approximates',
  ],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const flights = [
      ['TP 412', 'SINGAPORE', '11:40'],
      ['BA 505', 'LONDON', '12:05'],
      ['EK 192', 'DUBAI', '12:30'],
      ['AF 1025', 'PARIS', '12:55'],
      ['LX 2077', 'ZURICH', '13:20'],
      ['UA 78', 'NEW YORK', '13:45'],
    ];
    const inner = `
    ${bg(uid, 574, 642)}
    ${glow(287, 300, 240, uid)}
    ${m(34, 42, 'TERMINAL 1 \u00b7 DEPARTURES', { size: 9.5, op: 0.5 })}
    ${t(34, 76, 'Your status column', { size: 21 })}
    ${dcard(28, 96, 518, 458, { r: 14, fill: '#080C14', stroke: 'rgba(255,255,255,0.12)' })}
    ${m(48, 126, 'FLIGHT', { size: 8, op: 0.3 })}
    ${m(132, 126, 'DESTINATION', { size: 8, op: 0.3 })}
    ${m(526, 126, 'STATUS', { size: 8, op: 0.3, anchor: 'end' })}
    <path d="M 48 136 H 526" stroke="${W}" stroke-width="1" opacity="0.1"/>
    ${flights.map(([code, dest, time], i) => {
      const y = 152 + i * 66;
      const on = 0.14 + i * 0.09;
      return `
      <g>
        ${dcard(40, y, 494, 52, { r: 7, fill: 'rgba(255,255,255,0.03)', stroke: 'rgba(255,255,255,0.07)', sw: 1 })}
        ${m(56, y + 32, code, { size: 11, op: 0.55 })}
        ${t(132, y + 33, dest, { size: 15 })}
        ${m(330, y + 32, time, { size: 10.5, op: 0.4 })}
        <g opacity="1">
          <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;${on.toFixed(3)};${(on + 0.02).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          ${m(518, y + 32, 'SECURITY 38 MIN', { size: 10, anchor: 'end', op: 0.35 })}
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(on + 0.02).toFixed(3)};${(on + 0.04).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          ${m(518, y + 32, 'FAST TRACK \u00b7 4 MIN', { size: 10, anchor: 'end', op: 1, fill: O })}
        </g>
        <rect x="360" y="${y + 6}" width="166" height="0" rx="3" fill="${O}" opacity="0.7">
          <animate attributeName="height" values="0;0;40;0;0" keyTimes="0;${on.toFixed(3)};${(on + 0.02).toFixed(3)};${(on + 0.045).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        </rect>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.76;0.84;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${dcard(28, 572, 518, 46, { r: 12, fill: 'rgba(255,83,20,0.13)', stroke: O, sw: 2 })}
      ${m(50, 600, 'LOUNGE', { size: 10, op: 0.55 })}
      ${m(526, 600, 'OPEN \u00b7 GATE A12 \u00b7 NO BOOKING', { size: 10, anchor: 'end', op: 1, fill: O })}
    </g>
    ${m(34, 634, 'EVERY DEPARTURE, THE SAME TWO WORDS', { size: 9, op: 0.3 })}`;
    return { svg: wL(inner), pills: noPills };
  },
};

export const lgQuoted = {
  id: 'lg-quote',
  name: 'Six-Hour Layover',
  family: 'Editorial',
  tagline: 'One member, one bad connection, one sentence',
  desc:
    'A cream card fills the panel and carries a single quotation set large, line by line: a six-hour ' +
    'connection that used to mean a bench now means a shower and a desk. Beneath it, an attribution ' +
    'and three terms in small type. It is the only light surface anywhere on this page, and the only ' +
    'option that lets a person say what the perk is for.',
  pros: [
    'Light on a dark page is the strongest contrast available in this block',
    'A tall card is the natural shape for a stacked pull quote',
    'Sells the moment the perk matters instead of listing what it contains',
    'Almost nothing to draw, so it is fast and it never breaks',
  ],
  cons: [
    'Needs a real member quote; invented testimony is not usable',
    'Very little motion, which will read as static beside the other options',
    'A light panel may fight the dark section it sits in',
  ],
  scores: { story: 5, motion: 2, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 10;
    const lines = ['A six-hour connection', 'in Doha used to mean', 'a bench and a bad', 'sandwich. Now it means', 'a shower and a desk.'];
    const inner = `
    ${bg(uid, 574, 642)}
    ${glow(287, 260, 240, uid)}
    ${m(34, 40, 'FROM A MEMBER', { size: 9.5, op: 0.5 })}
    ${dcard(30, 58, 514, 446, { r: 20, fill: '#F6F3EC', stroke: 'rgba(255,255,255,0.5)', sw: 1 })}
    <text x="60" y="140" font-size="64" font-weight="800" fill="${O}" opacity="0.9">&#8220;</text>
    ${lines.map((ln, i) => {
      const on = 0.06 + i * 0.09;
      return `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <text x="62" y="${176 + i * 46}" font-size="25" font-weight="800" fill="#131826">${ln}</text>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.56;0.64;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <path d="M 62 428 H 200" stroke="#131826" stroke-width="2" opacity="0.25"/>
      <text x="62" y="460" font-size="11" font-weight="700" letter-spacing="1.1" fill="#6B7280" style="font-family:${MONO}">OPENLINE+ MEMBER</text>
      <text x="62" y="478" font-size="11" font-weight="700" letter-spacing="1.1" fill="#6B7280" style="font-family:${MONO}">14 FLIGHTS THIS YEAR</text>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.7;0.8;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${chip(30, 528, 132, 'NO DAY PASS', { op: 1 })}
      ${chip(172, 528, 132, 'NO BOOKING', { op: 1 })}
      ${chip(314, 528, 168, 'FAST TRACK INCLUDED', { op: 1, stroke: O, color: O_SOFT })}
    </g>
    ${m(34, 606, 'THE PERK IS BOUGHT FOR ONE BAD DAY A YEAR', { size: 9, op: 0.35 })}`;
    return { svg: wL(inner), pills: noPills };
  },
};

export const lgSection = {
  id: 'lg-section',
  name: 'Cross-Section',
  family: 'Spatial',
  tagline: 'Two routes up the same building',
  desc:
    'The terminal is drawn as a cutaway, kerb at the bottom and gate at the top, with security and ' +
    'the lounge as floors in between. Two routes climb it: a grey one that stalls in the security ' +
    'hall with the crowd, and an orange one that goes up the fast lane, through the lounge floor and ' +
    'out to the gate. It is a plan of the building rather than a list of steps.',
  pros: [
    'A building in section is the one subject that genuinely needs 642px of height',
    'Puts the lounge and fast track in one picture, which the section title requires',
    'The stalled grey route makes the comparison without a word of copy',
    'No numbers to keep accurate',
  ],
  cons: [
    'An architectural diagram is colder than a scene or a device',
    'The floor plan is invented; no real terminal is laid out like this',
    'The two routes need careful drawing or they read as a circuit diagram',
  ],
  scores: { story: 4, motion: 4, perf: 5, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const dur = 9;
    const floors = [
      [84, 'GATE A12', 'boarding, first group'],
      [196, 'LOUNGE', 'shower \u00b7 hot food \u00b7 desk'],
      [336, 'SECURITY', 'two lanes, one terminal'],
      [466, 'CHECK-IN', 'bags, kerbside'],
    ];
    const route = 'M 150 552 V 520 H 452 V 300 H 330 V 150';
    const inner = `
    ${bg(uid, 574, 642)}
    ${glow(287, 320, 250, uid)}
    ${m(34, 40, 'THE SAME BUILDING, TWO WAYS UP', { size: 9.5, op: 0.5 })}
    ${dcard(40, 62, 494, 520, { r: 16, fill: 'rgba(255,255,255,0.03)' })}
    ${floors.map(([y, lab, sub]) => `
      <path d="M 40 ${y} H 534" stroke="${W}" stroke-width="1.2" opacity="0.1"/>
      ${m(60, y + 26, lab, { size: 9.5, op: 0.55 })}
      ${m(60, y + 44, sub, { size: 8.5, op: 0.28 })}`).join('')}

    <!-- lounge floor fittings -->
    <g>
      ${[0, 1, 2].map(i => `<rect x="${232 + i * 42}" y="250" width="32" height="26" rx="7" fill="${O}" opacity="0.22"/>`).join('')}
      <path d="M 386 250 v 26 M 380 262 h 12" stroke="${O}" stroke-width="2" opacity="0.3" stroke-linecap="round"/>
    </g>

    <!-- security hall: the crowd -->
    ${Array.from({ length: 12 }, (_, i) => {
      const cx2 = 206 + (i % 6) * 26;
      const cy2 = 402 + Math.floor(i / 6) * 26;
      return `<circle cx="${cx2}" cy="${cy2}" r="6" fill="${W}" opacity="0.18"/>`;
    }).join('')}
    ${m(206, 452, 'GENERAL \u00b7 38 MIN', { size: 8.5, op: 0.35 })}
    <path d="M 452 424 V 344" stroke="${O}" stroke-width="12" opacity="0.14" stroke-linecap="round"/>
    ${m(470, 384, 'FAST LANE', { size: 8.5, op: 0.8, fill: O_SOFT })}
    ${m(470, 400, '4 MIN', { size: 8.5, op: 0.5 })}

    <!-- grey route, stalling -->
    <path d="M 150 552 V 520 H 180 V 440" stroke="${W}" stroke-width="3" opacity="0.2"
      stroke-dasharray="7 7" fill="none" stroke-linecap="round"/>
    <circle cx="180" cy="440" r="6" fill="${W}" opacity="0.3">
      <animate attributeName="cy" values="444;436;444" dur="3s" repeatCount="indefinite"/>
    </circle>

    <!-- orange route -->
    <path d="${route}" stroke="${O}" stroke-width="3.2" fill="none" opacity="0.35" stroke-linecap="round"/>
    <path d="${route}" stroke="${O}" stroke-width="3.2" fill="none" stroke-dasharray="900" stroke-dashoffset="900" stroke-linecap="round">
      <animate attributeName="stroke-dashoffset" values="900;0;0" keyTimes="0;0.7;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </path>
    <circle r="7" fill="${O}">
      <animateMotion dur="${dur}s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="linear" path="${route}"/>
    </circle>
    <g transform="translate(150 572)">
      ${m(0, 0, 'KERB', { size: 8.5, anchor: 'middle', op: 0.4 })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.8;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${gtick(330, 132, '', { fill: GRN_LIT })}
      ${m(34, 606, 'UP THE SIDE OF THE CROWD, THROUGH THE LOUNGE, ONTO THE PLANE', { size: 9, op: 0.45, fill: O })}
    </g>
    ${m(34, 630, 'LOUNGE AND FAST TRACK ARE THE SAME JOURNEY', { size: 9, op: 0.28 })}`;
    return { svg: wL(inner), pills: noPills };
  },
};

export const lgMetal = {
  id: 'lg-card',
  name: 'The Member Card',
  family: 'Single gesture',
  tagline: 'One object, held upright, nothing else',
  desc:
    'One card, almost the full height of the panel, tilting slowly with a light sweeping across it. ' +
    'Three lines are etched into it \u2014 lounge access, security fast track, priority boarding \u2014 ' +
    'with a name and a member date at the foot. There is no sequence and nothing to read in order: it ' +
    'is a single premium object, which is the register this tier is missing.',
  pros: [
    'The most upmarket frame on the board, which is what this tier asks for',
    'One object, so it holds up as a still and at tile size',
    'A tall card fits a tall panel with no padding anywhere',
    'Cheap to build and impossible to misread',
  ],
  cons: [
    'Says nothing and proves nothing \u2014 pure register, no argument',
    'Implies a physical card, which Openline does not issue',
    'Least informative option on the board by a distance',
  ],
  scores: { story: 2, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 5 },
  build: (uid) => {
    const perks = ['AIRPORT LOUNGE ACCESS', 'SECURITY FAST TRACK', 'PRIORITY BOARDING'];
    const inner = `
    <defs>
      <linearGradient id="mc-${uid}" x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0" stop-color="#22293A"/>
        <stop offset="0.55" stop-color="#121724"/>
        <stop offset="1" stop-color="#2A1A12"/>
      </linearGradient>
      <linearGradient id="ms-${uid}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${W}" stop-opacity="0"/>
        <stop offset="0.5" stop-color="${W}" stop-opacity="0.22"/>
        <stop offset="1" stop-color="${W}" stop-opacity="0"/>
      </linearGradient>
      <clipPath id="mk-${uid}"><rect x="137" y="84" width="300" height="470" rx="26"/></clipPath>
    </defs>
    ${bg(uid, 574, 642)}
    ${glow(287, 320, 260, uid)}
    ${m(34, 40, 'OPENLINE+ MEMBERSHIP', { size: 9.5, op: 0.5 })}
    <g>
      <animateTransform attributeName="transform" type="rotate" values="-1.1 287 320;1.1 287 320;-1.1 287 320"
        keyTimes="0;0.5;1" dur="9s" repeatCount="indefinite"/>
      <rect x="137" y="84" width="300" height="470" rx="26" fill="url(#mc-${uid})"
        stroke="rgba(255,255,255,0.22)" stroke-width="2"/>
      <rect x="137" y="84" width="300" height="470" rx="26" fill="none" stroke="${O}" stroke-width="1" opacity="0.4"/>
      <g clip-path="url(#mk-${uid})">
        <rect x="-160" y="84" width="150" height="470" fill="url(#ms-${uid})">
          <animateTransform attributeName="transform" type="translate" values="0 0;760 0;760 0"
            keyTimes="0;0.45;1" dur="7s" repeatCount="indefinite"/>
        </rect>
      </g>
      <circle cx="171" cy="126" r="7" fill="${O}"/>
      ${t(188, 131, 'OPENLINE+', { size: 19 })}
      <g transform="translate(378 112)">
        <rect width="38" height="28" rx="5" fill="${O}" opacity="0.28" stroke="${O}" stroke-width="1.2"/>
        ${[0, 1, 2].map(i => `<path d="M 6 ${8 + i * 7} H 32" stroke="${O_SOFT}" stroke-width="1.2" opacity="0.7"/>`).join('')}
      </g>
      <path d="M 171 160 H 403" stroke="${W}" stroke-width="1" opacity="0.14"/>
      ${perks.map((p, i) => `
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.05 + i * 0.07).toFixed(3)};${(0.11 + i * 0.07).toFixed(3)};1"
            dur="9s" repeatCount="indefinite" fill="freeze"/>
          ${m(171, 214 + i * 64, p, { size: 10.5, op: 0.85, fill: O_SOFT })}
          <path d="M 171 ${228 + i * 64} H 403" stroke="${O}" stroke-width="1.4" opacity="0.28"/>
        </g>`).join('')}
      ${m(171, 446, 'PAUL M. FERREIRA', { size: 12.5, op: 0.85 })}
      ${m(171, 468, 'MEMBER SINCE 2026', { size: 8.5, op: 0.4 })}
      ${m(403, 468, 'VALID WORLDWIDE', { size: 8.5, op: 0.4, anchor: 'end' })}
      <g transform="translate(171 502)">
        ${[0, 1, 2, 3].map(i => `<rect x="${i * 9}" y="${-4 - i * 4}" width="5" height="${8 + i * 4}" rx="1.5" fill="${GRN_LIT}" opacity="0.8"/>`).join('')}
      </g>
      ${m(403, 506, 'CONNECTED', { size: 8.5, op: 0.5, anchor: 'end', fill: GRN_LIT })}
    </g>
    ${m(287, 594, 'NO DAY PASS \u00b7 NO BOOKING \u00b7 GUEST INCLUDED', { size: 9.5, anchor: 'middle', op: 0.5, fill: O_SOFT })}
    ${m(287, 618, 'INCLUDED WITH THE SUBSCRIPTION', { size: 9, anchor: 'middle', op: 0.3 })}`;
    return { svg: wL(inner), pills: noPills };
  },
};


/* ══ NOMAD · 11–15 ══════════════════════════════════════════════════ */

export const nmDualEsim = {
  id: 'nm-dualesim',
  name: 'No App Required',
  family: 'Product demo',
  tagline: 'Two eSIMs, added in the phone\u2019s own settings',
  desc:
    'The plan is two eSIMs \u2014 one for the number, one for the data \u2014 and the page says it ' +
    'needs no app. This shows that literally: the handset\u2019s own mobile-data settings, a QR code ' +
    'scanned, then both lines listed and active, OPENLINE VOICE carrying +351 and OPENLINE DATA on ' +
    '30GB of 5G+ in Bangkok. It is the only option that explains the dual-eSIM setup the page requires.',
  pros: [
    'Shows the product\u2019s actual architecture, which no other option touches',
    'Uses the page\u2019s own claims: dual eSIM, no app, 30GB 5G+',
    'A phone held upright is exactly a 574\u00d7656 box',
    'Answers the practical question: what do I do after I pay?',
  ],
  cons: [
    'Imitates a specific operating system\u2019s settings, which dates and may need redrawing',
    'Setup is a dull subject next to a year of travel',
    'Small system-UI type is the first thing to suffer at 390px',
  ],
  scores: { story: 4, motion: 4, perf: 4, mobile: 3, brand: 3, ease: 3 },
  build: (uid) => {
    const dur = 12;
    const qr = Array.from({ length: 49 }, (_, k) => {
      const cx = k % 7, cy = Math.floor(k / 7);
      const on = (cx * 5 + cy * 3 + ((cx + cy) % 3)) % 5 < 2;
      return on ? `<rect x="${cx * 20}" y="${cy * 20}" width="18" height="18" rx="2" fill="#131826"/>` : '';
    }).join('');
    const inner = `
    ${bg(uid, 574, 656)}
    ${glow(287, 320, 250, uid)}
    ${m(34, 40, 'SETUP, IN THE PHONE\u2019S OWN SETTINGS', { size: 9.5, op: 0.5 })}
    <g transform="translate(143 56)">
      ${dcard(0, 0, 288, 552, { r: 32, fill: '#0A0E18', stroke: 'rgba(255,255,255,0.4)', sw: 2.5 })}
      <rect x="114" y="14" width="60" height="8" rx="4" fill="#1A2030"/>
      <rect x="10" y="30" width="268" height="510" rx="24" fill="#F4F6F4"/>
      <g transform="translate(10 30)">

        <!-- 1 · add eSIM -->
        <g opacity="1">
          <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.26;0.3;1" dur="${dur}s" repeatCount="indefinite"/>
          <text x="22" y="44" font-size="10" font-weight="700" letter-spacing="1.1" fill="#8A948C" style="font-family:${MONO}">SETTINGS</text>
          <text x="22" y="74" font-size="19" font-weight="800" fill="#131826">Mobile Data</text>
          <rect x="18" y="94" width="232" height="52" rx="12" fill="#FFFFFF"/>
          <text x="36" y="118" font-size="12.5" font-weight="700" fill="#131826">Add eSIM</text>
          <text x="36" y="136" font-size="10" font-weight="600" fill="#8A948C">Scan the code from Openline</text>
          <path d="M 228 120 l 7 -7 l -7 -7" stroke="#B6BEB8" stroke-width="2" fill="none" stroke-linecap="round"/>
          <rect x="52" y="168" width="164" height="164" rx="14" fill="#FFFFFF" stroke="#DDE3DE" stroke-width="1.5"/>
          <g transform="translate(66 182)">${qr}</g>
          <rect x="52" y="168" width="164" height="3.5" fill="${O}" opacity="0.9">
            <animate attributeName="y" values="168;328;168" dur="2.4s" repeatCount="indefinite"/>
          </rect>
          <text x="134" y="366" font-size="11" font-weight="700" text-anchor="middle" fill="#8A948C">No app to download</text>
        </g>

        <!-- 2 · installing -->
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.26;0.3;0.5;0.54;1" dur="${dur}s" repeatCount="indefinite"/>
          <text x="22" y="44" font-size="10" font-weight="700" letter-spacing="1.1" fill="#8A948C" style="font-family:${MONO}">ACTIVATING</text>
          <text x="22" y="74" font-size="19" font-weight="800" fill="#131826">Adding two plans</text>
          <rect x="22" y="104" width="224" height="10" rx="5" fill="#E3E8E4"/>
          <rect x="22" y="104" width="0" height="10" rx="5" fill="${GRN}">
            <animate attributeName="width" values="0;224;224" keyTimes="0;0.46;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          </rect>
          <text x="22" y="140" font-size="10.5" font-weight="700" fill="#8A948C">38 seconds</text>
          ${[['OPENLINE VOICE', 'calls & SMS'], ['OPENLINE DATA', '30GB 5G+ global']].map(([lab, sub], i) => `
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.33 + i * 0.05).toFixed(3)};${(0.37 + i * 0.05).toFixed(3)};1"
                dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
              <rect x="22" y="${170 + i * 74}" width="224" height="62" rx="13" fill="#FFFFFF" stroke="#DDE3DE" stroke-width="1.5"/>
              <circle cx="46" cy="${201 + i * 74}" r="9" fill="rgba(34,197,94,0.18)"/>
              <path d="M 42 ${201 + i * 74} l 2.8 3 l 5 -5.8" fill="none" stroke="${GRN_DEEP}" stroke-width="2" stroke-linecap="round"/>
              <text x="64" y="${196 + i * 74}" font-size="11" font-weight="800" letter-spacing="0.9" fill="#131826" style="font-family:${MONO}">${lab}</text>
              <text x="64" y="${214 + i * 74}" font-size="10" font-weight="600" fill="#8A948C">${sub}</text>
            </g>`).join('')}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.43;0.46;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
            <text x="22" y="352" font-size="11" font-weight="700" fill="#131826">Attaching to AIS · Bangkok</text>
            <text x="22" y="372" font-size="10" font-weight="600" fill="#8A948C">Nothing to install, nothing to collect</text>
            <text x="22" y="400" font-size="10" font-weight="600" fill="#8A948C">Your old SIM stays where it is</text>
          </g>
        </g>

        <!-- 3 · both active -->
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.5;0.54;1" dur="${dur}s" repeatCount="indefinite"/>
          <text x="22" y="44" font-size="10" font-weight="700" letter-spacing="1.1" fill="#8A948C" style="font-family:${MONO}">BOTH LINES ACTIVE</text>
          <text x="22" y="74" font-size="19" font-weight="800" fill="#131826">One phone, two eSIMs</text>
          <rect x="18" y="96" width="232" height="104" rx="14" fill="#FFFFFF" stroke="#DDE3DE" stroke-width="1.5"/>
          <rect x="18" y="96" width="4" height="104" rx="2" fill="${O}"/>
          <text x="38" y="124" font-size="9.5" font-weight="700" letter-spacing="1.1" fill="${O}" style="font-family:${MONO}">OPENLINE VOICE</text>
          <text x="38" y="152" font-size="17" font-weight="800" fill="#131826">+351 912 04 88</text>
          <text x="38" y="176" font-size="10" font-weight="600" fill="#8A948C">Unlimited calls &amp; SMS</text>
          <rect x="18" y="212" width="232" height="104" rx="14" fill="#FFFFFF" stroke="#DDE3DE" stroke-width="1.5"/>
          <rect x="18" y="212" width="4" height="104" rx="2" fill="${GRN}"/>
          <text x="38" y="240" font-size="9.5" font-weight="700" letter-spacing="1.1" fill="${GRN_DEEP}" style="font-family:${MONO}">OPENLINE DATA</text>
          <text x="38" y="268" font-size="17" font-weight="800" fill="#131826">30GB \u00b7 5G+</text>
          <text x="38" y="292" font-size="10" font-weight="600" fill="#8A948C">Bangkok \u00b7 AIS \u00b7 then unlimited at 1mbps</text>
          <g transform="translate(200 268)">
            ${[0, 1, 2, 3].map(i => `<rect x="${i * 8}" y="${-2 - i * 4}" width="5" height="${6 + i * 4}" rx="1.5" fill="${GRN_DEEP}"/>`).join('')}
          </g>
          <text x="22" y="356" font-size="11" font-weight="700" fill="#131826">Default voice line: Openline Voice</text>
          <text x="22" y="376" font-size="10" font-weight="600" fill="#8A948C">Keep your old SIM in the other slot</text>
        </g>
      </g>
    </g>
    ${m(287, 634, 'TWO eSIMS, ONE HANDSET, NO APP TO INSTALL', { size: 9, anchor: 'middle', op: 0.4 })}`;
    return { svg: wN(inner), pills: noPills };
  },
};

export const nmThread = {
  id: 'nm-thread',
  name: 'The Thread',
  family: 'Editorial',
  tagline: 'Nobody had to be told a new number',
  desc:
    'A year of messages arriving on one line, read as a transcript: a landlord in Tbilisi, a bank ' +
    'code, a client asking for ten minutes, a friend who still has the number from 2019. Each has a ' +
    'city and a month beside it. The argument is made by the senders rather than by a diagram \u2014 ' +
    'none of them was ever sent an update.',
  pros: [
    'Human voices instead of labels, which nothing else on this board does',
    'A message thread is a vertical object, so the height is the format',
    'Shows the cost of a changed number without naming a single feature',
    'Very cheap to draw and legible at any size',
  ],
  cons: [
    'Invented messages have to sound real or the whole thing collapses',
    'A bank code appears here and in the identity option',
    'Most of the panel is set text, so it reads quietly',
  ],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 12;
    const msgs = [
      ['Mum', 'Landed yet? Same number I hope', 'JAN \u00b7 LISBON', false],
      ['Landlord', 'Keys at six, flat 4B', 'MAR \u00b7 TBILISI', false],
      ['You', 'On my way \u2014 ten minutes', 'MAR \u00b7 TBILISI', true],
      ['Bank', 'Code 4471. Never share this.', 'JUL \u00b7 BANGKOK', false],
      ['Ana (2019)', 'Still this number? Coffee?', 'NOV \u00b7 MEDELL\u00cdN', false],
    ];
    const inner = `
    ${bg(uid, 574, 656)}
    ${glow(287, 300, 240, uid)}
    ${m(34, 42, 'ONE LINE \u00b7 TWELVE MONTHS', { size: 9.5, op: 0.5 })}
    ${t(34, 76, 'The same thread all year', { size: 21 })}
    ${msgs.map(([who, text, place, mine], i) => {
      const y = 104 + i * 98;
      const on = 0.06 + i * 0.14;
      const x = mine ? 200 : 34;
      const wid = mine ? 340 : 400;
      return `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${dcard(x, y, wid, 76, mine
          ? { r: 16, fill: 'rgba(255,83,20,0.13)', stroke: O, sw: 1.6 }
          : { r: 16 })}
        ${m(x + 22, y + 26, who.toUpperCase(), { size: 8.5, op: mine ? 0.8 : 0.45, fill: mine ? O_SOFT : W })}
        ${t(x + 22, y + 54, text, { size: 14, op: 0.9, weight: 600 })}
        ${m(x + wid - 22, y + 26, place, { size: 8, anchor: 'end', op: 0.32 })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.8;0.88;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${dcard(34, 596, 506, 44, { r: 12, fill: 'rgba(34,197,94,0.1)', stroke: GRN, sw: 1.6 })}
      ${m(56, 624, 'NEW NUMBERS SENT OUT THIS YEAR', { size: 9, op: 0.6 })}
      ${t(516, 626, '0', { size: 20, anchor: 'end', fill: GRN_LIT })}
    </g>`;
    return { svg: wN(inner), pills: noPills };
  },
};

export const nmSetInType = {
  id: 'nm-type',
  name: 'Set In Type',
  family: 'Typographic',
  tagline: 'One sentence, one word changing',
  desc:
    'No illustration at all. One sentence is set large down the panel \u2014 \u201cI have worked from ' +
    'LISBON and my number has not changed once\u201d \u2014 and only the city swaps, six times, on a ' +
    'thin orange rule. Beneath it, one line of small type counts the countries, the carriers and the ' +
    'reissues. The copy is the artwork.',
  pros: [
    'The lightest thing on the board: no artwork to draw or maintain',
    'One swapping word is a single idea, which is rare here',
    'Large type fills a tall panel better than any small graphic',
    'Impossible to misread at any width',
  ],
  cons: [
    'No product, no interface, no proof \u2014 it asks to be believed',
    'Type this large leaves no room to qualify anything',
    'Sits oddly if the section beside it is already text-heavy',
  ],
  scores: { story: 4, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const cities = ['LISBON', 'BALI', 'MEDELL\u00cdN', 'TBILISI', 'BANGKOK', 'CAPE TOWN'];
    const per = 2.2;
    const dur = cities.length * per;
    const seg = 1 / cities.length;
    const inner = `
    ${bg(uid, 574, 656)}
    ${glow(180, 300, 250, uid)}
    ${m(34, 44, 'SIX MOVES, ONE LINE', { size: 9.5, op: 0.45 })}
    ${t(34, 156, 'I have worked', { size: 27, op: 0.5 })}
    ${t(34, 192, 'from', { size: 27, op: 0.5 })}
    <g>
      ${cities.map((c, i) => `
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.01;${(seg - 0.015).toFixed(3)};${seg.toFixed(3)};1"
            dur="${dur}s" begin="${(i * per).toFixed(2)}s" repeatCount="indefinite"/>
          <text x="34" y="268" font-size="50" font-weight="800" fill="${O}">${c}</text>
        </g>`).join('')}
    </g>
    <path d="M 34 290 H 34" stroke="${O}" stroke-width="3" stroke-linecap="round">
      <animate attributeName="d" values="M 34 290 H 34;M 34 290 H 390;M 34 290 H 390" keyTimes="0;0.16;1"
        dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </path>
    ${t(34, 360, 'and my number', { size: 27, op: 0.5 })}
    ${t(34, 396, 'has not changed', { size: 27, op: 0.5 })}
    ${t(34, 478, 'once.', { size: 50 })}
    <path d="M 34 540 H 540" stroke="${W}" stroke-width="1.2" opacity="0.14"/>
    ${m(34, 576, 'SIX COUNTRIES', { size: 10, op: 0.55 })}
    ${m(224, 576, 'FIVE CARRIERS', { size: 10, op: 0.55 })}
    ${m(540, 576, 'ZERO REISSUES', { size: 10, op: 1, anchor: 'end', fill: GRN_LIT })}
    ${m(34, 624, 'NO CONTRACTS \u00b7 NO ROAMING BILLS \u00b7 ONE eSIM', { size: 9, op: 0.3 })}`;
    return { svg: wN(inner), pills: noPills };
  },
};

export const nmLanded = {
  id: 'nm-landed',
  name: 'Forty Seconds',
  family: 'Arrival',
  tagline: 'Wheels down to online, on a cream card',
  desc:
    'One moment instead of a year: the aircraft lands at 06:40 in Bangkok and the phone is on the ' +
    'network before the seatbelt sign goes off. A large timer settles at forty seconds, and under it ' +
    'the four things arrival used to mean \u2014 find a shop, queue with a passport, text everyone a ' +
    'new number \u2014 are struck out. The whole panel is cream, the only light surface in the block.',
  pros: [
    'Light on a dark page makes it the first option the eye lands on',
    'A single arrival is easier to picture than twelve months of travel',
    'Time-to-online is a number nothing else on this board uses',
    'The struck-out chores carry the pain in half the space of a full list',
  ],
  cons: [
    'Forty seconds has to match real attach times or it is a lie',
    'Four struck-out lines echo the problem-and-answer option',
    'A cream panel may look like a different site section',
  ],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 3, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const chores = [
      'Find a SIM shop in arrivals',
      'Queue at a counter with your passport',
      'Text everyone a new number',
      'Hope the bank still reaches you',
    ];
    const inner = `
    ${bg(uid, 574, 656)}
    ${glow(287, 300, 240, uid)}
    ${dcard(28, 44, 518, 552, { r: 22, fill: '#F6F4EF', stroke: 'rgba(255,255,255,0.55)', sw: 1 })}
    <text x="58" y="90" font-size="10" font-weight="700" letter-spacing="1.2" fill="#8A8578" style="font-family:${MONO}">06:40 \u00b7 BANGKOK \u00b7 WHEELS DOWN</text>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.06;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <text x="58" y="196" font-size="78" font-weight="800" fill="#131826">00:40</text>
      <text x="58" y="226" font-size="10.5" font-weight="700" letter-spacing="1.2" fill="#8A8578" style="font-family:${MONO}">FROM LANDING TO ONLINE</text>
    </g>
    <rect x="58" y="248" width="458" height="10" rx="5" fill="#E4E1D8"/>
    <rect x="58" y="248" width="0" height="10" rx="5" fill="${GRN}">
      <animate attributeName="width" values="0;458;458" keyTimes="0;0.24;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"
        calcMode="spline" keySplines="0.4 0 0.2 1;0 0 1 1"/>
    </rect>
    <text x="58" y="306" font-size="15" font-weight="800" fill="#131826">Things you did not have to do</text>
    ${chores.map((c, i) => {
      const y = 348 + i * 48;
      const on = 0.3 + i * 0.1;
      return `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.04).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <text x="58" y="${y}" font-size="14" font-weight="600" fill="#6E6A5E">${c}</text>
        <path d="M 56 ${y - 5} H 56" stroke="${RD}" stroke-width="2.2" stroke-linecap="round">
          <animate attributeName="d" values="M 56 ${y - 5} H 56;M 56 ${y - 5} H ${58 + c.length * 7.3};M 56 ${y - 5} H ${58 + c.length * 7.3}"
            keyTimes="0;${(on + 0.07).toFixed(3)};1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        </path>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.74;0.82;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <rect x="58" y="536" width="458" height="42" rx="12" fill="#E8F6EC"/>
      <circle cx="82" cy="557" r="9" fill="rgba(34,197,94,0.25)"/>
      <path d="M 78 557 l 2.8 3 l 5 -5.8" fill="none" stroke="${GRN_DEEP}" stroke-width="2.1" stroke-linecap="round"/>
      <text x="100" y="562" font-size="12.5" font-weight="700" fill="#14532D">Online before the seatbelt sign went off</text>
    </g>
    ${m(34, 628, 'THE FIRST TEN MINUTES IN A NEW COUNTRY', { size: 9, op: 0.4 })}`;
    return { svg: wN(inner), pills: noPills };
  },
};

export const nmDeadSims = {
  id: 'nm-sims',
  name: 'Dead SIMs',
  family: 'Single gesture',
  tagline: 'The pile you used to carry',
  desc:
    'One eSIM glows at the top of the panel. Under it, eight plastic SIM cards drop into a heap, each ' +
    'labelled with the carrier and the year it stopped mattering \u2014 MEO 2021, Telkomsel 2022, ' +
    'Claro 2023. Eight cards is eight numbers and eight rounds of telling everybody. The pile does ' +
    'the arguing; there is nothing else in the frame.',
  pros: [
    'One gesture, no reading, and it lands in under two seconds',
    'A growing heap is exactly what a tall panel wants to hold',
    'The dated labels make it specific rather than a generic pile of plastic',
    'Memorable in a way a table of rows is not',
  ],
  cons: [
    'Leads with clutter, which sits awkwardly on a premium tier',
    'Overlaps the \u201cnew SIM in every country\u201d line used elsewhere on the board',
    'Carries no figure beyond the count of cards',
  ],
  scores: { story: 4, motion: 4, perf: 4, mobile: 4, brand: 3, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const sims = [
      ['MEO \u00b7 2021', 158, 526, -7],
      ['TELKOMSEL \u00b7 2022', 298, 516, 6],
      ['CLARO \u00b7 2023', 196, 462, -13],
      ['MAGTI \u00b7 2023', 346, 454, 10],
      ['VODACOM \u00b7 2024', 168, 400, 4],
      ['AIS \u00b7 2024', 330, 392, -9],
      ['O2 \u00b7 2025', 238, 342, 12],
      ['ORANGE \u00b7 2025', 372, 332, -4],
    ];
    const card = (lab) => `
      <path d="M 8 0 H 96 L 122 26 V 68 A 8 8 0 0 1 114 76 H 8 A 8 8 0 0 1 0 68 V 8 A 8 8 0 0 1 8 0 Z"
        fill="#1B2130" stroke="rgba(255,255,255,0.16)" stroke-width="1.4"/>
      <rect x="14" y="16" width="34" height="26" rx="4" fill="${W}" opacity="0.14"/>
      ${[0, 1, 2].map(i => `<path d="M 18 ${22 + i * 8} H 44" stroke="${W}" stroke-width="1.2" opacity="0.2"/>`).join('')}
      <text x="14" y="62" font-size="7.5" font-weight="700" letter-spacing="0.9" fill="${W}" opacity="0.4" style="font-family:${MONO}">${lab}</text>`;
    const inner = `
    ${bg(uid, 574, 656)}
    ${glow(287, 170, 220, uid)}
    ${m(34, 42, 'EIGHT YEARS OF PLASTIC', { size: 9.5, op: 0.5 })}
    <g transform="translate(287 158)">
      ${dcard(-52, -72, 104, 144, { r: 16, fill: 'rgba(255,83,20,0.12)', stroke: O, sw: 2 })}
      <g transform="translate(-26 -46)">
        <rect width="52" height="40" rx="6" fill="none" stroke="${O_SOFT}" stroke-width="2"/>
        ${[0, 1, 2].map(i => `<path d="M 8 ${10 + i * 10} H 44" stroke="${O_SOFT}" stroke-width="1.6" opacity="0.7"/>`).join('')}
      </g>
      ${m(0, 22, 'ONE eSIM', { size: 10.5, anchor: 'middle', op: 1, fill: O })}
      ${m(0, 44, '190+ COUNTRIES', { size: 8.5, anchor: 'middle', op: 0.5 })}
      <circle r="76" fill="none" stroke="${O}" stroke-width="2" opacity="0">
        <animate attributeName="r" values="56;104" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.5;0" dur="3s" repeatCount="indefinite"/>
      </circle>
    </g>
    ${m(287, 262, 'REPLACES ALL OF THIS', { size: 9, anchor: 'middle', op: 0.35 })}
    ${sims.map(([lab, x, y, rot], i) => {
      const on = (0.1 + i * 0.075).toFixed(3);
      const start = `${x} ${y - 230}`;
      const end = `${x} ${y}`;
      return `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${(parseFloat(on) + 0.01).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <g>
          <animateTransform attributeName="transform" type="translate" values="${start};${start};${end};${end}"
            keyTimes="0;${on};${(parseFloat(on) + 0.055).toFixed(3)};1" dur="${dur}s" repeatCount="indefinite"
            fill="freeze" calcMode="spline" keySplines="0 0 1 1;0.3 0 0.4 1;0 0 1 1"/>
          <g transform="rotate(${rot} 61 38)">${card(lab)}</g>
        </g>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.78;0.86;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${m(34, 632, 'EIGHT CARDS \u00b7 EIGHT NUMBERS \u00b7 EIGHT TIMES YOU TOLD EVERYONE', { size: 9.5, op: 0.55, fill: O })}
    </g>`;
    return { svg: wN(inner), pills: noPills };
  },
};


/* ══ KYC · 11–15 ════════════════════════════════════════════════════ */

export const kyAsked = {
  id: 'ky-qa',
  name: 'Asked And Answered',
  family: 'Editorial',
  tagline: 'Three questions in plain sentences',
  desc:
    'No diagram. The three questions a reader actually has are printed with their answers: why a ' +
    'passport is needed, whether the document is kept, and whether the anonymous eSIM is still ' +
    'available. Each answer is two short sentences. It treats the reader as somebody deciding rather ' +
    'than somebody being processed.',
  pros: [
    'Answers objections in the reader\u2019s own words instead of illustrating a process',
    'Protects the anonymous product in writing, which the section copy needs',
    'Nothing to draw, so it never breaks and reads perfectly at 390px',
    'Easy for legal to review line by line',
  ],
  cons: [
    'Text beside text: the block already has copy in the right-hand cell',
    'Barely animated, so it will look inert next to the timed options',
    'Every word has to be signed off, which slows changes later',
  ],
  scores: { story: 5, motion: 1, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: (uid) => {
    const dur = 11;
    const qa = [
      ['Why do you need my passport?', 'A real number is issued in a real name.', 'Regulators require the name to be checked first.'],
      ['Do you keep it?', 'No. The document is checked, then deleted.', 'What stays is a pass, a fail and a date.'],
      ['Can I stay anonymous instead?', 'Yes \u2014 the standard eSIM asks for nothing.', 'It simply cannot carry a phone number.'],
    ];
    const inner = `
    ${bg(uid, 574, 432, GRN)}
    ${glow(200, 200, 220, uid)}
    ${m(30, 42, 'BEFORE YOU UPLOAD ANYTHING', { size: 9.5, op: 0.5 })}
    ${t(30, 76, 'Three fair questions', { size: 19 })}
    ${qa.map(([q, a1, a2], i) => {
      const y = 100 + i * 96;
      const on = 0.06 + i * 0.16;
      return `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.06).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <rect x="30" y="${y}" width="3.5" height="78" rx="2" fill="${GRN}"/>
        ${t(52, y + 22, q, { size: 15 })}
        ${t(52, y + 46, a1, { size: 12.5, op: 0.6, weight: 500 })}
        ${t(52, y + 66, a2, { size: 12.5, op: 0.6, weight: 500 })}
      </g>`;
    }).join('')}
    ${m(30, 408, 'NO DIAGRAM REQUIRED \u2014 THESE ARE THE ONLY THREE QUESTIONS', { size: 9, op: 0.35 })}`;
    return { svg: wK(inner), pills: noPills };
  },
};

export const kyNormal = {
  id: 'ky-normal',
  name: 'Done This Before',
  family: 'Reframe',
  tagline: 'The same check as a bank, from your sofa',
  desc:
    'Four sign-ups in a row: a bank account, a Spanish SIM bought over a counter, a hire car, and ' +
    'Openline+. The first three want a passport, an address and a deposit, in person. The last wants ' +
    'a passport, a selfie and a card, in eighty-five seconds, from wherever the reader is sitting. ' +
    'KYC stops looking like an Openline demand and starts looking like the smallest version of it.',
  pros: [
    'Reframes the objection instead of explaining it away',
    'Every reader has passed at least two of these checks already',
    'The last row wins on effort, not on argument',
    'A wide panel takes four comparison rows without compression',
  ],
  cons: [
    'Comparing yourself to a bank invites the comparison to continue',
    'The in-person detail for a Spanish SIM varies by country',
    'Says nothing about what happens to the documents',
  ],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 10;
    const rows = [
      ['Opening a bank account', 'PASSPORT \u00b7 ADDRESS \u00b7 SELFIE', 'IN BRANCH', false],
      ['Buying a SIM in Spain', 'PASSPORT \u00b7 IN PERSON', 'AT A COUNTER', false],
      ['Hiring a car', 'LICENCE \u00b7 CARD \u00b7 DEPOSIT', 'AT THE DESK', false],
      ['Openline+', 'PASSPORT \u00b7 SELFIE \u00b7 CARD', '85 SECONDS, AT HOME', true],
    ];
    const inner = `
    ${bg(uid, 574, 432, GRN)}
    ${glow(320, 200, 220, uid)}
    ${m(30, 42, 'CHECKS YOU HAVE ALREADY PASSED', { size: 9.5, op: 0.5 })}
    ${t(30, 76, 'You have done this before', { size: 19 })}
    ${rows.map(([nm2, what, where, ours], i) => {
      const y = 98 + i * 68;
      const on = 0.08 + i * 0.16;
      return `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.06).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${dcard(30, y, 514, 56, ours
          ? { r: 12, fill: 'rgba(34,197,94,0.12)', stroke: GRN, sw: 2 }
          : { r: 12 })}
        ${ours
          ? gtick(56, y + 28, '', { fill: GRN_LIT })
          : `<circle cx="56" cy="${y + 28}" r="9" fill="rgba(255,255,255,0.07)"/>
             <path d="M 52 ${y + 28} l 2.6 3 l 5.4 -6" fill="none" stroke="${W}" stroke-width="2" opacity="0.4" stroke-linecap="round"/>`}
        ${t(80, y + 26, nm2, { size: 14, op: ours ? 1 : 0.8 })}
        ${m(80, y + 44, what, { size: 8.5, op: ours ? 0.6 : 0.35, fill: ours ? GRN_LIT : W })}
        ${m(520, y + 33, where, { size: 9.5, anchor: 'end', op: ours ? 1 : 0.4, fill: ours ? GRN_LIT : W })}
      </g>`;
    }).join('')}
    ${m(30, 408, 'THE LIGHTEST CHECK ON THE LIST, AND THE ONLY ONE YOU CAN DO IN BED', { size: 9, op: 0.35 })}`;
    return { svg: wK(inner), pills: noPills };
  },
};

export const kyCert = {
  id: 'ky-cert',
  name: 'In Your Name',
  family: 'Single gesture',
  tagline: 'The check produces a credential, not a file',
  desc:
    'One cream certificate, centred, with a name, a number and a verification date set on it, and a ' +
    'green seal that presses down at the end. Nothing is scanned, queued or explained. The point is ' +
    'that the end of verification is a document in your name rather than a folder of your documents ' +
    'in somebody else\u2019s.',
  pros: [
    'The only upmarket object in the block, which is what this tier lacks',
    'Light on dark makes it the strongest single frame on the board',
    'A seal pressing down is one satisfying beat, with a clear end',
    'Holds up perfectly as a still image and at tile size',
  ],
  cons: [
    'Openline issues no certificate, so the object is a metaphor',
    'Explains nothing about the process, the privacy or the reason',
    'A certificate can read as institutional rather than premium',
  ],
  scores: { story: 3, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 9;
    const inner = `
    ${bg(uid, 574, 432, GRN)}
    ${glow(287, 200, 230, uid)}
    ${dcard(40, 46, 494, 326, { r: 12, fill: '#F7F4EC', stroke: 'rgba(255,255,255,0.6)', sw: 1 })}
    <rect x="56" y="62" width="462" height="294" rx="8" fill="none" stroke="#C9C2AE" stroke-width="1.2"/>
    <path d="M 56 96 q 58 -18 115 0 t 115 0 t 115 0 t 115 0" fill="none" stroke="#C9C2AE" stroke-width="1" opacity="0.6"/>
    <text x="287" y="132" font-size="9.5" font-weight="700" letter-spacing="2" text-anchor="middle" fill="#8A8375" style="font-family:${MONO}">OPENLINE+ MEMBERSHIP RECORD</text>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.1;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <text x="287" y="188" font-size="27" font-weight="800" text-anchor="middle" fill="#131826">PAUL M. FERREIRA</text>
      <text x="287" y="218" font-size="15" font-weight="700" letter-spacing="1.4" text-anchor="middle" fill="${GRN_DEEP}" style="font-family:${MONO}">+351 912 04 88</text>
    </g>
    <path d="M 140 240 H 434" stroke="#C9C2AE" stroke-width="1.2"/>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.24;0.34;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <text x="90" y="274" font-size="8.5" font-weight="700" letter-spacing="1.1" fill="#8A8375" style="font-family:${MONO}">ISSUED 12 MAR 2026</text>
      <text x="90" y="294" font-size="8.5" font-weight="700" letter-spacing="1.1" fill="#8A8375" style="font-family:${MONO}">FULL KYC \u00b7 LISBON, PT</text>
      <text x="90" y="330" font-size="12.5" font-weight="700" fill="#3F3A2E">A number issued to a person, not an alias.</text>
    </g>
    <g transform="translate(446 296)" opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.44;0.5;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <g>
        <animateTransform attributeName="transform" type="scale" values="2.1;1;1" keyTimes="0;0.06;1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze" additive="sum"/>
        <circle r="38" fill="rgba(34,197,94,0.14)" stroke="${GRN_DEEP}" stroke-width="2.4"/>
        <circle r="31" fill="none" stroke="${GRN_DEEP}" stroke-width="1" opacity="0.6"/>
        <path d="M -9 0 l 6 7 l 13 -15" fill="none" stroke="${GRN_DEEP}" stroke-width="3"
          stroke-linecap="round" stroke-linejoin="round"/>
        <text x="0" y="24" font-size="7.5" font-weight="700" letter-spacing="1.3" text-anchor="middle" fill="${GRN_DEEP}" style="font-family:${MONO}">VERIFIED</text>
      </g>
    </g>
    ${m(30, 408, 'THE CHECK ENDS IN A CREDENTIAL, NOT A FOLDER OF YOUR DOCUMENTS', { size: 9, op: 0.35 })}`;
    return { svg: wK(inner), pills: noPills };
  },
};

export const kyChain = {
  id: 'ky-chain',
  name: 'Who Sees What',
  family: 'Mechanism',
  tagline: 'Openline never receives the document',
  desc:
    'Three parties across the panel: you, a certified verifier, and Openline. The passport travels ' +
    'from you to the verifier and stops there; only a pass flag carries on to Openline, whose column ' +
    'shows the document crossed out. It answers the question the page raises by selling an anonymous ' +
    'product elsewhere \u2014 who is actually looking at this.',
  pros: [
    'Names the party that holds the document, which nothing else on the board does',
    'Three columns is the natural use of a 574\u00d7432 landscape box',
    'A flag crossing the last gap instead of a document is a single clear beat',
    'Strongest privacy claim available if it is true',
  ],
  cons: [
    'Only usable if verification really is outsourced to a certified vendor',
    'Introduces a third party the reader had not thought about',
    'Close in spirit to the sealed-record option, though the mechanism differs',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const dur = 9;
    const doc = (o = {}) => `
      <rect x="-30" y="-20" width="60" height="40" rx="5" fill="${o.fill || '#F7FBF8'}" stroke="rgba(255,255,255,0.4)" stroke-width="1.4"/>
      <rect x="-22" y="-12" width="16" height="16" rx="3" fill="#CBD5CE"/>
      <rect x="0" y="-11" width="22" height="4" rx="2" fill="#CBD5CE"/>
      <rect x="0" y="-3" width="16" height="4" rx="2" fill="#DCE3DD"/>
      <rect x="-22" y="8" width="44" height="4" rx="2" fill="#DCE3DD"/>`;
    const inner = `
    ${bg(uid, 574, 432, GRN)}
    ${glow(287, 200, 230, uid)}
    ${m(30, 42, 'WHO HOLDS WHAT', { size: 9.5, op: 0.5 })}
    ${t(30, 76, 'We never receive it', { size: 19 })}

    <!-- you -->
    ${dcard(24, 96, 158, 224, { r: 14 })}
    ${m(44, 124, 'YOU', { size: 9, op: 0.5 })}
    <g transform="translate(103 186)">${doc()}</g>
    ${t(44, 258, 'Hold the original', { size: 12, op: 0.75, weight: 600 })}
    ${m(44, 280, 'IT NEVER LEAVES YOUR DEVICE', { size: 8, op: 0.32 })}
    ${m(44, 296, 'UNENCRYPTED', { size: 8, op: 0.32 })}

    <!-- verifier -->
    ${dcard(208, 96, 158, 224, { r: 14, fill: 'rgba(34,197,94,0.07)', stroke: GRN, sw: 1.6 })}
    ${m(228, 124, 'CERTIFIED VERIFIER', { size: 9, op: 0.75, fill: GRN_LIT })}
    <g transform="translate(287 186)" opacity="0">
      <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.24;0.3;0.52;0.58;1" dur="${dur}s" repeatCount="indefinite"/>
      ${doc()}
    </g>
    <g transform="translate(287 186)" opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.56;0.62;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <circle r="24" fill="none" stroke="${GRN_LIT}" stroke-width="2.2" stroke-dasharray="3 5"/>
      ${m(0, 4, 'DELETED', { size: 8.5, anchor: 'middle', op: 1, fill: GRN_LIT })}
    </g>
    ${t(228, 258, 'ISO 27001 \u00b7 eIDAS', { size: 12, op: 0.75, weight: 600 })}
    ${m(228, 280, 'CHECKS IT, THEN DELETES IT', { size: 8, op: 0.32 })}
    ${m(228, 296, 'WITHIN MINUTES', { size: 8, op: 0.32 })}

    <!-- openline -->
    ${dcard(392, 96, 158, 224, { r: 14 })}
    ${m(412, 124, 'OPENLINE', { size: 9, op: 0.5 })}
    <g transform="translate(471 186)" opacity="0.4">
      ${doc()}
      <path d="M -34 -24 L 34 24" stroke="${RD}" stroke-width="3" stroke-linecap="round"/>
    </g>
    <g transform="translate(412 246)" opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.78;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${dcard(0, 0, 118, 28, { r: 8, fill: 'rgba(34,197,94,0.16)', stroke: GRN, sw: 1.4 })}
      ${m(59, 19, 'verified: true', { size: 9, anchor: 'middle', op: 1, fill: GRN_LIT })}
    </g>
    ${m(412, 280, 'NEVER RECEIVES', { size: 8, op: 0.32 })}
    ${m(412, 296, 'THE DOCUMENT ITSELF', { size: 8, op: 0.32 })}

    <!-- the two hops -->
    <path d="M 186 186 H 204" stroke="${W}" stroke-width="1.6" opacity="0.25" stroke-dasharray="4 4"/>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.12;0.16;0.26;0.3;1" dur="${dur}s" repeatCount="indefinite"/>
      <g transform="translate(150 186) scale(0.5)">${doc()}</g>
      <animateTransform attributeName="transform" type="translate" values="0 0;0 0;138 0;138 0"
        keyTimes="0;0.14;0.26;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </g>
    <path d="M 370 186 H 388" stroke="${GRN}" stroke-width="1.6" opacity="0.35" stroke-dasharray="4 4"/>
    <circle r="5" fill="${GRN_LIT}" opacity="0">
      <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.62;0.66;0.74;0.78;1" dur="${dur}s" repeatCount="indefinite"/>
      <animateMotion dur="${dur}s" repeatCount="indefinite" keyPoints="0;0;1;1" keyTimes="0;0.64;0.74;1" calcMode="linear" path="M 370 186 H 388"/>
    </circle>
    ${m(30, 408, 'THE ONLY THING WE ARE TOLD IS WHETHER YOU PASSED', { size: 9, op: 0.35 })}`;
    return { svg: wK(inner), pills: noPills };
  },
};

export const kyOnce = {
  id: 'ky-once',
  name: 'Once, Then Never',
  family: 'Frequency',
  tagline: 'One check in month one, nothing since',
  desc:
    'The unspoken fear about verification is not the first check, it is being asked again every time ' +
    'something changes. This runs the timeline: full KYC at sign-up, eighty-five seconds, then a new ' +
    'eSIM, a new country, a renewal and a second number \u2014 each one passing with no check and no ' +
    'seconds spent. One large figure holds the point: one, ever.',
  pros: [
    'Answers the question the other options leave open: will you keep asking?',
    'A horizontal timeline is the right use of a wide panel',
    'Turns a one-off cost into an obviously finite one',
    'Cheap, legible and easy to keep honest',
  ],
  cons: [
    'Re-verification is sometimes legally required, so the claim needs a caveat',
    'Repeats the eighty-five-second figure used by the speed option',
    'Four identical no-check markers is a repetitive beat',
  ],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const events = [['NEW eSIM', 'MONTH 3'], ['NEW COUNTRY', 'MONTH 6'], ['RENEWAL', 'MONTH 12'], ['SECOND NUMBER', 'MONTH 18']];
    const inner = `
    ${bg(uid, 574, 432, GRN)}
    ${glow(287, 200, 220, uid)}
    ${m(30, 42, 'HOW OFTEN WE ASK', { size: 9.5, op: 0.5 })}
    ${dcard(30, 62, 300, 96, { r: 13, fill: 'rgba(34,197,94,0.1)', stroke: GRN, sw: 2 })}
    ${m(52, 92, 'MONTH 1 \u00b7 SIGN-UP', { size: 9, op: 0.65, fill: GRN_LIT })}
    ${t(52, 124, 'Full KYC, 85 seconds', { size: 16 })}
    ${m(52, 146, 'PASSPORT \u00b7 SELFIE \u00b7 CARD', { size: 8.5, op: 0.4 })}
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.08;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${t(544, 128, '1', { size: 64, anchor: 'end', fill: GRN_LIT })}
      ${m(544, 152, 'CHECK, EVER', { size: 9, anchor: 'end', op: 0.55 })}
    </g>
    <path d="M 48 236 H 540" stroke="${W}" stroke-width="2" opacity="0.1"/>
    <path d="M 48 236 H 48" stroke="${GRN}" stroke-width="2.4" stroke-linecap="round">
      <animate attributeName="d" values="M 48 236 H 48;M 48 236 H 540;M 48 236 H 540" keyTimes="0;0.6;1"
        dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </path>
    <circle cx="48" cy="236" r="7" fill="${GRN}"/>
    ${m(48, 214, 'VERIFIED', { size: 8.5, anchor: 'middle', op: 0.6, fill: GRN_LIT })}
    ${events.map(([lab, when], i) => {
      const x = 152 + i * 124;
      const on = 0.22 + i * 0.12;
      return `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <circle cx="${x}" cy="236" r="6" fill="#131826" stroke="${GRN}" stroke-width="2"/>
        ${m(x, 214, when, { size: 8, anchor: 'middle', op: 0.32 })}
        ${m(x, 274, lab, { size: 8.5, anchor: 'middle', op: 0.75 })}
        ${m(x, 296, 'NO CHECK', { size: 8.5, anchor: 'middle', op: 1, fill: GRN_LIT })}
        ${m(x, 316, '0 SECONDS', { size: 8, anchor: 'middle', op: 0.3 })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.76;0.84;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${m(30, 368, 'EIGHTEEN MONTHS, ONE VERIFICATION', { size: 10, op: 0.6, fill: GRN_LIT })}
      ${m(30, 392, 'WE ASK AGAIN ONLY IF THE LAW MAKES US', { size: 9, op: 0.35 })}
    </g>`;
    return { svg: wK(inner), pills: noPills };
  },
};

/* ── registries ── */
export const LOUNGE_VARIANTS = [lgCurrent, lgTwoLanes, lgDoor, lgItinerary, lgCost, lgMap, lgUpgrade, lgDelay, lgQueue, lgNetwork,
  lgWhoIsIn, lgAppPass, lgFlap, lgQuoted, lgSection, lgMetal];
export const NOMAD_VARIANTS = [nmCurrent, nmCities, nmLockout, nmYear, nmDesk, nmPassport, nmClock, nmMonthEnd, nmCall, nmTaxHome,
  nmTwoNumbers, nmDualEsim, nmThread, nmSetInType, nmLanded, nmDeadSims];
export const KYC_VARIANTS = [kyCurrent, kyFourChecks, kyTwoDoors, kyLiveness, kySealed,
  kyRegistry, kyCommunity, kyWhatWeKeep, kyNinetySeconds, kyRefused,
  kyNoSelfie, kyAsked, kyNormal, kyCert, kyChain, kyOnce];
