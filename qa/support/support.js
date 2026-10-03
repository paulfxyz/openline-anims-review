/* ══════════════════════════════════════════════════════════════════════
   Openline support modals — Knowledge base and Device compatibility.

   One module, two modals, four ways to open them:
     1. markup     <a data-ol-open="kb" data-ol-q="refund">…</a>
                   <button data-ol-open="compat" data-ol-q="iPhone 15">…</button>
     2. URL hash   #kb   #kb=japan coverage   #kb/article/<slug>   #compat=pixel 9
     3. JS         Openline.open('kb', { q, cat, article })  ·  Openline.open('compat', { q })
     4. keyboard   ⌘K / Ctrl+K opens the knowledge base anywhere on the page

   Data is the real open-source data: 2,737 KB articles (openline-kb) and
   9,496 devices (openline-check), loaded on first open so pages that never
   open a modal pay nothing.
   ══════════════════════════════════════════════════════════════════════ */

import { md } from './md.js';

const BASE = '/qa';
const CSS = `${BASE}/support/support.css`;

function ensureCss() {
  if (document.querySelector(`link[href="${CSS}"]`)) return;
  const l = document.createElement('link');
  l.rel = 'stylesheet'; l.href = CSS;
  document.head.appendChild(l);
}

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const I = {
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  chev: '<path d="M9 6l6 6-6 6"/>',
  back: '<path d="M15 6l-6 6 6 6"/>',
  check: '<path d="M5 12.5l4.2 4.2L19 7"/>',
  no: '<path d="M6 6l12 12M18 6L6 18"/>',
  up: '<path d="M7 10.5v10H4v-10zM7 10.5l3.8-7a2 2 0 0 1 2.7 2.3l-.9 3.7h5.6a2 2 0 0 1 2 2.4l-1.4 6.8a2 2 0 0 1-2 1.6H7"/>',
  down: '<path d="M17 13.5v-10h3v10zM17 13.5l-3.8 7a2 2 0 0 1-2.7-2.3l.9-3.7H5.8a2 2 0 0 1-2-2.4l1.4-6.8a2 2 0 0 1 2-1.6H17"/>',
  chat: '<path d="M20.5 12a8.5 8.5 0 0 1-12.4 7.5L3.5 20.5l1-4.6A8.5 8.5 0 1 1 20.5 12z"/>',
  phone: '<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10.5 18.5h3"/>',
  book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H19v-3"/>',
  ext: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/>',
};
export const icon = (k, s = 20) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k] || ''}</svg>`;

/* ── Shell ─────────────────────────────────────────────────────────── */

let openShell = null;
function shell(kind, title, sub) {
  ensureCss();
  closeShell(true);
  const ret = document.activeElement;
  const root = document.createElement('div');
  root.className = `ols-overlay ols-m-${kind}`;
  root.innerHTML = `
    <div class="ols-back" data-close></div>
    <div class="ols-panel" role="dialog" aria-modal="true" aria-labelledby="ols-t">
      <header class="ols-head">
        <div><h2 id="ols-t">${title}</h2><p>${sub}</p></div>
        <button type="button" class="ols-x" data-close aria-label="Close">${icon('x', 18)}</button>
      </header>
      <div class="ols-body"></div>
      <footer class="ols-foot"></footer>
    </div>`;
  document.body.appendChild(root);
  document.documentElement.classList.add('ols-lock');
  root.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => closeShell()));
  const onKey = (e) => { if (e.key === 'Escape' && openShell && openShell.root === root) { e.preventDefault(); closeShell(); } };
  document.addEventListener('keydown', onKey);
  openShell = { root, ret, onKey };
  requestAnimationFrame(() => root.classList.add('is-in'));
  return root;
}

function closeShell(instant) {
  if (!openShell) return;
  const { root, ret, onKey } = openShell;
  openShell = null;
  document.removeEventListener('keydown', onKey);
  if (!document.querySelector('.ols-chat-open')) document.documentElement.classList.remove('ols-lock');
  if (instant) root.remove();
  else { root.classList.remove('is-in'); setTimeout(() => root.remove(), 220); }
  if (location.hash.match(/^#(kb|compat)/)) history.replaceState(null, '', location.pathname + location.search);
  if (ret && ret.focus) try { ret.focus(); } catch { /* ignore */ }
}

/* ── Knowledge base ────────────────────────────────────────────────── */

let KB = null;   // { articles, index, cats, search }
async function loadKB() {
  if (KB) return KB;
  const [{ buildIndex, runSearch }, res] = await Promise.all([
    import('./search.mjs'),
    fetch(`${BASE}/data/kb-articles.json`),
  ]);
  const articles = await res.json();
  const cats = [...articles.reduce((m, a) => m.set(a.category, (m.get(a.category) || 0) + 1), new Map())]
    .sort((a, b) => b[1] - a[1]);
  KB = { articles, index: buildIndex(articles), cats, runSearch, bySlug: new Map(articles.map((a) => [a.slug, a])) };
  return KB;
}

const excerpt = (body, n = 150) => {
  const t = String(body || '').replace(/[#*_`>[\]()-]/g, ' ').replace(/\s+/g, ' ').trim();
  return t.length > n ? t.slice(0, n).replace(/\s\S*$/, '') + '…' : t;
};

