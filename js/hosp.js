/* ══ /hospitality · hero (teal system) ════════════════════════════════ */

import { mk, INK, WHITE, GRAY, LINE, GREEN, GREEN_SOFT, GREEN_TEXT, AMBER, pill, icon } from './kit.js';

const K = mk('teal');
const { P, wrap, dots, bloom, mono, label, num, card, panel, badge, tick, MONO } = K;

const pH = (a = '+$2,500 Monthly Revenue', b = '89% Satisfaction') => [
  pill('teal', `${icon('trend')}${a}`, { top: '14px', right: '14px' }),
  pill('ink', `${icon('users')}${b}`, { top: '70px', right: '14px' }),
];

/* the flat property illustration the live hero uses */
const property = (x, y, s = 1, kind = 'hotel') => `
  <g transform="translate(${x} ${y}) scale(${s})">
    ${kind === 'hotel' ? `
      <rect x="-90" y="-40" width="180" height="120" rx="6" fill="${P.main}" stroke="${INK}" stroke-width="3"/>
      <path d="M -108 -40 L 0 -84 L 108 -40 Z" fill="${P.deep}" stroke="${INK}" stroke-width="3"/>
      <rect x="-14" y="-108" width="28" height="26" rx="4" fill="${P.main}" stroke="${INK}" stroke-width="3"/>
      <circle cy="-112" r="8" fill="${P.deep}" stroke="${INK}" stroke-width="3"/>
      <rect x="-18" y="-24" width="36" height="20" rx="3" fill="${P.soft}" stroke="${INK}" stroke-width="2.5"/>
      ${[0, 1, 2, 3].map(i => `<rect x="${-66 + i * 36}" y="26" width="24" height="26" rx="3" fill="${P.soft}" stroke="${INK}" stroke-width="2.5"/>`).join('')}
      <path d="M -34 80 L -34 26 Q 0 4 34 26 L 34 80" fill="none" stroke="${INK}" stroke-width="3"/>`
    : kind === 'resort' ? `
      <rect x="-104" y="0" width="208" height="80" rx="6" fill="${P.main}" stroke="${INK}" stroke-width="3"/>
      <path d="M -118 0 L 0 -50 L 118 0 Z" fill="${P.deep}" stroke="${INK}" stroke-width="3"/>
      ${[0, 1, 2, 3, 4].map(i => `<rect x="${-84 + i * 36}" y="24" width="24" height="26" rx="3" fill="${P.soft}" stroke="${INK}" stroke-width="2.5"/>`).join('')}
      <path d="M -132 80 Q -112 50 -132 24 M -132 80 Q -152 50 -132 24 M -132 24 L -132 80" fill="none" stroke="${INK}" stroke-width="3"/>
      <ellipse cy="86" rx="150" ry="10" fill="${P.soft}" opacity="0.7"/>`
    : kind === 'rental' ? `
      <rect x="-64" y="-22" width="128" height="102" rx="6" fill="${P.main}" stroke="${INK}" stroke-width="3"/>
      <path d="M -80 -22 L 0 -72 L 80 -22 Z" fill="${P.deep}" stroke="${INK}" stroke-width="3"/>
      <rect x="-16" y="30" width="32" height="50" rx="3" fill="${P.soft}" stroke="${INK}" stroke-width="2.5"/>
      <rect x="-48" y="0" width="26" height="24" rx="3" fill="${P.soft}" stroke="${INK}" stroke-width="2.5"/>
      <rect x="22" y="0" width="26" height="24" rx="3" fill="${P.soft}" stroke="${INK}" stroke-width="2.5"/>`
    : `
      <path d="M -112 30 L -96 74 H 96 L 112 30 Z" fill="${P.main}" stroke="${INK}" stroke-width="3"/>
      <rect x="-72" y="-16" width="144" height="46" rx="5" fill="${P.deep}" stroke="${INK}" stroke-width="3"/>
      ${[0, 1, 2, 3].map(i => `<circle cx="${-48 + i * 32}" cy="7" r="7" fill="${P.soft}" stroke="${INK}" stroke-width="2"/>`).join('')}
      <rect x="-10" y="-54" width="20" height="38" rx="3" fill="${P.main}" stroke="${INK}" stroke-width="3"/>
      <ellipse cy="82" rx="140" ry="9" fill="${P.soft}" opacity="0.7"/>`}
  </g>`;

/* ══════════════ 0 · CURRENT ══════════════ */
export const hCurrent = {
  id: 'h-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'A flat hotel with four floating pills',
  desc: 'A flat illustration of a hotel and a palm tree, with four pills floating around it: monthly revenue, rating lift, satisfaction and bookings. It is warm and clearly on-brand, but the building is a drawing of a category rather than of a benefit, the four numbers are unrelated labels rather than a story, and nothing moves except the pills bobbing.',
  pros: ['Instantly says "hospitality" with no reading required', 'Warm, illustrative, and distinct from the rest of the site'],
  cons: ['Nothing animates except the pills, so the panel is effectively a picture', 'Four numbers with no relationship between them', 'Nothing connects the property to a guest, a phone or the product', 'Says nothing about the property types listed further down the page'],
  scores: { story: 3, motion: 2, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const inner = `
    ${dots(uid)}
    ${bloom(330, 250, 220, uid)}
    ${property(330, 250, 1, 'hotel')}
    <path d="M 446 330 Q 476 250 462 186 M 446 330 Q 500 262 516 214 M 446 330 Q 424 256 400 220"
      fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 446 330 L 446 244" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`;
    return { svg: wrap(inner), pills: pH() };
  },
};

