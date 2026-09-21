/* ══ /about · options 6–10 for both blocks ═══════════════════════════════
   Paul asked every 5- and 6-option board up to ten. These are the second
   five for "Our Principles" and for "Built by Travelers, for Travelers".
   Same orange system, same two embed boxes: 592 × 430 and 592 × 480.     */

import { mk, INK, WHITE, GRAY, LINE, GREEN, GREEN_SOFT, GREEN_TEXT, RED, AMBER, pill, icon, boxWrap } from './kit.js';

const K = mk('orange');
const { P, wrap, dots, bloom, mono, label, num, card, panel, badge, tick, MONO } = K;

const wTM = (inner) => boxWrap(640, 519)(`<g transform="translate(0 29.5)">${inner}</g>`);

const pP = (a, b = '') => [
  pill('orange', `${icon('shield')}${a}`, { top: '14px', right: '14px' }),
  ...(b ? [pill('white', `<span class="dot"></span>${b}`, { top: '70px', right: '14px' })] : []),
];
const pT = (a, b = '') => [
  pill('orange', `${icon('globe')}${a}`, { top: '14px', right: '14px' }),
  ...(b ? [pill('white', `<span class="dot"></span>${b}`, { top: '70px', right: '14px' })] : []),
];

/* ═══════════════════════════════════════════════════════════════════════
   OUR PRINCIPLES · 6–10
   ═══════════════════════════════════════════════════════════════════════ */

/* ── 6 · THE CANCEL BUTTON ───────────────────────────────────────────── */
export const cancelButton = {
  id: 'pr-cancel',
  name: 'The Cancel Button',
  family: 'Contrast',
  tagline: 'Their four screens, and our one',
  desc: 'On the left, a cancellation flow of the kind everybody has been through: four screens, a retention offer, a "you will lose your benefits" warning and a phone number to call. Each one slides up in turn and a counter of taps climbs. On the right, the same job on Openline: one screen, one button, done, and the counter stops at one. It is the cleanest possible demonstration of "no lock-in, no dark patterns" because the reader has personally suffered the left-hand column.',
  pros: ['Argues the principle against a thing every reader has lived through', 'The tap counter makes the comparison a number rather than a feeling', 'No competitor is named, so it stays fair', 'Cancellation is the one moment that proves a company means it'],
  cons: ['Puts a cancel flow on an About page, which some will read as inviting churn', 'Needs both columns, so it is the densest of the ten on mobile'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 3, brand: 4, ease: 4 },
  build: (uid) => {
    const theirs = [
      ['Are you sure?', 'You have 18 days left'],
      ['Wait — 50% off', 'Stay for $2/mo instead'],
      ['You will lose', 'Priority support, saved eSIMs'],
      ['Call to confirm', 'Mon–Fri, 9–5 CET'],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(150, 250, 210, uid, RED)}
      ${bloom(480, 230, 200, uid)}
      ${mono(40, 40, 'CANCELLING, BOTH WAYS', { size: 10, op: 0.32 })}

      <g transform="translate(40 62)">
        ${mono(0, 0, 'THE USUAL', { size: 9.5, op: 0.4, fill: RED })}
        ${theirs.map(([t, s], i) => `
          <g transform="translate(0 ${16 + i * 76})" opacity="0">
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.08;1" dur="5.4s"
              begin="${(i * 0.85).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
            <g>
              <animateTransform attributeName="transform" type="translate" values="0 16;0 0"
                dur="0.4s" begin="${(i * 0.85).toFixed(2)}s" fill="freeze" repeatCount="indefinite" additive="sum"/>
              ${card(0, 0, 214, 62, { r: 12, stroke: '#F3C9CB', sw: 2 })}
              ${label(16, 26, t, { size: 13 })}
              <text x="16" y="45" font-size="11" fill="${INK}" opacity="0.5">${s}</text>
              <circle cx="196" cy="31" r="7" fill="${RED}" opacity="0.14"/>
              <text x="196" y="35" text-anchor="middle" font-size="10" font-weight="700" fill="${RED}">${i + 1}</text>
            </g>
          </g>`).join('')}
        <g transform="translate(0 344)">
          ${mono(0, 0, 'TAPS TO LEAVE', { size: 9, op: 0.42 })}
          <text x="132" y="2" font-size="20" font-weight="700" fill="${RED}" style="font-family:${MONO}">
            <animate attributeName="textContent" values="1;2;3;4;4" keyTimes="0;0.2;0.4;0.6;1"
              dur="5.4s" repeatCount="indefinite"/>4</text>
        </g>
      </g>

      <path d="M 300 100 V 380" stroke="${LINE}" stroke-width="2" stroke-dasharray="5 7"/>

      <g transform="translate(344 62)">
        ${mono(0, 0, 'ON OPENLINE', { size: 9.5, op: 0.45, fill: P.deep })}
        <g transform="translate(0 16)">
          ${panel(0, 0, 232, 176, { r: 14 })}
          ${label(20, 38, 'Cancel your plan', { size: 14 })}
          <text x="20" y="60" font-size="11.5" fill="${INK}" opacity="0.55">Ends at the date you already paid to.</text>
          <text x="20" y="78" font-size="11.5" fill="${INK}" opacity="0.55">No fee. Nothing to call.</text>
          <g transform="translate(20 100)">
            <rect width="192" height="44" rx="10" fill="${INK}"/>
            <text x="96" y="28" text-anchor="middle" font-size="13" font-weight="700" fill="${WHITE}">Cancel plan</text>
            <rect width="192" height="44" rx="10" fill="${P.main}" opacity="0">
              <animate attributeName="opacity" values="0;0;0.14;0;0" keyTimes="0;0.3;0.36;0.5;1"
                dur="5.4s" repeatCount="indefinite"/>
            </rect>
          </g>
          <g transform="translate(116 158)" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.38;0.46;0.92;1"
              dur="5.4s" repeatCount="indefinite"/>
            ${tick(-52, 0, 'Cancelled. That was it.', { size: 11.5 })}
          </g>
        </g>
        <g transform="translate(0 344)">
          ${mono(0, 0, 'TAPS TO LEAVE', { size: 9, op: 0.42 })}
          ${num(132, 2, '1', { size: 20, fill: GREEN_TEXT })}
        </g>
      </g>`;
    return { svg: wrap(inner), pills: pP('No lock-in', 'One tap to leave') };
  },
};

/* ── 7 · OPEN BY DEFAULT ─────────────────────────────────────────────── */
export const openByDefault = {
  id: 'pr-open',
  name: 'Open by Default',
  family: 'Proof',
  tagline: 'The part of the stack anyone can read',
  desc: 'A commit stream fills a terminal-style panel: real repository names, a LICENSE line reading MIT, a star count ticking up, and a small note that the device-compatibility database is public. It is the only one of the ten that evidences "build it properly, own the stack, open-source what helps everyone" with an artefact the reader could go and check for themselves.',
  pros: ['The single most checkable claim on the page — a repo either exists or it does not', 'Ties the principles block to something Openline genuinely publishes', 'Developer-legible without being alienating to a traveller', 'Cheap to keep true: the panel can read from the real repo later'],
  cons: ['Only lands for the slice of readers who know what a commit is', 'A code panel is a cold object for a values section', 'Creates an obligation — the repos have to stay alive'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const rows = [
      ['openline/device-db', 'add 41 Android models, verified', '#0E7490'],
      ['openline/esim-spec', 'document the activation handshake', '#7C3AED'],
      ['openline/device-db', 'correct iPhone 14 eSIM slot count', '#0E7490'],
      ['openline/status', 'publish raw uptime, unrounded', '#B45309'],
      ['openline/device-db', 'community PR merged — thanks!', '#127C52'],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 230, 230, uid)}
      ${mono(40, 40, 'WHAT WE PUBLISH', { size: 10, op: 0.32 })}
      <g transform="translate(40 60)">
        <rect width="560" height="286" rx="16" fill="#0A1122"/>
        <rect width="560" height="34" rx="16" fill="#131C31"/>
        <rect y="22" width="560" height="12" fill="#131C31"/>
        <circle cx="22" cy="17" r="4" fill="#FF5F57"/><circle cx="38" cy="17" r="4" fill="#FEBC2E"/>
        <circle cx="54" cy="17" r="4" fill="#28C840"/>
        ${mono(76, 21, 'git log --author=openline', { size: 9.5, op: 0.5, fill: '#93A3BF' })}
        ${rows.map(([repo, msg, col], i) => `
          <g transform="translate(24 ${62 + i * 44})" opacity="0">
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.05;1" dur="5.8s"
              begin="${(i * 0.72).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
            <circle cx="4" cy="-4" r="4.5" fill="${col}"/>
            <path d="M 4 1 V 40" stroke="#243247" stroke-width="1.6" opacity="${i === rows.length - 1 ? 0 : 1}"/>
            <text x="22" y="0" font-size="11.5" font-weight="700" fill="#E7EDF7" style="font-family:${MONO}">${repo}</text>
            <text x="22" y="17" font-size="11" fill="#8C9DBA">${msg}</text>
            ${mono(512, 0, ['2h', '5h', '1d', '2d', '3d'][i], { size: 9, op: 0.45, fill: '#6C7C99', anchor: 'end' })}
          </g>`).join('')}
        <g transform="translate(24 256)">
          <rect width="96" height="24" rx="6" fill="#132A22"/>
          ${mono(48, 16, 'MIT LICENSE', { size: 9, anchor: 'middle', op: 1, fill: '#4ADE80' })}
          <g transform="translate(112 0)">
            <rect width="132" height="24" rx="6" fill="#1A2236"/>
            <path d="M 14 16 l 2.6 -5.4 l 2.6 5.4 l -2.6 -1.7 z" fill="#FBBF24"/>
            ${mono(30, 16, 'STARS', { size: 9, op: 0.5, fill: '#93A3BF' })}
            <text x="118" y="16" text-anchor="end" font-size="10" font-weight="700" fill="#E7EDF7" style="font-family:${MONO}">
              <animate attributeName="textContent" values="1,180;1,181;1,183;1,184;1,186"
                dur="5.8s" repeatCount="indefinite"/>1,186</text>
          </g>
          ${mono(392, 16, 'ANYONE CAN READ THIS', { size: 9, op: 0.4, fill: '#6C7C99' })}
        </g>
      </g>
      ${mono(40, 374, 'THE DEVICE DATABASE IS PUBLIC · CORRECTIONS ARRIVE FROM STRANGERS', { size: 9, op: 0.34 })}`;
    return { svg: wrap(inner), pills: pP('Own the stack', 'Open-sourced') };
  },
};

