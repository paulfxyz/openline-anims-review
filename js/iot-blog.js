/* ══ /iot · "The SIM card is dead. Long live eSIM."  (purple)
   ══ /blog · hero                                    (orange)  ═══════ */

import { mk, INK, WHITE, GRAY, LINE, GREEN, GREEN_SOFT, GREEN_TEXT, RED, AMBER, pill, icon } from './kit.js';

/* ════════════════════════════════════════════════════════════════════
   IoT — purple
   ════════════════════════════════════════════════════════════════════ */
const I = mk('purple');

const pI = (t = 'Why eSIM') => [pill('ink', `${icon('cpu')}${t}`, { top: '14px', right: '14px' })];

export const iotCurrent = {
  id: 'iot-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'Grey bars with purple dots scattered on them',
  desc: 'A row of grey columns with purple dots sprinkled over them on a dotted field. It is abstract to the point of being unreadable: it is not a chart, not a map and not a device, and it sits beside a heading announcing the death of the SIM card and six specific cards explaining why. Whatever the bars mean, none of those six things is visible.',
  pros: ['Quiet and inoffensive; never fights the heading', 'Cheap, and the purple field matches the IoT palette'],
  cons: ['Carries no meaning at all — the shapes decode to nothing', 'The headline is a bold, quotable claim and the art ignores it', 'None of the six adjacent benefit cards is illustrated', 'Almost no motion, so the panel reads as a texture swatch'],
  scores: { story: 1, motion: 2, perf: 5, mobile: 4, brand: 3, ease: 5 },
  build: (uid) => {
    const { P, wrap, dots, bloom } = I;
    const bars = [70, 122, 96, 150, 110, 168, 132, 100];
    const inner = `
    ${dots(uid, 0.14)}
    ${bloom(340, 180, 190, uid)}
    ${bars.map((h, i) => {
      const x = 152 + i * 46;
      return `<rect x="${x}" y="${330 - h}" width="34" height="${h}" rx="3" fill="#D1D5DB" opacity="0.9"/>`;
    }).join('')}
    ${Array.from({ length: 26 }, (_, i) => {
      const x = 160 + (i * 37) % 348;
      const y = 180 + (i * 53) % 146;
      const r = 5 + (i % 3) * 2;
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="${P.main}" opacity="${0.35 + (i % 4) * 0.15}">
        <animate attributeName="opacity" values="${0.3 + (i % 4) * 0.12};0.85;${0.3 + (i % 4) * 0.12}"
          dur="${(2.6 + (i % 5) * 0.4).toFixed(1)}s" begin="${((i % 7) * 0.3).toFixed(1)}s" repeatCount="indefinite"/>
      </circle>`;
    }).join('')}
    <line x1="120" y1="332" x2="520" y2="332" stroke="${INK}" stroke-width="2.5"/>`;
    return { svg: wrap(inner), pills: pI() };
  },
};

export const oneSku = {
  id: 'iotsku',
  name: 'One SKU, Every Country',
  family: 'Supply chain',
  tagline: 'A shelf of SIMs against a single box',
  desc: 'On the left, a shelf of country-specific SIM variants, each with its own part number and stock figure. On the right, one Openline box that ships everywhere, with destination flags attaching to it as it moves. The inventory column empties while the single SKU keeps going. It is the first card on the page — ship one SKU worldwide — made literal.',
  pros: ['Speaks directly to the operations cost that actually blocks IoT deals', 'The emptying shelf gives a strong before-and-after in one frame', 'Part numbers and stock counts read as real supply-chain detail', 'Supports the "Global Out of the Box" card beside it'],
  cons: ['Busiest of the five and the most to localise', 'Needs care not to look like a comparison table'],
  scores: { story: 5, motion: 4, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: (uid) => {
    const { P, wrap, dots, bloom, mono, label, MONO } = I;
    const skus = [
      ['SIM-EU-01', 'Europe', 12400],
      ['SIM-NA-02', 'N. America', 8200],
      ['SIM-APAC-03', 'Asia Pacific', 6100],
      ['SIM-LATAM-04', 'LATAM', 3400],
      ['SIM-MEA-05', 'MEA', 2900],
    ];
    const inner = `
    ${dots(uid, 0.1)}
    ${bloom(440, 230, 210, uid)}
    ${mono(40, 46, 'BEFORE · FIVE SKUS', { size: 10, op: 0.32 })}
    ${mono(600, 46, 'AFTER · ONE', { size: 10, op: 0.32, anchor: 'end', fill: P.deep })}
    <!-- the shelf -->
    ${skus.map((s, i) => `
      <g data-isku="${i}" transform="translate(40 ${74 + i * 62})">
        <rect width="242" height="52" rx="12" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5" data-isshell/>
        <rect x="14" y="16" width="26" height="20" rx="3" fill="#E5E7EB" stroke="#B9BEC7" stroke-width="1.6"/>
        <path d="M 34 16 L 40 22" stroke="#B9BEC7" stroke-width="1.4"/>
        <text x="52" y="24" font-size="11" font-weight="700" fill="${INK}" opacity="0.7" style="font-family:${MONO}">${s[0]}</text>
        <text x="52" y="40" font-size="9.5" font-weight="700" fill="${INK}" opacity="0.35">${s[1]}</text>
        <text x="228" y="32" text-anchor="end" font-size="12" font-weight="700" fill="${INK}" opacity="0.5"
          style="font-family:${MONO}" data-isqty>${s[2].toLocaleString('en-US')}</text>
      </g>`).join('')}
    <g transform="translate(40 392)">
      <rect width="242" height="46" rx="12" fill="#FEE2E2"/>
      ${mono(16, 20, 'INVENTORY HELD', { size: 8.5, op: 0.5, fill: '#991B1B' })}
      <text x="16" y="38" font-size="15" font-weight="700" fill="#991B1B" style="font-family:${MONO}"><tspan data-role="iheld">33,000 units</tspan></text>
    </g>

    <!-- the single box -->
    <g transform="translate(452 196)">
      <rect x="-72" y="-58" width="144" height="116" rx="12" fill="${P.main}" stroke="${INK}" stroke-width="3"/>
      <path d="M -72 -22 H 72" stroke="${INK}" stroke-width="2.5" opacity="0.4"/>
      <rect x="-26" y="-46" width="52" height="18" rx="4" fill="${WHITE}" opacity="0.28"/>
      <g transform="translate(0 16)">
        <rect x="-30" y="-16" width="60" height="32" rx="7" fill="${WHITE}" opacity="0.22"/>
        <text y="5" text-anchor="middle" font-size="12" font-weight="700" fill="${WHITE}" style="font-family:${MONO}">eSIM</text>
      </g>
    </g>
    ${label(452, 278, 'One SKU', { size: 17, anchor: 'middle', fill: P.deep })}
    ${mono(452, 298, 'SHIPS ANYWHERE', { size: 9.5, anchor: 'middle', op: 0.4 })}
    <!-- flags attaching -->
    ${['🇩🇪', '🇺🇸', '🇯🇵', '🇧🇷', '🇰🇪', '🇦🇺'].map((f, i) => {
      const a = -90 + i * 60;
      const x = 452 + Math.cos(a * Math.PI / 180) * 128;
      const y = 196 + Math.sin(a * Math.PI / 180) * 116;
      return `
      <g data-iflag="${i}" opacity="0.25">
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="17" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5" data-ifshell/>
        <text x="${x.toFixed(1)}" y="${(y + 6).toFixed(1)}" text-anchor="middle" font-size="16">${f}</text>
      </g>`;
    }).join('')}
    <g transform="translate(332 392)">
      <rect width="268" height="46" rx="12" fill="${GREEN_SOFT}"/>
      ${mono(16, 20, 'INVENTORY HELD', { size: 8.5, op: 0.5, fill: GREEN_TEXT })}
      <text x="16" y="38" font-size="15" font-weight="700" fill="${GREEN_TEXT}" style="font-family:${MONO}">0 units · 190+ countries</text>
    </g>`;

    return {
      svg: wrap(inner),
      pills: pI('One SKU worldwide'),
      init(root) {
        const skus = [...root.querySelectorAll('[data-isku]')];
        const flags = [...root.querySelectorAll('[data-iflag]')];
        const held = root.querySelector('[data-role="iheld"]');
        if (!skus.length) return null;
        skus.forEach(s => { s.style.transition = 'opacity .5s ease'; });
        flags.forEach(f => { f.style.transition = 'opacity .5s ease'; });
        const base = [12400, 8200, 6100, 3400, 2900];
        let k = 0;
        const timers = [];
        const run = () => {
          if (k === 0) {
            skus.forEach((s, i) => {
              s.style.opacity = '1';
              s.querySelector('[data-isqty]').textContent = base[i].toLocaleString('en-US');
            });
            flags.forEach(f => { f.style.opacity = '0.25'; });
            if (held) held.textContent = '33,000 units';
          }
          if (k < skus.length) {
            skus[k].style.opacity = '0.15';
            skus[k].querySelector('[data-isqty]').textContent = '0';
            flags[k].style.opacity = '1';
            const left = base.slice(k + 1).reduce((a, b) => a + b, 0);
            if (held) held.textContent = left ? `${left.toLocaleString('en-US')} units` : '0 units';
          } else if (k === skus.length) {
            flags[5].style.opacity = '1';
          }
          k = (k + 1) % (skus.length + 3);
          timers.push(setTimeout(run, 900));
        };
        run();
        return () => timers.forEach(t => clearTimeout(t));
      },
    };
  },
};

export const overAir = {
  id: 'iotota',
  name: 'Over the Air',
  family: 'Field operations',
  tagline: 'A new profile, no truck, no hands',
  desc: 'A device sits in the field — a sensor on a pole. A new carrier profile is pushed to it remotely: the packet arrives, the profile writes, the network label changes, and a counter of site visits avoided climbs while a truck icon stays parked. Remote provisioning is the second card on the page, and it is the one that saves real money.',
  pros: ['Targets the highest-value benefit: never touching the device again', 'The parked truck is a single image that makes the saving obvious', 'Clear four-beat loop that resolves each time', 'Works as well for one device as for a fleet'],
  cons: ['One device on screen understates fleet scale', 'The truck metaphor may not read in every market'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const { P, wrap, dots, bloom, mono, label, MONO } = I;
    const inner = `
    ${dots(uid, 0.1)}
    ${bloom(300, 230, 220, uid)}
    ${mono(40, 46, 'REMOTE PROVISIONING · NO SITE VISIT', { size: 10, op: 0.32 })}

    <!-- cloud / platform -->
    <g transform="translate(112 132)">
      <rect x="-64" y="-34" width="128" height="68" rx="16" fill="${INK}"/>
      ${mono(-46, -8, 'OMDM', { size: 9, fill: WHITE, op: 0.5 })}
      <text x="-46" y="18" font-size="13" font-weight="700" fill="${P.main}" style="font-family:${MONO}">PUSH</text>
      <circle cx="44" cy="10" r="6" fill="${P.main}"><animate attributeName="opacity" values="1;0.3;1" dur="1.3s" repeatCount="indefinite"/></circle>
    </g>

    <!-- link + packet -->
    <path id="ota-${uid}" d="M 176 140 C 260 140 300 196 356 210" fill="none" stroke="${P.main}" stroke-width="2.5"
      stroke-dasharray="9 8" opacity="0.45">
      <animate attributeName="stroke-dashoffset" values="0;-17" dur="0.8s" repeatCount="indefinite"/>
    </path>
    ${[0, 1.6].map(b => `
      <circle r="6" fill="${P.main}">
        <animateMotion dur="3.2s" begin="${b}s" repeatCount="indefinite" path="M 176 140 C 260 140 300 196 356 210"/>
        <animate attributeName="opacity" values="0;1;1;0" dur="3.2s" begin="${b}s" repeatCount="indefinite"/>
      </circle>`).join('')}

    <!-- the device on its pole -->
    <g transform="translate(398 226)">
      <rect x="-6" y="30" width="12" height="150" rx="4" fill="#9CA3AF"/>
      <rect x="-46" y="-40" width="92" height="72" rx="12" fill="${WHITE}" stroke="${INK}" stroke-width="3"/>
      <rect x="-32" y="-26" width="64" height="26" rx="5" fill="${P.soft}" data-otascreen/>
      <text x="0" y="-8" text-anchor="middle" font-size="9" font-weight="700" fill="${P.deep}"
        style="font-family:${MONO}" data-otanet>VODAFONE</text>
      <g transform="translate(-24 18)">
        ${[0, 1, 2, 3].map(i => `<rect x="${i * 13}" y="${-4 - i * 4}" width="8" height="${4 + i * 4}" rx="2"
          fill="${P.main}" opacity="0.25" data-otabar="${i}"/>`).join('')}
      </g>
      <circle cx="34" cy="18" r="5" fill="${GREEN}" data-otadot/>
      <!-- write pulse -->
      <circle r="46" fill="none" stroke="${P.main}" stroke-width="2.5" opacity="0" data-otapulse/>
    </g>
    ${label(398, 300, 'Sensor · in the field', { size: 13.5, anchor: 'middle', op: 0.6 })}
    ${mono(398, 320, 'NEVER TOUCHED SINCE INSTALL', { size: 9.5, anchor: 'middle', op: 0.35 })}

    <!-- the parked truck -->
    <g transform="translate(106 300)" opacity="0.4">
      <rect x="-48" y="-14" width="66" height="34" rx="5" fill="#D1D5DB" stroke="${INK}" stroke-width="2.5"/>
      <path d="M 18 20 V -2 H 40 L 48 8 V 20 Z" fill="#E5E7EB" stroke="${INK}" stroke-width="2.5"/>
      <circle cx="-26" cy="22" r="8" fill="${INK}"/><circle cx="32" cy="22" r="8" fill="${INK}"/>
      <path d="M -60 40 H 60" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6" opacity="0.5"/>
    </g>
    ${mono(106, 362, 'STAYS PARKED', { size: 9.5, anchor: 'middle', op: 0.35 })}

    <g transform="translate(40 388)">
      <rect width="264" height="50" rx="14" fill="${P.main}"/>
      ${mono(18, 22, 'SITE VISITS AVOIDED', { size: 8.5, fill: WHITE, op: 0.7 })}
      <text x="18" y="42" font-size="17" font-weight="700" fill="${WHITE}" style="font-family:${MONO}"><tspan data-role="otacount">0</tspan></text>
    </g>
    <g transform="translate(336 388)">
      <rect width="264" height="50" rx="14" fill="${GREEN_SOFT}"/>
      ${mono(18, 22, 'PROFILE SWITCH TIME', { size: 8.5, op: 0.5, fill: GREEN_TEXT })}
      <text x="18" y="42" font-size="17" font-weight="700" fill="${GREEN_TEXT}" style="font-family:${MONO}">4.2 s</text>
    </g>`;

    return {
      svg: wrap(inner),
      pills: pI('Remote provisioning'),
      init(root) {
        const net = root.querySelector('[data-otanet]');
        const pulse = root.querySelector('[data-otapulse]');
        const cnt = root.querySelector('[data-role="otacount"]');
        const bars = [0, 1, 2, 3].map(i => root.querySelector(`[data-otabar="${i}"]`));
        if (!net) return null;
        const nets = ['VODAFONE', 'ORANGE', 'T-MOBILE', 'NTT'];
        let i = 0, n = 0;
        const timers = [];
        const cycle = () => {
          bars.forEach(b => b && b.setAttribute('opacity', '0.25'));
          timers.push(setTimeout(() => {
            if (pulse) {
              pulse.setAttribute('opacity', '0.9');
              let r = 30;
              const a = setInterval(() => {
                r += 4; pulse.setAttribute('r', String(r));
                pulse.setAttribute('opacity', String(Math.max(0, 0.9 - (r - 30) / 40)));
                if (r > 68) { clearInterval(a); pulse.setAttribute('opacity', '0'); }
              }, 40);
              timers.push(a);
            }
            i = (i + 1) % nets.length;
            net.textContent = nets[i];
            n++;
            if (n > 412) n = 1;
            if (cnt) cnt.textContent = (411 + n).toLocaleString('en-US');
            bars.forEach((b, k) => b && timers.push(setTimeout(() => b.setAttribute('opacity', '1'), 140 * k)));
          }, 1800));
          timers.push(setTimeout(cycle, 3600));
        };
        cycle();
        return () => timers.forEach(t => { clearTimeout(t); clearInterval(t); });
      },
    };
  },
};

export const trayGone = {
  id: 'iottray',
  name: 'The Tray Disappears',
  family: 'Literal',
  tagline: 'Plastic out, silicon in',
  desc: 'A board with a physical SIM tray. The tray ejects, the card falls away, and the slot collapses into a 5×6 mm eSIM soldered onto the board — while three figures drop with it: footprint, bill of materials, and failure points. It is the most direct possible illustration of the sentence above it, and it lands in one beat.',
  pros: ['The headline says the SIM card is dead; this kills it on screen', 'Three falling numbers give the beat a measurable payoff', 'Supports the smaller-form-factor and lower-cost cards at once', 'Reads perfectly as a still frame too'],
  cons: ['A single event loop can feel repetitive on a long page', 'Physical dimensions quoted have to match the real module'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const { P, wrap, dots, bloom, mono, label, MONO } = I;
    const inner = `
    ${dots(uid, 0.1)}
    ${bloom(300, 210, 210, uid)}
    ${mono(40, 46, 'SAME BOARD · ONE FEWER MOVING PART', { size: 10, op: 0.32 })}
    <!-- the board -->
    <g transform="translate(286 208)">
      <rect x="-200" y="-104" width="400" height="208" rx="14" fill="#1F2937"/>
      <rect x="-190" y="-94" width="380" height="188" rx="10" fill="none" stroke="${P.main}" stroke-width="1.5" opacity="0.28"/>
      ${Array.from({ length: 9 }, (_, i) => `<path d="M ${-176 + i * 44} -94 V 94" stroke="${P.main}" stroke-width="1" opacity="0.14"/>`).join('')}
      ${Array.from({ length: 5 }, (_, i) => `<path d="M -190 ${-72 + i * 36} H 190" stroke="${P.main}" stroke-width="1" opacity="0.14"/>`).join('')}
      <!-- fixed components -->
      <rect x="-166" y="-68" width="56" height="40" rx="5" fill="#374151" stroke="#4B5563" stroke-width="1.5"/>
      <rect x="112" y="34" width="62" height="44" rx="5" fill="#374151" stroke="#4B5563" stroke-width="1.5"/>
      ${Array.from({ length: 6 }, (_, i) => `<rect x="${-150 + i * 26}" y="52" width="14" height="20" rx="2" fill="#374151"/>`).join('')}

      <!-- the old SIM slot -->
      <g data-tslot>
        <rect x="-60" y="-52" width="130" height="94" rx="7" fill="#374151" stroke="#6B7280" stroke-width="2"/>
        ${mono(-46, -32, 'SIM TRAY', { size: 8.5, fill: WHITE, op: 0.45 })}
      </g>
      <!-- the tray + card sliding out -->
      <g data-ttray>
        <rect x="-52" y="-22" width="112" height="56" rx="5" fill="#9CA3AF" stroke="${WHITE}" stroke-width="1.5" opacity="0.9"/>
        <rect x="-40" y="-14" width="58" height="40" rx="4" fill="#E5E7EB" stroke="#B9BEC7" stroke-width="1.6"/>
        <path d="M 8 -14 L 18 -4" stroke="#B9BEC7" stroke-width="1.5"/>
      </g>
      <!-- the eSIM module -->
      <g data-tchip opacity="0">
        <rect x="-22" y="-16" width="44" height="32" rx="5" fill="${P.main}"/>
        <path d="M -22 -6 H 22 M -22 6 H 22 M -8 -16 V 16 M 8 -16 V 16" stroke="#1F2937" stroke-width="1.6" opacity="0.4"/>
        ${Array.from({ length: 6 }, (_, i) => `<rect x="${-20 + i * 7}" y="16" width="4" height="6" rx="1" fill="#D1D5DB"/>`).join('')}
        ${Array.from({ length: 6 }, (_, i) => `<rect x="${-20 + i * 7}" y="-22" width="4" height="6" rx="1" fill="#D1D5DB"/>`).join('')}
        <circle r="30" fill="none" stroke="${P.main}" stroke-width="2" opacity="0.6">
          <animate attributeName="r" values="24;44" dur="2.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;0" dur="2.2s" repeatCount="indefinite"/>
        </circle>
      </g>
    </g>
    <g data-tlabel transform="translate(286 340)">
      <text text-anchor="middle" font-size="15" font-weight="700" fill="${INK}" opacity="0.7"><tspan data-role="tname">Physical SIM tray</tspan></text>
      <text y="22" text-anchor="middle" font-size="10" font-weight="700" fill="${INK}" opacity="0.4" letter-spacing="1"
        style="font-family:${MONO}"><tspan data-role="tmeta">15 × 12 × 2.5 MM · MOVING PART</tspan></text>
    </g>
    ${[['FOOTPRINT', 'tfoot', '180 mm²'], ['BOM COST', 'tbom', '$1.40'], ['FAILURE POINTS', 'tfail', '3']].map((m, i) => `
      <g transform="translate(${40 + i * 194} 382)">
        <rect width="180" height="56" rx="14" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
        ${mono(16, 22, m[0], { size: 8.5, op: 0.4 })}
        <text x="16" y="44" font-size="17" font-weight="700" fill="${INK}" opacity="0.75"
          style="font-family:${MONO}"><tspan data-role="${m[1]}">${m[2]}</tspan></text>
      </g>`).join('')}`;

    return {
      svg: wrap(inner),
      pills: pI('Smaller, cheaper, sealed'),
      init(root) {
        const tray = root.querySelector('[data-ttray]');
        const slot = root.querySelector('[data-tslot]');
        const chip = root.querySelector('[data-tchip]');
        const nm = root.querySelector('[data-role="tname"]');
        const mt = root.querySelector('[data-role="tmeta"]');
        const f = root.querySelector('[data-role="tfoot"]');
        const b = root.querySelector('[data-role="tbom"]');
        const fa = root.querySelector('[data-role="tfail"]');
        if (!tray) return null;
        [tray, slot, chip].forEach(e => { e.style.transition = 'transform .8s cubic-bezier(.2,.7,.3,1), opacity .6s ease'; });
        const timers = [];
        const cycle = () => {
          tray.setAttribute('transform', 'translate(0 0)');
          tray.style.opacity = '1';
          slot.style.opacity = '1';
          chip.setAttribute('opacity', '0');
          chip.setAttribute('transform', 'translate(0 0) scale(0.6)');
          if (nm) nm.textContent = 'Physical SIM tray';
          if (mt) mt.textContent = '15 × 12 × 2.5 MM · MOVING PART';
          if (f) f.textContent = '180 mm²';
          if (b) b.textContent = '$1.40';
          if (fa) fa.textContent = '3';
          timers.push(setTimeout(() => {
            tray.setAttribute('transform', 'translate(250 40) rotate(12)');
            tray.style.opacity = '0';
          }, 1200));
          timers.push(setTimeout(() => {
            slot.style.opacity = '0';
            chip.setAttribute('opacity', '1');
            chip.setAttribute('transform', 'translate(0 0) scale(1)');
            if (nm) nm.textContent = 'Soldered eSIM (MFF2)';
            if (mt) mt.textContent = '5 × 6 × 1 MM · NOTHING TO MOVE';
            if (f) f.textContent = '30 mm²';
            if (b) b.textContent = '$0.55';
            if (fa) fa.textContent = '0';
          }, 2000));
          timers.push(setTimeout(cycle, 5400));
        };
        cycle();
        return () => timers.forEach(t => clearTimeout(t));
      },
    };
  },
};

export const fleetWave = {
  id: 'iotfleet',
  name: 'Fleet Activation',
  family: 'Scale',
  tagline: 'Ten thousand devices, one wave',
  desc: 'A grid of device tiles activates in a sweeping wave, region by region, with a counter running to ten thousand and a rate readout in activations per second. A handful stay amber and then resolve on a retry. It answers the question the page is really about: does this work when there are not two devices but twenty thousand.',
  pros: ['Only option that makes fleet scale visible rather than stated', 'A wave across a grid is satisfying and never repeats identically', 'The retry detail is a credibility signal engineers notice', 'Cheap to render despite looking dense'],
  cons: ['Abstract: individual devices are just tiles', 'Says nothing about why eSIM specifically, only that it scales', 'Needs a smaller grid on a phone'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 3, brand: 4, ease: 4 },
  build: (uid) => {
    const { P, wrap, dots, bloom, mono, label, MONO } = I;
    const cols = 20, rows = 9;
    const inner = `
    ${dots(uid, 0.08)}
    ${bloom(320, 200, 230, uid)}
    ${mono(40, 46, 'FLEET ACTIVATION · LIVE', { size: 10, op: 0.32 })}
    ${mono(600, 46, 'AUTOMOTIVE · WEARABLES · METERS', { size: 9.5, op: 0.28, anchor: 'end' })}
    ${Array.from({ length: cols * rows }, (_, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      return `<rect data-dev="${i}" x="${40 + c * 28}" y="${70 + r * 28}" width="20" height="20" rx="5"
        fill="${P.main}" opacity="0.12"/>`;
    }).join('')}
    ${[['DEVICES ACTIVATED', 'fcount', '0'], ['RATE', 'frate', '0 /s'], ['FAILED', 'ffail', '0']].map((m, i) => `
      <g transform="translate(${40 + i * 194} 358)">
        <rect width="180" height="60" rx="14" fill="${i === 2 ? WHITE : INK}" stroke="${i === 2 ? LINE : INK}" stroke-width="1.5"/>
        ${mono(16, 24, m[0], { size: 8.5, fill: i === 2 ? INK : WHITE, op: i === 2 ? 0.4 : 0.5 })}
        <text x="16" y="48" font-size="20" font-weight="700" fill="${i === 2 ? GREEN_TEXT : P.main}"
          style="font-family:${MONO}"><tspan data-role="${m[1]}">${m[2]}</tspan></text>
      </g>`).join('')}
    ${mono(40, 440, 'ONE API CALL PER BATCH · NO SITE VISITS · NO SIM LOGISTICS', { size: 9.5, op: 0.3 })}`;

    return {
      svg: wrap(inner),
      pills: pI('Built for fleets'),
      init(root) {
        const devs = [...root.querySelectorAll('[data-dev]')];
        if (!devs.length) return null;
        const cnt = root.querySelector('[data-role="fcount"]');
        const rate = root.querySelector('[data-role="frate"]');
        const fail = root.querySelector('[data-role="ffail"]');
        devs.forEach(d => { d.style.transition = 'opacity .35s ease, fill .35s ease'; });
        const cols = 20;
        let col = 0, total = 0, failed = 0;
        const timers = [];
        const tick = () => {
          if (col >= cols) {
            timers.push(setTimeout(() => {
              devs.forEach(d => { d.setAttribute('opacity', '0.12'); d.setAttribute('fill', '#8B5CF6'); });
              col = 0; total = 0; failed = 0;
              if (cnt) cnt.textContent = '0';
              if (fail) fail.textContent = '0';
            }, 1000));
            col++;
            return;
          }
          if (col > cols) return;
          devs.forEach((d, i) => {
            if (i % cols !== col) return;
            const bad = Math.random() < 0.05;
            d.setAttribute('opacity', '1');
            d.setAttribute('fill', bad ? '#F59E0B' : '#8B5CF6');
            if (bad) {
              failed++;
              timers.push(setTimeout(() => { d.setAttribute('fill', '#8B5CF6'); failed = Math.max(0, failed - 1); if (fail) fail.textContent = String(failed); }, 900));
            }
            total += 55 + Math.floor(Math.random() * 12);
          });
          col++;
          if (cnt) cnt.textContent = Math.min(10000, total).toLocaleString('en-US');
          if (rate) rate.textContent = `${420 + Math.floor(Math.random() * 180)} /s`;
          if (fail) fail.textContent = String(failed);
        };
        const id = setInterval(tick, 260);
        return () => { clearInterval(id); timers.forEach(t => clearTimeout(t)); };
      },
    };
  },
};

export const painPoints = {
  id: 'iotpain',
  name: 'Six Pains, Crossed Out',
  family: 'Feature-led',
  tagline: 'The six cards, resolved one by one',
  desc: 'Six pains of plastic SIMs sit in a list — regional inventory, truck rolls, tamper and theft, corrosion, board space, manual activation. One at a time each is struck through and replaced by the eSIM answer with its figure, in the same order as the six cards beside the panel. When the list is clear it starts again.',
  pros: ['Maps one-to-one onto the six cards, so the section finally coheres', 'Strike-through is the clearest "problem solved" motion available', 'Every line is already written on the page — nothing new to invent', 'Reads correctly even if the visitor only catches one beat'],
  cons: ['Least atmospheric of the five; it is a list', 'Six beats makes for a long loop', 'Dependent on the card copy staying as it is'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 3, ease: 4 },
  build: (uid) => {
    const { P, wrap, dots, bloom, mono, label, MONO } = I;
    const pains = [
      ['Regional SIM inventory', 'One SKU, 190+ countries'],
      ['Truck rolls to swap SIMs', 'Profiles pushed over the air'],
      ['Trays tampered or stolen', 'Soldered and sealed'],
      ['Corrosion and vibration', 'No contacts to corrode'],
      ['Board space for a tray', '30 mm² instead of 180'],
      ['Manual activation per unit', 'Batch activation via API'],
    ];
    const inner = `
    ${dots(uid, 0.1)}
    ${bloom(320, 220, 220, uid)}
    ${mono(40, 46, 'WHAT PLASTIC COSTS YOU', { size: 10, op: 0.32 })}
    ${mono(600, 46, 'WHAT eSIM GIVES BACK', { size: 10, op: 0.32, anchor: 'end', fill: P.deep })}
    ${pains.map((p, i) => {
      const y = 78 + i * 58;
      return `
      <g data-pain="${i}" transform="translate(40 ${y})">
        <rect width="560" height="48" rx="13" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5" data-pshell/>
        <g transform="translate(22 24)">
          <circle r="11" fill="#FEE2E2" data-pbadge/>
          <path d="M -4 -4 L 4 4 M 4 -4 L -4 4" stroke="#DC2626" stroke-width="2.2" stroke-linecap="round" data-pcross/>
          <path d="M -4.5 0.5 L -1 4 L 5 -3.5" fill="none" stroke="${WHITE}" stroke-width="2.4" stroke-linecap="round"
            stroke-linejoin="round" opacity="0" data-ptick/>
        </g>
        <text x="52" y="29" font-size="14" font-weight="700" fill="${INK}" opacity="0.7" data-pold>${p[0]}</text>
        <line x1="52" y1="24" x2="52" y2="24" stroke="#DC2626" stroke-width="2" data-pstrike opacity="0"/>
        <text x="330" y="29" font-size="13.5" font-weight="700" fill="${P.deep}" opacity="0" data-pnew>${p[1]}</text>
      </g>`;
    }).join('')}
    <g transform="translate(40 428)">
      <text font-size="11" font-weight="700" fill="${INK}" opacity="0.35" letter-spacing="1"
        style="font-family:${MONO}">RESOLVED <tspan data-role="pcount">0</tspan> / 6</text>
    </g>`;

    return {
      svg: wrap(inner),
      pills: pI('Six pains, gone'),
      init(root) {
        const rows = [...root.querySelectorAll('[data-pain]')];
        if (!rows.length) return null;
        const cnt = root.querySelector('[data-role="pcount"]');
        rows.forEach(r => {
          r.querySelector('[data-pold]').style.transition = 'opacity .4s ease';
          r.querySelector('[data-pnew]').style.transition = 'opacity .4s ease';
          r.querySelector('[data-pstrike]').style.transition = 'all .45s ease';
        });
        const widths = [178, 196, 168, 174, 158, 190];
        let k = 0;
        const timers = [];
        const reset = () => {
          rows.forEach(r => {
            r.querySelector('[data-pshell]').setAttribute('stroke', LINE);
            r.querySelector('[data-pbadge]').setAttribute('fill', '#FEE2E2');
            r.querySelector('[data-pcross]').setAttribute('opacity', '1');
            r.querySelector('[data-ptick]').setAttribute('opacity', '0');
            r.querySelector('[data-pold]').style.opacity = '0.7';
            r.querySelector('[data-pnew]').style.opacity = '0';
            const s = r.querySelector('[data-pstrike]');
            s.setAttribute('opacity', '0');
            s.setAttribute('x2', '52');
          });
          k = 0;
          if (cnt) cnt.textContent = '0';
        };
        const step = () => {
          if (k >= rows.length) { timers.push(setTimeout(() => { reset(); step(); }, 1600)); return; }
          const r = rows[k];
          r.querySelector('[data-pshell]').setAttribute('stroke', P.main);
          const s = r.querySelector('[data-pstrike]');
          s.setAttribute('opacity', '1');
          s.setAttribute('x2', String(52 + widths[k]));
          r.querySelector('[data-pold]').style.opacity = '0.3';
          timers.push(setTimeout(() => {
            r.querySelector('[data-pbadge]').setAttribute('fill', '#8B5CF6');
            r.querySelector('[data-pcross]').setAttribute('opacity', '0');
            r.querySelector('[data-ptick]').setAttribute('opacity', '1');
            r.querySelector('[data-pnew]').style.opacity = '1';
          }, 380));
          k++;
          if (cnt) cnt.textContent = String(k);
          timers.push(setTimeout(step, 1100));
        };
        reset();
        step();
        return () => timers.forEach(t => clearTimeout(t));
      },
    };
  },
};

export const IOT_VARIANTS = [iotCurrent, oneSku, overAir, trayGone, fleetWave, painPoints];

/* ════════════════════════════════════════════════════════════════════
   BLOG — orange
   ════════════════════════════════════════════════════════════════════ */
const B = mk('orange');

const pBl = (a = 'New every week', b = 'Free Access') => [
  pill('orange', `${icon('zap')}${a}`, { top: '14px', right: '14px' }),
  ...(b ? [pill('white', `<span class="dot"></span>${b}`, { top: '70px', right: '14px' })] : []),
];

const POSTS = [
  ['Tokyo on 5GB', 'Asia · 6 min'],
  ['Europe by rail, always online', 'Europe · 8 min'],
  ['Working from Lisbon', 'Guides · 5 min'],
  ['eSIM vs roaming, honestly', 'Devices · 7 min'],
  ['Bali on one plan', 'Asia · 4 min'],
  ['Airport wifi is a trap', 'Tips · 3 min'],
];

const globeTile = (x, y, s = 1) => {
  const { P } = B;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-19" y="-19" width="38" height="38" rx="10" fill="${P.wash}" stroke="${P.main}" stroke-width="1.5"/>
    <g fill="none" stroke="${P.deep}" stroke-width="1.8">
      <circle r="10"/><path d="M -10 0 H 10 M 0 -10 a 14 10 0 0 0 0 20 a 14 10 0 0 0 0 -20"/>
    </g>
  </g>`;
};