/* ══════════════ 1 · CHECK-IN TO CONNECTED ══════════════ */
export const checkin = {
  id: 'hcheckin',
  name: 'Check-in to Connected',
  family: 'Guest journey',
  tagline: 'Key card, QR, online — and you got paid',
  desc: 'A guest arrives, a key card slides out with a QR on it, their phone scans it and comes online on a local network, and a revenue line ticks up for the property. Then the next guest arrives. It is the only option that shows the actual transaction the partnership is built on, from the guest\'s side and the owner\'s side at the same time.',
  pros: ['Shows the mechanic a hotelier is being asked to adopt', 'Guest benefit and owner revenue land in the same beat', 'A repeating arrival loop never runs out of motion', 'Makes "instant" literal instead of adjectival'],
  cons: ['Busier than the illustration it replaces', 'Assumes a key-card delivery, which not every property uses'],
  scores: { story: 5, motion: 5, perf: 4, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 220, uid)}
    ${mono(40, 46, 'GUEST ARRIVES · GUEST CONNECTS · YOU EARN', { size: 10, op: 0.32 })}

    <!-- front desk -->
    <g transform="translate(132 248) scale(1.16)">
      <rect x="-76" y="-8" width="152" height="74" rx="8" fill="${P.main}" stroke="${INK}" stroke-width="3"/>
      <rect x="-66" y="-24" width="132" height="18" rx="5" fill="${P.deep}" stroke="${INK}" stroke-width="2.5"/>
      ${[0, 1, 2].map(i => `<rect x="${-52 + i * 38}" y="14" width="28" height="34" rx="3" fill="${P.soft}" stroke="${INK}" stroke-width="2.2"/>`).join('')}
      ${mono(0, 92, 'FRONT DESK', { size: 9.5, anchor: 'middle', op: 0.35 })}
    </g>

    <!-- the key card with a QR, sliding across -->
    <g data-hcard>
      <animateTransform attributeName="transform" type="translate" dur="5.2s" repeatCount="indefinite"
        keyTimes="0;0.10;0.34;0.46;1" values="150,214; 150,214; 316,214; 316,214; 316,214"
        calcMode="spline" keySplines="0 0 1 1;0.3 0 0.2 1;0 0 1 1;0 0 1 1"/>
      <g opacity="0">
        <animate attributeName="opacity" values="0;1;1;0;0" dur="5.2s" keyTimes="0;0.10;0.44;0.50;1" repeatCount="indefinite"/>
        <rect x="-38" y="-24" width="76" height="48" rx="7" fill="${WHITE}" stroke="${INK}" stroke-width="2.5"/>
        <g transform="translate(-26 -14)">
          ${Array.from({ length: 16 }, (_, i) => {
      const c = i % 4, r = Math.floor(i / 4);
      return (i * 7) % 3 ? `<rect x="${c * 7}" y="${r * 7}" width="5" height="5" rx="1" fill="${INK}"/>` : '';
    }).join('')}
        </g>
        ${mono(12, 16, 'eSIM', { size: 8, op: 0.5 })}
      </g>
    </g>

    <!-- guest phone -->
    <g transform="translate(392 232)">
      <rect x="-46" y="-92" width="92" height="184" rx="18" fill="${INK}"/>
      <rect x="-41" y="-87" width="82" height="174" rx="14" fill="#17171C"/>
      <rect x="-13" y="-81" width="26" height="5" rx="2.5" fill="#000" opacity="0.8"/>
      <g data-hoff>
        ${mono(0, -30, 'NO SERVICE', { size: 8.5, anchor: 'middle', fill: WHITE, op: 0.3 })}
        <g transform="translate(-20 10)">
          ${[0, 1, 2, 3].map(i => `<rect x="${i * 11}" y="${-4 - i * 5}" width="7" height="${4 + i * 5}" rx="2" fill="${WHITE}" opacity="0.14"/>`).join('')}
        </g>
      </g>
      <g data-hon opacity="0">
        ${mono(0, -30, 'CONNECTED', { size: 8.5, anchor: 'middle', fill: P.main, op: 0.95 })}
        <g transform="translate(-20 10)">
          ${[0, 1, 2, 3].map(i => `<rect x="${i * 11}" y="${-4 - i * 5}" width="7" height="${4 + i * 5}" rx="2" fill="${P.main}"/>`).join('')}
        </g>
        ${mono(0, 44, 'LOCAL 5G', { size: 8, anchor: 'middle', fill: WHITE, op: 0.5 })}
        <g transform="translate(0 66)">
          <rect x="-32" y="-11" width="64" height="22" rx="11" fill="${P.main}" opacity="0.25"/>
          <text y="4" text-anchor="middle" font-size="8.5" font-weight="700" fill="${P.main}"
            style="font-family:${MONO}">5 GB · 7 DAYS</text>
        </g>
      </g>
    </g>
    ${mono(392, 352, 'GUEST PHONE', { size: 9.5, anchor: 'middle', op: 0.35 })}

    <!-- revenue -->
    <g transform="translate(470 96)">
      <rect width="130" height="76" rx="16" fill="${P.main}"/>
      ${mono(16, 26, 'YOUR REVENUE', { size: 8.5, fill: WHITE, op: 0.7 })}
      <text x="16" y="58" font-size="24" font-weight="700" fill="${WHITE}" style="font-family:${MONO}"><tspan data-role="hrev">$0</tspan></text>
    </g>
    <g transform="translate(470 188)">
      <rect width="130" height="64" rx="16" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
      ${mono(16, 24, 'GUESTS ONLINE', { size: 8.5, op: 0.4 })}
      <text x="16" y="50" font-size="22" font-weight="700" fill="${P.deep}" style="font-family:${MONO}"><tspan data-role="hguests">0</tspan></text>
    </g>
    <g transform="translate(40 386)">
      <rect width="560" height="44" rx="14" fill="${GREEN_SOFT}"/>
      <text x="280" y="28" text-anchor="middle" font-size="13" font-weight="700" fill="${GREEN_TEXT}">
        No hardware, no staff training — 30 seconds per guest
      </text>
    </g>`;

    return {
      svg: wrap(inner),
      pills: pH('+$2,500 Monthly Revenue', '30s per guest'),
      init(root) {
        const on = root.querySelector('[data-hon]');
        const off = root.querySelector('[data-hoff]');
        const rev = root.querySelector('[data-role="hrev"]');
        const gs = root.querySelector('[data-role="hguests"]');
        if (!on) return null;
        let n = 0, r = 0;
        const timers = [];
        const cycle = () => {
          on.setAttribute('opacity', '0');
          off.setAttribute('opacity', '1');
          timers.push(setTimeout(() => {
            on.setAttribute('opacity', '1');
            off.setAttribute('opacity', '0');
            n++; r += 7;
            if (n > 24) { n = 1; r = 7; }
            if (gs) gs.textContent = String(n);
            if (rev) rev.textContent = '$' + r.toLocaleString('en-US');
          }, 2500));
          timers.push(setTimeout(cycle, 5200));
        };
        cycle();
        return () => timers.forEach(t => clearTimeout(t));
      },
    };
  },
};

/* ══════════════ 2 · REVENUE METER ══════════════ */
export const revenue = {
  id: 'hrevenue',
  name: 'Revenue Meter',
  family: 'Commercial',
  tagline: 'The number a GM actually cares about',
  desc: 'Rooms fill across the month while a revenue meter climbs towards +$2,500, with the three inputs visible beneath it — rooms sold, attach rate, revenue per guest. It resets and runs again. The hero currently states $2,500 as a pill; this is the only option where you watch it accumulate and can see what it is made of.',
  pros: ['Shows the maths behind the headline number, which builds trust', 'A meter filling towards a target is the most goal-shaped motion there is', 'Speaks directly to the revenue calculator further down the page', 'Small and very legible at any width'],
  cons: ['All numbers, no guests — loses the warmth of the illustration', 'Every figure shown becomes a claim you have to defend'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const cx = 178, cy = 214, R = 104;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 220, uid)}
    ${mono(40, 50, 'MONTHLY CONNECTIVITY REVENUE', { size: 10, op: 0.32 })}
    <g transform="translate(${cx} ${cy})">
      <circle r="${R}" fill="none" stroke="${LINE}" stroke-width="18"/>
      <circle r="${R}" fill="none" stroke="${P.main}" stroke-width="18" stroke-linecap="round"
        transform="rotate(-90)" stroke-dasharray="${(2 * Math.PI * R).toFixed(1)}" data-hring/>
      <text y="-2" text-anchor="middle" font-size="34" font-weight="700" fill="${P.deep}"
        style="font-family:${MONO}">+$<tspan data-role="hamt">0</tspan></text>
      ${mono(0, 24, 'THIS MONTH', { size: 9.5, anchor: 'middle', op: 0.4 })}
    </g>
    ${[['ROOMS SOLD', 'hrooms', '0'], ['GUESTS WHO BUY', 'hrate', '0%'], ['PER GUEST', 'hper', '$0']].map((m, i) => `
      <g transform="translate(320 ${100 + i * 84})">
        <rect width="280" height="68" rx="16" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
        ${mono(20, 26, m[0], { size: 9, op: 0.4 })}
        <text x="20" y="54" font-size="22" font-weight="700" fill="${INK}" opacity="0.7"
          style="font-family:${MONO}"><tspan data-role="${m[1]}">${m[2]}</tspan></text>
      </g>`).join('')}
    <g transform="translate(320 352)">
      <rect width="280" height="62" rx="16" fill="${INK}"/>
      ${mono(20, 26, 'ANNUAL, SAME OCCUPANCY', { size: 9, fill: WHITE, op: 0.45 })}
      <text x="20" y="52" font-size="20" font-weight="700" fill="${P.main}" style="font-family:${MONO}">+$30,000</text>
    </g>
    <g transform="translate(40 352)">
      <rect width="248" height="62" rx="16" fill="${GREEN_SOFT}"/>
      ${mono(20, 26, 'COST TO YOU', { size: 9, op: 0.45, fill: GREEN_TEXT })}
      <text x="20" y="52" font-size="20" font-weight="700" fill="${GREEN_TEXT}" style="font-family:${MONO}">$0 upfront</text>
    </g>`;

    return {
      svg: wrap(inner),
      pills: pH('+$2,500 Monthly Revenue', '2x more revenue'),
      init(root) {
        const ring = root.querySelector('[data-hring]');
        const amt = root.querySelector('[data-role="hamt"]');
        const rooms = root.querySelector('[data-role="hrooms"]');
        const rate = root.querySelector('[data-role="hrate"]');
        const per = root.querySelector('[data-role="hper"]');
        if (!ring) return null;
        const C = 2 * Math.PI * 104;
        ring.style.transition = 'stroke-dashoffset .28s linear';
        let step = 0;
        const timers = [];
        const run = () => {
          step = 0;
          const iv = setInterval(() => {
            step++;
            const f = Math.min(1, step / 30);
            ring.setAttribute('stroke-dashoffset', String(C * (1 - f)));
            if (amt) amt.textContent = Math.round(2500 * f).toLocaleString('en-US');
            if (rooms) rooms.textContent = Math.round(420 * f).toLocaleString('en-US');
            if (rate) rate.textContent = `${Math.round(42 * f)}%`;
            if (per) per.textContent = `$${(14 * f).toFixed(2)}`;
            if (step >= 30) { clearInterval(iv); timers.push(setTimeout(run, 2200)); }
          }, 70);
          timers.push(iv);
        };
        run();
        return () => timers.forEach(t => { clearInterval(t); clearTimeout(t); });
      },
    };
  },
};

