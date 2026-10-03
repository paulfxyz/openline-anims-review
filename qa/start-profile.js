/* Final /start handoff. All installation values are explicit fixtures.
   The QR encodes a harmless QA notice, NOT an LPA installation payload.
   Only the optional label/folder are session-stored; no code or credentials. */
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
// Summaries of the existing KB installation articles 17/18/20/21/22 and
// connection checklist in article 8. No inherited "validity starts on
// first connection" claim: this preview follows Paul's immediate-start rule.
const GUIDE = {
  iphone: {
    install: [
      'Connect your compatible, carrier-unlocked iPhone to Wi-Fi.',
      'Open Settings → Cellular / Mobile Data → Add eSIM → Use QR Code.',
      'Scan your eSIM QR from another screen, or choose Enter Details Manually and enter the SM-DP+ address and activation code.',
      'Follow the prompts and name the line Openline.',
    ],
    connect: [
      'At your destination, turn off airplane mode and turn the Openline line on.',
      'In Settings → Cellular / Mobile Data → Openline, enable Data Roaming.',
      'Select Openline for Cellular Data, then open a browser to check your connection.',
    ],
  },
  samsung: {
    install: [
      'Connect your compatible, carrier-unlocked Samsung phone to Wi-Fi.',
      'Open Settings → Connections → SIM manager → Add eSIM.',
      'Choose Scan QR code from service provider. Use the manual-entry option instead if you cannot scan.',
      'Follow the prompts and name the new line Openline.',
    ],
    connect: [
      'At your destination, turn off airplane mode and enable the Openline line in SIM manager.',
      'Enable Data roaming for your Openline eSIM.',
      'Choose Openline for Mobile data, then open a browser to check your connection.',
    ],
  },
  pixel: {
    install: [
      'Connect your compatible, carrier-unlocked phone to Wi-Fi.',
      'On Pixel, open Settings → Network & internet → SIMs → Add eSIM / Download a SIM.',
      'Scan your QR. If you need manual entry, choose Need help? → Enter it manually and use the full activation string.',
      'Confirm the download and name the SIM Openline. Other Android menus may differ.',
    ],
    connect: [
      'At your destination, turn off airplane mode and turn the Openline SIM on.',
      'In Settings → Network & internet → SIMs → Openline, enable Data roaming.',
      'Select Openline for Mobile data, then open a browser to check your connection.',
    ],
  },
};

