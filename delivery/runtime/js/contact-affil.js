/* ─────────────────────────────────────────────────────────────────────────
   /contact hero scene (576 × 420) and /affiliate hero scene (592 × 430).
   Option 0 replicates what ships; 1–10 are proposals.
   ───────────────────────────────────────────────────────────────────────── */
import { boxWrap, TONES, INK, WHITE, GRAY, LINE, GREEN, GREEN_SOFT, GREEN_TEXT, RED, AMBER } from './kit.js';

const MO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const noPills = [];
const CW = 576, CH = 420, AW = 592, AH = 430;
const wC = boxWrap(CW, CH);
const wA = boxWrap(AW, AH);
const OR = TONES.orange.main, ORW = TONES.orange.wash, ORS = TONES.orange.soft || '#FFD9C7';
const GR = '#0E9F6E', GRW = '#E7F8F1';
const MUT = '#6B7280';

const t = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}"${o.m ? ` font-family="${MO}"` : ''} font-size="${o.size || 12}"` +
  ` font-weight="${o.w || 400}" fill="${o.fill || INK}" opacity="${o.op == null ? 1 : o.op}"` +
  ` text-anchor="${o.a || 'start'}"${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${s}</text>`;

const lab = (x, y, s, fill, o = {}) =>
  t(x, y, s, { m: true, size: o.size || 9, ls: o.ls || 1.3, fill, a: o.a, op: o.op });

const rect = (x, y, w, h, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r == null ? 8 : o.r}"` +
  ` fill="${o.fill || 'none'}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 1}"` : ''}` +
  `${o.op == null ? '' : ` opacity="${o.op}"`}/>`;

const tick = (x, y, col, sc = 1) =>
  `<path d="M ${x} ${y} l ${3.6 * sc} ${3.6 * sc} l ${6.6 * sc} ${-7.2 * sc}" fill="none"` +
  ` stroke="${col}" stroke-width="${2 * sc}" stroke-linecap="round" stroke-linejoin="round"/>`;

const dots = (w, h, col, op = 0.1) => `
  <defs><pattern id="cd${Math.random().toString(36).slice(2, 7)}" width="16" height="16" patternUnits="userSpaceOnUse">
    <circle cx="1.5" cy="1.5" r="1.1" fill="${col}" opacity="${op}"/></pattern></defs>`;

const bg = (w, h, col) => `
  <rect width="${w}" height="${h}" fill="#FFFDFB"/>
  <circle cx="${w - 60}" cy="${h - 40}" r="${h * 0.42}" fill="${col}" opacity="0.06"/>
  <circle cx="60" cy="40" r="${h * 0.3}" fill="${col}" opacity="0.05"/>`;

const cycle = (x, y, vals, o = {}) => {
  const n = vals.length;
  const kt = vals.map((_, i) => (i / n).toFixed(4)).concat('1').join(';');
  return `<text x="${x}" y="${y}" font-family="${MO}" font-size="${o.size || 14}" font-weight="${o.w || 600}"` +
    ` fill="${o.fill || INK}" text-anchor="${o.a || 'end'}">` +
    vals.map((v, i) =>
      `<tspan x="${x}" opacity="0">${v}` +
      `<animate attributeName="opacity" values="${vals.map((_, j) => (j === i ? '1' : '0')).join(';')};${i === 0 ? '1' : '0'}"` +
      ` keyTimes="${kt}" dur="${o.dur || 8}s" repeatCount="indefinite" calcMode="discrete"/></tspan>`
    ).join('') + '</text>';
};

const bubble = (x, y, w, h, mine, text, lines, o = {}) => `
  ${rect(x, y, w, h, { fill: mine ? o.mineFill || OR : WHITE, r: 12, stroke: mine ? null : LINE })}
  ${lines.map((ln, i) => t(x + 14, y + 22 + i * 16, ln, { size: 11.5, fill: mine ? WHITE : INK })).join('')}`;

/* ════════════════════════════════════════════════════════════════════════
   /contact — option 0
   ════════════════════════════════════════════════════════════════════════ */
export const contactCurrent = {
  id: 'ct-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'A status card that states its own metrics',
  desc:
    'What ships now: a panel listing "Chat Support Active", an average response time, an agent ' +
    'count and 24/7 availability. It is the same four facts already in the stat row above it, ' +
    'restated in a card — and since nothing on it moves, "Active" and "3 Agents Online" are ' +
    'claims rather than observations.',
  pros: ['The four facts are the right four', 'Clean and uncluttered', 'Reads instantly'],
  cons: ['Duplicates the stat row directly beside it', 'Static "live" indicators undercut themselves', 'Shows no support actually happening'],
  scores: { story: 2, motion: 1, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: () => ({
    pills: noPills,
    svg: wC(`
      ${bg(CW, CH, OR)}
      ${rect(40, 54, CW - 80, 312, { fill: WHITE, stroke: LINE, r: 16 })}
      <circle cx="70" cy="90" r="5" fill="${GR}"/>
      ${t(86, 95, 'Chat Support Active', { size: 15, w: 700 })}
      ${[['Avg. Response', '< 2 min'], ['Agents Online', '3'], ['Availability', '24/7']].map(([k, v], i) => {
        const y = 128 + i * 62;
        return `${rect(64, y, CW - 128, 50, { fill: '#F9FAFB', r: 10 })}
          ${t(82, y + 31, k, { size: 12.5, fill: MUT })}
          ${t(CW - 82, y + 31, v, { m: true, size: 14, w: 700, a: 'end' })}`;
      }).join('')}
      ${rect(64, 316, CW - 128, 34, { fill: ORW, r: 8 })}
      ${t(CW / 2, 338, 'Open Live Chat', { size: 12.5, w: 700, a: 'middle', fill: OR })}
      ${lab(CW / 2, 392, 'NOTHING HERE MOVES, INCLUDING THE WORD "ACTIVE"', GRAY, { a: 'middle', size: 8.5 })}`),
  }),
};

/* C1 ── Under Two Minutes */
export const underTwo = {
  id: 'ct-two',
  name: 'Under Two Minutes',
  family: 'Proof',
  tagline: 'The clock that stops when someone replies',
  desc:
    'The page claims a response time under two minutes. This times it. A question is sent, a ' +
    'timer runs, an agent picks up, and the clock stops at 1:47 — then it resets with a different ' +
    'question and a different time, none of them over two minutes. It converts the single most ' +
    'important support promise into something the reader watches happen.',
  pros: ['Proves the headline metric directly', 'Suspense and payoff in five seconds', 'Different times each cycle avoid looking staged'],
  cons: ['Sets an expectation support has to keep', 'One metric only'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: () => {
    const dur = 9;
    return {
      pills: noPills,
      svg: wC(`
        ${bg(CW, CH, OR)}
        ${rect(40, 46, CW - 80, 328, { fill: WHITE, stroke: LINE, r: 16 })}
        ${lab(64, 76, 'YOU', GRAY, { size: 8.5 })}
        ${bubble(64, 84, 300, 46, true, '', ['My eSIM will not activate in', 'Osaka — can you check?'])}

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.34;0.4;0.9;0.96;1"
            dur="${dur}s" repeatCount="indefinite"/>
          ${lab(CW - 64, 158, 'SUPPORT', GRAY, { size: 8.5, a: 'end' })}
          ${bubble(CW - 364, 166, 300, 62, false, '', ['Found it — the profile was issued', 'to your old device. Reissued now,', 'try again in 30 seconds.'])}
        </g>

        ${rect(64, 250, CW - 128, 86, { fill: '#F9FAFB', r: 12 })}
        ${lab(84, 276, 'TIME TO FIRST REPLY', GRAY, { size: 8.5 })}
        <g>
          <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.33;0.4;0.94;1" dur="${dur}s" repeatCount="indefinite"/>
          ${cycle(CW - 84, 318, ['0:04', '0:31', '0:58', '1:22'], { fill: MUT, size: 30, a: 'end', dur: dur * 0.33 })}
          ${lab(84, 318, 'WAITING', AMBER, { size: 9 })}
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.33;0.4;0.94;1" dur="${dur}s" repeatCount="indefinite"/>
          ${cycle(CW - 84, 318, ['1:47', '0:52', '1:09'], { fill: GREEN_TEXT, size: 30, a: 'end', dur: dur })}
          ${tick(84, 312, GR, 1)}
          ${lab(102, 318, 'ANSWERED BY A PERSON', GREEN_TEXT, { size: 9 })}
        </g>
        ${lab(64, 398, 'STATED AVERAGE: UNDER TWO MINUTES', GRAY, { size: 8.5 })}`),
    };
  },
};

/* C2 ── Three Agents */
export const threeAgents = {
  id: 'ct-agents',
  name: 'Three Agents',
  family: 'People',
  tagline: 'Named humans, not a headcount',
  desc:
    '"3 Agents Online" is a number. This is three people — first name, the languages they work ' +
    'in, and what each is doing right now — with one of them picking up the incoming question ' +
    'while you watch. Support pages win trust by looking staffed by humans, and a count does not ' +
    'do that.',
  pros: ['Turns a metric into people', 'Languages are a real differentiator for travellers', 'Warm without being cute'],
  cons: ['Needs real names and a policy on showing them', 'Implies these specific agents are always on'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 4, brand: 4, ease: 3 },
  build: () => {
    const ag = [
      ['Mei', 'EN · JA · ZH', 'Replying to Osaka activation'],
      ['Tomás', 'EN · PT · ES', 'Available'],
      ['Yusuf', 'EN · TR · DE', 'Checking a billing record'],
    ];
    const dur = 9;
    return {
      pills: noPills,
      svg: wC(`
        ${bg(CW, CH, OR)}
        ${lab(44, 40, 'ON SHIFT RIGHT NOW', GRAY, { size: 9 })}
        ${ag.map(([nm, lg, st], i) => {
          const y = 56 + i * 96;
          const busy = i !== 1;
          return `
          ${rect(40, y, CW - 80, 84, { fill: WHITE, stroke: LINE, r: 14 })}
          ${rect(60, y + 20, 44, 44, { fill: i === 1 ? GRW : ORW, r: 14 })}
          ${t(82, y + 49, nm[0], { size: 19, w: 700, a: 'middle', fill: i === 1 ? GREEN_TEXT : OR })}
          ${t(120, y + 38, nm, { size: 15, w: 700 })}
          ${lab(120, y + 56, lg, MUT, { size: 8.5 })}
          <circle cx="${CW - 176}" cy="${y + 33}" r="4" fill="${i === 1 ? GR : AMBER}">
            <animate attributeName="opacity" values="0.35;1;0.35" keyTimes="0;0.5;1"
              dur="${(2 + i * 0.4).toFixed(1)}s" repeatCount="indefinite"/></circle>
          ${t(CW - 164, y + 37, i === 1 ? 'Available' : 'Busy', { size: 11.5, fill: i === 1 ? GREEN_TEXT : MUT })}
          ${t(CW - 60, y + 58, st, { size: 10.5, a: 'end', fill: GRAY })}
          ${i === 1 ? `
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.4;0.5;1" dur="${dur}s"
                repeatCount="indefinite"/>
              ${rect(40, y, CW - 80, 84, { fill: 'none', stroke: GR, sw: 2, r: 14 })}
              ${rect(CW - 186, y + 56, 126, 20, { fill: GRW, r: 10 })}
              ${lab(CW - 176, y + 70, 'PICKED UP YOUR CHAT', GREEN_TEXT, { size: 7.5 })}
            </g>` : ''}`;
        }).join('')}
        ${lab(44, 396, 'THREE AGENTS ONLINE — AND WHAT THEY ARE EACH DOING', GRAY, { size: 8.5 })}`),
    };
  },
};

/* C3 ── No Queue */
export const noQueue = {
  id: 'ct-queue',
  name: 'No Queue',
  family: 'Contrast',
  tagline: 'Position 1 of 1, against the industry',
  desc:
    'Everyone knows what support usually feels like: position fourteen, an estimated wait of ' +
    'nineteen minutes, hold music. This draws that queue draining slowly on one side and ' +
    'Openline answering at position one on the other. The comparison does the persuading, and it ' +
    'costs nothing to claim because the reader has already lived the left-hand side.',
  pros: ['Leans on a universally shared frustration', 'No metric of ours needs defending', 'Very strong on mobile'],
  cons: ['Comparative and slightly combative', 'Needs care to avoid naming competitors'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: () => {
    const dur = 10;
    return {
      pills: noPills,
      svg: wC(`
        ${bg(CW, CH, OR)}
        ${rect(34, 50, 240, 300, { fill: WHITE, stroke: LINE, r: 14 })}
        ${lab(54, 78, 'TYPICAL SUPPORT', GRAY, { size: 8.5 })}
        ${Array.from({ length: 7 }, (_, i) => {
          const y = 96 + i * 30;
          return `<g>
            ${rect(54, y, 200, 22, { fill: '#F3F4F6', r: 5 })}
            ${lab(64, y + 15, i === 6 ? 'YOU · POSITION 14' : 'WAITING', i === 6 ? RED : GRAY, { size: 7.5 })}
            <animate attributeName="opacity" values="1;${i < 2 ? 0.25 : 1};${i < 2 ? 0.25 : 1}"
              keyTimes="0;0.5;1" dur="${dur}s" repeatCount="indefinite"/>
          </g>`;
        }).join('')}
        ${rect(54, 306, 200, 30, { fill: '#FEF2F2', r: 6 })}
        ${lab(64, 318, 'ESTIMATED WAIT', RED, { size: 7 })}
        ${cycle(244, 330, ['19 MIN', '22 MIN', '17 MIN'], { fill: RED, size: 12, a: 'end', dur: dur })}

        ${rect(302, 50, 240, 300, { fill: WHITE, stroke: GR, r: 14 })}
        ${lab(322, 78, 'OPENLINE', GREEN_TEXT, { size: 8.5 })}
        ${rect(322, 96, 200, 22, { fill: GRW, r: 5 })}
        ${lab(332, 111, 'YOU · POSITION 1 OF 1', GREEN_TEXT, { size: 7.5 })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.24;1" dur="${dur}s" repeatCount="indefinite"/>
          ${rect(322, 132, 200, 74, { fill: '#F9FAFB', r: 10 })}
          ${t(336, 158, 'Hi — I can see your', { size: 11.5 })}
          ${t(336, 176, 'Osaka profile. Give me', { size: 11.5 })}
          ${t(336, 194, 'one second.', { size: 11.5 })}
        </g>
        ${rect(322, 306, 200, 30, { fill: GRW, r: 6 })}
        ${lab(332, 318, 'ACTUAL WAIT', GREEN_TEXT, { size: 7 })}
        ${cycle(512, 330, ['0:41', '1:12', '0:58'], { fill: GREEN_TEXT, size: 12, a: 'end', dur: dur })}
        ${lab(34, 396, 'THE QUEUE IS THE PART NOBODY MENTIONS ON THEIR SUPPORT PAGE', GRAY, { size: 8.5 })}`),
    };
  },
};

/* C4 ── Follow the Sun */
export const followSunC = {
  id: 'ct-sun',
  name: 'Follow the Sun',
  family: 'Coverage',
  tagline: 'Why 24/7 is true',
  desc:
    'Three support hubs in three time zones, with the daylight band sweeping across them so one ' +
    'is always awake. "24/7" is the easiest claim on any support page to make and the least ' +
    'believed; this shows the mechanism that makes it true rather than asserting the outcome.',
  pros: ['Explains 24/7 instead of claiming it', 'Handles the global-traveller framing well', 'Attractive as a still frame'],
  cons: ['Reveals where support is staffed', 'Only addresses availability'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: () => {
    const hubs = [['Lisbon', 96, 'EN · PT · ES'], ['Singapore', 288, 'EN · ZH · MS'], ['Austin', 468, 'EN · ES']];
    const dur = 14;
    return {
      pills: noPills,
      svg: wC(`
        ${bg(CW, CH, OR)}
        ${lab(40, 40, 'SOMEONE IS ALWAYS AWAKE', GRAY, { size: 9 })}
        <clipPath id="ct-sun-clip"><rect x="34" y="56" width="${CW - 68}" height="180" rx="14"/></clipPath>
        ${rect(34, 56, CW - 68, 180, { fill: WHITE, stroke: LINE, r: 14 })}
        <g clip-path="url(#ct-sun-clip)">
          <rect x="-300" y="56" width="300" height="180" fill="${ORW}">
            <animate attributeName="x" values="-300;${CW}" dur="${dur}s" repeatCount="indefinite"/></rect>
        </g>
        ${hubs.map(([nm, x, lg], i) => `
          <circle cx="${x}" cy="146" r="9" fill="${WHITE}" stroke="${OR}" stroke-width="2"/>
          <circle cx="${x}" cy="146" r="16" fill="${OR}" opacity="0">
            <animate attributeName="opacity" values="0;0.3;0;0" keyTimes="0;0.06;0.2;1"
              dur="${dur}s" begin="${(i * dur / 3).toFixed(1)}s" repeatCount="indefinite"/>
            <animate attributeName="r" values="9;24;9;9" keyTimes="0;0.1;0.2;1"
              dur="${dur}s" begin="${(i * dur / 3).toFixed(1)}s" repeatCount="indefinite"/></circle>
          ${t(x, 178, nm, { size: 13, w: 700, a: 'middle' })}
          ${lab(x, 196, lg, MUT, { size: 8, a: 'middle' })}`).join('')}

        ${rect(34, 252, CW - 68, 98, { fill: WHITE, stroke: LINE, r: 14 })}
        ${lab(56, 280, 'ON SHIFT NOW', GRAY, { size: 8.5 })}
        ${hubs.map(([nm], i) => `<g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${(i / 3).toFixed(3)};${(i / 3 + 0.03).toFixed(3)};${((i + 1) / 3 - 0.03).toFixed(3)};${((i + 1) / 3).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite"/>
          ${t(56, 322, nm, { size: 22, w: 700 })}
          ${rect(CW - 178, 300, 120, 26, { fill: GRW, r: 13 })}
          ${lab(CW - 166, 317, 'AWAKE · ANSWERING', GREEN_TEXT, { size: 7.5 })}
        </g>`).join('')}
        ${lab(40, 396, 'NO NIGHT SHIFT ANYWHERE — JUST THREE DAY SHIFTS', GRAY, { size: 8.5 })}`),
    };
  },
};

/* C5 ── One Reply */
export const oneReply = {
  id: 'ct-onereply',
  name: 'One Reply',
  family: 'Proof',
  tagline: 'Solved without a second message',
  desc:
    'The metric nobody publishes and everybody cares about: how often a problem is fixed on the ' +
    'first reply, with no escalation, no ticket number and no "can you confirm your order ID". A ' +
    'question lands, the answer resolves it, and the counter of first-reply resolutions ticks up. ' +
    'It is a harder promise than a response time and a much better one.',
  pros: ['A genuinely uncommon and strong metric', 'Implicitly attacks ticket-shuffling support', 'Concrete and checkable'],
  cons: ['Only works if the number is genuinely high', 'Needs instrumentation to report honestly'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 3 },
  build: () => {
    const dur = 10;
    return {
      pills: noPills,
      svg: wC(`
        ${bg(CW, CH, OR)}
        ${rect(36, 44, CW - 72, 236, { fill: WHITE, stroke: LINE, r: 16 })}
        ${lab(60, 72, 'ONE EXCHANGE', GRAY, { size: 8.5 })}
        ${bubble(60, 82, 286, 44, true, '', ['Charged twice for the same plan'])}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.2;0.3;1" dur="${dur}s" repeatCount="indefinite"/>
          ${bubble(CW - 350, 140, 290, 80, false, '', ['Confirmed — a duplicate on 14 Sep.', 'Refunded to the original card,', 'you will see it in two days.', 'Nothing else needed from you.'])}
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.42;0.5;1" dur="${dur}s" repeatCount="indefinite"/>
          ${rect(60, 232, 218, 28, { fill: GRW, r: 14 })}
          ${tick(74, 246, GR, 0.85)}
          ${lab(94, 250, 'RESOLVED · NO ESCALATION', GREEN_TEXT, { size: 7.5 })}
        </g>

        ${rect(36, 296, CW - 72, 84, { fill: '#F9FAFB', r: 14 })}
        ${lab(60, 322, 'FIXED ON THE FIRST REPLY', GRAY, { size: 8.5 })}
        ${cycle(CW - 60, 356, ['91%', '92%', '91%'], { fill: OR, size: 34, a: 'end', dur: dur })}
        ${t(60, 356, 'of conversations this month', { size: 12, fill: MUT })}
        ${lab(36, 404, 'NO TICKET NUMBER. NO ORDER ID. NO SECOND MESSAGE.', GRAY, { size: 8.5 })}`),
    };
  },
};

/* C6 ── Ask Anything */
export const askAnything = {
  id: 'ct-ask',
  name: 'Ask Anything',
  family: 'Scope',
  tagline: 'The four topics, each with a real question',
  desc:
    'The copy lists what support covers — eSIMs, connectivity, billing, technical issues — and ' +
    'then shows none of it. This types a genuine question from each category and answers it in a ' +
    'line, cycling through all four. It demonstrates competence across the stated scope, which is ' +
    'more reassuring than any response-time figure.',
  pros: ['Covers the full stated scope', 'Each answer demonstrates real product knowledge', 'Doubles as FAQ seeding'],
  cons: ['Four cycles is slow to watch through', 'Answers must stay accurate as the product changes'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: () => {
    const qa = [
      ['eSIM', 'Can I keep my normal number?', 'Yes — your physical SIM stays active for calls and texts.'],
      ['Connectivity', 'Which network will I get in Japan?', 'Whichever is strongest where you are — we switch automatically.'],
      ['Billing', 'What happens to unused data?', 'It expires with the plan. We will tell you before it does.'],
      ['Technical', 'My phone says "no service".', 'Usually data roaming is off. Two taps — here is where.'],
    ];
    const dur = 20, each = dur / qa.length;
    return {
      pills: noPills,
      svg: wC(`
        ${bg(CW, CH, OR)}
        ${['eSIM', 'Connectivity', 'Billing', 'Technical'].map((c, i) => {
          const x = 38 + i * 128;
          const on = (i * each / dur).toFixed(4), off = ((i * each + each * 0.92) / dur).toFixed(4);
          return `${rect(x, 44, 118, 30, { fill: WHITE, stroke: LINE, r: 15 })}
            <rect x="${x}" y="44" width="118" height="30" rx="15" fill="${ORW}" opacity="0">
              <animate attributeName="opacity" values="0;0;1;1;0;0"
                keyTimes="0;${on};${(+on + 0.01).toFixed(4)};${off};${(+off + 0.01).toFixed(4)};1"
                dur="${dur}s" repeatCount="indefinite"/></rect>
            ${t(x + 59, 63, c, { size: 11.5, w: 600, a: 'middle' })}`;
        }).join('')}

        ${rect(36, 92, CW - 72, 244, { fill: WHITE, stroke: LINE, r: 16 })}
        ${qa.map(([cat, q, a], i) => {
          const on = (i * each / dur).toFixed(4), off = ((i * each + each * 0.92) / dur).toFixed(4);
          const wrapA = a.length > 48 ? [a.slice(0, a.lastIndexOf(' ', 48)), a.slice(a.lastIndexOf(' ', 48) + 1)] : [a];
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0;0"
              keyTimes="0;${on};${(+on + 0.012).toFixed(4)};${(+off - 0.012).toFixed(4)};${off};1"
              dur="${dur}s" repeatCount="indefinite"/>
            ${lab(60, 124, 'ASKED', GRAY, { size: 8.5 })}
            ${bubble(60, 134, 356, 42, true, '', [q])}
            ${lab(CW - 60, 204, 'ANSWERED', GRAY, { size: 8.5, a: 'end' })}
            ${bubble(CW - 416, 214, 356, wrapA.length > 1 ? 60 : 44, false, '', wrapA)}
          </g>`;
        }).join('')}
        ${lab(36, 364, 'ESIMS · CONNECTIVITY · BILLING · TECHNICAL', GRAY, { size: 8.5 })}
        ${lab(36, 384, 'EVERY ANSWER HERE IS THE REAL ONE', GRAY, { size: 8.5, op: 0.7 })}`),
    };
  },
};

