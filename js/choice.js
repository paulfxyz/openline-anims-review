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
      pros: [], cons: [], scores: null,
      svg: (uid) => ic.svg(uid), isIcon: true,
    }));
  } else {
    const src = b.special === 'tier1' ? VARIANTS : b.variants || [];
    opts = src.map((v) => ({
      id: v.id, name: v.name, family: v.family,
      tagline: v.tagline || '', desc: v.desc || '',
      /* only the 1:1 viewer shows these - the grid cards stay as they were */
      pros: v.pros || [], cons: v.cons || [], scores: v.scores || null,
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
    /* The real measured box this section occupies on the live site. Declared
       at board level on some boards and inside cfg on others; board.js falls
       back to 640x460, so match that or the viewer lies about 1:1. */
    embed: b.embed || (b.cfg && b.cfg.embed) || { w: 640, h: 460 },
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
        keep the section exactly as it is. Type a number, or click a card to select it.
        <b>Click the animation itself</b> to open it at full size (${s.embed.w} × ${s.embed.h}).</p>
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
      <span class="ch-frame${s.tone ? ' tone-' + s.tone : ''}${o.isIcon ? ' is-ic' : ''}" data-zoom
        title="Open at full size (${s.embed.w} × ${s.embed.h})">${inner}
        <span class="ch-zoomhint" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7.5 7.5M3 21l7.5-7.5"/>
          </svg>1:1
        </span>
      </span>
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

    /* The artwork opens the 1:1 viewer; everything else on the card still
       picks. stopPropagation keeps the frame click from also selecting. */
    const frame = card.querySelector('[data-zoom]');
    frame.addEventListener('click', (e) => { e.stopPropagation(); e.preventDefault(); openZoom(s, i); });

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
  /* keep the open viewer's pick button honest */
  if (zoomAt) setTimeout(() => { if (zoomAt) paintZoom(); }, 0);
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


/* ══════════════════════════════════════════════════════════════════════
   The 1:1 viewer.

   The grid frames are 16:10 and scale every option down to fit, which is
   fine for choosing between shapes but useless for judging motion, type
   size or fine detail. Clicking the artwork opens it here at exactly the
   box it occupies on the live site — no scaling — so what you see is what
   would ship. The card's text and chrome still select, so the two gestures
   never fight.

   Built fresh on open with its own uid: every option is already on screen
   once behind the modal, and the gradient/clip ids inside build() must not
   collide with that copy.
   ══════════════════════════════════════════════════════════════════════ */

let zoomAt = null;        // { s, i } currently open, or null
let zoomCleanup = null;   // teardown for an option with an init()
let zoomReturn = null;    // element to restore focus to on close

const zoomEl = document.getElementById('ch-zoom');

/* Fit only when the real box will not fit, and say so — a viewer that
   silently shrinks the artwork is lying about being 1:1.

   The space available is MEASURED off the stage wrapper after paint, never
   derived from the window: the wrapper sits inside a 330px side column at
   desktop and a stacked row below 1080px, and guessing those offsets had
   the 1280-wide OMDM board bleeding out under the side panel.

   Fitting resizes the stage rather than transform-scaling it. A transform
   shrinks what you see but leaves the layout box at full width, so the
   column overflowed; the SVG inside carries a viewBox and is width/height
   100%, so resizing the box scales the artwork exactly as cleanly. */
function fitZoomStage() {
  if (!zoomAt) return;
  const stage = zoomEl.querySelector('.zm-stage');
  const wrap = zoomEl.querySelector('.zm-stagewrap');
  if (!stage || !wrap || stage.classList.contains('is-ic')) return;
  const { w, h } = zoomAt.s.embed;
  /* clientWidth/Height INCLUDE the wrapper's padding, so the padding has to
     come off explicitly — using them raw left the widest board 22px under
     the side panel. */
  const cs = getComputedStyle(wrap);
  const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
  const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
  const availW = wrap.clientWidth - padX - 4;
  const availH = wrap.clientHeight - padY - 4;
  const sc = Math.min(1, availW / w, availH / h);
  stage.style.width = `${Math.round(w * sc)}px`;
  stage.style.height = `${Math.round(h * sc)}px`;
  const chip = zoomEl.querySelector('.zm-size');
  if (chip) {
    chip.textContent = `${w} × ${h}${sc < 0.999 ? ` · shown at ${Math.round(sc * 100)}%` : ' · 1:1'}`;
  }
}

function openZoom(s, i) {
  zoomAt = { s, i };
  zoomReturn = document.activeElement;
  document.body.classList.add('is-zoomed');
  paintZoom();
}

function closeZoom() {
  if (!zoomAt) return;
  if (zoomCleanup) { try { zoomCleanup(); } catch { /* ignore */ } zoomCleanup = null; }
  zoomAt = null;
  document.body.classList.remove('is-zoomed');
  zoomEl.hidden = true;
  zoomEl.innerHTML = '';
  if (zoomReturn && zoomReturn.focus) { try { zoomReturn.focus(); } catch { /* ignore */ } }
  zoomReturn = null;
}

function stepZoom(delta) {
  if (!zoomAt) return;
  const { s, i } = zoomAt;
  const n = s.opts.length;
  openZoom(s, (i + delta + n) % n);
}

function paintZoom() {
  const { s, i } = zoomAt;
  const o = s.opts[i];
  const p = picks[s.key] || {};
  const isPicked = p.opt === i;

  if (zoomCleanup) { try { zoomCleanup(); } catch { /* ignore */ } zoomCleanup = null; }

  const { w, h } = s.embed;
  const uid = `zm-${s.key}-${o.id}`;
  let art = '';
  let built = null;
  if (o.isIcon) {
    /* An Aloha badge is 56px in production. Shown at 56px it is honest but
       too small to judge, so the true size leads and a 3x reference sits
       beside it, each labelled for what it is. */
    art = `
      <div class="zm-icons">
        <div class="zm-iconcell">
          <span class="zm-ic" style="width:56px;height:56px">${o.svg(uid + '-a')}</span>
          <span class="zm-iclab">56px — real size</span>
        </div>
        <div class="zm-iconcell">
          <span class="zm-ic" style="width:168px;height:168px">${o.svg(uid + '-b')}</span>
          <span class="zm-iclab">168px — detail reference</span>
        </div>
      </div>`;
  } else {
    built = o.build(uid);
    art = built.svg;
  }

  const scoreRow = o.scores ? `
    <div class="zm-scores">
      ${Object.entries(o.scores).map(([k, v]) => `
        <div class="zm-score">
          <span class="zm-sk">${esc(k)}</span>
          <span class="zm-sbar"><i style="width:${(v / 5) * 100}%"></i></span>
          <span class="zm-sv">${v}</span>
        </div>`).join('')}
    </div>` : '';

  const list = (title, items, cls) => (items && items.length ? `
    <div class="zm-list ${cls}">
      <span class="zm-lt">${title}</span>
      <ul>${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>` : '');

  zoomEl.hidden = false;
  zoomEl.innerHTML = `
    <div class="zm-back" data-close></div>
    <div class="zm-panel" role="dialog" aria-modal="true" aria-label="${esc(o.name)} at full size">
      <div class="zm-bar">
        <span class="zm-num${i === 0 ? ' is-live' : ''}">${i === 0 ? 'LIVE' : i}</span>
        <span class="zm-titles">
          <b>${esc(o.name)}</b>
          <span>${esc(s.page)} › ${esc(s.section)}</span>
        </span>
        <span class="zm-size">${o.isIcon ? '56 × 56 · 1:1' : `${w} × ${h} · 1:1`}</span>
        <span class="zm-nav">
          <button type="button" class="zm-ib" data-prev title="Previous option">‹</button>
          <span class="zm-of">${i} / ${s.max}</span>
          <button type="button" class="zm-ib" data-next title="Next option">›</button>
        </span>
        <button type="button" class="zm-close" data-close title="Close (Esc)">✕</button>
      </div>

      <div class="zm-body">
        <div class="zm-stagewrap">
          <div class="zm-stage${s.tone ? ' tone-' + s.tone : ''}${o.isIcon ? ' is-ic' : ''}"
            style="${o.isIcon ? '' : `width:${w}px;height:${h}px`}">${art}</div>
        </div>

        <aside class="zm-side">
          ${o.family ? `<span class="zm-fam">${esc(o.family)}</span>` : ''}
          ${o.tagline ? `<p class="zm-tag">${esc(o.tagline)}</p>` : ''}
          <p class="zm-desc">${esc(o.desc)}</p>
          ${list('Why it works', o.pros, 'is-pro')}
          ${list('What it costs', o.cons, 'is-con')}
          ${scoreRow}
        </aside>
      </div>

      <div class="zm-foot">
        <span class="zm-hint">Esc to close · ← → for the next option</span>
        <button type="button" class="zm-pick${isPicked ? ' is-on' : ''}" data-pick>
          ${isPicked ? '✓ This is your pick' : i === 0 ? 'Keep it exactly as it is' : `Choose option ${i}`}
        </button>
      </div>
    </div>`;

  fitZoomStage();

  if (built && built.init) {
    const c = built.init(zoomEl.querySelector('.zm-stage'));
    if (typeof c === 'function') zoomCleanup = c;
  }

  zoomEl.querySelectorAll('[data-close]').forEach((el) => { el.onclick = closeZoom; });
  zoomEl.querySelector('[data-prev]').onclick = () => stepZoom(-1);
  zoomEl.querySelector('[data-next]').onclick = () => stepZoom(1);
  zoomEl.querySelector('[data-pick]').onclick = () => {
    choose(i);
    /* repaint so the button reflects the new state without closing - the
       point of the viewer is comparing, and closing on pick would fight that */
    paintZoom();
  };
  const panel = zoomEl.querySelector('.zm-panel');
  if (panel) panel.focus();
}

/* Re-fit on resize: the scale is computed against the viewport, so a window
   change would otherwise leave the artwork cropped or needlessly small. */
let rz = 0;
window.addEventListener('resize', () => {
  if (!zoomAt) return;
  clearTimeout(rz);
  /* re-fit only: a full repaint would restart every animation mid-loop */
  rz = setTimeout(fitZoomStage, 120);
});

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

  /* While the 1:1 viewer is open it owns the keyboard: arrows walk options
     inside the board rather than jumping to the next board, and Esc closes.
     Digits still pick, so you can compare and decide without reaching for
     the mouse. */
  if (zoomAt) {
    if (e.key === 'Escape') { e.preventDefault(); closeZoom(); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); stepZoom(1); return; }
    if (e.key === 'ArrowLeft') { e.preventDefault(); stepZoom(-1); return; }
    /* Anything that is not a digit stops here; digits fall through to the
       picker below so you can decide without leaving the viewer. */
    if (!/^[0-9]$/.test(e.key)) return;
  }

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
