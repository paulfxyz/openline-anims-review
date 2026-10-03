/* /qa — the hub: every page, every pick as a live thumbnail, the shared
   colour theme and the export. */

import {
  PAGES, STEPS, loadBase, loadState, saveState, optOf, baseOpt, resetPicks,
  themeObj, themeLabel, renderOption, exportMD, makeMapper, esc, styleFor,
} from './core.js';
import { paintTree, watchMutations, chromeSheen } from './paint.js';
import { renderThemeControls } from './themeui.js';
import { QA_CHANGES, changesForPage, changeCards } from './change-log.js';

const TONE_BG = {
  dark: 'linear-gradient(135deg, #1A1526, #0D0B14 50%, #241A38)',
  plus: 'linear-gradient(160deg, #2A1A18, #131826 45%, #241A16)',
  orange: 'linear-gradient(135deg, #FF5314, #F0651F 55%, #FF8A4C)',
  plusgreen: 'linear-gradient(160deg, #122A1F, #131826 45%, #102A20)',
};

let state;
let map = null;

const pagesBox = document.getElementById('hb-pages');
const themeBox = document.getElementById('hb-theme');
const mdBox = document.getElementById('hb-md');

function thumb(key) {
  const s = STEPS[key];
  const opt = optOf(state, key);
  const r = renderOption(key, opt);
  const o = s.opts[opt];
  if (o.isIcon) {
    return `<span class="hb-frame is-ic"><span class="hb-icbadge"><span class="hb-ic">${r.html}</span></span></span>`;
  }
  const bg = s.tone ? `background:${TONE_BG[s.tone]};` : '';
  return `<span class="hb-frame" style="--cyan:#06B6D4;--cyan-deep:#0891B2;--ink:#0B0B0F;${bg}"><span class="qa-mount">${r.html}</span></span>`;
}

function renderPages() {
  let total = 0, changed = 0;
  const href = (slug) => `/qa/${slug}`;
  pagesBox.innerHTML = PAGES.filter((p) => !p.redesignOf).map((p, pi) => {
    const keys = p.slots.flatMap((sl) => sl.boards || [sl.key]);
    total += keys.length;
    const st = styleFor(p.slug);
    const stOn = st && state.pageStyle[p.slug] !== false;
    const items = keys.map((key) => {
      const s = STEPS[key];
      const opt = optOf(state, key);
      const ch = opt !== baseOpt(key);
      if (ch) changed++;
      const note = state.notes[key];
      return `<a class="hb-pick" href="${href(p.slug)}#qa-${key}">
        ${thumb(key)}
        <span class="hb-pmeta">
          <span class="hb-psec">${esc(s.section)}</span>
          <span class="hb-pname"><b>${opt === 0 ? 'LIVE' : opt}</b>${esc(s.opts[opt].name)}</span>
          ${ch ? `<span class="hb-flag">changed from ${baseOpt(key)}</span>` : ''}
          ${note ? `<span class="hb-note">“${esc(note)}”</span>` : ''}
        </span>
      </a>`;
    }).join('');
    const ident = st ? `<span class="hb-ident${stOn ? '' : ' is-off'}" title="${esc(st.note)}">
      <span class="qa-sw-dots">${st.sw.map((c) => `<i style="background:${c}"></i>`).join('')}</span>${esc(st.name)}${st.selected ? ' · selected' : ''}${stOn ? '' : ' · off'}</span>` : '';
    return `<article class="hb-page" data-slug="${p.slug}">
      <div class="hb-pagehead">
        <span class="hb-pn">${String(pi + 1).padStart(2, '0')}</span>
        <a class="hb-pt" href="${href(p.slug)}"><b>${esc(p.title)}</b><code>${esc(p.path)}</code>${p.group ? `<small>${esc(p.group)}</small>` : ''}</a>
        ${ident}
        ${p.redesign ? `<a class="hb-open is-alt" href="${href(p.redesign)}">Redesign →</a>` : ''}
        <a class="hb-open" href="${href(p.slug)}">Open page →</a>
      </div>
      ${items ? `<div class="hb-picks">${items}</div>`
        : `<p class="hb-empty">No animation board on this page — it is here for its page identity. Every animation already on it is recoloured with the page.</p>`}
    </article>`;
  }).join('');
  document.getElementById('hb-count').textContent =
    `${PAGES.filter((p) => !p.redesignOf).length} pages + ${PAGES.filter((p) => p.redesignOf).length} redesigns · ${total} picks${changed ? ` · ${changed} changed since /choice` : ''}`;
  paintPages();
}