/* C7 ── Ninety-Eight */
export const ninetyEight = {
  id: 'ct-98',
  name: 'Ninety-Eight',
  family: 'Proof',
  tagline: 'The satisfaction figure, built from its parts',
  desc:
    'A 98% satisfaction score is a number a reader has no way to check, so this builds it out of ' +
    'the individual ratings that produced it — a grid of one hundred marks filling in, ninety-eight ' +
    'positive and two not, with the two left visible. Showing the failures is what makes the ' +
    'ninety-eight credible.',
  pros: ['Admitting the two makes the ninety-eight land', 'Makes an abstract score concrete', 'Cheap to run'],
  cons: ['Requires willingness to show the negatives', 'One metric only'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: () => {
    const dur = 9;
    return {
      pills: noPills,
      svg: wC(`
        ${bg(CW, CH, OR)}
        ${lab(40, 42, 'LAST HUNDRED CONVERSATIONS, RATED', GRAY, { size: 9 })}
        ${rect(36, 56, CW - 72, 224, { fill: WHITE, stroke: LINE, r: 16 })}
        ${Array.from({ length: 100 }, (_, i) => {
          const bad = i === 37 || i === 81;
          const x = 60 + (i % 20) * 23, y = 84 + ((i / 20) | 0) * 38;
          return `<rect x="${x}" y="${y}" width="16" height="26" rx="4" fill="#F3F4F6"/>
            <rect x="${x}" y="${y}" width="16" height="26" rx="4" fill="${bad ? RED : OR}" opacity="0">
              <animate attributeName="opacity" values="0;${bad ? 0.9 : 0.85};${bad ? 0.9 : 0.85}"
                keyTimes="0;${(0.04 + i * 0.006).toFixed(4)};1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/></rect>`;
        }).join('')}
        ${rect(36, 300, 262, 80, { fill: '#F9FAFB', r: 14 })}
        ${lab(58, 326, 'SATISFIED', GRAY, { size: 8.5 })}
        ${t(278, 360, '98', { m: true, size: 36, w: 700, a: 'end', fill: OR })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.82;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(314, 300, CW - 350, 80, { fill: '#FEF2F2', r: 14 })}
          ${lab(336, 326, 'NOT SATISFIED', RED, { size: 8.5 })}
          ${t(CW - 58, 360, '2', { m: true, size: 36, w: 700, a: 'end', fill: RED })}
          ${t(336, 356, 'Both followed up by a human', { size: 10.5, fill: MUT })}
        </g>
        ${lab(36, 404, 'WE SHOW THE TWO BECAUSE OTHERWISE THE NINETY-EIGHT MEANS NOTHING', GRAY, { size: 8 })}`),
    };
  },
};

/* C8 ── Before You Ask */
export const beforeYouAsk = {
  id: 'ct-before',
  name: 'Before You Ask',
  family: 'Utility',
  tagline: 'The answer arrives while you are typing',
  desc:
    'The page has two buttons — live chat and the FAQ — and no sense of which to use. This shows ' +
    'the useful behaviour: as a question is typed, the matching answer surfaces underneath, and ' +
    'the chat option remains for when it does not help. It is the only option here that is a ' +
    'product suggestion as much as an animation.',
  pros: ['Reduces support load if built for real', 'Resolves the two-button ambiguity', 'Useful rather than decorative'],
  cons: ['Implies a search feature that must then exist', 'Less emotionally warm than the people options'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 3 },
  build: () => {
    const typed = 'why is my esim not act';
    const dur = 11;
    return {
      pills: noPills,
      svg: wC(`
        ${bg(CW, CH, OR)}
        ${rect(36, 54, CW - 72, 56, { fill: WHITE, stroke: LINE, r: 14 })}
        <circle cx="66" cy="82" r="8" fill="none" stroke="${GRAY}" stroke-width="1.8"/>
        <path d="M 72 88 L 78 94" stroke="${GRAY}" stroke-width="1.8" stroke-linecap="round"/>
        <text x="94" y="88" font-size="14" fill="${INK}">
          ${typed.split('').map((ch, i) => `<tspan opacity="0">${ch === ' ' ? '&#160;' : ch}<animate attributeName="opacity" values="0;1;1" keyTimes="0;${(0.02 + i * 0.012).toFixed(4)};1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/></tspan>`).join('')}
        </text>
        <rect x="${94 + typed.length * 7.6}" y="74" width="1.6" height="17" fill="${OR}">
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"/></rect>

        ${[['Your eSIM will not activate', 'Nine times out of ten this is data roaming. Two taps to fix.'],
           ['Activation stuck on "pending"', 'The profile was issued to a different device. We can reissue it.'],
           ['No service after landing', 'Check the network is selected manually — here is how.']].map(([h, b], i) => {
          const y = 132 + i * 78;
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.3 + i * 0.08).toFixed(3)};${(0.38 + i * 0.08).toFixed(3)};1"
              dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
            ${rect(36, y, CW - 72, 66, { fill: WHITE, stroke: i === 0 ? OR : LINE, r: 12 })}
            ${i === 0 ? rect(36, y, 3, 66, { fill: OR, r: 0 }) : ''}
            ${t(60, y + 26, h, { size: 13, w: 700 })}
            ${t(60, y + 48, b, { size: 11, fill: MUT })}
          </g>`;
        }).join('')}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.76;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(36, 370, 244, 34, { fill: ORW, r: 8 })}
          ${t(158, 392, 'Still stuck? Open live chat', { size: 12, w: 700, a: 'middle', fill: OR })}
          ${lab(CW - 36, 392, '3 AGENTS ONLINE', GRAY, { size: 8, a: 'end' })}
        </g>`),
    };
  },
};

