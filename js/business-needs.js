/* ══ /business · "Everything Your Business Needs" (blue) ══════════════ */

import { mk, INK, WHITE, GRAY, LINE, GREEN, GREEN_SOFT, GREEN_TEXT, RED, AMBER, pill, icon } from './kit.js';

const K = mk('blue');
const { P, wrap, dots, bloom, mono, label, num, card, panel, badge, tick, MONO } = K;

const pN = (t = 'Central billing') => [pill('blue', `${icon('users')}${t}`, { top: '14px', right: '14px' })];

const GROUPS = [
  { t: 'Sales team · EU', lines: 24, use: 0.86 },
  { t: 'Field ops · APAC', lines: 16, use: 0.44 },
  { t: 'Executives · US', lines: 8, use: 0.72 },
];

/* ══════════════ 0 · CURRENT ══════════════ */
export const nCurrent = {
  id: 'n-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'A fleet console with three frozen bars',
  desc: 'A "fleet console · 48 active" card with three groups — Sales EU, Field ops APAC, Executives US — each with a line count and a blue bar, and a footer reading "one invoice, 190+ countries". It is the correct surface to show, but the bars never move, the console never does anything, and the eight capabilities listed beside it are represented by a single footer line.',
  pros: ['Group-level framing is exactly how an IT buyer thinks', 'The footer line is the strongest claim in the section, and it is present'],
  cons: ['A console that does nothing undercuts the word "console"', 'Eight capabilities in the copy, one of them illustrated', 'No alerts, no security, no SLA, no API — the enterprise proof points are invisible', 'Three static bars beside a claim about real-time monitoring'],
  scores: { story: 3, motion: 1, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 200, uid)}
    ${panel(56, 118, 528, 236)}
    ${label(84, 160, 'Fleet console', { size: 17 })}
    ${mono(556, 158, '48 ACTIVE', { size: 10, anchor: 'end', op: 0.45, fill: P.deep })}
    <line x1="84" y1="178" x2="556" y2="178" stroke="${LINE}" stroke-width="1.5"/>
    ${GROUPS.map((g, i) => {
      const y = 208 + i * 50;
      return `
      ${label(84, y, g.t, { size: 14 })}
      <text x="556" y="${y - 1}" text-anchor="end" font-size="11" font-weight="700" fill="${INK}" opacity="0.4"
        style="font-family:${MONO}">${g.lines} lines</text>
      <line x1="84" y1="${y + 14}" x2="556" y2="${y + 14}" stroke="${LINE}" stroke-width="5" stroke-linecap="round"/>
      <line x1="84" y1="${y + 14}" x2="${84 + g.use * 472}" y2="${y + 14}" stroke="${P.main}" stroke-width="5" stroke-linecap="round"/>`;
    }).join('')}
    <g transform="translate(84 332)">
      <g transform="translate(0 -9)" fill="none" stroke="${P.deep}" stroke-width="1.8">
        <circle cx="8" cy="8" r="8"/><path d="M 0 8 h 16 M 8 0 a 11 9 0 0 0 0 16 a 11 9 0 0 0 0 -16"/>
      </g>
      ${label(28, 4, 'One invoice, 190+ countries', { size: 13, op: 0.6 })}
      <path d="M 460 0 l 5 5 l 11 -12" fill="none" stroke="${GREEN}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`;
    return { svg: wrap(inner), pills: pN() };
  },
};

