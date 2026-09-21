/* ══ /home · "Refer a friend, and you'll both get US$5!" ══════════════
   This panel lives INSIDE the orange box, so the artwork is white-on-orange.
   Palette here: white, ink, and a pale mint for the credit badges — the
   same three the live box already uses.                                  */

import { G, gWrap, mono, label, card, gPill, gIcon } from './g-shared.js';

const W = '#FFFFFF';
const MINT = '#BBF7D0';
const MINT_T = '#166534';

const pillsR = (right = 'Both sides paid') => [
  gPill('ink', `${gIcon('zap')}${right}`, { top: '14px', right: '14px' }),
];

/* faint dotted field, but white-on-orange for this box */
const wdots = (uid) => `
  <defs>
    <pattern id="wd-${uid}" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="1.8" cy="1.8" r="1.8" fill="${W}" opacity="0.16"/>
    </pattern>
    <radialGradient id="wb-${uid}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${W}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${W}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="640" height="460" fill="url(#wd-${uid})"/>
  <circle cx="320" cy="220" r="230" fill="url(#wb-${uid})"/>`;

const avatar = (x, y, r, opts = {}) => `
  <g transform="translate(${x} ${y})">
    <circle r="${r}" fill="${opts.fill || G.ink}" stroke="${opts.stroke || G.ink}" stroke-width="3"/>
    ${opts.text
      ? `<text y="5" text-anchor="middle" font-size="${opts.size || 14}" font-weight="700" fill="${W}">${opts.text}</text>`
      : `<g transform="translate(-10 -10) scale(0.83)" fill="none" stroke="${W}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
         </g>`}
  </g>`;

const creditBadge = (x, y, t = '+US$5', op = 1) => `
  <g transform="translate(${x} ${y})" opacity="${op}">
    <rect x="-32" y="-13" width="64" height="26" rx="13" fill="${MINT}"/>
    <text y="5" text-anchor="middle" font-size="12" font-weight="700" fill="${MINT_T}"
      style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${t}</text>
  </g>`;

const chip = (x, y, t, w = 150) => `
  <g transform="translate(${x} ${y})">
    <rect x="${-w / 2}" y="-15" width="${w}" height="30" rx="15" fill="${W}"/>
    <path d="M ${-w / 2 + 16} 0 l 4 4 l 8 -9" fill="none" stroke="${G.deep}" stroke-width="2.4"
      stroke-linecap="round" stroke-linejoin="round"/>
    <text x="${-w / 2 + 36}" y="5" font-size="12.5" font-weight="700" fill="${G.ink}">${t}</text>
  </g>`;

/* ══════════════ 0 · CURRENT ══════════════ */
export const refCurrent = {
  id: 'ref-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'Two avatars, one static line',
  desc: 'You and a friend as two circles joined by a thin line, each with a +US$5 badge, plus two white check chips. Nothing moves except a faint bob. It states the offer correctly and then stops: no reason to look twice, no sense that anything is actually earned, and the bottom half of the panel is empty orange.',
  pros: ['Unambiguous: two people, five dollars each', 'Almost free to render and never fights the form'],
  cons: ['Static — no motion, so it reads as an icon rather than an offer', 'No sense of accumulation, which is what makes referral worth doing', 'Bottom half of the panel is empty', 'The form beside it is the only thing that feels interactive'],
  scores: { story: 3, motion: 1, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const inner = `
    ${wdots(uid)}
    <line x1="228" y1="176" x2="392" y2="176" stroke="${W}" stroke-width="2.5" opacity="0.7"/>
    ${avatar(192, 176, 36, { fill: G.orange, text: 'YOU', size: 15 })}
    ${avatar(428, 176, 36)}
    <g transform="translate(496 168)">
      <rect x="-40" y="-12" width="80" height="24" rx="6" fill="${G.ink}"/>
      <text y="4" text-anchor="middle" font-size="9.5" font-weight="700" fill="${W}" letter-spacing="1"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">OPENLINE5</text>
    </g>
    ${label(192, 238, 'You', { size: 15, fill: W, anchor: 'middle' })}
    ${label(428, 238, 'A friend', { size: 15, fill: W, anchor: 'middle' })}
    ${creditBadge(192, 272)}
    ${creditBadge(428, 272)}
    ${chip(236, 330, 'They save US$5', 152)}
    ${chip(410, 330, 'So do you', 122)}`;
    return { svg: gWrap(inner), pills: pillsR('US$5 each way') };
  },
};

