/* Generic review board: a replica of the live section, a swappable animation
   stage, per-option notes, a score matrix and a live compare grid.
   Accent-aware, so each board matches its page's palette.               */

import { CRITERIA } from './registry.js';

const pillsHtml = (pills) => (pills || []).map(p => {
  const pos = Object.entries(p.pos).map(([k, v]) => `${k}:${v}`).join(';');
  return `<div class="pill-slot" style="${pos}"><div class="pill ${p.tone}">${p.html}</div></div>`;
}).join('');

const total = v => CRITERIA.reduce((s, c) => s + (v.scores?.[c.key] || 0), 0);
const bar = n => `<span class="score acc">${[1, 2, 3, 4, 5].map(k => `<i class="${k <= n ? 'f' : ''}"></i>`).join('')}</span>`;

export function buildBoard(root, cfg) {
  const {
    kicker, heading, headingAccent, lead, bullets, variants, thinking, pick,
    keptIdentical, stageTone, chosen, compareTitle, sectionTone, accent, embed,
  } = cfg;
  const boxed = sectionTone === 'accentBox';
  const A = accent || { main: '#FF5314', deep: '#E23D00', wash: '#FFF7F3' };

  root.classList.add('board');
  root.style.setProperty('--acc', A.main);
  root.style.setProperty('--acc-deep', A.deep);
  root.style.setProperty('--acc-wash', A.wash);

  /* real embed box, measured off the live hub. Every option in the board is
     drawn to exactly this ratio so it can be dropped in without re-cropping. */
  const E = embed || { w: 640, h: 460, layout: 'split' };
  root.style.setProperty('--bd-ar', `${E.w}/${E.h}`);
  if (E.layout === 'wide') root.classList.add('bd-lay-wide');
  if (E.layout === 'small') root.classList.add('bd-lay-small');

  root.innerHTML = `
  <section class="bd-hero">
    <div class="bd-wrap">
      <div class="mb-7 flex flex-wrap items-center gap-3">
        <span class="bd-eyebrow">Animation review</span>
        <span class="bd-size-note" title="Measured on the live page at a 1440px viewport">Embed <b>${E.w}×${E.h}</b></span>
        <nav data-tabs class="flex flex-wrap items-center gap-1.5"></nav>
      </div>
      <div class="${boxed ? 'bd-box' : ''}">
        <div class="bd-split grid gap-10 lg:grid-cols-2 lg:gap-14 items-center">
          <div class="bd-copy">
            <div class="bd-kicker${boxed ? ' on-box' : ''}">${kicker}</div>
            <h2 class="bd-h2${boxed ? ' on-box' : ''}">${heading} <span>${headingAccent}</span></h2>
            <p class="bd-lead${boxed ? ' on-box' : ''}">${lead}</p>
            <div class="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2 max-w-xl">
              ${bullets.map(b => `
                <div class="flex gap-3">
                  <span class="bd-tick${boxed ? ' on-box' : ''}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  <span class="bd-bullet${boxed ? ' on-box' : ''}">${b}</span>
                </div>`).join('')}
            </div>
          </div>
          <div data-stage class="bd-stage${stageTone ? ' tone-' + stageTone : ''}">
            <div data-stage-svg></div>
            <div data-stage-pills></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="bd-wrap py-12">
    <div class="grid gap-8 lg:grid-cols-[1fr_320px] items-start">
      <div>
        <div data-kicker class="bd-eyebrow"></div>
        <h3 data-title class="mt-2 text-[28px] font-bold"></h3>
        <p data-desc class="mt-4 max-w-2xl text-[17px] leading-relaxed text-black/65"></p>
        <div class="mt-7 grid gap-6 sm:grid-cols-2 max-w-2xl">
          <div>
            <div class="bd-eyebrow">Why it works</div>
            <ul data-pros class="mt-3 space-y-2 text-[14.5px] leading-relaxed text-black/70"></ul>
          </div>
          <div>
            <div class="text-[12px] font-bold uppercase tracking-[0.14em] text-black/40">What it costs you</div>
            <ul data-cons class="mt-3 space-y-2 text-[14.5px] leading-relaxed text-black/70"></ul>
          </div>
        </div>
      </div>
      <div class="bd-aside">
        <div class="text-[12px] font-bold uppercase tracking-[0.14em] text-black/45">Kept identical</div>
        <ul class="mt-3 space-y-2 text-[14px] text-black/70">
          ${keptIdentical.map(k => `<li>· ${k}</li>`).join('')}
        </ul>
      </div>
    </div>
  </section>

  <section class="border-y border-black/10 bg-[#0B0B0F] py-16 text-white">
    <div class="bd-wrap">
      <div class="grid gap-12 lg:grid-cols-[400px_1fr] items-start">
        <div>
          <div class="bd-eyebrow on-dark">The thinking</div>
          <h3 class="mt-3 text-[28px] font-bold leading-tight">${thinking.title}</h3>
          <p class="mt-4 text-[16.5px] leading-relaxed text-white/60">${thinking.lead}</p>
        </div>
        <div class="grid gap-5 sm:grid-cols-3">
          ${thinking.jobs.map((j, i) => `
            <div class="rounded-2xl border border-white/12 bg-white/[0.04] p-5">
              <div class="text-[26px] font-bold" style="color:var(--acc)">0${i + 1}</div>
              <div class="mt-2 text-[15px] font-bold">${j.t}</div>
              <p class="mt-2 text-[14px] leading-relaxed text-white/55">${j.d}</p>
            </div>`).join('')}
        </div>
      </div>
      <div data-matrix class="matrix acc mt-12"></div>
      <p class="mt-4 text-[13px] text-white/40">Scores are my judgement, not measurements — they exist to make the trade-offs arguable. Hover a column header for its definition.</p>
      <div class="mt-10 grid gap-6 lg:grid-cols-3">
        ${pick.map((p, i) => `
          <div class="rounded-2xl p-6 ${i === 0 ? 'bd-pick' : 'border border-white/12'}">
            <div class="text-[12px] font-bold uppercase tracking-[0.14em]" style="color:${i === 0 ? 'var(--acc)' : 'rgba(255,255,255,.45)'}">${p.k}</div>
            ${p.h ? `<div class="mt-2 text-[19px] font-bold">${p.h}</div>` : ''}
            <p class="mt-3 text-[14.5px] leading-relaxed text-white/65">${p.d}</p>
          </div>`).join('')}
      </div>
      <p class="mt-5 text-[13px] leading-relaxed text-white/40">Note: this recommendation was written when the board held ten options. Options 11&ndash;15 were added afterwards and have not been weighed against it &mdash; read them on their own merits.</p>
    </div>
  </section>

  <section class="bd-compare">
    <div class="bd-wrap">
      <h3 class="text-[28px] font-bold">${compareTitle || `All ${variants.length}, side by side`}</h3>
      <p class="mt-3 max-w-2xl text-[17px] leading-relaxed text-black/60">Every tile runs live at the same time. Click any tile — or any row in the score table — to load it into the section above.</p>
      <div data-grid class="mt-10 grid gap-6 sm:grid-cols-2"></div>
    </div>
  </section>`;

  const tabsEl = root.querySelector('[data-tabs]');
  const stage = root.querySelector('[data-stage]');
  const stageSvg = root.querySelector('[data-stage-svg]');
  const stagePills = root.querySelector('[data-stage-pills]');
  const grid = root.querySelector('[data-grid]');
  const matrix = root.querySelector('[data-matrix]');
  const kickerEl = root.querySelector('[data-kicker]');
  const titleEl = root.querySelector('[data-title]');
  const descEl = root.querySelector('[data-desc]');
  const prosEl = root.querySelector('[data-pros]');
  const consEl = root.querySelector('[data-cons]');

  let cleanup = null;

  function mount(i) {
    if (cleanup) { cleanup(); cleanup = null; }
    const v = variants[i];
    const built = v.build(`${cfg.id}-stage-${v.id}`);
    stageSvg.innerHTML = built.svg;
    stagePills.innerHTML = pillsHtml(built.pills);
    if (built.init) cleanup = built.init(stage);

    kickerEl.textContent = `${i === 0 ? 'Live today' : 'Option ' + i} · ${v.family} · ${v.tagline}`;
    titleEl.textContent = v.name;
    descEl.textContent = v.desc;
    prosEl.innerHTML = (v.pros || []).map(t => `<li class="flex gap-2"><span style="color:var(--acc)">+</span><span>${t}</span></li>`).join('');
    consEl.innerHTML = (v.cons || []).map(t => `<li class="flex gap-2"><span class="text-black/35">−</span><span>${t}</span></li>`).join('');

    [...tabsEl.children].forEach((b, k) => b.classList.toggle('active', k === i));
    [...grid.children].forEach((t, k) => t.classList.toggle('active', k === i));
    [...matrix.querySelectorAll('[data-mrow]')].forEach((r, k) => r.classList.toggle('on', k === i));
  }

  variants.forEach((v, i) => {
    const b = document.createElement('button');
    b.className = 'tab acc' + (chosen === i ? ' picked' : '');
    b.textContent = (i === 0 ? 'Current' : `${i}. ${v.name}`) + (chosen === i ? '  ✓' : '');
    b.addEventListener('click', () => mount(i));
    tabsEl.appendChild(b);
  });

  variants.forEach((v, i) => {
    const built = v.build(`${cfg.id}-tile-${v.id}`);
    const t = document.createElement('div');
    t.className = 'tile acc' + (chosen === i ? ' picked' : '');
    t.innerHTML = `
      <div class="frame${stageTone ? ' tone-' + stageTone : ''}">${built.svg}</div>
      <div class="p-5 border-t border-black/10">
        <div class="flex flex-wrap items-center gap-2">
          <span class="bd-chip">${i === 0 ? 'LIVE TODAY' : 'OPTION ' + i}</span>
          <span class="text-[11px] font-bold uppercase tracking-wider text-black/35">${v.family}</span>
          ${chosen === i ? '<span class="badge-picked">CHOSEN</span>' : ''}
        </div>
        <div class="mt-2.5 text-[17px] font-bold">${v.name}</div>
        <div class="text-[13px] font-semibold text-black/45">${v.tagline}</div>
        <p class="mt-2.5 text-[13.5px] leading-relaxed text-black/60">${v.desc}</p>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-[12.5px] font-bold" style="color:var(--acc-deep)">Load above →</span>
          <span class="text-[12px] font-semibold text-black/40">${total(v)}/30</span>
        </div>
      </div>`;
    t.addEventListener('click', () => {
      mount(i);
      stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    grid.appendChild(t);
    if (built.init) built.init(t);
  });

  matrix.innerHTML = `
    <div class="mrow head">
      <div>Option</div>
      ${CRITERIA.map(c => `<div title="${c.note}">${c.label}</div>`).join('')}
      <div class="text-right">Total</div>
    </div>
    ${variants.map((v, i) => `
      <button class="mrow${chosen === i ? ' picked' : ''}" data-mrow="${i}">
        <div class="name"><span class="idx">${i === 0 ? '—' : i}</span>${v.name}</div>
        ${CRITERIA.map(c => `<div>${bar(v.scores?.[c.key] || 0)}</div>`).join('')}
        <div class="text-right font-bold">${total(v)}</div>
      </button>`).join('')}`;
  [...matrix.querySelectorAll('[data-mrow]')].forEach(r =>
    r.addEventListener('click', () => {
      mount(+r.dataset.mrow);
      stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }));

  mount(typeof chosen === 'number' ? chosen : 1);
}
