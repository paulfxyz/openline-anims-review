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
          <animate attributeName="opacity" values="0;0.9;0" keyTimes="0;0.16;0.3" dur="7s" repeatCount="indefinite"/></rect>
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

export const LOUNGE_VARIANTS = [lgCurrent, lgTwoLanes, lgDoor, lgItinerary, lgCost, lgMap, lgUpgrade];

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
              <animate attributeName="opacity" values="0;1;1;0" dur="${senders.length * 1.6}s" begin="${i * 1.6}s"
                keyTimes="0;0.04;${(1 / senders.length - 0.02).toFixed(3)};${(1 / senders.length).toFixed(3)}" repeatCount="indefinite"/>
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

export const NOMAD_VARIANTS = [nmCurrent, nmCities, nmLockout, nmYear, nmDesk, nmPassport, nmClock];

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
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.52;0.56;0.72;0.76" dur="7s" repeatCount="indefinite"/>
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
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.6;0.64;0.8;0.84" dur="8s" repeatCount="indefinite"/>
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
              <animate attributeName="opacity" values="0;1;1;${declined ? 0 : 1};0" keyTimes="0;0.05;0.4;0.62;0.72"
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

export const KYC_VARIANTS = [kyCurrent, kyFourChecks, kyTwoDoors, kyLiveness, kySealed, kyRegistry, kyCommunity];
