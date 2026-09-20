/* ══ /login · the "Aloha!" icon ════════════════════════════════════════
   Measured on the live page: a 56×56 badge, rounded-2xl (16px), filled with
   a gradient from primary/10 to primary/5, holding a 34×34 SVG drawn on a
   0 0 64 64 viewBox. Every icon below is built to exactly that, so it drops
   straight into the existing badge with no other change.

   All motion is SMIL so the icons are self-contained — no stylesheet, no
   keyframe names to collide, nothing to register globally.               */

const O = '#FF5314';
const OD = '#E23D00';
const OL = '#FFA277';
const INK = '#1A1A22';
const W = '#FFFFFF';
const GRN = '#16A34A';
const AMB = '#F59E0B';

/* every icon is drawn inside this, so stroke weights stay consistent */
const S = (inner) => `<svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true"
  fill="none" stroke-linecap="round" stroke-linejoin="round" style="overflow:visible">${inner}</svg>`;

/* ── 0 · CURRENT ───────────────────────────────────────────────────── */
export const icCurrent = {
  id: 'ic-current',
  name: 'Current — Hula',
  family: 'Live today',
  note: 'A small figure swaying with both arms raising and lowering. Charming, and the only one of these that already exists. The figure is small in the badge and the sway and the arms run on separate timings, so it can read as a wobble rather than a greeting.',
  svg: (uid) => S(`
    <g transform="translate(32 34)">
      <g>
        <animateTransform attributeName="transform" type="rotate" values="-5;5;-5" dur="2.6s" repeatCount="indefinite"/>
        <circle cy="-16" r="7" fill="${INK}"/>
        <path d="M 0 -9 L -7 14 L 7 14 Z" fill="${O}"/>
        <path d="M 0 -6 L -13 4" stroke="${INK}" stroke-width="4">
          <animateTransform attributeName="transform" type="rotate" values="0;-58;-58;0" keyTimes="0;0.35;0.65;1" dur="2.2s" repeatCount="indefinite"/>
        </path>
        <path d="M 0 -6 L 13 4" stroke="${INK}" stroke-width="4">
          <animateTransform attributeName="transform" type="rotate" values="0;58;58;0" keyTimes="0;0.35;0.65;1" dur="2.2s" repeatCount="indefinite"/>
        </path>
      </g>
    </g>`),
};

/* ── 1 · SHAKA ─────────────────────────────────────────────────────── */
export const icShaka = {
  id: 'ic-shaka',
  name: 'Shaka',
  family: 'Greeting',
  note: 'The thumb-and-little-finger hang-loose sign, rocking side to side. It is the most literal translation of "Aloha" into a gesture, it fills the badge properly, and it reads at 34px because it is one solid shape.',
  svg: (uid) => S(`
    <g transform="translate(31 34)">
      <g>
        <animateTransform attributeName="transform" type="rotate" values="-13;13;-13" dur="1.7s" repeatCount="indefinite"/>
        <!-- thumb out to the left, little finger straight up: an L, which reads as a hand at 34px -->
        <path d="M -8 3 H -22" stroke="${O}" stroke-width="9.6" stroke-linecap="round"/>
        <path d="M 7 -6 V -22" stroke="${O}" stroke-width="8.6" stroke-linecap="round"/>
        <circle cy="0" r="12" fill="${O}"/>
        <g stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round">
          <path d="M -8 3 H -22"/>
          <path d="M 7 -6 V -22"/>
          <circle cy="0" r="12"/>
        </g>
        <g stroke="${INK}" stroke-width="1.8" opacity="0.45" fill="none">
          <path d="M -5 -6 h 9 M -6 0 h 8 M -4 6 h 8"/>
        </g>
      </g>
    </g>`),
};