/* ── 8 · LOAD-BEARING ────────────────────────────────────────────────── */
export const loadBearing = {
  id: 'pr-load',
  name: 'Load-Bearing',
  family: 'Structure',
  tagline: 'Pull one out and the thing tilts',
  desc: 'Four columns — one per principle — hold a plate reading "The product". One column dims and withdraws; the plate tilts and a red note names what breaks. Then it returns and the plate settles level again, and the cycle moves to the next column. It argues that these are not four nice sentences but four things the product is standing on.',
  pros: ['Turns a list into a structure, which is the one thing the live panel fails to do', 'Each removal names a concrete failure, so the principles stop being abstract', 'One idea, four beats — legible with no reading required', 'Scales down to a single column on mobile without losing the point'],
  cons: ['The most metaphorical of the ten; nothing on screen is a real object', 'Four beats makes it the longest loop in the set, near nine seconds'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 4, brand: 4, ease: 3 },
  build: (uid) => {
    const cols = [
      ['Travelers\nfirst', 'Without it, the roadmap serves the margin'],
      ['Say the real\nnumber', 'Without it, the price is a hook'],
      ['Build it\nproperly', 'Without it, you are reselling somebody else'],
      ['No hidden\nfees', 'Without it, none of the other three are true'],
    ];
    const D = 9.2, each = D / 4;
    const inner = `
      ${dots(uid)}
      ${bloom(320, 200, 240, uid)}
      ${mono(40, 40, 'FOUR THINGS IT STANDS ON', { size: 10, op: 0.32 })}
      <g transform="translate(320 196)">
        <g>
          ${cols.map((_, i) => `
            <animateTransform attributeName="transform" type="rotate"
              values="0;${i % 2 ? 2.6 : -2.6};0" keyTimes="0;0.5;1" dur="${each}s"
              begin="${(i * each + 0.6).toFixed(2)}s" repeatCount="indefinite" additive="sum"/>`).join('')}
          <rect x="-232" y="-96" width="464" height="52" rx="12" fill="${WHITE}" stroke="${INK}" stroke-width="2.5"/>
          ${label(0, -64, 'The product', { size: 15, anchor: 'middle' })}
        </g>
        ${cols.map(([t, why], i) => {
      const x = -174 + i * 116, begin = (i * each + 0.6).toFixed(2);
      return `
          <g transform="translate(${x} 0)">
            <g>
              <animateTransform attributeName="transform" type="translate" values="0 0;0 74;0 0;0 0"
                keyTimes="0;0.34;0.68;1" dur="${each}s" begin="${begin}s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0.16;1;1" keyTimes="0;0.34;0.68;1"
                dur="${each}s" begin="${begin}s" repeatCount="indefinite"/>
              <rect x="-42" y="-40" width="84" height="132" rx="10" fill="${P.wash}" stroke="${INK}" stroke-width="2.2"/>
              ${t.split('\n').map((ln, j) =>
        `<text x="0" y="${-8 + j * 17}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${ln}</text>`).join('')}
              ${mono(0, 74, `0${i + 1}`, { size: 11, anchor: 'middle', op: 0.4 })}
            </g>
            <g opacity="0">
              <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.34;0.6;0.68;1"
                dur="${each}s" begin="${begin}s" repeatCount="indefinite"/>
              <rect x="-56" y="106" width="112" height="52" rx="9" fill="#FEF2F2" stroke="#F3C9CB" stroke-width="1.8"/>
              ${why.split(' ').reduce((a, w) => {
          const l = a[a.length - 1];
          if ((l + ' ' + w).length > 19) a.push(w); else a[a.length - 1] = l + ' ' + w;
          return a;
        }, ['']).slice(0, 3).map((ln, j) =>
          `<text x="0" y="${122 + j * 12}" text-anchor="middle" font-size="9" fill="${RED}" opacity="0.9">${ln.trim()}</text>`).join('')}
            </g>
            <path d="M -42 92 H 42" stroke="${INK}" stroke-width="2.5" opacity="0.18"/>
          </g>`;
    }).join('')}
        <path d="M -238 96 H 238" stroke="${INK}" stroke-width="3"/>
      </g>
      ${mono(40, 412, 'NOT A LIST — A STRUCTURE. REMOVE ONE AND THE PRODUCT LEANS.', { size: 9, op: 0.34 })}`;
    return { svg: wrap(inner), pills: pP('How we operate', 'All four, or none') };
  },
};

/* ── 9 · PLAIN LANGUAGE ──────────────────────────────────────────────── */
export const plainLanguage = {
  id: 'pr-plain',
  name: 'Plain Language',
  family: 'Proof',
  tagline: 'Two hundred words of terms, redacted to one line',
  desc: 'A wall of grey legalese sits in the panel. A sweep passes down it and strikes out everything that is hedging — "subject to fair use", "at our sole discretion", "up to", "where available" — until a single black sentence is left standing: "5 GB in Japan for 30 days. $4. Nothing else." It applies "say the real number" to the terms rather than the price, which is where the real number usually goes to hide.',
  pros: ['Attacks fine print, which is the mechanism readers actually distrust', 'The contrast between grey noise and one black line needs no label', 'Reads at any size, because the payload is one sentence', 'Sits naturally beside the "no hidden fees" card on the left'],
  cons: ['Very close in spirit to The Footnote Trap, so the two compete', 'Striking out legalese implies a claim about competitors\' contracts'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const lines = [
      'Service is provided on a reasonable-endeavours basis and may be',
      'subject to fair-use limitations applied at our sole discretion,',
      'with speeds of up to the stated maximum where available, and',
      'throughput may be managed during periods of network congestion;',
      'charges quoted exclude applicable taxes, levies and third-party',
      'surcharges, which may be revised without prior notice, and the',
      'foregoing is subject to the terms set out in Schedule 4 hereto.',
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 220, 230, uid)}
      ${mono(40, 40, 'THE SAME OFFER, TWICE', { size: 10, op: 0.32 })}
      <g transform="translate(64 66)">
        ${panel(0, 0, 512, 210, { r: 14 })}
        ${mono(20, 26, 'TERMS OF SERVICE · EXTRACT', { size: 9, op: 0.34 })}
        ${lines.map((ln, i) => `
          <g transform="translate(20 ${50 + i * 22})">
            <text font-size="11" fill="${INK}" opacity="0.46">${ln}</text>
            <path d="M 0 -4 H 0" stroke="${RED}" stroke-width="1.8" opacity="0.85">
              <animate attributeName="d" values="M 0 -4 H 0;M 0 -4 H 466" dur="0.42s"
                begin="${(0.5 + i * 0.26).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.85;0.85;0" keyTimes="0;0.74;1"
                dur="6.2s" begin="${(0.5 + i * 0.26).toFixed(2)}s" repeatCount="indefinite"/>
            </path>
            <animate attributeName="opacity" values="1;1;0.12;0.12" keyTimes="0;0.36;0.44;1"
              dur="6.2s" begin="${(0.5 + i * 0.26).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
          </g>`).join('')}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.44;0.54;1" dur="6.2s" repeatCount="indefinite"/>
          <rect x="20" y="118" width="472" height="66" rx="12" fill="${P.wash}" stroke="${P.main}" stroke-width="2.2"/>
          <text x="40" y="150" font-size="17" font-weight="700" fill="${INK}">5 GB in Japan for 30 days.</text>
          <text x="40" y="172" font-size="17" font-weight="700" fill="${P.deep}">$4. Nothing else.</text>
        </g>
      </g>
      <g transform="translate(64 300)">
        ${mono(0, 0, 'WORDS BEFORE', { size: 9, op: 0.4 })}
        ${num(0, 24, '214', { size: 22, fill: INK })}
        ${mono(150, 0, 'WORDS AFTER', { size: 9, op: 0.4 })}
        ${num(150, 24, '11', { size: 22 })}
        ${mono(300, 0, 'MEANING LOST', { size: 9, op: 0.4 })}
        ${num(300, 24, 'none', { size: 22, fill: GREEN_TEXT })}
      </g>
      ${mono(64, 372, 'IF IT CANNOT BE SAID IN ONE LINE, IT IS NOT THE REAL NUMBER', { size: 9, op: 0.34 })}`;
    return { svg: wrap(inner), pills: pP('Say the real number', 'No fine print') };
  },
};

/* ── 10 · KEPT COUNT ─────────────────────────────────────────────────── */
export const keptCount = {
  id: 'pr-kept',
  name: 'Kept Count',
  family: 'Accountability',
  tagline: 'Each promise, with the days it has held',
  desc: 'The four principles become four rows in a ledger, each with the date it was written and a counter of days kept without exception, climbing as you watch. One row carries an honest asterisk — a single incident, linked, with what changed afterwards. It is the only option here that makes the principles falsifiable, and the admitted exception is what makes the other three believable.',
  pros: ['Puts a number against a value, which is rare and disarming', 'The one admitted failure buys more trust than four clean rows would', 'Gives the block a reason to be revisited, since the counters move', 'Very cheap to render and completely legible on a phone'],
  cons: ['Requires the company to actually maintain it, and to publish the next incident', 'A counter reset would be visible and embarrassing — that is the point, and the risk'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: (uid) => {
    const rows = [
      ['Travelers first', 'No lock-in, no dark patterns', 'Mar 2024', '548', null],
      ['Say the real number', 'Prices and limits, stated plainly', 'Mar 2024', '548', null],
      ['No hidden fees', 'Nothing added after checkout', 'Mar 2024', '548', null],
      ['Build it properly', 'Own the stack, publish what helps', 'Mar 2024', '61', 'Nov 2025 — one supplier outage we had not planned a fallback for. We wrote about it, then built the fallback.'],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 200, 230, uid)}
      ${mono(40, 40, 'PROMISES, AND THE DAYS THEY HAVE HELD', { size: 10, op: 0.32 })}
      <g transform="translate(40 60)">
        ${panel(0, 0, 560, 236, { r: 16 })}
        <path d="M 0 40 H 560" stroke="${LINE}" stroke-width="1.5"/>
        ${mono(20, 26, 'PRINCIPLE', { size: 9, op: 0.34 })}
        ${mono(392, 26, 'WRITTEN', { size: 9, op: 0.34 })}
        ${mono(540, 26, 'DAYS KEPT', { size: 9, op: 0.34, anchor: 'end' })}
        ${rows.map(([t, s, when, days, note], i) => `
          <g transform="translate(0 ${40 + i * 49})" opacity="0">
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.06;1" dur="6s"
              begin="${(i * 0.4).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
            ${i ? `<path d="M 20 0 H 540" stroke="${LINE}" stroke-width="1.2"/>` : ''}
            ${label(20, 24, t, { size: 13 })}
            <text x="20" y="40" font-size="10.5" fill="${INK}" opacity="0.48">${s}</text>
            ${mono(392, 28, when, { size: 10, op: 0.55 })}
            <g transform="translate(540 28)">
              <text text-anchor="end" font-size="17" font-weight="700" style="font-family:${MONO}"
                fill="${note ? AMBER : GREEN_TEXT}">
                <animate attributeName="textContent"
                  values="${days};${days};${(+days + 1)}" keyTimes="0;0.7;1" dur="6s"
                  begin="${(i * 0.4).toFixed(2)}s" repeatCount="indefinite"/>${days}</text>
            </g>
            ${note ? `<circle cx="196" cy="19" r="7" fill="${AMBER}" opacity="0.16"/>
              <text x="196" y="23" text-anchor="middle" font-size="11" font-weight="700" fill="#92650B">*</text>` : ''}
          </g>`).join('')}
      </g>
      <g transform="translate(40 312)" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.5;0.6;1" dur="6s" repeatCount="indefinite"/>
        <rect width="560" height="62" rx="12" fill="#FFFBEB" stroke="#F5DFA8" stroke-width="1.8"/>
        ${mono(18, 22, '* THE ONE WE BROKE', { size: 9, op: 1, fill: '#92650B' })}
        <text x="18" y="40" font-size="11" fill="${INK}" opacity="0.7">Nov 2025 — a supplier went down and we had no fallback ready.</text>
        <text x="18" y="54" font-size="11" fill="${INK}" opacity="0.7">We published what happened, then built the fallback. Counter restarted.</text>
      </g>`;
    return { svg: wrap(inner), pills: pP('How we operate', 'One exception, published') };
  },
};

