/* Context-only refinements. Keep the original comparison boards untouched
   while /qa is the working surface. Applied before mounting and recolouring,
   so the page, hub thumbnails and option previews all show the same result. */
export function refineAnimation(key, optionId, built) {
  if (key !== 'plusnomad' || optionId !== 'nm-cities') return built;
  const host = document.createElement('template');
  host.innerHTML = built.svg;
  const svg = host.content.querySelector('svg');
  if (!svg) return built;

  /* This was an entrance fade accidentally set to repeat indefinitely:
     0.3 -> 1 -> snap to 0.3 every 350ms. Keep each destination readable
     throughout; the separate animateMotion connection dots still move. */
  svg.querySelectorAll('animate[attributeName="opacity"][values="0.3;1"]').forEach((fade) => {
    const row = fade.parentElement;
    row.setAttribute('opacity', '1');
    row.setAttribute('data-qa-nomad-location', '');
    fade.remove();
  });

  /* Fictional US example, not a customer or support contact number. */
  svg.querySelectorAll('text').forEach((text) => {
    if (text.textContent === '+351') text.textContent = '+1';
    if (text.textContent === '912 04 88') text.textContent = '202 555 0148';
  });
  return { ...built, svg: svg.outerHTML };
}
