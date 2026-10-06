/* Icon review board — a different shape of problem from the animation
   boards. Thirty-one candidates, each tiny, so the useful view is the whole
   set side by side at its real size, with one blown up big enough to judge
   the motion and one dropped into a replica of the actual login card.    */

export function buildIconBoard(root, cfg) {
  const { icons, thinking, pick, chosen } = cfg;
  root.classList.add('board', 'icon-board');

  const badge = (svg, cls = '') => `<span class="ic-badge ${cls}">${svg}</span>`;

  root.innerHTML = `
  <section class="bd-hero">
    <div class="bd-wrap">
      <div class="mb-7 flex flex-wrap items-center gap-3">
        <span class="bd-eyebrow">Icon review</span>
        <span class="bd-size-note" title="Measured on the live login card">Badge <b>56×56</b> · art <b>34×34</b> · viewBox <b>64</b></span>
      </div>
      <div class="ib-top">
        <div class="bd-copy">
          <div class="bd-kicker">/login · greeting</div>
          <h2 class="bd-h2">Aloha! <span>Thirty ways to say it.</span></h2>
          <p class="bd-lead">The login card opens with a 56×56 rounded badge holding a 34×34 animated glyph on a
            0&nbsp;0&nbsp;64&nbsp;64 viewBox. Every icon below is built to exactly that, with all motion inline as
            SMIL — no stylesheet, no keyframe names, nothing registered globally. Drop-in replacements, one
            attribute apart.</p>
          <div class="ib-meta">
            <div><span>Real size</span><b>56 × 56 badge</b></div>
            <div><span>Art box</span><b>34 × 34 @ viewBox 64</b></div>
            <div><span>Corner</span><b>16px, rounded-2xl</b></div>
            <div><span>Fill</span><b>primary/10 → primary/5</b></div>
          </div>
        </div>

        <div class="ib-stage">
          <div class="ib-big" data-big></div>
          <div class="ib-bigmeta">
            <div class="ib-bigname" data-bigname></div>
            <div class="ib-bignote" data-bignote></div>
          </div>
          <div class="ib-card">
            <div class="ib-cardhead">
              <div data-cardicon></div>
              <div class="ib-aloha">Aloha!</div>
              <div class="ib-sub">Sign in to your account - or create a new one</div>
            </div>
            <div class="ib-btns">
              <div class="ib-btn"><b></b> Continue with Apple</div>
              <div class="ib-btn">Continue with Google</div>
            </div>
            <div class="ib-ctxnote">At true size, in the real card</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="bd-wrap py-12">
    <div class="bd-eyebrow">What this icon has to do</div>
    <h3 class="mt-2 text-[28px] font-bold">${thinking.title}</h3>
    <p class="mt-4 max-w-3xl text-[17px] leading-relaxed text-black/65">${thinking.lead}</p>
    <div class="mt-8 grid gap-6 sm:grid-cols-3">
      ${thinking.jobs.map(j => `
        <div class="ib-job">
          <div class="ib-jobt">${j.t}</div>
          <p class="ib-jobd">${j.d}</p>
        </div>`).join('')}
    </div>
  </section>

  <section class="bd-compare">
    <div class="bd-wrap">
      <div class="bd-eyebrow">All thirty-one, at real size</div>
      <h3 class="mt-2 text-[28px] font-bold">Every candidate, running</h3>
      <p class="mt-3 max-w-2xl text-[16px] leading-relaxed text-black/60">
        Each tile shows the icon in the real 56px badge on the left and at triple size on the right, so you can
        judge how it reads at both. Click any tile to load it into the card above.</p>
      <div class="ib-grid" data-grid></div>
    </div>
  </section>

  <section class="bd-wrap py-14">
    <div class="bd-eyebrow">Recommendation</div>
    <div class="mt-5 grid gap-5 sm:grid-cols-3">
      ${pick.map(p => `
        <div class="ib-pick">
          <div class="ib-pickk">${p.k}</div>
          ${p.h ? `<div class="ib-pickh">${p.h}</div>` : ''}
          <p class="ib-pickd">${p.d}</p>
        </div>`).join('')}
    </div>
  </section>`;

  const grid = root.querySelector('[data-grid]');
  const big = root.querySelector('[data-big]');
  const bigName = root.querySelector('[data-bigname]');
  const bigNote = root.querySelector('[data-bignote]');
  const cardIcon = root.querySelector('[data-cardicon]');

  /* each icon gets its own uid so ids inside never collide */
  const uid = (i) => `ib${i}`;

  const load = (i) => {
    const ic = icons[i];
    big.innerHTML = badge(ic.svg(uid('b' + i)), 'xl');
    bigName.innerHTML = `${i === 0 ? '' : `<em>${i}</em>`} ${ic.name}
      ${chosen === i ? '<span class="ib-chosen">CHOSEN</span>' : ''}`;
    bigNote.textContent = ic.note;
    cardIcon.innerHTML = badge(ic.svg(uid('c' + i)));
    grid.querySelectorAll('.ib-tile').forEach((t, n) => t.classList.toggle('on', n === i));
  };

  grid.innerHTML = icons.map((ic, i) => `
    <button class="ib-tile${chosen === i ? ' chosen' : ''}" data-i="${i}">
      <div class="ib-tilehead">
        <span class="ib-num">${i === 0 ? 'LIVE' : String(i).padStart(2, '0')}</span>
        <span class="ib-fam">${ic.family}</span>
        ${chosen === i ? '<span class="ib-chosen sm">CHOSEN</span>' : ''}
      </div>
      <div class="ib-tilerow">
        ${badge(ic.svg(uid('t' + i)))}
        ${badge(ic.svg(uid('l' + i)), 'lg')}
      </div>
      <div class="ib-tilename">${ic.name}</div>
      <p class="ib-tilenote">${ic.note}</p>
    </button>`).join('');

  grid.querySelectorAll('.ib-tile').forEach(b =>
    b.addEventListener('click', () => load(Number(b.dataset.i))));

  load(chosen != null ? chosen : 1);
}