/* ── 2 · WAVING HAND ───────────────────────────────────────────────── */
export const icWave = {
  id: 'ic-wave',
  name: 'Waving Hand',
  family: 'Greeting',
  note: 'An open palm waving from the wrist, with three small motion arcs appearing on the outward swing. The most universally read "hello" there is, and the arcs make the motion obvious even at a glance.',
  svg: (uid) => S(`
    <g transform="translate(29 36)">
      <g style="transform-origin:0px 15px">
        <animateTransform attributeName="transform" type="rotate" values="-22;22;-22" dur="1.1s" repeatCount="indefinite"/>
        <g stroke="${O}" stroke-width="7" stroke-linecap="round">
          <path d="M -7 -2 V -15"/><path d="M -1 -3 V -18"/><path d="M 5 -2 V -15"/><path d="M 11 0 V -10"/>
        </g>
        <path d="M -10 5 L -19 -1" stroke="${O}" stroke-width="7" stroke-linecap="round"/>
        <rect x="-12" y="-4" width="26" height="22" rx="10" fill="${O}"/>
        <g stroke="${INK}" stroke-width="2.4" stroke-linecap="round" fill="none">
          <path d="M -12 8 v -12 a 10 10 0 0 1 4 -8"/>
          <path d="M 14 8 v -8"/>
          <path d="M -12 8 a 13 13 0 0 0 26 0"/>
        </g>
      </g>
      <g stroke="${OL}" stroke-width="3" fill="none">
        ${[0, 1, 2].map(i => `<path d="M ${22 + i * 6} ${-14 + i * 6} a ${9 + i * 4} ${9 + i * 4} 0 0 1 0 ${14 + i * 5}" opacity="0">
          <animate attributeName="opacity" values="0;0.9;0" dur="1.1s" begin="${i * 0.09}s" repeatCount="indefinite"/></path>`).join('')}
      </g>
    </g>`),
};

/* ── 3 · HIBISCUS ──────────────────────────────────────────────────── */
export const icHibiscus = {
  id: 'ic-hib',
  name: 'Hibiscus',
  family: 'Island',
  note: 'Five petals unfold from the centre and the whole flower turns slowly, with the stamen springing out last. It is the prettiest option here and the most recognisably Hawaiian without drawing a person.',
  svg: (uid) => S(`
    <g transform="translate(32 32)">
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="18s" repeatCount="indefinite"/>
        ${[0, 1, 2, 3, 4].map(i => `
          <g transform="rotate(${i * 72})">
            <path d="M 0 -4 C -10 -10 -11 -24 0 -26 C 11 -24 10 -10 0 -4 Z" fill="${i % 2 ? O : OD}" stroke="${INK}" stroke-width="2">
              <animateTransform attributeName="transform" type="scale" values="0.2;1.06;1" keyTimes="0;0.7;1"
                dur="0.5s" begin="${i * 0.11}s" fill="freeze"/>
            </path>
          </g>`).join('')}
      </g>
      <circle r="5" fill="${W}" stroke="${INK}" stroke-width="2"/>
      <g>
        <animateTransform attributeName="transform" type="scale" values="0;1.3;1" keyTimes="0;0.7;1" dur="0.4s" begin="0.62s" fill="freeze"/>
        <path d="M 0 0 L 9 -11" stroke="${AMB}" stroke-width="3"/>
        <circle cx="9" cy="-11" r="3.4" fill="${AMB}"/>
      </g>
    </g>`),
};

/* ── 4 · PALM AND SUN ──────────────────────────────────────────────── */
export const icPalm = {
  id: 'ic-palm',
  name: 'Palm & Sunrise',
  family: 'Island',
  note: 'A sun climbs behind a palm and the fronds lift in the breeze as it rises. It says "welcome, you have arrived somewhere good" without any hands or faces, which keeps it neutral across every market.',
  svg: (uid) => S(`
    <g transform="translate(32 32)">
      <circle cx="12" cy="4" r="11" fill="${AMB}" opacity="0.9">
        <animate attributeName="cy" values="16;0;16" dur="5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;1;0.3" dur="5s" repeatCount="indefinite"/>
      </circle>
      <path d="M -22 22 h 44" stroke="${INK}" stroke-width="3.4"/>
      <g transform="translate(-8 22)">
        <path d="M 0 0 C -2 -10 -3 -18 -6 -25" stroke="${INK}" stroke-width="3.6"/>
        <g transform="translate(-6 -25)">
          <animateTransform attributeName="transform" type="rotate" values="-6;6;-6" dur="3.4s" repeatCount="indefinite" additive="sum"/>
          <path d="M 0 0 C -8 -9 -18 -10 -22 -5" stroke="${O}" stroke-width="3.4"/>
          <path d="M 0 0 C 8 -10 18 -9 22 -3" stroke="${O}" stroke-width="3.4"/>
          <path d="M 0 0 C -4 -12 0 -20 4 -23" stroke="${O}" stroke-width="3.4"/>
          <path d="M 0 0 C -12 -5 -18 2 -19 7" stroke="${OD}" stroke-width="3.2"/>
        </g>
      </g>
      <circle cx="14" cy="22" r="2.6" fill="${O}"/>
    </g>`),
};

