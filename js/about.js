/* ══ /about · "Our Principles" and "Built by Travelers, for Travelers" ══
   Both blocks ship in the warm Openline orange system, so these boards
   keep that palette exactly.                                           */

import { mk, INK, WHITE, GRAY, LINE, GREEN, GREEN_SOFT, GREEN_TEXT, RED, AMBER, pill, icon } from './kit.js';

const K = mk('orange');
const { P, wrap, dots, bloom, mono, label, num, card, panel, badge, tick, MONO } = K;

const pP = (a = 'How we operate', b = '') => [
  pill('orange', `${icon('shield')}${a}`, { top: '14px', right: '14px' }),
  ...(b ? [pill('white', `<span class="dot"></span>${b}`, { top: '70px', right: '14px' })] : []),
];

const pT = (a = 'Six timezones, one network', b = '') => [
  pill('orange', `${icon('globe')}${a}`, { top: '14px', right: '14px' }),
  ...(b ? [pill('white', `<span class="dot"></span>${b}`, { top: '70px', right: '14px' })] : []),
];

/* ═════════════════════════════════════════════════════════════════════
   OUR PRINCIPLES
   ═════════════════════════════════════════════════════════════════════ */

/* ── 0 · CURRENT ───────────────────────────────────────────────────── */
export const prinCurrent = {
  id: 'pr-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'Three numbered cards that never move',
  desc: 'A dotted panel holding three black-bordered cards numbered 01, 02, 03 — "Travelers first", "Say the real number", "Build it properly" — and a "How we operate" pill in the corner. The copy is good. The panel is a second list beside the four-card list already on the left, set in a slightly different style, and nothing on it moves or is demonstrated.',
  pros: ['The three lines are short, plain and genuinely well written', 'Visually calm, and it does not fight the four cards beside it'],
  cons: ['It is a list next to a list — the section says the same thing twice', 'Completely static: no reason to look at it a second time', 'Asserts the principles instead of showing any of them in practice', 'The strongest claim on the page, "say the real number", is itself just a claim here'],
  scores: { story: 3, motion: 1, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const rows = [
      ['01', 'Travelers first', 'No lock-in, no dark patterns, no surprise bills.'],
      ['02', 'Say the real number', 'Prices, coverage and limits, stated plainly.'],
      ['03', 'Build it properly', 'Own the stack, open-source what helps everyone.'],
    ];
    return {
      svg: wrap(`
        ${dots(uid)}
        ${bloom(520, 400, 240, uid)}
        ${rows.map(([n, t, s], i) => `
          <g transform="translate(120 ${76 + i * 116})">
            ${panel(0, 0, 400, 96, { r: 14 })}
            ${card(18, 22, 52, 52, { r: 12, fill: WHITE, stroke: INK, sw: 2 })}
            ${mono(44, 54, n, { size: 15, anchor: 'middle', op: 0.85 })}
            ${label(88, 44, t, { size: 15.5 })}
            <text x="88" y="66" font-size="12.5" fill="${INK}" opacity="0.6">${s}</text>
          </g>`).join('')}`),
      pills: pP(),
    };
  },
};

