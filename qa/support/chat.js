/* ══════════════════════════════════════════════════════════════════════
   Openline support chat — full-screen redesign of the "Talk to Openline"
   modal. Working composer (text, files, voice), example history, and a
   collapsible side panel for other channels, public AIs and self-help.
   Opened with Openline.open('chat', { q, topic }) or any
   [aria-label="Open support chat"] / [data-ol-open="chat"] trigger.
   ══════════════════════════════════════════════════════════════════════ */

import { icon } from './support.js';

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const nl2br = (s) => esc(s).replace(/\n/g, '<br>');
const KEY = 'openline-qa-chat-v1';
const OPENLINE_MARK = '/qa/assets/start-brand-mark.png';
const PORTRAITS = [5, 12, 16, 32, 47, 49, 53].map(n => `/qa/assets/support-portraits/portrait-${n}.jpg`);
function shuffledPortraits() {
  const portraits = [...PORTRAITS];
  for (let i = portraits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [portraits[i], portraits[j]] = [portraits[j], portraits[i]];
  }
  return portraits;
}
function portraitRow() {
  // Illustrative CC0 faces, not real staff identities or availability.
  // Shuffle once per opened chat, never on each message render.
  return `<div class="olc-team-faces" role="img" aria-label="Seven illustrative profile portraits">${S.portraits.map(src => `<img src="${src}" width="48" height="48" alt="" decoding="async">`).join('')}</div>`;
}

const G = {
  menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
  panel: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M15 4v16"/>',
  clip: '<path d="M20.5 11.5l-8.2 8.2a5 5 0 0 1-7.1-7.1l8.6-8.6a3.4 3.4 0 0 1 4.8 4.8l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4l7.9-7.9"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
  send: '<path d="M4.5 12h11M11 6.5l5.5 5.5-5.5 5.5"/><path d="M20 4v16" opacity="0"/>',
  stop: '<rect x="7" y="7" width="10" height="10" rx="2"/>',
  play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  trash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>',
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
  wa: '<path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3.5 20.5l1.4-4.3a8.5 8.5 0 1 1 15.6-4.6z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .8a5 5 0 0 1-2.6-2.6l.8-1-1-2z"/>',
  ig: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/>',
  ms: '<path d="M12 3.5c-4.9 0-8.5 3.5-8.5 8 0 2.5 1.1 4.6 3 6.1v3l2.8-1.5c.9.3 1.8.4 2.7.4 4.9 0 8.5-3.5 8.5-8s-3.6-8-8.5-8z"/><path d="M7.5 13.5l3-3.2 2.2 2 3.8-2.8-3 3.2-2.2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
  spark: '<path d="M12 3l1.9 5.3L19 10l-5.1 1.8L12 17l-1.9-5.2L5 10l5.1-1.7z"/><path d="M19 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
  star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z"/>',
  dl: '<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
  reset: '<path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5M4 4v4.5h4.5"/>',
  min: '<path d="M6 12h12"/>',
  left: '<path d="M14 6l-6 6 6 6"/>',
  right: '<path d="M10 6l6 6-6 6"/>',
};
const ic = (k, s = 20) => (G[k] ? `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${G[k]}</svg>` : icon(k, s));

const WA = '15554842461';
const AIS = [
  { k: 'chatgpt', n: 'ChatGPT', c: '#0B0B0F', url: 'https://chatgpt.com/', ext: 'webp' },
  { k: 'claude', n: 'Claude', c: '#C96442', url: 'https://claude.ai/new' },
  { k: 'perplexity', n: 'Perplexity', c: '#1F8A8A', url: 'https://www.perplexity.ai/' },
  { k: 'gemini', n: 'Gemini', c: '#3B6FF5', url: 'https://gemini.google.com/app' },
  { k: 'grok', n: 'Grok', c: '#2A2A2E', url: 'https://grok.com/' },
  { k: 'copilot', n: 'Copilot', c: '#0C7A5B', url: 'https://copilot.microsoft.com/', ext: 'ico' },
  { k: 'mistral', n: 'Le Chat', c: '#E2561C', url: 'https://chat.mistral.ai/chat' },
];
const aiLogo = a => `<img class="olc-ai-logo" src="/qa/assets/ai/${a.k}.${a.ext || 'png'}" width="28" height="28" alt="" decoding="async">`;
const PROMPTS = [
  ['Is it legit?', 'Is Openline (openline.com) a trustworthy travel eSIM provider? Summarise what real customers and reviewers say.'],
  ['vs. the others', 'How does Openline eSIM compare with Airalo, Holafly and Saily on price, coverage and network quality?'],
  ['Best for my trip', 'I am travelling to Japan for two weeks. Is an Openline eSIM a good choice, and which plan should I pick?'],
  ['How it works', 'Explain in plain words how the Openline eSIM works, how to install it on an iPhone, and what happens when I land.'],
  ['Phone readiness', 'Help me check whether my phone is ready for an Openline travel eSIM. Ask for my exact model, country of purchase and carrier-lock status, then check the official compatibility guidance.'],
  ['How much data?', 'Help me estimate how much mobile data I need for my trip. Ask about its length, maps, video, calls and hotspot use before suggesting a suitable Openline plan. Verify current plan details on openline.com.'],
  ['Several countries', 'I am visiting several countries on one trip. Ask for my itinerary and help me compare regional and country-specific Openline eSIM options, checking current coverage and terms.'],
  ['No connection', 'Walk me through safe troubleshooting for an Openline eSIM with no internet. Ask about my phone and destination first. Check the official guidance and do not suggest deleting my eSIM without support confirmation.'],
  ['Gift or activate?', 'Explain the difference between gifting an Openline purchase code and activating it for myself. Check the latest official activation and validity rules, and help me decide what to do if I travel later.'],
];

