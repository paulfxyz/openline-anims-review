/* Inline final handoff. All installation values are explicit fixtures.
   QR contains a harmless notice, never an LPA payload. No phone state is detected.
   Only the optional label/folder are session-stored; never codes or credentials. */
import { glyphSVG } from './icons-lib.js';

const PROFILE = Object.freeze({
  smdp: 'smdp.openline-demo.invalid',
  activation: 'DEMO-OPENLINE-2048-NOT-INSTALLABLE',
  iccid: '89000000000000002048',
  id: 'OL-DEMO-2048',
  lpa: 'LPA:1$smdp.openline-demo.invalid$DEMO-OPENLINE-2048-NOT-INSTALLABLE',
});
const STORE = 'openline-qa-profile-organisation-v1';
const DEFAULT_LABEL = 'Japan eSIM';
const GUIDE = {
  iphone: [
    'Open Settings → Cellular / Mobile Data → Add eSIM → Use QR Code.',
    'Scan your QR from another screen, or choose Enter Details Manually and use the SM-DP+ address and activation code.',
    'Follow the prompts and name the line Openline. Then return to the three connection settings.',
  ],
  samsung: [
    'Open Settings → Connections → SIM manager → Add eSIM.',
    'Choose Scan QR code from service provider. Use the manual-entry option if you cannot scan.',
    'Follow the prompts and name the line Openline. Then return to the three connection settings.',
  ],
  pixel: [
    'Open Settings → Network & internet → SIMs → Add eSIM / Download a SIM.',
    'Scan your QR. For manual entry, choose Need help? → Enter it manually and use the full activation string.',
    'Confirm the download and name the SIM Openline. Then return to the three connection settings.',
  ],
};

