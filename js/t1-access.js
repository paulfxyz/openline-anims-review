/* ══ /multiple-tier1 · "Access to 50+ Tier-1 Networks" (cyan) ═════════ */

import { mk, INK, WHITE, GRAY, LINE, GREEN, pill, icon } from './kit.js';

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

export const ACCESS_VARIANTS = [acCurrent, roster, wall, ladder, regional, signalLadder];
