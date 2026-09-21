/* ─────────────────────────────────────────────────────────────────────────
   /installation-guide — the hero video placeholder (576 × 324, 16:9).

   What ships today is a dark rectangle with three animated step tiles, and a
   play button dropped on top of them — the 80px circle lands exactly over the
   middle tile and hides it. A black scrim dulls the whole thing, a red "VIDEO"
   chip sits in the corner, and nothing except the play glyph suggests the card
   is clickable at all.

   Paul's brief: replace it. Every option below is ONE BUTTON — the entire
   576 × 324 surface is the hit area, it lifts on hover, presses on click and
   takes a focus ring, and each one says out loud that tapping anywhere opens
   the video. The artwork and the call to action never overlap.
   ───────────────────────────────────────────────────────────────────────── */
import { boxWrap, TONES, INK, WHITE, GRAY, LINE } from './kit.js';

const MO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const W = 576, H = 324;
const w = boxWrap(W, H);
const noPills = [];

const OR = TONES.orange.main, ORD = TONES.orange.deep, ORW = TONES.orange.wash;
const DARK = '#0B0B0F', DARK2 = '#14161D', MUT = '#6B7280';
const DUR = '3:24';
const TITLE = 'How to Install Your Openline eSIM';

/* ── primitives ───────────────────────────────────────────────────────────── */
const t = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}"${o.m ? ` font-family="${MO}"` : ''} font-size="${o.size || 12}"` +
  ` font-weight="${o.w || 400}" fill="${o.fill || INK}"${o.op == null ? '' : ` opacity="${o.op}"`}` +
  ` text-anchor="${o.a || 'start'}"${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${s}</text>`;

const lab = (x, y, s, fill, o = {}) =>
  t(x, y, s, { m: true, size: o.size || 9, ls: o.ls || 1.3, fill, a: o.a, op: o.op, w: o.w || 700 });

const rect = (x, y, ww, hh, o = {}) =>
  `<rect x="${x}" y="${y}" width="${ww}" height="${hh}" rx="${o.r == null ? 10 : o.r}"` +
  ` fill="${o.fill || 'none'}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 1}"` : ''}` +
  `${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}${o.op == null ? '' : ` opacity="${o.op}"`}/>`;

/* lucide glyphs, top-left anchored and scaled */
const QR = '<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/>' +
  '<rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/>' +
  '<path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/>' +
  '<path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>';
const PHONE = '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>';
const WIFI = '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/>' +
  '<path d="M8.5 16.429a5 5 0 0 1 7 0"/>';
const CHECK = '<path d="M20 6 9 17l-5-5"/>';

const glyph = (paths, x, y, size, col, sw = 2) =>
  `<g transform="translate(${x},${y}) scale(${(size / 24).toFixed(4)})" fill="none" stroke="${col}"` +
  ` stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${paths}</g>`;

/* solid play triangle, centred on cx/cy */
const tri = (cx, cy, r, col = WHITE) =>
  `<path d="M ${(cx - r * 0.3).toFixed(1)} ${(cy - r * 0.55).toFixed(1)} L ${(cx + r * 0.62).toFixed(1)} ${cy}` +
  ` L ${(cx - r * 0.3).toFixed(1)} ${(cy + r * 0.55).toFixed(1)} Z" fill="${col}"/>`;

/* dark ground + the page's own orange dot grid */
const ground = (uid, o = {}) => `
  <defs>
    <linearGradient id="${uid}-g" x1="0" y1="0" x2="0.75" y2="1">
      <stop offset="0" stop-color="${o.a || 'rgba(255,83,20,0.20)'}"/>
      <stop offset="0.62" stop-color="${o.b || 'rgba(11,11,15,0.96)'}"/>
      <stop offset="1" stop-color="${DARK}"/>
    </linearGradient>
    <pattern id="${uid}-d" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="rgba(255,83,20,0.16)"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="${DARK}"/>
  <rect width="${W}" height="${H}" fill="url(#${uid}-g)"/>
  <rect width="${W}" height="${H}" fill="url(#${uid}-d)"/>`;

/* the pulsing orange bloom from the live page, reusable */
const bloom = (uid, cx, cy, r, dur = 7) => `
  <defs><radialGradient id="${uid}-b">
    <stop offset="0" stop-color="${OR}" stop-opacity="0.34"/>
    <stop offset="0.68" stop-color="${OR}" stop-opacity="0"/>
  </radialGradient></defs>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${uid}-b)">
    <animate attributeName="opacity" values="0.55;1;0.55" keyTimes="0;0.5;1"
      dur="${dur}s" repeatCount="indefinite"/>
  </circle>`;

/* the shared call-to-action pill. Never placed over the artwork. */
const ctaPill = (cx, cy, label, o = {}) => {
  const pw = o.w || 292, ph = o.h || 52;
  const x = cx - pw / 2, y = cy - ph / 2;
  return `
    <rect x="${x - 6}" y="${y - 6}" width="${pw + 12}" height="${ph + 12}" rx="${(ph + 12) / 2}"
      fill="${OR}" opacity="0.18">
      <animate attributeName="opacity" values="0.1;0.28;0.1" keyTimes="0;0.5;1" dur="3.2s"
        repeatCount="indefinite"/>
    </rect>
    ${rect(x, y, pw, ph, { fill: o.flat ? OR : ORD, r: ph / 2 })}
    ${rect(x, y, pw, ph - 2, { fill: OR, r: ph / 2 })}
    <circle cx="${x + 26}" cy="${cy}" r="11" fill="rgba(255,255,255,0.22)"/>
    ${tri(x + 26.5, cy, 8)}
    ${t(x + 48, cy + 5.5, label, { size: 15.5, w: 700, fill: WHITE })}`;
};

/* "the whole card is the button" affordance */
const tapHint = (x, y, o = {}) => `
  <g opacity="${o.op == null ? 0.5 : o.op}">
    ${lab(x, y, o.text || 'TAP ANYWHERE ON THIS CARD TO PLAY', o.fill || WHITE,
      { a: o.a || 'middle', size: o.size || 8.5, ls: 1.5 })}
  </g>`;