/* ── 11 · OPEN BOOKS ─────────────────────────────────────────────────── */
export const openBooks = {
  id: 'pr-books',
  name: 'Open Books',
  family: 'Transparency',
  tagline: 'Our own margin, drawn against the industry band',
  desc: 'Further up the same page Openline calls itself an open startup and publishes revenue, margin and active users \u2014 and then the principles panel ignores all of it. This draws gross margin at 22% against the 35\u201345% industry band that section names, and labels the gap as the part of the price that was never charged. Growth at 15% month on month and 98.5% retention sit underneath, so a low margin reads as a decision rather than a weakness.',
  pros: [
    'Applies \u201Csay the real number\u201D to our own accounts, not to the customer\u2019s bill',
    'Every figure is already published further up the page, so nothing new is invented',
    'A margin under the industry band is a claim a competitor can only copy by cutting price',
    'One small chart \u2014 cheap to draw and still legible at 390px',
  ],
  cons: [
    'Margin is a finance idea, and a good share of travellers will not read the chart',
    'Publishing a margin is a commitment that gets awkward at the next raise',
    'The 22% has to be the real figure and has to be kept current',
  ],
  scores: { story: 4, motion: 3, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const D = 6.4;
    const x0 = 80, sc = 9.6;
    const oursW = (22 * sc).toFixed(0);
    const oursEnd = (x0 + 22 * sc).toFixed(0);
    const bandX = (x0 + 35 * sc).toFixed(0);
    const bandW = (10 * sc).toFixed(0);
    const bandMid = (x0 + 40 * sc).toFixed(0);
    const stats = [
      ['GROWTH', '+15%', 'MONTH ON MONTH'],
      ['GROSS MARGIN', '22%', 'INDUSTRY 35\u201345%'],
      ['RETENTION', '98.5%', 'PAID, NOT TRIAL'],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 190, 240, uid)}
      ${mono(40, 40, 'WHAT WE ALREADY PUBLISH ABOUT OURSELVES', { size: 10, op: 0.32 })}
      ${panel(40, 58, 560, 250, { r: 16 })}
      ${mono(64, 92, 'GROSS MARGIN', { size: 9.5, op: 0.4 })}

      <g opacity="0">
        <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.14;1" dur="${D}s" repeatCount="indefinite"/>
        <rect x="${bandX}" y="120" width="${bandW}" height="100" rx="6"
          fill="${P.wash}" stroke="${P.soft}" stroke-width="2"/>
        ${mono(bandMid, 112, 'INDUSTRY 35\u201345%', { size: 8.5, op: 0.5, anchor: 'middle' })}
      </g>

      <rect x="${x0}" y="152" width="0" height="40" rx="6" fill="${P.deep}">
        <animate attributeName="width" values="0;${oursW};${oursW}" keyTimes="0;0.24;1"
          dur="${D}s" repeatCount="indefinite"/>
      </rect>
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.24;0.3;1" dur="${D}s" repeatCount="indefinite"/>
        ${num(+oursEnd + 14, 181, '22%', { size: 20 })}
      </g>
      ${mono(x0, 212, 'OURS', { size: 8.5, op: 0.42 })}

      <path d="M ${x0} 226 H 560" stroke="${LINE}" stroke-width="1.5"/>
      ${[0, 10, 20, 30, 40, 50].map((t) => {
      const tx = (x0 + t * sc).toFixed(0);
      return `<path d="M ${tx} 226 V 232" stroke="${LINE}" stroke-width="1.5"/>
        ${mono(tx, 246, t === 50 ? '50%' : String(t), { size: 8.5, op: 0.35, anchor: 'middle' })}`;
    }).join('')}
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.44;0.52;1" dur="${D}s" repeatCount="indefinite"/>
        ${mono(x0, 272, 'THE THIRTEEN TO TWENTY-THREE POINTS BETWEEN BAR AND BAND ARE THE PRICE CUT', { size: 9, op: 0.45 })}
        ${tick(x0, 292, 'Posted monthly, audited or not.', { size: 11.5 })}
      </g>

      ${stats.map(([k, v, s], i) => {
      const sx = 40 + i * 192, on = (0.56 + i * 0.07).toFixed(3), lit = (0.62 + i * 0.07).toFixed(3);
      return `
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${lit};1" dur="${D}s" repeatCount="indefinite"/>
          ${card(sx, 330, 176, 82, { r: 14 })}
          ${mono(sx + 18, 356, k, { size: 8.5, op: 0.4 })}
          ${num(sx + 18, 388, v, { size: 22 })}
          ${mono(sx + 18, 404, s, { size: 8, op: 0.34 })}
        </g>`;
    }).join('')}
      ${mono(40, 440, 'OPEN STARTUP \u00b7 REVENUE, MARGIN AND ACTIVE USERS ARE ALREADY ON THIS PAGE', { size: 9, op: 0.34 })}`;
    return { svg: wrap(inner), pills: pP('Say the real number', 'Margin published') };
  },
};

/* ── 12 · COST, ITEMISED ─────────────────────────────────────────────── */
export const costItemised = {
  id: 'pr-itemised',
  name: 'Cost, Itemised',
  family: 'Explanation',
  tagline: 'The four reasons the price is lower, taken off a bar',
  desc: 'A reseller\u2019s cost base stands as one bar, and the four levers this page already claims \u2014 no middlemen, automated infrastructure, one profile for every country, volume \u2014 lift off it in turn, each landing as a labelled row with its share of the saving. What is left is the 40% lower cost base the page states, and the reader has watched where it came from. It answers the question a low price actually raises: what did you cut?',
  pros: [
    'Answers the suspicion a cheap price creates, instead of repeating the price',
    'Built entirely from four numbers the section already publishes',
    'Subtracting cost is the opposite gesture to every other option here, which add fees',
    'Reads as one bar and four rows, so the structure is obvious before any text is read',
  ],
  cons: [
    'The page\u2019s own four figures do not add up to its headline 40%, so this reads them as shares of the saving \u2014 finance has to confirm that',
    'It explains the business rather than demonstrating a principle',
    'Four staged beats makes the loop over seven seconds',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 3 },
  build: (uid) => {
    const D = 7.2;
    const cuts = [
      ['No middlemen', 'Direct Tier-1 deals, no aggregator', 40],
      ['Automated infrastructure', 'No call centres, no retail estate', 35],
      ['One profile, every country', 'No separate inventory per market', 15],
      ['Volume at scale', '5M+ eSIMs bought wholesale', 10],
    ];
    const BX = 72, BW = 104, BTOP = 116, H = 256, CUT = H * 0.4;
    let run = BTOP;
    const segs = cuts.map(([, , pc]) => {
      const h = CUT * pc / 100, y = run;
      run += h;
      return { y: +y.toFixed(1), h: +h.toFixed(1), mid: +(y + h / 2).toFixed(1) };
    });
    const inner = `
      ${dots(uid)}
      ${bloom(300, 210, 250, uid)}
      ${mono(40, 40, 'WHY THE PRICE IS LOWER, ITEMISED', { size: 10, op: 0.32 })}
      ${mono(BX, 104, 'A RESELLER\u2019S COST BASE', { size: 9, op: 0.42 })}
      ${mono(252, 92, 'WHERE THE 40% COMES FROM', { size: 9, op: 0.4 })}

      <rect x="${BX}" y="${(BTOP + CUT).toFixed(1)}" width="${BW}" height="${(H - CUT).toFixed(1)}"
        rx="8" fill="${P.deep}"/>
      ${segs.map((s, i) => {
      const t0 = ((0.7 + i * 1.25) / D).toFixed(3);
      const t1 = ((1.25 + i * 1.25) / D).toFixed(3);
      return `
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0;0 0;30 -14;30 -14"
            keyTimes="0;${t0};${t1};1" dur="${D}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;${t0};${t1};1"
            dur="${D}s" repeatCount="indefinite"/>
          <rect x="${BX}" y="${s.y}" width="${BW}" height="${s.h}" rx="4"
            fill="#D6D9DE" stroke="${WHITE}" stroke-width="1.4"/>
        </g>`;
    }).join('')}

      ${cuts.map(([nm, sub, pc], i) => {
      const ry = 104 + i * 64, rmid = ry + 27;
      const t1 = ((1.25 + i * 1.25) / D).toFixed(3);
      const t2 = ((1.4 + i * 1.25) / D).toFixed(3);
      return `
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${t1};${t2};1"
            dur="${D}s" repeatCount="indefinite"/>
          <path d="M ${BX + BW} ${segs[i].mid} C 210 ${segs[i].mid} 214 ${rmid} 250 ${rmid}"
            fill="none" stroke="${P.main}" stroke-width="1.8" stroke-dasharray="4 5" opacity="0.7"/>
          ${card(252, ry, 312, 54, { r: 12 })}
          <rect x="252" y="${ry}" width="5" height="54" rx="2.5" fill="${P.main}"/>
          ${label(276, ry + 24, nm, { size: 13 })}
          ${mono(276, ry + 42, sub, { size: 9, op: 0.44 })}
          ${mono(548, ry + 30, pc + '% OF IT', { size: 9, op: 0.55, fill: P.deep, anchor: 'end' })}
        </g>`;
    }).join('')}

      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.79;0.85;1" dur="${D}s" repeatCount="indefinite"/>
        ${mono(BX, 392, 'OUR COST BASE', { size: 9, op: 0.42 })}
        ${badge(BX, 402, '40% LOWER', { w: 122, h: 26, fill: P.deep, size: 11 })}
        ${mono(212, 420, 'ALL OF IT PASSED THROUGH TO THE PRICE, NOT KEPT', { size: 9, op: 0.36 })}
      </g>`;
    return { svg: wrap(inner), pills: pP('No hidden fees, ever', '40% lower cost base') };
  },
};

/* ── 13 · ONLY EVER DOWN ─────────────────────────────────────────────── */
export const onlyEverDown = {
  id: 'pr-down',
  name: 'Only Ever Down',
  family: 'Track record',
  tagline: 'Every price change we have made, plotted',
  desc: 'One dark chart: the price of Japan 5 GB for 30 days over twenty-four months, stepping down from $9.00 to $4.00 in five cuts, each annotated with why \u2014 wholesale renegotiated, provisioning automated, volume passed through. A dimmer line underneath is what the data cost us over the same period. The payload is the shape: the retail line has never once gone up, which is the only version of \u201Cno surprise bills\u201D that can be checked against history.',
  pros: [
    'A price history is the hardest kind of proof to fake and the easiest to check',
    'The only dark option on this board, so it does not blur into the other ten on the tile grid',
    'Naming a reason against each cut stops it being a chart and makes it an argument',
    'Extends by itself \u2014 every future cut makes the picture stronger',
  ],
  cons: [
    'Commits us publicly to never raising a headline price, which wholesale moves can force',
    'The dark panel fights the warm cream surface the rest of /about uses',
    'Needs the five real dates and reasons from finance before it can ship',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 3, ease: 4 },
  build: (uid) => {
    const D = 7;
    const retail = 'M 88 110 H 168 V 129 H 248 V 167 H 328 V 205 H 408 V 243 H 488 V 300 H 568';
    const cost = 'M 88 206 H 168 V 218 H 248 V 240 H 328 V 254 H 408 V 274 H 488 V 302 H 568';
    const notes = [
      [252, 158, 'WHOLESALE RENEGOTIATED', 0.34],
      [332, 196, 'PROVISIONING AUTOMATED', 0.46],
      [478, 296, 'VOLUME PASSED THROUGH', 0.6, 'end'],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 200, 250, uid)}
      ${mono(40, 40, 'JAPAN 5 GB / 30 DAYS \u00b7 WHAT WE HAVE CHARGED FOR IT', { size: 10, op: 0.32 })}
      <rect x="40" y="58" width="560" height="306" rx="16" fill="#0A1122"/>
      ${[[110, '$9'], [148, '$8'], [186, '$7'], [224, '$6'], [262, '$5'], [300, '$4']].map(([gy, lb]) => `
        <path d="M 88 ${gy} H 568" stroke="#1D2840" stroke-width="1.2"/>
        ${mono(78, +gy + 4, lb, { size: 9, op: 0.55, fill: '#7D8CAB', anchor: 'end' })}`).join('')}
      ${['M1', 'M5', 'M9', 'M13', 'M17', 'M21', 'M24'].map((m, i) =>
      mono(88 + i * 80, 326, m, { size: 8.5, op: 0.45, fill: '#6C7C99', anchor: 'middle' })).join('')}

      <g transform="translate(316 84)">
        <rect width="12" height="4" rx="2" y="-4" fill="${P.main}"/>
        ${mono(18, 0, 'WHAT YOU PAY', { size: 8.5, op: 0.7, fill: '#A9B7D1' })}
        <rect x="120" width="12" height="4" rx="2" y="-4" fill="#48577A"/>
        ${mono(138, 0, 'WHAT IT COSTS US', { size: 8.5, op: 0.55, fill: '#7D8CAB' })}
      </g>

      <defs>
        <clipPath id="pd-${uid}">
          <rect x="86" y="96" width="0" height="224">
            <animate attributeName="width" values="0;484;484" keyTimes="0;0.58;1" dur="${D}s" repeatCount="indefinite"/>
          </rect>
        </clipPath>
      </defs>
      <g clip-path="url(#pd-${uid})">
        <path d="${cost}" fill="none" stroke="#48577A" stroke-width="2.4" stroke-dasharray="6 6"/>
        <path d="${retail}" fill="none" stroke="${P.main}" stroke-width="3.2" stroke-linejoin="round"/>
        ${[[168, 129], [248, 167], [328, 205], [408, 243], [488, 300]].map(([cx, cy]) =>
      `<circle cx="${cx}" cy="${cy}" r="4.6" fill="#0A1122" stroke="${P.main}" stroke-width="2.6"/>`).join('')}
      </g>
      ${notes.map(([nx, ny, t, on, an]) => `
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${(on + 0.05).toFixed(2)};1"
            dur="${D}s" repeatCount="indefinite"/>
          ${mono(nx, ny, t, { size: 8, op: 0.75, fill: '#93A3BF', anchor: an || 'start' })}
        </g>`).join('')}

      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.8;1" dur="${D}s" repeatCount="indefinite"/>
        ${card(40, 384, 560, 48, { r: 12, fill: GREEN_SOFT, stroke: GREEN, sw: 2 })}
        ${tick(64, 410, 'Five cuts in twenty-four months. The line has never gone up.', { size: 12 })}
        ${mono(576, 414, '\u221256%', { size: 15, op: 1, fill: GREEN_TEXT, anchor: 'end' })}
      </g>`;
    return { svg: wrap(inner), pills: pP('Say the real number', 'Five cuts, no rises') };
  },
};

