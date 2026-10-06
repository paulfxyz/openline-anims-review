/* ══ /business · hero + "Everything Your Business Needs" (blue) ═══════ */

import { mk, INK, WHITE, GRAY, LINE, GREEN, GREEN_SOFT, GREEN_TEXT, RED, AMBER, pill, icon } from './kit.js';

const K = mk('blue');
const { P, wrap, dots, bloom, mono, label, num, card, panel, badge, tick, MONO } = K;

const pB = (t = 'Team dashboard', where = 'right') =>
  [pill('blue', `${icon('users')}${t}`, where === 'right' ? { top: '14px', right: '14px' } : { top: '14px', left: '14px' })];

const TEAM = [
  { i: 'JD', n: 'John Davis', c: 'Tokyo, Japan', d: 3.2 },
  { i: 'SM', n: 'Sarah Miller', c: 'London, UK', d: 1.8 },
  { i: 'RC', n: 'Robert Chen', c: 'Singapore', d: 2.5 },
  { i: 'AK', n: 'Amara Koné', c: 'Nairobi, Kenya', d: 1.1 },
];

const avatar = (x, y, ini, on = false) => `
  <g transform="translate(${x} ${y})">
    <circle r="15" fill="${on ? P.main : P.soft}"/>
    <text y="5" text-anchor="middle" font-size="10.5" font-weight="700" fill="${on ? WHITE : P.deep}"
      style="font-family:${MONO}">${ini}</text>
  </g>`;