export const blogCurrent = {
  id: 'blog-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'Three article cards that never change',
  desc: 'Three bordered cards — Tokyo on 5GB, Europe by rail, Working from Lisbon — each with a globe icon, category and read time, over faint dashed arcs. It is the right content to show, but the three cards are fixed, so a claim of 350+ articles and something new every week is represented by three items that are identical on every visit.',
  pros: ['Real headlines are far better than abstract art for a blog hero', 'Category and read time is exactly the metadata a reader scans for'],
  cons: ['Three static cards under a claim of 350+ published articles', '"New every week" is a pill, with nothing arriving on screen', 'The dashed arcs behind are decorative and carry no meaning', 'No sense of topics, breadth, or where to start reading'],
  scores: { story: 3, motion: 2, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid) => {
    const { P, wrap, dots, bloom, mono, label, MONO } = B;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 210, uid)}
    ${[0, 1, 2].map(i => `
      <path d="M 40 ${140 + i * 90} C 200 ${96 + i * 90} 440 ${96 + i * 90} 600 ${140 + i * 90}"
        fill="none" stroke="${P.main}" stroke-width="2" stroke-dasharray="7 9" opacity="0.2"/>`).join('')}
    ${POSTS.slice(0, 3).map((p, i) => `
      <g transform="translate(96 ${118 + i * 96})">
        <rect width="448" height="76" rx="14" fill="${WHITE}" stroke="${INK}" stroke-width="2.5"/>
        ${globeTile(44, 38)}
        ${label(80, 34, p[0], { size: 16 })}
        ${mono(80, 54, p[1].toUpperCase(), { size: 9.5, op: 0.38 })}
      </g>`).join('')}`;
    return { svg: wrap(inner), pills: pBl() };
  },
};

export const feedLive = {
  id: 'blogfeed',
  name: 'Live Feed',
  family: 'Freshness',
  tagline: 'New posts arriving as you watch',
  desc: 'The article list scrolls gently upward as new posts arrive at the top with a "new" flag, categories rotating through guides, destinations, devices and tips. A counter tracks the library size towards 350+. The hero claims something new every week; this is the only option where something new actually appears.',
  pros: ['Makes freshness observable instead of claiming it in a pill', 'More headlines on screen means more chances to hook a reader', 'Continuous scroll has no loop seam at all', 'Trivially wired to the real post feed later'],
  cons: ['Moving text is harder to read than static text', 'Needs real recent posts or the freshness claim backfires'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid) => {
    const { P, wrap, dots, bloom, mono, label, MONO } = B;
    const rowH = 84;
    const all = [...POSTS, ...POSTS];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 200, uid)}
    ${mono(40, 50, 'LATEST FROM THE OPENLINE BLOG', { size: 10, op: 0.32 })}
    <g transform="translate(40 66)">
      <rect width="560" height="300" rx="20" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
      <defs>
        <linearGradient id="bf-${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="0.07" stop-color="#fff" stop-opacity="0"/>
          <stop offset="0.93" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="1"/>
        </linearGradient>
      </defs>
      <svg x="2" y="2" width="556" height="296" viewBox="0 0 556 296" overflow="hidden">
        <g data-bfeedwrap>
          ${all.map((p, i) => `
          <g transform="translate(0 ${i * rowH})">
            <rect x="14" y="${12}" width="528" height="${rowH - 14}" rx="13" fill="${i % POSTS.length === 0 ? P.wash : WHITE}"
              stroke="${i % POSTS.length === 0 ? P.main : LINE}" stroke-width="${i % POSTS.length === 0 ? 2 : 1.3}"/>
            ${globeTile(52, 12 + (rowH - 14) / 2)}
            <text x="88" y="${12 + (rowH - 14) / 2 - 3}" font-size="15.5" font-weight="700" fill="${INK}">${p[0]}</text>
            <text x="88" y="${12 + (rowH - 14) / 2 + 17}" font-size="9.5" font-weight="700" fill="${INK}" opacity="0.38"
              letter-spacing="1.1" style="font-family:${MONO}">${p[1].toUpperCase()}</text>
            ${i % POSTS.length === 0 ? `<g transform="translate(468 ${12 + (rowH - 14) / 2 - 11})">
              <rect width="58" height="22" rx="11" fill="${P.main}"/>
              <text x="29" y="15" text-anchor="middle" font-size="9" font-weight="700" fill="${WHITE}"
                letter-spacing="0.8" style="font-family:${MONO}">NEW</text></g>` : ''}
          </g>`).join('')}
          <animateTransform attributeName="transform" type="translate" values="0,0;0,${-POSTS.length * rowH}"
            dur="${POSTS.length * 3.2}s" repeatCount="indefinite" calcMode="linear"/>
        </g>
      </svg>
      <rect x="2" y="2" width="556" height="296" rx="18" fill="url(#bf-${uid})" pointer-events="none"/>
    </g>
    ${[['350+', 'ARTICLES'], ['25K+', 'SUBSCRIBERS'], ['190+', 'COUNTRIES']].map((s, i) => `
      <g transform="translate(${40 + i * 194} 382)">
        <rect width="180" height="56" rx="14" fill="${P.wash}" stroke="${P.main}" stroke-width="1.5"/>
        <text x="18" y="34" font-size="20" font-weight="700" fill="${P.deep}" style="font-family:${MONO}">${s[0]}</text>
        ${mono(18, 48, s[1], { size: 8.5, op: 0.4 })}
      </g>`).join('')}`;
    return { svg: wrap(inner), pills: pBl('New every week', '350+ articles') };
  },
};