/* ── 1 · THE RECEIPT ───────────────────────────────────────────────── */
export const receipt = {
  id: 'pr-receipt',
  name: 'The Receipt',
  family: 'Proof',
  tagline: 'The whole price, printed in front of you',
  desc: 'A receipt prints itself line by line: plan, activation fee, top-up fee, exit fee, tax — every line after the first reading $0.00 — and then the total stamps at exactly the price on the box. It is the shortest possible proof of "say the real number" and "no hidden fees, ever", because the reader watches the list of things they are not being charged for reach the bottom with nothing added.',
  pros: ['Demonstrates the strongest principle instead of asserting it', 'A printing receipt is a familiar object, so no explanation is needed', 'The zeroes do the argument — no adjective has to', 'Reads at a glance on mobile as one narrow column'],
  cons: ['Says nothing about the other three principles', 'A receipt is a slightly transactional object for a values section'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const lines = [
      ['eSIM · Japan 5 GB / 30 days', '$4.00'],
      ['Activation fee', '$0.00'],
      ['Top-up fee', '$0.00'],
      ['Early exit fee', '$0.00'],
      ['Currency conversion', '$0.00'],
      ['Auto-renewal', 'off'],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 230, 230, uid)}
      ${mono(40, 44, 'WHAT YOU PAY, IN FULL', { size: 10, op: 0.32 })}
      <g transform="translate(168 62)">
        <g>
          <animate attributeName="opacity" values="0;1" dur="0.3s" fill="freeze"/>
          <path d="M 0 0 H 304 V 0" fill="${WHITE}" stroke="${INK}" stroke-width="2.5">
            <animate attributeName="d" values="M 0 0 H 304 V 6 H 0 Z;M 0 0 H 304 V 330 H 0 Z"
              dur="2.2s" fill="freeze" repeatCount="indefinite" begin="0s;r.end+1.4s"/>
          </path>
        </g>
        <g clip-path="url(#rc-${uid})">
          <clipPath id="rc-${uid}"><rect width="304" height="0">
            <animate id="r" attributeName="height" values="0;330" dur="2.2s" fill="freeze"
              repeatCount="indefinite" begin="0s;r.end+1.4s"/></rect></clipPath>
          ${mono(24, 34, 'OPENLINE · ORDER RECEIPT', { size: 9.5, op: 0.4 })}
          <path d="M 24 48 H 280" stroke="${LINE}" stroke-width="1.5"/>
          ${lines.map(([l, v], i) => `
            <text x="24" y="${76 + i * 34}" font-size="12.5" fill="${INK}" opacity="0.72">${l}</text>
            <text x="280" y="${76 + i * 34}" font-size="12.5" font-weight="700" text-anchor="end"
              fill="${v === '$0.00' || v === 'off' ? GREEN_TEXT : INK}" style="font-family:${MONO}">${v}</text>`).join('')}
          <path d="M 24 ${76 + lines.length * 34 - 12} H 280" stroke="${INK}" stroke-width="1.5" opacity="0.35"/>
          ${label(24, 300, 'Total', { size: 14 })}
          ${num(280, 301, '$4.00', { size: 20, anchor: 'end', fill: P.deep })}
          ${mono(24, 320, 'NOTHING ELSE WILL BE CHARGED', { size: 9, op: 0.4 })}
        </g>
      </g>
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.62;0.72;0.94;1" dur="3.6s" repeatCount="indefinite"/>
        <g transform="translate(398 300) rotate(-9)">
          ${card(0, 0, 150, 40, { r: 8, fill: GREEN_SOFT, stroke: GREEN, sw: 2 })}
          ${mono(75, 26, 'NO HIDDEN FEES', { size: 11, anchor: 'middle', op: 1, fill: GREEN_TEXT })}
        </g>
      </g>`;
    return { svg: wrap(inner), pills: pP('No hidden fees, ever', 'Line by line') };
  },
};

/* ── 2 · THE FOOTNOTE TRAP ─────────────────────────────────────────── */
export const footnote = {
  id: 'pr-footnote',
  name: 'The Footnote Trap',
  family: 'Contrast',
  tagline: 'Their price, with the asterisks put back',
  desc: 'A competitor\'s headline price sits alone and clean. Then the asterisks arrive: activation, fair-use throttling after 2 GB, auto-renew, a conversion margin — each one attaching to the number and pushing the real total upward until it more than doubles. The panel then wipes and Openline\'s number lands once, with no footnotes to add. It is the same argument as the receipt, made by showing the alternative.',
  pros: ['Names the specific tricks rather than gesturing at "dark patterns"', 'The rising number is the most legible motion on the page', 'Positions against the category without naming a competitor', 'A reader who has been burned before recognises every line'],
  cons: ['Spends most of its runtime on someone else\'s product', 'Slightly adversarial for a values section', 'Needs the numbers to stay defensible as the market changes'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const adds = [
      ['+ activation fee', '$2.99'],
      ['+ throttled after 2 GB', '$4.50'],
      ['+ auto-renew, month 2', '$8.99'],
      ['+ conversion margin 3%', '$0.54'],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 200, 250, uid)}
      ${mono(40, 44, 'A TYPICAL RESELLER PRICE, FULLY EXPANDED', { size: 10, op: 0.32 })}
      <g opacity="1">
        <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.7;0.78;1" dur="7s" repeatCount="indefinite"/>
        ${card(96, 70, 448, 112, { r: 16, stroke: INK, sw: 2.5 })}
        ${mono(120, 100, 'ADVERTISED', { size: 9.5, op: 0.38 })}
        <text x="120" y="152" font-size="42" font-weight="700" fill="${INK}" style="font-family:${MONO}">$8.99</text>
        <text x="256" y="152" font-size="13" fill="${INK}" opacity="0.45">/ 5 GB</text>
        <g transform="translate(400 108)">
          ${adds.map((_, i) => `<text x="${i * 15}" y="0" font-size="26" font-weight="700" fill="${RED}" opacity="0">
            <animate attributeName="opacity" values="0;1" dur="0.2s" begin="${0.9 + i * 0.85}s" fill="freeze"/>*</text>`).join('')}
        </g>
        <g transform="translate(120 208)">
          ${adds.map(([l, v], i) => `
            <g opacity="0">
              <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${1 + i * 0.85}s" fill="freeze"/>
              <text x="0" y="${i * 30}" font-size="12.5" fill="${INK}" opacity="0.7">${l}</text>
              <text x="404" y="${i * 30}" font-size="12.5" font-weight="700" text-anchor="end"
                fill="${RED}" style="font-family:${MONO}">${v}</text>
            </g>`).join('')}
          <path d="M 0 ${adds.length * 30 - 8} H 404" stroke="${INK}" stroke-width="1.5" opacity="0.3"/>
          <g opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="4.5s" fill="freeze"/>
            ${label(0, adds.length * 30 + 24, 'What you actually pay', { size: 13.5 })}
            <text x="404" y="${adds.length * 30 + 26}" font-size="24" font-weight="700" text-anchor="end"
              fill="${RED}" style="font-family:${MONO}">$25.01</text>
          </g>
        </g>
      </g>
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.78;0.85;1" dur="7s" repeatCount="indefinite"/>
        ${panel(96, 140, 448, 176)}
        ${mono(120, 176, 'OPENLINE', { size: 9.5, op: 0.4 })}
        <text x="120" y="238" font-size="46" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">$4.00</text>
        <text x="272" y="238" font-size="13" fill="${INK}" opacity="0.45">/ 5 GB</text>
        ${tick(120, 274, 'No asterisks to add. That is the whole price.')}
      </g>`;
    return { svg: wrap(inner), pills: pP('Say the real number', 'No fine print') };
  },
};

