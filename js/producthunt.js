/* ─────────────────────────────────────────────────────────────────────────
   /producthunt — the claim block, and the modal it should open.

   Measured on the live page at 1440px:
     claim block inner   768 × 360   (max-w-3xl, rounded-3xl, 2px border)
     modal               560 × 620   (net-new: there is no modal today)

   The live block is static: a gift icon, a heading, a paragraph and an orange
   button whose only behaviour is to scroll. Option 0 on each board is the
   honest baseline — including, on the modal board, the fact that nothing
   opens at all.

   Brand values read off the live page, not guessed:
     orange   #FF5314      button fill, icon tile
     tint     rgba(255,83,20,0.04) block ground, 0.2 alpha border
     radius   24px block, 8px button
   ───────────────────────────────────────────────────────────────────────── */

const SA = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
const MO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

const P = {
  or: '#FF5314',
  orDark: '#E23D00',
  orTint: '#FFF3EE',
  orLine: '#FFD2C0',
  ink: '#101418',
  dim: '#5F6B77',
  faint: '#98A3AE',
  line: '#E6E9ED',
  white: '#FFFFFF',
  ground: '#FFFFFF',
  green: '#12855C',
  greenSoft: '#E6F5EE',
};

const CW = 768, CH = 360;
const MW = 560, MH = 620;

const T = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${o.m ? MO : SA}" font-size="${o.size || 14}"` +
  ` font-weight="${o.w || 400}" fill="${o.fill || P.ink}" text-anchor="${o.a || 'start'}"` +
  `${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${s}</text>`;

const L = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${MO}" font-size="${o.size || 9.5}" font-weight="600"` +
  ` letter-spacing="${o.ls || 1.3}" fill="${o.fill || P.faint}" text-anchor="${o.a || 'start'}">${s}</text>`;

const R = (x, y, w, h, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r == null ? 12 : o.r}"` +
  ` fill="${o.fill || P.white}"${o.stroke === null ? '' : ` stroke="${o.stroke || P.line}" stroke-width="${o.sw || 1}"`}` +
  `${o.op ? ` opacity="${o.op}"` : ''}/>`;


/* Typing, done as progressive substrings rather than absolutely-positioned
   characters — per-char placement assumes a font advance that no real mono
   font matches exactly, and the result reads as "x. com/paul f l eur y". */
const typeIn = (x, y, text, o = {}) => {
  const dur = o.dur || 9, from = o.from == null ? 0.04 : o.from, to = o.to == null ? 0.3 : o.to;
  const chunk = o.chunk || 2, e = 0.003;
  const frames = [];
  for (let n = chunk; n <= text.length; n += chunk) frames.push(text.slice(0, Math.min(n, text.length)));
  if (frames[frames.length - 1] !== text) frames.push(text);
  const span = (to - from) / frames.length;
  return frames.map((f, i) => {
    const on = from + i * span, off = i === frames.length - 1 ? 1 : from + (i + 1) * span;
    return `<g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0;0"
      keyTimes="0;${on.toFixed(4)};${(on + e).toFixed(4)};${Math.min(off, 0.996).toFixed(4)};${Math.min(off + e, 0.999).toFixed(4)};1"
      dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>${T(x, y, f.replace(/&/g, '&amp;'), { m: true, size: o.size || 13.5, w: o.w || 400, fill: o.fill || P.ink })}</g>`;
  }).join('');
};

/* the orange CTA every option has to carry, drawn once */
const cta = (x, y, w, label, o = {}) => `
  <g>
    ${R(x, y, w, o.h || 46, { fill: o.fill || P.or, stroke: null, r: 9 })}
    ${T(x + w / 2, y + (o.h || 46) / 2 + 5.5, label, { a: 'middle', size: o.size || 15, w: 700, fill: P.white })}
    ${o.still ? '' : `<rect x="${x}" y="${y}" width="${w}" height="${o.h || 46}" rx="9" fill="${P.white}" opacity="0">
      <animate attributeName="opacity" values="0;0.16;0" keyTimes="0;0.5;1" dur="2.6s" repeatCount="indefinite"/>
    </rect>`}
  </g>`;

/* Reveal once and hold.

   Every schedule is compressed into the first 45% of the loop. Order and
   relative spacing are preserved, but the assembled composition then holds for
   more than half of every cycle — which matters because a reader glancing at a
   grid of eleven tiles should land on the finished state, not on a half-built
   one or an empty card. */
const REVEAL_WINDOW = 0.45;
const at = (t, dur) => {
  const k = Math.min(t, 0.9) * REVEAL_WINDOW / 0.9;
  return `<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${k.toFixed(4)};` +
    `${Math.min(k + 0.035, 0.998).toFixed(4)};1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>`;
};

/* a value that steps through a list on one clock, no interpolation */
const step = (vals, dur, render) => {
  const n = vals.length, e = 0.004;
  return vals.map((v, i) => {
    const on = i / n + (i === 0 ? 0 : 0), off = (i + 1) / n;
    const k = [0, Math.max(on, e), Math.max(on, e) + e, off, Math.min(off + e, 1), 1];
    return `<g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0;0"
      keyTimes="${k.map((x) => x.toFixed(4)).join(';')}" dur="${dur}s"
      repeatCount="indefinite" calcMode="discrete"/>${render(v, i)}</g>`;
  }).join('');
};

const wrapC = (inner, aria) =>
  `<svg viewBox="0 0 ${CW} ${CH}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}">
    <rect width="${CW}" height="${CH}" fill="${P.ground}"/>${inner}</svg>`;

const wrapM = (inner, aria) =>
  `<svg viewBox="0 0 ${MW} ${MH}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}">
    <rect width="${MW}" height="${MH}" fill="#F1F3F6"/>${inner}</svg>`;

/* the live block's outer shell, reused by the options that keep it */
const shell = (o = {}) =>
  R(2, 2, CW - 4, CH - 4, { fill: o.fill || P.orTint, stroke: o.stroke || P.orLine, sw: 2, r: 24 });

const giftIcon = (x, y, s = 1, col = P.white) => `
  <g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${col}"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="-9" y="-4" width="18" height="4" rx="1"/>
    <path d="M0 -4 v13"/><path d="M7 0 v7 a2 2 0 0 1 -2 2 H-5 a2 2 0 0 1 -2 -2 v-7"/>
    <path d="M-4.5 -4 a2.5 2.5 0 0 1 0 -5 A4.8 8 0 0 1 0 -4 a4.8 8 0 0 1 4.5 -5 a2.5 2.5 0 0 1 0 5"/>
  </g>`;

/* ══ 0 · the block as it ships ═════════════════════════════════════════ */
export const phCurrent = {
  id: 'ph-current',
  name: 'Live Now',
  family: 'A · baseline',
  tagline: 'Gift icon, heading, paragraph, button',
  desc:
    'The block exactly as it ships: a centred gift tile, "Did something? Come and get paid.", one ' +
    'line of explanation and an orange button. Nothing moves, and the button only scrolls the page ' +
    '— there is no form behind it. Reproduced faithfully so every proposal is judged against what ' +
    'a visitor actually sees today.',
  pros: ['Short and unambiguous', 'Consistent with the rest of the page'],
  cons: [
    'The heading is the fourth call to claim on one page, with no new information',
    'Nothing shows what the reward actually is',
    'The button leads nowhere — it scrolls',
    'Static, at the exact point the page is asking for an action',
  ],
  scores: { story: 2, motion: 1, perf: 5, mobile: 4, brand: 3, ease: 5 },
  build: () => ({
    pills: [],
    svg: wrapC(`
      ${shell()}
      ${R(CW / 2 - 28, 46, 56, 56, { fill: P.or, stroke: null, r: 16 })}
      ${giftIcon(CW / 2, 74, 1.15)}
      ${T(CW / 2, 143, 'Did something? Come and get paid.', { a: 'middle', size: 27, w: 700 })}
      ${T(CW / 2, 177, 'Comment, review, upvote or post — send us the link and we will set your', { a: 'middle', size: 14.5, fill: P.dim })}
      ${T(CW / 2, 199, 'discount. Between 10% and 100% off, worth up to $1,000.', { a: 'middle', size: 14.5, fill: P.dim })}
      ${cta(CW / 2 - 104, 226, 208, 'Claim your reward', { still: true })}
      ${T(CW / 2, 300, 'Takes a minute. We read every one.', { a: 'middle', size: 13, fill: P.faint })}`,
      'The claim block as it currently ships, static')
  }),
};

