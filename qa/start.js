/* Standalone /qa/start process prototype.
   No redemption, provisioning, account or messaging API is called.
   Checking, confirmation and activation are separate state transitions.
   Purchase-code values live in memory only, never storage or URLs. */
import { glyphSVG } from './icons-lib.js';
import { initProfileFlow } from './start-profile.js';
import './support/support.js';

const $ = (selector) => document.querySelector(selector);
const EXAMPLE = 'GAZE19-MULCH29-NYMPH13';
const CODE_FORMAT = /^[A-Z]{3,10}\d{2}(?:-[A-Z]{3,10}\d{2}){2}$/;
const actionArrowSVG = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
const forwardArrow = () => `<span class="sp-action-arrow" data-action-arrow="right" aria-hidden="true">${actionArrowSVG}</span>`;
document.querySelectorAll('[data-action-arrow]').forEach(el => {
  el.innerHTML = actionArrowSVG;
  el.closest('a,button')?.classList.add('sp-motion');
});
const copyGlyph = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/></svg>';
const folderGlyph = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8V6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M3 10h18"/></svg>';
document.querySelectorAll('[data-icon]').forEach(el => {
  el.innerHTML = el.dataset.icon === 'copy' ? copyGlyph : el.dataset.icon === 'folder' ? folderGlyph
    : el.dataset.icon === 'menu' ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>'
    : el.dataset.icon === 'chevron-down' ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>'
    : glyphSVG(el.dataset.icon, { size: 24, sw: 1.8 });
});
document.querySelectorAll('.sp-key svg path').forEach(path => path.setAttribute('pathLength', '1'));

const input = $('#sp-code');
const consent = $('#sp-consent');
const confirmButton = $('#sp-confirm-activate');
const dialogs = [...document.querySelectorAll('.sp-dialog')];
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let state = 'entry';
let currentCode = '';
let generation = 0;
let activatedAt = null;
let toastTimer = 0;

const normalize = (value) => String(value).trim().toUpperCase()
  .replace(/[‐‑‒–—−]/g, '-').replace(/\s+/g, '-').replace(/-+/g, '-');
const wait = (ms) => new Promise(resolve => setTimeout(resolve, reduced() ? Math.min(ms, 80) : ms));

function announce(message) {
  const toast = $('#sp-toast');
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 3800);
}

function setState(next, focus = true) {
  state = next;
  $('#sp-stage').dataset.state = next;
  const activeSection = next === 'checking' ? 'entry' : next;
  ['entry', 'review', 'creating', 'success'].forEach(name => {
    $('#sp-' + name).hidden = name !== activeSection;
  });
  const index = ['entry', 'checking'].includes(next) ? 0 : next === 'review' ? 1 : 2;
  document.querySelectorAll('.sp-steps li').forEach((li, i) => {
    li.classList.toggle('is-done', i < index);
    if (i === index) li.setAttribute('aria-current', 'step');
    else li.removeAttribute('aria-current');
  });
  const busy = next === 'checking';
  $('#sp-scenario').disabled = busy || next === 'creating';
  input.disabled = busy;
  $('#sp-check').disabled = busy;
  $('#sp-clear').disabled = busy;
  $('#sp-example').disabled = busy;
  $('#sp-entry-gift').disabled = busy;
  $('#sp-code-form').setAttribute('aria-busy', String(busy));
  $('#sp-check').innerHTML = busy
    ? '<span class="sp-loader" aria-hidden="true"></span><span>Checking your code…</span>'
    : `<span>Check my code</span>${forwardArrow()}`;
  if (focus && ['review', 'creating', 'success'].includes(next)) {
    const title = $('#sp-' + next + '-title');
    title?.focus({ preventScroll: true });
    $('#sp-main').scrollIntoView({ block: 'start', behavior: reduced() ? 'auto' : 'smooth' });
  }
}

function showCodeError(message) {
  const error = $('#sp-code-error');
  error.textContent = message;
  error.hidden = false;
  input.setAttribute('aria-invalid', 'true');
  input.focus({ preventScroll: false });
}

function clearCodeError() {
  $('#sp-code-error').hidden = true;
  input.removeAttribute('aria-invalid');
}

function populateCode() {
  document.querySelectorAll('[data-current-code]').forEach(el => { el.textContent = currentCode; });
}

