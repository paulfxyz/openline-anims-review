/* ══════════════════════════════════════════════════════════════════════
   /qa/<page> — the live site, with each chosen animation in its real slot.

   Every page here is a static capture of openline-revisions-hub at 1440px
   with its scripts removed. The capture marked each animated slot with
   data-qa-slot="<board key>"; this file mounts the picked option into each
   one, recolours the whole page on demand, and carries the QA drawer.
   ══════════════════════════════════════════════════════════════════════ */

import {
  PAGES, STEPS, loadBase, loadState, saveState, optOf, baseOpt, resetPicks,
  themeObj, themeLabel, renderOption, exportMD, makeMapper, esc, styleFor,
} from './core.js';
import { paintSiteCss, paintTree, watchMutations } from './paint.js';
import { renderThemeControls } from './themeui.js';

const slug = document.body.dataset.qaPage;
const PAGE = PAGES.find((p) => p.slug === slug);
const pIdx = PAGES.indexOf(PAGE);
const STYLE = styleFor(slug);
const STYLE_KEY = slug.replace('-redesign', '');
const styleOn = () => !!STYLE && state.pageStyle[STYLE_KEY] !== false;

/* Stage tones, as inline style so the recolour pass reaches them too. */
const TONE_BG = {
  dark: 'linear-gradient(135deg, #1A1526, #0D0B14 50%, #241A38)',
  plus: 'linear-gradient(160deg, #2A1A18, #131826 45%, #241A16)',
  orange: 'linear-gradient(135deg, #FF5314, #F0651F 55%, #FF8A4C)',
  plusgreen: 'linear-gradient(160deg, #122A1F, #131826 45%, #102A20)',
};

/* pill tones the options use, as [background, text] */
const PILL = {
  orange: ['#FF5314', '#FFFFFF'], ink: ['#0B0B0F', '#FFFFFF'], white: ['#FFFFFF', '#0B0B0F'],
  cyan: ['#06B6D4', '#FFFFFF'], blue: ['#2563EB', '#FFFFFF'], teal: ['#0D9488', '#FFFFFF'],
};

let state;
let map = null;
const recs = [];   // one per slot on this page

const inUI = (el) => !!(el.closest && el.closest('#qa-ui'));

/* ── Slots ─────────────────────────────────────────────────────────── */

function activeBoard(rec) {
  if (!rec.boards) return rec.key;
  const k = state.shared[rec.key];
  return rec.boards.includes(k) ? k : rec.boards[0];
}

function mount(rec) {
  if (rec.cleanup) { try { rec.cleanup(); } catch { /* ignore */ } rec.cleanup = null; }
  const key = activeBoard(rec);
  const s = STEPS[key];
  const el = rec.el;

  if (state.live[key]) {
    el.innerHTML = rec.orig;
    el.style.height = rec.origHeight;
    el.style.minHeight = '';
  } else {
    const opt = optOf(state, key);
    const r = renderOption(key, opt);
    rec.pills = r.pills;
    if (s.opts[opt] && s.opts[opt].isIcon) {
      /* the Aloha badge keeps its own 56px gradient tile; only the 34px art
         inside it changes, exactly as it would in production */
      el.innerHTML = `<span class="qa-ic-wrap">${r.html}</span>`;
    } else {
      /* the custom properties the artwork's shared classes read, inline so
         the recolour pass reaches them like everything else */
      const st = `--cyan:#06B6D4;--cyan-deep:#0891B2;--ink:#0B0B0F;--orange:#FF5314;${s.tone ? `background:${TONE_BG[s.tone]};` : ''}`;
      el.innerHTML = `<div class="qa-mount bd-stage" style="${st}">${r.html}</div>`;
      /* hold the slot to the proportions it had on the live page (the
         original content defined its height, and the mount is absolutely
         positioned) — a ratio rather than a pixel height, so it still fits
         when the capture reflows on a phone */
      fitSlot(rec);
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      if (r.init) {
        const c = r.init(el.firstElementChild);
        if (typeof c === 'function') rec.cleanup = c;
      }
    }
  }
  /* Floating pills. On hero slots the live page floats its own pills as
     siblings of the artwork; those belong to what ships today, so they are
     hidden while a proposal is showing and the proposal's own pills are
     drawn in their place — exactly what the review stage does. */
  if (rec.pillHost) rec.pillHost.remove();
  rec.pillHost = null;
  const showing = !state.live[key];
  if (rec.sibs) rec.sibs.forEach((n) => { n.style.display = showing ? 'none' : ''; });
  if (showing) {
    const pills = rec.pills || [];
    if (pills.length) {
      const host = document.createElement('div');
      host.className = 'qa-pills';
      host.innerHTML = pills.map((p) => {
        const pos = Object.entries(p.pos || {}).map(([k, v]) => `${k}:${v}`).join(';');
        const c = PILL[p.tone] || PILL.white;
        return `<div class="qa-pill-slot" style="${pos}"><div class="qa-pill" style="background:${c[0]};color:${c[1]}">${p.html}</div></div>`;
      }).join('');
      (rec.hero ? el.parentElement : el).appendChild(host);
      rec.pillHost = host;
    }
  }

  paintTree(rec.hero ? el.parentElement : el, map);
  el.classList.toggle('qa-showing-live', !!state.live[key]);
  layoutTags();
}