/* ══════════════ 1 · CHAIN REACTION ══════════════ */
export const chain = {
  id: 'chain',
  name: 'Chain Reaction',
  family: 'Compounding',
  tagline: 'One invite becomes three',
  desc: 'You invite a friend, a credit lands on both of you — then that friend invites two more and the same thing happens again, while a running balance climbs US$5 → US$10 → US$15 and resets. The current panel shows one transaction; this one shows why a referral programme is worth using more than once.',
  pros: ['The only option that shows the upside growing', 'Uses the whole panel instead of one horizontal line', 'The climbing balance is the single most persuasive element', 'Reads correctly even with the sound off and the copy unread'],
  cons: ['Implies unlimited earning — check against the programme\'s actual cap', 'Busiest of the five'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const you = { x: 140, y: 208 };
    const f1 = { x: 320, y: 208 };
    const f2 = [{ x: 486, y: 130 }, { x: 486, y: 286 }];
    const link = (a, b) => `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
    const edge = (a, b, begin, dur = '1.2s') => `
      <path d="${link(a, b)}" stroke="${W}" stroke-width="2.5" opacity="0.28"/>
      <path d="${link(a, b)}" stroke="${W}" stroke-width="3" stroke-linecap="round" stroke-dasharray="200"
        stroke-dashoffset="200" opacity="0.9">
        <animate attributeName="stroke-dashoffset" values="200;200;0;0;200" dur="7.2s"
          keyTimes="0;${begin};${(begin + 0.09).toFixed(3)};0.90;1" repeatCount="indefinite"/>
      </path>
      <circle r="5" fill="${W}" opacity="0">
        <animateMotion dur="7.2s" keyTimes="0;${begin};${(begin + 0.09).toFixed(3)};1" keyPoints="0;0;1;1"
          calcMode="linear" path="${link(a, b)}" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0;0;1;0;0" dur="7.2s"
          keyTimes="0;${begin};${(begin + 0.045).toFixed(3)};${(begin + 0.10).toFixed(3)};1" repeatCount="indefinite"/>
      </circle>`;
    const pop = (x, y, begin) => `
      <g transform="translate(${x} ${y})" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" dur="7.2s"
          keyTimes="0;${begin};${(begin + 0.03).toFixed(3)};0.90;1" repeatCount="indefinite"/>
        ${creditBadge(0, 0)}
      </g>`;

    const inner = `
    ${wdots(uid)}
    ${mono(40, 46, 'ONE INVITE · THEN THEIRS', { size: 10.5, fill: W, op: 0.55 })}

    ${edge(you, f1, 0.06)}
    ${edge(f1, f2[0], 0.34)}
    ${edge(f1, f2[1], 0.40)}

    ${avatar(you.x, you.y, 34, { fill: G.ink, text: 'YOU', size: 14 })}
    <circle cx="${you.x}" cy="${you.y}" r="34" fill="none" stroke="${W}" stroke-width="2.5" opacity="0.6">
      <animate attributeName="r" values="34;54" dur="2.2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;0" dur="2.2s" repeatCount="indefinite"/>
    </circle>
    <g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" dur="7.2s" keyTimes="0;0.14;0.17;0.90;1" repeatCount="indefinite"/>
      ${avatar(f1.x, f1.y, 30, { fill: G.deep })}
    </g>
    ${f2.map((p, i) => `
      <g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" dur="7.2s"
        keyTimes="0;${0.44 + i * 0.06};${0.47 + i * 0.06};0.90;1" repeatCount="indefinite"/>
        ${avatar(p.x, p.y, 26, { fill: G.deep })}
      </g>`).join('')}

    ${pop(you.x, you.y - 52, 0.17)}
    ${pop(f1.x, f1.y - 48, 0.17)}
    ${pop(f2[0].x + 4, f2[0].y - 44, 0.50)}
    ${pop(f2[1].x + 4, f2[1].y + 44, 0.56)}

    ${label(you.x, you.y + 58, 'You', { size: 14, fill: W, anchor: 'middle' })}
    ${label(f1.x, f1.y + 54, 'A friend', { size: 14, fill: W, anchor: 'middle', op: 0.92 })}

    <!-- running balance -->
    <g transform="translate(40 374)">
      <rect x="0" y="0" width="238" height="58" rx="16" fill="${G.ink}"/>
      ${mono(20, 24, 'YOUR CREDIT', { size: 9, fill: W, op: 0.45 })}
      <text x="20" y="46" font-size="22" font-weight="700" fill="${W}"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><tspan data-role="bal">US$5</tspan></text>
      <g transform="translate(196 29)">
        <circle r="17" fill="${MINT}" opacity="0.9"/>
        <text y="5" text-anchor="middle" font-size="12" font-weight="700" fill="${MINT_T}"
          style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><tspan data-role="n">1</tspan></text>
      </g>
    </g>
    ${mono(298, 398, 'FRIENDS INVITED', { size: 10, fill: W, op: 0.5 })}
    ${mono(298, 418, 'THEY EACH GET US$5 TOO', { size: 10, fill: W, op: 0.5 })}`;

    return {
      svg: gWrap(inner),
      pills: pillsR('It compounds'),
      init(root) {
        const bal = root.querySelector('[data-role="bal"]');
        const n = root.querySelector('[data-role="n"]');
        if (!bal) return null;
        const seq = [[5, 1], [5, 1], [10, 2], [15, 3], [15, 3]];
        let k = 0;
        const id = setInterval(() => {
          const [v, c] = seq[k % seq.length];
          bal.textContent = `US$${v}`;
          n.textContent = String(c);
          k++;
        }, 1440);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════ 2 · SPLIT COIN ══════════════ */
export const splitCoin = {
  id: 'splitcoin',
  name: 'Split Coin',
  family: 'Single beat',
  tagline: 'US$10 arrives, then halves',
  desc: 'A single US$10 token drops into the frame, splits cleanly down the middle, and the two halves fly to you and your friend where they land as US$5 credits. One idea, one beat, three seconds, then it repeats. The simplest possible way to say "you both get paid" without a diagram.',
  pros: ['Instantly legible — the split IS the message', 'Calm enough to sit next to an email form without competing', 'Tiny payload; nothing to localise but the currency', 'Works at any size, including the phone'],
  cons: ['Says nothing about how referring actually works', 'Does not hint at repeat earning'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const half = (side) => `
      <g>
        <animateTransform attributeName="transform" type="translate" dur="4.4s" repeatCount="indefinite"
          keyTimes="0;0.34;0.40;0.66;1"
          values="0,0; 0,0; 0,0; ${side * 128},70; ${side * 128},70"
          calcMode="spline" keySplines="0 0 1 1;0 0 1 1;0.3 0 0.2 1;0 0 1 1"/>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" dur="4.4s" keyTimes="0;0.33;0.40;0.92;1" repeatCount="indefinite"/>
          <path d="${side < 0
            ? 'M 0 -40 A 40 40 0 0 0 0 40 Z'
            : 'M 0 -40 A 40 40 0 0 1 0 40 Z'}" fill="${W}"/>
          <text x="${side * 15}" y="6" text-anchor="middle" font-size="16" font-weight="700" fill="${G.deep}"
            style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">$5</text>
        </g>
      </g>`;

    const inner = `
    ${wdots(uid)}
    ${mono(40, 46, 'ONE REWARD · SPLIT TWO WAYS', { size: 10.5, fill: W, op: 0.55 })}

    <!-- the whole coin, before the split -->
    <g transform="translate(320 156)">
      <g opacity="1">
        <animate attributeName="opacity" values="0;1;1;0;0" dur="4.4s" keyTimes="0;0.10;0.33;0.36;1" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" dur="4.4s" repeatCount="indefinite"
          keyTimes="0;0.14;0.22;1" values="0,-86; 0,0; 0,0; 0,0"
          calcMode="spline" keySplines="0.3 0 0.2 1;0 0 1 1;0 0 1 1"/>
        <circle r="40" fill="${W}"/>
        <text y="8" text-anchor="middle" font-size="22" font-weight="700" fill="${G.deep}"
          style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">$10</text>
      </g>
      <!-- split flash -->
      <line x1="0" y1="-56" x2="0" y2="56" stroke="${W}" stroke-width="3" opacity="0">
        <animate attributeName="opacity" values="0;0;1;0;0" dur="4.4s" keyTimes="0;0.32;0.35;0.42;1" repeatCount="indefinite"/>
      </line>
      ${half(-1)}
      ${half(1)}
    </g>

    ${avatar(192, 320, 36, { fill: G.ink, text: 'YOU', size: 14 })}
    ${avatar(448, 320, 36, { fill: G.deep })}
    ${label(192, 382, 'You', { size: 15, fill: W, anchor: 'middle' })}
    ${label(448, 382, 'Your friend', { size: 15, fill: W, anchor: 'middle' })}
    <g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" dur="4.4s" keyTimes="0;0.64;0.70;0.92;1" repeatCount="indefinite"/>
      ${creditBadge(192, 418)}
      ${creditBadge(448, 418)}
    </g>`;
    return { svg: gWrap(inner), pills: pillsR('US$5 each') };
  },
};

/* ══════════════ 3 · LINK IN FLIGHT ══════════════ */
export const linkFlight = {
  id: 'linkflight',
  name: 'Link in Flight',
  family: 'Mechanic',
  tagline: 'Copy, send, install, both paid',
  desc: 'The referral link appears as a pill, a cursor copies it, it flies off as a message into a friend\'s phone, the phone shows an eSIM activating, and both balances tick up. It is the only option that shows the four steps the paragraph describes, which is exactly what someone hesitating over the form wants to know.',
  pros: ['Answers "what actually happens after I get the link?"', 'Mirrors the form directly beside it, so the panel feels connected to it', 'Four beats keep the loop alive without racing', 'The copy-cursor moment is a small, satisfying detail'],
  cons: ['Most literal of the five — less brand, more tutorial', 'The link text needs to stay generic, not a real code'],
  scores: { story: 5, motion: 4, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const inner = `
    ${wdots(uid)}
    ${mono(40, 46, 'COPY · SEND · INSTALL · BOTH PAID', { size: 10.5, fill: W, op: 0.55 })}

    <!-- step 1: the link pill + cursor -->
    <g transform="translate(46 118)">
      <rect x="0" y="0" width="266" height="46" rx="23" fill="${W}"/>
      <text x="22" y="29" font-size="13" font-weight="700" fill="${G.ink}" opacity="0.75"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">openline.com/r/OPENLINE5</text>
      <g transform="translate(240 23)">
        <circle r="17" fill="${G.ink}"/>
        <g transform="translate(-7 -7)" fill="none" stroke="${W}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="9" height="11" rx="2"/><path d="M 1 10 V 2 a 1 1 0 0 1 1 -1 h 8"/>
        </g>
      </g>
      <!-- copied flash -->
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;0;0" dur="6.4s" keyTimes="0;0.10;0.16;0.26;1" repeatCount="indefinite"/>
        <rect x="0" y="0" width="266" height="46" rx="23" fill="none" stroke="${MINT}" stroke-width="3"/>
        <rect x="186" y="-32" width="84" height="26" rx="13" fill="${MINT}"/>
        <text x="228" y="-14" text-anchor="middle" font-size="11" font-weight="700" fill="${MINT_T}"
          style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">COPIED</text>
      </g>
    </g>
    <!-- cursor -->
    <g>
      <animateTransform attributeName="transform" type="translate" dur="6.4s" repeatCount="indefinite"
        keyTimes="0;0.09;0.16;0.24;1" values="220,212; 288,150; 288,150; 220,212; 220,212"
        calcMode="spline" keySplines="0.3 0 0.2 1;0 0 1 1;0.3 0 0.2 1;0 0 1 1"/>
      <path d="M 0 0 L 0 17 L 4.5 12.5 L 7.5 19 L 10.5 17.5 L 7.5 11 L 13.5 10.5 Z"
        fill="${G.ink}" stroke="${W}" stroke-width="1.6"/>
    </g>

    <!-- step 2: the message in flight -->
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1;0;0" dur="6.4s" keyTimes="0;0.24;0.28;0.44;0.48;1" repeatCount="indefinite"/>
      <animateMotion dur="6.4s" repeatCount="indefinite" keyTimes="0;0.26;0.46;1" keyPoints="0;0;1;1"
        calcMode="linear" path="M 200 200 C 300 210 380 232 438 244"/>
      <g transform="translate(-34 -20)">
        <rect x="0" y="0" width="68" height="40" rx="12" fill="${W}"/>
        <path d="M 12 52 L 12 36 L 26 40 Z" fill="${W}"/>
        <rect x="12" y="12" width="44" height="4" rx="2" fill="${G.deep}" opacity="0.55"/>
        <rect x="12" y="22" width="30" height="4" rx="2" fill="${G.deep}" opacity="0.3"/>
      </g>
    </g>

    <!-- step 3: the friend's phone -->
    <g transform="translate(452 246)">
      <rect x="-44" y="-96" width="88" height="192" rx="18" fill="${G.ink}"/>
      <rect x="-39" y="-91" width="78" height="182" rx="14" fill="#17171C"/>
      <rect x="-13" y="-85" width="26" height="5" rx="2.5" fill="#000" opacity="0.8"/>
      ${mono(0, -52, 'INVITED BY', { size: 8, anchor: 'middle', fill: W, op: 0.4 })}
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" dur="6.4s" keyTimes="0;0.46;0.54;0.94;1" repeatCount="indefinite"/>
        <rect x="-26" y="-30" width="52" height="40" rx="9" fill="${G.orange}"/>
        <path d="M -9 -11 L -3 -4 L 10 -18" fill="none" stroke="${W}" stroke-width="3"
          stroke-linecap="round" stroke-linejoin="round"/>
        ${mono(0, 32, 'eSIM ACTIVE', { size: 8, anchor: 'middle', fill: G.orange, op: 0.95 })}
      </g>
      <g transform="translate(0 62)">
        <rect x="-30" y="-12" width="60" height="24" rx="12" fill="${W}" opacity="0.12"/>
        ${mono(0, 4, '+US$5', { size: 9.5, anchor: 'middle', fill: W, op: 0.75 })}
      </g>
    </g>
    ${label(452, 372, 'Your friend', { size: 14, fill: W, anchor: 'middle' })}

    <!-- step 4: your balance -->
    <g transform="translate(46 326)">
      <rect x="0" y="0" width="242" height="60" rx="16" fill="${G.ink}"/>
      ${mono(20, 25, 'YOUR CREDIT', { size: 9, fill: W, op: 0.45 })}
      <text x="20" y="48" font-size="22" font-weight="700" fill="${W}"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><tspan data-role="bal2">US$0</tspan></text>
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" dur="6.4s" keyTimes="0;0.56;0.62;0.94;1" repeatCount="indefinite"/>
        ${creditBadge(198, 30)}
      </g>
    </g>
    ${mono(46, 414, 'THEY SAVE US$5 · SO DO YOU', { size: 10, fill: W, op: 0.5 })}`;

    return {
      svg: gWrap(inner),
      pills: pillsR('The whole flow'),
      init(root) {
        const bal = root.querySelector('[data-role="bal2"]');
        if (!bal) return null;
        const seq = ['US$0', 'US$0', 'US$0', 'US$5', 'US$5'];
        let k = 0;
        const id = setInterval(() => { bal.textContent = seq[k % seq.length]; k++; }, 1280);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════ 4 · TWO WALLETS ══════════════ */
export const wallets = {
  id: 'wallets',
  name: 'Two Wallets',
  family: 'Calm / premium',
  tagline: 'Both balances move at the same instant',
  desc: 'Two balance cards side by side — yours and your friend\'s. Every few seconds a new friend joins a small queue below, a coin drops into each card, and both numbers increment together. Symmetry is the whole point: whatever you get, they get. The quietest option, and the one that looks most like a real product screen.',
  pros: ['Perfect symmetry makes "you both" self-evident', 'Calm loop that never competes with the form', 'Numbers rising is the most persuasive motion available here', 'Trivial to wire to real balances later'],
  cons: ['No illustration of the invite mechanic itself', 'Two large cards leave less room for the queue on a phone'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const walletCard = (x, who, role) => `
      <g transform="translate(${x} 96)">
        <rect x="0" y="0" width="244" height="150" rx="20" fill="${W}"/>
        <g transform="translate(22 26)">
          ${who === 'you'
            ? `<circle cx="14" cy="14" r="14" fill="${G.ink}"/><text x="14" y="19" text-anchor="middle" font-size="10" font-weight="700" fill="${W}">YOU</text>`
            : `<circle cx="14" cy="14" r="14" fill="${G.deep}"/><g transform="translate(6 6) scale(0.68)" fill="none" stroke="${W}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></g>`}
          <text x="42" y="19" font-size="14.5" font-weight="700" fill="${G.ink}">${who === 'you' ? 'Your credit' : 'Their credit'}</text>
        </g>
        <text x="22" y="112" font-size="38" font-weight="700" fill="${G.deep}"
          style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><tspan data-role="${role}">US$0</tspan></text>
        ${mono(22, 134, 'APPLIED AT CHECKOUT', { size: 9, op: 0.35 })}
        <!-- coin drop -->
        <g data-coin="${role}" opacity="0">
          <circle cx="206" cy="60" r="18" fill="${MINT}"/>
          <text x="206" y="65" text-anchor="middle" font-size="11" font-weight="700" fill="${MINT_T}"
            style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">$5</text>
        </g>
      </g>`;

    const inner = `
    ${wdots(uid)}
    ${mono(40, 46, 'SAME CREDIT · BOTH SIDES · EVERY TIME', { size: 10.5, fill: W, op: 0.55 })}
    ${walletCard(40, 'you', 'wy')}
    ${walletCard(316, 'friend', 'wf')}
    <!-- the equals sign between them -->
    <g transform="translate(298 171)">
      <rect x="-9" y="-9" width="18" height="4" rx="2" fill="${W}" opacity="0.85"/>
      <rect x="-9" y="3" width="18" height="4" rx="2" fill="${W}" opacity="0.85"/>
    </g>

    <!-- the joining queue -->
    ${mono(40, 296, 'FRIENDS WHO JOINED', { size: 10, fill: W, op: 0.5 })}
    <g transform="translate(40 318)">
      ${[0, 1, 2, 3, 4].map(i => `
        <g data-q="${i}" transform="translate(${i * 56} 0)" opacity="0.25">
          <circle cx="22" cy="22" r="22" fill="${G.ink}"/>
          <g transform="translate(11 11) scale(0.92)" fill="none" stroke="${W}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          </g>
        </g>`).join('')}
      <g transform="translate(288 0)">
        <circle cx="22" cy="22" r="22" fill="${W}" opacity="0.22"/>
        <text x="22" y="28" text-anchor="middle" font-size="16" font-weight="700" fill="${W}">+</text>
      </g>
    </g>
    ${mono(40, 416, 'JOIN 1M+ TRAVELLERS ALREADY EARNING', { size: 10, fill: W, op: 0.5 })}`;

    return {
      svg: gWrap(inner),
      pills: pillsR('Always symmetrical'),
      init(root) {
        const wy = root.querySelector('[data-role="wy"]');
        const wf = root.querySelector('[data-role="wf"]');
        const coins = [...root.querySelectorAll('[data-coin]')];
        const q = [...root.querySelectorAll('[data-q]')];
        if (!wy || !wf) return null;
        let n = 0;
        const tick = () => {
          n = n % 5 + 1;
          wy.textContent = wf.textContent = `US$${n * 5}`;
          q.forEach((g, i) => g.setAttribute('opacity', i < n ? '1' : '0.25'));
          coins.forEach(c => {
            c.setAttribute('opacity', '1');
            c.style.transition = 'none';
            c.style.transform = 'translateY(-26px)';
            requestAnimationFrame(() => {
              c.style.transition = 'transform .5s cubic-bezier(.2,.7,.3,1), opacity .5s ease .45s';
              c.style.transform = 'translateY(0)';
              c.setAttribute('opacity', '0');
            });
          });
        };
        tick();
        const id = setInterval(tick, 2000);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════ 5 · REFERRAL LEDGER ══════════════ */
export const ledger = {
  id: 'ledger',
  name: 'Referral Ledger',
  family: 'Data-led',
  tagline: 'No illustration — just the earnings',
  desc: 'A ledger of invited friends filling in row by row: name, status, credit, date. Rows land one at a time, the total in the corner climbs, and the newest row glows briefly. No avatars, no coins — it reads as an account statement, which is the most credible thing you can put next to a money claim.',
  pros: ['Money claims are more believable as a statement than as an illustration', 'Scales to any number of referrals with no redesign', 'Lightest of the five; pure type and rules', 'Reads as "this already works for other people"'],
  cons: ['Coldest option — no warmth, no faces', 'Invites the question whether the numbers are real', 'Needs the row count cut on a phone'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 3, brand: 3, ease: 4 },
  build: (uid) => {
    const rows = [
      ['Marta S.', 'Joined', 'US$5', '12 Sep'],
      ['Tobias K.', 'Joined', 'US$5', '14 Sep'],
      ['Aline R.', 'Joined', 'US$5', '17 Sep'],
      ['Kenji M.', 'Joined', 'US$5', '19 Sep'],
      ['Priya N.', 'Pending', '—', 'today'],
    ];
    const rh = 50;
    const inner = `
    ${wdots(uid)}
    <g transform="translate(40 60)">
      <rect x="0" y="0" width="560" height="${44 + rows.length * rh}" rx="20" fill="${W}"/>
      <rect x="0" y="0" width="560" height="44" rx="20" fill="${G.ink}" opacity="0.04"/>
      <rect x="0" y="30" width="560" height="14" fill="${G.ink}" opacity="0.04"/>
      ${mono(24, 28, 'FRIEND', { size: 9.5, op: 0.4 })}
      ${mono(230, 28, 'STATUS', { size: 9.5, op: 0.4 })}
      ${mono(390, 28, 'YOUR CREDIT', { size: 9.5, op: 0.4 })}
      ${mono(536, 28, 'DATE', { size: 9.5, op: 0.4, anchor: 'end' })}
      <line x1="0" y1="44" x2="560" y2="44" stroke="${G.line}" stroke-width="1.5"/>
      ${rows.map((r, i) => {
      const y = 44 + i * rh;
      const pend = r[1] === 'Pending';
      return `
        <g data-lrow="${i}" opacity="0" transform="translate(0 ${y})">
          <rect x="1" y="1" width="558" height="${rh - 2}" rx="8" fill="${G.orange}" opacity="0" data-lglow="${i}"/>
          <text x="24" y="${rh / 2 + 5}" font-size="14.5" font-weight="700" fill="${G.ink}">${r[0]}</text>
          <g transform="translate(230 ${rh / 2})">
            <rect x="0" y="-12" width="${pend ? 78 : 68}" height="24" rx="12"
              fill="${pend ? '#FEF3C7' : MINT}"/>
            <text x="${pend ? 39 : 34}" y="5" text-anchor="middle" font-size="10.5" font-weight="700"
              fill="${pend ? '#92400E' : MINT_T}"
              style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${r[1].toUpperCase()}</text>
          </g>
          <text x="390" y="${rh / 2 + 5}" font-size="15" font-weight="700" fill="${pend ? G.gray : G.deep}"
            style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${r[2]}</text>
          <text x="536" y="${rh / 2 + 5}" text-anchor="end" font-size="12.5" font-weight="600" fill="${G.ink}" opacity="0.45"
            style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${r[3]}</text>
          ${i < rows.length - 1 ? `<line x1="24" y1="${rh}" x2="536" y2="${rh}" stroke="${G.line}" stroke-width="1.2"/>` : ''}
        </g>`;
    }).join('')}
    </g>
    <g transform="translate(40 ${60 + 44 + rows.length * rh + 22})">
      <rect x="0" y="0" width="212" height="52" rx="16" fill="${G.ink}"/>
      ${mono(20, 22, 'EARNED SO FAR', { size: 9, fill: W, op: 0.45 })}
      <text x="20" y="43" font-size="20" font-weight="700" fill="${W}"
        style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><tspan data-role="tot">US$0</tspan></text>
    </g>
    ${mono(272, 400, 'THEY EACH SAVED US$5 TOO', { size: 10, fill: W, op: 0.5 })}
    ${mono(272, 420, 'NO CAP ON HOW MANY FRIENDS', { size: 10, fill: W, op: 0.5 })}`;

    return {
      svg: gWrap(inner),
      pills: pillsR('Reads like a statement'),
      init(root) {
        const rowsEl = [...root.querySelectorAll('[data-lrow]')];
        const tot = root.querySelector('[data-role="tot"]');
        if (!rowsEl.length) return null;
        let n = 0;
        const tick = () => {
          n = n % (rowsEl.length + 1);
          rowsEl.forEach((r, i) => {
            r.setAttribute('opacity', i < n ? '1' : '0');
            const g = r.querySelector('[data-lglow]');
            if (g) g.setAttribute('opacity', i === n - 1 ? '0.10' : '0');
          });
          const paid = Math.min(n, rowsEl.length - 1);
          if (tot) tot.textContent = `US$${paid * 5}`;
          n++;
        };
        tick();
        const id = setInterval(tick, 1500);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══ REFERRAL · 6–9 ═════════════════════════════════════════════════ */

export const refStack = {
  id: 'ref-stack',
  name: 'It Stacks',
  family: 'Accumulation',
  tagline: 'Five friends, and the next trip is free',
  desc:
    'The offer as told is a single five dollars, which is not a reason to do anything. Here the ' +
    'credits stack: five friends join over a month and the balance climbs to twenty-five, which is ' +
    'named as a plan rather than a number. The point of a referral scheme is the fifth one, and ' +
    'nothing currently shows it.',
  pros: [
    'Gives a reason to refer more than once, which is the whole point',
    'Naming the reward as a free plan is stronger than a dollar figure',
    'Accumulation is inherently satisfying to watch',
  ],
  cons: ['Implies a stacking policy that must actually be uncapped', 'Slightly busier than the current panel'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const friends = ['AM', 'JL', 'SK', 'TR', 'NB'];
    const inner = `
    ${wdots(uid)}
    ${label(320, 72, 'It stacks', { size: 22, fill: W, anchor: 'middle' })}
    ${mono(320, 96, 'FIVE FRIENDS, ONE MONTH', { size: 9.5, anchor: 'middle', op: 0.6, fill: W })}
    ${avatar(320, 154, 30, { fill: G.orange, text: 'YOU', size: 13 })}
    ${friends.map((f, i) => {
      const a = (-90 + (i - 2) * 34) * Math.PI / 180;
      const x = 320 + Math.cos(a) * 128, y = 262 + Math.sin(a) * 40;
      const on = 0.08 + i * 0.1;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <line x1="320" y1="188" x2="${x.toFixed(0)}" y2="${(y - 22).toFixed(0)}" stroke="${W}" stroke-width="2" opacity="0.5"/>
        ${avatar(x.toFixed(0), y.toFixed(0), 22, { fill: G.ink, text: f, size: 11 })}
        ${creditBadge(x.toFixed(0), (y + 42).toFixed(0), '+US$5')}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <rect x="160" y="366" width="320" height="64" rx="16" fill="${W}"/>
      ${mono(184, 392, 'YOUR BALANCE', { size: 9, op: 0.45, fill: G.ink })}
      <text x="184" y="418" font-size="24" font-weight="800" fill="${G.deep}">US$25</text>
      ${mono(456, 412, 'A FREE WEEK ABROAD', { size: 9, anchor: 'end', op: 0.5, fill: G.ink })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsR('Uncapped') };
  },
};

export const refBothWays = {
  id: 'ref-bothways',
  name: 'Both Sides, Named',
  family: 'Clarity',
  tagline: 'Who gets what, and exactly when',
  desc:
    'Referral offers fail on suspicion — people assume the credit never arrives. This states the ' +
    'terms plainly as a two-column receipt: you get five dollars when they activate, they get five ' +
    'dollars off their first plan, neither expires, and there is no minimum spend. Removing the ' +
    'small print is the conversion lever.',
  pros: [
    'Answers the distrust that kills most referral programmes',
    'No expiry and no minimum are genuinely persuasive terms',
    'Doubles as the terms panel, so it earns its space twice',
  ],
  cons: ['Reads as legal copy rather than an animation', 'Every line commits us to a policy'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 10;
    const rows = [
      ['You get', 'US$5 credit', 'When they activate'],
      ['They get', 'US$5 off', 'On their first plan'],
      ['Expires', 'Never', 'Credit stays on the account'],
      ['Minimum spend', 'None', 'Use it on any plan'],
    ];
    const inner = `
    ${wdots(uid)}
    ${label(320, 76, 'The whole of the small print', { size: 21, fill: W, anchor: 'middle' })}
    ${rows.map(([k, v, note], i) => {
      const y = 112 + i * 76;
      const on = 0.06 + i * 0.16;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.06).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <rect x="96" y="${y}" width="448" height="62" rx="14" fill="${W}"/>
        ${mono(124, y + 26, k.toUpperCase(), { size: 9, op: 0.42, fill: G.ink })}
        ${label(124, y + 48, v, { size: 17, fill: G.deep })}
        ${mono(516, y + 38, note, { size: 9.5, anchor: 'end', op: 0.45, fill: G.ink })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.76;0.84;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(320, 430, 'THAT IS ALL OF IT. THERE IS NO PAGE TWO.', { size: 10, anchor: 'middle', op: 0.7, fill: W })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsR('No small print') };
  },
};

export const refArrives = {
  id: 'ref-arrives',
  name: 'It Arrives',
  family: 'Trust',
  tagline: 'The credit landing, with a timestamp',
  desc:
    'The gap between referring and being paid is where trust dies. This closes it: a friend activates ' +
    'at 14:22:08 and the credit appears on the balance at 14:22:11, three seconds later, with the ' +
    'line written into the account history. Instant and visible beats generous and vague.',
  pros: [
    'Speed of payout is the single biggest driver of repeat referrals',
    'An account-history line is more convincing than a badge',
    'Three seconds is a claim we can hold ourselves to',
  ],
  cons: ['Payout must genuinely be this fast', 'Less warm than the people-based treatments'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const inner = `
    ${wdots(uid)}
    ${label(320, 72, 'Paid in three seconds', { size: 21, fill: W, anchor: 'middle' })}
    <rect x="96" y="104" width="448" height="72" rx="16" fill="${W}" opacity="0.18"/>
    ${mono(124, 132, 'YOUR FRIEND ACTIVATED', { size: 9, op: 0.75, fill: W })}
    ${label(124, 158, 'Ana M. \u00b7 Lisbon \u00b7 7-day Europe plan', { size: 14, fill: W })}
    ${mono(516, 148, '14:22:08', { size: 10, anchor: 'end', op: 0.7, fill: W })}

    <line x1="320" y1="182" x2="320" y2="216" stroke="${W}" stroke-width="2.5" opacity="0.5"
      stroke-dasharray="34" stroke-dashoffset="34">
      <animate attributeName="stroke-dashoffset" values="34;0;0" keyTimes="0;0.32;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </line>

    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.34;0.42;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <rect x="96" y="222" width="448" height="88" rx="16" fill="${W}"/>
      ${mono(124, 252, 'ACCOUNT HISTORY', { size: 9, op: 0.42, fill: G.ink })}
      ${label(124, 282, 'Referral credit \u2014 Ana M.', { size: 15, fill: G.ink })}
      ${mono(124, 300, 'POSTED 14:22:11 \u00b7 3 s AFTER ACTIVATION', { size: 8.5, op: 0.4, fill: G.ink })}
      ${creditBadge(492, 272, '+US$5')}
    </g>

    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.56;0.64;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${chip(232, 348, 'They saved US$5 too', 208)}
      ${mono(320, 412, 'NO REVIEW PERIOD \u00b7 NO PENDING STATE \u00b7 NO CHASING', { size: 9.5, anchor: 'middle', op: 0.7, fill: W })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsR('Paid in seconds') };
  },
};

export const refShare = {
  id: 'ref-share',
  name: 'One Tap to Send',
  family: 'Mechanic',
  tagline: 'The code, copied and sent',
  desc:
    'The reason people do not refer is friction, not motivation. This shows the whole act: the code ' +
    'is copied with one tap, sent in a message, and the link previews with the offer already visible ' +
    'to the person receiving it. Showing how little work it is does more than raising the reward.',
  pros: [
    'Reduces perceived effort, which is the real barrier',
    'The link preview shows the offer doing its own selling',
    'Maps exactly onto the form sitting next to the panel',
  ],
  cons: ['Depends on the sharing flow being this smooth in the app', 'Message mock-ups can look dated quickly'],
  scores: { story: 4, motion: 5, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const inner = `
    ${wdots(uid)}
    ${label(320, 72, 'One tap, then it sells itself', { size: 21, fill: W, anchor: 'middle' })}
    <rect x="128" y="104" width="384" height="62" rx="14" fill="${W}"/>
    ${mono(156, 142, 'OPENLINE5', { size: 19, op: 1, fill: G.ink, ls: 2 })}
    <g>
      <rect x="392" y="118" width="96" height="34" rx="10" fill="${G.orange}"/>
      ${mono(440, 140, 'COPY', { size: 10, anchor: 'middle', op: 1, fill: W })}
      <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.16;0.2;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.2;0.24;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <rect x="392" y="118" width="96" height="34" rx="10" fill="${G.ink}"/>
      ${mono(440, 140, 'COPIED', { size: 10, anchor: 'middle', op: 1, fill: W })}
    </g>

    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.34;0.42;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <rect x="128" y="192" width="300" height="52" rx="16" fill="${W}" opacity="0.2"/>
      ${label(152, 224, 'Use OPENLINE5 \u2014 we both get $5', { size: 13, fill: W })}
      ${mono(512, 224, 'SENT', { size: 9, anchor: 'end', op: 0.6, fill: W })}
    </g>

    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.52;0.6;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <rect x="128" y="264" width="384" height="126" rx="16" fill="${W}"/>
      <rect x="128" y="264" width="384" height="52" rx="16" fill="${G.wash}"/>
      ${mono(156, 296, 'OPENLINE.COM', { size: 9, op: 0.5, fill: G.ink })}
      ${label(156, 342, 'US$5 off your first plan', { size: 17, fill: G.ink })}
      ${mono(156, 366, 'DATA IN 190+ COUNTRIES \u00b7 NO CONTRACT', { size: 8.5, op: 0.42, fill: G.ink })}
      ${creditBadge(468, 340, '\u2212US$5')}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.7;0.78;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(320, 430, 'TWO TAPS FROM CODE TO SENT', { size: 10, anchor: 'middle', op: 0.7, fill: W })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsR('Two taps') };
  },
};

/* ── registry ── */

export const refWhyItWorks = {
  id: 'ref-whyworks',
  name: 'Why It Is Worth Five Dollars',
  family: 'Rationale',
  tagline: 'The maths that makes the offer sustainable',
  desc:
    'Referral offers read as gimmicks until the maths is shown. A paid acquisition costs eighteen ' +
    'dollars and a referred customer costs ten, so paying both sides is cheaper than an advert and ' +
    'the referred customer stays longer. Publishing the reasoning makes the offer feel durable rather ' +
    'than a promotion about to expire.',
  pros: [
    'Signals the offer is structural, not a limited-time trick',
    'Referred-customer retention is a genuinely interesting fact to share',
    'Unusual honesty, which fits the brand voice elsewhere on the site',
  ],
  cons: ['Discloses acquisition costs', 'Analytical register for a warm orange panel'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const rows = [
      ['A customer from an advert', 'US$18', 'and they leave sooner'],
      ['A customer from a friend', 'US$10', 'US$5 to each of you'],
      ['How much longer they stay', '2.4\u00d7', 'measured over a year'],
    ];
    const inner = `
    ${wdots(uid)}
    ${label(320, 80, 'Why we can afford it', { size: 22, fill: W, anchor: 'middle' })}
    ${mono(320, 106, 'THE WHOLE REASONING', { size: 9.5, anchor: 'middle', op: 0.55, fill: W })}
    ${rows.map(([nm, v, note], i) => {
      const y = 138 + i * 92;
      const on = 0.08 + i * 0.2;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.07).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <rect x="96" y="${y}" width="448" height="76" rx="15" fill="${W}"/>
        ${label(124, y + 34, nm, { size: 14, fill: G.ink })}
        ${mono(124, y + 56, note.toUpperCase(), { size: 8.5, op: 0.42, fill: G.ink })}
        <text x="516" y="${y + 48}" font-size="26" font-weight="800" text-anchor="end" fill="${G.deep}">${v}</text>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.76;0.84;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(320, 428, 'SO IT IS NOT A PROMOTION. IT IS JUST CHEAPER THAN ADVERTISING.', { size: 9.5, anchor: 'middle', op: 0.7, fill: W })}
    </g>`;
    return { svg: gWrap(inner), pills: pillsR('Cheaper than ads') };
  },
};

/* ── registry ── */
export const REFERRAL_VARIANTS = [refCurrent, chain, splitCoin, linkFlight, wallets, ledger, refStack, refBothWays, refArrives, refShare, refWhyItWorks];
