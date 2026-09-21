/* ─────────────────────────────────────────────────────────────────────────
   /omdm-market — page assembly.

   Mounts the chosen animation into each slot and rebuilds the whole page when
   the surface is switched, because the artwork carries its own palette: the
   institutional variants are drawn on navy and the fintech-clean ones on
   white, so switching surface means switching variant, not just CSS.
   ───────────────────────────────────────────────────────────────────────── */
import { theBook, twoSides, rateCardVsMarket, theGap, finBoard, bothSidesVerified } from './omdm-hero.js';
import { waterfall, oneOrHundred } from './omdm-book.js';
import { theChain, reconciled } from './omdm-ctrl.js';

/* which variant fills which slot, per surface */
const PLAN = {
  inst: { hero: theBook, gap: rateCardVsMarket, book: waterfall, parts: twoSides, ctrl: theChain },
  fin: { hero: finBoard, gap: theGap, book: oneOrHundred, parts: bothSidesVerified, ctrl: reconciled },
};

const FAMS = [
  ['Quality of service', 31,
    'Measured on the ground, not promised on a rate card. Throughput, latency, packet loss and attach success, sampled continuously from real sessions.',
    [['Live throughput', '412 Mbps'], ['Attach success', '98.7%'], ['Latency p95', '31 ms'], ['Congestion', 'Low']]],
  ['Geopolitical &amp; climate risk', 18,
    'Routes are priced for the world they run through. Sanctions exposure, regulatory change, grid stability and severe-weather risk all move the book.',
    [['Sanctions exposure', 'None'], ['Regulatory change', 'Stable'], ['Grid stability', 'Nominal'], ['Severe weather', 'Watch']]],
  ['Pricing &amp; spread', 24,
    'Wholesale rates, competing quotes, historical volatility, and the spread between bid and ask across every counterparty quoting a route.',
    [['Wholesale rate', '0.79'], ['Competing quotes', '4'], ['Volatility 30d', '2.1%'], ['Bid-ask spread', '0.07']]],
  ['Liquidity arrangements', 12,
    'Who pays when. Paid upfront and paid later are different instruments and price differently, so settlement terms are part of the quote, not a footnote.',
    [['Upfront vs deferred', 'Both'], ['Settlement window', 'T+30'], ['Commitment size', '12 TB'], ['Credit terms', 'Approved']]],
  ['Compliance &amp; counterparty', 15,
    'KYC and KYB on every participant, plus the minimum level a counterparty must hold before it is allowed to quote a given route.',
    [['KYC / KYB status', 'Cleared'], ['Minimum level held', 'MVNO'], ['Jurisdiction', 'JP / SG'], ['Audit trail', 'Complete']]],
  ['Tier &amp; standing', 9,
    'What a counterparty actually is — MNO, full MVNO, MVNO-reseller or simple reseller — and the delivery record sitting behind it.',
    [['MNO', '14 live'], ['Full MVNO', '9 live'], ['MVNO-reseller', '22 live'], ['Reseller', '31 live']]],
];

const CTRLS = [
  ['shield', 'KYC and KYB before quoting',
    'No counterparty reaches the book without verification of both the individual and the business behind them.'],
  ['bar', 'Minimum level enforcement',
    'Routes carry a minimum counterparty standing. The book will not match below it.'],
  ['chain', 'Immutable audit trail',
    'Quote, match and settlement are recorded and reconcilable, per counterparty and per route.'],
  ['split', 'Segregated settlement',
    'Upfront and deferred arrangements are tracked apart, so exposure is always known.'],
];

const GLYPH = {
  shield: '<path d="M8.5 1.5 14.5 3.6v4.5c0 3.6-2.4 6-6 7.4-3.6-1.4-6-3.8-6-7.4V3.6z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M5.8 8.2 7.6 10l3.2-3.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  bar: '<path d="M2 10.5h13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><rect x="4" y="3.5" width="4" height="4.5" rx="1" fill="none" stroke="currentColor" stroke-width="1.4"/><rect x="10" y="12.5" width="4" height="2.5" rx="1" fill="none" stroke="currentColor" stroke-width="1.4"/>',
  chain: '<rect x="2.5" y="2.5" width="11" height="4" rx="1.4" fill="none" stroke="currentColor" stroke-width="1.4"/><rect x="2.5" y="9.5" width="11" height="4" rx="1.4" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 6.5v3" stroke="currentColor" stroke-width="1.6"/>',
  split: '<path d="M8 2v12" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/><rect x="1.5" y="4.5" width="5" height="7" rx="1.3" fill="none" stroke="currentColor" stroke-width="1.4"/><rect x="9.5" y="4.5" width="5" height="7" rx="1.3" fill="none" stroke="currentColor" stroke-width="1.4"/>',
};

function renderStatic() {
  const fams = document.querySelector('[data-fams]');
  if (fams) {
    fams.innerHTML = FAMS.map(([name, n, blurb, sigs]) => `
      <article class="fam">
        <span class="fam-n">${n} signals</span>
        <h3>${name}</h3>
        <p>${blurb}</p>
        <ul>${sigs.map(([k, v]) => `<li><span>${k}</span><b>${v}</b></li>`).join('')}</ul>
      </article>`).join('');
  }
  const ctrls = document.querySelector('[data-ctrls]');
  if (ctrls) {
    ctrls.innerHTML = CTRLS.map(([g, h, p]) => `
      <div class="ctrl">
        <span class="ctrl-i"><svg viewBox="0 0 16 16" aria-hidden="true">${GLYPH[g]}</svg></span>
        <div><h3>${h}</h3><p>${p}</p></div>
      </div>`).join('');
  }
}

let uid = 0;

function mount(surface) {
  const plan = PLAN[surface] || PLAN.inst;
  for (const [slot, variant] of Object.entries(plan)) {
    const host = document.querySelector(`[data-mount="${slot}"]`);
    if (!host) continue;
    let out;
    try {
      out = variant.build(`p${uid++}`);
    } catch (err) {
      console.error('mount failed for', slot, err);
      host.innerHTML = '';
      continue;
    }
    host.innerHTML = (out && out.svg) || '';
    if (out && typeof out.init === 'function') out.init(host);
  }
}

function setSurface(surface) {
  document.body.dataset.surface = surface;
  document.querySelectorAll('[data-surface-btn]').forEach((b) => {
    b.classList.toggle('is-on', b.dataset.surfaceBtn === surface);
  });
  mount(surface);
}

document.querySelectorAll('[data-surface-btn]').forEach((b) => {
  b.addEventListener('click', () => setSurface(b.dataset.surfaceBtn));
});

renderStatic();
setSurface(document.body.dataset.surface || 'inst');