export function initProfileFlow({ canOpen, openDialog, copyText }) {
  const $ = s => document.querySelector(s);
  const dialog = $('#sp-install-dialog');
  const label = $('#spf-label'), folder = $('#spf-folder'), custom = $('#spf-new-folder');
  let saved = null;
  try {
    const value = JSON.parse(sessionStorage.getItem(STORE) || 'null');
    if (value && typeof value.label === 'string' && typeof value.folder === 'string') {
      saved = { label: value.label.slice(0, 48), folder: value.folder.slice(0, 32) };
    }
  } catch { /* Private mode / storage unavailable: in-memory demo still works. */ }
  const clean = s => s.trim().replace(/\s+/g, ' ');
  const currentFolder = () => clean(folder.value === '__new' ? custom.value : folder.value.startsWith('folder:') ? folder.value.slice(7) : '');
  const addFolder = name => {
    if (name && ![...folder.options].some(o => o.value === `folder:${name}`)) {
      const option = new Option(name, `folder:${name}`);
      folder.add(option, folder.querySelector('[value="__new"]'));
    }
  };
  const syncPreview = () => {
    $('#spf-label-preview').textContent = clean(label.value) || DEFAULT_LABEL;
    $('#spf-folder-preview').textContent = currentFolder() || 'Unfiled';
    $('#spf-new-folder-wrap').hidden = folder.value !== '__new';
    $('#spf-form-error').hidden = true;
    custom.removeAttribute('aria-invalid');
  };
  function paintSaved() {
    $('#sp-profile-label').textContent = saved ? saved.label : 'Japan';
    $('#sp-profile-organised').hidden = !saved;
    $('#sp-profile-organised').textContent = saved ? `${saved.label} · ${saved.folder || 'Unfiled'} · Saved in this preview` : '';
  }
  function restore() {
    label.value = saved?.label || '';
    addFolder(saved?.folder);
    folder.value = saved?.folder ? `folder:${saved.folder}` : '';
    custom.value = '';
    syncPreview(); paintSaved();
  }
  function step(name, focus = true) {
    if (!['details', 'setup', 'organise', 'done'].includes(name)) return;
    const titles = {
      details: ['Your eSIM details.', 'Scan the QR or use the manual details. Both belong to the same profile.'],
      setup: ['A few steps to get connected.', 'Install the profile, then choose Openline for mobile data in your destination.'],
      organise: ['Make it easy to find.', 'Give your connection a familiar name and a place in your account.'],
      done: ['You’re all set.', 'Your purchase code is now an eSIM profile, with everything in one place.'],
    };
    for (const key of Object.keys(titles)) $('#spf-' + key).hidden = key !== name;
    $('#sp-install-title').textContent = titles[name][0];
    $('#spf-subtitle').textContent = titles[name][1];
    const index = ['details', 'setup', 'organise', 'done'].indexOf(name);
    dialog.querySelectorAll('[data-profile-step]').forEach((button, i) => {
      button.classList.toggle('is-done', i < index);
      if (i === index) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    dialog.dataset.profileStep = name;
    dialog.querySelector('.sp-copy-feedback')?.remove();
    $('#sp-copy-fallback').hidden = true;
    if (focus) $('#sp-install-title').focus({ preventScroll: true });
    dialog.scrollTop = 0;
  }
  function device(name) {
    const guide = GUIDE[name] || GUIDE.iphone;
    for (const section of ['install', 'connect']) {
      const ol = $('#spf-' + section + '-steps');
      ol.replaceChildren(...guide[section].map(text => {
        const li = document.createElement('li'); li.textContent = text; return li;
      }));
    }
    dialog.querySelectorAll('[data-profile-device]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.profileDevice === name)));
  }
  dialog.querySelectorAll('[data-profile-value]').forEach(el => { el.textContent = PROFILE[el.dataset.profileValue]; });
  dialog.querySelectorAll('[data-copy-profile]').forEach(b => {
    const original = b.innerHTML;
    b.addEventListener('click', async () => {
    const ok = await copyText(PROFILE[b.dataset.copyProfile], b, 'Copied. This is a fictional preview value, not an installation credential.');
    if (ok) {
      b.innerHTML = glyphSVG('check', {size:18}); b.classList.add('is-copied');
      clearTimeout(b.copyTimer); b.copyTimer = setTimeout(() => { b.innerHTML = original; b.classList.remove('is-copied'); }, 1800);
    }
    });
  });
  dialog.querySelectorAll('[data-profile-step]').forEach(b => b.addEventListener('click', () => step(b.dataset.profileStep)));
  dialog.querySelectorAll('[data-profile-next]').forEach(b => b.addEventListener('click', () => step(b.dataset.profileNext)));
  dialog.querySelectorAll('[data-profile-device]').forEach(b => b.addEventListener('click', () => device(b.dataset.profileDevice)));
  label.addEventListener('input', syncPreview);
  custom.addEventListener('input', syncPreview);
  folder.addEventListener('change', () => { syncPreview(); if (folder.value === '__new') custom.focus(); });
  $('#spf-organise-form').addEventListener('submit', e => {
    e.preventDefault();
    if (!canOpen()) return;
    const name = currentFolder();
    if (folder.value === '__new' && !name) {
      $('#spf-form-error').textContent = 'Name your new folder, or choose Unfiled to continue without one.';
      $('#spf-form-error').hidden = false;
      custom.setAttribute('aria-invalid', 'true'); custom.focus(); return;
    }
    saved = { label: (clean(label.value) || DEFAULT_LABEL).slice(0, 48), folder: name.slice(0, 32) };
    let persisted = false;
    try { sessionStorage.setItem(STORE, JSON.stringify(saved)); persisted = true; } catch { /* No false saved claim. */ }
    addFolder(saved.folder);
    label.value = saved.label; folder.value = saved.folder ? `folder:${saved.folder}` : ''; syncPreview(); paintSaved();
    $('#spf-saved-label').textContent = saved.label;
    $('#spf-saved-folder').textContent = saved.folder ? `Folder · ${saved.folder}` : 'Unfiled';
    $('#spf-save-status').textContent = persisted
      ? 'Label and folder saved for this browser tab. Your live account has not been changed.'
      : 'Label and folder kept while this page stays open. Browser storage is unavailable; your live account has not been changed.';
    step('done');
  });
  restore(); device('iphone');
  return {
    open(name = 'details') {
      if (!canOpen()) return;
      openDialog(dialog); step(name);
    },
    reset() {
      saved = null;
      try { sessionStorage.removeItem(STORE); } catch { /* unavailable */ }
      [...folder.options].filter(o => !['', 'folder:Travel', 'folder:Personal', 'folder:Work', '__new'].includes(o.value)).forEach(o => o.remove());
      restore(); device('iphone'); step('details', false);
    },
  };
}