/* ── 14 · SAY WHAT IT MEANS ──────────────────────────────────────────── */
export const sayWhatItMeans = {
  id: 'pr-means',
  name: 'Say What It Means',
  family: 'Typographic',
  tagline: 'The page\u2019s own four headings, rewritten as facts',
  desc: 'The four cards beside this panel are headed Transparent Pricing, Quality First, Customer Obsessed and Global by Default \u2014 four noun phrases every competitor also uses. One at a time, each heading appears in grey at large size and is replaced in place by the sentence it would have to mean to be worth anything: \u201C$4.00 is the whole bill\u201D, \u201C50+ Tier-1 carriers, and the eSIM moves to the strongest\u201D. No illustration at all \u2014 the copy is the artwork.',
  pros: [
    'The only option on the board with no picture in it, so it cannot look like the other ten',
    'Criticises the page\u2019s own headings, which is the most credible move available in a values block',
    'Type at this size is the most mobile-proof thing we can put in the box',
    'Nearly free to build and to change later \u2014 it is eight strings',
  ],
  cons: [
    'Implies the four card headings beside it are weak, which marketing may not accept',
    'A four-beat text swap is the least eventful motion in the set',
    'Readers who skim will see only one of the four pairs',
  ],
  scores: { story: 4, motion: 2, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const D = 12.4;
    const pairs = [
      ['Transparent Pricing', '$4.00 is the whole bill.', 'No activation fee, no renewal, nothing added after checkout.'],
      ['Quality First', '50+ Tier-1 carriers.', 'If the strongest network is not ours, the eSIM moves to it.'],
      ['Customer Obsessed', 'A named person replies\u2026', '\u2026and can ship the fix the same day. There are only a hundred of us.'],
      ['Global by Default', 'One profile, 190+ countries.', 'Nothing regional to compare, and no second purchase on arrival.'],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 200, 250, uid)}
      ${mono(72, 48, 'THE HEADINGS ON THIS PAGE, AND WHAT THEY HAVE TO MEAN', { size: 9.5, op: 0.42 })}
      ${pairs.map(([head, l1, l2], i) => {
      const on = (i / 4).toFixed(4), up = (i / 4 + 0.006).toFixed(4);
      const off = ((i + 1) / 4).toFixed(4), gone = Math.min((i + 1) / 4 + 0.006, 1).toFixed(4);
      return `
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${on};${up};${off};${gone};1"
            dur="${D}s" repeatCount="indefinite" calcMode="discrete"/>
          ${mono(72, 104, '0' + (i + 1), { size: 11, op: 0.4 })}
          <text x="72" y="162" font-size="34" font-weight="700" fill="${INK}" opacity="0.2">${head}</text>
          <path d="M 72 186 H 232" stroke="${LINE}" stroke-width="2"/>
          <path d="M 80 198 V 226 M 72 218 l 8 9 l 8 -9" fill="none" stroke="${P.main}" stroke-width="2.2"
            stroke-linecap="round" stroke-linejoin="round"/>
          <text x="72" y="288" font-size="27" font-weight="700" fill="${INK}">${l1}</text>
          <text x="72" y="320" font-size="15" fill="${INK}" opacity="0.62">${l2}</text>
        </g>`;
    }).join('')}
      ${pairs.map((_, i) => {
      const on = (i / 4).toFixed(4), up = (i / 4 + 0.006).toFixed(4);
      const off = ((i + 1) / 4).toFixed(4), gone = Math.min((i + 1) / 4 + 0.006, 1).toFixed(4);
      const bx = 72 + i * 126;
      return `
        <rect x="${bx}" y="368" width="114" height="5" rx="2.5" fill="${LINE}"/>
        <rect x="${bx}" y="368" width="114" height="5" rx="2.5" fill="${P.main}" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${on};${up};${off};${gone};1"
            dur="${D}s" repeatCount="indefinite" calcMode="discrete"/>
        </rect>`;
    }).join('')}
      ${mono(72, 412, 'THE HEADINGS ARE OURS. SO ARE THE SENTENCES UNDERNEATH THEM.', { size: 9, op: 0.34 })}`;
    return { svg: wrap(inner), pills: pP('Say the real number', 'Four headings, rewritten') };
  },
};

/* ── 15 · NOTHING WILL BE CHARGED ────────────────────────────────────── */
export const nothingCharged = {
  id: 'pr-notify',
  name: 'Nothing Charged',
  family: 'Product',
  tagline: 'The month after you buy, in four notifications',
  desc: 'A phone collects the only four messages Openline sends in a plan\u2019s life: activated on day one with the $4.00 you paid, a heads-up at half your data, a warning the day before it ends saying it will not renew, and a note on day 31 that the plan ended and nothing was charged. A counter beside it holds at $4.00 the whole way. It is the product interface doing \u201Cno surprise bills\u201D, which is the half of principle 01 that no other option touches.',
  pros: [
    'Shows the real screen a customer will see rather than a symbol for trust',
    'Covers the thirty days after checkout, where every surprise bill actually happens',
    'The total that never moves is the whole argument, and it needs no caption',
    'Reusable as product copy \u2014 these are four notification strings we should ship anyway',
  ],
  cons: [
    'Writes the notification policy into marketing, so the app has to match it',
    'Phone mockups are the most common device in eSIM marketing',
    'Text on the handset is small; the legible version has to live in the right-hand column',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const D = 6.8;
    const notes = [
      ['DAY 01', 'Japan 5 GB is live', 'You paid $4.00. That is the last charge.'],
      ['DAY 12', 'Half your data left', 'Nothing to do. We will not slow you down quietly.'],
      ['DAY 29', 'Ends tomorrow', 'It will not renew. No card will be touched.'],
      ['DAY 31', 'Plan ended', 'Total charged, start to finish: $4.00.'],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(220, 210, 230, uid)}
      ${mono(40, 40, 'EVERY MESSAGE WE SEND IN THIRTY-ONE DAYS', { size: 10, op: 0.32 })}

      <g transform="translate(56 58)">
        <rect width="196" height="338" rx="30" fill="${INK}"/>
        <rect x="7" y="7" width="182" height="324" rx="24" fill="#17171C"/>
        <rect x="78" y="20" width="40" height="6" rx="3" fill="#000" opacity="0.85"/>
        ${mono(98, 48, '09:41', { size: 9, op: 0.5, fill: WHITE, anchor: 'middle' })}
        ${notes.map(([day, t], i) => {
      const ny = 62 + i * 66;
      const t0 = ((0.5 + i * 1.3) / D).toFixed(3);
      const t1 = ((0.85 + i * 1.3) / D).toFixed(3);
      return `
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${t0};${t1};1"
              dur="${D}s" repeatCount="indefinite"/>
            <g>
              <animateTransform attributeName="transform" type="translate" values="0 14;0 14;0 0;0 0"
                keyTimes="0;${t0};${t1};1" dur="${D}s" repeatCount="indefinite"/>
              <rect x="18" y="${ny}" width="160" height="56" rx="13" fill="${WHITE}" opacity="0.96"/>
              <rect x="30" y="${ny + 13}" width="14" height="14" rx="4" fill="${P.main}"/>
              <text x="52" y="${ny + 24}" font-size="9.5" font-weight="700" fill="${INK}">${t}</text>
              <text x="30" y="${ny + 44}" font-size="8" fill="${INK}" opacity="0.55">${day} \u00b7 openline</text>
            </g>
          </g>`;
    }).join('')}
      </g>

      ${notes.map(([day, t, s], i) => {
      const ry = 70 + i * 74;
      const t1 = ((0.85 + i * 1.3) / D).toFixed(3);
      const t2 = ((1.05 + i * 1.3) / D).toFixed(3);
      return `
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${t1};${t2};1"
            dur="${D}s" repeatCount="indefinite"/>
          ${mono(292, ry, day, { size: 9, op: 0.42 })}
          ${label(292, ry + 22, t, { size: 14 })}
          <text x="292" y="${ry + 42}" font-size="11.5" fill="${INK}" opacity="0.55">${s}</text>
          <path d="M 292 ${ry + 56} H 596" stroke="${LINE}" stroke-width="1.2"/>
        </g>`;
    }).join('')}

      <g transform="translate(292 374)">
        <rect width="304" height="9" rx="4.5" y="0" fill="${LINE}"/>
        <rect width="0" height="9" rx="4.5" fill="${P.main}">
          <animate attributeName="width" values="0;304;304" keyTimes="0;0.84;1" dur="${D}s" repeatCount="indefinite"/>
        </rect>
        ${mono(0, 28, 'DAY 1', { size: 8.5, op: 0.4 })}
        ${mono(304, 28, 'DAY 31', { size: 8.5, op: 0.4, anchor: 'end' })}
      </g>
      <g transform="translate(292 404)">
        ${card(0, 0, 304, 40, { r: 11, fill: GREEN_SOFT, stroke: GREEN, sw: 1.8 })}
        ${mono(16, 24, 'TOTAL CHARGED', { size: 9, op: 1, fill: GREEN_TEXT })}
        <text x="288" y="26" text-anchor="end" font-size="16" font-weight="700" fill="${GREEN_TEXT}"
          style="font-family:${MONO}">$4.00</text>
      </g>`;
    return { svg: wrap(inner), pills: pP('No surprise bills', 'Four messages, total') };
  },
};

export const PRIN_EXTRA = [cancelButton, openByDefault, loadBearing, plainLanguage, keptCount,
  openBooks, costItemised, onlyEverDown, sayWhatItMeans, nothingCharged];

/* ═══════════════════════════════════════════════════════════════════════
   BUILT BY TRAVELERS · 6–10
   ═══════════════════════════════════════════════════════════════════════ */

