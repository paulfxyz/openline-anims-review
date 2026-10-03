/* Wires the support surfaces into any captured /qa page: the site's own
   bottom-right support badge opens the redesigned chat, and the KB /
   compatibility triggers (markup, #hash, ⌘K) become live. On /qa/chat the
   chat opens straight away (add ?closed to land on the page instead). */
import './support.js';

document.querySelectorAll('.lucide-list-checks').forEach((svg) => {
  let e = svg;
  while (e && e !== document.body && getComputedStyle(e).position !== 'fixed') e = e.parentElement;
  if (e && e !== document.body) e.remove();
});

document.addEventListener('click', (e) => {
  const b = e.target.closest && e.target.closest('[aria-label="Open support chat"]');
  if (!b) return;
  e.preventDefault();
  e.stopPropagation();
  window.Openline.open('chat');
}, true);

/* Irina's triggers on the live site, rewired to the new modals:
   "Check your device compatibility" (installation guide) and the header
   search / help links. QA chrome and the modals themselves are skipped. */
const TEXT_TRIGGERS = [[/device compatibility|is my phone compatible|check compatibility/i, 'compat'], [/^(knowledge base|help cent(er|re)|search help)$/i, 'kb']];
document.addEventListener('click', (e) => {
  const b = e.target.closest && e.target.closest('a, button');
  if (!b || b.closest('#qa-ui, .qa-dock, .olc, .ols-overlay, [data-ol-open]')) return;
  const t = (b.innerText || '').trim();
  const hit = TEXT_TRIGGERS.find(([re]) => re.test(t));
  if (!hit) return;
  e.preventDefault();
  window.Openline.open(hit[1]);
}, true);

if (/\/qa\/chat(\.html)?$/.test(location.pathname) && !new URLSearchParams(location.search).has('closed') && !/^#(kb|compat)/.test(location.hash)) {
  window.Openline.open('chat');
}
