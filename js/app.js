import { VARIANTS, CRITERIA } from './registry.js';

const tabsEl = document.getElementById('tabs');
const stage = document.getElementById('stage');
const stageSvg = document.getElementById('stage-svg');
const stagePills = document.getElementById('stage-pills');
const grid = document.getElementById('grid');
const kicker = document.getElementById('note-kicker');
const title = document.getElementById('note-title');
const desc = document.getElementById('note-desc');
const prosEl = document.getElementById('note-pros');
const consEl = document.getElementById('note-cons');
const matrix = document.getElementById('matrix');

let cleanup = null;
let active = 1;

function pillsHtml(pills) {
  return pills.map(p => {
    const pos = Object.entries(p.pos).map(([k, v]) => `${k}:${v}`).join(';');
    return `<div class="pill-slot" style="${pos}"><div class="pill ${p.tone}">${p.html}</div></div>`;
  }).join('');
}

const total = v => CRITERIA.reduce((s, c) => s + (v.scores?.[c.key] || 0), 0);

function mount(i) {
  if (cleanup) { cleanup(); cleanup = null; }
  active = i;
  const v = VARIANTS[i];
  const built = v.build(`stage-${v.id}`);
  stageSvg.innerHTML = built.svg;
  stagePills.innerHTML = pillsHtml(built.pills);
  if (built.init) cleanup = built.init(stage);

  kicker.textContent = `${i === 0 ? 'Live today' : 'Proposal ' + i} · ${v.family} · ${v.tagline}`;
  title.textContent = v.name;
  desc.textContent = v.desc;
  prosEl.innerHTML = (v.pros || []).map(t => `<li class="flex gap-2"><span class="text-[#06B6D4]">+</span><span>${t}</span></li>`).join('');
  consEl.innerHTML = (v.cons || []).map(t => `<li class="flex gap-2"><span class="text-black/35">−</span><span>${t}</span></li>`).join('');

  [...tabsEl.children].forEach((b, k) => b.classList.toggle('active', k === i));
  [...grid.children].forEach((t, k) => t.classList.toggle('active', k === i));
  [...matrix.querySelectorAll('[data-mrow]')].forEach((r, k) => r.classList.toggle('on', k === i));
}

/* tabs */
VARIANTS.forEach((v, i) => {
  const b = document.createElement('button');
  b.className = 'tab';
  b.textContent = i === 0 ? 'Current' : `${i}. ${v.name}`;
  b.addEventListener('click', () => mount(i));
  tabsEl.appendChild(b);
});

/* compare grid — every tile runs live */
VARIANTS.forEach((v, i) => {
  const built = v.build(`tile-${v.id}`);
  const t = document.createElement('div');
  t.className = 'tile';
  t.innerHTML = `
    <div class="frame">${built.svg}</div>
    <div class="p-5 border-t border-black/10">
      <div class="flex items-center gap-2">
        <span class="rounded-full bg-cyan-50 px-2.5 py-0.5 text-[11px] font-bold text-[#0891B2]">${i === 0 ? 'LIVE TODAY' : 'PROPOSAL ' + i}</span>
        <span class="text-[11px] font-bold uppercase tracking-wider text-black/35">${v.family}</span>
      </div>
      <div class="mt-2.5 text-[17px] font-bold">${v.name}</div>
      <div class="text-[13px] font-semibold text-black/45">${v.tagline}</div>
      <p class="mt-2.5 text-[13.5px] leading-relaxed text-black/60">${v.desc}</p>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-[12.5px] font-bold text-[#0891B2]">Load in hero →</span>
        <span class="text-[12px] font-semibold text-black/40">${total(v)}/30</span>
      </div>
    </div>`;
  t.addEventListener('click', () => { mount(i); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  grid.appendChild(t);
  if (built.init) built.init(t);
});

/* scoring matrix */
function bar(n) {
  return `<span class="score">${[1, 2, 3, 4, 5].map(k => `<i class="${k <= n ? 'f' : ''}"></i>`).join('')}</span>`;
}
matrix.innerHTML = `
  <div class="mrow head">
    <div>Option</div>
    ${CRITERIA.map(c => `<div title="${c.note}">${c.label}</div>`).join('')}
    <div class="text-right">Total</div>
  </div>
  ${VARIANTS.map((v, i) => `
    <button class="mrow" data-mrow="${i}">
      <div class="name"><span class="idx">${i === 0 ? '—' : i}</span>${v.name}</div>
      ${CRITERIA.map(c => `<div>${bar(v.scores?.[c.key] || 0)}</div>`).join('')}
      <div class="text-right font-bold">${total(v)}</div>
    </button>`).join('')}`;
[...matrix.querySelectorAll('[data-mrow]')].forEach(r =>
  r.addEventListener('click', () => { mount(+r.dataset.mrow); window.scrollTo({ top: 0, behavior: 'smooth' }); }));

mount(active);