/* Height follows width at the live slot's proportions. Set in pixels, not
   via aspect-ratio: some slots sit in stretching grid rows, which silently
   override aspect-ratio and made the Network panel 50px too tall. */
function fitSlot(rec) {
  const key = activeBoard(rec);
  if (state.live[key] || rec.isIcon) return;
  const w = rec.el.getBoundingClientRect().width || rec.w;
  rec.el.style.minHeight = '0';
  rec.el.style.height = `${Math.round((w * rec.h) / rec.w)}px`;
}

/* ── Theme ─────────────────────────────────────────────────────────── */

async function applyTheme(rerender = true) {
  /* a page identity, while on, replaces the site-wide theme on its page */
  const on = styleOn();
  map = makeMapper(on ? STYLE : themeObj(state));
  document.body.classList.toggle('qa-journal', on && STYLE.cls === 'qa-journal');
  if (on && STYLE.cls === 'qa-journal') ensureJournalFont();
  await paintSiteCss(map);
  paintTree(document.body, map, inUI);
  if (rerender) renderTheme();
}

function ensureJournalFont() {
  if (document.getElementById('qa-journal-font')) return;
  const l = document.createElement('link');
  l.id = 'qa-journal-font';
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500;6..72,600;6..72,700&display=swap';
  document.head.appendChild(l);
}

/* ── Tags floating over each slot ──────────────────────────────────── */

let layer;
function layoutTags() {
  if (!layer) return;
  recs.forEach((rec) => {
    const r = rec.el.getBoundingClientRect();
    const t = rec.tag;
    const visible = r.width > 0 && r.height > 0;
    t.hidden = !visible || !state.outline;
    t.style.top = `${Math.max(0, r.top + window.scrollY - (rec.isIcon ? 34 : 0)) + (rec.isIcon ? 0 : 10)}px`;
    t.style.left = `${r.left + window.scrollX + (rec.isIcon ? -40 : 10)}px`;
  });
}

function tagText(rec) {
  const key = activeBoard(rec);
  const s = STEPS[key];
  const opt = optOf(state, key);
  const o = s.opts[opt];
  const changed = opt !== baseOpt(key);
  return `<b>${opt === 0 ? 'LIVE' : opt}</b><span>${esc(o.name)}</span>${changed ? '<i>changed</i>' : ''}${state.live[key] ? '<i class="is-live">showing live</i>' : ''}`;
}

/* ── Drawer ────────────────────────────────────────────────────────── */

let ui, drawer, themeBox, slotBox, footBox, identBox;