/* a 1.5px inset frame that breathes — reads as "this whole thing is live" */
const liveFrame = (col = 'rgba(255,255,255,0.16)', hi = 'rgba(255,83,20,0.75)') => `
  ${rect(10, 10, W - 20, H - 20, { stroke: col, sw: 1.5, r: 13 })}
  ${rect(10, 10, W - 20, H - 20, { stroke: hi, sw: 1.5, r: 13, op: 0 })}
  <rect x="10" y="10" width="${W - 20}" height="${H - 20}" rx="13" fill="none" stroke="${hi}"
    stroke-width="1.5" opacity="0">
    <animate attributeName="opacity" values="0;0.85;0" keyTimes="0;0.5;1" dur="3.4s"
      repeatCount="indefinite"/>
  </rect>`;

/* duration chip */
const durChip = (x, y, o = {}) => `
  ${rect(x, y, 52, 22, { fill: o.bg || 'rgba(255,255,255,0.12)', r: 7 })}
  ${lab(x + 26, y + 15, DUR, o.fill || WHITE, { a: 'middle', size: 10, ls: 0.6 })}`;

/* os chips — the page asserts iPhone / Android, keep that promise */
const osChips = (x, y, o = {}) => [['iPhone', 0], ['Android', 1]].map(([s, i]) => {
  const bw = 58, gx = x + i * (bw + 7);
  return `${rect(gx, y, bw, 21, { fill: o.bg || 'rgba(255,255,255,0.10)', r: 6,
    stroke: o.stroke || 'rgba(255,255,255,0.22)' })}
    ${t(gx + bw / 2, y + 14.5, s, { size: 10.5, w: 600, a: 'middle', fill: o.fill || 'rgba(255,255,255,0.8)' })}`;
}).join('');

/* cross-fade a set of layers: each visible for one slot of the loop */
const cycle = (layers, dur) => {
  const n = layers.length;
  const kt = [];
  for (let i = 0; i < n; i++) { kt.push((i / n).toFixed(4), ((i + 0.82) / n).toFixed(4)); }
  kt.push('1');
  return layers.map((html, i) => {
    const vals = [];
    for (let j = 0; j < n; j++) { const on = j === i ? '1' : '0'; vals.push(on, on); }
    vals.push(i === 0 ? '1' : '0');
    return `<g opacity="0">${html}
      <animate attributeName="opacity" values="${vals.join(';')}" keyTimes="${kt.join(';')}"
        dur="${dur}s" repeatCount="indefinite"/></g>`;
  }).join('');
};

/* a progress rail that fills across the loop */
const rail = (x, y, ww, dur, o = {}) => `
  ${rect(x, y, ww, 4, { fill: o.bg || 'rgba(255,255,255,0.18)', r: 2 })}
  <rect x="${x}" y="${y}" width="0" height="4" rx="2" fill="${o.fill || OR}">
    <animate attributeName="width" values="0;${ww}" keyTimes="0;1" dur="${dur}s"
      repeatCount="indefinite"/>
  </rect>`;

/* ── the button shell. This is the whole point of the board. ─────────────── */
const shell = (uid, aria, inner, o = {}) =>
  `<button type="button" class="igc${o.cls ? ' ' + o.cls : ''}" data-igc="${uid}"
     aria-label="${aria}">${w(inner)}<span class="igc-flash" aria-hidden="true">
     <span>Opens the video modal</span></span></button>`;

/* click feedback, wired on the big stage only so the compare tiles stay calm */
const wire = (uid) => (container) => {
  if (!container.classList.contains('bd-stage')) return null;
  const b = container.querySelector(`[data-igc="${uid}"]`);
  if (!b) return null;
  let timer = null;
  const on = (e) => {
    e.preventDefault();
    b.classList.add('igc-on');
    clearTimeout(timer);
    timer = setTimeout(() => b.classList.remove('igc-on'), 1500);
  };
  b.addEventListener('click', on);
  return () => { clearTimeout(timer); b.removeEventListener('click', on); };
};

const mk = (uid, aria, inner, o = {}) => ({
  pills: noPills,
  svg: shell(uid, aria, inner, o),
  init: wire(uid),
});

/* ══ 0 · current ══════════════════════════════════════════════════════════ */
const STEPS = [['SCAN THE CODE', QR], ['ADD THE ESIM', PHONE], ["YOU'RE ONLINE", WIFI]];
/* sentence-case forms — never derive these by lowercasing, it yields "esim" */
const NICE = ['Scan the code', 'Add the eSIM', "You're online"];

export const igCurrent = {
  id: 'ig-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'The play button covers the middle step',
  desc:
    'What ships now, replicated exactly — including the collision. Three 56px step tiles animate in ' +
    'sequence across the middle of the card, and an 80px play circle is then layered on top of them; ' +
    'it lands directly over the "Add the eSIM" tile and hides it. A 20% black scrim flattens the ' +
    'orange, the caption gradient eats the bottom third, and a red "VIDEO" chip sits in a corner ' +
    'doing nothing. The surface is clickable, but nothing on it says so.',
  pros: ['The three-step story is the right story', 'Real brand colour and the page\u2019s own dot grid'],
  cons: ['The play mark covers the middle step icon', 'A scrim plus a caption gradient dulls everything',
    'Only the 80px circle looks clickable, not the card', 'The red VIDEO chip is generic stock UI'],
  scores: { story: 2, motion: 3, perf: 5, mobile: 2, brand: 2, ease: 5 },
  build: (uid) => mk(uid, `Play the ${DUR} installation video`, `
    ${ground(uid)}
    ${bloom(uid, W / 2, H / 2, 150)}
    ${STEPS.map(([label, ic], i) => {
      const cx = W / 2 + (i - 1) * 96, ty = 120;
      return `<g>
        ${rect(cx - 28, ty, 56, 56, { fill: 'rgba(255,255,255,0.08)', r: 15,
          stroke: 'rgba(255,255,255,0.30)', sw: 2.5 })}
        ${glyph(ic, cx - 12, ty + 16, 24, OR)}
        ${lab(cx, ty + 78, label, 'rgba(255,255,255,0.55)', { a: 'middle', size: 9, ls: 0.45 })}
        <animate attributeName="opacity" values="0.45;1;0.45;0.45" keyTimes="0;0.16;0.34;1"
          dur="9s" begin="${i * 3}s" repeatCount="indefinite"/>
      </g>`;
    }).join('')}
    <rect width="${W}" height="${H}" fill="#000" opacity="0.2"/>
    <circle cx="${W / 2}" cy="${H / 2}" r="56" fill="${WHITE}" opacity="0.2"/>
    <circle cx="${W / 2}" cy="${H / 2}" r="40" fill="rgba(255,255,255,0.10)"/>
    ${tri(W / 2 + 2, H / 2, 20)}
    <defs><linearGradient id="${uid}-cap" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#000" stop-opacity="0.8"/>
      <stop offset="0.55" stop-color="#000" stop-opacity="0.4"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></defs>
    <rect x="0" y="${H - 108}" width="${W}" height="108" fill="url(#${uid}-cap)"/>
    ${t(24, H - 66, TITLE, { size: 17, w: 600, fill: WHITE })}
    ${t(24, H - 46, `Complete step-by-step installation guide \u2022 ${DUR}`,
      { size: 12.5, fill: 'rgba(255,255,255,0.9)' })}
    ${osChips(24, H - 34)}
    ${rect(W - 68, 16, 52, 22, { fill: '#DC2626', r: 6 })}
    ${lab(W - 42, 31, 'VIDEO', WHITE, { a: 'middle', size: 9.5, ls: 0.5 })}`,
    { cls: 'igc-flat' }),
};

