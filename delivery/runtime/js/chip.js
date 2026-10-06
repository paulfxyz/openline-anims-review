// Shared Openline chip artwork — identical geometry / palette to the live hero.
export const C = {
  cyan: '#06B6D4',
  cyanDeep: '#0891B2',
  ink: '#0B0B0F',
  gray: '#3D3D46',
  white: '#FFFFFF',
};

// Internal traces on the chip face (dashed flow + travelling dot), as on the live site.
function trace(d, delay, id) {
  return `
  <path d="${d}" fill="none" stroke="${C.cyanDeep}" stroke-width="2.5" opacity="0.55" stroke-linecap="round" stroke-dasharray="3 6">
    <animate attributeName="stroke-dashoffset" values="0;-18" dur="1.6s" repeatCount="indefinite"/>
  </path>
  <circle r="2.6" fill="${C.white}" opacity="0">
    <animateMotion dur="1.6s" begin="${delay}s" repeatCount="indefinite" path="${d}"/>
    <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.08;0.9;1" dur="1.6s" begin="${delay}s" repeatCount="indefinite"/>
  </circle>`;
}

export function chip({ x = 400, y = 280, scale = 1, pins = true, screen = '' } = {}) {
  const traces = [
    ['M -26 -26 L -26 -74', 0],
    ['M 26 -26 L 26 -74', 0.27],
    ['M -26 26 L -26 74', 0.53],
    ['M 26 26 L 26 74', 0.8],
    ['M 26 -7 L 74 -7', 1.07],
    ['M 26 7 L 74 7', 1.33],
  ].map(([d, t], i) => trace(d, t, i)).join('');

  const pinRects = pins ? `
  <g fill="${C.ink}">
    <rect x="-62" y="-110" width="8" height="16" rx="2"/><rect x="-4" y="-110" width="8" height="16" rx="2"/><rect x="54" y="-110" width="8" height="16" rx="2"/>
    <rect x="-62" y="94" width="8" height="16" rx="2"/><rect x="-4" y="94" width="8" height="16" rx="2"/><rect x="54" y="94" width="8" height="16" rx="2"/>
    <rect x="94" y="-62" width="16" height="8" rx="2"/><rect x="94" y="-4" width="16" height="8" rx="2"/><rect x="94" y="54" width="16" height="8" rx="2"/>
  </g>` : '';

  return `
  <g transform="translate(${x} ${y}) scale(${scale})">
    ${pinRects}
    <g>
      <rect x="-94" y="-94" width="188" height="188" rx="22" fill="${C.cyan}" stroke="${C.ink}" stroke-width="4.5" stroke-linejoin="round"/>
      <rect x="-65" y="-76" width="130" height="44" rx="12" fill="none" stroke="${C.white}" stroke-width="2" opacity="0.22"/>
      ${traces}
      <rect x="-31" y="-31" width="62" height="62" rx="9" fill="${C.cyanDeep}" stroke="${C.ink}" stroke-width="2.5" opacity="0.92"/>
      ${screen || `<circle r="9" fill="${C.white}" opacity="0.35">
        <animate attributeName="opacity" values="0.25;0.8;0.25" dur="2.2s" repeatCount="indefinite"/>
        <animate attributeName="r" values="7;12;7" dur="2.2s" repeatCount="indefinite"/>
      </circle>`}
    </g>
  </g>`;
}

// Soft cyan halo behind the chip (same gradient values as the live hero).
export function glow(x = 400, y = 280, r = 198, id = 'g') {
  return `
  <g transform="translate(${x} ${y})">
    <defs><radialGradient id="glow-${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${C.cyan}" stop-opacity="0.34"/>
      <stop offset="55%" stop-color="${C.cyan}" stop-opacity="0.119"/>
      <stop offset="100%" stop-color="${C.cyan}" stop-opacity="0"/>
    </radialGradient></defs>
    <circle r="${r}" fill="url(#glow-${id})">
      <animate attributeName="r" values="${r};${r + 18};${r}" dur="7s" repeatCount="indefinite"/>
    </circle>
  </g>`;
}

export const CARRIERS = [
  { name: 'Vodafone', price: '€0.42', ping: '18 ms' },
  { name: 'Orange', price: '€0.38', ping: '24 ms' },
  { name: 'T-Mobile', price: '€0.45', ping: '21 ms' },
  { name: 'Telefónica', price: '€0.40', ping: '29 ms' },
  { name: 'A1', price: '€0.36', ping: '31 ms' },
];