export function initProfileFlow({ canOpen, copyText }) {
  const $ = s => document.querySelector(s);
  const root = $('#sp-success');
  const label = $('#spf-label'), folder = $('#spf-folder'), custom = $('#spf-new-folder');
  let saved = null;
  try {
    const value = JSON.parse(sessionStorage.getItem(STORE) || 'null');
    if (value && typeof value.label === 'string' && typeof value.folder === 'string') {
      saved = { label: value.label.slice(0, 48), folder: value.folder.slice(0, 32) };
    }
  } catch { /* In-memory preview remains available. */ }
  const clean = s => s.trim().replace(/\s+/g, ' ');
  const currentFolder = () => clean(folder.value === '__new' ? custom.value : folder.value.startsWith('folder:') ? folder.value.slice(7) : '');
  const addFolder = name => {
    if (name && ![...folder.options].some(o => o.value === `folder:${name}`)) {
      folder.add(new Option(name, `folder:${name}`), folder.querySelector('[value="__new"]'));
    }
  };
  function syncPreview() {
    $('#spf-label-preview').textContent = clean(label.value) || DEFAULT_LABEL;
    $('#spf-folder-preview').textContent = currentFolder() || 'Unfiled';
    $('#spf-new-folder-wrap').hidden = folder.value !== '__new';
    $('#spf-form-error').hidden = true;
    custom.removeAttribute('aria-invalid');
  }
  function paintSaved() {
    $('#sp-profile-label').textContent = saved?.label || DEFAULT_LABEL;
    $('#spf-saved-label').textContent = saved?.label || DEFAULT_LABEL;
    $('#spf-saved-folder').textContent = saved?.folder || 'Unfiled';
  }
  function restore() {
    label.value = saved?.label || '';
    addFolder(saved?.folder);
    folder.value = saved?.folder ? `folder:${saved.folder}` : '';
    custom.value = '';
    syncPreview(); paintSaved();
  }
  function step(name, focus = true) {
    const titles = {
      details: ['Here’s your eSIM.', 'Your QR and profile details, all in one place.'],
      setup: ['Let’s get you connected.', 'Install your eSIM. Then check three simple settings.'],
      organise: ['Make it yours.', 'A name and a folder. Easy to find, wherever you go.'],
      done: ['You’re connected.', 'Your eSIM is activated. Your next stop: your account.'],
    };
    if (!titles[name] || (focus && !canOpen())) return;
    for (const key of Object.keys(titles)) $('#spf-' + key).hidden = key !== name;
    $('#sp-success-title').textContent = titles[name][0];
    $('#spf-subtitle').textContent = titles[name][1];
    $('#spf-kicker').textContent = name === 'done' ? 'Demo complete · simulated connection' : 'Demo plan activated';
    const index = ['details', 'setup', 'organise', 'done'].indexOf(name);
    root.querySelectorAll('[data-profile-step]').forEach((button, i) => {
      button.classList.toggle('is-done', i < index);
      if (i === index) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    root.dataset.profileStep = name;
    $('#sp-copy-fallback').hidden = true;
    if (focus) {
      $('#sp-success-title').focus({ preventScroll: true });
      root.scrollIntoView({ block:'start', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  }
  function device(name) {
    const guide = GUIDE[name] || GUIDE.iphone;
    $('#spf-install-steps').replaceChildren(...guide.map(text => {
      const li = document.createElement('li'); li.textContent = text; return li;
    }));
    document.querySelectorAll('[data-profile-device]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.profileDevice === name)));
  }
  root.querySelectorAll('[data-profile-value]').forEach(el => { el.textContent = PROFILE[el.dataset.profileValue]; });
  root.querySelectorAll('[data-copy-profile]').forEach(b => {
    const original = b.innerHTML;
    b.addEventListener('click', async () => {
      if (!canOpen()) return;
      const ok = await copyText(PROFILE[b.dataset.copyProfile], b, 'Copied demo details. These are not installation credentials.');
      if (ok) {
        b.innerHTML = glyphSVG('check', { size:18 }); b.classList.add('is-copied');
        clearTimeout(b.copyTimer);
        b.copyTimer = setTimeout(() => { b.innerHTML = original; b.classList.remove('is-copied'); }, 1800);
      }
    });
  });
  root.querySelectorAll('[data-profile-step]').forEach(b => b.addEventListener('click', () => step(b.dataset.profileStep)));
  root.querySelectorAll('[data-profile-next]').forEach(b => b.addEventListener('click', () => step(b.dataset.profileNext)));
  document.querySelectorAll('[data-profile-device]').forEach(b => b.addEventListener('click', () => device(b.dataset.profileDevice)));
  label.addEventListener('input', syncPreview);
  custom.addEventListener('input', syncPreview);
  folder.addEventListener('change', () => { syncPreview(); if (folder.value === '__new') custom.focus(); });
  $('#spf-organise-form').addEventListener('submit', e => {
    e.preventDefault();
    if (!canOpen()) return;
    const name = currentFolder();
    if (folder.value === '__new' && !name) {
      $('#spf-form-error').textContent = 'Name your new folder, or choose Unfiled.';
      $('#spf-form-error').hidden = false;
      custom.setAttribute('aria-invalid', 'true'); custom.focus(); return;
    }
    saved = { label: (clean(label.value) || DEFAULT_LABEL).slice(0, 48), folder:name.slice(0, 32) };
    let persisted = false;
    try { sessionStorage.setItem(STORE, JSON.stringify(saved)); persisted = true; } catch { /* Honest fallback below. */ }
    addFolder(saved.folder);
    label.value = saved.label; folder.value = saved.folder ? `folder:${saved.folder}` : '';
    syncPreview(); paintSaved();
    $('#spf-save-status').textContent = persisted
      ? 'Label and folder saved for this browser tab only. Your live account has not changed.'
      : 'Browser storage is unavailable. Your label and folder are kept only while this page is open; your live account has not changed.';
    $('#spf-done [data-open-dialog="sp-save-info"]').textContent = persisted ? 'Saved in this browser tab' : 'Kept on this page only';
    step('done');
  });
  restore(); device('iphone'); step('details', false);
  return {
    open(name = 'details') { if (canOpen()) step(name); },
    reset() {
      saved = null;
      try { sessionStorage.removeItem(STORE); } catch { /* Unavailable. */ }
      [...folder.options].filter(o => !['','folder:Travel','folder:Personal','folder:Work','__new'].includes(o.value)).forEach(o => o.remove());
      $('#sp-valid-until').textContent = '';
      $('#sp-valid-until').removeAttribute('datetime');
      root.querySelector('.spf-manual').open = false;
      $('#spf-save-status').textContent = 'In this preview, only your label and folder can be saved for this browser tab. Your live account is not changed.';
      restore(); device('iphone'); step('details', false);
    },
  };
}
