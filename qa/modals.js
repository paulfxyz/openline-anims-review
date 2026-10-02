/* ══════════════════════════════════════════════════════════════════════
   /qa/modals — a builder for Openline modals.

   Everything the preview shows is produced by renderModal(), which returns
   one self-contained HTML string with inline styles and an inline SMIL
   icon. The exact same string is what "Copy HTML" gives you, so the
   preview can never drift from the export.
   ══════════════════════════════════════════════════════════════════════ */

import { ICONS as LIB, GLYPHS, MOTIONS, iconSVG, glyphSVG } from './icons-lib.js';
import { ICONS as ALOHA } from '/js/icons.js';

const STORE = 'openline-qa-modal-v1';
const LOCAL = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const href = (slug) => `/qa/${slug}${LOCAL ? '.html' : ''}?bare`;

/* ── Types ─────────────────────────────────────────────────────────── */

export const TYPES = {
  confirm: { name: 'Confirmation', sub: 'Neutral', c: '#0B0B0F', tint: 'rgba(11,11,15,0.07)', soft: '#F4F4F6', btn: '#0B0B0F', on: '#FFFFFF', icon: 'help:pop' },
  success: { name: 'Success', sub: 'Green', c: '#16A34A', tint: '#DCFCE7', soft: '#F0FDF4', btn: '#16A34A', on: '#FFFFFF', icon: 'check-circle:draw' },
  warning: { name: 'Warning', sub: 'Yellow', c: '#D97706', tint: '#FEF3C7', soft: '#FFFBEB', btn: '#F59E0B', on: '#1F1300', icon: 'alert:pulse' },
  error: { name: 'Error', sub: 'Red', c: '#DC2626', tint: '#FEE2E2', soft: '#FEF2F2', btn: '#DC2626', on: '#FFFFFF', icon: 'x-circle:draw' },
  info: { name: 'Information', sub: 'Blue', c: '#2563EB', tint: '#DBEAFE', soft: '#EFF6FF', btn: '#2563EB', on: '#FFFFFF', icon: 'info:pulse' },
  discount: { name: 'Discount', sub: 'Orange · economy', c: '#FF5314', tint: '#FFE4D6', soft: '#FFF7F3', btn: '#FF5314', on: '#FFFFFF', icon: 'percent:pop' },
  premium: { name: 'Premium', sub: 'Openline+ gold', c: '#B7891A', tint: 'rgba(201,162,39,0.18)', soft: '#FBF7EA', btn: '#0B0B0F', on: '#F5D77A', icon: 'crown:pop' },
  security: { name: 'Security', sub: 'Violet', c: '#7C3AED', tint: '#EDE9FE', soft: '#F5F3FF', btn: '#7C3AED', on: '#FFFFFF', icon: 'shield-check:draw' },
};

const BLOCKS = {
  p: 'Paragraph',
  list: 'Bullet list',
  kv: 'Details (label | value)',
  highlight: 'Highlight box',
  progress: 'Progress bar',
  code: 'Code to copy',
  input: 'Input field',
  note: 'Small note',
};

/* ── Templates (sample copy — every figure is illustrative) ────────── */

