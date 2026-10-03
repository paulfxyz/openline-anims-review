/* ══════════════════════════════════════════════════════════════════════
   /qa/modals — a builder for Openline modals.

   Everything the preview shows is produced by renderModal(), which returns
   one self-contained HTML string with inline styles and an inline SMIL
   icon. The exact same string is what "Copy HTML" gives you, so the
   preview can never drift from the export.
   ══════════════════════════════════════════════════════════════════════ */

import { ICONS as LIB, GLYPHS, MOTIONS, iconSVG, glyphSVG } from './icons-lib.js';
import { ICONS as ALOHA } from '/js/icons.js';
import { TEMPLATES, TEMPLATE_CATS } from './modal-templates.js';
import { ILLUS, resolveSrc } from './modal-illus.js';

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
  image: 'Image',
  esim: 'eSIM card',
  steps: 'Numbered steps',
  qr: 'QR code',
  choice: 'Choice list (label | detail | price)',
  toggle: 'Toggle',
  rating: 'Star rating',
  divider: 'Divider',
};

const DEFAULTS = {
  ...TEMPLATES[0].cfg, cover: '', link: '',
  size: 'md', align: 'center', radius: 20, theme: 'light', close: true, iconStyle: 'badge', iconSize: 72,
  layout: 'row', backdrop: 'page', page: 'home', device: 'desktop', primaryStyle: 'type',
};

/* ── State ─────────────────────────────────────────────────────────── */

let cfg = load();
function load() {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORE) || '{}') }; } catch { return { ...DEFAULTS }; }
}
function save() {
  try { localStorage.setItem(STORE, JSON.stringify(cfg)); }
  catch { toast('Image too large to remember after a reload — it still works for this session'); }
}