async function checkCode(intent = 'review') {
  if (['checking', 'creating', 'success'].includes(state)) return;
  clearCodeError();
  const code = normalize(input.value);
  input.value = code;
  $('#sp-clear').hidden = !code;
  if (!code) return showCodeError('Enter your purchase code first.');
  if (!CODE_FORMAT.test(code)) return showCodeError('Use all three parts of the code, like GAZE19-MULCH29-NYMPH13. Check that each part ends with two numbers.');
  const token = ++generation;
  const response = $('#sp-scenario').value;
  setState('checking', false);
  await wait(950);
  if (token !== generation) return;
  if (response === 'not-found' || response === 'used' || response === 'network') {
    setState('entry', false);
    const errors = {
      'not-found': 'We couldn’t find that purchase code. Check the spelling and try again. Nothing has been activated.',
      used: 'This purchase code has already been activated. Go to your account to find the eSIM; it can’t be redeemed or gifted again.',
      network: 'We couldn’t check the code right now. Nothing has changed. Check your connection and try again.',
    };
    return showCodeError(errors[response]);
  }
  currentCode = code;
  activatedAt = null;
  populateCode();
  $('#sp-review-error').hidden = true;
  setState('review');
  if (intent === 'gift') openGift();
}

function openDialog(dialog) {
  dialogs.forEach(d => { if (d !== dialog && d.open) d.close(); });
  $('#sp-copy-fallback').hidden = true;
  if (!dialog.open) dialog.showModal();
}

function openConfirmation() {
  if (state !== 'review' || !currentCode || activatedAt) return;
  consent.checked = false;
  $('.sp-switch-state').textContent = 'Not yet';
  confirmButton.disabled = true;
  $('#sp-review-error').hidden = true;
  openDialog($('#sp-confirm'));
  $('#sp-confirm [data-close][autofocus]').focus({ preventScroll: true });
  $('#sp-confirm').scrollTop = 0;
}

function openGift() {
  if (state !== 'review' || !currentCode || activatedAt) return;
  populateCode();
  $('#sp-gift .sp-copy-feedback')?.remove();
  openDialog($('#sp-gift'));
}

function progress(value, completedSteps) {
  $('.sp-progress').setAttribute('aria-valuenow', String(value));
  $('.sp-progress > span').style.transform = `scaleX(${value / 100})`;
  document.querySelectorAll('[data-build]').forEach((el, i) => el.classList.toggle('is-done', i < completedSteps));
}

async function activate() {
  // The only transition that consumes a code in this fictional state model.
  // Production integration must perform its authenticated server action here,
  // not in checkCode(), and return authoritative status before showing success.
  if (state !== 'review' || !consent.checked || !currentCode || activatedAt) return;
  const token = ++generation;
  const outcome = $('#sp-scenario').value;
  confirmButton.disabled = true;
  $('#sp-confirm').close();
  const parts = currentCode.split('-');
  document.querySelectorAll('.sp-code-parts code').forEach((el, i) => { el.textContent = parts[i]; });
  $('#sp-motion-copy').textContent = 'Creating your eSIM profile…';
  $('#sp-creating').classList.remove('is-moving');
  progress(0, 0);
  setState('creating');
  // Start the materialisation timeline only after its stage is visible.
  void $('#sp-creating').offsetWidth;
  $('#sp-creating').classList.add('is-moving');
  progress(22, 1);
  await wait(1350);
  if (token !== generation) return;
  progress(62, 1);
  $('#sp-motion-copy').textContent = 'Assigning your data plan…';
  await wait(1100);
  if (token !== generation) return;
  if (outcome === 'activation-error') {
    setState('review');
    const error = $('#sp-review-error');
    error.textContent = 'Activation couldn’t be completed. Your code is still unused, so you can try again, keep it or gift it.';
    error.hidden = false;
    return;
  }
  progress(90, 2);
  $('#sp-motion-copy').textContent = 'Your profile is ready to install.';
  await wait(750);
  if (token !== generation) return;
  progress(100, 3);
  await wait(350);
  if (token !== generation) return;
  activatedAt = new Date();
  const end = new Date(activatedAt.getTime() + 30 * 24 * 60 * 60 * 1000);
  $('#sp-valid-until').dateTime = end.toISOString();
  $('#sp-valid-until').textContent = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(end);
  setState('success');
  profileFlow.open('details');
}