/* ── 3 · SWITCHES WE LEFT OFF ──────────────────────────────────────── */
export const switches = {
  id: 'pr-switches',
  name: 'Switches We Left Off',
  family: 'Anti-pattern',
  tagline: 'The settings page nobody has to find',
  desc: 'A settings panel of the six toggles the industry ships on by default — auto-renew, marketing email, data sharing, silent throttling, roaming lock, contract rollover — each one shown already off, with a short line explaining what it would have cost the traveller. A last row, "Your data", stays on. It turns "no dark patterns" into a list of specific decisions the reader can audit.',
  pros: ['Specific and checkable, where "no dark patterns" is neither', 'The settings-panel form is instantly readable', 'Every row is a small separate reason to trust the company', 'Works as a real product screen later, not just an illustration'],
  cons: ['Six rows is a lot of reading for a hero-adjacent panel', 'Only covers the "travelers first" principle', 'Invites the question of whether these toggles exist in the app'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const rows = [
      ['Auto-renewal', 'You buy a plan, not a subscription', 0],
      ['Marketing email', 'Opt in if you want it. We default to no', 0],
      ['Data sharing', 'Never sold, never brokered', 0],
      ['Silent throttling', 'If a plan slows down, we say so first', 0],
      ['Roaming lock', 'Your eSIM is not tied to one network', 0],
      ['Encryption', 'On, and not a setting you can turn off', 1],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 240, 240, uid)}
      ${mono(40, 44, 'DEFAULTS, AS WE SHIP THEM', { size: 10, op: 0.32 })}
      ${panel(48, 60, 544, 358)}
      ${rows.map(([t, s, on], i) => `
        <g transform="translate(76 ${94 + i * 56})">
          <g opacity="0"><animate attributeName="opacity" values="0;1" dur="0.35s" begin="${0.15 + i * 0.22}s" fill="freeze"/>
            ${label(0, 6, t, { size: 14 })}
            <text x="0" y="26" font-size="11.5" fill="${INK}" opacity="0.5">${s}</text>
            <g transform="translate(414 -8)">
              <rect width="60" height="30" rx="15" fill="${on ? GREEN : '#E8EAEE'}" stroke="${INK}" stroke-width="2"/>
              <circle cx="${on ? 45 : 15}" cy="15" r="10" fill="${WHITE}" stroke="${INK}" stroke-width="2">
                ${on ? '' : `<animate attributeName="cx" values="30;15" dur="0.4s" begin="${0.2 + i * 0.22}s" fill="freeze"/>`}
              </circle>
            </g>
            <text x="490" y="12" font-size="10.5" font-weight="700" letter-spacing="1"
              fill="${on ? GREEN_TEXT : INK}" opacity="${on ? 1 : 0.4}" style="font-family:${MONO}">${on ? 'ON' : 'OFF'}</text>
          </g>
          ${i < rows.length - 1 ? `<path d="M -8 40 H 494" stroke="${LINE}" stroke-width="1.2"/>` : ''}
        </g>`).join('')}`;
    return { svg: wrap(inner), pills: pP('No dark patterns', 'Six defaults') };
  },
};

/* ── 4 · THE OPEN LEDGER ───────────────────────────────────────────── */
export const ledger = {
  id: 'pr-ledger',
  name: 'The Open Ledger',
  family: 'Engineering',
  tagline: 'Every change, in public',
  desc: 'A changelog writes itself in reverse-chronological order: a price cut logged with its reason, a carrier added, a parser open-sourced with a star count, an incident post-mortem published, a coverage claim corrected downward. Each entry carries a date and a commit-style hash. It is the only option that speaks to "build it properly — own the stack, open-source what helps everyone", and the correction entry is the one that earns the trust.',
  pros: ['Backs the engineering principle, which the other options ignore', 'The downward correction is more persuasive than any claim', 'Speaks directly to a technical reader evaluating the company', 'Extends forever — it is a real artefact the company already has'],
  cons: ['Densest option here, and the least glanceable', 'Only works if the public changelog genuinely exists', 'Reads as engineering culture rather than traveller benefit'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const rows = [
      ['a7f21c', 'Sep 12', 'Japan 5 GB cut to $4.00', 'wholesale renegotiated · passed through', P.deep],
      ['3e9b04', 'Sep 04', 'Coverage claim corrected: 194 → 190', 'four markets were partner-only. Our error', RED],
      ['c11d88', 'Aug 27', 'esim-profile-parser open-sourced', 'MIT · 1.2k stars', GREEN_TEXT],
      ['81af5e', 'Aug 19', 'Post-mortem published: 41 min activation delay', 'root cause, timeline, what we changed', INK],
      ['5db730', 'Aug 08', 'Tier-1 partner added: NTT Docomo', 'direct, no aggregator in between', P.deep],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 240, 240, uid)}
      ${mono(40, 44, 'PUBLIC CHANGELOG · LAST 40 DAYS', { size: 10, op: 0.32 })}
      ${panel(40, 60, 560, 356)}
      ${rows.map(([h, d, t, s, c], i) => `
        <g transform="translate(66 ${100 + i * 68})" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${0.2 + i * 0.5}s" fill="freeze"/>
          <circle cx="4" cy="-4" r="4.5" fill="${c}"/>
          ${mono(24, 0, h, { size: 10, op: 0.35 })}
          ${mono(508, 0, d, { size: 10, op: 0.35, anchor: 'end' })}
          ${label(24, 22, t, { size: 13.5 })}
          <text x="24" y="42" font-size="11.5" fill="${INK}" opacity="0.5">${s}</text>
          ${i < rows.length - 1 ? `<path d="M 4 4 V 52" stroke="${LINE}" stroke-width="1.5"/>` : ''}
        </g>`).join('')}`;
    return { svg: wrap(inner), pills: pP('Own the stack', 'Logged in public') };
  },
};