/* ══════════════════════ HERO · 0 · CURRENT ══════════════════════ */
export const bizCurrent = {
  id: 'biz-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'A dashboard screenshot that never updates',
  desc: 'A "team dashboard · live" card with three stat tiles, three named employees with usage bars, and a green savings banner. The information architecture is exactly right — this is what a buyer wants to see — but it is a still image labelled live, the three bars never move, and none of the three promises in the copy (75% cheaper, no admin, 190+ countries) is demonstrated.',
  pros: ['Shows the actual product surface, which is what a B2B buyer buys', 'Named people and real cities make it concrete immediately'],
  cons: ['Marked "LIVE" while completely static', 'The 75% saving is a banner, not something you see happen', '"Eliminate admin headaches" has no visual at all', 'Three rows understate a product sold on managing whole fleets'],
  scores: { story: 3, motion: 1, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 210, uid)}
    <g transform="translate(56 58)">
      <g transform="translate(0 0)">
        <rect width="52" height="52" rx="14" fill="${P.main}"/>
        <g transform="translate(14 14)" fill="none" stroke="${WHITE}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        </g>
      </g>
      ${label(68, 26, 'Team dashboard', { size: 17 })}
      <circle cx="74" cy="42" r="5" fill="${GREEN}"/>
      ${mono(86, 46, 'LIVE', { size: 9.5, op: 0.4 })}
    </g>
    ${[['24', 'ACTIVE USERS'], ['11', 'COUNTRIES'], ['$847', 'THIS MONTH']].map((s, i) => `
      <g transform="translate(${56 + i * 172} 130)">
        <rect width="158" height="66" rx="14" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
        <text x="18" y="42" font-size="25" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">${s[0]}</text>
        ${mono(18, 58, s[1], { size: 8.5, op: 0.4 })}
      </g>`).join('')}
    ${panel(56, 214, 502, 156)}
    ${TEAM.slice(0, 3).map((t, i) => {
      const y = 246 + i * 46;
      const on = i === 1;
      return `
      ${on ? `<rect x="68" y="${y - 20}" width="478" height="40" rx="11" fill="none" stroke="${P.main}" stroke-width="2"/>` : ''}
      ${avatar(96, y, t.i, on)}
      ${label(122, y - 1, t.n, { size: 13.5 })}
      ${mono(122, y + 14, t.c, { size: 9.5, op: 0.38 })}
      <line x1="380" y1="${y}" x2="480" y2="${y}" stroke="${LINE}" stroke-width="4" stroke-linecap="round"/>
      <line x1="380" y1="${y}" x2="${380 + (t.d / 4) * 100}" y2="${y}" stroke="${P.main}" stroke-width="4" stroke-linecap="round"/>
      ${num(532, y + 4, t.d.toFixed(1) + 'GB', { size: 11.5, anchor: 'end', fill: INK, op: 0.55 })}`;
    }).join('')}
    <g transform="translate(56 388)">
      <rect width="502" height="40" rx="12" fill="${GREEN_SOFT}"/>
      <text x="251" y="26" text-anchor="middle" font-size="13" font-weight="700" fill="${GREEN_TEXT}">↗ Saving $2,341 vs traditional roaming</text>
    </g>`;
    return { svg: wrap(inner), pills: pB() };
  },
};

/* ══════════════════════ HERO · 1 · LIVE TEAM MAP ══════════════════════ */
export const teamMap = {
  id: 'bizmap',
  name: 'Live Team Map',
  family: 'Reach',
  tagline: 'Your people, where they actually are',
  desc: 'A dotted world grid with a pin for every team member. Pins light in sequence as each person connects, showing city, network and data used, while a counter tracks active users and countries. The headline word is "globally" — this is the only option that puts the team on a map and makes that word mean something.',
  pros: ['Gives "globally" a picture instead of a number', 'Named cities are instantly credible to anyone managing a distributed team', 'Continuous: pins keep lighting with no restart', 'Reuses the coverage motif from elsewhere on the site'],
  cons: ['A world map is the most predictable choice for this section', 'Loses the dashboard framing, which is what the buyer recognises'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const pins = [
      { x: 148, y: 168, n: 'Sarah M.', c: 'London', net: 'Vodafone', d: '1.8GB' },
      { x: 232, y: 236, n: 'Amara K.', c: 'Nairobi', net: 'Safaricom', d: '1.1GB' },
      { x: 430, y: 148, n: 'John D.', c: 'Tokyo', net: 'NTT', d: '3.2GB' },
      { x: 404, y: 250, n: 'Robert C.', c: 'Singapore', net: 'Singtel', d: '2.5GB' },
      { x: 92, y: 214, n: 'Luis F.', c: 'São Paulo', net: 'Vivo', d: '0.9GB' },
      { x: 516, y: 288, n: 'Mia T.', c: 'Sydney', net: 'Telstra', d: '2.1GB' },
    ];
    const inner = `
    ${dots(uid, 0.1)}
    ${bloom(320, 220, 240, uid)}
    ${mono(40, 50, 'YOUR TEAM · RIGHT NOW', { size: 10, op: 0.32 })}
    <!-- world grid -->
    <g opacity="0.5">
      ${Array.from({ length: 13 }, (_, r) => Array.from({ length: 24 }, (_, c) => {
      const x = 56 + c * 22, y = 110 + r * 18;
      const inside = Math.abs(Math.sin(c * 0.7 + r * 0.4)) > 0.42;
      return inside ? `<circle cx="${x}" cy="${y}" r="2.6" fill="${P.main}" opacity="0.28"/>` : '';
    }).join('')).join('')}
    </g>
    ${pins.map((p, i) => `
      <g data-pin="${i}">
        <circle cx="${p.x}" cy="${p.y}" r="7" fill="${P.main}" opacity="0.35" data-pdot/>
        <circle cx="${p.x}" cy="${p.y}" r="7" fill="none" stroke="${P.main}" stroke-width="2" opacity="0" data-pring/>
        <g data-pcard opacity="0" transform="translate(${p.x + 14} ${p.y - 34})">
          <rect width="136" height="46" rx="11" fill="${INK}"/>
          <text x="12" y="20" font-size="11.5" font-weight="700" fill="${WHITE}">${p.n}</text>
          <text x="12" y="36" font-size="9.5" font-weight="700" fill="${WHITE}" opacity="0.6"
            style="font-family:${MONO}">${p.c} · ${p.net}</text>
          <text x="124" y="20" text-anchor="end" font-size="10" font-weight="700" fill="${P.main}"
            style="font-family:${MONO}">${p.d}</text>
        </g>
      </g>`).join('')}
    ${[['24', 'ACTIVE USERS'], ['11', 'COUNTRIES'], ['$0', 'ROAMING FEES']].map((s, i) => `
      <g transform="translate(${40 + i * 194} 374)">
        <rect width="180" height="64" rx="15" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
        <text x="18" y="42" font-size="24" font-weight="700" fill="${i === 2 ? GREEN_TEXT : P.deep}"
          style="font-family:${MONO}">${s[0]}</text>
        ${mono(18, 56, s[1], { size: 8.5, op: 0.4 })}
      </g>`).join('')}`;

    return {
      svg: wrap(inner),
      pills: pB('24 users live'),
      init(root) {
        const pins = [...root.querySelectorAll('[data-pin]')];
        if (!pins.length) return null;
        let i = 0;
        const tick = () => {
          pins.forEach((p, k) => {
            const on = k === i;
            p.querySelector('[data-pdot]').setAttribute('opacity', on ? '1' : '0.35');
            p.querySelector('[data-pdot]').setAttribute('r', on ? '9' : '7');
            p.querySelector('[data-pcard]').setAttribute('opacity', on ? '1' : '0');
            const ring = p.querySelector('[data-pring]');
            if (on) {
              ring.setAttribute('opacity', '0.8');
              let r = 9;
              const a = setInterval(() => {
                r += 3; ring.setAttribute('r', String(r));
                ring.setAttribute('opacity', String(Math.max(0, 0.8 - (r - 9) / 24)));
                if (r > 30) { clearInterval(a); ring.setAttribute('opacity', '0'); }
              }, 45);
            }
          });
          i = (i + 1) % pins.length;
        };
        tick();
        const id = setInterval(tick, 1600);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════════════ HERO · 2 · INVOICE SHOWDOWN ══════════════════════ */
export const invoice = {
  id: 'bizinvoice',
  name: 'Invoice Showdown',
  family: 'Cost',
  tagline: 'Two bills, side by side, line by line',
  desc: 'Two invoices for the same month. On the left, traditional roaming: line items arrive one by one and the total climbs past three thousand dollars. On the right, the Openline bill fills with the same trips at a fraction of the price and lands flat. The gap is stamped as the saving. The first number in the copy is 75%; this is that number happening.',
  pros: ['Puts the headline saving on screen as arithmetic, not a badge', 'An invoice is the artefact the buyer is actually trying to shrink', 'The climbing total creates real tension before the payoff', 'Numbers travel across every language without redesign'],
  cons: ['Needs a defensible basis for the comparison figures', 'Two documents is a dense composition on a phone', 'Less warm than showing the team itself'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 3, brand: 4, ease: 4 },
  build: (uid) => {
    const rows = ['Tokyo · 3.2 GB', 'London · 1.8 GB', 'Singapore · 2.5 GB', 'Nairobi · 1.1 GB', 'Sydney · 2.1 GB'];
    const side = (x, title, tone, role) => `
      <g transform="translate(${x} 88)">
        <rect width="264" height="300" rx="18" fill="${WHITE}" stroke="${tone === 'bad' ? LINE : P.main}"
          stroke-width="${tone === 'bad' ? 1.5 : 2.5}"/>
        ${label(20, 34, title, { size: 14.5, fill: tone === 'bad' ? INK : P.deep, op: tone === 'bad' ? 0.6 : 1 })}
        ${mono(20, 54, 'SEPTEMBER · 24 USERS', { size: 8.5, op: 0.32 })}
        <line x1="20" y1="66" x2="244" y2="66" stroke="${LINE}" stroke-width="1.2"/>
        ${rows.map((r, i) => `
          <g data-irow="${role}-${i}" opacity="0" transform="translate(0 ${94 + i * 30})">
            ${mono(20, 0, r.toUpperCase(), { size: 9, op: 0.42 })}
            <text x="244" y="1" text-anchor="end" font-size="12" font-weight="700"
              fill="${tone === 'bad' ? '#DC2626' : P.deep}" style="font-family:${MONO}" data-iamt>$0</text>
          </g>`).join('')}
        <line x1="20" y1="252" x2="244" y2="252" stroke="${LINE}" stroke-width="1.5"/>
        ${mono(20, 276, 'TOTAL', { size: 9.5, op: 0.4 })}
        <text x="244" y="280" text-anchor="end" font-size="21" font-weight="700"
          fill="${tone === 'bad' ? '#DC2626' : P.deep}" style="font-family:${MONO}" data-itot="${role}">$0</text>
      </g>`;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 230, 220, uid)}
    ${mono(40, 52, 'SAME MONTH · SAME TRIPS · TWO BILLS', { size: 10, op: 0.32 })}
    ${side(40, 'Traditional roaming', 'bad', 'bad')}
    ${side(336, 'Openline Business', 'good', 'good')}
    <g transform="translate(40 404)">
      <rect width="560" height="40" rx="12" fill="${GREEN_SOFT}"/>
      <text x="280" y="26" text-anchor="middle" font-size="13.5" font-weight="700" fill="${GREEN_TEXT}">
        ↘ <tspan data-role="isave">You keep $0</tspan> — that is <tspan data-role="ipct">0%</tspan> off the roaming bill
      </text>
    </g>`;

    return {
      svg: wrap(inner),
      pills: pB('75% cheaper', 'left'),
      init(root) {
        const bad = [0, 1, 2, 3, 4].map(i => root.querySelector(`[data-irow="bad-${i}"]`));
        const good = [0, 1, 2, 3, 4].map(i => root.querySelector(`[data-irow="good-${i}"]`));
        const tb = root.querySelector('[data-itot="bad"]');
        const tg = root.querySelector('[data-itot="good"]');
        const sv = root.querySelector('[data-role="isave"]');
        const pc = root.querySelector('[data-role="ipct"]');
        if (!bad[0]) return null;
        const B = [812, 468, 640, 296, 534];
        const G = [196, 118, 158, 74, 132];
        let step = 0;
        const timers = [];
        const run = () => {
          step = 0;
          [...bad, ...good].forEach(g => g && g.setAttribute('opacity', '0'));
          if (tb) tb.textContent = '$0';
          if (tg) tg.textContent = '$0';
          const iv = setInterval(() => {
            if (step >= B.length) { clearInterval(iv); timers.push(setTimeout(run, 2600)); return; }
            const k = step;
            [bad, good].forEach((set, s) => {
              const g = set[k];
              if (!g) return;
              g.setAttribute('opacity', '1');
              const amt = g.querySelector('[data-iamt]');
              if (amt) amt.textContent = '$' + (s ? G[k] : B[k]);
            });
            const sb = B.slice(0, k + 1).reduce((a, b) => a + b, 0);
            const sg = G.slice(0, k + 1).reduce((a, b) => a + b, 0);
            if (tb) tb.textContent = '$' + sb.toLocaleString('en-US');
            if (tg) tg.textContent = '$' + sg.toLocaleString('en-US');
            if (sv) sv.textContent = `You keep $${(sb - sg).toLocaleString('en-US')}`;
            if (pc) pc.textContent = `${Math.round((1 - sg / sb) * 100)}%`;
            step++;
          }, 620);
          timers.push(iv);
        };
        run();
        return () => timers.forEach(t => { clearInterval(t); clearTimeout(t); });
      },
    };
  },
};