/* ── 5 · PAPER PLANE ───────────────────────────────────────────────── */
export const icPlane = {
  id: 'ic-plane',
  name: 'Paper Plane',
  family: 'Travel',
  note: 'A folded plane flies in from the lower left, banks, and leaves a dashed trail behind it. Light, fast, and the closest thing to an "arriving" gesture that does not need a person in it.',
  svg: (uid) => S(`
    <g transform="translate(32 32)">
      <g stroke="${OL}" stroke-width="3" fill="none" stroke-dasharray="5 6" opacity="0.85">
        <path d="M -26 14 q 12 2 20 -6">
          <animate attributeName="stroke-dashoffset" values="0;-22" dur="0.9s" repeatCount="indefinite"/></path>
        <path d="M -24 22 q 16 2 24 -8" opacity="0.6">
          <animate attributeName="stroke-dashoffset" values="0;-22" dur="1.2s" repeatCount="indefinite"/></path>
      </g>
      <g transform="translate(3 -3)">
        <animateTransform attributeName="transform" type="rotate" values="-9;5;-9" dur="2.6s" repeatCount="indefinite" additive="sum"/>
        <animateTransform attributeName="transform" type="translate" values="3 -1;3 -6;3 -1" dur="2.6s" repeatCount="indefinite" additive="sum"/>
        <path d="M -18 -11 L 20 1 L -18 13 L -12 1 Z" fill="${O}" stroke="${INK}" stroke-width="2.6"/>
        <path d="M -18 -11 L -12 1 L -18 13" fill="${OD}" stroke="${INK}" stroke-width="2.6"/>
        <path d="M -12 1 L 20 1" stroke="${INK}" stroke-width="2.2" opacity="0.5"/>
      </g>
    </g>`),
};

/* ── 6 · GLOBE AND PIN ─────────────────────────────────────────────── */
export const icGlobe = {
  id: 'ic-globe',
  name: 'Globe & Pin',
  family: 'Openline',
  note: 'The globe turns and a pin drops onto it with a ripple, over and over in different places. It is the most on-brand option — 190+ countries is the company\'s core claim — and it works on a login page for any market.',
  svg: (uid) => S(`
    <g transform="translate(32 32)">
      <circle r="21" fill="${O}" opacity="0.14"/>
      <circle r="21" stroke="${INK}" stroke-width="3"/>
      <g clip-path="url(#gc-${uid})">
        <clipPath id="gc-${uid}"><circle r="21"/></clipPath>
        <path d="M -21 -7 h 42 M -21 7 h 42" stroke="${INK}" stroke-width="2.2" opacity="0.4"/>
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0;42 0" dur="4s" repeatCount="indefinite"/>
          ${[-42, 0, 42].map(o => `<ellipse cx="${o}" rx="9" ry="21" stroke="${INK}" stroke-width="2.2" opacity="0.4"/>`).join('')}
        </g>
      </g>
      ${[[-7, -6], [8, 3], [-2, 9]].map(([x, y], i) => `
        <g transform="translate(${x} ${y})" opacity="0">
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.28;0.34" dur="4s" begin="${i * 1.34}s" repeatCount="indefinite"/>
          <circle r="4" fill="none" stroke="${OD}" stroke-width="2.4">
            <animate attributeName="r" values="3;13" dur="1s" begin="${i * 1.34}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.9;0" dur="1s" begin="${i * 1.34}s" repeatCount="indefinite"/>
          </circle>
          <path d="M 0 2 c 0 -5 -5 -7 -5 -12 a 5 5 0 0 1 10 0 c 0 5 -5 7 -5 12 z" fill="${OD}" stroke="${W}" stroke-width="1.6"/>
        </g>`).join('')}
    </g>`),
};

