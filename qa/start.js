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
// A local presentation state only. A production unlock requires the server
// to verify ownership and carry out the user's email-validation policy.
let giftUnlocked = false;
let giftConfirmation = false;
let toastTimer = 0;
let journey = new URLSearchParams(location.search).get('recipient') === '1' ? 'recipient' : 'purchase';
let recipientStatus = 'ready';
// In-memory fixtures model the handoff and prevent reuse within a run.
// Neither codes, transfer state nor validation state enter URLs or storage.
const giftLedger = new Map();

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
  $('#sp-journey-control').disabled = busy || next === 'creating';
  $('#sp-switch-journey').disabled = busy || next === 'creating';
  input.disabled = busy;
  $('#sp-check').disabled = busy;
  $('#sp-clear').disabled = busy;
  $('#sp-example').disabled = busy;
  $('#sp-entry-gift').disabled = busy;
  $('#sp-code-form').setAttribute('aria-busy', String(busy));
  $('#sp-check').innerHTML = busy
    ? `<span class="sp-loader" aria-hidden="true"></span><span>Checking your ${journey === 'recipient' ? 'gift' : 'code'}…</span>`
    : `<span>${journey === 'recipient' ? 'Check my gift' : 'Check my code'}</span>${forwardArrow()}`;
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

function renderJourney() {
  const recipient = journey === 'recipient';
  document.body.dataset.journey = journey;
  $('#sp-journey-control').value = journey;
  $('#sp-entry-title').textContent = recipient ? 'Someone’s sent you a connection.' : 'Your connection starts here.';
  $('#sp-entry .sp-lead').textContent = recipient ? 'Enter the purchase code from your gift message. Your next trip starts with you.' : 'One purchase code. An eSIM ready for your next trip.';
  $('#sp-code-form > label').textContent = recipient ? 'Gifted purchase code' : 'Purchase code';
  $('#sp-entry-gift').hidden = recipient;
  $('#sp-switch-journey').textContent = recipient ? 'Redeeming your own purchase instead?' : 'Received a gift? Open your gift';
  $('.sp-key').innerHTML = glyphSVG(recipient ? 'gift' : 'key',{size:70,sw:1.7});
  $('.sp-key').querySelectorAll('path').forEach(path=>path.setAttribute('pathLength','1'));
  $('#sp-review > .sp-eyebrow').textContent = recipient ? 'A gift for your next adventure' : 'Purchase code found';
  $('#sp-review-title').textContent = recipient ? 'A connection, just for you.' : 'Your plan. Your choice.';
  $('#sp-review > .sp-lead').textContent = recipient ? 'Here’s your gift. Choose when to make it yours.' : 'Ready when you are. Nothing has started yet.';
  $('.sp-choices').hidden = recipient;
  $('#sp-recipient-review').hidden = !recipient;
  $('.sp-wait-inline').hidden = recipient;
  $('#sp-review .sp-status').textContent = 'Not activated';
  $('#sp-creating-title').textContent = recipient ? 'Your gift becomes a connection.' : 'A code becomes a connection.';
  const stepLabels = recipient ? ['Gift code','Your gift','Your eSIM'] : ['Enter code','Your plan','Your eSIM'];
  document.querySelectorAll('.sp-steps li').forEach((li,i)=>{
    const text = [...li.childNodes].find(n=>n.nodeType===Node.TEXT_NODE);
    if(text)text.textContent=stepLabels[i];
  });
  $('#sp-code-help-title').textContent = recipient ? 'Your gifted purchase code.' : 'Your purchase code.';
  $('#sp-code-help-dialog > p').textContent = recipient
    ? 'Look for the three-part purchase code in the message from your sender. They need to unlock it for transfer before you can redeem it.'
    : 'Find it on the confirmation screen after payment, or in your confirmation email if you linked an email to your purchase.';
}

function renderRecipientStatus() {
  const ready = recipientStatus === 'ready';
  const pending = recipientStatus === 'pending';
  $('#sp-recipient-status').dataset.status = recipientStatus;
  $('#sp-recipient-status-icon').innerHTML = glyphSVG(ready?'gift':pending?'mail':'lock',{size:28,sw:1.8});
  $('#sp-recipient-status-title').textContent = ready ? 'Unlocked and ready for you.' : pending ? 'One confirmation to go.' : 'Your sender needs to unlock this gift.';
  $('#sp-recipient-status-copy').textContent = ready
    ? 'The sender has made this code transferable. Your plan hasn’t started.'
    : pending ? 'The purchase owner needs to validate the purchase by email. Ask them to check their inbox, then check again.'
    : 'Ask the person who sent it to unlock the purchase code for transfer. Nothing has been redeemed.';
  $('#sp-recipient-activate').hidden = !ready;
  $('#sp-recipient-activate').disabled = !ready;
  $('#sp-recipient-later').hidden = !ready;
  $('#sp-recipient-retry').hidden = ready;
  $('#sp-recipient-ask-sender').hidden = ready;
  $('#sp-review .sp-status').textContent = ready ? 'Gift ready' : pending ? 'Confirmation needed' : 'Transfer locked';
}