export async function openKB(o = {}) {
  const root = shell('kb', 'How can we <em>help</em>?', 'Search a question, a device or a country — straight answers in seconds.');
  const body = root.querySelector('.ols-body');
  const foot = root.querySelector('.ols-foot');
  body.innerHTML = `
    <div class="ols-kb">
      <div class="ols-col">
        <label class="ols-search">${icon('search')}<input type="search" placeholder="Try “install on iPhone”, “refund”, “Japan coverage”" value="${esc(o.q || '')}" autocomplete="off" spellcheck="false"></label>
        <div class="ols-chips" role="tablist" aria-label="Topics"><span class="ols-skel" style="width:70%"></span></div>
        <div class="ols-list" role="listbox" aria-label="Articles">${'<div class="ols-skelrow"></div>'.repeat(6)}</div>
      </div>
      <article class="ols-read" aria-live="polite">
        <div class="ols-empty">${icon('book', 34)}<b>Pick an article</b><span>Answers open here, next to your search.</span></div>
      </article>
    </div>`;
  foot.innerHTML = '<span>Loading the knowledge base…</span>';
  const input = body.querySelector('input');
  setTimeout(() => input.focus(), 60);

  const kb = await loadKB();
  if (!root.isConnected) return;
  let cat = o.cat || null;
  let sel = 0;
  let results = [];
  foot.innerHTML = `<span><b>${kb.articles.length.toLocaleString('en')}</b> articles · <b>${kb.cats.length}</b> topics</span>
    <a href="https://github.com/paulfxyz/openline-kb" target="_blank" rel="noopener">Powered by our open-source KB (MIT) ${icon('ext', 14)}</a>`;

  const chips = body.querySelector('.ols-chips');
  chips.innerHTML = [['', 'All topics', kb.articles.length], ...kb.cats.map(([c, n]) => [c, c, n])].map(([v, l, n]) =>
    `<button type="button" role="tab" data-cat="${esc(v)}" class="${(cat || '') === v ? 'is-on' : ''}">${esc(l)} <small>${n.toLocaleString('en')}</small></button>`).join('');
  chips.querySelectorAll('[data-cat]').forEach((b) => b.addEventListener('click', () => {
    cat = b.dataset.cat || null;
    chips.querySelectorAll('[data-cat]').forEach((x) => x.classList.toggle('is-on', x === b));
    run();
  }));

  const list = body.querySelector('.ols-list');
  const read = body.querySelector('.ols-read');

  function run() {
    const q = input.value.trim();
    let r = kb.runSearch(q, kb.articles, cat ? new Set([cat]) : null, kb.index);
    if (!q && !cat) r = kb.articles.filter((a) => a.category === 'Getting started');
    results = r.slice(0, 60);
    sel = 0;
    const head = !q ? (cat ? esc(cat) : 'Start here') : r.isFallback ? `No exact match — popular instead` : `${r.length.toLocaleString('en')} result${r.length === 1 ? '' : 's'}`;
    list.innerHTML = `<div class="ols-listh">${head}</div>` + results.map((a, i) => `
      <button type="button" role="option" class="ols-row${i === sel ? ' is-sel' : ''}" data-i="${i}">
        <b>${esc(a.title)}</b><span>${esc(excerpt(a.body, 110))}</span><em>${esc(a.category)}</em>
      </button>`).join('') + (r.length > 60 ? `<div class="ols-more">Showing the top 60 — refine your search to narrow it down.</div>` : '');
    list.querySelectorAll('[data-i]').forEach((b) => b.addEventListener('click', () => show(+b.dataset.i)));
  }

  function show(i, slug) {
    const a = slug ? kb.bySlug.get(slug) : results[i];
    if (!a) return;
    if (i != null) { sel = i; list.querySelectorAll('.ols-row').forEach((r, k) => r.classList.toggle('is-sel', k === i)); }
    const related = kb.articles.filter((x) => x.subcategory === a.subcategory && x.id !== a.id).slice(0, 4);
    read.innerHTML = `
      <button type="button" class="ols-backbtn">${icon('back', 16)} Back to results</button>
      <div class="ols-crumb">${esc(a.category)}${a.subcategory ? ` <span>›</span> ${esc(a.subcategory)}` : ''}</div>
      <h3>${esc(a.title)}</h3>
      <div class="ols-md">${md(a.body)}</div>
      <div class="ols-helpful"><span>Was this helpful?</span>
        <button type="button" data-v="up">${icon('up', 16)} Yes</button><button type="button" data-v="down">${icon('down', 16)} No</button></div>
      ${related.length ? `<div class="ols-rel"><b>Related</b>${related.map((r) => `<button type="button" data-slug="${esc(r.slug)}">${esc(r.title)} ${icon('chev', 14)}</button>`).join('')}</div>` : ''}
      <div class="ols-stuck"><span><b>Still stuck?</b> A real person replies in under 2 minutes.</span>
        <button type="button" class="ols-btn" data-chat>${icon('chat', 16)} Chat with us</button></div>`;
    read.scrollTop = 0;
    root.classList.add('is-reading');
    history.replaceState(null, '', `#kb/article/${a.slug}`);
    read.querySelector('.ols-backbtn').addEventListener('click', () => root.classList.remove('is-reading'));
    read.querySelectorAll('[data-slug]').forEach((b) => b.addEventListener('click', () => show(null, b.dataset.slug)));
    read.querySelectorAll('[data-v]').forEach((b) => b.addEventListener('click', () => {
      read.querySelector('.ols-helpful').innerHTML = b.dataset.v === 'up' ? '<span>Thanks — glad it helped.</span>' : '<span>Thanks — we’ll improve it. Want to ask a person?</span>';
    }));
    read.querySelector('[data-chat]').addEventListener('click', () => { closeShell(true); window.Openline.open('chat', { topic: a.title }); });
    read.querySelectorAll('.ols-md a[href^="/kb/"], .ols-md a[href^="#kb/"]').forEach((l) => l.addEventListener('click', (e) => {
      const s = l.getAttribute('href').split('/').pop(); if (kb.bySlug.get(s)) { e.preventDefault(); show(null, s); }
    }));
  }

  let t = 0;
  input.addEventListener('input', () => { clearTimeout(t); t = setTimeout(run, 90); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      sel = Math.max(0, Math.min(results.length - 1, sel + (e.key === 'ArrowDown' ? 1 : -1)));
      list.querySelectorAll('.ols-row').forEach((r, k) => { r.classList.toggle('is-sel', k === sel); if (k === sel) r.scrollIntoView({ block: 'nearest' }); });
    }
    if (e.key === 'Enter') { e.preventDefault(); show(sel); }
  });
  run();
  if (o.article && kb.bySlug.get(o.article)) show(null, o.article);
}