/* ── 7 · eSIM CHIP ─────────────────────────────────────────────────── */
export const icChip = {
  id: 'ic-chip',
  name: 'eSIM Chip',
  family: 'Openline',
  note: 'The chip the company actually sells, with its contacts lighting in sequence and a single ring pulsing out as it comes online. The most product-literal option, and it matches the chip idiom already used across the site.',
  svg: (uid) => S(`
    <g transform="translate(32 32)">
      <circle r="16" fill="none" stroke="${O}" stroke-width="2.4" opacity="0">
        <animate attributeName="r" values="14;28" dur="2.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0" dur="2.2s" repeatCount="indefinite"/>
      </circle>
      <rect x="-16" y="-14" width="32" height="28" rx="6" fill="${O}" stroke="${INK}" stroke-width="3"/>
      <path d="M -6 -7 L -11 1 h 7 l -5 8 l 13 -12 h -7 l 4 -5 z" fill="${W}"/>
      ${[-8, 0, 8].map((y, i) => `
        <rect x="-22" y="${y - 2.4}" width="6" height="5" rx="1.6" fill="${INK}">
          <animate attributeName="fill" values="${INK};${OD};${INK}" dur="1.8s" begin="${i * 0.2}s" repeatCount="indefinite"/></rect>
        <rect x="16" y="${y - 2.4}" width="6" height="5" rx="1.6" fill="${INK}">
          <animate attributeName="fill" values="${INK};${OD};${INK}" dur="1.8s" begin="${0.9 + i * 0.2}s" repeatCount="indefinite"/></rect>`).join('')}
    </g>`),
};

/* ── 8 · SIGNAL BARS ───────────────────────────────────────────────── */
export const icSignal = {
  id: 'ic-signal',
  name: 'Coming Online',
  family: 'Openline',
  note: 'Four bars fill left to right and a small tick lands when the fourth one takes. It is the simplest icon in the set, it never fails to read at any size, and "you are connected" is a reasonable thing for a login page to say.',
  svg: (uid) => S(`
    <g transform="translate(32 36)">
      ${[0, 1, 2, 3].map(i => `
        <rect x="${-20 + i * 11}" y="${-4 - i * 7}" width="7.5" height="${8 + i * 7}" rx="2.4" fill="${INK}" opacity="0.14"/>
        <rect x="${-20 + i * 11}" y="${-4 - i * 7}" width="7.5" height="${8 + i * 7}" rx="2.4" fill="${O}" opacity="0">
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.86;1" dur="2.6s" begin="${i * 0.22}s" repeatCount="indefinite"/>
        </rect>`).join('')}
      <g transform="translate(16 -26)" opacity="0">
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.8;1" dur="2.6s" begin="1s" repeatCount="indefinite"/>
        <circle r="8" fill="${GRN}"/>
        <path d="M -3.4 0 l 2.6 3 l 5 -6" stroke="${W}" stroke-width="2.2"/>
      </g>
    </g>`),
};

/* ── 9 · PASSPORT STAMP ────────────────────────────────────────────── */
export const icPassport = {
  id: 'ic-pass',
  name: 'Passport Stamp',
  family: 'Travel',
  note: 'A passport opens and a stamp lands on it with a small bounce. It is the most emotionally loaded travel object there is, and the stamp gives the icon a real beat rather than a loop of idle motion.',
  svg: (uid) => S(`
    <g transform="translate(32 32)">
      <rect x="-15" y="-21" width="30" height="42" rx="4.5" fill="${O}" stroke="${INK}" stroke-width="3"/>
      <path d="M 11 -19 v 38" stroke="${INK}" stroke-width="2" opacity="0.35"/>
      <g stroke="${W}" stroke-width="2.2" fill="none">
        <circle cy="-6" r="7"/>
        <path d="M -7 -6 h 14"/>
        <path d="M 0 -13 a 9 12 0 0 0 0 14 a 9 12 0 0 0 0 -14"/>
      </g>
      <path d="M -8 9 h 14 M -8 14 h 9" stroke="${W}" stroke-width="2.2" opacity="0.8"/>
      <g transform="translate(3 4) rotate(-16)" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.28;0.34;0.84;0.9;1" dur="3.8s" repeatCount="indefinite"/>
        <g>
          <animateTransform attributeName="transform" type="scale" values="2.4;0.92;1" keyTimes="0;0.7;1"
            dur="0.3s" begin="1.06s" fill="freeze" repeatCount="indefinite"/>
          <rect x="-14" y="-10" width="28" height="20" rx="3.6" fill="none" stroke="${INK}" stroke-width="3"/>
          <path d="M -8 -1 h 16 M -8 4 h 10" stroke="${INK}" stroke-width="2.4"/>
        </g>
      </g>
    </g>`),
};