/* C9 ── The Transcript */
export const transcript = {
  id: 'ct-transcript',
  name: 'The Transcript',
  family: 'People',
  tagline: 'A real conversation, at its real pace',
  desc:
    'One anonymised conversation playing out end to end — the question, the clarifying reply, the ' +
    'fix, the confirmation — at something close to real speed. It shows tone, which is the thing ' +
    'a reader is actually judging when they decide whether contacting support will be pleasant, ' +
    'and no metric can convey it.',
  pros: ['Conveys tone, which metrics cannot', 'Feels honest because it is unedited', 'Simple to build'],
  cons: ['Slowest of the ten to watch', 'Needs a real transcript and permission to use it'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: () => {
    const msgs = [
      [1, ['Hi — landed in Tokyo, eSIM shows', 'no service. Flight was long, I am', 'not thinking straight.']],
      [0, ['No problem at all. Can you tell me', 'if data roaming is on?']],
      [1, ['...it was not. It is now.']],
      [0, ['That will be it. Give it thirty', 'seconds — and welcome to Tokyo.']],
      [1, ['Working. Thank you, genuinely.']],
    ];
    const dur = 16;
    let y = 58;
    return {
      pills: noPills,
      svg: wC(`
        ${bg(CW, CH, OR)}
        ${lab(40, 40, 'AN ACTUAL CONVERSATION, UNEDITED', GRAY, { size: 9 })}
        ${msgs.map(([mine, lines], i) => {
          const h = 22 + lines.length * 17;
          const w = 300;
          const x = mine ? 40 : CW - 40 - w;
          const yy = y; y += h + 12;
          const on = (0.04 + i * 0.17).toFixed(3);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${(+on + 0.03).toFixed(3)};1"
              dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
            ${rect(x, yy, w, h, { fill: mine ? '#F3F4F6' : OR, r: 13 })}
            ${lines.map((ln, j) => t(x + 14, yy + 20 + j * 17, ln, { size: 11.5, fill: mine ? INK : WHITE })).join('')}
          </g>`;
        }).join('')}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.9;0.96;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${lab(40, 406, 'RESOLVED IN 4 MESSAGES · 3 MIN 12 S · RATED 5/5', GREEN_TEXT, { size: 8.5 })}
        </g>`),
    };
  },
};

/* C10 ── Two Doors */
export const twoDoors = {
  id: 'ct-doors',
  name: 'Two Doors',
  family: 'Utility',
  tagline: 'Which button, and why',
  desc:
    'The page offers live chat and the FAQ with no guidance, so readers pick wrong and are ' +
    'disappointed by whichever they chose. This splits them honestly: the FAQ for the twelve ' +
    'questions everyone asks, answered instantly, and chat for anything about your specific ' +
    'line, answered by a person. Both sides fill in as you watch.',
  pros: ['Fixes a real usability problem on the page', 'Sets correct expectations for each route', 'Makes the FAQ feel substantial'],
  cons: ['Least dramatic option', 'Requires the FAQ to actually be good'],
  scores: { story: 3, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: () => {
    const dur = 10;
    return {
      pills: noPills,
      svg: wC(`
        ${bg(CW, CH, OR)}
        ${[[34, 'FAQ', 'For the twelve questions', 'everyone asks', 'Instant', '#F9FAFB', GRAY],
           [302, 'LIVE CHAT', 'For anything about', 'your specific line', '< 2 min', ORW, OR]].map(([x, ttl, l1, l2, speed, fill, col], i) => `
          ${rect(x, 52, 240, 300, { fill: WHITE, stroke: i ? OR : LINE, r: 14 })}
          ${rect(x, 52, 240, 66, { fill, r: 14 })}
          ${rect(x, 104, 240, 14, { fill, r: 0 })}
          ${lab(x + 22, 80, ttl, col, { size: 9 })}
          ${t(x + 22, 104, speed, { m: true, size: 17, w: 700, fill: col })}
          ${t(x + 22, 146, l1, { size: 12.5, fill: MUT })}
          ${t(x + 22, 164, l2, { size: 12.5, fill: MUT })}
          ${(i === 0
            ? ['How do I install?', 'Will I keep my number?', 'What if I run out of data?', 'Which phones work?']
            : ['My line will not activate', 'Charged twice this month', 'Which network am I on?', 'Refund for an unused plan'])
            .map((q, j) => `<g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.12 + j * 0.13 + i * 0.05).toFixed(3)};${(0.2 + j * 0.13 + i * 0.05).toFixed(3)};1"
                dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
              ${rect(x + 22, 186 + j * 38, 196, 30, { fill: i ? '#FFFDFB' : '#F3F4F6', r: 7, stroke: i ? ORS : null })}
              ${t(x + 34, 205 + j * 38, q, { size: 10.5, fill: INK })}
              ${i === 0 ? tick(x + 196, 199 + j * 38, GR, 0.7) : ''}
            </g>`).join('')}`).join('')}
        ${lab(34, 398, 'BOTH DOORS ARE OPEN — THEY ARE JUST FOR DIFFERENT QUESTIONS', GRAY, { size: 8.5 })}`),
    };
  },
};

/* C11 ── Bot Or Human */
export const botOrHuman = {
  id: 'ct-bothuman',
  name: 'Bot Or Human',
  family: 'Honesty',
  tagline: 'Every message says who wrote it',
  desc:
    'The page promises an AI assistant and live agents in the same breath and never says which one ' +
    'you get. This labels every message. The assistant answers the network question instantly from ' +
    'the help centre, refuses the billing question rather than guessing, and hands over to Mei, who ' +
    'fixes it. A tally underneath gives the real split for the day \u2014 44 of 61 conversations ' +
    'never needed a person.',
  pros: ['Uses the AI assistant the page advertises and no other option touches',
    'An assistant that admits its limits is more reassuring than one that does not',
    'Sets the right expectation before the first message'],
  cons: ['Admits most answers are automated, which some readers will dislike',
    'The handover has to be this clean in practice',
    'Three stacked messages leave little room for anything else'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 4, brand: 4, ease: 3 },
  build: () => {
    const dur = 13;
    return {
      pills: noPills,
      svg: wC(`
        ${bg(CW, CH, OR)}
        ${lab(40, 38, 'WHO IS ACTUALLY ANSWERING', GRAY, { size: 9 })}
        ${rect(32, 48, 512, 292, { fill: WHITE, stroke: LINE, r: 16 })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.06;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${lab(54, 74, 'YOU', GRAY, { size: 8.5 })}
          ${bubble(54, 80, 300, 58, true, '', ['Which network will I get in Japan?',
            'And why was I charged twice?'])}
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.24;0.32;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${lab(522, 160, 'ASSISTANT \u00B7 AUTOMATED', GRAY, { size: 8.5, a: 'end' })}
          ${rect(202, 166, 320, 74, { fill: '#F9FAFB', r: 12, stroke: LINE })}
          ${t(216, 190, 'Japan: whichever network is', { size: 11.5, fill: INK })}
          ${t(216, 206, 'strongest \u2014 that one is in the', { size: 11.5, fill: INK })}
          ${t(216, 222, 'help centre. The charge I will not guess.', { size: 11.5, fill: INK })}
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.54;0.62;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${lab(522, 262, 'MEI \u00B7 A PERSON', GREEN_TEXT, { size: 8.5, a: 'end' })}
          ${rect(202, 268, 320, 58, { fill: WHITE, stroke: GR, sw: 1.5, r: 12 })}
          ${t(216, 292, 'Duplicate on 14 Sep \u2014 refunded to', { size: 11.5, fill: INK })}
          ${t(216, 308, 'the same card. Nothing else needed.', { size: 11.5, fill: INK })}
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.78;0.86;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(32, 352, 512, 44, { fill: '#F9FAFB', r: 12 })}
          ${t(54, 380, '61 conversations today', { size: 12.5, fill: MUT })}
          ${t(522, 380, '44 ASSISTANT \u00B7 17 A PERSON', { m: true, size: 11, w: 700, a: 'end', fill: INK })}
        </g>
        ${lab(32, 414, 'THE PAGE PROMISES BOTH \u2014 THIS SAYS WHICH ONE YOU HAVE', GRAY, { size: 8 })}`),
    };
  },
};

/* C12 ── Eight Languages */
export const eightLanguages = {
  id: 'ct-eight',
  name: 'Eight Languages',
  family: 'Typography',
  tagline: 'The same question, eight ways',
  desc:
    '"8 languages" sits in the support grid as a bare number. This makes it the artwork: one real ' +
    'question \u2014 will I keep my number \u2014 set large and cycling through all eight, with the ' +
    'English gloss underneath and the eight chips lighting in turn. No illustration, no card, no ' +
    'metric; the type carries it. For a company selling to people who are abroad, the language you ' +
    'can complain in matters more than a response time.',
  pros: ['Turns a listed number into something a reader feels',
    'Non-Latin scripts make the claim instantly credible',
    'Cheapest option here to keep accurate as the language list grows'],
  cons: ['Proves nothing about speed or competence',
    'Needs a native check on all eight strings before it ships',
    'Eight cycles is a long loop to watch through'],
  scores: { story: 4, motion: 2, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: () => {
    const qs = [
      ['English', 'Will I keep my number?'],
      ['Espa\u00F1ol', '\u00BFConservo mi n\u00FAmero?'],
      ['Portugu\u00EAs', 'Mantenho o meu n\u00FAmero?'],
      ['Fran\u00E7ais', 'Je garde mon num\u00E9ro ?'],
      ['Deutsch', 'Behalte ich meine Nummer?'],
      ['\u65E5\u672C\u8A9E', '\u756A\u53F7\u306F\u305D\u306E\u307E\u307E\uFF1F'],
      ['\u4E2D\u6587', '\u53F7\u7801\u4F1A\u4FDD\u7559\u5417\uFF1F'],
      ['T\u00FCrk\u00E7e', 'Numaram\u0131 koruyor muyum?'],
    ];
    const dur = 16, each = dur / qs.length;
    return {
      pills: noPills,
      svg: wC(`
        ${bg(CW, CH, OR)}
        ${lab(40, 38, 'ASK IN WHICHEVER ONE IS EASIEST', GRAY, { size: 9 })}
        ${rect(32, 54, 512, 150, { fill: WHITE, stroke: LINE, r: 16 })}
        ${qs.map(([lg, q], i) => {
          const on = ((i * each) / dur).toFixed(4);
          const off = ((i * each + each * 0.92) / dur).toFixed(4);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0;0"
              keyTimes="0;${on};${(+on + 0.012).toFixed(4)};${(+off - 0.012).toFixed(4)};${off};1"
              dur="${dur}s" repeatCount="indefinite"/>
            ${t(56, 136, q, { size: 24, w: 700 })}
            ${lab(522, 96, lg, OR, { size: 9, a: 'end' })}
          </g>`;
        }).join('')}
        ${t(56, 170, '\u201CWill I keep my number?\u201D', { size: 12.5, fill: MUT })}
        ${lab(56, 192, 'ANSWERED IN THE LANGUAGE IT WAS ASKED IN', GRAY, { size: 8 })}
        ${qs.map(([lg], i) => {
          const col = i % 4, row = (i / 4) | 0;
          const x = 32 + col * 131, y = 228 + row * 52;
          const on = ((i * each) / dur).toFixed(4);
          const off = ((i * each + each * 0.92) / dur).toFixed(4);
          return `${rect(x, y, 119, 44, { fill: WHITE, stroke: LINE, r: 10 })}
            <rect x="${x}" y="${y}" width="119" height="44" rx="10" fill="${ORW}" stroke="${OR}"
              stroke-width="1.5" opacity="0">
              <animate attributeName="opacity" values="0;0;1;1;0;0"
                keyTimes="0;${on};${(+on + 0.008).toFixed(4)};${off};${(+off + 0.004).toFixed(4)};1"
                dur="${dur}s" repeatCount="indefinite"/></rect>
            ${t(x + 59.5, y + 27, lg, { size: 12.5, w: 600, a: 'middle' })}`;
        }).join('')}
        ${rect(32, 340, 512, 44, { fill: '#F9FAFB', r: 12 })}
        ${t(54, 368, '8 languages \u00B7 500+ help articles \u00B7 one chat window', { size: 12.5, fill: MUT })}
        ${lab(32, 410, 'THE PAGE STATES EIGHT LANGUAGES AND SHOWS ONE', GRAY, { size: 8.5 })}`),
    };
  },
};