/* ── 6 · PASSPORT PAGES ──────────────────────────────────────────────── */
export const passportPages = {
  id: 'tm-passport',
  name: 'Passport Pages',
  family: 'Evidence',
  tagline: 'The team\'s own stamps, landing one by one',
  desc: 'An open passport spread fills the panel and entry stamps land on it in sequence — Lisbon, Bangkok, Medellín, Tbilisi, São Paulo, Tokyo — each at a slight angle, each with a real date, until the page is full and a count settles at the foot. It is the most literal reading of the section title on offer, and the object is one every reader of this page owns.',
  pros: ['The title of the section is "Built by Travelers" — this is simply that, shown', 'Stamps landing is a satisfying, self-explaining motion with no label needed', 'Warm and personal in a way the current org-chart panel is not', 'Works as a still frame, so the first paint already reads'],
  cons: ['Says nothing about the product or the engineering claim beside it', 'Passport stamps are a well-worn travel-brand device'],
  scores: { story: 4, motion: 5, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const stamps = [
      ['LIS', 'PORTUGAL', '14 JAN', -8, 96, 74],
      ['BKK', 'THAILAND', '02 MAR', 7, 232, 104],
      ['MDE', 'COLOMBIA', '21 APR', -5, 380, 68],
      ['TBS', 'GEORGIA', '09 JUN', 9, 118, 196],
      ['GRU', 'BRAZIL', '17 AUG', -11, 258, 226],
      ['HND', 'JAPAN', '30 SEP', 4, 400, 190],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 210, 240, uid)}
      ${mono(40, 40, 'OUR OWN PAGES', { size: 10, op: 0.32 })}
      <g transform="translate(70 58)">
        ${card(0, 0, 500, 300, { r: 10, fill: '#FFFDF8', stroke: INK, sw: 2.5 })}
        <path d="M 250 0 V 300" stroke="${INK}" stroke-width="1.6" opacity="0.2"/>
        ${Array.from({ length: 12 }, (_, i) =>
      `<path d="M 20 ${34 + i * 22} H 230" stroke="${INK}" stroke-width="1" opacity="0.07"/>
         <path d="M 270 ${34 + i * 22} H 480" stroke="${INK}" stroke-width="1" opacity="0.07"/>`).join('')}
        ${mono(20, 22, 'VISAS / VISAS', { size: 8.5, op: 0.28 })}
        ${mono(480, 22, 'VISAS / VISAS', { size: 8.5, op: 0.28, anchor: 'end' })}
        ${stamps.map(([code, country, date, rot, x, y], i) => `
          <g transform="translate(${x} ${y}) rotate(${rot})" opacity="0">
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.04;1" dur="7s"
              begin="${(i * 0.62).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
            <g>
              <animateTransform attributeName="transform" type="scale" values="1.9;0.94;1"
                keyTimes="0;0.7;1" dur="0.3s" begin="${(i * 0.62).toFixed(2)}s" fill="freeze"
                repeatCount="indefinite" additive="sum"/>
              <rect x="-42" y="-26" width="84" height="52" rx="5" fill="none"
                stroke="${i % 2 ? P.deep : '#3B5BA5'}" stroke-width="2.2" opacity="0.8"/>
              <rect x="-36" y="-20" width="72" height="40" rx="3" fill="none"
                stroke="${i % 2 ? P.deep : '#3B5BA5'}" stroke-width="0.9" opacity="0.5"/>
              <text y="-2" text-anchor="middle" font-size="16" font-weight="700"
                fill="${i % 2 ? P.deep : '#3B5BA5'}" style="font-family:${MONO}">${code}</text>
              <text y="10" text-anchor="middle" font-size="6" font-weight="700" letter-spacing="0.9"
                fill="${i % 2 ? P.deep : '#3B5BA5'}" opacity="0.85" style="font-family:${MONO}">${country}</text>
              <text y="20" text-anchor="middle" font-size="7" font-weight="700"
                fill="${i % 2 ? P.deep : '#3B5BA5'}" opacity="0.7" style="font-family:${MONO}">${date}</text>
            </g>
          </g>`).join('')}
      </g>
      <g transform="translate(70 386)">
        ${mono(0, 0, 'STAMPS THIS YEAR, ACROSS THE TEAM', { size: 9, op: 0.36 })}
        <text x="500" y="2" text-anchor="end" font-size="20" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">
          <animate attributeName="textContent" values="148;149;150;151;152;153"
            dur="7s" repeatCount="indefinite"/>153</text>
      </g>`;
    return { svg: wTM(inner), pills: pT('Built by travelers', '153 stamps this year') };
  },
};

/* ── 7 · OUR OWN LINES ───────────────────────────────────────────────── */
export const ourOwnLines = {
  id: 'tm-dogfood',
  name: 'Our Own Lines',
  family: 'Evidence',
  tagline: 'The team\'s live eSIMs, on the real product',
  desc: 'A list of the team\'s own active lines: first name, the country they are actually in right now, the plan they are on and the data left, with one of them mid-top-up as you watch. Nobody on it is on a staff plan. It answers the question the section is really trying to answer — do the people who built this use it — with a list rather than an adjective.',
  pros: ['The strongest trust claim available to a small company, and unusual to show', '"No staff plans" is a single line that does an enormous amount of work', 'Same visual grammar as the account screen, so it reinforces the product', 'Numbers can be made real later without redrawing anything'],
  cons: ['Shows first names and locations, which needs the team\'s consent', 'Reads as a dashboard, so it is the least warm of these five'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: (uid) => {
    const rows = [
      ['Paul', 'Lisbon · PT', '20 GB / 30 d', 0.62, false],
      ['Ana', 'Bangkok · TH', '10 GB / 14 d', 0.31, false],
      ['Théo', 'Medellín · CO', '5 GB / 7 d', 0.08, true],
      ['Marta', 'Tbilisi · GE', '20 GB / 30 d', 0.77, false],
      ['Kenji', 'Tokyo · JP', '10 GB / 30 d', 0.45, false],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 200, 240, uid)}
      ${mono(40, 40, "THE TEAM'S OWN LINES, RIGHT NOW", { size: 10, op: 0.32 })}
      <g transform="translate(40 60)">
        ${panel(0, 0, 560, 288, { r: 16 })}
        <path d="M 0 38 H 560" stroke="${LINE}" stroke-width="1.5"/>
        ${mono(20, 25, 'WHO', { size: 9, op: 0.34 })}
        ${mono(150, 25, 'WHERE TODAY', { size: 9, op: 0.34 })}
        ${mono(310, 25, 'PLAN', { size: 9, op: 0.34 })}
        ${mono(540, 25, 'DATA LEFT', { size: 9, op: 0.34, anchor: 'end' })}
        ${rows.map(([who, where, plan, frac, topping], i) => `
          <g transform="translate(0 ${38 + i * 50})" opacity="0">
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.05;1" dur="6.4s"
              begin="${(i * 0.36).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
            ${i ? `<path d="M 20 0 H 540" stroke="${LINE}" stroke-width="1.2"/>` : ''}
            <circle cx="30" cy="25" r="11" fill="${P.soft}"/>
            <text x="30" y="29" text-anchor="middle" font-size="10" font-weight="700" fill="${P.deep}">${who[0]}</text>
            ${label(50, 29, who, { size: 13 })}
            <text x="150" y="29" font-size="11.5" fill="${INK}" opacity="0.62">${where}</text>
            ${mono(310, 29, plan, { size: 10, op: 0.55 })}
            <g transform="translate(430 20)">
              <rect width="76" height="9" rx="4.5" fill="${LINE}"/>
              <rect height="9" rx="4.5" width="0" fill="${topping ? AMBER : P.main}">
                <animate attributeName="width" values="0;${(76 * frac).toFixed(0)}" dur="0.8s"
                  begin="${(i * 0.36 + 0.2).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
                ${topping ? `<animate attributeName="width" values="${(76 * frac).toFixed(0)};${(76 * frac).toFixed(0)};70;70"
                  keyTimes="0;0.7;0.86;1" dur="6.4s" fill="freeze" repeatCount="indefinite"/>` : ''}
              </rect>
              <text x="86" y="9" font-size="11" font-weight="700" fill="${INK}" opacity="0.75" style="font-family:${MONO}">${Math.round(frac * 100)}%</text>
            </g>
            ${topping ? `<g transform="translate(196 25)" opacity="0">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.8;1" dur="6.4s" repeatCount="indefinite"/>
              <rect x="0" y="-11" width="88" height="22" rx="11" fill="${GREEN_SOFT}"/>
              ${mono(44, 4, 'TOPPED UP', { size: 8.5, anchor: 'middle', op: 1, fill: GREEN_TEXT })}
            </g>` : ''}
          </g>`).join('')}
      </g>
      <g transform="translate(40 372)">
        <rect width="560" height="40" rx="10" fill="${P.wash}" stroke="${P.soft}" stroke-width="1.8"/>
        ${tick(18, 21, 'No staff plans. Everyone here pays the list price on the site.', { size: 11.5 })}
      </g>`;
    return { svg: wTM(inner), pills: pT('We use it too', 'No staff plans') };
  },
};