/* ══ 1 · One Big Button ═══════════════════════════════════════════════════ */
export const oneBigButton = {
  id: 'ig-one',
  name: 'One Big Button',
  family: 'Pure CTA',
  tagline: 'Stop decorating, start asking',
  desc:
    'The most direct reading of the brief. No scrim, no overlay, no competing artwork: a calm dark ' +
    'ground with the page\u2019s own dot grid and a single orange pill reading "Watch the 3:24 ' +
    'walkthrough", with a breathing halo behind it. The title sits above, the platform chips and the ' +
    'runtime sit in the bottom corners, and an inset frame pulses to say the whole rectangle is one ' +
    'button. Nothing is hidden behind anything else.',
  pros: ['Impossible to misread — one action, one target', 'Fastest thing on the board to build',
    'Reads perfectly at phone width', 'The pill is a real label, not a bare glyph'],
  cons: ['Says nothing about what the video contains', 'Least distinctive of the ten'],
  scores: { story: 3, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => mk(uid, `Watch the ${DUR} installation walkthrough`, `
    ${ground(uid)}
    ${bloom(uid, W / 2, 168, 182, 6)}
    ${lab(W / 2, 74, 'OPENLINE INSTALLATION GUIDE', 'rgba(255,255,255,0.42)', { a: 'middle', size: 9 })}
    ${t(W / 2, 112, TITLE, { size: 21, w: 700, a: 'middle', fill: WHITE })}
    ${ctaPill(W / 2, 176, `Watch the ${DUR} walkthrough`)}
    ${tapHint(W / 2, 226)}
    ${osChips(22, H - 42)}
    ${durChip(W - 74, H - 43)}
    ${liveFrame()}`),
};

/* ══ 2 · Three Steps, Sequenced ═══════════════════════════════════════════ */
export const stepsSequenced = {
  id: 'ig-steps',
  name: 'Three Steps, Sequenced',
  family: 'Fix the current',
  tagline: 'Same idea, nothing covered up',
  desc:
    'The conservative option: keep the three-step story that already exists and simply stop burying ' +
    'it. The tiles move up onto a connected rail with a travelling dot, each one lighting in turn ' +
    'with its label legible, and the play affordance moves down into a solid bar of its own at the ' +
    'bottom — so the call to action and the artwork occupy different space instead of fighting for ' +
    'the centre. This is the current design with the collision and the scrim removed.',
  pros: ['Keeps the existing three-step narrative intact', 'No overlap and no scrim, so the orange stays orange',
    'Smallest visual departure — easiest to approve', 'The bottom bar gives the CTA a permanent home'],
  cons: ['Still fundamentally the current concept', 'The rail eats width on small phones'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => mk(uid, `Play the ${DUR} installation video`, `
    ${ground(uid)}
    ${bloom(uid, W / 2, 118, 148)}
    ${lab(28, 46, 'THREE STEPS, ABOUT A MINUTE', 'rgba(255,255,255,0.42)', { size: 9 })}
    ${rect(96, 128, W - 192, 2, { fill: 'rgba(255,255,255,0.14)', r: 1 })}
    <circle cx="96" cy="129" r="4" fill="${OR}">
      <animate attributeName="cx" values="96;${W - 96};${W - 96}" keyTimes="0;0.82;1"
        dur="9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.82;1"
        dur="9s" repeatCount="indefinite"/>
    </circle>
    ${STEPS.map(([label, ic], i) => {
      const cx = 96 + i * ((W - 192) / 2);
      return `<g>
        ${rect(cx - 27, 102, 54, 54, { fill: DARK2, r: 15, stroke: 'rgba(255,255,255,0.22)', sw: 1.5 })}
        <rect x="${cx - 27}" y="102" width="54" height="54" rx="15" fill="rgba(255,83,20,0.16)"
          stroke="${OR}" stroke-width="2" opacity="0">
          <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.04;0.28;0.33;1"
            dur="9s" begin="${i * 3}s" repeatCount="indefinite"/>
        </rect>
        ${glyph(ic, cx - 11, 118, 22, OR)}
        ${lab(cx, 178, label, 'rgba(255,255,255,0.62)', { a: 'middle', size: 8.5, ls: 0.5 })}
        ${lab(cx, 194, `STEP ${i + 1}`, 'rgba(255,255,255,0.28)', { a: 'middle', size: 8, ls: 1 })}
      </g>`;
    }).join('')}
    ${rect(0, H - 66, W, 66, { fill: 'rgba(255,255,255,0.05)', r: 0 })}
    ${rect(0, H - 66, W, 1, { fill: 'rgba(255,255,255,0.12)', r: 0 })}
    ${t(24, H - 36, 'Watch the full walkthrough', { size: 15, w: 700, fill: WHITE })}
    ${lab(24, H - 18, `${DUR} \u00B7 IPHONE & ANDROID \u00B7 TAP ANYWHERE`, 'rgba(255,255,255,0.4)', { size: 8.5 })}
    ${rect(W - 128, H - 48, 104, 34, { fill: OR, r: 17 })}
    <circle cx="${W - 108}" cy="${H - 31}" r="9" fill="rgba(255,255,255,0.24)"/>
    ${tri(W - 107.5, H - 31, 6.5)}
    ${t(W - 93, H - 26, 'Play now', { size: 13, w: 700, fill: WHITE })}
    ${liveFrame()}`),
};

/* ══ 3 · Chapter Deck ═════════════════════════════════════════════════════ */
const CHAPS = [['0:00', 'Before you start'], ['0:34', 'Scan the QR code'],
  ['1:52', 'Add the eSIM profile'], ['2:48', "You're online"]];

export const chapterDeck = {
  id: 'ig-chapters',
  name: 'Chapter Deck',
  family: 'Informational',
  tagline: 'Show what is actually in the video',
  desc:
    'A placeholder that earns the click by answering "what will I get?". The four chapters of the ' +
    'video are listed with real timecodes, and the active row slides its orange marker down the list ' +
    'on a loop, previewing the shape of the thing. The left column carries the title and the CTA. ' +
    'Someone who has already scanned their code can see the video covers the bit they are stuck on, ' +
    'which a bare play button can never tell them.',
  pros: ['Sets expectations before the click, so fewer bounces',
    'Doubles as a contents list for people who only need one step',
    'Timecodes read as a real, produced video', 'No artwork to license or draw'],
  cons: ['Text-dense for a hero', 'Chapter labels must stay in sync with the real edit',
    'Four rows is tight at phone width'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 3, brand: 3, ease: 4 },
  build: (uid) => mk(uid, `Play the ${DUR} installation video from the start`, `
    ${ground(uid, { a: 'rgba(255,83,20,0.16)' })}
    ${bloom(uid, 120, 150, 150, 8)}
    ${lab(30, 52, `4 CHAPTERS \u00B7 ${DUR}`, 'rgba(255,255,255,0.42)', { size: 9 })}
    ${t(30, 90, 'How to install', { size: 22, w: 700, fill: WHITE })}
    ${t(30, 118, 'your Openline eSIM', { size: 22, w: 700, fill: OR })}
    ${t(30, 150, 'Every step, start to finish.', { size: 12.5, fill: 'rgba(255,255,255,0.5)' })}
    ${rect(30, 176, 176, 42, { fill: OR, r: 21 })}
    <circle cx="52" cy="197" r="10" fill="rgba(255,255,255,0.24)"/>
    ${tri(52.5, 197, 7)}
    ${t(70, 202, 'Play from 0:00', { size: 13.5, w: 700, fill: WHITE })}
    ${lab(30, 246, 'OR TAP ANY CHAPTER', 'rgba(255,255,255,0.34)', { size: 8.5 })}
    ${rect(258, 44, 292, 236, { fill: 'rgba(255,255,255,0.04)', r: 16,
      stroke: 'rgba(255,255,255,0.10)' })}
    ${CHAPS.map(([tc, name], i) => {
      const y = 62 + i * 56;
      return `<g>
        <rect x="270" y="${y}" width="268" height="46" rx="11" fill="rgba(255,83,20,0.14)"
          stroke="${OR}" stroke-width="1.5" opacity="0">
          <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.03;0.22;0.25;1"
            dur="11.2s" begin="${i * 2.8}s" repeatCount="indefinite"/>
        </rect>
        ${lab(288, y + 21, tc, OR, { size: 10.5, ls: 0.4 })}
        ${t(288, y + 37, name, { size: 13.5, w: 600, fill: 'rgba(255,255,255,0.88)' })}
        ${lab(522, y + 28, `0${i + 1}`, 'rgba(255,255,255,0.22)', { a: 'end', size: 11 })}
      </g>`;
    }).join('')}
    ${liveFrame()}`),
};

/* ══ 4 · Phone Screen Live ════════════════════════════════════════════════ */
export const phoneLive = {
  id: 'ig-phone',
  name: 'Phone Screen Live',
  family: 'Product demo',
  tagline: 'The poster frame is the install itself',
  desc:
    'Instead of a symbol for the video, the placeholder plays the shortest possible version of it: a ' +
    'phone on the left runs the actual sequence — QR code appears, the "Add eSIM" sheet slides up, ' +
    'the signal bars fill and a tick lands. The right column names the three steps and carries the ' +
    'CTA. It demonstrates that the install is genuinely three taps, which is the single most ' +
    'persuasive thing this page has to say.',
  pros: ['Proves the claim instead of asserting it', 'Reuses the phone language from the rest of the page',
    'The loop is a complete story in six seconds', 'Strongest at reducing pre-purchase anxiety'],
  cons: ['Most animation to maintain of any option here',
    'The phone chrome must not look like one specific OS', 'Busiest option at small sizes'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 3, brand: 5, ease: 2 },
  build: (uid) => {
    const px = 60, py = 46, pw = 116, ph = 232;
    const sx = px + 8, sy = py + 10, sw = pw - 16, sh = ph - 20;
    const screens = [
      /* 1 · the QR code */
      `${rect(sx, sy, sw, sh, { fill: '#0F1218', r: 12 })}
       ${lab(sx + sw / 2, sy + 30, 'YOUR QR CODE', 'rgba(255,255,255,0.4)', { a: 'middle', size: 7.5 })}
       ${rect(sx + 18, sy + 44, sw - 36, sw - 36, { fill: WHITE, r: 8 })}
       ${glyph(QR, sx + sw / 2 - 22, sy + 52, 44, INK, 2.2)}
       ${lab(sx + sw / 2, sy + sw + 34, 'SCAN IT', OR, { a: 'middle', size: 8 })}`,
      /* 2 · the add-eSIM sheet */
      `${rect(sx, sy, sw, sh, { fill: '#0F1218', r: 12 })}
       ${rect(sx, sy + 74, sw, sh - 74, { fill: '#1C212B', r: 12 })}
       ${rect(sx + sw / 2 - 16, sy + 84, 32, 3, { fill: 'rgba(255,255,255,0.3)', r: 2 })}
       ${t(sx + 14, sy + 114, 'Add eSIM?', { size: 12.5, w: 700, fill: WHITE })}
       ${lab(sx + 14, sy + 132, 'OPENLINE', 'rgba(255,255,255,0.42)', { size: 7.5 })}
       ${rect(sx + 14, sy + 146, sw - 28, 30, { fill: OR, r: 15 })}
       ${t(sx + sw / 2, sy + 166, 'Add', { size: 12, w: 700, a: 'middle', fill: WHITE })}
       ${rect(sx + 14, sy + 182, sw - 28, 26, { fill: 'rgba(255,255,255,0.08)', r: 13 })}
       ${t(sx + sw / 2, sy + 199, 'Not now', { size: 11, a: 'middle', fill: 'rgba(255,255,255,0.45)' })}`,
      /* 3 · online */
      `${rect(sx, sy, sw, sh, { fill: '#0F1218', r: 12 })}
       ${glyph(WIFI, sx + sw / 2 - 21, sy + 62, 42, OR, 2.4)}
       <circle cx="${sx + sw / 2}" cy="${sy + 134}" r="17" fill="rgba(47,163,122,0.18)"
         stroke="#2FA37A" stroke-width="1.6"/>
       ${glyph(CHECK, sx + sw / 2 - 9, sy + 125, 18, '#2FA37A', 3)}
       ${t(sx + sw / 2, sy + 176, "You're online", { size: 12.5, w: 700, a: 'middle', fill: WHITE })}
       ${lab(sx + sw / 2, sy + 194, '190+ COUNTRIES', 'rgba(255,255,255,0.4)', { a: 'middle', size: 7.5 })}`,
    ];
    return mk(uid, `Play the ${DUR} installation video`, `
      ${ground(uid)}
      ${bloom(uid, px + pw / 2, H / 2, 160, 6)}
      ${rect(px, py, pw, ph, { fill: '#05070B', r: 20, stroke: 'rgba(255,255,255,0.22)', sw: 2 })}
      ${rect(px + pw / 2 - 17, py + 4, 34, 4, { fill: 'rgba(255,255,255,0.18)', r: 2 })}
      ${cycle(screens, 8.4)}
      ${lab(238, 58, 'WHAT THE VIDEO SHOWS', 'rgba(255,255,255,0.42)', { size: 9 })}
      ${t(238, 92, 'Three taps and', { size: 20, w: 700, fill: WHITE })}
      ${t(238, 118, "you're connected", { size: 20, w: 700, fill: OR })}
      ${NICE.map((label, i) => `
        <g>
          <circle cx="248" cy="${152 + i * 28}" r="8" fill="rgba(255,83,20,0.16)" stroke="${OR}"
            stroke-width="1.4"/>
          ${t(248, 156 + i * 28, String(i + 1),
            { size: 9.5, w: 700, a: 'middle', fill: OR, m: true })}
          ${t(266, 157 + i * 28, label, { size: 12.5, w: 600, fill: 'rgba(255,255,255,0.8)' })}
        </g>`).join('')}
      ${rect(238, 248, 200, 40, { fill: OR, r: 20 })}
      <circle cx="259" cy="268" r="9.5" fill="rgba(255,255,255,0.24)"/>
      ${tri(259.5, 268, 7)}
      ${t(276, 273, `Watch it \u00B7 ${DUR}`, { size: 13, w: 700, fill: WHITE })}
      ${tapHint(W - 24, H - 22, { a: 'end', text: 'TAP ANYWHERE', op: 0.36 })}
      ${liveFrame()}`);
  },
};

/* ══ 5 · Filmstrip ═══════════════════════════════════════════════════════ */
export const filmstrip = {
  id: 'ig-strip',
  name: 'Filmstrip',
  family: 'Player language',
  tagline: 'Four frames and a rail that fills',
  desc:
    'Borrows the grammar of a real player without a scrim in sight. Four poster frames run along the ' +
    'bottom as thumbnails with a progress rail filling beneath them, and the large panel above ' +
    'cross-fades to whichever frame is current. It looks like something that is already playing and ' +
    'has simply been paused for you, and the filled rail gives the loop a clear beginning and end.',
  pros: ['Unmistakably a video, with no play glyph needed over the art',
    'The rail communicates length better than a printed runtime', 'Four frames preview the whole edit',
    'Thumbnails give four separate hit targets later if wanted'],
  cons: ['Needs four frames drawn and kept current', 'Thumbnail row is the first thing to break on mobile'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const fx = 24, fy = 40, fw = W - 48, fh = 172;
    const frames = [
      [QR, 'SCAN THE CODE', '0:34', 'Scan the code'],
      [PHONE, 'ADD THE ESIM', '1:52', 'Add the eSIM'],
      [WIFI, "YOU'RE ONLINE", '2:48', "You're online"],
      [CHECK, 'READY TO TRAVEL', '3:24', 'Ready to travel'],
    ];
    const big = frames.map(([ic, , , nice]) => `
      ${rect(fx, fy, fw, fh, { fill: DARK2, r: 14 })}
      ${glyph(ic, W / 2 - 30, fy + 40, 60, OR, 2)}
      ${t(W / 2, fy + 134, nice, { size: 17, w: 700, a: 'middle', fill: WHITE })}`);
    return mk(uid, `Play the ${DUR} installation video`, `
      ${ground(uid)}
      ${bloom(uid, W / 2, 120, 168, 6)}
      ${cycle(big, 12)}
      ${rect(fx, fy, fw, fh, { stroke: 'rgba(255,255,255,0.12)', r: 14 })}
      ${rect(fx + 14, fy + 14, 96, 24, { fill: 'rgba(0,0,0,0.45)', r: 7 })}
      ${lab(fx + 62, fy + 30, 'TAP TO PLAY', WHITE, { a: 'middle', size: 9 })}
      ${durChip(W - 90, fy + 14, { bg: 'rgba(0,0,0,0.45)' })}
      ${rail(fx, fy + fh + 14, fw, 12)}
      ${frames.map(([ic, cap, tc], i) => {
        const tw = (fw - 3 * 12) / 4, x = fx + i * (tw + 12), y = fy + fh + 30;
        return `<g>
          ${rect(x, y, tw, 56, { fill: 'rgba(255,255,255,0.05)', r: 9,
            stroke: 'rgba(255,255,255,0.10)' })}
          <rect x="${x}" y="${y}" width="${tw}" height="56" rx="9" fill="rgba(255,83,20,0.12)"
            stroke="${OR}" stroke-width="1.6" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.03;0.22;0.26;1"
              dur="12s" begin="${i * 3}s" repeatCount="indefinite"/>
          </rect>
          ${glyph(ic, x + 12, y + 14, 20, OR, 2)}
          ${lab(x + 40, y + 24, tc, 'rgba(255,255,255,0.75)', { size: 9.5, ls: 0.4 })}
          ${lab(x + 40, y + 40, cap, 'rgba(255,255,255,0.4)', { size: 7.5, ls: 0.5 })}
        </g>`;
      }).join('')}
      ${liveFrame()}`);
  },
};

/* ══ 6 · Thirty Seconds ══════════════════════════════════════════════════ */
export const thirtySeconds = {
  id: 'ig-thirty',
  name: 'Thirty Seconds',
  family: 'Claim-led',
  tagline: 'Borrow the page\u2019s own promise',
  desc:
    'The hero above this box already claims "30s Setup" and then does nothing with it. This option ' +
    'makes that claim the artwork: a ring drains around a counter ticking 30 down to 0, with the line ' +
    '"most people are online before this finishes" beside it and the CTA underneath. The countdown is ' +
    'the reason to watch — it reframes a three-minute video as proof that the thing it describes ' +
    'takes half a minute.',
  pros: ['Turns an existing, unused claim into the hook',
    'A counter is the cheapest animation that still feels alive',
    'Sells the product, not just the video', 'Very legible at any size'],
  cons: ['A 30-second promise beside a 3:24 runtime needs careful copy',
    'Claim must survive legal review', 'One idea only — no preview of content'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const cx = 132, cy = 152, r = 62, C = 2 * Math.PI * r;
    const nums = Array.from({ length: 16 }, (_, i) => 30 - i * 2);
    const kt = nums.map((_, i) => (i / nums.length).toFixed(4)).concat('1').join(';');
    return mk(uid, `Watch the ${DUR} installation walkthrough`, `
      ${ground(uid)}
      ${bloom(uid, cx, cy, 148, 6)}
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.12)"
        stroke-width="7"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${OR}" stroke-width="7"
        stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}"
        transform="rotate(-90 ${cx} ${cy})">
        <animate attributeName="stroke-dashoffset" values="0;${C.toFixed(1)}" keyTimes="0;1"
          dur="8s" repeatCount="indefinite"/>
      </circle>
      <text x="${cx}" y="${cy + 12}" font-family="${MO}" font-size="42" font-weight="700"
        fill="${WHITE}" text-anchor="middle">
        ${nums.map((n, i) => `<tspan x="${cx}" opacity="0">${n}<animate attributeName="opacity"
          values="${nums.map((_, j) => (j === i ? '1' : '0')).join(';')};${i === 0 ? '1' : '0'}"
          keyTimes="${kt}" dur="8s" repeatCount="indefinite" calcMode="discrete"/></tspan>`).join('')}
      </text>
      ${lab(cx, cy + 34, 'SECONDS', 'rgba(255,255,255,0.45)', { a: 'middle', size: 9 })}
      ${lab(250, 76, 'WHY THIS IS WORTH 3 MINUTES', 'rgba(255,255,255,0.42)', { size: 9 })}
      ${t(250, 112, 'Most people are', { size: 19, w: 700, fill: WHITE })}
      ${t(250, 138, 'online before this', { size: 19, w: 700, fill: WHITE })}
      ${t(250, 164, 'countdown ends.', { size: 19, w: 700, fill: OR })}
      ${t(250, 194, 'The video shows all three steps,', { size: 12.5, fill: 'rgba(255,255,255,0.5)' })}
      ${t(250, 212, 'for iPhone and Android.', { size: 12.5, fill: 'rgba(255,255,255,0.5)' })}
      ${rect(250, 234, 230, 42, { fill: OR, r: 21 })}
      <circle cx="272" cy="255" r="10" fill="rgba(255,255,255,0.24)"/>
      ${tri(272.5, 255, 7)}
      ${t(290, 260, `Watch the walkthrough`, { size: 13, w: 700, fill: WHITE })}
      ${tapHint(cx, 246, { text: 'TAP ANYWHERE', op: 0.34 })}
      ${liveFrame()}`);
  },
};

/* ══ 7 · Caption Track ═══════════════════════════════════════════════════ */
export const captionTrack = {
  id: 'ig-captions',
  name: 'Caption Track',
  family: 'Editorial',
  tagline: 'Let the narration do the selling',
  desc:
    'The placeholder shows the video\u2019s subtitles, one line at a time, over a calm ground with a ' +
    'waveform ticking along the bottom. It is the only option that carries the presenter\u2019s actual ' +
    'voice, which does more to make a support video feel human than any icon can. It also reads as an ' +
    'accessibility signal: this video is captioned, so you can watch it on a train with the sound off.',
  pros: ['The copy does the work — nothing to illustrate',
    'Signals captions, which matters on a support page', 'Cheapest option here to localise into nine languages',
    'Quietly distinctive; no one in the category does this'],
  cons: ['Needs the real transcript to stay honest', 'Cross-fading text can be hard to read on a bumpy scroll',
    'No visual preview of the interface'],
  scores: { story: 4, motion: 3, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const lines = [
      'First, find the email with your QR code.',
      'Open the camera, point it at the code.',
      'Tap "Add eSIM" when your phone asks.',
      "That's it — you're online in 190 countries.",
    ];
    const caps = lines.map(s => `${t(W / 2, 152, s, { size: 18, w: 600, a: 'middle', fill: WHITE })}`);
    return mk(uid, `Play the ${DUR} captioned installation video`, `
      ${ground(uid, { a: 'rgba(255,83,20,0.14)' })}
      ${bloom(uid, W / 2, 150, 176, 8)}
      ${rect(W / 2 - 34, 62, 68, 24, { fill: 'rgba(255,255,255,0.10)', r: 7,
        stroke: 'rgba(255,255,255,0.22)' })}
      ${lab(W / 2, 78, 'CC \u00B7 EN', 'rgba(255,255,255,0.72)', { a: 'middle', size: 9.5 })}
      ${lab(W / 2, 112, 'FROM THE WALKTHROUGH', 'rgba(255,255,255,0.36)', { a: 'middle', size: 8.5 })}
      ${cycle(caps, 12.8)}
      ${Array.from({ length: 34 }, (_, i) => {
        const bx = W / 2 - 170 + i * 10.2;
        const h0 = 4 + ((i * 7) % 11), h1 = 5 + ((i * 13) % 24);
        return `<rect x="${bx.toFixed(1)}" y="${(196 - h0 / 2).toFixed(1)}" width="4"
          height="${h0}" rx="2" fill="${OR}" opacity="0.5">
          <animate attributeName="height" values="${h0};${h1};${h0}" keyTimes="0;0.5;1"
            dur="${(1.1 + (i % 5) * 0.16).toFixed(2)}s" repeatCount="indefinite"/>
          <animate attributeName="y" values="${(196 - h0 / 2).toFixed(1)};${(196 - h1 / 2).toFixed(1)};${(196 - h0 / 2).toFixed(1)}"
            keyTimes="0;0.5;1" dur="${(1.1 + (i % 5) * 0.16).toFixed(2)}s" repeatCount="indefinite"/>
        </rect>`;
      }).join('')}
      ${ctaPill(W / 2, 250, `Play with sound \u00B7 ${DUR}`, { w: 258, h: 44 })}
      ${tapHint(W / 2, 292, { op: 0.34 })}
      ${liveFrame()}`);
  },
};

/* ══ 8 · Two Lanes ═══════════════════════════════════════════════════════ */
export const twoLanes = {
  id: 'ig-lanes',
  name: 'Two Lanes',
  family: 'Answer the question',
  tagline: 'iPhone on the left, Android on the right',
  desc:
    'The current card asserts "iPhone" and "Android" as two small chips and leaves it there. This ' +
    'option makes the split the whole composition: each half runs its own platform\u2019s settings ' +
    'screen with its own OS version requirement, and a single CTA bar spans both at the bottom. The ' +
    'first question anyone brings to an installation guide is "will this match what I am looking at?", ' +
    'and this is the only option that answers it before the click.',
  pros: ['Answers the real pre-click question directly',
    'Carries the iOS 12.1 / Android 9.0 requirements the page states lower down',
    'One CTA spanning both halves keeps it a single button',
    'Symmetry makes it the tidiest option on the board'],
  cons: ['Two mini interfaces to keep plausible without copying either OS',
    'The split wants to become two buttons — it must not',
    'Least room for a title'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const lane = (x0, name, ver, tint, i) => {
      const cx = x0 + 144;
      return `
        ${rect(x0 + 16, 58, 256, 148, { fill: tint, r: 14, stroke: 'rgba(255,255,255,0.10)' })}
        ${lab(cx, 84, name.toUpperCase(), 'rgba(255,255,255,0.5)', { a: 'middle', size: 9.5 })}
        ${rect(cx - 52, 96, 104, 26, { fill: 'rgba(255,255,255,0.06)', r: 7 })}
        ${lab(cx, 113, ver, 'rgba(255,255,255,0.6)', { a: 'middle', size: 8.5, ls: 0.4 })}
        ${[0, 1, 2].map(k => `
          <rect x="${cx - 76}" y="${134 + k * 22}" width="152" height="16" rx="5"
            fill="rgba(255,255,255,0.07)"/>
          <rect x="${cx - 76}" y="${134 + k * 22}" width="152" height="16" rx="5"
            fill="rgba(255,83,20,0.24)" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.05;0.24;0.3;1"
              dur="6.6s" begin="${(i * 0.9 + k * 2.2).toFixed(2)}s" repeatCount="indefinite"/>
          </rect>
          <rect x="${cx - 70}" y="${139 + k * 22}" width="${44 + k * 18}" height="6" rx="3"
            fill="rgba(255,255,255,0.28)"/>`).join('')}`;
    };
    return mk(uid, `Play the ${DUR} installation video for iPhone and Android`, `
      ${ground(uid)}
      ${bloom(uid, W / 2, 130, 190, 7)}
      ${lab(W / 2, 40, 'ONE VIDEO, BOTH PHONES', 'rgba(255,255,255,0.42)', { a: 'middle', size: 9 })}
      ${lane(0, 'iPhone', 'iOS 12.1 OR LATER', 'rgba(255,255,255,0.045)', 0)}
      ${lane(W / 2, 'Android', 'ANDROID 9.0 OR LATER', 'rgba(255,83,20,0.07)', 1)}
      ${rect(W / 2 - 0.5, 58, 1, 148, { fill: 'rgba(255,255,255,0.10)', r: 0 })}
      ${rect(W / 2 - 15, 124, 30, 22, { fill: DARK2, r: 7, stroke: 'rgba(255,255,255,0.16)' })}
      ${t(W / 2, 140, '&', { size: 13, w: 700, a: 'middle', fill: 'rgba(255,255,255,0.5)' })}
      ${ctaPill(W / 2, 244, `Watch the walkthrough \u00B7 ${DUR}`, { w: 300, h: 46 })}
      ${tapHint(W / 2, 290, { op: 0.34 })}
      ${liveFrame()}`);
  },
};

/* ══ 9 · Daylight ════════════════════════════════════════════════════════ */
export const daylight = {
  id: 'ig-light',
  name: 'Daylight',
  family: 'Light minimal',
  tagline: 'The only option that suits a white page',
  desc:
    'Every other option here, and the current design, drops a dark rectangle into the middle of a ' +
    'white, orange-accented page. This one does not: a warm off-white ground, a thin orange ring that ' +
    'draws itself around a solid play disc, dark type for the title, and a hairline border instead of ' +
    'a heavy one. It sits inside the page rather than punching a hole in it, and it is the calmest ' +
    'thing on the board by a distance.',
  pros: ['Actually matches the page it lives on', 'Highest contrast title of any option',
    'Reads beautifully on a phone', 'No scrim, no gradient, nothing to dull'],
  cons: ['A white video poster is unusual and may read as "not a video"',
    'Loses the cinematic quality of a dark cover', 'Relies entirely on typography to hold interest'],
  scores: { story: 3, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 5 },
  build: (uid) => {
    const cx = W / 2, cy = 124, r = 44, C = 2 * Math.PI * r;
    return mk(uid, `Watch the ${DUR} installation walkthrough`, `
      <defs>
        <linearGradient id="${uid}-lg" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stop-color="#FFFFFF"/>
          <stop offset="1" stop-color="${ORW}"/>
        </linearGradient>
        <pattern id="${uid}-ld" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(255,83,20,0.13)"/>
        </pattern>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#${uid}-lg)"/>
      <rect width="${W}" height="${H}" fill="url(#${uid}-ld)"/>
      <circle cx="${cx}" cy="${cy}" r="${r + 16}" fill="${OR}" opacity="0.08">
        <animate attributeName="opacity" values="0.05;0.14;0.05" keyTimes="0;0.5;1" dur="3.4s"
          repeatCount="indefinite"/>
      </circle>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,83,20,0.20)"
        stroke-width="2.5"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${OR}" stroke-width="2.5"
        stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}"
        transform="rotate(-90 ${cx} ${cy})">
        <animate attributeName="stroke-dashoffset" values="${C.toFixed(1)};0;0" keyTimes="0;0.72;1"
          dur="5.2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="${cx}" cy="${cy}" r="26" fill="${OR}"/>
      ${tri(cx + 1.5, cy, 11)}
      ${t(cx, 204, TITLE, { size: 21, w: 700, a: 'middle', fill: '#0B0B0F' })}
      ${t(cx, 228, `Three steps \u00B7 iPhone and Android \u00B7 ${DUR}`,
        { size: 13, a: 'middle', fill: MUT })}
      ${rect(cx - 96, 246, 192, 38, { fill: OR, r: 19 })}
      ${t(cx, 270, 'Watch the walkthrough', { size: 13, w: 700, a: 'middle', fill: WHITE })}
      ${tapHint(cx, 302, { fill: MUT, op: 1, text: 'TAP ANYWHERE ON THIS CARD' })}
      ${rect(1, 1, W - 2, H - 2, { stroke: 'rgba(255,83,20,0.28)', sw: 1.5, r: 15 })}`);
  },
};

/* ══ 10 · Signal Sweep ═══════════════════════════════════════════════════ */
export const signalSweep = {
  id: 'ig-sweep',
  name: 'Signal Sweep',
  family: 'Brand motion',
  tagline: 'Connection, as a single gesture',
  desc:
    'One idea, executed large: rings of signal push outward from the play mark at the centre, the way ' +
    'coverage spreads. It is the most graphic option on the board and the most obviously "Openline" — ' +
    'the motion is the product. The title and runtime sit in opposite bottom corners, well clear of ' +
    'the centre, so the play mark is never covered by anything the way it is today.',
  pros: ['The motion means something — coverage spreading outward',
    'Nothing overlaps the play mark', 'Scales down to a phone without losing the idea',
    'Cheap: four circles and an opacity loop'],
  cons: ['Says nothing about what is in the video',
    'Expanding rings are a common motif in connectivity marketing',
    'Radial motion can feel restless behind body copy'],
  scores: { story: 3, motion: 5, perf: 5, mobile: 5, brand: 5, ease: 5 },
  build: (uid) => {
    const cx = W / 2, cy = 142;
    return mk(uid, `Play the ${DUR} installation video`, `
      ${ground(uid)}
      ${bloom(uid, cx, cy, 160, 5.5)}
      ${[0, 1, 2, 3].map(i => `
        <circle cx="${cx}" cy="${cy}" r="30" fill="none" stroke="${OR}" stroke-width="1.6"
          opacity="0">
          <animate attributeName="r" values="30;128" keyTimes="0;1" dur="4.4s"
            begin="${(i * 1.1).toFixed(2)}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.65;0.5;0" keyTimes="0;0.4;1" dur="4.4s"
            begin="${(i * 1.1).toFixed(2)}s" repeatCount="indefinite"/>
          <animate attributeName="stroke-width" values="2.2;0.6" keyTimes="0;1" dur="4.4s"
            begin="${(i * 1.1).toFixed(2)}s" repeatCount="indefinite"/>
        </circle>`).join('')}
      <circle cx="${cx}" cy="${cy}" r="38" fill="rgba(255,83,20,0.14)" stroke="${OR}"
        stroke-width="2"/>
      <circle cx="${cx}" cy="${cy}" r="27" fill="${OR}"/>
      ${tri(cx + 1.5, cy, 12)}
      ${lab(cx, 226, 'TAP ANYWHERE TO PLAY', 'rgba(255,255,255,0.55)', { a: 'middle', size: 9.5, ls: 1.8 })}
      ${rect(0, H - 62, W, 1, { fill: 'rgba(255,255,255,0.10)', r: 0 })}
      ${t(24, H - 34, TITLE, { size: 14.5, w: 700, fill: WHITE })}
      ${lab(24, H - 16, 'IPHONE & ANDROID \u00B7 THREE STEPS', 'rgba(255,255,255,0.38)', { size: 8.5 })}
      ${durChip(W - 76, H - 43)}
      ${liveFrame()}`);
  },
};

export const INSTALL_VARIANTS = [
  igCurrent, oneBigButton, stepsSequenced, chapterDeck, phoneLive, filmstrip,
  thirtySeconds, captionTrack, twoLanes, daylight, signalSweep,
];

export const INSTALL_BOX = { w: W, h: H };