function buildUI() {
  ui = document.createElement('div');
  ui.id = 'qa-ui';
  ui.innerHTML = `
    <div class="qa-layer" id="qa-layer"></div>
    <div class="qa-dock">
      <a class="qa-dock-home" href="/qa" title="All pages">
        <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 5a11 11 0 1 0 11 11" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/><circle cx="25.5" cy="6.5" r="4" fill="#FF5314"/></svg>
        <span>QA</span>
      </a>
      <button type="button" class="qa-dock-b" data-act="prev" title="Previous page">‹</button>
      <span class="qa-dock-page">${esc(PAGE.title)}<small>${pIdx + 1} / ${PAGES.length}</small></span>
      <button type="button" class="qa-dock-b" data-act="next" title="Next page">›</button>
      ${PAGE.redesign || PAGE.redesignOf ? `<span class="qa-dock-sep"></span>
      <span class="qa-dock-seg">
        <a href="/qa/${PAGE.redesignOf || PAGE.slug}" class="${PAGE.redesignOf ? '' : 'is-on'}">Current</a>
        <a href="/qa/${PAGE.redesign || PAGE.slug}" class="${PAGE.redesignOf ? 'is-on' : ''}">Redesign</a>
      </span>` : ''}
      <span class="qa-dock-sep"></span>
      <button type="button" class="qa-dock-t" data-act="outline" title="Show slot labels (O)">Labels</button>
      <button type="button" class="qa-dock-t is-main" data-act="drawer" title="Open the panel (Q)">Panel</button>
    </div>
    <aside class="qa-drawer" aria-label="QA panel">
      <div class="qa-dr-head">
        <div>
          <span class="qa-dr-kick">${esc(PAGE.path)}</span>
          <h2>${esc(PAGE.title)}</h2>
        </div>
        <button type="button" class="qa-x" data-act="drawer" title="Close (Q)">✕</button>
      </div>
      <div class="qa-dr-body">
        <section class="qa-sec">
          <h3>On this page <span>${PAGE.slots.length ? `${PAGE.slots.length} slot${PAGE.slots.length > 1 ? 's' : ''}` : 'no animation picks'}</span></h3>
          <div id="qa-slots"></div>
        </section>
        ${STYLE ? `<section class="qa-sec">
          <h3>Page identity <span>this page only</span></h3>
          <div id="qa-ident"></div>
        </section>` : ''}
        <section class="qa-sec">
          <h3>Colour <span>applies to every page</span></h3>
          <div id="qa-theme"></div>
        </section>
      </div>
      <div class="qa-dr-foot" id="qa-foot"></div>
    </aside>
    <div class="qa-toast" id="qa-toast" hidden></div>`;
  document.body.appendChild(ui);
  layer = ui.querySelector('#qa-layer');
  drawer = ui.querySelector('.qa-drawer');
  themeBox = ui.querySelector('#qa-theme');
  slotBox = ui.querySelector('#qa-slots');
  footBox = ui.querySelector('#qa-foot');
  identBox = ui.querySelector('#qa-ident');

  ui.querySelectorAll('[data-act]').forEach((b) => {
    b.addEventListener('click', () => act(b.dataset.act));
  });
}

function act(a) {
  if (a === 'drawer') { state.drawer = !state.drawer; saveState(state); syncChrome(); }
  if (a === 'outline') { state.outline = !state.outline; saveState(state); syncChrome(); layoutTags(); }
  if (a === 'prev') location.href = `/qa/${PAGES[(pIdx - 1 + PAGES.length) % PAGES.length].slug}`;
  if (a === 'next') location.href = `/qa/${PAGES[(pIdx + 1) % PAGES.length].slug}`;
}

function syncChrome() {
  document.body.classList.toggle('qa-drawer-open', !!state.drawer);
  document.body.classList.toggle('qa-outline', !!state.outline);
  ui.querySelector('[data-act="outline"]').classList.toggle('is-on', !!state.outline);
  ui.querySelector('.qa-dock [data-act="drawer"]').classList.toggle('is-on', !!state.drawer);
}