/* ── 10 · SUITCASE ─────────────────────────────────────────────────── */
export const icCase = {
  id: 'ic-case',
  name: 'Suitcase',
  family: 'Travel',
  note: 'The handle pops up and two travel stickers slap onto the side. Warm, a little playful, and it reads as "going somewhere" rather than "arriving", which suits an account you are about to open.',
  svg: (uid) => S(`
    <g transform="translate(32 34)">
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 6;0 0;0 0;0 6" keyTimes="0;0.16;0.84;1" dur="3.4s" repeatCount="indefinite"/>
        <path d="M -8 -17 v -7 a 4 4 0 0 1 4 -4 h 8 a 4 4 0 0 1 4 4 v 7" stroke="${INK}" stroke-width="3.4" fill="none"/>
      </g>
      <rect x="-21" y="-17" width="42" height="33" rx="6" fill="${O}" stroke="${INK}" stroke-width="3"/>
      <rect x="-21" y="-4" width="42" height="7" fill="${W}" opacity="0.85"/>
      <rect x="-5" y="-6.4" width="10" height="12" rx="2.4" fill="${W}" stroke="${INK}" stroke-width="2.4"/>
      <g transform="translate(-12 -11) rotate(-12)" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.3;0.38;1" dur="3.4s" repeatCount="indefinite"/>
        <circle r="5.4" fill="${W}" stroke="${INK}" stroke-width="2.2"/>
        <path d="M -2.6 0 h 5.2" stroke="${OD}" stroke-width="2.2"/>
      </g>
      <g transform="translate(12 10) rotate(14)" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.46;0.54;1" dur="3.4s" repeatCount="indefinite"/>
        <rect x="-6" y="-4.4" width="12" height="9" rx="2" fill="${AMB}" stroke="${INK}" stroke-width="2"/>
      </g>
      <path d="M -13 16 v 3 M 13 16 v 3" stroke="${INK}" stroke-width="3"/>
      <circle cx="-13" cy="21" r="3.2" fill="${INK}"/><circle cx="13" cy="21" r="3.2" fill="${INK}"/>
    </g>`),
};

/* ── 11 · BOARDING PASS ────────────────────────────────────────────── */
export const icPassScan = {
  id: 'ic-bpass',
  name: 'Boarding Pass',
  family: 'Travel',
  note: 'A pass is scanned by a line sweeping down it and the stub turns green when it clears. It borrows the boarding-pass object already used on the Openline+ page, so the two surfaces share a visual idea.',
  svg: (uid) => S(`
    <g transform="translate(32 32)">
      <path d="M -22 -15 h 30 v 30 h -30 z" fill="${O}" stroke="${INK}" stroke-width="3"/>
      <path d="M 10 -15 h 12 v 30 h -12 z" fill="${W}" stroke="${INK}" stroke-width="3"/>
      <path d="M 9 -15 v 30" stroke="${INK}" stroke-width="2.4" stroke-dasharray="3 3"/>
      <path d="M -16 -6 h 18 M -16 2 h 12" stroke="${W}" stroke-width="2.6"/>
      <g transform="translate(16 0)" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.54;0.6;0.9;0.96" dur="3.2s" repeatCount="indefinite"/>
        <circle r="7" fill="${GRN}"/>
        <path d="M -3 0 l 2.4 2.8 l 4.6 -5.6" stroke="${W}" stroke-width="2.2"/>
      </g>
      <rect x="-22" y="-15" width="44" height="3.4" fill="${OD}" opacity="0.85">
        <animate attributeName="y" values="-15;12;-15" dur="1.6s" repeatCount="indefinite"/></rect>
    </g>`),
};

/* ── 12 · LEI ──────────────────────────────────────────────────────── */
export const icLei = {
  id: 'ic-lei',
  name: 'Lei',
  family: 'Island',
  note: 'A garland of flowers swings gently, with each bloom coming in one after another as it is threaded. The most literal welcome in Hawaiian custom, and a ring of small shapes sits very naturally inside a rounded badge.',
  svg: (uid) => S(`
    <g transform="translate(32 33)">
      <g>
        <animateTransform attributeName="transform" type="rotate" values="-8;8;-8" dur="3.2s" repeatCount="indefinite"/>
        <ellipse rx="17" ry="19" stroke="${INK}" stroke-width="2.6" opacity="0.4" fill="none"/>
        ${Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const x = (Math.cos(a) * 17).toFixed(1), y = (Math.sin(a) * 19).toFixed(1);
    const col = [OD, O, AMB][i % 3];
    const b = (i * 0.18).toFixed(2);
    return `<g transform="translate(${x} ${y})" opacity="0">
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.06;1" dur="4.6s" begin="${b}s" fill="freeze" repeatCount="indefinite"/>
            <g><animateTransform attributeName="transform" type="scale" values="0.2;1.25;1" keyTimes="0;0.65;1"
                dur="0.34s" begin="${b}s" fill="freeze" repeatCount="indefinite"/>
              <circle r="6.4" fill="${col}" stroke="${INK}" stroke-width="2"/>
              <circle r="2" fill="${W}"/>
            </g>
          </g>`;
  }).join('')}
      </g>
    </g>`),
};

