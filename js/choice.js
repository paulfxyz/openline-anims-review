/* ══════════════════════════════════════════════════════════════════════
   /choice — walk every board, pick one option per board, export the result.

   Reads the SAME registry the review boards use, so it can never drift out
   of sync with them: BOARDS from boards.js, VARIANTS from registry.js for
   the tier1 hero, ICONS from icons.js for the Aloha badge. Nothing about
   the options is restated here.

   Importing boards.js runs its overview render as a side effect, which is
   why choice.html carries the four hidden hosts it reaches for.
   ══════════════════════════════════════════════════════════════════════ */

import { BOARDS } from './boards.js';
import { VARIANTS } from './registry.js';
import { ICONS } from './icons.js';

const STORE = 'openline-choice-v1';

/* ── Normalise the three board shapes into one list ────────────────── */

/* A board is either: a plain `variants` array, the tier1 hero (options live
   in registry.js), or the Aloha icon set (different build signature). */
const STEPS = BOARDS.map((b) => {
  let opts;
  if (b.special === 'icons') {
    opts = ICONS.map((ic) => ({
      id: ic.id, name: ic.name, family: ic.family,
      tagline: '', desc: ic.note || '',
      svg: (uid) => ic.svg(uid), isIcon: true,
    }));
  } else {
    const src = b.special === 'tier1' ? VARIANTS : b.variants || [];
    opts = src.map((v) => ({
      id: v.id, name: v.name, family: v.family,
      tagline: v.tagline || '', desc: v.desc || '',
      build: (uid) => v.build(uid),
    }));
  }
  return {
    key: b.key, page: b.page, section: b.section, path: b.path,
    problem: b.problem || '', accent: b.accent,
    /* stageTone sits at board level on some boards and inside cfg on others
       (referral only has it in cfg) - read both or dark options render on
       white and lose all their contrast. */
    tone: b.stageTone || (b.cfg && b.cfg.stageTone) || null,
    opts,                        // index 0 is always what ships today
    max: opts.length - 1,        // highest pickable option number
  };
});

/* ── State ─────────────────────────────────────────────────────────── */

let picks = {};     // key -> { opt: number|'skip', note: string }
let at = 0;         // index into STEPS, or STEPS.length for the summary
let cleanups = [];  // init() teardowns for the board currently on screen

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE) || '{}');
    picks = raw.picks && typeof raw.picks === 'object' ? raw.picks : {};
    at = Number.isInteger(raw.at) ? Math.min(Math.max(raw.at, 0), STEPS.length) : 0;
  } catch { picks = {}; at = 0; }
}
function save() {
  try { localStorage.setItem(STORE, JSON.stringify({ picks, at, v: 1 })); } catch { /* private mode */ }
}

const decided = () => STEPS.filter((s) => picks[s.key] && picks[s.key].opt !== undefined).length;
const chosenCount = () => STEPS.filter((s) => picks[s.key] && typeof picks[s.key].opt === 'number').length;

/* ── Elements ──────────────────────────────────────────────────────── */

const railEl = document.getElementById('ch-rail');
const mainEl = document.getElementById('ch-main');
const barEl = document.getElementById('ch-bar');
const countEl = document.getElementById('ch-count');

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ── Left rail ─────────────────────────────────────────────────────── */

function renderRail() {
  let lastPage = null;
  railEl.innerHTML = STEPS.map((s, i) => {
    const p = picks[s.key];
    /* The badge shows the CHOSEN option number, never the board's position:
       a rail full of 1..29 reads as a column of picks and is badly
       misleading on a page whose whole job is picking numbers. */
    const decidedOpt = p && p.opt !== undefined;
    const mark = !decidedOpt ? '·' : p.opt === 'skip' ? '–' : p.opt;
    const head = s.page !== lastPage ? `<div class="ch-railpage">${esc(s.page)}</div>` : '';
    lastPage = s.page;
    const cls = ['ch-railrow', i === at ? 'is-at' : '',
      decidedOpt ? (p.opt === 'skip' ? 'is-skip' : 'is-done') : ''].filter(Boolean).join(' ');
    const title = decidedOpt && p.opt !== 'skip' ? ` title="Option ${p.opt} · ${esc(s.opts[p.opt].name)}"` : '';
    return `${head}<button class="${cls}"${title} data-go="${i}">
      <span class="ch-railn">${mark}</span>
      <span class="ch-rails">${esc(s.section)}</span>
    </button>`;
  }).join('') + `<button class="ch-railrow ch-railsum${at === STEPS.length ? ' is-at' : ''}" data-go="${STEPS.length}">
      <span class="ch-railn">✓</span><span class="ch-rails">Summary &amp; export</span>
    </button>`;

  railEl.querySelectorAll('[data-go]').forEach((el) => {
    el.onclick = () => { at = +el.dataset.go; save(); render(); };
  });

  const pct = Math.round((decided() / STEPS.length) * 100);
  barEl.style.width = pct + '%';
  countEl.textContent = `${decided()} of ${STEPS.length} decided`;
}