/* ── Device compatibility ──────────────────────────────────────────── */

let DEV = null;
async function loadDevices() {
  if (DEV) return DEV;
  const { DEVICES } = await import(`${BASE}/data/devices.js`);
  const brands = [...DEVICES.reduce((m, d) => m.set(d.brand, (m.get(d.brand) || 0) + (d.esim ? 1 : 0)), new Map())]
    .sort((a, b) => b[1] - a[1]);
  DEV = { all: DEVICES, brands, yes: DEVICES.filter((d) => d.esim).length, nBrands: brands.length };
  return DEV;
}

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9+]+/g, ' ').trim();

/* Ranks devices for a free-text query: model numbers exact, then name
   tokens; tolerant of "iphone15", "s24 ultra", "galaxy z fold". */
function findDevices(all, q) {
  const n = norm(q).replace(/([a-z])(\d)/g, '$1 $2');
  if (!n) return null;
  const toks = n.split(' ').filter(Boolean);
  const out = [];
  for (const d of all) {
    const hay = norm(`${d.brand} ${d.name}`).replace(/([a-z])(\d)/g, '$1 $2');
    const model = norm(d.model);
    let s = 0;
    if (model && model === norm(q)) s += 1000;
    let all_ = true;
    for (const t of toks) {
      if ((' ' + hay + ' ').includes(' ' + t + ' ')) s += 30;
      else if (hay.includes(t)) s += 12;
      else if (model.includes(t)) s += 20;
      else all_ = false;
    }
    if (!all_ && s < 1000) continue;
    if (hay.startsWith(n)) s += 40;
    s += (d.year || 0) / 1000 + (d.esim ? 2 : 0);
    out.push([s, d]);
  }
  return out.sort((a, b) => b[0] - a[0]).map((x) => x[1]);
}

