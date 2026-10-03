/* QA-only adapter for the existing /producthunt design. No network writes,
   proof-link requests, real discounts, email delivery or persistent storage. */
const $ = id => document.getElementById(id);
const modal = $('mk');
let epoch = 0, lane = 'ph', opener = null, overflow = '', timers = [];
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const cancel = () => { epoch++; timers.forEach(clearTimeout); timers = []; };
const later = (fn, ms) => {
  const run = epoch;
  timers.push(setTimeout(() => { if (run === epoch && modal.open) fn(); }, reduced() ? 40 : ms));
};
function resetErrors() {
  for (const id of ['mkLink', 'mkMail']) {
    $(id + 'Err').classList.remove('on'); $(id).removeAttribute('aria-invalid');
  }
  modal.querySelectorAll('.mk-work-row').forEach(row => { row.classList.remove('done'); row.querySelector('.t').textContent = '—'; });
  $('phCopyStatus').textContent = ''; $('phCopyFallback').hidden = true;
}
function show(n) {
  modal.querySelectorAll('.mk-step').forEach(step => {
    const on = Number(step.dataset.step) === n;
    step.classList.toggle('on', on);
    if (on) {
      const title = step.querySelector('h3');
      title.id = `phStepTitle${n}`; title.tabIndex = -1;
      modal.setAttribute('aria-labelledby', title.id);
      title.focus({ preventScroll:true });
    }
  });
  modal.querySelectorAll('.mk-rail i').forEach(i => i.classList.toggle('on', Number(i.dataset.rail) <= n));
  modal.querySelector('.mk-card').scrollTop = 0;
  modal.dataset.claimStep = String(n);
}
function chooseLane(next) {
  lane = next;
  modal.querySelectorAll('[data-lane]').forEach(b => {
    b.classList.toggle('sel', b.dataset.lane === lane);
    b.setAttribute('aria-pressed', String(b.dataset.lane === lane));
  });
  $('mkLink').placeholder = lane === 'ph' ? 'https://www.producthunt.com/posts/openline#comment-demo' : 'https://example.com/my-openline-post';
}
function open(prefill = '') {
  cancel(); resetErrors(); opener = document.activeElement;
  $('mkLink').value = prefill; $('mkMail').value = '';
  let host = '';
  try { host = new URL(prefill).hostname.toLowerCase(); } catch { /* empty / invalid */ }
  chooseLane(prefill && host !== 'producthunt.com' && !host.endsWith('.producthunt.com') ? 'post' : 'ph');
  overflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  modal.classList.add('on'); modal.showModal(); show(1);
  $('mkLink').focus({ preventScroll:true });
}
function parseLink(value) {
  try {
    const u = new URL(value.trim());
    return ['http:', 'https:'].includes(u.protocol) && u.hostname.includes('.') && !u.username && !u.password ? u : null;
  } catch { return null; }
}
function submit() {
  if (modal.dataset.claimStep !== '1') return;
  const url = parseLink($('mkLink').value);
  const rightHost = url && (lane !== 'ph' || url.hostname.toLowerCase() === 'producthunt.com' || url.hostname.toLowerCase().endsWith('.producthunt.com'));
  const mailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('mkMail').value.trim());
  const valid = { mkLink:!!rightHost, mkMail:mailOK };
  $('mkLinkErr').textContent = url && !rightHost ? 'Use a producthunt.com link, or choose “A post elsewhere”.' : 'Enter a complete http or https link. Its content is not checked in this preview.';
  for (const [id, ok] of Object.entries(valid)) {
    $(id + 'Err').classList.toggle('on', !ok);
    if (!ok) $(id).setAttribute('aria-invalid', 'true'); else $(id).removeAttribute('aria-invalid');
  }
  if (!rightHost || !mailOK) { $(!rightHost ? 'mkLink' : 'mkMail').focus(); return; }
  cancel(); show(2);
  modal.querySelectorAll('.mk-work-row').forEach((row, i) => later(() => {
    row.classList.add('done'); row.querySelector('.t').textContent = 'Demo';
  }, 400 + i * 430));
  later(() => {
    $('mkCode').textContent = `DEMO-PH-10-${Math.random().toString(36).slice(2,8).toUpperCase().padEnd(6,'0')}`;
    $('mkMailEcho').textContent = $('mkMail').value.trim();
    show(3);
  }, 1800);
}
document.querySelectorAll('[data-open-claim]').forEach(b => b.addEventListener('click', () => open()));
document.querySelectorAll('[data-close-claim]').forEach(b => b.addEventListener('click', () => modal.close()));
modal.addEventListener('close', () => {
  cancel(); modal.classList.remove('on'); document.body.style.overflow = overflow;
  $('mkLink').value = ''; $('mkMail').value = ''; resetErrors();
  opener?.focus({ preventScroll:true });
});
modal.addEventListener('keydown', e => {
  e.stopPropagation(); // Keep QA/support shortcuts out of the native dialog.
  if (e.key === 'Enter' && e.target.matches('input')) { e.preventDefault(); submit(); }
});
modal.querySelectorAll('[data-lane]').forEach(b => b.addEventListener('click', () => { chooseLane(b.dataset.lane); $('mkLink').focus(); }));
for (const id of ['mkLink','mkMail']) $(id).addEventListener('input', () => { $(id+'Err').classList.remove('on'); $(id).removeAttribute('aria-invalid'); });
$('mkSubmit').addEventListener('click', submit);
$('mkAnother').addEventListener('click', () => { cancel(); resetErrors(); $('mkLink').value = ''; show(1); $('mkLink').focus(); });
$('mkCopy').addEventListener('click', async () => {
  const status = $('phCopyStatus'), code = $('mkCode').textContent, run = epoch;
  try {
    await navigator.clipboard.writeText(code);
    if (run !== epoch || !modal.open) return;
    status.textContent = 'Demo code copied. It cannot be redeemed.'; status.classList.remove('is-error');
  } catch {
    if (run !== epoch || !modal.open) return;
    status.textContent = 'Clipboard access is blocked. Copy the selected demo code manually.'; status.classList.add('is-error');
    const field = $('phCopyFallback'); field.value = code; field.hidden = false; field.focus(); field.select();
  }
});
function handoff() {
  const text = $('inlineLink').value.trim();
  const valid = !text || !!parseLink(text);
  $('inlineErr').classList.toggle('on', !valid);
  if (!valid) { $('inlineLink').setAttribute('aria-invalid','true'); $('inlineLink').focus(); return; }
  $('inlineLink').removeAttribute('aria-invalid');
  open(text);
}
$('inlineGo').addEventListener('click', handoff);
$('inlineLink').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); handoff(); } });
$('inlineLink').addEventListener('input', () => { $('inlineErr').classList.remove('on'); $('inlineLink').removeAttribute('aria-invalid'); });
// Only directional CTA arrows move, not trophy, cart, copy or check icons.
document.querySelectorAll('.hero-btns [data-open-claim] > svg, #inlineGo > svg').forEach(svg => svg.classList.add('ph-action-arrow'));
document.body.dataset.phReady = 'true';