function renderSlots() {
  slotBox.innerHTML = recs.length ? '' : `<p class="qa-hint">No animation board targets this page. It is here for its page identity${STYLE ? ` (${esc(STYLE.name)})` : ''}: every existing animation on it is recoloured with the page.</p>`;
  recs.forEach((rec) => {
    const key = activeBoard(rec);
    const s = STEPS[key];
    const opt = optOf(state, key);
    const o = s.opts[opt];
    const was = baseOpt(key);
    /* judge the fit by the artwork's real drawing box, not the board's
       declared embed — boards without one fall back to a nominal 640×460 */
    const svg = rec.el.querySelector('.qa-mount svg');
    const vb = svg && svg.viewBox && svg.viewBox.baseVal;
    const e = vb && vb.width ? { w: Math.round(vb.width), h: Math.round(vb.height) } : s.embed;
    const isIcon = !!(o && o.isIcon);
    const ratio = (e.w / e.h) / (rec.w / rec.h);
    const warn = !isIcon && Math.abs(ratio - 1) > 0.06
      ? `<p class="qa-warn">Drawn for <b>${e.w} × ${e.h}</b>, but this slot is <b>${rec.w} × ${rec.h}</b> on the live page, so it ${ratio > 1 ? 'sits with space above and below' : 'sits with space at the sides'}. Worth redrawing to the real slot before it ships.</p>`
      : '';

    const card = document.createElement('div');
    card.className = 'qa-card';
    card.dataset.key = rec.key;
    card.innerHTML = `
      <div class="qa-card-top">
        <div>
          <span class="qa-card-sec">${esc(s.section)}</span>
          <code>${esc(key)}</code>
        </div>
        <button type="button" class="qa-link" data-jump>Scroll to it ↓</button>
      </div>
      ${rec.boards ? `<div class="qa-seg" role="group" aria-label="Which board fills this slot">
        ${rec.boards.map((b) => `<button type="button" data-board="${b}" class="${b === key ? 'is-on' : ''}">${esc(STEPS[b].short)}</button>`).join('')}
      </div><p class="qa-hint">Both boards were drawn for this one slot — flip between them to compare.</p>` : ''}
      <div class="qa-pickrow">
        <button type="button" class="qa-ib" data-step="-1" title="Previous option">‹</button>
        <select aria-label="Option for ${esc(s.section)}">
          ${s.opts.map((x, i) => `<option value="${i}"${i === opt ? ' selected' : ''}>${i === 0 ? 'Live today' : i} · ${esc(x.name)}${i === was ? '  — your pick' : ''}</option>`).join('')}
        </select>
        <button type="button" class="qa-ib" data-step="1" title="Next option">›</button>
      </div>
      ${o.tagline ? `<p class="qa-tagline">${esc(o.tagline)}</p>` : ''}
      ${opt !== was ? `<p class="qa-changed">Changed from <b>${was} · ${esc(s.opts[was].name)}</b> <button type="button" class="qa-link" data-revert>Undo</button></p>` : ''}
      <label class="qa-check"><input type="checkbox" data-live ${state.live[key] ? 'checked' : ''}> Show what is live today instead</label>
      ${warn}
      <textarea data-note rows="2" placeholder="Note for this section — what to fix, colour, timing… (goes into the export)">${esc(state.notes[key] || '')}</textarea>`;

    const sel = card.querySelector('select');
    const setOpt = (i) => {
      state.picks[key] = i;
      if (i === baseOpt(key)) delete state.picks[key];
      saveState(state);
      mount(rec); renderSlots(); renderFoot();
      rec.tag.innerHTML = tagText(rec);
    };
    sel.addEventListener('change', () => setOpt(+sel.value));
    card.querySelectorAll('[data-step]').forEach((b) => b.addEventListener('click', () => {
      const n = s.opts.length;
      setOpt((optOf(state, key) + +b.dataset.step + n) % n);
    }));
    const rv = card.querySelector('[data-revert]');
    if (rv) rv.addEventListener('click', () => setOpt(was));
    card.querySelector('[data-live]').addEventListener('change', (ev) => {
      state.live[key] = ev.target.checked; if (!state.live[key]) delete state.live[key];
      saveState(state); mount(rec); rec.tag.innerHTML = tagText(rec);
    });
    card.querySelector('[data-note]').addEventListener('input', (ev) => {
      const v = ev.target.value;
      if (v.trim()) state.notes[key] = v; else delete state.notes[key];
      saveState(state); renderFoot();
    });
    card.querySelector('[data-jump]').addEventListener('click', () => jumpTo(rec));
    card.querySelectorAll('[data-board]').forEach((b) => b.addEventListener('click', () => {
      state.shared[rec.key] = b.dataset.board; saveState(state);
      mount(rec); renderSlots(); rec.tag.innerHTML = tagText(rec);
    }));
    slotBox.appendChild(card);
  });
}

