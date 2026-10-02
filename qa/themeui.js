/* The colour picker, shared by the hub and the in-page panel so the two
   can never offer different themes. Calls onChange() after saving. */

import { PRESETS, themeObj, saveState, esc } from './core.js';

export function renderThemeControls(box, state, onChange) {
  const t = themeObj(state);
  const cur = state.theme || { id: 'original' };
  box.innerHTML = `
    <div class="qa-swatches">
      ${PRESETS.map((p) => `<button type="button" class="qa-sw${cur.id === p.id ? ' is-on' : ''}" data-theme="${p.id}" title="${esc(p.note)}">
        <span class="qa-sw-dots">${p.sw.map((c) => `<i style="background:${c}"></i>`).join('')}</span><span class="qa-sw-n">${esc(p.name)}</span></button>`).join('')}
      <label class="qa-sw qa-sw-custom${cur.id === 'custom' ? ' is-on' : ''}" title="Pick any colour">
        <input type="color" value="${cur.id === 'custom' && cur.hex ? cur.hex : '#2563EB'}" data-custom>
        <span class="qa-sw-n">Custom${cur.id === 'custom' && cur.hex ? ` <code>${cur.hex.toUpperCase()}</code>` : ''}</span>
      </label>
    </div>
    ${t.id !== 'original' ? `
    <div class="qa-seg qa-seg-full" role="group" aria-label="What to recolour">
      <button type="button" data-scope="all" class="${t.scope !== 'brand' ? 'is-on' : ''}">Every accent</button>
      <button type="button" data-scope="brand" class="${t.scope === 'brand' ? 'is-on' : ''}">Openline orange only</button>
    </div>
    <label class="qa-check"><input type="checkbox" data-keep ${t.keepStatus !== false ? 'checked' : ''}> Keep green, red and amber status colours</label>` : ''}
    <p class="qa-hint">${esc(t.note || (t.id === 'custom' ? 'Your colour — accents take its hue, lightness and vividness.' : ''))}
      Photos and raster images are never recoloured.</p>`;

  /* light=true while the native colour picker is open: apply the colour but
     don't rebuild these controls, or the picker would close under the user */
  const done = (light = false) => { saveState(state); onChange(light); };
  box.querySelectorAll('[data-theme]').forEach((b) => b.addEventListener('click', () => {
    const p = PRESETS.find((x) => x.id === b.dataset.theme);
    state.theme = { id: p.id, scope: p.scope, keepStatus: p.keepStatus };
    done();
  }));
  const ci = box.querySelector('[data-custom]');
  let tm = 0;
  const setCustom = (light) => {
    const prev = state.theme || {};
    state.theme = { id: 'custom', hex: ci.value, scope: prev.scope || 'all', keepStatus: prev.keepStatus };
    done(light);
  };
  ci.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(() => setCustom(true), 140); });
  ci.addEventListener('change', () => { clearTimeout(tm); setCustom(false); });
  box.querySelectorAll('[data-scope]').forEach((b) => b.addEventListener('click', () => {
    state.theme = { ...state.theme, scope: b.dataset.scope }; done();
  }));
  const kp = box.querySelector('[data-keep]');
  if (kp) kp.addEventListener('change', () => { state.theme = { ...state.theme, keepStatus: kp.checked }; done(); });
}