export const topicOrbit = {
  id: 'blogtopics',
  name: 'Topic Picker',
  family: 'Navigation',
  tagline: 'Pick a topic, see what is inside',
  desc: 'Four topic chips — Guides, Destinations, Devices, Deals — cycle as the active one, and the three cards beneath swap to real headlines from that topic with its article count. It answers the question the current hero does not: what is actually in here, and is any of it for me.',
  pros: ['Shows breadth of subject matter, not just three arbitrary posts', 'Doubles as a preview of the blog\'s own navigation', 'Article counts per topic make 350+ credible', 'Clear four-beat rhythm that always resolves'],
  cons: ['Topic names have to match the real taxonomy', 'Swapping three cards at once is a big visual change each beat'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const { P, wrap, dots, bloom, mono, label, MONO } = B;
    const topics = ['Guides', 'Destinations', 'Devices', 'Deals'];
    const inner = `
    ${dots(uid)}
    ${bloom(320, 230, 210, uid)}
    ${mono(40, 46, 'WHAT YOU WILL FIND ON THE BLOG', { size: 10, op: 0.32 })}
    <g transform="translate(40 66)">
      ${topics.map((t, i) => `
        <g data-btopic="${i}" transform="translate(${i * 142} 0)">
          <rect width="132" height="38" rx="19" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5" data-btshell/>
          <text x="66" y="25" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}" opacity="0.55" data-bttext>${t}</text>
        </g>`).join('')}
    </g>
    ${[0, 1, 2].map(i => `
      <g data-bcard="${i}" transform="translate(40 ${128 + i * 88})">
        <rect width="560" height="76" rx="15" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5" data-bcshell/>
        ${globeTile(46, 38)}
        <text x="82" y="34" font-size="16" font-weight="700" fill="${INK}" data-bctitle>—</text>
        <text x="82" y="54" font-size="9.5" font-weight="700" fill="${INK}" opacity="0.38" letter-spacing="1.1"
          style="font-family:${MONO}" data-bcmeta>—</text>
        <g transform="translate(492 26)">
          <rect width="46" height="24" rx="12" fill="${P.wash}"/>
          <text x="23" y="16" text-anchor="middle" font-size="9" font-weight="700" fill="${P.deep}"
            style="font-family:${MONO}" data-bcread>6 min</text>
        </g>
      </g>`).join('')}
    <g transform="translate(40 396)">
      <rect width="560" height="42" rx="14" fill="${INK}"/>
      <text x="20" y="27" font-size="12.5" font-weight="700" fill="${WHITE}" opacity="0.85">
        <tspan data-role="bcount">128</tspan> articles in <tspan data-role="bcat" fill="${P.main}">Guides</tspan>
      </text>
      <text x="540" y="27" text-anchor="end" font-size="11" font-weight="700" fill="${P.main}"
        style="font-family:${MONO}">350+ TOTAL</text>
    </g>`;

    return {
      svg: wrap(inner),
      pills: pBl('New every week', 'Free Access'),
      init(root) {
        const chips = [...root.querySelectorAll('[data-btopic]')];
        const cards = [...root.querySelectorAll('[data-bcard]')];
        if (!chips.length) return null;
        const cnt = root.querySelector('[data-role="bcount"]');
        const cat = root.querySelector('[data-role="bcat"]');
        cards.forEach(c => { c.style.transition = 'opacity .3s ease'; });
        const data = [
          ['Guides', 128, [['Working from Lisbon', '5 min'], ['Your first eSIM, step by step', '6 min'], ['Data plans without the jargon', '4 min']]],
          ['Destinations', 96, [['Tokyo on 5GB', '6 min'], ['Europe by rail, always online', '8 min'], ['Bali on one plan', '4 min']]],
          ['Devices', 84, [['eSIM vs roaming, honestly', '7 min'], ['Which phones support eSIM', '5 min'], ['Dual SIM done properly', '6 min']]],
          ['Deals', 42, [['When data gets cheap', '4 min'], ['Airport wifi is a trap', '3 min'], ['Top-ups without surprises', '5 min']]],
        ];
        let i = 0;
        const tick = () => {
          const d = data[i];
          chips.forEach((c, k) => {
            const on = k === i;
            c.querySelector('[data-btshell]').setAttribute('fill', on ? P.main : WHITE);
            c.querySelector('[data-btshell]').setAttribute('stroke', on ? P.main : LINE);
            const t = c.querySelector('[data-bttext]');
            t.setAttribute('fill', on ? WHITE : INK);
            t.setAttribute('opacity', on ? '1' : '0.55');
          });
          cards.forEach((c, k) => {
            c.style.opacity = '0';
            setTimeout(() => {
              c.querySelector('[data-bctitle]').textContent = d[2][k][0];
              c.querySelector('[data-bcmeta]').textContent = `${d[0].toUpperCase()} · ${d[2][k][1].toUpperCase()}`;
              c.querySelector('[data-bcread]').textContent = d[2][k][1];
              c.querySelector('[data-bcshell]').setAttribute('stroke', k === 0 ? P.main : LINE);
              c.querySelector('[data-bcshell]').setAttribute('stroke-width', k === 0 ? '2' : '1.5');
              c.querySelector('[data-bcshell]').setAttribute('fill', k === 0 ? P.wash : WHITE);
              c.style.opacity = '1';
            }, 180 + k * 90);
          });
          if (cnt) cnt.textContent = String(d[1]);
          if (cat) cat.textContent = d[0];
          i = (i + 1) % data.length;
        };
        tick();
        const id = setInterval(tick, 2800);
        return () => clearInterval(id);
      },
    };
  },
};