const TEMPLATES = [
  { k: 'ready', t: 'eSIM ready', cfg: { type: 'success', icon: 'check-circle:draw', title: 'Your eSIM is ready',
    blocks: [{ type: 'p', text: 'Japan · 10 GB is installed and switches on the moment you land.' },
      { type: 'kv', text: 'Plan | Japan 10 GB\nValid | 30 days from first use\nNetwork | Best available Tier-1' }],
    ctas: 2, primary: 'Open my eSIM', secondary: 'Done' } },
  { k: 'switch', t: 'Switch plan?', cfg: { type: 'confirm', icon: 'refresh:pop', title: 'Switch to the Europe plan?',
    blocks: [{ type: 'p', text: 'Your current plan stays active until midnight, then **Europe 20 GB** starts. Nothing is charged until you confirm.' }],
    ctas: 2, primary: 'Switch plan', secondary: 'Keep current plan' } },
  { k: 'low', t: 'Data running low', cfg: { type: 'warning', icon: 'battery:pulse', title: 'You’ve used 92% of your data',
    blocks: [{ type: 'progress', label: 'Data used', value: 92, text: '9.2 GB of 10 GB' },
      { type: 'p', text: 'At this rate you’ll run out tomorrow afternoon. Top up now and keep the same eSIM — nothing to reinstall.' }],
    ctas: 2, primary: 'Top up 5 GB', secondary: 'Remind me later' } },
  { k: 'failed', t: 'Payment failed', cfg: { type: 'error', icon: 'card:pulse', title: 'Payment didn’t go through',
    blocks: [{ type: 'p', text: 'Your bank declined the charge. No money was taken.' },
      { type: 'list', text: 'Check the card number and expiry date\nTry another card, Apple Pay or Google Pay\nContact your bank if it keeps happening' }],
    ctas: 2, primary: 'Try again', secondary: 'Use another method' } },
  { k: 'roaming', t: 'Turn on roaming', cfg: { type: 'info', icon: 'antenna:pulse', title: 'Leave Data Roaming on',
    blocks: [{ type: 'p', text: 'Openline switches networks for you abroad, so Data Roaming must be on — for this eSIM only. It never touches your main line.' },
      { type: 'note', text: 'Settings › Mobile Data › Openline › Data Roaming' }],
    ctas: 1, primary: 'Got it', secondary: '' } },
  { k: 'promo', t: 'Discount', cfg: { type: 'discount', icon: 'gift:pop', title: '20% off your next trip',
    blocks: [{ type: 'p', text: 'Thanks for travelling with us. Use this code on any plan in the next 7 days.' },
      { type: 'code', label: 'Your code', text: 'TRIP20' },
      { type: 'kv', text: 'Plans from | $3.19\nValid until | 9 October' }],
    ctas: 2, primary: 'Browse plans', secondary: 'Not now' } },
  { k: 'plus', t: 'Openline+', cfg: { type: 'premium', icon: 'crown:pop', title: 'Welcome to Openline+',
    blocks: [{ type: 'p', text: 'Your membership is active. Here’s what just switched on:' },
      { type: 'list', text: 'Airport lounge and fast-track access\nA permanent number that travels with you\nPriority support, day and night' }],
    ctas: 1, primary: 'Explore my perks', secondary: '' } },
  { k: 'verify', t: 'Verify identity', cfg: { type: 'security', icon: 'fingerprint:draw', title: 'Verify it’s you',
    blocks: [{ type: 'p', text: 'We sent a 6-digit code to p•••@openline.com. It expires in 10 minutes.' },
      { type: 'input', label: 'Verification code', text: '000 000' }],
    ctas: 2, primary: 'Verify', secondary: 'Resend code' } },
  { k: 'delete', t: 'Delete eSIM?', cfg: { type: 'error', icon: 'trash:pop', title: 'Delete this eSIM?',
    blocks: [{ type: 'p', text: 'Japan 10 GB will be removed from this phone. Unused data can’t be moved to another device.' },
      { type: 'highlight', title: 'This can’t be undone', text: 'You’ll need a new QR code to install it again.' }],
    ctas: 2, primary: 'Delete eSIM', secondary: 'Cancel' } },
];

const DEFAULTS = {
  ...TEMPLATES[0].cfg,
  size: 'md', align: 'center', radius: 20, theme: 'light', close: true, iconStyle: 'badge', iconSize: 72,
  layout: 'row', backdrop: 'page', page: 'home', device: 'desktop', primaryStyle: 'type',
};

/* ── State ─────────────────────────────────────────────────────────── */

let cfg = load();
function load() {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORE) || '{}') }; } catch { return { ...DEFAULTS }; }
}
function save() { localStorage.setItem(STORE, JSON.stringify(cfg)); }

/* ── Rendering ─────────────────────────────────────────────────────── */

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
const FONT = 'ui-sans-serif, system-ui, -apple-system, \'Segoe UI\', Roboto, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

function renderIcon(c, T, uid) {
  if (c.iconStyle === 'none') return '';
  const size = +c.iconSize || 72;
  if (c.icon.startsWith('aloha:')) {
    const ic = ALOHA.find((x) => `aloha:${x.id}` === c.icon) || ALOHA[0];
    const inner = Math.round(size * (c.iconStyle === 'badge' ? 0.6 : 0.9));
    return `<div style="width:${size}px;height:${size}px;display:grid;place-items:center;border-radius:50%;${c.iconStyle === 'badge' ? `background:${T.tint};` : ''}${c.align === 'center' ? 'margin:0 auto;' : ''}">
      <div style="width:${inner}px;height:${inner}px">${ic.svg(uid)}</div></div>`;
  }
  return `<div style="width:${size}px;height:${size}px;${c.align === 'center' ? 'margin:0 auto;' : ''}">${iconSVG(c.icon, {
    color: T.c, tint: T.tint, size, badge: c.iconStyle === 'badge', uid,
  })}</div>`;
}