function beginJourney(next, code = '') {
  if (['checking','creating'].includes(state)) return;
  generation++;
  dialogs.forEach(d=>{if(d.open)d.close();});
  journey = next === 'recipient' ? 'recipient' : 'purchase';
  currentCode = ''; activatedAt = null; recipientStatus = 'ready';
  giftUnlocked = false; giftConfirmation = false;
  input.value = code;
  $('#sp-clear').hidden = !code;
  $('#sp-scenario').value = 'ready';
  $('#sp-review-error').hidden = true;
  $('#sp-copy-fallback').hidden = true;
  $('#sp-toast').hidden = true;
  clearTimeout(toastTimer); clearCodeError();
  profileFlow.setContext(journey);
  renderJourney(); renderGiftTransfer();
  const url = new URL(location.href);
  if (journey === 'recipient') url.searchParams.set('recipient','1');
  else url.searchParams.delete('recipient');
  history.replaceState(null,'',url.pathname+url.search+url.hash);
  setState('entry',false);
  $('#sp-entry-title').tabIndex=-1;
  $('#sp-entry-title').focus({preventScroll:true});
  $('#sp-main').scrollIntoView({block:'start',behavior:reduced()?'auto':'smooth'});
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
  const record = giftLedger.get(code);
  if (response === 'not-found' || response === 'used' || response === 'network' || record?.redeemed) {
    setState('entry', false);
    const errors = {
      'not-found': 'We couldn’t find that purchase code. Check the spelling and try again. Nothing has been activated.',
      used: journey === 'recipient' ? 'This gift code has already been redeemed. Ask the sender to check the purchase; it can’t be used again.' : 'This purchase code has already been activated. Go to your account to find the eSIM; it can’t be redeemed or gifted again.',
      network: 'We couldn’t check the code right now. Nothing has changed. Check your connection and try again.',
    };
    return showCodeError(errors[record?.redeemed ? 'used' : response]);
  }
  if (currentCode !== code) giftUnlocked = !!record?.unlocked;
  giftConfirmation = false;
  currentCode = code;
  if (journey === 'purchase' && !record) giftLedger.set(code,{unlocked:false,redeemed:false});
  if (journey === 'recipient') {
    recipientStatus = response === 'gift-locked' || record?.unlocked === false ? 'locked' : response === 'gift-pending' ? 'pending' : 'ready';
    renderRecipientStatus();
  }
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
  if (journey === 'recipient' && recipientStatus !== 'ready') return;
  consent.checked = false;
  $('.sp-switch-state').textContent = 'Not yet';
  confirmButton.disabled = true;
  $('#sp-review-error').hidden = true;
  $('#sp-confirm-title').textContent = journey === 'recipient' ? 'Ready to use your gift?' : 'Ready to start now?';
  $('#sp-confirm-copy').innerHTML = journey === 'recipient'
    ? 'Redeeming starts your 30 days immediately.<br>Once activated, this gift can’t be transferred again.'
    : 'Your 30 days begin immediately.<br>This code can no longer be gifted.';
  confirmButton.innerHTML = `${journey === 'recipient' ? 'Redeem & activate' : 'Activate now'} ${forwardArrow()}`;
  openDialog($('#sp-confirm'));
  $('#sp-confirm [data-close][autofocus]').focus({ preventScroll: true });
  $('#sp-confirm').scrollTop = 0;
}

function openGift() {
  if (journey !== 'purchase' || state !== 'review' || !currentCode || activatedAt) return;
  populateCode();
  $('#sp-gift .sp-copy-feedback')?.remove();
  giftConfirmation = false;
  renderGiftTransfer();
  openDialog($('#sp-gift'));
  $('#sp-gift').scrollTop = 0;
}