/* ══════════════════════ HERO · 3 · ZERO-ADMIN ONBOARDING ══════════════════════ */
export const onboard = {
  id: 'bizonboard',
  name: 'Zero-Admin Onboarding',
  family: 'Operations',
  tagline: 'Add a person, they are live in 30 seconds',
  desc: 'A row in the team list appears, an eSIM is provisioned against it, a 30-second timer runs out and the row flips to live — then the next person arrives and the user count climbs from 12 towards 24. The middle promise in the copy is "eliminate admin headaches", and it is currently the only one with no picture at all.',
  pros: ['Illustrates the admin promise, which nothing else on the page does', 'A counter climbing towards 24 gives the loop a goal', 'Keeps the dashboard framing the buyer already recognises', 'Shows the product being operated, not just observed'],
  cons: ['Narrower story than cost or coverage', 'The 30-second claim has to hold for the largest customers too'],
  scores: { story: 4, motion: 5, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const people = [
      { i: 'SM', n: 'Sarah Miller', c: 'London, UK' },
      { i: 'JD', n: 'John Davis', c: 'Tokyo, Japan' },
      { i: 'RC', n: 'Robert Chen', c: 'Singapore' },
      { i: 'AK', n: 'Amara Koné', c: 'Nairobi, Kenya' },
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 210, uid)}
    ${mono(40, 50, 'ADD A PERSON · NO SHIPPING · NO FORMS', { size: 10, op: 0.32 })}
    <g transform="translate(40 74)">
      <rect width="362" height="66" rx="15" fill="${P.main}"/>
      <g transform="translate(22 22)" fill="none" stroke="${WHITE}" stroke-width="2.4" stroke-linecap="round">
        <path d="M 0 11 H 22 M 11 0 V 22"/>
      </g>
      ${label(64, 40, 'Invite team member', { size: 16, fill: WHITE })}
      <g transform="translate(276 33)">
        <rect x="-44" y="-14" width="88" height="28" rx="14" fill="${WHITE}" opacity="0.22"/>
        <text y="4" text-anchor="middle" font-size="10.5" font-weight="700" fill="${WHITE}"
          style="font-family:${MONO}"><tspan data-role="otimer">00:30</tspan></text>
      </g>
    </g>
    <g transform="translate(420 74)">
      <rect width="180" height="66" rx="15" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
      <text x="20" y="44" font-size="26" font-weight="700" fill="${P.deep}" style="font-family:${MONO}"><tspan data-role="ocount">12</tspan></text>
      ${mono(74, 42, 'ACTIVE USERS', { size: 9, op: 0.4 })}
    </g>
    ${panel(40, 158, 560, 260)}
    ${mono(64, 190, 'TEAM', { size: 9, op: 0.35 })}
    ${mono(340, 190, 'eSIM', { size: 9, op: 0.35 })}
    ${mono(576, 190, 'STATE', { size: 9, op: 0.35, anchor: 'end' })}
    <line x1="40" y1="202" x2="600" y2="202" stroke="${LINE}" stroke-width="1.5"/>
    ${people.map((p, i) => `
      <g data-orow="${i}" opacity="0" transform="translate(0 ${234 + i * 46})">
        <rect x="52" y="-18" width="536" height="38" rx="10" fill="${P.main}" opacity="0" data-oglow/>
        ${avatar(82, 0, p.i)}
        ${label(108, -1, p.n, { size: 13.5 })}
        ${mono(108, 14, p.c, { size: 9.5, op: 0.38 })}
        <g transform="translate(340 0)">
          <rect x="0" y="-11" width="30" height="22" rx="5" fill="${P.soft}" data-ochip/>
          <path d="M 8 -4 L 4 3 H 11 L 9 9 L 20 -1 H 13 L 16 -4 Z" fill="${P.deep}" data-oglyph/>
        </g>
        <text x="576" y="4" text-anchor="end" font-size="10.5" font-weight="700" fill="${INK}" opacity="0.35"
          letter-spacing="0.8" style="font-family:${MONO}" data-ostate>PROVISIONING</text>
      </g>`).join('')}`;

    return {
      svg: wrap(inner),
      pills: pB('Live in 30s'),
      init(root) {
        const rows = [...root.querySelectorAll('[data-orow]')];
        const timerEl = root.querySelector('[data-role="otimer"]');
        const cntEl = root.querySelector('[data-role="ocount"]');
        if (!rows.length) return null;
        let k = 0, count = 12;
        const timers = [];
        const step = () => {
          const row = rows[k % rows.length];
          if (k % rows.length === 0) {
            rows.forEach(r => {
              r.setAttribute('opacity', '0');
              r.querySelector('[data-oglow]').setAttribute('opacity', '0');
              r.querySelector('[data-ostate]').textContent = 'PROVISIONING';
            });
          }
          row.setAttribute('opacity', '1');
          let t = 30;
          const cd = setInterval(() => {
            t -= 6;
            if (timerEl) timerEl.textContent = `00:${String(Math.max(0, t)).padStart(2, '0')}`;
            if (t <= 0) {
              clearInterval(cd);
              row.querySelector('[data-oglow]').setAttribute('opacity', '0.09');
              const st = row.querySelector('[data-ostate]');
              st.textContent = 'LIVE';
              st.setAttribute('opacity', '1');
              st.setAttribute('fill', P.deep);
              row.querySelector('[data-ochip]').setAttribute('fill', P.main);
              row.querySelector('[data-oglyph]').setAttribute('fill', WHITE);
              count = Math.min(24, count + 3);
              if (cntEl) cntEl.textContent = String(count);
              if (count >= 24) count = 12;
            }
          }, 220);
          timers.push(cd);
          k++;
          timers.push(setTimeout(step, 2400));
        };
        step();
        return () => timers.forEach(t => { clearInterval(t); clearTimeout(t); });
      },
    };
  },
};

/* ══════════════════════ HERO · 4 · OPS FEED ══════════════════════ */
export const opsFeed = {
  id: 'bizfeed',
  name: 'Ops Feed',
  family: 'Credibility',
  tagline: 'Every connection, as it happens',
  desc: 'A console feed of real events: Sarah lands in London and attaches to Vodafone, a policy caps a heavy user, an invoice line is booked at zero roaming cost. Lines arrive continuously with timestamps and a small header counts active users and countries. It reads as the system your IT team would actually watch.',
  pros: ['Most credible register for an enterprise buyer', 'Covers usage, policy and billing in one surface — several bullets at once', 'Endless motion with no loop seam', 'Cheap to render and easy to extend with real event types'],
  cons: ['Text-heavy, so it needs trimming on a phone', 'Cold — no people, no places, no warmth', 'Invented events are a credibility risk until they are real'],
  scores: { story: 4, motion: 5, perf: 5, mobile: 3, brand: 3, ease: 4 },
  build: (uid) => {
    const inner = `
    ${dots(uid)}
    <g transform="translate(34 46)">
      <rect width="572" height="368" rx="20" fill="${INK}"/>
      <rect width="572" height="46" rx="20" fill="${WHITE}" opacity="0.04"/>
      <rect y="32" width="572" height="14" fill="${WHITE}" opacity="0.04"/>
      <circle cx="24" cy="23" r="5" fill="${GREEN}"><animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite"/></circle>
      ${mono(40, 27, 'TEAM CONNECTIVITY · LIVE', { size: 10, fill: WHITE, op: 0.55 })}
      ${mono(548, 27, '24 USERS · 11 COUNTRIES', { size: 10, fill: WHITE, op: 0.35, anchor: 'end' })}
      ${[['24', 'ACTIVE'], ['11', 'COUNTRIES'], ['$847', 'MONTH'], ['$0', 'ROAMING']].map((s, i) => `
        <g transform="translate(${20 + i * 134} 62)">
          <rect width="124" height="66" rx="13" fill="${WHITE}" opacity="0.05"/>
          <text x="14" y="44" font-size="19" font-weight="700" fill="${i === 3 ? GREEN : WHITE}"
            style="font-family:${MONO}">${s[0]}</text>
          ${mono(14, 58, s[1], { size: 8, fill: WHITE, op: 0.4 })}
        </g>`).join('')}
      <g transform="translate(20 146)">
        <rect width="532" height="200" rx="14" fill="${WHITE}" opacity="0.05"/>
        ${mono(16, 24, 'EVENT FEED', { size: 8.5, fill: WHITE, op: 0.42 })}
        <g data-bfeed>
          ${Array.from({ length: 6 }, (_, i) => `<text data-brow="${i}" x="16" y="${52 + i * 26}" font-size="10.5"
            font-weight="600" fill="${WHITE}" opacity="0" style="font-family:${MONO}">—</text>`).join('')}
        </g>
      </g>
    </g>`;

    return {
      svg: wrap(inner),
      pills: pB('Live operations'),
      init(root) {
        const rows = [...root.querySelectorAll('[data-brow]')];
        if (!rows.length) return null;
        const people = ['Sarah M.', 'John D.', 'Robert C.', 'Amara K.', 'Mia T.', 'Luis F.'];
        const cities = [['London', 'Vodafone'], ['Tokyo', 'NTT'], ['Singapore', 'Singtel'],
          ['Nairobi', 'Safaricom'], ['Sydney', 'Telstra'], ['São Paulo', 'Vivo']];
        const kinds = [
          () => { const i = Math.floor(Math.random() * 6); return `${people[i]} attached · ${cities[i][0]} · ${cities[i][1]} · $0 roaming`; },
          () => `policy applied · data cap 5 GB · ${people[Math.floor(Math.random() * 6)]}`,
          () => `invoice line booked · ${cities[Math.floor(Math.random() * 6)][0]} · consolidated`,
          () => `eSIM provisioned · new hire · live in 28s`,
        ];
        const log = [];
        const tick = () => {
          const t = new Date().toISOString().slice(11, 19);
          log.unshift(`${t}  ${kinds[Math.floor(Math.random() * kinds.length)]()}`);
          log.length = Math.min(log.length, 6);
          rows.forEach((r, i) => {
            r.textContent = log[i] || '—';
            r.setAttribute('opacity', String(Math.max(0.2, 0.9 - i * 0.13)));
          });
        };
        tick(); tick();
        const id = setInterval(tick, 1500);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════════════ HERO · 5 · ONE INVOICE ══════════════════════ */
export const oneInvoice = {
  id: 'bizone',
  name: 'Eleven Countries, One Invoice',
  family: 'Calm / premium',
  tagline: 'Many lines converge into one document',
  desc: 'Country chips drift in from the edges of the frame — Japan, UK, Singapore, Kenya, Australia — and each one folds into a single invoice card in the middle, whose line count and total grow as they land. It ends on one document, one total, one payment. The calmest option, and the one that best states the administrative promise without a dashboard.',
  pros: ['Converging motion is the clearest metaphor for consolidation', 'Beautiful at rest; works as a still image in a deck as well', 'Country names carry the coverage claim at the same time', 'No fabricated telemetry, so nothing to keep honest later'],
  cons: ['Shows the admin benefit but not the 75% cost claim', 'Less information than the dashboard it would replace'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: (uid) => {
    const chips = [
      { x: 58, y: 108, t: '🇯🇵 Japan' }, { x: 470, y: 96, t: '🇬🇧 UK' },
      { x: 42, y: 288, t: '🇸🇬 Singapore' }, { x: 478, y: 300, t: '🇰🇪 Kenya' },
      { x: 250, y: 66, t: '🇦🇺 Australia' }, { x: 262, y: 380, t: '🇧🇷 Brazil' },
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 228, 230, uid)}
    ${mono(40, 46, 'ONE BILLING PERIOD · ONE DOCUMENT', { size: 10, op: 0.32 })}
    ${chips.map((c, i) => `
      <g data-cchip="${i}" transform="translate(${c.x} ${c.y})" opacity="0.9">
        <rect width="124" height="38" rx="19" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
        <text x="16" y="25" font-size="13" font-weight="700" fill="${INK}" opacity="0.7">${c.t}</text>
      </g>`).join('')}
    <g transform="translate(212 150)">
      <rect width="216" height="172" rx="18" fill="${WHITE}" stroke="${P.main}" stroke-width="2.5"/>
      ${mono(20, 32, 'OPENLINE BUSINESS', { size: 8.5, op: 0.4 })}
      ${label(20, 56, 'One invoice', { size: 17, fill: P.deep })}
      <line x1="20" y1="70" x2="196" y2="70" stroke="${LINE}" stroke-width="1.2"/>
      ${mono(20, 92, 'LINES', { size: 9, op: 0.38 })}
      <text x="196" y="94" text-anchor="end" font-size="14" font-weight="700" fill="${INK}" opacity="0.6"
        style="font-family:${MONO}"><tspan data-role="olines">0</tspan></text>
      ${mono(20, 116, 'COUNTRIES', { size: 9, op: 0.38 })}
      <text x="196" y="118" text-anchor="end" font-size="14" font-weight="700" fill="${INK}" opacity="0.6"
        style="font-family:${MONO}"><tspan data-role="octry">0</tspan></text>
      <line x1="20" y1="132" x2="196" y2="132" stroke="${LINE}" stroke-width="1.5"/>
      ${mono(20, 156, 'TOTAL', { size: 9, op: 0.4 })}
      <text x="196" y="158" text-anchor="end" font-size="18" font-weight="700" fill="${P.deep}"
        style="font-family:${MONO}"><tspan data-role="ototal">$0</tspan></text>
    </g>
    <g transform="translate(212 344)">
      <rect width="216" height="34" rx="17" fill="${GREEN_SOFT}"/>
      <text x="108" y="22" text-anchor="middle" font-size="11.5" font-weight="700" fill="${GREEN_TEXT}"
        style="font-family:${MONO}">ONE PAYMENT, ONE TERM</text>
    </g>`;

    return {
      svg: wrap(inner),
      pills: pB('Central billing'),
      init(root) {
        const cs = [...root.querySelectorAll('[data-cchip]')];
        const lines = root.querySelector('[data-role="olines"]');
        const ctry = root.querySelector('[data-role="octry"]');
        const total = root.querySelector('[data-role="ototal"]');
        if (!cs.length) return null;
        const home = cs.map(c => c.getAttribute('transform'));
        cs.forEach(c => { c.style.transition = 'transform .9s cubic-bezier(.2,.7,.3,1), opacity .9s ease'; });
        let k = 0;
        const timers = [];
        const run = () => {
          if (k === 0) {
            cs.forEach((c, i) => { c.setAttribute('transform', home[i]); c.style.opacity = '0.9'; });
            if (lines) lines.textContent = '0';
            if (ctry) ctry.textContent = '0';
            if (total) total.textContent = '$0';
          }
          const c = cs[k];
          if (c) {
            c.setAttribute('transform', 'translate(258 214) scale(0.6)');
            c.style.opacity = '0';
            if (lines) lines.textContent = String((k + 1) * 4);
            if (ctry) ctry.textContent = String(k + 1);
            if (total) total.textContent = '$' + ((k + 1) * 141).toLocaleString('en-US');
          }
          k = (k + 1) % (cs.length + 2);
          timers.push(setTimeout(run, 1100));
        };
        run();
        return () => timers.forEach(t => clearTimeout(t));
      },
    };
  },
};