export function renderModal(c, uid = 'm') {
  const T = TYPES[c.type] || TYPES.confirm;
  const dark = c.theme === 'dark';
  const bg = dark ? '#15151A' : '#FFFFFF';
  const ink = dark ? '#F4F4F6' : '#0B0B0F';
  const mut = dark ? '#A1A1AA' : '#5B6170';
  const line = dark ? 'rgba(255,255,255,0.10)' : 'rgba(11,11,15,0.09)';
  const soft = dark ? 'rgba(255,255,255,0.06)' : T.soft;
  const W = { sm: 380, md: 460, lg: 560 }[c.size] || 460;
  const R = +c.radius;
  const ta = c.align === 'center' ? 'center' : 'left';
  const btnBg = c.primaryStyle === 'ink' ? (dark ? '#F4F4F6' : '#0B0B0F') : T.btn;
  const btnOn = c.primaryStyle === 'ink' ? (dark ? '#0B0B0F' : '#FFFFFF') : T.on;
  const accent = dark && c.type === 'confirm' ? '#F4F4F6' : T.c;

  const blocks = (c.blocks || []).map((b) => {
    const lines = String(b.text || '').split('\n').map((x) => x.trim()).filter(Boolean);
    switch (b.type) {
      case 'p':
        return `<p style="margin:0;font-size:15px;line-height:1.6;color:${mut}">${rich(b.text)}</p>`;
      case 'list':
        return `<ul style="margin:0;padding:0;list-style:none;display:grid;gap:9px;text-align:left">${lines.map((x) => `
          <li style="display:flex;gap:10px;align-items:flex-start;font-size:14.5px;line-height:1.5;color:${ink}">
            <span style="flex:none;margin-top:2px;color:${accent}">${glyphSVG('check', { size: 17, color: accent, sw: 2.4 })}</span><span>${rich(x)}</span></li>`).join('')}</ul>`;
      case 'kv':
        return `<div style="border:1px solid ${line};border-radius:${Math.max(8, R - 8)}px;overflow:hidden;text-align:left">${lines.map((x, i) => {
          const [k, v] = x.split('|').map((y) => (y || '').trim());
          return `<div style="display:flex;justify-content:space-between;gap:16px;padding:11px 14px;font-size:14px;${i ? `border-top:1px solid ${line};` : ''}">
            <span style="color:${mut}">${rich(k)}</span><span style="color:${ink};font-weight:650;text-align:right">${rich(v)}</span></div>`;
        }).join('')}</div>`;
      case 'highlight':
        return `<div style="padding:14px 16px;border-radius:${Math.max(8, R - 8)}px;background:${soft};border-left:3px solid ${accent};text-align:left">
          ${b.title ? `<div style="font-size:14.5px;font-weight:700;color:${ink};margin-bottom:3px">${rich(b.title)}</div>` : ''}
          <div style="font-size:14px;line-height:1.5;color:${mut}">${rich(b.text)}</div></div>`;
      case 'progress': {
        const v = Math.max(0, Math.min(100, +b.value || 0));
        return `<div style="text-align:left">
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:7px"><span style="color:${ink};font-weight:650">${rich(b.label)}</span><span style="color:${mut};font-family:${MONO}">${rich(b.text || v + '%')}</span></div>
          <div style="height:9px;border-radius:9px;background:${dark ? 'rgba(255,255,255,0.10)' : '#EEF0F3'};overflow:hidden">
            <div style="height:100%;width:${v}%;border-radius:9px;background:${accent};transform-origin:left;animation:olmProg 1s cubic-bezier(.2,.8,.2,1) both"></div></div></div>`;
      }
      case 'code':
        return `<div style="text-align:left">
          ${b.label ? `<div style="font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${mut};margin-bottom:7px">${rich(b.label)}</div>` : ''}
          <div style="display:flex;align-items:center;gap:10px;padding:8px 8px 8px 16px;border:1.5px dashed ${accent};border-radius:${Math.max(8, R - 8)}px;background:${soft}">
            <span style="flex:1;font-family:${MONO};font-size:20px;font-weight:700;letter-spacing:.12em;color:${ink}">${esc(b.text)}</span>
            <button type="button" style="height:36px;padding:0 14px;border:0;border-radius:${Math.max(6, R - 12)}px;background:${accent};color:${c.type === 'warning' ? T.on : '#FFFFFF'};font:700 13px ${FONT};cursor:pointer">Copy</button>
          </div></div>`;
      case 'input':
        return `<label style="display:grid;gap:7px;text-align:left">
          <span style="font-size:13px;font-weight:650;color:${ink}">${rich(b.label)}</span>
          <input placeholder="${esc(b.text)}" style="height:48px;padding:0 14px;border:1.5px solid ${line};border-radius:${Math.max(8, R - 8)}px;background:${dark ? 'rgba(255,255,255,0.04)' : '#FFFFFF'};color:${ink};font:600 17px ${MONO};letter-spacing:.1em;outline:none"></label>`;
      case 'note':
        return `<p style="margin:0;font-size:12.5px;line-height:1.5;color:${mut};font-family:${MONO}">${rich(b.text)}</p>`;
      default: return '';
    }
  }).join('');

  const two = +c.ctas === 2 && c.secondary;
  const stack = c.layout === 'stack' || c.size === 'sm';
  const btn = (label, primary) => `<button type="button" style="flex:1;min-height:48px;padding:0 20px;border-radius:${Math.max(10, R - 8)}px;font:700 15px ${FONT};cursor:pointer;
    ${primary ? `border:0;background:${btnBg};color:${btnOn};` : `border:1.5px solid ${line};background:transparent;color:${ink};`}">${esc(label)}</button>`;
  const ctas = +c.ctas > 0 ? `<div style="display:flex;gap:10px;margin-top:4px;${stack ? 'flex-direction:column;' : (two ? 'flex-direction:row-reverse;' : '')}">
      ${btn(c.primary || 'OK', true)}${two ? btn(c.secondary, false) : ''}</div>` : '';

  return `<div role="dialog" aria-modal="true" aria-labelledby="${uid}-t" style="position:relative;box-sizing:border-box;width:100%;max-width:${W}px;padding:${c.size === 'sm' ? 26 : 32}px;border-radius:${R}px;background:${bg};color:${ink};font-family:${FONT};
    box-shadow:0 30px 80px rgba(11,11,15,${dark ? 0.6 : 0.28}),0 0 0 1px ${line};text-align:${ta};animation:olmIn .42s cubic-bezier(.2,.9,.25,1.12) both">
    <style>@keyframes olmIn{from{opacity:0;transform:translateY(14px) scale(.96)}to{opacity:1;transform:none}}@keyframes olmProg{from{transform:scaleX(0)}to{transform:scaleX(1)}}@media (prefers-reduced-motion:reduce){[role=dialog],[role=dialog] *{animation:none!important}}</style>
    ${c.close ? `<button type="button" aria-label="Close" style="position:absolute;top:14px;right:14px;width:34px;height:34px;display:grid;place-items:center;border:0;border-radius:50%;background:${dark ? 'rgba(255,255,255,0.08)' : '#F2F3F6'};color:${mut};cursor:pointer">${glyphSVG('x', { size: 16, sw: 2.4 })}</button>` : ''}
    <div style="display:grid;gap:18px">
      ${renderIcon(c, T, uid)}
      <div style="display:grid;gap:8px">
        <h2 id="${uid}-t" style="margin:0;font-size:${c.size === 'lg' ? 26 : 22}px;line-height:1.2;letter-spacing:-.015em;font-weight:800;color:${ink}${c.close && ta === 'left' ? ';padding-right:36px' : ''}">${rich(c.title)}</h2>
      </div>
      ${blocks ? `<div style="display:grid;gap:14px">${blocks}</div>` : ''}
      ${ctas}
    </div>
  </div>`;
}

