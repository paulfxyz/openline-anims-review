import { glyphSVG } from './icons-lib.js';
const root = document.getElementById('ig-preflight');
root?.querySelectorAll('[data-ig-icon]').forEach(el => {
  el.innerHTML = glyphSVG(el.dataset.igIcon, { size: 24 });
});
// Anchor-only additions outside the redesigned blocks. No art, copy or
// layout from the installation walkthrough or chosen animation is changed.
for (const h of document.querySelectorAll('main h2')) {
  const text = h.textContent.trim();
  if (text === 'Learn step by step') h.id = 'ig-install-steps';
  if (text === 'Activate your Openline eSIM on iPhone') h.id = 'ig-activation-steps';
}
