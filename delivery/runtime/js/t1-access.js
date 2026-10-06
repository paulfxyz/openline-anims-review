/* ══ /multiple-tier1 · "Access to 50+ Tier-1 Networks" (cyan) ═════════ */

import { mk, INK, WHITE, GRAY, LINE, GREEN, RED, pill, icon } from './kit.js';

const K = mk('cyan');
const { P, wrap, dots, bloom, mono, label, num, card, panel, phoneLight, bars, mast, badge, tick, MONO } = K;

const pAC = (t = 'Premium access') => [pill('cyan', `${icon('signal')}${t}`, { top: '14px', right: '14px' })];

const NAMES = ['Vodafone', 'Orange', 'T-Mobile', 'Telefónica', 'AT&T', 'Verizon', 'NTT Docomo', 'KDDI',
  'SK Telecom', 'Telstra', 'Airtel', 'Jio', 'Etisalat', 'STC', 'MTN', 'Claro', 'Vivo', 'TIM',
  'Swisscom', 'A1', 'Proximus', 'KPN', 'Telia', 'Telenor'];

/* ══════════════ 0 · CURRENT ══════════════ */
export const acCurrent = {
  id: 'ac-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'Three masts, one phone, three ticks',
  desc: 'Three cyan masts with pulsing rings, dashed links into a white phone that reads "connected via Vodafone 5G", and three ticks underneath. It is a tidy picture of one connection. The headline, though, is about the size of the roster — fifty-plus Tier-1 partners — and three towers is the one number this panel definitely does not show.',
  pros: ['Clean and completely unambiguous about what is happening', 'The white phone matches the rest of the page nicely'],
  cons: ['Draws three networks under a headline that claims fifty-plus', 'Nothing ever switches, so the second bullet is unillustrated', 'The partner names are the credibility here, and only one is shown', 'Rings pulse but no traffic ever moves along the links'],
  scores: { story: 3, motion: 2, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const masts = [{ y: 118 }, { y: 242 }, { y: 366 }];
    const inner = `
    ${dots(uid)}
    ${bloom(340, 240, 210, uid)}
    ${masts.map((m, i) => `
      <path d="M 150 ${m.y} C 218 ${m.y} 250 ${240} 288 ${240}" stroke="${P.main}" stroke-width="2"
        stroke-dasharray="4 6" fill="none" opacity="0.5"/>
      ${mast(122, m.y, { s: 0.92, rings: true, dur: 2.2, begin: i * 0.5 })}`).join('')}
    ${phoneLight({
      x: 420, y: 240, w: 168, h: 316, body: `
      ${mono(30, 66, 'CONNECTED VIA', { size: 9, op: 0.4 })}
      ${label(30, 92, 'Vodafone 5G', { size: 17 })}
      ${bars(30, 124, 4, 3, { unit: 9, step: 5 })}
      <line x1="66" y1="118" x2="140" y2="118" stroke="${LINE}" stroke-width="5" stroke-linecap="round"/>
      <line x1="66" y1="118" x2="124" y2="118" stroke="${P.main}" stroke-width="5" stroke-linecap="round"/>
      <line x1="30" y1="162" x2="138" y2="162" stroke="${LINE}" stroke-width="1.5"/>
      ${tick(32, 208, 'Auto-switch on', { stroke: P.main, size: 11.5 })}
      ${tick(32, 240, 'No manual APN', { stroke: P.main, size: 11.5 })}
      ${tick(32, 272, 'Best signal wins', { stroke: P.main, size: 11.5 })}` })}`;
    return { svg: wrap(inner), pills: pAC() };
  },
};