/* C13 ── Peak Hours */
export const peakHours = {
  id: 'ct-peak',
  name: 'Peak Hours',
  family: 'Data',
  tagline: 'Every hour of yesterday, and what it cost you',
  desc:
    'The support grid claims 24/7 and then admits "peak hours: 9 AM \u2013 9 PM EST" further down ' +
    'the page, which reads as a get-out. This shows both honestly: a bar per hour of yesterday, the ' +
    'peak window marked, and the median time to a first reply for each quarter of the day \u2014 41 ' +
    'seconds in the afternoon, two minutes eighteen overnight. It is the only dark option on this ' +
    'board, and the only one that publishes its worst case.',
  pros: ['Reconciles 24/7 with the peak-hours caveat instead of hiding it',
    'Naming the slowest reply of the day buys trust for the fast ones',
    'Dark treatment sets it apart from every other option here'],
  cons: ['Publishes the fact that nights are slower',
    'A dark block on a white page needs the page around it to allow it',
    'Needs real per-hour data, refreshed'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 3, brand: 3, ease: 3 },
  build: () => {
    const hrs = [0.22, 0.16, 0.13, 0.11, 0.12, 0.16, 0.24, 0.38, 0.52, 0.72, 0.86, 0.94,
      0.90, 0.88, 0.92, 0.97, 1.00, 0.92, 0.84, 0.76, 0.64, 0.52, 0.38, 0.28];
    const dur = 12, base = 286, maxH = 168;
    return {
      pills: noPills,
      svg: wC(`
        <rect width="${CW}" height="${CH}" fill="#0D1117"/>
        <circle cx="${CW - 70}" cy="60" r="150" fill="${OR}" opacity="0.08"/>
        ${lab(40, 40, 'EVERY HOUR YESTERDAY', WHITE, { size: 9, op: 0.5 })}
        ${t(40, 70, 'Someone answered in all 24', { size: 18, w: 700, fill: WHITE })}
        ${rect(225, 100, 260, 200, { fill: 'rgba(255,255,255,0.05)', r: 8 })}
        ${lab(233, 118, 'PEAK \u00B7 9 AM \u2013 9 PM EST', WHITE, { size: 8, op: 0.45 })}
        ${hrs.map((v, i) => {
          const x = 48 + i * 20, h = (maxH * v).toFixed(1), y = (base - maxH * v).toFixed(1);
          const on = (i / hrs.length).toFixed(4);
          return `<rect x="${x}" y="${y}" width="14" height="${h}" rx="3" fill="rgba(255,255,255,0.14)"/>
            <rect x="${x}" y="${y}" width="14" height="${h}" rx="3" fill="${OR}" opacity="0">
              <animate attributeName="opacity" values="0;0;0.95;0.95;0;0"
                keyTimes="0;${on};${(+on + 0.006).toFixed(4)};${(+on + 0.024).toFixed(4)};${(+on + 0.03).toFixed(4)};1"
                dur="${dur}s" repeatCount="indefinite"/></rect>`;
        }).join('')}
        <line x1="48" y1="${base + 4}" x2="${CW - 48}" y2="${base + 4}"
          stroke="rgba(255,255,255,0.16)" stroke-width="1.5"/>
        ${[[0, '00'], [6, '06'], [12, '12'], [18, '18'], [23, '23']].map(([h, s]) =>
          lab(48 + h * 20 + 7, base + 20, s, WHITE, { size: 8, a: 'middle', op: 0.4 })).join('')}
        ${lab(48, 336, 'MEDIAN TIME TO FIRST REPLY', WHITE, { size: 8.5, op: 0.45 })}
        ${cycle(CW - 48, 344, ['00\u201306 \u00B7 2M 18S', '06\u201312 \u00B7 1M 04S',
          '12\u201318 \u00B7 41S', '18\u201324 \u00B7 52S'], { fill: WHITE, size: 16, a: 'end', dur })}
        ${lab(48, 374, 'SLOWEST YESTERDAY: 4M 11S AT 03:40 \u00B7 STILL ANSWERED', WHITE, { size: 8.5, op: 0.4 })}
        ${lab(48, 400, 'THE NIGHT IS SLOWER. IT IS NOT CLOSED.', OR, { size: 9 })}`),
    };
  },
};