/* ── 8 · STANDUP FROM FOUR AIRPORTS ──────────────────────────────────── */
export const fourAirports = {
  id: 'tm-standup',
  name: 'Standup, Four Airports',
  family: 'Character',
  tagline: 'The daily call, from the places the product is for',
  desc: 'Four video tiles on a call. Each one is labelled with where that person is — an airport gate, a hostel, a coworking desk, a train — and each shows a live connection readout. One tile wobbles and recovers on a bad link while the others hold. It is the origin story of the product rather than a headcount: this gets built by people whose working day depends on it not failing.',
  pros: ['Explains why the company exists, which the current panel does not attempt', 'The one degraded tile is honest and makes the other three credible', 'Immediately recognisable format — everyone has been on this call', 'Warm and slightly funny without being twee'],
  cons: ['Four tiles is a lot of simultaneous motion in a 592px box', 'Video-call tiles have become a visual cliché of remote-work marketing'],
  scores: { story: 5, motion: 4, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const tiles = [
      ['Paul', 'LIS · Gate A12', 4, false],
      ['Ana', 'BKK · hostel roof', 3, false],
      ['Théo', 'MDE · coworking', 4, false],
      ['Marta', 'Train, TBS → BUS', 2, true],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 200, 240, uid)}
      ${mono(40, 40, 'STANDUP · 09:00 CET, WHEREVER WE ARE', { size: 10, op: 0.32 })}
      ${tiles.map(([who, where, sig, shaky], i) => {
      const x = 44 + (i % 2) * 282, y = 60 + Math.floor(i / 2) * 168;
      return `
        <g transform="translate(${x} ${y})">
          ${shaky ? `<animateTransform attributeName="transform" type="translate"
            values="0 0;1.6 -1.1;-1.3 0.9;0 0" dur="0.42s" begin="3.1s" repeatCount="indefinite" additive="sum"/>` : ''}
          <rect width="264" height="150" rx="14" fill="#14161C"/>
          <rect x="6" y="6" width="252" height="138" rx="10" fill="#1E222C"/>
          <g transform="translate(132 62)">
            <circle r="26" fill="${['#2E3846', '#3A2E46', '#2E4640', '#46392E'][i]}"/>
            <circle cy="-8" r="9" fill="#5A6678" opacity="0.9"/>
            <path d="M -16 22 a 16 16 0 0 1 32 0 z" fill="#5A6678" opacity="0.9"/>
          </g>
          <g transform="translate(16 128)">
            <text font-size="11.5" font-weight="700" fill="#F2F5FA">${who}</text>
            <text y="0" x="${who.length * 7 + 10}" font-size="10" fill="#93A3BF">${where}</text>
          </g>
          <g transform="translate(222 22)">
            ${[0, 1, 2, 3].map(b => `<rect x="${b * 8}" y="${-4 - b * 4}" width="5" height="${4 + b * 4}" rx="1.4"
              fill="${b < sig ? '#4ADE80' : '#3A4252'}">${shaky && b >= 2 ? `<animate attributeName="fill"
              values="#4ADE80;#3A4252;#4ADE80" dur="1.1s" begin="3.1s" repeatCount="indefinite"/>` : ''}</rect>`).join('')}
          </g>
          ${shaky ? `<g transform="translate(16 26)" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.44;0.5;0.72;0.78;1" dur="7s" repeatCount="indefinite"/>
            <rect width="122" height="22" rx="11" fill="#3A2226"/>
            ${mono(61, 15, 'RECONNECTING', { size: 8.5, anchor: 'middle', op: 1, fill: '#FCA5A5' })}
          </g>
          <g transform="translate(16 26)" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.78;0.84;1" dur="7s" repeatCount="indefinite"/>
            <rect width="92" height="22" rx="11" fill="#12301F"/>
            ${mono(46, 15, 'BACK ON', { size: 8.5, anchor: 'middle', op: 1, fill: '#4ADE80' })}
          </g>` : ''}
        </g>`;
    }).join('')}
      <g transform="translate(44 400)">
        <rect width="546" height="40" rx="10" fill="${P.wash}" stroke="${P.soft}" stroke-width="1.8"/>
        ${tick(18, 21, 'Four of us on four networks. One drops most mornings. That is the brief.', { size: 11.5 })}
      </g>`;
    return { svg: wTM(inner), pills: pT('Six timezones, one network', 'One drops most mornings') };
  },
};

/* ── 9 · WHERE WE HIRED ──────────────────────────────────────────────── */
export const whereWeHired = {
  id: 'tm-hired',
  name: 'Where We Hired',
  family: 'Scale',
  tagline: 'Pins landing on a map as the company grew',
  desc: 'A plain world map with pins dropping in hire order, each labelled with a role and a city, while a year counter runs and a headcount climbs beside it. By the end the map is covered and no two pins share a country. It keeps the number the live panel is proud of — a hundred people — but shows the distribution, which is the actually interesting fact.',
  pros: ['Retains the headcount claim while adding the geography that makes it mean something', 'Pin drops in hire order gives the block a narrative, not just a state', 'A map is the most on-brand object this company has', 'Degrades gracefully: even half-loaded it reads correctly'],
  cons: ['Maps appear on several other boards on the hub, so it is not distinctive', 'Country outlines at this size get imprecise, which invites nitpicking'],
  scores: { story: 4, motion: 4, perf: 4, mobile: 4, brand: 5, ease: 3 },
  build: (uid) => {
    const pins = [
      ['Lisbon', 'Founders', 296, 150, '2021'],
      ['Berlin', 'Backend', 320, 128, '2022'],
      ['Bangkok', 'Support', 452, 200, '2022'],
      ['Medellín', 'Design', 168, 218, '2023'],
      ['Tbilisi', 'Network ops', 372, 140, '2023'],
      ['São Paulo', 'Growth', 210, 268, '2024'],
      ['Tokyo', 'Carrier deals', 500, 152, '2024'],
      ['Cape Town', 'QA', 336, 292, '2025'],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 200, 250, uid)}
      ${mono(40, 40, 'EVERY HIRE, IN ORDER', { size: 10, op: 0.32 })}
      <g transform="translate(24 52)">
        <rect width="592" height="300" rx="16" fill="${P.wash}" stroke="${LINE}" stroke-width="1.5"/>
        <g opacity="0.3" fill="none" stroke="${INK}" stroke-width="1.4">
          <path d="M 96 120 q 40 -22 78 -6 q 30 12 24 40 q -8 34 -36 30 q -22 -4 -30 20 q -10 26 -24 8 q -16 -22 -12 -50 z"/>
          <path d="M 178 200 q 24 -10 34 14 q 10 24 26 52 q 14 26 -6 34 q -22 8 -30 -20 q -8 -30 -24 -44 q -14 -14 0 -36 z"/>
          <path d="M 288 108 q 34 -18 64 -6 q 28 12 46 4 q 18 -8 24 10 q 6 18 -14 24 q -22 6 -30 22 q -8 16 -30 10 q -24 -6 -44 -18 q -20 -12 -16 -46 z"/>
          <path d="M 300 176 q 26 -10 40 10 q 14 22 6 50 q -8 28 -28 48 q -20 20 -30 -6 q -10 -26 -2 -58 q 8 -32 14 -44 z"/>
          <path d="M 400 120 q 60 -26 110 -4 q 48 22 62 62 q 12 36 -22 48 q -36 12 -64 -14 q -28 -26 -62 -30 q -34 -4 -24 -62 z"/>
          <path d="M 486 240 q 26 -12 38 8 q 12 20 -8 34 q -22 14 -34 -6 q -12 -20 4 -36 z"/>
        </g>
        ${pins.map(([city, role, x, y], i) => `
          <g transform="translate(${x} ${y})" opacity="0">
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.04;1" dur="7.4s"
              begin="${(i * 0.56).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
            <g>
              <animateTransform attributeName="transform" type="translate" values="0 -22;0 2;0 0"
                keyTimes="0;0.74;1" dur="0.34s" begin="${(i * 0.56).toFixed(2)}s" fill="freeze"
                repeatCount="indefinite" additive="sum"/>
              <path d="M 0 0 c -7 -9 -10 -13 -10 -19 a 10 10 0 0 1 20 0 c 0 6 -3 10 -10 19 z"
                fill="${P.main}" stroke="${INK}" stroke-width="1.8"/>
              <circle cy="-19" r="3.4" fill="${WHITE}"/>
            </g>
            <circle r="3" fill="${P.main}" opacity="0.5">
              <animate attributeName="r" values="3;20" dur="1.4s" begin="${(i * 0.56).toFixed(2)}s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0" dur="1.4s" begin="${(i * 0.56).toFixed(2)}s" repeatCount="indefinite"/>
            </circle>
            <g transform="translate(${x > 460 ? -14 : 14} -14)">
              <text text-anchor="${x > 460 ? 'end' : 'start'}" font-size="10.5" font-weight="700" fill="${INK}">${city}</text>
              <text y="12" text-anchor="${x > 460 ? 'end' : 'start'}" font-size="9" fill="${INK}" opacity="0.5">${role}</text>
            </g>
          </g>`).join('')}
        <g transform="translate(20 278)">
          ${mono(0, 0, 'YEAR', { size: 9, op: 0.4 })}
          <text x="40" y="1" font-size="13" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">
            <animate attributeName="textContent" values="2021;2022;2022;2023;2023;2024;2024;2025"
              dur="7.4s" repeatCount="indefinite"/>2025</text>
          ${mono(110, 0, 'PEOPLE', { size: 9, op: 0.4 })}
          <text x="162" y="1" font-size="13" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">
            <animate attributeName="textContent" values="4;12;26;41;58;72;89;100"
              dur="7.4s" repeatCount="indefinite"/>100</text>
          ${mono(240, 0, 'COUNTRIES', { size: 9, op: 0.4 })}
          <text x="316" y="1" font-size="13" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">
            <animate attributeName="textContent" values="1;2;3;4;5;6;7;8"
              dur="7.4s" repeatCount="indefinite"/>8</text>
        </g>
      </g>
      ${mono(24, 378, 'NO TWO OF US IN THE SAME COUNTRY WHEN WE STARTED HIRING', { size: 9, op: 0.34 })}`;
    return { svg: wTM(inner), pills: pT('100 people, counted', 'Eight countries') };
  },
};

/* ── 10 · STRAIGHT TO THE AUTHOR ─────────────────────────────────────── */
export const straightToAuthor = {
  id: 'tm-author',
  name: 'Straight to the Author',
  family: 'Advantage',
  tagline: 'A complaint, routed to whoever wrote the thing',
  desc: 'A support message lands at the top of the panel. A line travels from it to a named engineer with the note "wrote this screen in March", then to a one-line diff, then to a "shipped" stamp — with a clock beside it reading hours, not weeks. It converts being small from an apology into the advantage it actually is, and does the same job as the live panel\'s 45%-engineering statistic with a story instead of a percentage.',
  pros: ['Makes the engineering ratio mean something concrete to a non-technical reader', 'The clock is the payload, and it is a number nobody large can match', 'Follows a single line through the panel, so it is easy to follow', 'Directly supports the support-quality claims made elsewhere on the site'],
  cons: ['Implies a response time the company has to actually hold to', 'Four stages is one more than this box comfortably holds'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 3 },
  build: (uid) => {
    const inner = `
      ${dots(uid)}
      ${bloom(320, 210, 240, uid)}
      ${mono(40, 40, 'ONE MESSAGE, START TO FINISH', { size: 10, op: 0.32 })}
      <g transform="translate(40 58)">
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.05;1" dur="7s" fill="freeze" repeatCount="indefinite"/>
          ${card(0, 0, 560, 74, { r: 13, stroke: INK, sw: 2.2 })}
          <circle cx="32" cy="37" r="14" fill="${P.soft}"/>
          <text x="32" y="42" text-anchor="middle" font-size="12" font-weight="700" fill="${P.deep}">R</text>
          ${mono(58, 26, 'SUPPORT · 14:02', { size: 9, op: 0.38 })}
          <text x="58" y="48" font-size="13" fill="${INK}" opacity="0.82">"The data counter on the plan screen reads in MB but the plan is sold in GB."</text>
          ${mono(540, 26, 'NEW', { size: 9, op: 1, fill: P.deep, anchor: 'end' })}
        </g>

        ${[[104, 'Théo · engineering', 'Wrote this screen in March 2025', '14:19', 1],
      [196, 'One-line change', 'formatBytes(v, { unit: \'GB\' })', '14:33', 2],
      [288, 'Shipped to production', 'Verified on staging, then live', '15:58', 3]].map(([y, t, s, at, i]) => `
          <g opacity="0">
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.05;1" dur="7s"
              begin="${(i * 1.15).toFixed(2)}s" fill="freeze" repeatCount="indefinite"/>
            <path d="M 32 ${y - 30} V ${y}" stroke="${P.main}" stroke-width="2.4" stroke-dasharray="4 5">
              <animate attributeName="stroke-dashoffset" values="0;-18" dur="0.7s" repeatCount="indefinite"/>
            </path>
            <g transform="translate(0 ${y})">
              ${card(0, 0, 560, 70, { r: 13, stroke: i === 3 ? GREEN : LINE, sw: 2 })}
              <circle cx="32" cy="35" r="11" fill="${i === 3 ? GREEN_SOFT : P.wash}"/>
              ${i === 3
        ? `<path d="M 27 35 l 3.4 3.6 l 6.4 -7.4" fill="none" stroke="${GREEN_TEXT}" stroke-width="2.4" stroke-linecap="round"/>`
        : `<text x="32" y="39" text-anchor="middle" font-size="11" font-weight="700" fill="${P.deep}">${i}</text>`}
              ${label(56, 30, t, { size: 13 })}
              <text x="56" y="50" font-size="11" fill="${INK}" opacity="0.52"
                ${i === 2 ? `style="font-family:${MONO}"` : ''}>${s}</text>
              ${mono(540, 39, at, { size: 10, op: 0.5, anchor: 'end' })}
            </g>
          </g>`).join('')}
      </g>
      <g transform="translate(40 424)" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.6;0.7;1" dur="7s" repeatCount="indefinite"/>
        <rect width="560" height="44" rx="11" fill="${GREEN_SOFT}"/>
        ${mono(18, 27, 'REPORTED TO FIXED', { size: 9.5, op: 1, fill: GREEN_TEXT })}
        <text x="180" y="29" font-size="16" font-weight="700" fill="${GREEN_TEXT}" style="font-family:${MONO}">1 h 56 min</text>
        <text x="300" y="29" font-size="11.5" fill="${GREEN_TEXT}" opacity="0.8">— because the person who wrote it still works here.</text>
      </g>`;
    return { svg: wTM(inner), pills: pT('Support to engineering', '1 h 56 min') };
  },
};

