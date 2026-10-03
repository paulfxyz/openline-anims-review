/* ══════════════════════════════════════════════════════════════════════
   /qa core — shared by the hub (index) and every in-context page.

   Reads the same registry as the review boards and /choice (BOARDS,
   VARIANTS, ICONS), so an option edited at the root shows up here with no
   copy to drift. Importing boards.js renders its overview as a side effect,
   which is why every /qa page carries the four hidden hosts it reaches for.
   ══════════════════════════════════════════════════════════════════════ */

import { BOARDS } from '/js/boards.js';
import { VARIANTS } from '/js/registry.js';
import { ICONS } from '/js/icons.js';
import { PRESETS, makeMapper, recolor } from './recolor.js';

export { PRESETS, makeMapper, recolor };

/* ── Pages, in site order, with the slots measured on the live site ── */

/* Sizes are what each slot measures at 1440px on openline-revisions-hub.
   `boards` lists every board that targets a slot — the blog hero is the
   only slot two boards were drawn for. */
export const PAGES = [
  { slug: 'home', title: 'Home', path: '/home', slots: [
    { key: 'homewhy', w: 407, h: 302, hideUp: true }, { key: 'referral', w: 576, h: 520, clear: true }] },
  { slug: 'multiple-tier1', title: 'Multiple Tier-1', path: '/multiple-tier1', slots: [
    { key: 'tier1', hero: true, w: 576, h: 420 }, { key: 't1ai', w: 584, h: 560 },
    { key: 't1market', w: 584, h: 440 }, { key: 't1access', w: 584, h: 470 }] },
  { slug: 'global-esim', title: 'Global eSIM', path: '/global-esim', slots: [
    { key: 'what', w: 584, h: 420 }, { key: 'travel', w: 584, h: 520 }] },
  { slug: 'network', title: 'Network', path: '/network', group: 'Features', slots: [
    { key: 'nethero', hero: true, w: 576, h: 420 }, { key: 'why', w: 592, h: 430 }] },
  { slug: 'security', title: 'Security', path: '/security', group: 'Features', slots: [] },
  { slug: 'adblocking', title: 'AdBlocking', path: '/adblocking', group: 'Features', slots: [] },
  { slug: 'unlimited', title: 'Unlimited', path: '/unlimited', group: 'Features', slots: [] },
  { slug: 'business', title: 'Business', path: '/business', slots: [
    { key: 'bizhero', w: 576, h: 560 }, { key: 'bizneeds', w: 584, h: 440 }] },
  { slug: 'hospitality', title: 'Hospitality', path: '/hospitality', slots: [
    { key: 'hosp', hero: true, w: 576, h: 420 }] },
  { slug: 'iot', title: 'IoT', path: '/iot', slots: [
    { key: 'iotwide', w: 740, h: 234 }, { key: 'iotchip', w: 360, h: 234 }, { key: 'iotdark', w: 740, h: 234 }] },
  { slug: 'openline-plus', title: 'Openline+', path: '/openline-plus', slots: [
    { key: 'pluslounge', w: 574, h: 642 }, { key: 'plusnomad', w: 574, h: 656 }, { key: 'pluskyc', w: 574, h: 440 }] },
  { slug: 'login', title: 'Login', path: '/login', slots: [
    { key: 'aloha', w: 56, h: 56 }] },
  { slug: 'about', title: 'About', path: '/about', redesign: 'about-redesign', slots: [
    { key: 'prin', w: 592, h: 430 }, { key: 'team', w: 592, h: 480 }] },
  { slug: 'about-redesign', title: 'About — redesign', path: '/about', redesignOf: 'about', slots: [
    { key: 'prin', w: 592, h: 430 }, { key: 'team', w: 592, h: 480 }] },
  { slug: 'omdm-market', title: 'OMDM Market', path: '/omdm-market', slots: [
    { key: 'omhero', w: 576, h: 460 }, { key: 'ombook', w: 1232, h: 404 }, { key: 'omctrl', w: 624, h: 440 }] },
  { slug: 'blog', title: 'Blog', path: '/blog', slots: [
    { key: 'blog', w: 576, h: 540, boards: ['blog', 'blogv'] }] },
  { slug: 'installation-guide', title: 'Installation Guide', path: '/installation-guide', slots: [
    { key: 'install', w: 576, h: 324 }] },
  { slug: 'contact', title: 'Contact', path: '/contact', redesign: 'contact-redesign', slots: [
    { key: 'contact', hero: true, w: 576, h: 420, clearFill: true }] },
  { slug: 'contact-redesign', title: 'Contact — redesign', path: '/contact', redesignOf: 'contact', slots: [
    { key: 'contact', w: 576, h: 420 }] },
  { slug: 'affiliate', title: 'Affiliate', path: '/affiliate', slots: [
    { key: 'affil', hero: true, w: 576, h: 420, clearFill: true }] },
];