/* ── Controls ──────────────────────────────────────────────────────── */

const $c = document.getElementById('mb-controls');
const seg = (name, opts, cur) => `<div class="qa-seg mb-seg" data-seg="${name}">${opts.map(([v, l]) =>
  `<button type="button" data-v="${v}" class="${String(cur) === String(v) ? 'is-on' : ''}">${l}</button>`).join('')}</div>`;

function iconLabel(id) {
  if (id.startsWith('aloha:')) { const ic = ALOHA.find((x) => `aloha:${x.id}` === id); return ic ? `${ic.name} · Openline original` : id; }
  const x = LIB.find((i) => i.id === id); return x ? x.name : id;
}

function renderControls() {
  const T = TYPES[cfg.type];
  $c.innerHTML = `
    <div class="mb-sec">
      <h3>Start from</h3>
      <div class="mb-tpls">${TEMPLATES.map((t) => `<button type="button" data-tpl="${t.k}"><i style="background:${TYPES[t.cfg.type].c}"></i>${esc(t.t)}</button>`).join('')}</div>
    </div>

    <div class="mb-sec">
      <h3>Type</h3>
      <div class="mb-types">${Object.entries(TYPES).map(([k, t]) => `<button type="button" data-type="${k}" class="${cfg.type === k ? 'is-on' : ''}">
        <i style="background:${t.c}"></i><span><b>${t.name}</b><small>${t.sub}</small></span></button>`).join('')}</div>
    </div>

    <div class="mb-sec">
      <h3>Icon <span>${LIB.length + ALOHA.length} animated</span></h3>
      <button type="button" class="mb-iconpick" data-pick>
        <span class="mb-iconprev">${cfg.icon.startsWith('aloha:') ? `<span style="width:40px;height:40px;display:block">${(ALOHA.find((x) => `aloha:${x.id}` === cfg.icon) || ALOHA[0]).svg('ctl')}</span>` : iconSVG(cfg.icon, { color: T.c, tint: T.tint, size: 48, uid: 'ctl' })}</span>
        <span class="mb-iconname"><b>${esc(iconLabel(cfg.icon))}</b><small>Change icon</small></span>
      </button>
      <div class="mb-row">${seg('iconStyle', [['badge', 'In a badge'], ['bare', 'Bare'], ['none', 'No icon']], cfg.iconStyle)}</div>
      <div class="mb-row">${seg('iconSize', [[56, 'S'], [72, 'M'], [88, 'L']], cfg.iconSize)}</div>
    </div>

    <div class="mb-sec">
      <h3>Subject</h3>
      <input class="mb-in" data-f="title" value="${esc(cfg.title)}" placeholder="What is this about?">
    </div>

    <div class="mb-sec">
      <h3>Content <span>**bold** works</span></h3>
      <div class="mb-blocks">${(cfg.blocks || []).map((b, i) => blockEditor(b, i)).join('')}</div>
      <div class="mb-add">
        <select data-addtype>${Object.entries(BLOCKS).map(([k, l]) => `<option value="${k}">${l}</option>`).join('')}</select>
        <button type="button" class="hb-btn" data-add>Add block</button>
      </div>
    </div>

    <div class="mb-sec">
      <h3>Buttons</h3>
      <div class="mb-row">${seg('ctas', [[0, 'None'], [1, 'One'], [2, 'Two']], cfg.ctas)}</div>
      ${+cfg.ctas > 0 ? `<label class="mb-lab">Main button<input class="mb-in" data-f="primary" value="${esc(cfg.primary)}"></label>` : ''}
      ${+cfg.ctas === 2 ? `<label class="mb-lab">Second button<input class="mb-in" data-f="secondary" value="${esc(cfg.secondary)}"></label>` : ''}
      ${+cfg.ctas > 0 ? `<div class="mb-row">${seg('primaryStyle', [['type', 'Main in type colour'], ['ink', 'Main in black']], cfg.primaryStyle)}</div>` : ''}
      ${+cfg.ctas === 2 ? `<div class="mb-row">${seg('layout', [['row', 'Side by side'], ['stack', 'Stacked']], cfg.layout)}</div>` : ''}
    </div>

    <div class="mb-sec">
      <h3>Format</h3>
      <div class="mb-row">${seg('size', [['sm', 'Small'], ['md', 'Medium'], ['lg', 'Large']], cfg.size)}</div>
      <div class="mb-row">${seg('align', [['center', 'Centred'], ['left', 'Left-aligned']], cfg.align)}</div>
      <div class="mb-row">${seg('radius', [[10, 'Sharp'], [20, 'Soft'], [28, 'Round']], cfg.radius)}</div>
      <div class="mb-row">${seg('theme', [['light', 'Light'], ['dark', 'Dark']], cfg.theme)}</div>
      <label class="qa-check"><input type="checkbox" data-close ${cfg.close ? 'checked' : ''}> Close button</label>
    </div>

    <div class="mb-sec mb-export">
      <button type="button" class="hb-btn is-main" data-copy="computer">Copy for Computer</button>
      <button type="button" class="hb-btn" data-copy="html">Copy HTML</button>
    </div>`;
  wire();
}