export const readingNow = {
  id: 'blogreading',
  name: 'Reading Now',
  family: 'Social proof',
  tagline: 'Other people are already in here',
  desc: 'One article card is foregrounded with a reading-progress bar filling, a live "readers right now" figure, and the next two posts queued behind it. When the bar completes, the next article takes its place. It turns a static list into evidence that the blog is read, which is the only thing that makes a reader trust a blog they have never heard of.',
  pros: ['Social proof is the strongest lever available for content', 'The filling progress bar is a natural, self-resetting loop', 'Foregrounding one post gives the eye a single target', 'Subscriber and reader counts reuse the stats already on the page'],
  cons: ['Live reader counts must be real or the claim is hollow', 'Only one headline is prominent at a time'],
  scores: { story: 4, motion: 5, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const { P, wrap, dots, bloom, mono, label, MONO } = B;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 200, 210, uid)}
    ${mono(40, 46, 'BEING READ RIGHT NOW', { size: 10, op: 0.32 })}
    <!-- queued cards behind -->
    <g transform="translate(64 84)" opacity="0.4">
      <rect width="512" height="60" rx="14" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
      <text x="26" y="36" font-size="14" font-weight="700" fill="${INK}" opacity="0.5"><tspan data-role="bq2">Bali on one plan</tspan></text>
    </g>
    <g transform="translate(52 108)" opacity="0.7">
      <rect width="536" height="60" rx="14" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
      <text x="26" y="36" font-size="15" font-weight="700" fill="${INK}" opacity="0.6"><tspan data-role="bq1">eSIM vs roaming, honestly</tspan></text>
    </g>
    <!-- the foreground card -->
    <g transform="translate(40 146)">
      <rect width="560" height="148" rx="18" fill="${WHITE}" stroke="${P.main}" stroke-width="2.5"/>
      ${globeTile(48, 48, 1.15)}
      <text x="88" y="44" font-size="20" font-weight="700" fill="${INK}"><tspan data-role="bnow">Tokyo on 5GB</tspan></text>
      <text x="88" y="66" font-size="10" font-weight="700" fill="${INK}" opacity="0.4" letter-spacing="1.1"
        style="font-family:${MONO}"><tspan data-role="bmeta">ASIA · 6 MIN READ</tspan></text>
      <line x1="26" y1="92" x2="534" y2="92" stroke="${LINE}" stroke-width="6" stroke-linecap="round"/>
      <line x1="26" y1="92" x2="26" y2="92" stroke="${P.main}" stroke-width="6" stroke-linecap="round" data-bprog/>
      ${mono(26, 122, 'READING PROGRESS', { size: 9, op: 0.35 })}
      <text x="534" y="124" text-anchor="end" font-size="11" font-weight="700" fill="${P.deep}"
        style="font-family:${MONO}"><tspan data-role="bpct">0%</tspan></text>
    </g>
    ${[['READERS RIGHT NOW', 'breaders', '412'], ['SUBSCRIBERS', 'bsubs', '25,140'], ['ARTICLES', 'barts', '350+']].map((m, i) => `
      <g transform="translate(${40 + i * 194} 320)">
        <rect width="180" height="62" rx="15" fill="${i === 0 ? INK : WHITE}" stroke="${i === 0 ? INK : LINE}" stroke-width="1.5"/>
        ${mono(18, 24, m[0], { size: 8.5, fill: i === 0 ? WHITE : INK, op: i === 0 ? 0.5 : 0.4 })}
        <text x="18" y="50" font-size="20" font-weight="700" fill="${i === 0 ? P.main : P.deep}"
          style="font-family:${MONO}"><tspan data-role="${m[1]}">${m[2]}</tspan></text>
      </g>`).join('')}
    ${mono(40, 420, 'EXPERT GUIDES · TRAVEL TIPS · CONNECTIVITY INSIGHTS', { size: 9.5, op: 0.3 })}`;

    return {
      svg: wrap(inner),
      pills: pBl('New every week', 'Free Access'),
      init(root) {
        const prog = root.querySelector('[data-bprog]');
        const pct = root.querySelector('[data-role="bpct"]');
        const now = root.querySelector('[data-role="bnow"]');
        const meta = root.querySelector('[data-role="bmeta"]');
        const q1 = root.querySelector('[data-role="bq1"]');
        const q2 = root.querySelector('[data-role="bq2"]');
        const rd = root.querySelector('[data-role="breaders"]');
        if (!prog) return null;
        prog.style.transition = 'all .12s linear';
        let i = 0, step = 0;
        const tick = () => {
          step++;
          const f = Math.min(1, step / 34);
          prog.setAttribute('x2', String(26 + f * 508));
          if (pct) pct.textContent = `${Math.round(f * 100)}%`;
          if (rd) rd.textContent = String(380 + Math.floor(Math.random() * 70));
          if (step >= 40) {
            step = 0;
            i = (i + 1) % POSTS.length;
            if (now) now.textContent = POSTS[i][0];
            if (meta) meta.textContent = `${POSTS[i][1].toUpperCase()} READ`;
            if (q1) q1.textContent = POSTS[(i + 1) % POSTS.length][0];
            if (q2) q2.textContent = POSTS[(i + 2) % POSTS.length][0];
            prog.setAttribute('x2', '26');
          }
        };
        const id = setInterval(tick, 130);
        return () => clearInterval(id);
      },
    };
  },
};

export const weekly = {
  id: 'blogweekly',
  name: 'Weekly Issue',
  family: 'Newsletter',
  tagline: 'The subscribe box, made visible',
  desc: 'A weekly issue assembles itself: three headlines drop into an envelope-shaped card, the issue number increments, and the subscriber counter climbs past 25,000 as it sends. The page already ends with a newsletter signup — this makes the hero recruit for it from the first screen instead of the last.',
  pros: ['Puts the page\'s real conversion goal in the hero', 'Assembling and sending is a satisfying, self-contained loop', 'Issue numbers make the weekly cadence concrete', 'Subscriber count doubles as social proof'],
  cons: ['Sells the newsletter rather than the articles themselves', 'Envelope imagery is a well-worn device', 'Subscriber figure has to be kept truthful'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const { P, wrap, dots, bloom, mono, label, MONO } = B;
    const inner = `
    ${dots(uid)}
    ${bloom(320, 220, 210, uid)}
    ${mono(40, 46, 'THE WEEKLY ISSUE, ASSEMBLING', { size: 10, op: 0.32 })}
    <!-- incoming headlines -->
    ${[0, 1, 2].map(i => `
      <g data-wline="${i}" transform="translate(40 ${86 + i * 56})" opacity="0">
        <rect width="240" height="44" rx="12" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
        <text x="18" y="27" font-size="12.5" font-weight="700" fill="${INK}" opacity="0.7" data-wtitle>—</text>
      </g>`).join('')}
    <!-- the envelope -->
    <g transform="translate(436 190)">
      <rect x="-118" y="-78" width="236" height="156" rx="16" fill="${WHITE}" stroke="${INK}" stroke-width="2.5"/>
      <path d="M -118 -62 L 0 18 L 118 -62" fill="none" stroke="${INK}" stroke-width="2.5" opacity="0.35"/>
      <g transform="translate(0 -40)">
        <rect x="-64" y="-16" width="128" height="30" rx="15" fill="${P.main}"/>
        <text y="4" text-anchor="middle" font-size="11" font-weight="700" fill="${WHITE}" letter-spacing="0.8"
          style="font-family:${MONO}">ISSUE #<tspan data-role="wissue">148</tspan></text>
      </g>
      <g data-wstack transform="translate(0 26)">
        ${[0, 1, 2].map(i => `<rect data-wslot="${i}" x="${-86 + i * 4}" y="${-12 + i * 10}" width="172" height="14" rx="5"
          fill="${P.main}" opacity="0"/>`).join('')}
      </g>
      ${mono(0, 64, 'DELIVERED EVERY THURSDAY', { size: 9, anchor: 'middle', op: 0.35 })}
    </g>
    <!-- sent flash -->
    <g data-wsent opacity="0" transform="translate(436 190)">
      <circle r="96" fill="none" stroke="${P.main}" stroke-width="3"/>
    </g>
    <g transform="translate(40 300)">
      <rect width="240" height="62" rx="15" fill="${INK}"/>
      ${mono(18, 24, 'SUBSCRIBERS', { size: 8.5, fill: WHITE, op: 0.5 })}
      <text x="18" y="50" font-size="21" font-weight="700" fill="${P.main}" style="font-family:${MONO}"><tspan data-role="wsubs">25,140</tspan></text>
    </g>
    <g transform="translate(40 378)">
      <rect width="240" height="56" rx="15" fill="${P.main}"/>
      <text x="120" y="35" text-anchor="middle" font-size="13.5" font-weight="700" fill="${WHITE}">Subscribe free →</text>
    </g>
    ${mono(300, 412, 'NO SPAM · ONE EMAIL A WEEK', { size: 9.5, op: 0.3 })}`;

    return {
      svg: wrap(inner),
      pills: pBl('New every week', '25K+ subscribers'),
      init(root) {
        const lines = [...root.querySelectorAll('[data-wline]')];
        const slots = [...root.querySelectorAll('[data-wslot]')];
        const sent = root.querySelector('[data-wsent]');
        const issue = root.querySelector('[data-role="wissue"]');
        const subs = root.querySelector('[data-role="wsubs"]');
        if (!lines.length) return null;
        lines.forEach(l => { l.style.transition = 'opacity .4s ease, transform .6s cubic-bezier(.2,.7,.3,1)'; });
        slots.forEach(s => { s.style.transition = 'opacity .4s ease'; });
        let n = 148, sub = 25140;
        const timers = [];
        const cycle = () => {
          lines.forEach((l, i) => { l.setAttribute('transform', `translate(40 ${86 + i * 56})`); l.style.opacity = '0'; });
          slots.forEach(s => s.setAttribute('opacity', '0'));
          if (sent) sent.setAttribute('opacity', '0');
          const picks = [0, 1, 2].map(k => POSTS[(n + k) % POSTS.length][0]);
          [0, 1, 2].forEach(i => {
            timers.push(setTimeout(() => {
              lines[i].querySelector('[data-wtitle]').textContent = picks[i];
              lines[i].style.opacity = '1';
            }, 300 + i * 500));
            timers.push(setTimeout(() => {
              lines[i].style.opacity = '0';
              slots[i].setAttribute('opacity', '0.85');
            }, 1100 + i * 500));
          });
          timers.push(setTimeout(() => {
            if (sent) {
              sent.setAttribute('opacity', '0.8');
              let r = 60;
              const a = setInterval(() => {
                r += 5; sent.querySelector('circle').setAttribute('r', String(r));
                sent.setAttribute('opacity', String(Math.max(0, 0.8 - (r - 60) / 70)));
                if (r > 128) { clearInterval(a); sent.setAttribute('opacity', '0'); }
              }, 40);
              timers.push(a);
            }
            n++; sub += 12 + Math.floor(Math.random() * 20);
            if (issue) issue.textContent = String(n);
            if (subs) subs.textContent = sub.toLocaleString('en-US');
          }, 2900));
          timers.push(setTimeout(cycle, 4400));
        };
        cycle();
        return () => timers.forEach(t => { clearTimeout(t); clearInterval(t); });
      },
    };
  },
};


export const destShuffle = {
  id: 'blogdest',
  name: 'Destination Shuffle',
  family: 'Product tie-in',
  tagline: 'Every article is somewhere you can buy a plan for',
  desc: 'A dotted mini-map sits beside the article list. As each post takes focus, a pin drops on its destination and a small plan chip appears — "Japan · 5 GB · from $6" — with a link straight to the country page. It turns the blog hero from a content shelf into the top of the funnel it is actually supposed to be.',
  pros: ['Only option that connects reading to buying', 'The map makes the blog feel like part of the product, not a side project',
    'Plan chips reuse real pricing, so the panel does commercial work',
    'Pin drops give a crisp, satisfying beat per article'],
  cons: ['Not every article maps to a destination', 'Two things moving at once — map and list — needs careful pacing',
    'Prices shown have to stay current'],
  scores: { story: 5, motion: 4, perf: 4, mobile: 4, brand: 5, ease: 3 },
  build: (uid) => {
    const { P, wrap, dots, bloom, mono, label, MONO } = B;
    const spots = [
      { n: 'Tokyo on 5GB', c: 'Japan', x: 470, y: 176, plan: '5 GB · from $6' },
      { n: 'Europe by rail, always online', c: 'Europe', x: 356, y: 158, plan: '10 GB · from $9' },
      { n: 'Working from Lisbon', c: 'Portugal', x: 322, y: 186, plan: '15 GB · from $11' },
      { n: 'Bali on one plan', c: 'Indonesia', x: 456, y: 244, plan: '3 GB · from $5' },
    ];
    const inner = `
    ${dots(uid)}
    ${bloom(400, 210, 220, uid)}
    ${mono(40, 46, 'READ IT, THEN GO THERE', { size: 10, op: 0.32 })}
    <!-- mini map -->
    <g>
      ${Array.from({ length: 11 }, (_, r) => Array.from({ length: 16 }, (_, c) => {
        const x = 286 + c * 21, y = 84 + r * 19;
        const inside = Math.abs(Math.sin(c * 0.8 + r * 0.45)) > 0.44;
        return inside ? `<circle cx="${x}" cy="${y}" r="2.5" fill="${P.main}" opacity="0.26"/>` : '';
      }).join('')).join('')}
    </g>
    ${spots.map((s, i) => `
      <g data-dpin="${i}" opacity="0">
        <path d="M ${s.x} ${s.y} c -11 -14 -18 -21 -18 -30 a 18 18 0 0 1 36 0 c 0 9 -7 16 -18 30 z"
          fill="${P.main}" stroke="${INK}" stroke-width="2"/>
        <circle cx="${s.x}" cy="${s.y - 30}" r="6" fill="${WHITE}"/>
        <g transform="translate(${s.x + 16} ${s.y - 46})">
          <rect width="150" height="42" rx="11" fill="${INK}"/>
          <text x="14" y="18" font-size="11" font-weight="700" fill="${WHITE}">${s.c}</text>
          <text x="14" y="33" font-size="9" font-weight="700" fill="${P.main}"
            style="font-family:${MONO}">${s.plan}</text>
        </g>
      </g>`).join('')}
    <!-- article list -->
    ${spots.map((s, i) => `
      <g data-drow="${i}" transform="translate(40 ${88 + i * 68})">
        <rect width="228" height="58" rx="13" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5" data-dshell/>
        ${globeTile(32, 29, 0.78)}
        <text x="60" y="26" font-size="12" font-weight="700" fill="${INK}" opacity="0.72" data-dt1>${s.n.slice(0, 22)}</text>
        <text x="60" y="43" font-size="9" font-weight="700" fill="${INK}" opacity="0.38" letter-spacing="1"
          style="font-family:${MONO}" data-dt2>${s.c.toUpperCase()}</text>
      </g>`).join('')}
    <g transform="translate(40 372)">
      <rect width="228" height="60" rx="15" fill="${P.main}"/>
      <text x="114" y="27" text-anchor="middle" font-size="12.5" font-weight="700" fill="${WHITE}">Buy a plan for</text>
      <text x="114" y="46" text-anchor="middle" font-size="13.5" font-weight="700" fill="${WHITE}"><tspan data-role="dctry">Japan</tspan> →</text>
    </g>
    ${mono(290, 394, '350+ ARTICLES · 190+ COUNTRIES COVERED', { size: 9.5, op: 0.3 })}
    ${mono(290, 414, 'EVERY GUIDE HAS A PLAN BEHIND IT', { size: 9.5, op: 0.3 })}`;

    return {
      svg: wrap(inner),
      pills: pBl('New every week', 'Free Access'),
      init(root) {
        const pins = [...root.querySelectorAll('[data-dpin]')];
        const rows = [...root.querySelectorAll('[data-drow]')];
        const ctry = root.querySelector('[data-role="dctry"]');
        if (!pins.length) return null;
        const names = ['Japan', 'Europe', 'Portugal', 'Indonesia'];
        pins.forEach(p => { p.style.transition = 'opacity .45s ease'; });
        let i = 0;
        const tick = () => {
          pins.forEach((p, k) => p.setAttribute('opacity', k === i ? '1' : '0'));
          rows.forEach((r, k) => {
            const on = k === i;
            r.querySelector('[data-dshell]').setAttribute('stroke', on ? P.main : LINE);
            r.querySelector('[data-dshell]').setAttribute('stroke-width', on ? '2.5' : '1.5');
            r.querySelector('[data-dshell]').setAttribute('fill', on ? P.wash : WHITE);
            r.querySelector('[data-dt1]').setAttribute('opacity', on ? '1' : '0.72');
            r.querySelector('[data-dt2]').setAttribute('fill', on ? P.deep : INK);
          });
          if (ctry) ctry.textContent = names[i];
          i = (i + 1) % pins.length;
        };
        tick();
        const id = setInterval(tick, 2100);
        return () => clearInterval(id);
      },
    };
  },
};

/* ══ BLOG · 6–9 ═════════════════════════════════════════════════════ */

export const blgAnswers = {
  id: 'blg-answers',
  name: 'Questions, Answered',
  family: 'Utility',
  tagline: 'The searches this blog exists to resolve',
  desc:
    'Nobody reads a travel blog for pleasure; they arrive with a question. Four real search queries — ' +
    'does my phone support eSIM, can I keep my number, what happens on a cruise, is it legal in ' +
    'China — appear and resolve into the article that answers each. It frames the blog as a utility ' +
    'rather than a content marketing exercise.',
  pros: [
    'Matches the actual intent that brings people to the page',
    'Each pairing demonstrates the blog\u2019s usefulness immediately',
    'Doubles as an SEO signal about what the section covers',
  ],
  cons: ['Needs the articles to genuinely exist', 'A search box is a very familiar device'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid) => {
    const dur = 13;
    const qs = [
      ['does my phone support esim', 'Every eSIM-compatible phone, listed'],
      ['can i keep my number abroad', 'Keeping your number while you travel'],
      ['esim on a cruise ship', 'What actually works at sea'],
      ['is an esim legal in china', 'China, Turkey and the other exceptions'],
    ];
    const B = mk('orange');
    const inner = `
    ${B.dots(uid)}
    ${B.bloom(320, 200, 250, uid)}
    ${B.mono(72, 54, 'WHAT PEOPLE ACTUALLY SEARCH FOR', { size: 9.5, op: 0.45 })}
    ${qs.map(([q, a], i) => {
      const on = i / 4, off = (i + 1) / 4;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0"
          keyTimes="0;${on.toFixed(4)};${(on + 0.008).toFixed(4)};${off.toFixed(4)};${Math.min(off + 0.008, 1).toFixed(4)};1"
          dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
        ${B.card(72, 100, 496, 64, { r: 16, fill: WHITE, stroke: LINE, sw: 2 })}
        <g transform="translate(104 132)" fill="none" stroke="${GRAY}" stroke-width="2.2" stroke-linecap="round">
          <circle r="7"/><path d="M 5.5 5.5 L 11 11"/>
        </g>
        ${B.label(130, 138, q, { size: 15, op: 0.75 })}
        ${B.card(72, 186, 496, 132, { r: 16, fill: B.P.wash, stroke: B.P.main, sw: 2 })}
        ${B.mono(100, 216, 'FROM THE BLOG', { size: 8.5, op: 0.5, fill: B.P.deep })}
        ${B.label(100, 258, a, { size: 20, fill: INK })}
        ${B.mono(100, 292, '6 MIN READ \u00b7 UPDATED THIS MONTH', { size: 8.5, op: 0.4 })}
      </g>`;
    }).join('')}
    ${[0, 1, 2, 3].map((i) => `
      <rect x="${72 + i * 126}" y="352" width="114" height="5" rx="2.5" fill="${LINE}"/>
      <rect x="${72 + i * 126}" y="352" width="114" height="5" rx="2.5" fill="${B.P.main}" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0"
          keyTimes="0;${(i / 4).toFixed(4)};${(i / 4 + 0.008).toFixed(4)};${((i + 1) / 4).toFixed(4)};${Math.min((i + 1) / 4 + 0.008, 1).toFixed(4)};1"
          dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
      </rect>`).join('')}
    ${B.mono(72, 402, 'FORTY-ONE GUIDES \u00b7 EACH ONE ANSWERING A REAL QUESTION', { size: 9, op: 0.35 })}`;
    return { svg: B.wrap(inner), pills: pBl('Answers, not articles') };
  },
};

export const blgKeptCurrent = {
  id: 'blg-current',
  name: 'Kept Current',
  family: 'Trust',
  tagline: 'Rewritten when the facts change, and dated',
  desc:
    'Travel and device information rots, and every competitor blog is full of three-year-old posts ' +
    'that are now wrong. Four guides show their last-revised date and what changed — a new iPhone ' +
    'added, a carrier dropped, a rule updated. Maintenance is the only real differentiator a blog in ' +
    'this category has.',
  pros: [
    'Freshness is the one quality readers can verify themselves',
    'Naming what changed is far stronger than a date alone',
    'Sets an editorial standard that is hard for a content farm to match',
  ],
  cons: ['Commits us to actually maintaining every guide', 'Visible dates expose neglect immediately'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 11;
    const B = mk('orange');
    const posts = [
      ['Every eSIM-compatible phone', '4 days ago', 'Added the iPhone 18 range'],
      ['Keeping your number abroad', '2 weeks ago', 'Rewrote the EU section'],
      ['China, Turkey and the exceptions', '3 weeks ago', 'Turkey rules changed in June'],
      ['What works at sea', 'last month', 'Two cruise lines added'],
    ];
    const inner = `
    ${B.dots(uid)}
    ${B.bloom(320, 210, 250, uid)}
    ${B.mono(72, 54, 'LAST REVISED \u00b7 AND WHAT CHANGED', { size: 9.5, op: 0.45 })}
    ${posts.map(([nm, when, what], i) => {
      const y = 80 + i * 82;
      const on = 0.06 + i * 0.15;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.06).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${B.card(72, y, 496, 68, { r: 13, fill: WHITE, stroke: LINE })}
        <rect x="72" y="${y}" width="4" height="68" rx="2" fill="${B.P.main}"/>
        ${B.label(100, y + 30, nm, { size: 15 })}
        ${B.mono(100, y + 52, what, { size: 9, op: 0.42 })}
        ${B.mono(544, y + 40, when, { size: 9.5, anchor: 'end', op: 0.55, fill: B.P.deep })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.74;0.82;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${B.card(72, 408, 496, 42, { r: 11, fill: B.P.wash, stroke: B.P.main, sw: 1.8 })}
      ${B.label(96, 436, 'Nothing here is older than three months', { size: 13.5, fill: B.P.deep })}
    </g>`;
    return { svg: B.wrap(inner), pills: pBl('Kept current') };
  },
};

export const blgWhoWrote = {
  id: 'blg-who',
  name: 'Who Wrote It',
  family: 'Trust',
  tagline: 'A named person who has actually been there',
  desc:
    'Travel content is drowning in anonymous AI copy, and a byline is now a differentiator. Each ' +
    'guide carries an author, where they were when they tested it, and which device they used. ' +
    'Provenance is the cheapest possible answer to a reader wondering whether a human checked any of ' +
    'this.',
  pros: [
    'Directly counters the anonymous-content problem readers now assume',
    'Device and location tested is a detail that signals real work',
    'Makes the editorial team an asset rather than a cost',
  ],
  cons: ['Requires real named authors on the team', 'Personal bylines create a maintenance burden'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 11;
    const B = mk('orange');
    const items = [
      ['Marta S.', 'Tested in Tokyo', 'iPhone 17 Pro \u00b7 NTT Docomo'],
      ['Ahmed R.', 'Tested in Istanbul', 'Pixel 10 \u00b7 Turkcell'],
      ['Ines F.', 'Tested at sea', 'Galaxy S26 \u00b7 maritime roaming'],
    ];
    const inner = `
    ${B.dots(uid)}
    ${B.bloom(320, 210, 250, uid)}
    ${B.mono(72, 54, 'WRITTEN BY PEOPLE WHO WERE THERE', { size: 9.5, op: 0.45 })}
    ${items.map(([nm, where, kit], i) => {
      const y = 82 + i * 108;
      const on = 0.06 + i * 0.2;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.07).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${B.card(72, y, 496, 92, { r: 14, fill: WHITE, stroke: LINE })}
        <circle cx="122" cy="${y + 46}" r="24" fill="${B.P.wash}" stroke="${B.P.main}" stroke-width="2"/>
        <text x="122" y="${y + 52}" font-size="15" font-weight="800" text-anchor="middle" fill="${B.P.deep}">${nm.slice(0, 1)}</text>
        ${B.label(164, y + 38, nm, { size: 16 })}
        ${B.mono(164, y + 60, where.toUpperCase(), { size: 9, op: 0.5, fill: B.P.deep })}
        ${B.mono(544, y + 52, kit, { size: 9, anchor: 'end', op: 0.42 })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.74;0.82;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${B.card(72, 396, 496, 48, { r: 12, fill: B.P.wash, stroke: B.P.main, sw: 2 })}
      ${B.label(96, 426, 'Every guide tested on a real device, in the country', { size: 13.5, fill: B.P.deep })}
    </g>`;
    return { svg: B.wrap(inner), pills: pBl('Named authors') };
  },
};

export const blgOneGuide = {
  id: 'blg-oneguide',
  name: 'One Guide, Opened',
  family: 'Editorial',
  tagline: 'The inside of an article, not a grid of cards',
  desc:
    'Every blog hero shows a grid of cards, which tells the reader nothing about the writing. This ' +
    'opens a single guide instead — headline, standfirst, a device-compatibility table and a caveat ' +
    'box — so the reader can judge the quality before clicking. Showing the work is riskier and much ' +
    'more convincing.',
  pros: [
    'Lets the writing sell itself, which a card grid cannot',
    'The caveat box signals honesty rather than promotion',
    'Distinct from every competitor blog hero',
  ],
  cons: ['Only as good as the article chosen to feature', 'Dense at a hero scale'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 4, brand: 5, ease: 4 },
  build: (uid) => {
    const dur = 11;
    const B = mk('orange');
    const rows = [
      ['iPhone 12 and later', 'Yes', true],
      ['Pixel 4 and later', 'Yes', true],
      ['Galaxy S20 and later', 'Yes', true],
      ['Most phones bought in Japan', 'Often locked', false],
    ];
    const inner = `
    ${B.dots(uid)}
    ${B.bloom(320, 200, 250, uid)}
    ${B.mono(72, 50, 'GUIDE \u00b7 UPDATED 4 DAYS AGO \u00b7 6 MIN', { size: 9.5, op: 0.45 })}
    ${B.label(72, 92, 'Does your phone support eSIM?', { size: 25 })}
    ${B.label(72, 122, 'The short answer is probably. The long answer has four exceptions.', { size: 13, op: 0.55 })}
    ${rows.map(([nm, ans, ok], i) => {
      const y = 146 + i * 54;
      const on = 0.08 + i * 0.13;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${B.card(72, y, 496, 44, { r: 10, fill: i % 2 ? '#FFFCFA' : WHITE, stroke: LINE })}
        ${B.label(96, y + 28, nm, { size: 13 })}
        ${ok
          ? `<circle cx="474" cy="${y + 22}" r="10" fill="${GREEN_SOFT}"/>
             <path d="M 469 ${y + 22} l 4 4 l 7 -8" fill="none" stroke="${GREEN_TEXT}" stroke-width="2.2" stroke-linecap="round"/>`
          : `<circle cx="474" cy="${y + 22}" r="10" fill="#FFF4E5"/>
             <path d="M 474 ${y + 16} v 7 M 474 ${y + 27} v 1" stroke="${AMBER}" stroke-width="2.2" stroke-linecap="round"/>`}
        ${B.mono(544, y + 26, ans, { size: 9.5, anchor: 'end', op: 0.5, fill: ok ? GREEN_TEXT : AMBER })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${B.card(72, 366, 496, 76, { r: 12, fill: '#FFF4E5', stroke: AMBER, sw: 1.8 })}
      ${B.mono(96, 394, 'ONE CAVEAT', { size: 8.5, op: 0.55, fill: '#B45309' })}
      ${B.label(96, 424, 'A carrier-locked phone will refuse the profile. Check first.', { size: 13 })}
    </g>`;
    return { svg: B.wrap(inner), pills: pBl('Read the actual guide') };
  },
};

/* ── registry ── */

export const blgWhatItIsNot = {
  id: 'blg-notfor',
  name: 'What We Will Not Write',
  family: 'Editorial',
  tagline: 'The editorial line, stated out loud',
  desc:
    'The fastest way to be trusted in a category full of affiliate spam is to publish what you refuse ' +
    'to do. Four rules appear — no affiliate links, no sponsored posts, no AI-written guides, and we ' +
    'will tell you when a competitor is the better choice — with the last one shown as an actual ' +
    'published article.',
  pros: [
    'A refusal list is rare and reads as genuine confidence',
    'Recommending a competitor is the most credible line available',
    'Positions the blog against exactly the content it competes with',
  ],
  cons: ['Every rule is a commitment marketing must keep', 'Naming a competitor favourably is a real decision'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 3 },
  build: (uid) => {
    const dur = 11;
    const B = mk('orange');
    const rules = [
      ['No affiliate links', 'We are not paid per click'],
      ['No sponsored posts', 'Nobody buys a paragraph'],
      ['No AI-written guides', 'A named person tests every one'],
      ['We name a better option', 'Even when it is not ours'],
    ];
    const inner = `
    ${B.dots(uid)}
    ${B.bloom(320, 200, 250, uid)}
    ${B.mono(72, 54, 'THE EDITORIAL LINE', { size: 9.5, op: 0.45 })}
    ${rules.map(([nm, note], i) => {
      const y = 78 + i * 68;
      const on = 0.06 + i * 0.12;
      return `<g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on.toFixed(3)};${(on + 0.05).toFixed(3)};1"
          dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
        ${B.card(72, y, 496, 56, { r: 12, fill: WHITE, stroke: LINE })}
        <circle cx="102" cy="${y + 28}" r="11" fill="${B.P.wash}"/>
        <path d="M 96 ${y + 28} l 4.5 4.5 l 8 -9" fill="none" stroke="${B.P.main}" stroke-width="2.4" stroke-linecap="round"/>
        ${B.label(130, y + 26, nm, { size: 14 })}
        ${B.mono(130, y + 44, note, { size: 9, op: 0.42 })}
      </g>`;
    }).join('')}
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.66;0.74;1" dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
      ${B.card(72, 352, 496, 92, { r: 14, fill: B.P.wash, stroke: B.P.main, sw: 2 })}
      ${B.mono(96, 380, 'PUBLISHED LAST MONTH', { size: 8.5, op: 0.55, fill: B.P.deep })}
      ${B.label(96, 412, 'When a local SIM is still the better buy', { size: 17 })}
      ${B.mono(96, 434, 'THREE COUNTRIES WHERE WE ARE NOT THE RIGHT ANSWER', { size: 8.5, op: 0.4 })}
    </g>`;
    return { svg: B.wrap(inner), pills: pBl('No affiliate links') };
  },
};

/* ── registry ── */
export const BLOG_VARIANTS = [blogCurrent, feedLive, topicOrbit, readingNow, destShuffle, weekly, blgAnswers, blgKeptCurrent, blgWhoWrote, blgOneGuide,
  blgWhatItIsNot];
