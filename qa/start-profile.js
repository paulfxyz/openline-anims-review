/* Inline final handoff. All installation values are explicit fixtures.
   QR contains a harmless notice, never an LPA payload. No phone state is detected.
   Only the optional label/folder are session-stored; never codes or credentials. */
import { glyphSVG } from './icons-lib.js';

const PROFILE = Object.freeze({
  smdp: 'smdp.openline.invalid',
  activation: 'OPENLINE-QA-2048-EXAMPLE',
  iccid: '89000000000000002048',
  id: 'OL-2048',
  lpa: 'LPA:1$smdp.openline.invalid$OPENLINE-QA-2048-EXAMPLE',
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

export function initProfileFlow({ canOpen, copyText, openDialog, getJourney = ()=>'purchase' }) {
  const $ = s => document.querySelector(s);
  const root = $('#sp-success');
  const label = $('#spf-label'), folder = $('#spf-folder'), custom = $('#spf-new-folder');
  const editLabel = $('#spf-edit-label'), editFolder = $('#spf-edit-folder'), editCustom = $('#spf-edit-new');
  let activeStore = getJourney()==='recipient' ? STORE+'-recipient' : STORE;
  let saved = null;
  function loadOrganisation() {
    saved = null;
    try {
      const value = JSON.parse(sessionStorage.getItem(activeStore) || 'null');
      if (value && typeof value.label === 'string' && typeof value.folder === 'string') {
        saved = { label: value.label.slice(0,48),folder:value.folder.slice(0,32) };
      }
    } catch { /* In-memory preview remains available. */ }
  }
  loadOrganisation();
  const clean = s => s.trim().replace(/\s+/g, ' ');
  const currentFolder = () => clean(folder.value === '__new' ? custom.value : folder.value.startsWith('folder:') ? folder.value.slice(7) : '');
  const addFolder = name => {
    for (const select of [folder, editFolder]) {
      if (name && ![...select.options].some(o => o.value === `folder:${name}`)) {
        select.add(new Option(name, `folder:${name}`), select.querySelector('[value="__new"]'));
      }
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
    $('#spf-quick-name').textContent = saved?.label || DEFAULT_LABEL;
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
    if(getJourney()==='recipient') {
      titles.details=['Your gift is now your eSIM.','Here’s your QR. Install it, connect, and make it yours.'];
      titles.done=['You’re connected.','Your gift is activated. Your next stop: your account.'];
    }
    if (!titles[name] || (focus && !canOpen())) return;
    for (const key of Object.keys(titles)) $('#spf-' + key).hidden = key !== name;
    $('#sp-success-title').textContent = titles[name][0];
    $('#spf-subtitle').textContent = titles[name][1];
    $('#spf-kicker').textContent = getJourney()==='recipient'
      ? name==='done'?'A gift that goes with you':'Gift redeemed · plan activated'
      : name === 'done' ? 'Ready for your next adventure' : 'Your plan is activated';
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
  document.querySelectorAll('[data-profile-value]').forEach(el => { el.textContent = PROFILE[el.dataset.profileValue]; });
  document.querySelectorAll('[data-copy-profile]').forEach(b => {
    const original = b.innerHTML;
    b.addEventListener('click', async () => {
      if (!canOpen()) return;
      const ok = await copyText(PROFILE[b.dataset.copyProfile], b, 'Copied to clipboard.');
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
  function saveOrganisation(next) {
    saved = next;
    let persisted = false;
    try { sessionStorage.setItem(activeStore, JSON.stringify(saved)); persisted = true; } catch { /* In-memory changes still apply. */ }
    addFolder(saved.folder);
    label.value = saved.label; folder.value = saved.folder ? `folder:${saved.folder}` : '';
    custom.value = '';
    syncPreview(); paintSaved();
    $('#spf-save-status').hidden = persisted;
    $('#spf-save-status').textContent = persisted ? '' : 'Your browser could not save these preferences. Keep this page open to retain them.';
    return persisted;
  }
  $('#spf-organise-form').addEventListener('submit', e => {
    e.preventDefault();
    if (!canOpen()) return;
    const name = currentFolder();
    if (folder.value === '__new' && !name) {
      $('#spf-form-error').textContent = 'Name your new folder, or choose Unfiled.';
      $('#spf-form-error').hidden = false;
      custom.setAttribute('aria-invalid', 'true'); custom.focus(); return;
    }
    saveOrganisation({ label: (clean(label.value) || DEFAULT_LABEL).slice(0, 48), folder:name.slice(0, 32) });
    step('done');
  });
  const syncEdit = () => {
    $('#spf-edit-new-wrap').hidden = editFolder.value !== '__new';
    $('#spf-edit-error').hidden = true;
    $('#spf-edit-status').hidden = true;
    editCustom.removeAttribute('aria-invalid');
  };
  root.querySelectorAll('[data-profile-dialog]').forEach(button=>button.addEventListener('click',()=>{
    if (!canOpen() || root.dataset.profileStep !== 'done') return;
    if (button.dataset.profileDialog === 'view') {
      const dialog = $('#spf-quick-view');
      dialog.querySelector('details').open = false;
      dialog.querySelector('.sp-copy-feedback').textContent = '';
      openDialog(dialog); dialog.scrollTop = 0;
    } else {
      addFolder(saved?.folder);
      editLabel.value = saved?.label || DEFAULT_LABEL;
      editFolder.value = saved?.folder ? `folder:${saved.folder}` : '';
      editCustom.value = ''; syncEdit();
      openDialog($('#spf-quick-edit'));
      $('#spf-quick-edit').scrollTop = 0;
      editLabel.focus({preventScroll:true});
    }
  }));
  editLabel.addEventListener('input',syncEdit);
  editCustom.addEventListener('input',syncEdit);
  editFolder.addEventListener('change',()=>{syncEdit();if(editFolder.value==='__new')editCustom.focus();});
  $('#spf-edit-form').addEventListener('submit',event=>{
    event.preventDefault();
    if (!canOpen() || root.dataset.profileStep !== 'done') return;
    const name = clean(editFolder.value==='__new' ? editCustom.value : editFolder.value.startsWith('folder:') ? editFolder.value.slice(7) : '');
    if (editFolder.value==='__new' && !name) {
      $('#spf-edit-error').textContent='Name your new folder, or choose Unfiled.';
      $('#spf-edit-error').hidden=false; editCustom.setAttribute('aria-invalid','true'); editCustom.focus(); return;
    }
    const persisted=saveOrganisation({label:(clean(editLabel.value)||DEFAULT_LABEL).slice(0,48),folder:name.slice(0,32)});
    if (persisted) $('#spf-quick-edit').close();
    else {
      $('#spf-edit-status').hidden=false;
      $('#spf-edit-status').textContent='Changes applied. Your browser could not save them; keep this page open to retain them.';
    }
  });
  restore(); device('iphone'); step('details', false);
  return {
    open(name = 'details') { if (canOpen()) step(name); },
    setContext(context) {
      activeStore=context==='recipient'?STORE+'-recipient':STORE;
      for(const select of [folder,editFolder]) [...select.options].filter(o=>!['','folder:Travel','folder:Personal','folder:Work','__new'].includes(o.value)).forEach(o=>o.remove());
      loadOrganisation(); restore(); device('iphone'); step('details',false);
      root.querySelector('.spf-manual').open=false;
      $('#spf-edit-form').reset(); syncEdit();
      $('#spf-save-status').textContent=''; $('#spf-save-status').hidden=true;
      $('#sp-valid-until').textContent=''; $('#sp-valid-until').removeAttribute('datetime');
    },
    reset() {
      saved = null;
      try { sessionStorage.removeItem(activeStore); } catch { /* Unavailable. */ }
      for (const select of [folder,editFolder]) [...select.options].filter(o => !['','folder:Travel','folder:Personal','folder:Work','__new'].includes(o.value)).forEach(o => o.remove());
      $('#spf-edit-form').reset(); syncEdit();
      $('#sp-valid-until').textContent = '';
      $('#sp-valid-until').removeAttribute('datetime');
      root.querySelector('.spf-manual').open = false;
      $('#spf-save-status').textContent = '';
      $('#spf-save-status').hidden = true;
      restore(); device('iphone'); step('details', false);
    },
  };
}