function guessDevice() {
  const ua = navigator.userAgent;
  if (/iPhone/.test(ua)) return 'iPhone';
  if (/iPad/.test(ua)) return 'iPad';
  const m = ua.match(/Android [\d.]+; ([^;)]+)/);
  return m ? m[1].replace(/Build.*/, '').trim() : '';
}

export async function openCompat(o = {}) {
  const root = shell('compat', 'Does your phone support <em>eSIM</em>?', 'Phone, tablet, watch or hotspot — type any brand, model or model number.');
  const body = root.querySelector('.ols-body');
  const foot = root.querySelector('.ols-foot');
  body.innerHTML = `
    <div class="ols-kb">
      <div class="ols-col">
        <label class="ols-search">${icon('search')}<input type="search" placeholder="Try “iPhone 15”, “Galaxy S24”, “Pixel 9” or a model number" value="${esc(o.q || '')}" autocomplete="off" spellcheck="false"></label>
        <div class="ols-chips ols-filt"><span class="ols-skel" style="width:60%"></span></div>
        <div class="ols-list">${'<div class="ols-skelrow is-s"></div>'.repeat(8)}</div>
      </div>
      <article class="ols-read">
        <div class="ols-empty">${icon('phone', 34)}<b>Pick a device</b><span>We’ll tell you if it works, and anything to watch out for.</span></div>
      </article>
    </div>`;
  const input = body.querySelector('input');
  setTimeout(() => input.focus(), 60);
  const dev = await loadDevices();
  if (!root.isConnected) return;
  let filt = 'all', brand = o.brand || '', results = [], sel = 0;
  foot.innerHTML = `<span><i class="ols-dot is-y"></i><b>${dev.yes.toLocaleString('en')}</b> compatible · <i class="ols-dot is-n"></i><b>${(dev.all.length - dev.yes).toLocaleString('en')}</b> not · <b>${dev.nBrands}</b> brands</span>
    <a href="https://github.com/paulfxyz/openline-check" target="_blank" rel="noopener">Powered by our open-source database (MIT) ${icon('ext', 14)}</a>`;

  const chips = body.querySelector('.ols-chips');
  const top = dev.brands.slice(0, 10).map((b) => b[0]);
  chips.innerHTML = `${[['all', 'All'], ['yes', 'Compatible'], ['no', 'Not compatible']].map(([v, l]) => `<button type="button" data-f="${v}" class="${filt === v ? 'is-on' : ''}">${l}</button>`).join('')}
    <i class="ols-sep"></i>${top.map((b) => `<button type="button" data-b="${esc(b)}" class="${brand === b ? 'is-on' : ''}">${esc(b)}</button>`).join('')}`;
  chips.querySelectorAll('[data-f]').forEach((b) => b.addEventListener('click', () => {
    filt = b.dataset.f; chips.querySelectorAll('[data-f]').forEach((x) => x.classList.toggle('is-on', x === b)); run();
  }));
  chips.querySelectorAll('[data-b]').forEach((b) => b.addEventListener('click', () => {
    brand = brand === b.dataset.b ? '' : b.dataset.b;
    chips.querySelectorAll('[data-b]').forEach((x) => x.classList.toggle('is-on', x.dataset.b === brand)); run();
  }));

  const list = body.querySelector('.ols-list');
  const read = body.querySelector('.ols-read');
  const guess = guessDevice();

  function run() {
    const q = input.value.trim();
    let r = q ? findDevices(dev.all, q) : dev.all.filter((d) => d.esim).sort((a, b) => b.year - a.year || (a.brand === 'Apple' ? -1 : 1));
    if (brand) r = r.filter((d) => d.brand === brand);
    if (filt !== 'all') r = r.filter((d) => d.esim === (filt === 'yes'));
    results = r.slice(0, 80);
    sel = 0;
    list.innerHTML = `<div class="ols-listh">${q ? `${r.length.toLocaleString('en')} match${r.length === 1 ? '' : 'es'}` : 'Most recent compatible devices'}</div>
      ${!q && guess ? `<button type="button" class="ols-guess" data-guess>${icon('phone', 16)} Looks like you’re on <b>${esc(guess)}</b> — check it</button>` : ''}`
      + (results.length ? results.map((d, i) => `
      <button type="button" class="ols-row ols-drow${i === sel ? ' is-sel' : ''}" data-i="${i}">
        <span><b>${esc(d.brand)} ${esc(d.name)}</b><span>${esc(d.model && d.model !== '—' ? d.model + ' · ' : '')}${d.year}${d.note ? ` <em class="ols-note">${esc(d.note)}</em>` : ''}</span></span>
        <i class="ols-pill ${d.esim ? 'is-y' : 'is-n'}">${d.esim ? 'Compatible' : 'No eSIM'}</i>
      </button>`).join('') : `<div class="ols-none"><b>We don’t track “${esc(q)}” yet.</b><span>Dial <code>*#06#</code> — if you see an <b>EID</b> line, your phone supports eSIM.</span></div>`);
    list.querySelectorAll('[data-i]').forEach((b) => b.addEventListener('click', () => show(+b.dataset.i)));
    const g = list.querySelector('[data-guess]');
    if (g) g.addEventListener('click', () => { input.value = guess; run(); });
  }

  function show(i) {
    const d = results[i]; if (!d) return;
    sel = i; list.querySelectorAll('.ols-row').forEach((r, k) => r.classList.toggle('is-sel', k === i));
    read.innerHTML = `
      <button type="button" class="ols-backbtn">${icon('back', 16)} Back to devices</button>
      <div class="ols-verdict ${d.esim ? 'is-y' : 'is-n'}">
        <span class="ols-vic">${icon(d.esim ? 'check' : 'no', 30)}</span>
        <div><b>${d.esim ? 'Works with Openline' : 'No eSIM on this device'}</b><span>${esc(d.brand)} ${esc(d.name)}</span></div>
      </div>
      <dl class="ols-dl"><dt>Model</dt><dd>${esc(d.model || '—')}</dd><dt>Released</dt><dd>${d.year}</dd><dt>eSIM</dt><dd>${d.esim ? 'Supported' : 'Not supported'}</dd>${d.note ? `<dt>Note</dt><dd>${esc(d.note)}</dd>` : ''}</dl>
      ${d.esim ? `<div class="ols-tips"><b>Before you buy</b><ul>
          <li>Your phone must be <b>carrier-unlocked</b>.</li>
          <li>Double-check: dial <code>*#06#</code> and look for an <b>EID</b> line.</li>
          ${d.note ? `<li>${esc(d.note)} — regional variants can differ.</li>` : ''}</ul></div>
        <div class="ols-stuck"><span><b>You’re good to go.</b> Install takes under 2 minutes.</span><a class="ols-btn is-or" href="/qa/home">Find a plan</a></div>`
      : `<div class="ols-tips"><b>What you can do</b><ul><li>Buy for a compatible phone and install it there with the QR code.</li><li>Use a compatible mobile hotspot and connect this device over Wi-Fi.</li></ul></div>
        <div class="ols-stuck"><span><b>Not sure?</b> Ask us — we’ll check your exact variant.</span><button type="button" class="ols-btn" data-chat>${icon('chat', 16)} Chat with us</button></div>`}`;
    root.classList.add('is-reading');
    read.querySelector('.ols-backbtn').addEventListener('click', () => root.classList.remove('is-reading'));
    const c = read.querySelector('[data-chat]');
    if (c) c.addEventListener('click', () => { closeShell(true); window.Openline.open('chat', { topic: `${d.brand} ${d.name} compatibility` }); });
  }

  let t = 0;
  input.addEventListener('input', () => { clearTimeout(t); t = setTimeout(run, 80); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      sel = Math.max(0, Math.min(results.length - 1, sel + (e.key === 'ArrowDown' ? 1 : -1)));
      list.querySelectorAll('.ols-row').forEach((r, k) => { r.classList.toggle('is-sel', k === sel); if (k === sel) r.scrollIntoView({ block: 'nearest' }); });
    }
    if (e.key === 'Enter') { e.preventDefault(); show(sel); }
  });
  run();
  if (o.q && results.length) show(0);
}