function blockEditor(b, i) {
  const n = (cfg.blocks || []).length;
  const head = `<div class="mb-bhead"><b>${BLOCKS[b.type]}</b><span>
    <button type="button" data-mv="${i}:-1" ${i === 0 ? 'disabled' : ''} title="Move up">↑</button>
    <button type="button" data-mv="${i}:1" ${i === n - 1 ? 'disabled' : ''} title="Move down">↓</button>
    <button type="button" data-rm="${i}" title="Remove">✕</button></span></div>`;
  const ta = (f, ph, rows = 2) => `<textarea class="mb-in" data-b="${i}:${f}" rows="${rows}" placeholder="${ph}">${esc(b[f] || '')}</textarea>`;
  const inp = (f, ph) => `<input class="mb-in" data-b="${i}:${f}" value="${esc(b[f] == null ? '' : b[f])}" placeholder="${ph}">`;
  let body = '';
  if (b.type === 'p' || b.type === 'note') body = ta('text', 'Text');
  if (b.type === 'list') body = ta('text', 'One item per line', 3);
  if (b.type === 'kv') body = ta('text', 'Label | Value — one per line', 3);
  if (b.type === 'highlight') body = inp('title', 'Heading (optional)') + ta('text', 'Text');
  if (b.type === 'progress') body = inp('label', 'Label') + `<div class="mb-2col">${inp('value', '0–100')}${inp('text', 'Right-hand text')}</div>`;
  if (b.type === 'code') body = inp('label', 'Label (optional)') + inp('text', 'CODE');
  if (b.type === 'input') body = inp('label', 'Field label') + inp('text', 'Placeholder');
  return `<div class="mb-block">${head}${body}</div>`;
}