/* ══════════════ 3 · EVERY PROPERTY TYPE ══════════════ */
export const propTypes = {
  id: 'hprops',
  name: 'Every Property Type',
  family: 'Breadth',
  tagline: 'The building changes, the offer does not',
  desc: 'The illustration morphs between the four property types the page sells to — city hotel, resort, vacation rental, travel operator — each with its own headline figure and room count, on a slow cycle. It keeps the warm illustration everyone likes and makes it earn its place by answering "is this for a property like mine?".',
  pros: ['Keeps the illustrative style the brand already uses', 'Answers the reader\'s first objection — that this is for big chains', 'Directly previews the "every property type" section below', 'Calm, warm, and safe on every screen size'],
  cons: ['Four drawings to maintain instead of one', 'Says nothing about the guest experience or the mechanic', 'Less commercially pointed than a revenue figure'],
  scores: { story: 4, motion: 4, perf: 4, mobile: 5, brand: 5, ease: 3 },
  build: (uid) => {
    const kinds = ['hotel', 'resort', 'rental', 'operator'];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 236, 230, uid)}
    ${mono(40, 46, 'ONE PARTNERSHIP · EVERY PROPERTY TYPE', { size: 10, op: 0.32 })}
    ${kinds.map((k, i) => `
      <g data-hprop="${i}" opacity="${i ? 0 : 1}">
        ${property(324, 244, 0.92, k)}
      </g>`).join('')}
    <g transform="translate(40 348)">
      <rect width="560" height="82" rx="18" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
      <text x="24" y="38" font-size="18" font-weight="700" fill="${INK}"><tspan data-role="hpname">City hotel</tspan></text>
      <text x="24" y="62" font-size="11" font-weight="700" fill="${INK}" opacity="0.42" letter-spacing="1"
        style="font-family:${MONO}"><tspan data-role="hpmeta">180 ROOMS · +$2,500/MONTH</tspan></text>
      <g transform="translate(400 24)">
        <rect width="136" height="34" rx="17" fill="${P.main}"/>
        <text x="68" y="22" text-anchor="middle" font-size="11" font-weight="700" fill="${WHITE}"
          letter-spacing="0.6" style="font-family:${MONO}"><tspan data-role="hplift">+18% BOOKINGS</tspan></text>
      </g>
    </g>
    <g transform="translate(40 92)">
      ${kinds.map((k, i) => `
        <g data-hpdot="${i}" transform="translate(0 ${i * 30})">
          <circle cx="7" cy="0" r="6" fill="${LINE}" data-hpd/>
          <text x="24" y="4" font-size="12" font-weight="700" fill="${INK}" opacity="0.4" data-hpt>${['Hotels', 'Resorts', 'Vacation rentals', 'Travel operators'][i]}</text>
        </g>`).join('')}
    </g>`;

    return {
      svg: wrap(inner),
      pills: pH('+$2,500 Monthly Revenue', '85% would recommend'),
      init(root) {
        const props = [...root.querySelectorAll('[data-hprop]')];
        const dots = [...root.querySelectorAll('[data-hpdot]')];
        const nm = root.querySelector('[data-role="hpname"]');
        const mt = root.querySelector('[data-role="hpmeta"]');
        const lf = root.querySelector('[data-role="hplift"]');
        if (!props.length) return null;
        props.forEach(p => { p.style.transition = 'opacity .55s ease'; });
        const info = [
          ['City hotel', '180 ROOMS · +$2,500/MONTH', '+18% BOOKINGS'],
          ['Beach resort', '420 KEYS · +$5,800/MONTH', '+0.5 RATING'],
          ['Vacation rental', '12 UNITS · +$320/MONTH', '89% SATISFACTION'],
          ['Travel operator', '2,400 GUESTS · +$14,000/MONTH', '2x ANCILLARY'],
        ];
        let i = 0;
        const tick = () => {
          props.forEach((p, k) => p.setAttribute('opacity', k === i ? '1' : '0'));
          dots.forEach((d, k) => {
            d.querySelector('[data-hpd]').setAttribute('fill', k === i ? P.main : LINE);
            const t = d.querySelector('[data-hpt]');
            t.setAttribute('opacity', k === i ? '1' : '0.4');
            t.setAttribute('fill', k === i ? P.deep : INK);
          });
          if (nm) nm.textContent = info[i][0];
          if (mt) mt.textContent = info[i][1];
          if (lf) lf.textContent = info[i][2];
          i = (i + 1) % props.length;
        };
        tick();
        const id = setInterval(tick, 2600);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════ 4 · ROOM BOARD ══════════════ */
export const roomBoard = {
  id: 'hrooms',
  name: 'Room Board',
  family: 'Operations',
  tagline: 'A floor plan of guests coming online',
  desc: 'A grid of rooms. Guests check in and their tiles light teal with a flag and a data plan, an occupancy figure climbs, and a revenue-per-room tally runs alongside. It reads like the property management screen a duty manager already stares at, which makes the offer feel operational rather than promotional.',
  pros: ['Speaks the language of the person who has to run this', 'Continuous, granular motion — tiles keep lighting', 'Flags carry the international angle without a map', 'Occupancy and revenue side by side is a familiar pairing'],
  cons: ['Loses the illustration and the warmth with it', 'A grid of rooms is dense; needs fewer tiles on a phone', 'Implies a PMS integration the product may not have yet'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 3, brand: 3, ease: 4 },
  build: (uid) => {
    const cols = 8, rows = 5;
    const flags = ['🇬🇧', '🇩🇪', '🇺🇸', '🇯🇵', '🇫🇷', '🇧🇷', '🇦🇺', '🇰🇷'];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 220, uid)}
    ${mono(40, 46, 'ROOMS ONLINE · TONIGHT', { size: 10, op: 0.32 })}
    ${Array.from({ length: cols * rows }, (_, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      const x = 40 + c * 70, y = 72 + r * 56;
      return `
      <g data-hroom="${i}" transform="translate(${x} ${y})">
        <rect width="62" height="48" rx="10" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5" data-hrshell/>
        <text x="8" y="18" font-size="9" font-weight="700" fill="${INK}" opacity="0.3"
          style="font-family:${MONO}" data-hrnum>${101 + r * 100 + c}</text>
        <text x="8" y="38" font-size="13" data-hrflag opacity="0">${flags[(i * 3) % flags.length]}</text>
        <circle cx="52" cy="14" r="4" fill="${LINE}" data-hrdot/>
      </g>`;
    }).join('')}
    ${[['OCCUPIED', 'hocc', '0 / 40'], ['ONLINE', 'honl', '0'], ['REVENUE TONIGHT', 'hrv', '$0']].map((m, i) => `
      <g transform="translate(${40 + i * 194} 366)">
        <rect width="180" height="66" rx="16" fill="${i === 2 ? P.main : WHITE}" stroke="${i === 2 ? P.main : LINE}" stroke-width="1.5"/>
        ${mono(18, 26, m[0], { size: 8.5, op: i === 2 ? 0.7 : 0.4, fill: i === 2 ? WHITE : INK })}
        <text x="18" y="52" font-size="21" font-weight="700" fill="${i === 2 ? WHITE : P.deep}"
          style="font-family:${MONO}"><tspan data-role="${m[1]}">${m[2]}</tspan></text>
      </g>`).join('')}`;

    return {
      svg: wrap(inner),
      pills: pH('+$2,500 Monthly Revenue', '89% Satisfaction'),
      init(root) {
        const rooms = [...root.querySelectorAll('[data-hroom]')];
        if (!rooms.length) return null;
        const occ = root.querySelector('[data-role="hocc"]');
        const onl = root.querySelector('[data-role="honl"]');
        const rv = root.querySelector('[data-role="hrv"]');
        rooms.forEach(r => { r.style.transition = 'opacity .4s ease'; });
        const order = rooms.map((_, i) => i).sort(() => Math.random() - 0.5);
        let k = 0;
        const timers = [];
        const reset = () => {
          rooms.forEach(r => {
            r.querySelector('[data-hrshell]').setAttribute('fill', WHITE);
            r.querySelector('[data-hrshell]').setAttribute('stroke', LINE);
            r.querySelector('[data-hrflag]').setAttribute('opacity', '0');
            r.querySelector('[data-hrdot]').setAttribute('fill', LINE);
            r.querySelector('[data-hrnum]').setAttribute('fill', INK);
            r.querySelector('[data-hrnum]').setAttribute('opacity', '0.3');
          });
          k = 0;
        };
        const tick = () => {
          if (k >= order.length) { timers.push(setTimeout(reset, 1200)); k++; return; }
          if (k > order.length) return;
          const r = rooms[order[k]];
          r.querySelector('[data-hrshell]').setAttribute('fill', P.main);
          r.querySelector('[data-hrshell]').setAttribute('stroke', P.main);
          r.querySelector('[data-hrflag]').setAttribute('opacity', '1');
          r.querySelector('[data-hrdot]').setAttribute('fill', WHITE);
          r.querySelector('[data-hrnum]').setAttribute('fill', WHITE);
          r.querySelector('[data-hrnum]').setAttribute('opacity', '0.7');
          k++;
          if (occ) occ.textContent = `${k} / 40`;
          if (onl) onl.textContent = String(k);
          if (rv) rv.textContent = '$' + (k * 7).toLocaleString('en-US');
        };
        const id = setInterval(tick, 200);
        return () => { clearInterval(id); timers.forEach(t => clearTimeout(t)); };
      },
    };
  },
};