/* ══════════════ 1 · CONSOLE TABS ══════════════ */
export const consoleTabs = {
  id: 'ntabs',
  name: 'Console Tabs',
  family: 'Feature coverage',
  tagline: 'The eight bullets, as real screens',
  desc: 'The same console, but it cycles through its own tabs — Usage, Alerts, Security, Billing, SLA, API — and each tab renders the capability listed beside it: a usage chart, a firing alert with an auto-resolve, an SSO and encryption panel, a consolidated invoice, an uptime figure, a code snippet. One panel finally covers the whole list.',
  pros: ['Covers most of the eight capabilities instead of one', 'Tab switching is the most natural motion a console can have', 'Each tab is a real screen, so it doubles as a product preview', 'Extends to a ninth capability by adding a tab'],
  cons: ['Most work to build and to keep in sync with the copy', 'Six tabs on a 3-second cycle means an 18-second loop — long', 'Small type inside the tabs at phone width'],
  scores: { story: 5, motion: 4, perf: 4, mobile: 3, brand: 5, ease: 3 },
  build: (uid) => {
    const tabs = ['USAGE', 'ALERTS', 'SECURITY', 'BILLING', 'SLA', 'API'];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 210, uid)}
    ${panel(40, 66, 560, 330)}
    ${label(66, 104, 'Fleet console', { size: 16.5 })}
    ${mono(574, 102, '48 ACTIVE', { size: 10, anchor: 'end', op: 0.45, fill: P.deep })}
    <g transform="translate(66 124)">
      ${tabs.map((t, i) => `
        <g data-ntab="${i}" transform="translate(${i * 84} 0)">
          <rect width="78" height="28" rx="8" fill="${WHITE}" stroke="${LINE}" stroke-width="1.4" data-ntshell/>
          <text x="39" y="19" text-anchor="middle" font-size="9.5" font-weight="700" fill="${INK}" opacity="0.5"
            letter-spacing="0.8" style="font-family:${MONO}" data-ntlabel>${t}</text>
        </g>`).join('')}
    </g>
    <line x1="40" y1="166" x2="600" y2="166" stroke="${LINE}" stroke-width="1.5"/>
    <g transform="translate(66 190)">
      <!-- USAGE -->
      <g data-npane="0">
        ${GROUPS.map((g, i) => `
          <g transform="translate(0 ${26 + i * 46})">
            ${label(0, 0, g.t, { size: 13.5 })}
            <text x="508" y="-1" text-anchor="end" font-size="10.5" font-weight="700" fill="${INK}" opacity="0.4"
              style="font-family:${MONO}">${g.lines} lines</text>
            <line x1="0" y1="14" x2="508" y2="14" stroke="${LINE}" stroke-width="5" stroke-linecap="round"/>
            <line x1="0" y1="14" x2="${g.use * 508}" y2="14" stroke="${P.main}" stroke-width="5" stroke-linecap="round"
              data-nbar="${i}"/>
          </g>`).join('')}
        ${mono(0, 186, 'REAL-TIME USAGE ACROSS EVERY LINE', { size: 9, op: 0.35 })}
      </g>
      <!-- ALERTS -->
      <g data-npane="1" opacity="0">
        <g transform="translate(0 6)">
          <rect width="508" height="52" rx="12" fill="#FEF3C7"/>
          <circle cx="28" cy="26" r="10" fill="${AMBER}"/>
          <text x="26" y="31" text-anchor="middle" font-size="13" font-weight="700" fill="${WHITE}">!</text>
          ${label(52, 24, 'Field ops · APAC over 80% of pool', { size: 13.5 })}
          ${mono(52, 40, 'DETECTED 2S AGO', { size: 9, op: 0.42 })}
        </g>
        <g transform="translate(0 70)">
          <rect width="508" height="52" rx="12" fill="${GREEN_SOFT}"/>
          <circle cx="28" cy="26" r="10" fill="${GREEN}"/>
          <path d="M 22 26 l 4 4 l 9 -10" fill="none" stroke="${WHITE}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
          ${label(52, 24, 'Policy applied · pool topped up automatically', { size: 13.5 })}
          ${mono(52, 40, 'RESOLVED WITHOUT A TICKET', { size: 9, op: 0.42 })}
        </g>
        ${mono(0, 186, 'ALERTS AND POLICY, NOT EMAILS', { size: 9, op: 0.35 })}
      </g>
      <!-- SECURITY -->
      <g data-npane="2" opacity="0">
        ${[['SSO / SAML', 'Okta · Entra ID'], ['Encryption', 'TLS 1.3 · AES-256'], ['Audit log', 'Every change, exportable'], ['Compliance', 'GDPR · SOC 2 path']].map((s, i) => `
          <g transform="translate(${(i % 2) * 262} ${10 + Math.floor(i / 2) * 74})">
            <rect width="244" height="62" rx="13" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
            <g transform="translate(18 20)" fill="none" stroke="${P.deep}" stroke-width="1.8" stroke-linecap="round">
              <path d="M 9 0 l 9 3.5 v 7 c 0 4.5 -4.5 7 -9 8 c -4.5 -1 -9 -3.5 -9 -8 V 3.5 z"/>
            </g>
            ${label(46, 26, s[0], { size: 13 })}
            ${mono(46, 44, s[1].toUpperCase(), { size: 8.5, op: 0.38 })}
          </g>`).join('')}
        ${mono(0, 186, 'ENTERPRISE CONTROLS, ON BY DEFAULT', { size: 9, op: 0.35 })}
      </g>
      <!-- BILLING -->
      <g data-npane="3" opacity="0">
        ${[['Sales team · EU', '$412'], ['Field ops · APAC', '$268'], ['Executives · US', '$167']].map((r, i) => `
          <g transform="translate(0 ${26 + i * 34})">
            ${label(0, 0, r[0], { size: 13 })}
            <text x="508" y="0" text-anchor="end" font-size="13" font-weight="700" fill="${INK}" opacity="0.55"
              style="font-family:${MONO}">${r[1]}</text>
          </g>`).join('')}
        <line x1="0" y1="140" x2="508" y2="140" stroke="${LINE}" stroke-width="1.5"/>
        ${label(0, 166, 'One invoice, 190+ countries', { size: 14, fill: P.deep })}
        <text x="508" y="166" text-anchor="end" font-size="19" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">$847</text>
      </g>
      <!-- SLA -->
      <g data-npane="4" opacity="0">
        <text x="0" y="66" font-size="56" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">99.97%</text>
        ${mono(0, 92, 'UPTIME, LAST 30 DAYS · SLA 99.9%', { size: 9.5, op: 0.4 })}
        <g transform="translate(0 132)">
          ${Array.from({ length: 30 }, (_, i) => {
      const h = 14 + ((i * 7) % 9) * 2.6;
      return `<rect x="${i * 17}" y="${-h}" width="12" height="${h}" rx="2" fill="${i === 13 ? AMBER : GREEN}" opacity="0.8"/>`;
    }).join('')}
        </g>
        ${mono(0, 186, 'CUSTOM SLAS AND UPTIME GUARANTEES', { size: 9, op: 0.35 })}
      </g>
      <!-- API -->
      <g data-npane="5" opacity="0">
        <rect y="6" width="508" height="132" rx="13" fill="${INK}"/>
        ${['POST /v1/lines', '{ "team": "field-ops", "region": "apac" }', '→ 201 provisioned  ·  live in 28s'].map((l, i) => `
          <text x="20" y="${38 + i * 32}" font-size="12" font-weight="600" fill="${i === 2 ? P.main : WHITE}"
            opacity="${i === 2 ? 1 : 0.75}" style="font-family:${MONO}">${l}</text>`).join('')}
        ${mono(0, 186, 'API ACCESS FOR INTEGRATION', { size: 9, op: 0.35 })}
      </g>
    </g>`;

    return {
      svg: wrap(inner),
      pills: pN('Everything, in one console'),
      init(root) {
        const tabs = [...root.querySelectorAll('[data-ntab]')];
        const panes = [...root.querySelectorAll('[data-npane]')];
        if (!tabs.length) return null;
        let i = 0;
        const tick = () => {
          tabs.forEach((t, k) => {
            const on = k === i;
            t.querySelector('[data-ntshell]').setAttribute('fill', on ? P.main : WHITE);
            t.querySelector('[data-ntshell]').setAttribute('stroke', on ? P.main : LINE);
            const l = t.querySelector('[data-ntlabel]');
            l.setAttribute('fill', on ? WHITE : INK);
            l.setAttribute('opacity', on ? '1' : '0.5');
          });
          panes.forEach((p, k) => p.setAttribute('opacity', k === i ? '1' : '0'));
          i = (i + 1) % tabs.length;
        };
        tick();
        const id = setInterval(tick, 2600);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════ 2 · ALERT & RESOLVE ══════════════ */
export const alertResolve = {
  id: 'nalert',
  name: 'Alert & Resolve',
  family: 'Narrative',
  tagline: 'A problem appears and fixes itself',
  desc: 'A group\'s usage bar climbs into the red, an alert fires, policy caps and tops up the pool automatically, and the bar settles back to safe — resolved without a ticket. Then it happens to a different group. Of the eight capabilities in the list, real-time monitoring and alerting is the one an IT manager loses sleep over, and this is that capability working.',
  pros: ['A visible problem with an invisible fix is the strongest enterprise proof', 'Gives the loop genuine tension and release', 'Keeps the existing console — the bars simply come alive', '"Without a ticket" is the line that actually sells this product'],
  cons: ['Introduces amber and red into a calm blue panel', 'Shows one capability deeply rather than the whole list'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 200, uid)}
    ${panel(40, 74, 560, 306)}
    ${label(66, 112, 'Fleet console', { size: 16.5 })}
    <circle cx="188" cy="107" r="5" fill="${GREEN}" data-nhealth/>
    <text x="202" y="111" font-size="10" font-weight="700" fill="${INK}" opacity="0.45" letter-spacing="1"
      style="font-family:${MONO}"><tspan data-role="nstate">ALL POOLS NOMINAL</tspan></text>
    ${mono(574, 110, '48 ACTIVE', { size: 10, anchor: 'end', op: 0.45, fill: P.deep })}
    <line x1="40" y1="130" x2="600" y2="130" stroke="${LINE}" stroke-width="1.5"/>
    ${GROUPS.map((g, i) => {
      const y = 168 + i * 62;
      return `
      <g data-ngrp="${i}">
        ${label(66, y, g.t, { size: 14 })}
        <text x="574" y="${y - 1}" text-anchor="end" font-size="10.5" font-weight="700" fill="${INK}" opacity="0.4"
          style="font-family:${MONO}">${g.lines} lines · <tspan data-npct>44%</tspan></text>
        <line x1="66" y1="${y + 16}" x2="574" y2="${y + 16}" stroke="${LINE}" stroke-width="6" stroke-linecap="round"/>
        <line x1="66" y1="${y + 16}" x2="${66 + g.use * 508}" y2="${y + 16}" stroke="${P.main}" stroke-width="6"
          stroke-linecap="round" data-nbar/>
        <line x1="${66 + 0.8 * 508}" y1="${y + 8}" x2="${66 + 0.8 * 508}" y2="${y + 24}" stroke="${AMBER}"
          stroke-width="2" stroke-dasharray="3 3"/>
      </g>`;
    }).join('')}
    <g data-nalert opacity="0" transform="translate(66 348)">
      <rect width="508" height="46" rx="12" fill="#FEF3C7"/>
      <circle cx="26" cy="23" r="10" fill="${AMBER}"/>
      <text x="26" y="28" text-anchor="middle" font-size="13" font-weight="700" fill="${WHITE}">!</text>
      <text x="50" y="28" font-size="13" font-weight="700" fill="#92400E"><tspan data-role="nmsg">Pool over 80% — alerting</tspan></text>
    </g>
    <g data-nok opacity="0" transform="translate(66 348)">
      <rect width="508" height="46" rx="12" fill="${GREEN_SOFT}"/>
      <circle cx="26" cy="23" r="10" fill="${GREEN}"/>
      <path d="M 20 23 l 4 4 l 9 -10" fill="none" stroke="${WHITE}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="50" y="28" font-size="13" font-weight="700" fill="${GREEN_TEXT}">Policy applied · topped up · no ticket raised</text>
    </g>
    ${mono(40, 424, 'REAL-TIME USAGE MONITORING AND ALERTS · CUSTOM SLAS', { size: 9.5, op: 0.3 })}`;

    return {
      svg: wrap(inner),
      pills: pN('Real-time alerts'),
      init(root) {
        const grps = [...root.querySelectorAll('[data-ngrp]')];
        const alert = root.querySelector('[data-nalert]');
        const ok = root.querySelector('[data-nok]');
        const state = root.querySelector('[data-role="nstate"]');
        const msg = root.querySelector('[data-role="nmsg"]');
        const health = root.querySelector('[data-nhealth]');
        if (!grps.length) return null;
        const bars = grps.map(g => g.querySelector('[data-nbar]'));
        const pcts = grps.map(g => g.querySelector('[data-npct]'));
        bars.forEach(b => { b.style.transition = 'all .8s cubic-bezier(.2,.7,.3,1)'; });
        const set = (i, f, color) => {
          bars[i].setAttribute('x2', String(66 + f * 508));
          bars[i].setAttribute('stroke', color);
          pcts[i].textContent = Math.round(f * 100) + '%';
        };
        const base = [0.56, 0.44, 0.62];
        let k = 0;
        const timers = [];
        const cycle = () => {
          base.forEach((f, i) => set(i, f, P.main));
          alert.setAttribute('opacity', '0');
          ok.setAttribute('opacity', '0');
          if (state) state.textContent = 'ALL POOLS NOMINAL';
          if (health) health.setAttribute('fill', GREEN);
          const i = k % grps.length;
          timers.push(setTimeout(() => set(i, 0.91, '#DC2626'), 900));
          timers.push(setTimeout(() => {
            alert.setAttribute('opacity', '1');
            if (msg) msg.textContent = `${GROUPS[i].t} over 80% — alerting`;
            if (state) state.textContent = '1 POOL AT RISK';
            if (health) health.setAttribute('fill', AMBER);
          }, 1700));
          timers.push(setTimeout(() => {
            set(i, 0.48, P.main);
            alert.setAttribute('opacity', '0');
            ok.setAttribute('opacity', '1');
            if (state) state.textContent = 'RESOLVED AUTOMATICALLY';
            if (health) health.setAttribute('fill', GREEN);
          }, 3000));
          timers.push(setTimeout(() => { k++; cycle(); }, 5000));
        };
        cycle();
        return () => timers.forEach(t => clearTimeout(t));
      },
    };
  },
};