function wire() {
  $c.querySelectorAll('[data-tpl]').forEach((b) => b.addEventListener('click', () => {
    const t = TEMPLATES.find((x) => x.k === b.dataset.tpl);
    cfg = { ...cfg, ...JSON.parse(JSON.stringify(t.cfg)) };
    commit(true);
  }));
  $c.querySelectorAll('[data-type]').forEach((b) => b.addEventListener('click', () => {
    const prev = TYPES[cfg.type];
    cfg.type = b.dataset.type;
    /* keep a custom icon; swap only if the icon was the old type's default */
    if (cfg.icon === prev.icon) cfg.icon = TYPES[cfg.type].icon;
    commit(true);
  }));
  $c.querySelectorAll('[data-seg]').forEach((g) => g.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
    const k = g.dataset.seg;
    cfg[k] = /^\d+$/.test(b.dataset.v) ? +b.dataset.v : b.dataset.v;
    commit(true);
  })));
  $c.querySelectorAll('[data-f]').forEach((el) => el.addEventListener('input', () => { cfg[el.dataset.f] = el.value; commit(false); }));
  $c.querySelectorAll('[data-b]').forEach((el) => el.addEventListener('input', () => {
    const [i, f] = el.dataset.b.split(':');
    cfg.blocks[+i][f] = el.value; commit(false);
  }));
  $c.querySelectorAll('[data-rm]').forEach((b) => b.addEventListener('click', () => { cfg.blocks.splice(+b.dataset.rm, 1); commit(true); }));
  $c.querySelectorAll('[data-mv]').forEach((b) => b.addEventListener('click', () => {
    const [i, d] = b.dataset.mv.split(':').map(Number);
    const a = cfg.blocks; [a[i], a[i + d]] = [a[i + d], a[i]]; commit(true);
  }));
  $c.querySelector('[data-add]').addEventListener('click', () => {
    const type = $c.querySelector('[data-addtype]').value;
    const seed = { p: { text: 'New paragraph.' }, list: { text: 'First item\nSecond item' }, kv: { text: 'Label | Value' },
      highlight: { title: 'Heads up', text: 'Something worth calling out.' }, progress: { label: 'Progress', value: 60, text: '60%' },
      code: { label: 'Code', text: 'OPENLINE' }, input: { label: 'Field', text: 'Type here' }, note: { text: 'A small note.' } }[type];
    cfg.blocks = [...(cfg.blocks || []), { type, ...seed }];
    commit(true);
  });
  $c.querySelector('[data-close]').addEventListener('change', (e) => { cfg.close = e.target.checked; commit(true); });
  $c.querySelector('[data-pick]').addEventListener('click', openPicker);
  $c.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', () => copy(b.dataset.copy)));
}

