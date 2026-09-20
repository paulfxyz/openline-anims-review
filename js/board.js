/* Generic review board: replica of a live section, an animation stage you can
   swap, per-option notes, a score matrix and a live compare grid.
   Used for both /global-esim sections. The tier-1 hero keeps its own layout. */

import { CRITERIA } from './registry.js';

const pillsHtml = (pills) => pills.map(p => {
  const pos = Object.entries(p.pos).map(([k, v]) => `${k}:${v}`).join(';');
  return `<div class="pill-slot" style="${pos}"><div class="pill ${p.tone}">${p.html}</div></div>`;
}).join('');

const total = v => CRITERIA.reduce((s, c) => s + (v.scores?.[c.key] || 0), 0);
const bar = n => `<span class="score o">${[1, 2, 3, 4, 5].map(k => `<i class="${k <= n ? 'f' : ''}"></i>`).join('')}</span>`;

export function buildBoard(root, cfg) {
  const { kicker, heading, headingAccent, lead, bullets, variants, thinking, pick, keptIdentical,
          stageTone, chosen, compareTitle, sectionTone } = cfg;
  const boxed = sectionTone === 'orangeBox';

  root.innerHTML = `
  <section class="border-b border-black/10 bg-gradient-to-b from-[#FFF7F3] to-white py-14 md:py-20">
    <div class="mx-auto max-w-7xl px-4 md:px-8">
      <div class="mb-8 flex flex-wrap items-center gap-3">
        <span class="text-[12px] font-bold uppercase tracking-[0.14em] text-[#E23D00]">Animation review</span>
        <nav data-tabs class="flex flex-wrap items-center gap-1.5"></nav>
      </div>
      <div class="${boxed ? 'overflow-hidden rounded-[28px] bg-gradient-to-r from-[#FF5314] to-[#F0651F] p-8 md:p-12' : ''}">
      <div class="grid gap-10 lg:grid-cols-2 lg:gap-14 items-center">
        <div>
          <div class="inline-flex items-center gap-2 rounded-full ${boxed ? 'bg-white/20 text-white' : 'bg-[#FF5314]/12 text-[#E23D00]'} px-4 py-1.5 text-[12px] font-bold mb-5">${kicker}</div>
          <h2 class="text-3xl md:text-4xl font-bold leading-[1.1] ${boxed ? 'text-white' : ''}">${heading} <span class="${boxed ? 'text-white/85' : 'text-[#FF5314]'}">${headingAccent}</span></h2>
          <p class="mt-5 max-w-xl text-[16.5px] leading-relaxed ${boxed ? 'text-white/85' : 'text-black/60'}">${lead}</p>
          <div class="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2 max-w-xl">
            ${bullets.map(b => `
              <div class="flex gap-3">
                <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${boxed ? 'bg-white/22 text-white' : 'bg-[#FF5314]/12 text-[#FF5314]'}">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3"><path d="M20 6 9 17l-5-5"/></svg>
                </span>
                <span class="text-[14.5px] leading-snug ${boxed ? 'text-white/90' : 'text-black/70'}">${b}</span>
              </div>`).join('')}
          </div>
        </div>
        <!-- animation slot -->
        <div data-stage class="relative overflow-hidden rounded-[26px] ${stageTone === 'orange' ? 'tone-orange' : 'border border-[#FF5314]/15 bg-gradient-to-br from-[#FFF7F3] to-white'}" style="aspect-ratio:640/460">
          <div data-stage-svg style="position:absolute;inset:0;pointer-events:none;overflow:hidden"></div>
          <div data-stage-pills></div>
        </div>
      </div>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-4 md:px-8 py-12">
    <div class="grid gap-8 lg:grid-cols-[1fr_320px] items-start">
      <div>
        <div data-kicker class="text-[12px] font-bold uppercase tracking-[0.14em] text-[#E23D00]"></div>
        <h3 data-title class="mt-2 text-[28px] font-bold"></h3>
        <p data-desc class="mt-4 max-w-2xl text-[17px] leading-relaxed text-black/65"></p>
        <div class="mt-7 grid gap-6 sm:grid-cols-2 max-w-2xl">
          <div>
            <div class="text-[12px] font-bold uppercase tracking-[0.14em] text-[#E23D00]">Why it works</div>
            <ul data-pros class="mt-3 space-y-2 text-[14.5px] leading-relaxed text-black/70"></ul>
          </div>
          <div>
            <div class="text-[12px] font-bold uppercase tracking-[0.14em] text-black/40">What it costs you</div>
            <ul data-cons class="mt-3 space-y-2 text-[14.5px] leading-relaxed text-black/70"></ul>
          </div>
        </div>
      </div>
      <div class="rounded-2xl border border-black/10 bg-[#FFF7F3] p-5">
        <div class="text-[12px] font-bold uppercase tracking-[0.14em] text-black/45">Kept identical</div>
        <ul class="mt-3 space-y-2 text-[14px] text-black/70">
          ${keptIdentical.map(k => `<li>· ${k}</li>`).join('')}
        </ul>
      </div>
    </div>
  </section>

  <section class="border-y border-black/10 bg-[#0B0B0F] py-16 text-white">
    <div class="mx-auto max-w-7xl px-4 md:px-8">
      <div class="grid gap-12 lg:grid-cols-[400px_1fr] items-start">
        <div>
          <div class="text-[12px] font-bold uppercase tracking-[0.14em] text-[#FF5314]">The thinking</div>
          <h3 class="mt-3 text-[28px] font-bold leading-tight">${thinking.title}</h3>
          <p class="mt-4 text-[16.5px] leading-relaxed text-white/60">${thinking.lead}</p>
        </div>
        <div class="grid gap-5 sm:grid-cols-3">
          ${thinking.jobs.map((j, i) => `
            <div class="rounded-2xl border border-white/12 bg-white/[0.04] p-5">
              <div class="text-[26px] font-bold text-[#FF5314]">0${i + 1}</div>
              <div class="mt-2 text-[15px] font-bold">${j.t}</div>
              <p class="mt-2 text-[14px] leading-relaxed text-white/55">${j.d}</p>
            </div>`).join('')}
        </div>
      </div>
      <div data-matrix class="matrix o mt-12"></div>
      <p class="mt-4 text-[13px] text-white/40">Scores are my judgement, not measurements — they exist to make the trade-offs arguable. Hover a column header for its definition.</p>
      <div class="mt-10 grid gap-6 lg:grid-cols-3">
        ${pick.map((p, i) => `
          <div class="rounded-2xl border ${i === 0 ? 'border-[#FF5314]/40 bg-[#FF5314]/[0.08]' : 'border-white/12'} p-6">
            <div class="text-[12px] font-bold uppercase tracking-[0.14em] ${i === 0 ? 'text-[#FF5314]' : 'text-white/45'}">${p.k}</div>
            ${p.h ? `<div class="mt-2 text-[19px] font-bold">${p.h}</div>` : ''}
            <p class="mt-3 text-[14.5px] leading-relaxed text-white/65">${p.d}</p>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="border-t border-black/10 bg-gradient-to-b from-white to-[#FFF7F3] py-16">
    <div class="mx-auto max-w-7xl px-4 md:px-8">
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
    stagePills.innerHTML = pillsHtml(built.pills || []);
    if (built.init) cleanup = built.init(stage);

    kickerEl.textContent = `${i === 0 ? 'Live today' : 'Option ' + i} · ${v.family} · ${v.tagline}`;
    titleEl.textContent = v.name;
    descEl.textContent = v.desc;
    prosEl.innerHTML = (v.pros || []).map(t => `<li class="flex gap-2"><span class="text-[#FF5314]">+</span><span>${t}</span></li>`).join('');
    consEl.innerHTML = (v.cons || []).map(t => `<li class="flex gap-2"><span class="text-black/35">−</span><span>${t}</span></li>`).join('');

    [...tabsEl.children].forEach((b, k) => b.classList.toggle('active', k === i));
    [...grid.children].forEach((t, k) => t.classList.toggle('active', k === i));
    [...matrix.querySelectorAll('[data-mrow]')].forEach((r, k) => r.classList.toggle('on', k === i));
  }

  variants.forEach((v, i) => {
    const b = document.createElement('button');
    b.className = 'tab o';
    b.textContent = (i === 0 ? 'Current' : `${i}. ${v.name}`) + (chosen === i ? '  ✓' : '');
    if (chosen === i) b.style.boxShadow = 'inset 0 0 0 2px #16A34A';
    b.addEventListener('click', () => mount(i));
    tabsEl.appendChild(b);
  });

  variants.forEach((v, i) => {
    const built = v.build(`${cfg.id}-tile-${v.id}`);
    const t = document.createElement('div');
    t.className = 'tile o' + (chosen === i ? ' picked' : '');
    t.innerHTML = `
      <div class="frame g${stageTone === 'orange' ? ' tone-orange' : ''}">${built.svg}</div>
      <div class="p-5 border-t border-black/10">
        <div class="flex items-center gap-2">
          <span class="rounded-full bg-[#FF5314]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#E23D00]">${i === 0 ? 'LIVE TODAY' : 'OPTION ' + i}</span>
          <span class="text-[11px] font-bold uppercase tracking-wider text-black/35">${v.family}</span>
          ${chosen === i ? '<span class="badge-picked">CHOSEN</span>' : ''}
        </div>
        <div class="mt-2.5 text-[17px] font-bold">${v.name}</div>
        <div class="text-[13px] font-semibold text-black/45">${v.tagline}</div>
        <p class="mt-2.5 text-[13.5px] leading-relaxed text-black/60">${v.desc}</p>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-[12.5px] font-bold text-[#E23D00]">Load above →</span>
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