function renderGiftTransfer() {
  $('#sp-gift-state').textContent = giftUnlocked ? 'Ready to transfer · not activated' : 'Locked for transfer';
  $('#sp-gift-state-icon').innerHTML = glyphSVG(giftUnlocked ? 'check-circle' : 'lock', {size:20,sw:1.8});
  $('.sp-gift-transfer-status').classList.toggle('is-unlocked',giftUnlocked);
  $('#sp-unlock-gift').hidden = giftUnlocked || giftConfirmation;
  $('#sp-transfer-confirm').hidden = !giftConfirmation;
  $('#sp-copy-gift').hidden = !giftUnlocked;
  $('#sp-open-recipient').hidden = !giftUnlocked;
  $('#sp-keep-gift').hidden = giftConfirmation;
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
  if (journey === 'recipient' && recipientStatus !== 'ready') return;
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
    error.textContent = journey === 'recipient' ? 'Your gift couldn’t be activated. The code is still unused; try again when you’re ready.' : 'Activation couldn’t be completed. Your code is still unused, so you can try again, keep it or gift it.';
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
  giftLedger.set(currentCode,{unlocked:false,redeemed:true});
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
  giftUnlocked = false; giftConfirmation = false; renderGiftTransfer();
  recipientStatus = 'ready'; giftLedger.clear();
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
  renderJourney();
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
$('#sp-change-code').addEventListener('click', () => { generation++; currentCode = ''; giftUnlocked = false; giftConfirmation = false; setState('entry', false); input.focus(); input.select(); });
$('#sp-reset').addEventListener('click', reset);
document.querySelectorAll('[data-copy-code]').forEach(b => b.addEventListener('click', () => copyText(currentCode, b)));
$('#sp-copy-gift').addEventListener('click', e => {
  if (journey !== 'purchase' || state !== 'review' || activatedAt || !giftUnlocked || !currentCode) return;
  copyText(`A little connection for your next trip.\n\nYour Openline purchase code: ${currentCode}\n\nRedeem it at https://openline.com/start when you’re ready to travel. Activating starts the plan immediately, so wait if your trip is later.`, e.currentTarget);
});
$('#sp-unlock-gift').addEventListener('click',()=>{
  if(journey!=='purchase'||state!=='review'||activatedAt||giftUnlocked||!currentCode)return;
  giftConfirmation=true;renderGiftTransfer();
  $('#sp-transfer-title').focus({preventScroll:true});
  $('#sp-transfer-confirm').scrollIntoView({block:'nearest',behavior:reduced()?'auto':'smooth'});
});
$('#sp-cancel-unlock').addEventListener('click',()=>{
  giftConfirmation=false;renderGiftTransfer();$('#sp-unlock-gift').focus();
});
$('#sp-confirm-unlock').addEventListener('click',()=>{
  if(journey!=='purchase'||state!=='review'||activatedAt||giftUnlocked||!giftConfirmation||!currentCode)return;
  giftUnlocked=true;giftConfirmation=false;renderGiftTransfer();
  giftLedger.set(currentCode,{unlocked:true,redeemed:false});
  $('#sp-copy-gift').focus({preventScroll:true});
  $('#sp-gift').scrollTop=0;
});
const profileFlow = initProfileFlow({ canOpen: () => state === 'success' && !!activatedAt, copyText, openDialog, getJourney:()=>journey });
$('#sp-open-recipient').addEventListener('click',()=>{
  if(journey==='purchase'&&state==='review'&&giftUnlocked&&!activatedAt)beginJourney('recipient',currentCode);
});
$('#sp-switch-journey').addEventListener('click',()=>beginJourney(journey==='recipient'?'purchase':'recipient',input.value));
$('#sp-journey-control').addEventListener('change',event=>beginJourney(event.target.value));
$('#sp-recipient-activate').addEventListener('click',openConfirmation);
$('#sp-recipient-later').addEventListener('click',()=>{
  if(journey==='recipient'&&state==='review'&&recipientStatus==='ready')openDialog($('#sp-gift-later'));
});
$('#sp-recipient-retry').addEventListener('click',()=>checkCode());
$('#sp-recipient-ask-sender').addEventListener('click',event=>{
  const message=recipientStatus==='pending'
    ? 'Thank you for the Openline gift! Could you confirm the purchase using the validation email? I can redeem it once that is complete.'
    : 'Thank you for the Openline gift! Could you unlock the purchase code for transfer in Openline so I can redeem it?';
  copyText(message,event.currentTarget,'Message copied. Send it privately to the person who gifted you the code.');
});
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
renderJourney();
setState('entry', false);
document.body.dataset.startReady = 'true';