/* ── One board ─────────────────────────────────────────────────────── */

function renderStep() {
  const s = STEPS[at];
  const p = picks[s.key] || {};
  document.documentElement.style.setProperty('--acc', s.accent.main);
  document.documentElement.style.setProperty('--acc-deep', s.accent.deep || s.accent.main);

  mainEl.innerHTML = `
    <div class="ch-head">
      <div class="ch-crumbrow">
        <span class="ch-step">Board ${at + 1} / ${STEPS.length}</span>
        <span class="ch-path">${esc(s.path || '')}</span>
      </div>
      <h1 class="ch-title"><span class="ch-tpage">${esc(s.page)}</span><span class="ch-tsep">›</span>${esc(s.section)}</h1>
      ${s.problem ? `<p class="ch-prob"><span>What's wrong today</span>${esc(s.problem)}</p>` : ''}
      <p class="ch-ask">Pick the one you want shipped — <b>1 to ${s.max}</b>. Option 0 is what's live today; choose it to
        keep the section exactly as it is. Type a number, or click a card.</p>
    </div>

    <div class="ch-grid" id="ch-grid"></div>

    <div class="ch-notewrap">
      <label class="ch-notelab" for="ch-note">Anything to pass on about this section <span>(optional)</span></label>
      <textarea class="ch-note" id="ch-note" rows="2"
        placeholder="e.g. right idea but slow it down, or combine this with option 9">${esc(p.note || '')}</textarea>
    </div>`;

  const grid = document.getElementById('ch-grid');
  cleanups.forEach((fn) => { try { fn(); } catch { /* ignore */ } });
  cleanups = [];

  s.opts.forEach((o, i) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'ch-card' + (p.opt === i ? ' is-picked' : '');
    card.dataset.opt = i;

    /* Each option renders twice across the app (stage + tile), so every
       gradient/filter id inside build() is namespaced by this uid. */
    const uid = `ch-${s.key}-${o.id}`;
    let inner = '';
    let built = null;
    if (o.isIcon) {
      inner = `<span class="ch-ic">${o.svg(uid)}</span>`;
    } else {
      built = o.build(uid);
      inner = built.svg;
    }

    card.innerHTML = `
      <span class="ch-frame${s.tone ? ' tone-' + s.tone : ''}${o.isIcon ? ' is-ic' : ''}">${inner}</span>
      <span class="ch-meta">
        <span class="ch-metatop">
          <span class="ch-num${i === 0 ? ' is-live' : ''}">${i === 0 ? 'LIVE' : i}</span>
          <span class="ch-fam">${esc(o.family || '')}</span>
          ${p.opt === i ? '<span class="ch-flag">YOUR PICK</span>' : ''}
        </span>
        <span class="ch-name">${esc(o.name)}</span>
        ${o.tagline ? `<span class="ch-tag">${esc(o.tagline)}</span>` : ''}
        <span class="ch-desc">${esc(o.desc)}</span>
      </span>`;

    card.onclick = () => choose(i);
    grid.appendChild(card);
    if (built && built.init) {
      const c = built.init(card);
      if (typeof c === 'function') cleanups.push(c);
    }
  });

  document.getElementById('ch-note').addEventListener('input', (e) => {
    picks[s.key] = Object.assign({}, picks[s.key], { note: e.target.value });
    if (picks[s.key].opt === undefined) delete picks[s.key].opt;
    save();
  });

  renderFoot(s, p);
}

function renderFoot(s, p) {
  const foot = document.getElementById('ch-foot');
  const label = p.opt === undefined ? 'Nothing picked yet'
    : p.opt === 'skip' ? 'Skipped — no preference'
      : `Option ${p.opt} · ${s.opts[p.opt].name}`;
  foot.innerHTML = `
    <span class="ch-sel${p.opt === undefined ? ' is-empty' : ''}">${esc(label)}</span>
    <span class="ch-footbtns">
      <button class="ch-btn" data-act="prev"${at === 0 ? ' disabled' : ''}>← Back</button>
      <button class="ch-btn" data-act="skip">No preference</button>
      <button class="ch-btn is-primary" data-act="next">${at === STEPS.length - 1 ? 'Finish →' : 'Next →'}</button>
    </span>`;
  foot.hidden = false;
  foot.querySelectorAll('[data-act]').forEach((b) => {
    b.onclick = () => {
      const a = b.dataset.act;
      if (a === 'prev') at = Math.max(0, at - 1);
      else if (a === 'next') at = Math.min(STEPS.length, at + 1);
      else if (a === 'skip') {
        picks[s.key] = Object.assign({}, picks[s.key], { opt: 'skip' });
        at = Math.min(STEPS.length, at + 1);
      }
      save(); render();
    };
  });
}

function choose(i) {
  const s = STEPS[at];
  picks[s.key] = Object.assign({}, picks[s.key], { opt: i });
  save();
  /* Re-flag in place rather than rebuilding: a rebuild would restart every
     animation on the board and lose the viewer's place. */
  document.querySelectorAll('#ch-grid .ch-card').forEach((c) => {
    const on = +c.dataset.opt === i;
    c.classList.toggle('is-picked', on);
    const flag = c.querySelector('.ch-flag');
    if (on && !flag) c.querySelector('.ch-metatop').insertAdjacentHTML('beforeend', '<span class="ch-flag">YOUR PICK</span>');
    if (!on && flag) flag.remove();
  });
  renderFoot(s, picks[s.key]);
  renderRail();
}

/* ── Summary + export ──────────────────────────────────────────────── */

function buildMarkdown() {
  const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
  const rows = STEPS.map((s) => {
    const p = picks[s.key] || {};
    const opt = p.opt;
    const name = typeof opt === 'number' ? s.opts[opt].name : '';
    const val = opt === undefined ? '—' : opt === 'skip' ? 'no preference' : `${opt} · ${name}`;
    return `| ${s.page} | ${s.section} | \`${s.key}\` | ${val} | ${(p.note || '').replace(/\|/g, '\\|').replace(/\n/g, ' ')} |`;
  });
  const undecided = STEPS.filter((s) => !picks[s.key] || picks[s.key].opt === undefined);
  const skipped = STEPS.filter((s) => picks[s.key] && picks[s.key].opt === 'skip');

  return `# Openline animation review — selections

Chosen ${stamp} · ${chosenCount()} of ${STEPS.length} boards have a pick\
${skipped.length ? ` · ${skipped.length} left to me` : ''}\
${undecided.length ? ` · ${undecided.length} still undecided` : ''}

| Page | Section | Board | Choice | Note |
| --- | --- | --- | --- | --- |
${rows.join('\n')}

${undecided.length ? `\n**Still undecided:** ${undecided.map((s) => `${s.page} › ${s.section}`).join(', ')}\n` : ''}\
${skipped.length ? `\n**Your call:** ${skipped.map((s) => `${s.page} › ${s.section}`).join(', ')}\n` : ''}
<!-- machine-readable, do not edit by hand
${JSON.stringify({ v: 1, at: stamp, picks: STEPS.reduce((a, s) => {
    const p = picks[s.key];
    if (p && p.opt !== undefined) a[s.key] = { opt: p.opt, name: typeof p.opt === 'number' ? s.opts[p.opt].name : null, note: p.note || '' };
    return a;
  }, {}) })}
-->
`;
}