/* ── 13 · SURF ─────────────────────────────────────────────────────── */
export const icSurf = {
  id: 'ic-surf',
  name: 'Wave & Board',
  family: 'Island',
  note: 'A wave rolls through and lifts a board on its face. It is the most energetic icon in the set and the motion is continuous, so the badge never sits still — useful on a page where people wait for an OAuth redirect.',
  svg: (uid) => S(`
    <g transform="translate(32 33)">
      <path d="M -25 8 q 9 -14 18 -2 t 18 -6 q 7 -10 13 1" stroke="${O}" stroke-width="5" fill="none" stroke-linecap="round">
        <animate attributeName="d"
          values="M -25 8 q 9 -14 18 -2 t 18 -6 q 7 -10 13 1;M -25 6 q 9 -4 18 4 t 18 -10 q 7 -2 13 6;M -25 8 q 9 -14 18 -2 t 18 -6 q 7 -10 13 1"
          dur="2.4s" repeatCount="indefinite"/>
      </path>
      <g transform="translate(2 -5)">
        <animateTransform attributeName="transform" type="translate" values="2 -3;2 -11;2 -3" dur="2.4s" repeatCount="indefinite" additive="sum"/>
        <animateTransform attributeName="transform" type="rotate" values="-36;-24;-36" dur="2.4s" repeatCount="indefinite" additive="sum"/>
        <path d="M 0 -20 c 7 7 7 26 0 34 c -7 -8 -7 -27 0 -34 z" fill="${W}" stroke="${INK}" stroke-width="2.8"/>
        <path d="M 0 -14 v 22" stroke="${OD}" stroke-width="2.6"/>
      </g>
      <path d="M -25 18 q 11 -9 20 0 t 20 -1" stroke="${OL}" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.9">
        <animate attributeName="d"
          values="M -25 18 q 11 -9 20 0 t 20 -1;M -25 18 q 11 6 20 -2 t 20 4;M -25 18 q 11 -9 20 0 t 20 -1"
          dur="2.4s" repeatCount="indefinite"/>
      </path>
    </g>`),
};

/* ── 14 · SUN ──────────────────────────────────────────────────────── */
export const icSun = {
  id: 'ic-sun',
  name: 'Sun',
  family: 'Warmth',
  note: 'Rays rotate slowly around a breathing centre. The calmest option here, it costs almost nothing to render, and it carries the brand orange better than any other shape in the set.',
  svg: (uid) => S(`
    <g transform="translate(32 32)">
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="24s" repeatCount="indefinite"/>
        ${Array.from({ length: 8 }, (_, i) => `<path d="M 0 -17 V -25" stroke="${O}" stroke-width="3.6"
          transform="rotate(${i * 45})" opacity="0.95">
          <animate attributeName="d" values="M 0 -17 V -25;M 0 -17 V -29;M 0 -17 V -25" dur="2.6s"
            begin="${(i * 0.15).toFixed(2)}s" repeatCount="indefinite"/></path>`).join('')}
      </g>
      <circle r="12" fill="${O}" stroke="${INK}" stroke-width="3">
        <animate attributeName="r" values="12;13.4;12" dur="2.6s" repeatCount="indefinite"/>
      </circle>
    </g>`),
};