/* ══════════════ 3 · SCALE DIAL ══════════════ */
export const scaleDial = {
  id: 'ndial',
  name: 'Scale Dial',
  family: 'Pricing',
  tagline: 'Add lines, watch the unit price fall',
  desc: 'A dial sweeps the fleet size from 8 lines to 480 while three numbers respond: the per-line price falls, the monthly total rises more slowly than the headcount, and the plan tier upgrades itself. It shows the promise in the section beneath this one — plans that scale with you — as a single continuous gesture.',
  pros: ['The clearest way to show volume pricing without a table', 'One control, three responding numbers — very easy to read', 'Directly supports the pricing section that follows it', 'Light, and perfectly legible at phone width'],
  cons: ['Only addresses pricing, none of the other seven capabilities', 'Real price points have to be shown or implied honestly', 'A sweeping dial can look like a configurator the page does not have'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const cx = 178, cy = 218, R = 104;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 220, uid)}
    ${mono(40, 52, 'PLANS THAT SCALE WITH YOU', { size: 10, op: 0.32 })}
    <g transform="translate(${cx} ${cy})">
      <circle r="${R}" fill="none" stroke="${LINE}" stroke-width="16"/>
      <circle r="${R}" fill="none" stroke="${P.main}" stroke-width="16" stroke-linecap="round"
        transform="rotate(-90)" stroke-dasharray="${2 * Math.PI * R}" data-dring/>
      <text y="-6" text-anchor="middle" font-size="40" font-weight="700" fill="${P.deep}"
        style="font-family:${MONO}"><tspan data-role="dlines">48</tspan></text>
      ${mono(0, 20, 'ACTIVE LINES', { size: 9.5, anchor: 'middle', op: 0.4 })}
    </g>
    ${[['PER LINE / MONTH', 'dper', '$17.60'], ['MONTHLY TOTAL', 'dtot', '$845'], ['PLAN TIER', 'dtier', 'Growth']].map((m, i) => `
      <g transform="translate(330 ${104 + i * 88})">
        <rect width="268" height="72" rx="16" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
        ${mono(20, 26, m[0], { size: 9, op: 0.4 })}
        <text x="20" y="56" font-size="24" font-weight="700" fill="${i === 0 ? GREEN_TEXT : P.deep}"
          style="font-family:${MONO}"><tspan data-role="${m[1]}">${m[2]}</tspan></text>
      </g>`).join('')}
    <g transform="translate(40 376)">
      <rect width="560" height="54" rx="14" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
      ${mono(22, 24, 'INCLUDED AT EVERY TIER', { size: 9, op: 0.38 })}
      ${['Single dashboard', 'One invoice', '24/7 support', 'Custom SLA', 'API access'].map((t, i) => `
        <g transform="translate(${22 + i * 108} 36)">
          <path d="M 0 0 l 3.5 3.5 l 8 -9" fill="none" stroke="${GREEN}" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="18" y="4" font-size="10.5" font-weight="700" fill="${INK}" opacity="0.55">${t}</text>
        </g>`).join('')}
    </g>`;

    return {
      svg: wrap(inner),
      pills: pN('Scales with you'),
      init(root) {
        const ring = root.querySelector('[data-dring]');
        const l = root.querySelector('[data-role="dlines"]');
        const per = root.querySelector('[data-role="dper"]');
        const tot = root.querySelector('[data-role="dtot"]');
        const tier = root.querySelector('[data-role="dtier"]');
        if (!ring) return null;
        const C = 2 * Math.PI * 104;
        ring.style.transition = 'stroke-dashoffset .7s cubic-bezier(.2,.7,.3,1)';
        const steps = [8, 24, 48, 120, 240, 480];
        let i = 0;
        const tick = () => {
          const n = steps[i % steps.length];
          const f = Math.min(1, n / 480);
          ring.setAttribute('stroke-dashoffset', String(C * (1 - f)));
          if (l) l.textContent = String(n);
          const unit = n <= 24 ? 22.4 : n <= 48 ? 17.6 : n <= 120 ? 14.2 : n <= 240 ? 11.8 : 9.4;
          if (per) per.textContent = `$${unit.toFixed(2)}`;
          if (tot) tot.textContent = `$${Math.round(n * unit).toLocaleString('en-US')}`;
          if (tier) tier.textContent = n <= 24 ? 'Starter' : n <= 120 ? 'Growth' : 'Enterprise';
          i++;
        };
        tick();
        const id = setInterval(tick, 1700);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════ 4 · ORG TREE ══════════════ */
export const orgTree = {
  id: 'ntree',
  name: 'Org Tree',
  family: 'Structure',
  tagline: 'Every team, one billing root',
  desc: 'An org tree: three regional teams branch into their lines, and every branch flows upward into a single billing root. Usage pulses travel up the edges continuously and the root\'s total ticks with them. It is the cleanest picture of the sentence the footer already carries — one consolidated invoice, however many teams you have.',
  pros: ['Consolidation as a shape, which no bar chart can express', 'Upward pulses give constant motion with a clear direction', 'Scales visually to any number of teams', 'Matches how a finance buyer pictures the problem'],
  cons: ['An org chart is a dry, corporate image', 'Team names get tight if there are more than four', 'Only covers billing and structure, not security or SLA'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const teams = [
      { x: 118, t: 'Sales · EU', n: 24 },
      { x: 320, t: 'Field ops · APAC', n: 16 },
      { x: 522, t: 'Executives · US', n: 8 },
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 220, uid)}
    ${mono(40, 46, 'MANY TEAMS · ONE INVOICE', { size: 10, op: 0.32 })}
    ${teams.map((t, i) => {
      const d = `M ${t.x} 300 C ${t.x} 240 320 236 320 176`;
      return `
      <path d="${d}" fill="none" stroke="${P.main}" stroke-width="2.5" opacity="0.2"/>
      <path d="${d}" fill="none" stroke="${P.main}" stroke-width="2.5" stroke-dasharray="10 9" opacity="0.8">
        <animate attributeName="stroke-dashoffset" values="0;-19" dur="${(0.9 + i * 0.1).toFixed(2)}s" repeatCount="indefinite"/>
      </path>
      <circle r="4.5" fill="${P.main}"><animateMotion dur="${(1.6 + i * 0.2).toFixed(2)}s" repeatCount="indefinite" path="${d}"/></circle>`;
    }).join('')}
    <!-- root -->
    <g transform="translate(320 116)">
      <rect x="-134" y="-56" width="268" height="112" rx="20" fill="${P.main}"/>
      ${mono(-112, -26, 'CONSOLIDATED INVOICE', { size: 9, fill: WHITE, op: 0.6 })}
      <text x="-112" y="16" font-size="34" font-weight="700" fill="${WHITE}" style="font-family:${MONO}"><tspan data-role="ttot">$847</tspan></text>
      <text x="-112" y="38" font-size="10" font-weight="700" fill="${WHITE}" opacity="0.6" letter-spacing="1"
        style="font-family:${MONO}"><tspan data-role="tlines">48</tspan> LINES · 190+ COUNTRIES</text>
    </g>
    <!-- teams -->
    ${teams.map(t => `
      <g transform="translate(${t.x} 340)">
        <rect x="-92" y="-40" width="184" height="80" rx="16" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
        ${label(0, -8, t.t, { size: 13.5, anchor: 'middle' })}
        <text y="18" text-anchor="middle" font-size="17" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">${t.n} lines</text>
        <g transform="translate(0 32)">
          ${Array.from({ length: 8 }, (_, i) => `<circle cx="${-56 + i * 16}" cy="0" r="4" fill="${P.main}" opacity="0.3">
            <animate attributeName="opacity" values="0.25;0.9;0.25" dur="2.4s" begin="${(i * 0.18).toFixed(2)}s" repeatCount="indefinite"/></circle>`).join('')}
        </g>
      </g>`).join('')}
    ${mono(40, 436, 'ONE DASHBOARD · ONE INVOICE · FLEXIBLE BILLING TERMS', { size: 9.5, op: 0.3 })}`;

    return {
      svg: wrap(inner),
      pills: pN('One invoice'),
      init(root) {
        const tot = root.querySelector('[data-role="ttot"]');
        const ln = root.querySelector('[data-role="tlines"]');
        if (!tot) return null;
        let v = 847, n = 48;
        const id = setInterval(() => {
          v += Math.floor(Math.random() * 7);
          if (v > 920) { v = 847; n = 48; }
          tot.textContent = '$' + v.toLocaleString('en-US');
          if (ln) ln.textContent = String(n);
        }, 1100);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════ 5 · CONTROLS GRID ══════════════ */
export const controls = {
  id: 'ncontrols',
  name: 'Controls Grid',
  family: 'Enterprise proof',
  tagline: 'Eight capabilities, eight live tiles',
  desc: 'The eight bullets become eight tiles with a live state each: dashboard (48 lines), billing (1 invoice), monitoring (alerts on), support (24/7, 3 min median), security (SSO active), billing terms (net 30), SLA (99.97%), API (1.2k calls today). Tiles refresh on a stagger so the grid is always breathing. Nothing is left unillustrated.',
  pros: ['Covers the full list — no capability left as text only', 'A grid of live states reads as a status page, which buyers trust', 'Staggered refresh means constant, low-key motion', 'Easiest of the five to keep in sync with the copy'],
  cons: ['Eight tiles is a lot of small type on a phone', 'Breadth over depth: nothing is dramatised', 'Every figure shown becomes a commitment'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 3, brand: 4, ease: 5 },
  build: (uid) => {
    const tiles = [
      ['Single dashboard', '48 lines', 'dash'],
      ['One invoice', '1 document', 'bill'],
      ['Real-time monitoring', 'alerts on', 'mon'],
      ['24/7 business support', '3 min median', 'sup'],
      ['Enterprise security', 'SSO active', 'sec'],
      ['Flexible billing terms', 'net 30', 'term'],
      ['Custom SLA', '99.97%', 'sla'],
      ['API access', '1.2k calls today', 'api'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 230, uid)}
    ${mono(40, 50, 'EVERY CAPABILITY · LIVE STATE', { size: 10, op: 0.32 })}
    ${tiles.map((t, i) => {
      const x = 40 + (i % 4) * 142, y = 76 + Math.floor(i / 4) * 128;
      return `
      <g data-ctile="${i}" transform="translate(${x} ${y})">
        <rect width="132" height="116" rx="16" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5" data-cshell/>
        <circle cx="22" cy="24" r="6" fill="${GREEN}" data-cdot/>
        ${mono(36, 28, 'OK', { size: 8.5, op: 0.35 })}
        <text x="16" y="62" font-size="12.5" font-weight="700" fill="${INK}" opacity="0.72">${t[0].split(' ')[0]}</text>
        <text x="16" y="78" font-size="12.5" font-weight="700" fill="${INK}" opacity="0.72">${t[0].split(' ').slice(1).join(' ')}</text>
        <text x="16" y="102" font-size="11" font-weight="700" fill="${P.deep}" style="font-family:${MONO}"
          data-cval="${t[2]}">${t[1]}</text>
      </g>`;
    }).join('')}
    <g transform="translate(40 340)">
      <rect width="560" height="52" rx="14" fill="${INK}"/>
      <circle cx="26" cy="26" r="6" fill="${GREEN}"><animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite"/></circle>
      <text x="46" y="31" font-size="12.5" font-weight="700" fill="${WHITE}" opacity="0.85">All systems operational · last check <tspan data-role="cago">2s</tspan> ago</text>
      <text x="538" y="31" text-anchor="end" font-size="11" font-weight="700" fill="${P.main}"
        style="font-family:${MONO}">190+ COUNTRIES</text>
    </g>
    ${mono(40, 424, 'ONE DASHBOARD FOR ALL TEAM MEMBERS · ONE CONSOLIDATED INVOICE', { size: 9.5, op: 0.3 })}`;

    return {
      svg: wrap(inner),
      pills: pN('Everything included'),
      init(root) {
        const tiles = [...root.querySelectorAll('[data-ctile]')];
        const ago = root.querySelector('[data-role="cago"]');
        if (!tiles.length) return null;
        tiles.forEach(t => { t.style.transition = 'opacity .4s ease'; });
        let i = 0, sec = 2;
        const vals = {
          sup: () => `${2 + Math.floor(Math.random() * 3)} min median`,
          api: () => `${(1.1 + Math.random() * 0.4).toFixed(1)}k calls today`,
          sla: () => `99.9${5 + Math.floor(Math.random() * 4)}%`,
          mon: () => (Math.random() > 0.8 ? '1 alert' : 'alerts on'),
        };
        const tick = () => {
          const t = tiles[i % tiles.length];
          t.querySelector('[data-cshell]').setAttribute('stroke', P.main);
          t.querySelector('[data-cshell]').setAttribute('stroke-width', '2.5');
          setTimeout(() => {
            t.querySelector('[data-cshell]').setAttribute('stroke', LINE);
            t.querySelector('[data-cshell]').setAttribute('stroke-width', '1.5');
          }, 700);
          const v = t.querySelector('[data-cval]');
          const key = v && v.getAttribute('data-cval');
          if (v && vals[key]) v.textContent = vals[key]();
          sec = sec % 9 + 1;
          if (ago) ago.textContent = `${sec}s`;
          i++;
        };
        tick();
        const id = setInterval(tick, 900);
        return () => clearInterval(id);
      },
    };
  },
};

export const BIZ_NEEDS_VARIANTS = [nCurrent, consoleTabs, alertResolve, scaleDial, orgTree, controls];