function renderTheme() {
  renderThemeControls(themeBox, state, (light) => { applyTheme(!light); renderFoot(); });
  if (styleOn()) {
    const n = document.createElement('p');
    n.className = 'qa-hint qa-hint-box';
    n.textContent = `The ${STYLE.name} identity is on for this page, so the site-wide colour below applies everywhere else. Switch the identity off to preview it here.`;
    themeBox.prepend(n);
  }
  renderIdent();
}

function renderIdent() {
  if (!identBox) return;
  const on = styleOn();
  identBox.innerHTML = `
    <div class="qa-ident${on ? ' is-on' : ''}">
      <span class="qa-sw-dots qa-ident-dots">${STYLE.sw.map((c) => `<i style="background:${c}"></i>`).join('')}</span>
      <span class="qa-ident-t"><b>${esc(STYLE.name)}</b><span>${esc(STYLE.note)}</span></span>
    </div>
    <label class="qa-check"><input type="checkbox" data-ident ${on ? 'checked' : ''}> Use this identity on ${esc(PAGE.title.replace(' — redesign', ''))}</label>`;
  identBox.querySelector('[data-ident]').addEventListener('change', (e) => {
    if (e.target.checked) delete state.pageStyle[STYLE_KEY]; else state.pageStyle[STYLE_KEY] = false;
    saveState(state); applyTheme(); renderFoot();
  });
}

function renderFoot() {
  const changed = Object.keys(state.picks).length;
  const notes = Object.keys(state.notes).length;
  footBox.innerHTML = `
    <p class="qa-foot-sum">${changed ? `<b>${changed}</b> change${changed > 1 ? 's' : ''}` : 'No changes'} since /choice${notes ? ` · <b>${notes}</b> note${notes > 1 ? 's' : ''}` : ''}<br><span>${esc(themeLabel(state))}</span></p>
    <div class="qa-foot-btns">
      <button type="button" class="qa-btn is-main" data-copy>Copy for Computer</button>
      <button type="button" class="qa-btn" data-reset title="Back to the picks in your /choice file">Reset</button>
    </div>`;
  footBox.querySelector('[data-copy]').addEventListener('click', copyExport);
  footBox.querySelector('[data-reset]').addEventListener('click', () => {
    if (!confirm('Reset every pick and note back to your /choice selections? The colour theme is kept.')) return;
    resetPicks(state); recs.forEach(mount); renderSlots(); renderFoot(); recs.forEach((r) => { r.tag.innerHTML = tagText(r); });
  });
}

async function copyExport() {
  const md = exportMD(state);
  try { await navigator.clipboard.writeText(md); toast('Copied — paste it into the chat'); }
  catch {
    const ta = document.createElement('textarea'); ta.value = md; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast('Copied — paste it into the chat'); } catch { toast('Copy failed — use the hub page'); }
    ta.remove();
  }
}

let tt = 0;
function toast(msg) {
  const t = ui.querySelector('#qa-toast');
  t.textContent = msg; t.hidden = false;
  clearTimeout(tt); tt = setTimeout(() => { t.hidden = true; }, 2200);
}

function jumpTo(rec, smooth = true) {
  const r = rec.el.getBoundingClientRect();
  window.scrollTo({ top: r.top + window.scrollY - Math.max(90, (window.innerHeight - r.height) / 2), behavior: smooth ? 'smooth' : 'auto' });
  rec.el.classList.remove('qa-flash'); void rec.el.offsetWidth; rec.el.classList.add('qa-flash');
}

