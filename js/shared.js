export const VB = '0 0 640 560';
export const svgWrap = (inner, extra = '') =>
  `<svg viewBox="${VB}" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style="width:100%;height:100%" ${extra}>${inner}</svg>`;

export const pill = (tone, html, pos) => ({ tone, html, pos });

export function icon(name) {
  const p = {
    brain: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>',
    signal: '<path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  }[name];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ic">${p}</svg>`;
}

export const basePills = [
  pill('orange', `${icon('brain')}AI-Powered`, { top: '20px', right: '20px' }),
  pill('ink', `<span class="dot"></span><span data-role="carrier">Vodafone · Active</span>`, { top: '100px', right: '-10px' }),
  pill('white', `${icon('signal')}<span data-role="price">Best Price</span>`, { bottom: '90px', right: '200px' }),
  pill('white', `${icon('zap')}147 Optimizations Today`, { bottom: '20px', right: '40px' }),
];