/* ══ 1 · paste the link ════════════════════════════════════════════════ */
export const pasteTheLink = {
  id: 'ph-paste',
  name: 'Paste the Link',
  family: 'B · the mechanic',
  tagline: 'The whole claim, performed in eight seconds',
  desc:
    'The only option that shows the thing a visitor is actually being asked to do. A URL types ' +
    'itself into a field, the platform is recognised from the domain, and a guaranteed floor stamps ' +
    'in beside it before the button is even pressed. It answers "what will this cost me" — one ' +
    'paste — and "what do I get" — at least 10%, in the same breath. Rewording: the heading stops ' +
    'asking and starts instructing.',
  pros: [
    'Demonstrates that claiming is one paste, which is the real objection',
    'Shows the floor before the click, so the CTA is not a leap of faith',
    'Reads identically on mobile once the field stacks',
  ],
  cons: ['Needs the platform-detection to actually exist', 'Commits the page to a link-first flow'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: () => {
    const dur = 9;
    const url = 'x.com/paulfleury/status/18429…';
    const fx = 64, fy = 150, fw = 440;
    return {
      pills: [],
      svg: wrapC(`
        ${shell({ fill: P.white, stroke: P.line })}
        ${T(64, 74, 'Send us the link. We set the discount.', { size: 26, w: 700 })}
        ${T(64, 106, 'Upvote, comment, review, or a post anywhere — one link is the whole claim.', { size: 14.5, fill: P.dim })}

        ${R(fx, fy, fw, 52, { r: 10, stroke: P.line })}
        ${L(fx + 18, fy - 12, 'YOUR LINK')}
        ${typeIn(fx + 20, fy + 33, url, { dur, from: 0.04, to: 0.26, chunk: 2 })}
        <rect x="${fx + 20}" y="${fy + 20}" width="1.6" height="18" fill="${P.or}" opacity="0">
          <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.26;0.29;1"
            dur="${dur}s" repeatCount="indefinite"/>
        </rect>

        <!-- recognised from the domain, not asked for in a dropdown -->
        <g opacity="0">${at(0.28, dur)}
          ${R(fx + fw + 16, fy + 8, 132, 36, { fill: P.greenSoft, stroke: null, r: 18 })}
          <path d="M ${fx + fw + 34} ${fy + 26} l 4.5 4.5 l 8 -9" fill="none" stroke="${P.green}"
            stroke-width="2.2" stroke-linecap="round"/>
          ${T(fx + fw + 54, fy + 31, 'X post found', { size: 12.5, w: 600, fill: P.green })}
        </g>

        <g opacity="0">${at(0.38, dur)}
          ${R(64, 226, 440, 62, { fill: P.orTint, stroke: P.orLine, r: 12 })}
          ${L(84, 250, 'GUARANTEED, BEFORE WE EVEN READ IT')}
          ${T(84, 275, '10% off — and up to 100% once a human reads the post', { size: 14, w: 600 })}
        </g>

        <g opacity="0">${at(0.50, dur)}
          ${cta(536, 226, 168, 'Claim it', { h: 62, size: 16 })}
        </g>
        ${T(64, 322, 'One reward per person. Reviewed and sent after launch day.', { size: 12.5, fill: P.faint })}`,
        'A link typing itself into a field, being recognised, and a guaranteed discount appearing')
    };
  },
};

/* ══ 2 · the scale ═════════════════════════════════════════════════════ */
export const theScale = {
  id: 'ph-scale',
  name: 'The Scale',
  family: 'C · what you get',
  tagline: '10 to 100, and where the floor sits',
  desc:
    'A single horizontal scale from 10% to 100%, with a marker that sweeps up and settles — and, ' +
    'crucially, a shaded floor showing that nobody lands below 10%. The page already claims a ' +
    'range twice in words; this is the first time the range is legible at a glance, and the first ' +
    'time the guarantee is visible rather than asserted.',
  pros: [
    'Makes the range concrete without a table',
    'The shaded floor answers "could I get nothing?" — which the copy never does',
    'Cheap to run and trivially responsive',
  ],
  cons: ['A sweeping marker can read as a lottery, which is the opposite of the message', 'Abstract next to a real link'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: () => {
    const dur = 10;
    const x0 = 96, x1 = CW - 96, y = 196;
    const px = (p) => x0 + ((p - 10) / 90) * (x1 - x0);
    const stops = [10, 25, 50, 75, 100];
    const marks = [10, 10, 35, 50, 50, 80, 100, 100];
    return {
      pills: [],
      svg: wrapC(`
        ${shell({ fill: P.white, stroke: P.line })}
        ${T(CW / 2, 76, 'Everyone lands somewhere on this scale.', { a: 'middle', size: 26, w: 700 })}
        ${T(CW / 2, 108, 'Nobody lands below the floor, and the ceiling is a free year.', { a: 'middle', size: 14.5, fill: P.dim })}

        ${R(x0, y - 7, x1 - x0, 14, { fill: '#F1F3F6', stroke: null, r: 7 })}
        ${R(x0, y - 7, px(100) - x0, 14, { fill: P.or, stroke: null, r: 7, op: 0.18 })}
        ${R(x0, y - 7, 34, 14, { fill: P.green, stroke: null, r: 7, op: 0.3 })}
        ${stops.map((s) => `
          <line x1="${px(s)}" y1="${y + 12}" x2="${px(s)}" y2="${y + 19}" stroke="${P.line}" stroke-width="1.6"/>
          ${T(px(s), y + 38, `${s}%`, { a: 'middle', size: 12.5, w: 600, m: true, fill: P.dim })}`).join('')}
        ${L(x0, y - 22, 'THE FLOOR', { fill: P.green })}
        ${L(x1, y - 22, 'THE CEILING — A FREE YEAR, UP TO $1,000', { a: 'end', fill: P.or })}

        <polygon points="0,-9 7,0 0,9 -7,0" fill="${P.or}" transform="translate(${px(10)} ${y})">
          <animateTransform attributeName="transform" type="translate"
            values="${marks.map((m) => `${px(m).toFixed(1)} ${y}`).join(';')};${px(100).toFixed(1)} ${y}"
            keyTimes="0;0.1;0.22;0.34;0.46;0.6;0.74;0.88;1" dur="${dur}s" repeatCount="indefinite"
            calcMode="spline" keySplines="${Array(8).fill('0.4 0 0.2 1').join(';')}"/>
        </polygon>

        ${cta(CW / 2 - 116, 268, 232, 'Find out where you land')}`,
        'A scale from ten to one hundred per cent with a marker moving along it')
    };
  },
};

/* ══ 3 · the receipt ═══════════════════════════════════════════════════ */
export const theReceipt = {
  id: 'ph-receipt',
  name: 'The Receipt',
  family: 'C · what you get',
  tagline: 'What the discount is actually worth',
  desc:
    'A receipt printing line by line: the plan a visitor was going to buy, the discount their ' +
    'action earned, and the amount they are not paying. It converts a percentage — which nobody ' +
    'feels — into money, which everybody does. The rewording follows: the heading names the sum, ' +
    'not the gesture.',
  pros: [
    'Turns an abstract percentage into an amount, which is what actually persuades',
    'Uses real Openline plan pricing, so it is checkable',
    'The printing motion carries its own sense of completion',
  ],
  cons: ['Anchoring on one plan may undersell the ceiling', 'Receipt metaphor is well-worn'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: () => {
    const dur = 11;
    const rows = [
      ['Openline Unlimited, 12 months', '$1,000.00', P.ink],
      ['Your Product Hunt post', '—', P.dim],
      ['Discount applied', '−100%', P.or],
    ];
    return {
      pills: [],
      svg: wrapC(`
        ${shell({ fill: P.white, stroke: P.line })}
        ${T(64, 74, 'What it is worth, in money.', { size: 26, w: 700 })}
        ${T(64, 106, 'A percentage is hard to feel. Here is the same thing as an amount.', { size: 14.5, fill: P.dim })}

        ${R(64, 132, 400, 150, { r: 12, stroke: P.line })}
        ${L(88, 158, 'CLAIM PREVIEW')}
        <line x1="88" y1="172" x2="440" y2="172" stroke="${P.line}"/>
        ${rows.map(([lbl, amt, col], i) => `
          <g opacity="0">${at(0.14 + i * 0.16, dur)}
            ${T(88, 198 + i * 28, lbl, { size: 13.5, fill: i === 2 ? P.ink : P.dim, w: i === 2 ? 600 : 400 })}
            ${T(440, 198 + i * 28, amt, { a: 'end', size: 13.5, w: 600, m: true, fill: col })}
          </g>`).join('')}
        <g opacity="0">${at(0.62, dur)}
          <line x1="88" y1="266" x2="440" y2="266" stroke="${P.ink}" stroke-width="1.4"/>
        </g>

        <g opacity="0">${at(0.70, dur)}
          ${R(496, 132, 208, 150, { fill: P.orTint, stroke: P.orLine, r: 12 })}
          ${L(520, 160, 'YOU PAY')}
          ${T(520, 206, '$0', { size: 42, w: 700, m: true, fill: P.or })}
          ${T(520, 234, 'for a full year', { size: 13.5, fill: P.dim })}
          ${T(520, 266, 'Floor is 10% — $100 off', { size: 12.5, fill: P.faint })}
        </g>
        <g opacity="0">${at(0.80, dur)}
          ${cta(64, 298, 232, 'Claim yours')}
          ${T(320, 327, 'One reward per person. We read every one.', { size: 12.5, fill: P.faint })}
        </g>`,
        'A claim receipt printing line by line and resolving to zero')
    };
  },
};

export const CLAIM_BOX = { w: CW, h: CH };
export const MODAL_BOX = { w: MW, h: MH };
export { P as PH_TONES, T as phT, L as phL, R as phR, cta as phCta, at as phAt, step as phStep,
  wrapC as phWrapC, wrapM as phWrapM, shell as phShell, giftIcon as phGift, CW as PH_CW, CH as PH_CH,
  MW as PH_MW, MH as PH_MH, SA as PH_SA, MO as PH_MO };

/* ══ 4 · three doors ═══════════════════════════════════════════════════ */
export const threeDoors = {
  id: 'ph-doors',
  name: 'Three Ways In',
  family: 'D · the routes',
  tagline: 'Each one flips to show its floor',
  desc:
    'Three cards — upvote, comment, post — turning over one at a time to reveal the minimum each ' +
    'one earns. It restates the section above it, which is a cost; what it buys is that the floor ' +
    'is attached to each specific action rather than stated once for all of them. Reword the ' +
    'heading to name the cheapest route, because that is the one that converts.',
  pros: ['The floor is attached to the action, not to a footnote', 'Reads instantly without motion'],
  cons: ['Duplicates the "Two ways in" section directly above it', 'Three cards is a crowded 360px'],
  scores: { story: 3, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: () => {
    const dur = 9;
    const doors = [
      ['Upvote', '30 seconds', '10% off', 'Guaranteed', P.green],
      ['Comment or review', 'Two minutes', '10–25% off', 'Guaranteed', P.green],
      ['Post anywhere', 'As long as you like', 'Up to 100% off', 'Judged, worth up to $1,000', P.or],
    ];
    return {
      pills: [],
      svg: wrapC(`
        ${shell({ fill: P.white, stroke: P.line })}
        ${T(CW / 2, 68, 'Thirty seconds is enough to earn something.', { a: 'middle', size: 25, w: 700 })}
        ${T(CW / 2, 98, 'The longer routes pay more, but none of them pay nothing.', { a: 'middle', size: 14, fill: P.dim })}
        ${doors.map(([nm, time, amt, note, col], i) => {
          const x = 48 + i * 232;
          return `<g opacity="0">${at(0.08 + i * 0.16, dur)}
            ${R(x, 124, 208, 130, { r: 14, stroke: i === 2 ? P.orLine : P.line, sw: i === 2 ? 2 : 1, fill: i === 2 ? P.orTint : P.white })}
            ${L(x + 20, 152, `ROUTE ${i + 1}`)}
            ${T(x + 20, 178, nm, { size: 15, w: 700 })}
            ${T(x + 20, 199, time, { size: 12.5, fill: P.faint })}
            ${T(x + 20, 228, amt, { size: 19, w: 700, m: true, fill: col })}
            ${T(x + 20, 245, note, { size: 11.5, fill: P.dim })}
          </g>`;
        }).join('')}
        <g opacity="0">${at(0.62, dur)}
          ${cta(CW / 2 - 116, 276, 232, 'Claim your discount')}
        </g>`,
        'Three routes to a discount, each showing the minimum it earns')
    };
  },
};

/* ══ 5 · already sent ══════════════════════════════════════════════════ */
export const alreadySent = {
  id: 'ph-sent',
  name: 'Already Sent',
  family: 'E · proof',
  tagline: 'Rewards going out while you read',
  desc:
    'A live-feeling ledger of discounts already issued — first name, country, the action, the ' +
    'percentage — with a running total ticking up. The page asks for a favour four times and never ' +
    'once shows that anyone has been paid. This is the only option that addresses the suspicion ' +
    'rather than the offer, and it needs real rows the day it ships.',
  pros: [
    'Answers the unspoken objection: does this actually pay out?',
    'The total climbing is the most persuasive number on the page',
    'Gets stronger every day after launch',
  ],
  cons: [
    'Empty and embarrassing before the first claims land',
    'Needs real data or it is a lie',
  ],
  scores: { story: 5, motion: 4, perf: 4, mobile: 4, brand: 4, ease: 2 },
  build: () => {
    const dur = 12;
    const feed = [
      ['Marta', 'Portugal', 'Left a review', '25%'],
      ['Sam', 'United Kingdom', 'Posted on X', '60%'],
      ['Yuki', 'Japan', 'Upvoted', '10%'],
      ['Ines', 'Brazil', 'Posted on TikTok', '100%'],
      ['Tom', 'Germany', 'Commented', '15%'],
    ];
    const totals = ['$1,240', '$1,890', '$1,990', '$2,990', '$3,140'];
    return {
      pills: [],
      svg: wrapC(`
        ${shell({ fill: P.white, stroke: P.line })}
        ${T(64, 66, 'We have already paid these out.', { size: 25, w: 700 })}
        ${T(64, 94, 'Every claim below was sent. Yours is next in the same queue.', { size: 14, fill: P.dim })}

        ${feed.map(([nm, ct, act, pc], i) => {
          const y = 118 + i * 42;
          return `<g opacity="0">${at(0.06 + i * 0.16, dur)}
            ${R(64, y, 420, 34, { fill: i % 2 ? '#FAFBFC' : P.white, stroke: null, r: 8 })}
            <circle cx="84" cy="${y + 17}" r="4" fill="${P.green}"/>
            ${T(100, y + 22, `${nm} · ${ct}`, { size: 13, w: 600 })}
            ${T(258, y + 22, act, { size: 12.5, fill: P.dim })}
            ${T(470, y + 22, `${pc} off`, { a: 'end', size: 13, w: 700, m: true, fill: P.or })}
          </g>`;
        }).join('')}

        ${R(512, 118, 192, 118, { fill: P.orTint, stroke: P.orLine, r: 14 })}
        ${L(534, 146, 'SENT SO FAR')}
        ${step(totals, dur, (v) => T(534, 192, v, { size: 34, w: 700, m: true, fill: P.or }))}
        ${T(534, 216, 'across 37 claims', { size: 12.5, fill: P.dim })}
        ${cta(512, 252, 192, 'Claim yours')}
        ${T(64, 340, 'One reward per person. Reviewed and sent after launch day.', { size: 12.5, fill: P.faint })}`,
        'A feed of discounts already sent with a running total')
    };
  },
};

/* ══ 6 · thirty seconds ════════════════════════════════════════════════ */
export const thirtySeconds = {
  id: 'ph-thirty',
  name: 'Thirty Seconds',
  family: 'F · the objection',
  tagline: 'The clock runs while the work finishes',
  desc:
    'A countdown from thirty runs in the corner while the three steps of a claim complete beside ' +
    'it — upvote, copy the link, paste it — and the clock stops with time to spare. The page ' +
    'already promises "takes 30 seconds" in body copy where nobody reads it. Proving it at the ' +
    'point of action is worth more than repeating it.',
  pros: [
    'Attacks effort, which is the real reason people do not claim',
    'The clock stopping early is a satisfying, specific payoff',
    'Very cheap to build',
  ],
  cons: ['Invites a visitor to time you', 'One idea only — no reward information'],
  scores: { story: 4, motion: 5, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: () => {
    const dur = 10;
    const ticks = ['30', '24', '18', '11', '6', '6', '6'];
    const steps = [
      ['Upvote on Product Hunt', 'One tap'],
      ['Copy the link', 'Two taps'],
      ['Paste it here', 'Done'],
    ];
    return {
      pills: [],
      svg: wrapC(`
        ${shell({ fill: P.white, stroke: P.line })}
        ${T(64, 70, 'Six seconds left on the clock.', { size: 26, w: 700 })}
        ${T(64, 100, 'That is a real timing of the shortest route, start to finish.', { size: 14, fill: P.dim })}

        ${steps.map(([nm, note], i) => {
          const y = 130 + i * 52;
          return `<g opacity="0">${at(0.1 + i * 0.2, dur)}
            <circle cx="84" cy="${y + 16}" r="13" fill="${P.greenSoft}"/>
            <path d="M 77 ${y + 16} l 5 5 l 9 -10" fill="none" stroke="${P.green}" stroke-width="2.2" stroke-linecap="round"/>
            ${T(112, y + 21, nm, { size: 15, w: 600 })}
            ${T(400, y + 21, note, { size: 12.5, fill: P.faint })}
          </g>`;
        }).join('')}

        ${R(512, 126, 192, 156, { fill: P.orTint, stroke: P.orLine, r: 14 })}
        ${L(608, 156, 'SECONDS LEFT', { a: 'middle' })}
        ${step(ticks, dur, (v, i) => T(608, 226, v, { a: 'middle', size: 56, w: 700, m: true, fill: i >= 4 ? P.green : P.or }))}
        ${T(608, 258, 'out of thirty', { a: 'middle', size: 12.5, fill: P.dim })}
        ${cta(CW / 2 - 116, 300, 232, 'Start the clock')}`,
        'A countdown from thirty while three claim steps complete')
    };
  },
};

/* ══ 7 · the code ══════════════════════════════════════════════════════ */
export const theCode = {
  id: 'ph-code',
  name: 'The Code',
  family: 'C · what you get',
  tagline: 'The thing you are actually being given',
  desc:
    'A discount code assembling character by character, with its value resolving above it. Every ' +
    'other option describes the reward; this one shows the artefact. It works because a code is ' +
    'the moment a promise becomes a possession — and it lets the heading drop the word "reward", ' +
    'which is doing no work.',
  pros: ['Shows the deliverable, not a description of it', 'Reads as already-yours, which lowers the barrier'],
  cons: ['Implies instant issuance, which conflicts with "reviewed after launch day"', 'A fake code on a live page is risky'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: () => {
    const dur = 9;
    const code = 'PH-LAUNCH-7K2M';
    return {
      pills: [],
      svg: wrapC(`
        ${shell({ fill: P.white, stroke: P.line })}
        ${T(CW / 2, 74, 'Yours looks like this.', { a: 'middle', size: 26, w: 700 })}
        ${T(CW / 2, 104, 'Send the link, and a code lands in your inbox after launch day.', { a: 'middle', size: 14, fill: P.dim })}

        ${R(CW / 2 - 200, 138, 400, 92, { fill: P.orTint, stroke: P.orLine, sw: 2, r: 14 })}
        ${typeIn(CW / 2 - 148, 200, code, { dur, from: 0.06, to: 0.34, chunk: 1, size: 27, w: 700, fill: P.or })}
        ${L(CW / 2, 164, 'YOUR DISCOUNT CODE', { a: 'middle' })}

        <g opacity="0">${at(0.42, dur)}
          ${T(CW / 2, 258, 'Worth between $100 and $1,000, depending on what you posted.', { a: 'middle', size: 14, fill: P.dim })}
        </g>
        <g opacity="0">${at(0.50, dur)}
          ${cta(CW / 2 - 116, 276, 232, 'Get your code')}
        </g>`,
        'A discount code assembling character by character')
    };
  },
};

/* ══ 8 · kitty reads it ════════════════════════════════════════════════ */
export const kittyReads = {
  id: 'ph-kitty',
  name: 'Kitty Reads It',
  family: 'G · brand',
  tagline: 'A human on the other end, with a queue',
  desc:
    'The page introduces a mascot in a hero badge — "Meet Kitty 👋" — and then never uses her ' +
    'again. Here she does the one job the copy assigns to a person: reading every claim. A ' +
    'submitted link moves into a small queue, Kitty stamps it, and a position is shown. It makes ' +
    '"we read every one" credible and gives the launch a face.',
  pros: [
    'Uses a brand asset the page already introduced and then abandons',
    'A visible queue position is more honest than "soon"',
    'Warm where the rest of the block is transactional',
  ],
  cons: ['Depends on a mascot illustration existing', 'Whimsy may undercut a $1,000 claim'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 3 },
  build: () => {
    const dur = 10;
    const queue = ['4th in line', '3rd in line', '2nd in line', 'Next', 'Read — 45% off'];
    return {
      pills: [],
      svg: wrapC(`
        ${shell({ fill: P.white, stroke: P.line })}
        ${T(64, 72, 'Kitty reads every single one.', { size: 26, w: 700 })}
        ${T(64, 102, 'No lottery and no algorithm — a person decides, and tells you where you are.', { size: 14, fill: P.dim })}

        <!-- Kitty, as a placeholder mark until the real asset is dropped in -->
        ${R(64, 132, 150, 150, { fill: P.orTint, stroke: P.orLine, r: 20 })}
        <g transform="translate(139 204)">
          <path d="M -34 6 q 0 -40 34 -40 q 34 0 34 40 q 0 26 -34 26 q -34 0 -34 -26 z" fill="${P.or}" opacity="0.9"/>
          <path d="M -30 -22 l -6 -22 l 20 10 z M 30 -22 l 6 -22 l -20 10 z" fill="${P.or}"/>
          <circle cx="-11" cy="-2" r="3.6" fill="${P.white}"/><circle cx="11" cy="-2" r="3.6" fill="${P.white}"/>
          <path d="M -7 12 q 7 6 14 0" fill="none" stroke="${P.white}" stroke-width="2.2" stroke-linecap="round"/>
        </g>
        ${T(139, 300, 'Kitty', { a: 'middle', size: 13, w: 600, fill: P.dim })}

        ${R(240, 132, 300, 150, { r: 14, stroke: P.line })}
        ${L(264, 160, 'YOUR CLAIM')}
        ${T(264, 186, 'x.com/paulfleury/status/18429…', { size: 12.5, m: true, fill: P.dim })}
        ${step(queue, dur, (v, i) => `
          ${T(264, 228, v, { size: 22, w: 700, fill: i === 4 ? P.green : P.ink })}
          ${T(264, 254, i === 4 ? 'Code sent to your inbox' : 'Usually under two hours', { size: 12.5, fill: P.faint })}`)}

        ${cta(564, 132, 140, 'Send a link', { h: 150, size: 15 })}
        ${T(64, 336, 'One reward per person. Reviewed and sent after launch day.', { size: 12.5, fill: P.faint })}`,
        'A claim moving up a queue while the mascot reads it')
    };
  },
};

/* ══ 9 · the ladder ════════════════════════════════════════════════════ */
export const theLadder = {
  id: 'ph-ladder',
  name: 'The Ladder',
  family: 'C · what you get',
  tagline: 'Effort in on one axis, discount out on the other',
  desc:
    'Four rungs, each naming the effort it takes and the discount it returns, with a marker ' +
    'climbing as an example post gets better. It is the clearest statement of the bargain on the ' +
    'page: the exchange rate between what you do and what you get. The rewording drops the vague ' +
    '"the better the post" for a concrete rung description.',
  pros: [
    'Names the exchange rate instead of gesturing at a range',
    'Each rung is a specific, checkable claim',
    'Sets expectations, which reduces disappointed claims',
  ],
  cons: ['Commits you publicly to a rubric', 'Four rungs is a lot of text in 360px'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 3, brand: 4, ease: 4 },
  build: () => {
    const dur = 11;
    const rungs = [
      ['An upvote', '10% off', P.green],
      ['A comment or a review', '25% off', P.green],
      ['A post that gets read', '50% off', P.or],
      ['A post that gets shared', '100% off, up to $1,000', P.or],
    ];
    return {
      pills: [],
      svg: wrapC(`
        ${shell({ fill: P.white, stroke: P.line })}
        ${T(64, 66, 'The exchange rate, in full.', { size: 25, w: 700 })}
        ${T(64, 94, 'Four rungs. You always know which one you are standing on.', { size: 14, fill: P.dim })}

        ${rungs.slice().reverse().map(([eff, out, col], ri) => {
          const i = 3 - ri, y = 116 + ri * 52;
          return `<g opacity="0">${at(0.08 + ri * 0.13, dur)}
            ${R(64, y, 470, 44, { fill: i === 3 ? P.orTint : P.white, stroke: i === 3 ? P.orLine : P.line, r: 10 })}
            ${T(88, y + 28, eff, { size: 14.5, w: i === 3 ? 700 : 500 })}
            ${T(510, y + 28, out, { a: 'end', size: 14, w: 700, m: true, fill: col })}
          </g>`;
        }).join('')}

        <polygon points="0,0 12,-8 12,8" fill="${P.or}" transform="translate(44 254)">
          <animateTransform attributeName="transform" type="translate"
            values="44 254;44 254;44 202;44 150;44 138;44 138" keyTimes="0;0.16;0.36;0.56;0.74;1"
            dur="${dur}s" repeatCount="indefinite" calcMode="spline"
            keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1"/>
        </polygon>

        ${cta(556, 116, 148, 'Pick a rung', { h: 96, size: 15 })}
        ${T(556, 250, 'No rung pays nothing.', { size: 12.5, fill: P.faint })}
        ${T(64, 336, 'One reward per person. Reviewed and sent after launch day.', { size: 12.5, fill: P.faint })}`,
        'A four-rung ladder of effort against discount with a marker climbing')
    };
  },
};

/* ══ 10 · no judging ═══════════════════════════════════════════════════ */
export const noJudging = {
  id: 'ph-nojudge',
  name: 'Two Lanes',
  family: 'D · the routes',
  tagline: 'The guaranteed lane, and the judged one',
  desc:
    'Two lanes running side by side: the guaranteed lane, where everything that arrives is paid, ' +
    'and the judged lane, where a human sets the number. Claims travel down both and both end in a ' +
    'payout — the guaranteed one instantly, the judged one after a read. It removes the fear that ' +
    'sits under the whole offer, which is the fear of doing the work and being told no.',
  pros: [
    'Separates guaranteed from judged, which the current copy blurs',
    'Both lanes visibly end in money, so neither looks like a trap',
    'Explains the two-tier structure without a table',
  ],
  cons: ['Admitting a judged lane exists may deter the ambitious post you want', 'Two parallel timelines is busy'],
  scores: { story: 5, motion: 4, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: () => {
    const dur = 12;
    const lane = (y, label, note, col, soft, items) => `
      ${R(64, y, 640, 78, { fill: soft, stroke: null, r: 12 })}
      ${L(88, y + 26, label, { fill: col })}
      ${T(88, y + 50, note, { size: 13, fill: P.dim })}
      <line x1="300" y1="${y + 39}" x2="600" y2="${y + 39}" stroke="${P.line}" stroke-width="1.6" stroke-dasharray="4 5"/>
      ${items.map((it, i) => `
        <g opacity="0">${at(0.1 + i * 0.22, dur)}
          ${R(300, y + 26, 92, 26, { fill: P.white, stroke: col, r: 13 })}
          ${T(346, y + 44, it, { a: 'middle', size: 11.5, w: 600, fill: col })}
          <animateTransform attributeName="transform" type="translate" values="0 0;300 0;300 0"
            keyTimes="0;${(0.34 + i * 0.22).toFixed(4)};1" dur="${dur}s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.2 1;0 0 1 1" fill="freeze"/>
        </g>`).join('')}
      ${R(620, y + 22, 66, 34, { fill: col, stroke: null, r: 9 })}
      ${T(653, y + 44, 'Paid', { a: 'middle', size: 12.5, w: 700, fill: P.white })}`;
    return {
      pills: [],
      svg: wrapC(`
        ${shell({ fill: P.white, stroke: P.line })}
        ${T(64, 62, 'Nothing you send gets nothing back.', { size: 25, w: 700 })}
        ${T(64, 90, 'One lane is automatic. The other is read by a person. Both end the same way.', { size: 14, fill: P.dim })}
        ${lane(108, 'GUARANTEED LANE', 'Upvotes, comments, reviews — paid on arrival at 10% or more', P.green, P.greenSoft, ['Upvote', 'Review'])}
        ${lane(200, 'JUDGED LANE', 'Posts anywhere — a person sets the number, up to 100%', P.or, P.orTint, ['X post', 'TikTok'])}
        ${cta(CW / 2 - 116, 300, 232, 'Pick your lane')}`,
        'Two lanes of claims, guaranteed and judged, both ending in a payout')
    };
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   The modal.

   There is no modal on the live page — "Claim your reward" scrolls to the
   block above and stops. So option 0 here is not a replica of a modal; it is
   a drawing of what actually happens, which is nothing. Every other option
   is net-new, and each one is a different answer to the same question: how
   little can we ask for before we owe somebody a discount?
   ═══════════════════════════════════════════════════════════════════════ */

const mCard = (o = {}) => `
  <rect x="0" y="0" width="${MW}" height="${MH}" fill="#0B0F14" opacity="0.42"/>
  ${R(40, o.y == null ? 54 : o.y, 480, o.h || 512, { r: 20, stroke: null, fill: P.white })}`;

const mClose = (y = 78) => `
  <g stroke="${P.faint}" stroke-width="1.8" stroke-linecap="round">
    <path d="M ${MW - 82} ${y} l 13 13 M ${MW - 69} ${y} l -13 13"/>
  </g>`;

const mField = (y, label, value, o = {}) => `
  ${L(76, y, label)}
  ${R(72, y + 12, 416, 50, { r: 10, stroke: o.active ? P.or : P.line, sw: o.active ? 1.8 : 1 })}
  ${T(92, y + 43, value, { size: 13.5, m: o.m, fill: o.ph ? P.faint : P.ink })}`;

/* ══ 0 · nothing opens ═════════════════════════════════════════════════ */
export const noModalToday = {
  id: 'pm-none',
  name: 'What Happens Today',
  family: 'A · baseline',
  tagline: 'The button scrolls. That is the whole flow.',
  desc:
    'Drawn rather than replicated, because there is nothing to replicate: on the live page every ' +
    '"Claim your reward" button is an anchor that scrolls to the block above it. A visitor who has ' +
    'just upvoted, wants their discount, and presses the button is returned to a paragraph telling ' +
    'them to press the button. This is the defect the rest of the board exists to fix.',
  pros: ['Nothing to build'],
  cons: [
    'The page asks for an action four times and provides no way to complete it',
    'Every upvote earned before this is fixed is unclaimable',
    'A visitor who presses twice reasonably concludes the page is broken',
  ],
  scores: { story: 1, motion: 1, perf: 5, mobile: 3, brand: 1, ease: 5 },
  build: () => {
    const dur = 6;
    return {
      pills: [],
      svg: wrapM(`
        ${R(0, 0, MW, MH, { fill: P.white, stroke: null, r: 0 })}
        ${R(40, 54, 480, 210, { fill: P.orTint, stroke: P.orLine, sw: 2, r: 18 })}
        ${T(280, 124, 'Did something?', { a: 'middle', size: 21, w: 700 })}
        ${T(280, 150, 'Come and get paid.', { a: 'middle', size: 21, w: 700 })}
        ${cta(176, 178, 208, 'Claim your reward', { still: true })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.2;0.72;0.86;1" dur="${dur}s" repeatCount="indefinite"/>
          <path d="M 280 290 L 280 350 m -8 -10 l 8 10 l 8 -10" fill="none" stroke="${P.faint}"
            stroke-width="2" stroke-linecap="round" stroke-dasharray="5 6"/>
          ${T(280, 384, 'scrolls back to the same block', { a: 'middle', size: 13.5, fill: P.dim })}
          ${T(280, 408, 'no form, no field, no modal', { a: 'middle', size: 13.5, fill: P.faint })}
        </g>
        ${R(40, 440, 480, 132, { fill: '#FFF6F5', stroke: '#F5C6C6', r: 14 })}
        ${L(68, 470, 'WHAT A VISITOR CANNOT DO', { fill: '#B4343E' })}
        ${['Submit a link', 'Receive a code', 'Find out what they earned'].map((s, i) =>
          T(68, 500 + i * 24, `— ${s}`, { size: 13.5, fill: '#B4343E' })).join('')}`,
        'The current flow, in which the claim button only scrolls')
    };
  },
};

/* ══ 1 · one field ═════════════════════════════════════════════════════ */
export const oneField = {
  id: 'pm-onefield',
  name: 'One Field',
  family: 'B · minimal',
  tagline: 'A link, and nothing else',
  desc:
    'The smallest modal that can work: a URL field and a button. No email, no platform picker, no ' +
    'account — the link itself identifies the person, and the code goes back as a reply on the same ' +
    'platform. Every field removed is claims recovered, and this removes all but one.',
  pros: [
    'The lowest possible friction, which matters most on launch day',
    'Nothing to validate, so nothing to get wrong',
    'Trivial to build and to keep working',
  ],
  cons: ['Replying on-platform is manual work for whoever processes claims', 'No email means no way to follow up'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: () => {
    const dur = 8;
    return {
      pills: [],
      svg: wrapM(`
        ${mCard({ y: 120, h: 380 })}
        ${mClose(146)}
        ${T(72, 176, 'Send us the link', { size: 23, w: 700 })}
        ${T(72, 204, 'That is all we need. We reply where you posted.', { size: 13.5, fill: P.dim })}
        <g opacity="0">${at(0.12, dur)}
          ${mField(240, 'LINK TO YOUR UPVOTE, COMMENT, REVIEW OR POST', 'x.com/paulfleury/status/18429…', { m: true, active: true })}
        </g>
        <g opacity="0">${at(0.42, dur)}
          ${cta(72, 330, 416, 'Claim my discount', { h: 52 })}
        </g>
        ${T(280, 414, 'One reward per person. Reviewed after launch day.', { a: 'middle', size: 12, fill: P.faint })}
        ${T(280, 452, 'No account, no email, no forms.', { a: 'middle', size: 12.5, w: 600, fill: P.green })}`,
        'A modal with a single link field and one button')
    };
  },
};

/* ══ 2 · detect and floor ══════════════════════════════════════════════ */
export const detectAndFloor = {
  id: 'pm-detect',
  name: 'Detect and Commit',
  family: 'C · reassurance',
  tagline: 'The floor appears before you submit',
  desc:
    'The strongest version: as the link lands, the platform is recognised from the domain and a ' +
    'guaranteed floor commits on screen — before the button is pressed. It converts the modal from ' +
    'a form into an offer, and it is the only option that removes the risk of submitting and ' +
    'finding out later that you earned nothing.',
  pros: [
    'Commits to a number while the visitor is still deciding',
    'Platform detection removes a dropdown nobody wants to use',
    'The floor is the single most persuasive thing you can show here',
  ],
  cons: ['You are bound by whatever floor you display', 'Detection has to handle shortened and unknown links'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: () => {
    const dur = 10;
    return {
      pills: [],
      svg: wrapM(`
        ${mCard({ y: 74, h: 472 })}
        ${mClose(98)}
        ${T(72, 130, 'Claim your discount', { size: 23, w: 700 })}
        ${T(72, 158, 'Paste the link and we will tell you your minimum straight away.', { size: 13.5, fill: P.dim })}
        <g opacity="0">${at(0.08, dur)}
          ${mField(192, 'YOUR LINK', 'tiktok.com/@paul/video/7421…', { m: true, active: true })}
        </g>
        <g opacity="0">${at(0.3, dur)}
          ${R(72, 268, 416, 44, { fill: P.greenSoft, stroke: null, r: 10 })}
          <path d="M 96 290 l 5 5 l 9 -10" fill="none" stroke="${P.green}" stroke-width="2.2" stroke-linecap="round"/>
          ${T(124, 295, 'TikTok video found — counts as a post', { size: 13, w: 600, fill: P.green })}
        </g>
        <g opacity="0">${at(0.48, dur)}
          ${R(72, 326, 416, 104, { fill: P.orTint, stroke: P.orLine, sw: 2, r: 12 })}
          ${L(96, 354, 'YOUR GUARANTEED MINIMUM')}
          ${T(96, 396, '25% off', { size: 32, w: 700, m: true, fill: P.or })}
          ${T(232, 396, 'and up to 100% once it is read', { size: 13, fill: P.dim })}
          ${T(96, 418, 'Committed now. It cannot go below this.', { size: 12, fill: P.faint })}
        </g>
        <g opacity="0">${at(0.68, dur)}
          ${cta(72, 450, 416, 'Lock in 25% and submit', { h: 52 })}
        </g>
        ${T(280, 526, 'One reward per person.', { a: 'middle', size: 12, fill: P.faint })}`,
        'A modal detecting the platform and committing to a guaranteed floor')
    };
  },
};

/* ══ 3 · pick your proof ═══════════════════════════════════════════════ */
export const pickProof = {
  id: 'pm-pick',
  name: 'Pick Your Proof',
  family: 'D · guided',
  tagline: 'Chips instead of a dropdown',
  desc:
    'Five chips — upvote, comment, review, post, video — selected before the link is pasted, so the ' +
    'modal can show the right floor and ask for the right thing. It is one extra tap in exchange ' +
    'for a form that never rejects a link, which on a launch day of mixed-quality submissions is ' +
    'probably the right trade.',
  pros: [
    'Cannot mis-detect, because the visitor declares the route',
    'Chips teach the five routes to anyone who skipped the page',
    'Each chip can carry its own floor',
  ],
  cons: ['An extra decision before the one that matters', 'Five chips is a wide row on a small phone'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: () => {
    const dur = 9;
    /* laid out cumulatively so the row cannot run past the card edge (488) */
    const names = ['Upvote', 'Comment', 'Review', 'Post', 'Video'];
    let cx = 76;
    const chips = names.map((nm) => { const w = nm.length * 8.4 + 28; const o = [nm, cx, w]; cx += w + 6; return o; });
    return {
      pills: [],
      svg: wrapM(`
        ${mCard({ y: 100, h: 420 })}
        ${mClose(124)}
        ${T(72, 156, 'What did you do?', { size: 23, w: 700 })}
        ${T(72, 184, 'Pick one, and we will show the minimum it earns.', { size: 13.5, fill: P.dim })}
        ${chips.map(([nm, x, w], i) => `
          <g opacity="0">${at(0.06 + i * 0.05, dur)}
            ${R(x, 208, w, 36, { r: 18, fill: i === 3 ? P.or : P.white, stroke: i === 3 ? P.or : P.line })}
            ${T(x + w / 2, 231, nm, { a: 'middle', size: 13, w: 600, fill: i === 3 ? P.white : P.dim })}
          </g>`).join('')}
        <g opacity="0">${at(0.36, dur)}
          ${mField(276, 'LINK TO THE POST', 'linkedin.com/posts/paulfleury-…', { m: true, active: true })}
        </g>
        <g opacity="0">${at(0.56, dur)}
          ${R(72, 352, 416, 40, { fill: P.orTint, stroke: null, r: 10 })}
          ${T(92, 377, 'A post starts at 25% and is judged up from there', { size: 13, w: 600, fill: P.or })}
        </g>
        <g opacity="0">${at(0.7, dur)}
          ${cta(72, 406, 416, 'Submit my claim', { h: 52 })}
        </g>
        ${T(280, 492, 'One reward per person. Reviewed after launch day.', { a: 'middle', size: 12, fill: P.faint })}`,
        'A modal with route chips followed by a link field')
    };
  },
};

/* ══ 4 · the slip ══════════════════════════════════════════════════════ */
export const theSlip = {
  id: 'pm-slip',
  name: 'The Claim Slip',
  family: 'E · character',
  tagline: 'A voucher, not a form',
  desc:
    'The same two fields, dressed as a physical claim slip — perforated edge, stamped serial, a ' +
    'torn stub that carries the code. It costs nothing in friction and gives the launch a piece of ' +
    'character the page currently only gestures at with an emoji. The stub is the part people ' +
    'screenshot, which is free distribution.',
  pros: [
    'Memorable and screenshot-friendly, which matters for a launch',
    'Identical friction to a plain form',
    'The serial makes a claim feel recorded rather than sent into a void',
  ],
  cons: ['Decorative styling dates faster than a plain form', 'Perforation detail is fiddly on small screens'],
  scores: { story: 4, motion: 4, perf: 4, mobile: 3, brand: 5, ease: 3 },
  build: () => {
    const dur = 9;
    return {
      pills: [],
      svg: wrapM(`
        ${mCard({ y: 70, h: 480 })}
        ${mClose(94)}
        ${L(72, 118, 'OPENLINE \u00b7 PRODUCT HUNT LAUNCH')}
        ${T(72, 152, 'Claim slip', { size: 25, w: 700 })}
        ${T(72, 178, 'No. PH-0042', { size: 13, m: true, fill: P.faint })}
        <line x1="72" y1="200" x2="488" y2="200" stroke="${P.line}" stroke-dasharray="2 5"/>
        <g opacity="0">${at(0.1, dur)}
          ${mField(220, 'WHAT YOU DID \u2014 PASTE THE LINK', 'producthunt.com/posts/openline#c…', { m: true })}
        </g>
        <g opacity="0">${at(0.3, dur)}
          ${mField(306, 'WHERE TO SEND THE CODE', 'you@example.com', { m: true, active: true })}
        </g>
        <g opacity="0">${at(0.5, dur)}
          ${cta(72, 388, 416, 'Stamp it', { h: 50 })}
        </g>
        <!-- the stub: perforated off, carrying the reward -->
        <g opacity="0">${at(0.68, dur)}
          <line x1="72" y1="464" x2="488" y2="464" stroke="${P.orLine}" stroke-dasharray="3 6" stroke-width="1.6"/>
          <circle cx="60" cy="464" r="9" fill="#F1F3F6"/><circle cx="500" cy="464" r="9" fill="#F1F3F6"/>
          ${R(72, 480, 416, 54, { fill: P.orTint, stroke: null, r: 10 })}
          ${L(92, 504, 'YOUR STUB')}
          ${T(92, 524, 'Minimum 10% off \u2014 final amount stamped after launch day', { size: 12.5, fill: P.dim })}
        </g>`,
        'A claim slip with a perforated stub carrying the reward')
    };
  },
};

/* ══ 5 · queue position ════════════════════════════════════════════════ */
export const queuePosition = {
  id: 'pm-queue',
  name: 'You Are 14th',
  family: 'C · reassurance',
  tagline: 'The state after submitting, which nothing shows today',
  desc:
    'The screen a visitor sees after they submit: a position in the queue, a real estimate, and the ' +
    'exact words in which the answer will arrive. Every other option designs the asking; this one ' +
    'designs the waiting, which is where trust is actually won or lost. Pair it with any of the ' +
    'input options above.',
  pros: [
    'Replaces "we read every one" with a number, which is checkable',
    'Kills the follow-up email asking whether it arrived',
    'Composes with any of the other modals rather than competing with them',
  ],
  cons: ['A long queue is worse to show than to hide', 'Requires real queue state to be honest'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 3 },
  build: () => {
    const dur = 9;
    const pos = ['17th', '16th', '15th', '14th', '14th'];
    return {
      pills: [],
      svg: wrapM(`
        ${mCard({ y: 110, h: 400 })}
        ${mClose(134)}
        <circle cx="280" cy="188" r="26" fill="${P.greenSoft}"/>
        <path d="M 268 188 l 8 8 l 15 -17" fill="none" stroke="${P.green}" stroke-width="2.6" stroke-linecap="round"/>
        ${T(280, 240, 'Got it', { a: 'middle', size: 23, w: 700 })}
        ${T(280, 266, 'A person reads every claim, in the order they arrive.', { a: 'middle', size: 13.5, fill: P.dim })}
        ${R(72, 292, 416, 106, { fill: P.orTint, stroke: P.orLine, r: 12 })}
        ${L(280, 320, 'YOUR PLACE IN THE QUEUE', { a: 'middle' })}
        ${step(pos, dur, (v) => T(280, 368, v, { a: 'middle', size: 38, w: 700, m: true, fill: P.or }))}
        ${T(280, 424, 'Usually under two hours on launch day.', { a: 'middle', size: 13, fill: P.dim })}
        ${T(280, 448, 'The code arrives at you@example.com.', { a: 'middle', size: 13, fill: P.dim })}
        <g opacity="0">${at(0.6, dur)}
          ${R(72, 466, 416, 30, { fill: P.greenSoft, stroke: null, r: 8 })}
          ${T(280, 486, 'Your 10% minimum is already locked in', { a: 'middle', size: 12.5, w: 600, fill: P.green })}
        </g>`,
        'A confirmation screen showing a position in the claim queue')
    };
  },
};

/* ══ 6 · no email ══════════════════════════════════════════════════════ */
export const noEmailNeeded = {
  id: 'pm-nomail',
  name: 'Code On The Spot',
  family: 'B · minimal',
  tagline: 'The floor issued instantly, the rest by email',
  desc:
    'Splits the reward in two so something is always handed over immediately: the guaranteed floor ' +
    'is issued as a working code the moment a link is submitted, and only the judged uplift needs ' +
    'an email and a wait. Nobody leaves this modal empty-handed, which is a materially different ' +
    'offer from the one the page makes today.',
  pros: [
    'Nobody leaves without something, which is the whole conversion argument',
    'The instant code makes the guarantee undeniable',
    'Email becomes optional, so it stops being a barrier',
  ],
  cons: [
    'Codes issued before a human reads the link can be abused',
    'Two-part reward is harder to explain than one number',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 5, ease: 3 },
  build: () => {
    const dur = 10;
    const code = 'PH-10-4K9T';
    return {
      pills: [],
      svg: wrapM(`
        ${mCard({ y: 78, h: 464 })}
        ${mClose(102)}
        ${T(72, 134, 'Here is your 10%, now.', { size: 23, w: 700 })}
        ${T(72, 162, 'It already works. The rest depends on what a person makes of your post.', { size: 13.5, fill: P.dim })}

        ${R(72, 188, 416, 104, { fill: P.orTint, stroke: P.orLine, sw: 2, r: 12 })}
        ${L(96, 216, 'WORKING NOW')}
        ${typeIn(100, 260, code, { dur, from: 0.04, to: 0.28, chunk: 1, size: 25, w: 700, fill: P.or })}
        <g opacity="0">${at(0.32, dur)}
          ${R(372, 232, 96, 34, { fill: P.white, stroke: P.or, r: 8 })}
          ${T(420, 254, 'Copy', { a: 'middle', size: 13, w: 700, fill: P.or })}
        </g>
        ${T(96, 282, 'Use it on any plan, any time.', { size: 12, fill: P.faint })}

        <g opacity="0">${at(0.40, dur)}
          <line x1="72" y1="318" x2="488" y2="318" stroke="${P.line}"/>
          ${T(72, 348, 'Want more than 10%?', { size: 16, w: 700 })}
          ${T(72, 372, 'Leave an email and we will send the judged amount after launch day.', { size: 13, fill: P.dim })}
          ${mField(392, 'EMAIL \u2014 OPTIONAL', 'you@example.com', { m: true, ph: true })}
          ${cta(72, 470, 416, 'Send me the uplift too', { h: 48 })}
        </g>`,
        'A modal issuing a working ten per cent code immediately')
    };
  },
};

/* ══ 7 · live preview ══════════════════════════════════════════════════ */
export const livePreview = {
  id: 'pm-preview',
  name: 'Form and Prize',
  family: 'D · guided',
  tagline: 'The reward panel updates as you choose',
  desc:
    'A two-column modal: the form on the left, and a reward panel on the right that recalculates as ' +
    'each choice is made — route selected, floor set, link added, ceiling shown. It keeps the ' +
    'payoff on screen through the whole interaction instead of hiding it behind a submit.',
  pros: [
    'The reward is never off screen while the visitor works',
    'Makes the effect of choosing a harder route visible and therefore tempting',
  ],
  cons: [
    'Two columns collapse awkwardly on a phone, where most launch traffic is',
    'The most elements of any option here',
  ],
  scores: { story: 4, motion: 5, perf: 4, mobile: 2, brand: 4, ease: 3 },
  build: () => {
    const dur = 10;
    const stages = [
      ['\u2014', 'Pick what you did', P.faint],
      ['10%', 'Upvote \u2014 guaranteed', P.green],
      ['25%', 'Post \u2014 guaranteed floor', P.or],
      ['100%', 'Post \u2014 if it lands', P.or],
    ];
    return {
      pills: [],
      svg: wrapM(`
        ${mCard({ y: 96, h: 428 })}
        ${mClose(120)}
        ${T(72, 152, 'Build your claim', { size: 22, w: 700 })}
        ${R(72, 176, 244, 316, { fill: '#FAFBFC', stroke: null, r: 12 })}
        ${['Upvote', 'Comment', 'Review', 'Post anywhere'].map((nm, i) => `
          <g opacity="0">${at(0.06 + i * 0.05, dur)}
            ${R(88, 196 + i * 44, 212, 34, { r: 9, fill: i === 3 ? P.or : P.white, stroke: i === 3 ? P.or : P.line })}
            ${T(104, 218 + i * 44, nm, { size: 13, w: 600, fill: i === 3 ? P.white : P.dim })}
          </g>`).join('')}
        <g opacity="0">${at(0.34, dur)}
          ${L(88, 392, 'LINK')}
          ${R(88, 402, 212, 42, { r: 9, stroke: P.or, sw: 1.6 })}
          ${T(102, 428, 'x.com/paul/status/18…', { size: 11.5, m: true })}
        </g>
        <g opacity="0">${at(0.5, dur)}
          ${cta(88, 456, 212, 'Submit', { h: 44, size: 14 })}
        </g>

        ${R(332, 176, 156, 316, { fill: P.orTint, stroke: P.orLine, r: 12 })}
        ${L(410, 206, 'YOUR REWARD', { a: 'middle' })}
        ${step(stages, dur, ([amt, note, col]) => `
          ${T(410, 268, amt, { a: 'middle', size: 34, w: 700, m: true, fill: col })}
          ${T(410, 296, note, { a: 'middle', size: 11.5, fill: P.dim })}`)}
        ${T(410, 344, 'Worth up to', { a: 'middle', size: 11.5, fill: P.faint })}
        ${T(410, 370, '$1,000', { a: 'middle', size: 21, w: 700, m: true })}
        ${T(410, 430, 'Nobody goes', { a: 'middle', size: 11.5, fill: P.dim })}
        ${T(410, 448, 'below 10%', { a: 'middle', size: 11.5, w: 600, fill: P.green })}`,
        'A two-column modal whose reward panel updates as choices are made')
    };
  },
};

/* ══ 8 · one screen ════════════════════════════════════════════════════ */
export const oneScreen = {
  id: 'pm-onescreen',
  name: 'One Screen, No Steps',
  family: 'B · minimal',
  tagline: 'Everything visible, nothing sequenced',
  desc:
    'Route, link, email and the guarantee all on one screen with no progressive disclosure at all. ' +
    'A visitor can see the entire cost of claiming before they start, which is what stops people ' +
    'abandoning halfway — a multi-step modal hides its own length, and on a launch day that reads ' +
    'as a trap.',
  pros: [
    'The full cost of claiming is visible up front, so nobody abandons mid-flow',
    'One submit, one validation pass, no state to manage',
    'Scrolls cleanly on a phone',
  ],
  cons: ['Denser first impression than a single field', 'No room for detection feedback'],
  scores: { story: 4, motion: 2, perf: 5, mobile: 4, brand: 3, ease: 5 },
  build: () => {
    const dur = 7;
    return {
      pills: [],
      svg: wrapM(`
        ${mCard({ y: 56, h: 508 })}
        ${mClose(80)}
        ${T(72, 112, 'Claim your discount', { size: 22, w: 700 })}
        ${T(72, 138, 'Three things, one button, and a minimum we cannot go below.', { size: 13, fill: P.dim })}
        ${['Upvote', 'Comment', 'Review', 'Post'].map((nm, i) => `
          ${R(72 + i * 106, 158, 96, 34, { r: 9, fill: i === 0 ? P.or : P.white, stroke: i === 0 ? P.or : P.line })}
          ${T(120 + i * 106, 180, nm, { a: 'middle', size: 12.5, w: 600, fill: i === 0 ? P.white : P.dim })}`).join('')}
        ${mField(216, 'LINK', 'producthunt.com/posts/openline', { m: true })}
        ${mField(302, 'EMAIL', 'you@example.com', { m: true })}
        ${R(72, 388, 416, 52, { fill: P.greenSoft, stroke: null, r: 10 })}
        <path d="M 96 414 l 5 5 l 9 -10" fill="none" stroke="${P.green}" stroke-width="2.2" stroke-linecap="round"/>
        ${T(124, 419, 'Guaranteed 10% minimum, whatever we think of it', { size: 13, w: 600, fill: P.green })}
        ${cta(72, 456, 416, 'Claim it', { h: 52 })}
        ${T(280, 536, 'One reward per person. Reviewed after launch day.', { a: 'middle', size: 12, fill: P.faint })}`,
        'A single-screen claim modal with every field visible at once')
    };
  },
};

/* ══ 9 · the receipt out ═══════════════════════════════════════════════ */
export const receiptOut = {
  id: 'pm-receipt',
  name: 'It Resolves To Money',
  family: 'C · reassurance',
  tagline: 'The confirmation is a priced receipt',
  desc:
    'The state after submitting, expressed in currency rather than percentage: the plan, the ' +
    'discount, the amount not paid. A visitor who sees "$250 off" remembers a number; one who sees ' +
    '"25%" remembers a feeling. Pair with any input option, or with the queue screen for the ' +
    'judged half.',
  pros: [
    'Money is the only unit people compare accurately',
    'Uses real plan prices, so nothing needs inventing',
  ],
  cons: ['Anchors to one plan, which may not be the one they buy', 'Showing a price before checkout can feel presumptuous'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: () => {
    const dur = 9;
    const lines = [
      ['Openline Unlimited, 12 months', '$1,000.00', P.dim],
      ['Product Hunt review \u2014 verified', '', P.faint],
      ['Your discount', '\u221225%', P.or],
    ];
    return {
      pills: [],
      svg: wrapM(`
        ${mCard({ y: 96, h: 428 })}
        ${mClose(120)}
        ${T(72, 154, 'Confirmed \u2014 here is what it saves you', { size: 20, w: 700 })}
        ${T(72, 180, 'The code lands at you@example.com after launch day.', { size: 13, fill: P.dim })}
        ${R(72, 204, 416, 176, { r: 12, stroke: P.line })}
        ${L(96, 232, 'CLAIM PH-0042')}
        <line x1="96" y1="246" x2="464" y2="246" stroke="${P.line}"/>
        ${lines.map(([lbl, amt, col], i) => `
          <g opacity="0">${at(0.12 + i * 0.16, dur)}
            ${T(96, 274 + i * 28, lbl, { size: 13, fill: i === 2 ? P.ink : P.dim, w: i === 2 ? 600 : 400 })}
            ${amt ? T(464, 274 + i * 28, amt, { a: 'end', size: 13, w: 700, m: true, fill: col }) : ''}
          </g>`).join('')}
        <g opacity="0">${at(0.62, dur)}
          <line x1="96" y1="342" x2="464" y2="342" stroke="${P.ink}" stroke-width="1.4"/>
          ${T(96, 366, 'You do not pay', { size: 13, w: 600 })}
          ${T(464, 366, '$250.00', { a: 'end', size: 16, w: 700, m: true, fill: P.or })}
        </g>
        <g opacity="0">${at(0.76, dur)}
          ${R(72, 400, 416, 46, { fill: P.orTint, stroke: P.orLine, r: 10 })}
          ${T(92, 429, 'A post instead of a review would have been worth $1,000.', { size: 12.5, fill: P.dim })}
          ${cta(72, 462, 416, 'Post something too', { h: 48 })}
        </g>`,
        'A confirmation modal resolving the discount into an amount of money')
    };
  },
};

/* ══ 10 · no form at all ═══════════════════════════════════════════════ */
export const noFormAtAll = {
  id: 'pm-noform',
  name: 'No Form At All',
  family: 'B · minimal',
  tagline: 'Verified through Product Hunt, so nothing is asked',
  desc:
    'The end point of the argument that every field costs claims: ask for none. A visitor signs in ' +
    'with the Product Hunt account they already used to upvote, the upvote and any comment are read ' +
    'back from the API, and the code is issued on the spot. The only manual route left is a post ' +
    'somewhere else, which keeps its own link field.',
  pros: [
    'Zero typing, and the proof is verified rather than trusted',
    'Impossible to claim twice, which the copy promises and no other option enforces',
    'Fastest path from upvote to code by a wide margin',
  ],
  cons: [
    'Depends on a Product Hunt OAuth integration being built and approved',
    'Excludes anyone who acted without signing in',
    'A sign-in button can read as heavier than a text field even though it is lighter',
  ],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 2 },
  build: () => {
    const dur = 9;
    return {
      pills: [],
      svg: wrapM(`
        ${mCard({ y: 92, h: 436 })}
        ${mClose(116)}
        ${T(280, 156, 'We can just check.', { a: 'middle', size: 23, w: 700 })}
        ${T(280, 184, 'Sign in with the account you upvoted from and we read it back.', { a: 'middle', size: 13, fill: P.dim })}
        ${cta(112, 208, 336, 'Continue with Product Hunt', { h: 52 })}

        <g opacity="0">${at(0.28, dur)}
          ${R(112, 284, 336, 116, { fill: P.greenSoft, stroke: null, r: 12 })}
          ${['Upvote found \u2014 14 Sep', 'Comment found \u2014 14 Sep', 'No previous claim on this account'].map((s, i) => `
            <g opacity="0">${at(0.32 + i * 0.1, dur)}
              <path d="M 136 ${310 + i * 30} l 5 5 l 9 -10" fill="none" stroke="${P.green}" stroke-width="2.2" stroke-linecap="round"/>
              ${T(162, 315 + i * 30, s, { size: 12.5, w: 600, fill: P.green })}
            </g>`).join('')}
        </g>
        <g opacity="0">${at(0.66, dur)}
          ${R(112, 416, 336, 76, { fill: P.orTint, stroke: P.orLine, sw: 2, r: 12 })}
          ${L(280, 442, 'ISSUED \u2014 NOTHING TYPED', { a: 'middle' })}
          ${T(280, 476, 'PH-25-8QX4', { a: 'middle', size: 24, w: 700, m: true, fill: P.or })}
        </g>
        ${T(280, 520, 'Posted somewhere else instead? There is a link field for that.', { a: 'middle', size: 12, fill: P.faint })}`,
        'A modal that verifies an upvote through Product Hunt and issues a code with no fields')
    };
  },
};
