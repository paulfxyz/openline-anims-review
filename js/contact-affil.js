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

export const CONTACT_VARIANTS = [
  contactCurrent, underTwo, threeAgents, noQueue, followSunC, oneReply,
  askAnything, ninetyEight, beforeYouAsk, transcript, twoDoors,
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

export const AFFIL_VARIANTS = [
  affilCurrent, theLadder, ninetyDays, actuallyGet, oneLink, honestFunnel,
  payoutDay, threeSteps, theMonth, paidOnRenewals, theDashboard,
];

export const CONTACT_BOX = { w: CW, h: CH };
export const AFFIL_BOX = { w: AW, h: AH };