export const pageOf = (key) => PAGES.find((p) => !p.redesignOf && p.slots.some((s) => (s.boards || [s.key]).includes(key)));

/* ── Page identities ───────────────────────────────────────────────── */

/* A page identity is a colour (and sometimes a type) treatment proposed for
   one page. It applies to the captured page AND the animations on it, and
   while it is on it takes precedence over the site-wide theme. */
export const PAGE_STYLES = {
  network: { id: 'ps-network', name: 'Corporate blue', hex: '#1E40AF', scope: 'all', keepStatus: true, ink: 264, inkC: 0.07,
    sw: ['#1E3A8A', '#1E40AF', '#2563EB'],
    note: 'Royal blue accents over navy ink: dark blue for depth, royal blue for action, corporate rather than consumer.' },
  security: { id: 'ps-security', name: 'Vault teal', hex: '#0F766E', scope: 'all', keepStatus: true, ink: 190, inkC: 0.05,
    sw: ['#134E4A', '#0F766E', '#14B8A6'],
    note: 'Deep teal: protective and calm, clearly apart from the green used for "connected" states.' },
  adblocking: { id: 'ps-adblocking', name: 'Ultraviolet', hex: '#6D28D9', scope: 'all', keepStatus: true, ink: 292, inkC: 0.05,
    sw: ['#4C1D95', '#6D28D9', '#8B5CF6'],
    note: 'Ultraviolet: filtering and shielding, distinct from every other Features page.' },
  unlimited: { id: 'ps-unlimited', name: 'Hot magenta', hex: '#DB2777', scope: 'all', keepStatus: true, ink: 350, inkC: 0.04,
    sw: ['#831843', '#DB2777', '#F472B6'],
    note: 'Hot magenta: energy and abundance for the no-limits page.' },
  iot: { id: 'ps-iot', name: 'Chrome', hex: '#6B7280', scope: 'families', families: ['purple', 'indigo'], floor: 0.012,
    chroma: 0.06, keepStatus: true, sheen: true, selected: true,
    sw: ['#1F2329', '#6B7280', '#D1D5DB'],
    note: 'Selected. Greyscale like the rest of the page: the purple accents become steel and graphite, the dark cell a neutral gunmetal. Green "online" states and the orange brand stay.' },
  blog: { id: 'ps-blog', name: 'Newsprint', hex: '#111111', scope: 'all', chroma: 0, keepStatus: false, cls: 'qa-journal',
    sw: ['#111111', '#6B6B6B', '#FBFAF7'],
    note: 'Black and white, serif headlines, square corners, no drop shadows — an editorial voice for the blog.' },
};

export const styleFor = (slug) => PAGE_STYLES[slug.replace('-redesign', '')] || null;

/* ── Boards, normalised exactly like /choice does ──────────────────── */

export const STEPS = {};
BOARDS.forEach((b) => {
  let opts;
  if (b.special === 'icons') {
    opts = ICONS.map((ic) => ({ id: ic.id, name: ic.name, family: ic.family, tagline: '', desc: ic.note || '',
      pros: [], cons: [], svg: (uid) => ic.svg(uid), isIcon: true }));
  } else {
    const src = b.special === 'tier1' ? VARIANTS : b.variants || [];
    opts = src.map((v) => ({ id: v.id, name: v.name, family: v.family, tagline: v.tagline || '', desc: v.desc || '',
      pros: v.pros || [], cons: v.cons || [], build: (uid) => v.build(uid) }));
  }
  STEPS[b.key] = {
    key: b.key, page: b.page, path: b.path, section: b.section, short: b.short || b.section,
    tone: b.stageTone || (b.cfg && b.cfg.stageTone) || null,
    embed: b.embed || (b.cfg && b.cfg.embed) || { w: 640, h: 460 },
    opts, max: opts.length - 1,
  };
});

/* ── State ─────────────────────────────────────────────────────────── */

const STORE = 'openline-qa-v1';
let BASE = null;   // the selections file Paul exported from /choice

export async function loadBase() {
  if (BASE) return BASE;
  const r = await fetch('/qa/selections.json', { cache: 'no-store' });
  BASE = await r.json();
  return BASE;
}

export function baseOpt(key) { return BASE && BASE.picks[key] ? BASE.picks[key].opt : 0; }