/* ── 11 · THE FIRST BILL ──────────────────────────────────────────── */
export const firstBill = {
  id: 'tm-bill',
  name: 'The First Bill',
  family: 'Origin',
  tagline: 'The roaming statement the founders actually paid',
  desc: 'The journey block further up this page says the founders were paying $50+ for basic data abroad while resellers marked the same gigabytes up 300\u2013500%, and then the team panel never mentions it. This puts that statement on screen as an object: a 2021 roaming invoice, the data line ringed at \u20ac212.40, the page\u2019s own sentence set beside it as a pull quote, and the same fortnight priced at $11.00 today. Almost no motion \u2014 it is one artefact and one quotation.',
  pros: [
    'Answers \u201Cwhy does this company exist\u201D, which no other option on the board attempts',
    'Uses the page\u2019s own 2021 copy, so nothing has to be written from scratch',
    'A bill is the one travel object more universal than a passport stamp',
    'The quietest option in the set \u2014 useful next to nine animated panels',
  ],
  cons: [
    'Barely moves, so it will read as static beside the livelier options',
    'The invoice figures are illustrative and would need to be a real, redacted bill',
    'Looks backwards at 2021 rather than at the team as it is now',
  ],
  scores: { story: 5, motion: 2, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const D = 6.4;
    const rows = [
      ['Voice, outbound', '\u20ac18.40', false],
      ['SMS', '\u20ac4.10', false],
      ['Data roaming \u00b7 2.4 GB', '\u20ac212.40', true],
      ['VAT', '\u20ac52.68', false],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(180, 200, 240, uid, RED)}
      ${mono(40, 40, 'WHY THIS COMPANY EXISTS', { size: 10, op: 0.32 })}

      <g>
        ${card(40, 62, 276, 300, { r: 10, fill: '#FFFDF8', stroke: INK, sw: 2.5 })}
        ${mono(62, 92, 'ROAMING STATEMENT \u00b7 2021', { size: 8.5, op: 0.4 })}
        ${label(62, 118, '14 days, one trip', { size: 14 })}
        <path d="M 62 132 H 294" stroke="${LINE}" stroke-width="1.5"/>
        ${rows.map(([t, v, hot], i) => {
      const ry = 158 + i * 34;
      const on = (0.08 + i * 0.07).toFixed(3), lit = (0.14 + i * 0.07).toFixed(3);
      return `
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${lit};1"
              dur="${D}s" repeatCount="indefinite"/>
            ${hot ? `<rect x="56" y="${ry - 17}" width="244" height="28" rx="6" fill="#FEF2F2"/>` : ''}
            <text x="62" y="${ry}" font-size="11.5" fill="${INK}" opacity="${hot ? 0.9 : 0.62}">${t}</text>
            <text x="294" y="${ry}" text-anchor="end" font-size="12" font-weight="700"
              fill="${hot ? RED : INK}" style="font-family:${MONO}">${v}</text>
          </g>`;
    }).join('')}
        <path d="M 62 304 H 294" stroke="${INK}" stroke-width="1.5" opacity="0.35"/>
        ${label(62, 330, 'Total', { size: 13 })}
        ${num(294, 332, '\u20ac287.58', { size: 19, anchor: 'end', fill: INK })}
        <ellipse cx="178" cy="217" rx="122" ry="20" fill="none" stroke="${RED}" stroke-width="2.2"
          stroke-dasharray="460" stroke-dashoffset="460" opacity="0.85" transform="rotate(-1.5 178 217)">
          <animate attributeName="stroke-dashoffset" values="460;460;0;0" keyTimes="0;0.34;0.52;1"
            dur="${D}s" repeatCount="indefinite"/>
        </ellipse>
      </g>

      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.5;0.58;1" dur="${D}s" repeatCount="indefinite"/>
        <text x="348" y="122" font-size="19" font-weight="700" fill="${INK}">\u201COur founders were</text>
        <text x="348" y="150" font-size="19" font-weight="700" fill="${INK}">frustrated paying $50+</text>
        <text x="348" y="178" font-size="19" font-weight="700" fill="${INK}">for basic data while</text>
        <text x="348" y="206" font-size="19" font-weight="700" fill="${INK}">travelling.\u201D</text>
        ${mono(348, 232, '\u2014 /ABOUT, THE PROBLEM, 2021', { size: 9, op: 0.45 })}
      </g>
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.68;0.76;1" dur="${D}s" repeatCount="indefinite"/>
        ${card(348, 254, 252, 76, { r: 12, fill: P.wash, stroke: P.soft, sw: 2 })}
        ${mono(368, 280, 'THE SAME 14 DAYS, TODAY', { size: 8.5, op: 0.5 })}
        ${num(368, 314, '$11.00', { size: 26 })}
        ${mono(348, 352, 'THE SAME GIGABYTES, MARKED UP 300\u2013500%', { size: 8.5, op: 0.38 })}
      </g>

      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.8;0.88;1" dur="${D}s" repeatCount="indefinite"/>
        ${card(40, 384, 560, 44, { r: 11 })}
        ${tick(62, 408, 'Everyone who works here has paid a bill like this one. That is the hiring filter.', { size: 11.5 })}
      </g>`;
    return { svg: wTM(inner), pills: pT('Built by travelers', 'Started with a bill') };
  },
};

/* ── 12 · IN THE BAG ─────────────────────────────────────────────── */
export const inTheBag = {
  id: 'tm-bag',
  name: 'In the Bag',
  family: 'Physical',
  tagline: 'The kit every device claim is checked on',
  desc: 'A flat-lay of what the team actually carries: a laptop, three handsets \u2014 an iPhone, a Pixel and the cheap Android nobody tests on \u2014 a backup hotspot and a printed activation code for when there is no connection to download one. Each object appears with the reason it is in the bag. It evidences the engineering half of this section with objects rather than a percentage, and it is the only option here that explains how compatibility claims get verified.',
  pros: [
    'Turns \u201C45% engineering\u201D into something a non-technical reader can see',
    'The cheap Android is the detail that proves the testing is real, not decorative',
    'A flat-lay reads instantly and holds up as a still first frame',
    'Warm and specific without needing photographs of people',
  ],
  cons: [
    'Six objects on two shelves, each with a caption \\u2014 the busiest option here at 390px',
    'Says nothing about where the team is or how many of them there are',
    'Named handsets date quickly and will need refreshing each cycle',
  ],
  scores: { story: 4, motion: 4, perf: 5, mobile: 3, brand: 4, ease: 4 },
  build: (uid) => {
    const D = 6.6;
    const t = (i) => [((0.5 + i * 0.6) / D).toFixed(3), ((0.85 + i * 0.6) / D).toFixed(3)];
    const phoneKit = (x, label1, label2, tone) => `
      <rect x="${x - 23}" y="-44" width="46" height="88" rx="11" fill="${WHITE}" stroke="${INK}" stroke-width="2.2"/>
      <rect x="${x - 17}" y="-34" width="34" height="62" rx="5" fill="${tone}"/>
      <circle cx="${x}" cy="35" r="3.4" fill="${INK}" opacity="0.35"/>
      ${mono(x, 60, label1, { size: 8.5, anchor: 'middle', op: 0.6 })}
      ${mono(x, 72, label2, { size: 7.5, anchor: 'middle', op: 0.38 })}`;
    const items = [
      `<g transform="translate(170 150)">
        <rect x="-72" y="-48" width="144" height="94" rx="9" fill="${WHITE}" stroke="${INK}" stroke-width="2.5"/>
        <rect x="-63" y="-39" width="126" height="68" rx="4" fill="${P.wash}"/>
        <path d="M -55 -20 H 10 M -55 -6 H 40 M -55 8 H -10" stroke="${P.deep}" stroke-width="2.4" opacity="0.5"/>
        <path d="M -84 52 H 84" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
        ${mono(0, 74, 'THE DEVICE DATABASE', { size: 8.5, anchor: 'middle', op: 0.6 })}
        ${mono(0, 86, 'EVERY MODEL, RECHECKED', { size: 7.5, anchor: 'middle', op: 0.38 })}
      </g>`,
      `<g transform="translate(362 150)">${phoneKit(0, 'iPHONE 15', 'DUAL eSIM', P.wash)}</g>`,
      `<g transform="translate(446 150)">${phoneKit(0, 'PIXEL 8', 'ANDROID', '#F1F2F4')}</g>`,
      `<g transform="translate(530 150)">${phoneKit(0, 'GALAXY A14', 'CHEAP ONE', P.soft)}</g>`,
      `<g transform="translate(224 272)">
        <rect x="-30" y="-30" width="60" height="60" rx="14" fill="${INK}"/>
        <circle cy="4" r="4" fill="${P.main}"/>
        <path d="M -12 -6 a 17 17 0 0 1 24 0 M -20 -16 a 28 28 0 0 1 40 0" fill="none"
          stroke="${P.main}" stroke-width="2.4" stroke-linecap="round" opacity="0.8"/>
        ${mono(0, 48, 'BACKUP HOTSPOT', { size: 8.5, anchor: 'middle', op: 0.6 })}
        ${mono(0, 60, 'TO TEST OURS AGAINST', { size: 7.5, anchor: 'middle', op: 0.38 })}
      </g>`,
      `<g transform="translate(416 272)">
        <rect x="-30" y="-30" width="60" height="60" rx="7" fill="${WHITE}" stroke="${INK}" stroke-width="2.2"/>
        ${[[-20, -20], [-4, -20], [12, -20], [-20, -4], [12, -4], [-20, 12], [-4, 12], [12, 12], [-4, -4]]
        .map(([qx, qy], k) => `<rect x="${qx}" y="${qy}" width="8" height="8" rx="1.6" fill="${INK}" opacity="${k % 3 ? 0.85 : 0.4}"/>`).join('')}
        ${mono(0, 48, 'PRINTED CODE', { size: 8.5, anchor: 'middle', op: 0.6 })}
        ${mono(0, 60, 'FOR WHEN THERE IS NO SIGNAL', { size: 7.5, anchor: 'middle', op: 0.38 })}
      </g>`,
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 190, 250, uid)}
      ${mono(40, 40, 'WHAT IS IN THE BAG, AND WHY', { size: 10, op: 0.32 })}
      ${mono(600, 40, 'THE ANSWER DIFFERS BY MODEL, NOT BY BRAND', { size: 9, op: 0.3, anchor: 'end' })}
      ${panel(40, 58, 560, 292, { r: 16 })}
      ${Array.from({ length: 5 }, (_, i) =>
      `<path d="M 64 ${96 + i * 46} H 576" stroke="${LINE}" stroke-width="1" opacity="0.5"/>`).join('')}
      ${items.map((g, i) => {
      const [a, b] = t(i);
      return `
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${a};${b};1" dur="${D}s" repeatCount="indefinite"/>
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 12;0 12;0 0;0 0"
              keyTimes="0;${a};${b};1" dur="${D}s" repeatCount="indefinite"/>
            ${g}
          </g>
        </g>`;
    }).join('')}
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.78;0.86;1" dur="${D}s" repeatCount="indefinite"/>
        ${card(40, 372, 560, 44, { r: 11, fill: P.wash, stroke: P.soft, sw: 1.8 })}
        ${tick(62, 396, 'Every compatibility claim on this site was checked on one of these, by hand.', { size: 11.5 })}
      </g>`;
    return { svg: wTM(inner), pills: pT('45% engineering', 'Checked by hand') };
  },
};