function openCard(rec) {
  state.drawer = true; saveState(state); syncChrome();
  const c = slotBox.querySelector(`[data-key="${rec.key}"]`);
  if (c) { c.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); c.classList.remove('qa-flash'); void c.offsetWidth; c.classList.add('qa-flash'); }
}

/* ── Boot ──────────────────────────────────────────────────────────── */

async function boot() {
  /* ?bare — the page with its picks but none of the QA chrome; used as the
     backdrop behind the modal builder */
  if (new URLSearchParams(location.search).has('bare')) document.body.classList.add('qa-bare');
  await loadBase();
  state = loadState();

  /* The hub's own floating "Revisions" review widget is a tool on the
     source site, not part of the product — leave it out of the capture. */
  document.querySelectorAll('.lucide-list-checks').forEach((svg) => {
    let e = svg;
    while (e && e !== document.body && getComputedStyle(e).position !== 'fixed') e = e.parentElement;
    if (e && e !== document.body) e.remove();
  });

  buildUI();
  /* the support badge, KB and compatibility modals work on every page */
  import('./support/boot.js');

  /* The capture keeps the live page's links, rewritten to /qa. Links to
     pages that are not part of the review land on the hub. */
  document.querySelectorAll('[data-qa-slot]').forEach((el) => {
    const key = el.dataset.qaSlot;
    const def = PAGE.slots.find((s) => s.key === key);
    if (!def) return;
    const rec = {
      key, el, w: def.w, h: def.h, boards: def.boards || null,
      orig: el.innerHTML, origHeight: el.style.height, cleanup: null,
      isIcon: key === 'aloha', hero: !!def.hero, pillHost: null,
    };
    if (rec.hero) rec.sibs = [...el.parentElement.children].filter((n) => n !== el);
    /* the Why-choose card floats its own chips beside the scene's wrapper;
       they belong to what ships today, so they go while a proposal shows */
    if (def.hideUp) { const up = el.parentElement; rec.sibs = [...up.parentElement.children].filter((n) => n !== up); }
    el.id = el.id || `qa-${key}`;
    const tag = document.createElement('button');
    tag.type = 'button';
    tag.className = 'qa-tag';
    tag.addEventListener('click', () => openCard(rec));
    layer.appendChild(tag);
    rec.tag = tag;
    recs.push(rec);
  });
  /* site order, top to bottom, so the drawer reads like the page */
  recs.sort((a, b) => a.el.getBoundingClientRect().top - b.el.getBoundingClientRect().top);
  recs.forEach((r) => { mount(r); r.tag.innerHTML = tagText(r); });

  syncChrome();
  renderSlots();
  watchMutations(document.body, () => map, (el) => !!(el.closest && el.closest('[data-qa-slot]')));
  await applyTheme();
  renderFoot();
  layoutTags();

  let rz = 0;
  window.addEventListener('resize', () => {
    clearTimeout(rz);
    rz = setTimeout(() => { recs.forEach(fitSlot); layoutTags(); }, 120);
  });
  new ResizeObserver(() => layoutTags()).observe(document.body);
  window.addEventListener('load', layoutTags);

  document.addEventListener('keydown', (e) => {
    if (e.target.matches && e.target.matches('input, textarea, select')) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'q' || e.key === 'Q') act('drawer');
    if (e.key === 'o' || e.key === 'O') act('outline');
  });

  /* /qa/home#qa-homewhy lands on that slot */
  const h = location.hash.replace('#qa-', '');
  const target = recs.find((r) => r.key === h || (r.boards && r.boards.includes(h)));
  if (target) {
    if (target.boards && target.boards.includes(h)) { state.shared[target.key] = h; saveState(state); mount(target); renderSlots(); target.tag.innerHTML = tagText(target); }
    setTimeout(() => { jumpTo(target, false); openCard(target); }, 250);
  }
}

boot();