async function copyText(text, origin, successMessage = 'Copied. Your purchase code is still unused.') {
  const dialog = origin.closest('dialog');
  const feedback = (message, failed = false) => {
    if (!dialog) return announce(message);
    let p = dialog.querySelector('.sp-copy-feedback');
    if (!p) {
      p = document.createElement('p'); p.className = 'sp-copy-feedback'; p.setAttribute('role', 'status');
      const profileSection = dialog.querySelector('.spf-content > section:not([hidden])');
      if (profileSection) profileSection.prepend(p); else origin.after(p);
    }
    p.textContent = message;
    p.classList.toggle('is-error', failed);
  };
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
    feedback(successMessage);
    return true;
  } catch {
    const fallback = $('#sp-copy-fallback');
    (dialog || document.body).append(fallback);
    fallback.classList.toggle('is-inline', !!dialog);
    fallback.value = text; fallback.hidden = false; fallback.focus(); fallback.select();
    feedback('Clipboard access is unavailable. Copy the selected text below.', true);
    return false;
  }
}

function reset() {
  generation++;
  dialogs.forEach(d => { if (d.open) d.close(); });
  currentCode = '';
  activatedAt = null;
  profileFlow.reset();
  input.value = '';
  $('#sp-clear').hidden = true;
  $('#sp-review-error').hidden = true;
  $('#sp-copy-fallback').hidden = true;
  $('#sp-toast').hidden = true;
  $('#sp-scenario').value = 'ready';
  clearTimeout(toastTimer);
  clearCodeError();
  consent.checked = false;
  $('.sp-switch-state').textContent = 'Not yet';
  confirmButton.disabled = true;
  progress(0, 0);
  $('#sp-creating').classList.remove('is-moving');
  setState('entry', false);
  input.focus();
  $('#sp-main').scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth' });
}

$('#sp-code-form').addEventListener('submit', e => { e.preventDefault(); checkCode(); });
input.addEventListener('input', () => { clearCodeError(); $('#sp-clear').hidden = !input.value; });
input.addEventListener('blur', () => { input.value = normalize(input.value); });
$('#sp-clear').addEventListener('click', () => { input.value = ''; clearCodeError(); $('#sp-clear').hidden = true; input.focus(); });
$('#sp-example').addEventListener('click', () => { input.value = EXAMPLE; clearCodeError(); $('#sp-clear').hidden = false; input.focus(); });
$('#sp-entry-gift').addEventListener('click', () => checkCode('gift'));
$('#sp-review-gift').addEventListener('click', openGift);
$('#sp-open-confirm').addEventListener('click', openConfirmation);
consent.addEventListener('change', () => {
  confirmButton.disabled = !consent.checked;
  $('.sp-switch-state').textContent = consent.checked ? 'Ready' : 'Not yet';
});
confirmButton.addEventListener('click', activate);
$('#sp-change-code').addEventListener('click', () => { generation++; currentCode = ''; setState('entry', false); input.focus(); input.select(); });
$('#sp-reset').addEventListener('click', reset);
document.querySelectorAll('[data-copy-code]').forEach(b => b.addEventListener('click', () => copyText(currentCode, b)));
$('#sp-copy-gift').addEventListener('click', e => {
  if (state !== 'review' || activatedAt) return;
  copyText(`A little connection for your next trip.\n\nYour Openline purchase code: ${currentCode}\n\nRedeem it at https://openline.com/start when you’re ready to travel. Activating starts the plan immediately, so wait if your trip is later.`, e.currentTarget);
});
const profileFlow = initProfileFlow({ canOpen: () => state === 'success' && !!activatedAt, copyText, openDialog });
document.querySelectorAll('[data-open-dialog]').forEach(button => {
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-controls', button.dataset.openDialog);
  button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.openDialog);
    if (!dialog) return;
    openDialog(dialog);
    dialog.scrollTop = 0;
  });
});

dialogs.forEach(dialog => {
  dialog.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') event.stopPropagation();
  });
  dialog.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => { $('#sp-copy-fallback').hidden = true; });
});
document.querySelectorAll('.sp-nav details').forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (detail.open) document.querySelectorAll('.sp-nav details').forEach(d => { if (d !== detail) d.open = false; });
  });
});
document.addEventListener('click', event => {
  if (!event.target.closest('.sp-nav')) document.querySelectorAll('.sp-nav details').forEach(d => { d.open = false; });
});
setState('entry', false);
document.body.dataset.startReady = 'true';