const AGENTS = {
  gary: { n: 'Gary', r: 'Openline AI', c: '#0B0B0F', ini: 'G', ai: true },
  ines: { n: 'Inês', r: 'Support · Lisbon', c: '#FF5314', ini: 'I' },
  you: { n: 'You' },
};

/* Example history — sample copy, swap for the live chat client's transcript. */
const HISTORY = () => [
  { day: 'Yesterday' },
  { from: 'gary', t: '21:02', text: 'Hi, I’m Gary, Openline’s assistant. Ask me anything — a real person can take over at any time.' },
  { from: 'you', t: '21:03', text: 'Hi! I fly to Tokyo on Friday. Will my Japan eSIM work on an iPhone 13 mini?' },
  { from: 'gary', t: '21:03', text: 'Yes — the iPhone 13 mini supports eSIM, as long as it’s carrier-unlocked.', card: { type: 'device', name: 'Apple iPhone 13 mini', meta: 'A2481 · 2021', ok: true } },
  { from: 'you', t: '21:05', img: 'settings', text: 'Is this the right screen to add it?' },
  { from: 'ines', t: '21:06', text: 'Hi, Inês here from the support team. That’s the one — tap “Add eSIM”, then “Use QR code”. Your QR code is in the email we sent with your order.' },
  { from: 'ines', t: '21:06', card: { type: 'article', title: 'How to install your eSIM on iPhone', cat: 'Installation', q: 'install iphone' } },
  { from: 'you', t: '21:09', voice: { d: 12 } },
  { from: 'ines', t: '21:10', text: 'Good question. Install it now on Wi-Fi, but leave it switched off. The 30 days only start once it first connects in Japan.', card: { type: 'esim', plan: 'Japan', meta: '10 GB · 30 days', status: 'Installed · not active' } },
  { day: 'Today' },
  { from: 'you', t: '09:41', text: 'Landed! It connected straight away. Thank you!' },
  { from: 'ines', t: '09:42', text: 'Welcome to Japan. You’re on the strongest local network now — enjoy the trip. Anything else I can do?', quick: ['It works, thanks', 'Top up my data', 'My data isn’t connecting'], seen: true },
];

const REPLIES = [
  [/refund|money back|cancel/i, { text: 'You can get a full refund if your eSIM hasn’t been activated yet. I can start it for you — or read how refunds work first.', card: { type: 'article', title: 'Refunds — how and when', cat: 'Payment & billing', q: 'refund' } }],
  [/compat|support.*esim|my phone|iphone|samsung|pixel|galaxy|device/i, { text: 'Let’s make sure your phone is ready. The checker covers 9,496 devices.', card: { type: 'compat' } }],
  [/top ?up|more data|data left|running out/i, { text: 'You can add data in two taps — it stacks on your current plan, same QR code, nothing to reinstall.', card: { type: 'esim', plan: 'Japan', meta: '10 GB · 30 days', status: '6.4 GB left · 21 days' }, quick: ['Add 5 GB', 'Add 10 GB', 'Unlimited for 7 days'] }],
  [/not connect|no internet|isn.?t connecting|no signal|roaming/i, { text: 'Let’s fix it. Check these two first:\n1. Settings › Mobile Data › Openline is ON\n2. Data Roaming is ON for the Openline line\nStill stuck? I’ll refresh your line from here.', card: { type: 'article', title: 'eSIM installed but no data', cat: 'Troubleshooting', q: 'not connecting' } }],
  [/thank|works|great|perfect/i, { text: 'Anytime. Have a great trip — we’re here 24/7 if you need us.', rate: true }],
  [/install|qr|activate/i, { text: 'Installing takes under 2 minutes. Here’s the step-by-step for your phone.', card: { type: 'article', title: 'How to install your eSIM', cat: 'Installation', q: 'install' } }],
];

let S = null;   // live chat state
const FRESH = () => [{ from: 'gary', t: now(), text: 'Hi, I’m Gary, Openline’s assistant. How can I help you today?', quick: ['Check my phone', 'Help me install', 'My data isn’t connecting'] }];

// Every delayed reply belongs to this conversation generation. Clearing or
// closing cancels it, so an old message can never reappear in a new chat.
function later(fn, ms) {
  const owner = S, generation = owner.generation;
  const id = setTimeout(() => {
    owner.timers.delete(id);
    if (S === owner && owner.generation === generation) fn();
  }, ms);
  owner.timers.add(id);
}
function cancelPending() {
  S.generation++;
  S.timers.forEach(clearTimeout); S.timers.clear();
}
function releaseMessages(msgs) {
  msgs.forEach(m => {
    (m.files || []).forEach(f => { if (f.url?.startsWith('blob:')) URL.revokeObjectURL(f.url); });
    if (m.voice?.url?.startsWith('blob:')) URL.revokeObjectURL(m.voice.url);
  });
}

function load() {
  try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && Array.isArray(s.msgs)) return s; } catch { /* ignore */ }
  return { msgs: FRESH(), panel: true };
}
function save() {
  // Blob URLs (voice, uploads) don't survive a reload — store the text only.
  const msgs = S.msgs.filter(m => !m.typing).map((m) => ({ ...m, files: m.files && m.files.map((f) => ({ name: f.name, size: f.size, kind: f.kind })), voice: m.voice && { d: m.voice.d } }));
  try { localStorage.setItem(KEY, JSON.stringify({ msgs, panel: S.panel })); } catch { /* quota */ }
}

