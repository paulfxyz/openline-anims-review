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

export const BIZ_HERO_VARIANTS = [bizCurrent, teamMap, invoice, onboard, opsFeed, oneInvoice];