/* ── Stage ─────────────────────────────────────────────────────────── */

const PAGES = [['home', 'Home'], ['network', 'Network'], ['openline-plus', 'Openline+'], ['contact', 'Contact'], ['login', 'Login'], ['blog', 'Blog']];

function renderStageBar() {
  document.getElementById('mb-stagebar').innerHTML = `
    <div class="mb-sbl">${seg('device', [['desktop', 'Desktop'], ['mobile', 'Phone']], cfg.device)}
      ${seg('backdrop', [['page', 'Over a page'], ['solid', 'Plain']], cfg.backdrop)}
      ${cfg.backdrop === 'page' ? `<select class="mb-pagesel" data-page>${PAGES.map(([k, l]) => `<option value="${k}" ${cfg.page === k ? 'selected' : ''}>${l}</option>`).join('')}</select>` : ''}</div>
    <button type="button" class="hb-btn" data-replay>Replay animation</button>`;
  const bar = document.getElementById('mb-stagebar');
  bar.querySelectorAll('[data-seg]').forEach((g) => g.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
    cfg[g.dataset.seg] = b.dataset.v; commit(false); renderStageBar(); stage();
  })));
  const ps = bar.querySelector('[data-page]');
  if (ps) ps.addEventListener('change', () => { cfg.page = ps.value; commit(false); stage(); });
  bar.querySelector('[data-replay]').addEventListener('click', preview);
}

let shownPage = null;
function stage() {
  const canvas = document.getElementById('mb-canvas');
  canvas.classList.toggle('is-mobile', cfg.device === 'mobile');
  canvas.classList.toggle('is-solid', cfg.backdrop === 'solid');
  const f = document.getElementById('mb-page');
  if (cfg.backdrop === 'page' && shownPage !== cfg.page) { f.src = href(cfg.page); shownPage = cfg.page; }
}

let seq = 0;
function preview() {
  document.getElementById('mb-modal').innerHTML = renderModal(cfg, `mb${++seq}`);
}

function commit(rebuild) {
  save();
  if (rebuild) renderControls();
  preview();
}

/* ── Icon picker ───────────────────────────────────────────────────── */

