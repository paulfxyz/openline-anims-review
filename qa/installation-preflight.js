import { glyphSVG } from './icons-lib.js';
const root = document.getElementById('ig-preflight');
const localIcons = {
  checklist: '<path d="m3 6 1 1 2-2M9 6h12M3 12l1 1 2-2M9 12h12M3 18l1 1 2-2M9 18h12"/>',
  'data-switch': '<path d="M3 7h17l-4-4M20 7l-4 4M21 17H4l4-4M4 17l4 4"/>',
};
root?.querySelectorAll('[data-ig-icon]').forEach(el => {
  const path = localIcons[el.dataset.igIcon];
  el.innerHTML = path ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>` : glyphSVG(el.dataset.igIcon, { size: 24 });
});
// Anchor-only additions outside the redesigned blocks. No art, copy or
// layout from the installation walkthrough or chosen animation is changed.
for (const h of document.querySelectorAll('main h2')) {
  const text = h.textContent.trim();
  if (text === 'Learn step by step') h.id = 'ig-install-steps';
  if (text === 'Activate your Openline eSIM on iPhone') h.id = 'ig-activation-steps';
}

// Dedicated, native detail dialogs. They explain settings; they never change
// the device, provision a profile or store purchase/activation credentials.
let savedOverflow = '';
root?.querySelectorAll('[data-ig-dialog]').forEach(button => {
  button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.igDialog);
    if (!dialog || dialog.open) return;
    savedOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
    dialog.scrollTop = 0;
  });
});
root?.querySelectorAll('.igp-dialog').forEach(dialog => {
  dialog.querySelectorAll('[data-ig-close]').forEach(button => {
    button.addEventListener('click', () => dialog.close());
  });
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = savedOverflow;
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  dialog.querySelectorAll('[data-ig-jump]').forEach(button => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.igJump);
      dialog.close();
      if (!target) return;
      target.tabIndex = -1;
      target.focus({preventScroll:true});
      target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
      history.replaceState(null, '', '#'+target.id);
    });
  });
});