/* C14 ── Out Of Scope */
export const cannotFix = {
  id: 'ct-limits',
  name: 'Out Of Scope',
  family: 'Limits',
  tagline: 'The four problems support cannot solve',
  desc:
    'Every support page lists what it can do. This lists what it cannot \u2014 a carrier-locked ' +
    'handset, a national network outage, data you have already spent, a QR code that has been ' +
    'scanned \u2014 and beside each one, exactly what happens instead: a full refund, a switch to ' +
    'another network, an honest breakdown, a free reissue. Naming the limits is the strongest ' +
    'possible way of saying the rest is true.',
  pros: ['Nothing else in the category does this, so it is memorable',
    'Pre-empts the four complaints support actually receives',
    'Every line is a commitment the company can keep'],
  cons: ['A list of negatives on a hero needs nerve to sign off',
    'Each promised remedy becomes a policy',
    'No motion worth watching twice'],
  scores: { story: 5, motion: 2, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: () => {
    const rows = [
      ['A phone that is carrier-locked', 'We say so in the first reply and refund in full'],
      ['A network outage where you are', 'We switch you to another network we carry, and name the one that failed'],
      ['Data you have already used', 'We cannot re-credit it \u2014 we can show you what spent it'],
      ['A QR code that has been scanned', 'We reissue the profile once, free'],
    ];
    const dur = 12;
    return {
      pills: noPills,
      svg: wC(`
        ${bg(CW, CH, OR)}
        ${lab(40, 44, 'FOUR THINGS SUPPORT CANNOT FIX', GRAY, { size: 9 })}
        ${rows.map(([no, yes], i) => {
          const y = 62 + i * 74;
          const on = (0.05 + i * 0.13).toFixed(3);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${(+on + 0.05).toFixed(3)};1"
              dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
            ${rect(36, y, 504, 64, { fill: WHITE, stroke: LINE, r: 12 })}
            <circle cx="66" cy="${y + 32}" r="13" fill="#F3F4F6"/>
            <path d="M 61 ${y + 27} l 10 10 M 71 ${y + 27} l -10 10" stroke="${MUT}" stroke-width="2"
              stroke-linecap="round"/>
            ${t(96, y + 27, no, { size: 13.5, w: 700 })}
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(+on + 0.06).toFixed(3)};${(+on + 0.1).toFixed(3)};1"
                dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
              ${tick(96, y + 44, GR, 0.8)}
              ${t(114, y + 49, yes, { size: 10.5, fill: MUT })}
            </g>
          </g>`;
        }).join('')}
        ${lab(36, 384, 'AND WHAT HAPPENS INSTEAD, EVERY TIME', GRAY, { size: 8.5 })}
        ${lab(36, 410, 'A PAGE THAT NAMES ITS LIMITS IS THE ONE WORTH BELIEVING', GRAY, { size: 8, op: 0.75 })}`),
    };
  },
};

/* C15 ── In Your Pocket */
export const inYourPocket = {
  id: 'ct-pocket',
  name: 'In Your Pocket',
  family: 'Product demo',
  tagline: 'The widget, on the phone, at 02:40 local',
  desc:
    'The page describes the chat widget in the bottom-right corner of every page and then never ' +
    'shows it. This does: a phone at 02:40 in Osaka, the orange chat icon pulsing, the widget ' +
    'opening, and the answer arriving \u2014 turn on data roaming, Settings then Mobile Data. The ' +
    'note beside it explains why anyone is awake: it is 13:40 in Lisbon. Support seen from the ' +
    'traveller\u2019s side rather than the company\u2019s.',
  pros: ['Shows the actual interface a reader will use, in the place they will use it',
    'Explains 24/7 from the customer\u2019s time zone, not the org chart',
    'The answer it gives is the real fix from the installation guide'],
  cons: ['Phone chrome plus widget chrome is a lot of detail at 390px',
    'Only demonstrates one question',
    'The widget mock has to track whatever Zendesk actually renders'],
  scores: { story: 4, motion: 4, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: () => {
    const dur = 12;
    return {
      pills: noPills,
      svg: wC(`
        ${bg(CW, CH, OR)}
        ${rect(52, 46, 176, 316, { fill: INK, r: 26 })}
        ${rect(60, 54, 160, 300, { fill: WHITE, r: 20 })}
        ${rect(120, 60, 40, 5, { fill: INK, r: 2.5 })}
        ${lab(74, 84, '02:40', MUT, { size: 8 })}
        ${lab(206, 84, 'OSAKA', MUT, { size: 8, a: 'end' })}
        ${rect(74, 96, 132, 10, { fill: '#F3F4F6', r: 5 })}
        ${rect(74, 114, 100, 8, { fill: '#F3F4F6', r: 4 })}
        ${rect(74, 130, 118, 8, { fill: '#F3F4F6', r: 4 })}
        <g opacity="1">
          <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.28;0.34;0.94;1"
            dur="${dur}s" repeatCount="indefinite"/>
          ${rect(74, 152, 132, 8, { fill: '#F3F4F6', r: 4 })}
          ${rect(74, 168, 112, 8, { fill: '#F3F4F6', r: 4 })}
          <circle cx="188" cy="320" r="26" fill="${OR}" opacity="0.18">
            <animate attributeName="r" values="18;30;18" keyTimes="0;0.5;1" dur="2.4s"
              repeatCount="indefinite"/>
          </circle>
          <circle cx="188" cy="320" r="18" fill="${OR}"/>
          ${rect(180, 314, 16, 11, { fill: WHITE, r: 3 })}
          ${lab(74, 324, 'EVERY PAGE, BOTTOM RIGHT', MUT, { size: 7 })}
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.3;0.36;0.94;1"
            dur="${dur}s" repeatCount="indefinite"/>
          ${rect(68, 158, 144, 188, { fill: WHITE, stroke: LINE, r: 14 })}
          ${rect(68, 158, 144, 30, { fill: ORW, r: 14 })}
          ${rect(68, 174, 144, 14, { fill: ORW, r: 0 })}
          ${lab(82, 178, 'OPENLINE SUPPORT', OR, { size: 7 })}
          ${rect(84, 198, 112, 34, { fill: OR, r: 10 })}
          ${t(94, 212, 'No service since I', { size: 9, fill: WHITE })}
          ${t(94, 224, 'landed in Osaka', { size: 9, fill: WHITE })}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.52;0.6;1" dur="${dur}s"
              repeatCount="indefinite" fill="freeze"/>
            ${rect(84, 242, 112, 58, { fill: '#F3F4F6', r: 10 })}
            ${t(94, 258, 'Data roaming is off.', { size: 9, fill: INK })}
            ${t(94, 270, 'Settings \u203A Mobile Data', { size: 9, fill: INK })}
            ${t(94, 282, '\u203A Openline \u203A Roaming on.', { size: 9, fill: INK })}
            ${rect(84, 308, 112, 20, { fill: GRW, r: 10 })}
            ${lab(94, 321, 'MEI \u00B7 02:41 LOCAL', GREEN_TEXT, { size: 7 })}
          </g>
        </g>
        ${lab(256, 66, 'THE WIDGET THE PAGE DESCRIBES', GRAY, { size: 8.5 })}
        ${[['Tap the chat icon', 'Bottom right, on every page'],
           ['Ask in your own words', 'Or search the 500+ help articles'],
           ['Get the actual fix', 'Not a ticket number, the setting']].map(([h, s], i) => {
          const y = 96 + i * 54;
          const on = (0.1 + i * 0.16).toFixed(3);
          return `<g>
            ${t(280, y + 14, h, { size: 13.5, w: 700 })}
            ${t(280, y + 34, s, { size: 10.5, fill: MUT })}
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${(+on + 0.05).toFixed(3)};1"
                dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
              ${tick(258, y + 9, GR, 0.9)}
            </g>
          </g>`;
        }).join('')}
        ${rect(256, 264, 288, 84, { fill: '#F9FAFB', r: 12 })}
        ${t(276, 294, 'It is 02:40 in Osaka.', { size: 13.5, w: 700 })}
        ${t(276, 316, 'It is 13:40 in Lisbon,', { size: 12, fill: MUT })}
        ${t(276, 332, 'where Mei is.', { size: 12, fill: MUT })}
        ${lab(36, 400, '24/7 MEANS THE WIDGET IS AWAKE WHEN YOU ARE', GRAY, { size: 8.5 })}`),
    };
  },
};

export const CONTACT_VARIANTS = [
  contactCurrent, underTwo, threeAgents, noQueue, followSunC, oneReply,
  askAnything, ninetyEight, beforeYouAsk, transcript, twoDoors,
  botOrHuman, eightLanguages, peakHours, cannotFix, inYourPocket,
];

/* ════════════════════════════════════════════════════════════════════════
   /affiliate — 592 × 430
   ════════════════════════════════════════════════════════════════════════ */

export const affilCurrent = {
  id: 'af-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'A frozen earnings card',
  desc:
    'What ships now: a card showing total earnings, a month-on-month change, a conversion count ' +
    'and the next payout date. It is the right information — an affiliate wants to see money — ' +
    'but it is a screenshot, and the figure is somebody else\'s, so it reads as illustrative ' +
    'rather than as evidence.',
  pros: ['Shows money, which is what the audience wants', 'Realistic dashboard framing', 'Clear hierarchy'],
  cons: ['Static, so it reads as a mock-up', 'The number belongs to nobody', 'No sense of how the money accrues'],
  scores: { story: 3, motion: 1, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: () => ({
    pills: noPills,
    svg: wA(`
      ${bg(AW, AH, GR)}
      ${rect(44, 58, AW - 88, 314, { fill: WHITE, stroke: LINE, r: 16 })}
      ${lab(70, 92, 'TOTAL EARNINGS', GRAY, { size: 9 })}
      ${t(70, 138, '$3,247', { m: true, size: 40, w: 700, fill: INK })}
      ${rect(70, 156, 168, 26, { fill: GRW, r: 13 })}
      ${lab(84, 173, '+23% FROM LAST MONTH', GREEN_TEXT, { size: 8 })}
      ${[['Conversions', '42'], ['Conversion rate', '4.96%'], ['Next payout', 'Nov 1 · PayPal']].map(([k, v], i) => {
        const y = 202 + i * 54;
        return `${rect(70, y, AW - 140, 44, { fill: '#F9FAFB', r: 10 })}
          ${t(86, y + 28, k, { size: 12.5, fill: MUT })}
          ${t(AW - 86, y + 28, v, { m: true, size: 13, w: 700, a: 'end' })}`;
      }).join('')}
      ${lab(AW / 2, 402, 'A SCREENSHOT OF SOMEBODY ELSE\u2019S DASHBOARD', GRAY, { a: 'middle', size: 8.5 })}`),
  }),
};

/* A1 ── The Ladder */
export const theLadder = {
  id: 'af-ladder',
  name: 'The Ladder',
  family: 'Money',
  tagline: 'How 30% becomes 40%',
  desc:
    'The headline says 30–40% and never explains the range, which makes the top number feel like ' +
    'marketing. This draws the ladder: the volume thresholds, the rate at each, and a marker ' +
    'climbing from 30 to 40 as sales accumulate. An affiliate deciding whether to bother needs to ' +
    'know exactly what it takes to reach the top rate.',
  pros: ['Answers the obvious question the headline raises', 'Makes the top rate feel attainable', 'No invented earnings figures'],
  cons: ['Commits publicly to specific thresholds', 'Reveals the commission structure to competitors'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: () => {
    const tiers = [['30%', '1 – 24 sales'], ['33%', '25 – 74'], ['36%', '75 – 199'], ['40%', '200+']];
    const dur = 11;
    return {
      pills: noPills,
      svg: wA(`
        ${bg(AW, AH, GR)}
        ${lab(46, 42, 'COMMISSION BY VOLUME', GRAY, { size: 9 })}
        ${tiers.map(([pct, band], i) => {
          const y = AH - 100 - i * 72;
          const w = 200 + i * 78;
          const on = (0.08 + i * 0.2).toFixed(3);
          return `<g>
            ${rect(46, y, w, 56, { fill: WHITE, stroke: LINE, r: 12 })}
            <rect x="46" y="${y}" width="${w}" height="56" rx="12" fill="${GRW}" opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${(+on + 0.05).toFixed(3)};1"
                dur="${dur}s" repeatCount="indefinite" fill="freeze"/></rect>
            ${t(68, y + 36, pct, { m: true, size: 22, w: 700, fill: i === 3 ? GREEN_TEXT : INK })}
            ${lab(134, y + 34, band, MUT, { size: 9 })}
            ${i === 3 ? `<g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.68;0.76;1" dur="${dur}s"
                repeatCount="indefinite" fill="freeze"/>
              ${rect(w - 116, y + 16, 104, 24, { fill: GR, r: 12 })}
              ${lab(w - 100, y + 32, 'TOP RATE', WHITE, { size: 7.5 })}
            </g>` : ''}
          </g>`;
        }).join('')}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="0 0;0 -72;0 -144;0 -216;0 -216" keyTimes="0;0.24;0.46;0.7;1"
            dur="${dur}s" repeatCount="indefinite"/>
          <path d="M ${AW - 74} ${AH - 78} l 11 -9 l 0 18 z" fill="${GR}"/>
          ${lab(AW - 66, AH - 68, 'YOU', GREEN_TEXT, { size: 8 })}
        </g>
        ${lab(46, 40, '', GRAY)}
        ${lab(46, AH - 22, 'EVERY SALE COUNTS TOWARD THE NEXT TIER — RATES NEVER GO DOWN', GRAY, { size: 8.5 })}`),
    };
  },
};

/* A2 ── Ninety Days */
export const ninetyDays = {
  id: 'af-cookie',
  name: 'Ninety Days',
  family: 'Trust',
  tagline: 'The click that still pays two months later',
  desc:
    'Cookie life is listed as "90d" and means nothing to most readers, but it is the term ' +
    'affiliates actually compare between programmes. This shows a click on day zero, the visitor ' +
    'leaving without buying, and a purchase on day sixty-three still attributed and still paid. ' +
    'The long gap is the whole point.',
  pros: ['Explains the term affiliates compare hardest', 'Directly reassuring about attribution', 'One clear narrative'],
  cons: ['Abstract subject matter', 'Needs the attribution rule stated precisely'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: () => {
    const dur = 10;
    const x0 = 64, x1 = AW - 64;
    const at = (d) => x0 + (x1 - x0) * (d / 90);
    return {
      pills: noPills,
      svg: wA(`
        ${bg(AW, AH, GR)}
        ${lab(46, 42, 'NINETY-DAY ATTRIBUTION WINDOW', GRAY, { size: 9 })}
        ${rect(44, 58, AW - 88, 150, { fill: WHITE, stroke: LINE, r: 14 })}
        <line x1="${x0}" y1="150" x2="${x1}" y2="150" stroke="${LINE}" stroke-width="2"/>
        ${[0, 30, 60, 90].map(d => `
          <line x1="${at(d).toFixed(1)}" y1="144" x2="${at(d).toFixed(1)}" y2="156" stroke="${LINE}" stroke-width="2"/>
          ${lab(at(d).toFixed(1), 176, 'DAY ' + d, GRAY, { size: 7.5, a: 'middle' })}`).join('')}
        <rect x="${x0}" y="144" width="0" height="12" rx="6" fill="${GR}" opacity="0.25">
          <animate attributeName="width" values="0;${(x1 - x0).toFixed(0)};${(x1 - x0).toFixed(0)}"
            keyTimes="0;0.6;1" dur="${dur}s" repeatCount="indefinite"/></rect>

        <g>
          <circle cx="${x0}" cy="150" r="7" fill="${GR}"/>
          ${lab(x0, 122, 'CLICK', GREEN_TEXT, { size: 8, a: 'middle' })}
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.16;0.24;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${lab(at(14), 104, 'LEFT WITHOUT BUYING', GRAY, { size: 7.5, a: 'middle' })}
          <circle cx="${at(14).toFixed(1)}" cy="150" r="4" fill="${GRAY}" opacity="0.5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.6;0.7;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          <circle cx="${at(63).toFixed(1)}" cy="150" r="9" fill="${WHITE}" stroke="${GR}" stroke-width="3"/>
          ${lab(at(63).toFixed(1), 122, 'BOUGHT · DAY 63', GREEN_TEXT, { size: 8, a: 'middle' })}
        </g>

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.82;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(44, 224, AW - 88, 106, { fill: GRW, r: 14 })}
          ${lab(70, 252, 'STILL YOURS', GREEN_TEXT, { size: 9 })}
          ${t(70, 292, 'Commission paid', { size: 14, fill: INK })}
          ${t(AW - 70, 296, '$14.80', { m: true, size: 30, w: 700, a: 'end', fill: GREEN_TEXT })}
          ${lab(70, 314, 'ON A $37 PLAN AT 40%', MUT, { size: 8 })}
        </g>
        ${lab(46, AH - 22, 'NINE WEEKS IS LONGER THAN MOST TRAVEL PURCHASES TAKE TO DECIDE', GRAY, { size: 8.5 })}`),
    };
  },
};

/* A3 ── What You Actually Get */
export const actuallyGet = {
  id: 'af-actual',
  name: 'What You Actually Get',
  family: 'Money',
  tagline: 'Percentages converted into dollars',
  desc:
    'Nobody can feel a percentage. This puts the real plan prices beside the commission they pay ' +
    'at 30% and at 40%, so a reader can see that a mid-size plan returns a specific amount of ' +
    'money. It is the most honest option here and the one most likely to make somebody sign up, ' +
    'because it removes the arithmetic.',
  pros: ['Removes the mental arithmetic entirely', 'Uses real plan prices, so it is checkable', 'Makes the 40% tier tangible'],
  cons: ['Anchors on specific prices that may change', 'Less exciting than a big total'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: () => {
    const plans = [['1 GB · 7 days', 4.5], ['5 GB · 30 days', 17], ['20 GB · 30 days', 37], ['Unlimited · 30 days', 59]];
    const dur = 9;
    return {
      pills: noPills,
      svg: wA(`
        ${bg(AW, AH, GR)}
        ${lab(46, 42, 'WHAT ONE SALE PAYS YOU', GRAY, { size: 9 })}
        ${rect(44, 56, AW - 88, 44, { fill: '#F9FAFB', r: 10 })}
        ${lab(66, 84, 'PLAN', GRAY, { size: 8 })}
        ${lab(AW - 230, 84, 'PRICE', GRAY, { size: 8, a: 'end' })}
        ${lab(AW - 146, 84, 'AT 30%', GRAY, { size: 8, a: 'end' })}
        ${lab(AW - 66, 84, 'AT 40%', GREEN_TEXT, { size: 8, a: 'end' })}
        ${plans.map(([nm, px], i) => {
          const y = 108 + i * 62;
          const on = (0.08 + i * 0.14).toFixed(3);
          return `<g>
            ${rect(44, y, AW - 88, 52, { fill: WHITE, stroke: LINE, r: 10 })}
            ${t(66, y + 32, nm, { size: 13, w: 600 })}
            ${t(AW - 230, y + 32, '$' + px.toFixed(2), { m: true, size: 13, a: 'end', fill: MUT })}
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${(+on + 0.05).toFixed(3)};1"
                dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
              ${t(AW - 146, y + 32, '$' + (px * 0.3).toFixed(2), { m: true, size: 14, w: 600, a: 'end', fill: INK })}
            </g>
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(+on + 0.06).toFixed(3)};${(+on + 0.11).toFixed(3)};1"
                dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
              ${rect(AW - 138, y + 12, 78, 28, { fill: GRW, r: 8 })}
              ${t(AW - 68, y + 32, '$' + (px * 0.4).toFixed(2), { m: true, size: 15, w: 700, a: 'end', fill: GREEN_TEXT })}
            </g>
          </g>`;
        }).join('')}
        ${lab(46, AH - 22, 'REAL PLAN PRICES · COMMISSION PAID ON THE PLAN VALUE, NOT A CAPPED BOUNTY',
          GRAY, { size: 8 })}`),
    };
  },
};

/* A4 ── One Link */
export const oneLink = {
  id: 'af-onelink',
  name: 'One Link',
  family: 'Mechanics',
  tagline: 'The same link works in 190 countries',
  desc:
    'An affiliate with an international audience worries about whether a link works everywhere ' +
    'and pays on everything. This shows one link fanning out into purchases across several ' +
    'countries, each returning a commission in the local plan\'s value, all crediting the same ' +
    'account. It answers "will this work for my audience" without a word of copy.',
  pros: ['Addresses a real objection for global creators', 'Visually distinctive', 'No commission structure disclosed'],
  cons: ['Says nothing about how much you earn', 'Map-and-pins is a familiar device'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 3, brand: 4, ease: 4 },
  build: () => {
    const dests = [[118, 128, 'JP', '$14.80'], [232, 96, 'DE', '$6.80'], [352, 148, 'BR', '$4.40'],
      [470, 108, 'US', '$23.60'], [176, 210, 'SG', '$9.20'], [412, 224, 'PT', '$6.80']];
    const dur = 12;
    const sx = AW / 2, sy = 312;
    return {
      pills: noPills,
      svg: wA(`
        ${bg(AW, AH, GR)}
        ${lab(46, 42, 'ONE LINK, EVERY DESTINATION', GRAY, { size: 9 })}
        ${dests.map(([x, y, cc, amt], i) => {
          /* all six land inside the first half of the loop, so the finished
             map holds instead of completing just as it restarts */
          const beg = ((i * dur * 0.5) / dests.length).toFixed(2);
          const d = `M ${sx} ${sy} Q ${((sx + x) / 2).toFixed(0)} ${(y + 40).toFixed(0)}, ${x} ${y}`;
          return `<g>
            <path d="${d}" fill="none" stroke="${GR}" stroke-width="1.4" opacity="0.18"/>
            <circle r="4" fill="${GR}">
              <animateMotion dur="${dur}s" begin="${beg}s" repeatCount="indefinite"
                keyTimes="0;0.16;1" keyPoints="0;1;1" calcMode="linear" path="${d}"/>
              <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.02;0.15;0.18;1"
                dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/></circle>
            <g opacity="0">
              <!-- each commission stays on screen once it lands, so the map fills
                   up rather than showing one lonely pill at a time -->
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.16;0.2;1"
                dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/>
              ${rect(x - 38, y - 19, 76, 38, { fill: WHITE, stroke: GR, r: 9 })}
              ${lab(x, y - 5, cc, GRAY, { size: 7.5, a: 'middle' })}
              ${t(x, y + 12, amt, { m: true, size: 12, w: 700, a: 'middle', fill: GREEN_TEXT })}
            </g>
            <circle cx="${x}" cy="${y}" r="3.5" fill="${GR}" opacity="0.4"/>
          </g>`;
        }).join('')}
        ${rect(sx - 148, sy - 20, 296, 40, { fill: WHITE, stroke: LINE, r: 20 })}
        ${t(sx - 130, sy + 6, 'openline.com/r/yourname', { m: true, size: 13, w: 600, fill: INK })}
        <circle cx="${sx + 122}" cy="${sy}" r="7" fill="${GR}">
          <animate attributeName="opacity" values="0.4;1;0.4" keyTimes="0;0.5;1" dur="2.2s" repeatCount="indefinite"/></circle>
        ${rect(sx - 148, sy + 40, 296, 44, { fill: GRW, r: 12 })}
        ${lab(sx - 130, sy + 62, 'CREDITED TO YOU', GREEN_TEXT, { size: 8 })}
        ${cycle(sx + 130, sy + 74, ['$41.20', '$48.00', '$52.40', '$65.60'], { fill: GREEN_TEXT, size: 19, dur: dur })}
        ${lab(46, AH - 14, '190+ COUNTRIES — NO REGIONAL LINKS, NO SPLIT DASHBOARDS', GRAY, { size: 8 })}`),
    };
  },
};

/* A5 ── The Honest Funnel */
export const honestFunnel = {
  id: 'af-funnel',
  name: 'The Honest Funnel',
  family: 'Trust',
  tagline: 'A 4.96% conversion rate, not a fantasy',
  desc:
    'Affiliate pages usually imply that everyone who clicks buys. This shows the real shape: a ' +
    'thousand clicks, forty-two conversions, and the commission that produces — with the 4.96% ' +
    'rate stated plainly rather than buried. Publishing a modest true number builds more trust ' +
    'with experienced affiliates than a large invented one.',
  pros: ['Credible to experienced affiliates', 'Uses the real rate already on the page', 'Sets honest expectations'],
  cons: ['A small percentage looks unimpressive at a glance', 'Depends on the rate staying accurate'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 5 },
  build: () => {
    const dur = 9;
    const stages = [['Clicks', '847', 1], ['Reached checkout', '96', 0.34], ['Bought', '42', 0.2]];
    return {
      pills: noPills,
      svg: wA(`
        ${bg(AW, AH, GR)}
        ${lab(46, 42, 'ONE MONTH, ONE AFFILIATE, REAL SHAPE', GRAY, { size: 9 })}
        ${stages.map(([nm, v, frac], i) => {
          const y = 62 + i * 88;
          const w = (AW - 88) * frac;
          const on = (0.06 + i * 0.16).toFixed(3);
          return `<g>
            ${t(46, y + 22, nm, { size: 13, w: 600 })}
            ${t(AW - 46, y + 22, v, { m: true, size: 17, w: 700, a: 'end', fill: i === 2 ? GREEN_TEXT : MUT })}
            ${rect(46, y + 32, AW - 92, 30, { fill: '#F3F4F6', r: 8 })}
            <rect x="46" y="${y + 32}" width="0" height="30" rx="8" fill="${GR}" opacity="${0.3 + i * 0.28}">
              <animate attributeName="width" values="0;${w.toFixed(0)};${w.toFixed(0)}"
                keyTimes="0;${(+on + 0.1).toFixed(3)};1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/></rect>
            ${i === 2 ? `<g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.5;0.6;1" dur="${dur}s"
                repeatCount="indefinite" fill="freeze"/>
              ${rect(w + 58, y + 34, 96, 26, { fill: GRW, r: 8 })}
              ${lab(w + 70, y + 51, '4.96% RATE', GREEN_TEXT, { size: 7.5 })}
            </g>` : ''}
          </g>`;
        }).join('')}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.78;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(44, 330, AW - 88, 62, { fill: GRW, r: 12 })}
          ${lab(68, 354, 'COMMISSION EARNED', GREEN_TEXT, { size: 8.5 })}
          ${t(AW - 68, 378, '$682', { m: true, size: 28, w: 700, a: 'end', fill: GREEN_TEXT })}
          ${t(68, 378, 'from 42 sales at an average $16.24', { size: 11.5, fill: MUT })}
        </g>
        ${lab(46, AH - 8, 'WE WOULD RATHER SHOW YOU A SMALL TRUE NUMBER', GRAY, { size: 8 })}`),
    };
  },
};

/* A6 ── Payout Day */
export const payoutDay = {
  id: 'af-payout',
  name: 'Payout Day',
  family: 'Money',
  tagline: 'The threshold crossing and the money leaving',
  desc:
    'The three facts an affiliate checks before joining are the rate, the threshold and whether ' +
    'payouts actually happen. This animates the last two: the balance climbing past the $50 ' +
    'minimum, the payout date arriving, and the transfer completing with a reference. Programmes ' +
    'that pay reliably should show it, because plenty do not.',
  pros: ['Addresses the "do they actually pay" fear', 'Makes the $50 threshold feel low', 'Ends on a completed transfer'],
  cons: ['Implies a payout cadence that must be kept', 'Needs a real reference format'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: () => {
    const dur = 11;
    return {
      pills: noPills,
      svg: wA(`
        ${bg(AW, AH, GR)}
        ${rect(44, 54, AW - 88, 168, { fill: WHITE, stroke: LINE, r: 14 })}
        ${lab(70, 82, 'BALANCE', GRAY, { size: 9 })}
        ${cycle(AW - 70, 130, ['$18.40', '$34.80', '$52.20', '$78.60', '$96.40'],
          { fill: INK, size: 34, dur: dur * 0.6 })}
        ${rect(70, 150, AW - 140, 14, { fill: '#F3F4F6', r: 7 })}
        <rect x="70" y="150" width="0" height="14" rx="7" fill="${GR}" opacity="0.8">
          <animate attributeName="width" values="0;${AW - 140};${AW - 140}" keyTimes="0;0.6;1"
            dur="${dur}s" repeatCount="indefinite"/></rect>
        <line x1="${70 + (AW - 140) * 0.35}" y1="142" x2="${70 + (AW - 140) * 0.35}" y2="176"
          stroke="${MUT}" stroke-width="1.6" stroke-dasharray="3 3"/>
        ${lab(70 + (AW - 140) * 0.35 + 8, 194, '$50 MINIMUM PAYOUT', MUT, { size: 8 })}

        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.72;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(44, 240, AW - 88, 130, { fill: GRW, r: 14 })}
          ${lab(70, 268, 'PAID OUT', GREEN_TEXT, { size: 9 })}
          ${t(AW - 70, 312, '$96.40', { m: true, size: 32, w: 700, a: 'end', fill: GREEN_TEXT })}
          ${t(70, 306, '1 November · PayPal', { size: 13, fill: INK })}
          ${t(70, 328, 'Reference OL-PAY-7c02be', { m: true, size: 10.5, fill: MUT })}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.84;0.92;1" dur="${dur}s"
              repeatCount="indefinite" fill="freeze"/>
            ${rect(70, 340, 132, 22, { fill: WHITE, r: 11 })}
            ${tick(84, 351, GR, 0.75)}
            ${lab(102, 355, 'TRANSFER SENT', GREEN_TEXT, { size: 7.5 })}
          </g>
        </g>
        ${lab(46, AH - 14, 'MONTHLY, ON THE FIRST, EVERY MONTH', GRAY, { size: 8.5 })}`),
    };
  },
};

/* A7 ── Three Steps */
export const threeSteps = {
  id: 'af-steps',
  name: 'Three Steps',
  family: 'Mechanics',
  tagline: 'Signed up to first link in under a minute',
  desc:
    '"Simple setup" is asserted in the copy and never shown. This walks the three steps — apply, ' +
    'get your link, share it — each completing in sequence with the actual elapsed time on screen. ' +
    'Removing perceived effort is often what converts a browsing creator, and the timer does that ' +
    'more effectively than the adjective.',
  pros: ['Kills the "this will be a hassle" objection', 'Concrete and short', 'Easy to keep accurate'],
  cons: ['Least emotionally interesting', 'Onboarding must really be this fast'],
  scores: { story: 3, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: () => {
    const steps = [['Apply', 'Name, audience, payout method', '0:22'],
      ['Get your link', 'openline.com/r/yourname', '0:24'],
      ['Share it', 'Anywhere — no approval queue', '0:41']];
    const dur = 10;
    return {
      pills: noPills,
      svg: wA(`
        ${bg(AW, AH, GR)}
        ${lab(46, 42, 'SETUP, TIMED', GRAY, { size: 9 })}
        ${steps.map(([h, b, tm], i) => {
          const y = 62 + i * 104;
          const on = (0.08 + i * 0.26).toFixed(3);
          return `<g>
            ${rect(44, y, AW - 88, 88, { fill: WHITE, stroke: LINE, r: 14 })}
            <rect x="44" y="${y}" width="${AW - 88}" height="88" rx="14" fill="none" stroke="${GR}" stroke-width="2" opacity="0">
              <animate attributeName="opacity" values="0;0;1;0.35;0.35" keyTimes="0;${on};${(+on + 0.04).toFixed(3)};${(+on + 0.2).toFixed(3)};1"
                dur="${dur}s" repeatCount="indefinite"/></rect>
            <circle cx="80" cy="${y + 44}" r="17" fill="#F3F4F6"/>
            <circle cx="80" cy="${y + 44}" r="17" fill="${GRW}" opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(+on + 0.14).toFixed(3)};${(+on + 0.18).toFixed(3)};1"
                dur="${dur}s" repeatCount="indefinite" fill="freeze"/></circle>
            ${t(80, y + 50, String(i + 1), { m: true, size: 15, w: 700, a: 'middle', fill: MUT })}
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(+on + 0.16).toFixed(3)};${(+on + 0.2).toFixed(3)};1"
                dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
              ${tick(73, y + 44, GR, 0.9)}
            </g>
            ${t(118, y + 40, h, { size: 15, w: 700 })}
            ${t(118, y + 62, b, { size: 11.5, fill: MUT })}
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(+on + 0.16).toFixed(3)};${(+on + 0.2).toFixed(3)};1"
                dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
              ${t(AW - 68, y + 50, tm, { m: true, size: 15, w: 700, a: 'end', fill: GREEN_TEXT })}
            </g>
          </g>`;
        }).join('')}
        ${lab(46, AH - 20, 'NO APPROVAL QUEUE, NO MINIMUM AUDIENCE, NO CONTRACT', GRAY, { size: 8.5 })}`),
    };
  },
};

/* A8 ── The Month */
export const theMonth = {
  id: 'af-month',
  name: 'The Month',
  family: 'Money',
  tagline: 'Where $3,247 actually came from',
  desc:
    'The live card shows a total with no provenance. This builds the same figure out of its ' +
    'weeks, so the +23% has a visible cause — a good week in late September rather than an ' +
    'unexplained jump. A total that shows its own construction is far harder to dismiss as a ' +
    'marketing number.',
  pros: ['Gives the headline total provenance', 'Explains the +23% instead of stating it', 'Familiar and quick to read'],
  cons: ['Still somebody else\'s earnings', 'Bar charts are unremarkable'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: () => {
    const wk = [['Wk 1', 0.42, '$486'], ['Wk 2', 0.58, '$672'], ['Wk 3', 0.71, '$823'], ['Wk 4', 1, '$1,266']];
    const dur = 9;
    const base = 300;
    return {
      pills: noPills,
      svg: wA(`
        ${bg(AW, AH, GR)}
        ${lab(46, 42, 'SEPTEMBER, BY WEEK', GRAY, { size: 9 })}
        ${wk.map(([nm, frac, amt], i) => {
          const x = 66 + i * 124;
          const h = 190 * frac;
          const on = (0.08 + i * 0.13).toFixed(3);
          return `<g>
            <rect x="${x}" y="${base - h}" width="86" height="0" rx="8" fill="${GR}" opacity="${0.35 + i * 0.2}">
              <animate attributeName="height" values="0;${h.toFixed(0)};${h.toFixed(0)}"
                keyTimes="0;${(+on + 0.12).toFixed(3)};1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
              <animate attributeName="y" values="${base};${(base - h).toFixed(0)};${(base - h).toFixed(0)}"
                keyTimes="0;${(+on + 0.12).toFixed(3)};1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/></rect>
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(+on + 0.12).toFixed(3)};${(+on + 0.16).toFixed(3)};1"
                dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
              ${t(x + 43, base - h - 12, amt, { m: true, size: 14, w: 700, a: 'middle', fill: INK })}
            </g>
            ${lab(x + 43, base + 22, nm, GRAY, { size: 8.5, a: 'middle' })}
          </g>`;
        }).join('')}
        <line x1="46" y1="${base}" x2="${AW - 46}" y2="${base}" stroke="${LINE}" stroke-width="2"/>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.78;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(44, 340, AW - 88, 62, { fill: GRW, r: 12 })}
          ${lab(68, 364, 'SEPTEMBER TOTAL', GREEN_TEXT, { size: 8.5 })}
          ${t(AW - 68, 388, '$3,247', { m: true, size: 28, w: 700, a: 'end', fill: GREEN_TEXT })}
          ${t(68, 388, '+23% — week four carried it', { size: 11.5, fill: MUT })}
        </g>`),
    };
  },
};

/* A9 ── Paid on Renewals */
export const paidOnRenewals = {
  id: 'af-renew',
  name: 'Paid on Renewals',
  family: 'Trust',
  tagline: 'The question the page does not answer',
  desc:
    'Every serious affiliate asks whether commission is paid once or on every renewal, and this ' +
    'page is silent on it — which experienced affiliates read as a no. Whatever the real answer ' +
    'is, stating it clearly beats leaving it ambiguous. This draws a customer\'s repeat purchases ' +
    'over six months with the commission paid on each.',
  pros: ['Answers the question that decides serious sign-ups', 'Shows lifetime value, not a single sale', 'Strongly differentiating if the answer is yes'],
  cons: ['Only shippable if renewals really are commissioned', 'Commits to a long-term liability'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 4, brand: 5, ease: 3 },
  build: () => {
    const buys = [['Mar', '$17', '$6.80'], ['Apr', '$17', '$6.80'], ['Jun', '$37', '$14.80'],
      ['Jul', '$17', '$6.80'], ['Sep', '$59', '$23.60']];
    const dur = 11;
    return {
      pills: noPills,
      svg: wA(`
        ${bg(AW, AH, GR)}
        ${lab(46, 42, 'ONE REFERRED TRAVELLER, SIX MONTHS', GRAY, { size: 9 })}
        ${buys.map(([m, px, com], i) => {
          const y = 58 + i * 58;
          const on = (0.06 + i * 0.14).toFixed(3);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${(+on + 0.05).toFixed(3)};1"
              dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
            ${rect(44, y, AW - 88, 46, { fill: WHITE, stroke: LINE, r: 10 })}
            ${lab(66, y + 28, m, GRAY, { size: 9 })}
            ${t(116, y + 29, 'Bought a plan', { size: 12.5, fill: INK })}
            ${t(AW - 168, y + 29, px, { m: true, size: 12.5, a: 'end', fill: MUT })}
            ${rect(AW - 152, y + 11, 90, 24, { fill: GRW, r: 8 })}
            ${t(AW - 72, y + 28, com, { m: true, size: 13, w: 700, a: 'end', fill: GREEN_TEXT })}
          </g>`;
        }).join('')}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.78;0.88;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(44, 354, AW - 88, 54, { fill: GRW, r: 12 })}
          ${lab(68, 376, 'FROM ONE REFERRAL', GREEN_TEXT, { size: 8.5 })}
          ${t(AW - 68, 396, '$58.80', { m: true, size: 24, w: 700, a: 'end', fill: GREEN_TEXT })}
          ${t(68, 396, 'not $6.80', { size: 12, fill: MUT })}
        </g>
        ${lab(46, AH - 6, 'IF RENEWALS ARE COMMISSIONED, THIS IS THE STRONGEST THING THE PAGE CAN SAY',
          GRAY, { size: 7.5 })}`),
    };
  },
};