function renderSummary() {
  document.documentElement.style.setProperty('--acc', '#0B0B0F');
  document.getElementById('ch-foot').hidden = true;
  const md = buildMarkdown();
  const left = STEPS.length - decided();

  mainEl.innerHTML = `
    <div class="ch-head">
      <span class="ch-step">Summary</span>
      <h1 class="ch-title">Your selections</h1>
      <p class="ch-ask">${chosenCount()} of ${STEPS.length} boards have a pick.
        ${left ? `<b>${left}</b> still undecided — the rail on the left shows which.` : 'Every board is decided.'}
        Copy the block below and paste it back into our conversation.</p>
    </div>

    <div class="ch-sumtable">
      ${STEPS.map((s, i) => {
    const p = picks[s.key] || {};
    const val = p.opt === undefined ? '<em>undecided</em>'
      : p.opt === 'skip' ? '<em>no preference</em>'
        : `<b>${p.opt}</b> · ${esc(s.opts[p.opt].name)}`;
    return `<button class="ch-sumrow${p.opt === undefined ? ' is-open' : ''}" data-go="${i}">
          <span class="ch-sumsec"><span>${esc(s.page)}</span>${esc(s.section)}</span>
          <span class="ch-sumval">${val}</span>
          ${p.note ? `<span class="ch-sumnote">${esc(p.note)}</span>` : ''}
        </button>`;
  }).join('')}
    </div>

    <div class="ch-exp">
      <div class="ch-exphead">
        <span class="ch-expk">Markdown — paste this back to me</span>
        <span class="ch-expbtns">
          <button class="ch-btn" id="ch-dl">Download .md</button>
          <button class="ch-btn is-primary" id="ch-copy">Copy</button>
        </span>
      </div>
      <pre class="ch-pre" id="ch-md">${esc(md)}</pre>
    </div>

    <div class="ch-reset">
      <button class="ch-btn is-danger" id="ch-reset">Clear every selection</button>
      <span>Your picks live in this browser only — nothing is sent anywhere until you paste it.</span>
    </div>`;

  mainEl.querySelectorAll('[data-go]').forEach((el) => {
    el.onclick = () => { at = +el.dataset.go; save(); render(); };
  });

  document.getElementById('ch-copy').onclick = async (e) => {
    const btn = e.currentTarget;
    try {
      await navigator.clipboard.writeText(md);
      btn.textContent = 'Copied ✓';
    } catch {
      /* clipboard refused (insecure origin / permission) — select it so
         cmd-C still works rather than leaving a dead button. */
      const r = document.createRange();
      r.selectNodeContents(document.getElementById('ch-md'));
      const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
      btn.textContent = 'Selected — press ⌘C';
    }
    setTimeout(() => { btn.textContent = 'Copy'; }, 2200);
  };

  document.getElementById('ch-dl').onclick = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([md], { type: 'text/markdown' }));
    a.download = 'openline-selections.md';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  document.getElementById('ch-reset').onclick = () => {
    if (!confirm('Clear all selections and start over?')) return;
    picks = {}; at = 0; save(); render();
  };
}