/* ── 15 · PIN DROP ─────────────────────────────────────────────────── */
export const icPin = {
  id: 'ic-pin',
  name: 'Pin Drop',
  family: 'Openline',
  note: 'A pin falls, lands with a squash, and sends a ripple out across the badge. One clean beat, no metaphor to decode, and it echoes the map pins used throughout the rest of the site.',
  svg: (uid) => S(`
    <g transform="translate(32 34)">
      <ellipse cy="18" rx="15" ry="4.4" fill="${INK}" opacity="0.12"/>
      ${[0, 1].map(i => `<ellipse cy="18" rx="6" ry="2" fill="none" stroke="${O}" stroke-width="2.4" opacity="0">
        <animate attributeName="rx" values="6;24" dur="1.6s" begin="${0.62 + i * 0.26}s" repeatCount="indefinite"/>
        <animate attributeName="ry" values="2;7" dur="1.6s" begin="${0.62 + i * 0.26}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.85;0" dur="1.6s" begin="${0.62 + i * 0.26}s" repeatCount="indefinite"/></ellipse>`).join('')}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 -34;0 0;0 0" keyTimes="0;0.24;1" dur="2.6s" repeatCount="indefinite"/>
        <g>
          <animateTransform attributeName="transform" type="scale" values="1 1;1.2 0.82;1 1;1 1" keyTimes="0;0.26;0.36;1"
            dur="2.6s" repeatCount="indefinite" additive="sum"/>
          <path d="M 0 16 c 0 -12 -11 -16 -11 -26 a 11 11 0 0 1 22 0 c 0 10 -11 14 -11 26 z" fill="${O}" stroke="${INK}" stroke-width="3"/>
          <circle cy="-10" r="4.4" fill="${W}" stroke="${INK}" stroke-width="2"/>
        </g>
      </g>
    </g>`),
};

/* ── 16 · UNLOCK ───────────────────────────────────────────────────── */
export const icUnlock = {
  id: 'ic-unlock',
  name: 'Unlock',
  family: 'Login',
  note: 'The shackle lifts and swings open and the body flashes green. It is the only icon in the set that describes what the page actually does, and it pairs with the 2FA note at the bottom of the card.',
  svg: (uid) => S(`
    <g transform="translate(32 33)">
      <g transform="translate(-9 -9)">
        <path d="M 0 0 v -6 a 9 9 0 0 1 18 0 v 6" stroke="${INK}" stroke-width="3.6" style="transform-origin:0px 0px">
          <animateTransform attributeName="transform" type="rotate" values="0;0;-38;-38;0" keyTimes="0;0.2;0.42;0.84;1"
            dur="3.4s" repeatCount="indefinite"/>
        </path>
      </g>
      <rect x="-15" y="-6" width="30" height="24" rx="6" fill="${O}" stroke="${INK}" stroke-width="3"/>
      <rect x="-15" y="-6" width="30" height="24" rx="6" fill="${GRN}" stroke="${INK}" stroke-width="3" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.44;0.5;0.84;0.9" dur="3.4s" repeatCount="indefinite"/>
      </rect>
      <circle cy="4" r="3.4" fill="${W}"/>
      <path d="M 0 7 v 5" stroke="${W}" stroke-width="2.6"/>
    </g>`),
};

/* ── 17 · DOOR ─────────────────────────────────────────────────────── */
export const icDoor = {
  id: 'ic-door',
  name: 'Open Door',
  family: 'Login',
  note: 'A door swings open and warm light spills out of the gap. It is the friendliest possible reading of a sign-in page and it works in every culture without relying on a gesture or a flower.',
  svg: (uid) => S(`
    <g transform="translate(32 32)">
      <path d="M -16 -22 h 32 v 44 h -32 z" fill="${AMB}" opacity="0.2"/>
      <path d="M -6 22 L 22 30 L 22 -14 L -6 -22 z" fill="${AMB}" opacity="0.3">
        <animate attributeName="opacity" values="0;0.45;0.45;0" keyTimes="0;0.3;0.82;0.94" dur="4s" repeatCount="indefinite"/>
      </path>
      <path d="M -16 -22 h 32 v 44 h -32 z" stroke="${INK}" stroke-width="3.4"/>
      <g style="transform-origin:-16px 0px">
        <animateTransform attributeName="transform" type="scale" values="1 1;1 1;0.34 1;0.34 1;1 1" keyTimes="0;0.12;0.32;0.82;1"
          dur="4s" repeatCount="indefinite"/>
        <path d="M -16 -22 h 32 v 44 h -32 z" fill="${O}" stroke="${INK}" stroke-width="3.4"/>
        <circle cx="9" cy="2" r="2.8" fill="${INK}"/>
      </g>
    </g>`),
};