/* ── 13 · THE WEEK, COVERED ────────────────────────────────────────── */
export const weekCovered = {
  id: 'tm-week',
  name: 'The Week, Covered',
  family: 'Data',
  tagline: 'Every hour of a week, and how many of us were on it',
  desc: 'A grid of 168 cells \u2014 seven days by twenty-four hours \u2014 shades in from the six timezone offsets the team actually works in, so the reader can see coverage instead of being told about it. Every weekday hour has someone on it; twenty weekend hours do not, and the grid leaves those cells empty and counts them out loud. Naming the gap is the whole point; \u201Csix timezones, one network\u201D is a claim, and a grid with holes in it is a measurement.',
  pros: [
    'Publishes the gap rather than implying round-the-clock cover we do not have',
    'One grid answers how the timezone spread actually behaves across a week',
    'Completely static geometry \u2014 168 rects, nothing expensive',
    'Rereadable: the shape rewards a second look in a way an avatar row does not',
  ],
  cons: [
    'A heatmap is a dashboard object on the warmest section of the site',
    'Admitting twenty uncovered weekend hours hands a competitor a line to use',
    'Cells are small at 390px, so the picture survives but the hour labels do not',
  ],
  scores: { story: 4, motion: 3, perf: 4, mobile: 3, brand: 3, ease: 4 },
  build: (uid) => {
    const D = 7;
    const offs = [-5, 1, 2, 4, 7, 9];
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const x0 = 96, y0 = 100, cw = 20, rh = 32;
    const cells = [];
    let cov = 0;
    days.forEach((dy, d) => {
      for (let h = 0; h < 24; h++) {
        let n = offs.filter((o) => {
          const lh = ((h + o) % 24 + 24) % 24;
          return lh >= 9 && lh < 19;
        }).length;
        if (d === 5) n = Math.floor(n / 2);
        if (d === 6) n = Math.floor(n / 3);
        if (d === 6 && (h === 3 || h === 4)) n = 0;
        if (n > 0) cov++;
        const cx = x0 + h * cw, cy = y0 + d * rh;
        const op = n === 0 ? 0 : (0.16 + (n / 6) * 0.76).toFixed(2);
        const on = (0.05 + h * 0.018).toFixed(3), lit = (0.09 + h * 0.018).toFixed(3);
        cells.push(n === 0
          ? `<rect x="${cx}" y="${cy}" width="18" height="30" rx="3" fill="none" stroke="${LINE}" stroke-width="1.4"/>`
          : `<rect x="${cx}" y="${cy}" width="18" height="30" rx="3" fill="${P.main}" opacity="0">
              <animate attributeName="opacity" values="0;0;${op};${op}" keyTimes="0;${on};${lit};1"
                dur="${D}s" repeatCount="indefinite"/></rect>`);
      }
    });
    const inner = `
      ${dots(uid)}
      ${bloom(320, 200, 250, uid)}
      ${mono(40, 40, 'ONE WEEK, EVERY HOUR, HOW MANY OF US WERE ON IT', { size: 10, op: 0.32 })}
      ${mono(600, 40, 'UTC', { size: 10, op: 0.32, anchor: 'end' })}
      ${[0, 4, 8, 12, 16, 20].map((h) =>
      mono(x0 + h * cw + 9, 92, String(h).padStart(2, '0'), { size: 8, op: 0.35, anchor: 'middle' })).join('')}
      ${days.map((dy, d) => mono(88, y0 + d * rh + 20, dy, { size: 8.5, op: 0.4, anchor: 'end' })).join('')}
      ${cells.join('')}

      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${D}s" repeatCount="indefinite"/>
        <rect x="${x0 + 3 * cw - 4}" y="${y0 + 6 * rh - 4}" width="46" height="38" rx="7"
          fill="none" stroke="${RED}" stroke-width="2" stroke-dasharray="5 4"/>
        <path d="M ${x0 + 3 * cw + 42} ${y0 + 6 * rh + 15} H 320" stroke="${RED}" stroke-width="1.6" opacity="0.6"/>
        ${mono(328, y0 + 6 * rh + 19, 'NOBODY ON', { size: 8.5, op: 0.9, fill: RED })}
      </g>

      <g transform="translate(40 352)">
        ${[1, 2, 3, 4, 5, 6].map((n, i) =>
      `<rect x="${i * 22}" y="-11" width="18" height="14" rx="3" fill="${P.main}" opacity="${(0.16 + (n / 6) * 0.76).toFixed(2)}"/>`).join('')}
        ${mono(146, 0, 'ONE PERSON \u2192 SIX PEOPLE WORKING THAT HOUR', { size: 8.5, op: 0.4 })}
      </g>
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.74;0.82;1" dur="${D}s" repeatCount="indefinite"/>
        ${card(40, 372, 560, 56, { r: 12, fill: '#FEF2F2', stroke: '#F3C9CB', sw: 1.8 })}
        ${mono(62, 396, `THE ${168 - cov} HOURS WE DO NOT COVER`, { size: 9, op: 1, fill: RED })}
        <text x="62" y="414" font-size="11.5" fill="${INK}" opacity="0.7">All of them weekend nights, UTC. We would rather print the gap than claim 24/7 and miss it.</text>
      </g>`;
    return { svg: wTM(inner), pills: pT('Six timezones, one network', `${cov} of 168 hours`) };
  },
};

/* ── 14 · STUCK ABROAD ──────────────────────────────────────────── */
export const stuckAbroad = {
  id: 'tm-stuck',
  name: 'Stuck Abroad',
  family: 'Transcript',
  tagline: 'The channel where we report our own product failing',
  desc: 'A dark chat panel showing four messages from the team\u2019s own #stuck-abroad channel: an activation that would not complete behind an airport wifi portal, the engineer reproducing it twenty minutes later, the fallback shipped the same morning, and the device database updated so nobody hits it again. A line at the foot says 23 of the last 25 bugs were found by us, on the road, before a customer hit one.',
  pros: [
    'The team as its own worst critic is a far stronger claim than the team as a headcount',
    'The only option here where the product is shown failing, which is why it reads as true',
    'Four messages carry a complete story with no diagram to decode',
    'A chat transcript is legible at any width and cheap to build',
  ],
  cons: [
    'Puts a bug on the About page, and some readers will only remember the bug',
    'Dark on a warm cream section \u2014 it will need the surrounding padding checked',
    'The 23-of-25 figure has to be measured, not estimated',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const D = 7.6;
    const msgs = [
      ['M', 'Marta', '04:12', 'QR will not scan at TBS \u2014 the airport wifi portal is eating our activation call', '#3A2E46'],
      ['K', 'Kenji', '04:34', 'Reproduced. It is the captive-portal check, not the code. On it', '#2E4640'],
      ['A', 'Ana', '09:03', 'Shipped: one retry, plus a plain activation code as a fallback', '#2E3846'],
      ['T', 'Th\u00e9o', '09:41', 'Added the airport to the device DB so nobody meets this twice', '#46392E'],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 200, 250, uid)}
      ${mono(40, 40, 'OUR OWN BUG REPORTS, FROM THE ROAD', { size: 10, op: 0.32 })}
      <rect x="40" y="58" width="560" height="300" rx="16" fill="#0A1122"/>
      <rect x="40" y="58" width="560" height="38" rx="16" fill="#131C31"/>
      <rect x="40" y="80" width="560" height="16" fill="#131C31"/>
      ${mono(64, 83, '# stuck-abroad', { size: 10.5, op: 1, fill: '#E7EDF7' })}
      ${mono(576, 83, '14 MEMBERS \u00b7 NO CUSTOMERS IN HERE', { size: 8.5, op: 0.55, fill: '#6C7C99', anchor: 'end' })}
      ${msgs.map(([ini, who, at, text, av], i) => {
      const my = 122 + i * 58;
      const a = ((0.6 + i * 1.3) / D).toFixed(3), b = ((0.95 + i * 1.3) / D).toFixed(3);
      return `
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${a};${b};1" dur="${D}s" repeatCount="indefinite"/>
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 10;0 10;0 0;0 0"
              keyTimes="0;${a};${b};1" dur="${D}s" repeatCount="indefinite"/>
            <circle cx="80" cy="${my}" r="14" fill="${av}"/>
            <text x="80" y="${my + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="#C9D6EC">${ini}</text>
            <text x="106" y="${my - 3}" font-size="11.5" font-weight="700" fill="#F2F5FA">${who}</text>
            ${mono(106 + who.length * 8 + 12, my - 3, at, { size: 8.5, op: 0.5, fill: '#6C7C99' })}
            <text x="106" y="${my + 16}" font-size="11.5" fill="#B9C6DE">${text}</text>
          </g>
        </g>`;
    }).join('')}
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.28;0.32;0.5;0.54;1"
          dur="${D}s" repeatCount="indefinite"/>
        ${[0, 1, 2].map((k) => `<circle cx="${112 + k * 12}" cy="336" r="3.6" fill="#48577A">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" begin="${(k * 0.2).toFixed(1)}s" repeatCount="indefinite"/>
        </circle>`).join('')}
        ${mono(154, 340, 'KENJI IS TYPING', { size: 8.5, op: 0.5, fill: '#6C7C99' })}
      </g>
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.82;0.9;1" dur="${D}s" repeatCount="indefinite"/>
        ${card(40, 380, 560, 48, { r: 12, fill: P.wash, stroke: P.soft, sw: 2 })}
        ${tick(62, 406, 'Twenty-three of the last twenty-five bugs were found by us, abroad, first.', { size: 11.5 })}
      </g>`;
    return { svg: wTM(inner), pills: pT('We use it too', 'Found by us first') };
  },
};

/* ── 15 · THREE NUMBERS ─────────────────────────────────────────── */
export const threeNumbers = {
  id: 'tm-three',
  name: 'Three Numbers',
  family: 'Single gesture',
  tagline: 'A hundred people, eight countries, no offices',
  desc: 'Three figures at enormous size and nothing else. A hundred and eight count up; the third stays at zero, because the page already says there are no call centres and no retail stores, and the zero is the interesting number. One line underneath connects it to the price. It is the opposite of every other option on this board \u2014 no panel, no rows, no map.',
  pros: [
    'Readable in the half second a visitor gives a hero-adjacent panel',
    'The zero carries a claim the page makes in prose and never shows',
    'Nothing to maintain and nothing to break at any width',
    'Sits comfortably next to the four percentage cards instead of competing with them',
  ],
  cons: [
    'No travelling in it at all, which is what the section heading promises',
    'Three numerals is thin if Paul wants the panel to carry a story',
    'Zero offices is only impressive until every remote company says it',
  ],
  scores: { story: 3, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const D = 5.8;
    const cols = [
      [150, ['0', '28', '61', '88', '100'], 'PEOPLE', 'ACROSS EIGHT COUNTRIES', INK],
      [320, ['0', '3', '6', '8', '8'], 'COUNTRIES', 'NO TWO OF US CO-LOCATED', INK],
      [490, ['0', '0', '0', '0', '0'], 'OFFICES', 'NO CALL CENTRE EITHER', null],
    ];
    const inner = `
      ${dots(uid)}
      ${bloom(320, 200, 260, uid)}
      ${mono(40, 40, 'THE WHOLE COMPANY, IN THREE FIGURES', { size: 10, op: 0.32 })}
      ${cols.map(([cx, steps, cap, sub, fill]) => `
        <g>
          ${steps.map((s, k) => {
      const last = k === steps.length - 1;
      const on = (k * 0.1).toFixed(3), off = ((k + 1) * 0.1).toFixed(3);
      const kt = last ? `0;${on};1` : `0;${on};${off};1`;
      const vals = last ? '0;1;1' : '0;1;0;0';
      return `<text x="${cx}" y="228" text-anchor="middle" font-size="94" font-weight="700"
              fill="${fill || P.deep}" opacity="0" style="font-family:${MONO}">${s}
              <animate attributeName="opacity" values="${vals}" keyTimes="${kt}"
                dur="${D}s" repeatCount="indefinite" calcMode="discrete"/></text>`;
    }).join('')}
          ${mono(cx, 262, cap, { size: 12, op: 0.6, anchor: 'middle', ls: 2 })}
          ${mono(cx, 282, sub, { size: 8.5, op: 0.34, anchor: 'middle' })}
        </g>`).join('')}
      <path d="M 150 312 H 490" stroke="${LINE}" stroke-width="2"/>
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.5;0.6;1" dur="${D}s" repeatCount="indefinite"/>
        ${label(320, 350, 'A hundred people. Eight countries. Not one office.', { size: 19, anchor: 'middle' })}
        ${mono(320, 378, 'NO CALL CENTRES, NO RETAIL STORES \u2014 THAT MONEY IS IN THE PRICE', { size: 9, op: 0.4, anchor: 'middle' })}
      </g>`;
    return { svg: wTM(inner), pills: pT('100 people, counted', 'No offices') };
  },
};

export const TEAM_EXTRA = [passportPages, ourOwnLines, fourAirports, whereWeHired, straightToAuthor,
  firstBill, inTheBag, weekCovered, stuckAbroad, threeNumbers];