/* ── Rendering ─────────────────────────────────────────────────────── */

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/~~(.+?)~~/g, '<s style="opacity:.55">$1</s>');
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
      case 'image': {
        const src = resolveSrc(b.src);
        if (!src) return '';
        const h = +b.h || 180;
        return `<img src="${esc(src)}" alt="${esc(b.alt || '')}" style="display:block;width:100%;height:${h}px;object-fit:${b.fit === 'contain' ? 'contain' : 'cover'};border-radius:${Math.max(8, R - 8)}px;background:${soft}">`;
      }
      case 'esim':
        /* the plan as a card: the one object a traveller recognises */
        return `<div style="display:flex;align-items:center;gap:14px;padding:16px;border-radius:${Math.max(10, R - 6)}px;background:${dark ? '#222229' : '#0B0B0F'};color:#FFFFFF;text-align:left">
          <div style="flex:none;width:44px;height:56px;border-radius:8px;background:linear-gradient(140deg,#FF5314,#FF8A4C);display:grid;place-items:center">
            <div style="width:24px;height:18px;border-radius:4px;background:rgba(255,255,255,.85);box-shadow:inset 0 0 0 1.5px rgba(11,11,15,.25)"></div></div>
          <div style="flex:1;min-width:0"><div style="font-size:16px;font-weight:800">${rich(b.country)}</div>
            <div style="font-size:13.5px;opacity:.75;margin-top:2px">${rich(b.plan)}</div>
            <div style="font:600 11px ${MONO};letter-spacing:.06em;opacity:.55;margin-top:5px;text-transform:uppercase">${rich(b.meta)}</div></div>
          ${b.status ? `<span style="flex:none;padding:6px 10px;border-radius:999px;font:700 11.5px ${FONT};${/active|ready/i.test(b.status) ? 'background:rgba(74,222,128,.16);color:#4ADE80' : 'background:rgba(255,255,255,.12);color:#FFFFFF'}">${rich(b.status)}</span>` : ''}
        </div>`;
      case 'steps':
        return `<ol style="margin:0;padding:0;list-style:none;display:grid;gap:10px;text-align:left">${lines.map((x, i) => `
          <li style="display:flex;gap:12px;align-items:flex-start;font-size:14.5px;line-height:1.45;color:${ink}">
            <span style="flex:none;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:${soft};color:${accent};font:800 12px ${FONT};box-shadow:inset 0 0 0 1px ${line}">${i + 1}</span><span style="padding-top:2px">${rich(x)}</span></li>`).join('')}</ol>`;
      case 'qr': {
        let cells = '';
        const n = 21, sz = 7;
        for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
          const f = (i < 7 && j < 7) || (i < 7 && j > 13) || (i > 13 && j < 7);
          if (!f && ((i * 7 + j * 13 + (i * j) % 5) % 3 === 0)) cells += `<rect x="${j * sz}" y="${i * sz}" width="${sz}" height="${sz}"/>`;
        }
        const fin = (x, y) => `<rect x="${x + 3.5}" y="${y + 3.5}" width="42" height="42" fill="none" stroke="#0B0B0F" stroke-width="7"/><rect x="${x + 14}" y="${y + 14}" width="21" height="21"/>`;
        return `<div style="display:grid;justify-items:center;gap:10px;padding:18px;border-radius:${Math.max(10, R - 6)}px;background:${soft}">
          <div style="padding:12px;border-radius:12px;background:#FFFFFF"><svg viewBox="0 0 147 147" width="168" height="168" fill="#0B0B0F" aria-label="QR code">${cells}${fin(0, 0)}${fin(98, 0)}${fin(0, 98)}</svg></div>
          ${b.label ? `<div style="font-size:14px;font-weight:700;color:${ink}">${rich(b.label)}</div>` : ''}
          ${b.text ? `<div style="font:12px/1.4 ${MONO};color:${mut};text-align:center">${rich(b.text)}</div>` : ''}</div>`;
      }
      case 'choice':
        return `<div style="display:grid;gap:8px;text-align:left" role="radiogroup">${lines.map((x, i) => {
          const [l, d, pr] = x.split('|').map((y) => (y || '').trim());
          const on = i === (+b.value || 0);
          return `<div role="radio" aria-checked="${on}" style="display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:${Math.max(10, R - 8)}px;cursor:pointer;
            border:${on ? `2px solid ${accent}` : `1.5px solid ${line}`};background:${on ? soft : 'transparent'}">
            <span style="flex:none;width:18px;height:18px;border-radius:50%;border:${on ? `5px solid ${accent}` : `2px solid ${line}`};box-sizing:border-box"></span>
            <span style="flex:1;min-width:0"><span style="display:block;font-size:14.5px;font-weight:700;color:${ink}">${rich(l)}</span>${d ? `<span style="display:block;font-size:12.5px;color:${mut};margin-top:1px">${rich(d)}</span>` : ''}</span>
            ${pr ? `<span style="flex:none;font-size:14.5px;font-weight:800;color:${ink}">${rich(pr)}</span>` : ''}</div>`;
        }).join('')}</div>`;
      case 'toggle': {
        const on = b.on === true || b.on === 'true';
        return `<div style="display:flex;align-items:center;gap:14px;padding:12px 14px;border:1.5px solid ${line};border-radius:${Math.max(10, R - 8)}px;text-align:left">
          <span style="flex:1"><span style="display:block;font-size:14.5px;font-weight:700;color:${ink}">${rich(b.label)}</span>${b.text ? `<span style="display:block;font-size:12.5px;color:${mut};margin-top:1px">${rich(b.text)}</span>` : ''}</span>
          <span role="switch" aria-checked="${on}" style="flex:none;width:44px;height:26px;border-radius:13px;padding:3px;box-sizing:border-box;background:${on ? accent : (dark ? 'rgba(255,255,255,.18)' : '#D9DCE3')};display:flex;justify-content:${on ? 'flex-end' : 'flex-start'}">
            <span style="width:20px;height:20px;border-radius:50%;background:#FFFFFF;box-shadow:0 1px 3px rgba(0,0,0,.25)"></span></span></div>`;
      }
      case 'rating': {
        const v = Math.max(0, Math.min(5, +b.value || 0));
        return `<div style="display:flex;gap:8px;justify-content:${c.align === 'center' ? 'center' : 'flex-start'}" role="radiogroup" aria-label="Rating">${[1, 2, 3, 4, 5].map((k) =>
          `<span style="width:40px;height:40px;display:grid;place-items:center;border-radius:12px;background:${k <= v ? soft : 'transparent'};color:${k <= v ? '#F59E0B' : line}">${glyphSVG('star', { size: 26, color: k <= v ? '#F59E0B' : (dark ? '#52525B' : '#D1D5DB'), sw: 2 })}</span>`).join('')}</div>`;
      }
      case 'divider':
        return `<hr style="margin:2px 0;border:0;border-top:1px solid ${line}">`;
      default: return '';
    }
  }).join('');

  const two = +c.ctas === 2 && c.secondary;
  const stack = c.layout === 'stack' || c.size === 'sm';
  const btn = (label, primary) => `<button type="button" style="flex:1;min-height:48px;padding:0 20px;border-radius:${Math.max(10, R - 8)}px;font:700 15px ${FONT};cursor:pointer;
    ${primary ? `border:0;background:${btnBg};color:${btnOn};` : `border:1.5px solid ${line};background:transparent;color:${ink};`}">${esc(label)}</button>`;
  const ctas = +c.ctas > 0 ? `<div style="display:flex;gap:10px;margin-top:4px;${stack ? 'flex-direction:column;' : (two ? 'flex-direction:row-reverse;' : '')}">
      ${btn(c.primary || 'OK', true)}${two ? btn(c.secondary, false) : ''}</div>` : '';
  const link = c.link ? `<a href="#" style="justify-self:${c.align === 'center' ? 'center' : 'start'};font-size:13.5px;font-weight:650;color:${mut};text-decoration:underline;text-underline-offset:3px">${rich(c.link)}</a>` : '';
  const pad = c.size === 'sm' ? 26 : 32;
  const coverSrc = resolveSrc(c.cover);
  /* a header image bleeds to the modal's edges; the icon then overlaps its
     bottom edge so the two read as one object */
  const cover = coverSrc ? `<div style="margin:-${pad}px -${pad}px ${c.iconStyle === 'none' ? 0 : -(+c.iconSize || 72) / 2 - 8}px;height:${c.size === 'lg' ? 220 : 180}px;border-radius:${R}px ${R}px 0 0;overflow:hidden;background:${soft}">
      <img src="${esc(coverSrc)}" alt="" style="display:block;width:100%;height:100%;object-fit:cover"></div>` : '';

  return `<div role="dialog" aria-modal="true" aria-labelledby="${uid}-t" style="position:relative;box-sizing:border-box;width:100%;max-width:${W}px;padding:${c.size === 'sm' ? 26 : 32}px;border-radius:${R}px;background:${bg};color:${ink};font-family:${FONT};
    box-shadow:0 30px 80px rgba(11,11,15,${dark ? 0.6 : 0.28}),0 0 0 1px ${line};text-align:${ta};animation:olmIn .42s cubic-bezier(.2,.9,.25,1.12) both">
    <style>@keyframes olmIn{from{opacity:0;transform:translateY(14px) scale(.96)}to{opacity:1;transform:none}}@keyframes olmProg{from{transform:scaleX(0)}to{transform:scaleX(1)}}@media (prefers-reduced-motion:reduce){[role=dialog],[role=dialog] *{animation:none!important}}</style>
    ${c.close ? `<button type="button" aria-label="Close" style="position:absolute;top:14px;right:14px;width:34px;height:34px;display:grid;place-items:center;border:0;border-radius:50%;z-index:2;background:${coverSrc ? 'rgba(255,255,255,0.92)' : (dark ? 'rgba(255,255,255,0.08)' : '#F2F3F6')};color:${coverSrc ? '#0B0B0F' : mut};cursor:pointer">${glyphSVG('x', { size: 16, sw: 2.4 })}</button>` : ''}
    <div style="display:grid;gap:18px">
      ${cover}
      ${coverSrc && c.iconStyle !== 'none' ? `<div style="position:relative;${c.align === 'center' ? '' : 'padding-left:4px;'}"><div style="display:inline-block;border-radius:50%;box-shadow:0 0 0 6px ${bg};background:${bg};${c.align === 'center' ? 'margin:0 auto;display:block;width:max-content' : ''}">${renderIcon({ ...c, align: 'left' }, T, uid)}</div></div>` : renderIcon(c, T, uid)}
      <div style="display:grid;gap:8px">
        <h2 id="${uid}-t" style="margin:0;font-size:${c.size === 'lg' ? 26 : 22}px;line-height:1.2;letter-spacing:-.015em;font-weight:800;color:${ink}${c.close && ta === 'left' ? ';padding-right:36px' : ''}">${rich(c.title)}</h2>
      </div>
      ${blocks ? `<div style="display:grid;gap:14px">${blocks}</div>` : ''}
      ${ctas}
      ${link}
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
      <h3>Start from <span>${TEMPLATES.length} Openline templates</span></h3>
      <button type="button" class="hb-btn is-main mb-tplbtn" data-tplmenu>${glyphSVG('sparkles', { size: 18 })} Browse templates</button>
      <div class="mb-tpls">${['paid-activate', 'activated', 'details', 'low', 'delete', 'promo'].map((k) => TEMPLATES.find((t) => t.k === k)).map((t) =>
        `<button type="button" data-tpl="${t.k}"><i style="background:${TYPES[t.cfg.type].c}"></i>${esc(t.t)}</button>`).join('')}</div>
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
      <label class="mb-lab">Text link under the buttons (optional)<input class="mb-in" data-f="link" value="${esc(cfg.link || '')}" placeholder="e.g. View receipt"></label>
    </div>

    <div class="mb-sec">
      <h3>Header image</h3>
      ${imagePicker('cover', cfg.cover)}
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

/* Image source picker: built-in illustration, upload, or URL. Uploads are
   downscaled to 1200px WebP so they fit in localStorage and the export. */
function imagePicker(field, cur, bi) {
  const key = bi == null ? field : `${bi}:${field}`;
  const isIllus = cur && cur.startsWith('illus:');
  return `<div class="mb-img" data-img="${key}">
    <div class="mb-illus">
      <button type="button" data-illus="" class="${!cur ? 'is-on' : ''}">None</button>
      ${Object.entries(ILLUS).map(([k, v]) => `<button type="button" data-illus="illus:${k}" class="${cur === 'illus:' + k ? 'is-on' : ''}" title="${esc(v.name)}"><img src="${resolveSrc('illus:' + k)}" alt=""><span>${esc(v.name)}</span></button>`).join('')}
    </div>
    <div class="mb-imgrow">
      <label class="hb-btn mb-upload">${glyphSVG('upload', { size: 16 })} Upload<input type="file" accept="image/*" data-upload hidden></label>
      <input class="mb-in" data-url placeholder="…or paste an image URL" value="${cur && !isIllus && !cur.startsWith('data:') ? esc(cur) : ''}">
    </div>
    ${cur && cur.startsWith('data:') ? '<p class="qa-hint">Using your uploaded image.</p>' : ''}
  </div>`;
}

function setImg(key, v) {
  if (key.includes(':')) { const [i, f] = key.split(':'); cfg.blocks[+i][f] = v; } else cfg[key] = v;
}

function downscale(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => {
      const im = new Image();
      im.onload = () => {
        const k = Math.min(1, 1200 / Math.max(im.width, im.height));
        const cv = document.createElement('canvas');
        cv.width = Math.round(im.width * k); cv.height = Math.round(im.height * k);
        cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height);
        res(cv.toDataURL('image/webp', 0.82));
      };
      im.onerror = rej; im.src = r.result;
    };
    r.onerror = rej; r.readAsDataURL(file);
  });
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
  if (b.type === 'image') body = imagePicker('src', b.src, i) + `<div class="mb-2col">${inp('h', 'Height px')}${inp('alt', 'Alt text')}</div>`;
  if (b.type === 'esim') body = inp('country', 'Country or region') + inp('plan', 'Plan') + `<div class="mb-2col">${inp('status', 'Status')}${inp('meta', 'Detail line')}</div>`;
  if (b.type === 'steps') body = ta('text', 'One step per line', 3);
  if (b.type === 'qr') body = inp('label', 'Label') + inp('text', 'Caption');
  if (b.type === 'choice') body = ta('text', 'Label | detail | price — one per line', 3) + `<div class="mb-2col">${inp('value', 'Selected')}<span class="qa-hint" style="margin:10px 0 0">0 = first option</span></div>`;
  if (b.type === 'toggle') body = inp('label', 'Label') + inp('text', 'Detail (optional)') + `<label class="qa-check"><input type="checkbox" data-bon="${i}" ${b.on === true || b.on === 'true' ? 'checked' : ''}> On</label>`;
  if (b.type === 'rating') body = `<div class="mb-2col">${inp('value', '0–5')}<span class="qa-hint" style="margin:10px 0 0">Stars shown as selected</span></div>`;
  if (b.type === 'divider') body = '';
  return `<div class="mb-block">${head}${body}</div>`;
}

function wire() {
  $c.querySelectorAll('[data-tpl]').forEach((b) => b.addEventListener('click', () => {
    const t = TEMPLATES.find((x) => x.k === b.dataset.tpl);
    cfg = { ...cfg, cover: '', link: '', secondary: '', ...JSON.parse(JSON.stringify(t.cfg)) };
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
      code: { label: 'Code', text: 'OPENLINE' }, input: { label: 'Field', text: 'Type here' }, note: { text: 'A small note.' },
      image: { src: 'illus:qr-install', h: 180, alt: '' }, esim: { country: 'Japan', plan: '10 GB · 30 days', meta: 'Tier-1 · 5G', status: 'Ready' },
      steps: { text: 'First step\nSecond step\nThird step' }, qr: { label: 'Japan · 10 GB', text: 'Scan with your camera' },
      choice: { text: '5 GB | 30 days | $9.00\n10 GB | 30 days | $15.00', value: 0 }, toggle: { label: 'Auto-renew', text: '', on: true },
      rating: { value: 4 }, divider: {} }[type];
    cfg.blocks = [...(cfg.blocks || []), { type, ...seed }];
    commit(true);
  });
  $c.querySelector('[data-close]').addEventListener('change', (e) => { cfg.close = e.target.checked; commit(true); });
  $c.querySelectorAll('[data-bon]').forEach((el) => el.addEventListener('change', () => { cfg.blocks[+el.dataset.bon].on = el.checked; commit(false); }));
  $c.querySelectorAll('[data-img]').forEach((box) => {
    const key = box.dataset.img;
    box.querySelectorAll('[data-illus]').forEach((b) => b.addEventListener('click', () => { setImg(key, b.dataset.illus); commit(true); }));
    box.querySelector('[data-url]').addEventListener('change', (e) => { setImg(key, e.target.value.trim()); commit(true); });
    box.querySelector('[data-upload]').addEventListener('change', async (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      try { setImg(key, await downscale(f)); commit(true); } catch { toast('That image could not be read'); }
    });
  });
  const tm = $c.querySelector('[data-tplmenu]');
  if (tm) tm.addEventListener('click', openTemplates);
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

/* ── Template menu ─────────────────────────────────────────────────── */

let tf = { cat: 'All', q: '' };
function openTemplates() {
  const el = document.getElementById('mb-tplmenu');
  el.hidden = false;
  if (!el.firstElementChild) {
    el.innerHTML = `<div class="mb-pk-back" data-x></div>
      <div class="mb-pk mb-tm" role="dialog" aria-label="Openline modal templates">
        <div class="mb-pk-head">
          <input class="mb-in" data-tq placeholder="Search ${TEMPLATES.length} templates — activate, top-up, refund…">
          <button type="button" class="qa-x" data-x title="Close">✕</button>
        </div>
        <div class="mb-pk-filters"><div class="mb-chips" data-tcats></div></div>
        <div class="mb-tm-grid"></div>
        <p class="mb-tm-foot">Sample copy — plans, prices, dates and codes are placeholders for real order and account data.</p>
      </div>`;
    el.querySelectorAll('[data-x]').forEach((b) => b.addEventListener('click', () => { el.hidden = true; }));
    el.querySelector('[data-tq]').addEventListener('input', (e) => { tf.q = e.target.value; paintTemplates(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') el.hidden = true; });
  }
  paintTemplates();
  el.querySelector('[data-tq]').focus();
}

function paintTemplates() {
  const el = document.getElementById('mb-tplmenu');
  const cats = ['All', ...TEMPLATE_CATS];
  const list = TEMPLATES.filter((t) => (tf.cat === 'All' || t.cat === tf.cat)
    && (!tf.q || (t.t + ' ' + t.cfg.title + ' ' + t.cat).toLowerCase().includes(tf.q.toLowerCase())));
  el.querySelector('[data-tcats]').innerHTML = cats.map((c) => `<button type="button" data-tc="${esc(c)}" class="${tf.cat === c ? 'is-on' : ''}">${esc(c)}
    <small>${c === 'All' ? TEMPLATES.length : TEMPLATES.filter((t) => t.cat === c).length}</small></button>`).join('');
  el.querySelectorAll('[data-tc]').forEach((b) => b.addEventListener('click', () => { tf.cat = b.dataset.tc; paintTemplates(); }));
  /* live miniatures: the real renderModal at full size, scaled down, so
     what you pick is exactly what loads */
  el.querySelector('.mb-tm-grid').innerHTML = list.map((t) => {
    const c = { ...DEFAULTS, ...t.cfg, size: 'md', theme: cfg.theme, radius: cfg.radius, align: cfg.align, close: true };
    /* a div, not a <button>: the miniature contains real buttons, and a
       button inside a button makes the parser close the outer one early */
    return `<div role="button" tabindex="0" class="mb-tm-i" data-tk="${t.k}">
      <span class="mb-tm-prev"><span class="mb-tm-scale">${renderModal(c, 'tm-' + t.k)}</span></span>
      <span class="mb-tm-meta"><i style="background:${TYPES[t.cfg.type].c}"></i><b>${esc(t.t)}</b><small>${esc(t.cat)}</small></span>
    </div>`;
  }).join('') || '<p class="qa-hint">Nothing matches.</p>';
  el.querySelectorAll('[data-tk]').forEach((b) => b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); b.click(); } }));
  el.querySelectorAll('[data-tk]').forEach((b) => b.addEventListener('click', () => {
    const t = TEMPLATES.find((x) => x.k === b.dataset.tk);
    cfg = { ...cfg, cover: '', link: '', secondary: '', ...JSON.parse(JSON.stringify(t.cfg)) };
    el.hidden = true; commit(true);
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
      `- **Header image:** ${!cfg.cover ? 'none' : cfg.cover.startsWith('illus:') ? `built-in “${(ILLUS[cfg.cover.slice(6)] || {}).name}”` : cfg.cover.startsWith('data:') ? 'uploaded image (in the HTML export)' : cfg.cover}`,
      ...(cfg.link ? [`- **Text link:** ${cfg.link}`] : []),
      '',
      '**Content blocks:**',
      ...(cfg.blocks || []).map((b, i) => `${i + 1}. ${BLOCKS[b.type]}: ${[b.title, b.label, b.text, b.value != null && b.type === 'progress' ? `${b.value}%` : null].filter(Boolean).join(' — ').replace(/\n/g, ' / ')}`),
      '',
      '<!-- machine-readable',
      JSON.stringify({ ...cfg, cover: cfg.cover && cfg.cover.startsWith('data:') ? '(uploaded image)' : cfg.cover, blocks: (cfg.blocks || []).map((b) => (b.src && b.src.startsWith('data:') ? { ...b, src: '(uploaded image)' } : b)) }),
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