/* ── Router ────────────────────────────────────────────────────────── */

function render() {
  if (at >= STEPS.length) renderSummary(); else renderStep();
  renderRail();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

/* ── Keyboard: type a number, arrows to move ───────────────────────── */

let typed = '';
let typedAt = 0;

document.addEventListener('keydown', (e) => {
  if (e.target.matches('textarea, input')) return;      // let the note field be
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const s = STEPS[at];

  if (e.key === 'ArrowRight') { at = Math.min(STEPS.length, at + 1); save(); render(); return; }
  if (e.key === 'ArrowLeft') { at = Math.max(0, at - 1); save(); render(); return; }
  if (e.key === 'Enter' && s) { at = Math.min(STEPS.length, at + 1); save(); render(); return; }
  if (!s) return;

  if (/^[0-9]$/.test(e.key)) {
    /* Two-digit options need a moment to finish typing: "1" then "2" is 12,
       but a lone "1" still has to mean 1. Buffer briefly, and commit the
       single digit immediately so nothing feels laggy. */
    const now = Date.now();
    typed = (now - typedAt < 700) ? typed + e.key : e.key;
    typedAt = now;
    const asTwo = parseInt(typed, 10);
    if (typed.length >= 2) {
      if (asTwo <= s.max) { choose(asTwo); flash(asTwo); }
      typed = '';
    } else if (asTwo <= s.max) {
      choose(asTwo); flash(asTwo);
    }
  }
});

function flash(i) {
  const card = document.querySelector(`#ch-grid .ch-card[data-opt="${i}"]`);
  if (!card) return;
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ── Go ────────────────────────────────────────────────────────────── */

load();
render();