/* each page card is painted with that page's identity when it has one,
   so the thumbnails match what the page itself will show */
function paintPages() {
  const global = makeMapper(themeObj(state));
  pagesBox.querySelectorAll('.hb-page').forEach((art) => {
    const st = styleFor(art.dataset.slug);
    const on = st && state.pageStyle[art.dataset.slug] !== false;
    const m = on ? makeMapper(st) : global;
    if (on && st.sheen) chromeSheen(art.querySelector('.hb-picks') || art);
    paintTree(art.querySelector('.hb-picks') || art, m);
  });
}

function renderTheme() {
  renderThemeControls(themeBox, state, (light) => { applyTheme(); if (!light) renderTheme(); renderExport(); });
}

function applyTheme() {
  map = makeMapper(themeObj(state));
  paintPages();
}

function renderExport() {
  mdBox.value = exportMD(state);
  document.getElementById('hb-kick').textContent = `${themeLabel(state)}`;
}

function renderChanges() {
  const select = document.getElementById('hb-changes-page');
  const note = document.getElementById('hb-page-note');
  const refresh = () => {
    const slug = select.value;
    document.getElementById('hb-changes-list').innerHTML = changeCards(slug === 'all' ? QA_CHANGES : changesForPage(slug));
    document.getElementById('hb-changes-count').textContent = `${QA_CHANGES.length} recorded refinements, separate from animation selections`;
    note.parentElement.hidden = slug === 'all';
    note.value = state.pageNotes[slug] || '';
  };
  select.innerHTML = '<option value="all">All /qa changes</option>' + [...PAGES, ...['start','modals','chat','kb'].map(slug => ({slug,title:slug === 'start' ? 'Purchase code → eSIM' : slug === 'modals' ? 'Modal builder' : slug === 'chat' ? 'Support chat' : 'Help modals'}))].map(p => `<option value="${p.slug}">${esc(p.title)}</option>`).join('');
  select.addEventListener('change', refresh);
  note.addEventListener('input', () => {
    if (note.value.trim()) state.pageNotes[select.value] = note.value; else delete state.pageNotes[select.value];
    saveState(state); renderExport();
  });
  refresh();
}

let tt = 0;
function toast(m) {
  const t = document.getElementById('hb-toast');
  t.textContent = m; t.hidden = false; clearTimeout(tt); tt = setTimeout(() => { t.hidden = true; }, 2200);
}

async function boot() {
  await loadBase();
  state = loadState();
  renderTheme();
  applyTheme();
  renderPages();
  renderExport();
  renderChanges();
  watchMutations(pagesBox, () => map);

  document.getElementById('hb-copy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(mdBox.value); }
    catch { mdBox.select(); document.execCommand('copy'); }
    toast('Copied — paste it into the chat');
  });
  document.getElementById('hb-reset').addEventListener('click', () => {
    if (!confirm('Reset animation picks and their section notes to /choice? Page-level notes, recorded refinements and the colour theme are kept. Selected identities return to their default.')) return;
    resetPicks(state); renderPages(); renderExport();
  });
  /* coming back from a page: reflect anything changed there */
  window.addEventListener('pageshow', (e) => { if (e.persisted) { state = loadState(); renderTheme(); applyTheme(); renderPages(); renderExport(); } });
  void saveState;
}

boot();