/* ── 5 · FOUR GATES ────────────────────────────────────────────────── */
export const gates = {
  id: 'pr-gates',
  name: 'Four Gates',
  family: 'Systemic',
  tagline: 'One decision, tested against all four',
  desc: 'A proposed decision — "add a $1.99 activation fee, +18% margin" — enters at the left and is run past the four principles from the cards beside it. Travelers first rejects it. The panel resets and a second proposal, "buy direct from Docomo, price drops 12%", passes all four and ships. It is the only option that makes the four left-hand cards functional instead of decorative, by showing them being used to kill something profitable.',
  pros: ['Binds the animation to the four cards already on the page', 'Rejecting a profitable idea is the most credible possible proof', 'Single clear left-to-right reading, no dense text', 'Covers all four principles rather than one'],
  cons: ['Needs two full passes to land, so the loop is the longest here', 'Slightly abstract — gates are a metaphor, not a real object', 'The invented proposals have to stay plausible'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 4, brand: 5, ease: 3 },
  build: (uid) => {
    const g = ['Travelers first', 'Say the real number', 'Build it properly', 'Global by default'];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 230, 250, uid)}
      ${mono(40, 42, 'EVERY DECISION, RUN PAST FOUR', { size: 10, op: 0.32 })}

      <!-- the proposal card -->
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="-150 0;-150 0;0 0;0 0;-150 0" keyTimes="0;0.04;0.22;0.9;1" dur="9s" repeatCount="indefinite"/>
        <g transform="translate(46 168)">
          ${card(0, 0, 196, 92, { r: 14, stroke: INK, sw: 2.5 })}
          ${mono(18, 26, 'PROPOSAL', { size: 9, op: 0.38 })}
          <g><animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.44;0.48;0.96;1" dur="9s" repeatCount="indefinite"/>
            ${label(18, 50, 'Add a $1.99', { size: 13.5 })}${label(18, 68, 'activation fee', { size: 13.5 })}
            ${mono(18, 84, '+18% MARGIN', { size: 9, op: 0.5, fill: GREEN_TEXT })}
          </g>
          <g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.46;0.5;0.96;1" dur="9s" repeatCount="indefinite"/>
            ${label(18, 50, 'Buy direct from', { size: 13.5 })}${label(18, 68, 'NTT Docomo', { size: 13.5 })}
            ${mono(18, 84, 'PRICE DROPS 12%', { size: 9, op: 0.5, fill: GREEN_TEXT })}
          </g>
        </g>
      </g>

      <!-- the four gates -->
      ${g.map((t, i) => {
    const x = 276 + i * 84;
    return `
        <g transform="translate(${x} 120)">
          <path d="M 0 0 V 188" stroke="${LINE}" stroke-width="2"/>
          <g>
            <!-- pass 1: gate 0 rejects, so only gate 0 reacts -->
            <circle cx="0" cy="94" r="13" fill="${WHITE}" stroke="${INK}" stroke-width="2.5"/>
            ${i === 0 ? `
              <path d="M -5 89 l 10 10 M 5 89 l -10 10" stroke="${RED}" stroke-width="2.6" stroke-linecap="round" opacity="0">
                <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.2;0.24;0.42;0.46;1" dur="9s" repeatCount="indefinite"/></path>` : ''}
            <path d="M -5 94 l 4 4 l 8 -9" fill="none" stroke="${GREEN}" stroke-width="2.6"
              stroke-linecap="round" stroke-linejoin="round" opacity="0">
              <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;${(0.54 + i * 0.05).toFixed(2)};${(0.58 + i * 0.05).toFixed(2)};0.96;1" dur="9s" repeatCount="indefinite"/></path>
          </g>
          <text x="0" y="214" font-size="10.5" font-weight="700" text-anchor="middle" fill="${INK}"
            opacity="0.55" style="font-family:${MONO}">0${i + 1}</text>
          <text x="0" y="234" font-size="10" text-anchor="middle" fill="${INK}" opacity="0.5">${t.split(' ')[0]}</text>
          <text x="0" y="248" font-size="10" text-anchor="middle" fill="${INK}" opacity="0.5">${t.split(' ').slice(1).join(' ')}</text>
        </g>`;
  }).join('')}

      <!-- verdicts -->
      <g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.26;0.3;0.42;0.46;1" dur="9s" repeatCount="indefinite"/>
        <g transform="translate(232 372)">
          ${card(0, 0, 204, 40, { r: 10, fill: '#FEF2F2', stroke: RED, sw: 2 })}
          ${mono(102, 26, 'KILLED AT GATE 01', { size: 11, anchor: 'middle', op: 1, fill: RED })}
        </g>
      </g>
      <g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.78;0.82;0.96;1" dur="9s" repeatCount="indefinite"/>
        <g transform="translate(232 372)">
          ${card(0, 0, 204, 40, { r: 10, fill: GREEN_SOFT, stroke: GREEN, sw: 2 })}
          ${mono(102, 26, 'SHIPPED', { size: 11, anchor: 'middle', op: 1, fill: GREEN_TEXT })}
        </g>
      </g>`;
    return { svg: wrap(inner), pills: pP('How we decide', 'Four gates') };
  },
};

export const PRIN_VARIANTS = [prinCurrent, receipt, footnote, switches, ledger, gates];

/* ═════════════════════════════════════════════════════════════════════
   BUILT BY TRAVELERS, FOR TRAVELERS
   ═════════════════════════════════════════════════════════════════════ */

const PEOPLE = [
  ['AM', 'Lisbon', 118, 170],
  ['JD', 'Berlin', 222, 134],
  ['KT', 'Tokyo', 436, 142],
  ['LC', 'Bogotá', 60, 284],
  ['RS', 'Nairobi', 268, 268],
  ['PF', 'Singapore', 400, 244],
];

const avatar = (x, y, ini, city, o = {}) => `
  <g transform="translate(${x} ${y})">
    <circle r="${o.r || 19}" fill="${o.fill || P.main}" stroke="${INK}" stroke-width="2.5"/>
    <text y="5" font-size="12.5" font-weight="700" text-anchor="middle" fill="${WHITE}">${ini}</text>
    ${city ? mono(0, (o.r || 19) + 18, city, { size: 9, anchor: 'middle', op: 0.5 }) : ''}
  </g>`;

/* ── 0 · CURRENT ───────────────────────────────────────────────────── */
export const teamCurrent = {
  id: 'tm-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'Six avatars on a dotted field',
  desc: 'A dotted panel captioned "THE TEAM, RIGHT NOW" with six initial-avatars labelled Lisbon, Berlin, Tokyo, Bogotá, Nairobi and Singapore, and a "Six timezones, one network" pill at the bottom. It is charming and it is the right idea. But the four percentage cards beside it carry the actual argument, the avatars are not placed on any map, and nothing happens.',
  pros: ['Warm and human, which most of the site is not', 'Six cities is a genuinely good proof of "built by travelers"', 'Reads clearly at small sizes'],
  cons: ['Static — the caption says "right now" and then nothing is live', 'Avatars float on a dot field rather than on a map, so the geography is lost', 'Carries none of the 45 / 25 / 20 / 10 split that the section is actually about', 'The "notice something?" claim below it is left entirely to prose'],
  scores: { story: 3, motion: 2, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => ({
    svg: wrap(`
      ${dots(uid)}
      ${bloom(320, 240, 240, uid)}
      ${mono(320, 52, 'THE TEAM, RIGHT NOW', { size: 10, op: 0.4, anchor: 'middle' })}
      ${PEOPLE.map(([i, c, x, y]) => avatar(x + 60, y + 30, i, c)).join('')}`),
    pills: pT(),
  }),
};

/* ── 1 · FOLLOW THE SUN ────────────────────────────────────────────── */
export const followSun = {
  id: 'tm-sun',
  name: 'Follow the Sun',
  family: 'Minimal change',
  tagline: 'The same six, but one of them is awake',
  desc: 'Exactly the panel that ships, on a real world outline, with a night shadow sweeping across it. Whoever is inside working hours is full colour with a live dot; everyone in the dark is dimmed. A clock in the corner runs, and the shadow never stops, so there is always somebody lit. It keeps the charm, honours the caption "right now", and quietly proves the 24/7 promise made on the contact page.',
  pros: ['Closest option to what ships — lowest risk to approve', 'Finally makes "right now" and "six timezones" mean something', 'Never runs out of motion and never repeats exactly', 'Puts the cities on a map, so the geography reads'],
  cons: ['Still carries none of the team-composition numbers', 'A world outline is more artwork to maintain', 'The point is subtle enough that some readers will miss it'],
  scores: { story: 4, motion: 4, perf: 4, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const inner = `
      ${dots(uid)}
      ${bloom(320, 230, 250, uid)}
      ${mono(40, 44, 'THE TEAM, RIGHT NOW', { size: 10, op: 0.32 })}
      ${mono(600, 44, '09:41 UTC', { size: 10, op: 0.32, anchor: 'end' })}
      ${panel(40, 60, 560, 356)}

      <svg x="42" y="62" width="556" height="352" viewBox="0 0 556 352" overflow="hidden">
        <!-- night terminator -->
        <g opacity="0.1">
          <rect x="-556" y="0" width="330" height="352" fill="${INK}">
            <animate attributeName="x" values="-330;556" dur="18s" repeatCount="indefinite"/>
          </rect>
        </g>
        <!-- landmass suggestion: soft blobs, not a claim to cartographic accuracy -->
        <g fill="${P.main}" opacity="0.14">
          <ellipse cx="96" cy="150" rx="62" ry="50"/><ellipse cx="128" cy="252" rx="34" ry="58"/>
          <ellipse cx="248" cy="128" rx="54" ry="38"/><ellipse cx="266" cy="226" rx="42" ry="60"/>
          <ellipse cx="392" cy="150" rx="86" ry="56"/><ellipse cx="424" cy="252" rx="40" ry="30"/>
        </g>
        ${PEOPLE.map(([i, c, x, y], n) => `
          <g transform="translate(${x - 20} ${y - 18})">
            <g opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.3;1;1;0.3;0.3"
                keyTimes="0;${(n * 0.155).toFixed(3)};${(n * 0.155 + 0.03).toFixed(3)};${(n * 0.155 + 0.2).toFixed(3)};${(n * 0.155 + 0.23).toFixed(3)};1"
                dur="18s" repeatCount="indefinite"/>
              ${avatar(0, 0, i, c)}
              <circle cx="15" cy="-14" r="5" fill="${GREEN}" stroke="${WHITE}" stroke-width="2"/>
            </g>
          </g>`).join('')}
      </svg>
      <g transform="translate(212 372)">
        ${card(0, 0, 216, 36, { r: 18, stroke: INK, sw: 2 })}
        <circle cx="22" cy="18" r="5" fill="${GREEN}"/>
        ${label(38, 23, 'Someone is always awake', { size: 12.5 })}
      </g>`;
    return { svg: wrap(inner), pills: pT('Six timezones, one network', 'Always one online') };
  },
};

/* ── 2 · THE SPLIT, DRAWN ──────────────────────────────────────────── */
export const split = {
  id: 'tm-split',
  name: 'The Split, Drawn',
  family: 'Data-led',
  tagline: 'A hundred squares, counted out',
  desc: 'A hundred squares fill in four bands as you watch — 45 engineering, 25 carrier relations, 20 support, 10 operations — with a running count beside each. The four cards to the right stop being four unrelated percentages and become one shape the reader can verify by counting. It is the most direct possible illustration of the claim the paragraph underneath actually makes.',
  pros: ['Turns four separate numbers into a single readable picture', 'Countable, so the claim is checkable rather than asserted', 'Cheap, crisp, and scales down to mobile without loss', 'Sets up the "45% is engineering" paragraph below it perfectly'],
  cons: ['Loses the human warmth of the avatars entirely', 'A hundred squares is a chart, and this is a team section', 'Says nothing about where the team is, which was the old charm'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: (uid) => {
    const groups = [
      ['Engineering', 45, P.deep, 'Building the best platform'],
      ['Carrier relations', 25, P.main, 'Negotiating wholesale rates'],
      ['Support', 20, '#FDBA74', 'Helping travelers worldwide'],
      ['Operations', 10, '#FED7AA', 'Keeping costs low'],
    ];
    let n = 0;
    const cells = [];
    groups.forEach(([, count, col], gi) => {
      for (let k = 0; k < count; k++, n++) {
        const cx = 40 + (n % 10) * 30, cy = 96 + Math.floor(n / 10) * 30;
        cells.push(`<rect x="${cx}" y="${cy}" width="23" height="23" rx="4" fill="${col}" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.25s" begin="${(0.2 + n * 0.028).toFixed(2)}s" fill="freeze"/>
        </rect>`);
      }
    });
    const inner = `
      ${dots(uid)}
      ${bloom(180, 240, 230, uid)}
      ${mono(40, 66, 'WHO THE HUNDRED PEOPLE ARE', { size: 10, op: 0.32 })}
      ${cells.join('')}
      <g transform="translate(360 96)">
        ${groups.map(([t, c, col, s], i) => `
          <g transform="translate(0 ${i * 74})" opacity="0">
            <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${(0.4 + i * 0.75).toFixed(2)}s" fill="freeze"/>
            <rect width="23" height="23" rx="4" fill="${col}"/>
            <text x="38" y="19" font-size="24" font-weight="700" fill="${col === '#FED7AA' || col === '#FDBA74' ? P.deep : col}"
              style="font-family:${MONO}">${c}%</text>
            ${label(38, 42, t, { size: 13 })}
            <text x="38" y="60" font-size="11" fill="${INK}" opacity="0.5">${s}</text>
          </g>`).join('')}
      </g>
      <g transform="translate(40 402)" opacity="0">
        <animate attributeName="opacity" values="0;1" dur="0.4s" begin="3.6s" fill="freeze"/>
        ${mono(0, 0, 'NEARLY HALF OF THIS TEAM WRITES THE PLATFORM', { size: 9.5, op: 0.42 })}
      </g>`;
    return { svg: wrap(inner), pills: pT('100 people, counted', '45% engineering') };
  },
};

/* ── 3 · AGAINST THE INDUSTRY ──────────────────────────────────────── */
export const versus = {
  id: 'tm-versus',
  name: 'Against the Industry',
  family: 'Positioning',
  tagline: 'Where everyone else puts their people',
  desc: 'Two stacked bars grow side by side: a typical eSIM reseller, where marketing and sales take roughly sixty percent of headcount and engineering takes ten, and Openline, where engineering takes forty-five and marketing is a sliver. A line underneath draws the consequence — their cost goes into acquisition, ours goes into the stack, which is why the price is lower. It states the argument the paragraph below makes, rather than the composition alone.',
  pros: ['Makes the comparison the prose is already making, visually', 'Explains why the prices differ, which is the real point', 'Two bars is the simplest chart on the site', 'Directly supports the "notice something?" callout beneath'],
  cons: ['The competitor figure is an estimate and will be challenged', 'Adversarial framing in a section about our own team', 'No people in it at all'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 3, ease: 4 },
  build: (uid) => {
    const bar = (y, title, segs, note) => `
      <g transform="translate(56 ${y})">
        ${label(0, 0, title, { size: 14 })}
        <text x="500" y="0" font-size="11" text-anchor="end" fill="${INK}" opacity="0.45">${note}</text>
        <g transform="translate(0 14)">
          ${segs.map(([pc, col, lab], i) => {
      const x0 = segs.slice(0, i).reduce((a, s) => a + s[0], 0) * 5;
      return `<g>
              <rect x="${x0}" y="0" width="0" height="42" rx="${i === 0 ? '6' : i === segs.length - 1 ? '6' : '2'}" fill="${col}">
                <animate attributeName="width" values="0;${pc * 5}" dur="0.9s" begin="${0.3 + i * 0.16}s" fill="freeze"/>
              </rect>
              ${pc >= 14 ? `<text x="${x0 + pc * 2.5}" y="27" font-size="12" font-weight="700" text-anchor="middle"
                fill="${col === '#F1F2F4' || col === '#FED7AA' ? INK : WHITE}" opacity="0" style="font-family:${MONO}">${pc}%
                <animate attributeName="opacity" values="0;${col === '#F1F2F4' ? 0.55 : 1}" dur="0.3s" begin="${1 + i * 0.16}s" fill="freeze"/></text>` : ''}
              ${lab ? `<text x="${x0 + pc * 2.5}" y="62" font-size="10.5" text-anchor="middle" fill="${INK}" opacity="0"
                >${lab}<animate attributeName="opacity" values="0;0.55" dur="0.3s" begin="${1.1 + i * 0.16}s" fill="freeze"/></text>` : ''}
            </g>`;
    }).join('')}
        </g>
      </g>`;
    const inner = `
      ${dots(uid)}
      ${bloom(320, 230, 250, uid)}
      ${mono(40, 46, 'HEADCOUNT, BY FUNCTION', { size: 10, op: 0.32 })}
      ${bar(96, 'A typical eSIM reseller', [[60, '#D1D5DB', 'marketing & sales'], [10, '#9CA3AF', 'eng'], [30, '#F1F2F4', 'other']], 'industry estimate')}
      ${bar(236, 'Openline', [[45, P.deep, 'engineering'], [25, P.main, 'carrier relations'], [20, '#FDBA74', 'support'], [10, '#FED7AA', 'ops']], 'actual')}
      <g transform="translate(56 356)" opacity="0">
        <animate attributeName="opacity" values="0;1" dur="0.5s" begin="2.4s" fill="freeze"/>
        ${card(0, 0, 504, 62, { r: 12, fill: P.wash, stroke: P.soft, sw: 2 })}
        ${label(22, 28, 'They spend headcount acquiring you.', { size: 13 })}
        <text x="22" y="48" font-size="12.5" fill="${P.deep}" font-weight="700">We spend it on the stack — which is why the price is lower.</text>
      </g>`;
    return { svg: wrap(inner), pills: pT('45% engineering', 'vs 10% industry') };
  },
};

/* ── 4 · A TICKET'S LIFE ───────────────────────────────────────────── */
export const ticketLife = {
  id: 'tm-ticket',
  name: "A Ticket's Life",
  family: 'Consequence',
  tagline: 'Why the mix matters, in four minutes',
  desc: 'A traveller in Osaka cannot activate. The ticket lands with support in Bogotá at 00:12, is reproduced, handed to engineering in Berlin at 01:40, a fix ships at 03:20, and the traveller is online at 03:58 — then the fix is noted as shipped for everyone. It is the only option that answers "so what?": this is what forty-five percent engineering buys a traveller, measured in minutes.',
  pros: ['Answers the question the percentages leave open', 'Keeps the people and the cities, unlike the chart options', 'A clock running is the most legible motion available', 'Ends on the strongest note: fixed once, fixed for everybody'],
  cons: ['Longest loop of the five, and the most to read', 'A specific incident invites questions about typical times', 'Overlaps with the support story on the contact page'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 3, brand: 5, ease: 3 },
  build: (uid) => {
    const steps = [
      ['00:12', 'LC', 'Bogotá', 'Ticket in — cannot activate in Osaka', '#FDBA74'],
      ['01:40', 'JD', 'Berlin', 'Reproduced. Handed to engineering', P.main],
      ['03:20', 'JD', 'Berlin', 'Profile parser patched, shipped', P.deep],
      ['03:58', 'KT', 'Osaka', 'Traveler online', GREEN],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 240, 240, uid)}
      ${mono(40, 44, 'ONE TICKET, START TO FINISH', { size: 10, op: 0.32 })}
      ${mono(600, 44, 'ELAPSED 03:58', { size: 10, op: 0.32, anchor: 'end' })}
      ${panel(40, 60, 560, 300)}
      <path d="M 96 108 V 316" stroke="${LINE}" stroke-width="2"/>
      ${steps.map(([t, ini, city, text, col], i) => `
        <g transform="translate(96 ${116 + i * 66})" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.35s" begin="${0.3 + i * 1.1}s" fill="freeze"/>
          ${avatar(0, 0, ini, '', { r: 17, fill: col })}
          ${mono(34, -4, `${t} · ${city.toUpperCase()}`, { size: 9.5, op: 0.4 })}
          ${label(34, 16, text, { size: 13 })}
        </g>`).join('')}
      <g transform="translate(160 384)" opacity="0">
        <animate attributeName="opacity" values="0;1" dur="0.4s" begin="4.8s" fill="freeze"/>
        ${card(0, 0, 320, 40, { r: 10, fill: GREEN_SOFT, stroke: GREEN, sw: 2 })}
        ${mono(160, 25, 'FIXED ONCE — FIXED FOR EVERYONE', { size: 10.5, anchor: 'middle', op: 1, fill: GREEN_TEXT })}
      </g>`;
    return { svg: wrap(inner), pills: pT('Support to engineering', '3 min 58 s') };
  },
};

/* ── 5 · WHERE WE HAVE ACTUALLY BEEN ───────────────────────────────── */
export const travelled = {
  id: 'tm-travelled',
  name: 'Where We Have Actually Been',
  family: 'Credibility',
  tagline: 'Built by travelers — here is the receipt',
  desc: 'Pins drop one after another for every country somebody on this team has personally used an Openline eSIM in, with a counter climbing to seventy-four and the current pin naming the person and the place. The section heading claims the team are travellers; this is the only option that produces evidence for it, and it produces a number nobody else in the category can copy.',
  pros: ['Proves the headline claim rather than restating it', 'A climbing counter is the most compelling motion on the page', 'Ownable — no competitor can borrow this number', 'Reads instantly, at any size, with no text to parse'],
  cons: ['The 74 has to be a real, defensible figure', 'Needs a world map, which is the heaviest artwork here', 'Says nothing about team composition, which the cards then carry alone'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 4, brand: 5, ease: 3 },
  build: (uid) => {
    const pins = [
      [112, 156, 'AM', 'Portugal'], [186, 132, 'JD', 'Germany'], [248, 178, 'RS', 'Türkiye'],
      [318, 214, 'PF', 'India'], [402, 158, 'KT', 'Japan'], [372, 258, 'PF', 'Singapore'],
      [96, 268, 'LC', 'Colombia'], [166, 316, 'LC', 'Chile'], [258, 286, 'RS', 'Kenya'],
      [444, 300, 'KT', 'Australia'], [142, 108, 'AM', 'Iceland'], [300, 124, 'JD', 'Georgia'],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(300, 230, 260, uid)}
      ${mono(40, 44, 'COUNTRIES THIS TEAM HAS TRAVELED ON AN OPENLINE eSIM', { size: 10, op: 0.32 })}
      ${panel(40, 60, 560, 300)}
      <svg x="42" y="62" width="556" height="296" viewBox="0 0 556 296" overflow="hidden">
        <g fill="${P.main}" opacity="0.13" transform="translate(-20 -50)">
          <ellipse cx="110" cy="160" rx="64" ry="52"/><ellipse cx="150" cy="286" rx="36" ry="62"/>
          <ellipse cx="246" cy="134" rx="56" ry="40"/><ellipse cx="266" cy="240" rx="44" ry="62"/>
          <ellipse cx="392" cy="158" rx="90" ry="58"/><ellipse cx="440" cy="276" rx="42" ry="32"/>
        </g>
        ${pins.map(([x, y, ini, place], i) => `
          <g transform="translate(${x - 20} ${y - 60})" opacity="0">
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.04;1" dur="7s"
              begin="${(0.2 + i * 0.42).toFixed(2)}s" fill="freeze"/>
            <path d="M 0 0 c 0 -9 -7 -13 -7 -20 a 7 7 0 0 1 14 0 c 0 7 -7 11 -7 20 z" fill="${P.main}" stroke="${INK}" stroke-width="2"/>
            <circle cy="-20" r="2.6" fill="${WHITE}"/>
            <g opacity="0">
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.5;0.62" dur="2.4s"
                begin="${(0.2 + i * 0.42).toFixed(2)}s"/>
              ${card(10, -44, 108, 26, { r: 13, stroke: INK, sw: 2 })}
              ${mono(64, -26, `${ini} · ${place.toUpperCase()}`, { size: 8.5, anchor: 'middle', op: 0.75 })}
            </g>
          </g>`).join('')}
      </svg>
      <g transform="translate(40 382)">
        ${card(0, 0, 200, 46, { r: 12, fill: INK, stroke: INK })}
        ${mono(20, 20, 'COUNTRIES, PERSONALLY', { size: 8.5, op: 0.5, fill: WHITE })}
        <text x="20" y="38" font-size="19" font-weight="700" fill="${P.main}" style="font-family:${MONO}">74</text>
        <text x="60" y="38" font-size="11" fill="${WHITE}" opacity="0.5">of 190 covered</text>
      </g>
      ${mono(600, 410, 'SIX TIMEZONES · ONE NETWORK', { size: 9.5, op: 0.35, anchor: 'end' })}`;
    return { svg: wrap(inner), pills: pT('74 countries, personally', 'Six timezones') };
  },
};

export const TEAM_VARIANTS = [teamCurrent, followSun, split, versus, ticketLife, travelled];