/* ══════════════ 1 · OPERATOR ROSTER ══════════════ */
export const roster = {
  id: 'acroster',
  name: 'Operator Roster',
  family: 'Breadth',
  tagline: 'The deck of fifty, fanned out',
  desc: 'A fanned deck of operator cards — real Tier-1 names, each with its country and generation — shuffles behind the phone, bringing a different one to the front every couple of seconds while the phone\'s "connected via" line follows it. A counter holds at 50+ partners. The headline is about the size of the roster, so this shows the roster.',
  pros: ['Names are the credibility — this is the only option that shows many of them', 'A deck reads as "we hold all of these" in one glance', 'Front-card changes double as proof of switching', 'Calm, premium motion that suits the page'],
  cons: ['Operator names must be kept accurate and contractually safe to display', 'A fan of cards needs care not to look like a casino'],
  scores: { story: 5, motion: 4, perf: 4, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const deck = [
      { n: 'Vodafone', c: 'DE · 5G' }, { n: 'Orange', c: 'FR · 5G' }, { n: 'T-Mobile', c: 'US · 5G' },
      { n: 'NTT Docomo', c: 'JP · 5G' }, { n: 'Telefónica', c: 'ES · 5G' }, { n: 'Telstra', c: 'AU · 5G' },
    ];
    const cw = 232, ch = 82;
    const inner = `
    ${dots(uid)}
    ${bloom(300, 230, 220, uid)}
    ${mono(40, 50, 'TIER-1 PARTNER ROSTER', { size: 10, op: 0.32 })}
    <g data-rdeck transform="translate(46 116)">
      ${deck.map((d, i) => `
        <g data-rcard="${i}">
          <rect width="${cw}" height="${ch}" rx="16" fill="${WHITE}" stroke="${LINE}" stroke-width="2" data-rshell/>
          <g transform="translate(20 ${ch / 2})">
            <rect x="0" y="-15" width="34" height="30" rx="7" fill="${P.soft}" data-rchip/>
            <path d="M 12 -7 L 6 3 H 14 L 11 11 L 24 -1 H 16 L 20 -7 Z" fill="${P.deep}" data-rglyph/>
          </g>
          <text x="66" y="${ch / 2 - 3}" font-size="16" font-weight="700" fill="${INK}" data-rname>${d.n}</text>
          <text x="66" y="${ch / 2 + 17}" font-size="11" font-weight="700" fill="${INK}" opacity="0.42"
            style="font-family:${MONO}" data-rmeta>${d.c}</text>
          <g data-rlive opacity="0" transform="translate(${cw - 70} ${ch / 2})">
            <rect x="0" y="-12" width="54" height="24" rx="12" fill="${WHITE}" opacity="0.22"/>
            <text x="27" y="4" text-anchor="middle" font-size="9.5" font-weight="700" fill="${WHITE}"
              letter-spacing="0.8" style="font-family:${MONO}">LIVE</text>
          </g>
        </g>`).join('')}
    </g>
    ${phoneLight({
      x: 476, y: 232, w: 156, h: 296, body: `
      ${mono(28, 62, 'CONNECTED VIA', { size: 9, op: 0.4 })}
      <text x="28" y="88" font-size="16" font-weight="700" fill="${INK}"><tspan data-role="acname">Vodafone</tspan></text>
      <text x="28" y="108" font-size="10.5" font-weight="700" fill="${INK}" opacity="0.42"
        style="font-family:${MONO}"><tspan data-role="acmeta">DE · 5G</tspan></text>
      ${bars(28, 146, 4, 4, { unit: 9, step: 5 })}
      <line x1="28" y1="172" x2="128" y2="172" stroke="${LINE}" stroke-width="1.5"/>
      ${tick(30, 204, 'Auto-switch on', { stroke: P.main, size: 11 })}
      ${tick(30, 232, 'No manual APN', { stroke: P.main, size: 11 })}
      ${tick(30, 260, 'Best signal wins', { stroke: P.main, size: 11 })}` })}
    ${badge(46, 402, '50+ TIER-1 PARTNERS', { w: 212, h: 34, size: 11.5, fill: INK })}
    ${mono(276, 424, '190+ COUNTRIES', { size: 10, op: 0.3 })}`;

    return {
      svg: wrap(inner),
      pills: pAC('50+ partners'),
      init(root) {
        const cards = [...root.querySelectorAll('[data-rcard]')];
        if (!cards.length) return null;
        const nm = root.querySelector('[data-role="acname"]');
        const mt = root.querySelector('[data-role="acmeta"]');
        const deck = [['Vodafone', 'DE · 5G'], ['Orange', 'FR · 5G'], ['T-Mobile', 'US · 5G'],
          ['NTT Docomo', 'JP · 5G'], ['Telefónica', 'ES · 5G'], ['Telstra', 'AU · 5G']];
        const n = cards.length, step = 50;
        let front = 0;
        const place = () => {
          cards.forEach((c, i) => {
            const slot = (i - front + n) % n;
            c.style.transition = 'transform .6s cubic-bezier(.2,.7,.3,1), opacity .6s ease';
            c.setAttribute('transform', `translate(${slot * 12} ${slot * step})`);
            c.style.opacity = slot > 3 ? '0' : String(1 - slot * 0.12);
            const on = slot === 0;
            c.querySelector('[data-rshell]').setAttribute('fill', on ? P.main : WHITE);
            c.querySelector('[data-rshell]').setAttribute('stroke', on ? P.main : LINE);
            c.querySelector('[data-rchip]').setAttribute('fill', on ? WHITE : P.soft);
            c.querySelector('[data-rchip]').setAttribute('opacity', on ? '0.35' : '1');
            c.querySelector('[data-rglyph]').setAttribute('fill', on ? WHITE : P.deep);
            c.querySelector('[data-rname]').setAttribute('fill', on ? WHITE : INK);
            c.querySelector('[data-rmeta]').setAttribute('fill', on ? WHITE : INK);
            c.querySelector('[data-rmeta]').setAttribute('opacity', on ? '0.8' : '0.42');
            c.querySelector('[data-rlive]').setAttribute('opacity', on ? '1' : '0');
          });
          if (nm) nm.textContent = deck[front][0];
          if (mt) mt.textContent = deck[front][1];
        };
        place();
        const id = setInterval(() => { front = (front + 1) % n; place(); }, 2300);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════ 2 · OPERATOR WALL ══════════════ */
export const wall = {
  id: 'acwall',
  name: 'Operator Wall',
  family: 'Quantity',
  tagline: 'Fifty names, all on screen',
  desc: 'A wall of operator name plates, twenty-four visible and the rest implied by a "+26 more" tile. Plates breathe gently, and every couple of seconds one lights cyan as the live attachment while a small readout names it. It is the bluntest possible answer to "fifty-plus?" — here they are, count them.',
  pros: ['Makes the headline number visible instead of asserted', 'Real operator names are the strongest trust signal on the page', 'Any single plate lighting doubles as the switching story', 'Very cheap to render and trivially extendable'],
  cons: ['Every name shown must be a partner you can legally name', 'A wall of logos-as-text is a familiar B2B trope', 'Loses the device, so nothing shows the user\'s own experience'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 3, brand: 4, ease: 4 },
  build: (uid) => {
    const cols = 4, rows = 6, cw = 134, chh = 46, x0 = 44, y0 = 86;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 230, 230, uid)}
    ${mono(44, 62, 'OUR TIER-1 PARTNERS', { size: 10, op: 0.32 })}
    ${mono(596, 62, '50+ AND GROWING', { size: 10, op: 0.32, anchor: 'end' })}
    ${Array.from({ length: cols * rows }, (_, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      const x = x0 + c * (cw + 6), y = y0 + r * (chh + 6);
      const nm = NAMES[i] || '';
      return `
      <g data-wp="${i}" transform="translate(${x} ${y})">
        <rect width="${cw}" height="${chh}" rx="11" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5" data-wshell/>
        <rect x="12" y="${chh / 2 - 7}" width="14" height="14" rx="4" fill="${P.soft}" data-wdot/>
        <text x="36" y="${chh / 2 + 5}" font-size="12.5" font-weight="700" fill="${INK}" opacity="0.72" data-wname>${nm}</text>
      </g>`;
    }).join('')}
    <g transform="translate(${x0} ${y0 + rows * (chh + 6)})">
      <rect width="${cols * (cw + 6) - 6}" height="40" rx="11" fill="${P.wash}" stroke="${P.main}" stroke-width="1.5" stroke-dasharray="6 5"/>
      <text x="${(cols * (cw + 6) - 6) / 2}" y="26" text-anchor="middle" font-size="12.5" font-weight="700" fill="${P.deep}"
        style="font-family:${MONO}">+ 26 MORE TIER-1 PARTNERS</text>
    </g>
    <g transform="translate(44 424)">
      <circle cx="7" cy="-4" r="6" fill="${P.main}"/>
      <text x="22" y="0" font-size="12.5" font-weight="700" fill="${INK}" opacity="0.6">Live now: <tspan data-role="wlive" fill="${P.deep}">Vodafone</tspan></text>
    </g>`;

    return {
      svg: wrap(inner),
      pills: pAC('50+ partners'),
      init(root) {
        const ps = [...root.querySelectorAll('[data-wp]')];
        if (!ps.length) return null;
        const live = root.querySelector('[data-role="wlive"]');
        ps.forEach(p => { p.style.transition = 'opacity .5s ease'; });
        let i = 0;
        const tick = () => {
          const pick = Math.floor(Math.random() * ps.length);
          ps.forEach((p, k) => {
            const on = k === pick;
            p.querySelector('[data-wshell]').setAttribute('fill', on ? P.main : WHITE);
            p.querySelector('[data-wshell]').setAttribute('stroke', on ? P.main : LINE);
            p.querySelector('[data-wdot]').setAttribute('fill', on ? WHITE : P.soft);
            p.querySelector('[data-wdot]').setAttribute('opacity', on ? '0.5' : '1');
            const nm = p.querySelector('[data-wname]');
            nm.setAttribute('fill', on ? WHITE : INK);
            nm.setAttribute('opacity', on ? '1' : '0.72');
          });
          if (live) live.textContent = NAMES[pick] || 'Vodafone';
          i++;
        };
        tick();
        const id = setInterval(tick, 1900);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══════════════ 3 · TIER LADDER ══════════════ */
export const ladder = {
  id: 'acladder',
  name: 'Tier Ladder',
  family: 'Positioning',
  tagline: 'Where we plug in, and where they do',
  desc: 'Three stacked layers: Tier-1 operators who own the towers, wholesale aggregators in the middle, and resellers at the bottom. A cyan line runs from Openline straight to the top layer while a grey line from a typical competitor stops two floors down. It answers the question the section is really making — what does Tier-1 buy me — rather than just counting partners.',
  pros: ['Explains why Tier-1 matters instead of assuming the reader knows', 'The shortest path to the top layer is a genuinely defensible claim', 'Pairs naturally with the "Why Tier-1 Matters" block above it', 'Static-friendly: still makes sense in a screenshot'],
  cons: ['Implicitly frames competitors as resellers — needs a legal read', 'A layer diagram is the least warm option here', 'More abstract than a roster of names'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const layers = [
      { t: 'Tier-1 operators', m: 'Own the towers and the spectrum', y: 92, w: 520 },
      { t: 'Wholesale aggregators', m: 'Rent capacity, resell it on', y: 214, w: 420 },
      { t: 'Retail eSIM resellers', m: 'Rent from the middle layer', y: 336, w: 320 },
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 230, 220, uid)}
    ${mono(40, 56, 'WHO OWNS WHAT', { size: 10, op: 0.32 })}
    ${layers.map((l, i) => `
      <g transform="translate(${40 + (520 - l.w) / 2} ${l.y})">
        <rect width="${l.w}" height="86" rx="16" fill="${i === 0 ? P.wash : WHITE}"
          stroke="${i === 0 ? P.main : LINE}" stroke-width="${i === 0 ? 2.5 : 1.5}"/>
        ${label(24, 36, l.t, { size: 16, fill: i === 0 ? P.deep : INK, op: i === 0 ? 1 : 0.7 })}
        ${mono(24, 60, l.m.toUpperCase(), { size: 9.5, op: i === 0 ? 0.5 : 0.35 })}
        ${i === 0 ? `<g transform="translate(${l.w - 116} 26)">
          <rect width="92" height="32" rx="16" fill="${P.main}"/>
          <text x="46" y="21" text-anchor="middle" font-size="10.5" font-weight="700" fill="${WHITE}"
            letter-spacing="0.8" style="font-family:${MONO}">WE ARE HERE</text></g>` : ''}
      </g>`).join('')}
    <!-- our path -->
    <path d="M 596 448 C 618 448 618 135 570 135" fill="none" stroke="${P.main}" stroke-width="3"
      stroke-linecap="round" stroke-dasharray="12 9">
      <animate attributeName="stroke-dashoffset" values="0;-21" dur="0.8s" repeatCount="indefinite"/>
    </path>
    <g transform="translate(378 430)">
      <rect width="218" height="30" rx="15" fill="${P.main}"/>
      <text x="109" y="20" text-anchor="middle" font-size="10.5" font-weight="700" fill="${WHITE}"
        letter-spacing="0.6" style="font-family:${MONO}">OPENLINE · DIRECT TO TIER-1</text>
    </g>
    <!-- a competitor's path -->
    <path d="M 24 430 C 6 430 6 257 140 257" fill="none" stroke="${GRAY}" stroke-width="2.5"
      stroke-linecap="round" stroke-dasharray="5 7" opacity="0.7"/>
    ${mono(40, 424, 'TYPICAL RESELLER STOPS HERE', { size: 9.5, op: 0.32 })}
    ${label(596, 84, '50+ direct', { size: 13, anchor: 'end', fill: P.deep })}`;
    return { svg: wrap(inner), pills: pAC('Direct to Tier-1') };
  },
};

/* ══════════════ 4 · REGIONAL COUNT ══════════════ */
export const regional = {
  id: 'acregional',
  name: 'Regional Count',
  family: 'Data-led',
  tagline: 'Fifty-plus, broken down',
  desc: 'Four regional cards — Europe, Asia Pacific, Americas, Middle East & Africa — each counting up its Tier-1 partners and its countries, with a total that lands on 50+ and 190+. A small rotating label names the operator currently carrying traffic in each region. It turns one headline number into four verifiable ones.',
  pros: ['A number broken into parts is far more believable than a round total', 'Regions double as a coverage claim, which the copy also makes', 'Counting up gives the loop a clear beginning and resolution', 'Maps directly onto the country pages for reuse'],
  cons: ['Four counters is the least visually interesting option', 'The regional splits have to be accurate and kept current', 'No device, no signal, no sense of the user experience'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: (uid) => {
    const regions = [
      { t: 'Europe', n: 18, c: 44, ops: ['Vodafone', 'Orange', 'Swisscom', 'KPN'] },
      { t: 'Asia Pacific', n: 14, c: 38, ops: ['NTT Docomo', 'KDDI', 'Telstra', 'SK Telecom'] },
      { t: 'Americas', n: 11, c: 35, ops: ['T-Mobile', 'AT&T', 'Claro', 'Vivo'] },
      { t: 'Middle East & Africa', n: 9, c: 73, ops: ['Etisalat', 'STC', 'MTN', 'Airtel'] },
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 220, uid)}
    ${mono(40, 54, '50+ TIER-1 PARTNERS · BY REGION', { size: 10, op: 0.32 })}
    ${regions.map((r, i) => {
      const x = 40 + (i % 2) * 288, y = 80 + Math.floor(i / 2) * 142;
      return `
      <g transform="translate(${x} ${y})">
        <rect width="272" height="126" rx="18" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
        ${label(22, 34, r.t, { size: 15 })}
        <text x="22" y="82" font-size="34" font-weight="700" fill="${P.deep}" style="font-family:${MONO}"
          data-rgn="${i}">0</text>
        ${mono(84, 80, 'TIER-1', { size: 9.5, op: 0.4 })}
        <text x="180" y="82" font-size="20" font-weight="700" fill="${INK}" opacity="0.45" style="font-family:${MONO}">${r.c}</text>
        ${mono(216, 80, 'COUNTRIES', { size: 9, op: 0.32 })}
        <line x1="22" y1="96" x2="250" y2="96" stroke="${LINE}" stroke-width="1.2"/>
        <circle cx="28" cy="110" r="4.5" fill="${P.main}"/>
        <text x="42" y="114" font-size="11" font-weight="700" fill="${INK}" opacity="0.5"
          style="font-family:${MONO}"><tspan data-rop="${i}">${r.ops[0]}</tspan> · LIVE</text>
      </g>`;
    }).join('')}
    <g transform="translate(40 372)">
      <rect width="272" height="66" rx="18" fill="${INK}"/>
      ${mono(22, 28, 'TOTAL TIER-1 PARTNERS', { size: 9, fill: WHITE, op: 0.45 })}
      <text x="22" y="56" font-size="26" font-weight="700" fill="${P.main}" style="font-family:${MONO}"><tspan data-role="gtot">0</tspan>+</text>
    </g>
    <g transform="translate(328 372)">
      <rect width="272" height="66" rx="18" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
      ${mono(22, 28, 'COUNTRIES COVERED', { size: 9, op: 0.4 })}
      <text x="22" y="56" font-size="26" font-weight="700" fill="${INK}" style="font-family:${MONO}">190+</text>
    </g>`;

    return {
      svg: wrap(inner),
      pills: pAC('50+ partners'),
      init(root) {
        const cells = [...root.querySelectorAll('[data-rgn]')];
        const ops = [...root.querySelectorAll('[data-rop]')];
        const tot = root.querySelector('[data-role="gtot"]');
        if (!cells.length) return null;
        const targets = [18, 14, 11, 9];
        const lists = [['Vodafone', 'Orange', 'Swisscom', 'KPN'], ['NTT Docomo', 'KDDI', 'Telstra', 'SK Telecom'],
          ['T-Mobile', 'AT&T', 'Claro', 'Vivo'], ['Etisalat', 'STC', 'MTN', 'Airtel']];
        let step = 0, opI = 0;
        const timers = [];
        const run = () => {
          step = 0;
          const count = setInterval(() => {
            step++;
            let sum = 0;
            cells.forEach((c, k) => {
              const v = Math.min(targets[k], Math.round(targets[k] * (step / 18)));
              c.textContent = String(v);
              sum += v;
            });
            if (tot) tot.textContent = String(sum);
            if (step >= 18) clearInterval(count);
          }, 60);
          timers.push(count);
          timers.push(setTimeout(run, 6000));
        };
        run();
        const id = setInterval(() => {
          opI = (opI + 1) % 4;
          ops.forEach((o, k) => { o.textContent = lists[k][opI]; });
        }, 1700);
        return () => { timers.forEach(t => { clearInterval(t); clearTimeout(t); }); clearInterval(id); };
      },
    };
  },
};

/* ══════════════ 5 · SIGNAL LADDER ══════════════ */
export const signalLadder = {
  id: 'acsignal',
  name: 'Signal Ladder',
  family: 'Minimal change',
  tagline: 'The masts re-rank, the phone follows',
  desc: 'The masts stay, but there are now five of them ranked by live signal score, and the ranking re-sorts every couple of seconds. The phone is always attached to whichever sits at the top, and the attachment line snaps across as the order changes while the signal bar never drops. Closest option to what ships today, with the two missing behaviours added.',
  pros: ['Keeps the exact motif and palette that is live — smallest diff here', 'Re-ranking and the snapping link show breadth and switching at once', 'The bar staying full through every move is the reliability claim', 'No new concepts to translate'],
  cons: ['Five masts still is not fifty — breadth is implied, not shown', 'Partner names get small at phone width'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 4, brand: 5, ease: 5 },
  build: (uid) => {
    const ops = [
      { n: 'Vodafone', g: '5G', s: 94 }, { n: 'Orange', g: '5G', s: 88 },
      { n: 'T-Mobile', g: 'LTE', s: 82 }, { n: 'Telefónica', g: '5G', s: 79 },
      { n: 'NTT Docomo', g: '5G', s: 86 },
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(330, 240, 210, uid)}
    ${mono(36, 52, 'RANKED BY LIVE SIGNAL', { size: 10, op: 0.32 })}
    <path data-slink d="M 214 106 C 268 106 272 240 316 240" fill="none" stroke="${P.main}" stroke-width="3"
      stroke-linecap="round" stroke-dasharray="11 8">
      <animate attributeName="stroke-dashoffset" values="0;-19" dur="0.75s" repeatCount="indefinite"/>
    </path>
    <g data-sladder>
      ${ops.map((o, i) => `
        <g data-srow="${i}" transform="translate(36 ${88 + i * 62})">
          <rect width="184" height="50" rx="13" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5" data-sshell/>
          ${mast(30, 25, { s: 0.42 })}
          <text x="58" y="21" font-size="12.5" font-weight="700" fill="${INK}" data-sname>${o.n}</text>
          <text x="58" y="38" font-size="9.5" font-weight="700" fill="${INK}" opacity="0.4"
            style="font-family:${MONO}" data-smeta>${o.g} · <tspan data-sscore>${o.s}</tspan></text>
          <g data-slive opacity="0" transform="translate(150 25)">
            <circle r="9" fill="${P.main}"/>
            <circle r="9" fill="none" stroke="${P.main}" stroke-width="2">
              <animate attributeName="r" values="9;20" dur="1.6s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.8;0" dur="1.6s" repeatCount="indefinite"/>
            </circle>
          </g>
        </g>`).join('')}
    </g>
    ${phoneLight({
      x: 420, y: 240, w: 166, h: 312, body: `
      ${mono(30, 66, 'CONNECTED VIA', { size: 9, op: 0.4 })}
      <text x="30" y="94" font-size="17" font-weight="700" fill="${INK}"><tspan data-role="slname">Vodafone 5G</tspan></text>
      ${bars(30, 132, 4, 4, { unit: 9, step: 5 })}
      <line x1="66" y1="126" x2="138" y2="126" stroke="${LINE}" stroke-width="5" stroke-linecap="round"/>
      <line x1="66" y1="126" x2="134" y2="126" stroke="${P.main}" stroke-width="5" stroke-linecap="round"/>
      <line x1="30" y1="166" x2="136" y2="166" stroke="${LINE}" stroke-width="1.5"/>
      ${tick(32, 206, 'Auto-switch on', { stroke: P.main, size: 11 })}
      ${tick(32, 238, 'No manual APN', { stroke: P.main, size: 11 })}
      ${tick(32, 270, 'Best signal wins', { stroke: P.main, size: 11 })}
      <g transform="translate(30 296)">
        <rect width="106" height="24" rx="12" fill="${P.wash}"/>
        <text x="53" y="16" text-anchor="middle" font-size="9" font-weight="700" fill="${P.deep}"
          letter-spacing="0.7" style="font-family:${MONO}">50+ AVAILABLE</text>
      </g>` })}`;

    return {
      svg: wrap(inner),
      pills: pAC('Best signal wins'),
      init(root) {
        const rows = [...root.querySelectorAll('[data-srow]')];
        const link = root.querySelector('[data-slink]');
        const nm = root.querySelector('[data-role="slname"]');
        if (!rows.length) return null;
        rows.forEach(r => { r.style.transition = 'transform .7s cubic-bezier(.2,.7,.3,1)'; });
        const ops = [['Vodafone', '5G', 94], ['Orange', '5G', 88], ['T-Mobile', 'LTE', 82],
          ['Telefónica', '5G', 79], ['NTT Docomo', '5G', 86]];
        const tick = () => {
          const scores = ops.map(o => Math.max(58, Math.min(99, o[2] + Math.round((Math.random() - 0.5) * 18))));
          const order = scores.map((s, k) => [s, k]).sort((a, b) => b[0] - a[0]).map(x => x[1]);
          order.forEach((k, slot) => {
            const row = rows[k];
            row.setAttribute('transform', `translate(36 ${88 + slot * 62})`);
            const first = slot === 0;
            row.querySelector('[data-sshell]').setAttribute('stroke', first ? P.main : LINE);
            row.querySelector('[data-sshell]').setAttribute('stroke-width', first ? '2.5' : '1.5');
            row.querySelector('[data-sshell]').setAttribute('fill', first ? P.wash : WHITE);
            row.querySelector('[data-slive]').setAttribute('opacity', first ? '1' : '0');
            row.querySelector('[data-sscore]').textContent = String(scores[k]);
          });
          const top = order[0];
          if (nm) nm.textContent = `${ops[top][0]} ${ops[top][1]}`;
          if (link) {
            link.style.transition = 'd .6s ease';
            link.setAttribute('d', `M 226 ${113} C 272 113 274 240 316 240`);
          }
        };
        tick();
        const id = setInterval(tick, 2400);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══ ACCESS · 6–9 ═══════════════════════════════════════════════════ */

export const acYourRoute = {
  id: 'ac-yourroute',
  name: 'Your Route',
  family: 'Relevance',
  tagline: 'Fifty carriers is meaningless; yours is not',
  desc:
    'A roster of fifty means nothing until the reader finds their own country in it. This searches ' +
    'a destination and returns the carriers available there with their generation and the fallback ' +
    'order — Japan returns NTT Docomo, KDDI and SoftBank, in that priority. It turns a boast into a ' +
    'lookup, which is what the reader actually wanted.',
  pros: [
    'Converts a vanity number into something personally relevant',
    'Fallback order is real information nobody else publishes',
    'Doubles as a product surface worth building for real',
  ],
  cons: ['Needs accurate per-country carrier data', 'A country with one carrier looks weak'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 5, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 12;
    const q = 'Japan';
    const res = [
      ['NTT Docomo', '5G', 'Primary'],
      ['KDDI au', '5G', 'First fallback'],
      ['SoftBank', 'LTE', 'Second fallback'],
    ];
    const typed = q.split('').map((_, i) => q.slice(0, i + 1));
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 250, uid)}
    ${mono(72, 56, 'CHECK YOUR DESTINATION', { size: 9.5, op: 0.45 })}
    ${card(72, 76, 496, 56, { r: 14, fill: WHITE, stroke: P.main, sw: 2 })}
    <g transform="translate(100 104)" fill="none" stroke="${GRAY}" stroke-width="2.2" stroke-linecap="round">
      <circle r="7"/><path d="M 5.5 5.5 L 11 11"/>
    </g>
    ${typed.map((t, i) => `
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0"
          keyTimes="0;${(0.04 + i * 0.03).toFixed(4)};${(0.045 + i * 0.03).toFixed(4)};${i === typed.length - 1 ? '1;1;1' : `${(0.075 + i * 0.03).toFixed(4)};${(0.08 + i * 0.03).toFixed(4)};1`}"
          dur="${dur}s" repeatCount="indefinite" calcMode="discrete" ${i === typed.length - 1 ? 'fill="freeze"' : ''}/>
        ${label(126, 110, t, { size: 17 })}
      </g>`).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.24;0.28;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(544, 110, '3 CARRIERS', { size: 9.5, anchor: 'end', op: 0.55, fill: P.deep })}
    </g>
    ${res.map(([nm, gen, role], i) => {
      const y = 152 + i * 74;
      const on = 0.3 + i * 0.1;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(72, y, 496, 60, { r: 12, fill: i === 0 ? P.wash : WHITE, stroke: i === 0 ? P.main : LINE, sw: i === 0 ? 2 : 1.5 })}
        ${mast(112, y + 44, 0.4, i === 0)}
        ${label(150, y + 28, nm, { size: 14 })}
        ${mono(150, y + 46, role, { size: 9, op: 0.42 })}
        ${badge(510, y + 20, gen, { fill: i === 0 ? P.main : GRAY })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.7;0.78;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${mono(72, 404, 'WE PUBLISH THE ORDER, NOT JUST THE COUNT', { size: 9.5, op: 0.55, fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pAC('Search your country') };
  },
};

export const acWhatTier1Means = {
  id: 'ac-meaning',
  name: 'What Tier-1 Means',
  family: 'Explainability',
  tagline: 'Direct agreement, or somebody else\u2019s leftovers',
  desc:
    '"Tier-1" is a phrase every reseller uses and almost none of them earn. Two supply chains are drawn ' +
    'side by side: ours goes device to carrier, theirs goes device to aggregator to broker to carrier, ' +
    'with the throttle applied at each hop. Defining the term is how we stop competitors borrowing it.',
  pros: [
    'Defines the term on our own ground, which is a durable advantage',
    'The extra hops visibly explain the performance difference',
    'Gives sales a diagram to draw on a whiteboard',
  ],
  cons: ['Directly characterises how competitors operate', 'Needs to be true for every market we sell in'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const hop = (x, y, w, txt, sub, col, op = 1) => `
      ${card(x, y, w, 46, { r: 10, fill: col === P.main ? P.wash : WHITE, stroke: col, sw: col === P.main ? 2 : 1.5, op })}
      ${label(x + w / 2, y + 24, txt, { size: 12, anchor: 'middle' })}
      ${mono(x + w / 2, y + 38, sub, { size: 8, anchor: 'middle', op: 0.4 })}`;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${mono(72, 52, 'HOW THE TRAFFIC ACTUALLY GETS THERE', { size: 9.5, op: 0.45 })}

    ${mono(72, 92, 'OPENLINE', { size: 9, op: 0.55, fill: P.deep })}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.06;0.16;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${hop(72, 104, 200, 'Your device', 'esim profile', LINE)}
      <path d="M 280 127 H 324" stroke="${P.main}" stroke-width="3"/>
      <path d="M 330 127 l -9 -6 v 12 z" fill="${P.main}"/>
      ${hop(340, 104, 228, 'Tier-1 carrier', 'direct agreement', P.main)}
      ${tick(72, 172, 'One hop. Full band access, full speed.', { size: 12 })}
    </g>

    ${mono(72, 230, 'A TYPICAL RESELLER', { size: 9, op: 0.45 })}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.34;0.44;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${hop(72, 244, 112, 'Device', '', LINE)}
      ${hop(204, 244, 112, 'Aggregator', 'capped', LINE)}
      ${hop(336, 244, 112, 'Broker', 'capped again', LINE)}
      ${hop(468, 244, 100, 'Carrier', '', LINE)}
      ${[190, 322, 454].map((x) => `
        <path d="M ${x} 267 H ${x + 8}" stroke="${RED}" stroke-width="3"/>
        <path d="M ${x + 14} 267 l -8 -5 v 10 z" fill="${RED}"/>
        <circle cx="${x + 4}" cy="290" r="8" fill="#FEF2F2"/>
        <path d="M ${x} 286 l 8 8 M ${x + 8} 286 l -8 8" stroke="${RED}" stroke-width="1.8" stroke-linecap="round"/>`).join('')}
      ${mono(72, 316, 'THREE HOPS \u00b7 THROTTLED AT EACH ONE \u00b7 NOBODY ACCOUNTABLE', { size: 8.5, op: 0.5, fill: RED })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 340, 496, 86, { r: 13, fill: P.wash, stroke: P.main, sw: 2 })}
      ${label(96, 374, 'Everybody says Tier-1.', { size: 14 })}
      ${label(96, 402, 'Ask how many companies sit between you and the tower.', { size: 14, fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pAC('Direct, no brokers') };
  },
};

export const acSideBySide = {
  id: 'ac-sidebyside',
  name: 'Same Street',
  family: 'Proof',
  tagline: 'Two phones, one pavement, one speed test',
  desc:
    'The only test anybody trusts is the one they could run themselves. Two phones on the same ' +
    'pavement run a speed test simultaneously — ours on a Tier-1 agreement, a cheap eSIM beside it — ' +
    'and the counters diverge as they climb. A repeatable, falsifiable test is worth more than any ' +
    'roster.',
  pros: [
    'A test the reader could reproduce, which is the strongest kind of proof',
    'Racing counters are compelling to watch and hold as a still',
    'Concrete answer to the "why not the cheap one" objection',
  ],
  cons: ['Comparative performance claims carry legal exposure', 'A single location is not a general result'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 4, brand: 4, ease: 3 },
  build: (uid) => {
    const dur = 11;
    const ph = (x, on, top, name, sub) => `
      ${card(x, 96, 200, 252, { r: 22, fill: INK, stroke: INK })}
      ${card(x + 8, 104, 184, 236, { r: 16, fill: '#17171C', stroke: '#17171C' })}
      ${mono(x + 100, 138, name, { size: 9, anchor: 'middle', op: 0.5, fill: WHITE })}
      <text x="${x + 100}" y="216" font-size="44" font-weight="800" text-anchor="middle"
        fill="${on ? P.main : GRAY}" style="font-family:${MONO}">
        <animate attributeName="opacity" values="0.3;1;1" keyTimes="0;0.5;1" dur="${dur}s" repeatCount="indefinite"/>
        ${top}</text>
      ${mono(x + 100, 240, 'Mbps DOWN', { size: 8.5, anchor: 'middle', op: 0.4, fill: WHITE })}
      ${Array.from({ length: 5 }, (_, i) => `
        <rect x="${x + 48 + i * 22}" y="${300 - (on ? i * 9 : Math.min(i, 1) * 9)}" width="14"
          height="${(on ? 14 + i * 9 : 14 + Math.min(i, 1) * 9)}" rx="2"
          fill="${on ? P.main : GRAY}" opacity="0.85"/>`).join('')}
      ${mono(x + 100, 332, sub, { size: 8.5, anchor: 'middle', op: 0.45, fill: WHITE })}`;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${mono(72, 56, 'LISBON, AVENIDA DA LIBERDADE \u00b7 14:22 \u00b7 SAME SECOND', { size: 9.5, op: 0.45 })}
    ${ph(72, true, '214', 'OPENLINE \u00b7 VODAFONE 5G', 'n78 \u00b7 full band access')}
    ${ph(368, false, '38', 'CHEAP eSIM \u00b7 RESOLD LTE', 'B3 only \u00b7 capped upstream')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.7;0.8;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 372, 496, 56, { r: 12, fill: P.wash, stroke: P.main, sw: 2 })}
      ${label(96, 406, '5.6\u00d7 faster, standing in the same spot', { size: 14, fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pAC('5.6\u00d7 on the same street') };
  },
};

export const acFiftyTwo = {
  id: 'ac-fiftytwo',
  name: 'Fifty-Two, Counted',
  family: 'Coverage',
  tagline: 'The roster, by region, adding up in public',
  desc:
    'If the headline claims fifty-plus, the panel should be able to count them. Five regions fill in ' +
    'with named carriers and a running total that ends at fifty-two, so the number in the heading is ' +
    'demonstrated rather than asserted. The least clever option here, and the one that makes the ' +
    'headline honest.',
  pros: [
    'Makes the headline number verifiable, which nothing currently does',
    'Regional grouping shows depth as well as breadth',
    'The running total is a clean, satisfying payoff',
  ],
  cons: ['A pure inventory with no story', 'The list must be kept accurate as agreements change'],
  scores: { story: 4, motion: 4, perf: 4, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 12;
    const regions = [
      ['Europe', 18, ['Vodafone', 'Orange', 'Telef\u00f3nica', 'Swisscom', 'A1', 'Telia']],
      ['North America', 6, ['AT&T', 'Verizon', 'T-Mobile', 'Bell']],
      ['Asia Pacific', 15, ['NTT Docomo', 'KDDI', 'SK Telecom', 'Telstra', 'Jio']],
      ['Middle East & Africa', 8, ['Etisalat', 'STC', 'MTN', 'Safaricom']],
      ['Latin America', 5, ['Claro', 'Vivo', 'TIM']],
    ];
    let acc = 0;
    const totals = regions.map(([, n]) => (acc += n));
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 250, uid)}
    ${mono(72, 54, 'THE ROSTER, COUNTED', { size: 9.5, op: 0.45 })}
    ${regions.map(([nm, n, names], i) => {
      const y = 76 + i * 62;
      const on = 0.06 + i * 0.13;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${card(72, y, 496, 52, { r: 11, fill: WHITE, stroke: LINE })}
        ${label(96, y + 24, nm, { size: 13 })}
        ${mono(96, y + 42, names.join(' \u00b7 ') + ' \u2026', { size: 8.5, op: 0.38 })}
        ${num(500, y + 32, `${n}`, { size: 20, anchor: 'end', fill: P.deep })}
        ${mono(544, y + 32, `/${totals[i]}`, { size: 9, anchor: 'end', op: 0.35 })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.76;0.84;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 390, 496, 56, { r: 12, fill: P.wash, stroke: P.main, sw: 2 })}
      ${label(96, 424, 'Fifty-two direct agreements, named and published', { size: 13.5, fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pAC('52, named') };
  },
};

/* ── registry ── */

export const acWhenItDrops = {
  id: 'ac-whendrops',
  name: 'When One Drops',
  family: 'Guarantee',
  tagline: 'Fifty carriers only matters if it switches',
  desc:
    'The roster is a static claim. Here it becomes a behaviour: the connected carrier loses coverage ' +
    'entering a tunnel, the next one on the list attaches, and the session continues — the list read ' +
    'as a fallback order rather than a boast. It is the one thing a fifty-carrier panel should prove ' +
    'and currently does not.',
  pros: [
    'Turns the roster from a count into a guarantee',
    'A visible fallback order is more useful than a logo wall',
    'The continuing session is the payoff the panel has been missing',
  ],
  cons: ['Shows a coverage loss on a coverage panel', 'Needs the fallback order to be real'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 4, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 11;
    const chain = [['Vodafone', '5G'], ['Orange', '5G'], ['T-Mobile', 'LTE']];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 250, uid)}
    ${mono(72, 54, 'ENTERING A TUNNEL \u00b7 FALLBACK ORDER', { size: 9.5, op: 0.45 })}
    ${chain.map(([nm, gen], i) => {
      const y = 82 + i * 92;
      const lost = i === 0;
      const takes = i === 1;
      return `<g>
        ${card(72, y, 496, 78, { r: 13, fill: WHITE, stroke: LINE })}
        ${mast(112, y + 58, 0.46, false)}
        ${label(154, y + 34, nm, { size: 15 })}
        ${mono(154, y + 54, `PRIORITY ${i + 1}`, { size: 8.5, op: 0.38 })}
        ${badge(500, y + 22, gen, { fill: GRAY })}
        ${lost ? `<g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.28;0.34;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          ${card(72, y, 496, 78, { r: 13, fill: '#FFF6F5', stroke: RED, sw: 2 })}
          ${label(154, y + 34, nm, { size: 15 })}
          ${mono(154, y + 54, 'COVERAGE LOST \u00b7 14:22:08', { size: 8.5, op: 0.6, fill: RED })}
          ${mono(544, y + 44, 'DROPPED', { size: 9.5, anchor: 'end', op: 0.8, fill: RED })}
        </g>` : ''}
        ${takes ? `<g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.4;0.46;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
          ${card(72, y, 496, 78, { r: 13, fill: P.wash, stroke: P.main, sw: 2 })}
          ${mast(112, y + 58, 0.46, true)}
          ${label(154, y + 34, nm, { size: 15 })}
          ${mono(154, y + 54, 'ATTACHED \u00b7 14:22:08 \u00b7 38 ms LATER', { size: 8.5, op: 0.6, fill: P.deep })}
          ${badge(500, y + 22, gen, { fill: P.main })}
        </g>` : ''}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.7;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${card(72, 362, 496, 82, { r: 13, fill: WHITE, stroke: LINE })}
      ${mono(96, 390, 'THE CALL YOU WERE ON', { size: 8.5, op: 0.4 })}
      ${label(96, 424, 'Still connected. Nobody heard the gap.', { size: 15, fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pAC('Fallback order published') };
  },
};

/* ── registry ── */

/* ══ ACCESS · 11–15 ═════════════════════════════════════════════════ */

export const acThirtySeconds = {
  id: 'ac-thirty',
  name: 'Thirty Seconds',
  family: 'Honesty',
  tagline: 'The one case in ten where you do something',
  desc:
    'Further down this page we admit that about one time in ten a different eSIM profile has to be ' +
    'installed by QR code, and that it takes thirty seconds. Nothing on the page shows it. Here a code ' +
    'appears, a counter runs 30 down to 0, three steps tick off, and the new carrier attaches with the ' +
    'reason printed. The awkward part of the product, handled in the open.',
  pros: [
    'Uses the 90/10 admission the page already makes and no animation touches',
    'A counter running to zero is the fastest way to make thirty seconds feel small',
    'Answers a support question before it becomes a support ticket',
  ],
  cons: [
    'Puts a manual step on a panel that is selling automatic switching',
    'Thirty seconds has to hold on an old handset and a bad hotel wifi',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 3, ease: 4 },
  build: (uid) => {
    const dur = 10;
    const flip = (k, n) => {
      const on = k / n, off = (k + 1) / n;
      const b = Math.min(on + 0.006, 1), d = Math.min(off + 0.006, 1);
      return `<animate attributeName="opacity" values="0;0;1;1;0;0"
        keyTimes="0;${on.toFixed(4)};${b.toFixed(4)};${off.toFixed(4)};${d.toFixed(4)};1"
        dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>`;
    };
    const cell = 11, qx = 78, qy = 118;
    const inFinder = (r, c) => (r < 3 && c < 3) || (r < 3 && c > 7) || (r > 7 && c < 3);
    const finder = (fx, fy) => `
      <rect x="${fx}" y="${fy}" width="33" height="33" fill="${INK}"/>
      <rect x="${fx + 5.5}" y="${fy + 5.5}" width="22" height="22" fill="${WHITE}"/>
      <rect x="${fx + 11}" y="${fy + 11}" width="11" height="11" fill="${INK}"/>`;
    const dotsQ = [];
    for (let r = 0; r < 11; r++) {
      for (let c = 0; c < 11; c++) {
        if (inFinder(r, c)) continue;
        if ((r * 7 + c * 13 + ((r * c) % 5)) % 3 !== 0) continue;
        dotsQ.push(`<rect x="${qx + c * cell}" y="${qy + r * cell}" width="${cell}" height="${cell}" fill="${INK}"/>`);
      }
    }
    const counts = ['30', '24', '18', '12', '06', '00'];
    const steps = ['Old profile removed', 'Code scanned', 'Attached to Orange ES 5G'];
    const inner = `
    ${dots(uid)}
    ${bloom(300, 210, 240, uid)}
    ${mono(56, 56, 'THE 10% CASE \u00b7 A NEW PROFILE BY QR', { size: 9.5, op: 0.45 })}
    ${card(60, 100, 157, 157, { r: 14, fill: WHITE, stroke: LINE, sw: 2 })}
    ${dotsQ.join('')}
    ${finder(qx, qy)}
    ${finder(qx + 8 * cell, qy)}
    ${finder(qx, qy + 8 * cell)}
    ${mono(138, 280, 'SCAN ONCE', { size: 9, anchor: 'middle', op: 0.4 })}
    ${counts.map((t, k) => `<g opacity="0">${flip(k, counts.length)}
      <text x="250" y="168" font-size="52" font-weight="700" fill="${P.deep}"
        style="font-family:${MONO}">${t}</text></g>`).join('')}
    ${mono(250, 194, 'SECONDS LEFT', { size: 9.5, op: 0.4 })}
    <rect x="250" y="210" width="300" height="8" rx="4" fill="${LINE}"/>
    <rect x="250" y="210" width="300" height="8" rx="4" fill="${P.main}">
      <animate attributeName="width" values="300;0;0" keyTimes="0;0.86;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
    </rect>
    ${steps.map((t, i) => {
      const on = 0.14 + i * 0.22;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.04).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${tick(252, 248 + i * 32, t, { stroke: P.main, size: 12.5 })}
      </g>`;
    }).join('')}
    ${card(56, 332, 248, 96, { r: 14, fill: WHITE, stroke: LINE })}
    ${mono(80, 362, '90% OF THE TIME', { size: 8.5, op: 0.4 })}
    ${label(80, 392, 'Nothing to do at all', { size: 14.5 })}
    ${mono(80, 412, 'AUTOMATIC SWITCHING, NO PROMPT', { size: 8.5, op: 0.32 })}
    ${card(328, 332, 256, 96, { r: 14, fill: P.wash, stroke: P.main, sw: 2 })}
    ${mono(352, 362, '10% OF CASES', { size: 8.5, op: 0.5, fill: P.deep })}
    ${label(352, 392, 'Thirty seconds, once', { size: 14.5, fill: P.deep })}
    ${mono(352, 412, 'BETTER PRICE OR BETTER SIGNAL', { size: 8.5, op: 0.4 })}`;
    return { svg: wrap(inner), pills: pAC('The 10% case') };
  },
};

export const acPassportStamps = {
  id: 'ac-stamps',
  name: 'Passport Stamps',
  family: 'Editorial',
  tagline: 'One week, five countries, four carriers',
  desc:
    'The roster proved by use instead of counted. Five entries from one week of travel \u2014 Lisbon on ' +
    'Vodafone PT, Madrid on Orange ES, Zurich on Swisscom, Tokyo on NTT Docomo, Sydney on Telstra \u2014 each ' +
    'stamped in with the time and the handover that got there. Nobody typed anything and nothing was ' +
    'reinstalled.',
  pros: [
    'Reads as one person\u2019s week rather than a corporate inventory',
    'Covers the 190+ countries claim and the handover claim in the same frame',
    'Holds up perfectly as a still image in a deck or an ad',
  ],
  cons: [
    'Five stamps is a smaller number than the headline promises',
    'A stamp motif is a travel cliché, and this is not only a travel product',
  ],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 12;
    const legs = [
      ['MON 08:12', 'Lisbon', 'Vodafone PT \u00b7 5G', 'PT', 'ATTACHED'],
      ['MON 19:40', 'Madrid', 'Orange ES \u00b7 5G', 'ES', 'HANDOVER 41 ms'],
      ['WED 07:05', 'Zurich', 'Swisscom \u00b7 5G', 'CH', 'HANDOVER 38 ms'],
      ['THU 22:15', 'Tokyo', 'NTT Docomo \u00b7 5G', 'JP', 'HANDOVER 44 ms'],
      ['SAT 11:30', 'Sydney', 'Telstra \u00b7 5G', 'AU', 'HANDOVER 39 ms'],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 250, uid)}
    ${mono(56, 54, 'ONE WEEK, AS THE PROFILE SAW IT', { size: 9.5, op: 0.45 })}
    <line x1="56" y1="72" x2="584" y2="72" stroke="${INK}" stroke-width="2"/>
    ${legs.map(([when, city, carrier, code, note], i) => {
      const y = 112 + i * 66;
      const on = 0.06 + i * 0.13;
      const rot = -7 + i * 3.5;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        <g transform="translate(88 ${y - 4}) rotate(${rot.toFixed(1)})">
          <rect x="-28" y="-21" width="56" height="42" rx="8" fill="none" stroke="${P.main}" stroke-width="2" opacity="0.75"/>
          <text x="0" y="1" text-anchor="middle" font-size="15" font-weight="700" fill="${P.deep}"
            style="font-family:${MONO}">${code}</text>
          <text x="0" y="14" text-anchor="middle" font-size="7" font-weight="700" fill="${P.deep}" opacity="0.6"
            letter-spacing="0.8" style="font-family:${MONO}">ENTERED</text>
        </g>
        ${mono(140, y, when, { size: 10, op: 0.42 })}
        ${label(232, y, city, { size: 16 })}
        ${label(344, y, carrier, { size: 12.5, op: 0.6 })}
        ${mono(584, y, note, { size: 9, anchor: 'end', op: 0.4, fill: P.deep })}
        <line x1="56" y1="${y + 22}" x2="584" y2="${y + 22}" stroke="${LINE}" stroke-width="1.2"/>
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.8;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${label(56, 440, 'Five countries, four carriers, one profile \u2014 nothing typed in.', { size: 15, fill: P.deep })}
    </g>`;
    return { svg: wrap(inner), pills: pAC('Five countries, one profile') };
  },
};

export const acCrowdedCell = {
  id: 'ac-crowded',
  name: 'The Crowded Cell',
  family: 'Congestion',
  tagline: 'Same spot, three carriers, one of them jammed',
  desc:
    'One of the eight bullets beside this section promises better performance in congested areas, and ' +
    'nothing illustrates it. Sixty thousand people stand on one cell site: Vodafone is at 96% load, ' +
    'Orange at 74%, T-Mobile at 41%, the loads move, and the attachment follows the least loaded one. ' +
    'The consequence is printed underneath \u2014 74 Mbps against 9.',
  pros: [
    'Congestion, not coverage, is the failure people actually experience at events',
    'Explains why fifty partners matter in a place where one tower serves everybody',
    'Load bars move continuously without a reset',
  ],
  cons: [
    'Shows a Tier-1 partner performing badly, which needs a careful read',
    'The throughput figures have to come from a real measurement',
  ],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 8;
    const ops = [
      { n: 'Vodafone', g: '5G', a: 96, b: 92, c: 97, col: RED },
      { n: 'Orange', g: '5G', a: 74, b: 48, c: 71, col: P.main },
      { n: 'T-Mobile', g: 'LTE', a: 41, b: 66, c: 44, col: P.main },
    ];
    const bw = 230, bx = 250;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 240, uid)}
    ${mono(56, 50, 'FULL STADIUM \u00b7 62,000 PEOPLE \u00b7 ONE CELL SITE', { size: 9.5, op: 0.45 })}
    ${[0, 1, 2].map((r) => Array.from({ length: 34 }, (_, i) =>
      `<circle cx="${58 + i * 15.6}" cy="${74 + r * 13}" r="2.6" fill="${INK}" opacity="${(i + r) % 7 === 0 ? 0.28 : 0.13}"/>`).join('')).join('')}
    ${ops.map((o, i) => {
      const y = 150 + i * 74;
      const wa = ((o.a / 100) * bw).toFixed(0);
      const wb = ((o.b / 100) * bw).toFixed(0);
      const wc = ((o.c / 100) * bw).toFixed(0);
      return `
      ${card(56, y - 30, 528, 60, { r: 13, fill: WHITE, stroke: LINE })}
      ${mast(92, y + 12, { s: 0.42 })}
      ${label(128, y - 4, o.n, { size: 15 })}
      ${mono(128, y + 14, o.g + ' \u00b7 LOAD', { size: 8.5, op: 0.38 })}
      <rect x="${bx}" y="${y - 6}" width="${bw}" height="12" rx="6" fill="${LINE}"/>
      <rect x="${bx}" y="${y - 6}" width="${wa}" height="12" rx="6" fill="${o.col}" opacity="0.85">
        <animate attributeName="width" values="${wa};${wb};${wc};${wa}" keyTimes="0;0.34;0.7;1"
          dur="${dur}s" repeatCount="indefinite"/>
      </rect>
      <text x="${bx + bw + 14}" y="${y + 4}" font-size="12" font-weight="700" fill="${INK}" opacity="0.5"
        style="font-family:${MONO}">${o.a}%</text>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0;0.006;0.5;0.506;1" dur="${dur}s"
        repeatCount="indefinite" calcMode="discrete"/>
      ${badge(520, 286, 'ON THIS ONE', { w: 64, h: 24, size: 8, fill: P.main })}
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.5;0.506;1;1;1" dur="${dur}s"
        repeatCount="indefinite" calcMode="discrete"/>
      ${badge(520, 212, 'ON THIS ONE', { w: 64, h: 24, size: 8, fill: P.main })}
    </g>
    ${card(56, 352, 528, 76, { r: 14, fill: P.wash, stroke: P.main, sw: 2 })}
    ${label(80, 386, '74 Mbps on the quiet carrier. 9 on the jammed one.', { size: 15 })}
    ${mono(80, 410, 'SAME SPOT, SAME SECOND \u00b7 THIS IS WHY BREADTH MATTERS', { size: 8.5, op: 0.45, fill: P.deep })}`;
    return { svg: wrap(inner), pills: pAC('Load-aware, not just signal') };
  },
};

export const acNoConfig = {
  id: 'ac-noconfig',
  name: 'Nothing To Configure',
  family: 'Contrast',
  tagline: 'The APN form nobody fills in any more',
  desc:
    'The section promises that no manual configuration is ever needed, and the fastest way to feel that ' +
    'promise is to see what it replaced. On the left, the nine fields of an APN settings form \u2014 name, ' +
    'APN, proxy, port, username, password, MMSC, MCC/MNC, type \u2014 struck through one at a time. On the ' +
    'right, one line: install the profile.',
  pros: [
    'Nine fields being crossed out is a physical, satisfying way to show \u201cnone\u201d',
    'Anybody who has ever roamed on a prepaid SIM recognises that form immediately',
    'No carrier names, so nothing here needs legal or partner approval',
  ],
  cons: [
    'Requires the reader to have suffered the old way to feel the relief',
    'Nine struck-out rows is a lot of small type on a phone',
  ],
  scores: { story: 4, motion: 4, perf: 5, mobile: 3, brand: 4, ease: 5 },
  build: (uid) => {
    const dur = 11;
    const fields = ['Name', 'APN', 'Proxy', 'Port', 'Username', 'Password', 'MMSC', 'MCC / MNC', 'APN type'];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 240, uid)}
    ${mono(56, 54, 'WHAT THIS REPLACED', { size: 9.5, op: 0.45 })}
    ${card(56, 74, 268, 328, { r: 16, fill: WHITE, stroke: LINE, sw: 1.5 })}
    ${mono(80, 104, 'ACCESS POINT NAMES', { size: 8.5, op: 0.4 })}
    <line x1="80" y1="116" x2="300" y2="116" stroke="${LINE}" stroke-width="1.2"/>
    ${fields.map((f, i) => {
      const y = 144 + i * 28;
      const on = 0.1 + i * 0.055;
      return `
      ${label(80, y, f, { size: 12, op: 0.62 })}
      <rect x="182" y="${y - 11}" width="118" height="15" rx="4" fill="${LINE}" opacity="0.6"/>
      <line x1="78" y1="${y - 4}" x2="302" y2="${y - 4}" stroke="${RED}" stroke-width="1.8"
        stroke-dasharray="224" stroke-dashoffset="224" opacity="0.65">
        <animate attributeName="stroke-dashoffset" values="224;224;0;0"
          keyTimes="0;${on.toFixed(3)};${(on + 0.035).toFixed(3)};1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      </line>`;
    }).join('')}
    ${card(348, 74, 236, 186, { r: 16, fill: P.wash, stroke: P.main, sw: 2 })}
    ${mono(372, 106, 'THE OPENLINE WAY', { size: 8.5, op: 0.5, fill: P.deep })}
    ${label(372, 138, 'Install the profile.', { size: 17 })}
    ${tick(372, 174, 'Nothing to type', { stroke: P.main, size: 12 })}
    ${tick(372, 204, 'Nothing to choose', { stroke: P.main, size: 12 })}
    ${tick(372, 234, 'Nothing to redo abroad', { stroke: P.main, size: 12 })}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.68;0.76;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      <text x="348" y="330" font-size="52" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">0</text>
      ${mono(392, 330, 'FIELDS TO FILL IN', { size: 9.5, op: 0.42 })}
      ${label(348, 372, 'Nine fields, or none.', { size: 15, fill: P.deep })}
    </g>
    ${mono(56, 434, 'NO MANUAL CONFIGURATION EVER NEEDED \u00b7 THE CLAIM, DRAWN', { size: 9, op: 0.32 })}`;
    return { svg: wrap(inner), pills: pAC('Zero setup') };
  },
};

export const acDepartureBoard = {
  id: 'ac-board',
  name: 'Departure Board',
  family: 'Dark surface',
  tagline: 'Fifty-two names, flipping like an airport board',
  desc:
    'A dark split-flap board: carrier, country, band, status. Seven rows flip at their own pace, so far ' +
    'more than seven names pass through \u2014 Vodafone DE, A1 AT, Telia SE, then the next three \u2014 with every ' +
    'row reading DIRECT. Fifty-two partners will not fit on one screen legibly, so the board cycles ' +
    'through them instead of shrinking them.',
  pros: [
    'The only dark panel available to this section on an otherwise white page',
    'Flipping rows show more of the roster than any static grid can at this size',
    'Reads as an arrivals board, which suits a product about crossing borders',
  ],
  cons: [
    'Every name on it must be a partner we can legally list',
    'A board metaphor leans travel, and the section also sells to fixed IoT fleets',
    'Names are only on screen for a couple of seconds each',
  ],
  scores: { story: 4, motion: 5, perf: 4, mobile: 3, brand: 3, ease: 4 },
  build: (uid) => {
    const rowSets = [
      [['Vodafone', 'DE', 'n78'], ['A1 Telekom', 'AT', 'n78'], ['Telia', 'SE', 'n78']],
      [['Orange', 'FR', 'n78'], ['Proximus', 'BE', 'n78'], ['KPN', 'NL', 'n78']],
      [['T-Mobile', 'US', 'n41'], ['Verizon', 'US', 'n77'], ['AT&amp;T', 'US', 'n77']],
      [['NTT Docomo', 'JP', 'n79'], ['KDDI au', 'JP', 'n78'], ['SK Telecom', 'KR', 'n78']],
      [['Telef\u00f3nica', 'ES', 'n78'], ['TIM', 'IT', 'n78'], ['Swisscom', 'CH', 'n78']],
      [['Telstra', 'AU', 'n78'], ['Singtel', 'SG', 'n78'], ['Jio', 'IN', 'n78']],
      [['Etisalat', 'AE', 'n78'], ['STC', 'SA', 'n78'], ['MTN', 'ZA', 'B3']],
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 210, 240, uid)}
    <rect x="40" y="64" width="560" height="312" rx="20" fill="${INK}"/>
    ${mono(66, 100, 'CARRIER', { size: 8.5, fill: WHITE, op: 0.4 })}
    ${mono(300, 100, 'COUNTRY', { size: 8.5, fill: WHITE, op: 0.4 })}
    ${mono(400, 100, 'BAND', { size: 8.5, fill: WHITE, op: 0.4 })}
    ${mono(574, 100, 'STATUS', { size: 8.5, fill: WHITE, op: 0.4, anchor: 'end' })}
    <line x1="66" y1="112" x2="574" y2="112" stroke="${WHITE}" stroke-width="1" opacity="0.14"/>
    ${rowSets.map((set, i) => {
      const y = 142 + i * 32;
      const rdur = 6 + i * 0.7;
      return set.map((s, k) => {
        const on = k / 3, off = (k + 1) / 3;
        const b = Math.min(on + 0.008, 1), d = Math.min(off + 0.008, 1);
        return `<g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0"
            keyTimes="0;${on.toFixed(4)};${b.toFixed(4)};${off.toFixed(4)};${d.toFixed(4)};1"
            dur="${rdur.toFixed(1)}s" repeatCount="indefinite" calcMode="discrete"/>
          <text x="66" y="${y}" font-size="14" font-weight="700" fill="${WHITE}">${s[0]}</text>
          <text x="300" y="${y}" font-size="11.5" font-weight="700" fill="${WHITE}" opacity="0.55"
            style="font-family:${MONO}">${s[1]}</text>
          <text x="400" y="${y}" font-size="11.5" font-weight="700" fill="${WHITE}" opacity="0.45"
            style="font-family:${MONO}">${s[2]}</text>
          <text x="574" y="${y}" text-anchor="end" font-size="11" font-weight="700" fill="${P.main}"
            letter-spacing="0.8" style="font-family:${MONO}">DIRECT</text>
        </g>`;
      }).join('');
    }).join('')}
    <line x1="66" y1="344" x2="574" y2="344" stroke="${WHITE}" stroke-width="1" opacity="0.14"/>
    <text x="66" y="366" font-size="10.5" font-weight="700" fill="${P.main}" letter-spacing="1"
      style="font-family:${MONO}">52 DIRECT AGREEMENTS \u00b7 190+ COUNTRIES \u00b7 ALL TIER-1</text>
    ${label(40, 412, 'Every name on the board is an agreement, not a resale.', { size: 15 })}
    ${mono(40, 438, 'THE BOARD KEEPS FLIPPING \u2014 FIFTY-TWO WILL NOT FIT ON ONE SCREEN', { size: 9, op: 0.32 })}`;
    return { svg: wrap(inner), pills: pAC('52 direct agreements') };
  },
};

/* ── registry ── */
export const ACCESS_VARIANTS = [acCurrent, roster, wall, ladder, regional, signalLadder, acYourRoute, acWhatTier1Means, acSideBySide, acFiftyTwo, acWhenItDrops, acThirtySeconds, acPassportStamps, acCrowdedCell, acNoConfig, acDepartureBoard];