let pf = { q: '', cat: 'All', motion: 'all' };
function openPicker() {
  const el = document.getElementById('mb-picker');
  el.hidden = false;
  paintPicker();
  const q = el.querySelector('[data-q]');
  q.focus();
}
function paintPicker() {
  const el = document.getElementById('mb-picker');
  const T = TYPES[cfg.type];
  const cats = ['All', ...new Set(Object.values(GLYPHS).map((g) => g[0])), 'Openline originals'];
  const list = [
    ...LIB.map((i) => ({ ...i, html: () => iconSVG(i.id, { color: T.c, tint: T.tint, size: 56, uid: 'pk' }) })),
    ...ALOHA.map((a) => ({ id: `aloha:${a.id}`, name: a.name, cat: 'Openline originals', motion: 'original',
      html: () => `<span style="width:56px;height:56px;display:grid;place-items:center;border-radius:50%;background:${T.tint}"><span style="width:36px;height:36px;display:block">${a.svg('pk-' + a.id)}</span></span>` })),
  ].filter((i) => (pf.cat === 'All' || i.cat === pf.cat)
    && (pf.motion === 'all' || i.motion === pf.motion || i.motion === 'original')
    && (!pf.q || i.name.toLowerCase().includes(pf.q.toLowerCase())));
  if (!el.firstElementChild) {
    el.innerHTML = `<div class="mb-pk-back" data-x></div>
      <div class="mb-pk" role="dialog" aria-label="Choose an icon">
        <div class="mb-pk-head">
          <input class="mb-in" data-q placeholder="Search ${LIB.length + ALOHA.length} icons — check, plane, gift, shield…">
          <button type="button" class="qa-x" data-x title="Close">✕</button>
        </div>
        <div class="mb-pk-filters"></div>
        <div class="mb-pk-grid"></div>
      </div>`;
    el.querySelectorAll('[data-x]').forEach((b) => b.addEventListener('click', () => { el.hidden = true; }));
    el.querySelector('[data-q]').addEventListener('input', (e) => { pf.q = e.target.value; paintPicker(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') el.hidden = true; });
  }
  el.querySelector('.mb-pk-filters').innerHTML = `
    <div class="mb-chips">${cats.map((c) => `<button type="button" data-cat="${c}" class="${pf.cat === c ? 'is-on' : ''}">${c}</button>`).join('')}</div>
    <div class="mb-chips">${[['all', 'Every motion'], ...Object.entries(MOTIONS)].map(([k, l]) => `<button type="button" data-mo="${k}" class="${pf.motion === k ? 'is-on' : ''}">${l}</button>`).join('')}
      <span class="mb-pk-count">${list.length} shown</span></div>`;
  el.querySelectorAll('[data-cat]').forEach((b) => b.addEventListener('click', () => { pf.cat = b.dataset.cat; paintPicker(); }));
  el.querySelectorAll('[data-mo]').forEach((b) => b.addEventListener('click', () => { pf.motion = b.dataset.mo; paintPicker(); }));
  el.querySelector('.mb-pk-grid').innerHTML = list.map((i) => `<button type="button" class="mb-pk-i${cfg.icon === i.id ? ' is-on' : ''}" data-ic="${i.id}" title="${esc(i.name)}">
      ${i.html()}<span>${esc(i.name)}</span></button>`).join('') || '<p class="qa-hint">Nothing matches.</p>';
  el.querySelectorAll('[data-ic]').forEach((b) => b.addEventListener('click', () => {
    cfg.icon = b.dataset.ic; el.hidden = true; commit(true);
  }));
}

/* ── Export ────────────────────────────────────────────────────────── */

function toast(m) {
  const t = document.getElementById('hb-toast');
  t.textContent = m; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => { t.hidden = true; }, 2200);
}

async function copy(kind) {
  let txt;
  if (kind === 'html') {
    txt = `<!-- Openline modal · ${TYPES[cfg.type].name} · built in /qa/modals -->\n${renderModal(cfg, 'olm')}`;
  } else {
    const T = TYPES[cfg.type];
    txt = [
      `# Openline modal — ${T.name}`,
      '',
      `- **Type:** ${T.name} (${T.c})`,
      `- **Icon:** ${iconLabel(cfg.icon)} \`${cfg.icon}\` · ${cfg.iconStyle} · ${cfg.iconSize}px`,
      `- **Subject:** ${cfg.title}`,
      `- **Buttons:** ${+cfg.ctas === 0 ? 'none' : `“${cfg.primary}”${+cfg.ctas === 2 ? ` + “${cfg.secondary}” (${cfg.layout})` : ''} · main in ${cfg.primaryStyle === 'ink' ? 'black' : 'type colour'}`}`,
      `- **Format:** ${cfg.size} · ${cfg.align} · radius ${cfg.radius} · ${cfg.theme}${cfg.close ? ' · close button' : ''}`,
      '',
      '**Content blocks:**',
      ...(cfg.blocks || []).map((b, i) => `${i + 1}. ${BLOCKS[b.type]}: ${[b.title, b.label, b.text, b.value != null && b.type === 'progress' ? `${b.value}%` : null].filter(Boolean).join(' — ').replace(/\n/g, ' / ')}`),
      '',
      '<!-- machine-readable',
      JSON.stringify(cfg),
      '-->',
    ].join('\n');
  }
  try { await navigator.clipboard.writeText(txt); } catch {
    const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
  }
  toast(kind === 'html' ? 'HTML copied' : 'Copied — paste it into the chat');
}

/* ── Boot ──────────────────────────────────────────────────────────── */

renderControls();
renderStageBar();
stage();
preview();