/* A10 ── The Dashboard */
export const theDashboard = {
  id: 'af-dash',
  name: 'The Dashboard',
  family: 'Mechanics',
  tagline: 'The card it already is, but alive',
  desc:
    'The conservative option: keep the existing earnings card and its exact figures, and simply ' +
    'let it behave like a dashboard — clicks arriving, the conversion counter advancing, the ' +
    'balance ticking, a fresh timestamp. No new claims, no new numbers, no layout change. It ' +
    'removes the screenshot problem and nothing else.',
  pros: ['Zero new claims to defend', 'No layout or copy change', 'Fastest to implement'],
  cons: ['Still an unattributed figure', 'Least differentiated of the ten'],
  scores: { story: 3, motion: 3, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: () => {
    const dur = 8;
    return {
      pills: noPills,
      svg: wA(`
        ${bg(AW, AH, GR)}
        ${rect(44, 58, AW - 88, 314, { fill: WHITE, stroke: LINE, r: 16 })}
        <circle cx="70" cy="88" r="4" fill="${GR}">
          <animate attributeName="opacity" values="0.35;1;0.35" keyTimes="0;0.5;1" dur="2.2s" repeatCount="indefinite"/></circle>
        ${lab(84, 92, 'TOTAL EARNINGS · LIVE', GRAY, { size: 9 })}
        ${cycle(AW - 70, 140, ['$3,247', '$3,254', '$3,261', '$3,275'], { fill: INK, size: 38, dur })}
        ${rect(70, 158, 168, 26, { fill: GRW, r: 13 })}
        ${lab(84, 175, '+23% FROM LAST MONTH', GREEN_TEXT, { size: 8 })}
        ${[['Conversions', ['42', '43', '44', '45']], ['Conversion rate', ['4.96%', '4.98%', '5.01%', '4.99%']]]
          .map(([k, vals], i) => {
            const y = 202 + i * 54;
            return `${rect(70, y, AW - 140, 44, { fill: '#F9FAFB', r: 10 })}
              ${t(86, y + 28, k, { size: 12.5, fill: MUT })}
              ${cycle(AW - 86, y + 29, vals, { fill: INK, size: 13, dur })}`;
          }).join('')}
        ${rect(70, 310, AW - 140, 44, { fill: '#F9FAFB', r: 10 })}
        ${t(86, 338, 'Next payout', { size: 12.5, fill: MUT })}
        ${t(AW - 86, 338, 'Nov 1 · PayPal', { m: true, size: 13, w: 700, a: 'end' })}
        ${lab(70, AH - 32, 'LAST CLICK', GRAY, { size: 8 })}
        ${cycle(AW - 70, AH - 30, ['4s AGO', '1s AGO', '12s AGO', '0s AGO'], { fill: MUT, size: 11, dur: 6 })}`),
    };
  },
};

/* A11 ── Realistically */
export const realistically = {
  id: 'af-realistic',
  name: 'Realistically',
  family: 'Arithmetic',
  tagline: 'The FAQ question, answered on the hero',
  desc:
    'The page\u2019s own FAQ asks "how much can I realistically earn?" and the hero answers it with ' +
    'somebody else\u2019s $3,247. This answers it properly, one factor at a time: 12,000 ' +
    'subscribers, 1.4% click the link, 4.96% of those buy, the average plan is $23, the starter rate ' +
    'is 30% \u2014 $55 a month. The number is small on purpose. Every input is visible, so a reader ' +
    'can substitute their own and trust the result.',
  pros: ['Answers the question the page asks itself and never addresses',
    'A small number with visible working is more persuasive to experienced affiliates than a large one',
    'Uses the 4.96% rate the page already publishes'],
  cons: ['$55 a month may put off the audience the page is chasing',
    'Five rows of arithmetic is a lot of reading for a hero',
    'Every assumption is now a number someone can argue with'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: () => {
    const rows = [
      ['YOUR AUDIENCE', 'the list or channel you already have', '12,000'],
      ['\u00D7 1.4% CLICK', 'a normal rate for a recommendation', '168 clicks'],
      ['\u00D7 4.96% BUY', 'the conversion rate this page publishes', '8 sales'],
      ['\u00D7 $23 AVERAGE PLAN', 'across the plans travellers pick', '$184 sold'],
      ['\u00D7 30% COMMISSION', 'the starter tier, not the top one', '$55.20'],
    ];
    const dur = 11;
    return {
      pills: noPills,
      svg: wA(`
        ${bg(AW, AH, GR)}
        ${lab(46, 40, 'HOW MUCH CAN I REALISTICALLY EARN?', GRAY, { size: 9 })}
        ${rows.map(([k, s, v], i) => {
          const y = 54 + i * 58;
          const on = (0.06 + i * 0.13).toFixed(3);
          const last = i === rows.length - 1;
          return `<g>
            ${rect(44, y, 504, 48, { fill: WHITE, stroke: LINE, r: 10 })}
            ${lab(66, y + 20, k, last ? GREEN_TEXT : GRAY, { size: 8.5 })}
            ${t(66, y + 37, s, { size: 11, fill: MUT })}
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${(+on + 0.05).toFixed(3)};1"
                dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
              ${t(526, y + 31, v, { m: true, size: last ? 18 : 15, w: 700, a: 'end',
                fill: last ? GREEN_TEXT : INK })}
            </g>
          </g>`;
        }).join('')}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.8;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(44, 348, 504, 58, { fill: GRW, r: 12 })}
          ${lab(68, 372, 'A MONTH, AT THE STARTER RATE', GREEN_TEXT, { size: 8.5 })}
          ${t(526, 394, '$55', { m: true, size: 26, w: 700, a: 'end', fill: GREEN_TEXT })}
          ${t(68, 394, '$74 once you are on the 40% tier', { size: 11.5, fill: MUT })}
        </g>
        ${lab(46, 422, 'CONSERVATIVE INPUTS \u00B7 CHANGE ANY ONE AND THE ANSWER CHANGES', GRAY, { size: 8 })}`),
    };
  },
};

/* A12 ── The Receipts */
export const whereItCame = {
  id: 'af-source',
  name: 'The Receipts',
  family: 'Provenance',
  tagline: 'The same $3,247, with its receipts',
  desc:
    'The live card states a total and nothing about its origin, which is exactly why it reads as ' +
    'decoration. This keeps the figure and traces it to the three pieces of content that produced ' +
    'it: a video description, one newsletter issue and a single Reddit reply, with the sales and ' +
    'money each returned. The two notifications already on the live card \u2014 +$18.40 and +$24.90 ' +
    '\u2014 land on the rows they belong to as you watch.',
  pros: ['Fixes the exact complaint about the current card without changing the headline number',
    'Shows an affiliate what kind of content actually earns, which is the useful part',
    'The three rows sum to the stated total, so the card survives a calculator'],
  cons: ['Invents a plausible content mix that marketing must be willing to stand behind',
    'Still somebody else\u2019s total',
    'Row three earns little, which slightly undercuts the pitch'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: () => {
    const src = [
      ['Video description', '\u201CBest eSIM for Japan\u201D \u00B7 84k views', '21 SALES', '$1,842', 0.567, '+$24.90'],
      ['Newsletter, issue 46', 'Sent to 9,400 readers', '14 SALES', '$968', 0.298, '+$18.40'],
      ['One Reddit reply', 'r/JapanTravel \u00B7 posted once', '7 SALES', '$437', 0.135, ''],
    ];
    const dur = 12;
    return {
      pills: noPills,
      svg: wA(`
        ${bg(AW, AH, GR)}
        ${lab(46, 40, 'WHERE THE $3,247 CAME FROM', GRAY, { size: 9 })}
        ${src.map(([nm, sub, sales, amt, share, note], i) => {
          const y = 54 + i * 92;
          const on = (0.06 + i * 0.12).toFixed(3);
          const bw = (300 * share).toFixed(0);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${(+on + 0.05).toFixed(3)};1"
              dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
            ${rect(44, y, 504, 80, { fill: WHITE, stroke: LINE, r: 12 })}
            ${rect(66, y + 20, 40, 40, { fill: GRW, r: 10 })}
            ${i === 0
              ? `<path d="M 80 ${y + 31} L 96 ${y + 40} L 80 ${y + 49} Z" fill="${GR}"/>`
              : i === 1
                ? `<rect x="76" y="${y + 31}" width="24" height="18" rx="3" fill="none" stroke="${GR}" stroke-width="2"/>
                   <path d="M 76 ${y + 33} L 88 ${y + 42} L 100 ${y + 33}" fill="none" stroke="${GR}" stroke-width="2"/>`
                : `<path d="M 76 ${y + 30} h 24 v 14 h -14 l -10 8 z" fill="none" stroke="${GR}" stroke-width="2"/>`}
            ${t(122, y + 32, nm, { size: 14, w: 700 })}
            ${lab(122, y + 50, sub, MUT, { size: 8 })}
            ${rect(122, y + 60, 300, 8, { fill: '#F3F4F6', r: 4 })}
            <rect x="122" y="${y + 60}" width="0" height="8" rx="4" fill="${GR}" opacity="0.75">
              <animate attributeName="width" values="0;${bw};${bw}"
                keyTimes="0;${(+on + 0.16).toFixed(3)};1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
            </rect>
            ${t(526, y + 34, amt, { m: true, size: 17, w: 700, a: 'end', fill: GREEN_TEXT })}
            ${lab(526, y + 54, sales, GRAY, { size: 8, a: 'end' })}
            ${note ? `<g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1;1" keyTimes="0;${(0.5 + i * 0.14).toFixed(3)};${(0.56 + i * 0.14).toFixed(3)};0.98;1"
                dur="${dur}s" repeatCount="indefinite"/>
              ${rect(440, y + 58, 84, 20, { fill: GRW, r: 10 })}
              ${lab(482, y + 72, note + ' JUST NOW', GREEN_TEXT, { size: 6.5, a: 'middle' })}
            </g>` : ''}
          </g>`;
        }).join('')}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.74;0.82;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(44, 332, 504, 58, { fill: GRW, r: 12 })}
          ${lab(68, 356, 'THREE PIECES OF CONTENT \u00B7 42 SALES', GREEN_TEXT, { size: 8.5 })}
          ${t(526, 378, '$3,247', { m: true, size: 26, w: 700, a: 'end', fill: GREEN_TEXT })}
          ${t(68, 378, 'the same figure, with a source per line', { size: 11.5, fill: MUT })}
        </g>
        ${lab(46, 412, 'THE CURRENT CARD SHOWS THE TOTAL AND HIDES THE WORK', GRAY, { size: 8 })}`),
    };
  },
};

/* A13 ── The Statement */
export const theStatement = {
  id: 'af-statement',
  name: 'The Statement',
  family: 'Paperwork',
  tagline: 'Five lines, one reversal, a total that foots',
  desc:
    'An earnings card asks to be believed; a remittance advice can be checked. Five September sales ' +
    'print in turn with the plan, the price, the rate and the commission \u2014 then a refunded order ' +
    'arrives as a negative line and takes $6.80 back out. The net is $40.20, paid on 1 October by ' +
    'PayPal, with a reference. Showing the clawback is what makes the column trustworthy.',
  pros: ['Arithmetic a reader can verify in their head, including the subtraction',
    'The reversal answers the unspoken "what happens on a refund?"',
    'Reads as a real back office rather than a marketing dashboard'],
  cons: ['Least exciting thing that could occupy a hero',
    'Small monospace columns are hard work below 400px wide',
    'Admits up front that some commission gets taken back'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 2, brand: 4, ease: 4 },
  build: () => {
    const lines = [
      ['03 SEP', '20 GB \u00B7 Japan', '$37.00', '40%', '$14.80', 0],
      ['09 SEP', '5 GB \u00B7 Europe', '$17.00', '40%', '$6.80', 0],
      ['14 SEP', 'Unlimited \u00B7 30 days', '$59.00', '40%', '$23.60', 0],
      ['21 SEP', '1 GB \u00B7 7 days', '$4.50', '40%', '$1.80', 0],
      ['24 SEP', '5 GB \u00B7 order refunded', '\u2212$17.00', '40%', '\u2212$6.80', 1],
    ];
    const dur = 12;
    return {
      pills: noPills,
      svg: wA(`
        ${bg(AW, AH, GR)}
        ${lab(46, 38, 'REMITTANCE ADVICE \u00B7 SEPTEMBER', GRAY, { size: 9 })}
        ${rect(44, 50, 504, 300, { fill: WHITE, stroke: LINE, r: 12 })}
        ${lab(66, 80, 'DATE', GRAY, { size: 7.5 })}
        ${lab(136, 80, 'WHAT SOLD', GRAY, { size: 7.5 })}
        ${lab(392, 80, 'PRICE', GRAY, { size: 7.5, a: 'end' })}
        ${lab(446, 80, 'RATE', GRAY, { size: 7.5, a: 'end' })}
        ${lab(526, 80, 'YOURS', GRAY, { size: 7.5, a: 'end' })}
        <line x1="66" y1="90" x2="526" y2="90" stroke="${LINE}" stroke-width="1.5"/>
        ${lines.map(([d, what, px, rt, amt, neg], i) => {
          const y = 116 + i * 38;
          const on = (0.05 + i * 0.11).toFixed(3);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${(+on + 0.04).toFixed(3)};1"
              dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
            ${lab(66, y, d, GRAY, { size: 8.5 })}
            ${t(136, y, what, { size: 12.5, fill: neg ? MUT : INK })}
            ${t(392, y, px, { m: true, size: 11.5, a: 'end', fill: neg ? RED : MUT })}
            ${t(446, y, rt, { m: true, size: 11.5, a: 'end', fill: MUT })}
            ${t(526, y, amt, { m: true, size: 13.5, w: 700, a: 'end', fill: neg ? RED : INK })}
          </g>`;
        }).join('')}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.6;0.66;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${lab(136, 322, 'REFUNDED 28 SEP \u2014 COMMISSION REVERSED IN FULL', RED, { size: 7.5 })}
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.78;0.86;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(44, 362, 504, 46, { fill: GRW, r: 12 })}
          ${lab(68, 390, 'NET DUE \u00B7 PAID 1 OCTOBER \u00B7 PAYPAL', GREEN_TEXT, { size: 8.5 })}
          ${t(526, 394, '$40.20', { m: true, size: 22, w: 700, a: 'end', fill: GREEN_TEXT })}
        </g>
        ${lab(46, 424, 'REFERENCE OL-PAY-7C02BE \u00B7 ONE REVERSAL INCLUDED \u00B7 THE COLUMN STILL ADDS UP',
          GRAY, { size: 7.5 })}`),
    };
  },
};

/* A14 ── The Terms */
export const theTerms = {
  id: 'af-terms',
  name: 'The Terms',
  family: 'Terms',
  tagline: 'Both columns, including the one nobody prints',
  desc:
    'The whole deal on one card. On the left, what is paid: 30% rising to 40%, the three tiers the ' +
    'page names, the 90-day cookie, the 1st of the month by PayPal, bank or crypto, and no fee or ' +
    'minimum audience. On the right, what is not paid: your own orders, refunded orders, coupon-site ' +
    'traffic and paid search on the brand name. Every programme has the right-hand column; almost ' +
    'none publish it, and publishing it is the credibility play.',
  pros: ['One card answers everything a serious affiliate asks before applying',
    'Publishing the exclusions removes the suspicion that they are hidden',
    'Nothing invented \u2014 every left-hand line is already stated somewhere on the page'],
  cons: ['Dense; it is a document, not a picture',
    'Legal will want to review every line, which slows it down',
    'The exclusions are the first thing a hostile reader will screenshot'],
  scores: { story: 4, motion: 2, perf: 5, mobile: 3, brand: 4, ease: 5 },
  build: () => {
    const yes = [
      '30% of the plan price, rising to 40%',
      'Tiers at 0\u201310, 11\u201350 and 50+ sales a month',
      '90-day cookie from the first click',
      'Paid on the 1st \u2014 PayPal, bank or crypto',
      'No fee, no minimum audience, no exclusivity',
    ];
    const no = [
      'Orders you place yourself',
      'Orders refunded before they settle',
      'Coupon-site traffic you did not send',
      'Paid search on the word Openline',
    ];
    const dur = 11;
    return {
      pills: noPills,
      svg: wA(`
        ${bg(AW, AH, GR)}
        ${lab(46, 38, 'THE WHOLE DEAL, BOTH COLUMNS', GRAY, { size: 9 })}
        ${rect(44, 50, 248, 306, { fill: WHITE, stroke: GR, r: 14 })}
        ${rect(44, 50, 248, 46, { fill: GRW, r: 14 })}
        ${rect(44, 78, 248, 18, { fill: GRW, r: 0 })}
        ${lab(66, 80, 'WHAT YOU ARE PAID', GREEN_TEXT, { size: 8.5 })}
        ${yes.map((s, i) => {
          const y = 122 + i * 46;
          const on = (0.05 + i * 0.08).toFixed(3);
          const wrap = s.length > 30 ? [s.slice(0, s.lastIndexOf(' ', 30)), s.slice(s.lastIndexOf(' ', 30) + 1)] : [s];
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${(+on + 0.04).toFixed(3)};1"
              dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
            ${tick(66, y - 4, GR, 0.9)}
            ${wrap.map((ln, j) => t(88, y + j * 15, ln, { size: 11.5, fill: INK })).join('')}
          </g>`;
        }).join('')}
        ${rect(304, 50, 244, 306, { fill: WHITE, stroke: LINE, r: 14 })}
        ${rect(304, 50, 244, 46, { fill: '#F9FAFB', r: 14 })}
        ${rect(304, 78, 244, 18, { fill: '#F9FAFB', r: 0 })}
        ${lab(326, 80, 'WHAT YOU ARE NOT PAID FOR', GRAY, { size: 8.5 })}
        ${no.map((s, i) => {
          const y = 122 + i * 46;
          const on = (0.4 + i * 0.08).toFixed(3);
          const wrap = s.length > 28 ? [s.slice(0, s.lastIndexOf(' ', 28)), s.slice(s.lastIndexOf(' ', 28) + 1)] : [s];
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${(+on + 0.04).toFixed(3)};1"
              dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
            <path d="M 326 ${y - 8} l 9 9 M 335 ${y - 8} l -9 9" stroke="${MUT}" stroke-width="2"
              stroke-linecap="round"/>
            ${wrap.map((ln, j) => t(348, y + j * 15, ln, { size: 11.5, fill: MUT })).join('')}
          </g>`;
        }).join('')}
        ${rect(304, 300, 244, 42, { fill: '#F9FAFB', r: 10 })}
        ${lab(326, 318, 'CURRENT TIER', GRAY, { size: 7.5 })}
        ${cycle(526, 330, ['STARTER \u00B7 0\u201310 SALES', 'GROWTH \u00B7 11\u201350 SALES',
          'PRO \u00B7 50+ SALES'], { fill: GREEN_TEXT, size: 12, a: 'end', dur })}
        ${rect(44, 372, 504, 36, { fill: GRW, r: 10 })}
        ${t(296, 395, 'Nothing here is buried in a PDF', { size: 12.5, w: 600, a: 'middle', fill: GREEN_TEXT })}
        ${lab(46, 424, 'EVERY PROGRAMME HAS A RIGHT-HAND COLUMN \u2014 MOST DO NOT PRINT IT', GRAY, { size: 8 })}`),
    };
  },
};

/* A15 ── First Sale */
export const firstSale = {
  id: 'af-first',
  name: 'First Sale',
  family: 'One sale',
  tagline: 'One event, followed end to end',
  desc:
    'The opposite of a $3,247 total: a single sale, large enough to read across the room. Someone in ' +
    'Seoul who clicked your link six days ago buys a 5 GB Japan plan at 21:14; $6.80 counts up beside ' +
    'it; the line underneath tracks click, purchase and payout dates. The closing line does the ' +
    'work \u2014 the big card is forty-two of these. Dark, so it does not look like another dashboard.',
  pros: ['One number, one story, legible at any size',
    'Nothing is aggregated, so there is nothing to doubt',
    'The only dark option on this board, which makes it stand out in review'],
  cons: ['$6.80 is a small number to lead a hero with',
    'A dark block on a white-and-green page is a bigger design decision than it looks',
    'Says nothing about rates, cookies or payouts on its own'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 3, ease: 4 },
  build: (uid = 'a') => {
    const dur = 10;
    return {
      pills: noPills,
      svg: wA(`
        <defs><radialGradient id="af1-${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="${GR}" stop-opacity="0.30"/>
          <stop offset="1" stop-color="${GR}" stop-opacity="0"/></radialGradient></defs>
        <rect width="${AW}" height="${AH}" fill="#0B1512"/>
        <circle cx="${AW / 2}" cy="180" r="220" fill="url(#af1-${uid})">
          <animate attributeName="opacity" values="0.6;1;0.6" keyTimes="0;0.5;1" dur="6s"
            repeatCount="indefinite"/>
        </circle>
        ${lab(46, 44, 'ONE SALE, IN FULL', WHITE, { size: 9, op: 0.45 })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.08;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(80, 96, 432, 152, { fill: WHITE, r: 18 })}
          ${lab(104, 128, 'SALE \u00B7 21:14 LOCAL', GRAY, { size: 8.5 })}
          ${t(104, 164, '5 GB \u00B7 Japan', { size: 19, w: 700 })}
          ${t(104, 190, 'Bought in Seoul by a reader who clicked six days ago', { size: 11.5, fill: MUT })}
          ${rect(104, 206, 148, 26, { fill: GRW, r: 13 })}
          ${lab(118, 223, 'PLAN PRICE $17.00', GREEN_TEXT, { size: 8 })}
          ${cycle(488, 176, ['$0.00', '$2.20', '$4.60', '$6.80'], { fill: GREEN_TEXT, size: 34, a: 'end', dur: dur * 0.5 })}
          ${lab(488, 198, 'YOUR COMMISSION AT 40%', GRAY, { size: 8, a: 'end' })}
        </g>
        ${[['15 SEP', 'CLICKED'], ['21 SEP', 'BOUGHT'], ['1 OCT', 'PAID']].map(([d, s], i) => {
          const x = 122 + i * 174;
          const on = (0.3 + i * 0.14).toFixed(3);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${(+on + 0.05).toFixed(3)};1"
              dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
            <circle cx="${x}" cy="292" r="7" fill="${GR}"/>
            ${lab(x, 322, d, WHITE, { size: 9, a: 'middle', op: 0.85 })}
            ${lab(x, 340, s, WHITE, { size: 8, a: 'middle', op: 0.4 })}
          </g>`;
        }).join('')}
        <line x1="122" y1="292" x2="470" y2="292" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
        <circle r="4" fill="${WHITE}" opacity="0.8">
          <animateMotion dur="${dur}s" repeatCount="indefinite" keyTimes="0;0.3;0.72;1"
            keyPoints="0;0;1;1" calcMode="linear" path="M 122 292 L 470 292"/>
        </circle>
        ${t(46, 384, 'The $3,247 card is forty-two of these.', { size: 15, w: 600, fill: WHITE })}
        ${lab(46, 408, 'WE WOULD RATHER SHOW YOU ONE YOU CAN FOLLOW', WHITE, { size: 8.5, op: 0.4 })}`),
    };
  },
};

export const AFFIL_VARIANTS = [
  affilCurrent, theLadder, ninetyDays, actuallyGet, oneLink, honestFunnel,
  payoutDay, threeSteps, theMonth, paidOnRenewals, theDashboard,
  realistically, whereItCame, theStatement, theTerms, firstSale,
];

export const CONTACT_BOX = { w: CW, h: CH };
export const AFFIL_BOX = { w: AW, h: AH };