const now = () => new Date().toTimeString().slice(0, 5);
const kb = (n) => (n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
const dur = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

/* Waveform bars — deterministic per message so a re-render doesn't jitter. */
function wave(seed, n = 34) {
  let x = seed * 9301 + 49297; const bars = [];
  for (let i = 0; i < n; i++) { x = (x * 9301 + 49297) % 233280; bars.push(18 + Math.round((x / 233280) * 72 * Math.sin((i / n) * Math.PI) + 10)); }
  return bars.map((h) => `<i style="height:${Math.min(100, h)}%"></i>`).join('');
}

const SETTINGS_IMG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 300"><rect width="240" height="300" rx="18" fill="#F2F2F7"/><text x="20" y="40" font-family="system-ui" font-size="17" font-weight="700" fill="#111">Mobile Service</text><rect x="14" y="58" width="212" height="88" rx="12" fill="#fff"/><text x="28" y="86" font-family="system-ui" font-size="12" fill="#111">Mobile Data</text><rect x="178" y="74" width="34" height="20" rx="10" fill="#34C759"/><circle cx="202" cy="84" r="8" fill="#fff"/><line x1="28" y1="102" x2="212" y2="102" stroke="#E5E5EA"/><text x="28" y="128" font-family="system-ui" font-size="12" fill="#111">Primary · Home</text><rect x="14" y="160" width="212" height="44" rx="12" fill="#fff" stroke="#FF5314" stroke-width="2"/><text x="28" y="187" font-family="system-ui" font-size="13" font-weight="600" fill="#0A7AFF">Add eSIM</text><rect x="14" y="216" width="212" height="44" rx="12" fill="#fff"/><text x="28" y="243" font-family="system-ui" font-size="12" fill="#8E8E93">Transfer from nearby iPhone</text></svg>`)}`;

/* ── Rendering ─────────────────────────────────────────────────────── */

function avatar(who) {
  const a = AGENTS[who];
  return `<span class="olc-av${a.ai ? ' is-ai' : ''}" style="--c:${a.c}"${a.ai ? ' role="img" aria-label="Openline AI"' : ''}>${a.ai ? `<img src="${OPENLINE_MARK}" width="26" height="26" alt="">` : a.ini}</span>`;
}

function cardHTML(c) {
  if (c.type === 'device') return `<div class="olc-card olc-dev"><span class="olc-ok ${c.ok ? 'is-y' : 'is-n'}">${icon(c.ok ? 'check' : 'no', 18)}</span><div><b>${esc(c.name)}</b><small>${esc(c.meta)} · ${c.ok ? 'eSIM compatible' : 'No eSIM'}</small></div><button type="button" data-ol-open="compat" data-ol-q="${esc(c.name.replace(/^Apple /, ''))}">Check another</button></div>`;
  if (c.type === 'article') return `<button type="button" class="olc-card olc-art" data-ol-open="kb" data-ol-q="${esc(c.q || c.title)}">${icon('book', 20)}<div><small>${esc(c.cat)} · Knowledge base</small><b>${esc(c.title)}</b></div>${icon('chev', 16)}</button>`;
  if (c.type === 'esim') return `<div class="olc-card olc-esim"><span class="olc-flag">JP</span><div><b>${esc(c.plan)}</b><small>${esc(c.meta)}</small></div><em>${esc(c.status)}</em></div>`;
  if (c.type === 'compat') return `<button type="button" class="olc-card olc-art" data-ol-open="compat">${icon('phone', 20)}<div><small>9,496 devices</small><b>Check if my phone supports eSIM</b></div>${icon('chev', 16)}</button>`;
  return '';
}

function msgHTML(m, i) {
  if (m.day) return `<div class="olc-day"><span>${esc(m.day)}</span></div>`;
  if (m.typing) return `<div class="olc-msg is-them">${avatar(m.from)}<div class="olc-stack"><div class="olc-bub olc-typing" aria-label="${AGENTS[m.from].n} is typing"><i></i><i></i><i></i></div></div></div>`;
  const me = m.from === 'you';
  const a = AGENTS[m.from];
  /* consecutive messages from one person read as a group: name on the
     first, avatar on the last */
  const prev = S.msgs[i - 1], next = S.msgs[i + 1];
  const first = !(prev && prev.from === m.from && !prev.day);
  const last = !(next && next.from === m.from && !next.day && !next.typing);
  const parts = [];
  if (m.img) parts.push(`<img class="olc-img" src="${m.img === 'settings' ? SETTINGS_IMG : m.img}" alt="${esc(m.alt || 'Screenshot')}">`);
  if (m.files) parts.push(...m.files.map((f) => f.kind === 'image' && f.url ? `<img class="olc-img" src="${f.url}" alt="${esc(f.name)}">`
    : `<a class="olc-file" ${f.url ? `href="${f.url}" download="${esc(f.name)}"` : ''}>${ic('file', 20)}<span><b>${esc(f.name)}</b><small>${kb(f.size)}</small></span></a>`));
  if (m.voice) parts.push(`<div class="olc-voice" data-voice="${i}"><button type="button" aria-label="Play voice message">${ic('play', 16)}</button><span class="olc-wave">${wave(i + 3)}</span><small>${dur(m.voice.d)}</small></div>`);
  if (m.text) parts.push(`<div class="olc-bub">${nl2br(m.text)}</div>`);
  if (m.card) parts.push(cardHTML(m.card));
  if (m.rate) parts.push(`<div class="olc-card olc-rate"><span>How did we do?</span><div>${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-rate="${n}" aria-label="${n} star${n > 1 ? 's' : ''}">${ic('star', 20)}</button>`).join('')}</div></div>`);
  const status = me ? `<span class="olc-st">${m.state === 'sending' ? 'Sending…' : m.seen === false ? 'Delivered' : 'Seen'}</span>` : '';
  return `<div class="olc-msg ${me ? 'is-me' : 'is-them'}${first ? '' : ' is-cont'}">
    ${me ? '' : last ? avatar(m.from) : '<span class="olc-av is-gap"></span>'}
    <div class="olc-stack">
      ${me || !first ? '' : `<div class="olc-who"><b>${esc(a.n)}</b> ${esc(a.r)}</div>`}
      ${parts.join('')}
      <div class="olc-meta">${esc(m.t)} ${status}</div>
      ${m.quick && i === S.msgs.length - 1 ? `<div class="olc-quick">${m.quick.map((q) => `<button type="button" data-quick="${esc(q)}">${esc(q)}</button>`).join('')}</div>` : ''}
    </div></div>`;
}

function renderThread() {
  const th = S.root.querySelector('.olc-thread');
  const stick = th.scrollHeight - th.scrollTop - th.clientHeight < 160;
  const fresh = !S.msgs.some(m => m.from === 'you');
  th.querySelector('.olc-col').innerHTML = `
    ${fresh ? `<div class="olc-welcome"><span class="olc-welcome-icon"><img src="${OPENLINE_MARK}" width="58" height="58" alt=""></span><span class="olc-welcome-kicker">Welcome to Openline</span>${portraitRow()}<h3>Here to help you<br>stay connected.</h3><p>Questions before you go, or help on the move.<br>Let’s start with what you need.</p></div>` : `<div class="olc-intro">${portraitRow()}<b>Here to help you stay connected</b></div>`}
    ${S.msgs.map(msgHTML).join('')}`;
  if (fresh) th.scrollTop = 0;
  else if (stick || S.forceBottom) th.scrollTop = th.scrollHeight;
  S.forceBottom = false;
}

/* ── Sending + simulated replies ───────────────────────────────────── */

function push(m) { S.msgs.push(m); renderThread(); save(); }

function send({ text = '', files = null, voice = null } = {}) {
  text = text.trim();
  if (!text && !(files && files.length) && !voice) return;
  S.msgs.forEach((m) => { delete m.quick; });
  const m = { from: 'you', t: now(), text, files, voice, state: 'sending', seen: false };
  S.forceBottom = true;
  push(m);
  later(() => { m.state = 'sent'; renderThread(); }, 450);
  later(() => { m.seen = true; renderThread(); }, 1100);
  reply(text, files, voice);
}

function reply(text, files, voice) {
  let r = null;
  for (const [re, out] of REPLIES) if (re.test(text)) { r = out; break; }
  if (!r && files && files.length) r = { text: `Got ${files.length === 1 ? 'your file' : `your ${files.length} files`}, thanks — I’m having a look now.` };
  if (!r && voice) r = { text: 'Thanks for the voice note — I’ve listened to it. Give me a second to check your line.' };
  if (!r) r = { text: 'Thanks — I’m on it. While I check, these might already have your answer:', card: { type: 'article', title: `Search “${text.slice(0, 40)}” in the knowledge base`, cat: 'Self-help', q: text.slice(0, 60) } };
  const typing = { typing: true, from: 'ines' };
  later(() => { S.msgs.push(typing); S.forceBottom = true; renderThread(); }, 1300);
  later(() => {
    S.msgs = S.msgs.filter((x) => x !== typing);
    push({ from: 'ines', t: now(), ...r });
  }, 2900);
}

/* ── Composer: text, files, voice ──────────────────────────────────── */

function composer() {
  const owner = S;
  const root = S.root;
  const ta = root.querySelector('.olc-ta');
  const tray = root.querySelector('.olc-tray');
  const fileIn = root.querySelector('.olc-filein');
  const btnSend = root.querySelector('[data-send]');
  const btnMic = root.querySelector('[data-mic]');
  let pending = [];

  const grow = () => { ta.style.height = 'auto'; ta.style.height = Math.min(180, ta.scrollHeight) + 'px'; };
  const sync = () => { const has = ta.value.trim() || pending.length; btnSend.disabled = !has; root.querySelector('.olc-comp').classList.toggle('has-text', !!has); };
  const drawTray = () => {
    tray.hidden = !pending.length;
    tray.innerHTML = pending.map((f, i) => `<span class="olc-chip">${f.kind === 'image' ? `<img src="${f.url}" alt="">` : ic('file', 18)}<span><b>${esc(f.name)}</b><small>${kb(f.size)}</small></span><button type="button" data-rm="${i}" aria-label="Remove ${esc(f.name)}">${icon('x', 14)}</button></span>`).join('');
    tray.querySelectorAll('[data-rm]').forEach((b) => b.addEventListener('click', () => { URL.revokeObjectURL(pending[+b.dataset.rm].url); pending.splice(+b.dataset.rm, 1); drawTray(); sync(); }));
    sync();
  };
  const addFiles = (list) => {
    for (const f of list) {
      if (pending.length >= 6) { toast('Up to 6 files per message'); break; }
      if (f.size > 25 * 1048576) { toast(`${f.name} is over 25 MB`); continue; }
      pending.push({ name: f.name, size: f.size, kind: f.type.startsWith('image/') ? 'image' : 'file', url: URL.createObjectURL(f) });
    }
    drawTray();
  };
  S.addFiles = addFiles;

  ta.addEventListener('input', () => { grow(); sync(); });
  ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); go(); } });
  ta.addEventListener('paste', (e) => { const fs = [...(e.clipboardData?.files || [])]; if (fs.length) { e.preventDefault(); addFiles(fs); } });
  root.querySelector('[data-attach]').addEventListener('click', () => fileIn.click());
  fileIn.addEventListener('change', () => { addFiles([...fileIn.files]); fileIn.value = ''; });
  const go = () => { send({ text: ta.value, files: pending.length ? pending : null }); ta.value = ''; pending = []; drawTray(); grow(); ta.focus(); };
  btnSend.addEventListener('click', go);

  /* Drag & drop anywhere on the conversation */
  const main = root.querySelector('.olc-main');
  let dragN = 0;
  main.addEventListener('dragenter', (e) => { if ([...e.dataTransfer.types].includes('Files')) { dragN++; main.classList.add('is-drop'); } });
  main.addEventListener('dragleave', () => { if (--dragN <= 0) { dragN = 0; main.classList.remove('is-drop'); } });
  main.addEventListener('dragover', (e) => e.preventDefault());
  main.addEventListener('drop', (e) => { e.preventDefault(); dragN = 0; main.classList.remove('is-drop'); addFiles([...e.dataTransfer.files]); });

  /* Voice only records real audio. Permission failures do not fake a recording. */
  const rec = root.querySelector('.olc-rec');
  let mr = null, chunks = [], t0 = 0, timer = 0, stream = null, demo = false, raf = 0, recRun = 0, starting = false;
  const meter = rec.querySelector('.olc-meter');
  meter.innerHTML = '<i></i>'.repeat(28);
  const bars = [...meter.children];
  async function start() {
    if (starting || root.querySelector('.olc-comp').classList.contains('is-rec')) return;
    starting = true;
    const run = ++recRun;
    demo = false; chunks = [];
    try {
      const acquired = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (S !== owner || run !== recRun) { acquired.getTracks().forEach(t => t.stop()); return; }
      stream = acquired;
      mr = new MediaRecorder(stream);
      mr.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      mr.start();
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const an = ctx.createAnalyser(); an.fftSize = 64;
      ctx.createMediaStreamSource(stream).connect(an);
      const buf = new Uint8Array(an.frequencyBinCount);
      const loop = () => { an.getByteFrequencyData(buf); bars.forEach((b, i) => { b.style.height = `${12 + (buf[i % buf.length] / 255) * 88}%`; }); raf = requestAnimationFrame(loop); };
      loop();
      owner.audioCtx = ctx;
    } catch {
      if (S !== owner || run !== recRun) return;
      starting = false;
      if (mr && mr.state !== 'inactive') mr.stop();
      if (stream) stream.getTracks().forEach(t=>t.stop());
      stream = null; mr = null;
      if (owner.audioCtx) { owner.audioCtx.close(); owner.audioCtx = null; }
      toast('Microphone unavailable. Allow microphone access or type your message.');
      return;
    }
    starting = false;
    t0 = Date.now();
    root.querySelector('.olc-comp').classList.add('is-rec');
    rec.querySelector('.olc-demo').hidden = !demo;
    const tick = () => { rec.querySelector('.olc-time').textContent = dur((Date.now() - t0) / 1000); };
    tick(); timer = setInterval(tick, 250);
  }
  function stop(keep) {
    ++recRun; starting = false;
    clearInterval(timer); cancelAnimationFrame(raf); clearTimeout(raf);
    root.querySelector('.olc-comp').classList.remove('is-rec');
    const d = Math.max(1, Math.round((Date.now() - t0) / 1000));
    const finish = () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      if (owner.audioCtx) { owner.audioCtx.close(); owner.audioCtx = null; }
      stream = null;
      if (!keep || S !== owner || owner.generation !== generation) return;
      const url = chunks.length ? URL.createObjectURL(new Blob(chunks, { type: (mr && mr.mimeType) || 'audio/webm' })) : null;
      send({ voice: { d, url } });
    };
    const generation = owner.generation;
    if (mr && mr.state !== 'inactive') { mr.onstop = finish; mr.stop(); } else finish();
    mr = null;
  }
  btnMic.addEventListener('click', start);
  rec.querySelector('[data-rec-cancel]').addEventListener('click', () => stop(false));
  rec.querySelector('[data-rec-send]').addEventListener('click', () => stop(true));
  S.stopRec = () => stop(false);
  S.resetComposer = () => {
    stop(false);
    pending.forEach(f => URL.revokeObjectURL(f.url)); pending = [];
    ta.value = ''; fileIn.value = ''; drawTray(); grow(); sync();
  };
  sync();
}

/* Playback of voice bubbles: real audio when we have it, an animated
   progress sweep for the sample history. */
function onVoice(el) {
  const m = S.msgs[+el.dataset.voice];
  if (!m || !m.voice) return;
  const btn = el.querySelector('button');
  const bars = [...el.querySelectorAll('.olc-wave i')];
  if (S.playing) { const same = S.playing.el === el; S.playing.stop(); if (same) return; }
  const d = m.voice.d;
  let audio = null;
  if (m.voice.url) { audio = new Audio(m.voice.url); audio.play().catch(() => {}); }
  const t0 = Date.now();
  btn.innerHTML = ic('pause', 16);
  const step = () => {
    const p = audio && audio.duration && isFinite(audio.duration) ? audio.currentTime / audio.duration : (Date.now() - t0) / (d * 1000);
    bars.forEach((b, i) => b.classList.toggle('is-on', i / bars.length <= p));
    if (p >= 1 || (audio && audio.ended)) return stop();
    S.playing.raf = requestAnimationFrame(step);
  };
  const stop = () => { cancelAnimationFrame(S.playing && S.playing.raf); if (audio) audio.pause(); btn.innerHTML = ic('play', 16); bars.forEach((b) => b.classList.remove('is-on')); if (S.playing && S.playing.el === el) S.playing = null; };
  S.playing = { el, stop, raf: 0 };
  step();
}

function toast(msg) {
  const t = S.root.querySelector('.olc-toast');
  t.textContent = msg; t.classList.add('is-on');
  clearTimeout(S.toastT); S.toastT = setTimeout(() => t.classList.remove('is-on'), 2600);
}

/* ── Side panel ────────────────────────────────────────────────────── */

function panelHTML() {
  const waText = encodeURIComponent('Hi Openline, I’d like some help with my eSIM.');
  return `
  <div class="olc-sidehead"><b>More ways to get help</b><button type="button" data-panel aria-label="Close help sidebar" aria-controls="olc-side-content">${ic('right', 20)}</button></div>
  <div class="olc-sec">
    <h3>Continue on</h3>
    <a class="olc-ch" href="https://wa.me/${WA}?text=${waText}" target="_blank" rel="noopener" style="--c:#1FA855">${ic('wa', 20)}<span><b>WhatsApp</b><small>+1 (555) 484-2461</small></span>${icon('ext', 15)}</a>
    <a class="olc-ch" href="https://ig.me/m/askopenline" target="_blank" rel="noopener" style="--c:#D62976">${ic('ig', 20)}<span><b>Instagram</b><small>@askopenline</small></span>${icon('ext', 15)}</a>
    <a class="olc-ch" href="https://m.me/askopenline" target="_blank" rel="noopener" style="--c:#0A7CFF">${ic('ms', 20)}<span><b>Messenger</b><small>m.me/askopenline</small></span>${icon('ext', 15)}</a>
    <a class="olc-ch" href="mailto:ask@openline.com" style="--c:#0B0B0F">${ic('mail', 20)}<span><b>Email</b><small>ask@openline.com</small></span>${icon('ext', 15)}</a>
  </div>
  <div class="olc-sec">
    <h3>Ask an AI about us</h3>
    <p class="olc-hint">Get another perspective. Choose a question, make it yours, then copy it to your favourite AI.</p>
    <div class="olc-presets">${PROMPTS.map(([l], i) => `<button type="button" data-preset="${i}" class="${i === 0 ? 'is-on' : ''}">${esc(l)}</button>`).join('')}</div>
    <textarea class="olc-prompt" rows="3" aria-label="Question for the AI">${esc(PROMPTS[0][1])}</textarea>
    <div class="olc-ais">${AIS.map((a) => `<button type="button" data-ai="${a.k}" style="--c:${a.c}">${aiLogo(a)}${a.n}</button>`).join('')}</div>
  </div>
  <div class="olc-sec">
    <h3>Help yourself</h3>
    <button type="button" class="olc-ch" data-ol-open="kb" style="--c:#FF5314">${icon('book', 20)}<span><b>Knowledge base</b><small>2,737 articles · ⌘K</small></span>${icon('chev', 15)}</button>
    <button type="button" class="olc-ch" data-ol-open="compat" style="--c:#FF5314">${icon('phone', 20)}<span><b>Device compatibility</b><small>Instant check, 9,496 devices</small></span>${icon('chev', 15)}</button>
  </div>
  <div class="olc-sec">
    <h3>This conversation</h3>
    <div class="olc-tools">
      <button type="button" data-transcript>${ic('dl', 16)} Transcript</button>
      <button type="button" data-clear>${ic('trash', 16)} Clear chat</button>
    </div>
    <a class="olc-changes" href="/qa#qa-changes">Changes &amp; delivery notes ${icon('chev', 14)}</a>
  </div>`;
}

function chatDialog(html) {
  const owner = S;
  const dialog = document.createElement('dialog');
  dialog.className = 'olc-dialog';
  dialog.setAttribute('aria-labelledby', 'olc-dialog-title');
  dialog.innerHTML = `<button class="olc-dialog-x" type="button" aria-label="Close dialog" data-dismiss>${icon('x', 20)}</button>${html}`;
  owner.root.appendChild(dialog);
  dialog.querySelectorAll('[data-dismiss]').forEach(b => b.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('close', () => dialog.remove());
  dialog.addEventListener('click', e => {
    const b = dialog.getBoundingClientRect();
    if (e.target === dialog && (e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom)) dialog.close();
  });
  dialog.showModal();
  return dialog;
}

function aiHandoff(a, prompt) {
  const d = chatDialog(`
    <div class="olc-dialog-icon is-ai">${aiLogo(a)}</div>
    <span class="olc-dialog-kicker">Your question, your AI</span>
    <h2 id="olc-dialog-title">Continue with ${a.n}</h2>
    <p>We’ll point you to ${a.n}. Open a conversation there and paste your clipboard to ask your question.</p>
    <ol class="olc-handoff-steps"><li><b>1</b> Copy your prompt</li><li><b>2</b> Open ${a.n}</li><li><b>3</b> Paste and send</li></ol>
    <label class="olc-dialog-label" for="olc-handoff-prompt">Your prompt</label>
    <textarea id="olc-handoff-prompt" class="olc-handoff-prompt" readonly>${esc(prompt)}</textarea>
    <p class="olc-copy-status" role="status">Copying your prompt…</p>
    <div class="olc-dialog-actions"><button type="button" data-copy-prompt>${ic('copy', 17)} Copy again</button><a class="is-primary" href="${a.url}" target="_blank" rel="noopener noreferrer">Open ${a.n} ${icon('ext', 16)}</a></div>
    <p class="olc-dialog-fine">Only this prompt goes on your clipboard. Your Openline chat is not shared. The official web app opens in a new tab; your device may offer its installed app. Sign in there if needed.</p>`);
  const copy = async () => {
    const status = d.querySelector('.olc-copy-status');
    try {
      await navigator.clipboard.writeText(prompt);
      status.textContent = 'Prompt copied. Open your AI, then paste.';
      status.classList.add('is-copied');
    } catch {
      status.textContent = 'Automatic copy was blocked. Select and copy the prompt above before opening your AI.';
      status.classList.remove('is-copied');
      const ta = d.querySelector('textarea'); ta.focus(); ta.select();
    }
  };
  d.querySelector('[data-copy-prompt]').addEventListener('click', copy);
  copy();
}

function confirmClear() {
  const owner = S;
  const d = chatDialog(`
    <div class="olc-dialog-icon">${ic('trash', 34)}</div>
    <span class="olc-dialog-kicker">A fresh start</span>
    <h2 id="olc-dialog-title">Clear this chat?</h2>
    <p>Clear this conversation and return to the welcome screen for a fresh start.</p>
    <p class="olc-dialog-fine">This action cannot be undone. Download your transcript first if you’d like to keep it.</p>
    <div class="olc-dialog-actions"><button type="button" data-dismiss autofocus>Keep chatting</button><button type="button" class="is-primary" data-confirm-clear>Clear chat &amp; start fresh</button></div>`);
  d.querySelector('[data-confirm-clear]').addEventListener('click', () => {
    if (S !== owner) return;
    cancelPending();
    if (S.playing) S.playing.stop();
    S.resetComposer?.();
    releaseMessages(S.msgs);
    S.msgs = FRESH(); S.forceBottom = false;
    renderThread(); save();
    S.root.querySelector('.olc-thread').scrollTop = 0;
    d.close();
    // On a small screen, reveal the welcome instead of leaving it behind the sidebar.
    if (innerWidth <= 980) { S.panel = false; syncPanel(); save(); }
    S.root.querySelector('.olc-ta').focus({ preventScroll: true });
    toast('Chat cleared. Ready for a fresh start.');
  });
}

function wirePanel() {
  const root = S.root;
  const pr = root.querySelector('.olc-prompt');
  root.querySelectorAll('[data-preset]').forEach((b) => b.addEventListener('click', () => {
    pr.value = PROMPTS[+b.dataset.preset][1];
    root.querySelectorAll('[data-preset]').forEach((x) => x.classList.toggle('is-on', x === b));
  }));
  pr.addEventListener('input', () => root.querySelectorAll('[data-preset]').forEach(x => x.classList.remove('is-on')));
  root.querySelectorAll('[data-ai]').forEach((b) => b.addEventListener('click', () => {
    const a = AIS.find((x) => x.k === b.dataset.ai);
    const q = pr.value.trim();
    if (!q) { toast('Write a question or choose a prompt first'); pr.focus(); return; }
    aiHandoff(a, q);
  }));
  root.querySelector('[data-clear]').addEventListener('click', confirmClear);
  root.querySelector('[data-transcript]').addEventListener('click', () => {
    const txt = S.msgs.filter((m) => !m.typing).map((m) => (m.day ? `\n— ${m.day} —` : `[${m.t}] ${AGENTS[m.from].n}: ${m.text || ''}${m.voice ? ' (voice message)' : ''}${m.files ? ` (${m.files.map((f) => f.name).join(', ')})` : ''}${m.card && m.card.title ? ` [${m.card.title}]` : ''}`)).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([`Openline support\n${txt}\n`], { type: 'text/plain' }));
    a.download = 'openline-chat-transcript.txt'; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
}

/* ── Open / close ──────────────────────────────────────────────────── */

function syncPanel() {
  const root = S.root;
  root.classList.toggle('is-collapsed', !S.panel);
  root.querySelector('.olc-sidein').inert = !S.panel;
  const rail = root.querySelector('.olc-rail');
  rail.tabIndex = S.panel ? -1 : 0;
  rail.setAttribute('aria-hidden', String(S.panel));
  root.querySelectorAll('[data-panel]').forEach(b => b.setAttribute('aria-expanded', String(S.panel)));
}

export function openChat(o = {}) {
  if (S && S.root.isConnected) { if (o.q) S.root.querySelector('.olc-ta').value = o.q; return; }
  const st = load();
  S = { ...st, panel: !!st.panel && innerWidth > 980, root: null, ret: document.activeElement, forceBottom: true, generation: 0, timers: new Set(), portraits: shuffledPortraits() };
  const root = document.createElement('div');
  root.className = `olc${S.panel && innerWidth > 980 ? '' : ' is-collapsed'}`;
  root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'Openline support chat');
  root.innerHTML = `
    <header class="olc-head">
      <div class="olc-brand">
        <img class="olc-brand-mark" src="${OPENLINE_MARK}" width="34" height="34" alt="">
        <div><h2>Talk to <em>Openline</em></h2><p><i class="olc-live"></i>Here to help</p></div>
      </div>
      <div class="olc-hacts">
        <button type="button" class="olc-hbtn" data-ol-open="kb">${icon('book', 18)}<span>Knowledge base</span></button>
        <button type="button" class="olc-hbtn" data-ol-open="compat">${icon('phone', 18)}<span>Check my phone</span></button>
        <button type="button" class="olc-hbtn is-ic" data-panel aria-label="Toggle side panel" aria-controls="olc-side-content">${ic('panel', 19)}</button>
        <button type="button" class="olc-hbtn is-ic is-x" data-close aria-label="Close chat">${icon('x', 19)}</button>
      </div>
    </header>
    <div class="olc-grid">
      <section class="olc-main" aria-label="Conversation">
        <div class="olc-thread" aria-live="polite"><div class="olc-col"></div></div>
        <div class="olc-dropzone">${ic('clip', 30)}<b>Drop files to attach</b><span>Screenshots, PDFs, receipts — up to 25 MB each</span></div>
        <div class="olc-dock">
          <div class="olc-tray" hidden></div>
          <div class="olc-comp">
            <button type="button" class="olc-cbtn" data-attach aria-label="Attach files">${ic('clip', 20)}</button>
            <input type="file" class="olc-filein" multiple hidden accept="image/*,application/pdf,.txt,.doc,.docx,.heic">
            <textarea class="olc-ta" rows="1" placeholder="Write a message…" aria-label="Message"></textarea>
            <div class="olc-rec" aria-live="polite">
              <i class="olc-recdot"></i><span class="olc-time">0:00</span><span class="olc-meter"></span>
              <small class="olc-demo" hidden></small>
              <button type="button" class="olc-cbtn" data-rec-cancel aria-label="Discard recording">${ic('trash', 19)}</button>
              <button type="button" class="olc-cbtn is-send" data-rec-send aria-label="Send voice message">${ic('send', 20)}</button>
            </div>
            <button type="button" class="olc-cbtn" data-mic aria-label="Record a voice message">${ic('mic', 20)}</button>
            <button type="button" class="olc-cbtn is-send" data-send aria-label="Send" disabled>${ic('send', 20)}</button>
          </div>
          <p class="olc-fine">Enter to send · Shift+Enter for a new line · drop or paste files</p>
        </div>
      </section>
      <aside class="olc-side" aria-label="More ways to get help">
        <div class="olc-sidein" id="olc-side-content">${panelHTML()}</div>
        <button class="olc-rail" type="button" data-panel aria-label="Open help sidebar" aria-controls="olc-side-content" title="Open help sidebar">
          <span class="olc-rail-arrow">${ic('left', 22)}</span>
          <span style="--c:#1FA855">${ic('wa', 20)}</span>
          <span style="--c:#D62976">${ic('ig', 20)}</span>
          <span style="--c:#0A7CFF">${ic('ms', 20)}</span>
          <span style="--c:#7A4BFF">${ic('spark', 20)}</span>
          <span style="--c:#FF5314">${icon('book', 20)}</span>
          <span style="--c:#FF5314">${icon('phone', 20)}</span>
          <span class="olc-rail-label">More help</span>
        </button>
      </aside>
    </div>
    <div class="olc-toast" role="status"></div>`;
  S.root = root;
  document.body.appendChild(root);
  document.documentElement.classList.add('ols-lock', 'ols-chat-open');
  requestAnimationFrame(() => root.classList.add('is-in'));

  renderThread();
  composer();
  wirePanel();
  syncPanel();
  if (o.q) root.querySelector('.olc-ta').value = o.q;
  if (o.topic) root.querySelector('.olc-ta').value = `Question about “${o.topic}”: `;
  root.querySelector('.olc-ta').dispatchEvent(new Event('input'));

  root.querySelectorAll('[data-panel]').forEach((b) => b.addEventListener('click', () => {
    S.panel = !S.panel;
    syncPanel();
    if (S.panel) root.querySelector('.olc-sidehead button').focus({ preventScroll: true });
    else root.querySelector('.olc-hbtn[data-panel]').focus({ preventScroll: true });
    save();
  }));
  root.querySelector('[data-close]').addEventListener('click', closeChat);
  root.addEventListener('click', (e) => {
    const q = e.target.closest('[data-quick]'); if (q) return send({ text: q.dataset.quick });
    const v = e.target.closest('[data-voice] button'); if (v) return onVoice(v.closest('[data-voice]'));
    const r = e.target.closest('[data-rate]');
    if (r) { const n = +r.dataset.rate; r.parentNode.querySelectorAll('[data-rate]').forEach((x) => x.classList.toggle('is-on', +x.dataset.rate <= n)); toast(`Thanks for the ${n}-star rating`); }
  });
  S.onKey = (e) => { if (e.key === 'Escape' && !document.querySelector('.ols-overlay') && !root.querySelector('dialog[open]')) closeChat(); };
  document.addEventListener('keydown', S.onKey);
  later(() => root.querySelector('.olc-ta').focus({ preventScroll: true }), 80);
}

export function closeChat() {
  if (!S || !S.root) return;
  const { root, ret } = S;
  cancelPending();
  S.resetComposer?.();
  if (S.playing) S.playing.stop();
  S.msgs = S.msgs.filter(m => !m.typing); save();
  releaseMessages(S.msgs);
  clearTimeout(S.toastT);
  root.querySelectorAll('dialog[open]').forEach(d => d.close());
  document.removeEventListener('keydown', S.onKey);
  root.classList.remove('is-in');
  document.documentElement.classList.remove('ols-chat-open');
  if (!document.querySelector('.ols-overlay')) document.documentElement.classList.remove('ols-lock');
  setTimeout(() => root.remove(), 240);
  S = null;
  if (location.hash.startsWith('#chat')) history.replaceState(null, '', location.pathname + location.search);
  if (ret && ret.focus) try { ret.focus(); } catch { /* ignore */ }
}