export function loadState() {
  let s = {};
  try { s = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch { s = {}; }
  s.picks = s.picks || {};
  s.notes = s.notes || {};
  s.live = s.live || {};
  s.shared = s.shared || {};
  s.pageStyle = s.pageStyle || {};   // slug -> false when switched off
  /* a newly selected identity starts on, even if it was switched off while
     it was still a proposal */
  s.selSeen = s.selSeen || {};
  Object.keys(PAGE_STYLES).forEach((k) => {
    if (PAGE_STYLES[k].selected && !s.selSeen[k]) { delete s.pageStyle[k]; s.selSeen[k] = 1; }
  });
  s.theme = s.theme || { id: 'original' };
  if (s.outline == null) s.outline = true;
  if (s.drawer == null) s.drawer = false;   // closed: hero slots sit on the right
  return s;
}

export function saveState(s) { localStorage.setItem(STORE, JSON.stringify(s)); }

export const optOf = (state, key) => (state.picks[key] != null ? state.picks[key] : baseOpt(key));

export function resetPicks(state) {
  state.picks = {}; state.notes = {}; state.live = {};
  /* identities Paul has selected come back on with the picks */
  Object.keys(PAGE_STYLES).forEach((k) => { if (PAGE_STYLES[k].selected) delete state.pageStyle[k]; });
  saveState(state);
}

/* ── Theme ─────────────────────────────────────────────────────────── */

export function themeObj(state) {
  const t = state.theme || { id: 'original' };
  if (t.id === 'custom') return { id: 'custom', name: 'Custom', hex: t.hex, scope: t.scope || 'all', keepStatus: t.keepStatus !== false };
  const p = PRESETS.find((x) => x.id === t.id) || PRESETS[0];
  return { ...p, scope: t.scope || p.scope, keepStatus: t.keepStatus != null ? t.keepStatus : p.keepStatus };
}

export function themeLabel(state) {
  const t = themeObj(state);
  if (t.id === 'original') return 'As shipped (no recolour)';
  const bits = [t.name, t.hex ? t.hex.toUpperCase() : '', t.scope === 'brand' ? 'brand orange only' : 'all accents',
    t.keepStatus === false ? 'status colours recoloured' : 'green/red/amber status kept'];
  return bits.filter(Boolean).join(' · ');
}

/* ── Render one option to an HTML string ───────────────────────────── */

let seq = 0;
export function renderOption(key, opt) {
  const s = STEPS[key];
  const o = s.opts[opt] || s.opts[0];
  const uid = `qa-${key}-${o.id}-${++seq}`;
  if (o.isIcon) return { html: `<span class="qa-ic">${o.svg(uid)}</span>`, init: null, pills: [], o };
  const built = o.build(uid);
  return { html: built.svg, init: built.init || null, pills: built.pills || [], o };
}

/* ── Export ────────────────────────────────────────────────────────── */

const pad = (n) => String(n).padStart(2, '0');
const stamp = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`; };

export function exportMD(state) {
  const order = PAGES.filter((p) => !p.redesignOf).flatMap((p) => p.slots.flatMap((sl) => sl.boards || [sl.key]));
  const rows = [];
  const picks = {};
  let changed = 0;
  order.forEach((key) => {
    const s = STEPS[key];
    if (!s) return;
    const opt = optOf(state, key);
    const o = s.opts[opt];
    const was = baseOpt(key);
    const diff = opt !== was;
    if (diff) changed++;
    const note = (state.notes[key] || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
    rows.push(`| ${s.page} | ${s.section} | \`${key}\` | ${opt} · ${o.name} | ${diff ? `was ${was}` : ''} | ${note} |`);
    picks[key] = { opt, name: o.name, note: state.notes[key] || '' };
  });
  const t = themeObj(state);
  return [
    '# Openline QA — selections in context',
    '',
    `Exported ${stamp()} from /qa · ${changed} change${changed === 1 ? '' : 's'} since the /choice file`,
    '',
    `**Colour theme:** ${themeLabel(state)}`,
    '',
    `**Page identities:** ${Object.entries(PAGE_STYLES).map(([k, v]) => `${k} → ${v.name}${v.selected ? ' (selected)' : ''}${state.pageStyle[k] === false ? ' (off)' : ''}`).join(' · ')}`,
    '',
    '| Page | Section | Board | Choice | Changed | Note |',
    '| --- | --- | --- | --- | --- | --- |',
    ...rows,
    '',
    '<!-- machine-readable, do not edit by hand',
    JSON.stringify({ v: 2, src: 'qa', at: stamp(), pageStyles: Object.fromEntries(Object.keys(PAGE_STYLES).map((k) => [k, state.pageStyle[k] !== false])), theme: { id: t.id, hex: t.hex || null, scope: t.scope || null, keepStatus: t.keepStatus !== false }, picks }),
    '-->',
    '',
  ].join('\n');
}

export const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