/* ══════════════ 5 · REVIEW LIFT ══════════════ */
export const reviewLift = {
  id: 'hreviews',
  name: 'Review Lift',
  family: 'Reputation',
  tagline: 'The rating moves, and here is why',
  desc: 'A rating dial climbs from 4.2 to 4.7 while real-sounding review snippets arrive one at a time — "online before I left the airport", "no hunting for a SIM". The 89% satisfaction figure sits beneath. For a hotelier, the rating is the asset; this is the only option that treats it as the headline benefit rather than the revenue.',
  pros: ['Targets the metric hospitality operators are most protective of', 'Quotes are the most persuasive content type in this category', 'Arriving snippets give a natural, unhurried rhythm', 'Pairs neatly with the partner success stories section'],
  cons: ['Invented quotes must be replaced with real, attributable ones', 'Half a star is a big claim that needs evidence', 'Loses the revenue story to the reputation story'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const cx = 168, cy = 200, R = 96;
    const star = (x, y, s = 1, fill = P.main) =>
      `<path transform="translate(${x} ${y}) scale(${s})" d="M 0 -10 L 3 -3.2 L 10.4 -2.4 L 4.8 2.6 L 6.4 10 L 0 6.2 L -6.4 10 L -4.8 2.6 L -10.4 -2.4 L -3 -3.2 Z" fill="${fill}"/>`;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 220, uid)}
    ${mono(40, 46, 'GUEST RATING · LAST 90 DAYS', { size: 10, op: 0.32 })}
    <g transform="translate(${cx} ${cy})">
      <circle r="${R}" fill="none" stroke="${LINE}" stroke-width="16"/>
      <circle r="${R}" fill="none" stroke="${P.main}" stroke-width="16" stroke-linecap="round"
        transform="rotate(-90)" stroke-dasharray="${(2 * Math.PI * R).toFixed(1)}" data-hrring/>
      <text y="4" text-anchor="middle" font-size="40" font-weight="700" fill="${P.deep}"
        style="font-family:${MONO}"><tspan data-role="hrate2">4.2</tspan></text>
      <g transform="translate(0 30)">
        ${[0, 1, 2, 3, 4].map(i => star(-40 + i * 20, 0, 0.9, LINE)).join('')}
        <g data-hstars>${[0, 1, 2, 3, 4].map(i => `<g data-hstar="${i}" opacity="0">${star(-40 + i * 20, 0, 0.9)}</g>`).join('')}</g>
      </g>
    </g>
    ${mono(cx, 322, 'WAS 4.2 · NOW 4.7', { size: 9.5, anchor: 'middle', op: 0.4 })}
    <g transform="translate(296 88)">
      ${[0, 1, 2].map(i => `
        <g data-hq="${i}" opacity="0" transform="translate(0 ${i * 84})">
          <rect width="304" height="72" rx="16" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
          <text x="20" y="30" font-size="12.5" font-weight="600" fill="${INK}" opacity="0.72" data-hqt>—</text>
          <text x="20" y="50" font-size="12.5" font-weight="600" fill="${INK}" opacity="0.72" data-hqt2>—</text>
          <g transform="translate(20 62)">${[0, 1, 2, 3, 4].map(k => star(k * 15, 0, 0.62)).join('')}</g>
          <text x="284" y="30" text-anchor="end" font-size="9.5" font-weight="700" fill="${INK}" opacity="0.32"
            style="font-family:${MONO}" data-hqa>—</text>
        </g>`).join('')}
    </g>
    <g transform="translate(40 350)">
      <rect width="240" height="64" rx="16" fill="${INK}"/>
      ${mono(20, 26, 'GUEST SATISFACTION', { size: 9, fill: WHITE, op: 0.45 })}
      <text x="20" y="52" font-size="22" font-weight="700" fill="${P.main}" style="font-family:${MONO}">89%</text>
    </g>
    <g transform="translate(300 350)">
      <rect width="300" height="64" rx="16" fill="${GREEN_SOFT}"/>
      ${mono(20, 26, 'WOULD RECOMMEND THE PROPERTY', { size: 9, op: 0.5, fill: GREEN_TEXT })}
      <text x="20" y="52" font-size="22" font-weight="700" fill="${GREEN_TEXT}" style="font-family:${MONO}">85%</text>
    </g>`;

    return {
      svg: wrap(inner),
      pills: pH('+0.5 Rating', '89% Satisfaction'),
      init(root) {
        const ring = root.querySelector('[data-hrring]');
        const val = root.querySelector('[data-role="hrate2"]');
        const stars = [...root.querySelectorAll('[data-hstar]')];
        const qs = [...root.querySelectorAll('[data-hq]')];
        if (!ring) return null;
        const C = 2 * Math.PI * 96;
        ring.style.transition = 'stroke-dashoffset .5s ease';
        qs.forEach(q => { q.style.transition = 'opacity .5s ease'; });
        const quotes = [
          ['Online before I even left', 'the airport. Brilliant touch.', 'LONDON · 5★'],
          ['No hunting for a SIM card', 'on day one of the holiday.', 'BERLIN · 5★'],
          ['Front desk set it up in', 'under a minute. Seamless.', 'TOKYO · 5★'],
        ];
        let step = 0;
        const timers = [];
        const run = () => {
          step = 0;
          qs.forEach(q => q.setAttribute('opacity', '0'));
          stars.forEach(s => s.setAttribute('opacity', '0'));
          const iv = setInterval(() => {
            step++;
            const f = Math.min(1, step / 22);
            const r = 4.2 + 0.5 * f;
            ring.setAttribute('stroke-dashoffset', String(C * (1 - r / 5)));
            if (val) val.textContent = r.toFixed(1);
            stars.forEach((s, k) => s.setAttribute('opacity', k < Math.round(r) ? '1' : '0'));
            if (step === 5 || step === 12 || step === 19) {
              const qi = step === 5 ? 0 : step === 12 ? 1 : 2;
              const q = qs[qi];
              if (q) {
                q.querySelector('[data-hqt]').textContent = quotes[qi][0];
                q.querySelector('[data-hqt2]').textContent = quotes[qi][1];
                q.querySelector('[data-hqa]').textContent = quotes[qi][2];
                q.setAttribute('opacity', '1');
              }
            }
            if (step >= 22) { clearInterval(iv); timers.push(setTimeout(run, 3000)); }
          }, 130);
          timers.push(iv);
        };
        run();
        return () => timers.forEach(t => { clearInterval(t); clearTimeout(t); });
      },
    };
  },
};

/* ══ HOSP · 6–9 ═════════════════════════════════════════════════════ */

export const hAncillary = {
  id: 'h-ancillary',
  name: 'The Ancillary Line',
  family: 'Revenue',
  tagline: 'Connectivity as a line on the property P&L',
  desc:
    'A hotelier reads a P&L, not a benefit list. Connectivity is added as an ancillary line beside ' +
    'the ones they already know — parking, breakfast, late checkout — with its attachment rate and ' +
    'its margin. Placing it in a familiar table is how it stops being a technology decision and ' +
    'becomes a revenue one.',
  pros: [
    'Speaks the buyer\u2019s own language, which is revenue per room',
    'Sitting beside known ancillaries makes the margin credible',
    'Attachment rate is the metric a revenue manager already tracks',
  ],
  cons: ['Needs honest attachment and margin figures', 'A financial table is the least charming option here'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const rows = [
      ['Parking', '31%', '\u20ac1,240', false],
      ['Breakfast', '58%', '\u20ac3,910', false],
      ['Late checkout', '12%', '\u20ac640', false],
      ['Connectivity', '44%', '\u20ac2,480', true],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${mono(72, 54, 'ANCILLARY REVENUE \u00b7 120 ROOMS \u00b7 LAST MONTH', { size: 9.5, op: 0.45 })}
    ${mono(376, 96, 'ATTACH', { size: 8.5, anchor: 'middle', op: 0.4 })}
    ${mono(544, 96, 'REVENUE', { size: 8.5, anchor: 'end', op: 0.4 })}
    ${rows.map(([nm, at, rev, ours], i) => {
      const y = 108 + i * 68;
      const on = 0.06 + i * 0.14;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.06).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(72, y, 496, 56, { r: 12, fill: ours ? P.wash : WHITE, stroke: ours ? P.main : LINE, sw: ours ? 2 : 1.5 })}
        ${label(96, y + 34, nm, { size: 14.5 })}
        ${ours ? mono(96, y + 50, 'NEW THIS QUARTER', { size: 8, op: 0.5, fill: P.deep }) : ''}
        ${num(376, y + 36, at, { size: 15, anchor: 'middle', fill: ours ? P.deep : GRAY })}
        ${num(544, y + 36, rev, { size: 17, anchor: 'end', fill: ours ? P.deep : INK })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.8;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 386, 496, 58, { r: 12, fill: WHITE, stroke: LINE })}
      ${label(96, 420, 'Second-highest attachment on the property', { size: 13.5 })}
      ${mono(544, 420, '92% MARGIN \u00b7 NO STOCK', { size: 9, anchor: 'end', op: 0.5, fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pH('+\u20ac2,480 last month', '44% attachment') };
  },
};

export const hArrival = {
  id: 'h-arrival',
  name: 'Before They Reach Reception',
  family: 'Guest experience',
  tagline: 'Connected in the taxi, not at the desk',
  desc:
    'The worst fifteen minutes of any stay are the ones spent finding the wifi password. The plan ' +
    'activates when the booking confirmation is opened, so the guest is online in the taxi and ' +
    'reception never hears about it. Moving the moment earlier is the whole idea, and it makes the ' +
    'property look competent before anybody arrives.',
  pros: [
    'Reframes the benefit as arrival experience, which is what hoteliers optimise',
    'Removes a real front-desk support burden',
    'Puts the property\u2019s brand on the guest\u2019s phone before check-in',
  ],
  cons: ['Depends on the booking flow integration', 'Overlaps somewhat with the check-in option'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const steps = [
      ['Booking confirmed', 'Three days out', 'Plan attached to the reservation'],
      ['Wheels down', '17:05', 'Profile activates on landing'],
      ['In the taxi', '17:22', 'Online, messaging the front desk'],
      ['Reception', '17:48', 'No password, no queue, no ticket'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 250, uid)}
    ${mono(72, 54, 'ONE ARRIVAL, WITHOUT A WIFI PASSWORD', { size: 9.5, op: 0.45 })}
    <line x1="104" y1="96" x2="104" y2="368" stroke="${LINE}" stroke-width="2.5"/>
    <line x1="104" y1="96" x2="104" y2="368" stroke="${P.main}" stroke-width="3"
      stroke-dasharray="272" stroke-dashoffset="272">
      <animate attributeName="stroke-dashoffset" values="272;0;0" keyTimes="0;0.66;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </line>
    ${steps.map(([nm, when, note], i) => {
      const y = 100 + i * 90;
      const on = (i / 4) * 0.66;
      return `<g>
        <circle cx="104" cy="${y}" r="8" fill="${WHITE}" stroke="${LINE}" stroke-width="2.5"/>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(4)};${(on + 0.05).toFixed(4)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <circle cx="104" cy="${y}" r="8" fill="${P.main}"/>
          ${card(136, y - 26, 432, 58, { r: 12, fill: WHITE, stroke: LINE })}
          ${label(160, y - 2, nm, { size: 14 })}
          ${mono(160, y + 18, note, { size: 9, op: 0.4 })}
          ${mono(544, y + 4, when, { size: 10, anchor: 'end', op: 0.5, fill: P.deep })}
        </g>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.74;0.82;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 396, 496, 48, { r: 11, fill: P.wash, stroke: P.main, sw: 1.8 })}
      ${label(96, 426, 'Forty-three minutes online before check-in', { size: 14, fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pH('Online before arrival', 'Zero front-desk tickets') };
  },
};