/* ══ BIZ HERO · 6–9 ═════════════════════════════════════════════════ */

export const bizExpenses = {
  id: 'biz-expenses',
  name: 'The Expense Reports That Do Not Happen',
  family: 'Operations',
  tagline: 'Eleven claims, replaced by one line',
  desc:
    'The real cost of roaming in a company is not the data, it is eleven expense claims, a finance ' +
    'reviewer and a month of chasing receipts. The claims arrive one by one and are then replaced by ' +
    'a single invoice line. This is the argument that wins over finance, and it is currently missing ' +
    'from the page.',
  pros: [
    'Speaks to finance, who sign the contract, rather than to travellers',
    'Administrative time is a cost nobody else in the category quantifies',
    'The collapse from eleven to one is a single clean movement',
  ],
  cons: ['Needs a defensible per-claim processing cost', 'Receipt artwork risks looking cluttered'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const claims = [['Tokyo', 42], ['London', 18], ['Singapore', 51], ['Nairobi', 24],
      ['Berlin', 16], ['Dubai', 38], ['S\u00e3o Paulo', 29], ['Seoul', 33]];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${mono(72, 54, 'LAST MONTH, WITHOUT OPENLINE', { size: 9.5, op: 0.45 })}
    ${claims.map(([city, amt], i) => {
      const x = 72 + (i % 4) * 126, y = 74 + Math.floor(i / 4) * 66;
      return `<g>
        <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;${(0.3 + i * 0.024).toFixed(3)};${(0.36 + i * 0.024).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(x, y, 114, 54, { r: 9, fill: WHITE, stroke: LINE })}
        ${mono(x + 14, y + 22, 'ROAMING CLAIM', { size: 7.5, op: 0.38 })}
        ${label(x + 14, y + 42, city, { size: 12 })}
        ${num(x + 100, y + 42, `\u20ac${amt}`, { size: 12, anchor: 'end', fill: RED })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.16;0.24;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(544, 54, '8 CLAIMS \u00b7 3 REVIEWERS \u00b7 5 WEEKS', { size: 9, anchor: 'end', op: 0.5, fill: RED })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 224, 496, 94, { r: 14, fill: P.wash, stroke: P.main, sw: 2 })}
      ${mono(96, 254, 'THIS MONTH, WITH OPENLINE', { size: 9, op: 0.55, fill: P.deep })}
      ${label(96, 288, 'One invoice line \u00b7 8 travellers \u00b7 6 countries', { size: 16 })}
      ${num(544, 290, '\u20ac251', { size: 24, anchor: 'end', fill: P.deep })}
      ${mono(96, 308, 'NO CLAIMS, NO RECEIPTS, NO REVIEWERS', { size: 8.5, op: 0.4 })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.78;0.86;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 342, 240, 78, { r: 12, fill: WHITE, stroke: LINE })}
      ${mono(96, 370, 'FINANCE TIME SAVED', { size: 8.5, op: 0.4 })}
      ${num(96, 402, '9 hours / month', { size: 16 })}
      ${card(328, 342, 240, 78, { r: 12, fill: WHITE, stroke: LINE })}
      ${mono(352, 370, 'CLAIMS TO CHASE', { size: 8.5, op: 0.4 })}
      ${num(352, 402, 'none', { size: 16, fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pB('One invoice line') };
  },
};

export const bizLanded = {
  id: 'biz-landed',
  name: 'Landed and Working',
  family: 'Operations',
  tagline: 'A new hire online before they reach the office',
  desc:
    'Provisioning is an IT queue, and this removes it. A new starter is added at 09:04, the profile ' +
    'is issued at 09:04, and they are connected in S\u00e3o Paulo at 09:05 — no shipping, no local SIM, ' +
    'no ticket. For a company hiring across borders, onboarding time is the metric IT is judged on.',
  pros: [
    'Onboarding speed is what IT reports on internally',
    'Removes shipping, which is the real bottleneck for distributed hires',
    'Timestamps make the claim specific rather than aspirational',
  ],
  cons: ['Overlaps with the existing onboarding option', 'Assumes a device already supports eSIM'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 10;
    const steps = [
      ['09:04:02', 'Added to the team', 'admin console, one field'],
      ['09:04:06', 'Profile issued', 'no shipment, no courier'],
      ['09:04:41', 'Installed on her phone', 'QR from the welcome email'],
      ['09:05:12', 'Online in S\u00e3o Paulo', 'Claro 5G \u00b7 policy applied'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${mono(72, 54, 'NEW STARTER \u00b7 AMARA K. \u00b7 REMOTE, BRAZIL', { size: 9.5, op: 0.45 })}
    ${steps.map(([ts, nm, note], i) => {
      const y = 80 + i * 80;
      const on = 0.06 + i * 0.16;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.06).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(72, y, 496, 66, { r: 12, fill: WHITE, stroke: LINE })}
        <circle cx="104" cy="${y + 33}" r="12" fill="${P.wash}"/>
        <path d="M 97 ${y + 33} l 5 5 l 9 -10" fill="none" stroke="${P.main}" stroke-width="2.4" stroke-linecap="round"/>
        ${label(136, y + 30, nm, { size: 14 })}
        ${mono(136, y + 50, note, { size: 9, op: 0.4 })}
        ${mono(544, y + 40, ts, { size: 10, anchor: 'end', op: 0.55, fill: P.deep })}
        ${i < 3 ? `<line x1="104" y1="${y + 66}" x2="104" y2="${y + 80}" stroke="${LINE}" stroke-width="2"/>` : ''}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.76;0.84;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 400, 496, 46, { r: 11, fill: P.wash, stroke: P.main, sw: 1.8 })}
      ${label(96, 430, 'Seventy seconds, and no IT ticket', { size: 14, fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pB('70 seconds to online') };
  },
};

export const bizPolicy = {
  id: 'biz-policy',
  name: 'The Policy Holds',
  family: 'Control',
  tagline: 'A limit that stops the bill, not a warning email',
  desc:
    'Every company has been handed a surprise five-figure roaming bill. A policy is set at twenty ' +
    'gigabytes per traveller, and when one device reaches it the data stops rather than a warning ' +
    'being emailed to somebody on holiday. Hard caps are the reason a finance team will pick this over ' +
    'a corporate carrier plan.',
  pros: [
    'A hard cap is what finance actually wants, and few competitors offer it',
    'Turns a governance feature into a money argument',
    'The stopped device is a decisive, legible moment',
  ],
  cons: ['Cutting a traveller off has support consequences', 'Needs per-user policy to genuinely exist'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${mono(72, 54, 'POLICY \u00b7 20 GB PER TRAVELLER, PER MONTH', { size: 9.5, op: 0.45 })}
    ${TEAM.map((t, i) => {
      const y = 78 + i * 68;
      const capped = i === 0;
      const pct = capped ? 1 : [0, 0.42, 0.61, 0.28][i];
      const on = 0.08 + i * 0.1;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(72, y, 496, 56, { r: 12, fill: WHITE, stroke: LINE })}
        ${avatar(102, y + 28, t.i, capped)}
        ${label(134, y + 26, t.n, { size: 13 })}
        ${mono(134, y + 44, t.c, { size: 8.5, op: 0.38 })}
        <rect x="272" y="${y + 23}" width="188" height="10" rx="5" fill="#EEF0F3"/>
        <rect x="272" y="${y + 23}" width="0" height="10" rx="5" fill="${capped ? RED : P.main}">
          <animate attributeName="width" values="0;${Math.round(pct * 188)};${Math.round(pct * 188)}"
            keyTimes="0;${(on + 0.22).toFixed(3)};1" dur="${dur}s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.2 1;0 0 1 1"/>
        </rect>
        ${capped ? `<g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.5;0.58;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          ${mono(544, y + 32, 'STOPPED AT 20 GB', { size: 9, anchor: 'end', op: 0.8, fill: RED })}
        </g>` : `${mono(544, y + 32, `${(pct * 20).toFixed(1)} GB`, { size: 10, anchor: 'end', op: 0.5 })}`}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 356, 240, 76, { r: 12, fill: WHITE, stroke: LINE })}
      ${mono(96, 384, 'WITHOUT A HARD CAP', { size: 8.5, op: 0.4 })}
      ${num(96, 416, '\u20ac4,180 bill shock', { size: 15, fill: RED })}
      ${card(328, 356, 240, 76, { r: 12, fill: P.wash, stroke: P.main, sw: 2 })}
      ${mono(352, 384, 'WITH ONE', { size: 8.5, op: 0.5, fill: P.deep })}
      ${num(352, 416, 'exactly \u20ac251', { size: 15, fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pB('Hard caps, not warnings') };
  },
};

export const bizWhereTheyAre = {
  id: 'biz-where',
  name: 'Where The Team Is',
  family: 'Visibility',
  tagline: 'Twelve people, four continents, one screen',
  desc:
    'Managing a distributed team means never quite knowing who is connected. A live roster shows ' +
    'twelve people with their city, their carrier and their connection state, sorted by who is ' +
    'currently offline. Operational visibility is the quiet reason an ops lead keeps a tool, and this ' +
    'is the only option that offers it.',
  pros: [
    'Serves the daily user rather than the buying moment',
    'Sorting offline people to the top is a genuinely useful design choice',
    'Reads as a real product surface, which builds credibility',
  ],
  cons: ['Employee-location tracking needs careful framing', 'Dense at this size'],
  scores: { story: 4, motion: 4, perf: 4, mobile: 3, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 12;
    const people = [
      ['AK', 'Amara Kon\u00e9', 'Nairobi', 'Safaricom', 'offline'],
      ['JD', 'John Davis', 'Tokyo', 'NTT Docomo', 'online'],
      ['SM', 'Sarah Miller', 'London', 'Vodafone', 'online'],
      ['RC', 'Robert Chen', 'Singapore', 'Singtel', 'online'],
      ['LB', 'Lena Bauer', 'Berlin', 'Telekom', 'online'],
      ['MP', 'Miguel Pinto', 'S\u00e3o Paulo', 'Claro', 'online'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${mono(72, 54, 'TEAM \u00b7 12 PEOPLE \u00b7 SORTED BY WHO NEEDS HELP', { size: 9.5, op: 0.45 })}
    ${people.map(([ini, nm, city, carrier, st], i) => {
      const y = 76 + i * 56;
      const off = st === 'offline';
      const on = 0.06 + i * 0.09;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.045).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(72, y, 496, 46, { r: 11, fill: off ? '#FFF7F5' : WHITE, stroke: off ? RED : LINE, sw: off ? 1.8 : 1.5 })}
        ${avatar(100, y + 23, ini, !off)}
        ${label(130, y + 27, nm, { size: 12.5 })}
        ${mono(280, y + 27, city, { size: 9, op: 0.42 })}
        ${mono(392, y + 27, carrier, { size: 9, op: 0.42 })}
        <circle cx="500" cy="${y + 23}" r="4.5" fill="${off ? RED : GREEN}"/>
        ${mono(544, y + 27, st, { size: 9, anchor: 'end', op: 0.55, fill: off ? RED : GREEN_TEXT })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 408, 496, 42, { r: 11, fill: P.wash, stroke: P.main, sw: 1.8 })}
      ${label(96, 436, 'One person needs a top-up. You knew before they asked.', { size: 12.5, fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pB('Live team roster') };
  },
};

/* ── registry ── */

export const bizTheSaving = {
  id: 'biz-saving',
  name: 'The Seventy-Five Percent',
  family: 'Finance',
  tagline: 'The headline number, shown as arithmetic',
  desc:
    'The copy claims a seventy-five percent saving and the panel proves none of it. This does the ' +
    'arithmetic in public: twelve travellers, their actual roaming bills last quarter, the same usage ' +
    'priced on Openline, and the percentage derived rather than asserted. If we are going to put a ' +
    'number in the heading, the panel should be able to show it.',
  pros: [
    'Substantiates the page\u2019s own headline claim, which nothing currently does',
    'Derived arithmetic survives a procurement challenge',
    'Reusable as a slide in a sales deck',
  ],
  cons: ['The number must hold for a typical customer, not a best case', 'Numeric and dry'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const rows = [
      ['Roaming, last quarter', '12 travellers \u00b7 6 countries', 9840, RED],
      ['Same usage, on Openline', 'identical data, identical trips', 2460, null],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 250, uid)}
    ${mono(72, 54, 'ACME INTERNATIONAL \u00b7 Q1, RECALCULATED', { size: 9.5, op: 0.45 })}
    ${rows.map(([nm, note, amt, col], i) => {
      const y = 82 + i * 116;
      const on = 0.08 + i * 0.22;
      const ours = col === null;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.07).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(72, y, 496, 98, { r: 14, fill: ours ? P.wash : WHITE, stroke: ours ? P.main : LINE, sw: ours ? 2 : 1.5 })}
        ${mono(96, y + 30, nm.toUpperCase(), { size: 9, op: ours ? 0.55 : 0.42, fill: ours ? P.deep : INK })}
        ${mono(96, y + 50, note, { size: 8.5, op: 0.35 })}
        ${num(96, y + 86, `\u20ac${amt.toLocaleString('en-US')}`, { size: 30, fill: ours ? P.deep : (col || INK) })}
        <rect x="300" y="${y + 62}" width="244" height="14" rx="7" fill="#EEF0F3"/>
        <rect x="300" y="${y + 62}" width="0" height="14" rx="7" fill="${ours ? P.main : col}">
          <animate attributeName="width" values="0;${ours ? 61 : 244};${ours ? 61 : 244}"
            keyTimes="0;${(on + 0.18).toFixed(3)};1" dur="${dur}s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.2 1;0 0 1 1"/>
        </rect>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.7;0.78;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 322, 496, 122, { r: 14, fill: WHITE, stroke: INK, sw: 2.5 })}
      ${mono(96, 352, 'THE DIFFERENCE', { size: 9, op: 0.42 })}
      ${num(96, 396, '\u20ac7,380 saved', { size: 26 })}
      ${mono(96, 424, 'ON IDENTICAL USAGE \u00b7 NO BEHAVIOUR CHANGE REQUIRED', { size: 8.5, op: 0.38 })}
      ${num(544, 396, '75%', { size: 40, anchor: 'end', fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pB('75%, shown as arithmetic') };
  },
};

/* ══ BIZ HERO · 11–15 ════════════════════════════════════════════════ */

const { phoneLight } = K;

export const bizCaseStudy = {
  id: 'biz-case',
  name: 'The Customer Result',
  family: 'Editorial',
  tagline: 'One company, one number, in their words',
  desc:
    'The page already carries a customer result that nothing in the panel uses: a 25-person team ' +
    'travelling three times a year saved $47,000 annually, and setup took two hours instead of two ' +
    'weeks. This sets that as a pull quote with the three figures beneath it. No dashboard, no chart — ' +
    'a reference, which is what a B2B buyer asks for after the demo.',
  pros: [
    'The only option on the board that offers social proof rather than a product picture',
    'Every figure is already published on this page, so nothing new has to be defended',
    'Reads well as a still and lifts straight into a deck or a case-study page',
  ],
  cons: [
    'The quote wording is written for this mock — it needs a real, named customer before it ships',
    'An anonymous \u201coperations director\u201d is weaker proof than a logo',
    'Almost no motion, so it will feel static next to the animated options',
  ],
  scores: { story: 5, motion: 2, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 11;
    const figs = [
      ['$47,000', 'SAVED IN A YEAR', P.deep],
      ['2 hours', 'TO SET UP, NOT 2 WEEKS', INK],
      ['85%', 'LESS ADMIN TIME', P.deep],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 250, uid)}
    ${mono(48, 54, 'CUSTOMER RESULT \u00b7 25 PEOPLE \u00b7 THREE TRIPS A YEAR EACH', { size: 9.5, op: 0.45 })}
    ${card(48, 76, 544, 156, { r: 16, fill: WHITE, stroke: INK, sw: 2.5 })}
    <text x="76" y="150" font-size="72" font-weight="700" fill="${P.soft}">\u201c</text>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.04;0.12;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <text x="112" y="126" font-size="19" font-weight="600" fill="${INK}">We treated roaming as a cost of doing business.</text>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.18;0.26;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <text x="112" y="156" font-size="19" font-weight="600" fill="${INK}">Switching took an afternoon and took $47,000 a year</text>
      <text x="112" y="182" font-size="19" font-weight="600" fill="${INK}">out of the budget.</text>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.34;0.42;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(112, 212, 'OPERATIONS DIRECTOR \u00b7 25-PERSON TEAM \u00b7 6 COUNTRIES', { size: 9, op: 0.45 })}
    </g>
    ${figs.map(([big, note, col], i) => {
      const x = 48 + i * 186;
      const on = 0.5 + i * 0.1;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(x, 256, 172, 104, { r: 14, fill: i === 0 ? P.wash : WHITE, stroke: i === 0 ? P.main : LINE, sw: i === 0 ? 2 : 1.5 })}
        ${num(x + 22, 312, big, { size: 27, fill: col })}
        ${mono(x + 22, 336, note, { size: 8.5, op: 0.42 })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.8;0.88;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(48, 378, 544, 52, { r: 13, fill: WHITE, stroke: LINE })}
      ${tick(76, 402, 'Same trips, same data, same people \u2014 a different supplier', { size: 13 })}
    </g>`;
    return { svg: wrap(inner), pills: pB('A named reference') };
  },
};

export const bizPerGig = {
  id: 'biz-pergb',
  name: 'Per Gigabyte',
  family: 'Single figure',
  tagline: 'The two prices on one number line',
  desc:
    'Procurement reduces this category to one figure: cost per gigabyte. The page states both \u2014 ' +
    '$15\u201325 traditional, $3\u20138 on Openline \u2014 and no option uses them. A dark poster plots both ranges ' +
    'on a single $0\u2013$25 scale, the bands sweeping out from the left, so the distance between them is ' +
    'the whole picture. One idea, very large.',
  pros: [
    'Uses the page\u2019s own published price ranges rather than invented invoice totals',
    'Legible at a glance and at 390px \u2014 two bands and a scale',
    'Dark panel gives the board a register break from nine light dashboards',
  ],
  cons: [
    'A range is a weaker claim than a firm price, and buyers will ask which end they get',
    'Says nothing about admin, coverage or control',
    'Dark artwork on a white page needs the section around it to cope',
  ],
  scores: { story: 4, motion: 3, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: (uid) => {
    const dur = 9;
    const DK = '#0B1020';
    const BAD = '#FCA5A5';
    const ticks = [[80, '$0'], [172, '$5'], [265, '$10'], [357, '$15'], [449, '$20'], [542, '$25']];
    const inner = `
    ${dots(uid)}
    ${mono(40, 54, 'THE ONLY FIGURE PROCUREMENT ASKS FOR', { size: 9.5, op: 0.45 })}
    ${card(40, 72, 560, 320, { r: 22, fill: DK, stroke: DK, sw: 0 })}
    ${mono(72, 106, 'COST PER GIGABYTE', { size: 9, fill: WHITE, op: 0.45 })}
    ${mono(568, 106, 'AS STATED ON THIS PAGE', { size: 9, fill: WHITE, op: 0.3, anchor: 'end' })}

    ${mono(72, 152, 'TRADITIONAL ROAMING', { size: 9.5, fill: WHITE, op: 0.5 })}
    <text x="542" y="156" text-anchor="end" font-size="34" font-weight="700" fill="${BAD}"
      style="font-family:${MONO}">$15\u201325</text>
    <rect x="357" y="170" width="0" height="26" rx="7" fill="${BAD}" opacity="0.9">
      <animate attributeName="width" values="0;185;185" keyTimes="0;0.3;1" dur="${dur}s" repeatCount="indefinite"
        calcMode="spline" keySplines="0.4 0 0.2 1;0 0 1 1"/>
    </rect>
    ${mono(357, 216, 'SET UP IN 2\u20135 BUSINESS DAYS', { size: 8.5, fill: WHITE, op: 0.35 })}
    ${[357, 542].map((x) => `<line x1="${x}" y1="196" x2="${x}" y2="320" stroke="${WHITE}" stroke-width="1"
      stroke-dasharray="3 5" opacity="0.14"/>`).join('')}

    ${mono(72, 236, 'OPENLINE BUSINESS', { size: 9.5, fill: WHITE, op: 0.5 })}
    <text x="248" y="277" font-size="34" font-weight="700" fill="${WHITE}" style="font-family:${MONO}">$3\u20138</text>
    <rect x="135" y="254" width="0" height="26" rx="7" fill="${P.main}">
      <animate attributeName="width" values="0;0;93;93" keyTimes="0;0.3;0.52;1" dur="${dur}s" repeatCount="indefinite"
        calcMode="spline" keySplines="0 0 1 1;0.4 0 0.2 1;0 0 1 1"/>
    </rect>
    ${mono(135, 300, 'SET UP IN 30 SECONDS', { size: 8.5, fill: WHITE, op: 0.35 })}
    ${[135, 228].map((x) => `<line x1="${x}" y1="280" x2="${x}" y2="320" stroke="${WHITE}" stroke-width="1"
      stroke-dasharray="3 5" opacity="0.14"/>`).join('')}

    <line x1="80" y1="320" x2="560" y2="320" stroke="${WHITE}" stroke-width="1.2" opacity="0.25"/>
    ${ticks.map(([x, t]) => `
      <line x1="${x}" y1="320" x2="${x}" y2="328" stroke="${WHITE}" stroke-width="1.2" opacity="0.25"/>
      ${mono(x, 344, t, { size: 8.5, fill: WHITE, op: 0.35, anchor: 'middle' })}`).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.6;0.7;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <text x="72" y="378" font-size="16" font-weight="700" fill="${WHITE}">Same gigabyte. Roughly four times the price.</text>
    </g>
    ${mono(40, 424, 'MIDPOINT TO MIDPOINT \u00b7 $20 AGAINST $5.50 \u00b7 190+ COUNTRIES EITHER WAY', { size: 9, op: 0.35 })}`;
    return { svg: wrap(inner), pills: pB('$3\u20138 per GB') };
  },
};

export const bizInTheirHand = {
  id: 'biz-hand',
  name: 'In Their Hand',
  family: 'Device',
  tagline: 'The 30 seconds as the traveller sees them',
  desc:
    'Every other option is drawn from the buyer\u2019s desk. This is the phone: an install prompt, a bar ' +
    'filling, then a status line reading NTT Docomo with the company policy already attached. Beside it, ' +
    'the three things that did not have to happen \u2014 nothing shipped, nothing bought on arrival, no IT ' +
    'ticket. It makes \u201cdeploy in 30 seconds\u201d a thing you watch on a handset.',
  pros: [
    'The only option that draws a device, which is what the product actually is',
    'Shows the employee experience, the part IT gets complaints about',
    'The install bar gives honest, literal motion \u2014 no invented telemetry',
  ],
  cons: [
    'A phone screen is a small canvas, so the fleet story shrinks to one person',
    'Carrier names on screen imply partnerships that must hold in that country',
    'Covers onboarding only \u2014 no cost or billing argument at all',
  ],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const W = 184, H = 300;
    const screen = `
      <rect x="14" y="30" width="${W - 28}" height="${H - 60}" rx="14" fill="${P.wash}"/>
      <g opacity="1">
        <animate attributeName="opacity" values="1;0;0" keyTimes="0;0.3;1" dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
        <text x="34" y="120" font-size="13" font-weight="700" fill="${INK}">Add work eSIM?</text>
        <text x="34" y="142" font-size="10" font-weight="600" fill="${INK}" opacity="0.5">Acme International</text>
        <rect x="34" y="170" width="116" height="34" rx="17" fill="${P.main}"/>
        <text x="92" y="192" text-anchor="middle" font-size="12" font-weight="700" fill="${WHITE}">Install</text>
      </g>
      <g opacity="0">
        <animate attributeName="opacity" values="0;1;0;0" keyTimes="0;0.3;0.62;1" dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
        <text x="34" y="120" font-size="13" font-weight="700" fill="${INK}">Installing\u2026</text>
        <rect x="34" y="146" width="116" height="10" rx="5" fill="${LINE}"/>
        <rect x="34" y="146" width="0" height="10" rx="5" fill="${P.main}">
          <animate attributeName="width" values="0;0;116;116" keyTimes="0;0.32;0.6;1" dur="${dur}s" repeatCount="indefinite"/>
        </rect>
        <text x="34" y="180" font-size="9" font-weight="700" fill="${INK}" opacity="0.45"
          style="font-family:${MONO}">NO SIM TRAY, NO SHOP</text>
      </g>
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.64;1" dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
        <circle cx="42" cy="116" r="10" fill="${P.main}"/>
        <path d="M 36 116 l 4.5 4.5 l 8 -9" fill="none" stroke="${WHITE}" stroke-width="2.2" stroke-linecap="round"/>
        <text x="62" y="120" font-size="12.5" font-weight="700" fill="${INK}">Connected</text>
        <text x="34" y="152" font-size="10" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">NTT DOCOMO \u00b7 5G</text>
        <text x="34" y="178" font-size="9" font-weight="700" fill="${INK}" opacity="0.45"
          style="font-family:${MONO}">20 GB POLICY \u00b7 BILLED TO ACME</text>
        <text x="34" y="198" font-size="9" font-weight="700" fill="${INK}" opacity="0.45"
          style="font-family:${MONO}">MANAGED BY YOUR IT TEAM</text>
      </g>
      ${mono(34, 56, 'TOKYO \u00b7 09:41', { size: 8.5, op: 0.4 })}
      <rect x="62" y="280" width="60" height="4" rx="2" fill="${LINE}"/>`;
    const notes = [
      ['Nothing shipped', 'the profile arrived in the welcome email'],
      ['Nothing bought on arrival', 'no airport kiosk, no local prepaid SIM'],
      ['Nothing for IT to do', 'the policy was attached before she landed'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(200, 230, 210, uid)}
    ${mono(40, 54, 'A NEW STARTER LANDS IN TOKYO', { size: 9.5, op: 0.45 })}
    ${phoneLight({ x: 150, y: 254, w: W, h: H, body: screen })}
    ${notes.map(([nm, note], i) => {
      const y = 96 + i * 104;
      const on = 0.4 + i * 0.13;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.06).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(268, y, 324, 86, { r: 13, fill: WHITE, stroke: LINE })}
        <g transform="translate(294 ${y + 30})" stroke="${GRAY}" stroke-width="2.2" stroke-linecap="round">
          <path d="M -6 -6 L 6 6 M 6 -6 L -6 6"/>
        </g>
        ${label(318, y + 36, nm, { size: 14 })}
        ${mono(294, y + 62, note, { size: 8.5, op: 0.4 })}
      </g>`;
    }).join('')}
    ${mono(40, 436, 'DEPLOY IN 30 SECONDS \u00b7 190+ COUNTRIES \u00b7 NOTHING IN THE POST', { size: 9, op: 0.35 })}`;
    return { svg: wrap(inner), pills: pB('Live in 30 seconds') };
  },
};

export const bizFlatLine = {
  id: 'biz-flat',
  name: 'The Flat Line',
  family: 'Forecast',
  tagline: 'Twelve months of spend, six of them predictable',
  desc:
    'A twelve-month spend chart. The first half spikes between \u20ac940 and \u20ac5,620 as trips and roaming ' +
    'bundles land at random; from July the line runs flat around \u20ac2,300 and stays there. The saving is ' +
    'the headline, but the flat line is the part a finance director actually buys \u2014 a number they can ' +
    'put in a budget.',
  pros: [
    'Predictability is a benefit no other option on the board claims',
    'A drawn line is the clearest motion here and reads instantly',
    'Works as evidence in a renewal or board pack, not just a hero',
  ],
  cons: [
    'The twelve figures are illustrative and need to come from a real account',
    'A chart is a cold image for a page about people travelling',
    'Two lines and three stat cards is a lot of small type on a phone',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 3, brand: 3, ease: 4 },
  build: (uid) => {
    const dur = 12;
    const before = 'M 72 262 L 119 161 L 165 269 L 212 116 L 258 232 L 305 178';
    const after = 'M 351 225 L 398 226 L 444 224 L 491 225 L 537 224 L 584 226';
    const grid = [[300, '\u20ac0'], [235, '\u20ac2k'], [169, '\u20ac4k'], [104, '\u20ac6k']];
    const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    const cards = [
      ['WORST MONTH BEFORE', '\u20ac5,620', RED],
      ['WORST MONTH SINCE', '\u20ac2,340', P.deep],
      ['MONTH TO MONTH SWING', '\u00b171% \u2192 \u00b12%', INK],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 250, uid)}
    ${mono(40, 54, 'CONNECTIVITY SPEND \u00b7 TWELVE MONTHS \u00b7 ONE ACCOUNT', { size: 9.5, op: 0.45 })}
    ${grid.map(([y, t]) => `
      <line x1="72" y1="${y}" x2="584" y2="${y}" stroke="${LINE}" stroke-width="1.2"/>
      ${mono(62, y + 4, t, { size: 8.5, op: 0.35, anchor: 'end' })}`).join('')}
    ${months.map((m, i) => mono(72 + i * 46.5, 318, m, { size: 8.5, op: 0.3, anchor: 'middle' })).join('')}
    <path d="${before}" fill="none" stroke="${RED}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
      stroke-dasharray="700">
      <animate attributeName="stroke-dashoffset" values="700;700;0;0" keyTimes="0;0.04;0.32;1"
        dur="${dur}s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;0.3 0 0.2 1;0 0 1 1"/>
    </path>
    <path d="M 305 178 L 351 225" fill="none" stroke="${P.main}" stroke-width="2.5" stroke-dasharray="5 5" opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.34;0.38;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </path>
    <path d="${after}" fill="none" stroke="${P.main}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"
      stroke-dasharray="300">
      <animate attributeName="stroke-dashoffset" values="300;300;0;0" keyTimes="0;0.38;0.6;1"
        dur="${dur}s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;0.3 0 0.2 1;0 0 1 1"/>
    </path>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.34;0.4;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <line x1="328" y1="96" x2="328" y2="306" stroke="${P.main}" stroke-width="1.6" stroke-dasharray="4 4"/>
      ${mono(336, 108, 'OPENLINE FROM JULY', { size: 8.5, op: 0.5, fill: P.deep })}
    </g>
    ${cards.map(([k, v, col], i) => {
      const x = 72 + i * 174;
      const on = 0.62 + i * 0.08;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(x, 336, 164, 80, { r: 13, fill: i === 1 ? P.wash : WHITE, stroke: i === 1 ? P.main : LINE, sw: i === 1 ? 2 : 1.5 })}
        ${mono(x + 20, 364, k, { size: 8.5, op: 0.42 })}
        ${num(x + 20, 396, v, { size: 17, fill: col })}
      </g>`;
    }).join('')}
    ${mono(40, 444, 'THE SAVING IS THE HEADLINE \u00b7 THE FLAT LINE IS WHY FINANCE SIGNS', { size: 9, op: 0.35 })}`;
    return { svg: wrap(inner), pills: pB('Predictable spend') };
  },
};

export const bizThreePromises = {
  id: 'biz-promises',
  name: 'Three Promises',
  family: 'Typographic',
  tagline: 'The subhead, with each claim answered',
  desc:
    'No illustration at all. The subhead promises three things \u2014 costs down 75%, admin headaches gone, ' +
    '190+ countries \u2014 and each is set large with the figure that supports it underneath: $47,000 on a ' +
    '25-person team, 85% less admin time and two hours to set up, 200+ network partners. A blue rule ' +
    'draws under each claim as it is answered.',
  pros: [
    'Answers the heading directly instead of illustrating around it',
    'Every supporting figure is already published on this page',
    'Cheapest option here to build, translate and keep accurate',
  ],
  cons: [
    'Type only \u2014 if Paul wants to see the product, this shows none of it',
    'Sits next to a headline, so the section risks reading as two headlines',
    'Very little motion beyond three rules and three fades',
  ],
  scores: { story: 4, motion: 2, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 10;
    const rows = [
      ['Costs down 75%', 'ON A 25-PERSON TEAM TRAVELLING THREE TIMES A YEAR', '$47,000'],
      ['Admin headaches, gone', 'AND TWO HOURS TO SET UP, NOT TWO WEEKS', '85%'],
      ['190+ countries', 'PREMIUM NETWORK PARTNERS BEHIND THE COVERAGE', '200+'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(300, 220, 250, uid)}
    ${mono(56, 58, 'THE SUBHEAD MAKES THREE PROMISES', { size: 9.5, op: 0.45 })}
    ${rows.map(([claim, proof, fig], i) => {
      const y = 132 + i * 96;
      const on = 0.06 + i * 0.16;
      return `<g>
        <line x1="56" y1="${y - 42}" x2="584" y2="${y - 42}" stroke="${LINE}" stroke-width="1.2"/>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          <text x="56" y="${y}" font-size="31" font-weight="700" fill="${INK}">${claim}</text>
        </g>
        <rect x="56" y="${y + 10}" width="0" height="4" rx="2" fill="${P.main}">
          <animate attributeName="width" values="0;0;168;168" keyTimes="0;${(on + 0.05).toFixed(3)};${(on + 0.11).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;0.4 0 0.2 1;0 0 1 1"/>
        </rect>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(on + 0.09).toFixed(3)};${(on + 0.14).toFixed(3)};1"
            dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          ${mono(56, y + 36, proof, { size: 9, op: 0.5, fill: P.deep })}
          ${num(584, y, fig, { size: 26, anchor: 'end' })}
        </g>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.74;0.82;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(56, 424, 'EVERY FIGURE HERE IS ALREADY ON THIS PAGE \u00b7 NONE OF IT IS IN THE PICTURE', { size: 9, op: 0.38 })}
    </g>`;
    return { svg: wrap(inner), pills: pB('The claims, answered') };
  },
};

/* ── registry ── */
export const BIZ_HERO_VARIANTS = [bizCurrent, teamMap, invoice, onboard, opsFeed, oneInvoice, bizExpenses, bizLanded, bizPolicy, bizWhereTheyAre, bizTheSaving, bizCaseStudy, bizPerGig, bizInTheirHand, bizFlatLine, bizThreePromises];
