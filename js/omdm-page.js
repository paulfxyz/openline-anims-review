/* ─────────────────────────────────────────────────────────────────────────
   /omdm-market — page assembly. Fintech-clean surface only.

   All five animations are purpose-built for this page, at the box each slot
   actually occupies, and each one argues the point made by the copy beside it.
   ───────────────────────────────────────────────────────────────────────── */
import { venueCost, bookFlow, heroBook, depthNarrows, auditTrail } from './omdm-anims2.js';

/* every slot is now drawn for this page and for the copy beside it — the
   review-board variants were argued for a different frame and contradicted
   their own captions here */
const PLAN = {
  hero: heroBook,
  venue: venueCost,
  book: bookFlow,
  parts: depthNarrows,
  ctrl: auditTrail,
};

/* the six families, in the same order as the waterfall steps above them */
const FAMS = [
  ['Quality of service', 31, +0.04,
    'What the route actually delivers, sampled from live sessions instead of promised on a rate card. A route that performs better is worth more, and the book pays for it.',
    [['Live throughput', '412 Mbps'], ['Attach success', '98.7%'], ['Latency p95', '31 ms'], ['Congestion window', 'Low']]],
  ['Geopolitical &amp; climate risk', 18, +0.02,
    'Routes run through real places. Sanctions exposure, regulatory change, grid stability and severe weather all change what capacity on a route is worth holding.',
    [['Sanctions exposure', 'None'], ['Regulatory change', 'Stable'], ['Grid stability', 'Degraded'], ['Severe weather', 'Watch']]],
  ['Pricing &amp; spread', 24, -0.06,
    'What everyone else is quoting. Wholesale rates, competing quotes on the same route, thirty-day volatility, and the gap between the best bid and the best ask.',
    [['Wholesale rate', '0.79'], ['Competing quotes', '4'], ['Volatility 30d', '2.1%'], ['Bid-ask spread', '0.07']]],
  ['Liquidity arrangements', 12, -0.03,
    'Who pays when. Paid today and paid in thirty days are different instruments and price differently, so settlement terms sit inside the quote rather than in a footnote.',
    [['Upfront vs deferred', 'Upfront'], ['Settlement window', 'T+0'], ['Commitment size', '12 TB'], ['Credit terms', 'Approved']]],
  ['Compliance &amp; counterparty', 15, +0.01,
    'Whether the other side clears. KYC and KYB status, the minimum standing this particular route demands, the jurisdictions involved, and a complete audit trail.',
    [['KYC / KYB status', 'Cleared'], ['Minimum level held', 'MVNO'], ['Jurisdiction', 'JP / SG'], ['Audit trail', 'Complete']]],
  ['Tier &amp; standing', 9, -0.02,
    'What a counterparty actually is — MNO, full MVNO, MVNO-reseller or reseller — and the delivery record sitting behind that claim.',
    [['MNO', '14 live'], ['Full MVNO', '9 live'], ['MVNO-reseller', '22 live'], ['Reseller', '31 live']]],
];

const CTRLS = [
  ['shield', 'KYC and KYB before quoting',
    'No counterparty reaches the book without verification of the business and of the people behind it. There is no observer tier.'],
  ['bar', 'Minimum level enforcement',
    'Each route carries a minimum counterparty standing. The book will not match below it, whatever the price on offer.'],
  ['chain', 'Immutable audit trail',
    'Quote, match and settlement are recorded append-only and reconcile per counterparty and per route, at any point in the past.'],
  ['split', 'Segregated settlement',
    'Upfront and deferred arrangements are tracked apart, so exposure on either side is always a known number rather than an estimate.'],
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
    fams.innerHTML = FAMS.map(([name, n, d, blurb, sigs]) => {
      const dir = d > 0 ? 'up' : 'down';
      const col = d > 0 ? 'var(--up)' : 'var(--accent)';
      return `
      <article class="fam" style="--fam-col:${col}">
        <div class="fam-top">
          <span class="fam-n">${n} signals</span>
          <span class="fam-d" data-dir="${dir}">${d > 0 ? '+' : '\u2212'}${Math.abs(d).toFixed(2)}</span>
        </div>
        <h3>${name}</h3>
        <p>${blurb}</p>
        <ul>${sigs.map(([k, v]) => `<li><span>${k}</span><b>${v}</b></li>`).join('')}</ul>
      </article>`;
    }).join('');
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

function mount() {
  for (const [slot, variant] of Object.entries(PLAN)) {
    const host = document.querySelector(`[data-mount="${slot}"]`);
    if (!host) continue;
    try {
      const out = variant.build(`p${uid++}`);
      host.innerHTML = (out && out.svg) || '';
      if (out && typeof out.init === 'function') out.init(host);
    } catch (err) {
      console.error('mount failed for', slot, err);
      host.innerHTML = '';
    }
  }
}

renderStatic();
mount();