/* ── 18 · LOGO ARC ─────────────────────────────────────────────────── */
export const icLogo = {
  id: 'ic-logo',
  name: 'Logo Mark',
  family: 'Openline',
  note: 'The Openline arc draws itself and the dot lands at the end of the stroke. It is the most restrained option, the most obviously ours, and the only one that reinforces the brand mark rather than decorating around it.',
  svg: (uid) => S(`
    <g transform="translate(32 32)">
      <path d="M 12 -17 a 20 20 0 1 0 8 15.6" stroke="${INK}" stroke-width="7" fill="none" opacity="0.1"/>
      <path d="M 12 -17 a 20 20 0 1 0 8 15.6" stroke="${INK}" stroke-width="7" fill="none"
        stroke-dasharray="108" stroke-dashoffset="108">
        <animate attributeName="stroke-dashoffset" values="108;0;0;108" keyTimes="0;0.4;0.86;1" dur="4s" repeatCount="indefinite"/>
      </path>
      <circle cx="18" cy="-16" r="6" fill="${O}" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.42;0.5;0.86;0.94" dur="4s" repeatCount="indefinite"/>
        <animate attributeName="r" values="1;7.4;6" keyTimes="0;0.6;1" dur="0.4s" begin="1.68s" repeatCount="indefinite"/>
      </circle>
    </g>`),
};

/* ── 19 · DRINK ────────────────────────────────────────────────────── */
export const icDrink = {
  id: 'ic-drink',
  name: 'Tiki Drink',
  family: 'Island',
  note: 'A little paper umbrella spins in a glass while bubbles rise past it. The most openly fun icon here — probably too informal for a bank, exactly right for a travel brand that greets people with "Aloha!".',
  svg: (uid) => S(`
    <g transform="translate(32 34)">
      <path d="M -15 -10 h 30 l -11 20 v 10 h -8 v -10 z" fill="${O}" opacity="0.28"/>
      <path d="M -15 -10 h 30 l -11 20 v 10 h -8 v -10 z" stroke="${INK}" stroke-width="3"/>
      <path d="M -12 20 h 24" stroke="${INK}" stroke-width="3"/>
      ${[0, 1, 2].map(i => `<circle cx="${-5 + i * 5}" cy="4" r="2.2" fill="${W}" opacity="0.9">
        <animate attributeName="cy" values="8;-8" dur="${1.6 + i * 0.3}s" begin="${i * 0.4}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.9;0" dur="${1.6 + i * 0.3}s" begin="${i * 0.4}s" repeatCount="indefinite"/></circle>`).join('')}
      <g transform="translate(9 -14)">
        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="5s" repeatCount="indefinite" additive="sum"/>
        <path d="M -9 0 a 9 5 0 0 1 18 0 z" fill="${AMB}" stroke="${INK}" stroke-width="2.2"/>
        <path d="M 0 0 v 12" stroke="${INK}" stroke-width="2.4"/>
      </g>
      <circle cx="-11" cy="-15" r="4.4" fill="${OD}" stroke="${INK}" stroke-width="2"/>
    </g>`),
};

/* ── 20 · COMPASS ──────────────────────────────────────────────────── */
export const icCompass = {
  id: 'ic-compass',
  name: 'Compass',
  family: 'Travel',
  note: 'The needle spins, hunts, and settles on north. It has the most satisfying single motion in the set, it reads as "find your way in" on a login page, and it stays legible right down to 24px.',
  svg: (uid) => S(`
    <g transform="translate(32 32)">
      <circle r="20" fill="${O}" opacity="0.14"/>
      <circle r="20" stroke="${INK}" stroke-width="3"/>
      ${[0, 90, 180, 270].map(a => `<path d="M 0 -16 V -13" stroke="${INK}" stroke-width="2.6" opacity="0.5" transform="rotate(${a})"/>`).join('')}
      <g>
        <animateTransform attributeName="transform" type="rotate"
          values="0;400;690;714;706;710;710" keyTimes="0;0.3;0.56;0.68;0.76;0.84;1" dur="4.2s" repeatCount="indefinite"/>
        <path d="M 0 -14 L 5 0 L 0 3 L -5 0 Z" fill="${OD}" stroke="${INK}" stroke-width="2"/>
        <path d="M 0 14 L 5 0 L 0 -3 L -5 0 Z" fill="${W}" stroke="${INK}" stroke-width="2"/>
      </g>
      <circle r="2.8" fill="${INK}"/>
    </g>`),
};

export const ICONS = [
  icCurrent, icShaka, icWave, icHibiscus, icPalm, icPlane, icGlobe, icChip, icSignal,
  icPassport, icCase, icPassScan, icLei, icSurf, icSun, icPin, icUnlock, icDoor, icLogo,
  icDrink, icCompass,
];