export const hFrontDesk = {
  id: 'h-frontdesk',
  name: 'What The Front Desk Stops Doing',
  family: 'Operations',
  tagline: 'The support calls that disappear',
  desc:
    'General managers buy things that reduce labour. Four recurring front-desk jobs — resetting the ' +
    'wifi password, explaining the captive portal, rebooting the guest access point, escalating to ' +
    'the IT contractor — are counted for a month and then struck out, with the hours returned to the ' +
    'desk named at the end.',
  pros: [
    'Labour saving is the argument a GM actually approves budget for',
    'Every item is a job the reader recognises from their own property',
    'Hours returned is a number that survives a budget meeting',
  ],
  cons: ['Needs plausible call volumes for a mid-size property', 'Implies the property wifi is the problem'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const jobs = [
      ['Wifi password resets', 148, '4 min each'],
      ['Captive portal explained', 96, '6 min each'],
      ['Guest AP rebooted', 34, '11 min each'],
      ['Escalated to the IT contractor', 12, '40 min each'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${mono(72, 54, 'FRONT DESK \u00b7 CONNECTIVITY CALLS, LAST MONTH', { size: 9.5, op: 0.45 })}
    ${jobs.map(([nm, n, each], i) => {
      const y = 82 + i * 66;
      const on = 0.06 + i * 0.1;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(72, y, 496, 54, { r: 12, fill: WHITE, stroke: LINE })}
        ${label(96, y + 26, nm, { size: 13.5 })}
        ${mono(96, y + 44, each, { size: 8.5, op: 0.38 })}
        ${num(544, y + 34, `${n}`, { size: 19, anchor: 'end', fill: AMBER })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.52 + i * 0.05).toFixed(3)};${(0.58 + i * 0.05).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <line x1="90" y1="${y + 22}" x2="${96 + nm.length * 7.6}" y2="${y + 22}" stroke="${P.deep}" stroke-width="2.4" stroke-linecap="round"/>
        </g>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.76;0.84;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 352, 240, 82, { r: 12, fill: WHITE, stroke: LINE })}
      ${mono(96, 380, 'STAFF TIME, BEFORE', { size: 8.5, op: 0.4 })}
      ${num(96, 414, '29 hours', { size: 19, fill: AMBER })}
      ${card(328, 352, 240, 82, { r: 12, fill: P.wash, stroke: P.main, sw: 2 })}
      ${mono(352, 380, 'AFTER', { size: 8.5, op: 0.5, fill: P.deep })}
      ${num(352, 414, 'under 2', { size: 19, fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pH('27 hours back a month', 'Fewer desk calls') };
  },
};

export const hPortfolio = {
  id: 'h-portfolio',
  name: 'Across The Portfolio',
  family: 'Scale',
  tagline: 'Nine properties, one contract, one report',
  desc:
    'Hospitality buying happens at group level, not property level. Nine properties across four ' +
    'countries report attachment and revenue into a single view, with one contract behind all of them. ' +
    'Speaking to the group rather than the single hotel is how this becomes a large deal instead of a ' +
    'pilot.',
  pros: [
    'Targets the group buyer, who has the budget and the mandate',
    'One contract across countries is a genuine procurement advantage',
    'A per-property table is exactly the artefact a group asset manager wants',
  ],
  cons: ['Irrelevant to an independent hotel', 'Needs multi-property billing to actually work'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 3 },
  build: (uid) => {
    const dur = 12;
    const props = [
      ['Lisbon \u00b7 Baixa', 'PT', 120, '44%', 2480],
      ['Porto \u00b7 Ribeira', 'PT', 86, '39%', 1610],
      ['Madrid \u00b7 Salamanca', 'ES', 142, '47%', 3120],
      ['Barcelona \u00b7 Eixample', 'ES', 118, '41%', 2240],
      ['Paris \u00b7 11e', 'FR', 96, '36%', 1780],
      ['Milan \u00b7 Navigli', 'IT', 74, '43%', 1390],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${mono(72, 52, 'GROUP VIEW \u00b7 9 PROPERTIES \u00b7 4 COUNTRIES', { size: 9.5, op: 0.45 })}
    ${mono(376, 86, 'ROOMS', { size: 8.5, anchor: 'middle', op: 0.4 })}
    ${mono(452, 86, 'ATTACH', { size: 8.5, anchor: 'middle', op: 0.4 })}
    ${mono(544, 86, 'REVENUE', { size: 8.5, anchor: 'end', op: 0.4 })}
    ${props.map(([nm, cc, rooms, at, rev], i) => {
      const y = 96 + i * 50;
      const on = 0.06 + i * 0.1;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.045).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(72, y, 496, 42, { r: 10, fill: i % 2 ? '#FAFBFB' : WHITE, stroke: LINE })}
        ${label(96, y + 26, nm, { size: 12.5 })}
        ${mono(296, y + 26, cc, { size: 9, op: 0.35 })}
        ${mono(376, y + 26, `${rooms}`, { size: 10, anchor: 'middle', op: 0.5 })}
        ${num(452, y + 27, at, { size: 12, anchor: 'middle', fill: P.deep })}
        ${num(544, y + 27, `\u20ac${rev.toLocaleString('en-US')}`, { size: 13, anchor: 'end' })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.7;0.78;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 402, 496, 46, { r: 11, fill: P.wash, stroke: P.main, sw: 2 })}
      ${label(96, 431, 'One contract \u00b7 one report \u00b7 one invoice', { size: 13.5 })}
      ${num(544, 432, '\u20ac18,420 / mo', { size: 16, anchor: 'end', fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pH('+\u20ac18,420 group-wide', '9 properties') };
  },
};

/* ── registry ── */

export const hZeroUpfront = {
  id: 'h-zero',
  name: 'Nothing To Install',
  family: 'Objection',
  tagline: 'No hardware, no cabling, no capex approval',
  desc:
    'The reason a property says no is not price, it is the works order. Four things a guest-wifi ' +
    'upgrade would require — an access point per floor, cabling, a contractor visit, a capex approval ' +
    '— are listed and then removed, leaving a revenue share that starts the same week. Removing the ' +
    'project is the real offer.',
  pros: [
    'Names the actual blocker, which is installation rather than cost',
    'Zero capex is the strongest line available to a property buyer',
    '"Live this week" is a concrete, checkable promise',
  ],
  cons: ['Needs onboarding to genuinely be this light', 'Less visually interesting than the property artwork'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 11;
    const items = [
      ['An access point on every floor', '\u20ac6,400'],
      ['Cabling and containment', '\u20ac3,100'],
      ['Contractor site visits', '\u20ac1,800'],
      ['A capex approval cycle', '11 weeks'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 250, uid)}
    ${mono(72, 54, 'WHAT A GUEST-WIFI UPGRADE WOULD NEED', { size: 9.5, op: 0.45 })}
    ${items.map(([nm, cost], i) => {
      const y = 80 + i * 62;
      const on = 0.06 + i * 0.09;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(72, y, 496, 50, { r: 11, fill: WHITE, stroke: LINE })}
        ${label(96, y + 30, nm, { size: 13.5 })}
        ${num(544, y + 32, cost, { size: 14, anchor: 'end', fill: AMBER })}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.48 + i * 0.05).toFixed(3)};${(0.54 + i * 0.05).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <line x1="90" y1="${y + 25}" x2="${96 + nm.length * 7.4}" y2="${y + 25}" stroke="${P.deep}" stroke-width="2.4" stroke-linecap="round"/>
        </g>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.74;0.82;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 336, 496, 108, { r: 14, fill: P.wash, stroke: P.main, sw: 2 })}
      ${mono(96, 366, 'WHAT THIS NEEDS INSTEAD', { size: 9, op: 0.55, fill: P.deep })}
      ${label(96, 400, 'A revenue share, and nothing installed', { size: 17 })}
      ${mono(96, 426, 'ZERO CAPEX \u00b7 NO CONTRACTOR \u00b7 LIVE THIS WEEK', { size: 8.5, op: 0.45 })}
    </g>`;
    return { svg: wrap(inner), pills: pH('$0 upfront', 'Live this week') };
  },
};

/* ── registries ── */
export const HOSP_VARIANTS = [hCurrent, checkin, revenue, propTypes, roomBoard, reviewLift, hAncillary, hArrival, hFrontDesk, hPortfolio,
  hZeroUpfront];