/* ── Public API + triggers ─────────────────────────────────────────── */

const OPENERS = {
  kb: openKB,
  compat: openCompat,
  chat: async (o) => (await import('./chat.js')).openChat(o),
};

window.Openline = Object.assign(window.Openline || {}, {
  open: (kind, o = {}) => (OPENERS[kind] ? OPENERS[kind](o) : null),
  close: () => closeShell(),
});

document.addEventListener('click', (e) => {
  const t = e.target.closest && e.target.closest('[data-ol-open]');
  if (!t) return;
  e.preventDefault();
  window.Openline.open(t.dataset.olOpen, { q: t.dataset.olQ || '', cat: t.dataset.olCat || '', article: t.dataset.olArticle || '' });
});

document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openKB(); }
});

function fromHash() {
  const h = decodeURIComponent(location.hash.slice(1));
  let m;
  if ((m = h.match(/^kb\/article\/(.+)$/))) return openKB({ article: m[1] });
  if ((m = h.match(/^kb(?:=(.*))?$/))) return openKB({ q: m[1] || '' });
  if ((m = h.match(/^compat(?:=(.*))?$/))) return openCompat({ q: m[1] || '' });
  if ((m = h.match(/^chat(?:=(.*))?$/))) return window.Openline.open('chat', { q: m[1] || '' });
  return null;
}
window.addEventListener('hashchange', fromHash);
if (/^#(kb|compat|chat)/.test(location.hash)) setTimeout(fromHash, 50);
